# Design: DLR — the original foundation, in detail

> **Position**: ③ of the four narrative docs. ① [Background and thesis](01-background.md) argues for "semantic modeling grounded in structured data sources"; ② [Concepts](02-concept.md) gives the TSM three-level frame; **this document is DLR — the detailed design of the original foundation at the data-source level (L1)**: the LE / PE two layers plus the two mechanisms, ARCS and PAS.
> **Audience**: whoever (or whatever agent) takes over DLR modeling. After reading it you should be able to write a compliant DLR yaml for a new database on your own — and know where mistakes cluster.
> 中文版：[03-design.zh.md](03-design.zh.md) ｜ Index: [README.md](README.md)

## 0. One sentence, two design points

> **DLR = project physical tables into business views (PE), organize the views into business entities (LE), and express semantic routing between LEs with PAS.**

The physical world's fragmentation (wide tables split into sub-objects, objects stitched from several tables, junction tables) is **transparent to the agent** — what it sees is a **business-entity tree**, not a table list.

```
physical table ──(ARCS projection)──▶ PE ──(LE 1:N container)──▶ LE ──(PAS)──▶ another LE
```

Direct answers to two points from ① Background:

- **Concept decoupled from implementation (LE ↔ PE) → data-maturity independence**: the same LE can be implemented by an Excel sheet, a 3NF system table, a dimensional-modeling platform table, or a real-time wide table. An enterprise **does not need to upgrade its platform first**; an upgrade **touches only the PEs** — LE / L2 / L3 change zero characters.
- **Correction right (boundary narrowed, 2026-09-24)**: the description layer may flag a schema's historical distortions ("this table is *named* X but *is* Y — read it as Z") — it **never touches the schema**, but it **adds no semantic enrichment** (fairness, see [04-application.md](04-application.md) §2): descriptions revert to **the dataset's own material**; the dataset's own defects are **not fixed in L1** but carried by L3 and tagged by type. Correction is limited to the minimum wording **required to remove ambiguity** (e.g., two tables each have a `Date` with different encodings — that must be stated apart).

