// questions.csv reader. parseCsv is ported verbatim from results.ts:24-55
// (grade writes regular quoted CSV; this must round-trip it exactly).
import fs from "node:fs";
import path from "node:path";

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c !== "\r") cur += c;
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  const head = rows.shift() ?? [];
  return rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

export function readCsvRows(file) {
  return parseCsv(fs.readFileSync(file, "utf8"));
}

export function readRunCsv(runDir) {
  return readCsvRows(path.join(runDir, "questions.csv"));
}

/** The 22 columns grade.ts writes (grade.ts:126-131). */
export const CSV_COLUMNS = [
  "qid", "db", "question", "verdict", "ruling", "precision", "sql_match",
  "steps", "tools", "tool_errors", "tool_trace",
  "tokens_total", "tokens_input", "tokens_cache_read", "tokens_output", "cache_read_pct",
  "answer", "expected", "sql", "log", "session", "gold_err",
];
