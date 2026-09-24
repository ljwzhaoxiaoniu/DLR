/**
 * 跑批结果读取（开发态共享）—— 结果目录 / 逐题 CSV / dsh 事件流 / L3 源 / 评定
 *
 * `tsm grade`（判定与汇总）、`tsm stats`（综合统计 + DETAIL.md）共用这一层，
 * 避免各命令把结果目录再解析一遍。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { SOP_SOURCE } from "../config.js";
import { judge, judgeEmpty, QUESTIONS } from "./judge.js";

// ── 结果目录 ─────────────────────────────────────────────────────────
/** 列出 results/ 下有产物的轮次（含 questions.csv 的目录），按名字排序 */
export function listRuns(resultsDir: string): string[] {
  if (!fs.existsSync(resultsDir)) return [];
  return fs
    .readdirSync(resultsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(resultsDir, d.name, "questions.csv")))
    .map((d) => d.name)
    .sort();
}

/** 极简 CSV 解析（grade 写出的是带引号、双引号转义的规整 CSV） */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQ = false;
      } else cur += c;
    } else if (c === '"') inQ = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n") {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = "";
    } else if (c !== "\r") cur += c;
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    rows.push(row);
  }
  const head = rows.shift() ?? [];
  return rows.filter((r) => r.some((x) => x !== "")).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

/** 读一轮的 questions.csv */
export function readRunCsv(runDir: string): Record<string, string>[] {
  return parseCsv(fs.readFileSync(path.join(runDir, "questions.csv"), "utf8"));
}

// ── dsh `--json` 事件流 ──────────────────────────────────────────────
export interface QEvent {
  qid: string;
  file: string; // raw 下的事件流文件名
  final: string; // final 文本（agent 原文）
  steps: number; // status/step_end 次数
  tools: number; // tool_call 次数
  toolErrors: number; // tool_result status=error 次数
  trace: { tool: string; input: string }[]; // 工具调用序列（名字 + 参数截 200）
  session: string; // dsh 会话 id（可回放）
  tokens: { total: number; input: number; cacheRead: number; output: number };
}

