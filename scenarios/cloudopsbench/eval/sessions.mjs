#!/usr/bin/env node
// Cloud-OpsBench 会话归组（评测包组件 · 与 grade.sh / stats.mjs 同列）
//
// 两个组的职责（dsh web 左侧列表；2026-10-11 语义定稿：并存不互斥）：
//   cloudopsbench-all   全量组 —— 跑过的 session 都在（超集；sync 例行补齐登记）
//   cloudopsbench       正式组 —— 再加挂「通过」（JRA=1）的 session（promote；不搬走，两处并存）
//
// 用法:
//   node sessions.mjs sync    [--results <dir>] [--dirs <run_dir>...] [--dry]
//       把 results/<轮次>/raw/<run>/ 里全部 session 登记进全量组（补登记 + 解除归档）
//   node sessions.mjs promote [--round <id前缀>] [--case <sys/cat/case>]... [--session <id前缀>]... [--dry]
//       默认：每题取最近一轮，「通过」（JRA=1）的 run 加挂进正式组（全量组不动，两处并存）
//       --case / --session 手动指定（可越过分档，即「认可」通道）
//   node sessions.mjs list
//       两组现状（session → 案例/轮次 反查）
//
// 改的是 <repo>/DSH-based Agent Service/.dsh-home/storages/workspace.json（--ws / DSH_HOME 可覆盖）。
// 写入前自动备份 workspace.json.bak-<stamp>；dsh web 重启后可见（workspace.json 在启动时读取）。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/scenarios/cloudopsbench/eval
const SCENARIO = path.resolve(HERE, "..");
const REPO = path.resolve(HERE, "..", "..", "..");

const ALL_TITLE = "cloudopsbench-all";
const FORMAL_TITLE = "cloudopsbench";

// ── 参数 ────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const cmd = argv[0];
let resultsDir = path.join(SCENARIO, "results");
let wsPath = process.env.DSH_HOME
  ? path.join(process.env.DSH_HOME, "storages", "workspace.json")
  : path.join(REPO, "DSH-based Agent Service", ".dsh-home", "storages", "workspace.json");
let dry = false;
let roundFilter = null;
const extraDirs = [];
const caseFilter = [];
const sessionFilter = [];
for (let i = 1; i < argv.length; i++) {
  const a = argv[i];
  if (a === "--dry") dry = true;
  else if (a === "--ws") wsPath = argv[++i];
  else if (a === "--results") resultsDir = argv[++i];
  else if (a === "--round") roundFilter = argv[++i];
  else if (a === "--dirs") { while (argv[i + 1] && !argv[i + 1].startsWith("--")) extraDirs.push(argv[++i]); }
  else if (a === "--case") caseFilter.push(normCase(argv[++i]));
  else if (a === "--session") sessionFilter.push(argv[++i]);
  else { console.error(`未知参数: ${a}`); process.exit(2); }
}
if (!["sync", "promote", "list"].includes(cmd)) {
  console.error("用法: node sessions.mjs <sync|promote|list> [选项…]（见文件头注释）");
  process.exit(2);
}

const normCase = (s) => String(s).replace(/train-ticket/g, "trainticket").replace(/\\/g, "/").trim();
const normPath = (p) => path.resolve(String(p)).replace(/\\/g, "/").toLowerCase();
const short = (s) => (s ? s.slice(0, 22) + "…" : "(无)");

// ── 扫描 run 目录（meta.yml + ndjson 的 session 事件 → sessionId）────
function readRun(dir) {
  const metaPath = path.join(dir, "meta.yml");
  if (!fs.existsSync(metaPath)) return null;
  const meta = fs.readFileSync(metaPath, "utf8");
  const g = (k) => (meta.match(new RegExp(`^${k}:\\s*(.+)$`, "m")) || [])[1]?.trim();
  const system = g("system"), category = g("category"), cs = g("case");
  if (!system || !category || !cs) return null;
  let sid = null;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".ndjson"))) {
    const text = fs.readFileSync(path.join(dir, f), "utf8");
    for (const line of text.split("\n")) {
      if (!line.includes('"type":"session"')) continue;
      try { const o = JSON.parse(line); if (o.sessionId) { sid = o.sessionId; break; } } catch { /* 截断行 */ }
    }
    if (sid) break;
  }
  return { dir: path.resolve(dir), dirNorm: normPath(dir), dirName: path.basename(dir),
           caseKey: normCase(`${system}/${category}/${cs}`), sessionId: sid };
}

