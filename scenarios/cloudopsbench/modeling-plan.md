# Cloud-OpsBench — TSM Modeling Plan (L1 · dlr-state)

> **Status**: 2026-10-10 — the L1 model is in place (**two per-system files**); the serving path, the scorer adapter and the results ledger have landed; the L3 gate is untriggered.
> **Provenance**: benchmark README (layout / tool surface / metrics) + one sampled case per Boutique family (all 8) + cache scans over all 754 cases + the scorer internals (`agents/*/evaluation_utils`) + the service rosters and call graphs read edge-by-edge from the snapshots' own inputs — visible side only; gold / answer-side material never feeds the model.
> **中文版**: [modeling-plan.zh.md](modeling-plan.zh.md)

## 1. Scenario & data source

- **What**: agentic root-cause analysis (RCA) on Kubernetes; 754 cases (Online Boutique 550 / Train-Ticket 204) released as deterministic **state snapshots** — no live cluster required.
- **Scoring is two-track**: outcome `CA / FA / JRA` (component / fault type / joint) + process `MC / EOC / ECR / EE / RAR` (milestone coverage / admissible order / closure / evidence efficiency / redundancy).
- **Per-case data source** (`benchmark/<system>/<category>/<id>/`):
  - `metadata.json` — the **query** (a short symptom phrase) + ground truth (**never used to author the model**)
  - `tool_cache.json` — the whole namespace pre-rendered as tool outputs, keyed by tool call (`tool:args`); ~0.5k keys Boutique, ~1.6–1.7k TT (per-snapshot, not per-fault)
  - `raw_data/` — `k8s_states.json` · `logs.json` · `alert.json` · `metrics.csv`; the performance slot is actually carried by `GetAlerts` (cf. §4)
  - `code/` — trimmed service sources (Boutique only)
- **Tool surface** (what the agent sees = the query + tool outputs): 12 tools — `GetResources`, `DescribeResource`, `GetAppYAML`, `GetServiceDependencies`, `CheckServiceConnectivity`, `GetAlerts`, `GetRecentLogs`, `GetErrorLogs`, `ListCodeFiles`, `GetSourceCode`, `GetClusterConfiguration`, `CheckNodeServiceStatus`. Train-Ticket's surface is 10 (the two code tools are a Boutique-only **hard gate**); pre-rendered: Boutique 10 of 12, TT 9 of its 10 (`GetRecentLogs` on demand on both). `GetClusterConfiguration` is pre-rendered with real node configs in **all 754** cases, both systems.
- **Snapshot pin**: upstream frozen at `ea05daf` (`LLM4Ops/Cloud-OpsBench`, `main`, pulled 2026-10-10) — scenario development rides this snapshot; later upstream changes sync incrementally, not tracked live.

## 2. The model (LE · PE · PAS — one file per system)

**Files**: `sources/configs/DLR/{boutique,trainticket}.yaml` (`mapping_type: dlr-state`) — one modeling unit per system, the way the bird line keeps one file per database. The YAMLs are the source of truth; everything below is their reading.

### 2.1 LE = objects one can point to

> **Doctrine**: an LE is a concrete, **nameable object a business/operations person can locate** — "frontend is down", "worker-01 misbehaves". An abstract class word ("a Service") points at nothing and models nothing. The LE side therefore lists the system's real objects:

| LE group | boutique | train-ticket | state-slot semantics |
|---|---|---|---|
| services | 11 (frontend, cartservice, adservice, …) | 42 (ts-order-service, ts-gateway-service, …) | the system's service units — the RCA victim objects (`app/<name>`) |
| nodes | master + worker-01..03 | same | placement targets (`node/<name>`) |
| namespace | `boutique` | `train-ticket` | the scope (`namespace/<name>`) |

Service descriptions carry role / protocol / notable states. Observable-kind closure over **all 754** caches = 21 k8s kinds, verified closed; the two closure families' extra surfaces are the code artifact (`code/`, Boutique only) and node runtime services (`CheckNodeServiceStatus`).

### 2.2 PE = the observation surfaces of each object

Where an object's state lives and how it is read — the surfaces nest under their object:

| surface | resource | what it carries |
|---|---|---|
| `deployment` | deployments | desired state — replicas, pod template (image / probes / ports), service account & config references |
| `pods` | pods | instances — phase / restarts / last termination (137 vs 143) / events (FailedScheduling · FailedMount · Unhealthy · Killing …) |
| `service_endpoints` | services + endpoints | caller-side reachability — ports mapping, selector match, binding result (`<none>`) |
| `telemetry` | alerts + metrics | anomaly signals — self-describing alerts (a pointer, not evidence) |
| `logs` | logs | recent / error log streams |
| `code` | code artifact | Boutique only — source-defect surface (ListCodeFiles → GetSourceCode) |
| node surfaces | nodes · node runtime services | conditions / taints / capacity / cordon; kubelet · containerd · kube-proxy status |
| namespace surfaces | serviceaccounts · rolebindings · resourcequota · networkpolicies · config objects | creation-admission & traffic-permission & bindability |

