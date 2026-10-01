#!/usr/bin/env node
// Checks the tools the guidelines rely on and prints the exact fix for anything missing.
// It never installs anything. Usage: node scripts/doctor.mjs [--quiet]
//   --quiet  print only problems (used by the SessionStart hook); prints nothing when all is fine.
process.noDeprecation = true; // shell:true with fixed args is intended on Windows (.cmd shims)
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { homedir, platform } from "node:os";
import { join } from "node:path";

const quiet = process.argv.includes("--quiet");
const win = platform() === "win32";
const report = []; // { ok, label, fix }

const run = (cmd, args = ["--version"]) => {
  try {
    return execFileSync(cmd, args, { stdio: "pipe", encoding: "utf8", shell: win, timeout: 10000 }).trim();
  } catch {
    return null;
  }
};
const check = (label, ok, fix = "") => report.push({ ok: !!ok, label, fix });

// Node >= 22 (plugin hooks and the caveman installer need it)
const major = Number(process.versions.node.split(".")[0]);
check(`node ${process.versions.node}`, major >= 22, "Install Node 22+ from https://nodejs.org");

check("git", run("git"), "Install git: https://git-scm.com");
const gh = run("gh");
check("gh (GitHub CLI)", gh, "Install: https://cli.github.com, then run: gh auth login");
if (gh) check("gh logged in", run("gh", ["auth", "status"]) !== null, "Run: gh auth login");

const py = run("python3") ?? run("python");
check("python 3 (ui-ux-pro-max search.py, image/Excel scripts)", py && /Python 3/.test(py), "Install Python 3: https://www.python.org/downloads/");

const chromes = win
  ? ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"]
  : platform() === "darwin"
    ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
    : ["/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser"];
check("Chrome (tools/audit, playwright-cli)", process.env.CHROME_PATH ? existsSync(process.env.CHROME_PATH) : chromes.some(existsSync), "Install Google Chrome or set CHROME_PATH");

check("playwright-cli", run("playwright-cli"), "Ask the user, then: npm install -g @playwright/cli@latest");

// Plugins (user scope). Project settings.json enables them; Claude Code prompts to install on first trust.
let installed = {};
try {
  installed = JSON.parse(readFileSync(join(homedir(), ".claude", "plugins", "installed_plugins.json"), "utf8")).plugins ?? {};
} catch {
  /* file missing: nothing installed */
}
const plugins = [
  ["ponytail@ponytail", "/plugin marketplace add DietrichGebert/ponytail  then (separate prompt)  /plugin install ponytail@ponytail"],
  ["caveman@caveman", "/plugin marketplace add JuliusBrussee/caveman  then (separate prompt)  /plugin install caveman@caveman"],
  ["ui-ux-pro-max@ui-ux-pro-max-skill", "/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill  then (separate prompt)  /plugin install ui-ux-pro-max@ui-ux-pro-max-skill"],
  ["impeccable@impeccable", "/plugin marketplace add pbakaus/impeccable  then (separate prompt)  /plugin install impeccable@impeccable"],
  ["brag@brag", "/plugin marketplace add latent-spaces/brag  then (separate prompt)  /plugin install brag@brag"],
];
for (const [id, fix] of plugins) check(`plugin ${id}`, id in installed, fix);

// Project skills (committed in .claude/skills; refresh with scripts/fetch-skills.mjs)
for (const s of ["design-taste-frontend", "redesign-skill", "full-output-enforcement", "web-design-guidelines", "playwright-cli", "emil-design-eng", "animate", "review-animations", "mobile-native"]) {
  check(`skill ${s}`, existsSync(join(".claude", "skills", s, "SKILL.md")), "Run: node scripts/fetch-skills.mjs");
}

const problems = report.filter((r) => !r.ok);
if (quiet) {
  if (problems.length) console.log(problems.map((p) => `- MISSING ${p.label}: ${p.fix}`).join("\n"));
} else {
  for (const r of report) console.log(`${r.ok ? "ok     " : "MISSING"}  ${r.label}${r.ok ? "" : `\n          fix: ${r.fix}`}`);
  console.log(problems.length ? `\n${problems.length} problem(s).` : "\nAll good.");
}
