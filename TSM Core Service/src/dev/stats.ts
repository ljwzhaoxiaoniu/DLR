/**
 * tsm stats —— 跨轮实测结果综合统计（开发态）
 *
 * 输入：<场景>/results/<轮>/questions.csv（`tsm grade` 的逐题明细，跨轮汇总）
 * 产出：
 *   results/stats.svg   综合统计图（判定分布 + 评定 / 跑题覆盖度 / 逐轮 / 效率指标）
 *   results/STATS.md    同一份统计的文字版
 *   场景 DETAIL.md      评测明细文档（与 README 并列；见 dev/detail.ts）
 *   场景 README         两个标记块同步：实测结果（stats:）+ 错题记录（mistakes:）
 *
 * 用法: tsm stats [--no-sync] [--open]
 *
 * 口径：分布按「判定次数」计（同题重跑会重复计入）；**跑题覆盖度**按去重题数计；
 *      **评定**（按 SOP 裁定）是第二维：🔁 翻盘单独计，不并入 ✅ 正确。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";
import { ROOT, SCENARIO } from "../config.js";
import { listRuns, readRunCsv, RULINGS, RULING_LABEL } from "./results.js";
import { buildDetail } from "./detail.js";

const NO_SYNC = process.argv.includes("--no-sync");
const OPEN = process.argv.includes("--open");

const RESULTS = path.join(SCENARIO, "results");
const OUT_SVG = path.join(RESULTS, "stats.svg");
const OUT_MD = path.join(RESULTS, "STATS.md");
const MARK_BEGIN = "<!-- stats:begin -->";
const MARK_END = "<!-- stats:end -->";
const MK_BEGIN = "<!-- mistakes:begin -->";
const MK_END = "<!-- mistakes:end -->";

const VERDICTS = ["PASS", "UNCERTAIN", "FAIL", "GOLD_ERR"] as const;
const COLORS: Record<string, string> = {
  PASS: "#1a7f37",
  UNCERTAIN: "#bf8700",
  FAIL: "#cf222e",
  GOLD_ERR: "#6e7781",
};
/** 评定配色：正确沿用绿；🔁 翻盘独立蓝（一眼区别于正确） */
const RULING_COLOR: Record<string, string> = {
  CORRECT: "#1a7f37",
  OVERTURNED: "#0969da",
  WRONG: "#cf222e",
  PENDING: "#bf8700",
};
const INK = "#1f2328";
const MUTED = "#656d76";
const TRACK = "#eaeef2";

// ── 读入：各轮 questions.csv ─────────────────────────────────────────
interface Row {
  run: string;
  qid: string;
  db: string;
  verdict: string;
  ruling: string; // 评定（按 SOP 裁定）
  steps: number;
  tools: number;
  toolErrors: number;
  tokens: number;
  cacheRead: number;
}

if (!fs.existsSync(RESULTS)) {
  console.error(`[ERR] 场景 results 不存在：${RESULTS}`);
  process.exit(1);
}
const runs = listRuns(RESULTS);
if (!runs.length) {
  console.error(`[ERR] ${RESULTS} 下还没有可统计的轮次（先 run_batch.sh + tsm grade）`);
  process.exit(1);
}

const rows: Row[] = [];
let noRuling = 0; // 旧 CSV 无 ruling 列的行数（提示重跑 grade）
for (const run of runs) {
  for (const r of readRunCsv(path.join(RESULTS, run))) {
    const verdict = r.verdict ?? "?";
    if (!r.ruling) noRuling++;
    rows.push({
      run,
      qid: r.qid ?? "",
      db: r.db ?? "-",
      verdict,
      // 旧 CSV 兜底：没有 ruling 列时只认「与 gold 一致」为正确，其余记待仲裁（重跑 grade 可补全）
      ruling: r.ruling || (verdict === "PASS" ? "CORRECT" : "PENDING"),
      steps: Number(r.steps) || 0,
      tools: Number(r.tools) || 0,
      toolErrors: Number(r.tool_errors) || 0,
      tokens: Number(r.tokens_total) || 0,
      cacheRead: Number(r.tokens_cache_read) || 0,
    });
  }
}
if (noRuling) console.warn(`[stats] ${noRuling} 行缺 ruling 列（旧 CSV）——先 tsm grade 重算该轮可补全`);

