# -*- coding: utf-8 -*-
"""Шансы выпадения добычи и условия для особых дропов.

CHANCE    — предмет падает не всегда: показываем процент.
CONDITION — предмет выпадает только при условии: показываем пометку словами.

Ключ — slug босса, внутри — английское имя предмета в нижнем регистре.
Правь здесь. Сборка: python3 tools/build_data.py
"""

CHANCE = {
    "krampus": {"krampus sack": "1%"},
    "malbatross": {"yellow gem": "5%"},
    "warbot": {"gears": "50%", "electrical doodad": "50%"},
    "lord_of_the_fruit_flies": {"plant seeds": "+25%"},
    "toadstool": {
        "red cap": "+66%",
        "green cap": "+66%",
        "blue cap": "+66%",
        "blue spore": "+50%",
    },
}

CONDITION = {
    "ancient_fuelweaver": {"shadow atrium": "если покинуть бой"},
    "armored_bearger": {
        "spark ark off": "до Небесного наследника",
        "nucleation fluid": "после Небесного наследника",
    },
    "crystal_deerclops": {
        "spark ark off": "до Небесного наследника",
        "nucleation fluid": "после Небесного наследника",
    },
    "possessed_varg": {
        "spark ark off": "до Небесного наследника",
        "nucleation fluid": "после Небесного наследника",
    },
    "umbral_abomination": {"king's staff": "после боя"},
    "scrappy_werepig": {"scrappy chapauldron": "если был в броне"},
    "bearger": {"fur tuft": "периодически"},
    "ewecus": {"manure": "периодически"},
    "lord_of_the_fruit_flies": {"friendly fruit fly fruit": "если в мире нет другого"},
    "crab_king": {"cracked pearl": "если жемчужина вставлена"},
    "dragonfly": {"lavae egg": "до 1"},
    "shadow_pieces": {"shadow atrium": "только 3-й уровень"},
    "celestial_scion": {"glove": "только в первый раз", "clipboard": "только в первый раз"},
}


def chance_for(slug, en_name):
    key = (en_name or "").lower().strip()
    for src in (CHANCE, CONDITION):
        m = src.get(slug) or {}
        if key in m:
            return m[key]
    return ""
