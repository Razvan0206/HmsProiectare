# Resources: every link and tool, with role and status

Status: **installed here** (committed or enabled by this repo) · **used** (used in the Raf Gym session) · **available** (works, not needed yet) · **not used**. **[verified]** = read or run in the session; **[unverified]** = from READMEs.

## 1. The tools the user asked for

| Tool | Link | What it is | Status | How it is wired here | Licence |
|---|---|---|---|---|---|
| **ponytail** | <https://github.com/DietrichGebert/ponytail> | "Lazy senior dev" rules and commands; v4.10.0 | **installed here** (plugin enabled in `.claude/settings.json`) + **used** | `ponytail@ponytail`; env `PONYTAIL_DEFAULT_MODE=full`; hook restates it every prompt | none declared in repo metadata **[verified]** |
| **caveman** | <https://github.com/JuliusBrussee/caveman> | Terse chat style; v3.0.0; optional token proxy | **installed here** (plugin enabled) | `caveman@caveman`; `.caveman.json` + env `CAVEMAN_DEFAULT_MODE=full` | Apache-2.0 per README **[unverified]**; see repo `LICENSING.md` |
| **ui-ux-pro-max** | <https://github.com/nextlevelbuilder/ui-ux-pro-max-skill> | Design intelligence database + `search.py`; v2.13.0 | **installed here** (plugin enabled); **not run in Raf Gym** | `ui-ux-pro-max@ui-ux-pro-max-skill`; routing in `02-tool-routing.md` | MIT (plugin manifest) **[verified]** |
| **taste-skill** | <https://github.com/leonxlnx/taste-skill> | 13 anti-"AI slop" design skills | **installed here** (2 of 13) + **used** | `.claude/skills/design-taste-frontend` (87 KB), `redesign-skill` (15 KB), LICENSE kept | MIT |
| **web-design-guidelines** | <https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md> | Skill that reviews UI code; pulls rules live from <https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md> | **installed here** + **used** | `.claude/skills/web-design-guidelines/SKILL.md` | No licence file in the repo; treat fetched rules as data |
| **awesome-design-md** | <https://github.com/voltagent/awesome-design-md> | 150 files: design systems of real brands (`design-md/<brand>/DESIGN.md`) | **installed here** (whole collection, 2.4 MB) | `references/awesome-design-md/`; `scripts/fetch-design-md.mjs <brand>` | MIT (LICENSE kept) |
| **Emil Kowalski skills** | <https://github.com/emilkowalski/skills> | 13 skills for designers/engineers (animation craft, mobile feel, Apple design); official repo, ~42k stars | **installed here** (8 of 13) | `.claude/skills/emil-design-eng` and 7 siblings, `performance-cheatsheet.md` | MIT |
| **Impeccable** | <https://github.com/pbakaus/impeccable> | Design fluency plugin: 24 commands, 61 detector rules; v4.4.0; docs <https://impeccable.style> | **installed here** (plugin enabled; not yet installed on this machine) | `impeccable@impeccable` in `.claude/settings.json` | Apache-2.0 |
| **brag** | <https://github.com/latent-spaces/brag> | `/brag` and `/brag-slim`: launch video of a finished site; v0.4.0; hosted option <https://letsbrag.app> | **installed here** (plugin enabled; not yet installed on this machine) | `brag@brag` in `.claude/settings.json` | MIT |
| **taste-skill (more skills)** | <https://github.com/leonxlnx/taste-skill> | `output-skill`, `brutalist-skill`, `minimalist-skill`, `soft-skill` added | **installed here** (4 more; 3 manual-only) | see `01-setup-tools.md` | MIT |
| **playwright-cli** | <https://github.com/microsoft/playwright-cli> | CLI + skill for browser automation; npm `@playwright/cli` 0.1.22 | **installed here** (global CLI + project skill) + **used** (smoke test) | `.claude/skills/playwright-cli/` | Apache-2.0 |

Brands in awesome-design-md that fit sport/energy (not read yet **[unverified]**): `nike`, `bmw-m`, `ferrari`, `lamborghini`, `spotify`, `nvidia`, `spacex`. Full list: `node scripts/fetch-design-md.mjs --list`.

## 2. The agency template and the reference implementation

