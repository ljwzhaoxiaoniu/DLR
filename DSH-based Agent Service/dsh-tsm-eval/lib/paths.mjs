// Locate the repo, tsm-core-dlr, dsh, the scenario, and run directories.
// Resolution mirrors the service's own semantics (TSM Core Service/src/config.ts)
// where a child process will re-resolve the same env — see loadContext().
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { EvalError, exists, readJson } from "./util.mjs";

export const PKG_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Walk up from the package dir looking for the DLR repo (TSM Core Service + DSH service). */
export function findRepoRoot(startDir = PKG_DIR) {
  let dir = startDir;
  for (let i = 0; i < 8; i++) {
    const tsmPkg = path.join(dir, "TSM Core Service", "package.json");
    const svcDir = path.join(dir, "DSH-based Agent Service");
    if (exists(tsmPkg) && exists(svcDir)) {
      try {
        if (readJson(tsmPkg).name === "tsm-core-dlr") return dir;
      } catch {
        /* keep walking */
      }
    }
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  return null;
}

function tsmFromPath(p, via) {
  const abs = path.resolve(p);
  if (!exists(abs)) return null;
  let dir = null;
  const st = fs.statSync(abs);
  if (st.isDirectory()) dir = abs;
  else dir = path.resolve(path.dirname(abs), "..");
  const binJs = path.join(dir, "bin", "tsm.mjs");
  if (!exists(binJs)) return null;
  let version = null;
  try {
    version = readJson(path.join(dir, "package.json")).version;
  } catch {
    /* version optional */
  }
  return { dir, binJs, version, via };
}

/** --tsm > DSH_EVAL_TSM > require.resolve > repo sibling. */
export function resolveTsm(args, repoRoot) {
  if (args?.tsm) {
    const r = tsmFromPath(args.tsm, "flag");
    if (!r) throw new EvalError(`--tsm does not point to a tsm-core-dlr dir or bin/tsm.mjs: ${args.tsm}`);
    return r;
  }
  if (process.env.DSH_EVAL_TSM) {
    const r = tsmFromPath(process.env.DSH_EVAL_TSM, "env");
    if (r) return r;
  }
  try {
    const req = createRequire(path.join(process.cwd(), "noop.js"));
    const r = tsmFromPath(req.resolve("tsm-core-dlr/package.json"), "resolve");
    if (r) return r;
  } catch {
    /* not installed as a dependency */
  }
  if (repoRoot) {
    const r = tsmFromPath(path.join(repoRoot, "TSM Core Service"), "sibling");
    if (r) return r;
  }
  return null;
}

/** --dsh-bin > DSH_EVAL_DSH_BIN > profile node_modules > require > global npm. */
export function resolveDsh(args, { dshHome, profile }) {
  const tryBin = (p, via) => {
    const abs = path.resolve(p);
    if (!exists(abs)) return null;
    let version = null;
    try {
      version = readJson(path.join(abs, "..", "..", "package.json")).version;
    } catch {
      /* version optional */
    }
    return { binJs: abs, version, via };
  };
  if (args?.["dsh-bin"]) {
    const r = tryBin(args["dsh-bin"], "flag");
    if (!r) throw new EvalError(`--dsh-bin does not exist: ${args["dsh-bin"]}`);
    return r;
  }
  if (process.env.DSH_EVAL_DSH_BIN) {
    const r = tryBin(process.env.DSH_EVAL_DSH_BIN, "env");
    if (r) return r;
  }
  if (dshHome && profile) {
    const r = tryBin(path.join(dshHome, "profiles", profile, "node_modules", "@deepseek-ai", "dsh", "lib", "bin.js"), "profile");
    if (r) return r;
  }
  try {
    const req = createRequire(path.join(process.cwd(), "noop.js"));
    const r = tryBin(path.join(path.dirname(req.resolve("@deepseek-ai/dsh/package.json")), "lib", "bin.js"), "resolve");
    if (r) return r;
  } catch {
    /* not installed as a dependency */
  }
  const globalRoots = [];
  if (process.platform === "win32" && process.env.APPDATA) {
    globalRoots.push(path.join(process.env.APPDATA, "npm", "node_modules"));
  }
  for (const root of globalRoots) {
    const r = tryBin(path.join(root, "@deepseek-ai", "dsh", "lib", "bin.js"), "global");
    if (r) return r;
  }
  try {
    const root = execSync("npm root -g", { encoding: "utf8", timeout: 8000, stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (root) {
      const r = tryBin(path.join(root, "@deepseek-ai", "dsh", "lib", "bin.js"), "global");
      if (r) return r;
    }
  } catch {
    /* npm unavailable */
  }
  return null;
}

/** Mirror of config.ts resolveScenario(): path | npm package | repo default. */
export function resolveScenario(args, repoRoot) {
  const raw = args?.scenario ?? process.env.TSM_SCENARIO ?? null;
  if (!raw) {
    if (!repoRoot) throw new EvalError("scenario cannot default (no repo found) - pass --scenario <dir|pkg>");
    const dir = path.join(repoRoot, "scenarios", "birdminidev");
    if (!exists(dir)) throw new EvalError(`default scenario dir missing: ${dir}`);
    return { dir, source: "default", env: null };
  }
  const pathLike = /^[.\\/]/.test(raw) || /^[A-Za-z]:[\\/]/.test(raw) || path.isAbsolute(raw);
  if (pathLike) {
    const dir = path.resolve(raw);
    if (!exists(dir)) throw new EvalError(`scenario path not found: ${dir}`);
    return { dir, source: "env-path", env: raw };
  }
  try {
    const req = createRequire(path.join(process.cwd(), "noop.js"));
    const pkg = req.resolve(`${raw.replace(/\/+$/, "")}/package.json`);
    return { dir: path.dirname(pkg), source: "env-package", env: raw };
  } catch {
    /* fall through to relative-dir probe */
  }
  const dir = path.resolve(raw);
  if (exists(dir)) return { dir, source: "env-path", env: raw };
  throw new EvalError(`cannot resolve scenario "${raw}" - install it (npm i ${raw}) or pass a path`);
}

/** Scenario display name: tsm-scenario.json "name" when present, else the dir basename. */
export function scenarioName(dir) {
  try {
    const meta = readJson(path.join(dir, "tsm-scenario.json"));
    if (meta?.name) return meta.name;
  } catch {
    /* no manifest */
  }
  return path.basename(dir);
}

/**
 * Build the shared context. lenient=true collects problems instead of throwing
 * (doctor wants to report every missing piece).
 */
export function loadContext(args, { lenient = false } = {}) {
  const problems = [];

  let repoRoot = null;
  try {
    repoRoot = findRepoRoot();
  } catch (e) {
    problems.push(`repo root probe failed: ${e.message}`);
  }
  if (!repoRoot) problems.push("repo root not found (outside the DLR checkout?)");

  let tsm = null;
  try {
    tsm = resolveTsm(args, repoRoot);
  } catch (e) {
    problems.push(e.evalMessage ?? e.message);
  }
  if (!tsm) problems.push("tsm-core-dlr not found - pass --tsm <dir|bin/tsm.mjs> or set DSH_EVAL_TSM");

  let scenario = null;
  try {
    scenario = resolveScenario(args, repoRoot);
  } catch (e) {
    problems.push(e.evalMessage ?? e.message);
  }

  const dshHome =
    args?.["dsh-home"] ??
    process.env.DSH_HOME ??
    (repoRoot ? path.join(repoRoot, "DSH-based Agent Service", ".dsh-home") : null);
  if (!dshHome) problems.push("DSH_HOME not resolvable - pass --dsh-home");

  const profile = args?.profile ?? "headless";

  let dsh = null;
  try {
    dsh = resolveDsh(args, { dshHome, profile });
  } catch (e) {
    problems.push(e.evalMessage ?? e.message);
  }
  if (!dsh) problems.push("@deepseek-ai/dsh not found - pass --dsh-bin <lib/bin.js> or set DSH_EVAL_DSH_BIN");

  const serviceDir = repoRoot ? path.join(repoRoot, "DSH-based Agent Service") : null;
  const dshDlrDir = serviceDir ? path.join(serviceDir, "dsh_dlr") : null;
  const patchDefault = dshDlrDir ? path.join(dshDlrDir, "dsh.patch.yml") : null;
  const patches = args?.patch?.length
    ? args.patch.map((p) => path.resolve(p))
    : patchDefault
      ? [patchDefault]
      : [];
  const skillsDir = serviceDir ? path.join(serviceDir, "dsh-tsm-agent", "skills") : null;
  const dotenvFile = dshDlrDir ? path.join(dshDlrDir, ".env") : null;
  const mcpUrl = process.env.TSM_MCP_URL ?? "http://127.0.0.1:28795/mcp";
  let statusOrigin = null;
  try {
    statusOrigin = new URL(mcpUrl).origin;
  } catch {
    problems.push(`TSM_MCP_URL is not a valid URL: ${mcpUrl}`);
  }
  const paperPath = scenario ? path.join(scenario.dir, "eval", "questions.jsonl") : null;

  const ctx = {
    repoRoot,
    tsm,
    dsh,
    dshHome,
    profile,
    scenario,
    paperPath,
    patches,
    skillsDir,
    dotenvFile,
    mcpUrl,
    statusOrigin,
    serviceDir,
    dshDlrDir,
    problems,
  };
  if (problems.length && !lenient) {
    throw new EvalError(`cannot proceed:\n  - ${problems.join("\n  - ")}`);
  }
  return ctx;
}
