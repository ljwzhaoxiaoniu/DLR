# Evaluation: content and capability, separated

> Operations. **2.0's evaluation is nothing like 1.5's four-stage pipeline**: this document describes the 2.0 design only; the old caliber is archived in `eval-line/`.
> 中文版：[eval.zh.md](eval.zh.md)

## 1. In one sentence

**The exam paper follows the scenario; the exam system follows dsh.**

| | Follows | Form | Nature |
|---|---|---|---|
| **Exam paper** (question + expected + caliber source) | **scenario** | `scenarios/<name>/eval/questions.jsonl` | **Content asset**: one per scenario, versioned with the scenario package ｜ ✅ `birdminidev` has one (500 questions; generator `eval/build.mjs` — **answer keys take the L3 clause for 74 questions and gold for the other 426**) |
| **Exam system** (run + score + report) | **dsh** | standalone bundle (working name `dsh-tsm-eval`) | **Host capability**: one system serves all scenarios, **independently separable** |

## 2. Why split this way

What evaluation really targets is the joint object "**host composition × scenario content**" — so the exam system naturally belongs on the host side, and the raw material is already there:

- the **`dsh --json` event stream** (per-step status, tool calls, final — produced by just running a question);
- **session logs** (`.dsh-home/sessions/**.jsonl.zstd`) — full forensics: tool traces, full messages, `turn/end`.

Much cleaner than 1.5's "adapters + four stages". Three extra benefits:

1. **Multi-scenario**: one system × N papers (scenarios are peer-level by design, exactly for this);
2. **Process is evaluable**: 1.5 can only judge the final answer; dsh natively exposes the **tool-call chain and evidence chain** (the same direction as Cloud-OpsBench's ECR "evidence-chain closure", see [roadmap.md](roadmap.md) §5);
3. **Enterprise demo**: change one L3 clause → rerun the same paper → the behavior change is **reproducible** — a CI for semantic assets.

**The cost (honestly)**: pinned to dsh (an alpha that drifts); you can only evaluate where dsh runs — but the product line *is* dsh, so that holds.

## 3. Paper format (convention)

`scenarios/<name>/eval/questions.jsonl`, one question per line:

```json
{"question": "...", "expected": "0.0657", "source": "L3 sop#EUR-ratio"}
```

- `expected`: prefer an exact value (program-checkable); give a judging note when tolerance is needed;
- `source`: where the caliber comes from (L1 description / L2 kid / L3 clause) — so a mistake can be **attributed to a layer**.

## 4. Report (convention)

- **Result**: correctness (per scenario × per profile);
- **Process**: steps, tokens, tool-call sequence, whether the evidence chain closes;
- Both the `--json` event stream and the session-log path are recorded — **replayable forensics**.

## 5. Relationship to 1.5

| | 1.5 (`dlr-eval-v1.5`) | 2.0 (this document) |
|---|---|---|
| Host | opencode + bridge | dsh, native |
| Flow | four stages (run → judge → parse → archive) | run + score + report (one bundle) |
| Judging | two-tier + LLM judge + disputes | rules first + LLM judge (1.5's judging policy is reusable) |
| Archiving | `post_process` directory layout | reports + session logs (native forensics) |

**2.0 does not re-implement the four stages**; historical calibers and baselines live in `eval-line/`.

## 6. Batch runs and judging (current practice)

> The migration-period chain: **question-level validation driven by scenario content** — what is being validated is **L3** (L1/L2 are given inputs; the only differences in a run should come from L3). The formal exam system is §7.

**Batch run** (`DSH-based Agent Service/scripts/run_batch.sh`):

```bash
bash "DSH-based Agent Service/scripts/run_batch.sh" --qids 685,687,694 --jobs 3
#   artifacts → scenarios/<scenario>/results/<stamp>_qids_.../ (per-question ndjson under raw/)
cd "TSM Core Service" && node bin/tsm.mjs grade --run "<that dir>"   # → questions.csv + summary.md
```

(With an installed scenario package, runs and reports land under `TSM_OUT_DIR` — a user data dir by default — never inside the scenario package itself.)

**Three tiers of judging** (`src/dev/judge.ts` · `src/dev/results.ts`):

| Tier | What | Key caliber |
|---|---|---|
| ① Compare with gold | expected value (gold SQL executed on the dataset SQLite; >2 s queries go through a disk cache) ↔ the agent's answer | Numeric tolerance tiers (1e-9…1e-3); **numeric and text both read only the `Final Answer:` region** — superseded alternative readings in the body do not count (the q716 family lesson) |
| ② Result-set comparison (**rescues false negatives only**) | when gold judged non-PASS, compare the agent's candidate SQL row set with gold's (as-is / LIMIT-stripped / common-column projection) | A safety net for list questions; credits the **generating logic**, not the wording |
| ③ SOP ruling (the verdict) | rule by the L3 clause's `Expected` / dataset-defect tag | Answer matches the clause but differs from gold → 🔁 **reversal**; clause caliber equals gold and it matches → ✅ correct (**not** a reversal); neither → ❌ |

**Discipline (migration period)**:

- One batch = **5 questions**; stop and report between batches; **at most two passes per question** (the second pass is for post-clause re-runs).
- **Always re-run a question after writing its clause** — if the clause postdates the run, that old row may be propped up by a false positive (q1136's clause was 11 minutes late, q1472's 4.5 hours; only a re-judge exposed it).
- `sources/sop.md` change → `tsm build sop` (rebuild the index) → re-run to compare; **experimental runs never go into `results/`** (the ledger takes the latest round per question).
- After a judging-policy change, **re-judge everything** (run `tsm grade` per directory; gold is cached): the ledger may only have one ruler.

## 7. Relationship to the layer-migration regime (probes)

The exam system's by-product = **probes**: who gets cited repeatedly, who gets corrected repeatedly, which questions keep losing points — these runtime observations generate candidates for **layer migration** (promotion / demotion / new clauses), and humans only sign off (see [02-concept.md](02-concept.md) §2 appendix).

## 8. Roadmap

1. Scenario packages land `eval/questions.jsonl` first (content, extendable anytime) — ✅ done for `birdminidev`;
2. The exam system becomes a dsh bundle (`--json` + session logs → judging → report);
3. Reports get baselined: every round of semantic-asset change reruns the same paper, and behavior is diffed.

## Related

- Scenario packages and the exam directory: [04-application.md](04-application.md) §4
- Running (questions and session logs): [run.md](run.md) ｜ probes and layer migration: [02-concept.md](02-concept.md)
- The old four-stage caliber: [`eval-line/`](eval-line/)
