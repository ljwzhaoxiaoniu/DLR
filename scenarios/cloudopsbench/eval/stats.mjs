// Cloud-OpsBench 跨轮统计 + 总账重建（仿 birdminidev 的 `tsm stats`）
//
// 读 results/<轮次>/ 下各家族的 *_details.json（grade.sh 产物）+ 基准 process-label 全量，
// 重建三样：
//   ① results/STATS.md        跨轮统计（逐轮表 / 覆盖度 / 汇总）
//   ② DETAIL.md               总账（覆盖度 / 汇总 / 分家族索引 + 定性观察〔手写区，重建时保留〕）
//   ③ DETAIL/<家族>.md        逐题校验表 + 证据正文（按 system-category 拆）
//
// 用法: node stats.mjs [--results <dir>] [--checkout <dir>]
//   results 默认 <repo>/scenarios/cloudopsbench/results；checkout 默认 $COB_DIR || /d/Code_Proj/Cloud-OpsBench
// 口径：去重取最新（同题多轮取最新一轮）；结果/流程分全部来自上游 scorer，无人工翻盘口径。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/scenarios/cloudopsbench/eval
const SCENARIO = path.resolve(HERE, ".."); // …/scenarios/cloudopsbench

const args = process.argv.slice(2);
let resultsDir = path.join(SCENARIO, "results");
let checkout = process.env.COB_DIR || "D:/Code_Proj/Cloud-OpsBench";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--results") resultsDir = args[++i];
  else if (args[i] === "--checkout") checkout = args[++i];
}

const MODEL = process.env.COB_MODEL || "dsh-tsm";
const METRICS = ["CA", "FA", "JRA", "MC", "EOC", "ECR", "EE", "steps", "RAR", "invalid_actions"];
const sysDirToName = (d) => (d === "trainticket" ? "train-ticket" : d);
const nameToSysDir = (s) => (s === "train-ticket" ? "trainticket" : s);
const now = new Date().toISOString();
const fmt = (n) => (typeof n === "number" ? String(Number(n.toFixed(4))) : String(n ?? ""));

// ── ① 读取轮次 ──────────────────────────────────────────────────────
const rounds = []; // {id, dir, entries: [detail...]}
for (const ent of fs.existsSync(resultsDir) ? fs.readdirSync(resultsDir, { withFileTypes: true }) : []) {
  if (!ent.isDirectory()) continue;
  const rdir = path.join(resultsDir, ent.name);
  const detailFiles = fs.readdirSync(rdir).filter((f) => f.endsWith("_details.json"));
  if (detailFiles.length === 0) continue; // 非轮次目录（raw/traces 等）
  const entries = [];
  for (const f of detailFiles) {
    const arr = JSON.parse(fs.readFileSync(path.join(rdir, f), "utf8"));
    for (const d of arr) {
      // family 从 label_path（…/process-label/<sysdir>/<cat>/<case>/milestone.json）解析
      const m = String(d.label_path || "").match(/process-label[/\\]([^/\\]+)[/\\]([^/\\]+)[/\\]/);
      if (!m) continue;
      entries.push({ ...d, sysdir: m[1], category: m[2], family: `${m[1]}/${m[2]}` });
    }
  }
  rounds.push({ id: ent.name, dir: rdir, entries });
}
rounds.sort((a, b) => a.id.localeCompare(b.id)); // 时间戳前缀 → 字典序即时间序

// ── ② 去重取最新 + 家族索引 ─────────────────────────────────────────
const latest = new Map(); // "sysdir/cat/case" → {…, round}
for (const r of rounds) for (const e of r.entries) latest.set(`${e.family}/${e.case_name}`, { ...e, round: r.id });
const families = [...new Set([...latest.values()].map((e) => e.family))].sort();

