#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает js/version.js из VERSION.

Запуск:
    python3 tools/build_version.py            # дата = сегодня
    python3 tools/build_version.py 2026-11-16 # фиксированная дата сборки
"""
from __future__ import annotations

import datetime
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VERSION = ROOT / "VERSION"
OUT = ROOT / "js" / "version.js"


def main() -> int:
    version = VERSION.read_text(encoding="utf-8").strip() or "1.0.0"
    build = sys.argv[1] if len(sys.argv) > 1 else datetime.date.today().isoformat()
    OUT.write_text(
        "/* Сгенерировано tools/build_version.py — не править вручную */\n"
        f"window.APP_VERSION = {json.dumps(version)};\n"
        f"window.APP_BUILD = {json.dumps(build)};\n",
        encoding="utf-8",
    )
    print(f"js/version.js: v{version} ({build})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
