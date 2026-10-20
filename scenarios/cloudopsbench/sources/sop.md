# SOP — business-logic level (read this FIRST)

> One section per **symptom wording** — the title is the wording **verbatim** (the dataset
> reuses a small set of templates, so one section covers every case that says the same thing).
> If a section restates your question, follow it: it goes case by case — deal with the branch
> your evidence lands on and stop at the first thing that doesn't add up. No match -> nothing
> known about this walk; solve with L1 (objects) + L2 (readings).
>
> This is the ops team's own playbook, written the way ops people write for each other on top
> of a stable L1/L2 — plain language, no K8s 101, no answers. A branch gets added only when
> runs show the case it covers.

## cloudopsbench

### When asked: "Partial Service Unreachability."

> **Systems**: boutique, trainticket

**Our order (a team convention):**

Readings from L2 tell you how to read a surface, not what to read first; this order decides.

1. **Complaint side first.** Read the entry caller's error log (the front door of the request; a downstream service's own log is not the initial signal; the error-log evidence, not the recent-log context), probe the named service on the port its Service declares (never a guessed port), or read its endpoints. If the wording names no service, the inventory listing is the allowed entry; once it names the outlier, go back to the complaint side before reading its workload state. If you batch, the signal leads the batch.
2. **Then the workload, pruned.** Pods (READY / RESTARTS outlier) → owner chain. The owner chain comes before events and config.
3. **Take the branch your evidence lands on:**
   - **Pending**: the pod's own sheet first (it carries the scheduling line), then the node side, general before specific; no scheduling line at all → the control-plane scheduler.
   - **Never created / missing reference**: the victim's signal first; then the workload state; then the event names the missing object; read the template and the object's own listing. Close a quota case on the namespace quota's used/hard rows (see the L2 quota reading); a missing Service is never a DNS failure. The quota rows close the case, they do not open it: first read the victim's endpoints or a connectivity probe on the victim's own Service. Scope the quota branch to the Service named by the complaint or the target of the failing call; missing Services that are not that victim are background. A `FailedCreate` about an object that is present in its own listing (or a pod that already exists) is setup history — read why the existing pod cannot proceed.
   - **Image pull**: read the failing stage in the message (registry lookup / manifest / token) and classify by that stage (see the L2 image-pull reading); mount/probe errors go to the matching config face.
   - **Everything healthy but probes fail**: go to the address layer.
> **System**: trainticket
   - **Address layer (Train-Ticket)**: when the objects read healthy but probes diverge, read the gateway's own app manifest (`GetAppYAML` on `ts-gateway-service`); audit every route's Path ↔ target line by line. A route pointing elsewhere is the evidence; report the gateway (the table's owner), not the mis-wired target. Do not stop at a downstream DNS symptom.
> **System**: shared
4. **Close with all three:** the mechanism event; the events surface; the config the mechanism points at.
5. **Stop and submit:** once the mechanism is bound to an object and the three closure reads are done, submit. Rank 1 names the mechanism's owner, not the victim.

This wording also shows up on scheduling / startup failures — decide by what you find on the chain, not by the wording.

### When asked: "Service Availability Disruption."

> **Systems**: boutique, trainticket

**Our order (a team convention): the same reachability chain whichever stage broke; the mechanism decides, not the wording.**

Readings from L2 tell you how to read a surface, not what to read first; this order decides.

1. **Complaint side first (hard order).** Read the entry caller's error log (the front door of the request; a downstream service's own log is not the initial signal; the error-log evidence, not the recent-log context), probe the named service on the port its Service declares (never a guessed port), or read its endpoints. If the wording names no service, the inventory listing is the allowed entry; as soon as it names the outlier, go back to the complaint side before its workload state, events, or config. If you batch, the signal leads the batch.
2. **Then the workload, pruned.** Pods (state + events) → owner chain; for node-scope questions use the pods listing's NODE column.
3. **Take the branch your evidence lands on:**
   - **Pending**: the pod's own sheet first (it carries the scheduling line), then the node side, general before specific; no scheduling line at all → the control-plane scheduler.
   - **Never created / missing reference**: the victim's signal first; then the workload state; then the event names the missing object; read the template and the object's own listing. Close a quota case on the namespace quota's used/hard rows (see the L2 quota reading); a missing Service is never a DNS failure. The quota rows close the case, they do not open it: first read the victim's endpoints or a connectivity probe on the victim's own Service. Scope the quota branch to the Service named by the complaint or the target of the failing call. A `FailedCreate` whose object is present is setup history.
   - **Image pull**: read the failing stage in the message (registry lookup / manifest / token) and classify by that stage (see the L2 image-pull reading); mount/probe errors go to the matching config face.
   - **Cross-service localization**: take the topology walk from the symptom side before any mechanism/config/code material; an anchor elsewhere is a guess.
> **System**: boutique
   - **Pod up, service misbehaves (Boutique)**: the suspect pod's sheet first, then its error logs, then the code surface (`ListCodeFiles` → `GetSourceCode`); classify by the defect line, not the error wording (see the L2 code reading).
> **System**: trainticket
   - **Everything healthy but probes diverge / foreign payloads (Train-Ticket)**: when the objects read healthy but probes diverge, read the gateway's own app manifest (`GetAppYAML` on `ts-gateway-service`) and audit the route table Path ↔ target; the gateway is the table's owner, the mis-wired target is the victim. Do not stop at a downstream DNS symptom.
> **System**: shared
4. **Close with all three:** the mechanism event; the events surface; the config the mechanism points at.
5. **Stop and submit:** once the mechanism is bound to an object and the three closure reads are done, submit. Rank 1 names the mechanism's owner, not the victim.

### When asked: "Service quality degradation."

> **Systems**: shared

