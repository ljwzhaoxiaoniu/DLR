# Application: scenario packages (currently `birdminidev` and `cloudopsbench`)

> **Position**: ④ of the four narrative docs — the **application (the solution)**: turning ①[Background and thesis](01-background.md), ②[Concepts](02-concept.md), ③[Design](03-design.md) into **a runnable content package**.
> **In one sentence**: **one scenario = one complete set of TSM content**, living as git text (Semantic Layer as Code): diffable, reviewable, rollback-able.
> 中文版：[04-application.zh.md](04-application.zh.md) ｜ Index: [README.md](README.md)

> **Every scenario carries its own "case notes"**: `scenarios/<name>/README.md` — where the dataset's semantic raw material came from, how it was packed into the three levels, and the abstraction decisions per database. It echoes [03-design.md](03-design.md): **spec ↔ case**.

## 1. What a scenario package contains (the measured structure)

```
scenarios/<scenario>/
├── sources/
│   ├── configs/DLR/            # L1 modeling sources (dlr: one yaml per database; dlr-state: one yaml per system)
│   ├── consensus/*.jsonl       # L2 domain-consensus sources (organized by namespace / slot class)
│   └── sop.md                  # L3 convention source (human-written; `tsm build sop` compiles the per-question retrieval index)
├── AGENTS.md                   # agent operating layer (precedence / workflow / discipline / tool surface / submission contract)
├── eval/                       # exam paper / evaluation adapter: authored questions.jsonl or external-benchmark adapters (convert / grade / stats)
├── fixtures/                   # reference truths (optional; birdminidev uses them as regression snapshots)
├── results/<round>/            # batch archives (questions.csv + raw/ or traces/)
└── DETAIL.md · DETAIL/         # evaluation ledger + per-case detail (rebuilt by stats)
```

**Every scenario package ships an agent operating layer**: `AGENTS.md` (precedence / workflow / execution discipline / tool surface / submission contract) plus runtime configuration (persona, model, result pruning, disabled tools). It supplies no knowledge; it makes the L1–L3 knowledge actually get executed. Without it, L3 is only optional context. Principle: [02-concept.md](02-concept.md) "The agent operating layer — the other half of knowledge supply".

**Two landed scenarios (peer-level)**:

| | `birdminidev` | `cloudopsbench` |
|---|---|---|
| Scenario shape | `dlr` (SQLite NL2SQL) | `dlr-state` (K8s state-space RCA) |
| L1 scale | 11 databases · **50 LE / 74 PE / 37 PAS** (1,185 graph nodes) | 2 systems · **169 LE / 355 PE / 233 PAS** (53 services + nodes + namespaces) |
| L2 | 11 files · 91 entries | 1 file · 15 entries (clustered by slot class) |
| L3 | 180 sections (**per question**) | 5 sections (**per symptom wording**, covering 754 cases; each section is a decision tree) |
| Tool surface | 7 | 3 (no Neo4j graph) |
| Agent settings | `AGENTS.md` (161 lines; SQL workflow + Final Answer / Evidence SQL) | `AGENTS.md` (78 lines; symptom-first walk / chain order / closing triad / JSON contract) + `dsh.patch.yml` runtime config |
| Evaluation content | Authored paper: `eval/questions.jsonl`, 500 questions | External benchmark: 754 cases + upstream scorer adapter |
| Result | **500/500** (✅ 426 + 🔁 74) | **coverage 754/754 · JRA 753/754 (99.87%)** |

### 1.1 The agent operating layer template (three-scenario synthesis)

The three landed scenarios (`birdminidev` SQL, `cloudopsbench` RCA, `bizagentbench` business operations) share one skeleton. **Do not redesign the skeleton per scenario; adapt the slots marked "adaptive".**

**Invariant core — keep stable across scenarios:**