// 全量扫描：results/<轮次>/raw/<run>/（+ --dirs 追加的散跑目录）
const runs = [];               // 全部扫到的 run
const byRunDir = new Map();    // dirNorm → run
const bySession = new Map();   // sessionId → run
const runsByRoundCase = new Map(); // "轮次|caseKey" → [run…]（按目录名排序，最后=最新 stamp）
function addRun(r, roundId) {
  runs.push(r);
  byRunDir.set(r.dirNorm, r);
  if (r.sessionId) bySession.set(r.sessionId, r);
  if (roundId) {
    const k = `${roundId}|${r.caseKey}`;
    if (!runsByRoundCase.has(k)) runsByRoundCase.set(k, []);
    runsByRoundCase.get(k).push(r);
  }
}
const roundIds = fs.existsSync(resultsDir)
  ? fs.readdirSync(resultsDir, { withFileTypes: true }).filter((e) => e.isDirectory())
      .map((e) => e.name).sort() : [];
for (const rid of roundIds) {
  const rawDir = path.join(resultsDir, rid, "raw");
  if (!fs.existsSync(rawDir)) continue;
  for (const ent of fs.readdirSync(rawDir, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const r = readRun(path.join(rawDir, ent.name));
    if (r) addRun(r, rid);
  }
}
for (const d of extraDirs) { const r = readRun(d); if (r) addRun(r, null); }

// ── 轮次评分（details.json → JRA；manifest.json → 被评分的 run_dir）──
function readRounds() {
  const out = [];
  for (const rid of roundIds) {
    if (roundFilter && !rid.startsWith(roundFilter)) continue;
    const rdir = path.join(resultsDir, rid);
    const detailFiles = fs.readdirSync(rdir).filter((f) => f.endsWith("_details.json"));
    if (!detailFiles.length) continue;
    const byCase = new Map();
    for (const f of detailFiles) {
      for (const d of JSON.parse(fs.readFileSync(path.join(rdir, f), "utf8"))) {
        const m = String(d.label_path || "").match(/process-label[/\\]([^/\\]+)[/\\]([^/\\]+)[/\\]/);
        if (!m) continue;
        byCase.set(normCase(`${m[1]}/${m[2]}/${d.case_name}`), Number(d.metrics?.JRA ?? 0));
      }
    }
    // 该轮 convert 的 manifest：case → 被评分的 run_dir
    const manifest = new Map();
    const mp = path.join(rdir, "traces", "manifest.json");
    if (fs.existsSync(mp)) {
      for (const e of JSON.parse(fs.readFileSync(mp, "utf8"))) manifest.set(normCase(e.case), e.run_dir);
    }
    out.push({ id: rid, byCase, manifest });
  }
  return out;
}

// 每题取最近一轮 → {caseKey: {round, jra, run|urlDir}}
function latestPerCase() {
  const latest = new Map();
  for (const r of readRounds()) {           // roundIds 已按字典序=时间序
    for (const [caseKey, jra] of r.byCase) {
      let run = null;
      const rd = r.manifest.get(caseKey);
      if (rd) run = byRunDir.get(normPath(rd)) || null;
      if (!run) { // 无 manifest 回退：该轮 raw 里同 case 的最新 stamp
        const cand = runsByRoundCase.get(`${r.id}|${caseKey}`) || [];
        run = [...cand].sort((a, b) => a.dirName.localeCompare(b.dirName)).pop() || null;
      }
      latest.set(caseKey, { round: r.id, jra, run });
    }
  }
  return latest;
}

// ── workspace.json ──────────────────────────────────────────────────
function loadWs() {
  const ws = JSON.parse(fs.readFileSync(wsPath, "utf8"));
  const W = ws.tables.workspaces;
  const find = (t) => Object.entries(W).find(([, w]) => w.title === t);
  const all = find(ALL_TITLE), formal = find(FORMAL_TITLE);
  if (!all || !formal) {
    console.error(`[ERR] ${wsPath} 里找不到组「${ALL_TITLE}」/「${FORMAL_TITLE}」（先在 web 里建组）`);
    process.exit(3);
  }
  return { ws, W, allId: all[0], formalId: formal[0] };
}
function saveWs(ws) {
  const st = new Date(), pad = (n) => String(n).padStart(2, "0");
  const stamp = `${pad(st.getMonth() + 1)}${pad(st.getDate())}_${pad(st.getHours())}${pad(st.getMinutes())}${pad(st.getSeconds())}`;
  fs.copyFileSync(wsPath, `${wsPath}.bak-${stamp}`);
  fs.writeFileSync(wsPath, JSON.stringify(ws, null, 2) + "\n", "utf8");
  console.log(`[ws] 已写 ${wsPath}（备份 .bak-${stamp}）`);
}
const unarchive = (ws, sid) => {
  const arr = ws.global.archivedSessionIds || [];
  const i = arr.indexOf(sid);
  if (i >= 0) { arr.splice(i, 1); return true; }
  return false;
};

// ── sync：登记进全量组 ──────────────────────────────────────────────
if (cmd === "sync") {
  const { ws, W, allId } = loadWs();
  const list = W[allId].sessionIds;
  let added = 0, unarch = 0, noSid = 0;
  for (const r of runs) {
    if (!r.sessionId) { noSid++; console.log(`  ! ${r.dirName}: ndjson 无 session 事件，跳过`); continue; }
    // 全量组 = 超集：跑过的都登记（已加挂正式组的照样保留在这里，两处并存）
    if (!list.includes(r.sessionId)) { list.push(r.sessionId); added++; console.log(`  + ${short(r.sessionId)}  ${r.caseKey}  ${r.dirName}`); }
    if (unarchive(ws, r.sessionId)) unarch++;
  }
  console.log(`[sync] 扫到 run ${runs.length}（无 session ${noSid}）· 新登记 ${added} · 解除归档 ${unarch} · 全量组共 ${list.length}`);
  if ((added || unarch) && !dry) saveWs(ws);
  else console.log(dry ? "[dry] 未写盘" : "[sync] 无变化");
}

// ── promote：移入正式组 ─────────────────────────────────────────────
else if (cmd === "promote") {
  const { ws, W, formalId } = loadWs();
  const formalList = W[formalId].sessionIds;

  // 目标集合
  const targets = []; // {caseKey, sessionId, round, jra, why}
  if (sessionFilter.length) {
    for (const pref of sessionFilter) {
      const hits = [...bySession.keys()].filter((s) => s.includes(pref));
      if (hits.length !== 1) { console.log(`  ! --session ${pref}: 命中 ${hits.length} 个（需唯一）`); continue; }
      const r = bySession.get(hits[0]);
      targets.push({ caseKey: r.caseKey, sessionId: r.sessionId, round: "(手动)", jra: null, why: "手动指定" });
    }
  } else if (caseFilter.length) {
    const latest = latestPerCase();
    for (const ck of caseFilter) {
      const e = latest.get(ck);
      if (!e) { console.log(`  ! --case ${ck}: 未找到（跑过吗？）`); continue; }
      if (!e.run?.sessionId) { console.log(`  ! --case ${ck}: run 无 session（${e.run?.dirName ?? "无 run"}）`); continue; }
      targets.push({ caseKey: ck, sessionId: e.run.sessionId, round: e.round, jra: e.jra, why: "手动指定" });
    }
  } else {
    const latest = latestPerCase();
    const passed = [...latest.entries()].filter(([, e]) => e.jra === 1)
      .sort((a, b) => a[0].localeCompare(b[0]));
    for (const [ck, e] of passed) {
      if (!e.run?.sessionId) { console.log(`  ! ${ck}: 通过但 run 无 session（${e.run?.dirName ?? "无 run"}），跳过`); continue; }
      targets.push({ caseKey: ck, sessionId: e.run.sessionId, round: e.round, jra: e.jra, why: "JRA=1" });
    }
  }
  if (!targets.length) { console.log("[promote] 无目标（名单空）"); process.exit(0); }

  let moved = 0, already = 0;
  for (const t of targets) {
    if (formalList.includes(t.sessionId)) {
      already++;
      console.log(`  = ${t.caseKey}  [${t.round} · ${t.jra == null ? "手动" : "JRA=" + t.jra}]  ${short(t.sessionId)}  已在正式组`);
      continue;
    }
    formalList.push(t.sessionId);
    unarchive(ws, t.sessionId); // 正式组要可见
    moved++;
    console.log(`  → ${t.caseKey}  [${t.round} · ${t.jra == null ? "手动" : "JRA=" + t.jra}]  ${short(t.sessionId)}  加挂正式（全量组不动）`);
  }
  formalList.sort();
  console.log(`[promote] 新加挂 ${moved} · 已在 ${already} · 正式组共 ${formalList.length}（全量与正式并存，不搬走）`);
  if (moved && !dry) saveWs(ws);
  else console.log(dry ? "[dry] 未写盘" : "[promote] 无变化");
  console.log("[提示] dsh web 重启后可见（bash \"DSH-based Agent Service/dsh_dlr/run_web.sh\"）");
}

// ── list ────────────────────────────────────────────────────────────
else if (cmd === "list") {
  const { ws, W, allId, formalId } = loadWs();
  const archived = new Set(ws.global.archivedSessionIds || []);
  const label = (sid) => {
    const r = bySession.get(sid);
    return r ? `${r.caseKey}  (${r.dirName})` : "(未在 results/--dirs 扫到)";
  };
  for (const [id, title] of [[allId, ALL_TITLE], [formalId, FORMAL_TITLE]]) {
    const l = W[id].sessionIds;
    console.log(`${title}（${l.length}）:`);
    for (const s of l) console.log(`  ${archived.has(s) ? "[归档] " : "       "}${short(s)}  ${label(s)}`);
  }
}
