/**
 * LanceStore —— LanceDB 访问层（多表：entities=L1 DLR 语义向量；consensus=L2 领域共识）
 *
 * 口径对齐（与 Python db/vector_db.py、db/evidence_db.py 一致）：
 *   query 文本 → TextEncoder（toLowerCase + CLS + L2 归一化）→ cosine 检索（全量精确）。
 */
import * as lancedb from "@lancedb/lancedb";
import { TextEncoder } from "../embed/encoder.js";

export interface LanceHit {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  db?: string;
  namespace?: string;
  qid?: number;
  question?: string;
  text?: string;
  score: number; // cosine 相似度（= 1 - cosine distance）
  [k: string]: unknown;
}

export class LanceStore {
  private readonly tables = new Map<string, lancedb.Table>();

  private constructor(
    private readonly db: lancedb.Connection,
    private readonly encoder: TextEncoder,
  ) {}

  static async open(storeDir: string, modelDir: string): Promise<LanceStore> {
    const db = await lancedb.connect(storeDir);
    const encoder = await TextEncoder.load(modelDir);
    return new LanceStore(db, encoder);
  }

  private async table(name: string, fresh = false): Promise<lancedb.Table> {
    // fresh：不取缓存句柄、按请求重开表——L3 sop 索引要"改源 → build → 即生效"（不吃常驻缓存版本）
    if (fresh) return this.db.openTable(name);
    let t = this.tables.get(name);
    if (!t) {
      t = await this.db.openTable(name);
      this.tables.set(name, t);
    }
    return t;
  }

  /**
   * 向量检索（cosine）。limit 默认取全量（对齐 Python "先收口后截断"）。
   * 过滤：where 子句（等价 Python 的 metadata 过滤）。
   */
  async search(
    tableName: string,
    question: string,
    opts: { limit?: number; where?: string; db?: string; fresh?: boolean } = {},
  ): Promise<LanceHit[]> {
    const vec = await this.encoder.encodeOne(question);
    const tbl = await this.table(tableName, opts.fresh);
    let q = (tbl.search(vec) as lancedb.VectorQuery).distanceType("cosine").limit(opts.limit ?? 100_000);
    const where = opts.where ?? (opts.db ? `db = '${opts.db.replace(/'/g, "''")}'` : undefined);
    if (where) q = q.where(where);
    const rows = (await q.toArray()) as Record<string, unknown>[];
    return rows.map((r) => ({ ...r, score: 1 - Number(r._distance ?? 0) })) as LanceHit[];
  }

  /** 各表行数（/status 状态面板用；表不存在即跳过该表） */
  async tableCounts(names: string[]): Promise<Record<string, number>> {
    const out: Record<string, number> = {};
    for (const name of names) {
      try {
        out[name] = await (await this.table(name)).countRows();
      } catch {
        /* 表缺失：不记为 0，直接不出现 */
      }
    }
    return out;
  }

  /** 全量取行（小表场景：L3 SOP 索引按标题做精确命中，表仅几十行） */
  async listRows(tableName: string, fresh = false): Promise<LanceHit[]> {
    const tbl = await this.table(tableName, fresh);
    const rows = (await tbl.query().toArray()) as Record<string, unknown>[];
    return rows.map((r) => ({ ...r, score: 0 })) as LanceHit[];
  }

  /** 全文检索（L2 的"术语字面"一路，hybrid 用） */
  async searchText(
    tableName: string,
    query: string,
    opts: { limit?: number; where?: string } = {},
  ): Promise<LanceHit[]> {
    const tbl = await this.table(tableName);
    let q = tbl.search(query, "fts").limit(opts.limit ?? 20);
    if (opts.where) q = q.where(opts.where);
    const rows = (await q.toArray()) as Record<string, unknown>[];
    return rows.map((r) => ({ ...r, score: Number(r._score ?? 0) })) as LanceHit[];
  }
}
