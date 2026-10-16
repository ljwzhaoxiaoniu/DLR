# TSM Core Service (TS/Node)

English | [中文](README.zh.md)

The 2.0 line's TSM service: a TypeScript implementation of **Neo4j (graph) + LanceDB (vectors/consensus) + ONNX (encoder)**,
contract = the MCP tool surface (**7 tools for `dlr` / 3 for `dlr-state`**, see below; L2/L3 tool names differ from the Python line). Built for pluginization (no Python, no sidecar).

> Three-level semantic modeling (TSM): **L1 = `dlr`** (semantic graph) ｜ **L2 = `consensus`** (Domain Consensus = the kind of **non-workflow** knowledge a scenario needs on top of the L1 schema: terms / conventions / background — no detail rows) ｜ **L3 = `sop`** (question-level playbooks).
> Admission: non-workflow → consensus; question-level playbooks → sop. Note: "evidence" is a BIRD dataset field name — **not** a paradigm term.

## Layout

```
src/
├── config.ts                    # paths' single source (scenario selectable: TSM_SCENARIO)
├── model/{types,loadDlr}.ts     # L1: DLR YAML → vector rows (verbatim-aligned with the Python line's builder)
├── embed/encoder.ts             # TextEncoder: local ONNX inference, replicating sentence-transformers behavior
├── store/lance.ts               # LanceDB access layer (entities=L1 semantics / consensus=L2)
├── graph/{physicalSchema,queries,types,loadNeo4j}.ts  # SQLite type scan / Neo4j queries / YAML→Neo4j
├── queries/{semanticQuery,searchConsensus,searchSop,peMapping,fullDataInfo,executeSql}.ts
│     + {unwind,sqlWorker}.ts     # the 7 tools' implementations; unwind=row-level PE expansion (ARCS.R), sqlWorker=execute_sql subprocess runner
├── build/{buildLance,buildConsensus}.ts         # build the vector table / the consensus table
├── mcp/server.ts                # MCP server (stdio + streamable-http, stateful)
└── verify/                      # regression suite (self-proof vs fixtures + MCP precheck)
scripts/fetch-model.sh           # pull the ONNX model from hf-mirror (reproducible on a fresh machine)
```

**A scenario** = one complete TSM's content, at `scenarios/<name>/` in the repo (currently `birdminidev` and `cloudopsbench`):
`sources/configs/DLR/*.yaml` (L1 sources) + `sources/consensus/*.jsonl` (L2 sources) + `sources/sop.md` (L3 source)
+ `fixtures/*.json` (reference truths). Switch: `TSM_SCENARIO=<path> npx tsx …`.
(The COB scenario uses the single-file `dlr-state` shape: `boutique.yaml` / `trainticket.yaml`, no databases/attributes.)

## One-time setup

```bash
npm install
bash scripts/fetch-model.sh        # ONNX model → tmp_scripts/bge-onnx (~95MB, via hf-mirror)
cp .env.example .env               # fill NEO4J_PASSWORD
# Neo4j — any local Bolt endpoint works; dev-machine reference: no-install zip + a portable JDK
# (not a Windows service), path of your choosing, e.g.:
#   JAVA_HOME=<neo4j-dir>\jdk-21.0.12.1+1  <neo4j-dir>\neo4j-community-5.26.30\bin\neo4j.bat console
# or one-shot: bash "../DSH-based Agent Service/scripts/start_backend.sh"
```

## Build and run

```bash
npx tsx src/build/buildLance.ts --all        # L1 vector table (11 databases, 946 rows)
npx tsx src/build/buildConsensus.ts          # L2 consensus table (11 namespaces, 91 entries)
npx tsx src/graph/loadNeo4j.ts --all --wipe  # graph (LE 50 / PE 74 / LA 277 / PA 784 · PAS 37; 1,185 nodes)
npx tsx src/mcp/server.ts --http 28795       # MCP server (dsh connects directly; drop --http for stdio)
```

## MCP tools (`dlr` shape, 7)

`dlr_semantic_query` (L1 recall) · `dlr_search_consensus` (L2 consensus) · **`dlr_search_sop`** (L3, retrieval-delivered) ·
`get_pe_mapping` (second hop) · `get_le_attrs` · `get_full_data_info` (drill down to unmodeled physical columns) · `execute_sql` (**subprocess + 20s hard timeout**, `TSM_SQL_TIMEOUT_MS` tunable)

> The `dlr-state` shape (Cloud-OpsBench) = **3**: `state_model_query` (symptom → model slice) · `dlr_search_consensus` · `dlr_search_sop`.

> ⚠ L2 tool-name lineage: this service uses `dlr_search_consensus` (the historical Python implementation used `dlr_search_evidence` — "evidence" is a BIRD dataset field name, not a paradigm term).
> The other 4 tools share name and shape; L2's **return shape and score calibers match the historical implementation**, differing only in qid numbering.

## Verification (`src/verify/`, all self-proof against `scenarios/*/fixtures/`, zero Python)

| Script | Against | Result |
|---|---|---|
| `parity_dlr.ts` | YAML→vector rows vs the Python line's output (fixtures manifest) | id/name/PAS text verbatim identical |
| `embed_parity.ts` | Node(ONNX) encoding (vs the Python line, via fixtures history) | cosine 1.000000 (verified) |
| `tool_parity.ts` | the full chain (LanceDB+Neo4j) vs `dlr_semantic_query` truths | **paired by id**, field by field (positional comparison false-alarms on new LEs); 1 known description drift = `LOGICAL.Loan` (its fixture predates the 09-29 caliber) |
| `consensus_parity.ts` | L2 retrieval vs the Python line's truths | content and scores bit-identical |
| `pe_mapping_parity.ts` | the second hop vs `get_pe_mapping` truths | JSON byte-identical (incl. database_url) |
| `execute_sql_check.ts` | SQL execution vs truths | same results + same rejection conventions |
| `precheck.ts` | — | connects to the MCP server and lists tools (used by launcher prechecks) |

**⚠ Encoding pitfall (fixed inside `TextEncoder`)**: sentence-transformers uses the old `do_lower_case=true` tokenizer,
while a fast tokenizer does **not** lowercase automatically → uppercase English becomes `[UNK]` and vectors silently drift. `toLowerCase()` is mandatory before encoding.

**⚠ MCP HTTP mode**: must be **stateful** (a fresh transport + McpServer per session); stateless is incompatible with dsh/fastmcp clients' handshake.
