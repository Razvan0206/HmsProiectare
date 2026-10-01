# Case study: Raf Gym (Iași), September 2026

Gym site built from a flyer, one interior photo, one reel and later a Google reviews export. Repo `Razvan0206/RafGym` (private), Vercel team `renovox`. Treat this as the reference implementation of the workflow.

## Timeline

1. Read Renovo's `AGENTS.md`, `CLAUDE.md`, `SETUP.md`, `design-language.md` (template repo owned by `savuxyz`).
2. First version as a `/raf-gym` page inside Renovo: looked too much like Renovo. Moved to its own repo; reverted Renovo to its last commit (revert commit + branch deleted).
3. Identity from the flyer: black `#0a0a0a`, yellow `#ffef03`, the logo hexagon as the shape system, cut corners, hard offset shadows, angled yellow sections, arrow-shaped price rows, hexagon-drawing intro, video inside a hexagon.
4. Template-ization: everything in `content/site.ts`, `enabled` flags, temporary CC0 photos with automatic watermark.
5. Audit and fixes: LCP 4.9 s -> 2.2 s, fonts 206 -> 107 KB, no animation library, SEO and a11y, mobile action bar, grouped pricing, schedule placeholder.
6. Real data: 4 verbatim 5-star Google reviews chosen from 44; full uncropped logo re-extracted from the price poster.

## What worked

- Brand-derived geometry (hexagon, arrows from the flyer) made it unique without effort.
- Config-first made every later change (remove Zumba, groups for pricing, reviews) a data edit.
- Measured audits found real problems that screenshots hid (LCP, hidden-until-JS content, anchors landing under the fixed header).
- Visible watermarks on temporary photos let the client see what is provisional.
- Live "Deschis acum" status from the real hours.

## Mistakes and fixes

| Mistake | Fix / rule |
|---|---|
| Started inside Renovo, then moved | Ask "separate repo?" at the start |
| Reused Renovo components: same look | Decide a distinct direction before reusing |
| Marquee had too few repeats: empty yellow on wide screens | Repeat so each half > widest screen; test 3440 px |
| Custom shape class outside `@layer`: every corner stayed 14 px | Put in `@layer components`; per-element `--cut` |
| Stored `var()` in a variable on `:root`: value frozen | Write the polygon where used |
| Animation library with hidden initial states: LCP 4.9 s, content invisible without JS | CSS animations; visible by default |
| `content-visibility: auto`: TBT 765 -> 149 ms but mobile anchors broke | Reverted; retest anchors if tried again |
| Imported to Vercel on an empty repo: preset "Other" | Import after first real commit |
| Commit authored with an old e-mail; deploy blocked | Set git identity per repo; blocked deploys are about project membership |
| Logo cropped at the top vertex | Extract from the full poster; native size |
| Copied a skill/CLI install without asking | Ask before third-party installs; read them first |
| Python in a long scratch path | Short temp dir |
| Browser pane hidden: black screenshots, misread as a bug | Headless Chrome scripts; check `scrollY` and pane visibility |
| Invented "Zumba" and a FAQ | Never invent offers; remove what the client rejects |
| Did not read the browser skill before using the pane | Read tool skills before first use |

## Numbers (emulated mobile)

LCP 4.9 -> 2.2 s; CLS 0.000; JS 196 -> 144 KB; fonts 206 -> 107 KB; requests 27 -> 20; video 7.7 -> 1.6 MB; TBT ~750 -> ~690 ms (framework + layout; open problem).

## Open problems to attack next time

- TBT: look at Next runtime hydration cost and layout; try `content-visibility` only on sections whose height is predictable, with anchors retested.
- Safari/Firefox support for scroll-driven animations is **[unverified]**; content is visible without them by design.
- A neutral, reusable Next.js starter (extract from RafGym, keep brand-specific parts out).
- Unit/e2e test for the contact flow once a real form exists.

## Where things are

Reference repo: <https://github.com/Razvan0206/RafGym> (files: `content/site.ts`, `TEMPLATE.md`, `CLAUDE.md`, `components/`, `app/globals.css`). Playbook of the original session (Romanian): `C:\Users\razva\Desktop\Renovo\PLAYBOOK-site-uri-clienti.md` on the user's machine.
