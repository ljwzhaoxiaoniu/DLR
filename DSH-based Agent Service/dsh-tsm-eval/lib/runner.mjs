// `run` / `all`: dispatch the paper through dsh headless (one process per question,
// same argv/env contract as dsh_dlr/run_one.sh), land artifacts in a run dir that
// `tsm grade` reads unchanged, and write run.json (the route-3 diff anchor).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { EvalError, exists, readJson, sha1File } from "./util.mjs";
import { assertApiKey, buildChildEnv } from "./env.mjs";
import { runToFiles } from "./proc.mjs";
import { loadContext } from "./paths.mjs";
import { bindPaper, loadDatasetQuestions, readPaper, selectScope } from "./paper.mjs";
import { assertPreflight, classifyDshErr, scenarioInfoOf } from "./precheck.mjs";
import { classifyRound } from "./flags.mjs";
import { parseNdjsonText } from "./ndjson.mjs";

const pad2 = (n) => String(n).padStart(2, "0");
export function stampNow(d = new Date()) {
  return `${pad2(d.getMonth() + 1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}${pad2(d.getSeconds())}`;
}

const freeMb = () => os.freemem() / 1048576;

/** argv for one question - order is a hard contract: --patch must precede --json. */
export function dshArgv(ctx, question) {
  const argv = ["--profile", ctx.profile];
  for (const p of ctx.patches) argv.push("--patch", p);
  argv.push("--json", `Question: ${question}`);
  return argv;
}

export function resolveRunDir({ outDir, ledger, out, stamp, scopeLabel }) {
  if (out) return path.resolve(out);
  const base = ledger ? path.join(outDir, "results") : path.join(outDir, "eval", "runs");
  return path.join(base, `${stamp}_${scopeLabel}`);
}

async function runOne(item, { ctx, env, runDir, stamp, timeoutSec }) {
  const file = `${stamp}_${item.qid}_dlr.ndjson`;
  const outFile = path.join(runDir, "raw", file);
  const errFile = path.join(runDir, "raw", file.replace(/\.ndjson$/, ".err"));
  const startedAt = new Date().toISOString();
  const r = await runToFiles(process.execPath, [ctx.dsh.binJs, ...dshArgv(ctx, item.question)], {
    cwd: ctx.dshDlrDir ?? process.cwd(),
    env,
    outFile,
    errFile,
    timeoutMs: timeoutSec * 1000,
  });
  const ev = exists(outFile) ? parseNdjsonText(fs.readFileSync(outFile, "utf8"), { file }) : null;
  const errText = exists(errFile) ? fs.readFileSync(errFile, "utf8") : "";
  const cls = classifyRound({ ev, rc: r.rc, killed: r.killed, errFatal: classifyDshErr(errText).fatal });
  return {
    qid: item.qid,
    db: item.db,
    file,
    rc: r.rc,
    killed: r.killed,
    ms: r.ms,
    started_at: startedAt,
    ended_at: new Date().toISOString(),
    invalid: cls.invalid,
    invalid_kind: cls.invalid ? cls.kind : null,
    invalid_detail: cls.invalid ? cls.detail : null,
    steps: ev?.steps ?? 0,
    tools: ev?.tools ?? 0,
    tokens: ev?.tokens?.total ?? 0,
    sha1: exists(outFile) ? sha1File(outFile) : null,
  };
}

/** Concurrency pool with the 700MB free-memory gate (same discipline as run_batch.sh). */
async function runScope(items, { ctx, env, runDir, stamp, jobs, timeoutSec, minFreeMb }) {
  const queue = [...items];
  const results = [];
  let running = 0;
  let stalled = false;
  await new Promise((resolve) => {
    const pump = () => {
      if (stalled) return;
      if (!queue.length && running === 0) return resolve();
      while (running < jobs && queue.length) {
        if (freeMb() < minFreeMb) {
          stalled = true;
          console.log(`[run] low memory (${Math.round(freeMb())}MB free < ${minFreeMb}MB), waiting 15s...`);
          setTimeout(() => {
            stalled = false;
            pump();
          }, 15000);
          return;
        }
        const item = queue.shift();
        running++;
        runOne(item, { ctx, env, runDir, stamp, timeoutSec }).then(
          (r) => {
            const done = results.length + 1;
            console.log(
              `[run] ${done}/${items.length} q${r.qid} ${r.invalid ? `INVALID(${r.invalid_kind})` : "ok"} - ${r.steps} steps, ${r.tokens.toLocaleString()} tok, ${Math.round(r.ms / 1000)}s`,
            );
            results.push(r);
            running--;
            pump();
          },
          (e) => {
            console.log(`[run] q${item.qid} runner error: ${e?.message ?? e}`);
            results.push({ qid: item.qid, db: item.db, runner_error: String(e?.message ?? e) });
            running--;
            pump();
          },
        );
      }
    };
    pump();
  });
  results.sort((a, b) => a.qid - b.qid);
  return results;
}

