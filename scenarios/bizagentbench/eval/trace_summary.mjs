// Inspect a BizAgentBench case directory: compact trajectory + final world.
// Usage: node eval/trace_summary.mjs <runs/xxx/case_NNN__trial0>
import fs from "node:fs";
import path from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("usage: node trace_summary.mjs <case_dir>");
  process.exit(1);
}
const read = (name) => JSON.parse(fs.readFileSync(path.join(dir, name), "utf8"));
const clip = (s, n = 400) => {
  if (s == null) return "";
  const text = typeof s === "string" ? s : JSON.stringify(s);
  return text.length > n ? text.slice(0, n) + "…" : text;
};

const trajName = fs.existsSync(path.join(dir, "trajectory.json"))
  ? "trajectory.json"
  : "trajectory_partial.json";
const raw = read(trajName);
const traj = Array.isArray(raw) ? { messages: raw } : raw;
const result = fs.existsSync(path.join(dir, "result.json")) ? read("result.json") : null;
const world = read("final_world.json");

console.log(
  `source=${trajName} task=${traj.task_id ?? "?"} termination=${traj.termination_reason ?? "?"} duration=${Math.round(traj.duration ?? 0)}s`,
);
if (result) {
  const v = result.verification || {};
  console.log(`classification=${result.classification} tool_calls=${result.actual_tool_calls} tool_errors=${result.tool_errors}`);
  console.log(`strict=${v.strict_success} G=${v.goal_success} P=${v.process_success} F=${v.protection_success}`);
  console.log(`failed(${v.failed?.length ?? 0}): ${(v.failed || []).join(", ")}`);
}
console.log("\n=== trajectory ===");
for (const [i, m] of (traj.messages || []).entries()) {
  const who = m.role === "assistant" ? "AGENT" : m.role === "user" ? "USER " : "TOOL ";
  if (m.content && String(m.content).trim()) console.log(`${String(i).padStart(3)} ${who} ${clip(m.content, 500)}`);
  for (const c of m.tool_calls || []) console.log(`${String(i).padStart(3)} ${who} -> ${c.name} ${clip(c.arguments, 300)}`);
}
console.log("\n=== final world ===");
console.log("minute:", world.minute, "case_outcome:", JSON.stringify(world.case_outcome).slice(0, 200));
