/**
 * dlr_search_evidence（TS 版）—— 对齐 Python mcp_server._search_evidence + evidence_db.search
 *
 * 返回：{success, namespace, count, results:[{qid, text, question, score}]}
 * score 保留 4 位（与 Python round(...,4) 同口径）；namespace 必填（防跨库串扰）。
 */
import type { LanceStore } from "../store/lance.js";

export interface EvidenceHit {
  qid: number;
  text: string;
  question: string;
  score: number;
}

export async function searchEvidence(
  store: LanceStore,
  namespace: string,
  question: string,
  topK = 5,
): Promise<{ success: boolean; namespace: string; count: number; results: EvidenceHit[] }> {
  const hits = await store.search("evidence", question, {
    where: `namespace = '${namespace.replace(/'/g, "''")}'`,
    limit: topK,
  });
  const results: EvidenceHit[] = hits.map((h) => ({
    qid: Number(h.qid ?? 0),
    text: String(h.text ?? ""),
    question: String(h.question ?? ""),
    score: Math.round(h.score * 10000) / 10000,
  }));
  return { success: true, namespace, count: results.length, results };
}
