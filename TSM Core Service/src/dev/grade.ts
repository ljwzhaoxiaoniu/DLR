/**
 * tsm grade —— 跑批结果判定与汇总（开发态）
 *
 * 输入：一轮跑批目录（`run_batch.sh` 的产物：`raw/<stamp>_<qid>_dlr.ndjson`）
 * 判定：题目自带 gold SQL 在该库 SQLite 上执行 → 期望值 ↔ 从 final 文本抽候选值比对
 *      （规则见 `dev/judge.ts`；空 gold = 合法期望）
 * 评定：SOP 生效时按 SOP 裁定（与 gold 对不上但合 SOP 口径 = 翻盘；见 `dev/results.ts` rulingOf）
 * 产出：`questions.csv`（逐题明细，判定 + 评定两列）+ `summary.md`（分库/分判定汇总）+ 控制台概要
 *      （跨轮统计与逐题明细文档 → `tsm stats`）
 *
 * 用法: tsm grade --run <run_dir>
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { byQid, goldValues, judge, judgeEmpty, queryRows, queryRowsTimed, rowSetOf, sameRowSet, sqliteOf, stripLimit } from "./judge.js";
import { readRunQuestions, rulingOf, sopByQid, RULINGS, RULING_LABEL } from "./results.js";

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
const SOP = sopByQid(); // L3 源：SOP 生效的题按 SOP 裁定（翻盘）
const rows: Record<string, string>[] = [];
for (const ev of readRunQuestions(RUN_DIR)) {
  const qid = Number(ev.qid);
  const q = byQid.get(qid);
  const db = q?.db_id ?? "-";
  const gold = goldValues(qid, db);
  const v = gold.empty ? judgeEmpty(ev.final) : judge(ev.final, gold.values);
  let verdict = gold.err ? "GOLD_ERR" : v.verdict;
  let precision = v.precision;
  let sqlMatch = "-";
  // 结果集比对（列表题判据，**只救回假阴性**）：非 PASS 时拿 agent 最后一条 SQL 与 gold 同库跑，
  // 行集相同 → 改判 PASS（precision=set）；不同 → 保持原判（留给 SOP 裁；最后一条 SQL 未必是答案 SQL）
  let sqlShown = ev.lastSql;
  if (verdict !== "PASS" && !gold.err && ev.sqls.length) {
    const sqlite = sqliteOf(db);
    const goldQ = sqlite ? queryRows(sqlite, q?.SQL ?? "") : {};
    if (sqlite && goldQ.rows?.length) {
      const G = goldQ.rows;
      // 判「列表的生成逻辑」：答对整体结果即可，不逐字比对。
      //   · 答案 SQL 原样跑 / 去掉工具强制的显示 LIMIT 后再跑
      //   · 与 gold 比「全列同集」，或退一步比「共同列投影同集」（忽略别名/列序/多列少列差异）
      // 命中则改判 PASS（precision=set），并把命中方式写进 sql_match 留档；不命中保持原判。
      const noLimit = (s: string) => stripLimit(s) ?? "";
      // 只试最后 4 条候选：答案 SQL 一般在末尾；候选中可能藏重查询（超时子进程兜底）
      for (const s of [...ev.sqls].reverse().slice(0, 4)) {
        for (const [sql2, tag] of [
          [s, "原样"],
          [noLimit(s), "去LIMIT"],
        ] as const) {
          if (!sql2) continue;
          const a = queryRowsTimed(sqlite, sql2);
          if (!a.rows?.length) continue;
          if (sameRowSet(rowSetOf(a.rows), rowSetOf(G))) {
            verdict = "PASS";
            precision = "set";
            sqlMatch = tag === "原样" ? "set" : "set(去LIMIT)";
            sqlShown = s;
            break;
          }
          const common = (goldQ.cols ?? []).filter((c) => (a.cols ?? []).includes(c));
          if (common.length && sameRowSet(rowSetOf(a.rows, common), rowSetOf(G, common))) {
            verdict = "PASS";
            precision = "set";
            sqlMatch = `set(${tag},共同列[${common.join(",")}])`;
            sqlShown = s;
            break;
          }
        }
        if (verdict === "PASS") break;
      }
      if (verdict !== "PASS") sqlMatch = "no";
    }
  }
  // SOP Expected 覆盖（判定只对 gold 算）：答案合节的裁定口径、而该口径与 gold 不同值 → 判定记 FAIL。
  // 防的是「答案里引用了 gold 的字面值（如"参考结果那是反的"）被全文抽数误记 PASS」。
  const sec = SOP.get(String(qid));
  if (verdict === "PASS" && !gold.err && sec?.expect) {
    const sopVals = sec.expect.split(/\s*\|\s*/).filter(Boolean);
    const same = sopVals.length === gold.values.length && sopVals.every((x, i) => x === gold.values[i]);
    if (sopVals.length && !same && judge(ev.final, sopVals).verdict === "PASS") {
      verdict = "FAIL";
      precision = "sop";
    }
  }
  rows.push({
    qid: String(qid),
    db,
    question: q?.question ?? "",
    verdict,
    ruling: rulingOf(verdict, ev.final, SOP.get(String(qid))),
    precision,
    sql_match: sqlMatch,
    sql: ev.lastSql.replace(/\s+/g, " ").slice(0, 200),
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
  "qid", "db", "question", "verdict", "ruling", "precision", "sql_match",
  "steps", "tools", "tool_errors", "tool_trace",
  "tokens_total", "tokens_input", "tokens_cache_read", "tokens_output", "cache_read_pct",
  "answer", "expected", "sql", "log", "session", "gold_err",
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
const rTally = (v: string) => rows.filter((r) => r.ruling === v).length;
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
  `**判定（与 gold 比对）：PASS ${tally("PASS")} ｜ FAIL ${tally("FAIL")} ｜ UNCERTAIN ${tally("UNCERTAIN")} ｜ GOLD_ERR ${tally("GOLD_ERR")}**`,
  "",
  `**评定（按 SOP 裁定）：${RULINGS.map((r) => `${RULING_LABEL[r]} ${rTally(r)}`).join(" ｜ ")}**（翻盘单独计，不并入正确）`,
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
  "| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |",
  "|---|---|---|---|---|---|",
  ...rows
    .filter((r) => r.verdict !== "PASS")
    .slice(0, 40)
    .map((r) => `| ${r.qid} | ${r.verdict} | ${RULING_LABEL[r.ruling] ?? r.ruling} | ${r.answer.slice(0, 80)} | ${r.expected.slice(0, 60)} | ${r.log} |`),
].join("\n");
fs.writeFileSync(path.join(RUN_DIR, "summary.md"), summary);

console.log(summary.split("\n").slice(0, 16).join("\n"));
console.log(`\n[grade] 明细 → ${path.join(RUN_DIR, "questions.csv")}`);
