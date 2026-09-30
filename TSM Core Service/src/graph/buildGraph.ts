/**
 * tsm build graph —— 按**当前图后端**构建/自检图。
 *
 *  · 后端 = neo4j（TSM_GRAPH_BACKEND=neo4j，或 auto 且配了 NEO4J_URI）→ 走 loadNeo4j 写入
 *  · 后端 = memory（零服务）→ 内存图是进程内构建、无持久化，**无需"构建"**：
 *      做一次自检（YAML → 图，打印 LE/PE/PA/PAS）并正常退出（exit 0，保证 `build all` 绿）
 *
 * 说明：自检计数与 /status、memory_graph_parity 同口径（MERGE 语义重放）。
 */
import { InMemoryGraph } from "./memory.js";

const mode = process.env.TSM_GRAPH_BACKEND ?? "auto";
const wantsNeo4j = mode === "neo4j" || (mode === "auto" && process.env.NEO4J_URI);

if (wantsNeo4j) {
  await import("./loadNeo4j.js"); // 顶层脚本（argv 透传：--all / <db> / --wipe）
} else {
  const t0 = Date.now();
  const g = await InMemoryGraph.load();
  const nodes = await g.labelCounts();
  const rels = await g.relationshipCounts();
  console.log(
    `[graph] 后端=memory（零服务）自检通过 (${Date.now() - t0}ms)：` +
      `LE ${nodes.LogicalEntity} / PE ${nodes.PhysicalEntity} / PA ${nodes.PhysicalAttribute} / PAS ${rels.PAS_RELATED_TO ?? 0}`,
  );
  console.log("[graph] 内存图为进程内构建、无持久化（无需 --wipe）；需要 Neo4j 时设 TSM_GRAPH_BACKEND=neo4j 或 NEO4J_URI");
  await g.close();
}
