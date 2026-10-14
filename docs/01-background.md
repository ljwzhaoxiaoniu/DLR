# Background and thesis: the full case for a semantic layer (from diagnosis to prescription)

> **Position**: ① of the four narrative docs — today's problems (data / knowledge / API) + the analysis, leading to the thesis: **semantic modeling grounded in structured data sources**.
> Where the thesis is implemented: **② Concepts → [02-concept.md](02-concept.md)** | **③ Design → [03-design.md](03-design.md)** | **④ Application → [04-application.md](04-application.md)**.
> This document is where the thinking starts; it is **not meant to be exhaustive** — the other three fill in the rest.

## Part 1: Diagnosis — text data has no stable schema

### 1.1 Starting from TBox/ABox: in the structured world, the layering is enforced

Description logic makes a basic distinction: **TBox** (the terminological level — what the classes are, how concepts relate) and **ABox** (the assertional level — how some concrete individual stands). This distinction works stably in formal systems not because the concepts are cleverly designed, but because of a premise that is often skipped — **membership is decided by syntax**: whether an expression is an axiom or an assertion is frozen the moment it is written, and the reasoner dispatches its rules by that membership.

Relational databases harden the same mechanism: DDL is always the terminological level, rows in tables are always the assertional level, and the DBMS **physically enforces the boundary** at write time (schema on write). Therefore:

> **In structured data, TBox/ABox membership is an intrinsic property of the data: fixed for life at the moment of writing, enforced by the machine.**

### 1.2 Text has no such intrinsic property

Watch one sentence's fate across scenarios:

> **"Heavy overload above 105%: file for capacity expansion first, consider load shedding second."**

- **Scenario 1**: the sentence sits in the January maintenance log of transformer No. 77 on some line. Here it is **an assertion** — a record about one concrete device and one concrete action; once that event is closed, its mission is done.
- **Scenario 2**: the dispatch center files the same sentence into its handling-rule library, tagged "standard action for heavy-overload scenarios". Same sentence; now it is **a rule** — it no longer belongs to that transformer, but governs every heavy-overload scenario in the domain.
- **Scenario 3**: a new transformer generation raises the threshold to 110%. The sentence drops back down — it becomes "old standard 105, **new equipment exempt**" — again an assertion about concrete individuals.

One string, three appearances, two layer-changes. And nothing in the text itself tells you which layer it stands on in which scenario — **its layer is not in the words; it is in what the reader uses them as**. In formal terms:

> **Text is schema-on-read: every read is typed on the fly by its use case. Structured data is schema-on-write: fixed for life at the moment of writing. This is the most fundamental point of contact — and the dividing line — between text data and structured data.**

An A320 maintenance manual behaves the same way: under the routing rule "when doing maintenance, consult the manual" it is **an individual**; when someone asks about "the general principles of flap inspection", passages of the manual get cited as **domain-level practice** — it legitimately hops back and forth between TBox and ABox.

### 1.3 This is where the real difficulty of semantic modeling sits

The layering question **has no answer inside the text; the answer lives only on the usage side** — how often it is cited, how broad its coverage is, how fast it changes, who maintains it. So the difficulty of semantic modeling has never been a capability problem ("can we formalize the text?"), but a **typing problem** ("which layer does each piece of knowledge belong on?") — a question with no content-side answer, only a usage-side one.

### 1.4 Two symmetric failures

The hopping cannot be eliminated — it is a real need of the scenarios. And the two ways of handling it each die once:

- **The freeze camp (W3C ontology engineering)**: cast every piece of knowledge as an axiom or an individual in stone, never changing layers. The moment it is cast, it is wrong; the error only surfaces in other scenarios. Two more causes of death on top: OWL notation is unreadable to business staff (so nobody takes over maintenance), and it sits at the edge of LLM training distributions (the machine-worst region) — **a dead end for both audiences at once**. Forty years; not one run has worked.
- **The laissez-faire camp (bare RAG)**: no layering; all text blocks retrieved as equals. Every recall re-types on the fly without the retriever knowing — a full manual and a one-line consensus rule cram into the context on equal footing: layers muddled, norms colliding, tokens exploding.