// ── ③ 全量清单（process-label 权威计数）────────────────────────────
const full = new Map(); // family → 全量题数
let grandTotal = 0;
const labelRoot = path.join(checkout, "process-label");
for (const sys of fs.existsSync(labelRoot) ? fs.readdirSync(labelRoot) : []) {
  const sysPath = path.join(labelRoot, sys);
  if (!fs.statSync(sysPath).isDirectory()) continue;
  for (const cat of fs.readdirSync(sysPath)) {
    const catPath = path.join(sysPath, cat);
    if (!fs.statSync(catPath).isDirectory()) continue;
    const n = fs.readdirSync(catPath, { withFileTypes: true }).filter((d) => d.isDirectory()).length;
    full.set(`${sys}/${cat}`, n);
    grandTotal += n;
  }
}
const familyDisplay = (f) => `${sysDirToName(f.split("/")[0])}/${f.split("/")[1]}`;

// ── ④ 聚合助手 ──────────────────────────────────────────────────────
const mean = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
const pct = (a, b) => (b ? `${((a / b) * 100).toFixed(1)}%` : "—");
function aggregate(entries) {
  const g = (e, k) => Number(e.metrics?.[k] ?? 0);
  const jra = entries.filter((e) => g(e, "JRA") === 1).length;
  const ca = entries.filter((e) => g(e, "CA") === 1).length;
  const fa = entries.filter((e) => g(e, "FA") === 1).length;
  const chain = entries.filter((e) => g(e, "ECR") === 1).length;
  return {
    n: entries.length, jra, ca, fa, chain,
    MC: mean(entries.map((e) => g(e, "MC"))),
    EOC: mean(entries.map((e) => g(e, "EOC"))),
    ECR: mean(entries.map((e) => g(e, "ECR"))),
    EE: mean(entries.map((e) => g(e, "EE"))),
    steps: mean(entries.map((e) => g(e, "steps"))),
    RAR: mean(entries.map((e) => g(e, "RAR"))),
    invalid: mean(entries.map((e) => g(e, "invalid_actions"))),
  };
}
const latestAll = [...latest.values()];
const A = aggregate(latestAll);
const covered = latestAll.length;

// ── ⑤ STATS.md ──────────────────────────────────────────────────────
const statLines = [];
statLines.push("# 实测结果综合统计（cob stats）", "");
statLines.push(`场景 \`cloudopsbench\` ｜ 轮次 ${rounds.length} ｜ 覆盖 ${covered}/${grandTotal} ｜ 生成 ${now}`, "");
statLines.push(`**结果分（去重取最新 · 每题取最新一轮）：JRA ${A.jra}/${A.n}（${pct(A.jra, A.n)}）｜ CA ${A.ca} ｜ FA ${A.fa}**`, "");
statLines.push("## 逐轮 · 结果与流程（本轮记录 · 按次数）", "");
statLines.push("| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps |");
statLines.push("|---|---|---|---|---|---|---|---|---|---|");
for (const r of rounds) {
  const a = aggregate(r.entries);
  statLines.push(`| ${r.id} | ${a.n} | ${a.jra} | ${a.ca} | ${a.fa} | ${fmt(a.MC)} | ${fmt(a.EOC)} | ${fmt(a.ECR)} | ${fmt(a.EE)} | ${fmt(a.steps)} |`);
}
statLines.push("", "## 跑题覆盖度（跑过多少题）", "");
statLines.push("> 覆盖度 = 跑过的题（去重）÷ `process-label` 全量题数——只看跑没跑过，与对错无关。", "");
statLines.push("| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |");
statLines.push("|---|---|---|---|---|");
const allFamilies = [...new Set([...full.keys(), ...families])].sort();
for (const f of allFamilies) {
  const total = full.get(f) ?? 0;
  const done = latestAll.filter((e) => e.family === f).length;
  statLines.push(`| ${familyDisplay(f)} | ${total} | ${done} | ${total - done} | ${pct(done, total)} |`);
}
statLines.push(`| **合计** | **${grandTotal}** | **${covered}** | **${grandTotal - covered}** | **${pct(covered, grandTotal)}** |`);
statLines.push("", "## 汇总（去重 · 取最新）", "");
statLines.push(`**结果分**：JRA ${A.jra}/${A.n}（${pct(A.jra, A.n)}）｜ CA ${A.ca} ｜ FA ${A.fa} ｜ 证据链全闭 ${A.chain}/${A.n}`, "");
statLines.push("**流程分（均值）**", "");
statLines.push("| MC | EOC | ECR | EE | steps | RAR | invalid |");
statLines.push("|---|---|---|---|---|---|---|");
statLines.push(`| ${fmt(A.MC)} | ${fmt(A.EOC)} | ${fmt(A.ECR)} | ${fmt(A.EE)} | ${fmt(A.steps)} | ${fmt(A.RAR)} | ${fmt(A.invalid)} |`);
statLines.push("", "> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`。");
fs.writeFileSync(path.join(resultsDir, "STATS.md"), statLines.join("\n") + "\n", "utf8");

