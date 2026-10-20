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

**Our order (a team convention): alerts first.** The metric surface names the case; the object layer is only the exclusion. Unlike the reachability wordings, opening from the object layer here is not troubleshooting.

1. **Read the alerts first.** `GetAlerts` gives the entity, the anomaly kind (latency / saturation / throughput / traffic), and the scope. When several alerts fire at once, find the **primary anomaly** — the service the other alerts ripple from. Apply the branches to the primary anomaly, not to the loudest keyword.
2. **Pick the epicenter by row shape, not by size.**
   - A latency row that moves only its p90 is a **partial-traffic ripple**; the row whose p50 and p90 both move carries the delay across all of its traffic and marks the **epicenter**. Among dual-moving rows, the steepest p90 escalation (measured baselines only) wins; the call graph closes it.
   - **Two moving rows on one call path:** the **downstream** one is the source, whatever the row shapes say — the upstream row is its accumulated wait on the callee. This also settles a zeroed-baseline pair (`New Spike`, nothing else to rank by).
   - **Independent candidates (no call path):** a candidate that would need a quiet intermediate hop is not the source; the dual-moving row is the epicenter, a p90-only row is a ripple. Percentages on near-zero baselines prove nothing.
   - A saturation row counts only when it rides on that epicenter **and comes with the service's own latency rise** — a genuine resource fault shows the throttle and its own latency climbing together; a bare `cpu_cfs` row on a non-epicenter service, with no latency of its own, is collateral noise.
   - **No latency row at all (bare saturation):** a chronically throttled `Val: … (Throttled)` shows no movement, and sub-core percentages are sub-noise; the traffic / network row that carries an actual deviation names the service.
   - **`LATENCY_MISSING`** ("metrics dropped to zero/NaN") is a collection hole in the injection window, not a service's deviation — never anchor on it.
   - **Whole-system network-drop sweep (no latency row):** the epicenter is the point every request flows through (the system's total traffic); its collapse is the source. Client-side resolution errors / restarts during the sweep are fallout — the class stays the network-side delay on the total-traffic point; a resolution-looking message inside the sweep does not make a DNS case.
3. **Take the case branch you land on.**
   - **Saturation on one service** (`RESOURCE_SATURATION [cpu_cfs]` / `[cpu core]` / memory) → read its pods (usage vs limits) to close.
   - **A constant delay on one service's own latency** (p50/p90 jump by a fixed amount, callers see the same added delay, downstream server-side clean, no saturation rows) → `pod_network_delay`; do not reach for a code explanation (an artificial code delay is a different wording, shown from the code surface).
   - **The same latency / packet anomaly across every pod on one node** (scope with the pods listing's NODE column) → node-scope network fault; read the node objects (conditions / node runtime services) to close.
4. **Close by excluding the object layer.** Pods / deployments / services / endpoints / nodes read healthy: RESTARTS 0, AVAILABLE 1/1, endpoints bound, nodes Ready, no mechanism events. The anomaly is in the metric surface; the object layer is your exclusion evidence.

### When asked: "Service latency increased significantly"

> **Systems**: boutique

**Our order (a team convention): open wide, place, then let the node retransmission rows decide.** This wording lives on the metric surface — alerts first. A wave of latency and traffic drops across several services at once is usually a node-scope network story: localize by placement, not by the loudest row.

1. **Open wide, then place.** Read the pods listing in its wide form — the NODE column is the map — together with the alerts (and the error-log trail for service names, if cheap). The degrading services' pods landing on one node names the case: that node's network. One service degrading alone is its own pod story; several services sharing a node is the node's story.
2. **Read the nodes listing in wide form, then let the retransmission rows decide.** Read every node's retransmission value first; do not anchor on one node before the comparison.
   - One node's retransmission value far above every other (an order of magnitude or more) → that node is the case; the class is `node_network_packet_loss`.
   - No prominent retransmission value — only noise-sized spikes, wherever they sit → the case is a network delay; the node is the placement pick from step 1, and a small spike on another node does not move it.
3. **Close on the node surface** — the node's own objects / `GetClusterConfiguration` — with the placement map (which service pods sit on that node) as the localization evidence.

### When asked: "Service Performance Degradation."

> **Systems**: boutique

This wording can hide a code defect under a resource-shaped alert. When one service shows saturation (cpu climbing, `cpu_cfs` throttling) with its own latency climbing and a burst of 503s across its business actions, the metric surface has named the symptom, not the mechanism.

1. **Clear the code surface of the flagged service before ranking any resource class.** `ListCodeFiles` → `GetSourceCode` on that service. Run-away work can live in its own request handler — a hot loop doing work the request does not need burns cpu and throttles the pod exactly the way an overload would.
2. **Then close:** a defect line on the code surface is your mechanism (a code class, not a resource class); only when the code reads clean is the resource face (pods: usage vs limits) yours to report.