One casts the flow in stone; the other lets the flow run wild. Neither is a solution.

### 1.5 Historical evidence: structure has won every head-on battle

- **The NoSQL rebellion**: key-value stores hand-code foreign keys in the application layer; document stores invent `$lookup`; graph databases make foreign keys first-class citizens; Hadoop's long detour ends at Hive — rebuilding schema and SQL on semi-structured files. No schema, no queries; no queries, no value. Every rebellion that tried to "escape structure" ended by rebuilding structure one level up.
- **Codd's subtraction vs the W3C's addition**: both systems call themselves formal logic. Codd asked "what is the *minimum* set of logical operations business needs to run?" — the answer is a small handful of operators: decidable, optimizable, hardwirable. The W3C asked "how much logic does it take to express the world at most?" — the answer is a bottomless pit: undecidable, undeliverable. **Structured logic is the only formal logic titrated to an industrially usable dose.**
- **Forty years of modeling practice is prepaid judgment**: ER diagrams, dimensional models, data standards, naming conventions — each is semantic sediment someone else paid the tuition for. Field names crystallize business nomenclature; constraints are business rules made executable; primary/foreign keys materialize the relational model. **Schema is prepaid judgment; text is judgment pending.** This is the strict meaning of "structured information has the highest density" — density = verified judgment per byte, not bits per byte.

## Part 2: Prescription — take the data architecture as the frame

### 2.1 Why the frame of reference can only be the data architecture

The hopping is *usage-relative* — and relative needs a frame of reference. The frame must satisfy three conditions: **long-term stable, uniquely identified, machine-addressable**. Line up the candidates:

- Industry ontologies / knowledge graphs: the W3C spent forty years proving they cannot be built or maintained — out;
- A newly built enterprise ontology: the same thing under a new name — out;
- Bare-LLM implicit modeling: void the moment the model generation changes, unauditable — out;
- **The data architecture (databases, tables, primary/foreign keys, entities, master data)**: the only candidate that **already exists, has run stably for decades, carries unique identifiers, and is machine-addressable**.

It does not need to be "built" — only "claimed". Not because it is perfect, but because it is the only thing already there — **its tuition was paid forty years ago**. Highest information density, slowest change (an annual rhythm — exactly right for a reference frame), and friendly to both audiences, business staff and LLMs (they share a mother tongue).

### 2.2 Two disciplines for "taking it as the frame"

**Discipline one: the frame is the starting point, not scripture.** Legacy modeling is a product of its era's economic constraints, and it contains historical distortions — denormalized splits made for query performance, pseudo-relations made for report convenience, "relationships absorbed under duress that do not exist in the business". The semantic layer does not touch the schema on its own, but it holds a **correction right** over the schema's description: the table stays the table, but the semantic layer may write "this table is *named* X but *is* Y — a historical accident, read it as Z". **A translator does not rewrite the original, but a translator is entitled to flag typos in it.**

**Discipline two: the frame must not colonize the flesh, and the flesh must not drown the frame.** Instance text (manuals, parameter tables, drawings) is in the hundreds of millions, multimodal, and keeps growing; the semantic skeleton is in the thousands and stable. Let the former into the latter and the semantic layer becomes physically unmaintainable — one re-modeling per new equipment model, replaying the classic death of knowledge engineering. So text is split into two grades with completely different treatment (see below).

## Part 3: Mission — semanticizing the ICT assets that already exist

### 3.1 The mission, stated precisely

> **The semantic layer's mission: semanticize existing ICT assets (data, knowledge, API) — from *ready to machine* to *ready to human*.**