**The anchor is the pruning predicate.** Each surface anchors by `A.key` = the **application label (`app=<service>`)** — nodes by `node_name`, the namespace by `namespace`. The anchor is the WHERE key of the read: every surface carries an anchored read template (`GetResources(pods, label_selector=app=<service>)`, `GetAppYAML(app_name=…)`, `GetRecentLogs(service_name=…)`, `CheckNodeServiceStatus(node_name=…)`). Anchored reads return a **thin slice of the object** — never a cluster-wide dump — which keeps the context small and the agent's attention on the chain. The one legitimate "full pull" is the first symptom scan that finds the anchor; afterwards everything is pruned by it.

### 2.3 PAS = the system's call graph

The concrete call edges between the services (boutique 15 / train-ticket 112), read edge-by-edge from the snapshots' own `GetServiceDependencies` outputs — not invented. `PAS.A` = the shared application label. Placement (pod → node) is deliberately **not** a PAS edge: which pod sits on which node varies per case (instance level); both objects and their surfaces are modeled, the association is discovered while walking.

### 2.4 Boundaries (schema-level)

The model stores **what every snapshot of this system has**: kinds and fixed structure (roster, topology, node names, anchor keys). Per-case instances — pod names, IPs, status values, message texts — never enter the model; the agent reads them live through the tools along the surfaces.

## 3. Runtime usage (guide, not query)

- **Dual-path parallel recall** — the first ReAct step issues `dlr_search_consensus` (L2: symptom → entry chain + reading rules) and `state_model_query` (L1: objects / surfaces / call edges) **together**, cross-validates, then walks. TSM's levels anchor in **parallel, not sequentially**; when an L3 surface exists it joins the same step — this scenario's tool surface carries L1 + L2 only (L3 gate untriggered). L1 recall may be off on bare symptom wording (templates overload across chains); the L2 chain entry corrects it.
- **Anchor-first, then pruned reads** — the first scan (usually the pods listing's RESTARTS/READY outlier row) locates the anomaly carrier; from there every read is anchored.
- **First break wins** — the first surface whose observation contradicts expectation is the break point; the conclusion is component + mechanism, submitted in the benchmark's contract JSON (top-3 predictions; Rank 1 is scored).

## 4. Scoring side (verified 2026-10-10 from `agents/*/evaluation_utils`; context, not model input)

- Admissible matching = tool name + argument subset (resource aliases normalized, e.g. pod↔pods); `evidence_patterns` match the **tool-output observation text** (literal / regex / json_path / yaml_path / code_snippet). Walking the chain with admissible calls and quoting observations satisfies MC / EOC / ECR by construction.
- Completion formulas (mostly all-of `M1..M3`) plus `precedes` edges encode the chain order — the same order the surfaces prescribe.
- Gated performance cases strip `GetAlerts` credit: alerts are a symptom pointer, not evidence — close on object-layer exclusion + metric readings. `EE` = evidence steps / total steps; `RAR` = repeated-signature rate.

## 5. Verification log (sampled cases — instance-level, verification only)

| sampled case | chain break | probe evidence (for verification only) |
|---|---|---|
| admission/1 | reference slot (no Pod ever created) | `FailedCreate … serviceaccount "services" not found` |
| scheduling/1 | Pod→Node slot | `0/4 nodes are available: 4 node(s) were unschedulable` |
| startup/1 | image-pull slot | pod status `ErrImagePull` |
| runtime/1 | probe slot (pod running) | `Liveness probe failed: malformed HTTP status code` |
| service/1 | addressing slot (TCP all up) | connectivity probes `Connection Succeeded`; break in env address |
| performance/1 | telemetry slot | `LATENCY_DEGRADATION p95 4.85ms→70.04ms (+1343%)` |
| codedefect/1 (checkoutservice) | code slot — wrong argument order | `panic: mismatching currency codes` |
| infrastructure/1 (node/worker-01) | node-service slot — containerd down | `containerd.service … Active: inactive (dead)` |

**End-to-end run (boutique/runtime/1, the tracked round `1010_1618_…-v2m`)**: dual-path recall in one step → anchor found on the pods listing → pruned reads (`app_name=` / `service_name=`) → contract JSON. Scorer: **CA/FA/JRA = 1.0 and MC/EOC/ECR = 1.0** (chain closed and ordered), EE 0.375, steps 9.

## 6. Evaluation & ledger

- `eval/`: `convert.mjs` (dsh session log → reference trace; the session log, not the truncated `--json` stream) → `run_eval.py` (the upstream scorer, function-level reuse) → `grade.sh` (one command; groups by system/category).
- `results/<round>/` keeps raws + `questions.csv` + `summary.md` + `traces/`; `results/STATS.md`, `DETAIL.md`, `DETAIL/<family>.md` are rebuilt by `eval/stats.mjs` (per-case CA/FA/JRA · MC/EOC/ECR/EE · steps/RAR/inv; dedupe-take-latest across rounds).

## 7. Level split & authoring discipline

- **L1** (this model): read out of the data source; two files; grows by correction, stabilizes over time.
- **L2** (`sources/consensus/kubernetes.jsonl`, 12 entries): schema-level reading rules **plus the symptom→chain mappings** (admission criterion #2: question wording ↔ model terms). Never beyond the dataset's own information.
- **L3**: gated (bare-run baseline + evidence of need); never derived from answers. Untriggered here.

## 8. Open items

1. A 5-case cross-family batch through the tracked flow; batch runner (one benchmark-MCP boot per case — a port pool for parallelism).
2. L2 grows on run evidence.
3. If the snapshot ever moves (new pin): re-check the two capability facts that live in code — the code-tool hard gate and the pre-render sets.
