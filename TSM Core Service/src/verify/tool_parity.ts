/**
 * 工具输出级对齐：TS 全链路（LanceDB + Neo4j）vs Python 服务真值
 *
 * 前置：
 *   1) Python 真值：tmp_scripts/py_semantic_query.json（dlr_semantic_query 的完整返回）
 *   2) Neo4j 已装载（npx tsx src/graph/loadNeo4j.ts --all）
 * 跑法: npx tsx src/spike/tool_parity.ts ["<question>"]
 */
import * as fs from "node:fs";
import { LanceStore } from "../store/lance.js";
import { openGraph } from "../graph/backend.js";
import { dlrSemanticQuery } from "../queries/semanticQuery.js";

import { STORE_DIR as STORE, MODEL_DIR as MODEL, FIXTURES_DIR } from "../config.js";
const PY_JSON = `${FIXTURES_DIR}/py_semantic_query.json`;
const Q =
  process.argv[2] ??
  "What is the ratio of customers who pay in EUR against customers who pay in CZK?";

const store = await LanceStore.open(STORE, MODEL);
const graph = await openGraph(); // 按 TSM_GRAPH_BACKEND 选后端（auto/内存/Neo4j）

const ts = await dlrSemanticQuery(store, graph, Q, { topK: 5, threshold: 0.5 });
const py = JSON.parse(fs.readFileSync(PY_JSON, "utf8")) as typeof ts;

type S = (typeof ts)["data"]["structures"][number];
const norm = (s: S) =>
  JSON.stringify({
    id: s.logical_entity_id,
    name: s.name,
    description: s.description,
    db: s.db,
    pes: s.physical_entities.map((p) => [p.physical_entity_id, p.pe_name, p.db, p.description]),
    attrs: s.public_attributes.map((a) => [a.name, a.description]),
  });

console.log(`TS structures=${ts.data.structures.length} confidence=${ts.confidence}`);
console.log(`Py structures=${py.data.structures.length} confidence=${py.confidence}`);

for (let i = 0; i < Math.max(ts.data.structures.length, py.data.structures.length); i++) {
  const a = ts.data.structures[i];
  const b = py.data.structures[i];
  if (!a || !b) {
    console.log(`  [${i}] 结构数量不同`);
    continue;
  }
  const ok = norm(a) === norm(b);
  console.log(`  [${i}] ${a.logical_entity_id}  ${ok ? "✅ 逐字段一致" : "⚠️ 不一致"}`);
  if (!ok) {
    console.log(`      TS: ${norm(a).slice(0, 300)}`);
    console.log(`      Py: ${norm(b).slice(0, 300)}`);
  }
}

// 位置无关的逐实体对账：召回排序会随库内新增 LE 变化（位置比对会误报），按 id 配对才反映"字段是否一致"
{
  const byId = (arr: S[]) => new Map(arr.map((s) => [s.logical_entity_id, s]));
  const t = byId(ts.data.structures);
  const p = byId(py.data.structures);
  const bad: string[] = [];
  for (const [id, sa] of t) {
    const sb = p.get(id);
    if (!sb) { bad.push(`${id}（仅 TS 命中，Py 无）`); continue; }
    if (norm(sa) !== norm(sb)) bad.push(`${id}（两边都有但字段不同）`);
  }
  for (const id of p.keys()) if (!t.has(id)) bad.push(`${id}（仅 Py 命中，TS 无）`);
  console.log(bad.length ? `按 id 对账：⚠️ ${bad.length} 处 → ${bad.join("; ")}` : "按 id 对账：✅ 两边命中的实体逐字段一致");
}

await graph.close();
