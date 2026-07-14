"""
rdf_store — W3C-standard RDF interface layer (rdflib).

Pure rdflib Graph + SPARQL; no Kuzu dependency. Serves the RDF paradigm
with standard-compliant endpoints:
  - GET /api/v1/rdf/triples      → all triples as JSON (subject, predicate, object)
  - POST /api/v1/rdf/sparql      → SPARQL SELECT/CONSTRUCT/ASK via rdflib
  - GET /api/v1/rdf/serialize?format=turtle|json-ld|xml|n3 → raw serialization
  - GET /api/v1/rdf/classes      → list of rr:class URIs
  - GET /api/v1/rdf/graph        → graph summary (triple count, class count, predicate count)
"""
