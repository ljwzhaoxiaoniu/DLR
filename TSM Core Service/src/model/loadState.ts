/**
 * dlr-state YAML → 向量行（非数据库形态：实体 / 关系+观测槽 / 症状切片）
 *
 * 源：场景 `sources/configs/DLR/*.yaml` 中 `mapping_type: dlr-state` 的文件
 * （Cloud-OpsBench 首用；schema 与对齐说明见该场景 modeling-plan 与 yaml 文件尾注）。
 * 与 dlr 线同规：只写源自身事实；schema 级（实例级不入）。
 */
import * as fs from "node:fs";
import { parse } from "yaml";
import type { StateScenarioYaml, VectorRow } from "./types.js";

export function loadStateScenario(path: string): StateScenarioYaml {
  return parse(fs.readFileSync(path, "utf8")) as StateScenarioYaml;
}

/** 展示名口径：LOGICAL.Service → Service（同 loadDlr 的 leName） */
function shortName(id: string): string {
  const i = id.indexOf(".");
  return i === -1 ? id : id.slice(i + 1);
}

/** 全部向量行（顺序：实体 → 关系 → 症状切片） */
export function toStateVectorRows(s: StateScenarioYaml): VectorRow[] {
  const ns = s.scenario_name ?? "state";
  const rows: VectorRow[] = [];

  // ── 1) 实体：LE → logical_entity / PE → entity（沿用 dlr 的 type 词汇，运行时过滤不变）
  for (const e of s.entities ?? []) {
    const name = shortName(e.entity_id);
    const desc = e.description ?? "";
    rows.push({
      id: e.entity_id,
      name,
      type: e.side === "LE" ? "logical_entity" : "entity",
      description: desc,
      db: ns,
      text: `${name} ${desc}`,
    });
  }

  // ── 2) 关系：关系式 + 承载 + 观测槽（工具 → 读哪段）全进文本——
  //     检索面 = "这个状态用什么工具、读输出的哪一段"（方案 §四）
  for (const r of s.relations ?? []) {
    const tools = (r.slot?.tools ?? []).join(" ");
    const read = r.slot?.read ?? "";
    rows.push({
      id: `RELATION.${r.id}`,
      name: r.relation,
      type: "relation",
      description: `${r.class} | ${r.carries ?? ""} | ${read}`,
      db: ns,
      text: `${r.relation} ${r.carries ?? ""} ${read} ${tools}`.replace(/\s+/g, " ").trim(),
    });
  }

  // ── 3) 症状切片：题面模板 → 入口链（含各系统例数）
  (s.symptom_slices ?? []).forEach((sl, i) => {
    const counts = Object.entries(sl.cases ?? {})
      .map(([k, v]) => `${k} ${v}`)
      .join(" ");
    rows.push({
      id: `SLICE.${i + 1}`,
      name: sl.template,
      type: "symptom_slice",
      description: `${sl.entry_chain ?? ""} (${counts})`.trim(),
      db: ns,
      text: `${sl.template} ${sl.entry_chain ?? ""} ${counts}`.replace(/\s+/g, " ").trim(),
    });
  });

  return rows;
}
