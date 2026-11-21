#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает цитаты персонажей для крафтов и сборок навыков.

Источник: scripts/languages/russian.po из игры — строки
STRINGS.CHARACTERS.<ГЕРОЙ>.DESCRIBE.<ПРЕДМЕТ>.
Результат: js/quotes.js — window.QUOTES = {craft, chars}.
"""
from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_ZIP = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/scripts.zip")
CRAFT_JS = ROOT / "js" / "craft.js"
OUT = ROOT / "js" / "quotes.js"

# Контексты .po -> ключ персонажа на сайте.
SPEAKERS = {
    "WILSON": "wilson", "WILLOW": "willow", "WOLFGANG": "wolfgang",
    "WENDY": "wendy", "WX78": "wx78", "WICKERBOTTOM": "wickerbottom",
    "WOODIE": "woodie", "WES": "wes", "MAXWELL": "maxwell", "WAXWELL": "maxwell",
    "WATHGRITHR": "wigfrid", "WEBBER": "webber", "WARLY": "warly",
    "WORTOX": "wortox", "WORMWOOD": "wormwood", "WINONA": "winona",
    "WURT": "wurt", "WALTER": "walter", "WANDA": "wanda",
}
NAMES = {
    "wilson": "Уилсон", "willow": "Уиллоу", "wolfgang": "Вольфганг",
    "wendy": "Венди", "wx78": "WX-78", "wickerbottom": "Уикерботтом",
    "woodie": "Вуди", "wes": "Уэс", "maxwell": "Максвелл",
    "wigfrid": "Вигфрид", "webber": "Веббер", "warly": "Уорли",
    "wortox": "Вортокс", "wormwood": "Вормвуд", "winona": "Уинона",
    "wurt": "Вурт", "walter": "Уолтер", "wanda": "Ванда",
}
ORDER = [
    "wilson", "willow", "wolfgang", "wendy", "wx78", "wickerbottom",
    "woodie", "wes", "maxwell", "wigfrid", "webber", "warly",
    "wortox", "wormwood", "winona", "wurt", "walter", "wanda",
]
ORDER_INDEX = {k: i for i, k in enumerate(ORDER)}
MAX_CRAFT_QUOTES = 99
MAX_CHAR_QUOTES = 99


def parse_po(text: str) -> dict[str, str]:
    entries: dict[str, str] = {}
    for block in re.split(r"\r?\n\r?\n", text):
        ctx = None
        value = None
        mode = None
        for line in block.splitlines():
            if line.startswith("msgctxt "):
                ctx = line[8:].strip().strip('"')
            elif line.startswith("msgid "):
                mode = "id"
            elif line.startswith("msgstr "):
                mode = "str"
                value = line[7:].strip().strip('"')
            elif line.startswith('"') and mode == "str":
                value = (value or "") + line.strip().strip('"')
        if ctx and value is not None:
            value = value.replace('\\"', '"').replace("\\n", " ").replace("\\\\", "\\")
            value = value.replace("\u00a0", " ").strip()
            if value:
                entries[ctx] = value
    return entries


def craft_products() -> list[str]:
    raw = CRAFT_JS.read_text(encoding="utf-8")
    data = json.loads(raw[raw.index("=") + 1:].strip().rstrip(";"))
    return sorted({r.get("product") for r in data["recipes"].values() if r.get("product")})


def pick_quotes(rows: list[tuple[str, str, str]], target: str | None = None) -> list[dict]:
    """rows: (speaker, suffix, text). Возвращает до MAX цитат по одному голосу."""
    chosen: dict[str, tuple[int, str]] = {}
    for speaker, suffix, text in rows:
        key = "wilson" if speaker == "GENERIC" else SPEAKERS.get(speaker)
        if not key or not text:
            continue
        if target and target in NAMES:
            text = text.replace("%s", NAMES[target])
        if "%" in text:
            continue
        priority = 0 if suffix == "" else (1 if suffix == ".GENERIC" else 2 + len(suffix))
        if speaker == "GENERIC":
            priority += 0.5
        if key not in chosen or priority < chosen[key][0]:
            chosen[key] = (priority, text)
    out = []
    def order_key(k):
        return (1 if target and k == target else 0, ORDER_INDEX.get(k, 99))
    for key in sorted(chosen, key=order_key):
        out.append([key, chosen[key][1]])
        if len(out) >= (MAX_CHAR_QUOTES if target else MAX_CRAFT_QUOTES):
            break
    return out


def main() -> int:
    if not SCRIPTS_ZIP.exists():
        print("scripts.zip not found")
        return 1
    with zipfile.ZipFile(SCRIPTS_ZIP) as z:
        po = z.read("scripts/languages/russian.po").decode("utf-8", "replace")
    entries = parse_po(po)

    by_prefab: dict[str, list[tuple[str, str, str]]] = {}
    for ctx, value in entries.items():
        m = re.match(r"STRINGS\.CHARACTERS\.([A-Z0-9]+)\.DESCRIBE\.([A-Z0-9_]+)(.*)$", ctx)
        if not m:
            continue
        speaker, prefab, suffix = m.group(1), m.group(2).lower(), m.group(3)
        if speaker != "GENERIC" and speaker not in SPEAKERS:
            continue
        by_prefab.setdefault(prefab, []).append((speaker, suffix, value))

    craft: dict[str, list[dict]] = {}
    for prefab in craft_products():
        quotes = pick_quotes(by_prefab.get(prefab, []))
        if quotes:
            craft[prefab] = quotes

    chars: dict[str, list[dict]] = {}
    for key in ORDER:
        target = "wathgrithr" if key == "wigfrid" else key
        rows = []
        for ctx, value in entries.items():
            m = re.match(r"STRINGS\.CHARACTERS\.([A-Z0-9]+)\.DESCRIBE\." +
                         target.upper() + r"\.GENERIC$", ctx)
            if m:
                spk = m.group(1)
                if spk == "GENERIC" or spk in SPEAKERS:
                    rows.append((spk, "", value))
        quotes = pick_quotes(rows, target=key)
        if quotes:
            chars[key] = quotes

    payload = {"craft": craft, "chars": chars}
    OUT.write_text(
        "/* Сгенерировано tools/build_quotes.py — не править вручную */\n"
        "window.QUOTES = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    total = sum(len(v) for v in craft.values())
    print("written %s: craft %d prefabs / %d quotes, chars %d" %
          (OUT, len(craft), total, len(chars)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