**DLR itself is a two-stage disambiguation chain**: physical tables are ambiguous (fragmented / wide / same-named columns / multi-slot FKs) → PE disambiguates with a **view** (R row space, C column selection, A anchor, S semantics); when the PE is still ambiguous (which business object it belongs to, which public face is addressable) → LE disambiguates with **pointable objects + public faces + PAS**. The continuation above the data-source level (L2 consensus, L3 question-level ruling, SOP's internal layering) is in [02-concept.md](02-concept.md) §6 "layered disambiguation"; this document expands only the first segment (L1).

## 1. The design model: three layers, two mechanisms, one flag

> Finalized 2026-09-12 in agreement with the author. **This is DLR's semantic ontology; every rule derives from here.**

### 1.1 The three layers

| Layer | What it is | Exists in the data? |
|---|---|---|
| **Physical table** | The source as-is (columns / rows / FKs) | ✅ yes |
| **PE** (PhysicalEntity) | A physical table's **view under the current business context**: ARCS scopes rows (R), selects columns (C), fixes the anchor (A), annotates semantics (S) | ❌ a view; not materialized |
| **LE** (LogicalEntity) | A **business entity** (with an independent lifecycle), composed of several PEs | ❌ a logical object; not materialized |

**LEs not being materialized is the key**: an LE has no "instances"; its identity is **constituted dynamically by the anchor key** — all quantitative relations count in **units of the anchor key's values**.

### 1.2 The two mechanisms

| Mechanism | Connects | What it connects | Carries |
|---|---|---|---|
| **ARCS** | PE ↔ **physical table** | the view's **projection definition** | A anchor / **R row space** (row filtering, or multi-slot row expansion — see §1.2.1) / C column selection / S semantic annotation |
| **PAS** | LE ↔ LE | a business association **at the public-attribute level** | P predicate (direction + verb + cardinality) / A addressing coordinate / S semantic annotation |

> ⚠ **The most common misconception**: ARCS connects **PE ↔ physical table** (a projection definition), **not** PE ↔ LE. LE-to-PE is a 1:N **container** relation (the yaml's nesting), not ARCS.

> **The A anchor = the WHERE key at data-fetch time (its pruning role, written down 2026-10-10)**: the model hands over the anchor, and the agent fetches **the few rows carrying that anchor value (a thin slice)** instead of the whole table — the context stays small and attention focused. For `dlr` it is a JOIN/filter key; for `dlr-state` it is an object name (`app=<service>` etc., see §1.7) — every surface comes with its **reading template** alongside the anchor, ready to use without trial and error. The only legitimate "full scan" is the first round (finding the anchor); everything after narrows by anchor.

#### 1.2.1 R is a **row-space definition**, not merely row filtering

A PE is **a view, not materialized** — so the view's row space can be defined in the model without a physical view existing first. `R = unwind` handles **multi-slot FKs** (one table's N columns all pointing at another table — a single PAS coordinate cannot express that):

```yaml
R: { kind: unwind, pattern: '{side}_player_{slot}', side: [home, away], slot: ['1'..'11'],
     value_as: player_id, key: [id, side, slot] }
```

- **Service side**: for an unwind PE, `get_pe_mapping` returns a **freshly generated row-expansion SQL** (validated against the physical columns, expanded into a UNION ALL; a non-empty `missing` means the spec is wrong) — the agent can hand it straight to `execute_sql`;
- **First use case and probe question**: football `Match`'s 22 starting slots → the `Appearance` LE (with the agent's measured trace and cost) — see [scenarios/birdminidev/README.md](../scenarios/birdminidev/README.md) §3 "row-level PE";
- **Boundary**: columns whose semantics the dataset does not state (that table's `X`/`Y` slot variants) are **not modeled** — row-level modeling "narrates existing columns as a relation"; it does not invent semantics.

- `ARCS.A.cardinality` is always written **from the LE's viewpoint**: `1:1` (each anchor value ↔ 1 row here = an identity/attribute face) or `1:N` (↔ N rows here = a detail/event face). **There is no `N:1` form.**
- `ARCS.C`'s **values** are physical columns; its **keys** are `{LE}.{public attribute name}` — the view speaks business; the column names come from the LE's face.

### 1.3 One flag: public

**`public` is not an entity — it is a visibility flag on a PE attribute**: flagged → projected onto the **LE's public face** (enters the LE vector, available to recall) and, at the same time, an addressing target of `PAS.A`; unflagged → still visible when drilling down into the PE (a view column like any other, just not on the LE face). The same business attribute materialized on several PEs → **deduplicated to one entry** at projection time.

> **The PE block = the view's columns** (decided 2026-09-28): a PE's `attributes` list only **the columns this business object semantically ought to have** (the view); `get_pe_mapping` returns exactly those. The physical table's other columns are not promised by the semantic face — when the agent needs them it drills down with `get_full_data_info` and **records the modeling gap in the answer** (a drill-down → feedback → modeling-maintenance loop; no hard blocking).

### 1.4 The three cardinality combinations (row-count reasoning for the agent)

When two PEs join, the resulting row count = the cardinalities multiplied:

| Combination | Semantics |
|---|---|
| `1:1 ⋈ 1:1` | attribute × attribute |
| `1:1 ⋈ 1:N` | entity ⋈ detail — normal |
| **`1:N ⋈ 1:N`** | **M×N**: pairwise pairing inside each anchor value — "aggregate per entity, then compare" must first aggregate each side back to the anchor grain |

### 1.5 Closure: any cross-LE association must be walkable

`PAS` connects two LEs' **public attributes** (not PEs, not physical columns): source PE → (the public attributes it holds) … chained inside the LE … → the PAS coordinate attribute → the target LE's coordinate attribute → (chained) → target PE.

- The coordinate named by `PAS.A` **lands on one of the two sides** (usually the target's, or on a **bridge PE**) — it does **not** have to exist on the source side;
- A **bridge PE** = a PE that participates in both sides' stitching (e.g. `hero_power` holding `hero_id` + `power_id`); it necessarily hangs under some LE;
- The model only declares "the association exists + the starting coordinate"; **the path is the agent's to find** — the model provides **navigation semantics**, not an execution plan.

### 1.6 Modeling obligations (checkable)

1. Every public attribute is **held by at least one PE under its LE** (otherwise it floats unanchored → the chain breaks);
2. `PAS.A` must land on the **name** of a public face on one of the two sides;
3. A **bridge PE's keys on both sides must be on a visible face** (private can still walk, but takes extra steps).

### 1.7 Two application faces: `dlr` and `dlr-state`

The same principles land on two kinds of data sources, forming two **shapes** (declared by `mapping_type` in the yaml; **the two shapes never mix in one file**):

| | **dlr** (databases) | **dlr-state** (state spaces, non-database — e.g. K8s snapshots) |
|---|---|---|
| Source | tables / columns / rows | resource kinds / readable fields / deterministic snapshots |
| Carrier unit | one yaml per database | one yaml per **system/unit** (e.g. one each for boutique / trainticket) |
| A PE's "physical table" | a physical table | the source's **resource surfaces** (deployments / pods / logs / endpoints …) |
| PE attributes | physical columns (C-selected + public) | the surfaces' **readable fields** — written into the surface's description and reading template, **not promoted to attribute nodes** (the state shape brings in no LA/PA — those are "column" vocabulary) |
| The anchor `A` | a logical key (JOIN / filter key) | an **object name** (`app=<service>` / `node_name` / `namespace`) |
| Example LEs | Account / Loan / Player | concrete services / nodes / namespaces — **pointable objects** |
| Internal LE shape | a business entity (usually one main table + attached PEs) | a service may split into **business / carrier / observation** (`<svc>` / `<svc>-deploy` / `<svc>-obs`); nodes and namespaces are first-class objects |

The two shapes share every term and discipline: LE/PE both sides, ARCS/PAS, the A anchor (= the WHERE key at fetch time, §1.2), the schema-level boundary, the naming and description disciplines. Reference applications: `scenarios/birdminidev/` (dlr, 11 databases), `scenarios/cloudopsbench/` (dlr-state, one file per system, two systems).

#### 1.7.1 The as-built dlr-state shape (Cloud-OpsBench, v3)

`scenarios/cloudopsbench/` lands the table above as two files for two systems (boutique / trainticket), **169 LE / 355 PE / 233 PAS** in total (boutique 38/90/37; trainticket 131/265/196):

- **LE = concrete objects**: 53 services + nodes + namespaces. A service splits into three under "pointable ∧ surfaces share an anchor ∧ parent LE non-empty" — business `<svc>`, deployment carrier `<svc>-deploy`, observation set `<svc>-obs`; no abstract kinds.
- **PE = observation surface + reading template**: deployment / pods / service_endpoints / telemetry / logs / code, plus node and namespace surfaces; each surface carries its anchored reading in `S` (e.g. `GetResources(pods, label_selector=app=<service>)`). **The state shape introduces no attribute nodes** — fields live in the surface's reading.
- **A anchor = pruning predicate**: services use the app label `app=<service>`, nodes `node_name`, namespaces `namespace`; a first-round full scan only finds the anchor, and everything after narrows by anchor.
- **PAS = call graph + carrier/signal edges**: call edges are read one by one from the snapshot's `GetServiceDependencies`; **placement (pod → node) and scope (namespace) deliberately get no edge** — they are per-case instance facts. Nodes / namespaces remain first-class objects: reachable by four routes (by name / by slot word / by placement wording / by symptom signposting), with no special tool and no per-deployment descriptions (X×N repetition).
- **Boundary**: instances (pod names / IPs / state values / log bodies) never enter the model; the observable resource-kind closure = 21 kinds (verified across all 754 snapshots, no additions).

Modeling record and the four reachability probes: [scenarios/cloudopsbench/modeling-plan.md](../scenarios/cloudopsbench/modeling-plan.md) §2.5.

## 2. The yaml, field by field

File location: `scenarios/<scenario>/sources/configs/DLR/{db}.yaml` (one per database; within a paradigm, databases merge into the same store).

```yaml
mapping_type: dlr
version: '2.0'
scenario_name: dlr_card_games
description: ...
databases:
  card_games: sqlite:///MINIDEV_sqlite/dev_databases/card_games/card_games.sqlite

logical_entities:
- logical_entity_id: LOGICAL.Card       # no database prefix; must be globally unique
  biz_name: Card
  description: Individual card entity with attributes, printings, and game mechanics
  physical_entities:
  - physical_entity_id: PHYSICAL.Card   # also globally unique
    physical_table_name: cards
    physical_table_id: card_games.cards
    A: {cardinality: '1:1', key: uuid}  # anchor: cardinality (LE viewpoint) + anchor key (an LE attribute name)
    R: null                             # row space: null = row-for-row; unwind = multi-slot expansion (§1.2.1)
    S: Card attributes                  # semantic annotation → lands in the PE's description
    attributes:
    - column: card_games.cards.uuid     # the physical column's full id (db.table.col, unquoted)
      biz_name: CardID                  # business name (enters the index's name slot)
      description: ...                  # text (enters the index's description slot)
      public: true                      # ← passes through to the LE face

pas_relations:
- relation_id: LOGICAL.CardSet_TO_LOGICAL.Card   # endpoints split from "LOGICAL.A_TO_LOGICAL.B"
  relation_name: Contains
  P:
    forward:  {verb: contains,  cardinality: 1:N}
    reverse:  {verb: belongs to, cardinality: '1:1'}
  A: SetID                              # the addressing coordinate (a public-face name on one of the two sides)
  S: 1 set contains N cards
```

### Field traps

| Field | Rule | The pit actually stepped in |
|---|---|---|
| `logical_entity_id` / `physical_entity_id` | **No database prefix, globally unique** (when the name itself is unique); different units can genuinely have **same-named objects** (e.g. two clusters each with `worker-01`) → use **unit qualification** (`LOGICAL.<system>.<name>`), otherwise | Cross-database name collisions get **silently merged** — the 2.0 loader `MERGE`s by id with **no conflict interception** (the Python line had `BuildConflictError`) → only the modeling self-check catches it (§7) |
| `column` | the physical column's **full id**, **unquoted** | Early models wrote `frpm."Academic Year"` → the id stopped being isomorphic with the ER and `data_type` lookups failed. Columns with spaces/parens get quoted when writing SQL, by the writer |
| `A.cardinality` | written from the **LE viewpoint**; only `1:1` / `1:N` | `N:1` is a PE-viewpoint mis-recording (normalized out of the whole library by 2026-10-10; do not write `N:1` in description text either — write "many rows per …") |
| `A.key` | an **LE attribute name** (a public-face name), not a physical column | Writing the physical column → the agent finds no JOIN foothold |
| `P.*.cardinality` | the PAS cardinality — not the same thing as ARCS's cardinality | Mixing them misleads the agent's row-count reasoning |
| `description` (file head, top-level) | write the **business semantics** (what domain this database is, which business objects it has) — **not modeling meta-notes** ("N PEs into M LEs" belongs in the scenario README) | case notes live in `scenarios/<name>/README.md` |
| `description` (LE) | must be **rich** (key field names + business semantics + example names), **in English** | a 3-word description gets drowned by other databases in vector space → the wrong database is routed to |
| `description` (PE attribute) | public columns = **business semantics**; non-public columns = the dataset's original description text | — |

> **The writing discipline (parallel to "never above your level")**: L1 writes **business semantics only** — not question-level conventions (§4), and not **modeling meta-notes** (this document is the spec; "how this database was abstracted" belongs in the scenario README: `scenarios/<name>/README.md`).

## 3. Modeling rules (decide in order)

### 3.0 First principle: an LE must be a **pointable** business object (usually with a lifecycle)

**An LE represents a concrete object that business/ops people can *point at*** — say the name and everyone knows who is meant (an account, a player, a service, a node). **Abstract category words do not make an LE**: "a Service" points at nothing; that is as good as not modeled. The criteria (cumulative):

1. **Pointable** (the name is an object's name, not a category's);
2. Usually an independent lifecycle (create → live → end) and an independent business identity.

| Question | Examples | Verdict |
|---|---|---|
| Business lifecycle? Independent identity? | Loan (approved → settled), Transaction (happens per event), Account (opened → closed) | **→ LE** |
| A pure junction table? No business meaning? | disp (account_id + client_id, no independent life) | **→ PE** |
| A dimension / lookup table? 1:1 attribute lookups? | colour, gender, district | **→ PE** |
| A pointable object in K8s? | the `frontend` service, the `worker-01` node, the `boutique` namespace | **→ LE** (dlr-state) |
| An abstract category word? | "a Service", "some Pod" | **→ not an LE** |

**Counter-example**: `LOGICAL.AccountRelation` (the disp table) is only a junction and should sink into an Account PE. **Correct example**: Loan / Transaction carry physical FKs to Account (N:1) but each has an independent lifecycle, so they stay LEs.

### 3.1 Physical table → PE, or an independent LE?

- **Rule 1: pure association/dimension tables (no business lifecycle) → ARCS; the PE hangs directly under the main LE.** This is DLR's **"fragment tables concentrated"** core advantage — physical fragmentation is transparent to the agent.
- **Rule 2: objects with a business lifecycle → an independent LE + PAS** (the marker: the main table is **referenced** by a junction table).

### 3.2 The rest of the rules, quick-reference

- **Rule 3: `PAS.A` lands on a public-face name of one of the two sides** (not an entity name, not a physical column name, and it does not have to be on the source side).
- **Rule 4: business core measures (amounts / status / dates / quantities) → public**. Leaving them private still answers correctly, but costs 2-3 extra steps — **public/private affects efficiency (steps × tokens), not correctness**.
- **Rule 10: high-frequency WHERE / GROUP BY / JOIN columns → public** (same efficiency rationale as rule 4).
- **Rule 5: when a pure association table sinks into a PE, its join keys must be promoted to the owning LE's public** (otherwise the PAS anchor key is decapitated at the source end).
- **Rule 6: the A_anchor must anchor to a logically meaningful FK** (a bare junction FK does not qualify as the main anchor).
- **Rule 7: an independent business concept = an independent LE** — even when the physical FK hangs under another table; never be limited by physical structure.
- **Rule 8: LE description quality = semantic routing quality** — recall **converges only at the LE face**; the LE description is the **only signal** for routing correctness.
- **Rule 9: same-named, differently-meaning columns must each be disambiguated** (e.g. three `number` columns with three meanings).
- **Rule 11: LE descriptions are written in English**, and example names must be exhaustive (an example name hidden only in a private description = zero hits for that word).

### 3.3 The structure spectrum: more complex is not better

**DLR's core is not "split more LEs and connect them with PAS" — it is encoding JOIN semantics in the simplest structure.**

| Extreme | Structure | Essence | Agent burden |
|---|---|---|---|
| One LE per table + PAS between all | a variant of ER | discover entity by entity → navigate relation by relation | highest |
| All tables pressed into one LE + ARCS | a variant of RDF | see everything at once, select columns directly | lowest |
| **DLR's sweet spot** | **1 LE = a lifecycle-bearing concept + attached PEs sharing the anchor key via ARCS** | — | — |

**The thrombosis case**: 3 tables had been split into 3 LEs + 2 PAS relations (Lab/Exam have no independent lifecycle); re-done as **1 LE (Patient) + 3 PEs sharing the `PatientID` anchor key, 0 PAS relations**, the agent could discover every column inside one LE context (ARCS implicitly encodes `JOIN ON ID`) and tokens dropped sharply. **Lesson**: ARCS's value is **structuralized JOIN semantics**; it shows most clearly when "fragment tables are concentrated".

## 4. Design lessons (battle-tested cases)

| Case | Problem | Fix | Effect |
|---|---|---|---|
| superhero | Old model had 5 LEs (including a fictional `HeroDimension`); PAS anchor keys decapitated at the source end | Fictional LE removed, dimension PEs hung directly under Superhero; `hero_power` split into its own LE | tokens **-35%**, recalls 6 → 1 |
| financial | A pure junction `AccountRelation` occupied an LE; core measures hidden in private | disp sank into a PE; core measures promoted to public | tokens **-40%** |
| student_club | `Expense`'s anchor was `link_to_budget` (no business meaning); Member description was 3 words | Expense promoted to its own LE with a new anchor; PAS added; descriptions enriched | 389K/25 steps → **34K/4 steps** |
| toxicology | `atom.element`, `bond_type` etc. all private; no PAS from Bond→Atom | Four columns promoted to public; PAS added; descriptions in English + field names | tokens **-60%** |
| debit_card | `Consumption`'s public face lacked "the spend amount"; `Amount` collided with "amount spent" | New `Spending` public; `Amount` renamed to "fuel amount (litres)" | tokens **-33%** |
| cloudopsbench (v1 → v3) | Abstract kinds; objects and surfaces could not be told apart | **Concrete-object LEs** (business / carrier / observation) + observation-surface PEs + anchored readings + call-graph PAS | Dual-path parallel recall; coverage 754/754, JRA 752/754 (99.7%) |
| cloudopsbench (edgeless objects) | Placement / scope change per case; a schema edge would write instance facts into the model | **Deliberately no edge**; nodes / namespaces reachable through four routes with existing tools, no dedicated tool, no per-deployment descriptions | All four reachability probes passed; X×N repetition avoided |

(The figures come from historical comparisons; kept here as **evidence that the design rules work**.)

## 5. How DLR is consumed: graph + vectors

> **The graph backend is swappable**: the default target is an **in-process memory graph** (YAML → memory, zero dependencies, zero locks), with **Neo4j as a compatibility example** (enabled by setting `NEO4J_URI`); enterprises build their own connector behind the same read interface. See [roadmap.md](roadmap.md) §1/§4.

### 5.1 Graph (Neo4j-compatible example)

| Node | Properties | Relations |
|---|---|---|
| `LogicalEntity` | id / name / description / db | `HAS_LOGICAL_ATTRIBUTE{ord}` → `LogicalAttribute` |
| `LogicalAttribute` | id / name / description / ord | — |
| `PhysicalEntity` | id / name / description / table_id / db / **arcs_a / arcs_r / arcs_c / arcs_s** | `INHERITS{ord}` → `LogicalEntity`; `HAS_PHYSICAL_ATTRIBUTE{ord}` → `PhysicalAttribute` |
| `PhysicalAttribute` | id / name / description / column_id / data_type / db / ord | — |
| — | — | `PAS_RELATED_TO`: `LogicalEntity → LogicalEntity` (carrying verbs / cardinalities / the association attribute / notes) |

`arcs_c` (the C selection) is **rebuilt** by the builder from the public attributes — it is the "logical attribute → physical column" translation table, and it must be fetched by drilling down (the second hop) before writing SQL.

### 5.2 Vectors (LanceDB) — the text templates

| Row type | Text template | In recall? |
|---|---|---|
| LE | `{biz_name} {description} {public attributes: name + description, one by one}` | ✅ **only LEs enter recall** |
| PE | `{table_name} {S}` | for dedup |
| Attribute | `{biz_name} {description}` | for dedup |
| PAS | `1 {from} {verb} {cardinality} {to}; 1 {to} {verb} {cardinality} {from}; {from} and {to} are related through {A}` | for dedup |

**Recall converges only at the LE face** ("converge first, then truncate") — which fixes two design disciplines: LE descriptions must be rich (rule 8), and example names must be written onto the LE's visible face (rule 11).

### 5.3 The tool surface (7 in the `dlr` shape; 3 in `dlr-state`)

`dlr_semantic_query` (LE recall) → `get_pe_mapping` (the second hop: table name / **view columns** / ARCS / `database_url`) / `get_le_attrs`; `dlr_search_consensus` (L2); `dlr_search_sop` (**L3**: the SOP index retrieved per question — only the one section that restates this question); `execute_sql` (data fetch: **executed in a subprocess with a 20 s hard timeout** — on timeout it aborts and the agent rewrites, so a pathological SQL cannot pin the single-threaded service); `get_full_data_info` (**drill-down**: physical columns outside the view; after using it the answer must record the modeling gap).

## 6. Bringing a new database in (2.0 workflow)

> Goal: wire a new database into DLR, produce a compliant yaml, and pass build validation.

1. **Read the physical layer**: `PRAGMA table_info` / `foreign_key_list` to know the tables, columns, and the real FKs. **Physical truth outranks any ready-made list.**
2. **Draw the LEs**: apply the first principle (§3.0) to every table; sketch "table → belongs to" before touching the yaml.
3. **Fix PEs and ARCS**: pick a logically meaningful FK for `A.key`; PEs sharing an anchor key hang under the same LE (fragment concentration).
4. **Fix view columns and public**: the PE block = **the view's columns** (the ones this business object semantically ought to have; registration/derived/duplicate noise columns stay out) — `get_pe_mapping` returns exactly these; core measures / high-frequency filter columns get `public: true` (onto the LE face).
5. **Write PAS**: only for cross-LE links; `A` lands on one of the two sides; write both directions' verbs and cardinalities.
6. **Build and self-check**:

```bash
cd "TSM Core Service"
npx tsx src/build/buildLance.ts --all         # vector tables (LE/PE/attribute/PAS rows)
npx tsx src/graph/loadNeo4j.ts --all --wipe   # graph (⚠ --wipe = drop and rebuild: stop the MCP server first)
npx tsx src/verify/precheck.ts                # tool surface is up
```

7. **Question-level validation**: run a single question through dsh (`run_one.sh`) and watch whether recall lands on the right LE.

> **The `dlr-state` differences**: one yaml per system (e.g. boutique / trainticket); **no Neo4j graph**; L1 is read by `state_model_query`; build only the three vector indexes (`buildLance` / `buildConsensus` / `buildSop`) and skip `loadNeo4j`. See [cloudopsbench README](../scenarios/cloudopsbench/README.md) §4.

## 7. Self-check list — derived from §3.2's rules, in walk order (every line before submitting)

```
[ ] Does each LE have a business-object lifecycle? (pure junctions sank into PEs)
[ ] Is the FK on the main table (→ ARCS) or referenced by others (→ PAS)?
[ ] Does PAS.A land on a public-face name of one of the two sides?
[ ] Did junction PEs' join keys get promoted to their LE's public?
[ ] Are the business core measures (amount/status/date/quantity) findable on the public face?
[ ] Does every attribute have a description? Are magic-number columns given semantics?
[ ] Are same-named, differently-meaning columns disambiguated?
[ ] Are the high-frequency WHERE / GROUP BY / JOIN columns all public?
[ ] Does each PE block contain view columns only (registration / derived / duplicate noise removed)?
[ ] Among near-neighbour columns (name families: `(K-12)` vs `(Ages 5-17)`, `Charter` vs `CharterNum`…), only the semantically clear one kept?
[ ] Is each PE's A_anchor logically meaningful?
[ ] Is any independent business concept buried under some LE?
[ ] Are LE descriptions rich enough? (≥ key field names + business semantics; 3-5 words is not enough) English? Example names exhaustive?
[ ] Is every column a db.table.col and unquoted?
[ ] Are ids globally unique? (the 2.0 loader has no collision interception; same names merge silently)
```

## 8. Common errors and their consequences (a severity view; rule definitions in §3.2)

| Error | Consequence | Severity |
|---|---|---|
| LE description missing or too short | **semantic routing goes random** — the wrong database is routed to; a correctness problem | 🔴 |
| `PAS.A` written as a physical column / entity name | after PAS is fetched, no JOIN foothold is found; the chain breaks | 🔴 |
| ids collide across databases | silently merged (2.0 has no interception) | 🔴 |
| column ids quoted | ids stop being isomorphic; `data_type` mismatches | 🟠 |
| core measure columns left private | correctness unaffected; 2-3 extra exploration steps | 🟠 |
| over-splitting LEs | the agent burns steps navigating PAS ("a variant of ER") | 🟠 |
| example names only in private descriptions | they never enter the LE vector → zero hits for that word | 🟠 |
| `cardinality` written as `N:1` | violates the LE viewpoint; row-count reasoning goes wrong | 🟡 |

## Related

- Concepts and admission criteria: [02-concept.md](02-concept.md) | application (scenario packages): [04-application.md](04-application.md)
- The build chain and commands: [TSM Core Service/README.md](<../TSM Core Service/README.md>)