| # | Invariant | Why |
|---|---|---|
| 1 | **Role and non-coding identity** — say what the agent is; forbid claiming to be a coding/CLI agent | The harness may expose other personas; drifting into "general assistant" loses the domain frame |
| 2 | **Tool-surface honesty** — use only mounted tools; never fabricate a tool name or parameter; never claim an unmounted capability | Fabricated tools are silent failures and break the evidence chain |
| 3 | **Knowledge precedence** — `L3 exact` is the only fixed priority; retrieve L3 at the start of every case and re-read before closing; define `match=exact` (title restates this case). **Without an exact L3 section, L1 and L2 are parallel ReAct paths — no preset L2-over-L1 rank** | Without a binding, L3 is just another piece of context; a rigid L2>L1 order kills the exploration that finds the right anchor |
| 3b | **Three-level disambiguation** — state what each level decides and does **not** decide (L1 structure, not order; L2 schema, not instance; L3 case arbitration, not general knowledge); L3 exact settles conflicts; between L1 and L2 use dual-path ReAct and case evidence, not a mechanical rank; on a persistent conflict, state it, record the gap | Otherwise the agent tries to reconcile layers with common sense and perceives ever more conflicts |
| 4 | **Evidence discipline** — every claim comes from an actual tool result; a proposal, approval or plan is not a result; never guess IDs, amounts or statuses | The verifier scores states and receipts, not narration |
| 5 | **Scope and one-case contract** — stay inside the case's database / namespace / customer; enumerate and close **every** sub-problem | Cross-case leakage and dropped sub-problems are common long-horizon failures |
| 6 | **Deterministic submission** — one fixed final form (Final Answer + Evidence SQL / JSON diagnosis / record_case_outcome) and a single verified closure | Scorer extraction and closure checks depend on a stable shape |
| 7 | **Truthful failure** — bounded retries; do not escalate or claim completion without the actual result; record the real outcome | Protects both the score and the diagnosis of failures |

**Adaptive slots — change per scenario:**

| Slot | `birdminidev` (read-only SQL) | `cloudopsbench` (read-only diagnosis) | `bizagentbench` (mutating business) |
|---|---|---|---|
| Persona / domain | semantic business assistant (NL2SQL) | K8s fault-diagnosis assistant | business operations agent (payments/desk) |
| Tool surface | 7 MCP tools + `skill(paradigm)`; no shell/fs | 3 semantic tools + `cloudops-tools`; no shell/fs | tau2 record/action tools + `state_model_query` / `dlr_search_consensus` / `dlr_search_sop` |
| Workflow | parallel 3-level recall → cross-check/anchor → map → SQL → Final Answer | parallel recall → **symptom-first** chain → re-query L1 after anchor → breakpoint → closing triad → JSON | open case fully → **clock before wait** → one-request-one-approval → execute+verify → bills vs lines → signed adjustments → single verified closure |
| Ordering / safety | two-hop mapping; SQL read-only; no schema probing | chain order (EOC); anchor pruning; namespace scope; events face before closing | due-0 first; approval before execute; no double payment; release unused holds |
| Submission | Final Answer + Evidence SQL + Modeling gap | JSON contract (`top_3_predictions`, rank-1 rule) | `record_case_outcome` with per-sub-problem receipts |
| Runtime config | bundle `AGENTS.md` | `dsh.patch.yml` (persona, model, pruner, disabled tools) | `AGENTS.md` + `BIZ_AGENTS_MD` injection (opt-in) |

**Template skeleton (fill in per scenario):**

```markdown
# Role                      # invariant 1 — who the agent is, not a coding agent
## Authority and priority   # invariants 3/3b — L3 exact fixed; L1/L2 parallel ReAct (no preset rank); per-level scope; retrieve at start, re-read before close
## Tool surface            # invariant 2 — only mounted tools; exact names; no fabrication
## Workflow (numbered)     # adaptive — read-only pipeline / diagnostic chain / mutating transaction loop
## Discipline              # invariant 4/5 + adaptive ordering & safety rules
## Submission              # invariant 6 — fixed final form and closure rule
## Scenario appendix       # adaptive — domain vocabulary, tool-specific traps
```

**New-scenario checklist:**

1. Write the role and the non-coding identity first; delete any default "coding agent" persona.
2. List the mounted tools and explicitly forbid everything else (shell, fs, web, subagents).
3. Write the precedence rule and the exact-match definition; require L3 retrieval at start and re-read before closing.
4. Adapt the workflow to the task shape: read-only query, read-only diagnosis, or mutating transaction.
5. Add the scenario's ordering and safety rules (anchor/JOIN, chain order, clock/approval/duplicate-payment).
6. Define one deterministic submission and one verified closure.
7. A/B on near-miss cases: with vs without the layer; measure strict/score, retries and tokens; revert if it regresses.

## 2. What each level writes

### L1 `dlr` — `sources/configs/DLR/*.yaml`

