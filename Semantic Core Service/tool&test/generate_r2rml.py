"""
R2RML generator — produces W3C-standard Turtle FROM SQLite real foreign keys.

Rule: rr:referencingObjectMap must reflect actual FK constraints, NOT DLR PAS.
Source of truth: dev_tables.json (foreign_keys) or PRAGMA foreign_key_list.
"""
from __future__ import annotations

import argparse
import io
import json
import re
import sqlite3
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

_UNSAFE_IRI = re.compile(r"[^\w\-.]", re.UNICODE)


def _slug(text: str) -> str:
    return _UNSAFE_IRI.sub("_", text.strip()) or "_"


def _bare(qcol: str) -> str:
    return qcol.rsplit(".", 1)[-1]


def _s(x: str) -> str:
    v = x.replace("\\", "\\\\").replace('"', '\\"').replace("`", "")
    return f'"{v}"'


class Ttl:
    def __init__(self):
        self._lines: List[str] = []

    def pfx(self, pfx: str, iri: str):
        self._lines.append(f"@prefix {pfx}: <{iri}> .")

    def raw(self, s: str = ""):
        self._lines.append(s)

    def cm(self, s: str):
        for ln in s.splitlines():
            self._lines.append(f"# {ln}")

    def blank(self):
        self._lines.append("")

    def text(self) -> str:
        return "\n".join(self._lines) + "\n"


def load_fks(sqlite_dir: Path, db_name: str) -> List[Tuple[str, str, str, str]]:
    """Read foreign keys from SQLite via PRAGMA. Returns [(from_table, from_col, to_table, to_col), ...]."""
    db_path = sqlite_dir / db_name / f"{db_name}.sqlite"
    if not db_path.exists():
        return []
    try:
        conn = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
        tables = [r[0] for r in cur.fetchall()]
        fks = []
        for tbl in tables:
            cur.execute(f"PRAGMA foreign_key_list('{tbl}')")
            for row in cur.fetchall():
                # id, seq, table, from, to, on_update, on_delete, match
                _, _, parent_tbl, from_col, to_col, *_ = row
                fks.append((tbl, from_col, parent_tbl, to_col))
        conn.close()
        return fks
    except Exception:
        return []


