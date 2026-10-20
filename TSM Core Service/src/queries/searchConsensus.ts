/**
 * L2 领域共识检索（Domain Consensus）—— MCP 工具 `dlr_search_consensus`
 *
 * 返回：{success, namespace, count, results:[{qid, namespace, text, question, score}]}
 * score 保留 4 位（与 Python 线 round(...,4) 同口径）。
 * namespace 留空 = **跨库召回**（与 `dlr_semantic_query` 的 db 留空同口径）——
 *   命中自带 namespace 与它派生的原题 question，用来判断"这条共识是不是本题的库/题的"；
 *   定库后传 namespace 收口（防跨库串扰）。
 * 形状与历史 Python 实现 `dlr_search_evidence` 一致（该实现保留 BIRD 遗留的旧工具名），另加 per-hit namespace。
 */
import type { LanceStore } from "../store/lance.js";
import { normalizeSystem } from "./stateModelQuery.js";

export interface ConsensusHit {
  qid: number;
  namespace: string;
  system: string;
  text: string;
  question: string;
  score: number;
}

export async function searchConsensus(
  store: LanceStore,
  namespace: string,
  question: string,
  topK = 5,
  system?: string,
): Promise<{ success: boolean; namespace: string; system: string; count: number; results: ConsensusHit[] }> {
  const ns = namespace.trim();
  const sys = normalizeSystem(system) ?? "";
  const clauses: string[] = [];
  if (ns) clauses.push(`namespace = '${ns.replace(/'/g, "''")}'`);
  if (sys) clauses.push(`(system = '${sys.replace(/'/g, "''")}' OR system = 'shared' OR system = '')`);
  const hits = await store.search("consensus", question, {
    ...(clauses.length ? { where: clauses.join(" AND ") } : {}),
    limit: topK,
  });
  const results: ConsensusHit[] = hits.map((h) => ({
    qid: Number(h.qid ?? 0),
    namespace: String(h.namespace ?? ""),
    system: String(h.system ?? ""),
    text: String(h.text ?? ""),
    question: String(h.question ?? ""),
    score: Math.round(h.score * 10000) / 10000,
  }));
  return { success: true, namespace: ns, system: sys, count: results.length, results };
}
