"""
rdf_service — rdflib-backed in-memory RDF graph store with SPARQL.

Implements a W3C-style RDF interface over the scenario TTL files.
"""
from __future__ import annotations

import io
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

import rdflib
from rdflib.namespace import RDF, RDFS, XSD

SCENARIOS_DIR = Path(__file__).parent.parent / "configs" / "scenarios"


class RDFGraphStore:
    """In-memory rdflib Graph combining all 11 scenario TTL files.

    Exposes:
      - triples() → flat list of {subject, predicate, object}
      - sparql(query) → list of bindings (SELECT) / Graph (CONSTRUCT) / bool (ASK)
      - serialize(fmt) → string in turtle|json-ld|xml|n3
      - classes() → list of rr:class URIs
      - predicates() → list of predicate URIs
    """

    def __init__(self, paradigm_dir: str = "RDF"):
        self.graph = rdflib.Graph()
        self._loaded = False
        self._paradigm_dir = paradigm_dir
        # bind namespaces for readable serialization
        self.graph.bind("rr", rdflib.Namespace("http://www.w3.org/ns/r2rml#"))
        self.graph.bind("rdf", RDF)
        self.graph.bind("rdfs", RDFS)
        self.graph.bind("xsd", XSD)
        self.graph.bind("ex", rdflib.Namespace("http://example.org/"))

    def load(self, ttl_dir: Optional[Path] = None) -> int:
        """Parse all .ttl files under ttl_dir into the graph. Returns triple count."""
        if self._loaded:
            return len(self.graph)
        ttl_dir = ttl_dir or SCENARIOS_DIR / self._paradigm_dir
        count = 0
        for ttl in sorted(ttl_dir.glob("*.ttl")):
            if ttl.name == "RDF All-in-One.ttl":
                continue
            try:
                g = rdflib.Graph()
                # rdflib parse() reads file as binary → specify utf-8 explicitly
                text = ttl.read_text(encoding="utf-8-sig")
                g.parse(data=text, format="turtle")
                self.graph += g
                count += len(g)
            except Exception as e:
                # skip bad files; log could be added
                continue
        self._loaded = True
        return count

    def triples(self) -> List[Dict[str, str]]:
        out = []
        for s, p, o in self.graph:
            out.append({
                "subject": str(s),
                "predicate": str(p),
                "object": str(o),
            })
        return out

    def triples_for_class(self, class_uri: str) -> List[Dict[str, str]]:
        """Return triples where s a <class_uri>."""
        cls = rdflib.URIRef(class_uri)
        out = []
        for s in self.graph.subjects(RDF.type, cls):
            for _, p, o in self.graph.predicate_objects(s):
                out.append({"subject": str(s), "predicate": str(p), "object": str(o)})
        return out

    def classes(self) -> List[str]:
        return sorted(set(str(o) for o in self.graph.objects(None, RDF.type)))

    def predicates(self) -> List[str]:
        return sorted(set(str(p) for p in self.graph.predicates(None, None)))

    def total_triples(self) -> int:
        return len(self.graph)

    def search(self, q: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Text search over subject/predicate/object literals — fallback when
        FAISS is not available."""
        ql = q.lower()
        out = []
        for s, p, o in self.graph:
            text = f"{s} {p} {o}".lower()
            if ql in text:
                out.append({
                    "subject": str(s),
                    "predicate": str(p),
                    "object": str(o),
                    "score": 1.0,
                })
                if len(out) >= limit:
                    break
        return out

    def sparql(self, query: str) -> Dict[str, Any]:
        """Execute a SPARQL query via rdflib. Returns a uniform dict:
          SELECT/DESCRIBE → {head: {vars: [...]}, bindings: [{var: value, ...}]}
          CONSTRUCT         → {triples: [{s, p, o}, ...]}
          ASK               → {boolean: true/false}
        """
        try:
            result = self.graph.query(query)
        except Exception as e:
            return {"error": str(e)}

        qtype = result.type if hasattr(result, "type") else "SELECT"
        if qtype == "ASK":
            return {"boolean": bool(result)}
        if qtype == "CONSTRUCT":
            triples = []
            for s, p, o in result:
                triples.append({"subject": str(s), "predicate": str(p), "object": str(o)})
            return {"triples": triples}
        if qtype == "DESCRIBE":
            triples = []
            for s, p, o in result:
                triples.append({"subject": str(s), "predicate": str(p), "object": str(o)})
            return {"triples": triples}
        # SELECT
        vars_ = [str(v) for v in result.vars] if hasattr(result, "vars") else []
        bindings = []
        for row in result:
            bind = {}
            for i, v in enumerate(result.vars):
                val = row[i]
                bind[str(v)] = str(val) if val is not None else None
            bindings.append(bind)
        return {"head": {"vars": vars_}, "bindings": bindings}

    def serialize(self, format: str = "turtle") -> str:
        fmt = format.lower()
        # rdflib accepts: xml, n3, turtle, nt, trix, trig, json-ld, hext
        if fmt in ("turtle", "ttl"):
            return self.graph.serialize(format="turtle")
        if fmt in ("jsonld", "json-ld"):
            return self.graph.serialize(format="json-ld")
        if fmt in ("xml", "rdf/xml", "application/rdf+xml"):
            return self.graph.serialize(format="xml")
        if fmt in ("n3",):
            return self.graph.serialize(format="n3")
        if fmt in ("nt", "ntriples", "application/n-triples"):
            return self.graph.serialize(format="nt")
        if fmt in ("trig",):
            return self.graph.serialize(format="trig")
        return self.graph.serialize(format="turtle")


    # ------------------------------------------------------------------
    # Plan-A mapping helpers — used by the HTTP endpoint /api/v1/rdf/mapping/all
    # (kept here so they can be called directly without MCP context)
    # ------------------------------------------------------------------

    def mapping_for_table(self, table_name: str) -> dict:
        """Return {table, columns, relations} for a single physical table.

        Wraps the same SPARQL as mcp_server._query_rdf_mapping but works
        on an already-loaded store instance.
        """
        sparql = """
        PREFIX rr: <http://www.w3.org/ns/r2rml#>
        SELECT ?pred ?col ?joinTable ?joinChild ?joinParent WHERE {
            ?tm rr:logicalTable [ rr:tableName ?table_name ] ;
                rr:predicateObjectMap ?pom .
            ?pom rr:predicate ?pred .
            OPTIONAL { ?pom rr:objectMap [ rr:column ?col ] . }
            OPTIONAL {
                ?pom rr:objectMap [
                    rr:parentTriplesMap ?parentTm ;
                    rr:joinCondition [ rr:child ?joinChild ; rr:parent ?joinParent ]
                ] .
                ?parentTm rr:logicalTable [ rr:tableName ?joinTable ] .
            }
        }
        """
        result = self.sparql(sparql.replace("?table_name", f'"{table_name}"'))
        if "error" in result:
            return {"success": False, "error": result["error"]}

        columns, relations = [], []
        seen_cols, seen_rels = set(), set()
        for b in result.get("bindings", []):
            pred = b.get("pred", "")
            col = b.get("col", "")
            jt  = b.get("joinTable", "")
            jc  = b.get("joinChild", "")
            jp  = b.get("joinParent", "")

            if col and col not in seen_cols:
                seen_cols.add(col)
                columns.append(col)
            if jt and (jc, jp) not in seen_rels:
                seen_rels.add((jc, jp))
                relations.append({
                    "target_table": jt,
                    "join_condition": f"{table_name}.{jc} = {jt}.{jp}",
                })

        return {"success": True, "table": table_name,
                "columns": columns, "relations": relations}


_store: Optional[RDFGraphStore] = None


def get_rdf_store() -> RDFGraphStore:
    global _store
    if _store is None:
        _store = RDFGraphStore()
        _store.load()
    return _store


def reset_store():
    global _store
    _store = None
