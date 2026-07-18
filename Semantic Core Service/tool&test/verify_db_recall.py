# -*- coding: utf-8 -*-
"""verify_db_recall.py — db-aware recall 改造后的构建验证.

用法(须在 build ALL 完成、serve 未启动时运行):
    cd "Semantic Core Service"
    python "tool&test/verify_db_recall.py"

检查项:
  1. 三范式 vector.pkl 的 metadata 全部带非空 db 字段, per-db/per-type 计数
  2. DLR Kuzu: 改名后 4 个 PE 都可达且 physical_table_id 正确, INHERITS 单挂
  3. q1472 式召回: 全局 vs db 锁库对比(锁库结果 100% 归属目标库)
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

FAIL = []


def check(label, ok, detail=""):
    tag = "PASS" if ok else "FAIL"
    print(f"  [{tag}] {label}" + (f" -- {detail}" if detail else ""))
    if not ok:
        FAIL.append(label)


def main():
    from config import paradigm_storage

    # ---------- 1. pkl metadata ----------
    print("\n=== 1. vector.pkl metadata db field ===")
    import pickle
    for p in ["er", "dlr", "rdf"]:
        pkl = paradigm_storage(p)["vector"]
        with open(pkl, "rb") as f:
            data = pickle.load(f)
        meta = data["metadata"]
        missing = [m for m in meta if not m.get("db")]
        dbs = {}
        types = {}
        for m in meta:
            dbs[m.get("db", "?")] = dbs.get(m.get("db", "?"), 0) + 1
            types[m.get("type", "?")] = types.get(m.get("type", "?"), 0) + 1
        check(f"{p}: all {len(meta)} records have db", len(missing) == 0,
              f"missing={len(missing)}" if missing else f"dbs={len(dbs)}")
        print(f"        types={types}")
        print(f"        per-db={dbs}")

    # ---------- 2. DLR Kuzu PE rename ----------
    print("\n=== 2. DLR Kuzu: renamed PEs reachable, INHERITS single-parent ===")
    from db.graph_db import GraphDB
    st = paradigm_storage("dlr")
    gdb = GraphDB(db_path=str(st["graph"]), mapping_type="dlr")

    expect = {
        "PHYSICAL.Card": "card_games.cards",
        "PHYSICAL.CreditCard": "financial.card",
        "PHYSICAL.Race": "formula_1.races",
        "PHYSICAL.HeroRace": "superhero.race",
    }
    for pe_id, table in expect.items():
        pe = gdb.get_physical_entity_by_id(pe_id)
        got = (pe or {}).get("physical_table_id", "<missing>")
        check(f"{pe_id} -> {table}", got == table, f"got={got}")

    # INHERITS: each renamed PE has exactly one parent LE
    for pe_id, want_le in [("PHYSICAL.Card", "LOGICAL.Card"),
                           ("PHYSICAL.CreditCard", "LOGICAL.AccountRelation"),
                           ("PHYSICAL.Race", "LOGICAL.Race"),
                           ("PHYSICAL.HeroRace", "LOGICAL.HeroDimension")]:
        try:
            res = gdb.conn.execute(
                """MATCH (e:PhysicalEntity {physical_entity_id: $id})-[:INHERITS]->(le:LogicalEntity)
                   RETURN le.logical_entity_id""", parameters={"id": pe_id})
            parents = []
            while res.has_next():
                parents.append(res.get_next()[0])
        except Exception as e:
            parents = [f"<err {e}>"]
        check(f"{pe_id} single parent {want_le}", parents == [want_le], f"got={parents}")

    # ---------- 3. recall: global vs db-locked ----------
    print("\n=== 3. recall compare: global vs db-locked (q1472) ===")
    from db.vector_db import VectorDB
    vdb = VectorDB(db_path=str(st["vector"]))
    q = "Who had the least consumption in LAM in 2012?"
    target = "debit_card_specializing"

    glob = vdb.search(q, top_k=20)
    lock = vdb.search(q, top_k=20, db=target)
    glob_dbs = sorted({r.get("db", "?") for r in glob})
    lock_dbs = sorted({r.get("db", "?") for r in lock})
    print(f"        global: {len(glob)} results, dbs={glob_dbs}")
    print(f"        locked: {len(lock)} results, dbs={lock_dbs}")
    check("locked recall 100% in target db",
          len(lock) > 0 and lock_dbs == [target], f"dbs={lock_dbs}")
    # target db must appear in global results too (routing still works)
    check("target db present in global recall", target in glob_dbs)
    # pas/relation metadata passthrough fix
    pas = [r for r in lock if r["type"] == "pas_relation"]
    if pas:
        check("pas_relation carries from_le_id", bool(pas[0].get("from_le_id")),
              f"sample={pas[0].get('from_le_id', '')}")

    print("\n" + ("=" * 50))
    if FAIL:
        print(f"RESULT: {len(FAIL)} FAILED -> {FAIL}")
        sys.exit(1)
    print("RESULT: ALL PASS")


if __name__ == "__main__":
    main()