// ── 汇总 ─────────────────────────────────────────────────────────────
const num = (s: string | number) => Number(s) || 0;
const tally = (rs: Row[], v: string) => rs.filter((r) => r.verdict === v).length;
const rTally = (rs: Row[], v: string) => rs.filter((r) => r.ruling === v).length;
const byRun = runs.map((run) => ({ run, rs: rows.filter((r) => r.run === run) }));
const databanks = [...new Set(rows.map((r) => r.db))].sort();
const sumTk = rows.reduce((n, r) => n + r.tokens, 0);
const avgOf = (f: (r: Row) => number) => (rows.length ? rows.reduce((n, r) => n + f(r), 0) / rows.length : 0);
const distinct = (rs: Row[]) => new Set(rs.map((r) => r.qid)).size;

// 跑题覆盖度：数据集原生题数（按库）
const QJSON = path.join(ROOT, "MINIDEV_sqlite", "mini_dev_sqlite.json");
const dataset: { question_id: number; db_id: string }[] = JSON.parse(fs.readFileSync(QJSON, "utf8"));
const dbTotal = new Map<string, number>();
for (const q of dataset) dbTotal.set(q.db_id, (dbTotal.get(q.db_id) ?? 0) + 1);
const dbDone = new Map<string, number>();
for (const db of databanks) dbDone.set(db, distinct(rows.filter((r) => r.db === db)));

const doneTotal = distinct(rows);
const fmt = (n: number) => n.toLocaleString("en-US");

// ── SVG（自包含；README 以相对路径引用） ─────────────────────────────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const W = 880;
const PAD = 24;
const INNER = W - PAD * 2;
const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

/** 堆叠条（通用）：按给定分段画，段宽按计数占比 */
function stackSegs(x: number, y: number, w: number, h: number, segs: { color: string; n: number }[]): string {
  const total = segs.reduce((a, s) => a + s.n, 0) || 1;
  let cx = x;
  const out: string[] = [];
  for (const s of segs) {
    if (!s.n) continue;
    const sw = (s.n / total) * w;
    out.push(`<rect x="${cx.toFixed(1)}" y="${y}" width="${sw.toFixed(1)}" height="${h}" fill="${s.color}"/>`);
    if (sw > 34)
      out.push(
        `<text x="${(cx + sw / 2).toFixed(1)}" y="${y + h / 2 + 4}" font-size="11" fill="#fff" text-anchor="middle">${s.n}</text>`,
      );
    cx += sw;
  }
  if (!segs.some((s) => s.n)) out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${TRACK}"/>`);
  return out.join("");
}

/** 判定堆叠条（与 gold 比对） */
const stackBar = (x: number, y: number, w: number, h: number, rs: Row[]) =>
  stackSegs(
    x,
    y,
    w,
    h,
    VERDICTS.map((v) => ({ color: COLORS[v], n: tally(rs, v) })),
  );

/** 评定堆叠条（按 SOP 裁定；🔁 翻盘独立成色） */
const rulingBar = (x: number, y: number, w: number, h: number, rs: Row[]) =>
  stackSegs(
    x,
    y,
    w,
    h,
    RULINGS.map((v) => ({ color: RULING_COLOR[v], n: rTally(rs, v) })),
  );

/** 图例文字宽度估算（CJK 按 12px、其余按 7px） */
const CJK_RE = /[　-鿿＀-￯]/;
const labelW = (s: string) => [...s].reduce((n, c) => n + (CJK_RE.test(c) ? 12 : 7), 0);

/** 彩色图例（项 → 计数） */
function legendOf(x: number, y: number, items: { label: string; color: string }[]): string {
  let cx = x;
  const out: string[] = [];
  for (const it of items) {
    out.push(`<rect x="${cx}" y="${y - 8}" width="9" height="9" rx="2" fill="${it.color}"/>`);
    out.push(`<text x="${cx + 14}" y="${y}" font-size="12" fill="${MUTED}">${it.label}</text>`);
    cx += 16 + labelW(it.label);
  }
  return out.join("");
}

const legend = (x: number, y: number, rs: Row[]) =>
  legendOf(
    x,
    y,
    VERDICTS.map((v) => ({ label: `${v} ${tally(rs, v)}`, color: COLORS[v] })),
  );

const rulingLegend = (x: number, y: number, rs: Row[]) =>
  legendOf(
    x,
    y,
    RULINGS.map((v) => ({ label: `${RULING_LABEL[v]} ${rTally(rs, v)}`, color: RULING_COLOR[v] })),
  );

