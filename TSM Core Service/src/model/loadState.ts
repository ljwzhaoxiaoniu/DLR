/**
 * dlr-state YAML → 向量行。
 * v2（按系统落份：LE=对象 嵌套 PE=观测面 + PAS=调用图）优先；v1（类别级 entities/relations/
 * 症状切片）为过渡形态，同场出现时以 v2 为准（v1 文件迁移后移除）。
 * 源：场景 `sources/configs/DLR/*.yaml` 中 `mapping_type: dlr-state` 的文件。
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

/** id 尾段（LOGICAL.boutique.frontend → frontend；PHYSICAL.boutique.frontend.pods → pods） */
function lastSeg(id: string): string {
  const parts = id.split(".");
  return parts[parts.length - 1];
}

/** v2：LE（logical_entity）+ 观测面 PE（entity）+ PAS（relation）——只有 LE 肩挑召回主线，
 *  PE/PAS 行进检索面供点名/合并（同 dlr 线"召回在 LE 面收口"的降级形态：本形态的题面是症状，
 *  领路在 L2；L1 按对象/面名供给）。 */
function toStateVectorRowsV2(s: StateScenarioYaml): VectorRow[] {
  const ns = s.scenario_name ?? "state";
  const rows: VectorRow[] = [];
  const leName = new Map<string, string>();

  for (const le of s.logical_entities ?? []) {
    leName.set(le.logical_entity_id, le.biz_name);
    const pub = new Map<string, string>();
    for (const pe of le.physical_entities ?? []) {
      for (const a of pe.attributes ?? []) {
        if (a.public && !pub.has(a.name)) pub.set(a.name, a.description ?? "");
      }
    }
    const pubText = [...pub.entries()].map(([n, d]) => `${n} ${d}`).join(" ");
    const desc = le.description ?? "";
    rows.push({
      id: le.logical_entity_id,
      name: le.biz_name,
      type: "logical_entity",
      description: desc,
      db: ns,
      text: `${le.biz_name} ${desc} ${pubText}`.replace(/\s+/g, " ").trim(),
    });
  }

  for (const le of s.logical_entities ?? []) {
    for (const pe of le.physical_entities ?? []) {
      const kind = lastSeg(pe.physical_entity_id);
      const attrs = (pe.attributes ?? []).map((a) => `${a.name} ${a.description ?? ""}`).join(" ");
      const sNote = pe.S ?? "";
      const res = pe.resource ?? "";
      rows.push({
        id: pe.physical_entity_id,
        name: `${le.biz_name} ${kind}`,
        type: "entity",
        description: `${res} | ${sNote}`,
        db: ns,
        text: `${le.biz_name} ${kind} ${res} ${sNote} ${attrs}`.replace(/\s+/g, " ").trim(),
      });
    }
  }

  for (const r of s.pas_relations ?? []) {
    const parts = r.relation_id.split("_TO_");
    if (parts.length !== 2) continue;
    const [fromId, toId] = parts;
    const from = lastSeg(fromId);
    const to = lastSeg(toId);
    const fwd = r.P?.forward?.verb ?? "relates";
    const rev = r.P?.reverse?.verb ?? "relates";
    const fwdCard = r.P?.forward?.cardinality ?? "";
    const revCard = r.P?.reverse?.cardinality ?? "";
    const sNote = r.S ?? "";
    rows.push({
      id: r.relation_id,
      name: r.relation_name ?? "relation",
      type: "relation",
      description: sNote,
      db: ns,
      text: `${from} ${fwd} ${to}；${to} ${rev} ${from}；${from} 和 ${to} 经 ${r.A ?? ""} 关联（${fwdCard} / ${revCard}）`.replace(/\s+/g, " ").trim(),
    });
  }

  return rows;
}

/** 全部向量行（v2 优先；v1 为过渡形态） */
export function toStateVectorRows(s: StateScenarioYaml): VectorRow[] {
  if ((s.logical_entities ?? []).length > 0) return toStateVectorRowsV2(s);

  const ns = s.scenario_name ?? "state";
  const rows: VectorRow[] = [];

  // ── v1 过渡：实体 → 关系 → 症状切片 ──
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
