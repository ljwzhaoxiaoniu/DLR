// dsh session logs: multi-frame zstd jsonl (v4). Full forensics live here - the
// --json stream truncates strings at 8KiB / lines at 32KiB (except final), the
// session log does not. Frame-split logic ported from
// DSH-based Agent Service/scripts/decode_session_log.cjs.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ZSTD_MAGIC = [0x28, 0xb5, 0x2f, 0xfd];

export function hasZstd() {
  return typeof zlib.zstdDecompressSync === "function";
}

/** Split on zstd magic, decompress each frame, concatenate. */
export function zstdDecodeFrames(buf) {
  const cuts = [];
  for (let i = 0; i + 3 < buf.length; i++) {
    if (buf[i] === ZSTD_MAGIC[0] && buf[i + 1] === ZSTD_MAGIC[1] && buf[i + 2] === ZSTD_MAGIC[2] && buf[i + 3] === ZSTD_MAGIC[3]) {
      cuts.push(i);
    }
  }
  cuts.push(buf.length);
  const outs = [];
  let i = 0;
  while (i < cuts.length - 1) {
    let done = false;
    for (let j = i + 1; j < cuts.length; j++) {
      try {
        outs.push(zlib.zstdDecompressSync(buf.subarray(cuts[i], cuts[j])));
        i = j;
        done = true;
        break;
      } catch {
        /* frame boundary not here; try a later cut */
      }
    }
    if (!done) break;
  }
  return Buffer.concat(outs).toString("utf8");
}

/** Locate `<dshHome>/sessions/<slug>/<sessionId>/session.v<N>.jsonl.zstd`. */
export function findSessionLog(dshHome, sessionId) {
  if (!dshHome || !sessionId) return null;
  const root = path.join(dshHome, "sessions");
  if (!fs.existsSync(root)) return null;
  for (const slug of fs.readdirSync(root)) {
    const dir = path.join(root, slug, sessionId);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (/^session\.v\d+\.jsonl\.zstd$/.test(f)) return path.join(dir, f);
    }
  }
  return null;
}

/**
 * Decode + summarize. Returns
 * {ok, version, sessionId, cwd, model:{provider,model}, tokens{total,input,cacheRead,output},
 *  types{}, recordCount, bytes, toolCalls:[{name,argLen}], toolNames[], error}
 * full=true additionally carries toolCalls[].args (parsed arguments).
 */
export function readSessionFacts(logPath, { full = false } = {}) {
  if (!hasZstd()) return { ok: false, error: "node:zlib zstdDecompressSync unavailable (node >=22.15)" };
  let text;
  try {
    text = zstdDecodeFrames(fs.readFileSync(logPath));
  } catch (e) {
    return { ok: false, error: `decode failed: ${e.message}` };
  }
  const facts = {
    ok: true,
    version: null,
    sessionId: null,
    cwd: null,
    model: null,
    tokens: { total: 0, input: 0, cacheRead: 0, output: 0 },
    types: {},
    recordCount: 0,
    bytes: text.length,
    toolCalls: [],
    toolNames: [],
  };
  let firstTime = null;
  let lastTime = null;
  for (const line of text.split("\n")) {
    if (!line.trim()) continue;
    let o;
    try {
      o = JSON.parse(line);
    } catch {
      continue;
    }
    facts.recordCount++;
    const t = o.type;
    facts.types[t] = (facts.types[t] ?? 0) + 1;
    const d = o.data ?? {};
    const time = typeof o.time === "number" ? o.time : Date.parse(o.time ?? "");
    if (Number.isFinite(time)) {
      if (firstTime === null) firstTime = time;
      lastTime = time;
    }
    if (t === "session") {
      facts.version = o.version ?? d.version ?? null;
      facts.sessionId = o.id ?? d.id ?? null;
      facts.cwd = o.cwd ?? d.cwd ?? null;
    }
    if (t === "assistant/message" && d.usage) {
      facts.tokens.total += Number(d.usage.totalTokens ?? 0) || 0;
      facts.tokens.input += Number(d.usage.inputTokens ?? 0) || 0;
      facts.tokens.cacheRead += Number(d.usage.cacheReadTokens ?? 0) || 0;
      facts.tokens.output += Number(d.usage.outputTokens ?? 0) || 0;
    }
    if (t === "request/header" && !facts.model && d.header?.config) {
      facts.model = { provider: d.header.config.provider ?? null, model: d.header.config.model ?? null };
    }
    if (t === "tool/call") {
      const name = String(d.name ?? "?").replace("mcp__semantic-core__", "");
      const argLen = typeof d.arguments === "string" ? d.arguments.length : JSON.stringify(d.arguments ?? "").length;
      const call = { name, argLen };
      if (full) call.args = d.arguments;
      facts.toolCalls.push(call);
    }
  }
  facts.toolNames = facts.toolCalls.map((c) => c.name);
  if (firstTime !== null && lastTime !== null) facts.durationMs = lastTime - firstTime;
  return facts;
}
