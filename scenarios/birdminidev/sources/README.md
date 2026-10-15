# sources/ — where the three levels come from, how they are organized, reconciliation of landing points

English | [中文](README.zh.md)

> This directory holds the scenario's knowledge sources: `configs/` (L1 dlr modeling), `consensus/` (L2 domain consensus), `sop.md` (L3, question-level).
> This document explains **where their semantics come from, how they are organized, and how we check that nothing was lost**. Settled caliber (2026-09-29, project owner):

**LE = PE's effective aggregation ｜ PE = the physical table's view projection ｜ every description comes from the dataset's descriptions + absorbed evidence**

## 1. Semantic sources (dataset side — three places)

| Source | Content | Destination |
|---|---|---|
| SQLite schema (= table.json: the table/column inventory) | tables, columns, types | the PE view's column list (**full-column projection, never trimmed by frequency**) |
| `database_description/<Table>.csv` | `column_description` / `data_format` / `value_description` | L1 column descriptions (**verbatim**; a public column may get business-toned wording built from the same text) |
| `evidence` in `mini_dev_sqlite.json` (per question) | question wording → data-semantics mappings, value domains, formats, formulas, question-level conventions | triaged item by item: data-source-level facts → **L1**; domain conventions above the source level → **L2**; question-level conventions/traps → **L3**; zero-information repeats (an entity name ↔ its same-named column) → **not layered** (recorded as "zero information") |

## 2. Organization rules (no semantics added — only the organization changes)

1. **A PE view = that physical table's column projection** (the skeleton stays complete; `get_pe_mapping` returns it as such). Trimming happens only for "columns definitively not modeled" (no description, used by no question, pure generated noise) — and that call needs a recorded reason.
2. **public is an organizational slot, not content**: promote only **core measures / high-frequency filters (WHERE·GROUP BY·JOIN) / relation keys** (a bridge key must be on the visible face, or PAS/JOIN breaks). Everything else stays private — still in the view and drillable, just not on the LE's public face. **Never trim the view mechanically by usage frequency.**
3. **LE = PE's effective aggregation**: the LE description states business semantics (key field names + business meaning) and aggregates its PEs' public faces; the LE invents no semantics beyond its PEs.
4. **Description discipline**: L1 descriptions are taken verbatim from the CSV or from evidence;
   - do not write "my interpretation" of units/ranges (if the CSV says only "the player's weight", do not write "in pounds (117-243)");
   - the minimal disambiguating wording (e.g. same-named columns with different meanings) is the exception, and must be directly supported by the data or the dataset's text.
5. **L2 = evidence's residual**: only conventions above the source level (cross-table conversions, encoding conventions, business readings of value domains); entry text likewise taken from evidence/CSV verbatim, never invented.
6. **L3 = question-level conventions**, admitted in three tiers (① dataset defect ② wrong without the section ③ >15W without the section); delivered by retrieval.

## 3. Landing-point reconciliation (football pilot: 51 evidence items → 7 L2 entries)

| evidence semantics | Landing point |
|---|---|
| rating-column semantics + per-date record grain | each rating column's L1 description (0-100 by FIFA) + L2#1 |
| tactical ratings + the Class vocabulary and bins | each column's L1 description (CSV value_description verbatim) + L2#2 |
| preferred foot right/left | L1 `preferred_foot` description (CSV verbatim) + L2#3 |
| the three work-rate levels (FIFA wording) | the two columns' L1 descriptions (CSV value_description verbatim) + L2#4 |
| birthday reading / age at present | L1 `birthday` description (CSV verbatim) + L2#5 |
| score / win-loss / draw | the two goal columns' L1 descriptions (CSV verbatim) + L2#6 |
| season labels / date format | L1 `season`/`date` descriptions (CSV + evidence) + L2#7 |
| league / team naming | L1 `LeagueName`/`team_long_name`/`team_short_name` descriptions (CSV verbatim) |
| question-level conventions (thresholds, ties, named entities, …) | L3 sections (questions meeting a tier); the rest is the question itself, not layered |
| zero-information repeats (`X means player_name = 'X'` and the like) | not layered (recorded) |

**Invariant**: the table above covers, item by item, all 51 evidence items' semantics; every item is either in L1, in L2, in L3, or recorded as "zero information". After changing the three levels, re-check against this table.

## 4. Checking methods (re-runnable)

```bash
cd "TSM Core Service"
node bin/tsm.mjs coverage      # coverage reconciliation: missing L1 columns / description mismatches / unexpressed FKs / evidence↔L2
npx tsx src/verify/parity_dlr.ts <db>   # against the historical Python line's vector manifest (historical gate; differences are by design after model evolution)
```

> Scripts: `tmp_scripts/audit_le_pe.mjs` (structure inventory), `tmp_scripts/audit_col_roles.mjs` (column roles: JOIN/filter/group/measure), `tmp_scripts/dump_le.mjs` (LE-view expansion), `tmp_scripts/set_public.mjs` (promote columns to public, idempotent).

## 5. Per-database L1/L2 status (reviewed 2026-10-15; all complete)

**General rules**: view = the table's column projection (all columns; only "registered / derived / duplicate / dataset-noted-useless" columns stay out, each with a recorded reason); descriptions = CSV (`column_description`+`value_description`) or evidence verbatim; public = core measures / high-frequency filters / relation keys; L2 = absorbed evidence (domain level) — question-level conventions belong to L3.

| Database | L1 (view / descriptions / relations) | L2 |
|---|---|---|
| european_football_2 | 199 columns, full projection ✓ ｜ descriptions ✓ (6 are the CSV's own broken encodings) ｜ relations: the 22 line-up slot columns are multi-slot → **expressed by the row-level PE** (`R = unwind` → Appearance LE + PAS Appearance→Player; see the scenario README §3) | **7** (51→7) |
| codebase_community | ✓ (6 FKs added as visible join keys) | **7** (49→7) |
| card_games | ✓ | **21** (aggregated form from the start) |
| debit_card_specializing | ✓ | **19** |
| california_schools | view 76/89 (13 columns registered/derived/duplicate, each with a reason: NCES ids, abbreviations, three derived Percent columns, CALPADS status, IRC (marked Not useful), County/School Code, …) ✓ ｜ relations ✓ | **6** (30→6) |
| financial | ✓ (also: loan.status's A/B/C/D semantics corrected to the CSV; frequency encodings added) | **5** (32→5) |
| formula_1 | ✓ (4 FKs added) | **6** (66→6) |
| student_club | ✓ (2 FKs added; 9 Chinese descriptions on CSV-blank columns → short English) | **6** (48→6) |
| superhero | ✓ (9 FKs added; LE descriptions → English) | **4** (52→4) |
| thrombosis_prediction | ✓ | **5** (50→5) |
| toxicology | ✓ | **5** (40→5) |

> Global: consensus vectors **458 → 91 rows** (91 across all databases); L1 vectors entities **946**; graph LE 50 / PE 74 / LA 277 / PA 784 (**1,185 nodes**) + **37 PAS relations**.
> Also a global cleanup: Chinese descriptions across all databases → dataset verbatim or short English (47 + 10 cases).
