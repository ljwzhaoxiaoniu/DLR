/**
 * 判定规则（开发态共享）—— gold 期望值 ↔ agent 答案
 *
 * 期望值 = 题目自带 gold SQL 在该库 SQLite 上执行的结果（**数据集原生，不修正**）。
 * 比对：数值按 [1e-9, 1e-6, 1e-4, 1e-3] 逐级容差；字符串归一化包含。
 * 供 `tsm grade`（逐轮判定）与 `tsm stats`（DETAIL.md 明细）复用。
 */
import * as crypto from "node:crypto";
import * as fs from "node:fs";
import { spawnSync } from "node:child_process";
import * as path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { readScenario, scenarioFiles } from "../model/graphData.js";
import { resolveSqlitePath } from "../graph/physicalSchema.js";
import { CACHE_DIR, ROOT } from "../config.js";

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

export type GoldVal = { values: string[]; empty?: boolean; err?: string };

// ── gold 期望值缓存（磁盘）─────────────────────────────────────────────
// 为什么需要：gold SQL 里有很贵的查询——card_games q518 实测单条 ~5 分钟
// （legalities 42.8 万行无索引全扫 + 逐行 cards(uuid) 索引探测）。grade / stats
// 每题都要取期望值，重算一次就多付一次，且结果**永远相同**。故缓存到磁盘。
// 键 = qid + 库 + gold SQL 哈希 + SQLite 的 size/mtime → 题目或数据集一变即自动失效。
// 关掉：TSM_GOLD_NO_CACHE=1（复算用，验证缓存正确性）。
const CACHE_FILE = path.join(CACHE_DIR, "gold_values.json");
const NO_CACHE = process.env.TSM_GOLD_NO_CACHE === "1";
const SLOW_MS = 2000; // 超过这个耗时就报一句（缓存未命中时可看到是谁在拖）

let cache: Map<string, GoldVal> | null = null;
let dirty = false;

function keyOf(q: QJson, sqlite: string): string {
  const st = fs.statSync(sqlite);
  const h = crypto.createHash("sha1").update(`${q.question_id}|${q.db_id}|${q.SQL}`).digest("hex").slice(0, 16);
  return `${h}|${st.size}|${Math.round(st.mtimeMs)}`;
}

