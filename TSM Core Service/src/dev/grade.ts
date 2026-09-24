/**
 * tsm grade —— 跑批结果判定与汇总（开发态）
 *
 * 输入：一轮跑批目录（`run_batch.sh` 的产物：`raw/<stamp>_<qid>_dlr.ndjson`）
 * 判定：题目自带 gold SQL 在该库 SQLite 上执行 → 期望值 ↔ 从 final 文本抽候选值比对
 *      （数值按 [1e-9,1e-6,1e-4,1e-3] 逐级容差；字符串归一化包含）
 * 产出：`questions.csv`（逐题明细）+ `summary.md`（分库/分判定汇总）+ 控制台概要
 *
 * 用法: tsm grade --run <run_dir>
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { readScenario, scenarioFiles } from "../model/graphData.js";
import { resolveSqlitePath } from "../graph/physicalSchema.js";
import { ROOT } from "../config.js";

const arg = (name: string, fallback = ""): string => {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const RUN_DIR = path.resolve(arg("--run"));
if (!arg("--run")) {
  console.error("用法: tsm grade --run <run_dir>（run_batch.sh 的产物目录）");
  process.exit(1);
}

// ── 期望值：题目自带 gold SQL 在本库 SQLite 上执行 ─────────────────────
const QJSON = path.join(ROOT, "MINIDEV_sqlite", "mini_dev_sqlite.json");
const questions: { question_id: number; db_id: string; question: string; SQL: string }[] = JSON.parse(
  fs.readFileSync(QJSON, "utf8"),
);
const byQid = new Map(questions.map((q) => [Number(q.question_id), q]));

/** 库 → sqlite 路径（从场景 YAML 取，与工具链同源） */
const dbPath = new Map<string, string>();
for (const f of scenarioFiles()) {
  const db = f.replace(/\.yaml$/, "");
  const { sc } = readScenario(db);
  const url = Object.values(sc.databases ?? {})[0] ?? "";
  const p = resolveSqlitePath(url, ROOT);
  if (p) dbPath.set(db, p);
}

function goldValues(qid: number, db: string): { values: string[]; empty?: boolean; err?: string } {
  const q = byQid.get(qid);
  const sqlite = dbPath.get(db);
  if (!q) return { values: [], err: "题目不存在" };
  if (!sqlite || !fs.existsSync(sqlite)) return { values: [], err: "SQLite 缺失" };
  try {
    const db2 = new DatabaseSync(sqlite, { readOnly: true });
    try {
      const rows = db2.prepare(String(q.SQL)).all() as Record<string, unknown>[];
      const values = rows.flatMap((r) => Object.values(r).map((v) => String(v)));
      // gold 正常执行但**零行** = 合法期望「空结果」（如"9 月有产品被消费吗"→无）
      return rows.length === 0 ? { values: [], empty: true } : { values };
    } finally {
      db2.close();
    }
  } catch (e) {
    return { values: [], err: String(e).slice(0, 120) };
  }
}

// ── 从 final 文本抽候选值 ─────────────────────────────────────────────
const NUM_RE = /-?\d[\d,]*(?:\.\d+)?/g;
const norm = (s: string) => s.toLowerCase().replace(/[\s,]+/g, " ").replace(/[^\w.%\- ]+/g, "").trim();

function judge(finalText: string, expected: string[]): { verdict: string; precision: string } {
  if (!expected.length) return { verdict: "GOLD_ERR", precision: "-" };
  const t = finalText;
  const tn = norm(t);
  // 全字符串命中（列表/文本型答案）
  if (expected.every((e) => tn.includes(norm(e)))) return { verdict: "PASS", precision: "text" };
  // 数值型：期望全部是数值 → 候选逐个匹配
  const expNums = expected.map((e) => Number(e.replace(/,/g, "")));
  if (expNums.every((n) => Number.isFinite(n))) {
    const cands = (t.match(NUM_RE) ?? []).map((s) => Number(s.replace(/,/g, "")));
    const REL = [1e-9, 1e-6, 1e-4, 1e-3];
    for (let lvl = 0; lvl < REL.length; lvl++) {
      const r = REL[lvl];
      const allHit = expNums.every((e) => cands.some((c) => Math.abs(c - e) <= Math.max(1e-12, Math.abs(e) * r)));
      if (allHit) return { verdict: "PASS", precision: `num@${r}` };
    }
    return { verdict: "FAIL", precision: "-" };
  }
  return { verdict: "UNCERTAIN", precision: "-" };
}