- Modeling spec and self-check list: **the single source of truth is [03-design.md](03-design.md)** (not repeated here).
- One-line discipline: **write source facts only**; L1 writes **no question-level conventions** and no instance-level facts (see [02-concept.md](02-concept.md) §1 "system scope").
- **No semantic enrichment** (decided 2026-09-24, fairness): descriptions come from **the dataset's own material** — the CSV's `column_name` / `column_description` / `value_description`, plus the parts of `evidence` that are facts about the source itself; **no external knowledge is introduced**. Dataset defects found are **not fixed in L1** but carried by L3 and tagged (see below).
- **What `dlr-state` (COB) writes**: one yaml per system; LE = pointable objects (services / nodes / namespaces), PE = the object's observation surfaces (deployment / pods / endpoints / telemetry / logs / code…), each surface carrying an **anchored reading template**; the anchor = the WHERE key at fetch time (app label / node name / namespace), PAS = the call graph plus carrier/signal edges. **Placement and scope get no edge** (per-case instance facts). Full spec: [03-design.md](03-design.md) §1.7.1.

### L2 `consensus` — `sources/consensus/*.jsonl`

- **Format**: a kid-aggregated JSON array, each entry `{kid, knowledge}` (the loader also accepts BIRD-style per-question evidence).
- **Admission** ([02-concept.md](02-concept.md) §2): **scenario-required · built on the L1 schema · non-workflow**; **no instance-level content**.
- **What it writes**: term → column/value mappings, formulas and conventions, domain background (e.g. "CZK / EUR are the billing currencies").
- **Discipline**: **what should sink to L1 sinks** — facts about the source itself (value domains / granularity / sample nature) left in L2 are on the wrong level; organize by namespace / slot class (bird: one file per database, namespace = database name; COB: one file per slot class, `kubernetes.jsonl` with 10 entries; generic readings are tagged `shared`, system-specific entries are scoped to `boutique` / `trainticket`).
- **COB's L2**: schema-level readings, **tool/environment facts**, and **L1 conflict resolution** (question wording ↔ model terminology), including the placement reading (the pods surface's NODE field → the node object); **no walk order** (order belongs to L3), no instance detail; generic entries are `shared`, system-specific entries are isolated per system.
- **Language**: the same as the questions (English).

### L3 `sop` — `sources/sop.md`

- **Two sectioning shapes, one principle of layered disambiguation**:
  - **`birdminidev` (NL2SQL): per question** — 180 sections; each title restates one question (`### When asked: "..."`), and the body gives that question's conventions / playbook / traps.
  - **`cloudopsbench` (RCA): per symptom wording** — 5 sections cover 754 cases; the title is the question's symptom wording verbatim, and the section body is a **decision tree**: actual on-chain observation → mechanism branch (Pending / image pull / admission / routing…) → closing triad (mechanism event + events surface + config). **Few sections does not mean thin: this is SOP layering** (wording layer → branch layer → closing layer), see [02-concept.md](02-concept.md) §6 "layered disambiguation". System-specific branches are split per system at build time (shared sections stay `shared`); the runtime endpoint (`/mcp/boutique` / `/mcp/trainticket`) binds the scope.
  - Shared reading protocol: how to match, what to do when nothing matches, and that a section covers only its own question.
- **Every section must be tagged by type** (four types, multi-select), on the line under the title: `> **Type**: dataset issue`
  | Type | Means |
  |---|---|
  | **Dataset issue** | The question / gold / evidence is itself defective — sample windows, wrong descriptions: **the dataset's problems and pains are carried here** |
  | **Modeling conflict** | A clash between L1/L2 structure and the question; recall crossing databases (e.g. "transactions" dragging recall into another database) |
  | **Hard question** | The question itself is hard: conventions traps, answer units, counting units, ratio conventions… it needs a playbook |
  | **Other** | Fallback (future enterprise conventions / process content lands here, or gets subdivided later) |
  The tags **serve maintenance and statistics only; at answering time all sections are equal** (the tag never changes how a section executes).
  > Type tags and `Expected` are maintenance conventions of the **bird authored paper**; COB's 5 sections are maintained per symptom family and write no `Expected` (judging is the upstream scorer, see §4).
