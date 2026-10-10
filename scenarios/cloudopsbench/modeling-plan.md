# Cloud-OpsBench — TSM Modeling Plan (L1 first)

> **Status**: **v1**, 2026-10-10 — all closure items folded: codedefect & infrastructure sampled (entity table closed), Train-Ticket deltas verified, scorer semantics read.
> **Provenance**: benchmark README (layout / tool surface / metrics) + one sampled case per Boutique family (**all 8**, incl. codedefect / infrastructure) + a cache scan of all 754 cases (cluster-config check) + the scorer internals in `agents/*/evaluation_utils` — visible side only; gold / answer-side material never feeds the model.
> **Open**: the scenario's serving path (§7.1 — implementation side) · L2 starter library landed (`sources/consensus/kubernetes.jsonl`) · L3 gate untriggered.
> Current dir holds this plan only; a scenario README and the built model artifacts come later.
> 中文版：[modeling-plan.zh.md](modeling-plan.zh.md)

## 1. Scenario & data source

- **What**: agentic root-cause analysis (RCA) on Kubernetes; 754 cases (Online Boutique 550 / Train-Ticket 204) released as deterministic **state snapshots** — no live cluster required.
- **Scoring is two-track**: outcome `CA / FA / JRA` (component / fault type / joint) + process `MC / EOC / ECR / EE / RAR` (milestone coverage / admissible order / closure / evidence efficiency / redundancy).
- **Per-case data source** (`benchmark/<system>/<category>/<id>/`):
  - `metadata.json` — the **query** (a short symptom phrase) + ground truth (**never used to author the model**)
  - `tool_cache.json` — the **whole namespace pre-rendered as tool outputs**, keyed by tool call (`tool:args`); ~0.5k keys Boutique, ~1.6–1.7k TT (scales with namespace size; the cache is per-snapshot, not per-fault)
  - `raw_data/` — `k8s_states.json` · `logs.json` · `alert.json` · `metrics.csv`; **`metrics.csv` is not performance-only**: Boutique codedefect 98/98 and performance 25/29 carry it, TT only performance 47/47, sampled infrastructure cases carry none — the performance slot is actually carried by `GetAlerts` (cf. §4)
  - `code/` — trimmed service sources (Boutique only)
- **Tool surface** (what the agent sees = the query + tool outputs): 12 tools — `GetResources`, `DescribeResource`, `GetAppYAML`, `GetServiceDependencies`, `CheckServiceConnectivity`, `GetAlerts`, `GetRecentLogs`, `GetErrorLogs`, `ListCodeFiles`, `GetSourceCode`, `GetClusterConfiguration`, `CheckNodeServiceStatus`. Train-Ticket's surface is 10 (the two code tools are a Boutique-only **hard gate**, cf. §3.2 #9); pre-rendered: Boutique 10 of 12, TT 9 of its 10 (`GetRecentLogs` on demand on both). `GetClusterConfiguration` is pre-rendered with real node configs in **all 754** cases, both systems.
- **Snapshot pin**: upstream frozen at `ea05daf` (`LLM4Ops/Cloud-OpsBench`, `main`, pulled 2026-10-10) — scenario development rides this snapshot; later upstream changes sync incrementally, not tracked live.

## 2. Boundaries (settled)

1. **Schema level only.** The model stores *kinds* of entities / relations / observation slots. Instance details (names, statuses, messages, values) never enter the model.
2. **L1 helps the agent find data; it does not query data.** The agent fetches instance data through the benchmark tools. This is both the design intent (as in BIRD: modeling ≠ loading data) and a scoring mandate — process credit requires the evidence chain to be fetched by the agent via admissible tool calls; a model that answers directly would break MC/EOC/ECR.
3. **Stability.** Changing the data source (new cases, different states) or switching systems does not change L1; L1 moves only when the *world* moves (a new resource kind / new tool) — i.e. "L1 stabilizes over time".

## 3. L1 model (schema level)

> **Observation slot** = where a state lives, which tool reads it, and which part of the output to read — the core column of the relation table, and the anchor of "help the agent find data".
> Machine-readable source: [`sources/configs/DLR/cloudopsbench.yaml`](sources/configs/DLR/cloudopsbench.yaml) (`mapping_type: dlr-obs`) — tables 3.1–3.3 serialized 1:1; schema notes at the file foot.

### 3.1 Entity kinds