const parts: string[] = [];
let y = 36;
parts.push(`<text x="${PAD}" y="${y}" font-size="16" font-weight="600" fill="${INK}">DLR · birdminidev · 实测结果（综合统计）</text>`);
parts.push(
  `<text x="${W - PAD}" y="${y}" font-size="11" fill="${MUTED}" text-anchor="end">生成 ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</text>`,
);

// ① 判定分布（累计；同题重跑重复计入）+ 评定（按 SOP 裁定，第二维）
y += 34;
parts.push(`<text x="${PAD}" y="${y}" font-size="13" font-weight="600" fill="${INK}">判定分布</text>`);
parts.push(`<text x="${PAD + 92}" y="${y}" font-size="11" fill="${MUTED}">与 gold 比对 · 累计 ${rows.length} 次 · 去重 ${doneTotal} 题</text>`);
y += 14;
parts.push(stackBar(PAD, y, INNER, 26, rows));
y += 26 + 18;
parts.push(legend(PAD, y, rows));

// ①′ 评定（SOP 生效时按 SOP 裁定；翻盘独立成色、单独计数）
y += 26;
parts.push(`<text x="${PAD}" y="${y}" font-size="13" font-weight="600" fill="${INK}">评定</text>`);
parts.push(`<text x="${PAD + 52}" y="${y}" font-size="11" fill="${MUTED}">按 SOP 裁定 · 🔁 翻盘单独计，不并入 ✅ 正确</text>`);
y += 14;
parts.push(rulingBar(PAD, y, INNER, 20, rows));
y += 20 + 18;
parts.push(rulingLegend(PAD, y, rows));

// ② 跑题覆盖度（跑过多少题；去重题数 / 数据集题数）
y += 34;
parts.push(`<text x="${PAD}" y="${y}" font-size="13" font-weight="600" fill="${INK}">跑题覆盖度</text>`);
parts.push(`<text x="${PAD + 76}" y="${y}" font-size="11" fill="${MUTED}">跑过（去重）/ 数据集题数 · 与判定、评定无关</text>`);
y += 16;
const allDbs = [...dbTotal.keys()].sort();
for (const db of allDbs) {
  const done = dbDone.get(db) ?? 0;
  const total = dbTotal.get(db) ?? 0;
  const barX = PAD + 210;
  const barW = INNER - 210 - 74;
  const frac = total ? Math.min(1, done / total) : 0;
  parts.push(`<text x="${PAD}" y="${y + 10}" font-size="12" fill="${done ? INK : MUTED}">${esc(db)}</text>`);
  parts.push(`<rect x="${barX}" y="${y + 2}" width="${barW}" height="10" rx="3" fill="${TRACK}"/>`);
  if (frac > 0) parts.push(`<rect x="${barX}" y="${y + 2}" width="${(barW * frac).toFixed(1)}" height="10" rx="3" fill="#0969da"/>`);
  parts.push(
    `<text x="${W - PAD}" y="${y + 11}" font-size="12" fill="${MUTED}" text-anchor="end">${done}/${total}</text>`,
  );
  y += 20;
}

// ③ 逐轮
y += 26;
parts.push(`<text x="${PAD}" y="${y}" font-size="13" font-weight="600" fill="${INK}">逐轮</text>`);
y += 18;
if (!byRun.length) y += 0;
for (const { run, rs } of byRun) {
  const barX = PAD + 300;
  const barW = INNER - 300 - 150;
  parts.push(`<text x="${PAD}" y="${y + 12}" font-size="11" fill="${INK}">${esc(run)}</text>`);
  parts.push(stackBar(barX, y + 2, barW, 14, rs));
  const tk = rs.reduce((n, r) => n + r.tokens, 0);
  parts.push(
    `<text x="${W - PAD}" y="${y + 13}" font-size="11" fill="${MUTED}" text-anchor="end">${rs.length} 题 · ${fmt(tk)} tok</text>`,
  );
  y += 22;
}

