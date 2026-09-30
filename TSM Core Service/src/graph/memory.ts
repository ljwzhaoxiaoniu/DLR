/**
 * 进程内内存图 —— 默认图后端（"零服务"：不依赖 Neo4j、零锁、只读）。
 *
 * 口径：**逐行重放 `loadNeo4j.writeBatch` 的 MERGE 语义**——节点按 id 归并、
 * 属性后写覆盖；关系按（两端 + 关系）归并、`ord` 后写覆盖。这样两后端逐字段同构，
 * 由 `src/verify/memory_graph_parity.ts` 对 11 库做深比较把关。
 *
 * 数据来源与 Neo4j 完全一致：scenario YAML → `buildBatch`（含 colTypes 扫描）。
 * 图规模千级（LE 50 / PE 74 / PA 784 / PAS 37），启动期一次构建即可。
 */
import { buildBatch, readScenario, scenarioFiles } from "../model/graphData.js";
import type { GraphHandle, LeAttribute, PeAttribute, PeFull } from "./types.js";

function parseMaybeJson(v: unknown): unknown {
  if (typeof v !== "string" || !v) return null;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

type Row = Record<string, unknown>;

export class InMemoryGraph implements GraphHandle {
  readonly backend = "memory" as const;
  fallback_reason?: string;

  private constructor(
    private readonly les: Map<string, Row>,
    private readonly las: Map<string, Row>,
    private readonly pes: Map<string, Row>,
    private readonly pas: Map<string, Row>,
    private readonly leLa: Map<string, { le_id: string; attr_id: string; ord: number }>,
    private readonly pePa: Map<string, { pe_id: string; attr_id: string; ord: number }>,
    private readonly inherits: Map<string, { pe_id: string; le_id: string; ord: number }>,
    private readonly pasRels: Map<string, Row>,
  ) {}

  /** 从场景 YAML 建图（与 loadNeo4j 的逐库顺序一致：scenarioFiles() 的文件序） */
  static async load(): Promise<InMemoryGraph> {
    const les = new Map<string, Row>();
    const las = new Map<string, Row>();
    const pes = new Map<string, Row>();
    const pas = new Map<string, Row>();
    const leLa = new Map<string, { le_id: string; attr_id: string; ord: number }>();
    const pePa = new Map<string, { pe_id: string; attr_id: string; ord: number }>();
    const inherits = new Map<string, { pe_id: string; le_id: string; ord: number }>();
    const pasRels = new Map<string, Row>();

    for (const f of scenarioFiles()) {
      const dbName = f.replace(/\.yaml$/, "");
      const { sc, colTypes } = readScenario(dbName);
      const b = buildBatch(sc, colTypes);
      for (const r of b.les) les.set(r.id as string, r);
      for (const r of b.las) {
        las.set(r.id as string, r);
        leLa.set(`${r.le_id}|${r.id}`, { le_id: r.le_id as string, attr_id: r.id as string, ord: r.ord as number });
      }
      for (const r of b.pes) pes.set(r.id as string, r);
      for (const r of b.pas) {
        pas.set(r.id as string, r);
        pePa.set(`${r.pe_id}|${r.id}`, { pe_id: r.pe_id as string, attr_id: r.id as string, ord: r.ord as number });
      }
      for (const r of b.inherits) {
        inherits.set(`${r.pe_id}|${r.le_id}`, { pe_id: r.pe_id as string, le_id: r.le_id as string, ord: r.ord as number });
      }
      for (const r of b.pasRels) pasRels.set(`${r.from}|${r.to}|${r.id}`, r);
    }
    return new InMemoryGraph(les, las, pes, pas, leLa, pePa, inherits, pasRels);
  }

  async close(): Promise<void> {
    /* 纯内存，无资源可释放 */
  }

  // ── GraphQueries（返回结构与 queries.ts 逐字段对齐）─────────────────────

  /** LE → 下属 PE（INHERITS，按 ord） */
  async getChildEntityIds(leId: string): Promise<string[]> {
    return [...this.inherits.values()]
      .filter((r) => r.le_id === leId)
      .sort((a, b) => a.ord - b.ord)
      .map((r) => r.pe_id);
  }

  /** PE 完整信息（含 ARCS 四槽位；与 Neo4j 同为"读出时解析 JSON 字符串"口径） */
  async getPhysicalEntityById(peId: string): Promise<PeFull | null> {
    const pe = this.pes.get(peId);
    if (!pe) return null;
    return {
      physical_entity_id: pe.id as string,
      name: pe.name as string,
      description: (pe.description as string) ?? "",
      physical_table_id: pe.table_id as string,
      arcs: {
        A_anchor: parseMaybeJson(pe.arcs_a),
        R_row: parseMaybeJson(pe.arcs_r) ?? null,
        C_column: parseMaybeJson(pe.arcs_c),
        S_semantic4arcs: (pe.arcs_s as string) ?? null,
      },
    };
  }

  /** PE → 物理属性（含 data_type；按关系 ord） */
  async getPhysicalEntityAttributes(peId: string): Promise<PeAttribute[]> {
    const rels = [...this.pePa.values()]
      .filter((r) => r.pe_id === peId)
      .sort((a, b) => a.ord - b.ord);
    const out: PeAttribute[] = [];
    for (const rel of rels) {
      const a = this.pas.get(rel.attr_id);
      if (!a) continue;
      out.push({
        attr_id: a.id as string,
        name: a.name as string,
        description: (a.description as string) ?? "",
        physical_column_id: a.column_id as string,
        data_type: (a.data_type as string) ?? null,
      });
    }
    return out;
  }

  /** LE → 公开属性（LogicalAttribute；按关系 ord） */
  async getLogicalEntityAttributes(leId: string): Promise<LeAttribute[]> {
    const rels = [...this.leLa.values()]
      .filter((r) => r.le_id === leId)
      .sort((a, b) => a.ord - b.ord);
    const out: LeAttribute[] = [];
    for (const rel of rels) {
      const a = this.las.get(rel.attr_id);
      if (!a) continue;
      out.push({
        attr_id: a.id as string,
        name: a.name as string,
        description: (a.description as string) ?? "",
      });
    }
    return out;
  }

  // ── GraphStats（与 Neo4j 同标签/关系名，便于 /status 与 parity 逐项对照）──

  async labelCounts(): Promise<Record<string, number>> {
    return {
      LogicalAttribute: this.las.size,
      LogicalEntity: this.les.size,
      PhysicalAttribute: this.pas.size,
      PhysicalEntity: this.pes.size,
    };
  }

  async relationshipCounts(): Promise<Record<string, number>> {
    return {
      HAS_LOGICAL_ATTRIBUTE: this.leLa.size,
      HAS_PHYSICAL_ATTRIBUTE: this.pePa.size,
      INHERITS: this.inherits.size,
      PAS_RELATED_TO: this.pasRels.size,
    };
  }
}
