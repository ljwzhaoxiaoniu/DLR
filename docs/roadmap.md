# Roadmap and Extension Boundary

> The "landing" of the narrative docs is in [04-application.md](04-application.md); this document is the **engineering direction**: what we do, what we don't, where enterprises plug in, and how the whole thing becomes portable.
> 中文版：[roadmap.zh.md](roadmap.zh.md)

## 1. Extension boundary: contract inside, implementation outside

This project delivers the **minimal closure of semantic grounding**; anything that "plugs into an enterprise's existing data infrastructure" is an **extension layer, built by the enterprise** — this project does not change for it.

| | This project (frozen) | Enterprise extension layer (self-built) | Industry reference |
|---|---|---|---|
| **Query execution** | `execute_sql` — demo-grade direct SQLite | Extend into your own **`DSL_SQL service`**: a controlled query DSL → per-dialect SQL (PG / MySQL / Oracle / warehouse) → execution + pushed-down permissions (views / RLS) | **OData** (standardized query protocol: `$filter` / `$select` / `$expand` + self-describing `$metadata`; used by SAP Gateway, Microsoft Graph) |
| Connectors / dialects | SQLite only | Same as above, solved once in the DSL_SQL layer | Per-database drivers |
| **Graph backend** | **In-process memory graph** (YAML → memory; **default**, done) + **Neo4j compatible sample** (optional) | Enterprise connector (their graph store/service) against the same read interface | Isomorphic to `execute_sql` → DSL_SQL |
| Row / column permissions | None (single-user local) | Push permissions down into the DSL_SQL layer | DB RLS / views |
| Cold-start modeling | Hand-written YAML (templates) | introspect → draft → review (can hook into the enterprise metadata platform) | dbt docs / DataHub |
| Metric-caliber integration | L2 reference is enough | Import from dbt / Cube / LookML as L2 entries | MetricFlow |
| Serving / HA / audit | Single machine + local session logs | Enterprise gateway / containers / audit platform | Standard ops |

**Key sentence**: the semantic gateway **emits a DSL only, never touches dialects** — tool signatures stay fixed; only implementations vary. **"This project does not change" is a boundary, not a debt**; the "lightweight" promise is exactly what this boundary buys.

## 2. Explicitly not doing

- **No ontology / KG platform** — DLR has only four concepts (LE / PE / ARC / PAS); a DBA is productive in half a day;
- **No replacement for metric-computation platforms** — we only build the **grounding layer** for "can the LLM land correctly on your data", and can reference existing metric definitions;
- **No model lock-in, no host lock-in** — MCP is a standard (hosts are swappable), models are swappable; dsh is the **preferred host**, not the only one.

## 3. Data sovereignty

All components are local: graph (memory or Neo4j), vectors (LanceDB), encoder (ONNX inference in-process), modeling artifacts (git text); **the only outbound call is the LLM API** (pointable at a private deployment) → **data never leaves the domain**.

## 4. Portability: three steps — all landed

Goal: "on any machine that has dsh, one command installs everything."

| Step | What | Status |
|---|---|---|
| **1. Path decoupling** | No hardcoded absolute paths: paths derive from the package's own location with env overrides (`TSM_*`); data dirs default inside the checkout and fall back to a user dir when installed; Neo4j location is probed | ✅ Done — checkout runs from any directory; `tsm scenario` prints what is live |
| **2. Packaging** | **Three npm packages**: `tsm-core-dlr` (service + `tsm` CLI) · `tsm-scenario-<benchmark>` (content; one per benchmark, e.g. `tsm-scenario-birdmini`) · `dsh-tsm-agent` (the dsh bundle; depends on the service). The scenario is optional/pluggable: `TSM_SCENARIO` accepts a path **or a package name** | ✅ Done |
| **3. Graph backend, two tracks** ("zero-service") | **In-process by default** (YAML → memory: zero dependencies, zero locks, zero services; read-only lookups over the ~1,100-node graph) + **Neo4j kept compatible** (set `NEO4J_URI` to use Cypher / Browser / big graphs / an existing enterprise graph store). Parity is enforced by `tsm verify memory_graph_parity` (field-level, all 11 databases) | ✅ Done — a Neo4j-free machine passes the four-point acceptance |
| **Bonus: visualization as a standalone page** | ✅ `tsm viz` (dev) reads the YAML structure payload → a self-contained HTML (data + vis-network inlined); the service serves it live at **`GET /viz/dlr`** (the status card's `图谱 ↗` links to it); Neo4j Browser stays as a parallel entry | ✅ Done |

> dsh ecosystem note: a bundle = an npm package + `dsh.bundle.patch` (+ optional `dsh.client` browser half); installation/updates go through pnpm inside the profile (registry / Git / tarball / **local absolute path**); per-row switches live in the profile's `cordis.patch.yml`. Both routes coexist, and the `--patch` layer has the highest priority — the natural "local override" slot.

## 5. To explore

- **Cloud-OpsBench** (K8s agentic root-cause analysis benchmark): the candidate for the other end of the TSM seesaw — **L3 heavy / L1 thin** (a diagnostic runbook ≈ a knowledge-ized golden trajectory; its "evidence-chain closure (ECR)" points the same way as our process evaluation). Its tool surface is K8s diagnostics (not SQL); a real attempt needs a separate `scenarios/cloudops/` plus a tool adapter layer.
- **More dev-mode capabilities**: introspect → draft → review (reflexive modeling), growing along the same CLI as steps 1/2.

## Related

- Theoretical basis for the extension boundary (no invention / no completion / no reconstruction): [01-background.md](01-background.md) §3
- Concepts and criteria: [02-concept.md](02-concept.md) | design: [03-design.md](03-design.md) | application: [04-application.md](04-application.md)
