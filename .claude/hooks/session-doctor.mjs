#!/usr/bin/env node
// SessionStart hook: runs scripts/doctor.mjs in quiet mode and, only if something is
// missing, adds a short note to the session context. Never fails the session.
import { execFileSync } from "node:child_process";

let out = "";
try {
  out = execFileSync(process.execPath, ["scripts/doctor.mjs", "--quiet"], { encoding: "utf8", timeout: 15000 }).trim();
} catch {
  /* doctor missing or failed: stay silent */
}

if (out) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: `RenovoGuidelines doctor found missing tools. Tell the user briefly (Romanian) and offer the fix commands; do not install global tools without asking.\n${out}`,
      },
    }),
  );
}
