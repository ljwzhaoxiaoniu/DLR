/**
 * DETAIL.md —— 场景根目录的**评测明细文档**（与 README 并列，给人看的）
 *
 * 结构仿旧评测文档：逐题校验表 → 跑题覆盖度 → 汇总（判定 + 评定）→ 定性观察（留白）→ 错题与裁定 → 逐题明细
 * 输入：`results/<轮次>/{questions.csv, raw/}` + L3 源 `sources/sop.md`
 * 口径：同题多轮时，明细取**最新一轮**，附重跑次数；分布统计见 `tsm stats`（results/STATS.md）
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { DETAIL_DIR, DETAIL_MD, RESULTS_DIR, SCENARIO_NAME } from "../config.js";
import {
  listRuns,
  readRunCsv,
  readRunQuestions,
  rulingOf,
  sopByQid,
  RULINGS,
  RULING_LABEL,
  type SopSection,
} from "./results.js";
import { goldValues, QUESTIONS } from "./judge.js";

const ICON: Record<string, string> = { PASS: "✅", FAIL: "❌", UNCERTAIN: "⚠️", GOLD_ERR: "⛔" };
const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n+/g, " ").trim();
const fmt = (n: number) => n.toLocaleString("en-US");

/** 备注（人话一句）：先说判定怎么来的，再说裁定怎么来的 —— 替代原先晦涩的 `num@1e-9` 精度列 */
function remarkOf(a: { verdict: string; ruling: string; precision: string; final?: string }, sec?: SopSection): string {
  const bits: string[] = [];
  if (!(a.final ?? "").trim()) bits.push("跑失败（无 final 文本）");
  else if (a.verdict === "PASS") {
    bits.push(
      a.precision === "empty"
        ? "空结果一致"
        : a.precision === "set"
          ? "结果集一致（与该题 gold 同集）"
          : a.precision.startsWith("num")
            ? `数值一致（容差 ${a.precision.slice(4)}）`
            : "文本一致",
    );
  } else if (a.verdict === "FAIL") bits.push("与 gold 不符");
  else if (a.verdict === "GOLD_ERR") bits.push("gold 自身执行失败");
  else bits.push("抽不出可比对的值");

  const dsIssue = sec?.types.includes("数据集问题") ?? false;
  if (a.ruling === "OVERTURNED") bits.push(`按 SOP 裁定为正确（${sec?.types.join(" · ") || "数据集问题"}）`);
  else if (a.ruling === "WRONG" && dsIssue) bits.push("违背该题 SOP 口径");
  else if (a.ruling === "PENDING" && (a.final ?? "").trim()) bits.push(dsIssue ? "SOP 未给可比口径，待仲裁" : "待仲裁");
  return bits.join("；");
}