| side | kind | state-slot semantics |
|---|---|---|
| LE | Service | reachability as seen by callers (endpoint binding, connectivity) |
| LE | Workload (Deployment; StatefulSet / DaemonSet / Job observe the same way) | desired-state owner: replicas / template / refs / ports / probes |
| LE | Request path (dependency / addressing) | who calls whom; addresses (env / DNS / ingress) |
| PE | ReplicaSet · Pod · Container | instance lifecycle: scheduled? created? started? healthy? |
| PE | Node · Namespace | placement & scope: taints / labels / capacity / cordon; the namespace scope |
| PE | Endpoints | the svc↔pod binding result |
| PE | Config objects: ServiceAccount / Secret / ConfigMap / PVC / PV / StorageClass | referenced-existence / bindability |
| PE | Policy & quota: ResourceQuota / NetworkPolicy / RoleBinding | creation permission / traffic permission |
| PE | Event | the mechanism record (why X failed) |
| PE | Log stream / Metric series / Alert | telemetry surfaces per entity |
| PE | Code artifact (service sources under `code/`) | source-defect surface: which file / function carries the fault |
| PE | Node runtime services (containerd / kubelet …) | node-internal mechanism: why pods on this node cannot run |

> Observable-kind vocabulary (union over **all 754** case caches = 21 kinds, closure verified): configmaps, daemonsets, deployments, endpoints, events, ingresses, jobs, namespaces, networkpolicies, nodes, persistentvolumeclaims, persistentvolumes, pods, replicasets, resourcequota, rolebindings, secrets, serviceaccounts, services, statefulsets, storageclasses. No new kinds — the singulars `pod` / `service` / `statefulset` are parameter aliases of the plural kinds. The two closure families' surfaces sit **outside** the k8s-kind list: the code artifact (`code/`, Boutique-only) and node runtime services (`CheckNodeServiceStatus` output).

### 3.2 Relation kinds + observation slots (core table)

| # | relation (kind → kind) | class | carries | observation slot (tool → where to read) |
|---|---|---|---|---|
| 1 | Deployment → ReplicaSet → Pod | ARCS | desired→actual replica chain | GetResources(deployments / replicasets / pods) |
| 2 | Service → Endpoints ← Pod | ARCS | selector match + readiness | GetResources / DescribeResource(services · endpoints); pods --show-labels |
| 3 | Pod → Node | ARCS | scheduling constraints vs node state | DescribeResource(pod: Events FailedScheduling, Node-Selectors; node: Unschedulable / taints) · GetClusterConfiguration · CheckNodeServiceStatus |
| 4 | spec → ServiceAccount / Secret / ConfigMap / PVC-PV; image → registry | ARCS | referenced-existence / pullability | GetAppYAML · GetResources(existence) · pod Events (FailedMount / image-pull messages) |
| 5 | creation admission → ResourceQuota / RoleBinding / ServiceAccount | ARCS | creation permission | GetResources(resourcequota · rolebindings · serviceaccounts) · pod Events (FailedCreate message family) |
| 6 | Container → probes (liveness / readiness) | ARCS | health gating | DescribeResource(pod: probe failures, restarts) · GetAppYAML(probe config) |
| 7 | Service ↔ Service (dependency / addressing) | PAS | call reachability & addresses | GetServiceDependencies · CheckServiceConnectivity · GetAppYAML(env) · GetErrorLogs |
| 8 | entity → telemetry surface | (observation) | anomaly signals | GetAlerts · GetErrorLogs / GetRecentLogs |
| 9 | Workload → code artifact (`code/`) | (observation) | defect localization: error message → file / function → code evidence | GetErrorLogs / GetRecentLogs (message) → ListCodeFiles → GetSourceCode (Boutique-only hard gate) |
| 10 | Node → node runtime services | ARCS | node-side mechanism (e.g. containerd down) | CheckNodeServiceStatus |

> ARCS = vertical anchoring (LE↔PE); PAS = lateral routing (LE↔LE) — the same terms as the DLR model.

### 3.3 Symptom → entry slice (preliminary)

| query template (verbatim) | cases (Boutique / TT) | entry chain (preliminary) |
|---|---|---|
| Partial Service Unreachability. | 220 / 70 | reachability chain: caller error logs → endpoint binding → owner chain → stage evidence |
| Service Availability Disruption. | 214 / 87 | same reachability chain (spans scheduling / startup / … stages) |
| Service Performance Degradation. | 51 / 0 | telemetry entry: GetAlerts → object-layer exclusion |
| Service abnormal restart. | 36 / 0 | health chain: restarts → probe / OOM evidence |
| Service latency increased significantly | 18 / 0 | telemetry (as Performance Degradation) |
| Service quality degradation. | 11 / 47 | telemetry (as Performance Degradation) |

