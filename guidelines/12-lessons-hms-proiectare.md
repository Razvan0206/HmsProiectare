# Lessons from HMS Proiectare (architecture studio, Arad), 2026-10-01 to 2026-10-03

Case study for agents building a similar site (another studio, a trades company, a clinic, a restaurant) or upgrading any existing site. Everything marked **[verified]** was run, measured or seen in this project. Repo: `Razvan0206/HmsProiectare`. Reference commit when written: `61c6ff9`.

Project in one line: upgrade of `hms-proiectare.ro` (old CMS site, Bootstrap 3, expired SSL certificate, 288 portfolio projects, almost no copy) into a Next.js 16 + Tailwind 4 demo for a first conversation with the owner. Demo on localhost, no prices, hours unknown, little company data.

## 1. Playbook that worked (use as a checklist)

1. **Read the hub first** (`00-START-HERE`, `03-workflow`, niche file, `04`-`06`), run `node scripts/doctor.mjs`, check memory for standing push rules.
2. **Ask once, early**: list what is missing about the business. The user answered with partial facts and said "a demo first, the owner will fill the rest". Missing facts are not blockers: build with visible placeholders and keep a "confirm with client" list in the project `CLAUDE.md` **[verified]**.
3. **Scrape the old site** (section 2) before designing. Content, project list, contact data and photos come from there.
4. **Create the niche file** if the hub has none (`guidelines/niches/architecture-studio.md` was written from `_TEMPLATE.md`). It lived only in the project copy: copy it back to the hub.
5. **Derive identity from the logo**, measured, not eyeballed (section 3).
6. **Scaffold config-first**: all client text in `content/site.ts`, components hold none, placeholders greppable (`Aici vor veni`, `TODO client`).
7. **Build, then verify with measurements** (section 8), then screenshots at 390 and 1280 px, then fix in one batch.
8. **Commit small, push to `main`** if the user's rule says so, then confirm with `git status -sb` and report the hash. The user asked "did you push?" once: always verify and say so.

## 2. Scraping and content lessons

- Expired TLS certificate: `WebFetch` failed ("certificate has expired"). `curl -skL` and Python `ssl._create_unverified_context()` worked **[verified]**. Only for reading a public site you are rebuilding, never for sending data.
- The old CMS exposed a list page with all projects and one detail page per project. A 30-line Python crawler with `ThreadPoolExecutor(8)` collected 288 projects and 4575 image URLs in under a minute into `scrape/projects.json` **[verified]**. Keep scraped data in a gitignored `scrape/` folder.
- **Download only what you use.** 14 projects x 10 images = 18 MB were enough. Ask before bulk downloads (the hub requires it).
- **Look at images, do not trust filenames.** Build contact sheets with Pillow (thumbnail grid with index labels) and read them. That is how real photos, renders, technical drawings and PDFs got separated, and how two PDFs hidden among images (Pillow `UnidentifiedImageError`) were found.
- **Real photo vs render matters.** Studios show both. The old slider held real photos of built work. Matching them to portfolio entries with a 12x8 grayscale signature distance (smallest distance = same image) gave honest captions (project name, place) **[verified]**. Cards then carry a "Fotografii" / "Randări 3D" label so a render is never read as a finished building.
- **Third-party documents are not the client's.** The "Acreditare" image on the old site was an accreditation annex of the certification body (not HMS's ISO certificate). Do not present it as the client's certificate; ask for the real ones.
- **Fix obvious source errors and flag them**: the old site wrote "PUS" for plan urbanistic zonal; the site shows "PUZ" and the confirm list says so.
- **Numbers from the old site are fine if sourced**: 288 projects and 120 "finished" came from the old portfolio and are labelled that way in `CLAUDE.md`. No invented counters, ratings or reviews.
- **Status is data**: one project the old site marks "in progress" (Casa H) is shown as such even though the photo looks finished. Do not "improve" client data silently.
- **Source image size limits quality**: gallery images of one project were 800 px wide; the lightbox upscales them. Note it as a known limit and ask for originals.
- Convert to WebP (q 76-80, max 1600-1920 px) with a rebuild script (`scripts/build-images.py`) so assets are reproducible from the gitignored originals **[verified]**. Hero 1920 px WebP = 368 KB.

