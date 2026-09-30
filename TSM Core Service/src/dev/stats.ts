/**
 * tsm stats —— 跨轮实测结果综合统计（开发态）
 *
 * 输入：<场景>/results/<轮>/questions.csv（`tsm grade` 的逐题明细，跨轮汇总）
 * 产出：
 *   results/stats.svg   综合统计图（评定〔500 题口径 + 已跑放大〕/ 跑题覆盖度 / 效率指标）
 *   results/STATS.md    同一份统计的文字版
 *   场景 DETAIL.md      评测明细文档（与 README 并列；见 dev/detail.ts）
 *   场景 README         两个标记块同步：实测结果（stats:）+ 错题记录（mistakes:）
 *
 * 用法: tsm stats [--no-sync] [--open]
 *
 * 口径：**主口径 = 评定**（按 SOP 裁定 · 每题取最新一轮；数据集问题不记在应用头上）；展示图只给最终成果**
 *      （判定分布 / 逐轮等过程数据只在 STATS.md、DETAIL.md 留档）**；**跑题覆盖度**按去重题数计。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";
import { DATASET_QUESTIONS, DETAIL_MD, RESULTS_DIR, SCENARIO, SCENARIO_NAME, SCENARIO_README } from "../config.js";
import { listRuns, readRunCsv, RULINGS, RULING_LABEL } from "./results.js";
import { buildDetail } from "./detail.js";

const NO_SYNC = process.argv.includes("--no-sync");
const OPEN = process.argv.includes("--open");

const RESULTS = RESULTS_DIR;
const OUT_SVG = path.join(RESULTS, "stats.svg");
const OUT_MD = path.join(RESULTS, "STATS.md");
const MARK_BEGIN = "<!-- stats:begin -->";
const MARK_END = "<!-- stats:end -->";
const MK_BEGIN = "<!-- mistakes:begin -->";
const MK_END = "<!-- mistakes:end -->";

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
/** 未跑段配色（浅灰，落在条尾） */
const UNRUN = "#d0d7de";

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
const QJSON = DATASET_QUESTIONS;
const dataset: { question_id: number; db_id: string }[] = JSON.parse(fs.readFileSync(QJSON, "utf8"));
const dbTotal = new Map<string, number>();
for (const q of dataset) dbTotal.set(q.db_id, (dbTotal.get(q.db_id) ?? 0) + 1);
const dbDone = new Map<string, number>();
for (const db of databanks) dbDone.set(db, distinct(rows.filter((r) => r.db === db)));

const doneTotal = distinct(rows);
const fmt = (n: number) => n.toLocaleString("en-US");

// 评定（**最终结果**）：每题取最新一轮 —— 跑失败/重跑的中间尝试不进总图与摘要
const finalByQid = new Map<string, Row>();
for (const run of runs) for (const r of rows.filter((x) => x.run === run)) finalByQid.set(r.qid, r);
const finals = [...finalByQid.values()];
const rTallyFinal = (v: string) => finals.filter((r) => r.ruling === v).length;
const avgFinal = (f: (r: Row) => number) => (finals.length ? finals.reduce((n, r) => n + f(r), 0) / finals.length : 0);

// ── SVG（自包含；README 以相对路径引用） ─────────────────────────────
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const W = 880;
const PAD = 24;
const INNER = W - PAD * 2;
const FONT = "-apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";

/** 堆叠条（通用）：按给定分段画，段宽按计数占比；`text` 指定段内数字颜色（默认白） */
function stackSegs(
  x: number,
  y: number,
  w: number,
  h: number,
  segs: { color: string; n: number; text?: string }[],
): string {
  const total = segs.reduce((a, s) => a + s.n, 0) || 1;
  let cx = x;
  const out: string[] = [];
  for (const s of segs) {
    if (!s.n) continue;
    const sw = (s.n / total) * w;
    out.push(`<rect x="${cx.toFixed(1)}" y="${y}" width="${sw.toFixed(1)}" height="${h}" fill="${s.color}"/>`);
    if (sw > 34)
      out.push(
        `<text x="${(cx + sw / 2).toFixed(1)}" y="${y + h / 2 + 4}" font-size="11" fill="${s.text ?? "#fff"}" text-anchor="middle">${s.n}</text>`,
      );
    cx += sw;
  }
  if (!segs.some((s) => s.n)) out.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${TRACK}"/>`);
  return out.join("");
}

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

const parts: string[] = [];
let y = 36;
parts.push(`<text x="${PAD}" y="${y}" font-size="16" font-weight="600" fill="${INK}">DLR · birdminidev · 实测结果（综合统计）</text>`);
parts.push(
  `<text x="${W - PAD}" y="${y}" font-size="11" fill="${MUTED}" text-anchor="end">生成 ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</text>`,
);

