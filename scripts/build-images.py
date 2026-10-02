# Convert the scraped originals (scrape/raw, gitignored) into web-sized WebP under public/.
# Writes content/project-images.json = {slug: [{src,w,h}]}, plus icon and Open Graph image.
# Run: python scripts/build-images.py   (needs Pillow)
import glob, json, os
from PIL import Image, ImageDraw

RAW = "scrape/raw"
# slug -> (project id on the old site, file indexes; first one is the cover)
PICKS = {
    "casa-h":              (26,  [46, 0, 33, 12, 40, 48, 26, 2]),
    "casa-giarmata":       (8,   [22, 9, 2, 8, 6, 3, 15, 10]),
    "scena-covasant":      (51,  [1, 0, 2]),
    "casa-g":              (226, [7, 0, 8, 3, 6, 9]),
    "casa-p":              (254, [0, 3, 1, 2, 8, 9]),
    "duplex-p-1e":         (160, [2, 3, 6, 5, 8, 9]),
    "bloc-penthouse":      (19,  [1, 6, 8, 0, 3, 4]),
    "bloc-anl":            (324, [0, 2, 5, 6]),
    "penthouse-bourgeois": (373, [1, 2, 4, 0, 6, 7]),
    "picasso-lounge":      (234, [0, 3, 7, 8, 9]),
    "waterhouse":          (397, [3, 0, 6, 4]),
    "hai-extrusion":       (413, [4, 3, 6, 2, 7]),
    "hala-dumbravita":     (111, [2, 0, 7, 8, 3]),
    "birouri-oradea":      (421, [0, 5, 6, 1, 7, 3]),
    "piata-agroalimentara": (395, [3, 5, 6, 8]),
}

def fit(im, max_w):
    im = im.convert("RGB")
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    return im

def save(im, path, q=76):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "WEBP", quality=q, method=6)

out = {}
for slug, (pid, idx) in PICKS.items():
    files = {int(os.path.basename(f)[:2]): f for f in glob.glob(f"{RAW}/p{pid}/*") if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))}
    out[slug] = []
    for n, i in enumerate(idx, 1):
        im = fit(Image.open(files[i]), 1600)
        save(im, f"public/projects/{slug}/{n:02d}.webp")
        out[slug].append({"src": f"/projects/{slug}/{n:02d}.webp", "w": im.width, "h": im.height})
os.makedirs("content", exist_ok=True)
json.dump(out, open("content/project-images.json", "w"), indent=1)

hero = fit(Image.open(f"{RAW}/brand/heredea-marian-3.jpg"), 1920)
save(hero, "public/hero.webp", 78)
print("hero", hero.size)
save(fit(Image.open(f"{RAW}/brand/Acreditare.jpg"), 900), "public/acreditare.webp", 82)

# Icon (square) and Open Graph image: logo bars on ink, orange #fe9703
ORANGE, INK = (254, 151, 3), (15, 15, 14)
def logo(d, x, y, s):
    r = lambda a, b, c, e, col: d.rectangle((x + a * s, y + b * s, x + (a + c) * s - 1, y + (b + e) * s - 1), fill=col)
    for a, b, c, e in [(1, 1, 6, 38), (35, 1, 6, 38), (9, 17, 24, 6), (43, 1, 32, 6), (52, 7, 6, 32), (69, 7, 6, 32)]:
        r(a - 1, b - 1, c, e, ORANGE)
    for a, b, c, e in [(9, 1, 24, 6), (9, 9, 24, 6), (9, 25, 24, 6), (9, 33, 24, 6), (43, 7, 7, 32), (60, 7, 7, 32)]:
        r(a - 1, b - 1, c, e, (52, 52, 50))
icon = Image.new("RGB", (512, 512), INK); logo(ImageDraw.Draw(icon), 512 // 2 - 37 * 6, 512 // 2 - 19 * 6, 6)
os.makedirs("app", exist_ok=True); icon.save("app/icon.png")
og = hero.resize((1200, round(hero.height * 1200 / hero.width)), Image.LANCZOS)
og = og.crop((0, (og.height - 630) // 2, 1200, (og.height - 630) // 2 + 630))
ov = Image.new("RGB", og.size, INK); og = Image.blend(og, ov, 0.55)
logo(ImageDraw.Draw(og), 70, 70, 4)
ImageDraw.Draw(og).text((70, 520), "HMS PROIECTARE  ·  ARHITECTURA, DESIGN, CONSTRUCTII  ·  ARAD", fill=(240, 236, 228))
og.save("app/opengraph-image.png")
print("done")