The word "existing" rules three things out: **it rules out invention** (build no ontologies from thin air — translate what is there); **it rules out completion** (completeness is not the goal — with the completeness pressure lifted, the project goes from bottomless pit to bounded engineering); **it rules out predicting the future** (no modeling for data that does not yet exist). The assets stay as they are, and beside them grows one double-readable layer of explanation — **semanticization is not re-modeling; it is annotation, anchoring, translation. The assets do not change; only their description is added.**

### 3.2 Three asset classes, three debts

**1. Data (including schema) — owes "what this data means".** `CUST_NO`, `STATUS_CD` are structurally precise and semantically in arrears — not because the designers did not care about humans, but because back then machines read a million times a second and humans ten times a year; paying the naming tax for the ten reads did not pencil out. **The semantic layer pays down that debt once; it does not re-model.** The move: inherit by default, correct distortions as the exception, and let existing queries keep running their SQL.

**2. Knowledge (text) — owes "which layer it stands on, and whose signature".** Text has no stable schema; hopping is the norm. The moves: anchoring + layer-migration approval + probes keeping the books (see Part 4).

**3. API — owes a human-readable calling contract.** OpenAPI specs are written for code generators; "Can this endpoint be called freely in production? Is it idempotent? What counts as a timeout? If a call goes wrong, whose business is it?" — none of these calling contracts live in any spec; they live in senior engineers' heads. A bare LLM facing bare APIs will write calls without knowing which are safe to touch, which are dangerous, which should hit a cache first — the same disease as the data side's "can write SQL but does not know which table to query": **the structure is there; the semantics are in arrears.**

The shared root of all three, in one sentence: **digital assets are all ready to machine, and the intelligence era demands ready to human — business staff and LLMs. Semanticization is paying off that forty-year debt.**

### 3.3 Why double-audience friendliness holds

All of an LLM's ability comes from its pretraining distribution — **its capability gradient *is* the human-text frequency gradient**. What humans find hard (high-barrier notations, invented concepts) is necessarily low-frequency in human corpora; low-frequency puts the model at the distribution's edge, where its output is unstable. So the three form one chain: **hard for people = low-frequency in corpora = the LLM's weak region.** Human reading difficulty is not an experience problem; it is a leading indicator of model performance — **let a business person read for ten minutes; their frown is the model's error message**. A zero-cost forecast, an early rework.

And the two audiences share one mother tongue, so there is no trade-off of "optimize for humans or for machines" — this is where the LLM era differs fundamentally from the W3C era: back then "human-readable" and "machine-executable" were two grammars and you could only pick one; now a single natural-language model serves both ends at once. **This is a free lunch unique to the LLM era — and the reason the W3C's verdict came out double-loss (humans could not read it, machines performed poorly on it).**

## Part 4: Institution — governed liquidity

### 4.1 Two grades of text, completely different treatment

| | **Class-level text (inside the semantic system)** | **Instance-level text (outside it)** |
|---|---|---|
| Typical content | Norm definitions, decision thresholds, scenario routing policies | Full manuals, parameter tables, drawings, multimodal material |
| Participates in modeling? | **Yes** — attached to entity nodes | **No** — stays in each business system's retrieval store |
| Magnitude | Hundreds to thousands of entries | Millions to hundreds of millions, ever growing |
| Maintained by | Business experts, on the domain's rhythm | Each business system, on the model/individual's rhythm |
| Consumed when | **In place at modeling time** — obtained as soon as the entity is located | **Pulled at runtime** — triggered after drilling through to the entity |

Class-level text is the **routing entry** ("for scenario X, consult this *kind* of material"); instance text is the **destination** the route points at. The semantic layer governs "which kind"; the retrieval system governs "which copy"; the interface between them is a thin routing pointer, not a copy of the content.

### 4.2 Runtime: detail RAG is driven, not driving

```
question → locate the entity (data architecture) → obtain the route (which kind of material for this scenario) → the agent takes the route to the business system, pulls the detail → execute
```