// ① 评定（**最终结果**：每题取最新一轮）
//    上条 = 500 题口径（交代覆盖面：已跑的一小段 + 未跑）；下条 = 已跑题放大（交代结果，按比例可读）
y += 34;
const unrun = Math.max(0, dataset.length - finals.length);
parts.push(`<text x="${PAD}" y="${y}" font-size="13" font-weight="600" fill="${INK}">评定</text>`);
parts.push(
  `<text x="${PAD + 52}" y="${y}" font-size="11" fill="${MUTED}">按 SOP 裁定 · 500 题口径（已跑 ${finals.length}）· 🔁 翻盘单独计，不并入 ✅ 正确</text>`,
);
y += 14;
parts.push(
  stackSegs(PAD, y, INNER, 22, [
    ...RULINGS.map((v) => ({ color: RULING_COLOR[v], n: rTallyFinal(v) })),
    { color: UNRUN, n: unrun, text: MUTED },
  ]),
);
y += 22 + 16;
parts.push(`<text x="${PAD}" y="${y}" font-size="11" fill="${MUTED}">已跑 ${finals.length} 题（放大）</text>`);
y += 10;
parts.push(
  stackSegs(
    PAD,
    y,
    INNER,
    20,
    RULINGS.map((v) => ({ color: RULING_COLOR[v], n: rTallyFinal(v) })),
  ),
);
y += 20 + 18;
parts.push(
  legendOf(PAD, y, [
    ...RULINGS.map((v) => ({ label: `${RULING_LABEL[v]} ${rTallyFinal(v)}`, color: RULING_COLOR[v] })),
    { label: `⬜ 未跑 ${unrun}`, color: UNRUN },
  ]),
);

// （判定分布是过程数据，不进展示图；与 gold 的原始比对留档见 DETAIL.md / STATS.md）

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

// （逐轮是过程数据，不进展示图；逐轮统计留档见 results/STATS.md）

