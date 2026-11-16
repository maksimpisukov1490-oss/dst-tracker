#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Скачивает с dontstarve.wiki.gg цитаты персонажей и точную добычу боссов.

Запуск:  python3 tools/scrape_wiki.py
Результат:
  tools/raw/<slug>.txt      — кэш исходного вики-текста (action=raw)
  tools/web_quotes.json     — {slug: {page, quotes: {key: text}, drops: [{en, qty}]}}
  assets/items/<item>.png   — иконки предметов из добычи
"""
import glob
import json
import os
import re
import sys
import time

import requests

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import build_data  # noqa: E402

RAW_DIR = os.path.join(HERE, "raw")
ITEMS_DIR = os.path.join(ROOT, "assets", "items")
BASE = "https://dontstarve.wiki.gg"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
HEADERS = {"User-Agent": UA, "Accept": "text/html,application/xhtml+xml,*/*;q=0.8",
           "Accept-Language": "en-US,en;q=0.9"}

CHAR_KEYS = {k for k, _ in build_data.CHAR_ORDER}

# некоторые предметы вики лежат под другим именем файла
ICON_ALIASES = {
    "night armour": "Night Armor",
    "night armor": "Night Armor",
    "thulecite fragments": "Thulecite Fragments",
    "thulecite": "Thulecite",
    "rocks": "Rocks",
    "sketch": "Sketch",
    "enlightened crown shard": "Enlightened Shard",
}


def http_get(url):
    return requests.get(url, headers=HEADERS, timeout=30)


def fetch_raw(page, depth=0):
    url = BASE + "/wiki/" + page.replace(" ", "_") + "?action=raw"
    r = http_get(url)
    r.raise_for_status()
    text = r.text
    m = re.match(r"\s*#REDIRECT\s*\[\[([^\]]+)\]\]", text, re.I)
    if m and depth < 3:
        return fetch_raw(m.group(1).strip(), depth + 1)
    # HTTP-редирект теряет ?action=raw и отдаёт HTML — берём цель из <title>
    if "<html" in text[:800].lower() and depth < 3:
        tm = re.search(r"<title>(.*?)\s*-\s*Don't Starve Wiki</title>", text, re.I)
        if tm:
            tgt = tm.group(1).strip()
            if tgt and tgt.lower() != page.lower():
                return fetch_raw(tgt, depth + 1)
    return text


def balanced(text, start):
    depth, i, n = 0, start, len(text)
    while i < n - 1:
        pair = text[i:i + 2]
        if pair == "{{":
            depth += 1
            i += 2
            continue
        if pair == "}}":
            depth -= 1
            i += 2
            if depth == 0:
                return text[start + 2:i - 2]
            continue
        i += 1
    return ""


def find_template(text, name):
    m = re.search(r"\{\{\s*" + re.escape(name) + r"\b", text)
    return balanced(text, m.start()) if m else None


def split_params(body):
    parts, depth, buf, i, n = [], 0, [], 0, len(body)
    while i < n:
        pair = body[i:i + 2]
        if pair in ("{{", "[["):
            depth += 1
            buf.append(pair)
            i += 2
            continue
        if pair in ("}}", "]]"):
            depth -= 1
            buf.append(pair)
            i += 2
            continue
        if body[i] == "|" and depth == 0:
            parts.append("".join(buf))
            buf = []
            i += 1
            continue
        buf.append(body[i])
        i += 1
    parts.append("".join(buf))
    return parts


def clean_text(s):
    s = s.strip()
    s = re.sub(r"\{\{[^}]*\}\}", "", s)
    s = re.sub(r"\[\[[^\]|]*\|([^\]]*)\]\]", r"\1", s)
    s = re.sub(r"\[\[([^\]]*)\]\]", r"\1", s)
    s = s.replace("''", "").replace("<br>", " ").replace("<br/>", " ")
    s = (s.replace("&quot;", '"').replace("&amp;", "&").replace("&times;", "×")
         .replace("&#39;", "'").replace("&nbsp;", " ").replace("&#160;", " "))
    return re.sub(r"\s+", " ", s).strip()


def parse_quotes(raw):
    body = find_template(raw, "Quotes")
    if body is None:
        return {}
    out = {}
    for p in split_params(body):
        if "=" not in p:
            continue
        k, v = p.split("=", 1)
        k = k.strip().lower()
        if k in CHAR_KEYS:
            out[k] = clean_text(v)
    return out


def _item_from_seg(seg):
    m = re.search(r"\[\[File:([^|\]]+)", seg)
    if m:
        return re.sub(r"\.png$", "", m.group(1).strip(), flags=re.I).replace("_", " ")
    pics = re.findall(r"\{\{\s*[Pp]ic\d*\s*\|([^}]*)\}\}", seg)
    if pics:
        args = [a.strip() for a in pics[0].split("|") if a.strip()]
        cand = [a for a in args if not re.fullmatch(r"\d+(px)?", a)]
        if cand:
            return cand[0].replace("_", " ")
    return None


def parse_drops(raw):
    vals = re.findall(r"\|\s*drops\s*=\s*(.*?)(?=\n\s*\||\n\s*\}\}|\Z)", raw, re.S)
    val = next((v for v in vals if v.strip()), "")
    if not val.strip():
        return []
    s = val.replace("'''", "")
    out, seen = [], set()
    for seg in re.split(r"[,\n]|<br\s*/?>", s):
        name = _item_from_seg(seg)
        if not name or "icon" in name.lower():
            continue
        if name.lower() in seen:
            continue
        seen.add(name.lower())
        qm = re.search(r"(?:&times;|×|\bx)\s*(\d+(?:\s*[-–]\s*\d+)?)", seg)
        qty = "×" + re.sub(r"\s+", "", qm.group(1)) if qm else ""
        out.append({"en": name, "qty": qty})
    return out


def icon_fname(name):
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_") + ".png"


def download_icon(name):
    fname = icon_fname(name)
    dest = os.path.join(ITEMS_DIR, fname)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return fname
    for cand in [name, ICON_ALIASES.get(name.lower())]:
        if not cand:
            continue
        url = BASE + "/images/" + cand.replace(" ", "_") + ".png"
        try:
            r = http_get(url)
            if r.status_code == 200 and r.content[:8] == b"\x89PNG\r\n\x1a\n":
                open(dest, "wb").write(r.content)
                return fname
        except Exception:
            pass
    return None


def best_raw(slug, page):
    """Берёт /DST-версию страницы, если на базовой меньше цитат."""
    raw = fetch_raw(page)
    q = parse_quotes(raw)
    if not page.endswith("/DST") and len(q) < 17:
        try:
            raw2 = fetch_raw(page + "/DST")
        except Exception:
            raw2 = ""
        if len(parse_quotes(raw2)) > len(q):
            return raw2, page + "/DST"
    return raw, page


def main():
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(ITEMS_DIR, exist_ok=True)
    web = {}
    for f in sorted(glob.glob(os.path.join(HERE, "web_*.json"))):
        if f.endswith("web_quotes.json"):
            continue
        for b in json.load(open(f, encoding="utf-8")):
            web[b["slug"]] = b

    result, all_items = {}, {}
    for slug, _cat in build_data.ORDER:
        page = (web.get(slug) or {}).get("page") or slug
        cache = os.path.join(RAW_DIR, slug + ".txt")
        if os.path.exists(cache):
            raw = open(cache, encoding="utf-8").read()
        else:
            try:
                raw, page = best_raw(slug, page)
            except Exception as e:
                print("!! не скачалось:", slug, page, e)
                continue
            open(cache, "w", encoding="utf-8").write(raw)
            time.sleep(1.1)
        q = parse_quotes(raw)
        drops = parse_drops(raw)
        result[slug] = {"page": page, "quotes": q, "drops": drops}
        for raw_name in (web.get(slug) or {}).get("drops") or []:
            m = re.match(r"^(.*?)\s+x\s*[\d\-–]+$", raw_name.strip(), re.I)
            name = m.group(1).strip() if m else raw_name.strip()
            all_items[name] = all_items.get(name, 0) + 1
        for it in drops:
            all_items[it["en"]] = all_items.get(it["en"], 0) + 1
        print("%-24s page=%-26s quotes=%2d drops=%2d" % (slug, page, len(q), len(drops)))

    json.dump(result, open(os.path.join(HERE, "web_quotes.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    print("\nиконок к скачиванию:", len(all_items))
    ok = fail = 0
    for name in sorted(all_items):
        if download_icon(name):
            ok += 1
        else:
            fail += 1
            print("  нет иконки:", name)
        time.sleep(0.35)
    print("иконки: есть", ok, "не найдено", fail)


if __name__ == "__main__":
    main()
