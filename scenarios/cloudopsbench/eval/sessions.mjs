#!/usr/bin/env node
// Cloud-OpsBench 会话归组（评测包组件 · 与 grade.sh / stats.mjs 同列）
//
// 两个组的职责（dsh web 左侧列表）：
//   cloudopsbench-all   全量/默认组 —— 每个跑题 session 的默认落点（sync 例行补齐登记）
//   cloudopsbench       正式组 —— 只放「通过」（JRA=1）的 session（promote，认可才「搬」入）
// ★ 平台硬约束（2026-10-12 实锤）：一个 session 只能属于一个 workspace——dsh-workspace
//   启动时校验 sessionIds 全局不重叠；违反 = 整个工作区域加载失败（网页左侧列表全空，
//   session-controller 全 pending）。所以 promote 是「搬移」而非「加挂」，sync 会把
//   误入的重叠清出；saveWs 前有 assertDisjoint 断言兜底。
//
// 用法:
//   node sessions.mjs sync    [--results <dir>] [--dirs <run_dir>...] [--dry]
//       把 results/<轮次>/raw/<run>/ 里全部 session 登记进全量组（补登记 + 解除归档）；
//       已属其他组（正式/归档）的跳过——retire 过的 raw 配对会话不再捞回
//   node sessions.mjs promote [--round <id前缀>] [--case <sys/cat/case>]... [--session <id前缀>]... [--dry]
//       默认：每题取最近一轮，「通过」（JRA=1）的 run 移入正式组（从全量组搬出，不留副本）
//       --case / --session 手动指定（可越过分档，即「认可」通道）
//   node sessions.mjs adopt [--to <组名>] [--dry]
//       把「未分组」（未归档、不属于任何组、已落盘的持久会话）收进指定组（默认全量组）——
//       界面上「未分组」区里未落盘的空会话不在此列（等它落盘再收）
//   node sessions.mjs retire --strays [--session <id前缀>…] [--dry]
//       显示失效的旧会话改写 cwd 收进「归档」组。规则（dsh-workspace 实锤）：组员显示
//       资格 = 会话头部 cwd 归一后严格等于组 path；被删 run 目录的旧会话因此掉进界面
//       「未分组」且无法归组。retire = 帧级改写头部 cwd 到归档目录 + 文件搬进对应
//       bucket + 从原组摘出移入「归档」组（归档态不动）。全量备份到
//       tmp_scripts/cob_session_retire_<stamp>/（原文件 + manifest + restore.mjs）。
//   node sessions.mjs list
//       两组现状（session → 案例/轮次 反查）
//
// 改的是 <repo>/DSH-based Agent Service/.dsh-home/storages/workspace.json（--ws / DSH_HOME 可覆盖）。
// 写入前自动备份 workspace.json.bak-<stamp>；dsh web 重启后可见（workspace.json 在启动时读取）。
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url)); // …/scenarios/cloudopsbench/eval
const SCENARIO = path.resolve(HERE, "..");
const REPO = path.resolve(HERE, "..", "..", "..");

const ALL_TITLE = "cloudopsbench-all";
const FORMAL_TITLE = "cloudopsbench";
// 「归档」组 = 退休区：显示失效的旧会话改写 cwd 后收进来（见 retire 命令注释）
const ARCHIVE_TITLE = "归档";
const ARCHIVE_DIR = path.join(REPO, "DSH-based Agent Service", "dsh_cob-archive");

