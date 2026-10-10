// Cloud-OpsBench 评分适配器 · 轨迹转换
// dsh run 目录（会话日志）→ 上游 reference trace 格式（喂 agents/cloudops_agent/evaluation.py）
//
// 上游读取路径: <score_root>/<systemDir>/<model>/<category>/<case>/<case>.json
//   systemDir: boutique | trainticket（train-ticket 的目录名）
// 字段（evaluation.py read_agent_case_for_evaluation 实核）:
//   顶层 final_answer（对象即可，parse_json_maybe 直接吃 dict）+ steps[]
//   steps[]: {step_id, action_type, action_name, action_input, observation, error, final_answer}
//
// 数据源 = dsh **会话日志**（多帧 zstd；--json ndjson 的工具结果 8KiB 截断，证据匹配必须用全文）。
// 观测等价性（规划期实核）：基准 MCP `str(tool._run(...))`（server.py:178）与参考 harness
// ToolExecutor（runtime/core.py:212）是同一转换 → 上游证据模式（literal/regex/json_path/…）
// 对本轨迹的 observation 语义原样成立。
//
// 用法: node convert.mjs <run_dir> [<run_dir>...] --score-root <dir> [--model dsh-tsm]
// DSH_HOME: env 优先；默认 <repo>/DSH-based Agent Service/.dsh-home
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { zstdDecodeFrames, findSessionLog } from "../../../DSH-based Agent Service/dsh-tsm-eval/lib/sessionlog.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/scenarios/cloudopsbench/eval
const ROOT = path.resolve(HERE, "..", "..", ".."); // 仓库根
const DSH_HOME = process.env.DSH_HOME || path.join(ROOT, "DSH-based Agent Service", ".dsh-home");

// ── 参数 ──
const args = process.argv.slice(2);
let scoreRoot = "";
let model = "dsh-tsm";
const runDirs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--score-root") scoreRoot = args[++i];
  else if (args[i] === "--model") model = args[++i];
  else runDirs.push(args[i]);
}
if (!scoreRoot || runDirs.length === 0) {
  console.error("用法: node convert.mjs <run_dir> [...] --score-root <dir> [--model dsh-tsm]");
  process.exit(2);
}

/** system → 上游目录名（train-ticket 的目录是 trainticket） */
const systemDir = (s) => (s === "train-ticket" || s === "trainticket" ? "trainticket" : "boutique");
const stripToolPrefix = (name) => name.replace(/^mcp__.*?__/, "");

/** 解析 run 目录的 meta.yml（只含平铺 key: value） */
function readMeta(runDir) {
  const meta = {};
  const p = path.join(runDir, "meta.yml");
  if (!fs.existsSync(p)) throw new Error(`缺 meta.yml: ${runDir}`);
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^([a-z_]+):\s*(.*)$/i);
    if (m) meta[m[1]] = m[2].trim();
  }
  for (const k of ["system", "category", "case"]) {
    if (!meta[k]) throw new Error(`meta.yml 缺 ${k}: ${p}`);
  }
  return meta;
}

/** 从 ndjson 取 sessionId + 各 callId 的状态（ndjson 的 tool_result.status；仅状态不受 8KiB 截断影响） */
function readNdjsonFacts(runDir) {
  const nd = fs.readdirSync(runDir).find((f) => f.endsWith(".ndjson"));
  if (!nd) throw new Error(`缺 ndjson: ${runDir}`);
  let sessionId = "";
  const status = new Map();
  for (const line of fs.readFileSync(path.join(runDir, nd), "utf8").split("\n").filter(Boolean)) {
    let d;
    try { d = JSON.parse(line); } catch { continue; }
    if (d.type === "session" && d.sessionId) sessionId = d.sessionId;
    if (d.type === "tool_result" && d.callId) status.set(d.callId, d.status);
  }
  if (!sessionId) throw new Error(`ndjson 无 session 事件（拿不到 sessionId）: ${nd}`);
  return { sessionId, status };
}

/** ndjson/tool 状态 → error 文本（成功值 → null；实测成功值 = "completed"） */
const OK_STATUS = new Set(["completed", "ok", "success", "done"]);
function normStatus(st) {
  if (st === undefined || st === null || st === true) return null;
  if (typeof st === "string" && OK_STATUS.has(st.toLowerCase())) return null;
  return String(st);
}

