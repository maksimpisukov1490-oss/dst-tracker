#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает js/version.js из VERSION и проставляет ?v= на ассеты.

Запуск:
    python3 tools/build_version.py            # дата = сегодня
    python3 tools/build_version.py 2026-11-16 # фиксированная дата сборки
"""
from __future__ import annotations

import datetime
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION = ROOT / "VERSION"
OUT = ROOT / "js" / "version.js"
INDEX = ROOT / "index.html"

ASSETS = (
    "css/style.css",
    "js/data.js",
    "js/skills.js",
    "js/craft.js",
    "js/cooking.js",
    "js/version.js",
    "js/app.js",
)


def stamp_index(version: str) -> None:
    """Добавляет ?v=<версия> к локальным css/js, чтобы сбросить кеш."""
    if not INDEX.exists():
        return
    html = INDEX.read_text(encoding="utf-8")
    for asset in ASSETS:
        # убираем прежний ?v=... и ставим актуальный
        html = re.sub(
            re.escape(asset) + r"(\?v=[^\"']*)?",
            f"{asset}?v={version}",
            html,
        )
    INDEX.write_text(html, encoding="utf-8")


def main() -> int:
    version = VERSION.read_text(encoding="utf-8").strip() or "1.0.0"
    build = sys.argv[1] if len(sys.argv) > 1 else datetime.date.today().isoformat()
    OUT.write_text(
        "/* Сгенерировано tools/build_version.py — не править вручную */\n"
        f"window.APP_VERSION = {json.dumps(version)};\n"
        f"window.APP_BUILD = {json.dumps(build)};\n",
        encoding="utf-8",
    )
    stamp_index(version)
    print(f"js/version.js: v{version} ({build})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