// ── ⑥ DETAIL/<家族>.md ──────────────────────────────────────────────
const detailDir = path.join(SCENARIO, "DETAIL");
fs.mkdirSync(detailDir, { recursive: true });
const famFile = (f) => `${f.replace("/", "-")}.md`;
for (const f of families) {
  const entries = latestAll.filter((e) => e.family === f).sort((a, b) => (Number(a.case_name) || 0) - (Number(b.case_name) || 0));
  const a = aggregate(entries);
  const total = full.get(f) ?? 0;
  const L = [];
  L.push(`# 评测明细 · ${familyDisplay(f)} — cloudopsbench`, "");
  L.push(`> 本家族已跑 **${a.n}/${total}** 题：JRA ✅${a.jra} ❌${a.n - a.jra} ｜ 证据链全闭 ${a.chain} ｜ 生成 ${now}`);
  L.push(`> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。`, "");
  L.push("## 逐题校验表", "");
  L.push("| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |");
  L.push("|---|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const e of entries) {
    const g = (k) => fmt(e.metrics?.[k]);
    const hit = Number(e.metrics?.JRA) === 1;
    const note = e.error ? `错误: ${e.error}` : (hit && Number(e.metrics?.ECR) === 1 ? "全对·链闭" : hit ? "结果对·链未闭" : "未命中");
    L.push(`| [${e.case_name}](#case-${e.case_name}) | ${g("CA")} | ${g("FA")} | ${g("JRA")} | ${g("MC")} | ${g("EOC")} | ${g("ECR")} | ${g("EE")} | ${g("steps")} | ${g("RAR")} | ${g("invalid_actions")} | ${e.round} | ${note} |`);
  }
  L.push("", "## 证据正文", "");
  for (const e of entries) {
    const gt = e.ground_truth || {};
    const p1 = (e.top_3_predictions || [])[0] || {};
    const verdict = p1.fault_object === gt.fault_object && p1.root_cause === gt.root_cause ? "✓ 逐字命中" : "✗ 与标签不符";
    // 摘要：优先取该轮 traces 里的 key_evidence_summary
    let summary = "";
    const tracePath = path.join(resultsDir, e.round, "traces", e.sysdir, MODEL, e.category, e.case_name, `${e.case_name}.json`);
    try {
      const fa = JSON.parse(fs.readFileSync(tracePath, "utf8")).final_answer || {};
      summary = String(fa.key_evidence_summary || "").slice(0, 600);
    } catch { /* 无 traces 时留空 */ }
    L.push(`### case-${e.case_name}`, "");
    L.push(`- **结论**：\`${p1.fault_object ?? ""}\` + \`${p1.root_cause ?? ""}\` ｜ 标签 \`${gt.fault_object ?? ""}\` + \`${gt.root_cause ?? ""}\`（${verdict}）`);
    L.push(`- **流程**：MC ${fmt(e.metrics?.MC)} · EOC ${fmt(e.metrics?.EOC)} · ECR ${fmt(e.metrics?.ECR)} · EE ${fmt(e.metrics?.EE)} · steps ${fmt(e.metrics?.steps)}`);
    if (e.error) L.push(`- **错误**：${e.error}`);
    if (summary) L.push(`- **摘要**：${summary}`);
    L.push("");
  }
  fs.writeFileSync(path.join(detailDir, famFile(f)), L.join("\n") + "\n", "utf8");
}

