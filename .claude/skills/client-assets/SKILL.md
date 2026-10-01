---
name: client-assets
description: Process client materials: extract a logo from a flyer or poster, sample brand colors, source temporary CC0 photos (Openverse), compress video and make a poster, read an Excel export of Google reviews and pick verbatim quotes, generate favicon and Open Graph image. Use when the user provides images, video, flyers, spreadsheets, or asks for photos or reviews.
---

# Client assets

Follow `guidelines/06-content-media-ethics.md` exactly. Short version:

- **Logo**: largest print, uncropped; mask by `min(R,G,B)`; PNG with alpha at native size; record `site.logo` width/height; preview on dark and brand color; regenerate `app/icon.png` and `app/opengraph-image.png`.
- **Colors**: sample real pixels, do not guess.
- **Photos**: real first. Temporary: Openverse CC0 (`tools/audit/openverse-contact-sheet.js`), verify each URL returns 200, watermark "Poză temporară" is automatic for `http` sources. Unsplash scraping is blocked: do not bypass.
- **Video**: the `ffmpeg` recipe in the guideline (540p, 24 fps, no audio, ~1.5 MB) + poster + pause button. `ffmpeg-static` only in a short temp dir (`C:\tmp`); ask before downloading.
- **Reviews**: `openpyxl`; write UTF-8 to a file and Read it; choose concrete 5-star reviews; quote verbatim with name, date, "Recenzie Google"; no aggregate rating; client approval for names.
- **Windows**: short paths for npm/Python; the Python console is cp1252.
- Never invent missing data; mark placeholders.