> Templates are overloaded across families (one phrase serves both admission and service-routing cases; Availability Disruption serves both scheduling and startup) — discrimination happens **on the chain**, not from the phrase. The closure families enter through these same templates: codedefect/1 and infrastructure/1 both read "Service Availability Disruption." — their fingerprints are the **code slot** and the **node-service slot**.

## 4. Runtime usage (guide, not query)

symptom → retrieve the chain's **model slice** (slot list + query-instruction templates) → the agent **calls the benchmark tools** → instance data returns → correct → advance along edges → the first slot where *observed ≠ expected* is the break point → conclusion (component + mechanism). The expert walk (the gold path for the admission case = 6 steps) is one instance of this; the evidence chain — and hence MC/EOC/ECR — is satisfied by construction.
Delivery shape mirrors TSM 2.0: the model via MCP (a "modeling view"), the data via the source tools — contract inside, implementation outside.
(Corroboration, not model input: the benchmark's own milestone role system — symptom → mechanism → root-cause confirmation — lines up with the chain stages.)

**Scoring side (verified 2026-10-10 from `agents/*/evaluation_utils`; context, not model input):**

- Admissible matching = tool name + argument subset (resource aliases normalized, e.g. pod↔pods); `evidence_patterns` match the **tool-output observation text** (5 kinds: literal substring / regex / json_path / yaml_path fallback / code_snippet). Walking the chain with admissible calls and quoting observations satisfies MC / EOC / ECR by construction.
- Completion formulas (8 kinds; largely all-of `M1..M3`) plus `precedes` edge order encode the chain order — the same order the slot table prescribes.
- Gated performance cases strip `GetAlerts` credit (`evaluation.py:246`): alerts are a symptom pointer, not evidence — close on object-layer exclusion + metric readings. `EE` = evidence steps / total steps; `RAR` = repeated-signature rate.

## 5. Level split & authoring discipline

- **L1 (data-source level)** — the subject of this plan. Read out of the data source (a few samples suffice — L1 is *read*, not *run*); zero per-case build; grows by correction, stabilizes over time.
- **L2 (domain consensus, on demand)** — **schema-level reading rules only**: how to read each slot's output (object-list columns; log patterns/samples; the telemetry slot's self-describing alerts; the code slot) and how symptom wording maps onto the chains — never beyond the dataset's own information; data-source particulars (message texts, value lists, component inventories) stay out of L2 (the agent reads those live along the slots). Hard-case analysis (codedefect 98 / performance 76) shows reading needs cluster by **slot class, not system** → v0 keeps one domain library (`sources/consensus/kubernetes.jsonl`); split by slot class only when earned (volume / cross-talk / a second k8s scenario).
- **L3 (per-problem SOP, gated)** — added only when stuck (bare-run baseline + evidence of need); may exceed test-set information; never derived from answers / gold.

## 6. Verification log (recorded, not model input)

| sampled case | chain break | probe evidence (instance-level, for verification only) |
|---|---|---|
| admission/1 | reference slot (no Pod ever created) | `FailedCreate … serviceaccount "services" not found` |
| scheduling/1 | Pod→Node slot | `0/4 nodes are available: 4 node(s) were unschedulable` |
| startup/1 | image-pull slot | pod status `ErrImagePull` |
| runtime/1 | probe slot (pod running) | `Liveness probe failed: malformed HTTP status code` |
| service/1 | addressing slot (TCP all up) | connectivity probes `Connection Succeeded`; break in env address |
| performance/1 | telemetry slot | `LATENCY_DEGRADATION p95 4.85ms→70.04ms (+1343%)` |
| codedefect/1 (checkoutservice, hard) | code slot — wrong argument order | `panic: mismatching currency codes` (43 logs, 2 errors — the same panic) |
| infrastructure/1 (node/worker-01, medium) | node-service slot — containerd down | `containerd.service … Active: inactive (dead)` on worker-01 |

## 7. Open items

1. **Artifacts done (v1)**: tables 3.1–3.3 → [`sources/configs/DLR/cloudopsbench.yaml`](sources/configs/DLR/cloudopsbench.yaml) (`mapping_type: dlr-obs`, 1:1 rows). **Builder landed (2026-10-10)**: `buildLance` (vectors: entities / relations / slices) + `loadNeo4j` (graph: LE/PE nodes; relations as nodes carrying the slot + `INVOLVES` edges; slices) dispatch on `mapping_type` in tsm-core. Remaining (implementation side): the scenario's serving path (memory graph / tool consumption) and the live graph load on scenario switch.
2. L2 grows on run evidence (starter library landed); L3 only once its gate triggers.
3. If the snapshot ever moves (new pin): re-check the two capability facts that live in code — the code-tool hard gate and the pre-render sets.