## 3. Logo and brand lessons (the costly mistake)

- The first logo was a vector rebuilt from a 76x40 px raster scraped from the old site. It looked close but had wrong gaps, and later the bars were recolored grey so they showed on a dark header. The user called the logo "totally wrong" **[verified feedback]**.
- **Do this instead**:
  1. Look for the best logo file first (client folder, social profile image). Ask the user if only a tiny raster exists.
  2. Measure it: bounding boxes per colour, unit size, gap size. The supplied logo is a 72 x 38 unit grid with 6-unit bars and 2-unit gaps.
  3. Render your vector over it and compute pixel IoU. Orange matched 0.9999 after the fix **[verified]**.
  4. **Never recolor a logo.** If a colour vanishes on the background (black bars on near-black), change the background: the header and footer became paper-coloured, the favicon and Open Graph image use a white plate.
  5. Include the lockup text if the logo has it ("PROIECTARE ARHITECTURA DESIGN"), exactly as written.
- Brand colour sampled from pixels (`#fe9703`), used as fill, never as text on paper (about 2:1 contrast).
- The brand geometry (rectangles) set the whole shape system: square corners everywhere, hairline rules, bar-shaped dividers.

## 4. Design lessons (architecture / portfolio niche, transferable)

- **Images lead.** A full-bleed real photo hero with a left-side shade (`linear-gradient` from ink to transparent) and the headline over it beat the first split layout. On mobile use a bottom-up shade and a different `object-position` (36% vs 62%) so the building stays in frame.
- **Hero rules from design-taste applied**: at most four text elements (headline, subhead of 20 words or fewer, CTAs, one caption), headline at most two lines on desktop, no trust strip inside the hero (it moved to a stats band below).
- **Layout variety**: hero (full-bleed), stats (three columns), services (sticky left title + list), documents (hairline grid), process (timeline), projects (asymmetric 7/5/4/4/4 grid), about (two columns), contact (orange block). No section numbering, no pill badges, no eyebrow above every heading, no split headers (headline left, paragraph right).
- **Tone alternation** (ink / paper / orange) is allowed when the client's own brand alternates them; write it in the project `CLAUDE.md` as a deliberate deviation.
- **A marquee of side-scrolling text was rejected by the user.** Do not add one by default. The information it carried (document abbreviations) moved into a static glossary grid. Lesson: when a flourish is removed, relocate its information; do not just delete it.
- **Fonts cost bytes**: the Archivo `wdth` axis added about 105 KB of font transfer (191 KB vs 86 KB in the mobile audit). Check `.next/static/media` sizes after enabling variable axes **[verified]**.
- **Portfolio filter without JS**: radio inputs + `:has()` on a sibling grid. Cheap and accessible. Limit: state is not deep-linkable.
- Prev/next project links and "back to all projects" on every detail page; detail pages need a visible placeholder paragraph for the facts the client has not supplied yet.
- Contact: make the phone number the largest element on the page, plus a sticky two-button action bar on mobile (call, e-mail). Use non-breaking spaces in phone numbers so they never wrap.

## 5. Motion lessons (CSS only, no animation library)

Rules came from the hub's Emil Kowalski skills. What worked **[verified]**:

- **Gate by frequency**: delight lives on rare surfaces (hero, section entrances). Hover effects are near-imperceptible. Image swaps in a lightbox and arrow-key navigation have no animation.
- **Curves**: `--ease-out: cubic-bezier(0.23,1,0.32,1)` for entrances, `--ease-in-out: cubic-bezier(0.77,0,0.175,1)` for on-screen movement, `--ease-drawer: cubic-bezier(0.32,0.72,0,1)` for the mobile menu, `linear` for anything scroll-linked.
- **Everything inside `@media (prefers-reduced-motion: no-preference)`**, scroll-driven parts also inside `@supports (animation-timeline: view())`. Content is visible by default, so unsupported browsers (Firefox without the flag) show a static but complete page. A test emulates reduced motion and asserts `animation-name: none` on key elements.
- **Hover only on hover devices**: `@media (hover: hover) and (pointer: fine)`. Elements revealed on hover (the "Vezi proiectul" label) must be visible by default on touch.
- **LCP-safe hero reveal**: do not animate `clip-path` on the hero image itself (risk of delaying LCP). Put an ink panel over the already-painted image and `scaleX` it away. LCP measured 1.25 s (emulated mobile, 4x CPU) versus 2.2 s for the first version **[verified]**.
- **Do not stack animations on one element**: hero settle (scale), parallax (translate) and the curtain live on three different nodes.
- **Scroll-driven techniques that worked**: scroll progress bar (`scroll(root)`), parallax (`animation-range: 0 100svh`), rule lines drawing (`scaleX` with `view()` entry range), image wipes (`clip-path` inset with `view()`), a timeline line that fills while the section crosses the viewport, nodes with `animation-range: entry calc(40% + var(--i) * 6%) ...` for staggering by index.
- **Counters**: CSS cannot time-trigger a count-up. A 25-line client component with `IntersectionObserver` (SSR renders the final value, reduced motion keeps it, an `sr-only` copy carries the real number) is the sanctioned exception to "server components by default".
- **Replay on filter change**: a different `animation-name` restarts an animation, so five identical `@keyframes pop-0..4` are intentional (commented in the CSS).
- **`<dialog>` for overlays**: lightbox and mobile menu use native `<dialog>` with `@starting-style` plus `transition: ... allow-discrete` for open/close. Add `overscroll-behavior: contain`; no `autoFocus` needed (the first focusable is the close button).
- **View Transitions in Next 16.3 App Router**: `import { ViewTransition } from "react"` works with no flag (`typeof` is `symbol`). TypeScript needs `/// <reference types="react/experimental" />`. Wrap the `<Image>` on the card and on the detail page with the same `name` and `share="class"`; `default="none"` stops competing animations; do not wrap `{children}` in the layout. Next `<Link transitionTypes={["nav-forward"]}>` is available. Headless tests show no console errors; the morph itself needs a manual look **[partly verified]**.
- **Layout-property animation is flagged** by the Impeccable hook (`width` on a bar). Fix with `transform: scaleX` and a fixed width instead of suppressing the rule.
- Side-tab borders (`border-left: 4px solid brand`) are flagged as an AI tell; use a short top rule above the text.

## 6. Accessibility and quality lessons

From the `web-design-guidelines` review and the audit scripts:

- `translate="no"` on brand names; non-breaking spaces in phone numbers; `scroll-padding-bottom` when a fixed bottom bar exists (the bar must not cover focused elements); `env(safe-area-inset-bottom)` on full-height overlays; no `autoFocus`; `aria-live="polite"` on a lightbox counter.
- `dl` markup must keep `dt` before `dd`. For "big number above label", keep DOM order and use `flex-col-reverse` rather than swapping the elements.
- Touch targets of at least 44 px: inline text links needed `py-2.5` or `py-3`. The audit script lists failures **[verified]**.
- Marquee rules if one is ever needed: only one per page, a real pause control, hover pause, stops under reduced motion, every copy wider than 3440 px.
- Contrast: orange text on paper fails; use orange only as fill. The audit's contrast check covers solid backgrounds only; photos need a manual look at the shade.

## 7. Environment (Windows, Claude Code) pitfalls **[verified]**