function flush(): void {
  if (!dirty || !cache || NO_CACHE) return;
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const tmp = `${CACHE_FILE}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify([...cache].map(([key, v]) => ({ key, v }))));
    fs.renameSync(tmp, CACHE_FILE); // 原子替换：并发进程永不读到半截文件
    dirty = false;
  } catch {
    /* 缓存写不进去不影响判定（下次重算而已） */
  }
}
process.on("exit", flush);

function cacheGet(): Map<string, GoldVal> {
  if (!cache) {
    cache = new Map();
    if (!NO_CACHE) {
      try {
        for (const e of JSON.parse(fs.readFileSync(CACHE_FILE, "utf8")) as { key: string; v: GoldVal }[])
          cache.set(e.key, e.v);
      } catch {
        /* 无缓存 / 缓存损坏 → 当作空缓存重建 */
      }
    }
  }
  return cache;
}

/** gold 期望值（空结果 = 合法期望，不是错误）；结果带磁盘缓存，见上方说明 */
export function goldValues(qid: number, db: string): GoldVal {
  const q = byQid.get(qid);
  const sqlite = dbPath.get(db);
  if (!q) return { values: [], err: "题目不存在" };
  if (!sqlite || !fs.existsSync(sqlite)) return { values: [], err: "SQLite 缺失" };
  const c = cacheGet();
  const key = keyOf(q, sqlite);
  const hit = c.get(key);
  if (hit) return hit;
  const t0 = performance.now();
  let v: GoldVal;
  try {
    const db2 = new DatabaseSync(sqlite, { readOnly: true });
    try {
      const rows = db2.prepare(String(q.SQL)).all() as Record<string, unknown>[];
      const values = rows.flatMap((r) => Object.values(r).map((x) => String(x)));
      v = rows.length === 0 ? { values: [], empty: true } : { values };
    } finally {
      db2.close();
    }
  } catch (e) {
    v = { values: [], err: String(e).slice(0, 120) };
  }
  const ms = performance.now() - t0;
  if (ms > SLOW_MS) console.error(`[gold] q${qid} ${db} ${(ms / 1000).toFixed(1)}s（已缓存）`);
  c.set(key, v);
  dirty = true;
  return v;
}

/** 负号归一：U+2212 / en-dash / em-dash / 全角减号 → ASCII '-'（模型常写 U+2212；不归一会被文本清洗剥掉，负数变正数） */
const NEG_RE = /[−–—－]/g;
const toNum = (s: string) => Number(s.replace(NEG_RE, "-").replace(/,/g, ""));
const NUM_RE = /[-−–—－]?\d[\d,]*(?:\.\d+)?/g;
const norm = (s: string) =>
  s.toLowerCase().replace(NEG_RE, "-").replace(/[\s,]+/g, " ").replace(/[^\w.%\- ]+/g, "").trim();

/**
 * 去掉答案里的「建模缺口」固定反馈小节（AGENTS.md 要求 agent 在答案末尾报的建模缺口）。
 * 为什么必须剔：judge 从**整段文本**抽数字/文本候选，缺口小节里的列名（如 `Enrollment (Ages 5-17)`）
 * 会带出 5/17 这类数字污染判据；judgeEmpty 也会被"无"字误判。只影响判据，原始日志不动。
 * 兼容：标题行形如 `建模缺口` / `## 建模缺口` / `**Modeling gap**`；块止于 Final Answer / Evidence SQL 行或文本末尾。
 */
export function stripModelGap(text: string): string {
  const isGap = (l: string) => /^\s*(#{1,6}\s*)?[*_]{0,2}\s*(建模缺口|modell?ing\s*gap)\b/i.test(l);
  const isBoundary = (l: string) => /^\s*(#{1,6}\s*)?[*_]{0,2}\s*(Final Answer|Evidence SQL)\b/i.test(l);
  const lines = text.split(/\r?\n/);
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (isGap(lines[i])) {
      let j = i + 1;
      while (j < lines.length && !isBoundary(lines[j])) j++;
      i = j - 1;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n");
}

/** 文本比对（**逐值判定**：每个期望值各自走「文本命中 或 数值逐级容差」；混合类型期望也能判） */
export function judge(finalText: string, expected: string[]): { verdict: string; precision: string } {
  if (!expected.length) return { verdict: "GOLD_ERR", precision: "-" };
  const tn = norm(finalText);
  const cands = (finalText.match(NUM_RE) ?? []).map(toNum);
  const REL = [1e-9, 1e-6, 1e-4, 1e-3];

  const hit = (e: string): { ok: boolean; how: string } => {
    // NULL 单元格：gold 结果里的 NULL 渲染成字符串 "null"，但答案用 empty/blank/无… 表述同样正确
    // （2026-09-28 q50 实证：答 "school name = (empty …)" 被判 UNCERTAIN，仅因未写 "null"）
    if (/^(null|none|nil|nan|n\/a|na)$/i.test(e.trim())) {
      return { ok: /(null|none|nil|n\/a|empty|blank|missing|no [a-z ]{0,24}name|无|空|没有)/i.test(finalText), how: "nullish" };
    }
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

// ── 结果集比对（列表题判据）──────────────────────────────────────────
/** 单元格归一：能读成数的按数值规范化（505 与 505.0 同），否则走文本归一 */
export const cellCanon = (v: unknown): string => {
  const s = v === null || v === undefined ? "" : String(v);
  if (/^\s*-?[\d,]+(\.\d+)?\s*$/.test(s)) {
    const n = toNum(s);
    if (Number.isFinite(n)) return String(Number(n.toPrecision(12)));
  }
  return norm(s);
};
/** 结果集规范化为「行字符串 → 计数」的集合（行内列序保持，行序与重复不敏感） */
const rowsToSet = (rows: Record<string, unknown>[]): Set<string> =>
  new Set(rows.map((r) => Object.values(r).map(cellCanon).join(" | ")));

/** 在给定 SQLite 上跑一条只读 SQL，返回原始行 + 列名（失败返回 err） */
export function queryRows(sqlitePath: string, sql: string): { rows?: Record<string, unknown>[]; cols?: string[]; err?: string } {
  if (!sqlitePath || !fs.existsSync(sqlitePath)) return { err: "SQLite 缺失" };
  try {
    const db = new DatabaseSync(sqlitePath, { readOnly: true });
    try {
      const rows = db.prepare(sql).all() as Record<string, unknown>[];
      return { rows, cols: Object.keys(rows[0] ?? {}) };
    } finally {
      db.close();
    }
  } catch (e) {
    return { err: String(e).slice(0, 120) };
  }
}

/** 行集：默认按全列；给 cols 时只投影这些列（按列名对齐——忽略别名/列序差异） */
export const rowSetOf = (rows: Record<string, unknown>[], cols?: string[]): Set<string> =>
  new Set(rows.map((r) => (cols ? cols.map((c) => cellCanon(r[c])) : Object.values(r).map(cellCanon)).join(" | ")));

/** 去掉显示用的尾部 LIMIT（判「生成逻辑」时用） */
export const stripLimit = (sql: string): string | null => {
  const m = sql.match(/\s+limit\s+\d+(\s+offset\s+\d+)?\s*;?\s*$/i);
  return m ? sql.slice(0, m.index) : null;
};

/** 两结果集是否同集（行序/重复不敏感；行内列序敏感——列序不同即不算同集，宁缺勿滥） */
export const sameRowSet = (a: Set<string>, b: Set<string>): boolean => a.size === b.size && [...a].every((x) => b.has(x));

/** 某库的 SQLite 路径（结果集比对用；与 goldValues 同源） */
export const sqliteOf = (db: string): string | undefined => dbPath.get(db);

/**
 * 带超时的结果集查询（**子进程执行**）：agent 的候选 SQL 里可能藏重查询（如无索引的
 * 相关子查询，单条实测 20s+），在主进程同步跑会把 grade 挂死且无法中断 —— 放子进程，
 * 超时即杀，视为「未命中」。SQL 走 stdin（避免 Windows 下引号被拆）。
 */
export function queryRowsTimed(
  sqlitePath: string,
  sql: string,
  timeoutMs = 15000,
): { rows?: Record<string, unknown>[]; cols?: string[]; err?: string } {
  if (!sqlitePath || !fs.existsSync(sqlitePath) || !sql.trim()) return { err: "SQLite 缺失" };
  const script =
    'const {DatabaseSync}=require("node:sqlite");let s="";' +
    'process.stdin.on("data",d=>s+=d).on("end",()=>{try{' +
    'const db=new DatabaseSync(process.argv[1],{readOnly:true});' +
    'const rows=db.prepare(s).all();db.close();' +
    'process.stdout.write(JSON.stringify({cols:rows.length?Object.keys(rows[0]):[],rows}));' +
    '}catch(e){process.stdout.write(JSON.stringify({cols:[],rows:[],err:String(e).slice(0,120)}));}});';
  const r = spawnSync(process.execPath, ["-e", script, sqlitePath], {
    input: sql,
    timeout: timeoutMs,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (r.error || !r.stdout) return { err: r.error ? String(r.error).slice(0, 80) : "无输出" };
  try {
    const j = JSON.parse(r.stdout) as { rows?: Record<string, unknown>[]; cols?: string[]; err?: string };
    return { rows: j.rows ?? [], cols: j.cols ?? [] };
  } catch {
    return { err: "解析失败" };
  }
}

/** gold 正常执行但零行：看 agent 是否也说「没有」 */
export function judgeEmpty(finalText: string): { verdict: string; precision: string } {
  const saysEmpty =
    /(empty list|no (products?|records?|transactions?|results?|countries|purchases)|none|no data|\bempty\b|为空|没有|无(相符|记录|产品|交易))/i.test(
      finalText,
    );
  return { verdict: saysEmpty ? "PASS" : "FAIL", precision: "empty" };
}
