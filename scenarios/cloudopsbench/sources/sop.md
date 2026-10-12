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

Follow the reachability chain and stop at the first thing that doesn't add up. Each stop below is a case — deal with the one you actually hit.

1. **Start from the complaint, not the cluster.** Read the caller's error logs, or probe the named service, or check its endpoints — that's what tells you what's actually unreachable. Opening with a workload scan is how you end up chasing the wrong thing.
2. **Then look at the workload, pruned.** The target's pods (the READY/phase outlier tells the story) → its owner chain. What you find there decides the case:
   - **Pod stuck Pending** (`0/N nodes are available …`) → it's a node problem: nodes listing / `GetClusterConfiguration`, find the node that blocks it (cordon, taints, capacity). Read that node's own state to close.
   - **Pod never gets created** (FailedCreate / a missing reference) → it's admission: the event names the missing thing; read the template reference (`GetAppYAML`) plus the referenced object's own listing.
   - **Image pull / mount / probe errors** → the matching config face: the image line / mount / probe stanza in the template.
   - **Everything healthy but probes still fail** → it's the address layer: read the routing config (the gateway's route table) and go through it route by route — each route's Path should point at the service its Path names; one that points elsewhere is your evidence. Stop probing — probing is confirmation, not evidence.
3. **Close properly before you conclude — all three:** the mechanism event; the events surface (`GetResources(events)` — its Warning lines name exactly which object, and for multi-instance workloads which replica, carries the fault); and the config the mechanism points at. Mechanism-only or service-log-only conclusions aren't a closed chain.

This wording also shows up on scheduling / startup failures — decide by what you find on the chain, not by the wording.

### When asked: "Service Availability Disruption."

This wording is overloaded — it walks the SAME reachability chain whichever stage broke (scheduling / startup / admission / runtime). Go case by case; the mechanism decides, not the wording.

1. **Start from the complaint.** Caller-side error logs / connectivity against the named service; then the endpoints binding. Don't open with a workload scan.
2. **Then the workload, pruned.** The pods (state + events) → owner chain. Node-scoped problem? Read the pods listing in its **wide form** first — the NODE column is your pointer.
3. **Deal with the case you land on:**
   - **Pod Pending / unschedulable** → node side, **and read general before specific**: nodes listing / `GetClusterConfiguration` / node events / kubelet status FIRST, then the suspected component (containerd, kube-proxy, …). Jumping straight at the suspected service reads out of order.
   - **Pod never created** → admission side (the event names the referenced object; template reference + object listing).
   - **Image pull / mount / probe errors** → the matching config face.
   - **Everything healthy but probes diverge** → the address layer: audit the routing config (the gateway's route table, Path ↔ target line by line); probing is confirmation, not scanning.
4. **Close properly before you conclude — all three:** the mechanism event; the events surface (`GetResources(events)` — for multi-instance workloads the Warning row names the replica that carries it); and the config the mechanism points at.
