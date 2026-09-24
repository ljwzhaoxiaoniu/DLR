/**
 * DETAIL.md —— 场景根目录的**评测明细文档**（与 README 并列，给人看的）
 *
 * 结构仿旧评测文档：逐题校验表 → 评测进度 → 汇总 → 定性观察（留白）→ 错题与裁定 → 逐题明细
 * 输入：`results/<轮次>/{questions.csv, raw/}` + L3 源 `sources/sop.md`
 * 口径：同题多轮时，明细取**最新一轮**，附重跑次数；分布统计见 `tsm stats`（results/STATS.md）
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { SCENARIO, SOP_SOURCE } from "../config.js";
import { listRuns, readRunCsv, readRunQuestions, parseSop, normQuestion, type SopSection } from "./results.js";
import { byQid, goldValues, QUESTIONS } from "./judge.js";

const ICON: Record<string, string> = { PASS: "✅", FAIL: "❌", UNCERTAIN: "⚠️", GOLD_ERR: "⛔" };
const cell = (s: string) => s.replace(/\|/g, "\\|").replace(/\r?\n+/g, " ").trim();
const fmt = (n: number) => n.toLocaleString("en-US");

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

/** 错题（判定非 PASS）：题号 / 库 / 判定 / 类型 / 缘由 —— 供 README 首节与 DETAIL 共用 */
export interface Mistake {
  qid: string;
  db: string;
  verdict: string;
  question: string;
  types: string[];
  rationale: string; // sop.md 裁定正文（截）
}

interface Agg {
  qid: string;
  db: string;
  question: string;
  verdict: string;
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
  const resultsDir = path.join(SCENARIO, "results");
  const runs = listRuns(resultsDir);

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

  // ── L3 源：题面 → 题号 → 裁定 ───────────────────────────────────────
  const sop = parseSop(SOP_SOURCE);
  const sopByQid = new Map<string, SopSection>();
  const byQuestionText = new Map(QUESTIONS.map((q) => [normQuestion(q.question), q]));
  for (const s of sop) {
    const q = byQuestionText.get(normQuestion(s.question));
    if (q) sopByQid.set(String(q.question_id), s);
  }

  // ── 错题（非 PASS）── 题 ↔ SOP 裁定的映射 ───────────────────────────
  const mistakes: Mistake[] = all
    .filter((a) => a.verdict !== "PASS")
    .map((a) => {
      const s = sopByQid.get(a.qid);
      return {
        qid: a.qid,
        db: a.db,
        verdict: a.verdict,
        question: a.question,
        types: s?.types ?? [],
        rationale: (s?.body ?? "").replace(/\s+/g, " ").trim().slice(0, 300),
      };
    });

  // ── 汇总数字 ─────────────────────────────────────────────────────────
  const tally = (v: string) => all.filter((a) => a.verdict === v).length;
  const tks = all.map((a) => a.tokens).sort((a, b) => a - b);
  const med = tks.length ? tks[Math.floor(tks.length / 2)] : 0;
  const avg = (f: (a: Agg) => number) => (all.length ? Math.round(all.reduce((n, a) => n + f(a), 0) / all.length) : 0);
  const dbTotal = new Map<string, number>();
  for (const q of QUESTIONS) dbTotal.set(q.db_id, (dbTotal.get(q.db_id) ?? 0) + 1);
  const dbDone = new Map<string, number>();
  for (const a of all) dbDone.set(a.db, (dbDone.get(a.db) ?? 0) + 1);

