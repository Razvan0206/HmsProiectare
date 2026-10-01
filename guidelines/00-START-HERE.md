# START HERE: zero to finished site

Runbook for a fresh Claude Code instance. Follow phases in order; each has a gate. Details per phase: `03-workflow.md`.
Ponytail + caveman are always on (see `CLAUDE.md`). Chat in Romanian.

## 0. Before anything

1. Read `CLAUDE.md`, then this file, then `02-tool-routing.md`.
2. Run `node scripts/doctor.mjs`. If tools are missing, tell the user (Romanian) with the exact fix. Do not install global tools without asking.
3. Check the user's memory for standing rules (push permissions, git identity, repo owner).

## Phases (summary)

| # | Phase | Output | Gate to continue |
|---|---|---|---|
| 1 | **Intake** | Materials inventory + missing list | You know client, niche, city, goal, what exists, what is missing |
| 2 | **Niche + references** | `guidelines/niches/<slug>.md` loaded (or created) | Section list and primary conversion goal chosen |
| 3 | **Analyze materials** | Notes on logo, photos, flyer, video, texts, brand colors | Logo extractable uncropped; usable photo count known |
| 4 | **Direction** | Identity brief: color roles, shape system, type pairing, motion level, layout moves | Derived from the client's brand, different from Renovo and from references |
| 5 | **Scaffold** | New repo, Next.js, tokens, `content/site.ts`, CLAUDE.md | `tsc`, `eslint`, `build` pass on an empty page |
| 6 | **Build** | Sections from the niche file, placeholders visibly marked | Every section reads from config; no client text in components |
| 7 | **Verify** | Audit report (perf, a11y, SEO, anchors, visual) | Budgets in `05-technical-standards.md` met or exceptions written down |
| 8 | **Ship** | Vercel deploy, domain, protection checked | Public URL opens from a phone without a login |
| 9 | **Deliver** | Demo message + video, then call | Client reaction captured; open items listed |
| 10 | **Handover/launch** | Launch checklist done, `noindex` removed | Client approved content, photos, reviews, domain |

## Intake questions (ask in one message, Romanian)

Business name and city; what they sell and to whom; the one action they want visitors to take (call, WhatsApp, book, visit, buy); existing site or social pages; logo (best file you have); 10+ real photos or video; flyer/menu/price list; opening hours; phone and WhatsApp; sites they like and dislike; anything legally required (authorizations, GDPR contact); company identification for the footer (exact name, CUI, Reg. Com., registered address, e-mail); formal ("dumneavoastră") or informal ("tu") tone; Romanian only or also English; features beyond a brochure (form, booking, shop, blog, newsletter: see `11-capability-catalog.md`); who issues invoices if they sell online; deadline and budget; who approves content; domain they own and who holds the registrar login.

Missing items are not blockers: build with visible placeholders ("Aici vor veni informații despre…") and list what is needed.

## Rules that save the most time

- Romanian client = read `10-romania-legal-local.md` before copy, footer, forms or shop work. Need beyond a brochure (form, CMS, booking, shop, newsletter) = pick from `11-capability-catalog.md`, link-out first.
- One repo per client; create it empty, then import to Vercel **after** the first commit with `package.json` (see `07-git-deploy.md`).
- Derive identity from the client's own materials (colors from the flyer, shapes from the logo). Do not reuse another site's look.
- Config-first: all text, prices, hours, photos live in one file; sections have `enabled` flags.
- Verify with real measurements, not by eye: `site-audit` skill.
- Do not invent: offers, hours, trainers, reviews, ratings, phone numbers.
- Commit small, push per the user's standing rule, then check the deploy status through `gh api repos/<owner>/<repo>/deployments`.

## When you are stuck

`09-lessons-raf-gym.md` lists mistakes already made and their fixes. `RESOURCES.md` lists every tool and link with how it was installed.
