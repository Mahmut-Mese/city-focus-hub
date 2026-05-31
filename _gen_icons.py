#!/usr/bin/env python3
"""Regenerate mobile app icon assets — stdlib-only PNG writer (optimised)."""
import struct, zlib, math, os

# ── PNG writer ───────────────────────────────────────────────────────
def write_png(path, w, h, pixels):
    """Write RGBA PNG file."""
    def ck(typ, data):
        c = typ + data
        return (struct.pack('>I', len(data)) + c +
                struct.pack('>I', zlib.crc32(c) & 0xffffffff))
    raw = b''
    for row in pixels:
        raw += b'\x00'  # filter None
        for r, g, b, a in row:
            raw += struct.pack('BBBB',
                               max(0, min(255, int(round(r)))),
                               max(0, min(255, int(round(g)))),
                               max(0, min(255, int(round(b)))),
                               max(0, min(255, int(round(a)))))
    comp = zlib.compress(raw, 9)
    png = b'\x89PNG\r\n\x1a\n'
    png += ck(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    png += ck(b'IDAT', comp)
    png += ck(b'IEND', b'')
    os.makedirs(os.path.dirname(path) or '.', exist_ok=True)
    with open(path, 'wb') as f:
        f.write(png)

# ── noise ────────────────────────────────────────────────────────────
def hash_noise(x, y):
    """Deterministic noise [-1, 1]."""
    h = x * 374761393 + y * 668265263
    h = (h ^ (h >> 13)) * 1274126177
    h ^= h >> 16
    return (h & 0x7fffffff) / 0x7fffffff * 2.0 - 1.0

# ── optimised renderer ───────────────────────────────────────────────
def render(size, segments, sw, bg, stroke,
           border=0, border_col=None, texture=0, transparent=False):
    """Render icon with anti-aliased thick strokes.

    For speed we compute a bounding box first and only evaluate
    segment-distance inside it.
    """
    half = sw / 2.0
    limit = half + 0.5  # anti-alias fade zone

    # ── pre-process segments: extend for square caps ──
    ext = []            # (x1, y1, x2, y2)  – extended
    bbox = [1e9, 1e9, -1e9, -1e9]  # xmin, ymin, xmax, ymax
    for (x1, y1), (x2, y2) in segments:
        dx, dy = x2 - x1, y2 - y1
        length = math.hypot(dx, dy)
        if length < 0.001:
            continue
        ux, uy = dx / length * half, dy / length * half
        x1e, y1e = x1 - ux, y1 - uy
        x2e, y2e = x2 + ux, y2 + uy
        ext.append((x1e, y1e, x2e, y2e))
        # expand bbox (with margin for AA)
        margin = half + 1.0
        if x1e < bbox[0]: bbox[0] = x1e
        if y1e < bbox[1]: bbox[1] = y1e
        if x2e < bbox[0]: bbox[0] = x2e
        if y2e < bbox[1]: bbox[1] = y2e
        if x1e > bbox[2]: bbox[2] = x1e
        if y1e > bbox[3]: bbox[3] = y1e
        if x2e > bbox[2]: bbox[2] = x2e
        if y2e > bbox[3]: bbox[3] = y2e
    # expand bbox for AA margin
    bbox[0] -= 1.0
    bbox[1] -= 1.0
    bbox[2] += 1.0
    bbox[3] += 1.0
    # clamp bbox to canvas
    bbox[0] = max(0, int(math.floor(bbox[0])))
    bbox[1] = max(0, int(math.floor(bbox[1])))
    bbox[2] = min(size - 1, int(math.ceil(bbox[2])))
    bbox[3] = min(size - 1, int(math.ceil(bbox[3])))

    sr, sg, sb = stroke
    bg_r, bg_g, bg_b = bg
    use_tex = texture > 0.0

    # Precompute a background pixel (no texture – just a fast path)
    # We'll fill rows outside the bbox with a flat colour.
    if transparent:
        bg_fast = (0.0, 0.0, 0.0, 0.0)
    else:
        bg_fast = (float(bg_r), float(bg_g), float(bg_b), 255.0)

    pixels = []

    for y in range(size):
        # Determine if this row intersects the bbox
        in_bbox = (bbox[1] <= y <= bbox[3])
        row = []

        if not in_bbox:
            # Entire row is outside → fast flat fill
            if transparent:
                row = [(0.0, 0.0, 0.0, 0.0)] * size
            else:
                if use_tex:
                    for x in range(size):
                        n = hash_noise(x, y) * texture
                        row.append((
                            max(0.0, min(255.0, bg_r + n)),
                            max(0.0, min(255.0, bg_g + n)),
                            max(0.0, min(255.0, bg_b + n)),
                            255.0,
                        ))
                else:
                    row = [bg_fast] * size
            pixels.append(row)
            continue

        # Row inside (or partially inside) bbox
        pre = bbox[0]                     # x start of bbox
        post = size - bbox[2] - 1         # x after bbox  (but we compute below)

        # Leading background (x < bbox[0])
        if pre > 0:
            if transparent:
                row.extend([(0.0, 0.0, 0.0, 0.0)] * pre)
            else:
                if use_tex:
                    for x in range(pre):
                        n = hash_noise(x, y) * texture
                        row.append((
                            max(0.0, min(255.0, bg_r + n)),
                            max(0.0, min(255.0, bg_g + n)),
                            max(0.0, min(255.0, bg_b + n)),
                            255.0,
                        ))
                else:
                    row.extend([bg_fast] * pre)

        # The bbox span
        for x in range(bbox[0], bbox[2] + 1):
            # background pixel (with optional noise)
            if transparent:
                br = bgc = bb = 0.0
                ba = 0.0
            else:
                if use_tex:
                    n = hash_noise(x, y) * texture
                    br = max(0.0, min(255.0, bg_r + n))
                    bgc = max(0.0, min(255.0, bg_g + n))
                    bb = max(0.0, min(255.0, bg_b + n))
                else:
                    br = float(bg_r)
                    bgc = float(bg_g)
                    bb = float(bg_b)
                ba = 255.0

            # nearest segment distance
            md = 1e9
            for (x1, y1, x2, y2) in ext:
                dx = x2 - x1
                dy = y2 - y1
                if dx == 0.0 and dy == 0.0:
                    d = math.hypot(x - x1, y - y1)
                else:
                    t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)
                    if t < 0.0:
                        t = 0.0
                    elif t > 1.0:
                        t = 1.0
                    d = math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
                if d < md:
                    md = d

            if md <= limit:
                alpha = 0.0 if md > limit else (limit - md)
                if alpha > 1.0:
                    alpha = 1.0
                if transparent:
                    row.append((sr, sg, sb, alpha * 255.0))
                else:
                    a = alpha
                    row.append((
                        sr * a + br * (1.0 - a),
                        sg * a + bgc * (1.0 - a),
                        sb * a + bb * (1.0 - a),
                        255.0,
                    ))
            else:
                row.append((br, bgc, bb, ba))

        # Trailing background (x > bbox[2])
        trail_len = size - bbox[2] - 1
        if trail_len > 0:
            if transparent:
                row.extend([(0.0, 0.0, 0.0, 0.0)] * trail_len)
            else:
                if use_tex:
                    for x in range(bbox[2] + 1, size):
                        n = hash_noise(x, y) * texture
                        row.append((
                            max(0.0, min(255.0, bg_r + n)),
                            max(0.0, min(255.0, bg_g + n)),
                            max(0.0, min(255.0, bg_b + n)),
                            255.0,
                        ))
                else:
                    row.extend([bg_fast] * trail_len)

        pixels.append(row)

    # ── thin light border ──
    if border > 0 and border_col:
        bw = border
        bcr, bcg, bcb = border_col
        for y in range(size):
            for x in range(size):
                if x < bw or x >= size - bw or y < bw or y >= size - bw:
                    pr, pg, pb, pa = pixels[y][x]
                    a = 0.30
                    pixels[y][x] = (
                        bcr * a + pr * (1.0 - a),
                        bcg * a + pg * (1.0 - a),
                        bcb * a + pb * (1.0 - a),
                        255.0,
                    )

    return pixels