// ④ 效率与说明
y += 26;
const cacheShare = sumTk ? Math.round((rows.reduce((n, r) => n + r.cacheRead, 0) / sumTk) * 100) : 0;
const eff = [
  `均值 ${avgOf((r) => r.steps).toFixed(1)} 步 / ${avgOf((r) => r.tools).toFixed(1)} 工具调用 / 每题 ${fmt(Math.round(avgOf((r) => r.tokens)))} tokens ｜ cache_read 占比 ${cacheShare}%`,
].filter(Boolean);
parts.push(`<line x1="${PAD}" y1="${y - 14}" x2="${W - PAD}" y2="${y - 14}" stroke="${TRACK}"/>`);
for (const line of eff) {
  parts.push(`<text x="${PAD}" y="${y}" font-size="12" fill="${MUTED}">${esc(line)}</text>`);
  y += 17;
}
y += 4;
parts.push(
  `<text x="${PAD}" y="${y}" font-size="11" fill="${MUTED}">口径：判定按次数（同题重跑重复计入）；评定按 SOP 裁定（🔁 翻盘单独计）；跑题覆盖度按去重题数。明细见 results/STATS.md 与各轮 questions.csv。</text>`,
);
y += 18;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${y}" width="${W}" height="${y}" font-family="${FONT}">
<rect width="${W}" height="${y}" fill="#ffffff"/>
${parts.join("\n")}
</svg>
`;
fs.writeFileSync(OUT_SVG, svg);

// ── STATS.md（文字版） ───────────────────────────────────────────────
const md = [
  `# 实测结果综合统计（tsm stats）`,
  "",
  `场景 \`${path.basename(SCENARIO)}\` ｜ 轮次 ${runs.length} ｜ 判定 ${rows.length} 次（去重 ${doneTotal} 题）｜ 生成 ${new Date().toISOString()}`,
  "",
  `**判定（与 gold 比对）：PASS ${tally(rows, "PASS")} ｜ UNCERTAIN ${tally(rows, "UNCERTAIN")} ｜ FAIL ${tally(rows, "FAIL")} ｜ GOLD_ERR ${tally(rows, "GOLD_ERR")}**`,
  "",
  `**评定（按 SOP 裁定）：${RULINGS.map((r) => `${RULING_LABEL[r]} ${rTally(rows, r)}`).join(" ｜ ")}**（翻盘单独计，不并入正确）`,
  "",
  "## 逐轮 · 判定（与 gold 比对）",
  "",
  "| 轮次 | 题数 | PASS | UNCERTAIN | FAIL | GOLD_ERR | tokens |",
  "|---|---|---|---|---|---|---|",
  ...byRun.map(
    ({ run, rs }) =>
      `| ${run} | ${rs.length} | ${tally(rs, "PASS")} | ${tally(rs, "UNCERTAIN")} | ${tally(rs, "FAIL")} | ${tally(rs, "GOLD_ERR")} | ${fmt(rs.reduce((n, r) => n + r.tokens, 0))} |`,
  ),
  "",
  "## 逐轮 · 评定（按 SOP 裁定；翻盘单独计）",
  "",
  "| 轮次 | 题数 | ✅ 正确 | 🔁 翻盘 | ❌ 错误 | ⚠️ 待仲裁 |",
  "|---|---|---|---|---|---|",
  ...byRun.map(
    ({ run, rs }) =>
      `| ${run} | ${rs.length} | ${rTally(rs, "CORRECT")} | ${rTally(rs, "OVERTURNED")} | ${rTally(rs, "WRONG")} | ${rTally(rs, "PENDING")} |`,
  ),
  "",
  "## 跑题覆盖度（跑过多少题；去重题数 / 数据集题数）",
  "",
  "| 库 | 已跑 | 数据集 | 覆盖 |",
  "|---|---|---|---|",
  ...allDbs.map((db) => {
    const done = dbDone.get(db) ?? 0;
    const total = dbTotal.get(db) ?? 0;
    return `| ${db} | ${done} | ${total} | ${total ? ((Math.min(done, total) / total) * 100).toFixed(1) : "0.0"}% |`;
  }),
  "",
  "## 效率（跨全部判定）",
  "",
  `- 均值 **${avgOf((r) => r.steps).toFixed(1)} 步** / **${avgOf((r) => r.tools).toFixed(1)} 工具调用** ｜ 工具错误均值 ${avgOf((r) => r.toolErrors).toFixed(2)}`,
  `- token 合计 **${fmt(sumTk)}** ｜ 每题均值 **${fmt(Math.round(avgOf((r) => r.tokens)))}** ｜ cache_read 占比 **${cacheShare}%**`,
  "",
  "> 口径：分布按判定次数（同题重跑重复计入）；跑题覆盖度按去重题数。**评定**按 SOP 裁定，🔁 翻盘单独计、不并入 ✅ 正确。逐题明细在各轮 `questions.csv`。",
  "",
].join("\n");
fs.writeFileSync(OUT_MD, md);