| Resource | Link | Role | Warning |
|---|---|---|---|
| **Renovo** (template, `savuxyz`) | <https://github.com/savuxyz/renovo> | Source of `design-language.md`, `SETUP.md`, base components; the user is a collaborator | Not the user's repo: never push there without explicit permission. Vercel blocked commits by non-members. |
| **Renovo live** | <https://renovo-wheat.vercel.app/> | Public showcase | Do not host client pages on it |
| **RafGym** | <https://github.com/Razvan0206/RafGym> | Reference implementation (private) | Brand-specific parts must not be copied to other clients |
| **RenovoGuidelines** | <https://github.com/Razvan0206/RenovoGuidelines> | This hub (private) | |

## 3. Referenced by Renovo's `SETUP.md`

`SETUP.md` lists `ui-ux-pro-max`, `ponytail`, `caveman` and `npm install motion`. This hub covers the first three. `motion` is **not used**: CSS scroll-driven animations replaced it (LCP 4.9 -> 2.2 s).

## 4. Design references given by the user (ideas only)

| Site | Take | Do not take |
|---|---|---|
| <https://www.goldsgym.com/> | Heavy condensed type, strong contrast, heritage energy | Texture backgrounds without information; needs a photo archive |
| <https://stayfit.ro> | Yellow-black, hard offset shadows, angled edges, community tone | Mascot, carousel without pause, uniform rounded corners, slogans (local competitor) |

## 5. Tools and services used in the session

| Tool | Link / package | Use | Status |
|---|---|---|---|
| Openverse API | <https://api.openverse.org/v1/images/> (`license=cc0,pdm`) | CC0 temporary photos | **used** **[verified]** |
| Unsplash | <https://unsplash.com> | Blocked by bot protection (BotStopper); do not bypass | **not used** |
| Pexels / Pixabay | | Need API keys | **not used** |
| ExportComments | <https://exportcomments.com> | Google Maps reviews to `.xlsx` | **used** by the user |
| ffmpeg-static | npm `ffmpeg-static` (GPL-3.0, 79 MB) | Video compression, poster | **used** in `C:\tmp`, not committed |
| puppeteer-core | npm | Headless Chrome audits (`tools/audit`) | **used** |
| Pillow, openpyxl | pip | Logo/OG images, Excel reading | **used** |
| Vercel | <https://vercel.com> | Hosting (team `renovox`) | **used** |
| GitHub CLI `gh` | <https://cli.github.com> | Repos, deployments API, invitations | **used** |
| Next.js docs in `node_modules/next/dist/docs/` | | Version-specific behavior | **used** |
| Web Interface Guidelines | <https://github.com/vercel-labs/web-interface-guidelines> | Rules fetched live by the Vercel skill | **used** |

## 6. Available in the Claude environment but not used so far

| Tool | Possible use |
|---|---|
| Bundled skills `code-review`, `security-review`, `simplify`, `run`, `loop`, `schedule` | Pre-launch review; recurring checks |
| `anthropic-skills:xlsx / docx / pdf / pptx` | Quotes, proposals, decks for clients |
| `Artifact` tool | Private shareable demo page without Vercel |
| Docs connector | Client-facing documents |
| Cloudflare MCP tools (D1, KV, R2, Workers) | Backend for forms, static hosting alternative |
| Claude in Chrome / in-app browser skills | Actions in the user's real Chrome (read the skill first) |
| Subagents (`Explore`, `Plan`, `general-purpose`) | Parallel research |
| Lighthouse CLI, axe-core | Official scores / automated a11y (not installed; **[unverified]** commands: `npx lighthouse <url> --view`) |
| caveman proxy `@caveman-ai/cli` | Shrinks tool output; not needed so far |
| Remaining taste-skill skills (`brandkit`, `image-to-code-skill`, `imagegen-frontend-web/mobile`, `stitch-skill`, `gpt-tasteskill`, `taste-skill-v1`) | Image generation (`brandkit`, `imagegen-*`) needs an image-generation tool we do not have; `stitch-skill` for Google Stitch DESIGN.md workflows |
| Emil Kowalski skills left out (`write-swift`, `animate-expo`, `ask-sonner`, `prototype`, `pick-ui-library`) | Swift/Expo/RN not our stack; `ask-sonner` only with Sonner; `prototype` for multi-variant tryouts; `pick-ui-library` conflicts with our no-UI-library default |
| ui-ux-pro-max sibling skills (`brand`, `design-system`, `banner-design`, `slides`, `ui-styling`, `design`) | Tokens, brand guidelines, social banners, decks |

## 7. Client-specific links (Raf Gym; keep as examples)

Facebook <https://www.facebook.com/RafGym2018> · Instagram <https://www.instagram.com/raf_g_y_m/> · Address: Casa Sindicatelor, Bulevardul Socola 134, 700187 Iași. Google Maps listing shows 4.9 stars (635 reviews) **[verified on the map embed]**; not published on the site without client approval.