def gen(
    db_name: str,
    db_url: str,
    tables: List[str],
    fks: List[Tuple[str, str, str, str]],
    sqlite_dir: Path,
    description: str = "",
) -> str:
    ttl = Ttl()
    ttl.pfx("rr",     "http://www.w3.org/ns/r2rml#")
    ttl.pfx("rdf",    "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
    ttl.pfx("rdfs",   "http://www.w3.org/2000/01/rdf-schema#")
    ttl.pfx("xsd",    "http://www.w3.org/2001/XMLSchema#")
    ttl.pfx("ex",     "http://example.org/")
    ttl.blank()
    ttl.cm(f"R2RML — database: {db_name}")
    ttl.cm(f"URL: {db_url}")
    ttl.cm(f"Tables: {len(tables)}  ForeignKeys: {len(fks)}")
    ttl.cm(f"Source: real FK constraints (PRAGMA foreign_key_list)")
    ttl.blank()

    # Get column info per table directly from SQLite
    sqlite_path = sqlite_dir / db_name / f"{db_name}.sqlite"
    cols_map: Dict[str, List[Tuple[str, str]]] = {}
    pk_map: Dict[str, str] = {}
    if sqlite_path.exists():
        try:
            conn = sqlite3.connect(f"file:{sqlite_path}?mode=ro", uri=True)
            cur = conn.cursor()
            for tbl in tables:
                cur.execute(f"PRAGMA table_info('{tbl}')")
                cols = []
                pk = None
                for row in cur.fetchall():
                    # cid, name, type, notnull, dflt_value, pk
                    cid, name, ctype, notnull, dflt, is_pk = row
                    cols.append((name, ctype or "TEXT"))
                    if is_pk:
                        pk = name
                cols_map[tbl] = cols
                pk_map[tbl] = pk or cols[0][0] if cols else "id"
            conn.close()
        except Exception:
            pass

    # Group FKs by child table
    fks_by_child: Dict[str, List[Tuple[str, str, str]]] = {}
    for from_tbl, from_col, to_tbl, to_col in fks:
        fks_by_child.setdefault(from_tbl, []).append((from_col, to_tbl, to_col))

    for tbl in tables:
        tbl_lower = tbl.lower()
        pk = pk_map.get(tbl, tbl)
        iri = f"http://example.org/{db_name}/{{{pk}}}"

        ttl.cm(f"=== Table: {db_name}.{tbl} (pk={pk}) ===")
        ttl.raw(f"<http://example.org/tm/{db_name}/{tbl}> a rr:TriplesMap ;")
        ttl.raw(f"    rr:logicalTable [ rr:tableName {_s(tbl)} ] ;")
        ttl.raw(f"    rr:subjectMap [ rr:template {_s(iri)} ; rr:class ex:{_slug(tbl)} ] ;")

        # Build all predicate-object entries for this TM (columns + FKs).
        # In Turtle: head + "\n    pred ;\n    pred ." format.
        entries: List[str] = []
        cols = cols_map.get(tbl, [])
        for col_name, col_type in cols:
            if col_name == pk:
                continue
            pred = f"<http://example.org/{_slug(tbl)}/{_slug(col_name)}>"
            entries.append(
                f"rr:predicateObjectMap [ "
                f"rr:predicate {pred} ; "
                f"rr:objectMap [ rr:column {_s(col_name)} ; rr:datatype xsd:string ] "
                f"]"
            )
        for from_col, parent_tbl, parent_col in fks_by_child.get(tbl, []):
            actual_parent_col = parent_col if parent_col else pk_map.get(parent_tbl, from_col)
            pred = f"<http://example.org/{_slug(tbl)}/refers_to_{_slug(parent_tbl)}>"
            entries.append(
                f"rr:predicateObjectMap [ "
                f"rr:predicate {pred} ; "
                f"rr:objectMap [ "
                f"rr:parentTriplesMap <http://example.org/tm/{db_name}/{parent_tbl}> ; "
                f"rr:joinCondition [ rr:child {_s(from_col)} ; rr:parent {_s(actual_parent_col)} ] "
                f"] "
                f"]"
            )

        for i, entry in enumerate(entries):
            is_last = (i == len(entries) - 1)
            sep = " ." if is_last else " ;"
            ttl.raw(f"    {entry}{sep}")

        if not entries:
            ttl.raw(f"    .")
        ttl.blank()

    return ttl.text()


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate W3C R2RML from real FK constraints")
    parser.add_argument("--sqlite-dir", type=Path,
                        default=Path("D:/Code_Proj/DLR Proj/MINIDEV_sqlite/dev_databases"),
                        help="SQLite databases directory")
    parser.add_argument("--output-dir", type=Path,
                        default=Path("D:/Code_Proj/DLR Proj/Semantic Core Service/configs/scenarios/RDF"))
    args = parser.parse_args()

    # parse sqlite dir for available databases
    if not args.sqlite_dir.is_dir():
        print(f"❌ sqlite-dir not found: {args.sqlite_dir}")
        return 1

    dbs = sorted(d for d in args.sqlite_dir.iterdir() if d.is_dir() and (d / f"{d.name}.sqlite").exists())
    if not dbs:
        print(f"❌ no SQLite databases in {args.sqlite_dir}")
        return 1

    args.output_dir.mkdir(parents=True, exist_ok=True)
    print(f"R2RML generator (FK-driven) — {len(dbs)} dbs -> {args.output_dir}")

    for db_dir in dbs:
        db_name = db_dir.name
        db_url = f"sqlite:///{db_dir}/{db_name}.sqlite"

        # get tables
        conn = sqlite3.connect(f"file:{db_dir}/{db_name}.sqlite?mode=ro", uri=True)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence' ORDER BY name")
        tables = [r[0] for r in cur.fetchall()]
        conn.close()

        fks = load_fks(args.sqlite_dir, db_name)
        txt = gen(db_name, db_url, tables, fks, args.sqlite_dir)
        out = args.output_dir / f"{db_name}.ttl"
        # binary write to avoid Windows CRLF (\r\n) which breaks Turtle parser
        out.write_bytes(txt.encode("utf-8"))

        print(f"  {db_name}: {len(tables)} tables, {len(fks)} FKs -> {out.name}")

    print(f"\nDONE: {len(dbs)} ttl written to {args.output_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