// ── 同步一份进场景 README（标记块之间） ──────────────────────────────
const block = [
  `![实测结果综合统计](results/stats.svg)`,
  "",
  `**判定**（与 gold 比对）：合计 ${rows.length} 次（去重 ${doneTotal} 题 / ${dataset.length} 题）｜ PASS ${tally(rows, "PASS")} ｜ UNCERTAIN ${tally(rows, "UNCERTAIN")} ｜ FAIL ${tally(rows, "FAIL")} ｜ GOLD_ERR ${tally(rows, "GOLD_ERR")} ｜ ${fmt(sumTk)} tokens`,
  "",
  `**评定**（按 SOP 裁定）：✅ 正确 ${rTally(rows, "CORRECT")} ｜ 🔁 翻盘 ${rTally(rows, "OVERTURNED")} ｜ ❌ 错误 ${rTally(rows, "WRONG")} ｜ ⚠️ 待仲裁 ${rTally(rows, "PENDING")}（🔁 翻盘单独标注、单独计数，不并入 ✅ 正确）`,
  "",
  `均值 **${avgOf((r) => r.steps).toFixed(1)} 步 / ${avgOf((r) => r.tools).toFixed(1)} 工具调用 / 每题 ${fmt(Math.round(avgOf((r) => r.tokens)))} tokens**`,
  "",
  `跑题覆盖度 **${doneTotal}/${dataset.length} 题**（${dbDone.size}/${dbTotal.size} 库有产物）——跑过多少题，与判定/评定无关`,
  "",
  `> 本块由 \`tsm stats\` 自动同步。**逐题明细**（判定 / 评定 / 调用步骤 / 依据与结论）见并列的 [DETAIL.md](DETAIL.md)；逐轮统计 [results/STATS.md](results/STATS.md)。`,
].join("\n");

// ── 明细文档（DETAIL.md，与 README 并列）+ 错题块 ─────────────────────
const mistakes = buildDetail();
console.log(`[stats] 明细文档 → ${path.join(SCENARIO, "DETAIL.md")}（错题 ${mistakes.length} 题）`);

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n+/g, " ").trim();
const mistakesBlock = mistakes.length
  ? [
      "| 题号 | 库 | 判定 | 评定 | 类型 | 问题（截） | 裁定（全文见 [DETAIL.md](DETAIL.md)） |",
      "|---|---|---|---|---|---|---|",
      ...mistakes.map(
        (m) =>
          `| q${m.qid} | ${m.db} | ${m.verdict} | ${RULING_LABEL[m.ruling] ?? m.ruling} | ${m.types.join(" · ") || "—"} | ${cell(m.question.slice(0, 56))} | ${cell(m.rationale.slice(0, 130))} |`,
      ),
    ].join("\n")
  : "（暂无：已跑题判定均为 PASS）";

if (!NO_SYNC) {
  const readmePath = path.join(SCENARIO, "README.md");
  const syncBlock = (begin: string, end: string, content: string, label: string) => {
    const text = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
    const i = text.indexOf(begin);
    const j = text.indexOf(end);
    if (i < 0 || j < 0) {
      console.warn(`[stats] README 无 ${begin} … ${end} 标记块，跳过同步（${label}）`);
      return;
    }
    const next = `${text.slice(0, i + begin.length)}\n${content}\n${text.slice(j)}`;
    if (next !== text) {
      fs.writeFileSync(readmePath, next);
      console.log(`[stats] 已同步 README（${label}）：${readmePath}`);
    }
  };
  syncBlock(MARK_BEGIN, MARK_END, block, "实测结果");
  syncBlock(MK_BEGIN, MK_END, mistakesBlock, "错题记录");
}

console.log(`[stats] 轮次 ${runs.length} ｜ 判定 ${rows.length} 次（去重 ${doneTotal} 题）`);
console.log(md.split("\n").slice(0, 6).join("\n"));
console.log(`\n[stats] 图 → ${OUT_SVG}\n[stats] 文字版 → ${OUT_MD}`);

if (OPEN) {
  const cmd = process.platform === "win32" ? "cmd" : process.platform === "darwin" ? "open" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", OUT_SVG] : [OUT_SVG];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}
