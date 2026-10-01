#!/usr/bin/env node
// UserPromptSubmit hook: re-states the always-on rules on EVERY prompt, even if the
// ponytail / caveman plugins are not installed yet (the plugins add their own,
// longer reminders on top). Output is added to the model's context.
const msg = [
  "ALWAYS ON for this prompt: ponytail (mode full) + caveman (mode full). Do not turn either off unless the user says so (/ponytail off, 'stop caveman', 'normal mode').",
  "Caveman = chat prose only. Never shorten code, exact errors, security or irreversible-action warnings, written docs, commit trailers or client-facing site copy.",
  "Ponytail = what you build: reuse, stdlib, native, installed dep, one line, then minimum code, after reading the real flow.",
  "Chat in Romanian. Site copy in Romanian with correct diacritics. Guideline docs stay in English.",
  "Route tools by guidelines/02-tool-routing.md. Site work: follow guidelines/00-START-HERE.md. Ask before: force-push, global installs, copying from repos you do not own, publishing client data, making repos public, inviting collaborators.",
].join(" ");

process.stdout.write(
  JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: msg } }),
);
