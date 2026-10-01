# Workflow: phase by phase, with gates

Tools named here are routed in `02-tool-routing.md`. Every phase ends with its gate; do not skip a gate silently, say what is missing.

## Phase 1: Intake

- Inventory the folder the user gives you. Images: look at them (Read). Spreadsheets: `openpyxl`. Video: you cannot watch it; get size from a browser (`videoWidth`, `videoHeight`, `duration`) and use `ffmpeg` only for processing.
- Empty text files are common (`texte.txt` was empty). Say so; do not guess content.
- Output: a short list "have / missing / assumed". Ask for the missing items once.

## Phase 2: Niche and references

- Load `guidelines/niches/<slug>.md` (skill `niche-guidelines`). If the niche is missing, copy `_TEMPLATE.md`, fill it from this project's facts, and mark unverified claims.
- References the user gives are for ideas only. Screenshot them (`tools/audit/reference-sites.js`), write what to take and what NOT to take (mascots, slogans, textures without information, carousels without pause).
- Optionally fetch 1-2 brand design systems with `node scripts/fetch-design-md.mjs <brand>` to study reasoning, not to copy.
- Gate: section list, primary CTA, tone, compliance notes decided.

## Phase 3: Analyze materials

- **Logo**: extract from the LARGEST printed material, uncropped (all hexagon vertices/edges visible). Mask by min(R,G,B) so white survives and yellow/black drop out; save PNG with alpha at native size. Record real width/height in config. Preview on dark and on brand color.
- **Photos**: count usable ones. Fewer than 8 real photos: plan temporary CC0 photos with a visible watermark (`06-content-media-ethics.md`).
- **Video**: decorative only; compress (540p, 24 fps, no audio, ~1.5 MB), add poster and a pause button.
- **Price lists/menus**: retype as HTML, never embed the image.
- **Brand colors**: sample actual pixels (flyer yellow was `#ffef03`, not a guess).

## Phase 4: Direction (identity brief)

Write it down before coding (in the project CLAUDE.md):
- Color roles (`brand`, `ink`, `accent`, neutrals), derived from client materials; run `ui-ux-pro-max` `--design-system` for industry reasoning and compare with what the brand already uses.
- Shape system from the logo (one corner language for the whole site).
- Type pairing (two families max; heading weights actually used only).
- Layout moves that make it different: asymmetric grids, angled section edges, hero split, grouped pricing, etc.
- Motion level and what each animation communicates.
- Run the `design-taste-frontend` pre-flight checklist; note deliberate deviations (e.g. alternating tone sections).
- Gate: brief is different from Renovo, from the references, and from the previous client's site.

## Phase 5: Scaffold

- `node scripts/bootstrap-site.mjs <dir> --niche <slug> --client "<Name>"`, then create the Next.js app (App Router, TypeScript, Tailwind) in the same repo. Read `node_modules/next/dist/docs/` for version-specific behavior before writing Next code.
- Add `content/site.ts` from `guidelines/content-site.example.ts`. Tokens in `app/globals.css`. Fonts in `app/layout.tsx` (only used weights/styles).
- `npx next typegen` before `tsc` on a fresh project.
- Gate: `npx tsc --noEmit && npx eslint . && npx next build` pass.

## Phase 6: Build

- Sections come from the niche file, in its order. Server components by default; client components only for the mobile menu, counters, media controls, live status.
- Animations: CSS (scroll-driven `animation-timeline`, keyframes). No animation library unless a section truly needs it.
- Everything dynamic comes from config; `enabled` flags hide unfinished sections.
- Mark every placeholder; make temporary photos obvious.
- Commit per coherent step. Push per the user's standing rule.

## Phase 7: Verify

Run the `site-audit` skill: type/lint/build, mobile performance, a11y structure, contrast, touch targets, anchors on desktop and mobile, marquee/overflow checks at 390 / 1280 / 1920 / 3440 px, visual pass on every section, `web-design-guidelines` review, then `/ponytail-review`. Fix, re-measure, record before/after numbers.

## Phase 8: Ship

Skill `ship-site`: repo identity, push, Vercel project (framework preset Next.js), domain, deployment protection, deployment status via `gh api`. Test the public URL from a phone with mobile data.

## Phase 9: Deliver

Skill `client-delivery`: 20-30 s screen recording, WhatsApp message first, call after they have seen it. Capture feedback into the project CLAUDE.md.

## Phase 10: Launch and handover

Launch checklist in `08-delivery-and-client.md`: remove `noindex`, sitemap/robots, real photos, phone/WhatsApp, privacy/cookies if needed, reviews with permission, final domain, analytics only if agreed. Add lessons to this hub.
