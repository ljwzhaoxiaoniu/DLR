/**
 * DLR YAML → 向量行（与 Python Semantic Core Service 逐字对齐）
 *
 * 对齐来源：
 *   - mapping/dlr.py            YAML → 模型（public 属性投影到 LE 面、PE name/description 口径）
 *   - service/build_service.py  _build_dlr_vector（写库顺序、db 归属：LE/PAS 用 preset 库名）
 *   - db/vector_db.py           insert_* 的文本公式与 metadata 字段
 */
import * as fs from "node:fs";
import { parse } from "yaml";
import type { DlrScenarioYaml, VectorRow } from "./types.js";

const LOGICAL_PREFIX = "LOGICAL.";

/** "debit_card_specializing.yearmonth" → "debit_card_specializing" */
export function dbFromTableId(tableId: string): string {
  const i = tableId.indexOf(".");
  return i === -1 ? tableId : tableId.slice(0, i);
}

/** LOGICAL.School → School（对齐 Python _extract_le_names_from_id 的展示口径） */
function leName(id: string): string {
  return id.startsWith(LOGICAL_PREFIX) ? id.slice(LOGICAL_PREFIX.length) : id;
}

export function loadDlrScenario(path: string): DlrScenarioYaml {
  return parse(fs.readFileSync(path, "utf8")) as DlrScenarioYaml;
}

/** 全部向量行（顺序对齐 Python 构建：LE → PE → PE 属性 → PAS） */
export function toVectorRows(s: DlrScenarioYaml): VectorRow[] {
  const dbNames = Object.keys(s.databases ?? {});
  const presetDb = dbNames[0] ?? "";
  const rows: VectorRow[] = [];

  // ── 1) LE：public 属性面 = 各 PE 中 public:true 的属性，按 {le_id}.{biz_name} 去重（先出现者胜）
  for (const le of s.logical_entities ?? []) {
    const seen = new Map<string, { name: string; description: string }>();
    for (const pe of le.physical_entities ?? []) {
      for (const a of pe.attributes ?? []) {
        if (!a.public) continue;
        const name = a.biz_name || a.column;
        const key = `${le.logical_entity_id}.${name}`;
        if (!seen.has(key)) seen.set(key, { name, description: a.description ?? "" });
      }
    }
    const publicAttrsText = [...seen.values()]
      .filter((a) => a.description) // 对齐 Python：仅 description 非空的进入文本
      .map((a) => `${a.name} ${a.description}`)
      .join(" ");

    const name = le.biz_name ?? "";
    const desc = le.description ?? "";
    rows.push({
      id: le.logical_entity_id,
      name,
      type: "logical_entity",
      description: desc,
      db: presetDb,
      text: `${name} ${desc} ${publicAttrsText}`, // vector_db.insert_logical_entity
    });
  }

  // ── 2) PE + 3) PE 属性（全部属性都进库；db 取 physical_table_id 前缀）
  for (const le of s.logical_entities ?? []) {
    for (const pe of le.physical_entities ?? []) {
      const peDb = dbFromTableId(pe.physical_table_id);
      const peName = pe.physical_table_name || pe.physical_entity_id; // mapping/dlr.py:129
      const peDesc = pe.S ?? ""; // PE description = ARCS.S
      rows.push({
        id: pe.physical_entity_id,
        name: peName,
        type: "entity",
        description: peDesc,
        db: peDb,
        text: `${peName} ${peDesc}`,
      });
      for (const a of pe.attributes ?? []) {
        const name = a.biz_name || a.column;
        const desc = a.description ?? "";
        rows.push({
          id: a.column,
          name,
          type: "attribute",
          description: desc,
          db: peDb,
          text: `${name} ${desc}`,
        });
      }
    }
  }

  // ── 4) PAS：文本 = compile_vector_text()（semantic_models.py:136）
  for (const pas of s.pas_relations ?? []) {
    const [fromRaw, toRaw] = pas.relation_id.split("_TO_");
    const from = leName(fromRaw ?? "");
    const to = leName(toRaw ?? "");
    const p = pas.P ?? {};
    const fwd = typeof p.forward === "object" ? p.forward : undefined;
    const rev = typeof p.reverse === "object" ? p.reverse : undefined;
    const parts: string[] = [];
    if (fwd) parts.push(`1个${from}${fwd.verb ?? ""}${fwd.cardinality ?? ""}个${to}`);
    if (rev) parts.push(`1个${to}${rev.verb ?? ""}${rev.cardinality ?? ""}个${from}`);
    parts.push(`${from}和${to}通过${pas.A ?? ""}关联`);
    if (pas.S) parts.push(pas.S);
    const text = parts.join("；");
    rows.push({
      id: pas.relation_id,
      name: pas.relation_name ?? "",
      type: "pas_relation",
      description: text, // Python 侧把 vector_text 存进 description
      db: presetDb,
      text,
      from_le_id: fromRaw,
      to_le_id: toRaw,
      A_attribute: pas.A ?? "",
    });
  }

  return rows;
}
