/**
 * 判定规则（开发态共享）—— gold 期望值 ↔ agent 答案
 *
 * 期望值 = 题目自带 gold SQL 在该库 SQLite 上执行的结果（**数据集原生，不修正**）。
 * 比对：数值按 [1e-9, 1e-6, 1e-4, 1e-3] 逐级容差；字符串归一化包含。
 * 供 `tsm grade`（逐轮判定）与 `tsm stats`（DETAIL.md 明细）复用。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { readScenario, scenarioFiles } from "../model/graphData.js";
import { resolveSqlitePath } from "../graph/physicalSchema.js";
import { ROOT } from "../config.js";

export interface QJson {
  question_id: number;
  db_id: string;
  question: string;
  SQL: string;
  evidence?: string;
  difficulty?: string;
}

export const QUESTIONS: QJson[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, "MINIDEV_sqlite", "mini_dev_sqlite.json"), "utf8"),
);
export const byQid = new Map(QUESTIONS.map((q) => [Number(q.question_id), q]));

/** 库 → sqlite 路径（从场景 YAML 取，与工具链同源） */
const dbPath = new Map<string, string>();
for (const f of scenarioFiles()) {
  const db = f.replace(/\.yaml$/, "");
  const { sc } = readScenario(db);
  const url = Object.values(sc.databases ?? {})[0] ?? "";
  const p = resolveSqlitePath(url, ROOT);
  if (p) dbPath.set(db, p);
}

/** gold 期望值（空结果 = 合法期望，不是错误） */
export function goldValues(qid: number, db: string): { values: string[]; empty?: boolean; err?: string } {
  const q = byQid.get(qid);
  const sqlite = dbPath.get(db);
  if (!q) return { values: [], err: "题目不存在" };
  if (!sqlite || !fs.existsSync(sqlite)) return { values: [], err: "SQLite 缺失" };
  try {
    const db2 = new DatabaseSync(sqlite, { readOnly: true });
    try {
      const rows = db2.prepare(String(q.SQL)).all() as Record<string, unknown>[];
      const values = rows.flatMap((r) => Object.values(r).map((v) => String(v)));
      return rows.length === 0 ? { values: [], empty: true } : { values };
    } finally {
      db2.close();
    }
  } catch (e) {
    return { values: [], err: String(e).slice(0, 120) };
  }
}

/** 负号归一：U+2212 / en-dash / em-dash / 全角减号 → ASCII '-'（模型常写 U+2212；不归一会被文本清洗剥掉，负数变正数） */
const NEG_RE = /[−–—－]/g;
const toNum = (s: string) => Number(s.replace(NEG_RE, "-").replace(/,/g, ""));
const NUM_RE = /[-−–—－]?\d[\d,]*(?:\.\d+)?/g;
const norm = (s: string) =>
  s.toLowerCase().replace(NEG_RE, "-").replace(/[\s,]+/g, " ").replace(/[^\w.%\- ]+/g, "").trim();

/** 文本比对（**逐值判定**：每个期望值各自走「文本命中 或 数值逐级容差」；混合类型期望也能判） */
export function judge(finalText: string, expected: string[]): { verdict: string; precision: string } {
  if (!expected.length) return { verdict: "GOLD_ERR", precision: "-" };
  const tn = norm(finalText);
  const cands = (finalText.match(NUM_RE) ?? []).map(toNum);
  const REL = [1e-9, 1e-6, 1e-4, 1e-3];

  const hit = (e: string): { ok: boolean; how: string } => {
    if (tn.includes(norm(e))) return { ok: true, how: "text" };
    const n = toNum(e);
    if (!Number.isFinite(n)) return { ok: false, how: "" };
    for (const r of REL)
      if (cands.some((c) => Math.abs(c - n) <= Math.max(1e-12, Math.abs(n) * r))) return { ok: true, how: `num@${r}` };
    return { ok: false, how: "" };
  };
  const hits = expected.map(hit);
  if (hits.every((h) => h.ok)) {
    const nums = hits.filter((h) => h.how.startsWith("num")).map((h) => h.how);
    return { verdict: "PASS", precision: nums.length ? nums[nums.length - 1] : "text" };
  }
  // 期望里全是数值 → 可比对但没对上，记 FAIL；含非数值（文本期望）则抽不出可比对的值 → UNCERTAIN
  return expected.every((e) => Number.isFinite(toNum(e))) ? { verdict: "FAIL", precision: "-" } : { verdict: "UNCERTAIN", precision: "-" };
}

/** gold 正常执行但零行：看 agent 是否也说「没有」 */
export function judgeEmpty(finalText: string): { verdict: string; precision: string } {
  const saysEmpty =
    /(empty list|no (products?|records?|transactions?|results?|countries|purchases)|none|no data|\bempty\b|为空|没有|无(相符|记录|产品|交易))/i.test(
      finalText,
    );
  return { verdict: saysEmpty ? "PASS" : "FAIL", precision: "empty" };
}
