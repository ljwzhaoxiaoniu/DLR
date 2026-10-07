// Preflight probes: `tsm scenario` (authoritative path view), GET /status, a raw
// MCP streamable-HTTP handshake (initialize -> initialized -> tools/list, no SDK),
// plus a minimal dsh stderr classifier. doctor prints every check; run refuses to
// start on any failure (a bare profile quietly burns tokens with zero tools).
import path from "node:path";
import { exists, readJson, VERSION } from "./util.mjs";
import { buildChildEnv, readCredentials } from "./env.mjs";
import { runCapture } from "./proc.mjs";
import { bindPaper, loadDatasetQuestions, readPaper } from "./paper.mjs";

export const TOOLS_EXPECTED = [
  "dlr_search_consensus",
  "dlr_search_sop",
  "dlr_semantic_query",
  "execute_sql",
  "get_full_data_info",
  "get_le_attrs",
  "get_pe_mapping",
];

const PROFILE_BUNDLE_REQUIRED = "dsh-tsm-agent";

/** `node <tsm bin> scenario` -> parsed JSON (authoritative scenario/out/dataset view). */
export async function scenarioInfoOf(ctx) {
  const r = await runCapture(process.execPath, [ctx.tsm.binJs, "scenario"], {
    env: buildChildEnv(ctx),
    cwd: process.cwd(),
    timeoutMs: 90000,
  });
  if (r.error || r.rc !== 0) {
    const tail = (r.err || r.out).trim().split(/\r?\n/).slice(-2).join(" | ");
    throw new Error(`tsm scenario failed (rc=${r.rc}${r.error ? `, ${r.error}` : ""}): ${tail}`);
  }
  const start = r.out.indexOf("{");
  if (start === -1) throw new Error(`tsm scenario produced no JSON: ${r.out.slice(0, 200)}`);
  try {
    return JSON.parse(r.out.slice(start));
  } catch (e) {
    throw new Error(`tsm scenario JSON parse failed: ${e.message}`);
  }
}

export async function probeStatus(origin, { timeoutMs = 4000 } = {}) {
  try {
    const res = await fetch(`${origin}/status`, { signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true, status: await res.json() };
  } catch (e) {
    return { ok: false, error: String(e?.cause?.message ?? e?.message ?? e) };
  }
}

async function rpc(url, payload, sessionId, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const headers = {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    };
    if (sessionId) headers["mcp-session-id"] = sessionId;
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const sid = res.headers.get("mcp-session-id") ?? sessionId;
    if (res.status === 202 || res.status === 204) return { status: res.status, sid, body: null };
    const ct = res.headers.get("content-type") ?? "";
    let body = null;
    if (ct.includes("text/event-stream")) {
      body = await readSseFor(res, payload.id);
    } else {
      const text = await res.text();
      try {
        body = JSON.parse(text);
      } catch {
        body = null;
      }
    }
    return { status: res.status, sid, body };
  } finally {
    clearTimeout(timer);
  }
}

/** Read SSE frames until the JSON-RPC reply with wantId shows up. */
async function readSseFor(res, wantId) {
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let found = null;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const blocks = buf.split(/\r?\n\r?\n/);
      buf = blocks.pop() ?? "";
      for (const block of blocks) {
        const data = block
          .split(/\r?\n/)
          .filter((l) => l.startsWith("data:"))
          .map((l) => l.slice(5).trim())
          .join("");
        if (!data) continue;
        let obj;
        try {
          obj = JSON.parse(data);
        } catch {
          continue;
        }
        if (wantId === undefined || obj.id === wantId) {
          found = obj;
          break;
        }
      }
      if (found) break;
    }
  } finally {
    try {
      await reader.cancel();
    } catch {
      /* stream already closed */
    }
  }
  return found;
}

