/**
 * 构建 L2 证据表（LanceDB：table `evidence`）—— 对齐 Python build_evidence.py + evidence_db.py
 *
 * 源：rag_knowledge/<topic>.jsonl，两种格式都支持：
 *   - knowledge 数组: [{"kid", "knowledge", "source_qids"}]  → 只 embed knowledge
 *   - JSONL:          {"qid","question","evidence"}          → 只 embed evidence
 * namespace = 文件名（库名）；检索时按 namespace 过滤（防跨库串扰）。
 *
 * 跑法: npx tsx src/build/buildEvidence.ts [--topics a,b] [--store dir] [--model dir]
 */
import * as fs from "node:fs";
import * as path from "node:path";
import * as lancedb from "@lancedb/lancedb";
import { TextEncoder } from "../embed/encoder.js";

const ROOT = "D:/Code_Proj/DLR Proj";
const KNOWLEDGE_DIR = `${ROOT}/rag_knowledge`;

function arg(name: string, fallback: string): string {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const STORE = arg("--store", `${ROOT}/TSM Core Service/.store/lance/dlr`);
const MODEL_DIR = arg("--model", process.env.TSM_MODEL_DIR ?? `${ROOT}/tmp_scripts/bge-onnx`);
const TOPICS = arg("--topics", "")
  ? arg("--topics", "").split(",").map((s) => s.trim()).filter(Boolean)
  : fs.readdirSync(KNOWLEDGE_DIR).filter((f) => f.endsWith(".jsonl")).map((f) => f.replace(/\.jsonl$/, "")).sort();

interface Rec {
  namespace: string;
  qid: number;
  question: string;
  text: string;
}

/** 与 build_evidence.py:load_topic 同口径 */
function loadTopic(file: string, namespace: string): Rec[] {
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    const items = JSON.parse(raw) as { kid?: number; knowledge?: string }[];
    return items
      .map((o) => ({ namespace, qid: Number(o.kid ?? 0), question: "", text: (o.knowledge ?? "").trim() }))
      .filter((r) => r.text);
  }
  return raw
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as { qid?: number; question?: string; evidence?: string })
    .map((o) => ({ namespace, qid: Number(o.qid ?? 0), question: o.question ?? "", text: (o.evidence ?? "").trim() }))
    .filter((r) => r.text);
}

const records: Rec[] = [];
for (const topic of TOPICS) {
  const f = path.join(KNOWLEDGE_DIR, `${topic}.jsonl`);
  if (!fs.existsSync(f)) {
    console.warn(`  [skip] 无文件: ${f}`);
    continue;
  }
  const rs = loadTopic(f, topic);
  records.push(...rs);
  console.log(`  ${topic}: ${rs.length} 条`);
}
console.log(`[evidence] 共 ${records.length} 条，开始编码…`);

const encoder = await TextEncoder.load(MODEL_DIR);
const BATCH = 64;
const vectors: number[][] = [];
const t0 = Date.now();
for (let i = 0; i < records.length; i += BATCH) {
  vectors.push(...(await encoder.encode(records.slice(i, i + BATCH).map((r) => r.text))));
}
console.log(`[evidence] 编码完成 (${Date.now() - t0}ms, ${vectors[0]?.length ?? 0} 维)`);

fs.mkdirSync(STORE, { recursive: true });
const db = await lancedb.connect(STORE);
const data = records.map((r, i) => ({ ...r, vector: vectors[i] }));
const tbl = await db.createTable("evidence", data, { mode: "overwrite" });
await tbl.createIndex("text", { config: lancedb.Index.fts() });
console.log(`[evidence] 写入 ${STORE} 表 evidence: ${await tbl.countRows()} 行`);
