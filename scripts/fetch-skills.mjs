#!/usr/bin/env node
// Refresh the third-party project skills from their GitHub sources (see guidelines/RESOURCES.md).
// They are already committed in .claude/skills; run this to update them or to restore a missing one.
//   node scripts/fetch-skills.mjs
process.noDeprecation = true; // shell:true with fixed args is intended on Windows (.cmd shims)
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const win = process.platform === "win32";
const raw = (repo, path) =>
  execFileSync("gh", ["api", `repos/${repo}/contents/${path}`, "-H", "Accept:application/vnd.github.raw"], {
    encoding: "utf8",
    shell: win,
    maxBuffer: 20 * 1024 * 1024,
  });

// Single files: [repo, path in repo, destination]
const files = [
  ["leonxlnx/taste-skill", "skills/taste-skill/SKILL.md", ".claude/skills/design-taste-frontend/SKILL.md"],
  ["leonxlnx/taste-skill", "LICENSE", ".claude/skills/design-taste-frontend/LICENSE"],
  ["leonxlnx/taste-skill", "skills/redesign-skill/SKILL.md", ".claude/skills/redesign-skill/SKILL.md"],
  ["leonxlnx/taste-skill", "skills/output-skill/SKILL.md", ".claude/skills/full-output-enforcement/SKILL.md"],
  ["vercel-labs/agent-skills", "skills/web-design-guidelines/SKILL.md", ".claude/skills/web-design-guidelines/SKILL.md"],
  ["emilkowalski/skills", "LICENSE", ".claude/skills/emil-design-eng/LICENSE"],
  ["emilkowalski/skills", "performance-cheatsheet.md", ".claude/skills/emil-design-eng/performance-cheatsheet.md"],
];
// Whole skill folders from emilkowalski/skills (web-relevant ones only)
const emil = ["emil-design-eng", "animate", "animation-vocabulary", "apple-design", "find-animation-opportunities", "improve-animations", "mobile-native", "review-animations"];

// Whole skill folders from vercel-labs/agent-skills: [folder in repo, install name = SKILL.md `name:`].
// Deploy/CLI/native skills are left out on purpose (hosting policy undecided, stack is web only).
const vercel = [
  ["react-best-practices", "vercel-react-best-practices"],
  ["composition-patterns", "vercel-composition-patterns"],
  ["react-view-transitions", "vercel-react-view-transitions"],
];

const list = (repo, path) =>
  JSON.parse(execFileSync("gh", ["api", `repos/${repo}/contents/${path}`], { encoding: "utf8", shell: win, maxBuffer: 20 * 1024 * 1024 }));
const copyDir = (repo, path, dest) => {
  for (const e of list(repo, path)) {
    if (e.type === "dir") copyDir(repo, e.path, join(dest, e.name));
    else {
      mkdirSync(dest, { recursive: true });
      const text = raw(repo, e.path);
      writeFileSync(join(dest, e.name), text);
      console.log(`${repo}/${e.path} -> ${join(dest, e.name)} (${text.length} chars)`);
    }
  }
};

for (const [repo, src, dest] of files) {
  mkdirSync(dirname(dest), { recursive: true });
  const text = raw(repo, src);
  writeFileSync(dest, text);
  console.log(`${repo}/${src} -> ${dest} (${text.length} chars)`);
}
for (const name of emil) copyDir("emilkowalski/skills", `skills/${name}`, `.claude/skills/${name}`);
for (const [src, name] of vercel) copyDir("vercel-labs/agent-skills", `skills/${src}`, `.claude/skills/${name}`);

// The three taste style skills are manual-only (disable-model-invocation: true) and are not refreshed here
// to keep that edit; re-add them by hand if needed (see guidelines/RESOURCES.md).

try {
  execFileSync("playwright-cli", ["install", "--skills"], { stdio: "inherit", shell: win });
} catch {
  console.log("playwright-cli not available; skip (npm install -g @playwright/cli@latest, with the user's OK).");
}
