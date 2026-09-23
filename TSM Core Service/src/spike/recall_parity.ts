/**
 * 检索对齐：TS（LanceDB + TS 查询层）vs Python 服务（同一问题的 dlr_semantic_query 返回）
 *
 * 前置：tmp_scripts/py_semantic_query.json 里是 Python 服务的真值（LE 顺序 + confidence）。
 *      图侧用 stub（返回空），本轮只比对 **LE 选择与排序**（检索半场）。
 * 跑法: npx tsx src/spike/recall_parity.ts ["<question>"]
 */
import * as fs from "node:fs";
import { LanceStore } from "../store/lance.js";
import { dlrSemanticQuery } from "../queries/semanticQuery.js";
import type { GraphQueries } from "../graph/types.js";

const ROOT = "D:/Code_Proj/DLR Proj";
const STORE = `${ROOT}/TSM Core Service/.store/lance/dlr`;
const MODEL = `${ROOT}/tmp_scripts/bge-onnx`;
const PY_JSON = `${ROOT}/tmp_scripts/py_semantic_query.json`;
const Q =
  process.argv[2] ??
  "What is the ratio of customers who pay in EUR against customers who pay in CZK?";

const stubGraph: GraphQueries = {
  async getChildEntityIds() {
    return [];
  },
  async getPhysicalEntityById() {
    return null;
  },
  async getLogicalEntityAttributes() {
    return [];
  },
};

const store = await LanceStore.open(STORE, MODEL);

// 同时打印全量命中里的 LE 明细（score 是 parity 的关键）
const hits = await store.search("entities", Q);
const leHits = hits.filter((h) => h.type === "logical_entity").sort((a, b) => b.score - a.score);
console.log(`[TS] 召回 ${hits.length} 条；LE 命中 ${leHits.length} 条：`);
for (const h of leHits.slice(0, 10)) console.log(`   ${h.score.toFixed(4)}  ${h.id}  (${h.db})`);

const r = await dlrSemanticQuery(store, stubGraph, Q, { topK: 5, threshold: 0.5 });
console.log(`[TS] 选出 ${r.data.structures.length} 个 LE, confidence=${r.confidence}`);

if (fs.existsSync(PY_JSON)) {
  const py = JSON.parse(fs.readFileSync(PY_JSON, "utf8")) as {
    confidence: number;
    data: { structures: { logical_entity_id: string }[] };
  };
  console.log(`[Py] 选出 ${py.data.structures.length} 个 LE, confidence=${py.confidence}`);
  const tsSeq = r.data.structures.map((s) => s.logical_entity_id).join(" | ");
  const pySeq = py.data.structures.map((s) => s.logical_entity_id).join(" | ");
  console.log(`[TS] ${tsSeq}`);
  console.log(`[Py] ${pySeq}`);
  console.log(tsSeq === pySeq ? "✅ LE 选择与顺序完全一致" : "⚠️ LE 序列不同（见上）");
  console.log(
    Math.abs(r.confidence - py.confidence) < 1e-4
      ? `✅ confidence 一致 (${r.confidence} vs ${py.confidence})`
      : `⚠️ confidence 差异: ${r.confidence} vs ${py.confidence}`,
  );
}