async function executeRun(args) {
  const jobs = Number(args.jobs ?? 4);
  const timeoutSec = Number(args.timeout ?? 600);
  const minFreeMb = Number(args["min-free-mb"] ?? 700);
  const dryRun = !!args["dry-run"];
  if (!Number.isInteger(jobs) || jobs < 1) throw new EvalError(`--jobs must be a positive integer: ${args.jobs}`);

  const ctx = loadContext(args);
  assertApiKey(ctx);
  const info = await scenarioInfoOf(ctx);

  const paper = readPaper(ctx.paperPath);
  const dsFile = path.join(info.dataset_dir, "mini_dev_sqlite.json");
  if (!exists(dsFile)) throw new EvalError(`dataset questions not found: ${dsFile} (check TSM_DATASET_DIR / --scenario)`);
  const { items, problems } = bindPaper(paper, loadDatasetQuestions(dsFile));
  if (problems.length) throw new EvalError(`paper/dataset binding failed:\n  - ${problems.slice(0, 10).join("\n  - ")}`);

  const { selected, scopeLabel, rejected } = selectScope(items, {
    qids: args.qids,
    db: args.db,
    all: args.all,
    limit: args.limit,
  });
  if (rejected.length) console.log(`[run] rejected: ${rejected.join(", ")}`);
  if (selected.length > 5 && !args.yes && !dryRun) {
    throw new EvalError(`${selected.length} questions selected - runs over 5 need --yes (5-per-batch discipline)`);
  }
  if (selected.length > 5 && !args.yes && dryRun) {
    console.log(`[run] WARN ${selected.length} questions selected - a real run would need --yes`);
  }

  const stamp = args["run-id"] ?? stampNow();
  const runDir = resolveRunDir({ outDir: info.out_dir, ledger: !!args.ledger, out: args.out, stamp, scopeLabel });
  if (exists(runDir) && !args.force && !dryRun) {
    throw new EvalError(`run dir already exists: ${runDir} (use --force to overwrite)`);
  }
  if (args.ledger) console.log(`[run] LEDGER run - landing in the official results dir: ${runDir}`);

  if (!args["skip-precheck"]) await assertPreflight(ctx, { info });

  if (dryRun) {
    const argv = dshArgv(ctx, selected[0]?.question ?? "<question>");
    console.log(`[run] DRY RUN - nothing starts`);
    console.log(`[run] scenario   : ${info.name} <- ${info.dir} (out ${info.out_dir})`);
    console.log(`[run] questions  : ${selected.length} (${scopeLabel}); first q${selected[0]?.qid}`);
    console.log(`[run] run dir    : ${runDir}`);
    console.log(`[run] cwd        : ${ctx.dshDlrDir ?? process.cwd()}`);
    console.log(`[run] exec       : ${process.execPath}`);
    console.log(`[run] argv       : ${JSON.stringify([ctx.dsh.binJs, ...argv])}`);
    console.log(`[run] env        : DSH_HOME=${ctx.dshHome} DLR_SKILLS_DIR=${ctx.skillsDir} TSM_MCP_URL=${ctx.mcpUrl}`);
    console.log(`[run] jobs=${jobs} timeout=${timeoutSec}s min-free-mb=${minFreeMb}`);
    return { runDir, summary: null };
  }

  fs.mkdirSync(path.join(runDir, "raw"), { recursive: true });
  fs.writeFileSync(
    path.join(runDir, "questions.tsv"),
    selected.map((it) => `${it.qid}\t${it.db}\t${it.question.replace(/\t/g, " ")}`).join("\n") + "\n",
  );

  const env = buildChildEnv(ctx);
  const startedAt = new Date().toISOString();
  console.log(`[run] ${selected.length} question(s) -> ${runDir} (jobs=${jobs}, timeout=${timeoutSec}s)`);
  const records = await runScope(selected, { ctx, env, runDir, stamp, jobs, timeoutSec, minFreeMb });
  const endedAt = new Date().toISOString();

  const meta = {
    id: path.basename(runDir),
    scope: scopeLabel,
    args: {
      qids: args.qids ?? null,
      db: args.db ?? null,
      all: !!args.all,
      limit: args.limit ?? null,
      jobs,
      timeout_sec: timeoutSec,
      ledger: !!args.ledger,
    },
    scenario: { name: info.name, dir: info.dir, out_dir: info.out_dir },
    paper: { path: ctx.paperPath, sha1: sha1File(ctx.paperPath), lines: paper.length },
    dsh: { version: ctx.dsh.version, bin: ctx.dsh.binJs, profile: ctx.profile },
    node: process.version,
    patches: ctx.patches.map((p) => ({ path: p, sha1: exists(p) ? sha1File(p) : null })),
    started_at: startedAt,
    ended_at: endedAt,
    questions: records,
  };
  fs.writeFileSync(path.join(runDir, "run.json"), JSON.stringify(meta, null, 2));

  const ok = records.filter((r) => !r.invalid && !r.runner_error).length;
  const invalid = records.length - ok;
  const tok = records.reduce((n, r) => n + (r.tokens ?? 0), 0);
  console.log(`[run] done: ${ok} ok, ${invalid} invalid; ${tok.toLocaleString()} tok total`);
  const failed = records.filter((r) => r.invalid || r.runner_error);
  for (const f of failed) console.log(`[run]   q${f.qid}: ${f.invalid_kind ?? f.runner_error}${f.invalid_detail ? ` - ${f.invalid_detail}` : ""}`);
  return { runDir, summary: meta };
}

export async function runCommand(args) {
  const { runDir } = await executeRun(args);
  if (!args["dry-run"]) console.log(`[run] next: dsh-eval score --run "${runDir}"`);
  return 0;
}

export async function allCommand(args) {
  const { runDir } = await executeRun(args);
  if (args["dry-run"]) return 0;
  const { scoreCommand } = await import("./grade.mjs");
  await scoreCommand({ ...args, run: runDir });
  const { reportCommand } = await import("./report.mjs");
  await reportCommand({ ...args, run: runDir });
  return 0;
}