/** Raw MCP handshake; retries known protocol versions. */
export async function probeMcp(mcpUrl, { timeoutMs = 8000 } = {}) {
  const versions = ["2025-06-18", "2025-03-26", "2024-11-05"];
  let lastError = "unknown";
  for (const protocolVersion of versions) {
    try {
      const init = await rpc(
        mcpUrl,
        {
          jsonrpc: "2.0",
          id: 1,
          method: "initialize",
          params: { protocolVersion, capabilities: {}, clientInfo: { name: "dsh-eval", version: VERSION } },
        },
        null,
        timeoutMs,
      );
      if (init.body?.error) {
        lastError = `initialize: ${init.body.error.message}`;
        continue;
      }
      const sid = init.sid;
      await rpc(mcpUrl, { jsonrpc: "2.0", method: "notifications/initialized" }, sid, timeoutMs);
      const list = await rpc(
        mcpUrl,
        { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
        sid,
        timeoutMs,
      );
      if (list.body?.error) {
        lastError = `tools/list: ${list.body.error.message}`;
        continue;
      }
      const tools = (list.body?.result?.tools ?? []).map((t) => t.name).sort();
      if (!tools.length) {
        lastError = "tools/list returned no tools";
        continue;
      }
      return { ok: true, tools, protocolVersion: init.body?.result?.protocolVersion ?? protocolVersion };
    } catch (e) {
      lastError = String(e?.cause?.message ?? e?.message ?? e);
    }
  }
  return { ok: false, tools: [], error: lastError };
}

/** Split a dsh .err into known noise vs fatal lines. */
export function classifyDshErr(text) {
  const noise = [];
  const fatal = [];
  for (const rawLine of String(text ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^dsh: warning: \d+ entr(y|ies) did not activate$/.test(line)) {
      noise.push(line);
      continue;
    }
    if (/pending \(waiting for service:/.test(line)) {
      noise.push(line);
      continue;
    }
    if (/^dsh: [A-Za-z]+: /.test(line)) {
      fatal.push(line);
      continue;
    }
    noise.push(line);
  }
  return { noise, fatal };
}

/** Run every doctor check; returns [{id, level: ok|warn|fail, detail}]. */
export async function collectChecks(ctx, { info = null, includeNetwork = true } = {}) {
  const checks = [];
  const add = (id, level, detail) => checks.push({ id, level, detail: String(detail) });

  add("repo", ctx.repoRoot ? "ok" : "warn", ctx.repoRoot ?? "not found (installed outside a checkout)");

  if (!ctx.tsm) add("tsm", "fail", "tsm-core-dlr not found - pass --tsm <dir|bin/tsm.mjs> or set DSH_EVAL_TSM");
  else add("tsm", "ok", `${ctx.tsm.dir} (v${ctx.tsm.version ?? "?"}, via ${ctx.tsm.via})`);

  if (info) add("scenario", "ok", `${info.name} <- ${info.dir} (${info.source}); out=${info.out_dir}`);
  else if (!ctx.scenario) add("scenario", "fail", "scenario unresolved");
  else if (!ctx.tsm) add("scenario", "warn", `${ctx.scenario.dir} (tsm unavailable - cannot run 'tsm scenario')`);
  else {
    try {
      info = await scenarioInfoOf(ctx);
      add("scenario", "ok", `${info.name} <- ${info.dir} (${info.source}); out=${info.out_dir}`);
    } catch (e) {
      add("scenario", "fail", e.message);
    }
  }

  if (ctx.paperPath) {
    try {
      const paper = readPaper(ctx.paperPath);
      let level = "ok";
      let detail = `${paper.length} lines`;
      const seen = new Set();
      let dups = 0;
      for (const p of paper) {
        if (seen.has(p.question)) dups++;
        seen.add(p.question);
      }
      if (dups) {
        level = "fail";
        detail += `; ${dups} duplicate question text(s)`;
      }
      if (info?.dataset_dir) {
        const dsFile = path.join(info.dataset_dir, "mini_dev_sqlite.json");
        if (!exists(dsFile)) {
          level = "fail";
          detail += `; dataset questions missing: ${dsFile}`;
        } else {
          const ds = loadDatasetQuestions(dsFile);
          const { problems, unmatchedDataset } = bindPaper(paper, ds);
          if (problems.length) {
            level = "fail";
            detail += `; bind: ${problems.slice(0, 3).join(" / ")}${problems.length > 3 ? ` (+${problems.length - 3})` : ""}`;
          } else {
            detail += `; dataset ${ds.length}, bound ${paper.length}, unmatched dataset ${unmatchedDataset}`;
          }
        }
      } else {
        detail += "; dataset alignment skipped (no dataset_dir)";
      }
      add("paper", level, detail);
    } catch (e) {
      add("paper", "fail", e.message);
    }
  } else {
    add("paper", "fail", "eval/questions.jsonl unresolved");
  }

  if (!ctx.dsh) add("dsh", "fail", "@deepseek-ai/dsh not found - pass --dsh-bin <lib/bin.js> or set DSH_EVAL_DSH_BIN");
  else add("dsh", "ok", `${ctx.dsh.binJs} (v${ctx.dsh.version ?? "?"}, via ${ctx.dsh.via})`);

  if (!ctx.dshHome) add("dsh-home", "fail", "DSH_HOME unresolved");
  else {
    const profDir = path.join(ctx.dshHome, "profiles", ctx.profile);
    const pkgFile = path.join(profDir, "package.json");
    if (!exists(pkgFile)) {
      add("profile-bundle", "fail", `profile "${ctx.profile}" not initialized at ${profDir} - first run would auto-create a bare profile without ${PROFILE_BUNDLE_REQUIRED}`);
    } else {
      let bundles = [];
      try {
        bundles = readJson(pkgFile).dsh?.profile?.bundles ?? [];
      } catch {
        /* unreadable profile manifest */
      }
      const bundleDir = path.join(profDir, "node_modules", PROFILE_BUNDLE_REQUIRED);
      if (!bundles.includes(PROFILE_BUNDLE_REQUIRED)) {
        add("profile-bundle", "fail", `${PROFILE_BUNDLE_REQUIRED} not in dsh.profile.bundles (${pkgFile}) - fix: dsh plugin --profile ${ctx.profile} add "<abs>/DSH-based Agent Service/${PROFILE_BUNDLE_REQUIRED}"`);
      } else if (!exists(bundleDir)) {
        add("profile-bundle", "fail", `bundles lists ${PROFILE_BUNDLE_REQUIRED} but ${bundleDir} is missing - reinstall it (dsh plugin add ...)`);
      } else {
        add("profile-bundle", "ok", `${PROFILE_BUNDLE_REQUIRED} present (${bundleDir})`);
      }
    }
  }

  const missingPatches = ctx.patches.filter((p) => !exists(p));
  if (!ctx.patches.length) add("patches", "fail", "no dsh patch files - pass --patch <yml> (default is dsh_dlr/dsh.patch.yml)");
  else if (missingPatches.length) add("patches", "fail", `patch file(s) missing: ${missingPatches.join(", ")}`);
  else add("patches", "ok", ctx.patches.join(", "));

  if (ctx.skillsDir) {
    if (exists(ctx.skillsDir)) add("skills", "ok", ctx.skillsDir);
    else add("skills", "warn", `skills dir missing: ${ctx.skillsDir} (the paradigm skill will not load)`);
  }

  const cred = readCredentials(ctx);
  if (!cred.apiKey) add("credentials", "fail", `DEEPSEEK_API_KEY missing - copy "dsh_dlr/.env.example" to ${cred.file} and fill it`);
  else add("credentials", "ok", `key loaded from ${cred.file}`);

  if (includeNetwork) {
    const st = await probeStatus(ctx.statusOrigin);
    if (!st.ok) {
      add("backend", "fail", `${ctx.statusOrigin}/status unreachable (${st.error}) - start it: bash "DSH-based Agent Service/scripts/start_backend.sh"`);
    } else {
      const s = st.status;
      const mismatch = info && s.scenario?.name && s.scenario.name !== info.name;
      const lance = s.lance?.tables ? Object.entries(s.lance.tables).map(([k, v]) => `${k}=${v}`).join(" ") : "n/a";
      add(
        "backend",
        mismatch ? "fail" : "ok",
        `scenario=${s.scenario?.name} graph=${s.graph?.backend}${s.graph?.fallback_reason ? `(fallback:${s.graph.fallback_reason})` : ""} lance=[${lance}] uptime=${s.uptime_sec}s` +
          (mismatch ? ` - MISMATCH: backend serves "${s.scenario.name}" but the paper scenario is "${info.name}"` : ""),
      );
    }
    const mcp = await probeMcp(ctx.mcpUrl);
    if (!mcp.ok) {
      add("mcp", "fail", `${ctx.mcpUrl}: ${mcp.error}`);
    } else {
      const missing = TOOLS_EXPECTED.filter((t) => !mcp.tools.includes(t));
      add("mcp", missing.length ? "fail" : "ok", `${mcp.tools.length} tools${missing.length ? `; missing: ${missing.join(", ")}` : ""}`);
    }
  }
  return checks;
}

/** Run the collector and throw if anything failed (runner preflight). */
export async function assertPreflight(ctx, { info = null, includeNetwork = true } = {}) {
  const checks = await collectChecks(ctx, { info, includeNetwork });
  const fails = checks.filter((c) => c.level === "fail");
  if (fails.length) {
    const { EvalError } = await import("./util.mjs");
    throw new EvalError(`preflight failed:\n  - ${fails.map((f) => `${f.id}: ${f.detail}`).join("\n  - ")}`);
  }
  return checks;
}

export async function doctorCommand(args) {
  const { loadContext } = await import("./paths.mjs");
  const ctx = loadContext(args, { lenient: true });
  const checks = await collectChecks(ctx, {});
  let failed = 0;
  let warned = 0;
  for (const c of checks) {
    const tag = c.level === "ok" ? "[OK]" : c.level === "warn" ? "[WARN]" : "[FAIL]";
    if (c.level === "fail") failed++;
    if (c.level === "warn") warned++;
    console.log(`${tag} ${c.id}: ${c.detail}`);
  }
  console.log(`\n${failed ? "FAILED" : "OK"} - ${checks.length} checks, ${warned} warning(s), ${failed} failure(s)`);
  if (args.json) console.log(JSON.stringify({ ok: failed === 0, checks }, null, 2));
  return failed ? 1 : 0;
}
