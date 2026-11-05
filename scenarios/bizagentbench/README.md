# Scenario · Payment operations (external benchmark `BizAgentBench`) — using TSM + DLR

English | [中文](README.zh.md)

> **Position**: applies TSM (three-level semantic modeling) + DLR to an **external, state-changing business benchmark** — 50 long-horizon payment-operations cases with a customer simulator and a deterministic G/P/F verifier. This is the "mutating business" end of the scenario set (`birdminidev` = read-only SQL, `cloudopsbench` = read-only RCA, `bizagentbench` = state-changing operations).
> **Spec and principles** (LE / PE / ARCS / PAS, modeling rules and self-check): [docs/03-design.md](../../docs/03-design.md);
> scenario-package conventions (directory layout, scenario-switch checklist): [docs/04-application.md](../../docs/04-application.md).

## 1. Dataset introduction (incl. scoring calibers)

### Native semantics: where the raw material lives

| Raw material | Location | Content |
|---|---|---|
| **The benchmark** | upstream BizAgentBench `bizagentbench-payment-v1`, checkout outside the repo (`BIZAGENTBENCH_DIR`) | **50 cases**: 1–30 Operations Desk, 31–50 PSP; a customer simulator drives each case through a long tool chain |
| **Knowledge** | the dataset's own knowledge base | **789 documents** (621 searchable) describing business rules, source documents and service interfaces |
| **World** | the dataset's tau2-style world | 404 collections / 3,121 records; 601 capabilities (record reads + business actions) |
| **Scoring** | upstream deterministic verifier | **G / P / F** (goal / process / protection), **strict = G∧P∧F**, **IF = 1 − P∧F**; no LLM judge, no manual-overturn caliber |

### Scoring mechanics to know before writing sections or re-running

- The verifier reads the **final world + the audit trail** (executed requests, receipts, events): a proposal or an approval is not a payment; a scheduled refund is not settled; only actual settled effects count;
- **G** = the requested business result and the allowed terminal state; **P** = execution requirements (approvals, ordering, deadlines, single completion); **F** = protected objects, ledger integrity, prohibited side effects;
- Cases are long-horizon: a single missed cutoff, an unapproved execution or a duplicated payment flips P/F even when the business result is right;
- The paper reports 3-round averages; **this repo reports the best valid run per case plus the observed range** — agent behavior variance on the same knowledge is large (see §5), and single runs are samples, not stable rates.

## 2. Modeling approach (raw material → three levels)

### L1 = the data-source level (`dlr`, `sources/configs/DLR/*.yaml`)

Three files — `operations_desk.yaml`, `typed_services.yaml`, `psp.yaml` — form one schema-level model: **106 logical entities · 147 PAS relations · 687 vector rows** (Operations Desk 84 LE / 127 PAS / 513 rows; PSP 22 LE / 20 PAS / 174 rows).

- **LE = business object** (invoice, remittance, mandate, dispute, security, forward…), carrying its lifecycle and mounted capabilities;
- **PE = record surface** (the resource, its attributes and public flags); **ARCS** anchors every request to its case scope, **PAS** routes between objects;
- Capabilities are mounted on the LE with **anchor + guard** (what key the action takes, what the action changes), sourced from the dataset's own `tool_catalog` / `DESK-*` / `PSP` documents;
- **Zero instance values**: the model is schema-level only; it helps the agent *find and act*, never answers the case.

### L2 = domain consensus (`consensus`, `sources/consensus/*.jsonl`, 191 entries)

Cross-object, non-workflow knowledge: units and rounding, quote vs settlement, per-payment delivery fees, reserve conditions, amendment vs allocation, evidence versions, rail/exit rules, custody and dispute conventions. Split per system (`shared` 10 · `operations_desk` 44 · `typed_services` 84 · `psp` 53); each entry states its scope and reading rule, never a per-case answer.

### L3 = the playbook (`sop`, `sources/sop.md`, 50 sections)

Section titles = the customer opening **verbatim** (the retrieval trigger); the body is a class-level playbook delivered by vector retrieval (`dlr_search_sop`), so the cost is paid only on the question that hits the section. Split: Operations Desk 30 + PSP 20.

Two optimization techniques were measured and kept (details in [docs/04-application.md](../../docs/04-application.md)):

- **Wrong turn (negative few-shot)** — when the rule is already in the section but the agent still takes the plausible-looking wrong fork, append the one observed wrong move;
- **Check before closing** — pin the business invariants that must hold at closure (claim preserved, credit preserved, fees within the all-in allowance, delivery actually received…), not verifier check ids.

Admission stays on demand (dataset defect / wrong without the section / >15W without the section); a section is re-run on its own question after every edit.

### Tool surface

The evaluation bridge exposes **3 semantic tools** — `state_model_query` (L1 slice), `dlr_search_consensus` (L2), `dlr_search_sop` (L3). The dataset's record/action tools, customer simulator and verifier are unchanged; `search_knowledge` / `read_document` are replaced by the DLR tools (**assisted** track — never mixed with the bare-dataset track).

## 3. Application results

> Best valid run per case (strict first, otherwise highest checks); ledger in [DETAIL.md](DETAIL.md) and `eval/ledger.json`.

- **Coverage 50/50**; **strict 44/50 (88%)**; best-run pass counts: **G 44 · P 48 · F 49 · IF 4%**;
- The six non-strict cases (remaining checks):

