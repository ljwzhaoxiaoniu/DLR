# Scenario 2 · K8s root-cause diagnosis (external benchmark `Cloud-OpsBench`) — using TSM + DLR

English | [中文](README.zh.md)

> **Position**: the scenario that applies TSM (three-level semantic modeling) + DLR to an **external benchmark, Cloud-OpsBench** (agentic RCA on Kubernetes) — the **first real test of the architecture's "scenario swap"**, and the other end of the three-level seesaw from "heavy L3 / thin L1".
> **Spec and principles** (LE / PE / ARCS / PAS, modeling rules and self-check) live in **[docs/03-design.md](../../docs/03-design.md)**;
> this document runs in usage order: **dataset introduction (incl. scoring calibers) → modeling approach → application results → workflow → measured results**.
> Scenario-package conventions (directory layout, scenario-switch checklist): [docs/04-application.md](../../docs/04-application.md).

## 1. Dataset introduction (an external benchmark, incl. its scoring calibers)

### Native semantics: where the raw material lives

| Raw material | Location | Content |
|---|---|---|
| **The benchmark** | upstream [LLM4Ops/Cloud-OpsBench](https://github.com/LLM4Ops/Cloud-OpsBench) (Sun Yat-sen University / CUHK) | **snapshot pin `ea05daf`** (main, commit 2026-10-06; pulled 2026-10-10) — development and re-runs ride this snapshot; upstream moves are pulled incrementally only when needed |
| **Case snapshots** | the checkout's `benchmark/{boutique 550, trainticket 204}` | after faults are injected into a real cluster and verified by the Verifier, the tools' observable context is frozen to JSON: `tool_cache.json` (pre-rendered tool outputs) / `logs.json` / `metrics.csv` (performance cases) / `alert.json` / `code/` (boutique sources) — **deterministic replay, no live cluster, reproducible** |
| **Scoring** | `process-label/` (milestones) · `evaluation_utils/` (scorer) | outcome **CA/FA/JRA** (Rank-1 answer vs labels, verbatim) + process **MC/EOC/ECR/EE** (evidence chains: admissible tool calls + evidence-pattern matching); **gold-standard scoring — no manual-overturn caliber** |
| **Scale** | 12 families = 754 cases | Easy/Medium/Hard tiers; Online Boutique 550 + Train-Ticket 204; 57 fault types |
| ⚠ **not shipped with the package** | the benchmark checkout (~3.9 GB) lives outside the repo | this package (`scenarios/cloudopsbench/`) holds only the **adapter layer**: L1/L2/L3 sources + the evaluation adapter; case data is read live by the agent through the benchmark's tools |

### Scoring mechanics to know before writing sections or re-running

- **Evidence must be obtained through tools**: MC/EOC/ECR match the observation text of tool outputs (admissible = tool name + argument subset) — a model-side lookup breaks the chain scores;
- **EOC is a strict single-pass cascade**: a milestone only enters `ordered` when its predecessor came first; a head-of-chain inversion collapses the whole chain to 1/4 — **chain-order clauses** are a core part of L3;
- `performance` cases carry `disable_getalerts_credit`: a wrong Rank-1 object **drags** MC/EOC/ECR down — the process-score collapse is the consequence of the object error;
- the upstream's own key finding (consonant with this project's thesis): **correct outcome ≠ reliable diagnosis** — top models reach JRA 0.76 but ECR (chain closure) only 0.38, "reaching the right evidence zone without closing the chain".

## 2. Modeling approach (raw material → three levels)

### L1 = the system's state space (`mapping_type: dlr-state`)

Shares its vocabulary with classic DLR (LE/PE, ARCS/PAS, id conventions, description discipline); the differences: no databases/attributes, relations carry **observation slots**, and the three tables are row-level 1:1. Two files, one per system: `sources/configs/DLR/boutique.yaml` · `trainticket.yaml`.

- **LE = concrete objects**: the service triad (`<svc>` business / `<svc>-deploy` carrier / `<svc>-obs` observation face) + nodes + namespace — expanded to concrete objects, never left as abstract kinds;
- **PE = observation surfaces**: deployment / pods / service+endpoints / telemetry / logs / code — every surface's reading carries a **predicate template**;
- **The ARCS anchor = pruning**: anchor A = the read's `WHERE` key (the application label) — **the only legitimate full pull is the first-round anchor scan**; everything after is pruned by the anchor (this is DLR's token-saving mechanism itself);
- **PAS = the system's call graph**: read edge by edge from the snapshots' own `GetServiceDependencies` (boutique 15 edges / TT 112);
- **Instance boundary**: the graph stores **schema level only** — per-case detail (names / statuses / payloads / numbers) never enters; L1 is a navigation index helping the agent *find* data, not *query* it (same as BIRD: modeling ≠ loading data).

### L2 = domain consensus (`sources/consensus/kubernetes.jsonl`, 15 entries)

Schema-level reading rules: object listings / log slots / telemetry slots / exclusions / termination reasons / code slots / placement / event faces…; each carries its L1 anchor + visible-side basis. **The layer boundary = never beyond the dataset's own information** (source-level detail never enters L2; the agent reads it along the slots). Readings cluster by **slot class**, not by system.

### L3 = the walk SOP (`sources/sop.md`, 5 sections)

Section titles = the question wording **verbatim** (delivered by vector retrieval: `dlr_search_sop`); a section carries the **measured playbook** (twin-class discrimination lines / chain-order clauses / submission clauses) and pins no answers:

