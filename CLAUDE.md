# HMS Proiectare website

Business niche: **architecture-studio** · Seeded from RenovoGuidelines on 2026-10-01. Chat with the user in **Romanian**; site copy Romanian with diacritics; guideline docs English.

## Always on (every prompt)

- **ponytail (full) + caveman (full)** are ON (plugins enabled in `.claude/settings.json`, hook restates it each prompt). Caveman = chat prose only; never code, exact errors, security/irreversible warnings, written docs, or client-facing copy. Ponytail = reuse, stdlib, native, installed dep, one line, minimum code, after reading the real flow. Off only if the user says so.
- Verify before "done": `npx tsc --noEmit && npx eslint . && npx next build`, then the `site-audit` skill.

## Read first

1. `guidelines/00-START-HERE.md` (runbook) and `guidelines/03-workflow.md` (phase gates).
2. `guidelines/niches/architecture-studio.md` if it exists; otherwise create it from `guidelines/niches/_TEMPLATE.md` before designing sections.
3. `guidelines/10-romania-legal-local.md` (footer data, cookies/GDPR, shop and payment rules) and `guidelines/11-capability-catalog.md` (tools for forms, CMS, booking, shop).
4. `guidelines/02-tool-routing.md`: which tool to use when (ui-ux-pro-max, design-taste-frontend, redesign-skill, web-design-guidelines, playwright-cli, design references).

## Project decisions (fill in as they are made)

- Client, address, contacts, hours: in `content/site.ts` (config-first; components hold no client text).
- Identity (2026-10-01): orange `#fe9703` + black sampled from the HM bar logo (rebuilt as SVG in `components/Logo.tsx`, geometry measured on the client logo `assets/logo-facebook.jpg`, 2344x1153, lockup text "PROIECTARE ARHITECTURA DESIGN" as in the logo); square corners everywhere (logo = rectangles); Archivo (variable weight, no `wdth` axis: the axis cost 172 KB of fonts vs 67 KB) + IBM Plex Mono for labels; asymmetric 7/5/4/4/4 project grid; filter via radios + `:has()`, no JS.
- Motion system (2026-10-02, CSS only, no animation library): curves `--ease-out/--ease-in-out/--ease-drawer` from Emil Kowalski's skills; everything in `@media (prefers-reduced-motion: no-preference)`, scroll-driven parts behind `@supports (animation-timeline: view())`. Hero: ink panel wipes off the painted photo (LCP-safe), photo settles, headline rises per line, parallax on scroll. Scroll progress bar, logo bars assemble in header and grow in footer, stats counters (`components/Counter.tsx`, IntersectionObserver), service rows draw their rule, process timeline line draws with scroll, project covers wipe in, filter re-pops cards, shared-element View Transition card -> detail (`<ViewTransition name share>` from `react`), `<dialog>` lightbox (keyboard, swipe), mobile menu slides in. Checked by `tools/audit/check-hms.js` (anchors, filter counts, lightbox, reduced motion).
- Content sources: stats 288/120 come from the old site's portfolio (scraped 2026-10-01; "120 finalizate" is the old site's own label); real photos (Casa H, Casa Giarmata, Scena Covasant, hero) are the client's own from the old site; renders are marked "Randări 3D" on cards. Process steps are paraphrased from the old "Expertiză" page and the Facebook text: client to confirm order and wording. Casa H is "În desfășurare" on the old site.
- Document abbreviations (DTAC, DTOE, PT, SF, RLV, PUZ) live in the static `Documents` section; they used to scroll in a marquee.
- No marquee / side-scrolling text: the user disliked it (2026-10-02). Do not add one.
- Known limits: portfolio filter is CSS-only so it is not deep-linkable; Casa H gallery images are only 800 px wide on the old site (lightbox upscales); Firefox without scroll-driven animations shows everything static.
- Logo is always shown in its true colors (orange + black bars): header and footer are paper-colored for that reason (black bars vanish on ink); icon and OG image use a white plate. Do not recolor the bars.
- Deliberate deviations: alternating ink / paper / orange sections (client brand alternates orange and black); orange is fill only, never text on paper.
- Demo runs on localhost only (`npm run dev`, or `npx next build && npx next start -p 3100`); `noindex` set. Push straight to `main`, commit author razvan.iuga02@gmail.com.
- Placeholders still open: hours, CUI/Reg. Com., team, certificate copies, project details (grep `Aici vor veni`, `TODO client`). Confirm: insurer spelling ("Aliantz" as given), WhatsApp number, "Finalizat" status, client company names in project titles (HAI Extrusion, Picasso, Waterhouse, Bourgeois), "PUS" on old site corrected to PUZ.
- The IMAB "Annexure of Accreditation" on the old site accredits the certification body (ESQ Cert RO SRL), not HMS: do not show it as HMS's certificate; ask for the real ISO certificates.
- Scraped originals live in `scrape/` (gitignored); `python scripts/build-images.py` rebuilds `public/` + `content/project-images.json` from them. Old site: 288 projects (120 finished, 17 in progress, 151 proposals) in `scrape/projects.json`.
- Deploy: Vercel project _TODO_, production domain _TODO_, site stays `noindex` until launch.

## Ask first

Force-push / history rewrite; global installs; copying code from repos you do not own; publishing client data (real names, ratings, photos without a license); making repos public; inviting collaborators. Standing push rules are in the user's memory.
