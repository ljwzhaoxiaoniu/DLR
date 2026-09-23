/**
 * Neo4j 只读查询层 —— 对齐 Python db/graph_db.py 的同名方法返回结构
 */
import neo4j, { type Driver, type Session } from "neo4j-driver";
import type { GraphQueries, PeFull, PeAttribute, LeAttribute } from "./types.js";

export type { PeFull, PeAttribute, LeAttribute } from "./types.js";

function parseMaybeJson(v: unknown): unknown {
  if (typeof v !== "string" || !v) return null;
  try {
    return JSON.parse(v);
  } catch {
    return null;
  }
}

export class Neo4jGraph implements GraphQueries {
  private constructor(
    private readonly driver: Driver,
    private readonly session: Session,
  ) {}

  static async connect(uri: string, user: string, pass: string): Promise<Neo4jGraph> {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
    await driver.verifyConnectivity();
    return new Neo4jGraph(driver, driver.session());
  }

  async close(): Promise<void> {
    await this.session.close();
    await this.driver.close();
  }

  /** LE → 下属 PE（INHERITS） */
  async getChildEntityIds(leId: string): Promise<string[]> {
    const r = await this.session.run(
      "MATCH (pe:PhysicalEntity)-[rel:INHERITS]->(le:LogicalEntity {id: $id}) RETURN pe.id AS id ORDER BY rel.ord",
      { id: leId },
    );
    return r.records.map((x) => x.get("id") as string);
  }

  /** PE 完整信息（含 ARCS 四槽位；arcs_a/arcs_c 为 JSON 字符串，读出时解析） */
  async getPhysicalEntityById(peId: string): Promise<PeFull | null> {
    const r = await this.session.run(
      `MATCH (pe:PhysicalEntity {id: $id})
       RETURN pe.id AS id, pe.name AS name, pe.description AS description,
              pe.table_id AS table_id, pe.arcs_a AS arcs_a, pe.arcs_r AS arcs_r,
              pe.arcs_c AS arcs_c, pe.arcs_s AS arcs_s`,
      { id: peId },
    );
    if (!r.records.length) return null;
    const x = r.records[0];
    return {
      physical_entity_id: x.get("id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
      physical_table_id: x.get("table_id") as string,
      arcs: {
        A_anchor: parseMaybeJson(x.get("arcs_a")),
        R_row: x.get("arcs_r") ?? null,
        C_column: parseMaybeJson(x.get("arcs_c")),
        S_semantic4arcs: (x.get("arcs_s") as string) ?? null,
      },
    };
  }

  /** PE → 物理属性（含 data_type） */
  async getPhysicalEntityAttributes(peId: string): Promise<PeAttribute[]> {
    const r = await this.session.run(
      `MATCH (pe:PhysicalEntity {id: $id})-[rel:HAS_PHYSICAL_ATTRIBUTE]->(a:PhysicalAttribute)
       RETURN a.id AS attr_id, a.name AS name, a.description AS description,
              a.column_id AS column_id, a.data_type AS data_type
       ORDER BY rel.ord`,
      { id: peId },
    );
    return r.records.map((x) => ({
      attr_id: x.get("attr_id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
      physical_column_id: x.get("column_id") as string,
      data_type: (x.get("data_type") as string) ?? null,
    }));
  }

  /** LE → 公开属性（LogicalAttribute） */
  async getLogicalEntityAttributes(leId: string): Promise<LeAttribute[]> {
    const r = await this.session.run(
      `MATCH (le:LogicalEntity {id: $id})-[rel:HAS_LOGICAL_ATTRIBUTE]->(la:LogicalAttribute)
       RETURN la.id AS attr_id, la.name AS name, la.description AS description
       ORDER BY rel.ord`,
      { id: leId },
    );
    return r.records.map((x) => ({
      attr_id: x.get("attr_id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
    }));
  }
}
