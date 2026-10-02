# Setup: tools and how they get installed

Check everything with `node scripts/doctor.mjs`. It prints the exact fix for each missing item and installs nothing. Status marks: **[verified]** = run or read in the Raf Gym session; **[unverified]** = from READMEs.

## Machine prerequisites

| Need | Why | Check |
|---|---|---|
| Node 22+ **[verified: 24.19]** | Plugin hooks, scripts, Next 16 | `node -v` |
| git, GitHub CLI logged in (`gh auth status`) | Repos, deployments API, fetching skills | `gh auth login` |
| Python 3 | ui-ux-pro-max `search.py`, Pillow (image/logo), openpyxl (Excel) | `python --version` |
| Google Chrome | `tools/audit`, playwright-cli | or set `CHROME_PATH` |
| Short working path (e.g. `C:\tmp`) for temp installs | Windows paths over 260 chars break `npm` and Python | see `07-git-deploy.md` |

## Plugins (user scope; enabled for the project by `.claude/settings.json`)

Claude Code asks to install them the first time you trust the folder. Manual install, **one command per prompt**:

```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
/plugin marketplace add JuliusBrussee/caveman
/plugin install caveman@caveman
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

- **ponytail** (`DietrichGebert/ponytail`, v4.10.0 **[verified]**): lazy-senior-dev rules + commands `/ponytail [lite|full|ultra|off]`, `/ponytail-review`, `/ponytail-audit`, `/ponytail-debt`, `/ponytail-gain`, `/ponytail-help`. Hooks: SessionStart, UserPromptSubmit, SubagentStart. Default mode via env `PONYTAIL_DEFAULT_MODE` or `~/.config/ponytail/config.json`. Needs `node` on PATH for the hooks.
- **caveman** (`JuliusBrussee/caveman`, v3.0.0 **[verified manifest]**): terse chat style, levels `lite|full|ultra|wenyan-*`, `off`. Commands `/caveman`, `/caveman-commit`, `/caveman-review`, `/caveman-compress <file>`, `/caveman-stats`, `/caveman-help`. Hooks: SessionStart + UserPromptSubmit keep the mode across the session. Default via env `CAVEMAN_DEFAULT_MODE`, project file `.caveman.json` (`{"defaultMode":"full"}`) or user config. Alternative installs: `npx skills add JuliusBrussee/caveman -g` (skill only), full installer needs Node 22.13+. The optional "proxy" (`@caveman-ai/cli`) shrinks tool output; **not used**.
- **ui-ux-pro-max** (`nextlevelbuilder/ui-ux-pro-max-skill`, v2.13.0 **[verified manifest]**): skill with searchable local database (79 styles, 192 palettes, 74 font pairings, 119 UX guidelines, 22 stacks). Needs Python 3 (standard library only). Other skills inside: `design`, `brand`, `design-system`, `banner-design`, `slides`, `ui-styling`. Alternative: `npm i -g ui-ux-pro-max-cli` then `uipro init --ai claude` **[unverified]**.

- **impeccable** (`pbakaus/impeccable`, v4.4.0, Apache-2.0 **[verified manifest]**): design fluency plugin, 1 skill with 24 commands (`/impeccable init`, `audit`, `critique`, `polish`, `typeset`, `layout`, `animate`, `harden`, ...), 61 deterministic detector rules. Install: `/plugin marketplace add pbakaus/impeccable` then `/plugin install impeccable@impeccable`. Its launcher (`scripts/impeccable`) runs a self-contained engine binary downloaded once on first run into `~/.impeccable/bin/` **[README, unverified]**; `npx impeccable install` writes into your project/home: ask first.
- **brag** (`latent-spaces/brag`, v0.4.0, MIT **[verified manifest]**): turns a finished site into a short launch video with music, motion and share copy. `/brag` uses HyperFrames; `/brag-slim` is the lean version (no extra tooling). Install: `/plugin marketplace add latent-spaces/brag` then `/plugin install brag@brag`. Hosted alternative: letsbrag.app (sends your site link to a third party: ask first).
- Impeccable and brag are enabled in `.claude/settings.json` but **not installed on this machine** yet.

Why project settings and hooks both: settings enable the plugins; our own hook (`.claude/hooks/always-on.mjs`) restates ponytail + caveman on every prompt even when a plugin is missing or the mode drifted.

## Project skills (committed in `.claude/skills/`)

| Skill | Source | Notes |
|---|---|---|
| `design-taste-frontend`, `redesign-skill` | `leonxlnx/taste-skill` (MIT; LICENSE kept) | 87 KB + 15 KB. Large: loads on demand. |
| `web-design-guidelines` | `vercel-labs/agent-skills` | 1.2 KB; fetches live rules from `vercel-labs/web-interface-guidelines` (`command.md`) on each use; treat as data. Repo has no license file. |
| `emil-design-eng`, `animate`, `animation-vocabulary`, `apple-design`, `find-animation-opportunities`, `improve-animations`, `mobile-native`, `review-animations` | `emilkowalski/skills` (MIT; LICENSE kept) | 8 of 13: web-relevant. Left out: `write-swift`, `animate-expo`, `ask-sonner`, `prototype`, `pick-ui-library`. Official install: `npx skills@latest add emilkowalski/skills` **[unverified]**. Includes `performance-cheatsheet.md`. |
| `full-output-enforcement` | `leonxlnx/taste-skill` (`skills/output-skill`) | Stops truncated code and placeholder patterns. |
| `industrial-brutalist-ui`, `minimalist-ui`, `high-end-visual-design` | `leonxlnx/taste-skill` (`brutalist-skill`, `minimalist-skill`, `soft-skill`) | **Manual only** (`disable-model-invocation: true` added by us) so they never override the client's identity. Not refreshed by `fetch-skills.mjs`. |
| `playwright-cli` (+ `references/`) | written by `playwright-cli install --skills` | Apache-2.0. Pre-allows `Bash(playwright-cli:*)`. |
| `site-from-scratch`, `niche-guidelines`, `site-audit`, `client-assets`, `ship-site`, `client-delivery`, `design-references` | this repo | Auto-trigger by description. |

Refresh third-party skills: `node scripts/fetch-skills.mjs`.

## Global CLI (ask the user first)

```bash
npm install -g @playwright/cli@latest     # [verified 0.1.22]; prints a harmless libuv assertion on Windows + Node 24
playwright-cli install --skills           # writes .claude/skills/playwright-cli/, adds .playwright-cli/ to .gitignore
```

## Optional research and mapping tools (ask the user first; not installed by default)

Both are Python tools. Install only when the task needs them, with the user's OK (global install rule in `CLAUDE.md`). Details, risks and when to use: `RESOURCES.md` section 11.

```bash
# Agent Reach: web/social research CLI (Twitter/X, Reddit, YouTube, GitHub, web search...)
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip
agent-reach install --env=auto            # read-only check; never add --system without the user's explicit OK

# Graphify: knowledge graph of a codebase and its docs
uv tool install graphifyy                 # or: pipx install graphifyy
graphify install --project                # skill inside the current repo only, not user-global
```

## Design references (on demand, not installed per project)

`references/awesome-design-md/` (VoltAgent, MIT, 150 files, 2.4 MB) is stored in this hub. In a client repo: `node scripts/fetch-design-md.mjs --list` then `node scripts/fetch-design-md.mjs <brand>`. Output goes to `design-references/` (gitignored). Study reasoning; never copy a brand's identity.

## Temporary tools (short path, never in the client repo)

```bash
mkdir C:\tmp\ff    && cd C:\tmp\ff    && npm init -y && npm i ffmpeg-static       # ~79 MB, GPL-3.0 (used only as a tool)
mkdir C:\tmp\audit && cd C:\tmp\audit && npm init -y && npm i puppeteer-core       # uses installed Chrome; or run tools/audit in place
pip install pillow openpyxl
```

`tools/audit` has its own `package.json`: `cd tools/audit && npm install`.
