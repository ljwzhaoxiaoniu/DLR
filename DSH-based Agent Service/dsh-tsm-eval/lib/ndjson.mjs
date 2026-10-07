// dsh `--json` event-stream parser.
// Calibers are ported field-for-field from TSM Core Service/src/dev/results.ts
// (readRunQuestions) so `dsh-eval parity` can hold grade's questions.csv to it —
// EXCEPT that candidate SQL is kept untruncated here (results.ts slices 8000).
import fs from "node:fs";
import path from "node:path";

/**
 * Ported verbatim from judge.ts stripModelGap(): drop the trailing "modeling gap" note.
 * NOTE (faithful to upstream, verified on real finals): the trailing \b makes the CJK
 * alternative (`建模缺口`) effectively inert — after a CJK char \b has no word/non-word
 * boundary, so only "Modeling gap"-style headings match. Kept as-is: the parity gate
 * requires byte-equal behavior with judge.ts.
 */
export function stripModelGap(text) {
  const isGap = (l) => /^\s*(#{1,6}\s*)?[*_]{0,2}\s*(建模缺口|modell?ing\s*gap)\b/i.test(l);
  const isBoundary = (l) => /^\s*(#{1,6}\s*)?[*_]{0,2}\s*(Final Answer|Evidence SQL)\b/i.test(l);
  const lines = String(text).split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (isGap(lines[i])) {
      let j = i + 1;
      while (j < lines.length && !isBoundary(lines[j])) j++;
      i = j - 1;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

/** Ported verbatim from judge.ts finalAnswerMarker(): the conclusion-sentence region. */
export function finalAnswerMarker(text) {
  const m = String(text).match(/^[^\S\n]*(?:#{1,6}\s*)?[*_]{0,2}\s*Final Answer\s*[:：][^\S\n]*/im);
  if (!m || m.index === undefined) return "";
  const out = [];
  let len = 0;
  let started = false;
  for (const l of String(text).slice(m.index + m[0].length).split(/\r?\n/)) {
    if (!started) {
      if (!l.trim()) continue;
      started = true;
    }
    if (!l.trim()) break;
    if (/^\s*(#{1,6}\s*)?[*_]{0,2}\s*(Evidence SQL|建模缺口|Modell?ing gap)\b/i.test(l)) break;
    if (/^\s*#{1,6}\s/.test(l)) break;
    out.push(l);
    len += l.length;
    if (len > 3000) break;
  }
  return out.join("\n").trim();
}

export const qidFromFile = (f) => {
  const m = /_(\d+)_dlr\.ndjson$/.exec(f);
  return m ? Number(m[1]) : null;
};

/**
 * Parse one ndjson stream text -> QEvent.
 * {file, qid, session, cwd, final (stripped, last), finalRaw, steps, tools, toolErrors,
 *  trace[{tool,input}], sqls[], lastSql, tokens{total,input,cacheRead,output},
 *  hasFinal, turnEndReason, errorEvents[], truncatedLines, unknownTypes{}}
 */
export function parseNdjsonText(text, { file = null } = {}) {
  const ev = {
    file,
    qid: file ? qidFromFile(file) : null,
    session: "",
    cwd: "",
    final: "",
    finalRaw: "",
    steps: 0,
    tools: 0,
    toolErrors: 0,
    trace: [],
    sqls: [],
    lastSql: "",
    tokens: { total: 0, input: 0, cacheRead: 0, output: 0 },
    hasFinal: false,
    turnEndReason: null,
    errorEvents: [],
    truncatedLines: 0,
    unknownTypes: {},
  };
  const KNOWN = new Set(["session", "status", "thinking", "text", "tool_call", "tool_result", "final", "error"]);
  for (const line of String(text).split("\n")) {
    if (!line.trim()) continue;
    let o;
    try {
      o = JSON.parse(line);
    } catch {
      continue; // half/broken line: skip (same as results.ts)
    }
    if (o.truncated) ev.truncatedLines++;
    const type = o.type;
    if (!KNOWN.has(type)) {
      ev.unknownTypes[type] = (ev.unknownTypes[type] ?? 0) + 1;
      continue;
    }
    if (type === "session") {
      ev.session = String(o.sessionId ?? o.id ?? "");
      ev.cwd = String(o.cwd ?? "");
    }
    if (type === "final") {
      ev.hasFinal = true;
      ev.finalRaw = String(o.text ?? "");
      ev.final = stripModelGap(ev.finalRaw); // results.ts:101
    }
    if (type === "tool_call") {
      ev.tools++;
      const name = typeof o.tool === "string" ? o.tool : (o.tool?.name ?? "?");
      const sql = o.input?.sql;
      if (typeof sql === "string" && sql.trim()) {
        ev.lastSql = sql; // UNTRUNCATED (results.ts slices 8000)
        ev.sqls.push(sql);
      }
      ev.trace.push({
        tool: name.replace("mcp__semantic-core__", ""),
        input: JSON.stringify(o.input ?? {}).replace(/\s+/g, " ").slice(0, 200),
      });
    }
    if (type === "tool_result" && o.status === "error") ev.toolErrors++;
    if (type === "status" && o.phase === "step_end") ev.steps++;
    if (type === "status" && o.phase === "turn_end") {
      ev.turnEndReason = o.reason ?? o.turn_end?.reason ?? null;
    }
    if (type === "error") ev.errorEvents.push(String(o.message ?? o.text ?? JSON.stringify(o)));
    const u = o.usage;
    if (type === "status" && u?.totalTokens) {
      // same guard as results.ts:117 (truthy totalTokens only)
      ev.tokens.total += Number(u.totalTokens) || 0;
      ev.tokens.input += Number(u.inputTokens) || 0;
      ev.tokens.cacheRead += Number(u.cacheReadTokens) || 0;
      ev.tokens.output += Number(u.outputTokens) || 0;
    }
  }
  return ev;
}

/** Parse every raw/*.ndjson of a run dir; returns Map<fileName, QEvent>. */
export function readRunEvents(runDir) {
  const rawDir = path.join(runDir, "raw");
  const out = new Map();
  for (const f of fs.readdirSync(rawDir).filter((x) => x.endsWith(".ndjson")).sort()) {
    out.set(f, parseNdjsonText(fs.readFileSync(path.join(rawDir, f), "utf8"), { file: f }));
  }
  return out;
}
