# Technical standards

Stack: **Next.js (App Router, TypeScript) + Tailwind CSS 4**, deployed on Vercel. No animation library by default. No UI/icon library for a handful of icons. Next in the repo may differ from what you remember: read `node_modules/next/dist/docs/` for the installed version before writing Next code (the project's `AGENTS.md` says the same).

## Architecture: config-first

```
app/            layout.tsx (fonts, metadata, viewport, JSON-LD, skip link), page.tsx (section order), globals.css (tokens, shapes, CSS animations), icon.png, opengraph-image.png
components/     one file per section + small parts (Button, Photo, Reveal, SectionTitle, Counter, ...)
content/        site.ts (ALL client content + `enabled` flags), placeholder-photos.ts
lib/            status.ts (open/closed), contact.ts (tel, wa.me), jsonld.ts
public/         client assets (logo, hero, video + poster)
```

- Components contain no client text; sections read `site.*` and hide when `enabled: false`.
- Server components by default. Client components only for: mobile menu `<dialog>`, number counters, video play/pause, live open/closed status, intro skip.
- Template for `content/site.ts`: `guidelines/content-site.example.ts`.
- Live status uses `useSyncExternalStore` with a `null` server snapshot (no hydration mismatch) and `Intl.DateTimeFormat` in the client's timezone (`Europe/Bucharest`).

## Budgets (emulated mobile: CPU 4x, ~1.6 Mbps, 150 ms; production build)

| Metric | Target | Raf Gym final |
|---|---|---|
| LCP | < 2.5 s | 2.2 s |
| CLS | < 0.1 | 0.000 |
| Transferred (home, returning visitor, above the fold) | < 500 KB | ~420 KB |
| JS | < 150 KB | 144 KB |
| Fonts | < 120 KB | 107 KB |
| Video | < 2 MB, poster, pause button | 1.6 MB |
| TBT | as low as possible | ~690 ms (framework + layout; not fixed) |

Measure with `tools/audit/audit.js` (see skill `site-audit`). Record before/after.

## Next.js 16 notes **[verified in the Raf Gym build]**

- `LayoutProps<"/">` is a generated global type: run `npx next typegen` before `tsc` on a fresh project.
- Remote images: `images.remotePatterns` in `next.config.ts` (CC0 hosts used: `images.rawpixel.com`, `pd.w.org`, `live.staticflickr.com`, `upload.wikimedia.org`, `cdn.stocksnap.io`).
- `metadataBase` from `process.env.VERCEL_PROJECT_PRODUCTION_URL` (fallback `http://localhost:3000`); `themeColor` is exported from `viewport`, not `metadata`.
- File conventions: `app/icon.png`, `app/opengraph-image.png`, `app/not-found.tsx`.
- Scripts in components warn on the client; put the pre-paint script in the root layout `<head>`.
- Fonts: `next/font/google` with only used weights/styles; variable fonts for body.

## Tailwind 4 and CSS pitfalls **[verified]**

- Important modifier is a suffix: `min-h-11!`.
- Unlayered CSS beats utilities. Put custom shape classes in `@layer components` so `[--cut:22px]` overrides work.
- A custom property containing `var(--x)` resolves where it is declared, not where used. Write `clip-path: polygon(... var(--cut))` inside the class that uses it.
- `clip-path` clips outline and shadow: shadow via pseudo-element with the same polygon, moved with `transform`; focus and hover share one visible state.
- `@container` + `cqw` units for text that scales with its box (watermarks).
- Scroll reveals: `animation-timeline: view()` with `animation-fill-mode: backwards` (not `both`, which blocks hover transforms). Never put another `transform` on the same node.
- `html { scroll-padding-top: 5rem; scroll-behavior: smooth }`; reduced motion turns smooth scroll off.
- `content-visibility: auto` on sections cut TBT (765 -> 149 ms) **but broke mobile anchors** (height estimate drift). Do not use unless anchors are retested.

## Accessibility (verify, do not assume)

Skip link; visible `:focus-visible`; headings ordered; landmarks labeled (`nav` aria-labels differ); decorative media `aria-hidden`; real pause for video; `touch-action: manipulation`; `overscroll-behavior: contain` on the dialog menu; `text-wrap: balance`; reduced motion; contrast checked on solid backgrounds (photos need manual review).

## SEO and metadata

- `<title>`, description, canonical, Open Graph + Twitter, `theme-color`, `lang="ro"`.
- JSON-LD from config (`lib/jsonld.ts`): pick the `@type` from the niche file (`SportsActivityLocation`, `Restaurant`, `HairSalon`, `Dentist`, ...). No `aggregateRating` from unverified exports.
- `robots: noindex` until launch. At launch add `app/sitemap.ts`, `app/robots.ts`, remove `noindex`.
- Local SEO text: city and neighborhood in headings and footer address; consistent NAP (name, address, phone).

## Forms and contact

No fake forms. Contact paths that need no backend: `tel:`, `wa.me/<digits>?text=<prefilled>`, mailto, map link. A real form needs a real endpoint (serverless function + spam protection + privacy text); do not simulate sending.

## Quality commands (run before every push)

```bash
npx next typegen && npx tsc --noEmit && npx eslint . && npx next build
```

Then serve the production build (`npx next start -p 3100`) and run `tools/audit`.

## Dependencies

Default: `next`, `react`, `react-dom`, `tailwindcss`, `@tailwindcss/postcss`, TypeScript, ESLint. Adding anything else needs a one-line reason in the project CLAUDE.md (ponytail: stdlib, native, existing dependency first).
