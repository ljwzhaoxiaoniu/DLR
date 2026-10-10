# Cloud-OpsBench — TSM Modeling Plan (L1 first)

> **Status**: v0 draft, 2026-10-10 — for iteration.
> **Provenance**: benchmark README (layout / tool surface / metrics) + 6 sampled Boutique cases, one per family (admission, scheduling, startup, runtime, service, performance) — visible side only.
> **Open**: codedefect & infrastructure families not yet sampled · Train-Ticket differences · scorer internals (`agents/*/evaluation_utils`, `evidence_patterns` semantics).
> Current dir holds this plan only; a scenario README and the built model artifacts come later.
> 中文版：[modeling-plan.zh.md](modeling-plan.zh.md)

## 1. Scenario & data source

- **What**: agentic root-cause analysis (RCA) on Kubernetes; 754 cases (Online Boutique 550 / Train-Ticket 204) released as deterministic **state snapshots** — no live cluster required.
- **Scoring is two-track**: outcome `CA / FA / JRA` (component / fault type / joint) + process `MC / EOC / ECR / EE / RAR` (milestone coverage / admissible order / closure / evidence efficiency / redundancy).
- **Per-case data source** (`benchmark/<system>/<category>/<id>/`):
  - `metadata.json` — the **query** (a short symptom phrase) + ground truth (**never used to author the model**)
  - `tool_cache.json` — the whole namespace pre-rendered as tool outputs (~485 keys/case; the cache is per-snapshot, not per-fault)
  - `raw_data/` — `k8s_states.json` · `logs.json` · `alert.json` · `metrics.csv` (performance cases only)
  - `code/` — trimmed service sources (Boutique only)
- **Tool surface** (what the agent sees = the query + tool outputs): 12 tools — `GetResources`, `DescribeResource`, `GetAppYAML`, `GetServiceDependencies`, `CheckServiceConnectivity`, `GetAlerts`, `GetRecentLogs`, `GetErrorLogs`, `ListCodeFiles`, `GetSourceCode`, `GetClusterConfiguration`, `CheckNodeServiceStatus`. Train-Ticket has 10 (no code tools). The sampled caches pre-render 10 of the 12 (`GetRecentLogs` / `GetSourceCode` are on demand).
- **Snapshot pin**: upstream frozen at `ea05daf` (`LLM4Ops/Cloud-OpsBench`, `main`, pulled 2026-10-10) — scenario development rides this snapshot; later upstream changes sync incrementally, not tracked live.

## 2. Boundaries (settled)

1. **Schema level only.** The model stores *kinds* of entities / relations / observation slots. Instance details (names, statuses, messages, values) never enter the model.
2. **L1 helps the agent find data; it does not query data.** The agent fetches instance data through the benchmark tools. This is both the design intent (as in BIRD: modeling ≠ loading data) and a scoring mandate — process credit requires the evidence chain to be fetched by the agent via admissible tool calls; a model that answers directly would break MC/EOC/ECR.
3. **Stability.** Changing the data source (new cases, different states) or switching systems does not change L1; L1 moves only when the *world* moves (a new resource kind / new tool) — i.e. "L1 stabilizes over time".

## 3. L1 model (schema level)

> **Observation slot** = where a state lives, which tool reads it, and which part of the output to read — the core column of the relation table, and the anchor of "help the agent find data".

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

> Observable-kind vocabulary (union over the 6 sampled caches, 21 kinds): configmaps, daemonsets, deployments, endpoints, events, ingresses, jobs, namespaces, networkpolicies, nodes, persistentvolumeclaims, persistentvolumes, pods, replicasets, resourcequota, rolebindings, secrets, serviceaccounts, services, statefulsets, storageclasses.

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

> Templates are overloaded across families (one phrase serves both admission and service-routing cases; Availability Disruption serves both scheduling and startup) — discrimination happens **on the chain**, not from the phrase.

## 4. Runtime usage (guide, not query)

symptom → retrieve the chain's **model slice** (slot list + query-instruction templates) → the agent **calls the benchmark tools** → instance data returns → correct → advance along edges → the first slot where *observed ≠ expected* is the break point → conclusion (component + mechanism). The expert walk (the gold path for the admission case = 6 steps) is one instance of this; the evidence chain — and hence MC/EOC/ECR — is satisfied by construction.
Delivery shape mirrors TSM 2.0: the model via MCP (a "modeling view"), the data via the source tools — contract inside, implementation outside.
(Corroboration, not model input: the benchmark's own milestone role system — symptom → mechanism → root-cause confirmation — lines up with the chain stages.)

## 5. Level split & authoring discipline

- **L1 (data-source level)** — the subject of this plan. Read out of the data source (a few samples suffice — L1 is *read*, not *run*); zero per-case build; grows by correction, stabilizes over time.
- **L2 (domain consensus, on demand)** — symptom reading, message families (refused vs timeout; the FailedCreate family), threshold / alert semantics — induced from visible evidence; never copied from answer-side material.
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

## 7. Open items

1. Sample codedefect / infrastructure to close the entity table.
2. Train-Ticket differences (10 tools, 4 categories) — express capability gaps at the model level.
3. Read `agents/*/evaluation_utils/` — `evidence_patterns` matching semantics (1058 non-empty entries in Boutique).
4. Turn tables 3.1–3.3 into build-time artifacts (YAML; alignment with the TSM build pipeline TBD).
5. L2 / L3 only once their gates trigger.
