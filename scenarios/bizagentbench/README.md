# tsm-scenario-bizagentbench

TSM scenario package for **BizAgentBench** — a payment-domain, long-horizon agent benchmark (50 cases).
It adds the Three-Level Semantic Modeling layers on top of the dataset. It does not modify the dataset's
cases, knowledge, tools or verifier.

## Layers

| Layer | File | Size | What it is |
|---|---|---|---|
| L1 | `sources/configs/DLR/operations_desk.yaml` | 23 LE · 16 PAS | Schema-level business objects with lifecycles and mounted capabilities; record surfaces anchored by case scope; zero instance values. |
| L2 | `sources/consensus/{shared,operations_desk}.jsonl` | 20 | Cross-object conventions: units, quote vs settlement, per-payment delivery fees, reserve conditions, amendment vs allocation, evidence versions, rail and exit rules. |
| L3 | `sources/sop.md` | 2 | Problem-class playbooks keyed by the customer opening. The title is the retrieval trigger; the body is the class method — no instance amounts, record IDs or fixed sequences. |

L1 is authored from the dataset's own `DB-index` / `DB-*` / `DESK-*` / `tool_catalog`; it is schema-level,
so the same model serves every Operations Desk case. L3 sections are additions of this package and are
**not** dataset content.

## Dataset

BizAgentBench `bizagentbench-payment-v1`: 50 cases (1–30 Operations Desk, 31–50 PSP), 789 knowledge
documents (621 searchable), 601 capabilities, 404 world collections / 3,121 records. The dataset is
external; point `BIZAGENTBENCH_DIR` at its checkout. The PSP namespace is not modeled yet.

## Use with tsm-core-dlr

```bash
TSM_SCENARIO=tsm-scenario-bizagentbench   # installed package
# or a path: TSM_SCENARIO=/path/to/scenarios/bizagentbench
tsm build all
tsm serve --http 28795
```

The service exposes `state_model_query` (L1), `dlr_search_consensus` (L2) and `dlr_search_sop` (L3).
L1 responses carry each object's lifecycle, mounted capabilities (name / anchor / guard) and, for the
bridge, the list of public record collections accepted by `search_records`.

## Evaluation bridge (optional)

`eval/` wires the DLR tools into the upstream BizAgentBench harness, replacing `search_knowledge` /
`read_document` with `dlr_l1` / `dlr_l2` / `dlr_l3`. The user simulator, environment and deterministic
G/P/F verifier are unchanged.

```bash
# 1) build an isolated store (does not touch other scenarios)
TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... \
  npx tsx "../../TSM Core Service/src/build/buildLance.ts" --all
# same env: buildConsensus.ts / buildSop.ts

# 2) start the bridge (default port 28797)
TSM_SCENARIO=... TSM_STORE_DIR=... TSM_MODEL_DIR=... npx tsx eval/dlr_server.mjs

# 3) run one case
eval/run_dlr_pilot.sh runs/dlr-001 1
```

Overrides: `BIZAGENTBENCH_DIR`, `TSM_SERVICE_DIR`, `DEEPSEEK_ENV_FILE`, `BIZ_PYTHON`, `BIZ_DLR_PORT`.
The Python harness needs the benchmark's own requirements; the bridge itself is Node.

## Final results (assisted)

| case | strict | G | P | F | tool calls | tokens |
|---|---|---|---|---|---|---|
| case_001 | ✅ | ✅ | ✅ | ✅ | 188 | 6,302,559 |
| case_002 | ✅ | ✅ | ✅ | ✅ | 313 | 23,734,153 |
| case_003 | ✅ | ✅ | ✅ | ✅ | 253 | 9,445,421 |
| case_004 | ✅ | ✅ | ✅ | ✅ | 505 | 16,279,513 |
| case_005 | ✅ | ✅ | ✅ | ✅ | 339 | 14,006,648 |

Artifacts: `results/dlr-pilot/case_00*_result.json`.

## Dataset vs additions

The dataset's 621 searchable documents do **not** include this package's L1/L2/L3. Report results in two
tracks: **bare** (dataset knowledge tools only) and **assisted** (DLR tools); do not mix the two.

## License

MIT.
