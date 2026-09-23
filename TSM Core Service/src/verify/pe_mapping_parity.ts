/**
 * get_pe_mapping 对齐：TS（Neo4j + YAML db 映射）vs Python 服务真值
 * 前置：tmp_scripts/py_pe_mapping.json
 * 跑法: npx tsx src/spike/pe_mapping_parity.ts ["PHYSICAL.YearMonth"]
 */
import * as fs from "node:fs";
import { Neo4jGraph } from "../graph/queries.js";
import { getPeMapping } from "../queries/peMapping.js";

import { FIXTURES_DIR } from "../config.js";
const peId = process.argv[2] ?? "PHYSICAL.YearMonth";

const g = await Neo4jGraph.connect(
  process.env.NEO4J_URI ?? "bolt://localhost:7687",
  process.env.NEO4J_USER ?? "neo4j",
  process.env.NEO4J_PASSWORD ?? "",
);
const ts = await getPeMapping(g, peId);
await g.close();

const py = JSON.parse(fs.readFileSync(`${FIXTURES_DIR}/py_pe_mapping.json`, "utf8"));
const a = JSON.stringify(ts);
const b = JSON.stringify(py);
console.log(`pe_id=${peId}`);
if (a === b) {
  console.log("✅ 完全一致（含 database_url）");
  console.log("   " + a.slice(0, 400));
} else {
  console.log("TS:", a.slice(0, 700));
  console.log("Py:", b.slice(0, 700));
}
