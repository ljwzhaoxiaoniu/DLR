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
/** token 显示（同 tsm stats 口径）：千分位；口径 total = input + cache_read + cache_write + output */
const tok = (n) => (typeof n === "number" ? n.toLocaleString("en-US") : "—");

/** raw ndjson 的 step_end.usage 逐轮求和：round 目录 → "sysdir/cat/case" → token 统计 */
function scanTokens(dir) {
  const map = new Map();
  const rawDir = path.join(dir, "raw");
  if (!fs.existsSync(rawDir)) return map;
  for (const run of fs.readdirSync(rawDir, { withFileTypes: true })) {
    if (!run.isDirectory()) continue;
    const metaPath = path.join(rawDir, run.name, "meta.yml");
    if (!fs.existsSync(metaPath)) continue;
    const meta = fs.readFileSync(metaPath, "utf8");
    const g = (k) => (meta.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim();
    const sys = g("system"), cat = g("category"), cs = g("case");
    if (!sys || !cat || !cs) continue;
    const nd = fs.readdirSync(path.join(rawDir, run.name)).find((f) => f.endsWith(".ndjson"));
    if (!nd) continue;
    const key = `${nameToSysDir(sys)}/${cat}/${cs}`;
    const acc = map.get(key) ?? { total: 0, input: 0, cacheRead: 0, cacheWrite: 0, output: 0, turns: 0 };
    for (const line of fs.readFileSync(path.join(rawDir, run.name, nd), "utf8").split("\n")) {
      try {
        const o = JSON.parse(line);
        if (o.type === "status" && o.phase === "step_end" && o.usage) {
          const u = o.usage;
          acc.total += u.totalTokens ?? ((u.inputTokens || 0) + (u.cacheReadTokens || 0) + (u.cacheWriteTokens || 0) + (u.outputTokens || 0));
          acc.input += u.inputTokens || 0;
          acc.cacheRead += u.cacheReadTokens || 0;
          acc.cacheWrite += u.cacheWriteTokens || 0;
          acc.output += u.outputTokens || 0;
          acc.turns += 1;
        }
      } catch { /* 截断行 */ }
    }
    map.set(key, acc);
  }
  return map;
}

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
// ①b token：各轮 raw 逐 run 求和后挂到对应的条目上
for (const r of rounds) {
  const tmap = scanTokens(r.dir);
  for (const e of r.entries) e.tokens = tmap.get(`${e.family}/${e.case_name}`) ?? null;
}

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
statLines.push("| 轮次 | 题数 | JRA | CA | FA | MC | EOC | ECR | EE | steps | tokens |");
statLines.push("|---|---|---|---|---|---|---|---|---|---|---|");
for (const r of rounds) {
  const a = aggregate(r.entries);
  const tSum = r.entries.reduce((n, e) => n + (e.tokens?.total || 0), 0);
  statLines.push(`| ${r.id} | ${a.n} | ${a.jra} | ${a.ca} | ${a.fa} | ${fmt(a.MC)} | ${fmt(a.EOC)} | ${fmt(a.ECR)} | ${fmt(a.EE)} | ${fmt(a.steps)} | ${tok(tSum)} |`);
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
// token（去重取最新）
const tks = latestAll.map((e) => e.tokens?.total).filter((n) => typeof n === "number").sort((x, y) => x - y);
const tSum = tks.reduce((x, y) => x + y, 0);
const tAvg = tks.length ? Math.round(tSum / tks.length) : null;
const tMed = tks.length ? tks[Math.floor(tks.length / 2)] : null;
const tCr = latestAll.reduce((n, e) => n + (e.tokens?.cacheRead || 0), 0);
statLines.push("", "**token（去重取最新 · total = input + cache_read + cache_write + output）**", "");
statLines.push("| 平均 | 中位 | 最低 | 最高 | cache 读占比 |");
statLines.push("|---|---|---|---|---|");
statLines.push(`| ${tok(tAvg)} | ${tok(tMed)} | ${tok(tks[0] ?? null)} | ${tok(tks[tks.length - 1] ?? null)} | ${tSum ? Math.round((tCr / tSum) * 100) + "%" : "—"} |`);
statLines.push("", "> 口径：结果/流程分全部来自上游 scorer（同口径可与基准发表数字对表）；去重取最新（同题多轮取最新一轮）；逐题明细在各轮 `questions.csv` 与 `../DETAIL.md`；token 自各轮 `raw/` ndjson 的 `step_end.usage` 逐 run 求和。");
fs.writeFileSync(path.join(resultsDir, "STATS.md"), statLines.join("\n") + "\n", "utf8");

// ── ⑥ DETAIL/<家族>.md ──────────────────────────────────────────────
const detailDir = path.join(SCENARIO, "DETAIL");
fs.mkdirSync(detailDir, { recursive: true });
const famFile = (f) => `${f.replace("/", "-")}.md`;
for (const f of families) {
  const entries = latestAll.filter((e) => e.family === f).sort((a, b) => (Number(a.case_name) || 0) - (Number(b.case_name) || 0));
  const a = aggregate(entries);
  const total = full.get(f) ?? 0;
  const ft = entries.map((e) => e.tokens?.total).filter((n) => typeof n === "number").sort((x, y) => x - y);
  const famMed = ft.length ? ft[Math.floor(ft.length / 2)] : null;
  const L = [];
  L.push(`# 评测明细 · ${familyDisplay(f)} — cloudopsbench`, "");
  L.push(`> 本家族已跑 **${a.n}/${total}** 题：JRA ✅${a.jra} ❌${a.n - a.jra} ｜ 证据链全闭 ${a.chain} ｜ token 中位 ${tok(famMed)} ｜ 生成 ${now}`);
  L.push(`> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。`, "");
  L.push("## 逐题校验表", "");
  L.push("| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |");
  L.push("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const e of entries) {
    const g = (k) => fmt(e.metrics?.[k]);
    const hit = Number(e.metrics?.JRA) === 1;
    const note = e.error ? `错误: ${e.error}` : (hit && Number(e.metrics?.ECR) === 1 ? "全对·链闭" : hit ? "结果对·链未闭" : "未命中");
    L.push(`| [${e.case_name}](#case-${e.case_name}) | ${g("CA")} | ${g("FA")} | ${g("JRA")} | ${g("MC")} | ${g("EOC")} | ${g("ECR")} | ${g("EE")} | ${g("steps")} | ${tok(e.tokens?.total)} | ${g("RAR")} | ${g("invalid_actions")} | ${e.round} | ${note} |`);
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
    L.push(`- **流程**：MC ${fmt(e.metrics?.MC)} · EOC ${fmt(e.metrics?.EOC)} · ECR ${fmt(e.metrics?.ECR)} · EE ${fmt(e.metrics?.EE)} · steps ${fmt(e.metrics?.steps)} · tokens ${tok(e.tokens?.total)}`);
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
D.push("> **列义**：CA 组件 ｜ FA 故障型 ｜ JRA 联合命中 ｜ MC 里程碑覆盖 ｜ EOC 证据顺序 ｜ ECR 证据链闭合 ｜ EE 证据效率 ｜ steps 诊断步数 ｜ tokens 会话 token 合计（input+cache_read+cache_write+output）｜ RAR 重复调用率 ｜ inv 无效动作。", "");
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
D.push("", "**效率（去重取最新）**", "");
D.push("| token 平均 / 中位 | token 最低 / 最高 | cache 读占比 |");
D.push("|---|---|---|");
D.push(`| ${tok(tAvg)} / ${tok(tMed)} | ${tok(tks[0] ?? null)} / ${tok(tks[tks.length - 1] ?? null)} | ${tSum ? Math.round((tCr / tSum) * 100) + "%" : "—"} |`);
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

// ── ⑧ overview.html（总视图：关键数 + 覆盖度进度条 + 效率 + 逐题明细；与 DETAIL.md 同级）──
// 设计系统对齐 birdminidev/share（同源 CSS 变量）；每次 stats 重建自动刷新
const overviewPath = path.join(SCENARIO, "overview.html");
const barPct = (done, total) => (total ? Math.round((done / total) * 1000) / 10 : 0);
const familiesSorted = [...new Set([...full.keys(), ...families])].sort();
const famRows = familiesSorted.map((f) => {
  const total = full.get(f) ?? 0;
  const done = latestAll.filter((e) => e.family === f).length;
  const p = barPct(done, total);
  return `<div class="fam">
    <div class="fam__name">${familyDisplay(f)}</div>
    <div class="fam__bar"><div class="bar"><div class="bar__fill" style="width:${Math.min(p, 100)}%"></div></div></div>
    <div class="fam__num">${done}/${total} · ${p}%</div>
  </div>`;
}).join("\n");
const caseRows = [...latestAll].sort((a, b) => a.family.localeCompare(b.family) || (Number(a.case_name) || 0) - (Number(b.case_name) || 0)).map((e) => {
  const g = (k) => fmt(e.metrics?.[k]);
  return `<tr><td><code>${familyDisplay(e.family)}/${e.case_name}</code></td><td>${g("JRA") === "1" ? '<span class="ok">✅</span>' : g("JRA")}</td><td>${g("MC")}</td><td>${g("EOC")}</td><td>${g("ECR")}</td><td>${g("EE")}</td><td>${g("steps")}</td><td>${tok(e.tokens?.total)}</td><td class="muted">${e.round.slice(0, 13)}</td></tr>`;
}).join("\n");
const overviewHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TSM × Cloud-OpsBench · 总视图</title>
<style>
  :root {
    --surface: #fcfcfb; --page: #f9f9f7; --ink: #0b0b0b; --ink-2: #52514e; --muted: #898781;
    --grid: #e1e0d9; --border: rgba(11,11,11,0.08); --dlr: #2a78d6; --good: #0ca30c;
    font-family: system-ui, -apple-system, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 17px; line-height: 1.6; color: var(--ink); background: var(--page);
  }
  @media (prefers-color-scheme: dark) {
    :root:where(:not([data-theme="light"])) {
      --surface: #1a1a19; --page: #0d0d0d; --ink: #fff; --ink-2: #c3c2b7; --muted: #898781;
      --grid: #2c2c2a; --border: rgba(255,255,255,0.08); --dlr: #3987e5; --good: #2fbf2f;
    }
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { max-width: 1080px; margin: 0 auto; padding: 56px 28px 80px; }
  .hero { font-size: clamp(30px, 4.5vw, 48px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.15; }
  .hero em { font-style: normal; color: var(--dlr); }
  .deck { color: var(--ink-2); margin-top: 14px; max-width: 760px; }
  .section-title { font-size: clamp(22px, 3vw, 32px); font-weight: 750; letter-spacing: -0.015em; margin: 56px 0 20px; }
  .section-title em { font-style: normal; color: var(--dlr); }
  .muted { color: var(--muted); font-size: 14px; }
  .ok { color: var(--good); }
  .stat-row { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 30px; }
  .stat { flex: 1 1 180px; min-width: 160px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 22px 24px; }
  .stat__value { font-size: clamp(28px, 3.6vw, 42px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; color: var(--dlr); }
  .stat--good .stat__value { color: var(--good); }
  .stat__label { font-size: 14px; color: var(--ink-2); margin-top: 6px; }
  .stat__note { font-size: 12.5px; color: var(--muted); margin-top: 3px; }
  .fam { display: grid; grid-template-columns: 210px 1fr 130px; gap: 14px; align-items: center; padding: 7px 0; }
  .fam__name { font-size: 14.5px; font-weight: 600; text-align: right; }
  .fam__num { font-size: 13px; color: var(--ink-2); font-variant-numeric: tabular-nums; }
  .bar { height: 10px; border-radius: 999px; background: var(--grid); overflow: hidden; }
  .bar__fill { height: 100%; background: var(--dlr); border-radius: 999px; min-width: 2px; }
  table { width: 100%; border-collapse: collapse; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; font-size: 14px; }
  th, td { padding: 9px 12px; text-align: left; border-bottom: 1px solid var(--border); white-space: nowrap; }
  th { font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
  tr:last-child td { border-bottom: none; }
  code { font-size: 13px; color: var(--dlr); }
  .note { border-left: 3px solid var(--dlr); padding: 12px 18px; background: var(--surface); border-radius: 0 10px 10px 0; font-size: 14.5px; color: var(--ink-2); margin-top: 26px; }
  a { color: var(--dlr); }
</style>
</head>
<body>
<h1 class="hero">TSM × Cloud-OpsBench · <em>总视图</em></h1>
<p class="deck">三级语义建模（L1 对象/面 · L2 读法 · L3 走链）驱动的 K8s 根因诊断——快照确定性回放（锚 ea05daf），结果为上游 scorer 原口径。本页由 <code>eval/stats.mjs</code> 每次重建自动刷新。</p>
<div class="stat-row">
  <div class="stat"><div class="stat__value">${covered}/${grandTotal}</div><div class="stat__label">跑题覆盖度</div><div class="stat__note">${pct(covered, grandTotal)}</div></div>
  <div class="stat stat--good"><div class="stat__value">${A.jra}/${A.n}</div><div class="stat__label">JRA 联合命中</div><div class="stat__note">CA ${A.ca} · FA ${A.fa}</div></div>
  <div class="stat stat--good"><div class="stat__value">${A.chain}/${A.n}</div><div class="stat__label">证据链全闭</div><div class="stat__note">MC ${fmt(A.MC)} · EOC ${fmt(A.EOC)}</div></div>
  <div class="stat"><div class="stat__value">${tok(tMed)}</div><div class="stat__label">token 中位 / 题</div><div class="stat__note">平均 ${tok(tAvg)} · cache 读 ${tSum ? Math.round((tCr / tSum) * 100) : 0}%</div></div>
</div>

<h2 class="section-title">跑题覆盖度 · <em>逐家族进度</em></h2>
${famRows}

<h2 class="section-title">逐题明细 · <em>去重取最新</em></h2>
<table>
<tr><th>题</th><th>JRA</th><th>MC</th><th>EOC</th><th>ECR</th><th>EE</th><th>steps</th><th>tokens</th><th>轮次</th></tr>
${caseRows}
</table>
<div class="note">口径：结果/流程分取自上游 scorer（无人工翻盘）；tokens = input + cache_read + cache_write + output（raw ndjson 逐轮求和）。文字版台账：<a href="results/STATS.md">STATS.md</a> · <a href="DETAIL.md">DETAIL.md</a>（逐题证据按家族拆 <a href="DETAIL/">DETAIL/</a>）。生成 ${now}</div>
</body>
</html>
`;
fs.writeFileSync(overviewPath, overviewHtml, "utf8");

console.log(`[stats] 轮次 ${rounds.length} · 覆盖 ${covered}/${grandTotal} · JRA ${A.jra}/${A.n}`);
console.log(`[stats] → ${path.join(resultsDir, "STATS.md")}`);
console.log(`[stats] → ${detailPath}`);
console.log(`[stats] → ${detailDir}/*.md（${families.length} 个家族）`);
console.log(`[stats] → ${overviewPath}`);
