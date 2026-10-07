// .env parsing, credential checks, and child-process environment assembly.
// Assembly replicates dsh_dlr/run_one.sh: repo env -> .env (set -a) -> DSH_HOME /
// DLR_SKILLS_DIR / TSM_MCP_URL pinned last.
import fs from "node:fs";
import { EvalError, exists } from "./util.mjs";

export function parseDotEnv(text) {
  const out = {};
  for (let line of String(text).replace(/^﻿/, "").split(/\r?\n/)) {
    line = line.trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    const key = m[1];
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
        (val.startsWith("'") && val.endsWith("'") && val.length >= 2)) {
      val = val.slice(1, -1);
    } else {
      const h = val.indexOf(" #");
      if (h !== -1) val = val.slice(0, h).trim();
    }
    out[key] = val;
  }
  return out;
}

export function loadDotEnv(files) {
  const env = {};
  for (const f of files.filter(Boolean)) {
    if (exists(f)) Object.assign(env, parseDotEnv(fs.readFileSync(f, "utf8")));
  }
  return env;
}

/** Environment for a spawned dsh (and for `tsm grade`). */
export function buildChildEnv(ctx, { base = process.env } = {}) {
  const dotenv = loadDotEnv([ctx.dotenvFile]);
  const env = { ...base, ...dotenv };
  if (ctx.dshHome) env.DSH_HOME = ctx.dshHome;
  if (ctx.skillsDir) env.DLR_SKILLS_DIR = ctx.skillsDir;
  if (ctx.mcpUrl) env.TSM_MCP_URL = ctx.mcpUrl;
  // The scenario choice must reach `tsm grade`'s re-resolution: only pin the env
  // var when the user was explicit (flag or TSM_SCENARIO); the repo default needs none.
  if (ctx.scenario?.env) env.TSM_SCENARIO = ctx.scenario.env;
  return env;
}

export function readCredentials(ctx) {
  const dotenv = loadDotEnv([ctx.dotenvFile]);
  return {
    apiKey: dotenv.DEEPSEEK_API_KEY ?? process.env.DEEPSEEK_API_KEY ?? null,
    file: ctx.dotenvFile,
  };
}

export function assertApiKey(ctx) {
  const { apiKey, file } = readCredentials(ctx);
  if (!apiKey) {
    throw new EvalError(
      `DEEPSEEK_API_KEY missing - copy "dsh_dlr/.env.example" to "${file}" and fill it`,
    );
  }
  return apiKey;
}
