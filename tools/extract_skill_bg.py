#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Достаёт фоны деревьев навыков из images.zip (KTEX -> PNG).

Формат KTEX: "KTEX" + uint32-заголовок, затем для каждого мипа
uint16 width, uint16 height, uint16 pitch, uint32 datasz (10 байт),
затем данные мипов. Первый мип — DXT5/DXT1/DXT3, его оборачиваем в DDS
и отдаём Pillow. Из атласа вырезаем область *_background.tex по UV из XML.
"""
from __future__ import annotations

import io
import json
import struct
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/images.zip")
OUT = ROOT / "assets" / "skills" / "bg"
ATLASES = ["skilltree2", "skilltree3", "skilltree4", "skilltree5", "skilltree6"]
SITE = {"wathgrithr": "wigfrid", "waxwell": "maxwell"}


def parse_ktex(data: bytes) -> tuple[Image.Image, int, int]:
    magic, header = struct.unpack_from("<4sI", data, 0)
    if magic != b"KTEX":
        raise ValueError("not KTEX")
    mips = (header >> 13) & 0x1F
    comp = (header >> 4) & 0x1F
    off = 8
    meta = []
    for _ in range(mips):
        w, h, pitch, size = struct.unpack_from("<HHHI", data, off)
        off += 10
        meta.append((w, h, pitch, size))
    if not meta:
        raise ValueError("no mipmaps")
    w, h, _, size = meta[0]
    payload = data[off:off + size]
    fourcc = {0: b"DXT1", 1: b"DXT3", 2: b"DXT5"}.get(comp, b"DXT5")
    flags = 0x1 | 0x2 | 0x4 | 0x1000 | 0x80000
    hdr = bytearray(128)
    struct.pack_into("<4sIIIIIII", hdr, 0, b"DDS ", 124, flags, h, w, size, 0, 1)
    struct.pack_into("<II4sIIIII", hdr, 76, 32, 0x4, fourcc, 0, 0, 0, 0, 0)
    struct.pack_into("<IIII", hdr, 108, 0x1000, 0, 0, 0)
    im = Image.open(io.BytesIO(bytes(hdr) + payload))
    im.load()
    return im.convert("RGBA"), w, h


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    z = zipfile.ZipFile(IMAGES)
    made = {}
    for atlas in ATLASES:
        xml = z.read(f"images/{atlas}.xml").decode("utf-8", "ignore")
        tex = z.read(f"images/{atlas}.tex")
        im, aw, ah = parse_ktex(tex)
        # elements
        import re
        for m in re.finditer(r'<Element name="([^"]+_background\.tex)"([^>]*)/>', xml):
            name, attrs = m.group(1), m.group(2)
            def val(k):
                mm = re.search(rf'{k}="([^"]+)"', attrs)
                return float(mm.group(1)) if mm else 0.0
            u1, u2, v1, v2 = val("u1"), val("u2"), val("v1"), val("v2")
            x1, x2 = round(u1 * aw), round(u2 * aw)
            y1, y2 = round(v1 * ah), round(v2 * ah)
            char = name.replace("_background.tex", "")
            site = SITE.get(char, char)
            crop = im.crop((x1, y1, x2, y2))
            dest = OUT / f"{site}.png"
            crop.save(dest)
            made[site] = {"w": crop.width, "h": crop.height, "file": str(dest.relative_to(ROOT))}
            print(f"{atlas}: {char} -> {site} {crop.width}x{crop.height}")
    (OUT / "index.json").write_text(json.dumps(made, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"done: {len(made)} backgrounds")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