// ── 逐题处理 ─────────────────────────────────────────────────────────
const rawDir = path.join(RUN_DIR, "raw");
if (!fs.existsSync(rawDir)) {
  console.error(`[ERR] 找不到 ${rawDir}`);
  process.exit(1);
}
const rows: Record<string, string>[] = [];
for (const f of fs.readdirSync(rawDir).filter((x) => x.endsWith(".ndjson")).sort()) {
  const qid = Number((f.match(/_(\d+)_dlr\.ndjson$/) ?? [])[1] ?? 0);
  const q = byQid.get(qid);
  const db = q?.db_id ?? "-";
  let final = "";
  let steps = 0;
  let tools = 0;
  let toolErrors = 0;
  const trace: string[] = [];
  const callNames = new Map<string, string>();
  let sid = "";
  const tk = { total: 0, input: 0, cacheRead: 0, output: 0 };
  for (const line of fs.readFileSync(path.join(rawDir, f), "utf8").split("\n").filter(Boolean)) {
    let o: Record<string, unknown>;
    try {
      o = JSON.parse(line) as Record<string, unknown>;
    } catch {
      continue;
    }
    const type = o.type as string;
    if (type === "session") sid = String(o.sessionId ?? o.id ?? "");
    if (type === "final") final = String(o.text ?? "");
    if (type === "tool_call") {
      tools++;
      const name = typeof o.tool === "string" ? o.tool : ((o.tool as { name?: string } | undefined)?.name ?? "?");
      const short = name.replace("mcp__semantic-core__", "");
      callNames.set(String(o.callId ?? ""), short);
      trace.push(short);
    }
    if (type === "tool_result" && o.status === "error") toolErrors++;
    if (type === "status" && o.phase === "step_end") steps++;
    const u = o.usage as { totalTokens?: number; inputTokens?: number; cacheReadTokens?: number; outputTokens?: number } | undefined;
    if (type === "status" && u?.totalTokens) {
      tk.total += Number(u.totalTokens) || 0;
      tk.input += Number(u.inputTokens) || 0;
      tk.cacheRead += Number(u.cacheReadTokens) || 0;
      tk.output += Number(u.outputTokens) || 0;
    }
  }
  const gold = goldValues(qid, db);
  const v = gold.empty
    ? (() => {
        const saysEmpty =
          /(empty list|no (products?|records?|transactions?|results?|countries|purchases)|none|no data|\bempty\b|为空|没有|无(相符|记录|产品|交易))/i.test(
            final,
          );
        return { verdict: saysEmpty ? "PASS" : "FAIL", precision: "empty" };
      })()
    : judge(final, gold.values);
  rows.push({
    qid: String(qid),
    db,
    verdict: gold.err ? "GOLD_ERR" : v.verdict,
    precision: v.precision,
    answer: final.replace(/\s+/g, " ").slice(0, 160),
    expected: gold.values.slice(0, 4).join(" | ").slice(0, 160),
    steps: String(steps),
    tools: String(tools),
    tool_errors: String(toolErrors),
    tool_trace: trace.join(" → ").slice(0, 400),
    tokens_total: String(tk.total),
    tokens_input: String(tk.input),
    tokens_cache_read: String(tk.cacheRead),
    tokens_output: String(tk.output),
    cache_read_pct: tk.total ? `${Math.round((tk.cacheRead / tk.total) * 100)}%` : "-",
    log: `raw/${f}`,
    session: sid,
    gold_err: gold.err ?? "",
  });
}

// ── 产出 ─────────────────────────────────────────────────────────────
const cols = [
  "qid", "db", "verdict", "precision",
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
