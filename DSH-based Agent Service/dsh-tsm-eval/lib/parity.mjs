// Parser parity: hold the local ndjson reader to grade's questions.csv
// (13 derived fields, exact-caliber comparison). Zero API cost - the acceptance
// test for the reader. Any diff means either a reader bug or a stale CSV
// (grade ran before the stream finished; 0929_1359_financial_secC q186 is one).
import fs from "node:fs";
import path from "node:path";
import { EvalError } from "./util.mjs";
import { readRunCsv } from "./csv.mjs";
import { readRunEvents } from "./ndjson.mjs";
import { loadContext } from "./paths.mjs";

export const collapse = (s) => String(s).replace(/\s+/g, " "); // grade.ts uses replace, not trim

/** Fields compared, derived exactly as grade.ts derives its CSV columns. */
export function derivedFields(ev) {
  return {
    qid: String(ev.qid ?? ""),
    steps: String(ev.steps),
    tools: String(ev.tools),
    tool_errors: String(ev.toolErrors),
    tokens_total: String(ev.tokens.total),
    tokens_input: String(ev.tokens.input),
    tokens_cache_read: String(ev.tokens.cacheRead),
    tokens_output: String(ev.tokens.output),
    cache_read_pct: ev.tokens.total ? `${Math.round((ev.tokens.cacheRead / ev.tokens.total) * 100)}%` : "-",
    tool_trace: ev.trace.map((t) => t.tool).join(" → ").slice(0, 400),
    answer: collapse(ev.final).slice(0, 160),
    sql: collapse(ev.lastSql).slice(0, 200),
    session: ev.session,
  };
}

/** Compare one run dir. Returns {runDir, csvRows, rawFiles, compared, diffs, unscored, csvOnly}. */
export function compareRun(runDir) {
  if (!fs.existsSync(path.join(runDir, "questions.csv"))) {
    throw new EvalError(`no questions.csv in ${runDir} (run 'dsh-eval score' first)`);
  }
  const rows = readRunCsv(runDir);
  const byLog = new Map(rows.map((r) => [r.log, r]));
  const events = readRunEvents(runDir);
  const diffs = [];
  const unscored = [];
  let compared = 0;
  for (const [file, ev] of events) {
    const row = byLog.get(`raw/${file}`);
    if (!row) {
      unscored.push(file);
      continue;
    }
    compared++;
    const mine = derivedFields(ev);
    for (const k of Object.keys(mine)) {
      if (mine[k] !== (row[k] ?? "")) {
        diffs.push({ file, qid: ev.qid, field: k, csv: row[k] ?? "", mine: mine[k] });
      }
    }
  }
  const csvOnly = rows.filter((r) => !events.has(String(r.log).replace(/^raw\//, ""))).map((r) => r.log);
  return { runDir, csvRows: rows.length, rawFiles: events.size, compared, diffs, unscored, csvOnly };
}

/** Run dirs under a results dir (those that have questions.csv), name-sorted. */
export function listRunDirs(resultsDir) {
  if (!fs.existsSync(resultsDir)) return [];
  return fs
    .readdirSync(resultsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(resultsDir, d.name, "questions.csv")))
    .map((d) => path.join(resultsDir, d.name))
    .sort();
}

export async function parityCommand(args) {
  const dirs = [];
  if (args.run) {
    dirs.push(path.resolve(args.run));
  } else if (args["all-results"]) {
    const ctx = loadContext(args, { lenient: true });
    if (!ctx.scenario) {
      throw new EvalError("cannot locate the scenario for --all-results - pass --run <dir> instead");
    }
    dirs.push(...listRunDirs(path.join(ctx.scenario.dir, "results")));
    if (!dirs.length) throw new EvalError(`no run dirs with questions.csv under ${path.join(ctx.scenario.dir, "results")}`);
  } else {
    throw new EvalError("pass --run <dir> or --all-results");
  }

  const reports = [];
  for (const dir of dirs) {
    try {
      reports.push(compareRun(dir));
    } catch (e) {
      reports.push({ runDir: dir, error: e.evalMessage ?? e.message, diffs: [], compared: 0, csvRows: 0, rawFiles: 0, unscored: [], csvOnly: [] });
    }
  }

  const totals = {
    runs: reports.length,
    runsWithDiffs: reports.filter((r) => r.diffs.length).length,
    csvRows: reports.reduce((n, r) => n + r.csvRows, 0),
    rawFiles: reports.reduce((n, r) => n + r.rawFiles, 0),
    compared: reports.reduce((n, r) => n + r.compared, 0),
    diffs: reports.reduce((n, r) => n + r.diffs.length, 0),
    unscored: reports.reduce((n, r) => n + (r.unscored?.length ?? 0), 0),
    csvOnly: reports.reduce((n, r) => n + (r.csvOnly?.length ?? 0), 0),
    errors: reports.filter((r) => r.error).length,
  };

  if (args.json) {
    console.log(JSON.stringify({ totals, reports }, null, 2));
    return totals.diffs || totals.errors ? 1 : 0;
  }

  for (const r of reports) {
    if (r.error) {
      console.log(`[ERR ] ${path.basename(r.runDir)}: ${r.error}`);
      continue;
    }
    const tag = r.diffs.length || r.unscored.length || r.csvOnly.length ? "[DIFF]" : "[OK  ]";
    console.log(`${tag} ${path.basename(r.runDir)}: ${r.compared}/${r.csvRows} rows, ${r.diffs.length} diff(s)`);
    for (const d of r.diffs.slice(0, 8)) {
      console.log(`       q${d.qid} ${d.field}: csv="${trunc(d.csv)}" vs mine="${trunc(d.mine)}"`);
    }
    if (r.diffs.length > 8) console.log(`       ... and ${r.diffs.length - 8} more`);
    for (const f of r.unscored.slice(0, 5)) console.log(`       unscored artifact: ${f}`);
    for (const f of r.csvOnly.slice(0, 5)) console.log(`       csv row without artifact: ${f}`);
  }
  console.log(
    `\nparity: ${totals.runs} run(s), ${totals.compared}/${totals.csvRows} rows compared, ` +
      `${totals.diffs} field diff(s), ${totals.unscored} unscored artifact(s), ${totals.csvOnly} csv-only row(s)` +
      (totals.runsWithDiffs ? `; runs with diffs: ${reports.filter((r) => r.diffs.length).map((r) => path.basename(r.runDir)).join(", ")}` : ""),
  );
  return totals.diffs || totals.errors ? 1 : 0;
}

const trunc = (s) => (String(s).length > 60 ? `${String(s).slice(0, 57)}...` : String(s));
