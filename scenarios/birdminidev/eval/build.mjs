/**
 * 生成考卷（场景包自带脚本；跑法：node eval/build.mjs）：scenarios/birdminidev/eval/questions.jsonl（一行一题）
 *   {question, expected, source}
 * - question：数据集原文
 * - expected：**有 L3 节口径的取节 Expected**（翻盘题的答案键），其余取 gold 判定值
 * - source：`L3 sop#<节标题>` 或 `gold`
 * 数据源：mini_dev_sqlite.json（题面）+ results 各轮 questions.csv（gold 期望，取每题最新轮）+ sources/sop.md（节口径）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCN = path.resolve(HERE, "..");
// 数据集根：env 优先（TSM_DATASET_DIR），否则按仓库布局回退两级（脚本装在场景包内也成立）
const DATASET_ROOT = process.env.TSM_DATASET_DIR ?? path.resolve(SCN, "..", "..");
const qs = JSON.parse(
  fs.readFileSync(path.join(DATASET_ROOT, "MINIDEV_sqlite/mini_dev_sqlite.json"), "utf8"),
);

// ── gold 期望：扫 results 各轮 questions.csv，每题取最新轮 ──
/** 整文件解析（**题面可含换行** → 必须按引号状态切记录，不能按行切） */
const parseCsv = (text) => {
  const rows = []; let row = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) { const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ",") { row.push(cur); cur = ""; }
      else if (c === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (c !== "\r") cur += c;
    }
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  return rows;
};
const gold = new Map();
const resDir = process.env.TSM_RESULTS_DIR ?? path.join(SCN, "results");
for (const d of fs.readdirSync(resDir).filter((x) => fs.statSync(path.join(resDir, x)).isDirectory()).sort()) {
  const p = path.join(resDir, d, "questions.csv");
  if (!fs.existsSync(p)) continue;
  const rows = parseCsv(fs.readFileSync(p, "utf8"));
  const h = rows[0];
  for (const r of rows.slice(1)) {
    const qid = r[h.indexOf("qid")];
    const exp = (r[h.indexOf("expected")] ?? "").trim();
    if (qid && exp) gold.set(String(qid), exp); // 轮次按目录名排序 → 后者覆盖旧轮
  }
}

// ── L3 节口径：标题 → Expected ──
const sop = fs.readFileSync(path.join(SCN, "sources/sop.md"), "utf8").split(/\r?\n/);
const sopByTitle = new Map();
let cur = null;
for (const ln of sop) {
  const m = /^### When asked: "(.*)"\s*$/.exec(ln);
  if (m) { cur = m[1]; sopByTitle.set(cur, { expected: null, line: 0 }); continue; }
  if (cur) {
    const e = /^> \*\*Expected\*\*：(.+)$/.exec(ln);
    if (e) sopByTitle.get(cur).expected = e[1].trim();
  }
}

// ── 组装 ──
const out = [];
let nSop = 0, nGold = 0, noGold = [];
for (const q of qs) {
  const qid = String(q.question_id);
  const question = String(q.question);
  const sec = sopByTitle.get(question);
  let expected = gold.get(qid) ?? "";
  let source = "gold";
  if (sec?.expected) { expected = sec.expected; source = `L3 sop#${question}`; nSop++; }
  else nGold++;
  if (!expected) noGold.push(qid);
  out.push(JSON.stringify({ question, expected, source }));
}
// 产物落点：默认写回场景包 eval/（仓库内）；安装态可用 TSM_OUT_DIR 指到可写目录
const outDir = process.env.TSM_OUT_DIR ? path.join(process.env.TSM_OUT_DIR, "eval") : path.join(SCN, "eval");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "questions.jsonl"), out.join("\n") + "\n");
console.log(`写 ${out.length} 行 ｜ L3 口径 ${nSop} ｜ gold ${nGold} ｜ 无期望 ${noGold.length}${noGold.length ? " → " + noGold.slice(0, 8).join(",") : ""}`);
console.log("节总数:", sopByTitle.size, "｜ 带 Expected 的节:", [...sopByTitle.values()].filter((v) => v.expected).length);
