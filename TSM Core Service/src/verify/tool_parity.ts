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
import { Neo4jGraph } from "../graph/queries.js";
import { dlrSemanticQuery } from "../queries/semanticQuery.js";

import { STORE_DIR as STORE, MODEL_DIR as MODEL, FIXTURES_DIR } from "../config.js";
const PY_JSON = `${FIXTURES_DIR}/py_semantic_query.json`;
const Q =
  process.argv[2] ??
  "What is the ratio of customers who pay in EUR against customers who pay in CZK?";

const store = await LanceStore.open(STORE, MODEL);
const graph = await Neo4jGraph.connect(
  process.env.NEO4J_URI ?? "bolt://localhost:7687",
  process.env.NEO4J_USER ?? "neo4j",
  process.env.NEO4J_PASSWORD ?? "",
);

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

await graph.close();