- **Hard discipline**: **do not write database/table/column names** (decided 2026-09-20). The test: is the sentence the business stating a need, or the database introducing itself?
- **Quality line** (decided 2026-09-26): a ③ hard-question section **may not merely restate the question or explain terms** — it must pin **measured facts and traps** (counts, set sizes, ties/distributions, misreadings), and the facts **must be verified with SQL before writing**; after giving the facts, say **the fact is settled — answer by it** (otherwise the agent spends its budget self-verifying).
- **The reinforcement recipe (on demand, not for every section)**: if a question's run shows the agent **repeatedly self-verifying** (the right section hit, the convention right, yet a lot of SQL burnt probing the boundary), reinforce that section along three lines (a measured worked case — q37, in the [birdmini README](../scenarios/birdminidev/README.md) §4): ① which **fork** does this question most easily take wrong? ② does the fork have a **measurably concrete consequence** (a number / a row count / another entity — at the grain of "of the 2,269 rows, 218 have zero test-takers", not "some / possibly")? ③ add one sentence **"settled — answer by it"** (the settled tone is functional: it maps directly onto the agent's verification budget). **Do it only on the sections that showed the problem** — the natural way of writing a section comes first; never rewrite a healthy section to fit a template.
- **Negative few-shot (Wrong turn) — the key optimization measured 2026-11-03**: it applies when **the rule is already in the section but the agent still uses it wrong** (not a knowledge gap). Append one line at the end of the section: `> **Wrong turn (observed)**: <method-level wrong move>` — write only **the one wrong move actually observed**, state what is wrong rather than the right answer, and **never write instance amounts / record IDs / fixed minutes**. A positive convention leaves room for interpretation; the negative seals off "the plausible-looking fork" so the agent need not self-verify. Discipline: ① a knowledge gap → add positive L1/L2/L3 content; ② if a negative conflicts with a numbered step, **fix the step first** (steps are the main convention, negatives are only observed evidence), otherwise the agent faces a self-contradiction; ③ each negative maps to one measured failure, and the question must be re-run after writing it; ④ a negative belongs to its own question only — transplanting to another question requires a measured failure there. Measured (bizagentbench, 2026-11-03): 025 28/29→29/29, 021 29/30→30/30, 019 34/35→35/35, 009 41/42→strict; 007's `joint.fee_and_reserve` closed (remaining cargo/EUR timing variance). These are lessons burnt through 2+ billion tokens — **cheaper and steadier than restating the positive rule**.
- **Check before closing — the second effective optimization measured 2026-11-04**: append a set of **business invariants that must hold at closure** (not verifier check ids): e.g. "the prepaid credit right is fully preserved", "the intercompany transfer is eliminated at the actual bank amount", "the disputed claim is still alive", "total fees stay within the all-in allowance", "payments/deliveries have actually reached received/delivered". Write them as business checks, each mapping to one business invariant, verifiable and decidable; no instance values or answers. Division of labour with Wrong turn: **Wrong turn seals the wrong fork; Check before closing pins the closure verification**. Measured (bizagentbench, 2026-11-04): 037 / 038 / 042 / 044 / 045 / 046 flipped to strict with it (6 cases); 048 / 049 / 050 did not flip (multi-point / variance). Discipline: ① add only to cases with a measured closure failure; ② each check must map to a business invariant, never copy verifier field/check names; ③ re-run the case after adding; ④ if it conflicts with a numbered step, fix the step first. Like the Wrong turn, these came at the cost of 2+ billion tokens.
- **Section thickness**: L3 is retrieval-delivered (`dlr_search_sop` fetches only the matched section) — **a longer section no longer has a global cost; you pay only on the question that hits it.** So do not stint on words when adding facts.
- **Expected consistency (an invariant)**: every value in `Expected` must fall **inside the answer set of this section's stated convention** (the q27 counter-example is a worked case in the [birdmini README](../scenarios/birdminidev/README.md) §4).
- **The comparable convention**: write the ruling value as `> **Expected**: <value>` (multi-value separated by `|`); judging and ruling both use it. A section whose "true answer = empty result" **writes no Expected** and states the emptiness criterion in the body (the criterion recognizes phrasings like `empty list / no data / 为空`).
- **Admission**: **after the fact, on demand** — runtime exposes a problem → classify → add a section; never pre-write general rules (n=1 is not a rule). The three tiers are in [02-concept.md §2](02-concept.md).
- **After writing, re-run** (decided 2026-09-29): the section is added → `tsm build sop` → **immediately re-run that question and check against the table**. A section takes effect later than the batch that exposed the problem; the ledger's row still shows the pre-section run — which may be a ✅ propped up by a false positive (the two late-section cases, q1136/q1472, are in the [birdmini README](../scenarios/birdminidev/README.md) §4).
- **Scope limiting (against cross-question transplanting)**: a section's caution gets carried by the agent onto same-shaped questions (a transplant case — q716 — is in the [birdmini README](../scenarios/birdminidev/README.md) §4). Every **generalizable caution** must say it belongs to **this question's** convention, and name the cases where it does not apply (that section has since gained a scope-limiting closing line).
- **Delivery**: `tsm build sop` compiles the source into LanceDB's `sop` index (question → section), retrieved per question by `dlr_search_sop` — **only the one section restating this question** (the old whole-file transfer of `sync_sop.sh` + `skills/sop` was retired 2026-09-28). The single true source remains this one `sop.md`.

