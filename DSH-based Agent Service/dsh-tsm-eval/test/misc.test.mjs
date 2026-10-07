import test from "node:test";
import assert from "node:assert/strict";
import { parseCsv } from "../lib/csv.mjs";
import { classifyRound } from "../lib/flags.mjs";
import { classifyDshErr } from "../lib/precheck.mjs";
import { parseDotEnv } from "../lib/env.mjs";

test("csv round-trips quotes, commas, embedded newlines", () => {
  const rows = parseCsv('a,b\n"x,1","he said ""hi"""\n"multi\nline",z\n');
  assert.equal(rows.length, 2);
  assert.equal(rows[0].a, "x,1");
  assert.equal(rows[0].b, 'he said "hi"');
  assert.equal(rows[1].a, "multi\nline");
});

test("classifyRound: transport / no_turn_end / no_final / ok / timeout", () => {
  const base = { tools: 3, steps: 2, hasFinal: true, final: "x", session: "s", trace: [{}] };
  assert.equal(classifyRound({ ev: { ...base, turnEndReason: { kind: "completed" } }, rc: 0 }).kind, "ok");
  assert.equal(
    classifyRound({ ev: { ...base, turnEndReason: { kind: "error", error: { code: "TRANSPORT", message: "boom" } } }, rc: 1 }).kind,
    "transport",
  );
  assert.equal(classifyRound({ ev: { ...base, turnEndReason: null }, rc: 0 }).kind, "no_turn_end");
  assert.equal(classifyRound({ ev: { ...base, turnEndReason: { kind: "completed" }, final: " " }, rc: 0 }).kind, "no_final");
  assert.equal(classifyRound({ ev: base, rc: 0, killed: true }).kind, "timeout");
  assert.equal(classifyRound({ ev: null }).kind, "empty_stream");
});

test("classifyDshErr separates the constant noise from fatal lines", () => {
  const { noise, fatal } = classifyDshErr(
    "dsh: warning: 1 entry did not activate\npreset-dlr (@deepseek-ai/dsh-agent-preset): pending (waiting for service: agentPresets)\ndsh: NetworkError: connect ETIMEDOUT\n",
  );
  assert.equal(noise.length, 2);
  assert.equal(fatal.length, 1);
  assert.match(fatal[0], /ETIMEDOUT/);
});

test("dotenv: export/quotes/comments/CRLF", () => {
  const env = parseDotEnv('export A=1\r\nB="two words"\r\nC=\'single\'\r\nD=plain # comment\r\n# full comment\r\n');
  assert.deepEqual(env, { A: "1", B: "two words", C: "single", D: "plain" });
});
