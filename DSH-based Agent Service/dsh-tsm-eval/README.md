# dsh-tsm-eval — the TSM/DLR exam system

> 中文版：[README.zh.md](README.zh.md)

**The exam paper follows the scenario; the exam system follows dsh.**

`dsh-tsm-eval` runs a scenario's exam paper (`scenarios/<name>/eval/questions.jsonl`) through **dsh headless**, scores every answer with **`tsm grade`** (the single judge), and emits a **replayable report**: result + process + session-log forensics. One system serves all scenarios.

This is the 2.0 evaluation pipeline's host half (working name from `docs/eval.md` §8, route 2). It replaces the manual `run_batch.sh` → `tsm grade` → read-the-CSV chain with one command, adds process metrics and forensics the old chain never captured, and lands nothing in the official ledger unless asked to.

## Pipeline

```
paper (eval/questions.jsonl)
   │  run     — one dsh headless process per question (--json), artifacts land as
   │            raw/<stamp>_<qid>_dlr.ndjson (a layout `tsm grade` reads unchanged)
   │  score   — `tsm grade --run <dir>` → questions.csv + summary.md (single judge)
   ▼  report  — report.json + report.md: result (by ruling / db / caliber source),
                process (steps, tokens, tool sequence, evidence-chain usage),
                forensics (session-log path + decoded facts), invalid-round split,
                baseline_key (the round-to-round diff anchor for route 3)
```

Artifacts always come from dsh's native surfaces: the `--json` event stream and the multi-frame-zstd session logs under `$DSH_HOME/sessions/`. The `--json` stream truncates strings at 8 KiB (except `final`); the session log does not — the report records both, and marks truncated rounds.

## Quickstart

Prerequisites — all of them are the normal 2.0 setup:

1. Backend up: `bash "DSH-based Agent Service/scripts/start_backend.sh"` (MCP on `:28795`;
   `TSM_MCP_URL` overrides).
2. The headless profile has the agent bundle (link install is fine):
   `dsh plugin --profile headless add "<abs>/DSH-based Agent Service/dsh-tsm-agent"`.
3. Credentials: `DSH-based Agent Service/dsh_dlr/.env` holds `DEEPSEEK_API_KEY`.

```bash
# 0. check everything (11 checks: paths, paper binding, profile bundle, backend, MCP tools)
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" doctor

# 1. inspect first - nothing starts
dsh-eval run --qids 1471 --dry-run

# 2. run + score + report in one go
dsh-eval all --qids 1471,27,726,186,234 --out tmp_scripts/smoke5
```

(from the repo root; `dsh-eval` = the bin once the package is installed)

## Commands

| Command | What |
|---|---|
| `doctor` | Preflight checks; exits non-zero on any failure |
| `run (--qids a,b \| --db <name> \| --all) [--limit N]` | Dispatch dsh headless per question, write artifacts + `run.json` |
| `score --run <dir>` | `tsm grade` on the run dir (add `--no-cache` to recompute gold) |
| `report --run <dir>` | Build `report.json` + `report.md` (add `--no-session` to skip session decoding, `--strict-csv` to fail on CSV column drift) |
| `all <run flags>` | `run` → `score` → `report` |
| `parity [--run <dir> \| --all-results]` | Hold the local ndjson reader to grade's `questions.csv` (13 fields, exact caliber) |

Run flags: `--jobs 4` · `--timeout 600` (per question, seconds) · `--min-free-mb 700` (dispatch gate) · `--out <dir>` (run directory) · `--ledger` (land in `results/` — the official ledger) · `--patch <yml>` (repeatable; default `dsh_dlr/dsh.patch.yml`) · `--profile headless` · `--skip-precheck` · `--dry-run` · `--yes` · `--force` (overwrite an existing run dir) · `--run-id <id>`.

