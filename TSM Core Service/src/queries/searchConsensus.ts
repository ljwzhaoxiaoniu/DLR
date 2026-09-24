/**
 * L2 领域共识检索（Domain Consensus）—— MCP 工具 `dlr_search_consensus`
 *
 * 返回：{success, namespace, count, results:[{qid, namespace, text, question, score}]}
 * score 保留 4 位（与 Python 线 round(...,4) 同口径）。
 * namespace 留空 = **跨库召回**（与 `dlr_semantic_query` 的 db 留空同口径）——
 *   命中自带 namespace 与它派生的原题 question，用来判断"这条共识是不是本题的库/题的"；
 *   定库后传 namespace 收口（防跨库串扰）。
 * 形状与 1.5 线 `dlr_search_evidence` 一致（那边保留 BIRD 遗留的旧工具名），另加 per-hit namespace。
 */
import type { LanceStore } from "../store/lance.js";

export interface ConsensusHit {
  qid: number;
  namespace: string;
  text: string;
  question: string;
  score: number;
}

export async function searchConsensus(
  store: LanceStore,
  namespace: string,
  question: string,
  topK = 5,
): Promise<{ success: boolean; namespace: string; count: number; results: ConsensusHit[] }> {
  const ns = namespace.trim();
  const hits = await store.search("consensus", question, {
    ...(ns ? { where: `namespace = '${ns.replace(/'/g, "''")}'` } : {}),
    limit: topK,
  });
  const results: ConsensusHit[] = hits.map((h) => ({
    qid: Number(h.qid ?? 0),
    namespace: String(h.namespace ?? ""),
    text: String(h.text ?? ""),
    question: String(h.question ?? ""),
    score: Math.round(h.score * 10000) / 10000,
  }));
  return { success: true, namespace: ns, count: results.length, results };
}
