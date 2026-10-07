// The exam paper: read eval/questions.jsonl, bind to the dataset question list
// (the paper has no qid field - binding is by exact question text; ambiguity is a
// hard failure), and select the run scope.
import fs from "node:fs";
import { EvalError, readJson, sha1File } from "./util.mjs";

/** One paper line: {index, question, expected, source, sourceKind}. */
export function readPaper(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  return lines.map((line, i) => {
    let o;
    try {
      o = JSON.parse(line);
    } catch (e) {
      throw new EvalError(`paper line ${i + 1} is not JSON: ${e.message}`);
    }
    const source = String(o.source ?? "");
    return {
      index: i, // 0-based paper line number
      question: String(o.question ?? ""),
      expected: String(o.expected ?? ""),
      source,
      sourceKind: source.startsWith("L3") ? "L3" : "gold",
    };
  });
}

/** Dataset question list; qid = the dataset's own `question_id` (BIRD numbering). */
export function loadDatasetQuestions(file) {
  const arr = readJson(file);
  if (!Array.isArray(arr)) throw new EvalError(`dataset questions is not an array: ${file}`);
  return arr.map((q, i) => ({
    qid: Number(q.question_id ?? i + 1),
    db: String(q.db_id ?? q.db ?? ""),
    question: String(q.question ?? ""),
    sql: String(q.SQL ?? q.sql ?? ""),
  }));
}

/** Bind paper lines to dataset entries. Returns {items, problems, unmatchedDataset}. */
export function bindPaper(paper, dataset) {
  const byText = new Map();
  dataset.forEach((d, i) => {
    if (!byText.has(d.question)) byText.set(d.question, []);
    byText.get(d.question).push(i);
  });
  const items = [];
  const problems = [];
  const used = new Set();
  paper.forEach((p) => {
    const hits = byText.get(p.question) ?? [];
    if (hits.length === 0) {
      problems.push(`paper#${p.index + 1}: no dataset match`);
      return;
    }
    if (hits.length > 1) {
      problems.push(`paper#${p.index + 1}: ambiguous (${hits.length} dataset matches)`);
      return;
    }
    const di = hits[0];
    if (used.has(di)) {
      problems.push(`paper#${p.index + 1}: dataset question ${dataset[di].qid} bound twice`);
      return;
    }
    used.add(di);
    items.push({ ...p, qid: dataset[di].qid, db: dataset[di].db, sql: dataset[di].sql });
  });
  return { items, problems, unmatchedDataset: dataset.length - used.size };
}

export function paperSha1(file) {
  return sha1File(file);
}

/**
 * Scope selection. Exactly one of --qids / --db / --all must be given.
 * Returns {selected, scopeLabel, rejected}.
 */
export function selectScope(items, { qids, db, all, limit }) {
  const given = [qids !== undefined, db !== undefined, all === true].filter(Boolean).length;
  if (given === 0) throw new EvalError("no scope - pass one of --qids a,b | --db <name> | --all");
  if (given > 1) throw new EvalError("scope flags are mutually exclusive (--qids | --db | --all)");

  const rejected = [];
  let selected;
  let scopeLabel;
  if (qids !== undefined) {
    const ids = String(qids).split(",").map((s) => s.trim()).filter(Boolean);
    const seen = new Set();
    const nums = [];
    for (const s of ids) {
      if (!/^\d+$/.test(s)) {
        rejected.push(s);
        continue;
      }
      const n = Number(s);
      if (seen.has(n)) {
        rejected.push(`${s}(dup)`);
        continue;
      }
      seen.add(n);
      nums.push(n);
    }
    const byQid = new Map(items.map((it) => [it.qid, it]));
    selected = [];
    for (const n of nums) {
      const it = byQid.get(n);
      if (!it) rejected.push(`${n}(not in paper)`);
      else selected.push(it);
    }
    if (!selected.length) throw new EvalError(`no --qids matched the paper (rejected: ${rejected.join(", ")})`);
    scopeLabel = nums.length <= 8 ? `qids_${nums.join("_")}` : `qids_${nums.length}_${nums[0]}_${nums[nums.length - 1]}`;
  } else if (db !== undefined) {
    selected = items.filter((it) => it.db === db);
    if (!selected.length) {
      const dbs = [...new Set(items.map((it) => it.db))].join(", ");
      throw new EvalError(`--db "${db}" matched no paper questions; papers dbs: ${dbs}`);
    }
    scopeLabel = `db_${String(db).replace(/[^A-Za-z0-9_-]/g, "_")}`;
  } else {
    selected = items.slice();
    scopeLabel = "all";
  }
  if (limit !== undefined) {
    const n = Number(limit);
    if (!Number.isInteger(n) || n <= 0) throw new EvalError(`--limit must be a positive integer: ${limit}`);
    selected = selected.slice(0, n);
  }
  selected.sort((a, b) => a.qid - b.qid);
  return { selected, scopeLabel, rejected };
}
