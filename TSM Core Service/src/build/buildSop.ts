/**
 * 构建 L3 业务逻辑级 SOP 索引（sop.md → LanceDB：table `sop`）
 *
 * 源：<scenario>/sources/sop.md（**人写开发态真源**，与 DLR yaml / consensus jsonl 并列）。
 * 产物：题面 → 节 的向量索引（运行态），由 `dlr_search_sop` 按题检索——只取命中那一节，
 *       替代原"skills/sop 整文件 47KB 逐轮载入"的传输方式。
 *
 * 解析口径：
 *   `## <库>`             → db 段（首个 `##` 之前是前言，不入索引）
 *   `### When asked: "…"` → 一节；标题即题面原文（判定"是否复述本题"的凭据）
 *   `> **类型**：…` / `> **Expected**：…` → 节的元数据（判定侧口径，随节返回）
 *
 * 跑法: npx tsx src/build/buildSop.ts [--store dir] [--model dir]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import * as lancedb from "@lancedb/lancedb";
import { TextEncoder } from "../embed/encoder.js";
import { SOP_SOURCE, STORE_DIR as DEFAULT_STORE, MODEL_DIR as DEFAULT_MODEL_DIR } from "../config.js";

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const STORE = arg("--store", DEFAULT_STORE);
const MODEL_DIR = arg("--model", DEFAULT_MODEL_DIR);
const TABLE = "sop";

export interface SopRow {
  id: string;
  db: string;
  title: string;
  type: string;
  expected: string;
  text: string;
}

/** sop.md → 节列表（标题 = 题面原文；text = 标题 + 正文，供 embedding 与展示） */
export function parseSop(md: string): SopRow[] {
  const rows: SopRow[] = [];
  let db = "";
  let cur: SopRow | null = null;
  const flush = () => {
    if (cur) {
      rows.push(cur);
      cur = null;
    }
  };
  for (const line of md.split(/\r?\n/)) {
    const h2 = line.match(/^## (.+?)\s*$/);
    if (h2) {
      flush();
      db = h2[1].trim();
      continue;
    }
    const h3 = line.match(/^### When asked:\s*"(.*)"\s*$/);
    if (h3) {
      flush();
      if (!db) continue; // 前言区里的节不索引（没有库归属）
      cur = { id: "", db, title: h3[1], type: "", expected: "", text: "" };
      continue;
    }
    if (!cur) continue;
    const t = line.match(/^>\s*\*\*类型\*\*：(.+?)\s*$/);
    if (t) {
      cur.type = t[1].trim();
      continue;
    }
    const e = line.match(/^>\s*\*\*Expected\*\*：(.+?)\s*$/);
    if (e) {
      cur.expected = e[1].trim();
      continue;
    }
    cur.text += line + "\n";
  }
  flush();
  // id 与 text 定稿：text 带上类型/Expected（检索与展示都用完整节）
  for (const r of rows) {
    r.id = `${r.db}#${r.title}`;
    const meta = [r.type ? `类型：${r.type}` : "", r.expected ? `Expected：${r.expected}` : ""].filter(Boolean).join("；");
    r.text = `${r.title}\n${meta ? meta + "\n" : ""}${r.text.trim()}`;
  }
  return rows;
}

// ── 主流程（直接执行时；被 import 不跑）─────────────────────────────
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const md = fs.readFileSync(SOP_SOURCE, "utf8");
  const rows = parseSop(md);
  const byDb = new Map<string, number>();
  for (const r of rows) byDb.set(r.db, (byDb.get(r.db) ?? 0) + 1);
  console.log(`[sop] ${path.basename(SOP_SOURCE)} → ${rows.length} 节：${[...byDb].map(([d, n]) => `${d}(${n})`).join(" ")}`);

  const encoder = await TextEncoder.load(MODEL_DIR);
  const BATCH = 64;
  const vectors: number[][] = [];
  const t0 = Date.now();
  for (let i = 0; i < rows.length; i += BATCH) vectors.push(...(await encoder.encode(rows.slice(i, i + BATCH).map((r) => r.text))));
  console.log(`[sop] 编码完成 (${Date.now() - t0}ms, ${vectors[0]?.length ?? 0} 维)`);

  fs.mkdirSync(STORE, { recursive: true });
  const db = await lancedb.connect(STORE);
  const data = rows.map((r, i) => ({
    id: r.id,
    db: r.db,
    title: r.title,
    type: r.type,
    expected: r.expected,
    text: r.text,
    vector: vectors[i],
  }));
  const tbl = await db.createTable(TABLE, data, { mode: "overwrite" });
  await tbl.createIndex("text", { config: lancedb.Index.fts() });
  console.log(`[sop] 写入完成：table \`${TABLE}\` ${rows.length} 行（overwrite）+ FTS`);
}