// ── ⑦ DETAIL.md（总账；定性观察手写区保留）──────────────────────────
const detailPath = path.join(SCENARIO, "DETAIL.md");
const KEEP = "<!-- stats:keep-below（定性观察手写区——重建时原样保留） -->";
let keepTail = "";
if (fs.existsSync(detailPath)) {
  const old = fs.readFileSync(detailPath, "utf8");
  const idx = old.indexOf(KEEP);
  if (idx >= 0) keepTail = old.slice(idx);
}
const D = [];
D.push("# 评测明细 — TSM 语义层 · cloudopsbench", "");
D.push("> **说明**：question 驱动——T1 基准诊断工具实查数据 / T2 `state_model_query` 模型切片（症状 → 入口链 + 观测槽）/ T3 `dlr_search_consensus` 读法；沿链走、第一个「观测 ≠ 期望」的槽即断点。");
D.push("> **评定**：全部以上游 scorer 输出为准（无人工翻盘口径）——结果分 CA/FA/JRA（Rank 1 对 `process-label` 标签逐字）＋ 流程分 MC/EOC/ECR/EE（对里程碑证据链）。");
D.push(`> **数据来源**：\`results/<轮次>/\`（questions.csv / traces/）；本文件由 \`eval/stats.mjs\` 自动重建；逐题校验表与证据正文按家族拆分，见文末索引。`);
D.push("> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ RAR 重复调用率 ｜ inv 无效动作。", "");
D.push("## 跑题覆盖度（跑过多少题）", "");
D.push("| 家族 | 全量 | 已跑 | 剩余 | 覆盖 |");
D.push("|---|---|---|---|---|");
for (const f of allFamilies) {
  const total = full.get(f) ?? 0;
  const done = latestAll.filter((e) => e.family === f).length;
  D.push(`| ${familyDisplay(f)} | ${total} | ${done} | ${total - done} | ${pct(done, total)} |`);
}
D.push(`| **合计** | **${grandTotal}** | **${covered}** | **${grandTotal - covered}** | **${pct(covered, grandTotal)}** |`, "");
D.push("## 汇总（去重 · 取最新）", "");
D.push("**结果分（最新一轮每题）**", "");
D.push("| 指标 | 值 |");
D.push("|---|---|");
D.push(`| JRA（联合命中） | ${A.jra} / ${A.n}（${pct(A.jra, A.n)}） |`);
D.push(`| CA（组件命中） | ${A.ca} / ${A.n}（${pct(A.ca, A.n)}） |`);
D.push(`| FA（故障型命中） | ${A.fa} / ${A.n}（${pct(A.fa, A.n)}） |`);
D.push(`| ECR（证据链全闭） | ${A.chain} / ${A.n}（${pct(A.chain, A.n)}） |`);
D.push("", "**流程分（均值）**", "");
D.push("| MC | EOC | ECR | EE | steps | RAR | invalid |");
D.push("|---|---|---|---|---|---|---|");
D.push(`| ${fmt(A.MC)} | ${fmt(A.EOC)} | ${fmt(A.ECR)} | ${fmt(A.EE)} | ${fmt(A.steps)} | ${fmt(A.RAR)} | ${fmt(A.invalid)} |`);
D.push("", "## 分家族索引", "");
D.push("| 家族 | 全量 | 已跑 | JRA | 链全闭 | 明细 |");
D.push("|---|---|---|---|---|---|");
for (const f of families) {
  const entries = latestAll.filter((e) => e.family === f);
  const a = aggregate(entries);
  const total = full.get(f) ?? 0;
  D.push(`| ${familyDisplay(f)} | ${total} | ${a.n} | ${a.jra} | ${a.chain} | [${famFile(f)}](DETAIL/${famFile(f)}) |`);
}
D.push("", "## 定性观察", "");
D.push(KEEP);
if (keepTail) D.push(keepTail.slice(KEEP.length).replace(/^\n+/, ""));
else D.push("> （跑批后按案例补写：值得注意的错法 / 链闭而答案错 / 流程分特低特高 的题。）", "");
fs.writeFileSync(detailPath, D.join("\n") + "\n", "utf8");

console.log(`[stats] 轮次 ${rounds.length} · 覆盖 ${covered}/${grandTotal} · JRA ${A.jra}/${A.n}`);
console.log(`[stats] → ${path.join(resultsDir, "STATS.md")}`);
console.log(`[stats] → ${detailPath}`);
console.log(`[stats] → ${detailDir}/*.md（${families.length} 个家族）`);