// retire 的还原脚本模板（写进备份目录供日后回滚；独立自包含）
const RESTORE_TEMPLATE = [
  "#!/usr/bin/env node",
  "// 还原 retire 搬档：cwd 改回 + 文件搬回原 bucket + 会话 id 搬回原组（并从「归档」组摘除）",
  "// 用法: node restore.mjs [--dry]（在备份目录里直接跑；跑完重启 dsh web）",
  'import fs from "node:fs";',
  'import path from "node:path";',
  'import zlib from "node:zlib";',
  'import { fileURLToPath } from "node:url";',
  'const HERE = path.dirname(fileURLToPath(import.meta.url));',
  'const REPO = path.resolve(HERE, "..", "..");',
  'const HOME = path.join(REPO, "DSH-based Agent Service", ".dsh-home");',
  'const SESS = path.join(HOME, "sessions");',
  'const WS = path.join(HOME, "storages", "workspace.json");',
  'const m = JSON.parse(fs.readFileSync(path.join(HERE, "manifest.json"), "utf8"));',
  'const dry = process.argv.includes("--dry");',
  'const ZM = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);',
  'function magicOffs(buf){ const a=[]; let i=buf.indexOf(ZM); while(i>=0){ a.push(i); i=buf.indexOf(ZM,i+1);} return a; }',
  'function decodeAll(buf){ const offs=magicOffs(buf); let out=""; for(let k=0;k<offs.length;k++){ const end=k+1<offs.length?offs[k+1]:buf.length; out+=zlib.zstdDecompressSync(buf.subarray(offs[k],end)).toString("utf8"); } return out; }',
  'function patchCwd(file,newCwd){ const buf=fs.readFileSync(file); const offs=magicOffs(buf); if(offs[0]!==0||offs.length<2) throw new Error("格式异常: "+file); for(const o of offs.slice(1)) zlib.zstdDecompressSync(buf.subarray(o)); const old=decodeAll(buf); const nl=old.indexOf("\\n"); const h=JSON.parse(old.slice(0,nl)); h.cwd=newCwd; const f1=zlib.zstdCompressSync(Buffer.from(JSON.stringify(h)+"\\n")); fs.writeFileSync(file, Buffer.concat([f1, buf.subarray(offs[1])])); }',
  'let n = 0;',
  'for (const it of m.items) {',
  '  const cur = path.join(SESS, it.newBucket, it.sid);',
  '  const f = path.join(cur, "session.v4.jsonl.zstd");',
  '  if (!fs.existsSync(f)) { console.log("skip(缺文件):", it.sid); continue; }',
  '  if (!dry) {',
  '    patchCwd(f, it.oldCwd);',
  '    const dst = path.join(SESS, it.oldBucket, it.sid);',
  '    fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.renameSync(cur, dst);',
  '    const pc = path.join(HOME, "storages", "session_projcache", "sessions", it.sid + ".json");',
  '    if (fs.existsSync(pc)) { const t = fs.readFileSync(pc, "utf8"); const o = JSON.stringify(it.newCwd), nn = JSON.stringify(it.oldCwd); if (t.includes(o)) fs.writeFileSync(pc, t.split(o).join(nn)); }',
  '  }',
  '  console.log((dry ? "[dry] " : "← ") + it.sid); n++;',
  '}',
  'if (!dry) {',
  '  const ws = JSON.parse(fs.readFileSync(WS, "utf8")); const W = ws.tables.workspaces;',
  '  const aid = Object.entries(W).find(([, w]) => w.title === "归档")?.[0];',
  '  for (const it of m.items) {',
  '    if (aid) { const i = W[aid].sessionIds.indexOf(it.sid); if (i >= 0) W[aid].sessionIds.splice(i, 1); }',
  '    for (const g of it.oldGroups) { const gid = Object.entries(W).find(([, w]) => w.title === g)?.[0]; if (gid && !W[gid].sessionIds.includes(it.sid)) W[gid].sessionIds.push(it.sid); }',
  '  }',
  '  fs.copyFileSync(WS, WS + ".bak-restore");',
  '  fs.writeFileSync(WS, JSON.stringify(ws, null, 2) + "\\n");',
  '  console.log("已还原 " + n + " 条（重启 dsh web 生效）");',
  '}',
].join("\n");

// ── 参数 ────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const cmd = argv[0];
let resultsDir = path.join(SCENARIO, "results");
let wsPath = process.env.DSH_HOME
  ? path.join(process.env.DSH_HOME, "storages", "workspace.json")
  : path.join(REPO, "DSH-based Agent Service", ".dsh-home", "storages", "workspace.json");
