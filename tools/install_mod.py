#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Установка серверного мода «DST Compendium Sync» в папку mods игры.

Ищет Don't Starve Together в библиотеках Steam и копирует dst-tracker-mod
в <игра>/mods/dst-tracker-sync. Дальше мод включается в игре:
«Моды» → DST Compendium Sync (для кнопки в паузе — и в клиентских модах).

Запуск:
    python3 tools/install_mod.py --dry-run
    python3 tools/install_mod.py
    python3 tools/install_mod.py --dst-dir "/path/to/Don't Starve Together"
"""
from __future__ import annotations

import argparse
import os
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SOURCE = ROOT / "dst-tracker-mod"
MOD_DIR_NAME = "dst-tracker-sync"
STEAM_ROOTS = [
    Path.home() / ".steam" / "steam",
    Path.home() / ".local" / "share" / "Steam",
    Path.home() / "Steam",
]


def steam_libraries() -> list[Path]:
    libs: list[Path] = []
    for root in STEAM_ROOTS:
        vdf = root / "steamapps" / "libraryfolders.vdf"
        if not vdf.is_file():
            continue
        try:
            text = vdf.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for line in text.splitlines():
            line = line.strip()
            if line.startswith('"path"'):
                parts = line.split('"')
                if len(parts) >= 4:
                    libs.append(Path(parts[3]))
        if (root / "steamapps").is_dir():
            libs.append(root)
    # убрать дубли, сохранив порядок
    out, seen = [], set()
    for lib in libs:
        key = str(lib)
        if key not in seen:
            seen.add(key)
            out.append(lib)
    return out


def find_game() -> Path | None:
    names = ["Don't Starve Together", "Don't Starve Together Dedicated Server"]
    for lib in steam_libraries():
        for name in names:
            candidate = lib / "steamapps" / "common" / name
            if (candidate / "data" / "databundles" / "scripts.zip").is_file():
                return candidate
    return None


def sync_base_hint(game: Path) -> Path:
    """Где мод будет писать файл: Proton-префикс или нативный ~/.klei."""
    steamapps = game.parents[1] if len(game.parents) > 1 else None
    if steamapps:
        users = steamapps / "compatdata" / "322330" / "pfx" / "drive_c" / "users"
        if users.is_dir():
            for user in sorted(users.iterdir()):
                docs = user / "Documents" / "Klei" / "DoNotStarveTogether"
                if docs.is_dir():
                    return docs / "dst-tracker-sync.json"
    return Path.home() / ".klei" / "DoNotStarveTogether" / "dst-tracker-sync.json"


def main() -> int:
    parser = argparse.ArgumentParser(description="Установить мод синхронизации в DST")
    parser.add_argument("--dst-dir", default="", help="папка игры (где лежит data/databundles)")
    parser.add_argument("--dry-run", action="store_true", help="только показать, что будет сделано")
    args = parser.parse_args()

    if not SOURCE.is_dir():
        print(f"Нет папки мода: {SOURCE}", file=sys.stderr)
        return 1

    game = Path(args.dst_dir).expanduser() if args.dst_dir else find_game()
    if not game:
        print("Не нашёл Don't Starve Together. Укажи путь: --dst-dir", file=sys.stderr)
        return 1
    if not (game / "data" / "databundles" / "scripts.zip").is_file():
        print(f"Это не похоже на DST: {game}", file=sys.stderr)
        return 1

    target = game / "mods" / MOD_DIR_NAME
    print(f"Игра:  {game}")
    print(f"Мод:   {target}")
    if args.dry_run:
        print("dry-run: копирование пропущено")
        return 0

    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(
        SOURCE,
        target,
        ignore=shutil.ignore_patterns("__pycache__", "*.pyc", ".git", "tests"),
    )

    sync_base = sync_base_hint(game)
    print("Готово. Дальше:")
    print("  1) В игре: «Моды» → включить «DST Compendium Sync» (для кнопки в паузе — и в клиентских модах).")
    print("     Для мира с пещерами включи мод на обоих шардах (лес и пещеры).")
    print("  2) В паузе появится кнопка «Компендиум» — экран боссов, квестов и навыков.")
    print(f"\nСнимок прогресса мод пишет в: {sync_base} (+ -caves.json)")
    print("\nЕсли включаешь вручную, в modoverrides.lua мира добавь:")
    print('  return { ["%s"] = { enabled = true, configuration_options = {} } }' % MOD_DIR_NAME)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
