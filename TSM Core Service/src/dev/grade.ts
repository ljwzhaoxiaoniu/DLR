/**
 * tsm grade —— 跑批结果判定与汇总（开发态）
 *
 * 输入：一轮跑批目录（`run_batch.sh` 的产物：`raw/<stamp>_<qid>_dlr.ndjson`）
 * 判定：题目自带 gold SQL 在该库 SQLite 上执行 → 期望值 ↔ 从 final 文本抽候选值比对
 *      （规则见 `dev/judge.ts`；空 gold = 合法期望）
 * 产出：`questions.csv`（逐题明细）+ `summary.md`（分库/分判定汇总）+ 控制台概要
 *      （跨轮统计与逐题明细文档 → `tsm stats`）
 *
 * 用法: tsm grade --run <run_dir>
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { byQid, goldValues, judge, judgeEmpty } from "./judge.js";
import { readRunQuestions } from "./results.js";

const arg = (name: string, fallback = ""): string => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const RUN_DIR = path.resolve(arg("--run"));
if (!arg("--run")) {
  console.error("用法: tsm grade --run <run_dir>（run_batch.sh 的产物目录）");
  process.exit(1);
}

// ── 逐题处理 ─────────────────────────────────────────────────────────
const rawDir = path.join(RUN_DIR, "raw");
if (!fs.existsSync(rawDir)) {
  console.error(`[ERR] 找不到 ${rawDir}`);
  process.exit(1);
}
const rows: Record<string, string>[] = [];
for (const ev of readRunQuestions(RUN_DIR)) {
  const qid = Number(ev.qid);
  const q = byQid.get(qid);
  const db = q?.db_id ?? "-";
  const gold = goldValues(qid, db);
  const v = gold.empty ? judgeEmpty(ev.final) : judge(ev.final, gold.values);
  rows.push({
    qid: String(qid),
    db,
    question: q?.question ?? "",
    verdict: gold.err ? "GOLD_ERR" : v.verdict,
    precision: v.precision,
    answer: ev.final.replace(/\s+/g, " ").slice(0, 160),
    expected: gold.values.slice(0, 4).join(" | ").slice(0, 160),
    steps: String(ev.steps),
    tools: String(ev.tools),
    tool_errors: String(ev.toolErrors),
    tool_trace: ev.trace.map((t) => t.tool).join(" → ").slice(0, 400),
    tokens_total: String(ev.tokens.total),
    tokens_input: String(ev.tokens.input),
    tokens_cache_read: String(ev.tokens.cacheRead),
    tokens_output: String(ev.tokens.output),
    cache_read_pct: ev.tokens.total ? `${Math.round((ev.tokens.cacheRead / ev.tokens.total) * 100)}%` : "-",
    log: `raw/${ev.file}`,
    session: ev.session,
    gold_err: gold.err ?? "",
  });
}

// ── 产出 ─────────────────────────────────────────────────────────────
const cols = [
  "qid", "db", "question", "verdict", "precision",
  "steps", "tools", "tool_errors", "tool_trace",
  "tokens_total", "tokens_input", "tokens_cache_read", "tokens_output", "cache_read_pct",
  "answer", "expected", "log", "session", "gold_err",
];
const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => `"${String(r[c] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
fs.writeFileSync(path.join(RUN_DIR, "questions.csv"), csv);

const byDb = new Map<string, Record<string, number>>();
for (const r of rows) {
  const m = byDb.get(r.db) ?? {};
  m[r.verdict] = (m[r.verdict] ?? 0) + 1;
  byDb.set(r.db, m);
}
const total = rows.length;
const tally = (v: string) => rows.filter((r) => r.verdict === v).length;
const num = (s: string) => Number(s) || 0;
const avg = (f: (r: Record<string, string>) => number) =>
  total ? Math.round(rows.reduce((n, r) => n + f(r), 0) / total) : 0;
const sumTk = rows.reduce(
  (a, r) => ({
    total: a.total + num(r.tokens_total),
    input: a.input + num(r.tokens_input),
    cache: a.cache + num(r.tokens_cache_read),
    output: a.output + num(r.tokens_output),
  }),
  { total: 0, input: 0, cache: 0, output: 0 },
);
const summary = [
  `# 跑批结果（tsm grade）`,
  "",
  `目录：\`${RUN_DIR}\` ｜ 题数 ${total} ｜ 生成 ${new Date().toISOString()}`,
  "",
  `**PASS ${tally("PASS")} ｜ FAIL ${tally("FAIL")} ｜ UNCERTAIN ${tally("UNCERTAIN")} ｜ GOLD_ERR ${tally("GOLD_ERR")}**`,
  "",
  "## 过程指标（均值 / 合计）",
  "",
  `- 步数均值 **${avg((r) => num(r.steps))}** ｜ 工具调用均值 **${avg((r) => num(r.tools))}** ｜ 工具错误均值 **${avg((r) => num(r.tool_errors))}**`,
  `- token 合计 **${sumTk.total.toLocaleString()}**（input ${sumTk.input.toLocaleString()} + cache_read ${sumTk.cache.toLocaleString()} + output ${sumTk.output.toLocaleString()}）` +
    (sumTk.total ? ` ｜ cache_read 占 **${Math.round((sumTk.cache / sumTk.total) * 100)}%**` : ""),
  `- token 单题均值 **${total ? Math.round(sumTk.total / total).toLocaleString() : 0}**`,
  "",
  "| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |",
  "|---|---|---|---|---|",
  ...[...byDb.entries()].sort().map(([db, m]) => `| ${db} | ${m.PASS ?? 0} | ${m.FAIL ?? 0} | ${m.UNCERTAIN ?? 0} | ${m.GOLD_ERR ?? 0} |`),
  "",
  "## 非 PASS 明细（前 40）",
  "",
  "| qid | 判定 | 答案（截） | 期望（截） | 日志 |",
  "|---|---|---|---|---|",
  ...rows
    .filter((r) => r.verdict !== "PASS")
    .slice(0, 40)
    .map((r) => `| ${r.qid} | ${r.verdict} | ${r.answer.slice(0, 80)} | ${r.expected.slice(0, 60)} | ${r.log} |`),
].join("\n");
fs.writeFileSync(path.join(RUN_DIR, "summary.md"), summary);

console.log(summary.split("\n").slice(0, 16).join("\n"));
console.log(`\n[grade] 明细 → ${path.join(RUN_DIR, "questions.csv")}`);
