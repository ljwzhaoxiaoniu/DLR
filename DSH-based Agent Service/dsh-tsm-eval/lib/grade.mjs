// `score`: shell out to `tsm grade --run <dir>` - the single judge.
// tsm-core-dlr exposes no main/exports, so its TS sources cannot be imported;
// a subprocess is also the only honest single-ruler path (judge.ts has module-level
// side effects: dataset reads at import time, gold-cache exit hooks).
import path from "node:path";
import { EvalError, exists } from "./util.mjs";
import { buildChildEnv } from "./env.mjs";
import { runInherit } from "./proc.mjs";
import { loadContext } from "./paths.mjs";

export async function scoreCommand(args) {
  if (args.run === undefined) throw new EvalError("score requires --run <dir>");
  const runDir = path.resolve(args.run);
  if (!exists(path.join(runDir, "raw"))) throw new EvalError(`no raw/ under ${runDir} - nothing to grade`);
  const ctx = loadContext(args);
  const env = buildChildEnv(ctx);
  if (args["no-cache"]) env.TSM_GOLD_NO_CACHE = "1";
  const timeoutMs = args.timeout ? Number(args.timeout) * 1000 : 0;
  console.log(`[score] tsm grade --run "${runDir}"${args["no-cache"] ? " (no-cache)" : ""}`);
  const r = await runInherit(process.execPath, [ctx.tsm.binJs, "grade", "--run", runDir], {
    cwd: process.cwd(),
    env,
    timeoutMs,
  });
  if (r.error) throw new EvalError(`cannot spawn tsm: ${r.error}`);
  if (r.killed) {
    throw new EvalError(`tsm grade killed after ${args.timeout}s - kill-and-rerun is the known remedy (gold values are cached)`);
  }
  if (r.rc !== 0) throw new EvalError(`tsm grade exited with rc=${r.rc}`);
  console.log(`[score] -> ${path.join(runDir, "questions.csv")}`);
  return 0;
}
