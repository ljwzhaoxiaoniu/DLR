/**
 * 图后端选择：`TSM_GRAPH_BACKEND` = `auto`（默认）| `memory` | `neo4j`
 *
 *  · `memory` —— 进程内内存图：零依赖、零锁、零服务（"零服务"形态）
 *  · `neo4j`  —— 显式要求 Neo4j（未配 NEO4J_URI 或连不上即抛错）
 *  · `auto`   —— **配了 `NEO4J_URI` 才尝试 Neo4j**；连接失败回落内存图并记 `fallback_reason`
 *
 * ⚠ 仓库内 `TSM Core Service/.env` 配了 `NEO4J_URI` → auto 仍走 Neo4j——
 *   500 题评测口径不变；不想要 Neo4j 时显式设 `TSM_GRAPH_BACKEND=memory` 或清空 NEO4J_URI。
 */
import { InMemoryGraph } from "./memory.js";
import { Neo4jGraph } from "./queries.js";
import type { GraphHandle } from "./types.js";

export async function openGraph(): Promise<GraphHandle> {
  const mode = process.env.TSM_GRAPH_BACKEND ?? "auto";
  const uri = process.env.NEO4J_URI;
  const user = process.env.NEO4J_USER ?? "neo4j";
  const pass = process.env.NEO4J_PASSWORD ?? "";

  if (mode === "memory") return InMemoryGraph.load();

  if (mode === "neo4j") {
    if (!uri) throw new Error("TSM_GRAPH_BACKEND=neo4j，但未配置 NEO4J_URI");
    return Neo4jGraph.connect(uri, user, pass);
  }

  if (uri) {
    try {
      return await Neo4jGraph.connect(uri, user, pass);
    } catch (e) {
      // 回落内存图：语义层查询不因此中断；原因记录在 /status 里供排查。
      // ⚠ 回落对进程生命周期**粘住**（视为成功），Neo4j 恢复后重启服务即切回 Cypher。
      const g = await InMemoryGraph.load();
      g.fallback_reason = String(e);
      console.error(`[graph] Neo4j 连接失败，已回落内存图（重启服务可在 Neo4j 恢复后切回）：${String(e).slice(0, 160)}`);
      return g;
    }
  }
  return InMemoryGraph.load();
}
