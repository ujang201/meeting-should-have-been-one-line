import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The single sentence that replaces the whole meeting.
// It works by collapsing the meeting twice: first into the email
// everyone always says it should have been, then into the one
// sentence that email would have contained — a sentence that
// announces there is nothing left to decide, so the meeting
// cannot justify itself anymore.
const ENTRY =
  "This meeting could have been an email, and the email could have been this sentence: there is nothing to decide, so go back to work.";

// The grader's gate: /output/entry.txt must be UTF-8 text of
// 1 to 200 characters, not only whitespace, a single line.
function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Exactly one sentence: one terminal full stop, at the very end,
  // and no other sentence-ending punctuation mid-line.
  const terminators = line.slice(0, -1).match(/[.!?]/g);
  if (terminators !== null || !line.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
}

const outputPath = "/output/entry.txt";
validate(ENTRY);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to ${outputPath}`);
