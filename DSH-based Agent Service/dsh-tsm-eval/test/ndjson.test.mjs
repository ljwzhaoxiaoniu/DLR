import test from "node:test";
import assert from "node:assert/strict";
import { parseNdjsonText, stripModelGap, finalAnswerMarker, qidFromFile } from "../lib/ndjson.mjs";

const ev = (type, extra) => JSON.stringify({ type, ...extra });

test("core counters: steps / tools / toolErrors / tokens / session / final", () => {
  const text = [
    ev("session", { sessionId: "s-1", cwd: "/x" }),
    ev("status", { phase: "step_end", usage: { totalTokens: 100, inputTokens: 10, cacheReadTokens: 80, outputTokens: 10 } }),
    ev("tool_call", { callId: "c1", tool: "mcp__semantic-core__execute_sql", input: { sql: "SELECT 1" } }),
    ev("tool_result", { callId: "c1", status: "error" }),
    ev("status", { phase: "step_end", usage: { totalTokens: 50, inputTokens: 5, cacheReadTokens: 40, outputTokens: 5 } }),
    ev("status", { phase: "turn_end", reason: { kind: "completed" } }),
    ev("final", { text: "Answer: 42" }),
  ].join("\n");
  const r = parseNdjsonText(text, { file: "1007_120000_1471_dlr.ndjson" });
  assert.equal(r.session, "s-1");
  assert.equal(r.cwd, "/x");
  assert.equal(r.steps, 2);
  assert.equal(r.tools, 1);
  assert.equal(r.toolErrors, 1);
  assert.deepEqual(r.tokens, { total: 150, input: 15, cacheRead: 120, output: 15 });
  assert.equal(r.final, "Answer: 42");
  assert.equal(r.hasFinal, true);
  assert.deepEqual(r.turnEndReason, { kind: "completed" });
  assert.equal(r.qid, 1471);
  assert.equal(r.lastSql, "SELECT 1");
});

test("broken lines are skipped; unknown event types are counted, not fatal", () => {
  const text = ['{"type":"session","sessionId":"s"}', "{oops", ev("brand_new_event", { x: 1 })].join("\n");
  const r = parseNdjsonText(text);
  assert.equal(r.session, "s");
  assert.deepEqual(r.unknownTypes, { brand_new_event: 1 });
});

test("truncated flag is counted", () => {
  const r = parseNdjsonText([ev("tool_result", { truncated: true }), ev("tool_result", {})].join("\n"));
  assert.equal(r.truncatedLines, 1);
});

test("stripModelGap drops an English modeling-gap block (and keeps the rest)", () => {
  const text = "before\n**Modeling gap**\n- col (Ages 5-17)\nFinal Answer: 42\nafter";
  const out = stripModelGap(text);
  assert.ok(!out.includes("Modeling gap"));
  assert.ok(!out.includes("Ages 5-17"));
  assert.ok(out.includes("Final Answer: 42"));
  assert.ok(out.includes("after"));
});

test("stripModelGap drops a CJK modeling-gap block (2026-10-09: (?!\\w) replaced \\b)", () => {
  // \b can never hold after a CJK char, so the 建模缺口 alternative used to be inert
  // (real finals write "建模缺口: 无" verbatim from the AGENTS.md template). Fixed in
  // tandem with judge.ts; this test pins the shared behavior.
  const text = "before\n建模缺口: 无\nFinal Answer: 42";
  const out = stripModelGap(text);
  assert.ok(!out.includes("建模缺口"));
  assert.ok(out.includes("Final Answer: 42"));
});

test("finalAnswerMarker stops at a CJK gap heading", () => {
  assert.equal(finalAnswerMarker("Final Answer: 42\n建模缺口: 无"), "42");
});

test("finalAnswerMarker stops at blank line / next heading", () => {
  const text = "# report\nFinal Answer: 0.0657\n\nEvidence SQL: SELECT 1";
  assert.equal(finalAnswerMarker(text), "0.0657");
  assert.equal(finalAnswerMarker("no marker here"), "");
});

test("qid comes from the filename tail only", () => {
  assert.equal(qidFromFile("1007_101630_1471_dlr.ndjson"), 1471);
  assert.equal(qidFromFile("whatever.ndjson"), null);
});
