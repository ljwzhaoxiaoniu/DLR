import test from "node:test";
import assert from "node:assert/strict";
import { parseArgv, UsageError } from "../lib/cli.mjs";

test("value flags, repeated flags, booleans", () => {
  const a = parseArgv(["run", "--qids", "1,2", "--patch", "a.yml", "--patch", "b.yml", "--dry-run"]);
  assert.deepEqual(a._, ["run"]);
  assert.equal(a.qids, "1,2");
  assert.deepEqual(a.patch, ["a.yml", "b.yml"]);
  assert.equal(a["dry-run"], true);
});

test("--key=value form", () => {
  const a = parseArgv(["run", "--jobs=3"]);
  assert.equal(a.jobs, "3");
});

test("unknown flag is an error (typo protection)", () => {
  assert.throws(() => parseArgv(["run", "--ledgr"], {}), UsageError);
});

test("value flag without value is an error", () => {
  assert.throws(() => parseArgv(["score", "--run"], {}), UsageError);
});

test("boolean flag rejects a value", () => {
  assert.throws(() => parseArgv(["run", "--yes=1"]), UsageError);
});

test("-- escapes positionals", () => {
  const a = parseArgv(["run", "--", "--weird"]);
  assert.deepEqual(a._, ["run", "--weird"]);
});
