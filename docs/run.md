# Runbook (2.0)

> Operations: **start the backend / run a question / Web / status surface / troubleshooting.** Commands run under Git Bash (Windows).
> Background: the narrative docs ([01](01-background.md) → [04](04-application.md)); per-tree reference docs: [TSM Core Service](<../TSM Core Service/README.md>) · [DSH-based Agent Service](<../DSH-based Agent Service/README.md>).
> 中文版：[run.zh.md](run.zh.md)

**Contents**: [0](#0-big-picture) · [1](#1-start-the-backend-idempotent) · [2](#2-run-one-question-headless) · [2.1](#21-run-one-cob-case-dlr-state) · [2.5](#25-run-the-exam-dsh-tsm-eval) · [3](#3-web-chat) · [4](#4-status-surface) · [5](#5-graph-backend-what-changes-when-neo4j-is-absent) · [6](#6-troubleshooting) · [7](#7-discipline) · [8](#8-from-zero-the-npm-walkthrough)

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

**`dlr-state` (COB) runs a second stack**: MCP on `:28796` with 3 tools (`state_model_query` · `dlr_search_consensus` · `dlr_search_sop`), no Neo4j graph; its data surface is the upstream benchmark's MCP (started/stopped per case on `:8000`). The two services coexist.

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
- **Batch runs** (4 questions per batch, memory-gated parallel dispatch → `tsm grade` → `tsm stats`): see "How a round is run" in `scenarios/birdminidev/results/README.md`.

### 2.1 Run one COB case (`dlr-state`)

```bash
bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"                   # COB semantic backend :28796 (idempotent)
bash "DSH-based Agent Service/dsh_cob/run_one.sh" <system> <category> <case_id>   # e.g. boutique runtime 1
```

- Artifacts land in `tmp_scripts/cob_runs/` by default (an optional 4th argument sets out_dir); case data comes from the upstream benchmark checkout outside the repo (~3.9 GB, snapshot `ea05daf`, overridable via `COB_DIR`).
- Score: `scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results --match "<glob>"` → `questions.csv` + `summary.md`; `node scenarios/cloudopsbench/eval/stats.mjs` rebuilds `STATS.md` / `DETAIL.md`.
- Either this or the npm `tsm serve :28796` — **not both** (same semantic backend); see [cloudopsbench README](../scenarios/cloudopsbench/README.md) §4.

## 2.5 Run the exam (dsh-tsm-eval)

The 2.0 exam system (`DSH-based Agent Service/dsh-tsm-eval/`, bin `dsh-eval`) drives a scenario's paper end to end: dsh headless per question → `tsm grade` → a replayable report.

```bash
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" doctor                       # 11 preflight checks
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" all --qids 1471,27 --out tmp_scripts/smoke
```

- Default landing is `<scenario>/eval/runs/` — **never scanned by `tsm stats`**; `--ledger` targets `results/`, and runs over 4 questions need `--yes` (batch discipline).
- `report.json` / `report.md` add process metrics, the invalid-round split (TRANSPORT / timeout) and session-log forensics on top of grade's CSV.
- Full reference: [dsh-tsm-eval README](../DSH-based%20Agent%20Service/dsh-tsm-eval/README.md).

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
- COB backend on **:28796**: `curl -s http://127.0.0.1:28796/status`; the two scenarios coexist with independent stores.

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
| `state_model_query` (dlr-state) | LanceDB state model (**no graph**) |

A `dlr-state` scenario exposes only 3 tools (`state_model_query` + the two searches); database and graph tools are not mounted.

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
| COB case reports a port conflict / the service binds the wrong port | Set `COB_MCP_PORT` and `CLOUDOPSBENCH_MCP_PORT` **as a pair** (the first alone leaves the upstream service on 8000 → port collision) |
| COB won't start and reports a missing case | The upstream benchmark checkout (~3.9 GB, snapshot `ea05daf`) is not at the expected path; set `COB_DIR` or follow the [COB README](../scenarios/cloudopsbench/README.md) §4 |

## 7. Discipline

- **Runtime = dsh host + MCP surface + status surface; dev = the `tsm` CLI** (`tsm build` / `tsm verify` / `tsm grade` / `tsm stats` / `tsm viz` / `tsm coverage` / `tsm scenario`).
  `tsm viz [--open] [--db <name>]` renders the self-contained DLR graph page (LE/PE/ARCS/PAS; click a PE for its column mapping) into `<DATA_DIR>/viz/dlr-graph.html`.
- **The backend is started/stopped by the operator**; every command in this runbook is **repeatable** (idempotence is a design goal).
- Configuration changes (patches / plugins) → restart the host; **L3 source `sources/sop.md` → `tsm build sop`, effective without a host restart** (the old `sync_sop.sh` is retired).
- Paths and data dirs (all env-overridable): `TSM_DATA_DIR` (store/cache/viz; default `<service>/.store` in-repo, `~/.tsm` when installed), `TSM_DATASET_DIR` (default = repo root), `TSM_SCENARIO` (path or package name), `TSM_OUT_DIR` (scenario write target), `TSM_MODEL_DIR`, `TSM_STORE_DIR`, `TSM_CACHE_DIR`, `TSM_MCP_URL`, `TSM_GRAPH_BACKEND`.
- Temporary artifacts go to `tmp_scripts/` or are deleted on the spot.
- **Batch + grading**: `run_batch.sh --qids ... --jobs 4` → `tsm grade --run <dir>`; the three-tier verdicts, reversal policy and migration-period discipline (**4 questions per batch**, at most two passes per question, always re-run after writing a clause, full re-judge after policy changes) are in [eval.md](eval.md) §5.
- **COB does not grade through `tsm grade`**: use `scenarios/cloudopsbench/eval/grade.sh` + `stats.mjs` (the upstream scorer's caliber), see [eval.md](eval.md) §5 "COB batch runs".

## 8. From zero: the npm walkthrough

> Audience: a fresh machine with only **Node + npm**. Goal: stand the whole thing up from npm — dsh first, then the semantic backend, then the bundle — and ask a real question. The pieces are three packages: the **service** `tsm-core-dlr`, the **scenario content** (`tsm-scenario-*`, one package per benchmark — this walkthrough uses `tsm-scenario-birdmini`; the Cloud-OpsBench pass — npm side plus running a real case from a repo checkout — is at the end), and the **dsh bundle** `dsh-tsm-agent` (which depends on the service).

**0) Prerequisites**

| Item | Check | Notes |
|---|---|---|
| Node ≥ 23.4 (24 recommended) | `node -v` | Runs the service and dsh (`node:sqlite` without a flag) |
| npm | `npm -v` | |
| Neo4j 5.x — **optional** | — | Skip on the first pass: without it the service uses the in-memory graph (§5) |

**1) Install dsh (the host, first)**