/** 读一轮跑批目录的 raw/，逐题返回事件摘要（按文件名排序） */
export function readRunQuestions(runDir: string): QEvent[] {
  const rawDir = path.join(runDir, "raw");
  const out: QEvent[] = [];
  for (const f of fs.readdirSync(rawDir).filter((x) => x.endsWith(".ndjson")).sort()) {
    const qid = String((f.match(/_(\d+)_dlr\.ndjson$/) ?? [])[1] ?? "");
    let final = "";
    let steps = 0;
    let tools = 0;
    let toolErrors = 0;
    let sid = "";
    const trace: { tool: string; input: string }[] = [];
    const tk = { total: 0, input: 0, cacheRead: 0, output: 0 };
    for (const line of fs.readFileSync(path.join(rawDir, f), "utf8").split("\n").filter(Boolean)) {
      let o: Record<string, unknown>;
      try {
        o = JSON.parse(line) as Record<string, unknown>;
      } catch {
        continue; // 半行/坏行跳过
      }
      const type = o.type as string;
      if (type === "session") sid = String(o.sessionId ?? o.id ?? "");
      if (type === "final") final = String(o.text ?? "");
      if (type === "tool_call") {
        tools++;
        const name = typeof o.tool === "string" ? o.tool : ((o.tool as { name?: string } | undefined)?.name ?? "?");
        trace.push({
          tool: name.replace("mcp__semantic-core__", ""),
          input: JSON.stringify(o.input ?? {}).replace(/\s+/g, " ").slice(0, 200),
        });
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
    out.push({ qid, file: f, final, steps, tools, toolErrors, trace, session: sid, tokens: tk });
  }
  return out;
}

// ── L3 源（sop.md） ──────────────────────────────────────────────────
export interface SopSection {
  db: string;
  question: string; // 题面（sop.md 逐字复述的问题）
  types: string[]; // 类型标签：数据集问题 / 建模冲突 / 难题 / 其他
  expect?: string; // 可选 `> **裁定期望**：<值>`（非空类裁定给的可比口径，判「翻盘」用）
  body: string; // 裁定正文（缘由）
}

/** 解析 sop.md：`## 库` / `### When asked: "…"` / `> **类型**：…` / `> **裁定期望**：…` / 正文 */
export function parseSop(sopPath: string): SopSection[] {
  if (!fs.existsSync(sopPath)) return [];
  const lines = fs.readFileSync(sopPath, "utf8").split(/\r?\n/);
  const out: SopSection[] = [];
  let db = "";
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("## ")) {
      db = l.slice(3).trim();
      continue;
    }
    if (!l.startsWith("### ")) continue;
    const m = l.match(/^###\s+When asked:\s*"(.*)"\s*$/);
    if (!m) continue;
    const body: string[] = [];
    let types: string[] = [];
    let expect: string | undefined;
    for (let j = i + 1; j < lines.length && !lines[j].startsWith("### ") && !lines[j].startsWith("## "); j++) {
      const t = lines[j].match(/^>\s*\*\*类型\*\*：(.+)$/);
      if (t) {
        types = t[1]
          .split("·")
          .map((s) => s.trim())
          .filter(Boolean);
        continue;
      }
      const e = lines[j].match(/^>\s*\*\*裁定期望\*\*：(.+)$/);
      if (e) {
        expect = e[1].trim();
        continue;
      }
      body.push(lines[j]);
    }
    out.push({ db, question: m[1].trim(), types, expect, body: body.join("\n").trim() });
  }
  return out;
}

/** 题面归一（比对 sop 标题与数据集原题） */
export const normQuestion = (s: string) => s.toLowerCase().replace(/\s+/g, " ").replace(/[""]/g, '"').trim();

/** 题面 → 题号 → SOP 节（sop.md 的题面即数据集原题；未命中的题无节） */
export function sopByQid(sopPath = SOP_SOURCE): Map<string, SopSection> {
  const byQuestionText = new Map(QUESTIONS.map((q) => [normQuestion(q.question), q]));
  const out = new Map<string, SopSection>();
  for (const s of parseSop(sopPath)) {
    const q = byQuestionText.get(normQuestion(s.question));
    if (q) out.set(String(q.question_id), s);
  }
  return out;
}

// ── 评定（与「判定」并列的第二维：SOP 生效时按 SOP 裁定） ─────────────
/**
 * `verdict` 仍与 gold 比对（数据集原生）；`ruling` 是裁定后的结论：
 *   CORRECT    与 gold 一致
 *   OVERTURNED 与 gold 对不上，但答法符合 SOP 裁定口径 —— 翻盘（计正确，**单独标注**）
 *   WRONG      判错（含「SOP 已给口径而 agent 答法违背它」）
 *   PENDING    无人裁定 / 抽不出可比对的值
 */
export const RULINGS = ["CORRECT", "OVERTURNED", "WRONG", "PENDING"] as const;
export type Ruling = (typeof RULINGS)[number];
export const RULING_LABEL: Record<string, string> = {
  CORRECT: "✅ 正确",
  OVERTURNED: "🔁 翻盘",
  WRONG: "❌ 错误",
  PENDING: "⚠️ 待仲裁",
};

export function rulingOf(verdict: string, final: string, sec?: SopSection): Ruling {
  if (verdict === "PASS") return "CORRECT";
  if (sec?.types.includes("数据集问题")) {
    // ① 节里给了可比的裁定期望（多个值用 | 分隔）→ 直接与 agent 答案比
    if (sec.expect) {
      const vals = sec.expect.split(/\s*\|\s*/).filter(Boolean);
      return judge(final, vals).verdict === "PASS" ? "OVERTURNED" : "WRONG";
    }
    // ② 节裁定为「空 / 无记录」类 → 比 agent 是否也说空（复用 judgeEmpty 的口径识别）
    if (judgeEmpty(sec.body).verdict === "PASS")
      return judgeEmpty(final).verdict === "PASS" ? "OVERTURNED" : "WRONG";
    // ③ 判为数据集问题，但节里没给可比口径 → 待仲裁
    return "PENDING";
  }
  return verdict === "FAIL" ? "WRONG" : "PENDING";
}
