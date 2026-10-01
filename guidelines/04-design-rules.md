# Design rules (all niches)

Framework, not a look. Each client gets its own identity derived from its own materials. These rules merge Renovo's `design-language.md`, the taste-skill checklist, Vercel interface guidelines and the Raf Gym lessons.

## 1. Derive identity, never pick it

1. **Colors**: sample real pixels from the logo/flyer. Assign roles, never raw hex in components: `brand` (fixed), `ink` (fixed), `accent`, `background`, `foreground`, `card`, `muted`, `muted-foreground`, `border`, `ring`. Sections with a different tone remap neutrals via a class (e.g. `.tone-yellow` flips `accent` to ink).
2. **Shapes**: take one geometric motif from the logo or print material (hexagon, circle, arrow, stripe) and use it as the system: image masks, status dots, separators, buttons. One corner language for the whole site (cut corners, or sharp, or one radius). Never mix.
3. **Type**: two families max; heading and body from different roles; load only the weights/styles used. Display italic/condensed suits sport; serif suits premium/hospitality; geometric sans suits clinics. Never default to Inter-only.
4. **Industry check**: run ui-ux-pro-max `--design-system` for the niche and compare. Where the brand already has an answer, the brand wins.
5. **Reference sites**: ideas only. Write "take / don't take" lists. Never mascots, slogans, textures without information, or whole layouts.

## 2. Type and spacing

- Scale ratio ~1.25 from 16 px; display sizes use `clamp()`; line-height 1.1-1.2 display, 1.3 headings, 1.5-1.6 body.
- Body measure 45-75 characters; headings `text-wrap: balance`.
- Spacing 4 px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding 64 px mobile, 96-128 px desktop.
- Numbers in changing/aligned contexts: `tabular-nums`.

## 3. Layout variety

- Never three identical cards in a row as the default; break with asymmetric grids (7/5, 5/7), offsets, one featured card, mosaics, angled section edges.
- No two neighboring sections with the same layout family. Hero is usually a split (text + hexagon/image) or text over image, never a centered stack of badges.
- Hero text stack max 4 items: headline, subhead (<= ~20 words), CTAs, one status line.
- Header: one line, <= 80 px; fixed header needs `scroll-padding-top` for anchors.
- Pricing: group by meaning (monthly, discounts, with extras, single use). Rows may echo the client's printed list.

## 3b. Shape craft (clip-path world)

`clip-path` clips outlines and shadows. Use pseudo-element shadows moved with `transform`; put hover state on the same visible change as focus; keep the CSS in `@layer components` so utilities can override; write polygons where used so per-element variables resolve.

## 4. Motion

- Motion must say something (hierarchy, state, feedback). Intro at most ~2 s, once per session, skippable, never replayed on reload.
- Prefer CSS: keyframes, `animation-timeline: view()/scroll()` for reveals, progress bar, header fade. Content is visible by default where scroll timelines are unsupported.
- Animate `transform`/`opacity`; never `transition: all`.
- `prefers-reduced-motion`: reveals and intro off, video not autoplaying, marquee stopped.
- Autoplay motion > 5 s needs a pause control (video: real pause/play button).
- Max one marquee per page; every copy of its content must be wider than the widest screen (test 3440 px).

## 5. Imagery

- Real client photos first. Temporary photos: CC0, visible watermark "Poză temporară", replaced by swapping `src` to a `/public` file.
- Face crops of real people only with client approval. Dark photos need overlays tuned for contrast, not decoration.
- Video is decorative: muted, looped, poster, pause button, compressed (~1.5 MB), not the LCP blocker.

## 6. Copy (Romanian)

- Specific verbs, concrete facts. No filler ("revoluționar", "de neratat"), no "nu doar X, ci Y", rule-of-three adjective lists, em-dash.
- Button labels name the action ("Vezi abonamentele", "Programează o ședință"). Not "Află mai mult".
- Do not repeat the same CTA intent in three places; one directions button, one call/WhatsApp cluster.
- Placeholders read "Aici vor veni informații despre …" and are greppable.

## 7. Accessibility floor

Contrast >= 4.5:1 body, 3:1 large; touch targets >= 44 px; visible focus on every control; skip link; one `h1`, ordered headings; alt text (decorative `alt=""`); icon buttons labeled; dialog for mobile nav; `lang="ro"`; no reliance on hover.

## 8. Anti-pattern list (reject on sight)

Purple/blue gradient hero; Inter everywhere; uniform large radii; emoji as icons; eyebrow "pill" badges above the H1; decorative blobs/noise/dot grids without information; bento with identical rounded tiles; auto-rotating carousels without pause; chat mascots; fake product screenshots made of divs; section numbering ("01 / Services"); scroll cues; version labels; fake testimonials; fake forms that "send" nothing; stock "AI" robot imagery; pure `#000` surfaces without reason (off-black `#0a0a0a`).

## 9. Deliberate deviations log

When you break a rule of a skill, write it in the project CLAUDE.md with the reason (client's own brand alternates yellow/black; display H1 is the identity). Unlogged deviations are bugs.