Global: `--scenario <path\|pkg>` (default `$TSM_SCENARIO` or the repo's scenario) · `--tsm <dir\|bin/tsm.mjs>` · `--dsh-bin <lib/bin.js>` · `--dsh-home <path>`.

## Run directory & outputs

```
<run dir>/                      default <scenario>/eval/runs/<stamp>_<scope>/
│                               (installed: $TSM_OUT_DIR/eval/runs/...)
├─ run.json        args, env fingerprint, paper sha1, per-question {qid,file,rc,sha1,...}
├─ questions.tsv   qid / db / question (dispatch list)
├─ raw/            <MMDD_HHMMSS>_<qid>_dlr.ndjson + .err   (grade-compatible naming)
├─ questions.csv   from tsm grade (22 columns - the single judge)
├─ summary.md      from tsm grade
└─ report.json / report.md
```

**The official ledger is opt-in.** By default runs land in `eval/runs/` (git-ignored, never scanned by `tsm stats`); only `--ledger` targets `results/`, and anything over 5 questions requires `--yes` (the 5-per-batch discipline). An existing run directory is refused unless `--force`.

## report.json (schema `dsh-tsm-eval/report@1`)

- `run` / `env` — git commit, dsh version, model, patch sha1s, scenario, paper sha1, backend status;
- `baseline_key` — sha1 over the fingerprint (git/dsh/model/patches/scenario/paper) — equal keys mean two rounds are comparable (route 3's diff anchor);
- `counts` / `results` — ruling & verdict tallies, **`accuracy_valid`** (invalid rounds excluded) vs **`accuracy_raw`**, by db, by paper caliber source (`gold` vs `L3 sop#…`);
- `invalid_rounds` — transport kills / timeouts / finals-less streams, classified (`transport` | `timeout` | `no_turn_end` | `no_final` | `dsh_error` | `empty_stream`). These land in `questions.csv` as FAIL + 0 tokens; without the split they read as capability regressions;
- `process` — means, token totals, evidence-chain usage (L3/L2/L1 retrieval, PE mapping, SQL execution, `Final Answer:` marker);
- `questions[]` — per question: the grade row embedded verbatim (`source: questions.csv`), the paper's expected/caliber source, the full tool sequence, `ndjson_truncated` flag, session-log path + decoded facts (tokens, model, tool calls).

## Forensics

Every question's session log is located by session id and recorded in the report:

```
$DSH_HOME/sessions/<cwd-slug>/<session-id>/session.v4.jsonl.zstd
```

They are **multi-frame zstd** (one frame per append batch; plain zstd decoders return only the first frame — looks like an empty session). `dsh-eval` decodes frames itself and also records the path; `DSH-based Agent Service/scripts/decode_session_log.cjs` is a quick standalone summarizer. Full tool arguments (untruncated SQL) live only here.

## Discipline

- **One batch = 5 questions**; over 5 needs `--yes`. TRANSPORT / killed rounds are invalid — rerun them, do not read them as errors;
- **The judge is `tsm grade`** — one ruler. `report.json` embeds its rows and never re-judges; SOP rulings (✅ / 🔁 / ❌ / ⚠) come from the same calibers as the ledger;
- A round's CSV can go **stale** if the ndjson changed after grading — `parity` detects it (field-by-field), and the report marks `csv_stale`;
- Experimental runs never go into `results/` (the ledger takes the newest round per question).

## Relation to the previous chain

`run_batch.sh` + `run_one.sh` remain in-tree for the historical workflow; `dsh-eval` reproduces their dsh invocation contract field-for-field (argv order, cwd = `dsh_dlr/`, `DSH_HOME` / `DLR_SKILLS_DIR` / `dsh_dlr/.env`) but is cross-platform (no bash/GNU-timeout dependency), knows about TSM_SCENARIO/TSM_OUT_DIR, and adds the report layer. `dsh-eval parity --all-results` proves the reader matches the ledger's CSVs (932/933 rows exact; the one diff is the known stale-CSV round `0929_1359_financial_secC` q186).

## Troubleshooting

| Symptom | Fix |
|---|---|
| `profile-bundle` FAIL in doctor | `dsh plugin --profile headless add "<abs>/…/dsh-tsm-agent"` (a bare auto-created profile runs dsh with **zero tools** and burns tokens) |
| `backend` FAIL | `bash "DSH-based Agent Service/scripts/start_backend.sh"` |
| `mcp ... missing:` tools | backend built against a different scenario or a stale MCP process; restart the backend |
| `scenario MISMATCH` | the backend serves another scenario than the paper — restart it with the right `TSM_SCENARIO` |
| `transport` invalid rounds | upstream network drop; the round is void — rerun it (do not count it as a failure) |
| `tsm grade` hangs | known: heavy gold query / result-set rescue. Kill and rerun — gold values are cached; `score --timeout` bounds it |
| session log "empty" | multi-frame zstd — use `dsh-eval report` (decodes frames) or `scripts/decode_session_log.cjs` |
| `[run] WARN n questions … --yes` | batch discipline: confirm the size explicitly |

## Roadmap

- **0.2**: dsh bundle surface (web report overlay + `/eval` slash command); `qid` appended to the paper by `eval/build.mjs`; retries into a `failed/` area; mass regrade mode for the ledger;
- **Route 3**: round-to-round diff on `baseline_key` (same paper, changed semantic assets → behavior diff).

## License

MIT — see [LICENSE](LICENSE).