let dry = false;
let roundFilter = null;
let toGroup = null;
let straysFlag = false;
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
  else if (a === "--to") toGroup = argv[++i];
  else if (a === "--strays") straysFlag = true;
  else { console.error(`未知参数: ${a}`); process.exit(2); }
}
if (!["sync", "promote", "adopt", "retire", "list"].includes(cmd)) {
  console.error("用法: node sessions.mjs <sync|promote|adopt|retire|list> [选项…]（见文件头注释）");
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
/** 平台硬约束：sessionIds 全局不重叠（重叠 = 工作区域加载失败，左侧列表全空）——写盘前断言 */
function assertDisjoint(ws) {
  const seen = new Map();
  for (const w of Object.values(ws.tables.workspaces)) {
    for (const sid of w.sessionIds) {
      if (seen.has(sid)) {
        throw new Error(`[ERR] ${sid} 同时属于「${seen.get(sid)}」和「${w.title}」——dsh 工作区硬约束，拒绝写盘`);
      }
      seen.set(sid, w.title);
    }
  }
}
function saveWs(ws) {
  assertDisjoint(ws);
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
  // 平台硬约束：一个 session 只能属一个组——已属任何其他组（正式 / 归档 / 未来新增组）者
  // 全量组不登记、历史误入者清出。「不满→归档」口径（10-13）后，被 retire 的 session 仍是
  // results 扫描范围内的 raw 配对会话，必须在此跳过，否则 assertDisjoint 拒写。
  const otherOf = new Map(); // sessionId → 所属组名
  for (const [wid, w] of Object.entries(W)) {
    if (wid === allId) continue;
    for (const sid of (w.sessionIds || [])) otherOf.set(sid, w.title);
  }
  let added = 0, unarch = 0, noSid = 0, cleaned = 0, skipped = 0;
  for (const r of runs) {
    if (!r.sessionId) { noSid++; console.log(`  ! ${r.dirName}: ndjson 无 session 事件，跳过`); continue; }
    if (otherOf.has(r.sessionId)) {
      const i = list.indexOf(r.sessionId);
      if (i >= 0) { list.splice(i, 1); cleaned++; console.log(`  ~ ${short(r.sessionId)}  ${r.caseKey}  已属「${otherOf.get(r.sessionId)}」→ 从全量组清出（避重叠）`); }
      else skipped++;
      continue;
    }
    if (!list.includes(r.sessionId)) { list.push(r.sessionId); added++; console.log(`  + ${short(r.sessionId)}  ${r.caseKey}  ${r.dirName}`); }
    if (unarchive(ws, r.sessionId)) unarch++;
  }
  console.log(`[sync] 扫到 run ${runs.length}（无 session ${noSid}）· 新登记 ${added} · 清出 ${cleaned}（避重叠）· 跳过已归组 ${skipped} · 解除归档 ${unarch} · 全量组共 ${list.length}`);
  if ((added || unarch || cleaned) && !dry) saveWs(ws);
  else console.log(dry ? "[dry] 未写盘" : "[sync] 无变化");
}

// ── promote：移入正式组 ─────────────────────────────────────────────
else if (cmd === "promote") {
  const { ws, W, allId, formalId } = loadWs();
  const allList = W[allId].sessionIds;
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
    const i = allList.indexOf(t.sessionId);
    if (i >= 0) allList.splice(i, 1);
    unarchive(ws, t.sessionId); // 正式组要可见
    moved++;
    console.log(`  → ${t.caseKey}  [${t.round} · ${t.jra == null ? "手动" : "JRA=" + t.jra}]  ${short(t.sessionId)}  全量→正式（搬移：平台约束，不留副本）`);
  }
  formalList.sort();
  console.log(`[promote] 移入 ${moved} · 已在 ${already} · 正式组共 ${formalList.length} · 全量组剩 ${allList.length}`);
  if (moved && !dry) saveWs(ws);
  else console.log(dry ? "[dry] 未写盘" : "[promote] 无变化");
  console.log("[提示] dsh web 重启后可见（bash \"DSH-based Agent Service/dsh_dlr/run_web.sh\"）");
}