- Multi-line files with quotes or apostrophes written through bash heredocs failed to parse (`unexpected EOF`). Use the `Write` tool for source files and short `python - <<'PYEOF'` blocks for scripted edits (use a unique delimiter, not `E`).
- Python console is cp1252: set `PYTHONIOENCODING=utf8` or write results to files.
- Stop a server by port: `netstat -ano | grep ":3100 "` then `taskkill //F //PID <pid>`. Rebuild before restarting `next start`, otherwise screenshots show the old build.
- After refactors, screenshot/test scripts break on removed selectors (`.mq` after the marquee was deleted). Keep `tools/audit/*.js` in sync, or fail fast.
- Scroll-driven animations only settle if you scroll in small steps with short waits; jumping with `scrollTo` straight to the target can leave them half-drawn in screenshots.
- `next/image` with `fill`, `priority`, `sizes="100vw"`, `quality={72}` for the hero; remote hosts are not needed because every image is local.
- Git: set repo-local identity (`user.email` from the user's rule), `git remote add origin`, push to `main`, then `git fetch && git status -sb` and `git log -1`. Line-ending warnings are harmless.
- Vercel: not deployed in this project. Importing needs the user's dashboard (the `vercel` CLI needs a global install and an interactive login). The Hobby plan is for non-commercial use; commits by an author who is not a project member can be blocked. `metadataBase` already reads `VERCEL_PROJECT_PRODUCTION_URL`.
- Hub drift: files copied from the hub (`guidelines/`, `.claude/`) become stale when the hub changes. After the user said "I updated the hub", pull it, diff, and copy only changed docs. New niche files and lessons written in a project must be copied back to the hub (ask first, it is another repo).

## 8. Verification harness that paid off

Scripts in `tools/audit/` (puppeteer-core with the installed Chrome):

| Script | Checks |
|---|---|
| `audit.js` | emulated mobile LCP, CLS, TBT, bytes by type, a11y structure, contrast, touch targets, no-JS render |
| `check-hms.js` | desktop and mobile: anchors land below the sticky header, filter counts (15 / 7 / 3 / 15), mobile menu opens and closes, lightbox opens, arrow key moves, Escape closes, reduced motion turns animations off |
| `shots-hms.js [mobile]` | hero intro frames at 250 / 700 / 1300 ms, each section after stepped scrolling |
| `shots-ui.js` | open menu, open lightbox, footer, card click navigation without console errors |

Final numbers (mobile emulation, production build): LCP 1.25 s, CLS 0, TBT about 170 ms, 305 KB transferred, JS 143 KB, fonts 86 KB. All inside the hub budgets.

Gate order that worked: `npx tsc --noEmit && npx eslint . && npx next build`, then behaviour checks, then audit numbers, then screenshots, then fixes in one batch, then commit and push.

## 9. Working with the user (communication lessons)

- Chat in Romanian, terse (caveman), documents and code in English, site copy in Romanian with diacritics.
- The user reacts to what they see, quickly and specifically ("I do not like the side-to-side text", "the logo is wrong"). Do not defend a choice; fix it, relocate any information that was removed, and say what changed in two or three lines.
- When the user adds a file ("I added the logo"), search the folder by modification time and by name before answering; say which file you used.
- Answer direct questions directly ("did you push?" -> yes, hash, link).
- A global install (Graphify, Agent Reach, `vercel` CLI) is a question, not an action, even when the user says "use it": the tool needs a package manager that is not installed, so ask one line.
- Honest limits belong in the report: low-resolution sources, unverified wording (process steps paraphrased from old copy), items to confirm.

## 10. Adapting this to other domains

| Keep as is | Change per niche |
|---|---|
| Playbook (section 1), config-first `content/site.ts`, placeholder discipline | Section list and primary action: studio = call/e-mail, restaurant = reserve/menu, clinic = book, shop = order |
| Logo measurement and true-colour rule | Visual world: derive from the client's own logo, print and photos, never from this project |
| Real-photo-first imagery and honest labels (photo vs render vs stock) | Photo needs: food, rooms, equipment, before/after; consent for faces and client names |
| Motion budget (gate by frequency, reduced motion, hover gating, LCP-safe reveal) | Intensity: heavy for portfolio and agency work, minimal for clinics and legal (see niche files) |
| Verification scripts (adjust selectors and counts) | Compliance: GDPR, authorizations, medical or legal wording (`10-romania-legal-local.md`) |
| Commit/push/verify routine | Hosting and domain decisions (client owns the domain) |

Agent reminders for any niche:

- Do not invent facts, reviews, hours, prices or certificates. Mark every gap visibly.
- Scrape and look at the real material before choosing a direction.
- Measure what you can (logo geometry, performance, contrast) instead of judging by eye.
- Prefer CSS, native elements (`dialog`, `:has()`, scroll timelines) and the stack default over libraries.
- Remove what the user rejects, move its information, update the project `CLAUDE.md` so the rejection is remembered.
