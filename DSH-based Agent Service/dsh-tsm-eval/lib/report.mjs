// report.json / report.md: result (by ruling, by db, by paper caliber source) +
// process (means, evidence-chain usage) + forensics (session-log path and facts)
// + invalid-round split + a baseline_key anchoring round-to-round diffs (route 3).
// Grade's questions.csv is the single judge: its columns are embedded verbatim.
import fs from "node:fs";
import path from "node:path";
import { EvalError, sha1Text, sha1File, readJson, exists } from "./util.mjs";
import { CSV_COLUMNS, readRunCsv } from "./csv.mjs";
import { readRunEvents, finalAnswerMarker } from "./ndjson.mjs";
import { derivedFields } from "./parity.mjs";
import { classifyRound } from "./flags.mjs";
import { classifyDshErr, probeStatus } from "./precheck.mjs";
import { findSessionLog, readSessionFacts, hasZstd } from "./sessionlog.mjs";
import { readPaper } from "./paper.mjs";
import { loadContext } from "./paths.mjs";
import { runCapture } from "./proc.mjs";

const RULING_LABEL = { CORRECT: "✅ 正确", OVERTURNED: "🔁 翻盘", WRONG: "❌ 错误", PENDING: "⚠️ 待仲裁" };
const VERDICTS = ["PASS", "FAIL", "UNCERTAIN", "GOLD_ERR"];
const RULINGS = ["CORRECT", "OVERTURNED", "WRONG", "PENDING"];

const EVIDENCE_TOOLS = {
  dlr_search_sop: "l3_sop",
  dlr_search_consensus: "l2_consensus",
  dlr_semantic_query: "l1_semantic",
  get_pe_mapping: "pe_mapping",
  get_le_attrs: "le_attrs",
  get_full_data_info: "full_data_info",
  execute_sql: "execute_sql",
};

function evidenceOf(ev) {
  const names = new Set(ev.trace.map((t) => t.tool));
  const out = { final_answer_marker: !!finalAnswerMarker(ev.final), evidence_sql_line: /Evidence SQL/i.test(ev.final) };
  for (const [tool, key] of Object.entries(EVIDENCE_TOOLS)) out[key] = names.has(tool);
  return out;
}

async function gitInfo(repoRoot) {
  if (!repoRoot) return null;
  const head = await runCapture("git", ["rev-parse", "--short", "HEAD"], { cwd: repoRoot, timeoutMs: 5000 });
  if (head.rc !== 0) return null;
  const st = await runCapture("git", ["status", "--porcelain"], { cwd: repoRoot, timeoutMs: 8000 });
  return { commit: head.out.trim(), dirty: st.out.trim().length > 0 };
}