```bash
npm i -g @deepseek-ai/dsh@0.2.0-rc.2 pnpm
dsh --help            # should print the CLI usage
```

Configure model credentials for dsh itself (settings UI, or a `DEEPSEEK_API_KEY` environment variable); `DSH-based Agent Service/dsh_dlr/.env.example` in this repo is a working reference. `pnpm` is what `dsh plugin` forwards to — bundle installs need it.

**2) Install the service and the scenario content**

```bash
npm i -g tsm-core-dlr tsm-scenario-birdmini
tsm --help            # should list: serve / status / build / verify / fetch-model / scenario / ...
```

**3) One-time config: `~/.tsm/.env`**

```bash
mkdir -p ~/.tsm
cat > ~/.tsm/.env <<'EOF'
TSM_SCENARIO=tsm-scenario-birdmini
TSM_DATASET_DIR=$HOME/tsm-data
EOF
```

Why here: the service loads `<service>/.env`, then `<data-dir>/.env` (default `~/.tsm` when installed from npm); system environment variables win over both. With this file in place every `tsm` command runs bare — no inline prefixes to forget.

**4) Fetch the model and the dataset**

```bash
tsm fetch-model        # ONNX encoder ~95 MB (hf-mirror) → ~/.tsm/models/bge-onnx
mkdir -p ~/tsm-data
# dataset ~1.4 GB: download mini_dev from https://github.com/bird-bench/mini_dev
# and unpack to ~/tsm-data/MINIDEV_sqlite/ (mini_dev_sqlite.json + 11 .sqlite files)
ls ~/tsm-data/MINIDEV_sqlite/mini_dev_sqlite.json   # must exist
```

**5) Build the indexes**

```bash
tsm scenario           # sanity: scenario=tsm-scenario-birdmini, source=env-package, dataset path
tsm build all          # L1 vectors (946 rows) + L2 consensus (91) + L3 SOP; `graph` is a memory self-check
```

**6) Serve** (keep this terminal open)

```bash
tsm serve --http 28795
# new terminal:
tsm status             # ok:true; graph LE 50 / PE 74 / PA 784 · PAS 37
tsm verify precheck    # connects to the server and lists the 7 tools
```

**7) Wire the bundle into dsh**