This wording lives on the metric surface — the alerts name the case, and the object layer is only the exclusion. Read the alerts first, and the case you land on decides:

1. **Alerts first.** `GetAlerts` tells you whose anomaly it is, which kind (latency / saturation / throughput / traffic), and at what scope. Unlike the reachability wordings, opening from the object layer here is not troubleshooting — the signal is in the metrics. When several alerts fire at once the case is the **primary anomaly** — the service the other alerts ripple from, carrying the runaway deviation: read the rows' shape before their size — a latency row that moves only its p90 is a partial-traffic ripple (only the traffic sharing a path with the degraded pod slowed), while the row whose p50 and p90 both move carries the delay across all of its traffic and marks the epicenter; among those both-percentile rows the epicenter carries the steepest p90 escalation (measured baselines only), and the graph closes it (`GetServiceDependencies`). Then settle the pick in this order — branches (a) then (b):
   - **(a) Two moving rows on one call path:** if one moving row's service sits downstream of another moving row's service on the walk, **the downstream one is the source — whatever the row shapes say**: the upstream row is its accumulated wait on the callee, and a leaf that moves only its p90 is a delay riding the leaf's own path (the p90-only-is-ripple reading is for rows with no moving row downstream of them). This also settles a zeroed-baseline pair (`New Spike`, nothing else to rank by) — the downstream one is the source.
   - **(b) Independent candidates (no call path between them):** every ripple is its direct neighbor, so a candidate that would need a quiet intermediate hop is not the source; the dual-moving row is the epicenter and a p90-only row is a partial-traffic ripple — among the dual rows the steepest p90 escalation takes it. Percentages on near-zero baselines prove nothing. A saturation row counts only when it rides on that epicenter **and comes with the service's own latency rise** — a genuine resource fault shows the throttle *and* its own latency climbing together; a bare `cpu_cfs` row on a service that is not the epicenter, with no latency of its own, is collateral noise — don't out-rank the runaway deviation with it. **And when no latency row is in the set at all — the alerts read as bare saturation — the case is not on the saturation surface: a `Val: … (Throttled)` with no normal to compare against shows no movement (a chronically throttled value reads the same before and after), and sub-core percentages are sub-noise; the row that carries an actual deviation beyond saturation — a traffic / network move — is the one that names the service.** A `LATENCY_MISSING` row ("metrics dropped to zero/NaN") is a hole the collection left in the injection window, not a service's deviation — it never names the case, so don't anchor on it. And when a whole-system network-drop sweep carries no latency row at all, the epicenter is the point every request flows through (the system's total traffic) — its collapse is the source, the rest is the ripple. **Client-side fallout during the sweep — resolution errors in a client's startup logs (`host not found in upstream …`), a client restarting — rides the same sweep: the class stays the network-side delay on the total-traffic point; a resolution-looking message inside the sweep does not make a DNS case.** Apply the branches below to the primary anomaly, not to the loudest keyword.
2. **Deal with the case you land on:**
   - **Saturation rows on one service** (`RESOURCE_SATURATION [cpu_cfs]` / `[cpu core]` / memory) → it's a resource fault on that service's pods: read its pods face (usage vs limits) to close.
   - **A constant delay riding on one service's own latency** — its p50/p90 jump by a fixed amount, its callers see the same added delay, its downstream server-side latencies stay clean, no saturation rows → `pod_network_delay`: the delay sits on that pod's network path. Don't reach for a code explanation — an artificial delay *in code* is a code-defect (a different wording, and it has to be shown from the code surface); under this wording a delay case is network-side.
   - **The same latency / packet anomaly across every pod on one node** (scope it with the pods listing's NODE column) → it's a node-scope network fault: read the node objects (conditions / node runtime services) to close.
3. **Close by excluding the object layer.** The pods / deployments / services / endpoints / nodes listings show everything else healthy — RESTARTS 0, AVAILABLE 1/1, endpoints bound, nodes Ready, no mechanism events. The anomaly lives in the metric surface; the object layer is your exclusion evidence.

### When asked: "Service latency increased significantly"

> **Systems**: boutique

This wording lives on the metric surface — alerts first. A wave of latency and traffic drops across several services at once is usually a node-scope network story: localize by placement, not by the loudest row.

1. **Open wide, then place.** Read the pods listing in its **wide form** — the NODE column is your map — together with the alerts (and the error-log trail, for service names, if it is cheap). The degrading services' pods landing on one node names the case: that node's network. One service degrading alone is its own pod story; several services that share a node is the node's story.
2. **The node retransmission rows decide, in this order.** ① Compare the node retransmission values: when one node's value is far above every other (an order of magnitude or more), that node is the case — and retransmissions there are **packet loss**: the class is `node_network_packet_loss`. ② When no node carries a prominent retransmission value — only noise-sized spikes, wherever they sit — the case is a network **delay**: the node is the placement pick from step 1, and a small spike on another node does not move it.
3. **Close on the node surface** — the node's own objects / `GetClusterConfiguration` — with the placement map (which service pods sit on that node) as the localization evidence.

### When asked: "Service Performance Degradation."

> **Systems**: boutique

This wording can hide a code defect under a resource-shaped alert. When one service shows saturation (cpu climbing, `cpu_cfs` throttling) with its own latency climbing and a burst of 503s across its business actions, the metric surface has named the symptom, not the mechanism.

1. **Clear the code surface of the flagged service before ranking any resource class.** `ListCodeFiles` → `GetSourceCode` on that service. Run-away work can live in its own request handler — a hot loop doing work the request does not need burns cpu and throttles the pod exactly the way an overload would.
2. **Then close:** a defect line on the code surface is your mechanism (a code class, not a resource class); only when the code reads clean is the resource face (pods: usage vs limits) yours to report.