/** 会话日志 → reference trace 主体 */
function buildTrace(records, meta, statusByCall) {
  // ① tool/call → 按序步骤；tool/result 按 callId 回填 observation
  const results = new Map(); // callId → {text, isError}
  for (const r of records) {
    if (r.type !== "tool/result") continue;
    const d = r.data || {};
    const msg = d.message || {};
    // ⚠ callId 在 message 里（data.message.toolCallId；source.callId 兜底）——不在 data 顶层（踩过）
    const callId = d.toolCallId || msg.toolCallId || msg.source?.callId;
    const content = msg.content || [];
    const text = content.filter((b) => b?.type === "text").map((b) => b.text || "").join("\n");
    const isErr = d.isError === true || msg.isError === true || msg.source?.isError === true;
    if (callId) results.set(callId, { text, isErr });
  }

  const steps = [];
  let n = 0;
  for (const r of records) {
    if (r.type !== "tool/call") continue;
    const d = r.data || {};
    let input = {};
    if (typeof d.arguments === "string" && d.arguments.trim()) {
      try { input = JSON.parse(d.arguments); } catch { input = { _raw: d.arguments }; }
    } else if (d.arguments && typeof d.arguments === "object") {
      input = d.arguments;
    }
    const res = results.get(d.callId);
    const errFromNdjson = normStatus(statusByCall.get(d.callId));
    const err = (res && res.isErr) ? (res.text || "tool_error") : errFromNdjson;
    n += 1;
    steps.push({
      step_id: n,
      action_type: "tool",
      action_name: stripToolPrefix(String(d.name || "")),
      action_input: input,
      observation: res ? res.text : "",
      error: err,
      final_answer: null,
    });
  }

  // ② 最终答案：最后一条带 text 的 assistant/message；优先取**最后一个** ```json 围栏
  let finalAnswer = null;
  for (let i = records.length - 1; i >= 0 && finalAnswer === null; i--) {
    const r = records[i];
    if (r.type !== "assistant/message") continue;
    const blocks = r.data?.message?.content || [];
    const text = blocks.filter((b) => b?.type === "text").map((b) => b.text || "").join("\n").trim();
    if (!text) continue;
    const fences = [...text.matchAll(/```json\s*([\s\S]*?)```/g)];
    for (let k = fences.length - 1; k >= 0; k--) {
      try { finalAnswer = JSON.parse(fences[k][1].trim()); break; } catch { /* 试前一个围栏 */ }
    }
    if (finalAnswer === null && text.includes("top_3_predictions")) {
      try { finalAnswer = JSON.parse(text); } catch { /* 留 null，上游会记 unparsed */ }
    }
  }

  return {
    case_id: `${systemDir(meta.system)}/${meta.category}/${meta.case}`,
    system: meta.system,
    category: meta.category,
    model,
    stop_reason: "submit",
    final_answer: finalAnswer,
    steps,
  };
}

// ── 主流程 ──
const manifestPath = path.join(scoreRoot, "manifest.json");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : [];

for (const runDir of runDirs) {
  const meta = readMeta(runDir);
  const { sessionId, status } = readNdjsonFacts(runDir);
  const logPath = findSessionLog(DSH_HOME, sessionId);
  if (!logPath) {
    console.error(`[ERR] 找不到会话日志（dshHome=${DSH_HOME} session=${sessionId}）——${runDir}`);
    process.exit(1);
  }
  const records = zstdDecodeFrames(fs.readFileSync(logPath))
    .split("\n").filter(Boolean)
    .map((l) => { try { return JSON.parse(l); } catch { return null; } })
    .filter(Boolean);

  const trace = buildTrace(records, meta, status);
  const sysDir = systemDir(meta.system);
  const outDir = path.join(scoreRoot, sysDir, model, meta.category, meta.case);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `${meta.case}.json`);
  fs.writeFileSync(outFile, JSON.stringify(trace, null, 2) + "\n", "utf8");

  const key = `${sysDir}/${meta.category}/${meta.case}`;
  const entry = {
    case: key,
    run_dir: path.resolve(runDir),
    steps: trace.steps.length,
    has_final_answer: !!trace.final_answer,
    predictions: trace.final_answer?.top_3_predictions?.length ?? 0,
  };
  const idx = manifest.findIndex((m) => m.case === key);
  if (idx >= 0) manifest[idx] = entry; else manifest.push(entry);
  console.log(`[convert] ${key} → ${outFile}  steps=${entry.steps} final=${entry.has_final_answer ? "有" : "无"} preds=${entry.predictions}`);
}

fs.mkdirSync(scoreRoot, { recursive: true });
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`[convert] manifest → ${manifestPath}（共 ${manifest.length} 条）`);
