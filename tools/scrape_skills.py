#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает деревья навыков DST для сайта.

Источники:
  * tools/skills_raw.json — раскладка/связи из scripts/prefabs/skilltree_*.lua
  * tools/skill_strings_en.json — английские title/desc из strings.lua
  * RU wiki (dont-starve.fandom.com/ru) — русские названия, описания и иконки
  * EN wiki (dontstarve.wiki.gg) — запасные иконки

Результат: js/skills.js + assets/skills/<char>/*.png
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
from pathlib import Path

import requests
from lxml import html
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = Path(__file__).resolve().parent.parent
TOOLS = ROOT / "tools"
OUT_JS = ROOT / "js" / "skills.js"
ICON_ROOT = ROOT / "assets" / "skills"

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/122.0 Safari/537.36")
HEADERS = {"User-Agent": UA}
SESSION = requests.Session()
SESSION.headers.update(HEADERS)
RU_API = "https://dont-starve.fandom.com/ru/api.php"
EN_API = "https://dontstarve.wiki.gg/api.php"

# game prefab, EN page, RU page, site key, site name
CHARS = [
    ("wilson", "Wilson/Don't Starve Together", "Уилсон", "wilson", "Уилсон"),
    ("willow", "Willow/Don't Starve Together", "Уиллоу", "willow", "Уиллоу"),
    ("wolfgang", "Wolfgang/Don't Starve Together", "Вольфганг", "wolfgang", "Вольфганг"),
    ("wendy", "Wendy/Don't Starve Together", "Венди", "wendy", "Венди"),
    ("wx78", "WX-78/Don't Starve Together", "WX-78", "wx78", "WX-78"),
    ("woodie", "Woodie/Don't Starve Together", "Вуди", "woodie", "Вуди"),
    ("wortox", "Wortox/Don't Starve Together", "Вортокс", "wortox", "Вортокс"),
    ("wormwood", "Wormwood/Don't Starve Together", "Вормвуд", "wormwood", "Вормвуд"),
    ("winona", "Winona/Don't Starve Together", "Винона", "winona", "Уинона"),
    ("wurt", "Wurt/Don't Starve Together", "Вурт", "wurt", "Вурт"),
    ("walter", "Walter/Don't Starve Together", "Уолтер", "walter", "Уолтер"),
    ("wathgrithr", "Wigfrid/Don't Starve Together", "Вигфрид", "wigfrid", "Вигфрид"),
]

LOCK_RU = {
    "ALLEGIANCE_LOCK_1_DESC": "Изучите 12 навыков.",
    "ALLEGIANCE_LOCK_2_DESC": "Найдите и победите Древнего топливопряда.",
    "ALLEGIANCE_LOCK_3_DESC": "Найдите и победите Небесного защитника.",
    "ALLEGIANCE_LOCK_4_DESC": "Нет навыков лунной принадлежности.",
    "ALLEGIANCE_LOCK_5_DESC": "Нет навыков теневой принадлежности.",
}


def norm(s: str) -> str:
    return re.sub(r"\s+", " ", s or "").strip().lower()


def parse_page(api: str, page: str) -> str | None:
    params = {"action": "parse", "page": page, "prop": "text", "format": "json", "redirects": "1"}
    for attempt in range(3):
        try:
            r = SESSION.get(api, params=params, timeout=20)
            data = r.json()
            if "parse" in data:
                return data["parse"]["text"]["*"]
        except (requests.RequestException, ValueError):
            pass
        time.sleep(0.5 + attempt)
    return None


def parse_ru_skills(text: str) -> list[dict]:
    doc = html.fromstring(text)
    heads = [h for h in doc.xpath("//h2") if "Навыки" in h.text_content()]
    if not heads:
        return []
    rows, group = [], None
    for el in heads[0].itersiblings():
        if el.tag == "h2":
            break
        if el.tag != "table":
            continue
        for tr in el.xpath("./tbody/tr | ./tr"):
            tds = tr.xpath("./td")
            ths = tr.xpath("./th")
            if not tds and ths:
                title = " ".join(ths[0].text_content().split())
                if title and title != "Навык":
                    group = title
                continue
            if len(tds) < 2:
                continue
            b = tds[0].xpath(".//b")
            i = tds[0].xpath(".//i")
            if not b and not i:
                continue
            en = " ".join(i[0].text_content().split()).strip("()") if i else ""
            ru = " ".join(b[0].text_content().split()) if b else ""
            img = tds[0].xpath(".//img")
            icon = ""
            if img:
                icon = img[0].get("data-src") or img[0].get("src") or ""
            rows.append({
                "group": group,
                "ru": ru,
                "en": en,
                "desc": re.sub(r"\s+([.,;:!?])", r"\1", " ".join(" ".join(tds[1].itertext()).split())),
                "cond": re.sub(r"\s+([.,;:!?])", r"\1", " ".join(" ".join(tds[2].itertext()).split())) if len(tds) > 2 else "",
                "icon": icon,
            })
    return rows


def parse_en_icons(text: str) -> dict[str, str]:
    doc = html.fromstring(text)
    heads = [h for h in doc.xpath("//h2") if "Skill Tree" in h.text_content()]
    if not heads:
        return {}
    icons = {}
    for el in heads[0].itersiblings():
        if el.tag == "h2":
            break
        if el.tag != "table":
            continue
        for tr in el.xpath("./tbody/tr | ./tr"):
            tds = tr.xpath("./td")
            if len(tds) < 2:
                continue
            img = tds[0].xpath(".//img")
            if not img:
                continue
            name = " ".join(tds[0].text_content().split())
            src = img[0].get("src") or ""
            if src.startswith("/"):
                src = "https://dontstarve.wiki.gg" + src
            if src and not src.startswith("data:"):
                icons[norm(name)] = src
    return icons


def download(url: str, dest: Path) -> bool:
    if dest.is_file() and dest.stat().st_size > 200:
        return True
    if not url or url.startswith("data:"):
        return False
    if url.startswith("//"):
        url = "https:" + url
    try:
        r = SESSION.get(url, timeout=15)
        if r.status_code != 200 or len(r.content) < 200:
            return False
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(r.content)
        return True
    except requests.RequestException:
        return False


def main() -> int:
    raw = json.loads((TOOLS / "skills_raw.json").read_text(encoding="utf-8"))
    strings = json.loads((TOOLS / "skill_strings_en.json").read_text(encoding="utf-8"))

    trees = {}
    downloads = []
    for game_char, en_page, ru_page, site_char, site_name in CHARS:
        print(f"[{site_char}] {ru_page} / {en_page}")
        ru_text = parse_page(RU_API, ru_page)
        ru_rows = parse_ru_skills(ru_text) if ru_text else []
        ru_map = {norm(r["en"]): r for r in ru_rows if r["en"]}

        en_text = parse_page(EN_API, en_page)
        en_icons = parse_en_icons(en_text) if en_text else {}

        skills = raw.get(game_char, {}).get("skills", [])
        included = [s for s in skills if not s.get("infographic")]
        included_ids = {s["name"] for s in included}

        out_skills = []
        group_labels = {}
        for s in included:
            title_en = strings.get(s.get("title") or "", s.get("title") or "")
            desc_en = strings.get(s.get("desc") or "", s.get("desc") or "")
            ru = ru_map.get(norm(title_en))
            icon_url = ""
            icon_path = ""
            if s.get("lock"):
                title = "Закрытый путь"
                desc = LOCK_RU.get(s.get("desc") or "", "Откроется по мере изучения навыков.")
                cond = ""
            else:
                title = (ru or {}).get("ru") or title_en or s["name"]
                desc = (ru or {}).get("desc") or desc_en
                cond = (ru or {}).get("cond") or ""
                icon_url = en_icons.get(norm(title_en)) or (ru or {}).get("icon") or ""
                if ru and ru.get("group"):
                    group_labels[s.get("group") or ""] = ru["group"]

            entry = {
                "id": s["name"],
                "title": title,
                "desc": desc,
                "cond": cond,
                "icon": icon_path,
                "x": s.get("x", 0),
                "y": s.get("y", 0),
                "group": s.get("group") or "",
                "root": bool(s.get("root")),
                "lock": bool(s.get("lock")),
                "connects": [c for c in (s.get("connects") or []) if c in included_ids],
                "locks": [c for c in (s.get("locks") or []) if c in included_ids],
            }
            out_skills.append(entry)
            if icon_url:
                dest = ICON_ROOT / site_char / (s["name"] + ".png")
                downloads.append((icon_url, dest, entry, site_char))

        if not out_skills:
            print("  нет данных")
            continue

        xs = [s["x"] for s in out_skills]
        ys = [s["y"] for s in out_skills]
        trees[site_char] = {
            "gameChar": game_char,
            "name": site_name,
            "head": f"assets/chars/{site_char}.png",
            "groups": group_labels,
            "bounds": {"minX": min(xs), "maxX": max(xs), "minY": min(ys), "maxY": max(ys)},
            "skills": out_skills,
        }
        print(f"  skills={len(out_skills)} icons={sum(1 for s in out_skills if s['icon'])}")

    if downloads:
        ok = 0
        with ThreadPoolExecutor(max_workers=16) as pool:
            futures = {pool.submit(download, url, dest): (skill, char) for url, dest, skill, char in downloads}
            for fut in as_completed(futures):
                skill, char = futures[fut]
                try:
                    if fut.result():
                        skill["icon"] = f"assets/skills/{char}/{skill['id']}.png"
                        ok += 1
                except Exception:
                    pass
        print(f"icons: {ok}/{len(downloads)}")

    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JS.write_text(
        "/* Сгенерировано tools/scrape_skills.py — не править вручную */\n"
        "window.SKILL_TREES = "
        + json.dumps(trees, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    print(f"written {OUT_JS} ({OUT_JS.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