  // ── 组装 ─────────────────────────────────────────────────────────────
  const md: string[] = [
    `# 评测明细 — DLR · ${path.basename(SCENARIO)}`,
    "",
    "> **说明**：question 驱动三级锚定——L1 dsh MCP 语义层（`dlr_semantic_query` 等 5 工具）/ L2 共识（`dlr_search_consensus`）/ L3 SOP（`skill sop`），交叉验证后出 SQL。",
    "> **判定**：gold SQL 在数据集 SQLite 上执行得期望值 ↔ agent 答案（**数据集原生，不修正**）；数值逐级容差、文本归一化包含。",
    "> **数据来源**：`results/<轮次>/{questions.csv, raw/*.ndjson}` ｜ 本文件由 `tsm stats` 自动重建（定性观察一节在跑批后按 SOP 案例补写）。",
    "> **列义**：PASS ｜ FAIL ｜ UNCERTAIN（抽不出可比对的值，待仲裁）｜ GOLD_ERR（gold 本身执行失败）。",
    "",
    "## 逐题校验表",
    "",
    "| 数据库 | 题号 | 判定 | 精度 | 步数 | 工具 | tokens | 轮次 |",
    "|---|---|---|---|---|---|---|---|",
    ...all.map(
      (a) =>
        `| ${a.db} | q${a.qid} | ${ICON[a.verdict] ?? ""} ${a.verdict} | ${a.precision} | ${a.steps} | ${a.tools} | ${fmt(a.tokens)} | ${a.runs.length > 1 ? `${a.runs.length} 轮（最新 ${a.runDir}）` : a.runDir} |`,
    ),
    "",
    "## 评测进度",
    "",
    "> 数据集原生题数（mini_dev 全量），已评 = 去重后的跑过题数。",
    "",
    "| 数据库 | 全量 | 已评 | 剩余 | 进度 |",
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
    "| 指标 | 值 |",
    "|---|---|",
    `| PASS | ${tally("PASS")} / ${all.length}（${all.length ? ((tally("PASS") / all.length) * 100).toFixed(1) : "0.0"}%） |`,
    `| UNCERTAIN（待仲裁） | ${tally("UNCERTAIN")} |`,
    `| FAIL | ${tally("FAIL")} |`,
    `| GOLD_ERR | ${tally("GOLD_ERR")} |`,
    `| token 平均 / 中位 | ${fmt(avg((a) => a.tokens))} / ${fmt(med)} |`,
    `| token 最低 / 最高 | ${fmt(tks[0] ?? 0)} / ${fmt(tks[tks.length - 1] ?? 0)} |`,
    `| 步数均值 / 工具调用均值 | ${avg((a) => a.steps)} / ${avg((a) => a.tools)} |`,
    "",
    "> **口径**：仅覆盖已跑轮次，勿外推为全数据集结论。token = input + cache_read + output（不含 CoT 的 reasoning 分项由 harness 单独计）。",
    "",
    "## 定性观察",
    "",
    "> 分批跑完后按 SOP 案例撰写：每个 SOP 条目题须有对应观察、数字与归档 CSV 逐项一致（防止「先写结论后找证据」）。",
    "",
    "## 错题与裁定（SOP 条目缘由）",
    "",
    mistakes.length
      ? [
          "| 题号 | 库 | 判定 | 类型 | 问题（截） | 裁定（sop.md 摘要） |",
          "|---|---|---|---|---|---|",
          ...mistakes.map(
            (m) =>
              `| q${m.qid} | ${m.db} | ${ICON[m.verdict] ?? ""} ${m.verdict} | ${m.types.join(" · ") || "—"} | ${cell(m.question.slice(0, 60))} | ${cell(m.rationale.slice(0, 140))} |`,
          ),
        ].join("\n")
      : "（暂无：所有已跑题判定均为 PASS）",
    "",
    "## 逐题明细（怎么对的）",
    "",
    ...all.map((a) => {
      const g = goldValues(Number(a.qid), a.db);
      const expected = g.err ? `gold 执行失败（${g.err}）` : g.empty ? "空结果（合法期望）" : g.values.slice(0, 8).join(" | ");
      const lines: string[] = [
        "<details>",
        `<summary><b>q${a.qid}</b> · ${a.db} · ${ICON[a.verdict] ?? ""} <b>${a.verdict}</b>（${a.precision}）· ${a.steps} 步 / ${a.tools} 工具 · ${fmt(a.tokens)} tok${a.runs.length > 1 ? ` · ${a.runs.length} 轮` : ""}</summary>`,
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
    }),
  ];

  const outPath = path.join(SCENARIO, "DETAIL.md");
  fs.writeFileSync(outPath, md.join("\n"));
  return mistakes;
}