// ④ 效率与说明
y += 26;
const cacheShare = sumTk ? Math.round((rows.reduce((n, r) => n + r.cacheRead, 0) / sumTk) * 100) : 0;
const eff = [
  `均值 ${avgFinal((r) => r.steps).toFixed(1)} 步 / ${avgFinal((r) => r.tools).toFixed(1)} 工具调用 / 去重每题 ${fmt(Math.round(avgFinal((r) => r.tokens)))} tokens（累计 ${fmt(sumTk)} 含重跑）｜ cache_read 占比 ${cacheShare}%`,
].filter(Boolean);
parts.push(`<line x1="${PAD}" y1="${y - 14}" x2="${W - PAD}" y2="${y - 14}" stroke="${TRACK}"/>`);
for (const line of eff) {
  parts.push(`<text x="${PAD}" y="${y}" font-size="12" fill="${MUTED}">${esc(line)}</text>`);
  y += 17;
}
y += 4;
parts.push(
  `<text x="${PAD}" y="${y}" font-size="11" fill="${MUTED}">口径：评定 = 最终结果（每题取最新一轮；🔁 翻盘单独计）；⬜ 未跑 = 500 题里尚未跑过的题；判定按次数留档；跑题覆盖度按去重题数。明细见 results/STATS.md 与各轮 questions.csv。</text>`,
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
  `场景 \`${SCENARIO_NAME}\` ｜ 轮次 ${runs.length} ｜ 判定 ${rows.length} 次（去重 ${doneTotal} 题）｜ 生成 ${new Date().toISOString()}`,
  "",
  `**评定（按 SOP 裁定 · 主口径 · 最终结果 ${finals.length} 题去重）：${RULINGS.map((r) => `${RULING_LABEL[r]} ${rTallyFinal(r)}`).join(" ｜ ")}**（每题取最新一轮；🔁 翻盘单独计，不并入 ✅ 正确）`,
  "",
  `**判定（与 gold 原始比对 · 留档）：PASS ${tally(rows, "PASS")} ｜ UNCERTAIN ${tally(rows, "UNCERTAIN")} ｜ FAIL ${tally(rows, "FAIL")} ｜ GOLD_ERR ${tally(rows, "GOLD_ERR")}**`,
  "",
  "## 逐轮 · 评定（本轮记录 · 按次数；最终结果见文首合计）",
  "",
  "| 轮次 | 题数 | ✅ 正确 | 🔁 翻盘 | ❌ 错误 | ⚠️ 待仲裁 | tokens |",
  "|---|---|---|---|---|---|---|",
  ...byRun.map(
    ({ run, rs }) =>
      `| ${run} | ${rs.length} | ${rTally(rs, "CORRECT")} | ${rTally(rs, "OVERTURNED")} | ${rTally(rs, "WRONG")} | ${rTally(rs, "PENDING")} | ${fmt(rs.reduce((n, r) => n + r.tokens, 0))} |`,
  ),
  "",
  "## 逐轮 · 判定（与 gold 原始比对 · 留档）",
  "",
  "| 轮次 | 题数 | PASS | UNCERTAIN | FAIL | GOLD_ERR |",
  "|---|---|---|---|---|---|",
  ...byRun.map(
    ({ run, rs }) =>
      `| ${run} | ${rs.length} | ${tally(rs, "PASS")} | ${tally(rs, "UNCERTAIN")} | ${tally(rs, "FAIL")} | ${tally(rs, "GOLD_ERR")} |`,
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
  "## 效率（去重每题）",
  "",
  `- 均值 **${avgFinal((r) => r.steps).toFixed(1)} 步** / **${avgFinal((r) => r.tools).toFixed(1)} 工具调用** ｜ 工具错误均值 ${avgFinal((r) => r.toolErrors).toFixed(2)}`,
  `- token 合计 **${fmt(sumTk)}**（含重跑）｜ 去重每题均值 **${fmt(Math.round(avgFinal((r) => r.tokens)))}** ｜ cache_read 占比 **${cacheShare}%**`,
  "",
  "> 口径：**评定 = 最终结果**（每题取最新一轮）；判定与逐轮表按次数留档（同题重跑重复计入）；跑题覆盖度按去重题数。🔁 翻盘单独计、不并入 ✅ 正确。逐题明细在各轮 `questions.csv`。",
  "",
].join("\n");
fs.writeFileSync(OUT_MD, md);

// ── 同步一份进场景 README（标记块之间） ──────────────────────────────
const block = [
  `![实测结果综合统计](results/stats.svg)`,
  "",
  `**评定**（按 SOP 裁定 · ${dataset.length} 题口径）：✅ 正确 ${rTallyFinal("CORRECT")} ｜ 🔁 翻盘 ${rTallyFinal("OVERTURNED")} ｜ ❌ 错误 ${rTallyFinal("WRONG")} ｜ ⚠️ 待仲裁 ${rTallyFinal("PENDING")} ｜ ⬜ 未跑 ${dataset.length - finals.length}　—　**${finals.length && !rTallyFinal("WRONG") && !rTallyFinal("PENDING") ? `已跑 ${finals.length} 题全部正确` : `已跑 ${finals.length} 题：正确 ${rTallyFinal("CORRECT") + rTallyFinal("OVERTURNED")} 题`}**`,
  "",
  `（🔁 翻盘 = 数据集自身缺陷（gold 未实现题面）按 SOP 逐题裁定为正确——单独计数、不并入 ✅ 正确；每题取最新一轮）`,
  "",
  `均值 **${avgFinal((r) => r.steps).toFixed(1)} 步 / ${avgFinal((r) => r.tools).toFixed(1)} 工具调用 / 每题 ${fmt(Math.round(avgFinal((r) => r.tokens)))} tokens** ｜ 跑题覆盖度 **${doneTotal}/${dataset.length} 题**（${dbDone.size}/${dbTotal.size} 库有产物）`,
  "",
  `> 本块由 \`tsm stats\` 自动同步。**逐题明细**（评定 / 调用步骤 / 依据与结论）见并列的 [DETAIL.md](DETAIL.md)；逐轮统计 [results/STATS.md](results/STATS.md)。与 gold 的**原始逐字比对**（含 ${rTallyFinal("OVERTURNED")} 道数据集缺陷题的比对记录）也在这两处可查。`,
].join("\n");

// ── 明细文档（DETAIL.md，与 README 并列）+ 错题块 ─────────────────────
const mistakes = buildDetail();
console.log(`[stats] 明细文档 → ${DETAIL_MD}（数据集缺陷 ${mistakes.length} 题）`);

const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n+/g, " ").trim();
const mistakesBlock = mistakes.length
  ? [
      "| 题号 | 库 | 评定 | 类型 | 问题（截） | 裁定（全文见 [DETAIL.md](DETAIL.md)） |",
      "|---|---|---|---|---|---|",
      ...mistakes.map(
        (m) =>
          `| q${m.qid} | ${m.db} | ${RULING_LABEL[m.ruling] ?? m.ruling} | ${m.types.join(" · ") || "—"} | ${cell(m.question.slice(0, 56))} | ${cell(m.rationale.slice(0, 130))} |`,
      ),
    ].join("\n")
  : "（暂无：已跑题判定均为 PASS）";

if (!NO_SYNC) {
  const readmePath = SCENARIO_README;
  // 安装态首次写入：从场景包复制一份 README（标记块的宿主），之后同步都落在这里
  if (!fs.existsSync(readmePath)) {
    const src = path.join(SCENARIO, "README.md");
    if (fs.existsSync(src) && path.resolve(src) !== path.resolve(readmePath)) {
      fs.mkdirSync(path.dirname(readmePath), { recursive: true });
      fs.copyFileSync(src, readmePath);
      console.log(`[stats] 已从场景包复制 README → ${readmePath}`);
    }
  }
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
  syncBlock(MK_BEGIN, MK_END, mistakesBlock, "数据集缺陷记录");
}

console.log(`[stats] 轮次 ${runs.length} ｜ 判定 ${rows.length} 次（去重 ${doneTotal} 题）`);
console.log(md.split("\n").slice(0, 6).join("\n"));
console.log(`\n[stats] 图 → ${OUT_SVG}\n[stats] 文字版 → ${OUT_MD}`);

if (OPEN) {
  const cmd = process.platform === "win32" ? "cmd" : process.platform === "darwin" ? "open" : "xdg-open";
  const args = process.platform === "win32" ? ["/c", "start", "", OUT_SVG] : [OUT_SVG];
  spawn(cmd, args, { detached: true, stdio: "ignore" }).unref();
}
