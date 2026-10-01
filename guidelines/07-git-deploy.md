# Git, GitHub and Vercel

## Repo rules

- **One repo per client.** Create it empty, make the first commit with `package.json`, only then import to Vercel.
- **Git identity per repo** (the machine's global config may hold an old e-mail): `git config user.email <user's GitHub e-mail>` and `git config user.name <GitHub login>`. Check `git log -1 --format='%an <%ae>'` after the first commit.
- Commit messages: concise, conventional style; end with the attribution trailer the session requires.
- Line-ending warnings (LF -> CRLF) on Windows are harmless.
- Never commit `.env*`, large originals, node_modules, `.playwright-cli/`. Large client originals stay in the client's materials folder.
- Before making a repo public: scan for secrets (`git grep -nIE "(api[_-]?key|secret|passw(or)?d|token|bearer|gh[pousr]_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|BEGIN (RSA|OPENSSH|PRIVATE))"`), check commit author e-mails, and tell the user what becomes public (client photos, real reviewer names, licenses). A public/private flip locks the repo for a few seconds.

## Push policy

Follow the user's standing rule from memory (in the Raf Gym project: commit + push to `main` after every requested change, no asking). It never covers repos the user does not own, force-pushes, or history rewrites. Force push only with `--force-with-lease=<branch>:<sha>` and explicit approval. Prefer `git revert` over reset + force-push.

## Vercel **[verified in the Raf Gym project]**

| Symptom | Cause | Fix |
|---|---|---|
| `/` 404 with header `x-vercel-error: NOT_FOUND`, but `/logo.png` returns 200 | Framework Preset = "Other" (repo was empty at import); only `public/` is served | Settings -> Build and Deployment -> Framework Preset = Next.js, leave overrides off, Redeploy without build cache. Or delete the project and import after the first commit |
| "Deployment was blocked" on every commit | Plan Hobby: commit author is not a member of the project; changing the e-mail alone did not help | Owner approves in the dashboard, or host the repo in your own Vercel account/team |
| URL answers 302 | Deployment Protection / Vercel Authentication | Production domain should be public; Settings -> Deployment Protection |
| `<name>.vercel.app` 404 | Domain not assigned to the project (they are global names) | Settings -> Domains -> Add; if taken choose another |
| Cannot add a subdomain of `*.vercel.app` | Domain belongs to Vercel | Use a custom domain, or serve the new site as a path of the existing app |

Settings that do NOT need touching: build command, output directory, install command, environment variables (none by default), analytics. Production branch is `main`.

Check a deploy without the dashboard:

```bash
id=$(gh api repos/<owner>/<repo>/deployments -q '.[0].id')
gh api repos/<owner>/<repo>/deployments/$id -q '{sha:.sha[0:7],env:.environment}'
gh api repos/<owner>/<repo>/deployments/$id/statuses -q '.[0]|{state,description,url:.environment_url}'
```

Verify a pushed commit by comparing `sha` with `git rev-parse --short HEAD`, wait until the state is not `pending`/`in_progress`/`queued`.

## Collaborators

`gh api -X PUT repos/<owner>/<repo>/collaborators/<login> -f permission=push` sends an invitation (works on private repos). On **personal-account** repos the invitee gets write access only; `admin`, `maintain`, `triage` exist only on organization repos. To give full control: move the repo to an organization or transfer ownership (hard to undo; ask first). The invitee must accept. A repo locked after a visibility change returns 403 "Repository has been locked": retry after a few seconds.

## Windows and environment gotchas **[verified]**

- Paths over 260 characters break `npm install` and Python (`FileNotFoundError`). Work in `C:\tmp\...` for temp tools; Node and `ls` cope, Python and npm do not.
- Python console is cp1252: write UTF-8 files and read them back, or `print(text.encode('ascii','replace').decode())`. Open files with `encoding='utf-8'`.
- `taskkill //F //IM node.exe` stops every Node process; stop a server by port: `netstat -ano | grep :3100`.
- In-app browser pane can be hidden: screenshots come out black and `IntersectionObserver` does not fire. Use `puppeteer-core` (headless Chrome) or `playwright-cli` instead. Read the browser skill before the first browser step.
- Chrome headless flag `--force-prefers-reduced-motion` skips intros: handy for quick screenshots.
- The permission classifier may return "no verdict" (transient: retry once) or block force-push and cross-repo copies until the user says so explicitly. Do not work around a denial; ask.
