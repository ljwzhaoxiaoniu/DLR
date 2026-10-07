// dsh-tsm-eval CLI: subcommand dispatch, flag parsing, usage.
// Console output stays ASCII (cmd.exe code pages mangle CJK); Chinese lives in README/report.md.
import { VERSION } from "./util.mjs";

export { VERSION };

export const USAGE = `dsh-eval - the TSM/DLR exam system (working name dsh-tsm-eval).
Run a scenario paper through dsh headless, score it with tsm grade, emit a replayable report.

Usage:
  dsh-eval doctor [--json]
  dsh-eval run    (--qids a,b | --db <name> | --all) [--limit N] [--jobs 4] [--timeout 600]
                  [--out <dir> | --ledger] [--run-id <id>] [--patch <yml>]...
                  [--profile headless] [--min-free-mb 700] [--skip-precheck]
                  [--dry-run] [--yes] [--force]
  dsh-eval score  --run <dir> [--no-cache] [--timeout <sec>]
  dsh-eval report --run <dir> [--no-session] [--strict-csv] [--json]
  dsh-eval all    <same flags as run>            (= run -> score -> report)
  dsh-eval parity [--run <dir> | --all-results] [--json]

Value flags:
  --qids 1313,1471   question ids from the paper's dataset order (comma-separated)
  --db <name>        all paper questions of one database
  --all              the whole paper (over 5 questions requires --yes)
  --limit <n>        cap the selected questions
  --jobs <n>         parallel dsh runs (default 4)
  --timeout <sec>    per-question timeout (default 600)
  --out <dir>        run directory (default: <scenario>/eval/runs/<stamp>_<scope>)
  --ledger           land in <scenario>/results/ (official ledger) instead
  --run-id <id>      override the directory stamp
  --patch <yml>      extra dsh patch file (repeatable; default: dsh_dlr/dsh.patch.yml)
  --profile <name>   dsh profile (default headless)
  --min-free-mb <n>  free-memory gate before dispatch (default 700)

Boolean flags:
  --skip-precheck  skip the /status + MCP probe before running
  --dry-run        print argv/cwd/env/landing, start nothing
  --yes            confirm >5-question runs
  --force          overwrite an existing run directory
  --no-cache       score: TSM_GOLD_NO_CACHE=1 (recompute gold values)
  --no-session     report: skip session-log facts (path still recorded)
  --strict-csv     report: fail on CSV column drift instead of warning
  --json           machine-readable output where supported

Global:
  --scenario <path|pkg>  scenario dir or npm package name (default: TSM_SCENARIO or repo default)
  --tsm <path>           tsm-core-dlr dir or bin/tsm.mjs (default: auto-resolve)
  --dsh-bin <path>       @deepseek-ai/dsh lib/bin.js (default: auto-resolve)
  --dsh-home <path>      DSH_HOME (default: $DSH_HOME or <service>/.dsh-home)
  -h, --help             show this help
  -V, --version          print version
`;

const VALUE_KEYS = new Set([
  "qids", "db", "limit", "jobs", "timeout", "out", "run-id", "patch", "profile",
  "min-free-mb", "run", "scenario", "tsm", "dsh-bin", "dsh-home",
]);
const MULTI_KEYS = new Set(["patch"]);
const BOOL_KEYS = new Set([
  "ledger", "skip-precheck", "dry-run", "yes", "force", "no-cache", "no-session",
  "strict-csv", "json", "all-results", "help", "version",
]);

export class UsageError extends Error {}

// Parse argv -> { _: positional[], ...flags }. Strict: unknown flags are errors.
export function parseArgv(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--") {
      out._.push(...argv.slice(i + 1));
      break;
    }
    if (a === "-h") { out.help = true; continue; }
    if (a === "-V") { out.version = true; continue; }
    if (a.startsWith("-") && a !== "-") {
      if (!a.startsWith("--")) throw new UsageError(`unknown flag ${a}`);
      let key = a.slice(2);
      let val = null;
      const eq = key.indexOf("=");
      if (eq !== -1) { val = key.slice(eq + 1); key = key.slice(0, eq); }
      if (val === null) {
        const nxt = argv[i + 1];
        if (nxt === undefined || (nxt.startsWith("-") && nxt !== "-")) {
          if (VALUE_KEYS.has(key)) throw new UsageError(`--${key} requires a value`);
          val = true;
        } else {
          val = nxt;
          i++;
        }
      }
      if (VALUE_KEYS.has(key)) {
        if (val === true) throw new UsageError(`--${key} requires a value`);
        if (MULTI_KEYS.has(key)) (out[key] ??= []).push(String(val));
        else out[key] = String(val);
      } else if (BOOL_KEYS.has(key)) {
        if (val !== true) throw new UsageError(`--${key} takes no value`);
        out[key] = true;
      } else {
        throw new UsageError(`unknown flag --${key}`);
      }
    } else {
      out._.push(a);
    }
  }
  return out;
}

export async function main(argv) {
  let args;
  try {
    args = parseArgv(argv);
  } catch (e) {
    if (e instanceof UsageError) {
      console.error(`[dsh-eval] ${e.message}`);
      console.error(USAGE);
      return 2;
    }
    throw e;
  }
  if (args.version) {
    console.log(VERSION);
    return 0;
  }
  const [cmd, ...rest] = args._;
  if (args.help) {
    console.log(USAGE);
    return 0;
  }
  if (!cmd) {
    console.error(USAGE);
    return 1;
  }
  if (rest.length) {
    console.error(`[dsh-eval] unexpected positional argument(s): ${rest.join(" ")}`);
    return 2;
  }
  try {
    switch (cmd) {
      case "doctor": {
        const { doctorCommand } = await import("./precheck.mjs");
        return await doctorCommand(args);
      }
      case "run": {
        const { runCommand } = await import("./runner.mjs");
        return await runCommand(args);
      }
      case "score": {
        const { scoreCommand } = await import("./grade.mjs");
        return await scoreCommand(args);
      }
      case "report": {
        const { reportCommand } = await import("./report.mjs");
        return await reportCommand(args);
      }
      case "all": {
        const { allCommand } = await import("./runner.mjs");
        return await allCommand(args);
      }
      case "parity": {
        const { parityCommand } = await import("./parity.mjs");
        return await parityCommand(args);
      }
      default:
        console.error(`[dsh-eval] unknown command: ${cmd}`);
        console.error(USAGE);
        return 2;
    }
  } catch (e) {
    if (e?.name === "EvalError" || e?.evalMessage) {
      console.error(`[dsh-eval] ${e.evalMessage ?? e.message}`);
      return 3;
    }
    console.error(`[dsh-eval] ${e?.stack ?? e}`);
    return 4;
  }
}
