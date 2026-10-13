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
    const rd = rawDirFor(e);
    if (rd) L.push(`- **raw 日志**：[${rd.replace(/\/$/, "")}](../${rd})（ndjson / mcp.jsonl / meta）`);
    if (e.error) L.push(`- **错误**：${e.error}`);
    if (summary) L.push(`- **摘要**：${summary}`);
    L.push("");
  }
  fs.writeFileSync(path.join(detailDir, famFile(f)), L.join("\n") + "\n", "utf8");

  // 同内容的 HTML 浏览版（家族名从总视图点进来的落点）
  const famCss = `:root { --surface:#fcfcfb; --page:#f9f9f7; --ink:#0b0b0b; --ink-2:#52514e; --muted:#898781; --grid:#e1e0d9; --border:rgba(11,11,11,0.08); --dlr:#2a78d6; --good:#0ca30c; }
@media (prefers-color-scheme: dark) { :root:where(:not([data-theme="light"])) { --surface:#1a1a19; --page:#0d0d0d; --ink:#fff; --ink-2:#c3c2b7; --muted:#898781; --grid:#2c2c2a; --border:rgba(255,255,255,0.08); --dlr:#3987e5; --good:#2fbf2f; } }
* { box-sizing:border-box; margin:0; padding:0; } body { max-width:1080px; margin:0 auto; padding:48px 28px 72px; font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif; font-size:16px; line-height:1.6; color:var(--ink); background:var(--page); }
.hero { font-size:clamp(26px,4vw,40px); font-weight:800; letter-spacing:-0.02em; } .hero em { font-style:normal; color:var(--dlr); }
.deck { color:var(--ink-2); margin-top:12px; } .muted { color:var(--muted); font-size:13.5px; }
.section-title { font-size:clamp(19px,2.4vw,26px); font-weight:750; margin:40px 0 16px; } .section-title em { font-style:normal; color:var(--dlr); }
table { width:100%; border-collapse:collapse; background:var(--surface); border:1px solid var(--border); border-radius:12px; overflow:hidden; font-size:13.5px; }
th, td { padding:8px 11px; text-align:left; border-bottom:1px solid var(--border); white-space:nowrap; } th { font-size:12px; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted); } tr:last-child td { border-bottom:none; }
code { font-size:13px; color:var(--dlr); } a { color:var(--dlr); } a:hover { text-decoration-thickness:2px; } .ok { color:var(--good); }
details { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:12px 18px; margin:10px 0; } details summary { cursor:pointer; font-size:14.5px; } details ul { margin:10px 0 4px; padding-left:20px; font-size:14px; color:var(--ink-2); }
details p { font-size:14px; color:var(--ink-2); margin:7px 0; }
pre { white-space:pre-wrap; word-break:break-word; background:var(--page); border:1px solid var(--border); border-radius:8px; padding:10px 14px; font-size:12.8px; line-height:1.55; font-family:ui-monospace,Consolas,monospace; color:var(--ink); margin:8px 0; }
.note { border-left:3px solid var(--dlr); padding:12px 18px; background:var(--surface); border-radius:0 10px 10px 0; font-size:14.5px; color:var(--ink-2); margin-top:20px; }`;
  const H = [];
  H.push(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>评测明细 · ${familyDisplay(f)} — cloudopsbench</title><style>${famCss}</style></head><body>`);
  H.push(`<p class="muted"><a href="../overview.html">← 总视图</a> · <a href="../DETAIL.md">DETAIL.md（文字版总账）</a> · <a href="../results/STATS.md">STATS.md</a></p>`);
  H.push(`<h1 class="hero">评测明细 · <em>${familyDisplay(f)}</em></h1>`);
  H.push(`<p class="deck">已跑 <b>${a.n}/${total}</b> 题：JRA ✅${a.jra} ❌${a.n - a.jra} ｜ 证据链全闭 ${a.chain} ｜ token 中位 ${tok(famMed)} ｜ 口径与列义同总账 ｜ 生成 ${now}</p>`);
  H.push(`<h2 class="section-title">逐题统计 · <em>去重取最新</em></h2>`);
  H.push(`<table><tr><th>案例</th><th>CA</th><th>FA</th><th>JRA</th><th>MC</th><th>EOC</th><th>ECR</th><th>EE</th><th>steps</th><th>tokens</th><th>RAR</th><th>inv</th><th>轮次</th><th>raw 日志</th></tr>`);
  for (const e of entries) {
    const g = (k) => fmt(e.metrics?.[k]);
    const jra = Number(e.metrics?.JRA) === 1;
    const rd = rawDirFor(e);
    const rawCell = rd ? `<a href="../${rd}" title="raw 日志（ndjson / mcp.jsonl / meta）">${rd.replace(/\/$/, "").split("/raw/")[1] || "raw"}</a>` : "—";
    H.push(`<tr><td><a href="#case-${e.case_name}"><code>${e.case_name}</code></a></td><td>${g("CA")}</td><td>${g("FA")}</td><td>${jra ? '<span class="ok">✅</span>' : g("JRA")}</td><td>${g("MC")}</td><td>${g("EOC")}</td><td>${g("ECR")}</td><td>${g("EE")}</td><td>${g("steps")}</td><td>${tok(e.tokens?.total)}</td><td>${g("RAR")}</td><td>${g("invalid_actions")}</td><td class="muted">${e.round}</td><td>${rawCell}</td></tr>`);
  }
  H.push(`</table>`);
  H.push(`<h2 class="section-title">证据正文 · <em>逐题摘要</em></h2>`);
  for (const e of entries) {
    const gt = e.ground_truth || {};
    const p1 = (e.top_3_predictions || [])[0] || {};
    const verdict = p1.fault_object === gt.fault_object && p1.root_cause === gt.root_cause ? "✓ 逐字命中" : "✗ 与标签不符";
    let tr = null;
    const tracePath = path.join(resultsDir, e.round, "traces", e.sysdir, MODEL, e.category, e.case_name, `${e.case_name}.json`);
    try { tr = JSON.parse(fs.readFileSync(tracePath, "utf8")); } catch { /* 无 traces */ }
    const summary = String(tr?.final_answer?.key_evidence_summary || "").slice(0, 600);
    const rd = rawDirFor(e);
    H.push(`<details id="case-${e.case_name}"><summary><b>case-${e.case_name}</b> · <code>${esc(p1.fault_object)}</code> + <code>${esc(p1.root_cause)}</code>（${verdict}） · MC ${fmt(e.metrics?.MC)} · EOC ${fmt(e.metrics?.EOC)} · ECR ${fmt(e.metrics?.ECR)} · ${fmt(e.metrics?.steps)} 步</summary><ul>`);
    if (e.error) H.push(`<li><b>错误</b>：${esc(e.error)}</li>`);
    if (summary) H.push(`<li><b>摘要</b>：${esc(summary)}</li>`);
    if (rd) H.push(`<li><b>raw 日志</b>：<a href="../${rd}">${esc(rd.replace(/\/$/, ""))}</a></li>`);
    H.push(`</ul>`);
    if (Array.isArray(tr?.steps) && tr.steps.length) {
      H.push(`<table><tr><th>#</th><th>动作</th><th>参数（截 200）</th></tr>`);
      for (const s of tr.steps) {
        const inp = typeof s.action_input === "string" ? s.action_input : JSON.stringify(s.action_input || {});
        H.push(`<tr><td>${esc(s.step_id)}</td><td><code>${esc(s.action_name)}</code></td><td><code>${esc(String(inp).slice(0, 200))}</code></td></tr>`);
      }
      H.push(`</table>`);
    }
    if (tr?.final_answer) H.push(`<p><b>报告原文</b>（契约 JSON）：</p><pre>${esc(JSON.stringify(tr.final_answer, null, 1))}</pre>`);
    H.push(`</details>`);
  }
  H.push(`</body></html>`);
  fs.writeFileSync(path.join(detailDir, famFile(f).replace(/\.md$/, ".html")), H.join("\n") + "\n", "utf8");
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
// 该题最新一轮的 raw 运行目录（overview / 家族页相对路径用）；找不到则返回空串
function esc(s) { return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function rawDirFor(e) {
  const [sysdir, cat] = e.family.split("/");
  const rawRoot = path.join(resultsDir, e.round, "raw");
  try {
    const hit = fs.readdirSync(rawRoot).filter((d) => d.endsWith(`_${sysdir}-${cat}-${e.case_name}`)).sort().pop();
    return hit ? `results/${e.round}/raw/${hit}/` : "";
  } catch { return ""; }
}
const familiesSorted = [...new Set([...full.keys(), ...families])].sort();
const famRows = familiesSorted.map((f) => {
  const total = full.get(f) ?? 0;
  const done = latestAll.filter((e) => e.family === f).length;
  const p = barPct(done, total);
  return `<div class="fam">
    <div class="fam__name"><a href="DETAIL/${famFile(f).replace(/\.md$/, ".html")}" title="逐题统计（HTML）">${familyDisplay(f)}</a></div>
    <div class="fam__bar"><div class="bar"><div class="bar__fill" style="width:${Math.min(p, 100)}%"></div></div></div>
    <div class="fam__num">${done}/${total} · ${p}%</div>
  </div>`;
}).join("\n");
// 家族级明细（总视图颗粒度只到家族；逐题在 DETAIL/<家族>.html）
const famTableRows = familiesSorted.map((f) => {
  const entries = latestAll.filter((e) => e.family === f);
  const a = aggregate(entries);
  const total = full.get(f) ?? 0;
  const ft = entries.map((e) => e.tokens?.total).filter((n) => typeof n === "number").sort((x, y) => x - y);
  const med = ft.length ? ft[Math.floor(ft.length / 2)] : null;
  return `<tr><td><a href="DETAIL/${famFile(f).replace(/\.md$/, ".html")}" title="逐题统计（HTML）"><code>${familyDisplay(f)}</code></a></td><td>${total}</td><td>${a.n}</td><td>${barPct(a.n, total)}%</td><td>${a.jra === a.n ? `<span class="ok">✅ ${a.jra}</span>` : `✅ ${a.jra} ❌ ${a.n - a.jra}`}</td><td>${a.chain}</td><td>${tok(med)}</td></tr>`;
}).join("\n");
// 建模实例化展示（静态策展块：三级语义在一道题上的协同）——改内容直接改这里
const showcaseHtml = `
<h2 class="section-title">TSM 建模实例化 · <em>一道题看三级语义</em></h2>
<p class="deck">以 <code>boutique/admission/5</code>（题面「Service Availability Disruption.」）为例：L3 定走法 → L2 定入口链与读法 → L1 给出对象 / 面 / 按锚 read 模板 → agent 沿链经基准工具实查 → 证据链闭合。</p>
<div class="tier"><span class="tier__tag">L3 · SOP</span><span class="tier__title">业务逻辑级 · 题面措辞逐字命中一节 → 定走法</span>
<ul>
<li>检索 = 节标题与题面<b>逐字比对</b>（命中即「复述本题」，零误配；下方句子全部是实测陷阱产物、逐条有复跑背书）。</li>
<li>「If the wording names no service, the inventory listing is the legitimate entry: the moment it names the outlier, <b>the victim's own signal leads</b> — its endpoints listing, or a connectivity probe on the port its Service declares, or its caller-side error log — ahead of its workload state, the event surface, and any config read.」</li>
<li>「<b>Pod never created</b> → admission side: the victim's own signal comes first — its endpoints listing, or a connectivity probe on its declared port (not a guessed one), or its caller's error log; if you batch, the signal leads the batch. Then the event names the referenced object; template reference (<code>GetAppYAML</code>) + the referenced object's own listing.」</li>
</ul></div>
<div class="tier"><span class="tier__tag">L2 · CONSENSUS</span><span class="tier__title">领域共识 · 入口链与读法 → 定怎么读</span>
<ul>
<li>「Symptom wording → entry chain — 'Service Availability Disruption.' uses the SAME reachability chain (it is overloaded across scheduling / startup / admission stages): walk caller logs → endpoints → pods; when the pods surface shows the pod never became ready, read its phase and events (FailedScheduling / FailedCreate / FailedMount / image-pull / probe) and follow that mechanism to the matching object surface. <b>Discriminate on the chain, not on the wording.</b>」</li>
<li>锚 <code>chain:reachability</code> · 来源 case：boutique/scheduling/1 · startup/1 · admission/1</li>
</ul></div>
<div class="tier"><span class="tier__tag">L1 · DLR</span><span class="tier__title">数据源级 · LE ◀ PE ◀ ARCS → 实体 / 观测面 / 按锚读法模板</span>
<pre>构图：LE（业务对象） ◀─1:N 容器── PE（语境视图） ◀─ARCS（A 锚 · R 行空间 · C 列 · S 补注）── 快照资源
       A 锚 = 取数 WHERE 键（剪枝）；R: null = 行对行；S = 面的读法模板

LE  emailservice（服务）
  PE  依赖图面        ARCS  A: 1:N · key=service_name（锚 = 对象名）
                            S: GetServiceDependencies(service_name=emailservice)
                            → upstream = checkoutservice（症状的入口）
LE  emailservice-deploy（载体）
  PE  deployment 面   ARCS  A: 1:1 · key=app_label        R: null
                            S: replicas 0/1 · config_refs（serviceAccountName 缺失 → FailedCreate）
                            read: GetAppYAML(app_name=emailservice)
  PE  pods 面         ARCS  A: 1:N · key=app_label        R: null
                            S: phase / restarts / events（离群行）
                            read: GetResources(pods, label_selector=app=emailservice)</pre>
<p>图只存 <b>schema 级</b>（LE / PE / 锚 / 读法）；实例数据（名字、状态、报文）一律经基准工具实查——<b>模型是导航，不是数据</b>。</p></div>
<div class="note">这题的链 = 三级协作的结果：清单点名 <code>emailservice</code> 缺 pod → 受害者信号（endpoints / 连通性）→ workload 态 0/1 → 事件 <code>FailedCreate</code>（SA 缺）→ <code>GetAppYAML</code> 收口 = 证据链闭合（JRA / MC / EOC / ECR 全 1）。<a href="DETAIL/boutique-admission.md#case-5">明细</a> · <a href="results/1013_1458_chainhead-verify2c/raw/1013_1458_boutique-admission-5/">raw 日志</a></div>
`;

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
  a:hover { text-decoration-thickness: 2px; }
  .tier { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; margin: 14px 0; }
  .tier__tag { display: inline-block; font-size: 11.5px; font-weight: 700; letter-spacing: 0.05em; color: var(--dlr); border: 1px solid var(--border); border-radius: 999px; padding: 2px 10px; margin-right: 10px; vertical-align: 1px; }
  .tier__title { font-weight: 700; font-size: 15.5px; }
  .tier p, .tier li { font-size: 14.5px; color: var(--ink-2); margin-top: 8px; }
  .tier ul { padding-left: 20px; }
  .tier pre { white-space: pre-wrap; word-break: break-word; background: var(--page); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; font-size: 12.8px; line-height: 1.6; margin-top: 10px; font-family: ui-monospace, "Cascadia Code", Consolas, monospace; color: var(--ink); }
  .tier pre code { color: inherit; font-size: inherit; }
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
<p class="muted" style="margin-top:12px; line-height:1.75;"><b>指标示意</b>：<b>结果分</b> —— CA 组件命中 · FA 故障类型命中 · <b>JRA 联合命中（CA+FA，主指标）</b>；<b>流程分</b> —— MC 里程碑覆盖（该查的检查点走到没）· EOC 证据顺序一致（查证链是否按序闭合）· ECR 证据闭合率 · EE 证据效率（证据步 ÷ 总步）；<b>过程</b> —— steps 步数 · RAR 重复动作率 · inv 无效动作。结果分与流程分互相独立：结论对 ≠ 过程满分（个别题 EOC &lt; 1 = 证据链顺序/覆盖未满分，判定仍可为对）。</p>

${showcaseHtml}
<h2 class="section-title">跑题覆盖度 · <em>逐家族进度</em></h2>
<p class="muted">总视图颗粒度到家族；点家族名/表中行 → 该家族逐题统计页（HTML，含每题调用步骤与 raw 日志链接）。</p>
${famRows}

<h2 class="section-title">家族明细 · <em>去重取最新</em></h2>
<table>
<tr><th>家族</th><th>全量</th><th>已跑</th><th>覆盖</th><th>JRA</th><th>证据链全闭</th><th>token 中位</th></tr>
${famTableRows}
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
