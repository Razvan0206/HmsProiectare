---
name: site-audit
description: Measure and verify a built site before pushing or presenting it. Use after any significant change, before deploy or a client demo, or when asked to check performance, accessibility, SEO, contrast, anchors, marquee, overflow or "does it look right on mobile".
---

# Site audit

1. Quality commands: `npx next typegen && npx tsc --noEmit && npx eslint . && npx next build`.
2. Serve the production build: `npx next start -p 3100`. Install once: `cd tools/audit && npm install` (see `tools/audit/README.md`).
3. Run from `tools/audit`: `node audit.js` (mobile perf emulation, a11y structure, contrast, touch targets, no-JS), `node trace-mainthread.js`, `node anchors.js`, `node marquee-coverage.js`, `node screenshots.js` and `node screenshots.js mobile`. Configure with env `BASE_URL`, `CHROME_PATH`, `OUT_DIR`.
4. Look at the screenshots (Read) for every section on desktop and mobile; check the first-visit intro frames.
5. Run the `web-design-guidelines` review on `components/` and `app/`, and the `design-taste-frontend` pre-flight checklist; list deliberate deviations.
6. Compare to the budgets in `guidelines/05-technical-standards.md`. Report a before/after table; say what is not fixed.
7. Finish with `/ponytail-review`. Stop the server by port. Do not claim "done" without these numbers.
