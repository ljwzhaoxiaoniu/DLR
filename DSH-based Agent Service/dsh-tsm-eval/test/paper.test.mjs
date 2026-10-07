import test from "node:test";
import assert from "node:assert/strict";
import { bindPaper, selectScope } from "../lib/paper.mjs";

const paper = [
  { index: 0, question: "Q one?", expected: "1", source: "gold", sourceKind: "gold" },
  { index: 1, question: "Q two?", expected: "2", source: 'L3 sop#Q two?', sourceKind: "L3" },
  { index: 2, question: "Q three?", expected: "3", source: "gold", sourceKind: "gold" },
];
const dataset = [
  { qid: 1471, db: "db_a", question: "Q one?", sql: "SELECT 1" },
  { qid: 1472, db: "db_a", question: "Q two?", sql: "SELECT 2" },
  { qid: 1500, db: "db_b", question: "Q three?", sql: "SELECT 3" },
  { qid: 1999, db: "db_b", question: "not in paper", sql: "SELECT 9" },
];

test("bind uses the dataset's own question_id", () => {
  const { items, problems, unmatchedDataset } = bindPaper(paper, dataset);
  assert.deepEqual(problems, []);
  assert.deepEqual(items.map((i) => i.qid), [1471, 1472, 1500]);
  assert.equal(unmatchedDataset, 1);
});

test("ambiguous text is a hard problem", () => {
  const dup = [...dataset, { qid: 2000, db: "db_c", question: "Q one?", sql: "" }];
  const { problems } = bindPaper(paper, dup);
  assert.ok(problems.some((p) => p.includes("ambiguous")));
});

test("selectScope: qids / db / all / limit", () => {
  const { items } = bindPaper(paper, dataset);
  assert.deepEqual(selectScope(items, { qids: "1472,1471" }).selected.map((i) => i.qid), [1471, 1472]);
  assert.deepEqual(selectScope(items, { db: "db_b" }).selected.map((i) => i.qid), [1500]);
  assert.equal(selectScope(items, { all: true }).selected.length, 3);
  assert.equal(selectScope(items, { all: true, limit: 2 }).selected.length, 2);
});

test("selectScope rejects unknown and duplicate qids", () => {
  const { items } = bindPaper(paper, dataset);
  const s = selectScope(items, { qids: "1471,1471,9" });
  assert.deepEqual(s.selected.map((i) => i.qid), [1471]);
  assert.deepEqual(s.rejected, ["1471(dup)", "9(not in paper)"]);
  assert.throws(() => selectScope(items, { qids: "nope" }), /no --qids matched/);
});

test("selectScope requires exactly one scope", () => {
  const { items } = bindPaper(paper, dataset);
  assert.throws(() => selectScope(items, {}), /no scope/);
  assert.throws(() => selectScope(items, { all: true, db: "db_a" }), /mutually exclusive/);
});
