#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает js/data.js из tools/web_*.json + русских текстов tools/texts_ru.py.

Запуск:  python3 tools/build_data.py
"""
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

import texts_ru  # noqa: E402
import milestones  # noqa: E402
import names_ru  # noqa: E402
import quotes_ru  # noqa: E402
import drops_chance  # noqa: E402

# порядок и русские имена персонажей для блока цитат
CHAR_ORDER = [
    ("wilson", "Уилсон"), ("willow", "Уиллоу"), ("wolfgang", "Вольфганг"),
    ("wendy", "Венди"), ("wx78", "WX-78"), ("wickerbottom", "Уикерботтом"),
    ("woodie", "Вуди"), ("wes", "Уэс"), ("maxwell", "Максвелл"),
    ("wigfrid", "Вигфрид"), ("webber", "Веббер"), ("warly", "Уорли"),
    ("wortox", "Вортокс"), ("wormwood", "Вормвуд"), ("winona", "Уинона"),
    ("wurt", "Вурт"), ("walter", "Уолтер"), ("wanda", "Ванда"),
]

CATEGORIES = [
    {"id": "all", "name": "Все чудовища", "short": "Все", "icon": "✦",
     "hint": "Полный список: от сезонных гигантов до тварей из разломов"},
    {"id": "giants", "name": "Сезонные гиганты", "short": "Гиганты", "icon": "❄",
     "hint": "Приходят сами со сменой сезона — от них не спрятаться"},
    {"id": "raid", "name": "Рейдовые боссы", "short": "Рейд", "icon": "☠",
     "hint": "Те, к кому ходят специально: долгая подготовка, большая добыча"},
    {"id": "rift", "name": "Твари разломов", "short": "Разломы", "icon": "✧",
     "hint": "Новое зло из лунных и теневых разломов"},
    {"id": "mini", "name": "Мини-боссы", "short": "Мини", "icon": "❖",
     "hint": "Мелкие, но злые: могут испортить прогулку"},
    {"id": "progress", "name": "Прогресс", "short": "Прогресс", "icon": "◈",
     "hint": "Параметры прохождения на 100%: боссы, вехи и пять квестовых веток по двум путям — лунному (отшельница, Вагстаф, Небесный защитник) и теневому (Чарли, Древний топливопряд)"},
    {"id": "chronicle", "name": "Хроника охоты", "short": "Хроника", "icon": "✒",
     "hint": "Все победы по порядку — от первой до последней"}
]

# порядок и категории записей в компендиуме
ORDER = [
    ("deerclops", "giants"), ("bearger", "giants"), ("moose_goose", "giants"), ("dragonfly", "giants"),
    ("bee_queen", "raid"), ("klaus", "raid"), ("toadstool", "raid"), ("antlion", "raid"),
    ("malbatross", "raid"), ("crab_king", "raid"), ("ancient_fuelweaver", "raid"),
    ("celestial_champion", "raid"), ("eye_of_terror", "raid"), ("twins_of_terror", "raid"),
    ("shadow_pieces", "raid"), ("nightmare_werepig", "raid"), ("scrappy_werepig", "raid"),
    ("frostjaw", "raid"), ("lord_of_the_fruit_flies", "raid"), ("ancient_guardian", "raid"),
    ("great_depths_worm", "raid"), ("ancient_guard_tower", "raid"),
    ("armored_bearger", "rift"), ("crystal_deerclops", "rift"), ("possessed_varg", "rift"),
    ("umbral_abomination", "rift"), ("celestial_scion", "rift"), ("celestial_revenant", "rift"),
    ("warbot", "rift"), ("shrouded_queen", "rift"),
    ("spider_queen", "mini"), ("treeguard", "mini"), ("varg", "mini"),
    ("ewecus", "mini"), ("krampus", "mini"), ("reanimated_skeleton", "mini"),
]

ITEMS_RU = {
    "meat": "Мясо", "monster meat": "Мясо монстра", "cooked meat": "Жареное мясо",
    "morsel": "Кусочек мяса", "raw fish": "Сырая рыба", "fish": "Рыба",
    "drumstick": "Окорок", "frog legs": "Лягушачьи лапки", "leafy meat": "Листовое мясо",
    "spoiled fish": "Испорченная рыба", "milky whites": "Молочные белки",
    "honey": "Мёд", "honeycomb": "Соты", "royal jelly": "Королевское желе",
    "bee queen crown": "Корона пчелиной королевы", "stinger": "Жало",
    "deerclops eyeball": "Глаз циклопа-оленя", "thick fur": "Плотный мех",
    "fur tuft": "Клок шерсти", "bearger fur": "Шерсть баргера",
    "stag antler": "Олений рог", "down feather": "Пуховое перо",
    "malbatross bill": "Клюв мальбатроса", "malbatross feather": "Перо мальбатроса",
    "sketch": "Набросок", "blueprint": "Чертёж", "blueprint for vortex cloak": "Чертёж: плащ вихря",
    "blueprint for bundling wrap": "Чертёж: упаковочная обёртка",
    "blueprint for living artifact": "Чертёж: живой артефакт",
    "blue gem": "Синий самоцвет", "red gem": "Красный самоцвет",
    "purple gem": "Фиолетовый самоцвет", "green gem": "Зелёный самоцвет",
    "orange gem": "Оранжевый самоцвет", "yellow gem": "Жёлтый самоцвет",
    "gold nugget": "Золотой самородок", "rocks": "Камни", "desert stone": "Камень пустыни",
    "trinkets": "Безделушки", "trinket": "Безделушка", "ice": "Лёд", "rot": "Гниль",
    "seeds": "Семена", "plant seeds": "Семена растений", "flower": "Цветок",
    "scales": "Чешуя", "lavae egg": "Яйцо лавовой личинки",
    "nightmare fuel": "Кошмарное топливо", "pure horror": "Чистый ужас",
    "pure brilliance": "Чистое сияние", "dark tatters": "Тёмные лохмотья",
    "dreadstone": "Камень ужаса", "dreadstone helm": "Шлем из камня ужаса",
    "dreadstone armor": "Броня из камня ужаса", "dreadstone wall": "Стена из камня ужаса",
    "dreadstone pillar scaffold": "Каркас колонны ужаса",
    "fossils": "Окаменелости", "shadow atrium": "Теневой атриум",
    "shadow thurible": "Теневое кадило", "bone helm": "Костяной шлем",
    "bone armor": "Костяная броня", "guardian's horn": "Рог стража",
    "ornate chest": "Резной сундук", "pillar scaffold": "Каркас колонны",
    "moon rock": "Лунный камень", "moon shard": "Лунный осколок",
    "infused moon shard": "Заряженный лунный осколок",
    "enlightened crown shard": "Осколок короны просветления",
    "celestial jewel": "Небесный самоцвет", "glove": "Перчатка", "clipboard": "Планшет",
    "frazzled wires": "Оборванные провода", "electrical doodad": "Электрическая штуковина",
    "gears": "Шестерёнки", "gear": "Шестерёнка", "scrap": "Хлам",
    "shield of terror": "Щит ужаса", "eye mask": "Маска-глаз",
    "nucleation fluid": "Жидкость нуклеации", "spark ark": "Искровой ковчег",
    "crab king bumper kit": "Набор бампера крабьего короля",
    "soprano shell bell": "Раковинный колокол-сопрано",
    "alto shell bell": "Раковинный колокол-альт",
    "baritone shell bell": "Раковинный колокол-баритон",
    "barnacles": "Ракушки", "cracked pearl": "Треснувшая жемчужина",
    "message in a bottle": "Послание в бутылке",
    "spider gland": "Паучья железа", "silk": "Шёлк", "spider eggs": "Паучьи яйца",
    "spiderhat": "Паучья шляпа", "living log": "Живой ствол", "coconut": "Кокос",
    "hound's tooth": "Зуб гончей", "krampus sack": "Мешок Крампуса",
    "charcoal": "Уголь", "steel wool": "Стальная шерсть", "phlegm": "Слизь",
    "manure": "Навоз", "red cap": "Красный гриб", "green cap": "Зелёный гриб",
    "blue cap": "Синий гриб", "blue spore": "Синяя спора", "green spore": "Зелёная спора",
    "red spore": "Красная спора", "shroom skin": "Грибная кожа",
    "glow berry": "Светящаяся ягода", "friendly fruit fly fruit": "Фрукт дружелюбной мушки",
    "turbine blades": "Лопасти турбины", "seal": "Печать", "magic seal": "Магическая печать",
    "chest of the depths": "Сундук глубин", "booty bag": "Мешок добычи",
    "quacken beak": "Клюв крякена", "iron key": "Железный ключ",
    "eye of the tiger shark": "Глаз тигровой акулы", "shark gills": "Акульи жабры",
    "snake bone": "Змеиная кость", "bone shards": "Костные осколки",
    "petrifying bones": "Окаменевающие кости", "iron ore": "Железная руда",
    "infused iron": "Заряженное железо", "chitin": "Хитин", "royal crown": "Королевская корона",
    "stalacmite throne": "Трон из сталактитов", "thulecite": "Тулецит",
    "thulecite fragments": "Осколки тулецита", "guard tower core": "Ядро сторожевой башни",
    "spark socket": "Гнездо для искры", "cranky articulator": "Ворчливый артикулятор",
    "horizon expandinator": "Расширитель горизонта", "auto-mat-o-chanic": "Авто-мат-о-чаник",
    "scrappy chapauldron": "Ржавый шлем-котёл",
    "w.a.r.b.i.s. head gear": "Шлем В.А.Р.Б.И.С.", "w.a.r.b.i.s. armor": "Броня В.А.Р.Б.И.С.",
    "elastispacer": "Эластиспейсер",
    "w.a.r.b.o.t. sketch": "Набросок В.О.И.Н.Б.О.Т.",
    "bootleg getaway": "Контрабандный побег",
    "nightmare werepig sketch": "Набросок: Кошмарный свин-оборотень",
    "celestial scion sketch": "Набросок: Небесный отпрыск",
    "shrouded queen figure sketch": "Набросок: Маренная королева",
    "ancient guard tower figure sketch": "Набросок: Древняя башня",
    "inactive celestial tribute": "Неактивная небесная дань",
    "turf-raiser helm": "Шлем-подъёмник дёрна",
    "kelp fronds": "Ламинария", "cannonball": "Пушечное ядро",
    "king's staff": "Посох короля", "spark ark off": "Искровой ковчег (пустой)",
    "queen's torch": "Факел королевы", "queen's visage": "Лик королевы",
    "night armour": "Ночная броня", "night armor": "Ночная броня",
    "dark sword": "Тёмный меч", "blueprint (rare)": "Редкий чертёж",
    "night sword": "Тёмный меч",
}


def tr_item(s):
    s = s.strip()
    m = re.match(r"^(.*?)(\s+x[\d\-–]+)?$", s)
    name, cnt = (m.group(1), m.group(2)) if m else (s, "")
    key = name.lower().strip()
    ru = ITEMS_RU.get(key, name)
    if cnt:
        cnt = cnt.strip().replace("x", "×").replace("-", "–")
        return ru + " " + cnt
    return ru


def item_icon(name):
    fname = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_") + ".png"
    if os.path.exists(os.path.join(ROOT, "assets", "items", fname)):
        return "assets/items/" + fname
    return ""


def strip_qty(s):
    m = re.match(r"^(.*?)\s+x\s*(\d+(?:\s*[-–]\s*\d+)?)$", s.strip(), re.I)
    if m:
        return m.group(1).strip(), "×" + re.sub(r"\s+", "", m.group(2)).replace("-", "–")
    return s.strip(), ""


def norm_item(en):
    """Убирает служебные хвосты вида «/DST», « DST» и «(DST)» из имён предметов."""
    s = re.sub(r"\s*/\s*DST\s*$", "", en, flags=re.I)
    s = re.sub(r"\s*\(DST\)\s*$", "", s, flags=re.I)
    s = re.sub(r"\s+DST\s*$", "", s, flags=re.I)
    return s.strip()


def build_loot(slug, override, wq, b):
    """Список предметов добычи: {ru, en, qty, icon, chance}. override — ручной текст."""
    if override is not None:
        return [{"ru": p.strip(), "en": "", "qty": "", "icon": "", "chance": ""}
                for p in re.split(r"[,;]", override) if p.strip()]
    out, seen = [], set()

    def add(orig, qty):
        if re.match(r"^x\s*\d+$", (orig or "").strip(), re.I):
            return
        en = norm_item(str(orig or ""))
        key = en.lower()
        if not key:
            return
        ru = ITEMS_RU.get(key, en)
        if not ru or ru.lower() in seen:
            return
        seen.add(ru.lower())
        out.append({"ru": ru, "en": en, "qty": qty or "", "icon": item_icon(en),
                    "chance": drops_chance.chance_for(slug, key)})

    # сначала точные данные из отдельного скрейпа добычи, затем — из карточки босса
    for it in (wq.get(slug) or {}).get("drops") or []:
        add(it.get("en", ""), it.get("qty", ""))
    for d in b.get("drops") or []:
        en, qty = strip_qty(str(d))
        add(en, qty)
    return out


def build_quotes(slug, wq):
    en = (wq.get(slug) or {}).get("quotes") or {}
    ru = quotes_ru.QUOTES_RU.get(slug) or {}
    out = []
    for key, name in CHAR_ORDER:
        txt = (ru.get(key) or en.get(key) or "").strip()
        if txt:
            head = "assets/chars/%s.png" % key
            if not os.path.exists(os.path.join(ROOT, head)):
                head = ""
            out.append({"key": key, "name": name, "text": txt, "head": head})
    return out


def clean_drops(arr):
    out = []
    for d in arr or []:
        s = tr_item(str(d))
        if s and s not in out:
            out.append(s)
    return ", ".join(out[:10])


def build():
    web = {}
    for f in sorted(glob.glob(os.path.join(HERE, "web_*.json"))):
        if f.endswith("web_quotes.json"):
            continue
        for b in json.load(open(f, encoding="utf-8")):
            web[b["slug"]] = b

    wq = {}
    wq_path = os.path.join(HERE, "web_quotes.json")
    if os.path.exists(wq_path):
        wq = json.load(open(wq_path, encoding="utf-8"))

    missing = []
    out = []
    for slug, cat in ORDER:
        b = web.get(slug)
        if not b:
            missing.append(slug)
            continue
        t = texts_ru.TEXTS.get(slug, {})
        art = os.path.exists(os.path.join(ROOT, "assets", "bosses", slug + ".png"))
        def field(name):
            # значение можно переопределить в texts_ru.py (если с вики пусто или неточно)
            if name in t:
                return str(t.get(name) or "").strip()
            return str(b.get(name) or "").strip()

        out.append({
            "slug": slug,
            "name_ru": t.get("name_ru") or names_ru.NAMES_RU.get(slug) or b.get("name_en", slug),
            "name_en": t.get("name_en", b.get("name_en", "")),
            "category": cat,
            "hp": field("hp"),
            "damage": field("damage"),
            "planar_damage": field("planar_damage"),
            "attack_period": field("attack_period"),
            "attack_range": field("attack_range"),
            "speed": field("speed"),
            "sanity": field("sanity").replace("/min", "/мин"),
            "drops": t.get("drops") if "drops" in t else clean_drops(b.get("drops")),
            "loot": build_loot(slug, t.get("drops"), wq, b),
            "quotes": build_quotes(slug, wq),
            "lore": t.get("lore", ""),
            "spawn": t.get("spawn", ""),
            "source": (b.get("source_game") or "").replace("Don't Starve Together", "DST"),
            "art": art,
        })
        if t.get("variants"):
            rec = out[-1]
            rec["variants"] = t["variants"]
            for lv in rec["variants"].get("loot", []):
                if lv.get("en"):
                    lv["icon"] = item_icon(lv["en"])

    js = "/* Файл собран автоматически: tools/build_data.py — тексты правь в tools/texts_ru.py */\n"
    js += "window.CATEGORIES = " + json.dumps(CATEGORIES, ensure_ascii=False, indent=2) + ";\n\n"
    js += "window.BOSSES = " + json.dumps(out, ensure_ascii=False, indent=2) + ";\n\n"
    chars = []
    for key, name in CHAR_ORDER:
        head = "assets/chars/%s.png" % key
        if os.path.exists(os.path.join(ROOT, head)):
            chars.append({"key": key, "name": name, "head": head})
    js += "window.CHARACTERS = " + json.dumps(chars, ensure_ascii=False, indent=2) + ";\n\n"
    js += "window.MILESTONE_BRANCHES = " + json.dumps(milestones.BRANCHES, ensure_ascii=False, indent=2) + ";\n\n"
    js += "window.MILESTONES = " + json.dumps(milestones.MILESTONES, ensure_ascii=False, indent=2) + ";\n"
    open(os.path.join(ROOT, "js", "data.js"), "w", encoding="utf-8").write(js)

    print("js/data.js:", len(out), "записей; с картинками:", sum(1 for e in out if e["art"]))
    nq = sum(1 for e in out if e["quotes"])
    nl = sum(1 for e in out if e["loot"])
    ni = sum(1 for e in out for l in e["loot"] if l["icon"])
    print("цитаты:", nq, "записей; лут-списки:", nl, "; иконок лута:", ni)
    if missing:
        print("нет данных:", ", ".join(missing))
    noart = [e["slug"] for e in out if not e["art"]]
    if noart:
        print("нет картинки:", ", ".join(noart))


if __name__ == "__main__":
    build()