// ── adopt：把「未分组」的持久会话收进指定组 ─────────────────────────
else if (cmd === "adopt") {
  const { ws, W, allId } = loadWs();
  const targetId = toGroup ? Object.entries(W).find(([, w]) => w.title === toGroup)?.[0] : allId;
  if (!targetId) { console.error(`[ERR] 找不到组「${toGroup}」`); process.exit(3); }
  const grouped = new Set();
  for (const w of Object.values(W)) for (const s of w.sessionIds) grouped.add(s);
  const archived = new Set(ws.global.archivedSessionIds || []);
  // 盘上全部持久会话：sessions/<bucket>/<session-id>/session.v4.jsonl.zstd
  const root = path.join(path.dirname(wsPath), "..", "sessions");
  const logs = [];
  const walk = (dir) => {
    let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (!e.isDirectory()) continue;
      const p = path.join(dir, e.name);
      if (e.name.startsWith("session-")) {
        if (fs.existsSync(path.join(p, "session.v4.jsonl.zstd"))) logs.push({ id: e.name, bucket: path.basename(dir) });
      } else walk(p);
    }
  };
  walk(root);
  const todo = logs.filter((s) => !grouped.has(s.id) && !archived.has(s.id));
  console.log(`[adopt] 盘上持久会话 ${logs.length} · 未分组且未归档 ${todo.length} → 目标组「${W[targetId].title}」`);
  for (const s of todo) console.log(`  → ${s.id}  (cwd bucket: ${s.bucket})`);
  if (!todo.length) {
    console.log("（没有未分组的持久会话——界面上「未分组」里的多半是刚建的空会话，还没落盘；等有内容/落盘后再收）");
  } else if (dry) {
    console.log("[dry] 未写盘");
  } else {
    for (const s of todo) W[targetId].sessionIds.push(s.id);
    saveWs(ws);
  }
}

