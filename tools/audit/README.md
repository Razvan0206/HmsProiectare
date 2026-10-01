# tools/audit

Headless-Chrome scripts (Node + `puppeteer-core`, uses your installed Chrome) to measure and verify a local site. Used in the Raf Gym project; numbers in `guidelines/05-technical-standards.md` come from `audit.js`.

```bash
cd tools/audit && npm install          # once (keep the path short on Windows)
# in the site repo: npx next build && npx next start -p 3100
BASE_URL=http://localhost:3100/ OUT_DIR=./out node audit.js
```

Environment: `BASE_URL` (default `http://localhost:3100/`), `OUT_DIR` (default `./out`, gitignored), `CHROME_PATH` (default the Windows Chrome path).

| Script | What it does |
|---|---|
| `audit.js` | Mobile performance with CPU 4x and ~1.6 Mbps (LCP, CLS, TBT, bytes by type); structure and a11y (landmarks, headings, alt, skip link, meta, focus order); contrast on solid backgrounds; touch targets < 44 px; JavaScript-disabled render. |
| `trace-mainthread.js` | Main-thread time by event (Layout, Script, Style) at 4x CPU; text visibility without JS after scrolling. |
| `screenshots.js` | Intro frames, hero and each section (edit the `ids` array) on desktop; `node screenshots.js mobile` for 390 px. |
| `marquee-coverage.js` | Checks that a scrolling band always covers the viewport at 390 / 1920 / 3440 px. Edit the selector. |
| `anchors.js` | Clicks each `#section` link and checks the heading lands below the fixed header, desktop and mobile. |
| `openverse-contact-sheet.js` | `node openverse-contact-sheet.js "gym workout" "kettlebell"` -> numbered contact sheets of CC0 images + JSON with URLs. |
| `reference-sites.js` | Scrolling screenshots of reference sites (edit `sites`). Do not use on sites with bot protection. |

Notes: measurements are on a local production build with emulated throttling, not a real phone or Lighthouse. Contrast ignores text over photos. The intro is skipped by setting `sessionStorage.rafgym-intro`; change the key for another project.
