# Batch-run results (the results docs)

English | [中文](README.zh.md)

> This directory archives `cloudopsbench`'s **run results** — structured like `birdminidev/results/`: **traceable raw + round summaries + per-case detail + cross-round statistics**, updated as runs happen.
> Produced by: running questions (`dsh_cob/run_one.sh`; batches run serially, one case at a time — the full 754-case marathon is done, 230 rounds archived) → `eval/grade.sh` (the upstream evaluation.py scores) → `eval/stats.mjs` (rebuilds [STATS.md](STATS.md) + [../DETAIL.md](../DETAIL.md) + `../DETAIL/<family>.md`).

## Structure

```
results/
├── README.md            # ← this doc (how produced, read, updated)
├── STATS.md             # cross-round statistics (rebuilt by stats.mjs): per-round table / coverage / aggregate (dedupe-take-latest)
└── <run_id>/            # one round = one directory (named <MMDD>_<HHMM>_<batch label>)
    ├── raw/             # ★ traceable: one run directory per case (dsh --json event stream + .err + benchmark mcp.jsonl
    │   └── <stamp>_<case>/   #   audit + instructions.md + meta.yml + case_metadata.json)
    ├── traces/          # convert.mjs output: upstream "reference" traces (<system>/dsh-tsm/<category>/<case>/; `dsh-tsm` = the scoring-side model label, COB_MODEL's default — not a bundle name)
    ├── <sys>_<cat>_questions.csv · _summary.json · _details.json · _group.md   # per-family scoring output
    ├── questions.csv    # per-case detail stitched across groups (machine-readable)
    └── summary.md       # round summary (family metric table + per-case rows)
```

`DETAIL/` and `DETAIL.md` (at the scenario root) are the **ledger**: per-case check lists and evidence text split by family (system/category); coverage / aggregate / index live in the ledger.

## Calibers (`eval/grade.sh` — reusing the upstream scoring)

- **Labels** = `process-label/<system>/<category>/<case>/milestone.json` (benchmark-native, never corrected)
- **Outcome scores (on the Rank-1 answer)**: `CA` component / `FA` fault type / `JRA` joint — verbatim equality with the labels' `result` (only Rank 1 is scored)
- **Process scores (on the evidence chain)**: `MC` milestone coverage (tool name + argument match + observation text satisfying the evidence patterns) / `EOC` evidence order (dependency edges hold) / `ECR` chain closure (boolean) / `EE` evidence efficiency (evidence steps / total steps)
- **Process**: `steps` diagnostic steps ｜ `RAR` repeated-call rate ｜ `invalid` invalid actions
- **Rulings**: no manual-overturn caliber — **everything follows the upstream scorer's output** (same caliber, so numbers can be lined up with the benchmark's published results)

## How to update

```bash
# 1) run questions (single-case example; batch mode = serially one case at a time, landing rounds under raw/)
bash "DSH-based Agent Service/dsh_cob/run_one.sh" boutique runtime 1
# 2) once the round is under results/<run_id>/raw/, score it (--runs-root scans raw/)
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results/<run_id>/raw \
     --out scenarios/cloudopsbench/results/<run_id>
# 3) rebuild the cross-round statistics and the ledger
node scenarios/cloudopsbench/eval/stats.mjs
```
