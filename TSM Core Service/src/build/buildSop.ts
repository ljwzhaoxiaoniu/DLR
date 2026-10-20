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
  /** 作用域：shared（两系统共用一节）| boutique | trainticket */
  system: string;
  title: string;
  type: string;
  expected: string;
  text: string;
}

/** 系统名归一（与 L1 entities.db 同口径） */
function normSystem(s: string): string {
  const v = s.trim().toLowerCase();
  if (v === "train-ticket" || v === "trainticket") return "trainticket";
  if (v === "online-boutique" || v === "onlineboutique" || v === "boutique") return "boutique";
  return v || "shared";
}

interface Segment {
  system: string;
  lines: string[];
}

interface CurSection {
  title: string;
  /** 节级声明：本节应产出哪些系统的行（`> **Systems**: boutique, trainticket`） */
  systems: string[];
  type: string;
  expected: string;
  segments: Segment[];
}

/**
 * sop.md → 节列表（标题 = 题面原文；text = 标题 + 正文，供 embedding 与展示）
 *
 * 可选系统标记（同一份源，按系统生成不同的索引行；不复制正文）：
 *   `> **Systems**: boutique, trainticket`  节级：本节对哪些系统生效（shared = 两系统共用一节）
 *   `> **System**: boutique`                段级：后续正文只属于该系统；下一段再切回 shared/另一系统
 * 无标记 → 单条 shared 行（向后兼容）。同一标题在不同系统各生成一行，id 带 system 去重。
 */
export function parseSop(md: string): SopRow[] {
  const rows: SopRow[] = [];
  let db = "";
  let cur: CurSection | null = null;

  const flush = () => {
    if (!cur) return;
    const specific = [...new Set(cur.segments.map((s) => s.system))].filter((s) => s !== "shared");
    const targets = cur.systems.length ? cur.systems : specific.length ? specific : ["shared"];
    for (const system of targets) {
      const body = cur.segments
        .filter((s) => s.system === "shared" || s.system === system)
        .map((s) => s.lines.join("\n"))
        .filter((t) => t.trim())
        .join("\n")
        .trim();
      const meta = [
        `System：${system}`,
        cur.type ? `类型：${cur.type}` : "",
        cur.expected ? `Expected：${cur.expected}` : "",
      ].filter(Boolean).join("；");
      rows.push({
        id: `${db}#${system}#${cur.title}`,
        db,
        system,
        title: cur.title,
        type: cur.type,
        expected: cur.expected,
        text: `${cur.title}\n${meta}\n${body}`,
      });
    }
    cur = null;
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
      cur = { title: h3[1], systems: [], type: "", expected: "", segments: [{ system: "shared", lines: [] }] };
      continue;
    }
    if (!cur) continue;

    const systemsLine = line.match(/^>\s*\*\*Systems\*\*[:：]\s*(.+?)\s*$/i);
    if (systemsLine) {
      cur.systems = systemsLine[1].split(/[,，]/).map(normSystem).filter(Boolean);
      continue;
    }
    const systemLine = line.match(/^>\s*\*\*System\*\*[:：]\s*(.+?)\s*$/i);
    if (systemLine) {
      const system = normSystem(systemLine[1]);
      const last = cur.segments[cur.segments.length - 1];
      if (last && last.lines.every((l) => !l.trim())) last.system = system;
      else cur.segments.push({ system, lines: [] });
      continue;
    }
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
    cur.segments[cur.segments.length - 1].lines.push(line);
  }
  flush();
  return rows;
}

// ── 主流程（直接执行时；被 import 不跑）─────────────────────────────
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (isMain) {
  const md = fs.readFileSync(SOP_SOURCE, "utf8");
  const rows = parseSop(md);
  const byDb = new Map<string, number>();
  const bySys = new Map<string, number>();
  for (const r of rows) {
    byDb.set(r.db, (byDb.get(r.db) ?? 0) + 1);
    bySys.set(r.system, (bySys.get(r.system) ?? 0) + 1);
  }
  console.log(
    `[sop] ${path.basename(SOP_SOURCE)} → ${rows.length} 节：${[...byDb].map(([d, n]) => `${d}(${n})`).join(" ")}` +
      ` · systems ${[...bySys].map(([s, n]) => `${s}(${n})`).join(" ")}`,
  );

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
    system: r.system,
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