1. `Partial Service Unreachability.`
2. `Service Availability Disruption.`
3. `Service quality degradation.`
4. `Service latency increased significantly`
5. `Service Performance Degradation.`

Admission goes through the three tiers (① dataset defect ② wrong without the section ③ >15W without the section); **break the chain before adding a line, and re-run against regression anchors after editing one**.

### Tool surface

The dlr-state shape = **3 tools** (`state_model_query` symptom→model slice / `dlr_search_consensus` / `dlr_search_sop`); the data plane = the upstream benchmark's MCP (booted per case on `:8000`). Recall shape = **dual-path parallel** in the same step (TSM's parallel anchoring); the agent-side assembly lives in this repo at `DSH-based Agent Service/dsh_cob/` (not shipped with this package).

## 3. Application results (this scenario's model)

> Data as of archived **round 420**; calibers = upstream scorer output, dedupe-take-latest (see [DETAIL.md](DETAIL.md) / `results/STATS.md`).

- **Coverage 754/754 (100%)**; **JRA 753/754 (99.87%)** · CA 753 · FA 754 · **ECR 740/754 (98.1%)**;
- Process scores (means): **MC 0.996 · EOC 0.980 · ECR 0.981** · steps 16.1 · invalid 0.8%;
- **All twelve families covered** (12/12 run), **10 of them fully JRA**: boutique/{admission, codedefect, infrastructure, runtime, scheduling, service, startup} · train-ticket/{runtime, service, startup}; boutique/performance and train-ticket/performance each keep 1 case **recorded** under "touching the limit counts";
- Compared against: the upstream's top-model baselines JRA 0.76 / ECR 0.38, industry Train-Ticket full-set 82.8% JRA — this scenario's **753/754** sits above the field; the remaining 1 (ttperf34) are recorded, not chased;
- Per-case archives: [DETAIL.md](DETAIL.md) (the ledger) + `DETAIL/<family>.md` (per-case check lists + evidence text) + `results/<round>/` (questions.csv + traces/).

## 4. Workflow (how this benchmark is run)

### Prerequisites (two things outside this package)

1. **The benchmark checkout**: clone upstream (pin `ea05daf`) outside the repo (dev-machine example `D:\Code_Proj\Cloud-OpsBench`; `COB_DIR` overrides) — not shipped;
2. **The semantic backend**: build via TSM Core Service (either from this package — `npm i tsm-scenario-cloudopsbench`, resolved by package name):

```bash
cd "TSM Core Service"
TSM_SCENARIO=tsm-scenario-cloudopsbench npx tsx src/build/buildLance.ts --all --store .store/lance/cloudopsbench
TSM_SCENARIO=tsm-scenario-cloudopsbench npx tsx src/build/buildConsensus.ts --store .store/lance/cloudopsbench
```

(dev mode in-repo uses the path form: `TSM_SCENARIO="$PWD/../scenarios/cloudopsbench"`)

### Running and scoring (repo-side assembly, `DSH-based Agent Service/dsh_cob/`)

```bash
bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"                   # semantic backend :28796 (idempotent)
bash "DSH-based Agent Service/dsh_cob/run_one.sh" <system> <category> <case_id>   # one case → results/<round>/
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results --match "<glob>"  # score → questions.csv + summary.md
node scenarios/cloudopsbench/eval/stats.mjs         # rebuild STATS.md / DETAIL.md / DETAIL/<family>.md
```

Two-way concurrency (memory-bound): set `COB_MCP_PORT=8001 CLOUDOPSBENCH_MCP_PORT=8001` **as a pair** (the former = the runner's probe port, the latter = the port the upstream service actually binds — setting only the former leaves the service on 8000 → port clash).

(`dsh_cob/instructions.md` is a per-case assembly artifact generated by `run_one.sh` (AGENTS.md source + the upstream contract) — do not hand-edit.)

## 5. Measured results

> Same source as §3 (dedupe-take-latest · round 420); details in `results/STATS.md`.

| Metric | Value |
|---|---|
| tokens mean / median | 241,049 / 145,925 (caliber = input+cache_read+cache_write+output; cache reads 74%) |
| steps mean | 16.1 |
| RAR (repeated-call rate) / invalid | 0.13% / 0.8% |
| EE (evidence efficiency) | 0.283 (the "walk the chain, satisfy the process scores" argument paid off from the first case; EE is observational only) |

## 6. Directory map

```
scenarios/cloudopsbench/
├── tsm-scenario.json          # the scenario manifest (for TSM_SCENARIO resolution)
├── README.md · README.zh.md   # ← this scenario's docs (EN primary + 中文对照)
├── sources/
│   ├── configs/DLR/           # L1 modeling sources (boutique.yaml · trainticket.yaml)
│   ├── consensus/             # L2 domain consensus (kubernetes.jsonl)
│   └── sop.md                 # L3 walk SOP
├── eval/                      # evaluation adapter: convert.mjs / run_eval.py / grade.sh / stats.mjs / sessions.mjs
├── results/<round>/           # run archives (questions.csv + traces/ + raw/)
├── DETAIL.md · DETAIL/        # the ledger + per-family per-case detail (rebuilt by stats.mjs)
├── modeling-plan.md (.zh.md)  # the modeling plan (bilingual pair, hashes in README.i18n.yaml)
└── overview.html              # the aggregate view (generated by stats.mjs)
```
