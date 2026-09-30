/**
 * 附件用两视图统计：难度视图 × 主题（库）视图 —— token 中位/均值、步数均值、工具数均值
 *
 * 口径：每题取最新一轮（同 tsm stats）；全部 ✅/🔁（正确 100%），本表只呈现成本指标。
 * 用法（仓库根执行）: node scenarios/birdminidev/eval/appendix_views.mjs
 */
import fs from "node:fs";
import path from "node:path";

const RESULTS = "scenarios/birdminidev/results";
const DATASET = "MINIDEV_sqlite/mini_dev_sqlite.json";

// ── CSV 解析（引号状态机；按全文解析，兼容字段内换行）────────────────
const parseCsv = (s) => {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === '"') { if (s[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c === "\r") { /* skip */ }
      else cur += c;
    }
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
};

const runs = fs.readdirSync(RESULTS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && fs.existsSync(path.join(RESULTS, d.name, "questions.csv")))
  .map((d) => d.name).sort(); // 与 listRuns 同序（整名排序）

// ── 每题取最新一轮 ───────────────────────────────────────────────────
const latest = new Map(); // qid -> {db, ruling, steps, tools, tokens}
for (const run of runs) {
  const rows = parseCsv(fs.readFileSync(path.join(RESULTS, run, "questions.csv"), "utf8"));
  const head = rows[0];
  const ix = (name) => head.indexOf(name);
  const [iQid, iDb, iRuling, iSteps, iTools, iTok] =
    [ix("qid"), ix("db"), ix("ruling"), ix("steps"), ix("tools"), ix("tokens_total")];
  for (const r of rows.slice(1)) {
    if (!r[iQid]) continue;
    latest.set(r[iQid], {
      db: r[iDb], ruling: r[iRuling],
      steps: Number(r[iSteps]) || 0, tools: Number(r[iTools]) || 0, tokens: Number(r[iTok]) || 0,
    });
  }
}

// ── 数据集难度的对照表 ───────────────────────────────────────────────
const dataset = JSON.parse(fs.readFileSync(DATASET, "utf8"));
const diffOf = new Map(dataset.map((q) => [String(q.question_id), q.difficulty]));

// ── 汇总工具 ─────────────────────────────────────────────────────────
// 与 detail.ts 同口径：中位 = 上中位（sorted[floor(n/2)]）；均值四舍五入
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const mean = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : 0);
const nf = (n) => Math.round(n).toLocaleString("en-US");

const meanF = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0); // 步数/工具保留一位小数

function view(title, keyFn, order) {
  const groups = new Map();
  for (const [qid, r] of latest) {
    const k = keyFn(qid, r);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(r);
  }
  const keys = order ?? [...groups.keys()].sort();
  console.log(`\n## ${title}\n`);
  console.log("| 组 | 题数 | token 中位 | token 均值 | 步数均值 | 工具数均值 |");
  console.log("|---|---|---|---|---|---|");
  const all = [];
  for (const k of keys) {
    const rs = groups.get(k) ?? [];
    all.push(...rs);
    console.log(`| ${k} | ${rs.length} | ${nf(median(rs.map((r) => r.tokens)))} | ${nf(mean(rs.map((r) => r.tokens)))} | ${meanF(rs.map((r) => r.steps)).toFixed(1)} | ${meanF(rs.map((r) => r.tools)).toFixed(1)} |`);
  }
  console.log(`| **全部** | ${all.length} | ${nf(median(all.map((r) => r.tokens)))} | ${nf(mean(all.map((r) => r.tokens)))} | ${meanF(all.map((r) => r.steps)).toFixed(1)} | ${meanF(all.map((r) => r.tools)).toFixed(1)} |`);
}

console.log(`# 附件统计（每题最新一轮，n=${latest.size}）`);
view("视图一 · 按题目难度", (qid) => diffOf.get(qid) ?? "?", ["simple", "moderate", "challenging"]);
view("视图二 · 按库（主题）", (_qid, r) => r.db);
