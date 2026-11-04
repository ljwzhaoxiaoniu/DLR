# BizAgentBench — TSM Modeling Plan (L1 · dlr · L2 · L3)

> **Status**: as-built, 2026-11-04 — the three layers are in place and measured: L1 **106 LE / 147 PAS / 687 vector rows**, L2 **191 entries**, L3 **50 sections**; best-practice store `bizagentbench-v35` (entities 687 / consensus 191 / sop 50); per-case best = **strict 44/50** (see [DETAIL.md](DETAIL.md)). The freeze pins **L1/L2 only** (`l1l2-4eafa301`); L3 is stitched per question.
> **Provenance**: the dataset's own `DB-index` / `DB-*` / `DESK-*` / `PSP` documents, `tool_catalog`, and the case instructions — the visible side only. Gold answers, verifier internals and instance values never feed the model.
> **中文版**: [modeling-plan.zh.md](modeling-plan.zh.md)

## 1. Scenario & data source

- **What**: BizAgentBench `bizagentbench-payment-v1` — 50 long-horizon payment-operations cases (1–30 Operations Desk, 31–50 PSP); a customer simulator drives each case; the final world + audit trail are scored deterministically as **G / P / F** (strict = G∧P∧F; IF = 1 − P∧F).
- **Raw material**: 789 knowledge documents (621 searchable), 601 capabilities, 404 world collections / 3,121 records; the dataset checkout lives outside this package (`BIZAGENTBENCH_DIR`).
- **Boundary**: modeling scope ≤ the information available to the test set — schema-level objects and business conventions only, never per-case amounts, record IDs, minutes or answers.

## 2. The three levels

### L1 = data-source level (`dlr`, three yaml files)

| File(s) | Scope | LE | PAS | Vector rows |
|---|---|---|---|---|
| `operations_desk.yaml` + `typed_services.yaml` | Desk core + joint/link objects + service objects (cases 6–30) | 84 | 127 | 513 |
| `psp.yaml` | PSP account + 20 case families | 22 | 20 | 174 |
| **Total** | | **106** | **147** | **687** |

- **LE = business object** with lifecycle and mounted capabilities; **PE = record surface** (resource, attributes, public flags); **ARCS** anchors each request to its case scope; **PAS** routes between objects.
- Capabilities are mounted on the LE with **anchor + guard** (the action's key and its effect), read from `tool_catalog` and the service-interface documents.
- **Zero instance values** — the model is schema-level and serves every case of its system.

### L2 = domain consensus (`consensus`, four jsonl files, 191 entries)

| File | Entries | Content |
|---|---|---|
| `shared.jsonl` | 10 | cross-system conventions |
| `operations_desk.jsonl` | 44 | desk-wide rules: units, quote vs settlement, fees, reserves, amendment vs allocation, evidence versions |
| `typed_services.jsonl` | 84 | service-object conventions (mandates, custody, collateral, forwards, disputes…) |
| `psp.jsonl` | 53 | PSP conventions (quota, notifications, refunds, tax credits, claims…) |

L2 holds **non-workflow knowledge** (terms, calibers, background). Workflow and question-level playbooks belong to L3. Every entry states its scope and reading rule; entries never carry answers.

### L3 = playbook (`sop.md`, 50 sections)

- Section title = the customer opening **verbatim** (the retrieval trigger); the body is a class-level playbook delivered by vector retrieval (`dlr_search_sop`).
- Split: Desk 30 + PSP 20. Sections are authored **on demand**, under three admission tiers: ① dataset defect ② wrong without the section ③ >15W without the section.
- Two measured techniques are folded into the sections: **Wrong turn (negative few-shot)** — seal the observed plausible-but-wrong fork; **Check before closing** — pin the business invariants at closure. Both are written in business language (no verifier check ids, no instance values), and the case is re-run after every section edit.

## 3. Modeling process

1. **Read the dataset, not the answers**: build each system's object family from `DB-index` / `DB-*` / `DESK-*` / `PSP` docs and the tool catalog; confirm each LE is nameable, each PE is a real record surface, and each capability's anchor matches its action.
2. **Grow per case, then freeze**: early cases grew the Desk core; typed services added the service objects; PSP added its account and 20 case families. The full model (687 rows) was built once, then extended by description fixes only.
3. **Quality gates**: `tsm coverage` (missing columns / descriptions / unexpressed FKs), bridge precheck (tool surface), and a per-case rerun whenever a section changes.
4. **Discipline**: no instance values, no gold/verifier edits, no answer injection; if a rule conflicts with the dataset document, the dataset document wins.

## 4. Retrieval / tool surface

The evaluation bridge exposes **3 semantic tools**: `state_model_query` (L1 slice: object, lifecycle, capabilities, public collections), `dlr_search_consensus` (L2), `dlr_search_sop` (L3). The dataset's record/action tools, customer simulator and verifier are unchanged; the DLR tools replace `search_knowledge` / `read_document` (**assisted** track).

## 5. Evaluation integration & freeze

- Per-case runs archive `summary.json` (G/P/F + checks), trajectory and final world under `results/dlr-full/`.
- **Freeze = L1/L2 only** (`l1l2-4eafa301`, unchanged since v34). L3 is per-question stitched and does not participate in the freeze; each case anchors to the section text used in its own run.
- Reproducibility target: the same L1/L2 freeze + store build + run scripts can rebuild the same band of results; single runs are samples (agent variance is large — see README §5), so the ledger reports best + range, not a fake stable rate.

## 6. Lessons (measured)

- **Wrong turn and Check before closing are the two effective L3 levers** — measured flips: 019/021/025/009/007 (wrong turn) and 037/038/042/044/045/046 (closure), plus 003/004/005/010/013/049 in the v35 revalidation.
- **Variance dominates on unnormalized workflows**: 008 drifted across 16 rounds without converging; 048/032/014 show 5–8-check swings under near-identical knowledge. Stop at the empirical 3-attempt limit and archive best.
- **The freeze scope matters**: mixing an L3 version requirement into the freeze would drag unrelated cases into re-runs; L3 stitching is the correct unit.