```bash
dsh plugin --profile web add dsh-tsm-agent           # pulls tsm-core-dlr with it
dsh plugin --profile headless add dsh-tsm-agent      # optional: for one-shot CLI runs
# ⚠ installing ≠ selecting: add dsh-tsm-agent to each profile's dsh.profile.bundles
#   (ticking it in the Plugin Manager does both)
```

**8) Ask a question**

```bash
dsh web                # the status card (bottom right) should show both lamps green
```

Ask: `What is the ratio of customers who pay in EUR against customers who pay in CZK?`
Expected: tool calls under `mcp__semantic-core__*` (semantic query → PE mapping → `execute_sql`), and the answer **0.0657**.

One-shot CLI variant (with the headless bundle enabled):

```bash
dsh --profile headless --json "Question: What is the ratio of customers who pay in EUR against customers who pay in CZK?"
```

### Another scenario — Cloud-OpsBench (K8s RCA)

The second shipped scenario, `tsm-scenario-cloudopsbench`, is a `dlr-state` model for Kubernetes root-cause diagnosis (754 cases); its TSM surface is **3 tools** (`state_model_query` · `dlr_search_consensus` · `dlr_search_sop`). Two differences from birdmini: the `dlr-state` path loads **no graph** (Neo4j unnecessary), and the two services **coexist** — own store, own port (birdmini stays on 28795).

**npm side (the semantic layer) — steps 2/5/6, the COB edition:**

```bash
npm i -g tsm-scenario-cloudopsbench
TSM_SCENARIO=tsm-scenario-cloudopsbench TSM_STORE_DIR=$HOME/.tsm/lance/cloudopsbench tsm build lance
TSM_SCENARIO=tsm-scenario-cloudopsbench TSM_STORE_DIR=$HOME/.tsm/lance/cloudopsbench tsm build consensus
TSM_SCENARIO=tsm-scenario-cloudopsbench TSM_STORE_DIR=$HOME/.tsm/lance/cloudopsbench tsm build sop
TSM_SCENARIO=tsm-scenario-cloudopsbench TSM_STORE_DIR=$HOME/.tsm/lance/cloudopsbench tsm serve --http 28796
```

**To actually run a case — the repo-checkout side.** The case data and the diagnostic interface come from the **upstream benchmark** (~3.9 GB checkout of [LLM4Ops/Cloud-OpsBench](https://github.com/LLM4Ops/Cloud-OpsBench) outside the repo, snapshot `ea05daf`, path overridable via `COB_DIR`); the per-case assembly lives repo-side in `DSH-based Agent Service/dsh_cob/` and is not shipped on npm. dsh_cob's idempotent script brings up the semantic backend itself (:28796 — pick it **or** the npm `tsm serve` above, not both):

```bash
bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"                   # COB semantic backend :28796 (idempotent)
bash "DSH-based Agent Service/dsh_cob/run_one.sh" <system> <category> <case_id>   # one case (e.g. boutique runtime 1); artifacts land in [out_dir] (optional 4th arg, default tmp_scripts/cob_runs/)
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results --match "<glob>"   # score → questions.csv + summary.md
node scenarios/cloudopsbench/eval/stats.mjs                                       # rebuild STATS.md / DETAIL.md / DETAIL/<family>.md
```

In short: the npm packages give you COB's **semantic side**; the case data and the full 754-case evaluation run from a **repo checkout** — per-case assembly, the two-lane port pair (`COB_MCP_PORT` / `CLOUDOPSBENCH_MCP_PORT`) and the grading caliber are detailed in the [scenario README](../scenarios/cloudopsbench/README.md) §4.

**Troubleshooting (npm route)**

| Symptom | Fix |
|---|---|
| `EBADENGINE` on `npm i -g` | Node < 23.4 — upgrade Node |
| Error that `TSM_SCENARIO=...` is neither a path nor an installed scenario package | scenario package not installed into the same global root (`npm i -g tsm-scenario-birdmini`), or `~/.tsm/.env` missing |
| `tsm scenario` reports `source=default` | the scenario package was not picked up — recheck `~/.tsm/.env` |
| Port 28795 already in use | `netstat -ano \| grep :28795` → `taskkill //F //PID <pid>` |
| Web shows no status card / no `preset-dlr` | bundle installed but not selected (see step 7) |
| Questions get no tool calls | model credentials not configured (see step 1), or the service terminal is not running |

> Any step that does not match its "expected" line = a portability regression: report it back to this repo.

## Related

- Scenario packages and the exam paper: [04-application.md](04-application.md) | evaluation: [eval.md](eval.md) | portability and extension boundary: [roadmap.md](roadmap.md)
