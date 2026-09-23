/**
 * dlr_semantic_query（TS 版）—— 逐行对齐 Python mcp_server.py:553-609
 *
 * 口径：
 *  1) 全量召回（不截断）→ 取 logical_entity（按 score 降序）
 *  2) 阈值只作优先：score >= threshold 的先取；不足 top_k 时用其余按序补满
 *  3) 每个 LE 组装 {LE id/name/description/db, 下属 PE(id/pe_name/db/S 语义), 公开属性(name/description)}
 *  4) confidence = 所选 LE 的最高分（round 4 位）
 *
 * ⚠ 不含物理表名与 database_url（那是 get_pe_mapping 第二跳的职责，刻意的信息分层）。
 */
import type { LanceStore } from "../store/lance.js";
import type { GraphQueries } from "../graph/types.js";

export interface SemanticStructure {
  logical_entity_id: string;
  name: string;
  description: string;
  db: string;
  physical_entities: { physical_entity_id: string; pe_name: string; db: string; description: string }[];
  public_attributes: { name: string; description: string }[];
}

export interface SemanticQueryResult {
  success: boolean;
  confidence: number;
  data: { structures: SemanticStructure[] };
  message?: string;
}

export async function dlrSemanticQuery(
  store: LanceStore,
  graph: GraphQueries,
  question: string,
  opts: { topK?: number; threshold?: number; db?: string } = {},
): Promise<SemanticQueryResult> {
  const topK = opts.topK ?? 5;
  const threshold = opts.threshold ?? 0.5;

  // 1) 全量召回（对齐 2026-09-16 的"先收口后截断"）
  const results = await store.search("entities", question, { db: opts.db || undefined });
  const leAll = results
    .filter((r) => r.type === "logical_entity")
    .sort((a, b) => b.score - a.score);

  // 2) 阈值优先 + 补满
  const above = leAll.filter((r) => r.score >= threshold);
  const rest = leAll.filter((r) => r.score < threshold);
  const selected = above.length >= topK ? above.slice(0, topK) : above.concat(rest).slice(0, topK);

  // 3) 组装 structures
  const structures: SemanticStructure[] = [];
  for (const r of selected) {
    const leId = r.id ?? "";
    const childPeIds = await graph.getChildEntityIds(leId);
    const pes: SemanticStructure["physical_entities"] = [];
    for (const peId of childPeIds) {
      const pe = await graph.getPhysicalEntityById(peId);
      if (!pe) continue;
      pes.push({
        physical_entity_id: peId,
        pe_name: pe.name,
        db: (pe.physical_table_id || "").split(".")[0],
        description: pe.arcs.S_semantic4arcs || pe.description || "",
      });
    }
    const attrs = await graph.getLogicalEntityAttributes(leId);
    structures.push({
      logical_entity_id: leId,
      name: r.name ?? "",
      description: r.description ?? "",
      db: r.db ?? "",
      physical_entities: pes,
      public_attributes: attrs.map((a) => ({ name: a.name, description: a.description })),
    });
  }

  const maxScore = selected.length ? Math.max(...selected.map((r) => r.score)) : 0;
  return {
    success: true,
    confidence: Math.round(maxScore * 10000) / 10000,
    data: { structures },
  };
}
