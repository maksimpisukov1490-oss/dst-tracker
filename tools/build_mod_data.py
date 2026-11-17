#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает dst-tracker-mod/scripts/boss_data.lua из js/data.js.

Сайт не меняется: скрипт только читает его данные и делает Lua-таблицу
для экрана «Компендиум» внутри игры.
"""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "dst-tracker-mod" / "scripts" / "boss_data.lua"

ICONS = {
    "deerclops": "deerclops.tex",
    "bearger": "bearger.tex",
    "moose_goose": "moose.tex",
    "dragonfly": "dragonfly.tex",
    "bee_queen": "beequeen.tex",
    "klaus": "klaus.tex",
    "toadstool": "toadstool.tex",
    "antlion": "antlion.tex",
    "malbatross": "malbatross.tex",
    "crab_king": "crabking.tex",
    "ancient_fuelweaver": "stalker_atrium.tex",
    "celestial_champion": "alterguardian_phase1.tex",
    "eye_of_terror": "eyeofterror.tex",
    "twins_of_terror": "twinofterror1.tex",
    "shadow_pieces": "shadow_knight.tex",
    "nightmare_werepig": "daywalker.tex",
    "scrappy_werepig": "daywalker2.tex",
    "frostjaw": "sharkboi.tex",
    "lord_of_the_fruit_flies": "lordfruitfly.tex",
    "ancient_guardian": "minotaur.tex",
    "great_depths_worm": "worm_boss.tex",
    "ancient_guard_tower": "vault_pillar_guard.tex",
    "armored_bearger": "mutatedbearger.tex",
    "crystal_deerclops": "mutateddeerclops.tex",
    "possessed_varg": "mutatedwarg.tex",
    "umbral_abomination": "shrouden.tex",
    "celestial_scion": "alterguardian_phase4_lunarrift.tex",
    "celestial_revenant": "alterguardian_phase1_lunarrift.tex",
    "warbot": "wagboss_robot.tex",
    "shrouded_queen": "charlie_boss.tex",
    "spider_queen": "spiderqueen.tex",
    "treeguard": "leif.tex",
    "varg": "warg.tex",
    "ewecus": "spat.tex",
    "krampus": "krampus.tex",
    "reanimated_skeleton": "stalker.tex",
}


def lua_string(value: str) -> str:
    value = str(value or "")
    value = value.replace("\\", "\\\\").replace('"', '\\"')
    value = value.replace("\r", "").replace("\n", "\\n")
    return '"' + value + '"'


def read_site_data() -> dict:
    script = (
        "const fs=require('fs');const ctx={window:{}};"
        "(new Function('window',fs.readFileSync('js/data.js','utf8')))(ctx.window);"
        "process.stdout.write(JSON.stringify({bosses:ctx.window.BOSSES,cats:ctx.window.CATEGORIES}));"
    )
    raw = subprocess.check_output(["node", "-e", script], cwd=ROOT)
    return json.loads(raw.decode("utf-8"))


def main() -> int:
    data = read_site_data()
    bosses = data["bosses"]
    cats = data["cats"]

    lines = [
        "-- Сгенерировано tools/build_mod_data.py из js/data.js — не править вручную.",
        "-- Данные для экрана «Компендиум» в игре.",
        "",
        "BOSS_DATA = {",
    ]
    for b in bosses:
        slug = b["slug"]
        lines.append("    %s = {" % slug)
        lines.append("        name = %s," % lua_string(b.get("name_ru")))
        lines.append("        category = %s," % lua_string(b.get("category")))
        lines.append("        hp = %s," % lua_string(b.get("hp")))
        lines.append("        damage = %s," % lua_string(b.get("damage")))
        lines.append("        planar = %s," % lua_string(b.get("planar_damage")))
        lines.append("        lore = %s," % lua_string(b.get("lore")))
        lines.append("        drops = %s," % lua_string(b.get("drops")))
        lines.append("        icon = %s," % lua_string(ICONS.get(slug, "")))
        lines.append("    },")
    lines.append("}")
    lines.append("")
    lines.append("BOSS_CATEGORIES = {")
    for c in cats:
        if c["id"] in ("progress", "chronicle"):
            continue
        lines.append("    {")
        lines.append("        id = %s," % lua_string(c["id"]))
        lines.append("        name = %s," % lua_string(c.get("name")))
        lines.append("        short = %s," % lua_string(c.get("short")))
        lines.append("    },")
    lines.append("}")
    lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print("written %s (%d bosses)" % (OUT, len(bosses)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
