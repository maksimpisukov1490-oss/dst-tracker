#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает js/cooking.js: рецепты казана, ингредиенты и их теги.

Вход:
  tools/cook_ingredients.json — выгрузка ingredients из scripts/cooking.lua
  scripts/preparedfoods.lua   — рецепты казана
  scripts/preparednonfoods.lua — несъедобные результаты
  scripts/languages/russian.po — русские названия
  tools/recipe_meta.json       — английские STRINGS.NAMES

Выход:
  js/cooking.js
  tools/cook_icons_needed.json
"""
from __future__ import annotations

import json
import math
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS_ZIP = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/scripts.zip")
INGREDIENTS = ROOT / "tools" / "cook_ingredients.json"
META = ROOT / "tools" / "recipe_meta.json"
OUT = ROOT / "js" / "cooking.js"
ICON_LIST = ROOT / "tools" / "cook_icons_needed.json"
EXAMPLES = ROOT / "tools" / "cook_examples.json"
COOK_ICONS = ROOT / "assets" / "cook"
CRAFT_ICONS = ROOT / "assets" / "craft-v2"
ITEM_ICONS = ROOT / "assets" / "items"

EXTRA_ICONS = {
    "cookedmeat", "cookedmonstermeat", "cookedsmallmeat", "cookedmandrake",
    "bird_egg", "bird_egg_cooked", "quagmire_onion", "quagmire_onion_cooked",
    "quagmire_tomato", "quagmire_tomato_cooked", "honey", "honeycomb",
    "royal_jelly", "batnose", "cutlichen", "pondeel",
}
ICON_ALIASES = {
    "meat_cooked": "cookedmeat",
    "monstermeat_cooked": "cookedmonstermeat",
    "smallmeat_cooked": "cookedsmallmeat",
    "mandrake_cooked": "cookedmandrake",
    "egg": "bird_egg",
    "egg_cooked": "bird_egg_cooked",
    "onion": "quagmire_onion",
    "onion_cooked": "quagmire_onion_cooked",
    "tomato": "quagmire_tomato",
    "tomato_cooked": "quagmire_tomato_cooked",
    "honey_cooked": "honey",
    "honeycomb_cooked": "honeycomb",
    "royal_jelly_cooked": "royal_jelly",
    "cutlichen_cooked": "cutlichen",
    "pondeel_cooked": "pondeel",
    "batnose_dried": "batnose",
}

TUNING = {
    "HEALING_TINY": 1, "HEALING_SMALL": 3, "HEALING_MEDSMALL": 8,
    "HEALING_MOREMEDSMALL": 15, "HEALING_MED": 20, "HEALING_MEDLARGE": 30,
    "HEALING_LARGE": 40, "HEALING_HUGE": 60, "HEALING_MOREHUGE": 75,
    "HEALING_SUPERHUGE": 100,
    "SANITY_SUPERTINY": 1, "SANITY_TINY": 5, "SANITY_SMALL": 10,
    "SANITY_MED": 15, "SANITY_MEDLARGE": 20, "SANITY_LARGE": 33,
    "SANITY_HUGE": 50,
    "CALORIES_TINY": 9.375, "CALORIES_SMALL": 12.5, "CALORIES_MEDSMALL": 18.75,
    "CALORIES_MED": 25, "CALORIES_LARGE": 37.5, "CALORIES_HUGE": 75,
    "CALORIES_MOREHUGE": 100, "CALORIES_SUPERHUGE": 150,
    "PERISH_ONE_DAY": 480, "PERISH_TWO_DAY": 960,
    "PERISH_SUPERFAST": 1440, "PERISH_FAST": 2880, "PERISH_FASTISH": 3840,
    "PERISH_MED": 4800, "PERISH_SLOW": 7200, "PERISH_PRESERVED": 9600,
    "PERISH_SUPERSLOW": 19200,
    "HUNGERREGEN_TICK_VALUE": 5 * (75 * 2.5) / (0.5 * 480),
    "FOOD_TEMP_BRIEF": 5, "FOOD_TEMP_AVERAGE": 10, "FOOD_TEMP_LONG": 15,
    "COLD_FOOD_BONUS_TEMP": -40, "HOT_FOOD_BONUS_TEMP": 40,
    "JELLYBEAN_TICK_VALUE": 2, "PANFLUTE_SLEEPTIME": 20,
}

GROUP_ORDER = [
    ("meat", "Мясо"), ("fish", "Рыба"), ("monster", "Монстры"),
    ("veggie", "Овощи"), ("fruit", "Фрукты"), ("egg", "Яйца"),
    ("dairy", "Молочное"), ("sweet", "Сладкое"), ("fat", "Жиры"),
    ("frozen", "Лёд"), ("seed", "Семена"), ("inedible", "Несъедобное"),
    ("decoration", "Украшения"), ("magic", "Магия"), ("other", "Прочее"),
]
GROUP_ORDER_MAP = {gid: i for i, (gid, _) in enumerate(GROUP_ORDER)}

NAME_OVERRIDES = {
    "egg": "Яйцо",
    "egg_cooked": "Приготовленное яйцо",
    "tomato": "Томат",
    "tomato_cooked": "Приготовленный томат",
    "onion_cooked": "Приготовленный лук",
    "meat_cooked": "Приготовленное мясо",
    "monstermeat_cooked": "Приготовленное мясо монстра",
    "smallmeat_cooked": "Приготовленное маленькое мясо",
    "cutlichen_cooked": "Приготовленный лишайник",
    "pondeel_cooked": "Приготовленный угорь",
    "batnose_dried": "Сушёные ноздри",
}

FOODTYPE_LABELS = {
    "MEAT": "Мясо", "VEGGIE": "Овощи", "GOODIES": "Сладости",
    "ELEMENTAL": "Элементаль", "GENERIC": "Еда", "FISH": "Рыба",
}


def parse_po_names() -> dict[str, str]:
    names: dict[str, str] = {}
    if not SCRIPTS_ZIP.exists():
        return names
    with zipfile.ZipFile(SCRIPTS_ZIP) as z:
        text = z.read("scripts/languages/russian.po").decode("utf-8", "replace")
    ctx = None
    value = None
    field = None
    for line in text.splitlines():
        if line.startswith("msgctxt "):
            ctx = line.split('"', 2)[1] if '"' in line else ""
            value = None
            field = None
        elif line.startswith("msgid "):
            field = "id"
        elif line.startswith("msgstr "):
            field = "str"
            value = line.split('"', 2)[1] if '"' in line else ""
        elif line.startswith('"') and field == "str":
            value = (value or "") + line.split('"', 2)[1]
        elif not line.strip():
            if ctx and ctx.startswith("STRINGS.NAMES.") and value:
                key = ctx[len("STRINGS.NAMES."):]
                value = value.replace("\\n", "\n").replace('\\"', '"').replace("\\\\", "\\")
                names[key] = value
            ctx = None
            value = None
            field = None
    return names


def prettify(prefab: str) -> str:
    s = (prefab or "").replace("_", " ").strip()
    return s[:1].upper() + s[1:] if s else "?"


def name_keys(prefab: str) -> list[str]:
    keys = [prefab.upper()]
    base = re.sub(r"_(inv|cooked|dried)$", "", prefab, flags=re.I)
    if base.upper() != prefab.upper():
        keys.append(base.upper())
    return keys


def names_for(prefab: str, en: dict[str, str], ru: dict[str, str]) -> tuple[str, str]:
    for key in name_keys(prefab):
        en_name = en.get(key)
        ru_name = ru.get(key)
        if en_name and "%" not in en_name:
            return ru_name or en_name, en_name
        if ru_name:
            return ru_name, en_name or prettify(prefab)
    return prettify(prefab), prettify(prefab)


def script_text(name: str) -> str:
    if SCRIPTS_ZIP.exists():
        with zipfile.ZipFile(SCRIPTS_ZIP) as z:
            return z.read("scripts/" + name).decode("utf-8", "ignore")
    raise SystemExit("Не найден scripts.zip: " + str(SCRIPTS_ZIP))


def parse_blocks(text: str):
    lines = text.splitlines()
    out = []
    i = 0
    while i < len(lines):
        m = re.match(r"^(\s+)([a-z0-9_]+)\s*=\s*$", lines[i])
        if not m:
            i += 1
            continue
        indent, name = m.group(1), m.group(2)
        j = i + 1
        while j < len(lines) and not lines[j].strip():
            j += 1
        if j >= len(lines) or lines[j].strip() != "{":
            i += 1
            continue
        close = indent + "},"
        k = j
        while k < len(lines) and lines[k].rstrip() != close:
            k += 1
        if k >= len(lines):
            i += 1
            continue
        out.append((name, "\n".join(lines[j:k + 1])))
        i = k + 1
    return out


def field(block: str, key: str):
    m = re.search(r"\b" + re.escape(key) + r"\s*=\s*([^,\n]+)", block)
    return m.group(1).strip() if m else None


def number(expr, default=0.0):
    if expr is None:
        return default
    if expr == "nil":
        return None
    e = expr.replace("TUNING.", "T_")
    env = {"__builtins__": {}, "math": math}
    env.update({"T_" + k: v for k, v in TUNING.items()})
    try:
        v = eval(e, env)  # noqa: S307 - данные из игры, не пользовательский ввод
        return float(v)
    except Exception:
        return default


def js_test(expr: str) -> str:
    e = expr.strip()
    e = e.replace("~=", "!=")
    e = re.sub(r"\bnot\b", "!", e)
    e = re.sub(r"\band\b", "&&", e)
    e = re.sub(r"\bor\b", "||", e)
    e = e.replace("nil", "null")
    return e


def group_for(tags: dict) -> str:
    if tags.get("fish"):
        return "fish"
    if tags.get("monster"):
        return "monster"
    if tags.get("meat"):
        return "meat"
    if tags.get("veggie"):
        return "veggie"
    if tags.get("fruit"):
        return "fruit"
    if tags.get("egg"):
        return "egg"
    if tags.get("dairy"):
        return "dairy"
    if tags.get("sweetener"):
        return "sweet"
    if tags.get("fat"):
        return "fat"
    if tags.get("frozen"):
        return "frozen"
    if tags.get("seed"):
        return "seed"
    if tags.get("inedible"):
        return "inedible"
    if tags.get("decoration"):
        return "decoration"
    if tags.get("magic"):
        return "magic"
    return "other"


def icon_for(prefab: str) -> str:
    for name in (prefab, ICON_ALIASES.get(prefab)):
        if not name:
            continue
        for base, ext in ((COOK_ICONS, ".webp"), (CRAFT_ICONS, ".webp"), (ITEM_ICONS, ".png")):
            p = base / (name + ext)
            if p.exists():
                return str(p.relative_to(ROOT)).replace("\\", "/")
    return ""


def main() -> int:
    en_names = (json.loads(META.read_text(encoding="utf-8")).get("names") or {})
    ru_names = parse_po_names()
    raw_ing = json.loads(INGREDIENTS.read_text(encoding="utf-8"))
    examples = json.loads(EXAMPLES.read_text(encoding="utf-8")) if EXAMPLES.exists() else {}

    ingredients = {}
    for prefab, data in raw_ing.items():
        tags = {k: float(v) for k, v in (data.get("tags") or {}).items()}
        name_ru, name_en = names_for(prefab, en_names, ru_names)
        if prefab in NAME_OVERRIDES:
            name_ru = NAME_OVERRIDES[prefab]
        ingredients[prefab] = {
            "id": prefab,
            "name": name_ru,
            "name_en": name_en,
            "tags": tags,
            "group": group_for(tags),
            "icon": icon_for(prefab),
        }

    recipes = []
    for fname in ("preparedfoods.lua", "preparednonfoods.lua"):
        for rid, block in parse_blocks(script_text(fname)):
            tm = re.search(r"test\s*=\s*function\s*\([^)]*\)(.*?)\bend\s*,", block, re.S)
            if not tm:
                continue
            body = tm.group(1)
            body = re.sub(r"--\[\[.*?\]\]", "", body, flags=re.S)
            body = re.sub(r"--[^\n]*", "", body)
            if "return" not in body:
                continue
            expr = " ".join(body.split("return", 1)[1].split()).strip().rstrip(";")
            card = [[m.group(1), int(m.group(2))] for m in re.finditer(r'\{\{"([^"]+)",\s*(\d+)\}', block)]
            name_ru, name_en = names_for(rid, en_names, ru_names)
            if rid in NAME_OVERRIDES:
                name_ru = NAME_OVERRIDES[rid]
            icon = icon_for(rid)
            ft = re.search(r"FOODTYPE\.([A-Z_]+)", block)
            perish = number(field(block, "perishtime"), None)
            cooktime = number(field(block, "cooktime"), 1.0)
            recipes.append({
                "id": rid,
                "name": name_ru,
                "name_en": name_en,
                "priority": number(field(block, "priority"), 0.0),
                "weight": number(field(block, "weight"), 1.0),
                "health": number(field(block, "health"), 0.0),
                "hunger": number(field(block, "hunger"), 0.0),
                "sanity": number(field(block, "sanity"), 0.0),
                "perish": perish,
                "perish_days": round(perish / 480.0, 2) if perish else None,
                "cooktime": cooktime,
                "cooktime_sec": round(cooktime * 20),
                "foodtype": FOODTYPE_LABELS.get(ft.group(1), ft.group(1)) if ft else "",
                "icon": icon,
                "example": examples.get(rid, card),
                "_test": js_test(expr),
            })

    recipes.sort(key=lambda r: r["name"])
    payload = {
        "groups": [{"id": gid, "name": name} for gid, name in GROUP_ORDER],
        "ingredients": ingredients,
        "recipes": recipes,
    }

    # JS с функциями тестов
    js = ["/* Сгенерировано tools/build_cooking.py — не править вручную */",
          "window.COOK_DATA = {",
          '"groups":' + json.dumps(payload["groups"], ensure_ascii=False, separators=(",", ":")),
          ',"ingredients":' + json.dumps(ingredients, ensure_ascii=False, separators=(",", ":")),
          ',"recipes":[']
    for i, r in enumerate(recipes):
        meta = {k: v for k, v in r.items() if k != "_test"}
        chunk = json.dumps(meta, ensure_ascii=False, separators=(",", ":"))[:-1]
        chunk += ',"test":function(names,tags){return ' + r["_test"] + ';}}'
        js.append(("" if i == 0 else ",") + chunk)
    js.append("]};")
    OUT.write_text("\n".join(js) + "\n", encoding="utf-8")

    needed = sorted(set(ingredients) | {r["id"] for r in recipes} | EXTRA_ICONS)
    ICON_LIST.write_text(json.dumps(needed, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"written {OUT}: {len(ingredients)} ingredients, {len(recipes)} recipes")
    print(f"icons needed: {len(needed)} -> {ICON_LIST}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
