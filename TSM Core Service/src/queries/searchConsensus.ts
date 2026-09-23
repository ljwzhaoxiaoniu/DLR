/**
 * L2 领域共识检索（Domain Consensus）—— MCP 工具 `dlr_search_consensus`
 *
 * 返回：{success, namespace, count, results:[{qid, text, question, score}]}
 * score 保留 4 位（与 Python 线 round(...,4) 同口径）；namespace 必填（防跨库串扰）。
 * 形状与 Python 线 `dlr_search_evidence` 一致（Python 线保留旧工具名）。
 */
import type { LanceStore } from "../store/lance.js";

export interface ConsensusHit {
  qid: number;
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
  const hits = await store.search("consensus", question, {
    where: `namespace = '${namespace.replace(/'/g, "''")}'`,
    limit: topK,
  });
  const results: ConsensusHit[] = hits.map((h) => ({
    qid: Number(h.qid ?? 0),
    text: String(h.text ?? ""),
    question: String(h.question ?? ""),
    score: Math.round(h.score * 10000) / 10000,
  }));
  return { success: true, namespace, count: results.length, results };
}
