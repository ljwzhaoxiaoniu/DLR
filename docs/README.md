# docs index

> **One rule: every document has exactly one reader and one shelf life.** Three tiers: **current** (branch 2.0) · **evaluation-line only** (`dlr-eval-v1.5` / a separate checkout) · **history** (`archive/`).
> This index *is* the document structure; click through to each doc. 中文版：[README.zh.md](README.zh.md)

## Current (branch 2.0)

| Document | For whom | Status |
|---|---|---|
| [01-background.md](01-background.md) | ① **Background and thesis** — the problems (data / knowledge / API) + analysis → thesis: semantic modeling grounded in structured data sources | ✅ |
| [02-concept.md](02-concept.md) | ② **Concepts** (TSM) — three levels / admission criteria = governance line / layered ownership / layer-migration | ✅ |
| [03-design.md](03-design.md) | ③ **Design** (DLR: the original foundation) — LE/PE/ARC/PAS · graph & vector consumption · modeling rules + self-check list | ✅ |
| [04-application.md](04-application.md) | ④ **Application (the solution)** — scenario packages: three-level writing rules · `fixtures/` (regression snapshots) · the `eval/` exam-paper convention · dual-read review · scenario-switch checklist | ✅ (current scenario: `birdminidev`) |
| [run.md](run.md) | Operations — runbook: start the backend / run questions / web / **status surface** / tool-dependency matrix / troubleshooting | ✅ |
| [eval.md](eval.md) | Operations — evaluation = **content (exam paper follows the scenario)** + **capability (the exam system follows dsh)**; paper format / report / probes | ✅ |
| [roadmap.md](roadmap.md) | Operations — **extension boundary (DSL_SQL / OData)** · portability (three steps, all landed) · to explore | ✅ |

> **Reading order (the four narrative docs)**: [01-background.md](01-background.md) states the **background and thesis** (problems: data / knowledge / API) → [02-concept.md](02-concept.md) gives the **concepts** (TSM) → [03-design.md](03-design.md) gives the **design** (DLR, the original foundation) → [04-application.md](04-application.md) gives the **application (solution)** (scenario packages). **The whole TSM + DLR design is the answer to the problems listed in 01.**
> The in-tree reference docs ([TSM Core Service](<../TSM Core Service/README.md>), [DSH-based Agent Service](<../DSH-based Agent Service/README.md>)) stay where they are and are not merged into this directory.

## Evaluation-line only (`dlr-eval-v1.5`) — archived under `docs/eval-line/`

> On branch 2.0 these are **kept for reference and no longer maintained**; each file carries a header note.

| Document | Content |
|---|---|
| [eval-line/runbook.md](eval-line/runbook.md) | Four-stage batch runs / archiving / troubleshooting |
| [eval-line/evaluation.md](eval-line/evaluation.md) | Evaluation-pipeline design (why it was built this way) |
| [eval-line/results_v4.md](eval-line/results_v4.md) | v4 baseline progress and results |
| [eval-line/agent.md](eval-line/agent.md) | The OpenCode agent layer (OpenCode + MCP + anti-cheat) |
| [eval-line/dataset.md](eval-line/dataset.md) | mini_dev dataset notes (still useful when modeling a new scenario) |
| [eval-line/modeling.md](eval-line/modeling.md) | Three-paradigm modeling (alignment caliber); the DLR part was absorbed into `03-design.md` |
| [eval-line/semantic-layer-build.md](eval-line/semantic-layer-build.md) | The old Python builder: yaml/ttl → full graph & vector mapping (2.0 build: see TSM Core Service/README) |
| [eval-line/rag-evidence.md](eval-line/rag-evidence.md) | L2's two organizational philosophies (original vs control group); the L2 writing rules moved into `04-application.md` |
| [eval-line/modeling-guide-dlr.md](eval-line/modeling-guide-dlr.md) | Old DLR guide — **superseded by [03-design.md](03-design.md)** |
| [eval-line/tsm-design.md](eval-line/tsm-design.md) | Old TSM design — **superseded by [02-concept.md](02-concept.md)** |

## History

`archive/` — v2/v3 archives, old docs and share pages. **Unrelated to the current logic; do not change the present based on it.**