// ── retire：改写 cwd 收进「归档」组 ─────────────────────────────────
// 规则见文件头 retire 段。两阶段：先全量校验构建（不落盘，任一失败整体中止）；
// 再备份 + 落盘（备份目录 = tmp_scripts/cob_session_retire_<stamp>/，含 restore.mjs）
else if (cmd === "retire") {
  const { ws, W } = loadWs();
  const sessionsRoot = path.resolve(path.dirname(wsPath), "..", "sessions");
  const pcRoot = path.join(path.dirname(wsPath), "session_projcache", "sessions");
  const ZMAGIC = Buffer.from([0x28, 0xb5, 0x2f, 0xfd]);
  /** cwd 目录名 slug（dsh 的 bucket 命名：去冒号、反斜杠→连字符、空格→~0020） */
  const slug = (p) => "--" + p.replace(/:/g, "").replace(/\\/g, "-").replace(/ /g, "~0020") + "--";

  // 会话索引 sid → { dir, bucketDir, file }
  const idx = new Map();
  (function walk(d) {
    let ents; try { ents = fs.readdirSync(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if (!e.isDirectory()) continue;
      const p = path.join(d, e.name);
      if (e.name.startsWith("session-")) {
        const f = path.join(p, "session.v4.jsonl.zstd");
        if (fs.existsSync(f)) idx.set(e.name, { dir: p, bucketDir: d, file: f });
      } else walk(p);
    }
  })(sessionsRoot);

  const magicOffs = (buf) => { const a = []; let i = buf.indexOf(ZMAGIC); while (i >= 0) { a.push(i); i = buf.indexOf(ZMAGIC, i + 1); } return a; };
  /** 顺序解码全部 zstd 帧 → 全文（多帧拼接 = 会话日志格式） */
  function decodeAll(buf) {
    const offs = magicOffs(buf);
    if (offs[0] !== 0) throw new Error("非 zstd 流（首字节不是 magic）");
    let out = "";
    for (let k = 0; k < offs.length; k++) {
      const end = k + 1 < offs.length ? offs[k + 1] : buf.length;
      out += zlib.zstdDecompressSync(buf.subarray(offs[k], end)).toString("utf8");
    }
    return out;
  }
  /** 读头帧 cwd（校验用） */
  function headCwd(file) {
    const buf = fs.readFileSync(file);
    const offs = magicOffs(buf);
    if (offs[0] !== 0 || offs.length < 2) return null;
    try {
      const t = zlib.zstdDecompressSync(buf.subarray(0, offs[1])).toString("utf8");
      return JSON.parse(t.slice(0, t.indexOf("\n"))).cwd ?? null;
    } catch { return null; }
  }
  /** 帧级重写头帧 cwd：重压缩第一帧，其余字节原样；返回 { oldCwd, out } */
  function rewriteHeadCwd(file, newCwd) {
    const buf = fs.readFileSync(file);
    const offs = magicOffs(buf);
    if (offs[0] !== 0 || offs.length < 2) throw new Error("非多帧 zstd 会话文件");
    for (const o of offs.slice(1)) zlib.zstdDecompressSync(buf.subarray(o)); // 每个 magic 均须可解（防伪 magic 边界误判）
    const oldFull = decodeAll(buf);
    const nl = oldFull.indexOf("\n");
    const header = JSON.parse(oldFull.slice(0, nl));
    if (header.type !== "session" || typeof header.cwd !== "string") throw new Error("头帧格式异常");
    const oldCwd = header.cwd;
    header.cwd = newCwd;
    const newF1 = zlib.zstdCompressSync(Buffer.from(JSON.stringify(header) + "\n"));
    const out = Buffer.concat([newF1, buf.subarray(offs[1])]);
    // 语义校验：仅头帧 cwd 变化，其余字符级一致
    const newFull = decodeAll(out);
    const nl2 = newFull.indexOf("\n");
    if (newFull.slice(nl2) !== oldFull.slice(nl)) throw new Error("帧尾部校验不通过");
    const h2 = JSON.parse(newFull.slice(0, nl2));
    const a = { ...h2 }, b = { ...header };
    delete a.cwd; delete b.cwd;
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error("头帧字段校验不通过");
    return { oldCwd, out };
  }

  // ── 目标收集：--session 显式 / 默认（--strays）全库扫「cwd 失效或与组 path 不符」的成员 ──
  const targets = []; // { sid, from }
  const seen = new Set();
  if (sessionFilter.length) {
    for (const pref of sessionFilter) {
      const hits = [...idx.keys()].filter((s) => s.includes(pref));
      if (hits.length !== 1) { console.log(`  ! --session ${pref}: 命中 ${hits.length} 个（需唯一）`); continue; }
      const sid = hits[0];
      const g = Object.values(W).find((w) => w.title !== ARCHIVE_TITLE && w.sessionIds.includes(sid));
      targets.push({ sid, from: g ? g.title : null });
      seen.add(sid);
    }
  } else {
    for (const w of Object.values(W)) {
      if (w.title === ARCHIVE_TITLE) continue;
      for (const sid of w.sessionIds) {
        if (seen.has(sid)) continue; seen.add(sid);
        const rec = idx.get(sid);
        const c = rec ? headCwd(rec.file) : null;
        const ok = c && fs.existsSync(c) && normPath(c) === normPath(w.path);
        if (!ok) targets.push({ sid, from: w.title });
      }
    }
  }
  console.log(`[retire] 目标 ${targets.length} 条 → 「${ARCHIVE_TITLE}」（${ARCHIVE_DIR}）`);
  if (!targets.length) process.exit(0);

  // ── 阶段 A：全部校验 + 构建（不落盘）──
  const ops = [];
  let bad = 0;
  for (const t of targets) {
    const rec = idx.get(t.sid);
    if (!rec) { console.log(`  ! ${short(t.sid)}  磁盘无文件，跳过`); bad++; continue; }
    try {
      const { oldCwd, out } = rewriteHeadCwd(rec.file, ARCHIVE_DIR);
      ops.push({ ...t, rec, oldCwd, out });
      console.log(`  ✓ ${short(t.sid)}  [${t.from}]  ${oldCwd}`);
    } catch (e) {
      bad++;
      console.log(`  ✗ ${short(t.sid)}  校验失败：${e.message}`);
    }
  }
  if (bad) { console.error(`[retire] ${bad} 条未通过校验——整体中止，未做任何改动`); process.exit(1); }
  if (dry) { console.log("[dry] 未落盘"); process.exit(0); }

  // ── 阶段 B：备份 + 落盘 ──
  const st = new Date(), pad = (n) => String(n).padStart(2, "0");
  const stamp = `${st.getFullYear()}${pad(st.getMonth() + 1)}${pad(st.getDate())}_${pad(st.getHours())}${pad(st.getMinutes())}${pad(st.getSeconds())}`;
  const bkDir = path.join(REPO, "tmp_scripts", `cob_session_retire_${stamp}`);
  const newBucket = slug(ARCHIVE_DIR);
  const newBucketDir = path.join(sessionsRoot, newBucket);
  fs.mkdirSync(path.join(bkDir, "backup"), { recursive: true });
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
  fs.mkdirSync(newBucketDir, { recursive: true });
  fs.copyFileSync(wsPath, path.join(bkDir, "workspace.json.bak"));
  const manifest = { movedAt: new Date().toISOString(), archiveDir: ARCHIVE_DIR, archiveSlug: newBucket, items: [] };
  for (const op of ops) {
    const dest = path.join(newBucketDir, op.sid);
    if (fs.existsSync(dest)) throw new Error(`目标已存在：${dest}`);
  }
  for (const op of ops) {
    fs.copyFileSync(op.rec.file, path.join(bkDir, "backup", `${op.sid}.zstd`));
    fs.writeFileSync(op.rec.file, op.out);
    const pc = path.join(pcRoot, `${op.sid}.json`);
    if (fs.existsSync(pc)) {
      const t = fs.readFileSync(pc, "utf8");
      const oEnc = JSON.stringify(op.oldCwd), nEnc = JSON.stringify(ARCHIVE_DIR);
      if (t.includes(oEnc)) fs.writeFileSync(pc, t.split(oEnc).join(nEnc));
    }
    const dest = path.join(newBucketDir, op.sid);
    fs.renameSync(op.rec.dir, dest);
    try { fs.rmdirSync(op.rec.bucketDir); } catch { /* 非空则留 */ }
    manifest.items.push({ sid: op.sid, oldCwd: op.oldCwd, newCwd: ARCHIVE_DIR, oldBucket: path.basename(op.rec.bucketDir), newBucket, oldGroups: op.from ? [op.from] : [] });
    console.log(`  → ${short(op.sid)}  ${op.oldCwd} → ${ARCHIVE_DIR}`);
  }
  // workspace.json：「归档」组建/取 → 迁名单
  let aid = Object.entries(W).find(([, w]) => w.title === ARCHIVE_TITLE)?.[0];
  const now = new Date().toISOString();
  if (!aid) {
    aid = crypto.randomUUID();
    W[aid] = { path: ARCHIVE_DIR, title: ARCHIVE_TITLE, sessionIds: [], createdAt: now, updatedAt: now };
    ws.global.workspaceIds.push(aid);
    console.log(`[ws] 新建组「${ARCHIVE_TITLE}」 ${aid}`);
  }
  for (const op of ops) {
    for (const w of Object.values(W)) {
      if (w.title === ARCHIVE_TITLE) continue;
      const i = w.sessionIds.indexOf(op.sid);
      if (i >= 0) { w.sessionIds.splice(i, 1); w.updatedAt = now; }
    }
    if (!W[aid].sessionIds.includes(op.sid)) W[aid].sessionIds.push(op.sid);
  }
  W[aid].updatedAt = now;
  saveWs(ws);
  // 复核 + 备份清单与还原脚本
  let ver = 0;
  for (const op of ops) {
    if (headCwd(path.join(newBucketDir, op.sid, "session.v4.jsonl.zstd")) === ARCHIVE_DIR) ver++;
  }
  fs.writeFileSync(path.join(bkDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  fs.writeFileSync(path.join(bkDir, "restore.mjs"), RESTORE_TEMPLATE);
  console.log(`[retire] 完成 ${ops.length} 条 · 复核 cwd ${ver}/${ops.length} · 备份/还原：${bkDir}`);
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
  const rows = [[allId, ALL_TITLE], [formalId, FORMAL_TITLE]];
  const aEnt = Object.entries(W).find(([, w]) => w.title === ARCHIVE_TITLE);
  if (aEnt) rows.push([aEnt[0], ARCHIVE_TITLE]);
  for (const [id, title] of rows) {
    const l = W[id].sessionIds;
    console.log(`${title}（${l.length}）:`);
    for (const s of l) console.log(`  ${archived.has(s) ? "[归档] " : "       "}${short(s)}  ${label(s)}`);
  }
}
