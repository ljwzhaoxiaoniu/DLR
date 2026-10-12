# SOP — business-logic level (read this FIRST)

> One section per **symptom wording** — the section title is the wording **verbatim** (the
> dataset reuses a small set of templates; a section covers every case that restates it).
> Match your question against the section headings: if a section restates your question, its
> **walk discipline** is the highest-caliber instruction for this case — follow it. No matching
> section -> nothing is known about this case's walk; solve with L1 (objects/surfaces) + L2
> (readings). Sections govern **how to walk** (order and closure); what each surface means is
> L2's job, where the objects and surfaces are is L1's.
>
> Written from measured runs (the 1012 v3 batches) and the chain's own logic — sections state
> walk discipline, never answers. One section is added only when runs show the walk losses it
> governs.

## cloudopsbench

### When asked: "Partial Service Unreachability."

Walk the reachability chain in this order — reported symptom FIRST, then the object layer, then the mechanism, then close on the configuration context. (Measured: object-layer-first walks and mechanism-only closures are the two recurring losses on this wording.)

1. **Symptom first — before any workload scan.** Read the caller side the wording points at: the caller's error logs, a connectivity probe against the named service, and/or the service's endpoints binding. Establishing the symptom first localizes the chain; a workload listing before this reads out of order.
2. **Object layer, pruned by the anchor.** The target's pods (READY / phase; drill into the outlier pod's detail) → owner chain (deployment / replicaset). The first observation that contradicts expectation localizes the broken stage.
3. **Mechanism event.** Read the pod's / owner's events for the concrete mechanism (FailedCreate · FailedScheduling · FailedMount · image-pull · probe) and follow it to the matching surface (admission objects · node state · registry reference · probe config).
4. **Close on the configuration context — never conclude without it.** The chain closes only when BOTH halves are read: the mechanism event AND the configuration it points at — the workload template's reference (`GetAppYAML`) plus the referenced object's own listing. A conclusion drawn from the mechanism event alone leaves the chain open. **The configuration read is a CLOSE, not a probe: do not pull `GetAppYAML` while steps 1–3 are still open — reading the config before the mechanism evidence names its target is the recurring out-of-order move on this wording. And when the mechanism lands on a concrete carrier (a specific pod / a data-service instance), the close must be read off that carrier instance's own object-level evidence — its detail, events or configuration — not only a service-level log stream or a listing.**

The same wording is also used by scheduling / startup-stage failures — discriminate on the chain (steps 2–3's mechanism), never on the wording.

### When asked: "Service Availability Disruption."

This wording is overloaded: it enters the SAME reachability chain, whichever stage broke (scheduling / startup / admission / runtime). Walk in chain order and discriminate on the mechanism, not the wording.

1. **Symptom first** — caller-side error logs / connectivity against the named service; then the endpoints binding.
2. **Object layer, pruned** — the workload's pods (state + events) → owner chain. For a node-scoped problem, read the pods listing in its **wide form** first — its NODE column is the pointer to the node.
3. **Mechanism event → matching surface** — FailedScheduling → node side; FailedCreate → admission objects; image-pull / mount / probe → their own surfaces.
4. **Node side: generic BEFORE specific.** Read the node's general / transition evidence first (nodes listing · `GetClusterConfiguration` · node events · kubelet status), THEN probe the specific suspected component (containerd · kube-proxy · …). Jumping straight to the suspected root-cause service reads out of order. (Measured on the containerd case.)
5. **Close on the configuration context** — same closure rule as above: the mechanism event AND the configuration it points at must both be read before concluding. **The configuration read is a CLOSE, not a probe: do not pull `GetAppYAML` while steps 1–4 are still open — reading the config before the mechanism context (log / event) is captured is the recurring out-of-order move on this wording. And when the mechanism lands on a concrete carrier (a specific pod / a data-service instance), the close must be read off that carrier instance's own object-level evidence — its detail, events or configuration — not only a service-level log stream or a listing.**
