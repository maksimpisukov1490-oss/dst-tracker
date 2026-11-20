#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает js/craft.js из рецептов игры и русских строк.

Вход:
  tools/recipes_raw.json   — выгрузка Recipe/Recipe2 (tools/extract_recipes.lua)
  tools/recipe_meta.json   — STRINGS.NAMES и фильтры крафта
  scripts/languages/russian.po — русская локализация (из scripts.zip)

Выход:
  js/craft.js
"""
from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "tools" / "recipes_raw.json"
META = ROOT / "tools" / "recipe_meta.json"
PO = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/scripts/languages/russian.po")
PO_ZIP = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/scripts.zip")
OUT = ROOT / "js" / "craft.js"
ICON_DIR = ROOT / "assets" / "craft-v2"
ITEM_DIR = ROOT / "assets" / "items"

CATEGORY_ORDER = [
    ("tools", "Инструменты"),
    ("light", "Свет"),
    ("prototypers", "Прототипы"),
    ("refine", "Переработка"),
    ("weapons", "Оружие"),
    ("armour", "Броня"),
    ("clothing", "Одежда"),
    ("restoration", "Лечение"),
    ("magic", "Магия"),
    ("decor", "Декор"),
    ("structures", "Постройки"),
    ("containers", "Контейнеры"),
    ("cooking", "Еда"),
    ("gardening", "Садоводство"),
    ("fishing", "Рыбалка"),
    ("seafaring", "Мореходство"),
    ("riding", "Верховая езда"),
    ("winter", "Зима"),
    ("summer", "Лето"),
    ("rain", "Дождь"),
    ("character", "Персонажи"),
    ("event", "События"),
    ("other", "Прочее"),
]

FILTER_TO_CATEGORY = {
    "TOOLS": "tools",
    "LIGHT": "light",
    "PROTOTYPERS": "prototypers",
    "REFINE": "refine",
    "WEAPONS": "weapons",
    "ARMOUR": "armour",
    "CLOTHING": "clothing",
    "RESTORATION": "restoration",
    "MAGIC": "magic",
    "DECOR": "decor",
    "STRUCTURES": "structures",
    "CONTAINERS": "containers",
    "COOKING": "cooking",
    "GARDENING": "gardening",
    "FISHING": "fishing",
    "SEAFARING": "seafaring",
    "RIDING": "riding",
    "WINTER": "winter",
    "SUMMER": "summer",
    "RAIN": "rain",
    "CHARACTER": "character",
    "SPECIAL_EVENT": "event",
}

TECH_LABELS = {
    "SCIENCE": "Научная машина",
    "MAGIC": "Престидижитатор",
    "ANCIENT": "Древний алтарь",
    "CELESTIAL": "Небесный алтарь",
    "SHADOW": "Теневой алтарь",
    "CARTOGRAPHY": "Картографический стол",
    "SEAFARING": "Морской стол",
    "SCULPTING": "Скульптурный стол",
    "FOODPROCESSING": "Пряности",
    "FISHING": "Рыболовный стол",
    "HERMITCRABSHOP": "Лавка отшельницы",
    "HERMITCRAB_TEASHOP": "Чайная отшельницы",
    "SHELLWEAVER": "Ракушечный ткач",
    "RABBITKINGSHOP": "Король кроликов",
    "CARNIVAL_PRIZESHOP": "Карнавал",
    "CARNIVAL_HOSTSHOP": "Карнавал",
    "CARNIVAL_GOLFPROPS": "Карнавал",
    "MADSCIENCE": "Безумная наука",
    "ORPHANAGE": "Приют",
    "VAULT_REFINER": "Хранилище",
    "VAULT_REFINE": "Хранилище",
    "BOOKCRAFT": "Книжный стол",
    "CARPENTRY": "Столярный стол",
    "LUNARFORGING": "Лунная кузня",
    "SHADOWFORGING": "Теневая кузня",
    "MASHTURFCRAFTING": "Стол дёрна",
    "ROBOTMODULECRAFT": "Модули WX-78",
    "SPIDERCRAFT": "Паучий стол",
    "TURFCRAFTING": "Стол дёрна",
    "WAGPUNK_WORKSTATION": "Верстак Вагстафа",
    "WINTERSFEASTCOOKING": "Праздничная кухня",
    "PERDOFFERING": "Подношение",
    "WARGOFFERING": "Подношение",
    "PIGOFFERING": "Подношение",
    "CARRATOFFERING": "Подношение",
    "BEEFOFFERING": "Подношение",
    "CATCOONOFFERING": "Подношение",
    "RABBITOFFERING": "Подношение",
    "DRAGONOFFERING": "Подношение",
    "WORMOFFERING": "Подношение",
    "KNIGHTOFFERING": "Подношение",
}

BUILDER_LABELS = {
    "wilson": "Уилсон",
    "willow": "Уиллоу",
    "wolfgang": "Вольфганг",
    "wendy": "Венди",
    "wx78": "WX-78",
    "wickerbottom": "Уикерботтом",
    "woodie": "Вуди",
    "wes": "Уэс",
    "maxwell": "Максвелл",
    "wigfrid": "Вигфрид",
    "webber": "Веббер",
    "warly": "Уорли",
    "wortox": "Вортокс",
    "wormwood": "Вормвуд",
    "winona": "Уинона",
    "wurt": "Вурт",
    "walter": "Уолтер",
    "wanda": "Ванда",
    "pyromaniac": "Уиллоу",
    "masterchef": "Уорли",
    "professionalchef": "Уорли",
    "handyperson": "Уинона",
    "portableengineer": "Уинона",
    "shadowmagic": "Максвелл",
    "wathgrithr": "Вигфрид",
    "waxwell": "Максвелл",
    "merm_builder": "Вурт",
    "ghostlyfriend": "Венди",
    "elixirbrewer": "Венди",
    "werehuman": "Вуди",
    "valkyrie": "Вигфрид",
    "battlesinger": "Вигфрид",
    "pebblemaker": "Уолтер",
    "pinetreepioneer": "Уолтер",
    "strongman": "Вольфганг",
    "bookbuilder": "Уикерботтом",
    "spiderwhisperer": "Веббер",
    "plantkin": "Вормвуд",
    "clockmaker": "Ванда",
    "balloonomancer": "Уэс",
    "upgrademoduleowner": "WX-78",
}

# Тег строителя -> ключ персонажа из window.CHARACTERS.
BUILDER_CHARS = {
    "wilson": "wilson", "willow": "willow", "wolfgang": "wolfgang",
    "wendy": "wendy", "wx78": "wx78", "wickerbottom": "wickerbottom",
    "woodie": "woodie", "wes": "wes", "maxwell": "maxwell",
    "wigfrid": "wigfrid", "warly": "warly", "webber": "webber",
    "wortox": "wortox", "wormwood": "wormwood", "winona": "winona",
    "wurt": "wurt", "walter": "walter", "wanda": "wanda",
    "pyromaniac": "willow",
    "masterchef": "warly",
    "professionalchef": "warly",
    "handyperson": "winona",
    "portableengineer": "winona",
    "shadowmagic": "maxwell",
    "wathgrithr": "wigfrid",
    "waxwell": "maxwell",
    "merm_builder": "wurt",
    "ghostlyfriend": "wendy",
    "elixirbrewer": "wendy",
    "werehuman": "woodie",
    "valkyrie": "wigfrid",
    "battlesinger": "wigfrid",
    "pebblemaker": "walter",
    "pinetreepioneer": "walter",
    "strongman": "wolfgang",
    "bookbuilder": "wickerbottom",
    "spiderwhisperer": "webber",
    "plantkin": "wormwood",
    "clockmaker": "wanda",
    "balloonomancer": "wes",
    "upgrademoduleowner": "wx78",
}

CHARACTER_INGREDIENTS = {
    "decrease_health": "Здоровье",
    "half_health": "Макс. здоровье",
    "decrease_sanity": "Рассудок",
    "half_sanity": "Макс. рассудок",
    "decrease_oldage": "Старость",
    "sculpting_material": "Материал скульптора",
}


def parse_po_names() -> dict[str, str]:
    names: dict[str, str] = {}
    if PO.exists():
        text = PO.read_text(encoding="utf-8", errors="replace")
    elif PO_ZIP.exists():
        with zipfile.ZipFile(PO_ZIP) as z:
            text = z.read("scripts/languages/russian.po").decode("utf-8", "replace")
    else:
        return names
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
    if not s:
        return "?"
    return s[0].upper() + s[1:]


def pick_name(prefab: str, meta_names: dict, po_names: dict, override: str | None) -> tuple[str, str]:
    candidates = []
    if override:
        candidates.append(override)
    if prefab:
        candidates.append(prefab)
    for key in candidates:
        up = key.upper()
        en = meta_names.get(up)
        if en and "%" not in en:
            ru = po_names.get(up) or en
            return ru, en
    base = prettify(override or prefab)
    return base, base


def tech_text(tech: dict) -> str:
    if not tech:
        return "Руками"
    labels = []
    for key, value in tech.items():
        if key == "NONE":
            continue
        label = TECH_LABELS.get(key)
        if label:
            if label not in labels:
                labels.append(label)
        else:
            item = "%s %s" % (key.title(), value)
            if item not in labels:
                labels.append(item)
    return " · ".join(labels) or "Руками"


def builder_text(tag: str | None) -> str:
    if not tag:
        return ""
    return BUILDER_LABELS.get(tag, "")


def categories_for(name: str, filters: dict) -> list[str]:
    found = []
    for filter_name, cat in FILTER_TO_CATEGORY.items():
        if name in filters.get(filter_name, []):
            found.append(cat)
    if not found:
        return ["other"]
    order = {cid: i for i, (cid, _) in enumerate(CATEGORY_ORDER)}
    return sorted(set(found), key=lambda c: order.get(c, 999))


def icon_path(prefab: str) -> str:
    for base, ext in ((ICON_DIR, ".webp"), (ITEM_DIR, ".png")):
        path = base / (prefab + ext)
        if path.exists():
            return str(path.relative_to(ROOT)).replace("\\", "/")
    return ""


def main() -> int:
    raw = json.loads(RAW.read_text(encoding="utf-8"))
    meta = json.loads(META.read_text(encoding="utf-8"))
    meta_names = meta.get("names") or {}
    filters = {k: set(v) for k, v in (meta.get("filters") or {}).items()}
    po_names = parse_po_names()

    recipes = {}
    by_product = {}
    tree_by_product = {}
    used_in = {}
    seen = set()
    counts = {cid: 0 for cid, _ in CATEGORY_ORDER}

    for r in raw:
        rid = r.get("name")
        if not rid or rid in seen:
            continue
        seen.add(rid)
        if re.search(r"shop|trade", rid, re.I):
            continue
        ings_raw = r.get("ingredients") or []
        if not ings_raw:
            continue
        product = r.get("product") or rid
        name_ru, name_en = pick_name(product, meta_names, po_names, r.get("nameoverride"))
        cats = categories_for(rid, filters)
        if not cats:
            cats = ["other"]
        cat = cats[0]

        ingredients = []
        for ing in ings_raw:
            typ = ing.get("type") or ""
            qty = int(ing.get("amount") or 0)
            if typ in CHARACTER_INGREDIENTS:
                ingredients.append({
                    "id": typ,
                    "name": CHARACTER_INGREDIENTS[typ],
                    "qty": qty,
                    "kind": "character",
                    "icon": "",
                })
                continue
            ing_ru, ing_en = pick_name(typ, meta_names, po_names, None)
            ingredients.append({
                "id": typ,
                "name": ing_ru,
                "name_en": ing_en,
                "qty": qty,
                "kind": "item",
                "icon": icon_path(typ),
            })

        recipes[rid] = {
            "id": rid,
            "name": name_ru,
            "name_en": name_en,
            "product": product,
            "category": cat,
            "categories": cats,
            "tech": r.get("tech") or {},
            "tech_text": tech_text(r.get("tech") or {}),
            "builder": r.get("builder_tag") or "",
            "builder_text": builder_text(r.get("builder_tag")),
            "builder_char": BUILDER_CHARS.get(r.get("builder_tag") or "", ""),
            "icon": icon_path(product),
            "ingredients": ingredients,
        }
        for c in cats:
            counts[c] = counts.get(c, 0) + 1

        if product not in by_product:
            by_product[product] = rid
        elif recipes[by_product[product]]["category"] in ("character", "event") and cat not in ("character", "event"):
            by_product[product] = rid

        if cat not in ("character", "event", "other") and not re.search(r"transmute", rid, re.I):
            if product not in tree_by_product:
                tree_by_product[product] = rid

        for ing in ingredients:
            if ing["kind"] != "item":
                continue
            used_in.setdefault(ing["id"], [])
            if rid not in used_in[ing["id"]]:
                used_in[ing["id"]].append(rid)

    categories = [{"id": "all", "name": "Все рецепты", "count": len(recipes)}]
    for cid, label in CATEGORY_ORDER:
        if counts.get(cid, 0) > 0:
            categories.append({"id": cid, "name": label, "count": counts[cid]})

    payload = {
        "categories": categories,
        "recipes": recipes,
        "by_product": by_product,
        "tree_by_product": tree_by_product,
        "used_in": used_in,
    }
    OUT.write_text(
        "/* Сгенерировано tools/build_craft.py — не править вручную */\n"
        "window.CRAFT_DATA = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print("written %s: %d recipes, %d categories" % (OUT, len(recipes), len(categories)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
