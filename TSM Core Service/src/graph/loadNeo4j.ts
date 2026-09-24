/**
 * DLR YAML → Neo4j 图（对齐 Python 侧 Kuzu 图 schema 与字段口径）
 *
 * 节点：LogicalEntity / PhysicalEntity / PhysicalAttribute / LogicalAttribute
 * 关系：HAS_LOGICAL_ATTRIBUTE（LE→LA）/ HAS_PHYSICAL_ATTRIBUTE（PE→PA）
 *       INHERITS（PE→LE）/ PAS_RELATED_TO（LE→LE）
 *
 * 口径要点：
 *  - PE.arcs_c（C_column）= 该 PE 的 public 属性重建的 {LE属性名: 全限定列名}（同 mapping/dlr.py）
 *  - PhysicalAttribute.data_type = PRAGMA table_info 的声明类型（同 physical_scanner.py）
 *
 * 跑法:
 *   npx tsx src/graph/loadNeo4j.ts --all [--wipe] [--uri ...] [--user ...] [--pass ...]
 *   npx tsx src/graph/loadNeo4j.ts debit_card_specializing [--wipe]
 * 凭据默认从 TSM Core Service/.env 读（NEO4J_URI / NEO4J_USER / NEO4J_PASSWORD）。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import neo4j, { type Session } from "neo4j-driver";
import { buildBatch, readScenario, type Batch } from "../model/graphData.js";

import { YAML_DIR } from "../config.js";
function arg(name: string, fallback = ""): string {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const URI = arg("--uri", process.env.NEO4J_URI ?? "bolt://localhost:7687");
const USER = arg("--user", process.env.NEO4J_USER ?? "neo4j");
const PASS = arg("--pass", process.env.NEO4J_PASSWORD ?? "");
const WIPE = process.argv.includes("--wipe");
const WANT_ALL = process.argv.includes("--all");
const DBS = WANT_ALL
  ? fs.readdirSync(YAML_DIR).filter((f) => f.endsWith(".yaml")).map((f) => f.replace(/\.yaml$/, ""))
  : process.argv.slice(2).filter((a) => !a.startsWith("--") && !a.includes("/") && !a.includes("\\"));

if (DBS.length === 0) {
  console.error("用法: npx tsx src/graph/loadNeo4j.ts --all | <db名> [--wipe] [--uri ...] [--user ...] [--pass ...]");
  process.exit(1);
}
if (!PASS) {
  console.error("缺少 Neo4j 密码：填 TSM Core Service/.env 或传 --pass");
  process.exit(1);
}

async function ensureConstraints(s: Session) {
  for (const l of ["LogicalEntity", "LogicalAttribute", "PhysicalEntity", "PhysicalAttribute"]) {
    await s.run(`CREATE CONSTRAINT ${l.toLowerCase()}_id IF NOT EXISTS FOR (n:${l}) REQUIRE n.id IS UNIQUE`);
  }
}

async function writeBatch(s: Session, b: Batch) {
  const run = (cypher: string, rows: Record<string, unknown>[]) =>
    rows.length ? s.run(cypher, { rows }) : Promise.resolve(null);
  await run(
    `UNWIND $rows AS r MERGE (n:LogicalEntity {id: r.id})
     SET n.name=r.name, n.description=r.description, n.db=r.db`, b.les);
  await run(
    `UNWIND $rows AS r MERGE (n:LogicalAttribute {id: r.id})
     SET n.name=r.name, n.description=r.description, n.ord=r.ord
     WITH r, n MATCH (le:LogicalEntity {id: r.le_id})
     MERGE (le)-[rel:HAS_LOGICAL_ATTRIBUTE]->(n)
     SET rel.ord=r.ord`, b.las);
  await run(
    `UNWIND $rows AS r MERGE (n:PhysicalEntity {id: r.id})
     SET n.name=r.name, n.description=r.description, n.table_id=r.table_id, n.db=r.db,
         n.arcs_a=r.arcs_a, n.arcs_r=r.arcs_r, n.arcs_c=r.arcs_c, n.arcs_s=r.arcs_s`, b.pes);
  await run(
    `UNWIND $rows AS r MERGE (n:PhysicalAttribute {id: r.id})
     SET n.name=r.name, n.description=r.description, n.column_id=r.column_id,
         n.data_type=r.data_type, n.db=r.db, n.ord=r.ord
     WITH r, n MATCH (pe:PhysicalEntity {id: r.pe_id})
     MERGE (pe)-[rel:HAS_PHYSICAL_ATTRIBUTE]->(n)
     SET rel.ord=r.ord`, b.pas);
  await run(
    `UNWIND $rows AS r MATCH (pe:PhysicalEntity {id: r.pe_id}), (le:LogicalEntity {id: r.le_id})
     MERGE (pe)-[rel:INHERITS]->(le)
     SET rel.ord=r.ord`, b.inherits);
  await run(
    `UNWIND $rows AS r MATCH (a:LogicalEntity {id: r.from}), (b:LogicalEntity {id: r.to})
     MERGE (a)-[rel:PAS_RELATED_TO {relation_id: r.id}]->(b)
     SET rel.name=r.name, rel.forward_verb=r.forward_verb, rel.forward_cardinality=r.forward_cardinality,
         rel.reverse_verb=r.reverse_verb, rel.reverse_cardinality=r.reverse_cardinality,
         rel.a_attribute=r.a_attribute, rel.s_semantic=r.s_semantic, rel.db=r.db`, b.pasRels);
}

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASS));
await driver.verifyConnectivity();
const session = driver.session();
try {
  await ensureConstraints(session);
  if (WIPE) {
    await session.run("MATCH (n) DETACH DELETE n");
    console.log("[graph] 已清空全部节点");
  }
  const t0 = Date.now();
  const total = { le: 0, la: 0, pe: 0, pa: 0, pas: 0 };
  for (const dbName of DBS) {
    const p = path.join(YAML_DIR, `${dbName}.yaml`);
    if (!fs.existsSync(p)) {
      console.warn(`  [skip] 无 YAML: ${dbName}`);
      continue;
    }
    const { sc, colTypes } = readScenario(dbName);
    const b = buildBatch(sc, colTypes);
    await writeBatch(session, b);
    total.le += b.les.length; total.la += b.las.length; total.pe += b.pes.length;
    total.pa += b.pas.length; total.pas += b.pasRels.length;
    console.log(
      `  ${dbName}: LE ${b.les.length} / LA ${b.las.length} / PE ${b.pes.length} / PA ${b.pas.length} / PAS ${b.pasRels.length} (colTypes ${colTypes.size})`,
    );
  }
  const cnt = await session.run("MATCH (n) RETURN labels(n)[0] AS l, count(*) AS c ORDER BY l");
  console.log(`[graph] 写入完成 (${Date.now() - t0}ms) 合计 LE ${total.le} LA ${total.la} PE ${total.pe} PA ${total.pa} PAS ${total.pas}`);
  for (const r of cnt.records) console.log(`   ${r.get("l")}: ${r.get("c")}`);
} finally {
  await session.close();
  await driver.close();
}
