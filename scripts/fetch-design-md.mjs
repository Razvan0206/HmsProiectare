#!/usr/bin/env node
// Fetch one brand's DESIGN.md (from VoltAgent/awesome-design-md, MIT) as a REFERENCE for a project.
//   node scripts/fetch-design-md.mjs --list
//   node scripts/fetch-design-md.mjs <brand>        -> writes design-references/<brand>/DESIGN.md
// Uses the local copy in references/awesome-design-md when present (this hub), else GitHub via gh.
// Rule: study how a brand reasons about color, type and spacing; never copy its identity.
process.noDeprecation = true; // shell:true with fixed args is intended on Windows (.cmd shims)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const win = process.platform === "win32";
const local = join("references", "awesome-design-md", "design-md");
const gh = (args) => execFileSync("gh", args, { encoding: "utf8", shell: win, maxBuffer: 20 * 1024 * 1024 });
const arg = process.argv[2];

if (!arg) {
  console.error("Usage: node scripts/fetch-design-md.mjs --list | <brand>");
  process.exit(1);
}

if (arg === "--list") {
  const names = existsSync(local)
    ? readdirSync(local)
    : gh(["api", "repos/voltagent/awesome-design-md/contents/design-md", "-q", ".[].name"]).split(/\r?\n/).filter(Boolean);
  console.log(names.join("\n"));
  process.exit(0);
}

const brand = arg.toLowerCase();
if (!/^[a-z0-9.-]+$/.test(brand)) {
  console.error("Invalid brand name.");
  process.exit(1);
}
const file = join(local, brand, "DESIGN.md");
const text = existsSync(file)
  ? readFileSync(file, "utf8")
  : gh(["api", `repos/voltagent/awesome-design-md/contents/design-md/${brand}/DESIGN.md`, "-H", "Accept: application/vnd.github.raw"]);

const out = join("design-references", brand);
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "DESIGN.md"), text);
console.log(`Wrote ${join(out, "DESIGN.md")} (${text.length} chars). Reference only: do not copy the brand identity.`);