export async function buildReport({ runDir, ctx, opts = {} }) {
  const { noSession = false, strictCsv = false } = opts;
  const runJsonPath = path.join(runDir, "run.json");
  const runMeta = exists(runJsonPath) ? readJson(runJsonPath) : null;

  // ── grade output (single judge) ──
  const csvPath = path.join(runDir, "questions.csv");
  let csvRows = null;
  let csvColumns = null;
  if (exists(csvPath)) {
    csvRows = readRunCsv(runDir);
    csvColumns = csvRows.length ? Object.keys(csvRows[0]) : null;
    const missing = CSV_COLUMNS.filter((c) => !(csvColumns ?? []).includes(c));
    if (missing.length) {
      const msg = `questions.csv columns drifted; missing: ${missing.join(", ")}`;
      if (strictCsv) throw new EvalError(msg);
      console.error(`[report] WARN ${msg}`);
    }
  }
  const byLog = new Map((csvRows ?? []).map((r) => [r.log, r]));

  // ── events ──
  const events = readRunEvents(runDir);

  // ── paper join (by exact question text; no dataset needed) ──
  let paperByText = null;
  if (ctx?.paperPath && exists(ctx.paperPath)) {
    paperByText = new Map(readPaper(ctx.paperPath).map((p) => [p.question, p]));
  }

  // ── env fingerprint ──
  const git = await gitInfo(ctx?.repoRoot);
  const patches = (ctx?.patches ?? []).map((p) => ({ path: p, sha1: exists(p) ? sha1File(p) : null }));
  const paperSha = ctx?.paperPath && exists(ctx.paperPath) ? sha1File(ctx.paperPath) : null;
  const paperLines = paperByText ? paperByText.size : null;
  const status = ctx?.statusOrigin ? await probeStatus(ctx.statusOrigin) : { ok: false, error: "no origin" };
  let model = null;
  let presetsPending = false;

  // ── per-question assembly ──
  const questions = [];
  for (const [file, ev] of events) {
    const errFile = path.join(runDir, "raw", file.replace(/\.ndjson$/, ".err"));
    let errFatal = [];
    if (exists(errFile)) {
      const cls = classifyDshErr(fs.readFileSync(errFile, "utf8"));
      errFatal = cls.fatal;
      if (cls.noise.some((l) => l.includes("preset-dlr"))) presetsPending = true;
    }
    const round = classifyRound({ ev, errFatal });
    const csv = byLog.get(`raw/${file}`) ?? null;
    let csvStale = false;
    if (csv) {
      const mine = derivedFields(ev);
      csvStale = Object.keys(mine).some((k) => mine[k] !== (csv[k] ?? ""));
    }
    const paperItem = paperByText && csv ? (paperByText.get(csv.question) ?? null) : null;

    let sessionLog = null;
    let sessionFacts = null;
    if (!noSession && ev.session && ctx?.dshHome) {
      const p = findSessionLog(ctx.dshHome, ev.session);
      if (p) {
        sessionLog = p;
        sessionFacts = readSessionFacts(p);
        if (sessionFacts?.model?.model && !model) model = sessionFacts.model.model;
      }
    }

    questions.push({
      qid: ev.qid,
      file,
      session: ev.session || null,
      session_log: sessionLog,
      session_log_decoded: !!sessionFacts?.ok,
      csv,
      paper: paperItem
        ? { expected: paperItem.expected, source: paperItem.source, source_kind: paperItem.sourceKind }
        : null,
      process: {
        steps: ev.steps,
        tools: ev.tools,
        tool_errors: ev.toolErrors,
        tokens: ev.tokens,
        tool_sequence: ev.trace.map((t) => t.tool),
        sql_count: ev.sqls.length,
        last_sql_char_len: ev.lastSql.length,
        ndjson_truncated: ev.truncatedLines > 0,
        unknown_event_types: Object.keys(ev.unknownTypes).length ? ev.unknownTypes : undefined,
        final_answer_marker_ok: !!finalAnswerMarker(ev.final),
        evidence: evidenceOf(ev),
      },
      flags: {
        invalid: round.invalid,
        invalid_kind: round.invalid ? round.kind : null,
        invalid_detail: round.invalid ? round.detail : null,
        csv_stale: csvStale || undefined,
        err_fatal: errFatal.length ? errFatal : undefined,
      },
    });
  }
  questions.sort((a, b) => (a.qid ?? 0) - (b.qid ?? 0));

  // ── aggregates ──
  const scored = questions.filter((q) => q.csv && q.csv.ruling);
  const validScored = scored.filter((q) => !q.flags.invalid);
  const tally = (arr, key, val) => arr.filter((q) => q.csv?.[key] === val).length;
  const byRuling = Object.fromEntries(RULINGS.map((r) => [r, tally(scored, "ruling", r)]));
  const byVerdict = Object.fromEntries(VERDICTS.map((v) => [v, tally(scored, "verdict", v)]));
  const correct = byRuling.CORRECT + byRuling.OVERTURNED;
  const accuracyValid = validScored.length ? correct / validScored.length : null;
  const accuracyRaw = questions.length ? correct / questions.length : null;

  const byDbMap = new Map();
  for (const q of questions) {
    const db = q.csv?.db ?? "(unscored)";
    const m = byDbMap.get(db) ?? { db, total: 0, correct: 0, overturned: 0, wrong: 0, pending: 0, invalid: 0 };
    m.total++;
    if (q.flags.invalid) m.invalid++;
    if (q.csv?.ruling === "CORRECT") m.correct++;
    if (q.csv?.ruling === "OVERTURNED") m.overturned++;
    if (q.csv?.ruling === "WRONG") m.wrong++;
    if (q.csv?.ruling === "PENDING") m.pending++;
    byDbMap.set(db, m);
  }
  const bySourceKind = ["gold", "L3"].map((kind) => {
    const qs = questions.filter((q) => q.paper?.source_kind === kind);
    const ok = qs.filter((q) => q.csv?.ruling === "CORRECT" || q.csv?.ruling === "OVERTURNED").length;
    return { source_kind: kind, total: qs.length, correct: ok, accuracy: qs.length ? ok / qs.length : null };
  });

  const valid = questions.filter((q) => !q.flags.invalid);
  const avg = (arr, f) => (arr.length ? Math.round(arr.reduce((n, q) => n + f(q), 0) / arr.length) : 0);
  const tokSum = valid.reduce(
    (a, q) => ({
      total: a.total + q.process.tokens.total,
      input: a.input + q.process.tokens.input,
      cache_read: a.cache_read + q.process.tokens.cacheRead,
      output: a.output + q.process.tokens.output,
    }),
    { total: 0, input: 0, cache_read: 0, output: 0 },
  );
  const evidenceUse = {};
  for (const key of Object.keys(EVIDENCE_TOOLS).map((t) => EVIDENCE_TOOLS[t]).concat(["final_answer_marker", "evidence_sql_line"])) {
    evidenceUse[key] = valid.filter((q) => q.process.evidence[key]).length;
  }

  const env = {
    git,
    dsh_version: ctx?.dsh?.version ?? null,
    node: process.version,
    profile: ctx?.profile ?? null,
    model,
    patches,
    skills_dir: ctx?.skillsDir ?? null,
    backend: {
      url: ctx?.statusOrigin ?? null,
      status_ok: status.ok,
      scenario: status.ok ? { name: status.status?.scenario?.name, dir: status.status?.scenario?.dir } : null,
      graph_backend: status.ok ? status.status?.graph?.backend : null,
      lance_tables: status.ok ? status.status?.lance?.tables : null,
    },
    scenario: ctx?.scenario ? { name: ctx.scenario ? path.basename(ctx.scenario.dir) : null, dir: ctx.scenario.dir, source: ctx.scenario.source } : null,
    paper: ctx?.paperPath ? { path: ctx.paperPath, sha1: paperSha, lines: paperLines } : null,
    presets_pending: presetsPending,
  };
  const baselineKey = sha1Text(
    JSON.stringify({
      git: git?.commit ?? null,
      dsh: env.dsh_version,
      model: env.model,
      patches: patches.map((p) => p.sha1),
      scenario: env.scenario?.dir ?? null,
      paper: paperSha,
    }),
  );

  const report = {
    schema: "dsh-tsm-eval/report@1",
    generated_at: new Date().toISOString(),
    run: runMeta
      ? { id: runMeta.id ?? null, dir: runDir, scope: runMeta.scope ?? null, args: runMeta.args ?? null, started_at: runMeta.started_at ?? null, ended_at: runMeta.ended_at ?? null }
      : { id: path.basename(runDir), dir: runDir, scope: null, args: null, started_at: null, ended_at: null },
    env,
    baseline_key: baselineKey,
    counts: {
      planned: runMeta?.questions?.length ?? questions.length,
      artifacts: questions.length,
      valid: valid.length,
      invalid: questions.length - valid.length,
      scored: scored.length,
      csv_stale: questions.filter((q) => q.flags.csv_stale).length,
      unscored: questions.filter((q) => !q.csv).length,
      csv_only: (csvRows ?? []).filter((r) => !events.has(String(r.log).replace(/^raw\//, ""))).length,
    },
    results: {
      by_ruling: byRuling,
      by_verdict: byVerdict,
      accuracy_valid: accuracyValid,
      accuracy_raw: accuracyRaw,
      by_db: [...byDbMap.values()].sort((a, b) => a.db.localeCompare(b.db)),
      by_source_kind: bySourceKind,
    },
    process: {
      steps_avg: avg(valid, (q) => q.process.steps),
      tools_avg: avg(valid, (q) => q.process.tools),
      tool_errors_total: valid.reduce((n, q) => n + q.process.tool_errors, 0),
      tokens_total: tokSum,
      tokens_avg: valid.length ? Math.round(tokSum.total / valid.length) : 0,
      evidence_usage: evidenceUse,
      evidence_usage_base: valid.length,
    },
    invalid_rounds: questions
      .filter((q) => q.flags.invalid)
      .map((q) => ({ qid: q.qid, file: q.file, kind: q.flags.invalid_kind, detail: q.flags.invalid_detail })),
    questions,
  };
  return report;
}

const pct = (x) => (x === null || x === undefined ? "-" : `${(x * 100).toFixed(1)}%`);

export function renderMarkdown(r) {
  const L = [];
  L.push(`# 考试报告（dsh-tsm-eval）`);
  L.push("");
  L.push(`目录：\`${r.run.dir}\` ｜ 生成 ${r.generated_at}${r.run.scope ? ` ｜ scope ${r.run.scope}` : ""}`);
  L.push("");
  L.push(`## 环境指纹（baseline_key \`${r.baseline_key.slice(0, 12)}\`）`);
  L.push("");
  L.push(`- 场景 **${r.env.scenario?.name ?? "?"}**（${r.env.scenario?.dir ?? "?"}）｜ 考卷 ${r.env.paper?.lines ?? "?"} 行（sha1 \`${(r.env.paper?.sha1 ?? "").slice(0, 12)}\`）`);
  L.push(`- dsh **${r.env.dsh_version ?? "?"}** ｜ 模型 **${r.env.model ?? "?"}** ｜ profile \`${r.env.profile ?? "?"}\` ｜ node ${r.env.node}`);
  L.push(`- git \`${r.env.git?.commit ?? "?"}\`${r.env.git?.dirty ? "（dirty）" : ""} ｜ 后端 ${r.env.backend.status_ok ? `ok（${r.env.backend.graph_backend}，scenario=${r.env.backend.scenario?.name}）` : "不可达"}`);
  L.push(`- 补丁：${r.env.patches.map((p) => `${path.basename(p.path)}@${(p.sha1 ?? "?").slice(0, 8)}`).join(" ｜ ") || "无"}`);
  L.push("");
  L.push(`## 结果（判定以 tsm grade 为准）`);
  L.push("");
  L.push(`| 评定 | 数量 | ｜ 判定 | 数量 |`);
  L.push(`|---|---|---|---|`);
  const rl = RULINGS.map((x) => `${RULING_LABEL[x]} ${r.results.by_ruling[x]}`);
  const vd = VERDICTS.map((v) => `${v} ${r.results.by_verdict[v]}`);
  for (let i = 0; i < Math.max(rl.length, vd.length); i++) {
    L.push(`| ${rl[i] ?? ""} | | ｜ ${vd[i] ?? ""} | |`);
  }
  L.push("");
  L.push(`- **正确率（有效轮）：${pct(r.results.accuracy_valid)}**（✅+🔁 / 有效已判）｜ 原始：${pct(r.results.accuracy_raw)}（含无效轮）`);
  L.push(`- 题数：计划 ${r.counts.planned} ｜ 产物 ${r.counts.artifacts} ｜ 有效 ${r.counts.valid} ｜ 无效 ${r.counts.invalid} ｜ 已判 ${r.counts.scored} ｜ 陈旧 CSV ${r.counts.csv_stale}`);
  L.push("");
  L.push(`### 按口径来源`);
  L.push("");
  L.push(`| 来源 | 题数 | 正确（✅+🔁） | 正确率 |`);
  L.push(`|---|---|---|---|`);
  for (const s of r.results.by_source_kind) L.push(`| ${s.source_kind} | ${s.total} | ${s.correct} | ${pct(s.accuracy)} |`);
  L.push("");
  L.push(`### 分库`);
  L.push("");
  L.push(`| 库 | 题数 | ✅ | 🔁 | ❌ | ⚠️ | 无效 |`);
  L.push(`|---|---|---|---|---|---|---|`);
  for (const d of r.results.by_db) L.push(`| ${d.db} | ${d.total} | ${d.correct} | ${d.overturned} | ${d.wrong} | ${d.pending} | ${d.invalid} |`);
  L.push("");
  if (r.invalid_rounds.length) {
    L.push(`## 无效轮（${r.invalid_rounds.length}，剔除出有效分母）`);
    L.push("");
    L.push(`| qid | 类型 | 说明 | 文件 |`);
    L.push(`|---|---|---|---|`);
    for (const iv of r.invalid_rounds) L.push(`| ${iv.qid} | ${iv.kind} | ${iv.detail ?? ""} | ${iv.file} |`);
    L.push("");
  }
  L.push(`## 过程（有效轮口径）`);
  L.push("");
  L.push(`- 步数均值 **${r.process.steps_avg}** ｜ 工具均值 **${r.process.tools_avg}** ｜ 工具错误合计 **${r.process.tool_errors_total}**`);
  L.push(`- token 合计 **${r.process.tokens_total.total.toLocaleString()}**（input ${r.process.tokens_total.input.toLocaleString()} + cache_read ${r.process.tokens_total.cache_read.toLocaleString()} + output ${r.process.tokens_total.output.toLocaleString()}）｜ 单题均值 **${r.process.tokens_avg.toLocaleString()}**`);
  const eu = r.process.evidence_usage;
  const base = r.process.evidence_usage_base || 1;
  const useLine = (key, label) => `${label} ${eu[key]}/${r.process.evidence_usage_base}（${pct(eu[key] / base)}）`;
  L.push(`- 证据链：${useLine("l3_sop", "检索 L3")} · ${useLine("l2_consensus", "检索 L2")} · ${useLine("l1_semantic", "L1 语义")} · ${useLine("pe_mapping", "PE 视图")} · ${useLine("execute_sql", "执行 SQL")} · 结论句标记 ${eu.final_answer_marker}/${r.process.evidence_usage_base}`);
  L.push("");
  L.push(`## 逐题`);
  L.push("");
  L.push(`| qid | 库 | 判定 | 评定 | 步 | 工具 | token | 证据源 | 会话日志 |`);
  L.push(`|---|---|---|---|---|---|---|---|---|`);
  for (const q of r.questions) {
    const srcs = Object.entries(q.process.evidence)
      .filter(([k, v]) => v && !["final_answer_marker", "evidence_sql_line"].includes(k))
      .map(([k]) => k.replace(/^(l[123]_|pe_|le_|full_)/, ""))
      .join(",");
    L.push(
      `| ${q.qid}${q.flags.invalid ? " ⚠无效" : ""} | ${q.csv?.db ?? "-"} | ${q.csv?.verdict ?? "-"} | ${q.csv ? (RULING_LABEL[q.csv.ruling] ?? q.csv.ruling) : "-"} | ${q.process.steps} | ${q.process.tools} | ${q.process.tokens.total.toLocaleString()} | ${srcs} | ${q.session_log ? "有" : "-"} |`,
    );
  }
  L.push("");
  return L.join("\n");
}

export async function reportCommand(args) {
  if (!args.run) throw new EvalError("report requires --run <dir>");
  const runDir = path.resolve(args.run);
  if (!exists(runDir)) throw new EvalError(`run dir not found: ${runDir}`);
  if (!exists(path.join(runDir, "raw"))) throw new EvalError(`no raw/ under ${runDir} - nothing to report`);
  const ctx = loadContext(args, { lenient: true });
  const report = await buildReport({
    runDir,
    ctx,
    opts: { noSession: !!args["no-session"], strictCsv: !!args["strict-csv"] },
  });
  fs.writeFileSync(path.join(runDir, "report.json"), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(runDir, "report.md"), renderMarkdown(report));
  const r = report.results;
  console.log(`[report] ${path.basename(runDir)}: ${report.counts.artifacts} artifact(s), valid ${report.counts.valid}, invalid ${report.counts.invalid}; accuracy(valid) ${pct(r.accuracy_valid)}`);
  console.log(`[report] -> ${path.join(runDir, "report.json")}`);
  console.log(`[report] -> ${path.join(runDir, "report.md")}`);
  if (args.json) console.log(JSON.stringify(report, null, 2));
  return 0;
}