/** agent 原文里的标题降两级（免得进了本文档的目录大纲）；代码围栏内不动 */
const demote = (md: string) => {
  let fence = false;
  return md
    .split("\n")
    .map((l) => {
      if (/^\s*```/.test(l)) {
        fence = !fence;
        return l;
      }
      return fence ? l : l.replace(/^(#{1,5}) /, (_, h: string) => "#".repeat(Math.min(6, h.length + 2)) + " ");
    })
    .join("\n");
};

/** 数据集缺陷题（判定非 PASS）：题号 / 库 / 判定 / 评定 / 类型 / 缘由 —— 供 README 首节与 DETAIL 共用 */
export interface Mistake {
  qid: string;
  db: string;
  verdict: string;
  ruling: string; // 评定（CORRECT / OVERTURNED / WRONG / PENDING）
  question: string;
  types: string[];
  rationale: string; // sop.md 裁定正文（截）
}

interface Agg {
  qid: string;
  db: string;
  question: string;
  verdict: string;
  ruling: string;
  precision: string;
  steps: number;
  tools: number;
  tokens: number;
  expected: string;
  final: string;
  trace: { tool: string; input: string }[];
  session: string;
  runs: string[]; // 跑过的轮次（含本轮）
  runDir: string; // 最新轮次
}

/** 生成 <场景>/DETAIL.md，并返回错题清单（README 首节用） */
export function buildDetail(): Mistake[] {
  const resultsDir = RESULTS_DIR;
  const runs = listRuns(resultsDir);

  // ── L3 源：题面 → 题号 → SOP 裁定（共享实现；也用于评定的兜底推导） ──
  const sopQ = sopByQid();

  // ── 逐题聚合（同题多轮 → 明细取最新轮，记重跑） ─────────────────────
  const agg = new Map<string, Agg>();
  for (const run of runs) {
    const runDir = path.join(resultsDir, run);
    const evs = new Map(readRunQuestions(runDir).map((e) => [e.qid, e]));
    for (const r of readRunCsv(runDir)) {
      const ev = evs.get(r.qid);
      const prev = agg.get(r.qid);
      agg.set(r.qid, {
        qid: r.qid,
        db: r.db,
        question: r.question,
        verdict: r.verdict,
        ruling: r.ruling || rulingOf(r.verdict, ev?.final ?? "", sopQ.get(r.qid)),
        precision: r.precision,
        steps: Number(r.steps) || 0,
        tools: Number(r.tools) || 0,
        tokens: Number(r.tokens_total) || 0,
        expected: r.expected,
        final: ev?.final ?? "",
        trace: ev?.trace ?? [],
        session: r.session,
        runs: [...(prev?.runs ?? []), run],
        runDir: run,
      });
    }
  }
  const all = [...agg.values()].sort((a, b) => a.db.localeCompare(b.db) || Number(a.qid) - Number(b.qid));

  // ── 数据集缺陷题（非 PASS，或已按 SOP 翻盘的）── 题 ↔ SOP 裁定的映射 ──
  const mistakes: Mistake[] = all
    .filter((a) => a.verdict !== "PASS" || a.ruling === "OVERTURNED")
    .map((a) => {
      const s = sopQ.get(a.qid);
      return {
        qid: a.qid,
        db: a.db,
        verdict: a.verdict,
        ruling: a.ruling,
        question: a.question,
        types: s?.types ?? [],
        rationale: (s?.body ?? "").replace(/\s+/g, " ").trim().slice(0, 300),
      };
    });

  // ── 汇总数字 ─────────────────────────────────────────────────────────
  const tally = (v: string) => all.filter((a) => a.verdict === v).length;
  const rTally = (v: string) => all.filter((a) => a.ruling === v).length;
  const rightTotal = rTally("CORRECT") + rTally("OVERTURNED");
  const pct = (n: number) => (all.length ? ((n / all.length) * 100).toFixed(1) : "0.0");
  const tks = all.map((a) => a.tokens).sort((a, b) => a - b);
  const med = tks.length ? tks[Math.floor(tks.length / 2)] : 0;
  const avg = (f: (a: Agg) => number) => (all.length ? Math.round(all.reduce((n, a) => n + f(a), 0) / all.length) : 0);
  const dbTotal = new Map<string, number>();
  for (const q of QUESTIONS) dbTotal.set(q.db_id, (dbTotal.get(q.db_id) ?? 0) + 1);
  const dbDone = new Map<string, number>();
  for (const a of all) dbDone.set(a.db, (dbDone.get(a.db) ?? 0) + 1);

  // ── 分库分组（明细按库拆分：DETAIL/<库>.md）────────────────────────
  const byDb = new Map<string, Agg[]>();
  for (const a of all) byDb.set(a.db, [...(byDb.get(a.db) ?? []), a]);
  const dbNames = [...byDb.keys()].sort();
  const dbMedian = (rows: Agg[]): number => {
    const t = rows.map((a) => a.tokens).sort((x, y) => x - y);
    return t.length ? t[Math.floor(t.length / 2)] : 0;
  };
  /** 主文档的分库索引（一行一库，指向 DETAIL/<库>.md） */
  const indexRows = dbNames.map((db) => {
    const rows = byDb.get(db)!;
    const rt = (v: string) => rows.filter((a) => a.ruling === v).length;
    return `| [${db}](DETAIL/${db}.md) | ${rows.length} | ${rt("CORRECT")} | ${rt("OVERTURNED")} | ${rt("WRONG")} | ${rt("PENDING")} | ${fmt(dbMedian(rows))} |`;
  });

  /** 复用 DETAIL.md 里既有的「定性观察」正文（人工撰写、跑批后补写）；仅当仍是内置占位时回退占位 */
  function preservedObservation(): string[] {
    const PLACEHOLDER = "> 分批跑完后按 SOP 案例撰写：每个 SOP 条目题须有对应观察、数字与归档 CSV 逐项一致（防止「先写结论后找证据」）。";
    try {
      const old = fs.readFileSync(DETAIL_MD, "utf8");
      const m = old.match(/\n## 定性观察\n+([\s\S]*?)(?=\n## )/);
      const body = (m?.[1] ?? "").trim();
      if (body && !body.startsWith("> 分批跑完后按 SOP 案例撰写")) return body.split("\n");
    } catch {
      /* 首次生成：无旧文件 */
    }
    return [PLACEHOLDER];
  }

  /** 逐题明细块（分库文件内；`id` 供校验表锚点跳转） */
  const blockOf = (a: Agg): string => {
    const g = goldValues(Number(a.qid), a.db);
    const expected = g.err ? `gold 执行失败（${g.err}）` : g.empty ? "空结果（合法期望）" : g.values.slice(0, 8).join(" | ");
    const lines: string[] = [
      `<details id="q${a.qid}">`,
      `<summary><b>q${a.qid}</b> · ${a.db} · ${ICON[a.verdict] ?? ""} <b>${a.verdict}</b>${a.ruling !== "CORRECT" ? ` · ${RULING_LABEL[a.ruling] ?? a.ruling}` : ""} · ${a.steps} 步 / ${a.tools} 工具 · ${fmt(a.tokens)} tok${a.runs.length > 1 ? ` · ${a.runs.length} 轮` : ""} · ${cell(remarkOf(a, sopQ.get(a.qid)))}</summary>`,
      "",
      `**问题**：${a.question}`,
      "",
      `**期望**：\`${expected.replace(/`/g, "'")}\``,
      "",
      `**答案**：${a.final.trim() ? `\`${cell(a.final).slice(0, 200).replace(/`/g, "'")}\`` : "_（无 final 文本）_"}`,
      "",
    ];
    if (a.trace.length) {
      lines.push("**调用步骤**", "", "| # | 工具 | 参数（截 200） |", "|---|---|---|");
      a.trace.forEach((t, i) => lines.push(`| ${i + 1} | \`${t.tool}\` | \`${t.input.replace(/`/g, "'")}\` |`));
      lines.push("");
    }
    lines.push("**依据与结论**（agent 原文）", "", demote(a.final.trim()) || "_（无 final 文本）_", "", "</details>", "");
    return lines.join("\n");
  };

  /** 校验表（分库文件内；题号锚点到明细块） */
  const tableOf = (rows: Agg[]): string[] => [
    "| 题号 | 判定 | 评定 | 步数 | 工具 | tokens | 轮次 | 备注 |",
    "|---|---|---|---|---|---|---|---|",
    ...rows.map(
      (a) =>
        `| [q${a.qid}](#q${a.qid}) | ${ICON[a.verdict] ?? ""} ${a.verdict} | ${RULING_LABEL[a.ruling] ?? a.ruling} | ${a.steps} | ${a.tools} | ${fmt(a.tokens)} | ${a.runs.length > 1 ? `${a.runs.length} 轮（最新 ${a.runDir}）` : a.runDir} | ${cell(remarkOf(a, sopQ.get(a.qid)))} |`,
    ),
  ];

  /** 缺陷与裁定表（主文档带库列；分库文件不带） */
  const mistakeTableOf = (rows: Mistake[], withDb: boolean): string =>
    rows.length
      ? [
          `| 题号 | ${withDb ? "库 | " : ""}判定 | 评定 | 类型 | 问题（截） | 裁定（sop.md 摘要） |`,
          `|---|---|${withDb ? "---|" : ""}---|---|---|---|`,
          ...rows.map(
            (m) =>
              `| q${m.qid} | ${withDb ? `${m.db} | ` : ""}${ICON[m.verdict] ?? ""} ${m.verdict} | ${RULING_LABEL[m.ruling] ?? m.ruling} | ${m.types.join(" · ") || "—"} | ${cell(m.question.slice(0, 60))} | ${cell(m.rationale.slice(0, 140))} |`,
          ),
        ].join("\n")
      : "（暂无）";

  // ── 组装：主文档 = 总账（覆盖度 / 汇总 / 分库索引 / 缺陷裁定） ────────
  const md: string[] = [
    `# 评测明细 — DLR · ${SCENARIO_NAME}`,
    "",
    "> **说明**：question 驱动三级锚定——L1 dsh MCP 语义层（`dlr_semantic_query` 等 7 工具，含 `get_full_data_info` 下探）/ L2 共识（`dlr_search_consensus`）/ L3 SOP（`dlr_search_sop`），交叉验证后出 SQL。",
    "> **判定**：gold SQL 在数据集 SQLite 上执行得期望值 ↔ agent 答案（**数据集原生，不修正**）；数值逐级容差、文本归一化包含，**都只看 `Final Answer:` 结论句区域**（正文里的备选读法不算命中）。",
    "> **评定**：SOP 生效时按 SOP 裁定——与 gold 对不上但答法合 SOP 口径 = **翻盘**（计正确，但**单独标注、单独计数，不并入 PASS**）。",
    "> **数据来源**：`results/<轮次>/{questions.csv, raw/*.ndjson}` ｜ 本文件由 `tsm stats` 自动重建（定性观察一节在跑批后按 SOP 案例补写）。",
    "> **列义**：判定 PASS ｜ FAIL ｜ UNCERTAIN（抽不出可比对的值）｜ GOLD_ERR（gold 本身执行失败）；评定 ✅ 正确 ｜ 🔁 翻盘 ｜ ❌ 错误 ｜ ⚠️ 待仲裁；**备注** = 这一行的判定依据 + 裁定依据（人话一句）。",
    "> **本文档 = 总账**：覆盖度 / 汇总 / 数据集缺陷与裁定；**逐题校验表与证据正文按库拆分**，见下方分库索引。",
    "",
    "## 跑题覆盖度（跑过多少题）",
    "",
    "> **跑题覆盖度 = 跑过的题（去重）÷ 数据集全量（mini_dev 原生题数）**——只看跑没跑过，与对了多少题无关（判定 / 评定见上表与汇总）。",
    "",
    "| 数据库 | 全量 | 已跑 | 剩余 | 覆盖 |",
    "|---|---|---|---|---|",
    ...[...dbTotal.keys()].sort().map((db) => {
      const done = Math.min(dbDone.get(db) ?? 0, dbTotal.get(db) ?? 0);
      const total = dbTotal.get(db) ?? 0;
      const pct = total ? ((done / total) * 100).toFixed(1) : "0.0";
      return `| ${db} | ${total} | ${done} | ${total - done} | ${pct}%${done === total ? " ✅" : ""} |`;
    }),
    `| **合计** | **${QUESTIONS.length}** | **${all.length}** | **${QUESTIONS.length - all.length}** | **${((all.length / QUESTIONS.length) * 100).toFixed(1)}%** |`,
    "",
    "## 汇总",
    "",
    "**评定**（按 SOP 裁定 · **主口径**；🔁 翻盘单独计，不并入 ✅ 正确——数据集错误不记在应用头上）",
    "",
    "| 评定 | 值 |",
    "|---|---|",
    `| ✅ 正确（与 gold 一致） | ${rTally("CORRECT")} / ${all.length}（${pct(rTally("CORRECT"))}%） |`,
    `| 🔁 翻盘（按 SOP 裁定为正确） | ${rTally("OVERTURNED")} |`,
    `| ❌ 错误 | ${rTally("WRONG")} |`,
    `| ⚠️ 待仲裁 | ${rTally("PENDING")} |`,
    `| **合计正确（正确 + 翻盘）** | **${rightTotal} / ${all.length}（${pct(rightTotal)}%）** |`,
    "",
    "**判定**（与 gold 原始比对 · 留档；gold 数据集原生、不修正）",
    "",
    "| 判定 | 值 |",
    "|---|---|",
    `| PASS（与 gold 一致） | ${tally("PASS")} / ${all.length}（${pct(tally("PASS"))}%） |`,
    `| UNCERTAIN（抽不出可比对的值） | ${tally("UNCERTAIN")} |`,
    `| FAIL（与 gold 不符） | ${tally("FAIL")} |`,
    `| GOLD_ERR（gold 本身执行失败） | ${tally("GOLD_ERR")} |`,
    "",
    "**效率**",
    "",
    "| 指标 | 值 |",
    "|---|---|",
    `| token 平均 / 中位 | ${fmt(avg((a) => a.tokens))} / ${fmt(med)} |`,
    `| token 最低 / 最高 | ${fmt(tks[0] ?? 0)} / ${fmt(tks[tks.length - 1] ?? 0)} |`,
    `| 步数均值 / 工具调用均值 | ${avg((a) => a.steps)} / ${avg((a) => a.tools)} |`,
    "",
    "> **口径**：本文档汇总按**去重题数**计（同题多轮取**最新一轮**的判定/评定）——与 [results/STATS.md](results/STATS.md) 的**按次数**分布会不同（重跑过或跑挂过的题，那边会多计一次）。仅覆盖已跑轮次，勿外推为全数据集结论。token = input + cache_read + output（不含 CoT 的 reasoning 分项由 harness 单独计）。",
    "",
    "## 定性观察",
    "",
    ...preservedObservation(),
    "",
    "## 分库明细（逐题校验表 + 证据正文）",
    "",
    "> 每题一行台账（题号锚点跳到该题证据块）+ 每题一段正文（命中口径 / 执行 SQL / 结论）。",
    "",
    "| 数据库 | 已跑 | ✅ 正确 | 🔁 翻盘 | ❌ 错误 | ⚠️ 待仲裁 | token 中位 |",
    "|---|---|---|---|---|---|---|",
    ...indexRows,
    "",
    "## 数据集缺陷与裁定（SOP 条目缘由）",
    "",
    mistakeTableOf(mistakes, true),
    "",
  ];

  // ── 分库文件：DETAIL/<库>.md（逐题校验表 + 证据正文 + 本库缺陷） ──────
  // DETAIL_DIR 来自 config（= <SCENARIO_OUT>/DETAIL；安装态不写进场景包）
  fs.mkdirSync(DETAIL_DIR, { recursive: true });
  for (const db of dbNames) {
    const rows = byDb.get(db)!;
    const rt = (v: string) => rows.filter((a) => a.ruling === v).length;
    const content = [
      `# 评测明细 · ${db} — ${SCENARIO_NAME}`,
      "",
      `> 本库已跑 **${rows.length}** 题：✅ ${rt("CORRECT")} ｜ 🔁 ${rt("OVERTURNED")} ｜ ❌ ${rt("WRONG")} ｜ ⚠️ ${rt("PENDING")} ｜ token 中位 **${fmt(dbMedian(rows))}**`,
      "> 总账（覆盖度 / 汇总 / 数据集缺陷与裁定）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。",
      "",
      "## 逐题校验表",
      "",
      ...tableOf(rows),
      "",
      "## 本库数据集缺陷与裁定",
      "",
      mistakeTableOf(mistakes.filter((m) => m.db === db), false),
      "",
      "## 逐题明细（怎么对的）",
      "",
      ...rows.map(blockOf),
    ];
    fs.writeFileSync(path.join(DETAIL_DIR, `${db}.md`), content.join("\n"));
  }

  const outPath = DETAIL_MD;
  fs.writeFileSync(outPath, md.join("\n"));
  return mistakes;
}
