---
name: ship-site
description: Commit, push, deploy and verify a site on GitHub and Vercel; set git identity; check deployment status; fix Vercel 404/blocked/302 problems; make repos private or public; invite collaborators. Use when the user says push, deploy, publish, Vercel, domain, repo, collaborator or asks why a URL gives 404.
---

# Ship site

Read `guidelines/07-git-deploy.md`.

1. Repo identity: local `git config user.email` and `user.name`; check the commit author.
2. Run the quality commands (see `site-audit`), then commit (attribution trailer required) and push per the user's standing rule from memory. Never force-push, or push to repos the user does not own, without explicit approval.
3. Check the deploy: `gh api repos/<owner>/<repo>/deployments` (+ `/statuses`); match `sha` with `git rev-parse --short HEAD`.
4. Probe the public URL with `curl -s -o /dev/null -w '%{http_code}'`. 404 with `x-vercel-error: NOT_FOUND` and a working `/logo.png` = framework preset "Other"; 302 = deployment protection; "blocked" = project membership.
5. Visibility and collaborators: before going public, scan for secrets and tell the user what becomes public. Invitation: `gh api -X PUT repos/<owner>/<repo>/collaborators/<login> -f permission=push` (personal repos: write only).
6. Report briefly: commit, deploy state, URL, what the user must do in the Vercel dashboard.
