# Concepts: Three-Level Semantic Modeling (TSM)

> **In one sentence**: TSM sorts "what it takes to answer a question" into three levels by **who maintains it and when it changes** — data-source level (L1) / domain-consensus level (L2) / business-logic level (L3); **the admission criteria are the governance line**.
> **Origin**: TSM grew out of research practice in the DLR program; since 2.0 it is a **structural principle** of the product, independent of evaluation.
> 中文版：[02-concept.zh.md](02-concept.zh.md) ｜ Index: [README.md](README.md)

## 0. Who TSM + DLR is the answer for

Read the opening paper [01-background.md](01-background.md) first. It lays the problems out: **text is schema-on-read** — the same sentence is an assertion in one scenario and a rule in another, "its layer is not in the words, it is in the usage"; the semantic layer exists to solve the **typing problem** (which layer each piece of knowledge belongs on) — and its two ways of dying are the W3C's "cast in stone" and bare RAG's "laissez-faire".

**The whole design of TSM + DLR is the answer to those problems**:

| Problem raised in 01-background | TSM + DLR's answer |
|---|---|
| The layer has only usage-side answers (citation frequency / coverage / change rhythm / maintainer) | **Admission criteria**: ask four usage-side questions (§2) — the criteria are "usage" made operable |
| The freeze camp casts the flow in stone → humans cannot read it + it is an LLM weak region | **Layered writing**: L3 in the business's words, L1 in the data's words; the **dual-read test** (no frown from business + executable by a bare LLM) lands on one and the same natural-language text (§4) |
| The laissez-faire camp (bare RAG): layers muddled, norms colliding | **Three-way separation + precedence**: `sop > consensus > literal`, with an arbiter on conflict (§7) |
| Layer changes are the norm and need an institution, not one-off judgments | **Layer-migration**: attachment carries the fixation + probes generate candidates + humans only sign (§2 appendix) |
| Instance text in the hundred-millions, semantic skeleton in the thousands — neither may drown the other | **Class-level / instance-level division**: the system stores only the routing entries ("which *kind* to consult"); the content stays in the business systems and is pulled at runtime over MCP (§1 · system scope) |
| No frame of reference | **DLR claims the data architecture as the frame**: an LE-PE two-layer decoupling (concept vs implementation), plus a **correction right** over the schema |

**One-line positioning**: in the digitization era, layered ownership produced **documents and report norms** — static, needing a human translator, rewritten on every platform upgrade. In the intelligence era the same layering becomes a **runtime asset** — consumed by agents directly, with a precedence order, versionable and regressable. The same act of "fixing the order down" turns from *written for people to read* into *executed by machines*.

## 1. What the three levels are

| Level | Key | Carrier (2.0) | Answers | How it is obtained | Maintained by | Change rhythm |
|---|---|---|---|---|---|---|
| **Data-source level** L1 | `dlr` | scenario package `sources/configs/DLR/*.yaml` → graph + vectors | What this domain **has**: business concepts, where they land, how they connect | `dlr_semantic_query` → `get_pe_mapping` / `get_le_attrs` | **the data side** | with the schema / data sources |
| **Domain-consensus level** L2 | `consensus` | scenario package `sources/consensus/*.jsonl` → vectors | How a question's wording **is computed / filtered**: term→value, conventions, background | `dlr_search_consensus` | **domain business staff** | with the business's conventions |
| **Business-logic level** L3 | `sop` | scenario package `sources/sop.md` → vector index (compiled by `tsm build`, retrieved per question) | How this *kind of question* **is settled**: playbooks, exceptions, traps | `dlr_search_sop(question)` | **business staff** | with the process / playbook |

The three levels are **anchored in parallel** (not a serial pipeline): once a question arrives, all three are fetched at once and cross-checked before SQL construction begins.

> Note on naming: L2 is deliberately not called "knowledge" — it is not a traditional knowledge base/KG, but **a class of scenario-required, *non-workflow* knowledge built on the L1 schema**.

**System scope (equally important)**: the three levels cover **schema-level semantics** — structure, value domains, granularity, terminology, playbooks. **Data-source instance-level knowledge** ("what some specific row or batch of data is": who customer 38508 is, which product sold most this month, whether these negative values are all refunds…) **is outside this system's semantic scope**:

| In the system (written into the three levels) | Out of the system (attached externally) |
|---|---|
| Column value domains, table granularity / sample nature, join keys (L1) | Concrete row values, concrete entity lists that **change snapshot by snapshot**, the data's live distribution |
| Question-wording ↔ term convention mapping (L2) | Facts knowable only within one particular query |
| Playbooks / exceptions / traps (L3) | — |