Detail RAG is not an input to semantic modeling — full manuals do not enter the semantic network at modeling time; nor is the semantic layer required to understand them in advance — it only needs to know "there exists a *kind* of maintenance manual, and maintenance scenarios find it". The direct payoff of **separating routing from content** is decoupling: a business system adds a new equipment model today and the semantic layer changes zero lines.

The reverse discipline holds too: **the semantic layer must never be taken hostage by instance text.** Crushing magnitudes, mismatched rhythms (model-monthly vs domain-yearly), mismatched owners — the classic way W3C-family projects die from the other side: trying to build every model, every machine, every part as an instance node, until the graph grows ever larger and expires ever faster.

### 4.3 The layer-migration institution: hopping becomes immigration

Text stays free (the possibility of hopping is preserved); **the attachment relation carries the fixation**: every piece of text registers one attachment — "which entity, which scenario class, this knowledge belongs to". The commitment is not in the text; it is in the attachment. Attachments are typed, addressable, auditable.

- **Promotion**: a per-question hint that gets reused again and again, uncorrected → probes generate a promotion candidate (assertion → consensus) → a business expert signs; the attachment changes from "pull on use" to "fixed to the entity";
- **Demotion**: a consensus gets overturned by a new individual (the old 105 threshold meets a new 110 model) → the disagreement surfaces → the attachment becomes an exception entry;
- **Probes keep the books**: layer changes cannot rely on human memory. The anchor is on the schema side; the ledger is kept by probes; **humans only sign.**

Hopping turns from ungoverned drift into logged, approved, cadenced **institutionalized layer migration** — an immigration system that lets text move legitimately between the terminological and assertional levels, with a signature at every crossing.

## Part 5: Acceptance and endgame

### 5.1 The dual-read test (the only acceptance standard)

> **Every semantic entry must pass dual read: a non-technical business person reads it once without frowning; a bare LLM reads it once and can execute it. Both pass, it enters the library; either fails, it is rework — because a human's frown is the model's error message.**

This replaces the old W3C-era standard ("decidable by a reasoner"). The execution channel (schema + SQL) stays untranslated; the explanation channel (natural-language semantic layer) does the translating — the semantic layer is an interface to an interface, and nothing counts until it lands back in the execution channel. Hold this boundary and the structure camp never degenerates into the prose camp.

### 5.2 The semantic layer is never finished

Since layering is usage-relative, any static semantic model is only a snapshot of current usage — the scenarios evolve and the snapshot expires. Knowledge is therefore not inventory but continuous translation: **translation is not a virtue of the semantic layer; it is the mode of existence that usage-relativity imposes on it.** It is not a building; it is an institution.

### 5.3 The immediate priority, and the final sentence

Immediate priority: **first find a stable modeling ground, so semanticization has somewhere to land** — the solution invents nothing new: it claims the data architecture, and starts annotating the first layer of plain language from the ten most core tables. On investment priority, semantic assets rank above model fine-tuning: agents change generation in a year, but semantic assets settle model-independently.

> **Text has no stable schema, and its layer is assigned in use; so take the enterprise's only stable structured skeleton as the reference frame; the skeleton itself is in arrears of plain language, so the semantic layer's mission is: semanticize existing ICT assets — data, knowledge, API — from ready to machine to ready to human. Invent nothing, complete nothing, rebuild nothing; first the frame, then the translation — lift the main cord and every mesh opens.**

History's one-liner: **the semantic layer is to the intelligence era what ERP was to the process era and the data warehouse to the analytics era — not a technology, but a systematic make-up course for existing assets, repaying the debt that forty years of "humans accommodating machines" left behind.**

---
**The argument's skeleton (five steps)** — diagnosis (text has no stable schema) → frame of reference (the data architecture as the frame) → mission (semanticize existing ICT assets) → institution (class-level / instance-level + migration) → acceptance (the dual-read test) — each step follows from the one before.

**Continues in**: this document is only background and thesis (①); its implementation is **② Concepts [02-concept.md](02-concept.md) · ③ Design [03-design.md](03-design.md) · ④ Application [04-application.md](04-application.md)**.
