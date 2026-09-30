# DLR Proj — Decoupled Logic Representation + Three-Level Semantic Modeling

English | [中文](README.zh.md)

**DLR (Decoupled Logic Representation)** is an original **data-source-level** semantic modeling paradigm: a two-layer model (**LE** logical entities / **PE** physical views) plus two mechanisms (**ARCS** projection anchoring, **PAS** semantic routing). It decouples the logical concept layer from the physical data layer so an LLM agent can land natural-language questions on relational databases reliably. See [docs/03-design.md](docs/03-design.md).

The project runs DLR inside the **Three-Level Semantic Modeling (TSM)** framework — **L1 `dlr`** (data-source level) / **L2 `consensus`** (domain-consensus level) / **L3 `sop`** (business-logic level). The admission criteria for a piece of knowledge are the governance line. See [docs/02-concept.md](docs/02-concept.md).

A checkout ships three parts:

| Part | What it is |
|---|---|
| `TSM Core Service/` | The semantic service (TypeScript): LanceDB vectors + Neo4j graph + ONNX encoder, exposing **7 MCP tools** over streamable HTTP |
| `DSH-based Agent Service/` | dsh (DeepSeek Harness) integration: the `dsh-tsm-agent` bundle, launchers, agent rules |
| `scenarios/<name>/` | Complete TSM content packages: three-level sources + exam paper + graded results. Current: `birdminidev` (BIRD mini-dev, 11 databases / 500 questions — **500/500 judged correct**: 426 matching gold exactly, 74 ruled correct under L3 clauses where the dataset's own gold is defective) |

## Table of Contents

- [Quickstart](#quickstart)
- [Architecture](#architecture)
- [Scenario packages](#scenario-packages)
- [Repository layout](#repository-layout)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Branches](#branches)

-----

<a id="quickstart"></a>
## Quickstart

### Prerequisites

| Item | Notes |
|---|---|
| Node.js + npm | The service is TypeScript, run via `npx tsx` / `node` |
| Neo4j 5.x | Local instance (zip + portable JDK) or any Bolt endpoint — set `NEO4J_HOME` (or `NEO4J_URI`) |
| ONNX encoder | `bash "TSM Core Service/scripts/fetch-model.sh"` (~95 MB, from hf-mirror) |
| Dataset | BIRD mini-dev → unpack into `MINIDEV_sqlite/` (gitignored); source links in [docs/eval-line/dataset.md](docs/eval-line/dataset.md) |
| dsh | `@deepseek-ai/dsh@0.2.0-rc.2` (alpha preview; the 500-question run was produced on `0.1.7-alpha.1` and was **not re-run**; re-check patch rows with `--dump-config` after any upgrade) |
| API key | `cp "DSH-based Agent Service/dsh_dlr/.env.example" "DSH-based Agent Service/dsh_dlr/.env"`, fill `DEEPSEEK_API_KEY` |
| Service env | `cd "TSM Core Service" && npm install && cp .env.example .env` (fill `NEO4J_PASSWORD`) |

### 1. Start the semantic backend

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"     # Neo4j + TS MCP server (:28795); idempotent
cd "TSM Core Service" && npx tsx src/verify/precheck.ts     # sanity check — should list 7 tools
```

### 2. Ask one question (headless)

```bash
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" 1471 \
  "What is the ratio of customers who pay in EUR against customers who pay in CZK?"
```

The launcher prechecks the backend, runs `dsh --profile headless --json`, and writes the event stream to `tmp_scripts/dsh_smoke/` (or a directory you pass as the third argument).

### 3. Web chat

```bash
# once per profile: install the bundle, then enable it (Plugin Manager, or the profile's dsh.profile.bundles)
dsh plugin --profile web add "$(pwd)/DSH-based Agent Service/dsh-tsm-agent"
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

The Harness **Plugin Manager** (Settings → Plugins) installs and selects the bundle in one step; the CLI command above installs the package only. The MCP endpoint is overridable with the `TSM_MCP_URL` environment variable.

The TSM status overlay (bottom-right) shows Neo4j / MCP health, LE/PE/PA counts, vector rows, and the active scenario.

### 4. Batch runs and grading

```bash
bash "DSH-based Agent Service/scripts/run_batch.sh" --qids 1471,1472 --jobs 3   # or --db <name> | --all
cd "TSM Core Service"
node bin/tsm.mjs grade --run "<run dir>"    # verdicts → questions.csv + summary.md
node bin/tsm.mjs stats                      # → results/STATS.md + the DETAIL.md ledger
```

### Rebuild semantic assets (after editing sources)

```bash
cd "TSM Core Service"
node bin/tsm.mjs build all                  # lance | consensus | sop | graph  (graph needs Neo4j running; --wipe rebuilds)
```

Editing L1 yaml / L2 consensus / L3 `sop.md` takes effect only after its index is rebuilt. Other CLI verbs: `tsm serve` · `status` · `coverage` · `viz` · `verify`.

-----

<a id="architecture"></a>
## Architecture

```
dsh (DeepSeek Harness: headless / web)
   │  MCP (streamable-http :28795, 7 tools)
   ▼
TSM Core Service (TypeScript): LanceDB (vectors) + ONNX encoder (in-process)
   │  bolt :7687
   ▼
Neo4j (graph: LE 50 / PE 74 / LA 277 / PA 784 · PAS 37; Browser :7474)
   │  sqlite:///
   ▼
Dataset (MINIDEV_sqlite, gitignored)
```

Two processes only: Neo4j + the TS MCP server (LanceDB and the encoder are embedded, not services).

<a id="scenario-packages"></a>
## Scenario packages

A **scenario** is one complete TSM: content lives in `scenarios/<name>/` and is consumed by the service.

| Layer | Carrier | Tool surface |
|---|---|---|
| L1 `dlr` | `sources/configs/DLR/*.yaml` → graph + vectors | `dlr_semantic_query` → `get_pe_mapping` / `get_le_attrs` |
| L2 `consensus` | `sources/consensus/*.jsonl` → vectors | `dlr_search_consensus` |
| L3 `sop` | `sources/sop.md` → retrieval index (built by `tsm build`) | `dlr_search_sop(question)` |

Also in the package: `eval/questions.jsonl` (the exam paper — one line per question: `{question, expected, source}`; answer keys come from the L3 clause for the 74 defect-ruled questions, gold otherwise), `results/<run>/` (graded runs), `fixtures/` (truth sets for the verify suite), `DETAIL.md` + `DETAIL/<db>.md` (ledger).

Current scenario **`birdminidev`**: BIRD mini-dev — 11 databases / 500 questions, all run and judged — **500/500** (✅ 426 + 🔁 74 dataset-defect rulings; zero errors). Token median ≈ 55.9k per question (mean 73.3k), ~6 steps / 10 tool calls. Ledger: [scenarios/birdminidev/DETAIL.md](scenarios/birdminidev/DETAIL.md).

Switching scenarios: point the service at another package (`TSM_SCENARIO=<path>`), rebuild, and follow the checklist in [docs/04-application.md](docs/04-application.md).

-----

<a id="repository-layout"></a>
## Repository layout

```
DLR Proj/                          # branch 2.0
├── docs/                          # narrative 01–04 + operations (run / eval / roadmap) + README index
│                                  #   └── eval-line/   evaluation-line archive (read-only reference)
├── scenarios/birdminidev/         # ★ scenario package: sources/{configs,consensus,sop.md} + eval/ + fixtures/ + results/
├── TSM Core Service/              # semantic service (TS): LanceDB + Neo4j + MCP server
├── DSH-based Agent Service/       # dsh integration: bundle (dsh-tsm-agent) / launchers / agent rules
├── Evaluation/ · validated_results/   # evaluation line (used on branch 1.5)
├── archive/                       # history (v2/v3, old docs and share pages) — read-only
└── MINIDEV_sqlite/                # dataset (gitignored, download required)
```

<a id="documentation"></a>
## Documentation

| I want to… | Read |
|---|---|
| Understand the why | [docs/01-background.md](docs/01-background.md) |
| Understand the concepts (three levels, admission criteria) | [docs/02-concept.md](docs/02-concept.md) |
| Model a database (DLR spec + self-check) | [docs/03-design.md](docs/03-design.md) |
| Build / switch a scenario package | [docs/04-application.md](docs/04-application.md) |
| Run (backend, questions, web, status, troubleshooting) | [docs/run.md](docs/run.md) |
| Evaluate (exam paper + harness) | [docs/eval.md](docs/eval.md) |
| Portability and extension boundary | [docs/roadmap.md](docs/roadmap.md) |
| Evaluation-line archive (three-paradigm comparison, v4 baselines) | [docs/eval-line/](docs/eval-line/) |

<a id="troubleshooting"></a>
## Troubleshooting

| Symptom | Fix |
|---|---|
| A question burns its whole timeout with no tool calls | Backend not up: run `start_backend.sh` (the launcher prechecks and stops early) |
| Web UI fails with `EADDRINUSE 3080` | Stale instance: `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| Tool names unknown to the model after a dsh upgrade | re-check patch rows with `--dump-config` (the bundle is verified on `0.2.0-rc.2`) |
| `tsm grade` appears stuck | Pathological agent SQL is bounded by a 20 s subprocess timeout; slow gold queries are disk-cached (`TSM_GOLD_NO_CACHE=1` bypasses) |
| More rows | [docs/run.md](docs/run.md) troubleshooting table |

<a id="branches"></a>
## Branches

- **`2.0`** (this checkout) — the DLR + TSM continuous line: scenario packages, TS semantic service, dsh integration.
- **`dlr-eval-v1.5`** — the evaluation line (three-paradigm isomorphic comparison ER/DLR/RDF, four-stage pipeline, v4 baselines; `Evaluation/`, `validated_results/`). The two lines evolve independently; `docs/eval-line/` here is read-only reference.

> Repo-level instructions for agents: [CLAUDE.md](CLAUDE.md).
