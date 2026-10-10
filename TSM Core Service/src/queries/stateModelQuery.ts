/**
 * dlr-state 模型检索（服务路径）：症状 / 问题文本 → 模型切片
 *
 * 返回三组，组内按 score 降序：
 *   - symptom_slices：题面模板 → 入口链（走哪条链）
 *   - relations：关系 + 观测槽（工具 → 读哪段）
 *   - entities：实体（LE / PE 种类）
 *
 * 口径同 dlr_semantic_query（semanticQuery.ts）：全量召回 → 各组阈值优先 + 补满（每组至多 topK）。
 * 召回走 LanceDB `entities` 表（loadState 写入）；明细每次从场景 YAML 回填——**源即真相**，
 * 改源 rebuild 后即生效（不缓存）。
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { parse } from "yaml";
import type { LanceHit, LanceStore } from "../store/lance.js";
import type { StateScenarioYaml } from "../model/types.js";
import { buildStateBatch } from "../model/graphData.js";
import { YAML_DIR } from "../config.js";

export interface StateModelSliceResult {
  success: boolean;
  confidence: number;
  data: {
    symptom_slices: { id: string; template: string; entry_chain: string; score: number }[];
    relations: {
      id: string;
      class: string;
      relation: string;
      carries: string;
      tools: string[];
      read: string;
      entities: string[];
      score: number;
    }[];
    entities: { id: string; name: string; side: string; description: string; score: number }[];
  };
}

type Row = Record<string, unknown>;

/** 场景 YAML（dlr-state 文件）→ 明细索引（id → 行）；每次调用重建（40 行级，开销可忽略） */
function loadIndex() {
  const rels = new Map<string, Row>();
  const slices = new Map<string, Row>();
  const ents = new Map<string, Row>();
  for (const f of fs.readdirSync(YAML_DIR).filter((f) => f.endsWith(".yaml"))) {
    const sc = parse(fs.readFileSync(path.join(YAML_DIR, f), "utf8")) as StateScenarioYaml | { mapping_type?: string };
    if (sc.mapping_type !== "dlr-state") continue;
    const b = buildStateBatch(sc as StateScenarioYaml);
    for (const r of b.rels) rels.set(r.id as string, r);
    for (const r of b.slices) slices.set(r.id as string, r);
    for (const r of [...b.les, ...b.pes]) ents.set(r.id as string, r);
  }
  return { rels, slices, ents };
}

/** 阈值优先 + 补满（同 semanticQuery 口径） */
function pick(hits: LanceHit[], topK: number, threshold: number): LanceHit[] {
  const above = hits.filter((h) => h.score >= threshold);
  const rest = hits.filter((h) => h.score < threshold);
  return (above.length >= topK ? above : above.concat(rest)).slice(0, topK);
}

const round4 = (n: number) => Math.round(n * 10000) / 10000;

export async function stateModelQuery(
  store: LanceStore,
  question: string,
  opts: { topK?: number; threshold?: number } = {},
): Promise<StateModelSliceResult> {
  const topK = opts.topK ?? 5;
  const threshold = opts.threshold ?? 0.5;

  const hits = (await store.search("entities", question)).sort((a, b) => b.score - a.score);
  const idx = loadIndex();

  const sliceHits = pick(hits.filter((h) => h.type === "symptom_slice"), topK, threshold);
  const relHits = pick(hits.filter((h) => h.type === "relation"), topK, threshold);
  const entHits = pick(hits.filter((h) => h.type === "entity" || h.type === "logical_entity"), topK, threshold);

  const data: StateModelSliceResult["data"] = {
    symptom_slices: sliceHits.map((h) => {
      const r = idx.slices.get(h.id ?? "");
      return {
        id: h.id ?? "",
        template: (r?.template as string) ?? h.name ?? "",
        entry_chain: (r?.entry_chain as string) ?? h.description ?? "",
        score: round4(h.score),
      };
    }),
    relations: relHits.map((h) => {
      const r = idx.rels.get(h.id ?? "");
      return {
        id: h.id ?? "",
        class: (r?.class as string) ?? "",
        relation: (r?.relation as string) ?? h.name ?? "",
        carries: (r?.carries as string) ?? "",
        tools: String(r?.slot_tools ?? "").split(" ").filter(Boolean),
        read: (r?.slot_read as string) ?? "",
        entities: (r?.entities as string[]) ?? [],
        score: round4(h.score),
      };
    }),
    entities: entHits.map((h) => {
      const r = idx.ents.get(h.id ?? "");
      return {
        id: h.id ?? "",
        name: (r?.name as string) ?? h.name ?? "",
        side: (h.id ?? "").startsWith("LOGICAL.") ? "LE" : "PE",
        description: (r?.description as string) ?? h.description ?? "",
        score: round4(h.score),
      };
    }),
  };

  const selected = [...sliceHits, ...relHits, ...entHits];
  const confidence = selected.length ? round4(Math.max(...selected.map((h) => h.score))) : 0;
  return { success: true, confidence, data };
}