## 3. `fixtures/` — reference truths

`fixtures/` currently holds `birdminidev`'s regression snapshots; COB's reference truth is the upstream scorer's ledger (`results/` + `DETAIL`, see §4).

| File | What it verifies |
|---|---|
| `dlr_vector_manifest.json` | YAML → vector rows (id / name / PAS text), character by character |
| `py_semantic_query.json` | semantic recall's structure, order, and confidence |
| `py_consensus_search.json` | L2 retrieval's content and scores |
| `py_pe_mapping.json` | the second hop's full mapping (including `database_url`), byte for byte as JSON |
| `py_execute_sql.json` | SQL execution results and rejection conventions |

**2.0 repositioning = regression snapshots**: the Python line is gone; these are no longer "cross-implementation parity" but **the self-证 baseline after modeling changes** — after editing YAML / consensus, run `src/verify/*` and check the results changed **as expected**; expected changes get the snapshots updated along.

## 4. `eval/` — two forms of exam paper (peer-level scenarios)

- **Form A: authored paper (birdminidev)** — `eval/questions.jsonl`, each entry `{question, expected, source}` (`source` = provenience of the answer key, for attribution when a failure is judged); 500 lines = **74 from L3 clause conventions** (answer keys of overturned questions) + **426 from gold**; the generator `eval/build.mjs` (`node eval/build.mjs`, reproducible; 74/426 match the ruling columns **item by item**).
- **Form B: external-benchmark adapter (cloudopsbench)** — `eval/` holds adapters rather than a paper: `convert.mjs` (session logs → reference trace) · `run_eval.py` (reuses the upstream scorer) · `grade.sh` (one-command scoring) · `stats.mjs` (rebuilds STATS / DETAIL). The paper itself is the upstream 754 cases (`process-label` full set); the judging caliber = upstream CA/FA/JRA + MC/EOC/ECR/EE, **with no human reversal convention**.
- **Results**: bird **500/500** (✅ 426 + 🔁 74); COB **coverage 754/754 · JRA 753/754 (99.87%)** (round 420).
- **The exam paper follows the scenario; the exam system follows dsh** (an independent bundle) — see [eval.md](eval.md).

## 5. Review: the dual-read test

Every semantic entry passes the **dual-read test** before entering the library (full definition: [02-concept.md](02-concept.md) §4).

## 6. Scenario-switch checklist

```bash
# 1) point at the new scenario (or put it in .env as TSM_SCENARIO)
export TSM_SCENARIO="/abs/path/scenarios/<name>"

# 2) build the three levels (from the repo root)
cd "TSM Core Service"
npx tsx src/build/buildLance.ts --all          # L1 vectors (LE/PE/attribute/PAS)
npx tsx src/build/buildConsensus.ts            # L2 vectors (per namespace)
npx tsx src/build/buildSop.ts                  # L3 index (question → section)
npx tsx src/graph/loadNeo4j.ts --all --wipe    # graph (⚠ stop the MCP server first: drop and rebuild; dlr-state scenarios load no graph)
cd ..

# 3) the exam paper (optional: generate from the three-level sources)
node scenarios/<name>/eval/build.mjs

# 4) self-check
cd "TSM Core Service" && npx tsx src/verify/precheck.ts
```

> **`dlr-state` scenarios**: one yaml per system; build `buildLance` / `buildConsensus` / `buildSop` only and **skip `loadNeo4j`** (no graph); validate one case with `dsh_cob/run_one.sh <system> <category> <case_id>` and score with `scenarios/cloudopsbench/eval/grade.sh` + `stats.mjs` (see [run.md](run.md) §2.1).

## 7. Three things a scenario switch never touches

| Untouched | Why |
|---|---|
| The cognition layer `skills/paradigm` (TSM + DLR paradigm awareness) | **Scenario-independent** — which is exactly why it exists standalone |
| The L3 tool name `dlr_search_sop` | A fixed name: what changes is the index's content (`tsm build sop` compiles it from the scenario's sources), not the model layer's choices |
| The MCP tool surface (frozen: 7 in the `dlr` shape — L1/L2/L3 semantics + `get_full_data_info` drill-down + `execute_sql` fetch; 3 in `dlr-state`) | A frozen contract (see [roadmap.md](roadmap.md) §1) |

## Related

- Concepts and admission criteria: [02-concept.md](02-concept.md) | DLR modeling spec: [03-design.md](03-design.md)
- Evaluation (paper + exam system): [eval.md](eval.md) | operations and troubleshooting: [run.md](run.md)
