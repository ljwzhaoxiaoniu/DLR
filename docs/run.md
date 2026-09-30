# Runbook (2.0)

> Operations: **start the backend / run a question / Web / status surface / troubleshooting.** Commands run under Git Bash (Windows).
> Background: the narrative docs ([01](01-background.md) → [04](04-application.md)); per-tree reference docs: [TSM Core Service](<../TSM Core Service/README.md>) · [DSH-based Agent Service](<../DSH-based Agent Service/README.md>).

## 0. Big picture

```
dsh (headless / web)
   │  MCP (streamable-http :28795, 7 tools)
   ▼
tsm-core-dlr (node process): LanceDB (vectors) + ONNX encoder (in-process)
   │  graph backend, two tracks:
   │    · memory  — YAML → in-process graph (default; zero deps, zero locks)
   │    · neo4j   — bolt :7687 (optional; enabled by NEO4J_URI)
   ▼
dataset (MINIDEV_sqlite, gitignored; manual download)
```

**Processes**: the TS MCP server always; Neo4j only when the Neo4j graph backend is in use (the default in this repo — see §5). LanceDB and the encoder are libraries embedded in the MCP process, not services.

## 1. Start the backend (idempotent)

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"
```

- The criteria are **functional**: Neo4j is probed at `:7474` (skipped when the graph backend is `memory`); the MCP server is probed by **precheck** (actually connecting and listing the 7 tools); a final precheck is the receipt.
- Anything already running is skipped; if it fails to come up, read its logs (`tmp_scripts/neo4j_console.log` / `tsm_mcp.log`).
- ⚠ **After changing `TSM Core Service/src/**`, restart the MCP server** — the tsx process does not hot-reload; the script will just say "already running". Kill the port first (`netstat -ano | grep :28795` → `taskkill //F //PID <pid>`), then rerun the script.
- ⚠ Neo4j is a **foreground console process**: closing the terminal that started it may take it down; rerunning this script brings it back.

## 2. Run one question (headless)

```bash
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" <qid> "<question>"
```

- Artifacts: `tmp_scripts/dsh_smoke/<stamp>_<qid>_dlr.ndjson` (the `--json` event stream) plus a same-named `.err`.
- The backend is prechecked automatically; an unreachable backend **exits loudly** (exit 3) instead of burning model calls.
- Session logs: `DSH-based Agent Service/.dsh-home/sessions/<project-dir>/<session-id>/session.v4.jsonl.zstd` (**multi-frame zstd**; decoder: `DSH-based Agent Service/scripts/decode_session_log.cjs`).
- **Batch runs** (parallel → grade → stats): see "How a round is run" in `scenarios/birdminidev/results/README.md`.

## 3. Web chat

```bash
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

- Default preset = `dlr` (semantic business assistant). Agent rules (`AGENTS.md`) ship **inside the bundle** (`dsh-tsm-agent`): a workspace that carries its own `AGENTS.md` wins, otherwise the bundled copy is used — so selecting the workspace is no longer required just for instructions.
- The launcher syncs the status-overlay plugin into `$DSH_HOME/profiles/node_modules`.
- After changing patches / plugins, **restart web** (composition happens at startup).

## 4. Status surface

- The bottom-right **TSM status overlay** (shipped in the `dsh-tsm-agent` bundle) shows: graph-backend lamp (`内存图` / `Neo4j`) · MCP lamp · LE/PE/PA/PAS · vector rows · scenario name · the `图谱 ↗` link; it polls every 10 s.
- Data source = the MCP server's `GET /status` (JSON; CORS allows only dsh web's loopback origins by default):

```bash
curl -s http://127.0.0.1:28795/status
```

  Key fields: `graph.backend` (`memory` | `neo4j`), `graph.fallback_reason` (when `auto` fell back), `scenario.{name,dir,source}`, `service_info.{http_base,viz_url}`, `neo4j.enabled` (compat key).
- **Graph page**: **http://127.0.0.1:28795/viz/dlr** (rendered live by the MCP server; the overlay's `图谱 ↗` points there). Offline/shareable single file: `tsm viz` (writes `<DATA_DIR>/viz/dlr-graph.html`).
- Neo4j Browser: http://localhost:7474 — user `neo4j`, password in `TSM Core Service/.env` (the overlay's `Neo4j ↗` points there; hidden when the backend is `memory`).

## 5. Graph backend (what changes when Neo4j is absent)

`TSM_GRAPH_BACKEND` = `auto` (default) | `memory` | `neo4j`.

- `auto`: tries Neo4j **only when `NEO4J_URI` is set**; on connection failure it **falls back to the in-memory graph** (the choice sticks for the process lifetime; the reason is reported as `graph.fallback_reason` and logged). The in-repo `.env` sets `NEO4J_URI`, so this checkout keeps using Neo4j by default — the 500-question configuration is unchanged.
- `memory`: YAML → in-process graph. No Neo4j needed; **all 7 tools work** (parity with Neo4j is enforced by `tsm verify memory_graph_parity`).
- `neo4j`: requires `NEO4J_URI` and a reachable server; fails loudly otherwise.

| Tool | Backend needed |
|---|---|
| `dlr_semantic_query` · `get_pe_mapping` · `get_le_attrs` | graph (memory **or** Neo4j) |
| `dlr_search_consensus` · `dlr_search_sop` | LanceDB |
| `execute_sql` · `get_full_data_info` | SQLite (+ YAML) |

**Failures are not cached** in the MCP-server sense: with the `neo4j` backend, connection failures reset the handle so tools **self-heal** after Neo4j returns (no restart). A `memory` fallback under `auto`, by contrast, is a *success*: restart the server to go back to Cypher.

## 6. Troubleshooting

| Symptom | Where to look |
|---|---|
| A question burns 600 s with no tool calls | Backend not started: `run_one.sh` prechecks and stops early; run `start_backend.sh` |
| The status card does not appear | ① any plugin warnings in the launcher terminal ② the browser console ③ did you restart web |
| Status card shows the graph lamp red | `curl /status` → `graph.error`; check the backend (`graph.backend`) |
| Changed `src/**` has no effect | The MCP server is a long-running process: kill the port → `start_backend.sh` |
| Web workspace picker errors (Windows) | The `-browse` surface is pinned (native worker crashes); auto + browse cannot both be mounted |
| `EADDRINUSE 3080` on web start | `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| Session log "looks empty" | **Multi-frame zstd**: a single frame decodes to just the header — use `DSH-based Agent Service/scripts/decode_session_log.cjs` |
| Memory pressure | Steady state ≈ 650 MB (Neo4j ~280 + MCP ~330); shut them down when idle — the start script is idempotent |
| dsh reports wrong tool names | The tool surface is `mcp__semantic-core__*`; after a dsh upgrade re-check rows with `--dump-config` |
| `tsm grade` looks stuck (no CPU, no output) | Heavy work = big gold queries / result-set rescue; kill that process and rerun the directory (gold values are disk-cached) |
| A whole batch has **0-token empty rounds** (ndjson stops at step 1, `TRANSPORT`) | Transient network/API break: **voided rounds do not count** — just rerun those questions (`grep -l TRANSPORT raw/*.ndjson` finds them) |
| A question ends with no conclusion sentence | Hit `timeout 600` (runaway agent): tighten that question's L3 clause **answer shape**, then rerun it |
| The backend "wedges" mid-batch (`/status` times out, everything fails) | A pathological agent SQL pinning the single-threaded service — guarded by `execute_sql`'s subprocess + 20 s hard timeout (`TSM_SQL_TIMEOUT_MS`); kill the port → `start_backend.sh` |
| Wrong scenario is live | `tsm scenario` prints the resolved dir + `source` (`env-path` / `env-package` / `default`) |

## 7. Discipline

- **Runtime = dsh host + MCP surface + status surface; dev = the `tsm` CLI** (`tsm build` / `tsm verify` / `tsm viz` / `tsm coverage` / `tsm scenario`).
  `tsm viz [--open] [--db <name>]` renders the self-contained DLR graph page (LE/PE/ARCS/PAS; click a PE for its column mapping) into `<DATA_DIR>/viz/dlr-graph.html`.
- **The backend is started/stopped by the operator**; every command in this runbook is **repeatable** (idempotence is a design goal).
- Configuration changes (patches / plugins) → restart the host; **L3 source `sources/sop.md` → `tsm build sop`, effective without a host restart** (the old `sync_sop.sh` is retired).
- Paths and data dirs (all env-overridable): `TSM_DATA_DIR` (store/cache/viz; default `<service>/.store` in-repo, `~/.tsm` when installed), `TSM_DATASET_DIR` (default = repo root), `TSM_SCENARIO` (path or package name), `TSM_OUT_DIR` (scenario write target), `TSM_MODEL_DIR`, `TSM_STORE_DIR`, `TSM_CACHE_DIR`, `TSM_MCP_URL`, `TSM_GRAPH_BACKEND`.
- Temporary artifacts go to `tmp_scripts/` or are deleted on the spot.
- **Batch + grading**: `run_batch.sh --qids ... --jobs 3` → `tsm grade --run <dir>`; the three-tier verdicts, reversal policy and migration-period discipline (5 questions per batch, at most two passes per question, always re-run after writing a clause, full re-judge after policy changes) are in [eval.md](eval.md) §6.

## 8. New-machine install

> Goal: on a machine that has **only dsh**, stand the whole thing up. Split into three packages: the **service** `tsm-core-dlr`, the **scenario content** `tsm-scenario-birdmini`, and the **dsh bundle** `dsh-tsm-agent` (which depends on the service).

**0) Packages** (from npm; in this checkout, install from paths instead)

```bash
npm i -g tsm-core-dlr                 # the service + `tsm` CLI
npm i -g tsm-scenario-birdmini        # scenario content (one package per benchmark)
```

**1) System dependencies**

| Item | Notes |
|---|---|
| Node ≥ 23.4 (24 recommended) + npm | Runs the service and dsh (`node:sqlite` without a flag) |
| Git Bash (Windows) / bash | Host for all scripts |
| Neo4j 5.x — **optional** | Only for the Neo4j graph backend: `docker run -d --name tsm-neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/<password> neo4j:5`; without it the service uses the in-memory graph |

**2) Model and dataset** (both large; fetched separately)

```bash
tsm fetch-model                                    # ONNX encoder ~95 MB (hf-mirror)
# dataset ~1.4 GB: copy MINIDEV_sqlite/ from the original machine, or download
# mini_dev per docs/eval-line/dataset.md and unpack to <data-root>/MINIDEV_sqlite/
```

**3) Build the indexes** (matching the backend; `graph` is a no-op self-check in memory mode)

```bash
TSM_SCENARIO=tsm-scenario-birdmini TSM_DATASET_DIR=<data-root> tsm build all
```

**4) Serve**

```bash
TSM_SCENARIO=tsm-scenario-birdmini TSM_DATASET_DIR=<data-root> tsm serve --http 28795
# in-repo equivalent: bash "DSH-based Agent Service/scripts/start_backend.sh"
```

**5) dsh side**

```bash
npm install -g @deepseek-ai/dsh@0.2.0-rc.2        # current adapted version
npm install -g pnpm                               # `dsh plugin` forwards to pnpm (needed to install bundles)

dsh plugin --profile web add dsh-tsm-agent        # installs tsm-core-dlr with it
dsh plugin --profile headless add dsh-tsm-agent
# ⚠ installing ≠ selecting: add dsh-tsm-agent to each profile's dsh.profile.bundles
#   (or tick it in the Plugin Manager, which does both)
```

**6) Acceptance**

| Check | Expected |
|---|---|
| `tsm verify precheck` | 7 tools |
| `curl -s localhost:28795/status` | `ok:true`; graph `LE 50 / PE 74 / PA 784 · PAS 37` (in memory **or** Neo4j backend) |
| `bash dsh_dlr/run_one.sh 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"` | answer **0.0657** |
| `bash dsh_dlr/run_web.sh` | both status lamps green |

> Any deviation = a portability problem; report it back to this repo (that is exactly what path decoupling is meant to guarantee).

## Related

- Scenario packages and the exam paper: [04-application.md](04-application.md) | evaluation: [eval.md](eval.md) | portability and extension boundary: [roadmap.md](roadmap.md)