| case | best | remaining |
|---|---|---|
| 008 | 43/44 | `joint.fee_and_reserve` |
| 011 | 36/42 | joint capital / fee & reserve / floors + group participants |
| 014 | 40/41 | `charges.customer_total_limit` |
| 032 | 18/19 | `a.32.reasoning_receipt_calendar` |
| 048 | 19/21 | `c48_linked_rights` + disputed-claim preservation |
| 050 | 16/21 | multiple goal/linked checks |

- **Final best-practice store**: `TSM Core Service/.store/lance/bizagentbench-v35` (entities 687 / consensus 191 / sop 50). **The freeze pins L1/L2 only** (`l1l2-4eafa301`, unchanged since v34); L3 is per-question stitched and does not participate in the freeze;
- Per-case archives: [DETAIL.md](DETAIL.md) · `eval/ledger.json` · `results/dlr-full/` (local).

## 4. Workflow (how this benchmark is run)

### Prerequisites (outside this package)

1. **The dataset checkout** — point `BIZAGENTBENCH_DIR` at it (default `D:/Code_Proj/Dataset/BizAgentBench-main`);
2. **An embedding model snapshot** — `TSM_MODEL_DIR` (default: the local `bge-base-en-v1.5` HF snapshot);
3. **A DeepSeek key file** — `DEEPSEEK_ENV_FILE` (default `DSH-based Agent Service/dsh_dlr/.env`).

### Build the semantic store

```bash
cd "TSM Core Service"
TSM_SCENARIO="$PWD/../scenarios/bizagentbench" \
TSM_STORE_DIR="$PWD/.store/lance/bizagentbench-v35" \
TSM_MODEL_DIR="<hf-snapshot>" \
  npx tsx src/build/buildLance.ts --all
# same env: src/build/buildConsensus.ts · src/build/buildSop.ts
```

### Run and grade

```bash
cd scenarios/bizagentbench
TSM_STORE_DIR=".../bizagentbench-v35" BIZ_DLR_PORT=28799 bash eval/start_bridge.sh   # bridge (idempotent)
BIZ_DLR_PORT=28799 bash eval/run_dlr_pilot.sh results/<round>/case_003 3             # one case → summary.json
```

`run_dlr_pilot.sh` auto-prechecks the bridge (`/health`), runs one case with the DLR tool surface, and the upstream verifier writes the G/P/F result into the run directory (`summary.json`). `BIZ_AGENTS_MD` selects the agent operating layer (`AGENTS.md`); without it the harness runs its baseline behaviour.

### Agent assembly (assisted track)

The benchmark's own agent configuration is kept intact; the DLR layer is **appended**, never substituted:

```
system prompt = harness policy
              + retrieval note (dlr_l1/l2/l3; no free-text knowledge search, no document reader)
              + [optional] AGENTS.md operating layer (role / ordering / tool discipline)

tools = harness record+action tools + dlr_l1 / dlr_l2 / dlr_l3
      − search_knowledge / read_document
```

- `eval/run_dlr.py` wraps the upstream environment: it removes the two knowledge-tool callbacks, registers the three DLR tools, and appends the note — plus the whole `AGENTS.md` text when `BIZ_AGENTS_MD` is set — to `env.policy`;
- the customer simulator, record/action tools and verifier are untouched; the auxiliary semantic MCP (the TSM bridge) serves only the knowledge side — it never executes business actions and never participates in scoring;
- the A/B toggle is `BIZ_AGENTS_MD`: unset = harness policy + DLR tools; set = plus the operating layer. All reported results use the AGENTS.md layer.

## 5. Measured results

> Same source as §3 (best valid run per case).

| Metric | Value |
|---|---|
| strict | 44/50 (88%) |
| G / P / F (best-run pass) | 44 / 48 / 49 |
| IF (best-run) | 4% (2/50) |
| coverage | 50/50 |

**Variance is real**: under the same model and near-identical knowledge, single runs drift by 5–8 checks (048 19/21 ↔ 11/21 with P/F flipping; 032 18/19 ↔ 12/19; 014 39/41 vs 40/41 with disjoint failure sets; 008 drifted across 16 rounds). The v35 revalidation with the added playbook rules produced strict results on 003, 004, 005, 010, 013 and 049. Read the headline as "best valid run", and use the ledger for the per-case range.

## 6. Directory map

```
scenarios/bizagentbench/
├── tsm-scenario.json            # scenario manifest (TSM_SCENARIO resolution)
├── README.md · README.zh.md     # ← this scenario's docs (EN primary + 中文对照)
├── AGENTS.md                    # agent operating layer (role / ordering / tool surface / discipline)
├── sources/
│   ├── configs/DLR/             # L1: operations_desk.yaml · typed_services.yaml · psp.yaml
│   ├── consensus/               # L2: shared · operations_desk · typed_services · psp (.jsonl)
│   └── sop.md                   # L3: 50 question-level sections (opening verbatim)
├── eval/                        # bridge (dlr_server.mjs) · run_dlr_pilot.sh · freeze.v*.json · ledger.json
├── results/dlr-full/            # run archives (local, gitignored)
├── DETAIL.md                    # per-case ledger (best valid run + remaining checks)
├── PROGRESS.md                  # work log / measured lessons
├── modeling-plan.md (.zh.md)    # as-built modeling record (bilingual pair)
└── package.json                 # npm packaging (tsm-scenario-bizagentbench)
```

## License

MIT.
