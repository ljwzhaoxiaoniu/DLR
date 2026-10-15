# DSH-based Agent Service — DLR plugged into DeepSeek Harness

English | [中文](README.zh.md)

Plug **the DLR paradigm** into dsh (DeepSeek Harness).

**Backend = `TSM Core Service/` (TS/Node stack: LanceDB + Neo4j + MCP, direct streamable-http)** — no Python, no bridge.

Three-level semantic modeling (TSM): **L1 = DLR** ｜ **L2 = Domain Consensus** ｜ **L3 = SOP**.

## Structure

```
DSH-based Agent Service/
├── AGENTS.md                 # the dsh-side evaluation agent rules (standalone file, same source content as the OC version)
├── README.md · README.zh.md  # ← this doc (EN primary + 中文对照)
├── .gitignore                # .dsh-home/, .env
├── scripts/
│   ├── start_backend.sh      # one-shot backend start (Neo4j + TS MCP server; idempotent + precheck)
│   ├── run_batch.sh          # batch runner (parallel dispatch + a 700MB memory gate; artifacts land in the scenario's results/)
│   └── decode_session_log.cjs # session-log (multi-frame zstd) decoder
├── dsh-tsm-agent/            # ★ bundle (`dsh plugin add`): MCP gateway + preset-dlr + status overlay + skills
│   ├── cordis.patch.yml      #   rows: mcp-semantic-core · dlr-status · preset-dlr (persona/skills/compaction)
│   ├── skills/               #   paradigm (cognition layer, scenario-independent); L3 is index-retrieved (no skill ships per scenario)
│   └── lib/client.js         #   the TSM status overlay (browser half)
├── dsh-tsm-eval/             # the exam system (bin `dsh-eval`: run / score / report / all / doctor / parity)
├── dsh_cob/                  # COB run assembly (run_one.sh + its own backend on :28796; not shipped on npm)
├── .dsh-home/                # runtime-generated (=$DSH_HOME; session logs live here — forensics, safe to delete)
└── dsh_dlr/
    ├── dsh.patch.yml         # headless local policy: disable list / model / persona / instruction candidates
    ├── dsh-web.patch.yml     # web local policy: process teardown / directory-picker fix / registry default preset
    ├── run_one.sh            # single-question runner (precheck + dsh headless)
    ├── run_web.sh            # Web UI launcher (precheck + dsh web)
    └── .env.example          # DEEPSEEK_API_KEY → copy to .env
```

## Dependencies

| Item | Value |
|---|---|
| dsh | `@deepseek-ai/dsh@0.2.0-rc.2` (current target; the 500-question run was produced on `0.1.7-alpha.1` and was **not re-run**; re-check `--dump-config` rows before upgrading) |
| Semantic backend | `TSM Core Service/` (`src/mcp/server.ts --http 28795`; Neo4j running) |
| Neo4j | any local Bolt endpoint (dev-machine reference: no-install zip + portable JDK under a path of your choosing, not a Windows service) |

## Run

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"        # start the backend (idempotent)

# one question (prechecks the backend)
bash "DSH-based Agent Service/dsh_dlr/run_one.sh" 1471 "What is the ratio of customers who pay in EUR against customers who pay in CZK?"

# Web chat (default preset = dlr)
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
#   ↑ the TSM status card appears bottom-right: graph backend / MCP lamps · LE/PE/PA/PAS · vector rows · scenario name · graph-page link
#     (prerequisite: the dsh-tsm-agent bundle is installed — dsh plugin --profile web add "<abs>/DSH-based Agent Service/dsh-tsm-agent")
```

## Scenario (one complete TSM)

Content lives at the repo root `scenarios/<name>/` (currently `birdminidev` and `cloudopsbench`):

| Level | On a scenario switch | Carrier |
|---|---|---|
| L1 DLR | remodel / rebuild | `scenarios/<s>/sources/configs/{ER,DLR,RDF}/*.yaml` → built by `TSM Core Service` |
| L2 Domain Consensus | swap the consensus sources | `scenarios/<s>/sources/consensus/*.jsonl` → `buildConsensus.ts` (per-namespace isolation) |
| L3 SOP | swap one source file | `scenarios/<s>/sources/sop.md` → compiled by `buildSop.ts` into the retrieval index (`dlr_search_sop`) |
| Cognition layer | **never touched** | `skills/paradigm/SKILL.md` (scenario-independent) |
| Reference truths | per scenario | `scenarios/<s>/fixtures/*.json` (for the verify suite) |

**The iron rule: L3 is retrieval-delivered** — the model layer only ever calls `dlr_search_sop` (which returns the matched section per question); "which SOP set is in play" is decided at scenario-build time (`sources/sop.md` → `tsm build sop`), and the model layer never chooses.

## MCP tool surface (`dlr` shape, 7)

`dlr_semantic_query` · `dlr_search_consensus` · `dlr_search_sop` · `get_pe_mapping` · `get_le_attrs` · `get_full_data_info` · `execute_sql`

(Plus the harness-side skill tool `skill` — loads the `paradigm` cognition skill on demand, not an MCP tool. The `dlr-state` shape (COB) = 3: `state_model_query` · `dlr_search_consensus` · `dlr_search_sop`; the contract table lives in the [TSM Core Service README](<../TSM Core Service/README.md>).)

> The L2 tool name differs from the Python line (1.5): there it is still `dlr_search_evidence` (BIRD legacy naming).

## Troubleshooting (the essentials)

| Symptom | Where to look |
|---|---|
| A question burns 600 s with no tool calls | Backend not up: `run_one.sh` prechecks and stops early; run `scripts/start_backend.sh` |
| Web fails with `Preset services require isolate realms` | `preset-dlr`'s compaction group lacks `isolate` (copy the standard preset) |
| Web workspace picker errors (Windows) | The `-browse` surface is pinned (native worker crashes); auto + browse cannot both be mounted |
| Web start fails with `EADDRINUSE 3080` | stale instance → `netstat -ano \| grep :3080` → `taskkill //F //PID <pid>` |
| dsh reports wrong tool names | the surface is `mcp__semantic-core__*`; after a dsh upgrade re-check rows with `--dump-config` |
| MCP handshake hangs | HTTP mode must be stateful (see the TSM Core Service README's lesson) |
