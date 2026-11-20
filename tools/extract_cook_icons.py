#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Вырезает иконки ингредиентов и блюд казана из inventoryimages*.xml.

KTEX -> DDS -> PNG, кроп по UV, вертикальный переворот,
сохранение в assets/cook/<prefab>.webp (96x96).
"""
from __future__ import annotations

import io
import json
import re
import struct
import zipfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
IMAGES = Path("/mnt/data/SteamLibrary/steamapps/common/Don't Starve Together/data/databundles/images.zip")
NEEDED = ROOT / "tools" / "cook_icons_needed.json"
OUT = ROOT / "assets" / "cook"
ATLASES = ("inventoryimages", "inventoryimages1", "inventoryimages2", "inventoryimages3", "inventoryimages4")


def parse_ktex(data: bytes) -> Image.Image:
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
    return im.convert("RGBA")


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    wanted = set(json.loads(NEEDED.read_text(encoding="utf-8")))
    made = set()
    with zipfile.ZipFile(IMAGES) as z:
        for atlas in ATLASES:
            xml_name = f"images/{atlas}.xml"
            tex_name = f"images/{atlas}.tex"
            if xml_name not in z.namelist() or tex_name not in z.namelist():
                continue
            xml = z.read(xml_name).decode("utf-8", "ignore")
            image = parse_ktex(z.read(tex_name))
            aw, ah = image.size
            for m in re.finditer(
                r'<Element name="([^"]+)"[^>]*u1="([^"]+)"[^>]*u2="([^"]+)"[^>]*v1="([^"]+)"[^>]*v2="([^"]+)"',
                xml,
            ):
                name, u1, u2, v1, v2 = m.groups()
                prefab = name[:-4] if name.endswith(".tex") else name
                if prefab not in wanted or prefab in made:
                    continue
                x1, x2 = round(float(u1) * aw), round(float(u2) * aw)
                y1, y2 = round(float(v1) * ah), round(float(v2) * ah)
                if x2 <= x1 or y2 <= y1:
                    continue
                crop = image.crop((x1, y1, x2, y2))
                # V-координаты в атласах идут снизу вверх
                crop = crop.transpose(Image.Transpose.FLIP_TOP_BOTTOM)
                crop.thumbnail((96, 96), Image.LANCZOS)
                canvas = Image.new("RGBA", (96, 96), (0, 0, 0, 0))
                canvas.paste(crop, ((96 - crop.width) // 2, (96 - crop.height) // 2), crop)
                canvas.save(OUT / f"{prefab}.webp", "WEBP", quality=86, method=6)
                made.add(prefab)

    missing = sorted(wanted - made)
    print(f"cook icons: {len(made)}, missing: {len(missing)}")
    if missing:
        print("missing sample:", ", ".join(missing[:25]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