> **The discriminating line (added 2026-10-10)**: structures that are **the same in every snapshot** (service rosters, call topologies, node rosters, fixed anchor keys) are **source structure → L1**; what differs snapshot by snapshot (instance names, IPs, states, messages) is out of the system. One sentence: **"same in every copy" = source structure; "different in every copy" = instance.**

Instance-level knowledge takes two routes: **① compute on demand** (the agent pulls it from the data with `execute_sql`); **② external attachment** (the enterprise's own systems provide it via **MCP tools**, and the **SOP references** "where this figure comes from"). This keeps the system **horizontal and reusable** (it does not rot as the data changes), while the freshness of instance facts is delegated to MCP.

## 2. Admission criteria (= the governance line)

To decide which level a piece of knowledge belongs to, **ask four questions, in order**:

0. **Is it a fact about some specific row or batch of data?** → **outside the system** — do not write it as knowledge (compute on demand, or fetch via an external MCP; see "system scope" above).
1. **Is it a fact about the data source itself?** (column value domains, table granularity, sample windows, join keys… independent of "who will ask what")
   → **L1 `dlr`**. Even if it originally came from elsewhere (say, a dataset's evidence), as long as it is a scenario-independent source fact it sinks into L1, **written into the corresponding entity/attribute description**.
2. **Is it a mapping from question wording ↔ model terminology, or a convention that exists only for some class of phrasing?** (term→column/value, formulas, conventions, background knowledge)
   → **L2 `consensus`**. Its hallmark: **non-workflow** — it only holds with the scenario's (business) context.
3. **Is it a playbook / exception / trap for this kind of question?** ("where this kind of question typically goes wrong", arbitration rules, check steps)
   → **L3 `sop`**.

**The mnemonic**:

| The sentence in your head | Belongs to |
|---|---|
| "How is this data stored" | L1 |
| "Which column does this phrasing query / how is it computed" | L2 |
| "How does this kind of question typically go wrong" | L3 |

Boundary examples:

| Fact | Belongs to | Why |
|---|---|---|
| The `Currency` column takes CZK / EUR — Czech koruna and euro respectively | **L1** | A column's value domain — every user of this data needs it, and it has nothing to do with any question |
| "Monthly consumption is a per-customer, per-month aggregate, **not** a single-transaction amount" | **L1** | A granularity fact; written into the `Consumption` attribute description (and it dissolves the "unit price vs monthly spend" confusion) |
| `transactions_1k` is only a 1,000-row sample over a 4-day window | **L1** | A property of the source itself, which decides the answer to any "some month, some product" question |
| The `2012/8/24` on the question's face is to be read as a calendar date | **L2** | A conversion convention from question phrasing → storage format; not a source fact |
| "nationality" refers to the country the station is in, not a customer field | **L2** | A wording → structure mapping |
| "In percentage questions the numerator and denominator must share the same population, and the denominator must include customers with no records" | **L3** | A playbook/trap for this kind of question (effective only when that question hits it) |
| The **38508** in "what is customer 38508's monthly consumption", or "the top-selling product this month" | **outside the system** | Instance-level — computed from the data on demand, or fetched via an external MCP; never sedimented as knowledge |

> The difference from earlier versions (important): **"which column does this phrasing query" does not necessarily go to L2** — if it is really a statement about the source itself (value domain / granularity / sample), criterion 1 **sinks it into L1**. In practice most of BIRD's `evidence` falls in this class.

### L3 section admission (decided 2026-09-25)

Writing an L3 section is not free: sections are **vector-indexed and retrieved per question** (`dlr_search_sop` returns only the matched section), so a single section no longer has a global cost — but it still adds one more norm to maintain and to verify. So section admission has **three tiers**:

| Tier | Criterion | Basis |
|---|---|---|
| **① Dataset defect** | The question / gold / evidence is itself defective | It is the ruling basis; it must be written |
| **② Failing questions** | **Without the section the question is answered wrong** | The method/convention is missing; it must be written |
| **③ Expensive questions** | **Without the section the cost is clearly higher than with it (the practice line: above 150k tokens — 15W)** | The section's value is the exploration cost it saves |

All three tiers require **taking the no-section baseline first** (questions that already had no section are the natural baseline); questions answered correctly at a reasonable cost = no evidence → no section. The same ruler applies to **retroactive review** of existing sections — this project used "section ablated, run bare" comparisons on 09-25 to delete six unsupported sections from debit_card.

### Beyond the criteria: layer migration is an institution, not a one-off judgment

Knowledge **changes layers** — a convention reused again and again, uncorrected, deserves promotion; a consensus overturned by a new individual (an old threshold meeting new equipment) deserves demotion to an exception entry. So the three levels are not "fill once and done":

- **Attachment carries the fixation**: every piece of knowledge registers which entity / scenario class it belongs to — the commitment is not in the text but in the **attachment relation** (addressable, auditable);
- **Probes generate candidates**: who is cited repeatedly, who is corrected repeatedly — runtime observation produces the candidates (raw material = session logs / exam results, see [eval.md](eval.md)) — not human memory;
- **Humans only sign**: the promotion/demotion decision belongs to the owner (§3); the machine only hands the candidate over.

(In this project, L3's "admission after the fact" is the prototype of that institution: runtime exposes a problem → classify → add an entry. **Hopping turns from drift into immigration.**)

## 3. Layered ownership: the enterprise skeleton

TSM's most practical meaning for an enterprise is not technology but **ownership** — "render unto God what is God's, unto Caesar what is Caesar's":

- **Business staff** maintain their `sop` (conventions, exceptions, processes — in the business's words);
- **Domain business staff** maintain `consensus` (terminology, domain consensus);
- **The data side** maintains `dlr` (the source itself, as the databases evolve).

Each line has its own responsible party and its own change rhythm, without cross-contamination. One **writing discipline** follows:

> **The text's layering is the ownership's layering**: L3 in business language throughout, L1 in data language throughout, and L2 in the middle doing the alignment.

## 4. Layered writing principle: reference your subordinates, never describe above your level

Good layering = **an upper level may reference the object descriptions of lower levels; level by level they align and converge; never describe above your level** (decided 2026-09-20).

- **L3 does not write database/table/column names** (no `yearmonth`, no `Consumption`, no `transactions_1k`). To refer to a column, say in business language what data is wanted; the physical mapping is L1/L2's job.
- **Conventions the data itself carries may stay** (e.g. "the period is recorded as a YYYYMM code"); **descriptions of the database structure may not**. The test: is the sentence the business stating a need, or the database introducing itself?
- Anti-pattern: one L3 section wrote "each row = one customer-month" as a data-source description at the level of `yearmonth.Consumption` — **above its level**.
- Likewise, **L1 does not write question-level conventions** (that is L2/L3's work); the moment an L1 description says "when a question writes X…", it should float up or be cut.

**Acceptance = the dual-read test** (the single standard for every semantic entry): a non-technical business person reads it once **without frowning**, a bare LLM reads it once **and can execute it** — both pass, it enters the library. This is not an experience concern: **hard for people = low corpus frequency = the LLM's weak region**; a business person's frown is the model's error message — and a free, early rework.

**The correction right**: the semantic layer does not touch the schema on its own, but it holds a correction right over the schema's **description** — "this table is *named* X but *is* Y — a historical accident, read it as Z". **A translator does not rewrite the original, but a translator is entitled to flag typos in it.**

> ⚠ **This project's boundary (2026-09-24)**: when modeling a dataset we **add no semantic enrichment** (fairness) — descriptions come from the dataset's own material only; the dataset's own defects are **not fixed in L1** but carried by L3 and **tagged by type**; correction is limited to the minimal wording "required to remove ambiguity". See [04-application.md](04-application.md) §2.

## 5. Layer weight is a seesaw with the workload

The three levels' **investment ratio is not fixed**; the workload's shape decides:

| Workload shape | L1 | L2 | L3 |
|---|---|---|---|
| NL2SQL / BI question-answering | **Heavy** (data-source semantics are the main task) | Thin | Very thin (arbitration only) |
| Operations / agentic (e.g. RCA) | Thin (little structured surface to model) | As needed | **Thick** (runbooks / diagnosis / process) |

The same TSM eats both shapes precisely because of the layered decoupling — **which layer gets the investment is the workload's decision**; it is not about filling all three to the brim.

Two points about L3 (not to be underestimated):

- It is thin in this project (NL2SQL) because **NL2SQL is too simple** (single-query tasks; there is no process to write); it doubles as the **exception-bearing layer** (arbiter of modeling conflicts, question defects, traps).
- But **a benchmark cannot prove it unimportant**: for an enterprise, L3 (business logic) is **possibly the most important level** — L1 is a threshold (many tools can do it; replaceable), L2 is a dictionary, and only L3 carries "our numbers computed by our conventions" as a unique asset.

## 6. Layer duties and ceilings (how hard cases land)

Each level has its own duty and its own boundary; when a level cannot be made complete, **open the level above — never pile it up locally** (decided 2026-10-12, converging the RCA scenario's batch runs). At runtime the three levels **recall in parallel** (§1); this section is about the **development time** — how the model extends when it hits a ceiling.

| Level | Primary duty | Not its job |
|---|---|---|
| L1 | **Keep source-finding correct** — what objects exist, where they land, how to fetch them; the reading points at the right source | No question-level judgment; absorbing extra domain consensus in a description is only a **bonus** |
| L2 | **Increment by entry** — schema-level readings, term conventions, growing one entry at a time as needed | Question-level sequencing does not pack into an entry — "when to read" is not a reading matter |
| L3 | **Settling inter-question conflicts** — deciding when the same reading yields contradictory conclusions under different questions (playbooks / exceptions / closing discipline) | Never inside an answer, never per question: sections are split by the question-wording family; wordings that have not exposed a cost get no section |

**Each level's ceiling** (hitting a ceiling = this level structurally cannot carry it; changing level is the only cure):

- **L1's ceiling = structure**: it can express "what exists and how to read it", not "how to walk" — chain-order discipline is not carried by L1's structure.
- **L2's ceiling = schema level**: all readings correct, yet the agent may still use a *closing* reading as a *probe* ahead of turn — order is not something a reading entry can configure.
- **L3's ceiling = the generalization red line**: never reverse-engineer from answers; a residual loss hitting "there is no level above to chase" (no longer a defect of any level) — keep it on observation; do not tune parameters to chase the scorer.

**The landing routine for hard cases** (the operating pattern):

1. **Dissect before touching** — walk the session trace to the first "observation ≠ expectation", and decide which level the failure mechanism lives on; do not guess, do not edit first.
2. **Triage by mechanism** — a defect on this level is fixed on this level (a reading pointing at the wrong source → L1; a missing entry → L2); a missing "how to walk" playbook → L3; read but still not closing → the **host's behavior rules** (the AGENTS layer).
3. **Minimum change** — one entity / one entry at a time; cross-cutting edits that move a whole family of reading templates are evaluated on their own.
4. **Re-run and check against the table** — after editing, re-run the questions that exposed the problem; **passing is not the end**: verify generalization on same-family questions that were not dissected — this prevents "writing the answer into the knowledge layer".
5. **Record and stop** — write the qualitative observation + commit; if it does not converge, stop and report a plan; no unbounded re-running; do not chase the scorer.

> And the converse: **an upper level does not compensate for a lower one** — if L1's reading points at the wrong source, no amount of L3 writing brings it back; climbing the ladder presupposes that the level below has done its best, cleanly. This project's example (the RCA scenario): a carrier resource miswritten = fix in L1; a closing reading used as an early probe = fix in L3; the mechanism read but not closed = the behavior layer catches it — three fixes, three levels, no mutual compensation.

> **The duality**: at runtime, precedence arbitrates (§7: `disputes > sop > consensus > literal`) — arbitration after construction; at development time, ceilings drive the ladder — extension during construction. One faces questions, the other faces failures.

## 7. How to use them when answering (for the agent)

1. First decide "what this question lacks": **lacks structure** → L1; **lacks a convention/term** → L2; **lacks question-level judgment** → L3.
2. Issue the three levels **in parallel**; cross-check before writing SQL; L1 recall can misfire, and L2/L3 correct it.
3. **Precedence** (on conflict): `disputes > SkillPath(SOP) > KnowledgePath(consensus) > the source field's literal`; an L3 section that strictly matches this question is the highest authority.
4. Conclusions must be traceable (tool returns / SQL results) and cite their source.

> The concrete protocol lives in `DSH-based Agent Service/AGENTS.md` (the execution entry) and the `skills/paradigm` cognition skill; this document does not repeat it.

## 8. Common misreadings

- **Treating L2 as an "evidence store"** — it holds conventions and terminology, not detail data; "evidence" is a dataset field name, not a paradigm term.
- **Treating L1 as "descriptions written loosely"** — L1 carries source facts only; any question-coupled phrasing should not stay in L1.
- **Treating L3 as an evaluation patch** — it is the formal carrier of business assets; defect arbitration is only its by-product in the NL2SQL shape.
- **Assuming all three levels must be filled** — layer weight seesaws with the workload (§5).

## Related

- Modeling rules: [03-design.md](03-design.md) | scenario packages: [04-application.md](04-application.md)
- Evaluation design (the exam paper follows the scenario, the exam system follows dsh): [eval.md](eval.md)