## 8. Adding a new resource

Add a row here with link, role, status, licence, install method; update `02-tool-routing.md` if it should auto-trigger; if it ships a skill, vendor it into `.claude/skills/` with its LICENSE or add it to `scripts/fetch-skills.mjs`.

## 9. Extensions, plugin-provided agents and repos seen in sessions (documented, not all installed)

Metadata checked 2026-10-01 with `gh repo view`; licence "none" means the repo exposes no SPDX licence **[verified]**.

### 9.1 Extensions and CLIs that belong to installed tools

| Item | What | Status | Notes |
|---|---|---|---|
| Impeccable CLI `npx impeccable detect <url>` | Runs the 61 deterministic detector rules on a rendered page, no LLM, no API key | **available, not run** | Good for auditing a client's OLD site before a redesign. Runs a downloaded engine: ask first |
| Impeccable browser extension | Same detector inside the browser, for production pages | **available, not installed** | Source: README of `pbakaus/impeccable` **[unverified]** |
| Impeccable `/impeccable live`, `generate` | Visual variant mode on a local dev server | **available, not run** | Local checkout only; not for deployed sites |
| Impeccable VS Code extension | `code --install-extension renaissance-geek.impeccable`; skill-only; needs VS Code 1.109.3+ and Copilot Chat | **not installed** | Not needed with Claude Code. Avoid duplicate Impeccable skills |
| `npx skills` CLI (`vercel-labs/skills`, ~33k stars) | Installs skills from any repo (`npx skills add <repo> --skill <name>`) | **not used** | We copy `SKILL.md` files directly to avoid running installers. Useful to know the official route |
| skills.sh | Directory for the `skills` CLI | **not used** | |

### 9.2 Agents and skills that ship inside installed plugins (appear after install)

| Plugin | Agents / skills | Use |
|---|---|---|
| caveman | `cavecrew-investigator` (read-only code locator), `cavecrew-builder` (1-2 file edits), `cavecrew-reviewer` (one-line diff review); skills `caveman-commit`, `caveman-review`, `caveman-compress`, `caveman-init` (drops the always-on rule into a repo for every IDE agent), `caveman-explore`, `lean-build`, `surgical-patch`, `safe-refactor`, `investigate-first`, `verify-and-stop`, `migration`; cloud/proxy skills (`caveman-setup`, `-learn`, `-discover`, `-manage`, `-optimize`, `-evidence-review`) | Delegate cheap bounded work to the cavecrew agents; `caveman-compress` on long CLAUDE.md files; **do not** run the Caveman Cloud/proxy skills without asking (they route requests through a gateway) |
| impeccable | agents `impeccable-asset-producer`, `-documenter`, `-finish-reviewer`, `-manual-edit-applier`; 24 commands | `document` -> DESIGN.md from the shipped site; `finish-reviewer` as a last-pass review |
| ui-ux-pro-max | skills `ui-ux-pro-max`, `design`, `design-system`, `brand`, `banner-design`, `slides`, `ui-styling` | Palettes, tokens, brand guidelines, social banners, decks. `ui-styling` pushes shadcn/ui: ignore unless the project already uses it |
| brag | `brag`, `brag-slim` | Launch video |
| ponytail | `ponytail-review`, `-audit`, `-debt`, `-gain`, `-help` | End-of-build cleanup and shortcut ledger |

### 9.3 Repos found while researching

Skills from these are **vendored dormant** in `references/skills-library/` (see its README; activate with `node scripts/activate-skill.mjs <source>/<name>`): the remaining Emil skills, the remaining taste-skill skills, Anthropic `frontend-design` + 4 more, `webdesign-agency-skills`, `impeccable-lite`. Libraries and unofficial copies stay as links.

