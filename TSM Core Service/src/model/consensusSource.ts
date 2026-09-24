/**
 * L2 共识源读取（**单一来源**：构建器 buildConsensus 与开发态 coverage 共用）
 *
 * 两种源格式都支持（"evidence" 是 BIRD 数据集字段名，**不是**范式术语）：
 *   - knowledge 数组：`[{"kid","knowledge","source_qids"}]` → text = knowledge
 *   - JSONL：`{"qid","question","evidence"}`              → text = evidence
 * 口径与 1.5 线 build_evidence.py:load_topic 一致。
 */
import * as fs from "node:fs";

export interface ConsensusSourceItem {
  /** kid（聚合格式）或 qid（逐题格式） */
  qid: number;
  question: string;
  text: string;
}

export function consensusSourceFormat(file: string): "aggregated" | "per-question" {
  const raw = fs.readFileSync(file, "utf8").trim();
  return raw.startsWith("[") ? "aggregated" : "per-question";
}

export function readConsensusSource(file: string): ConsensusSourceItem[] {
  const raw = fs.readFileSync(file, "utf8").trim();
  if (!raw) return [];
  if (raw.startsWith("[")) {
    const items = JSON.parse(raw) as { kid?: number; knowledge?: string }[];
    return items
      .map((o) => ({ qid: Number(o.kid ?? 0), question: "", text: (o.knowledge ?? "").trim() }))
      .filter((r) => r.text);
  }
  return raw
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as { qid?: number; question?: string; evidence?: string })
    .map((o) => ({ qid: Number(o.qid ?? 0), question: o.question ?? "", text: (o.evidence ?? "").trim() }))
    .filter((r) => r.text);
}
