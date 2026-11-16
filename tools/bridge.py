#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Мост между серверным модом DST и сайтом «Компендиум выжившего».

Мод пишет JSON рядом с сохранениями игры:
  * Windows / Proton: Documents\\Klei\\DoNotStarveTogether\\dst-tracker-sync.json
  * Linux:            ~/.klei/DoNotStarveTogether/dst-tracker-sync.json
  * резерв:           <игра>/mods/dst-tracker-sync.json
  * если io недоступен: client_save/dst_tracker_sync_<shard> (TheSim:SetPersistentString)
  * облачное сохранение: CloudSaves/<hash>/Master.zip или Caves.zip, запись save/dst_tracker_sync_<shard>
плюс отдельный файл ...-caves.json для пещер.

Мост сам находит Proton-префиксы Steam, выбирает самый свежий мир и отдаёт
объединённый снимок по HTTP с CORS — сайт может работать даже с file://.

Запуск:
    python3 tools/bridge.py
    python3 tools/bridge.py --port 8787 --file /path/to/dst-tracker-sync

Эндпоинты:
    GET /state   — прогресс (JSON)
    GET /health  — состояние моста и файлов
    GET /        — короткая страница статуса
"""
from __future__ import annotations

import argparse
import json
import os
import time
import zipfile
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

APP = "dst-compendium"
VERSION = 1
# Данные мода обновляются heartbeat-ом раз в 30 секунд. Если процесс игры
# не найден, даём короткий запас, чтобы не отвалиться между записями.
ONLINE_GRACE = 45
# Если процесс игры есть, но мод давно не писал (пауза/меню) — не считаем
# данные живыми дольше пяти минут.
ONLINE_MAX_AGE = 300
DEFAULT_PORT = 8787
DEFAULT_HOST = "127.0.0.1"
STEAM_ROOTS = [
    Path.home() / ".steam" / "steam",
    Path.home() / ".local" / "share" / "Steam",
    Path.home() / "Steam",
]


def steam_libraries() -> list[Path]:
    libs: list[Path] = []
    for root in STEAM_ROOTS:
        vdf = root / "steamapps" / "libraryfolders.vdf"
        if vdf.is_file():
            try:
                text = vdf.read_text(encoding="utf-8", errors="replace")
            except OSError:
                text = ""
            for line in text.splitlines():
                line = line.strip()
                if line.startswith('"path"'):
                    parts = line.split('"')
                    if len(parts) >= 4:
                        libs.append(Path(parts[3]))
        if (root / "steamapps").is_dir():
            libs.append(root)

    out, seen = [], set()
    for lib in libs:
        key = str(lib)
        if key not in seen:
            seen.add(key)
            out.append(lib)
    return out


def base_candidates(override: str = "") -> list[Path]:
    if override:
        p = Path(override).expanduser()
        return [p.with_suffix(".json") if p.suffix != ".json" else p]

    out = [
        Path.home() / ".klei" / "DoNotStarveTogether" / "dst-tracker-sync",
        Path.home() / "Documents" / "Klei" / "DoNotStarveTogether" / "dst-tracker-sync",
    ]
    for lib in steam_libraries():
        users = lib / "steamapps" / "compatdata" / "322330" / "pfx" / "drive_c" / "users"
        if users.is_dir():
            for user in sorted(users.iterdir()):
                out.append(user / "Documents" / "Klei" / "DoNotStarveTogether" / "dst-tracker-sync")
        out.append(lib / "steamapps" / "common" / "Don't Starve Together" / "mods" / "dst-tracker-sync")

    seen, deduped = set(), []
    for base in out:
        key = str(base)
        if key not in seen:
            seen.add(key)
            deduped.append(base)
    return deduped


def shard_files(base: Path) -> list[Path]:
    """Файлы шардов: <base>.json и <base>-<shard>.json."""
    files = []
    plain = base if base.suffix == ".json" else base.with_suffix(".json")
    if plain.is_file():
        files.append(plain)
    stem = base.name[:-5] if base.name.endswith(".json") else base.name
    parent = base.parent if str(base.parent) else Path(".")
    if parent.is_dir():
        for p in sorted(parent.glob(stem + "-*.json")):
            if p not in files:
                files.append(p)
    return files


def _union(a, b) -> list:
    out = []
    for item in list(a or []) + list(b or []):
        if item not in out:
            out.append(item)
    return out


def _max_levels(a, b) -> dict:
    out = dict(a or {})
    for key, value in (b or {}).items():
        try:
            value = int(value)
        except (TypeError, ValueError):
            continue
        if int(out.get(key, 0)) < value:
            out[key] = value
    return out


def merge_kills(records: list[dict]) -> dict:
    merged: dict[str, dict] = {}
    for rec in records:
        for slug, kill in (rec.get("kills") or {}).items():
            if not isinstance(kill, dict):
                continue
            cur = merged.get(slug)
            if cur is None:
                merged[slug] = {
                    "count": int(kill.get("count") or 0),
                    "date": kill.get("date") or "",
                    "time": int(kill.get("time") or 0),
                    "day": int(kill.get("day") or 0),
                    "players": list(kill.get("players") or []),
                    "levels": dict(kill.get("levels") or {}),
                }
                continue

            new_count = int(kill.get("count") or 0)
            new_time = int(kill.get("time") or 0)
            new_day = int(kill.get("day") or 0)
            if new_count > cur["count"] or (new_count == cur["count"] and new_time > cur["time"]):
                cur["count"] = max(cur["count"], new_count)
                if kill.get("date"):
                    cur["date"] = kill["date"]
                cur["time"] = max(cur["time"], new_time)
                if new_day:
                    cur["day"] = new_day
            elif new_day and not cur.get("day"):
                cur["day"] = new_day
            cur["players"] = _union(cur.get("players"), kill.get("players"))
            cur["levels"] = _max_levels(cur.get("levels"), kill.get("levels"))
    return merged


def _read_base(base: Path) -> dict:
    records, sources, errors = [], [], []
    files = shard_files(base)
    for path in files:
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            errors.append({"file": str(path), "error": str(exc)})
            continue
        if not isinstance(data, dict) or data.get("app") != APP:
            errors.append({"file": str(path), "error": "not a dst-compendium sync file"})
            continue
        records.append(data)
        sources.append({
            "file": str(path),
            "shard": data.get("shard") or "",
            "updated_at": int(data.get("updated_at") or 0),
        })
    newest = max((int(r.get("updated_at") or 0) for r in records), default=0)
    return {
        "base": base,
        "files": files,
        "records": records,
        "sources": sources,
        "errors": errors,
        "newest": newest,
    }



def _persistent_roots(override: str = "") -> list[Path]:
    roots = []
    for base in base_candidates(override):
        parent = base.parent
        if parent not in roots:
            roots.append(parent)
    return roots


def _persistent_files(override: str = "") -> list[Path]:
    files = []
    patterns = (
        "*/client_save/dst_tracker_sync_*",
        "*/Cluster_*/Master/save/dst_tracker_sync_*",
        "*/Cluster_*/Caves/save/dst_tracker_sync_*",
        "dst_tracker_sync_*",
    )
    for root in _persistent_roots(override):
        if not root.is_dir():
            continue
        for pattern in patterns:
            for path in root.glob(pattern):
                if path.is_file() and path not in files:
                    files.append(path)
    return files


def _read_persistent(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8", errors="replace")
    start = raw.find("{")
    if start < 0:
        raise ValueError("no JSON payload")
    return json.loads(raw[start:])


def _persistent_groups(override: str = "") -> list[dict]:
    groups: dict[str, dict] = {}
    for path in _persistent_files(override):
        try:
            data = _read_persistent(path)
        except (OSError, ValueError, json.JSONDecodeError):
            continue
        if not isinstance(data, dict) or data.get("app") != APP:
            continue
        key = str(path.parent)
        group = groups.setdefault(key, {
            "base": path.parent,
            "files": [],
            "records": [],
            "sources": [],
            "errors": [],
            "newest": 0,
        })
        group["files"].append(path)
        group["records"].append(data)
        group["sources"].append({
            "file": str(path),
            "shard": data.get("shard") or "",
            "updated_at": int(data.get("updated_at") or 0),
        })
        group["newest"] = max(group["newest"], int(data.get("updated_at") or 0))
    return list(groups.values())



def _zip_groups(override: str = "") -> list[dict]:
    groups: dict[str, dict] = {}
    patterns = (
        "*/CloudSaves/*/Master.zip",
        "*/CloudSaves/*/Caves.zip",
    )
    for root in _persistent_roots(override):
        if not root.is_dir():
            continue
        for pattern in patterns:
            for path in root.glob(pattern):
                if not path.is_file():
                    continue
                try:
                    with zipfile.ZipFile(path) as archive:
                        for name in archive.namelist():
                            if "dst_tracker_sync_" not in name:
                                continue
                            raw = archive.read(name).decode("utf-8", errors="replace")
                            start = raw.find("{")
                            if start < 0:
                                continue
                            data = json.loads(raw[start:])
                            if not isinstance(data, dict) or data.get("app") != APP:
                                continue
                            key = str(path.parent)
                            group = groups.setdefault(key, {
                                "base": path.parent,
                                "files": [],
                                "records": [],
                                "sources": [],
                                "errors": [],
                                "newest": 0,
                            })
                            if path not in group["files"]:
                                group["files"].append(path)
                            group["records"].append(data)
                            group["sources"].append({
                                "file": f"{path}!{name}",
                                "shard": data.get("shard") or "",
                                "updated_at": int(data.get("updated_at") or 0),
                            })
                            group["newest"] = max(group["newest"], int(data.get("updated_at") or 0))
                except (OSError, zipfile.BadZipFile, json.JSONDecodeError, ValueError):
                    continue
    return list(groups.values())


def game_process_running() -> bool | None:
    """Ищет процесс DST (в том числе под Proton) в /proc.

    None — определить нельзя (не Linux), True/False — результат проверки.
    """
    if not os.path.isdir("/proc"):
        return None
    try:
        for pid in os.listdir("/proc"):
            if not pid.isdigit():
                continue
            raw = b""
            try:
                raw = Path(f"/proc/{pid}/cmdline").read_bytes()
            except OSError:
                pass
            if raw:
                for part in raw.split(b"\0"):
                    if not part:
                        continue
                    name = part.replace(b"\\", b"/").split(b"/")[-1].decode("utf-8", "ignore").lower()
                    if name.startswith("dontstarve"):
                        return True
                continue
            try:
                comm = Path(f"/proc/{pid}/comm").read_text(encoding="utf-8", errors="ignore")
            except OSError:
                continue
            if "dontstarve" in comm.lower():
                return True
    except OSError:
        return None
    return False


def load_state(override: str = "") -> dict:
    candidates = base_candidates(override)
    groups = [_read_base(base) for base in candidates]
    groups += _persistent_groups(override)
    groups += _zip_groups(override)
    groups = [g for g in groups if g["records"]]

    if not groups:
        return {
            "connected": False,
            "reason": "sync file not found",
            "candidates": [str(b) for b in candidates],
            "errors": [e for g in groups for e in g["errors"]],
        }

    chosen = max(groups, key=lambda g: (g["newest"], max((f.stat().st_mtime for f in g["files"]), default=0)))
    records = chosen["records"]
    latest = max(records, key=lambda r: int(r.get("updated_at") or 0))
    updated_at = int(latest.get("updated_at") or 0)
    age = max(0, int(time.time()) - updated_at)
    running = game_process_running()
    online = (running is True and age <= ONLINE_MAX_AGE) or (age <= ONLINE_GRACE)

    marks = {}
    for rec in records:
        for mark, enabled in (rec.get("marks") or {}).items():
            if enabled:
                marks[mark] = True

    skills = {}
    for rec in sorted(records, key=lambda r: int(r.get("updated_at") or 0), reverse=True):
        candidate = rec.get("skills")
        if isinstance(candidate, dict) and candidate.get("char"):
            skills = candidate
            break

    retro = {}
    for rec in records:
        for slug, count in (rec.get("retro") or {}).items():
            try:
                count = int(count)
            except (TypeError, ValueError):
                count = 1
            if count > retro.get(slug, 0):
                retro[slug] = count

    return {
        "connected": True,
        "app": APP,
        "version": VERSION,
        "updated_at": updated_at,
        "age": age,
        "stale": age > 120,
        "online": online,
        "running": running,
        "base": str(chosen["base"]),
        "world": latest.get("world") or {},
        "skills": skills,
        "kills": merge_kills(records),
        "marks": marks,
        "retro": retro,
        "shards": [r.get("shard") or "" for r in records],
        "shard_state": [
            {
                "shard": r.get("shard") or "",
                "session": int(r.get("session") or 0),
                "updated_at": int(r.get("updated_at") or 0),
                "kills": r.get("kills") or {},
            }
            for r in records
        ],
        "sources": chosen["sources"],
        "errors": chosen["errors"],
        "candidates": [str(b) for b in candidates],
    }


class Handler(BaseHTTPRequestHandler):
    server_version = "DSTTrackerBridge/1.0"
    base_override: str = ""

    def _send(self, code: int, payload, ctype: str = "application/json; charset=utf-8"):
        if isinstance(payload, (dict, list)):
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        elif isinstance(payload, str):
            body = payload.encode("utf-8")
        else:
            body = payload
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def do_OPTIONS(self):  # noqa: N802
        self._send(204, b"")

    def do_GET(self):  # noqa: N802
        path = self.path.split("?", 1)[0].rstrip("/") or "/"
        if path in ("/state", "/api/state", "/sync"):
            self._send(200, load_state(self.base_override))
        elif path == "/health":
            state = load_state(self.base_override)
            self._send(200, {
                "ok": True,
                "connected": state.get("connected", False),
                "online": state.get("online", False),
                "running": state.get("running"),
                "base": state.get("base"),
                "age": state.get("age"),
                "shards": state.get("shards", []),
                "candidates": state.get("candidates", []),
                "errors": state.get("errors", []),
            })
        elif path == "/":
            state = load_state(self.base_override)
            if state.get("connected"):
                html = (
                    "<!doctype html><meta charset=utf-8><title>DST bridge</title>"
                    "<body style='font:16px system-ui;padding:24px'>"
                    "<h1>Мост работает</h1>"
                    f"<p>Файл: <code>{state.get('base')}</code></p>"
                    f"<p>Обновлён {state.get('age')} сек назад, мир: день "
                    f"{(state.get('world') or {}).get('day', '?')}, "
                    f"убийств: {len(state.get('kills') or {})}.</p>"
                    "<p><a href='/state'>/state</a></p></body>"
                )
            else:
                cands = "".join(f"<li><code>{c}.json</code></li>" for c in state.get("candidates", [])[:8])
                html = (
                    "<!doctype html><meta charset=utf-8><title>DST bridge</title>"
                    "<body style='font:16px system-ui;padding:24px'>"
                    "<h1>Мост работает, но файла мода нет</h1>"
                    "<p>Искал здесь:</p><ul>" + cands + "</ul>"
                    "<p>Включи мод «DST Compendium Sync» в мире и зайди в игру.</p></body>"
                )
            self._send(200, html, "text/html; charset=utf-8")
        else:
            self._send(404, {"error": "not found", "paths": ["/state", "/health"]})

    def log_message(self, fmt, *args):
        if os.environ.get("DST_TRACKER_BRIDGE_VERBOSE"):
            super().log_message(fmt, *args)


def main():
    parser = argparse.ArgumentParser(description="Мост DST-мода и сайта-компендиума")
    parser.add_argument("--host", default=DEFAULT_HOST, help="адрес (по умолчанию 127.0.0.1)")
    parser.add_argument("--port", type=int, default=DEFAULT_PORT, help="порт (по умолчанию 8787)")
    parser.add_argument("--file", default="", help="базовый путь файла синхронизации")
    args = parser.parse_args()

    Handler.base_override = args.file
    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    print(f"[bridge] слушаю http://{args.host}:{args.port}")
    if args.file:
        print(f"[bridge] файл мода: {args.file} (+ -caves.json)")
    else:
        print("[bridge] ищу файл мода в ~/.klei, Documents/Klei и Proton-префиксах Steam")
    state = load_state(args.file)
    if state.get("connected"):
        print(f"[bridge] найден: {state.get('base')} (обновлён {state.get('age')} сек назад)")
    else:
        print("[bridge] файла пока нет — жду, пока мод запишет первый снимок")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[bridge] остановлен")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