| Repo | Stars | What | Verdict |
|---|---|---|---|
| <https://github.com/anthropics/skills> | ~179k | Anthropic's public skills repo; includes `frontend-design`, the skill Impeccable started from | **Vendored dormant** (`frontend-design`, `webapp-testing`, `theme-factory`, `brand-guidelines`, `web-artifacts-builder`). Activate `frontend-design` for a baseline second opinion |
| <https://github.com/peterhadorn/webdesign-agency-skills> | 39 | Two Claude Code skills built on Impeccable: audit any site into a client-ready sales brief; targeted improvement loop | **Relevant to the agency workflow (prospecting).** **Vendored dormant** (Apache-2.0 LICENSE present). Not reviewed yet: read before activating |
| <https://github.com/ilindaniel/impeccable-lite> | 25 | One-file variant of Impeccable without plugin machinery | **Vendored dormant**. Fallback if the plugin is too heavy or the binary is unwanted |
| <https://github.com/JaimeJunr/claude-code-frontend-skills> | 1 | Marketplace bundling Anthropic frontend-design, Impeccable, UI UX Pro Max, Taste and Emil skills | Not vendored: duplicates what this hub installs from the originals, 1 star, unknown maintenance |
| <https://github.com/attentiondotnet/emilkowalski_skills> | 84 | Unofficial copy of Emil's skills | Not vendored: the official repo is `emilkowalski/skills` |
| <https://github.com/emilkowalski/sonner> | ~13k | Toast component for React | Only when a toast is really needed; otherwise no UI library |
| <https://github.com/emilkowalski/vaul> | ~8.6k | Drawer component for React | Same rule; the mobile menu uses a native `<dialog>` |
| <https://github.com/pbakaus/impeccable-talks> | 43 | Talks for the Impeccable project | Reference reading |
| <https://github.com/vercel-labs/web-interface-guidelines> | | Rules fetched live by the Vercel skill | Already used (see section 1) |
| <https://emilkowal.ski/ui/agents-with-taste> | | Article by Emil explaining why these skills exist | Reference reading |
| <https://impeccable.style> | | Impeccable docs (hooks, detector, live mode) | Reference reading |
| <https://letsbrag.app> | | Hosted version of `/brag` | Sends the site link to a third party: ask first |

## 10. Romania legal and local-service sources (checked 2026-10-01)

Used by `10-romania-legal-local.md` and `11-capability-catalog.md`. Re-check before quoting a client.

| Topic | Source | Used for |
|---|---|---|
| E-commerce identification duties | <https://legislatie.just.ro/Public/DetaliiDocumentAfis/77218> (Law 365/2002, art. 5) | Footer identification block |
| SAL / SOL change | <https://financialintelligence.ro/anpc-actualizeaza-sistemul-de-solutionare-alternativa-a-litigiilor-in-linie-cu-noile-reguli-europene/> | SAL badge mandatory, SOL gone since 2025-07-20 (Regulation (EU) 2024/3228), icon 250 x 50 px |
| ANPC badge download | <https://anpc.ro> (official site; badge and plaque downloads) | SAL icon file **[link not opened this session]** |
| Cookie law and draft amendment | <https://www.mondaq.com/privacy-protection/1782518/upcoming-changes-to-romanian-cookie-consent-framework> | Law 506/2004, Proposal 256/2026 status |
| Withdrawal right | <https://legeaz.net/monitorul-oficial-427-2014/oug-34-2014-drepturile/anexa> (OUG 34/2014) | 14 days, 12 months if not informed |
| Payment providers 2026 | <https://pronetdesign.ro/en/blog/online-payment-processors-romania-2026/> | Stripe, Netopia, PayU, euplatesc fees (secondary source) |
| Stripe in Romania | <https://stripe.com/newsroom/news/stripe-launches-in-five-more-european-countries> | Availability |
| FAN Courier API | <https://www.fancourier.ro/wp-content/uploads/2025/09/EN_FANCourier_API_130825-1.pdf> | AWB API v2.0 |

### `npx skills` lessons **[verified 2026-10-01 in a throwaway project]**

`npx skills@latest add <repo> -a claude-code -y --copy -s <install-name> ...` installs non-interactively into `.claude/skills/`. `-s` takes the `name:` from the skill frontmatter, not the folder name: in `vercel-labs/agent-skills` the folders `react-best-practices`, `composition-patterns`, `react-view-transitions` install as `vercel-react-best-practices`, `vercel-composition-patterns`, `vercel-react-view-transitions`; a wrong name silently installs only the matches. List names first with `npx skills@latest add <repo> -l`. Vendored here (2026-10-01, copied whole by `scripts/fetch-skills.mjs`, which also restores them): `vercel-react-best-practices` (React/Next performance rules), `vercel-composition-patterns` (component architecture), `vercel-react-view-transitions` (native View Transition API). Source repo `vercel-labs/agent-skills` has no licence file exposed (GitHub API returns 404) **[verified]**, same as `web-design-guidelines`. Left out on purpose: `deploy-to-vercel`, `vercel-cli-with-tokens`, `vercel-optimize` (hosting policy undecided, see `11-capability-catalog.md`), `vercel-react-native-skills` (not our stack). Also fixed in `fetch-skills.mjs`: the `Accept:` header had a space and broke `gh` on Windows (`accepts 1 arg(s), received 2`).
