/**
 * Neo4j 只读查询层 —— 对齐 Python db/graph_db.py 的同名方法返回结构
 *
 * ⚠ **并发纪律（2026-09-24 教训）**：Neo4j 的 **session 不可并发复用**——
 * 之前全类共用一个 session，单会话冒烟正常，**并行跑题（多路 dsh）立刻炸**：
 * "Queries cannot be run directly on a session with ongoing work"。
 * 现在每次查询开/关一个 session（driver 自带连接池，开 session 很便宜）。
 */
import neo4j, { type Driver } from "neo4j-driver";
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
  private constructor(private readonly driver: Driver) {}

  static async connect(uri: string, user: string, pass: string): Promise<Neo4jGraph> {
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, pass));
    try {
      await driver.verifyConnectivity();
    } catch (e) {
      // 连不上就把驱动关掉：「失败不缓存」后每次调用都会重试，不关会攒驱动
      await driver.close().catch(() => {});
      throw e;
    }
    return new Neo4jGraph(driver);
  }

  async close(): Promise<void> {
    await this.driver.close();
  }

  /**
   * 跑一条只读 Cypher：**每次一个新 session**，读完后立刻关闭。
   * （records 在 session 关闭前物化完成——本服务的结果集都很小。）
   */
  private async query(cypher: string, params: Record<string, unknown> = {}) {
    const session = this.driver.session();
    try {
      const result = await session.run(cypher, params);
      return result.records;
    } finally {
      await session.close();
    }
  }

  /** LE → 下属 PE（INHERITS） */
  async getChildEntityIds(leId: string): Promise<string[]> {
    const recs = await this.query(
      "MATCH (pe:PhysicalEntity)-[rel:INHERITS]->(le:LogicalEntity {id: $id}) RETURN pe.id AS id ORDER BY rel.ord",
      { id: leId },
    );
    return recs.map((x) => x.get("id") as string);
  }

  /** PE 完整信息（含 ARCS 四槽位；arcs_a/arcs_c 为 JSON 字符串，读出时解析） */
  async getPhysicalEntityById(peId: string): Promise<PeFull | null> {
    const recs = await this.query(
      `MATCH (pe:PhysicalEntity {id: $id})
       RETURN pe.id AS id, pe.name AS name, pe.description AS description,
              pe.table_id AS table_id, pe.arcs_a AS arcs_a, pe.arcs_r AS arcs_r,
              pe.arcs_c AS arcs_c, pe.arcs_s AS arcs_s`,
      { id: peId },
    );
    if (!recs.length) return null;
    const x = recs[0];
    return {
      physical_entity_id: x.get("id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
      physical_table_id: x.get("table_id") as string,
      arcs: {
        A_anchor: parseMaybeJson(x.get("arcs_a")),
        R_row: parseMaybeJson(x.get("arcs_r")) ?? null,
        C_column: parseMaybeJson(x.get("arcs_c")),
        S_semantic4arcs: (x.get("arcs_s") as string) ?? null,
      },
    };
  }

  /** PE → 物理属性（含 data_type） */
  async getPhysicalEntityAttributes(peId: string): Promise<PeAttribute[]> {
    const recs = await this.query(
      `MATCH (pe:PhysicalEntity {id: $id})-[rel:HAS_PHYSICAL_ATTRIBUTE]->(a:PhysicalAttribute)
       RETURN a.id AS attr_id, a.name AS name, a.description AS description,
              a.column_id AS column_id, a.data_type AS data_type
       ORDER BY rel.ord`,
      { id: peId },
    );
    return recs.map((x) => ({
      attr_id: x.get("attr_id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
      physical_column_id: x.get("column_id") as string,
      data_type: (x.get("data_type") as string) ?? null,
    }));
  }

  /** 全图标签计数（/status 状态面板用；计数返回 Integer，读出时转 number） */
  async labelCounts(): Promise<Record<string, number>> {
    const recs = await this.query(
      "MATCH (n) UNWIND labels(n) AS label RETURN label AS label, count(*) AS c ORDER BY label",
    );
    const out: Record<string, number> = {};
    for (const x of recs) {
      const v = x.get("c") as number | { toNumber(): number };
      out[x.get("label") as string] = typeof v === "number" ? v : v.toNumber();
    }
    return out;
  }

  /** 全图关系类型计数（/status 用；PAS_RELATED_TO 等） */
  async relationshipCounts(): Promise<Record<string, number>> {
    const recs = await this.query("MATCH ()-[rel]->() RETURN type(rel) AS type, count(*) AS c ORDER BY type");
    const out: Record<string, number> = {};
    for (const x of recs) {
      const v = x.get("c") as number | { toNumber(): number };
      out[x.get("type") as string] = typeof v === "number" ? v : v.toNumber();
    }
    return out;
  }

  /** LE → 公开属性（LogicalAttribute） */
  async getLogicalEntityAttributes(leId: string): Promise<LeAttribute[]> {
    const recs = await this.query(
      `MATCH (le:LogicalEntity {id: $id})-[rel:HAS_LOGICAL_ATTRIBUTE]->(la:LogicalAttribute)
       RETURN la.id AS attr_id, la.name AS name, la.description AS description
       ORDER BY rel.ord`,
      { id: leId },
    );
    return recs.map((x) => ({
      attr_id: x.get("attr_id") as string,
      name: x.get("name") as string,
      description: (x.get("description") as string) ?? "",
    }));
  }
}