def composite_center(bg_size, bg, tile, inset):
    """Place an already-rendered square tile over a flat background."""
    bg_r, bg_g, bg_b = bg
    tile_size = len(tile)
    pixels = []
    bg_pixel = (float(bg_r), float(bg_g), float(bg_b), 255.0)

    for y in range(bg_size):
        row = [bg_pixel] * bg_size
        if inset <= y < inset + tile_size:
            tile_row = tile[y - inset]
            for x, pixel in enumerate(tile_row):
                row[inset + x] = pixel
        pixels.append(row)

    return pixels


# ── main ─────────────────────────────────────────────────────────────
def main():
    base = '/Users/mahmutmese/Documents/city-focus-hub/mobile/assets'

    # ── raw geometry (1024×1024 coordinate space) ──
    raw_segs = [
        ((230, 885), (230, 360)),       # outer left vertical
        ((230, 360), (635, 155)),       # outer diagonal roof
        ((635, 155), (635, 885)),       # tower right side
        ((335, 500), (500, 420)),       # inner diagonal
        ((500, 420), (500, 885)),       # inner vertical
        ((635, 555), (880, 555)),       # H crossbar
        ((880, 555), (880, 885)),       # H right vertical
    ]
    gcx, gcy = 555.0, 520.0  # geometry centre

    def place(segs, scale, canvas):
        ox = canvas / 2.0 - gcx * scale
        oy = canvas / 2.0 - gcy * scale
        return [((x1*scale+ox, y1*scale+oy), (x2*scale+ox, y2*scale+oy))
                for (x1, y1), (x2, y2) in segs]

    # ═════════════════════════════════════════════════════════════════
    #  icon.png
    # ═════════════════════════════════════════════════════════════════
    print("Rendering icon.png …", flush=True)
    icon_inset = 54
    icon_tile_size = 1024 - icon_inset * 2
    segs_icon = place(raw_segs, 0.88, icon_tile_size)
    px_icon_tile = render(icon_tile_size, segs_icon, sw=42,
                          bg=(25, 25, 23), stroke=(245, 235, 210),
                          border=3, border_col=(245, 235, 210), texture=5)
    px_icon = composite_center(1024, (231, 227, 218), px_icon_tile, icon_inset)
    p = os.path.join(base, 'icon.png')
    write_png(p, 1024, 1024, px_icon)
    print(f"  icon.png         1024×1024  {os.path.getsize(p)} bytes")

    ios_icon = '/Users/mahmutmese/Documents/city-focus-hub/mobile/ios/TheLeadenhallWorks/Images.xcassets/AppIcon.appiconset/App-Icon-1024x1024@1x.png'
    write_png(ios_icon, 1024, 1024, px_icon)
    print(f"  iOS app icon     1024×1024  {os.path.getsize(ios_icon)} bytes")

    # ═════════════════════════════════════════════════════════════════
    #  adaptive-icon.png
    # ═════════════════════════════════════════════════════════════════
    print("Rendering adaptive-icon.png …", flush=True)
    p = os.path.join(base, 'adaptive-icon.png')
    write_png(p, 1024, 1024, px_icon)
    print(f"  adaptive-icon.png 1024×1024  {os.path.getsize(p)} bytes")

    if os.environ.get('ICON_ONLY') == '1':
        print("\n✓ Icon assets regenerated.")
        return

    # ═════════════════════════════════════════════════════════════════
    #  splash.png
    # ═════════════════════════════════════════════════════════════════
    print("Rendering splash tile …", flush=True)
    segs_tile = place(raw_segs, 1.0, 1024)
    px_tile = render(1024, segs_tile, sw=44,
                     bg=(26, 26, 32), stroke=(245, 235, 210),
                     border=2, border_col=(200, 190, 165), texture=4)

    splash_w, splash_h = 1284, 2778
    tile_size = 1024
    tile_x = (splash_w - tile_size) // 2   # 130
    tile_y = (splash_h - tile_size) // 2   # 877

    print(f"Compositing splash ({splash_w}×{splash_h}) …", flush=True)
    splash_px = []
    # Prebuild a white row template (fast)
    white_row = [(255.0, 255.0, 255.0, 255.0)] * splash_w
    for y in range(splash_h):
        if tile_y <= y < tile_y + tile_size:
            row = list(white_row)
            ty = y - tile_y
            # overwrite tile pixels
            for tx in range(tile_size):
                row[tile_x + tx] = px_tile[ty][tx]
            splash_px.append(row)
        else:
            splash_px.append(list(white_row))  # copy the row

    p = os.path.join(base, 'splash.png')
    write_png(p, splash_w, splash_h, splash_px)
    print(f"  splash.png       {splash_w}×{splash_h}  {os.path.getsize(p)} bytes")

    # cleanup
    # (script is in repo root – will leave it for reproduction, user can delete)
    print("\n✓ All assets regenerated.")


if __name__ == '__main__':
    main()
