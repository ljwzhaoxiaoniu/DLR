/**
 * 对齐校验：TS 版 DLR 装载 vs Python 已建向量库（vector.pkl 导出的 manifest）
 *
 * 前置（只读 Python 侧产物）：
 *   python -c "import pickle,json;d=pickle.load(open('.../storage/dlr/vector/vector.pkl','rb'));
 *              json.dump([{k:m.get(k) for k in ('id','name','type','db','description')}
 *                         for m in d['metadata']], open('tmp_scripts/dlr_vector_manifest.json','w'),
 *                        ensure_ascii=False)"
 * 跑法: npx tsx src/spike/parity_dlr.ts [<db名>]
 */
import * as fs from "node:fs";
import { loadDlrScenario, toVectorRows } from "../model/loadDlr.js";

import { YAML_DIR, FIXTURES_DIR } from "../config.js";
const DB = process.argv[2] ?? "debit_card_specializing";
const YAML = `${YAML_DIR}/${DB}.yaml`;
const MANIFEST = `${FIXTURES_DIR}/dlr_vector_manifest.json`;

const rows = toVectorRows(loadDlrScenario(YAML));
const manifest: { id: string; name: string; type: string; db: string; description?: string }[] =
  JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const expected = manifest.filter((m) => m.db === DB);

const counts = (xs: { type: string }[]) =>
  xs.reduce<Record<string, number>>((acc, x) => ((acc[x.type] = (acc[x.type] ?? 0) + 1), acc), {});

console.log(`库: ${DB}`);
console.log("  TS 侧:", JSON.stringify(counts(rows)));
console.log("  Py 侧:", JSON.stringify(counts(expected)));

const tsIds = new Set(rows.map((r) => r.id));
const pyIds = new Set(expected.map((e) => e.id));
const missing = [...pyIds].filter((id) => !tsIds.has(id));
const extra = [...tsIds].filter((id) => !pyIds.has(id));
console.log(
  `  id 集合: TS ${tsIds.size} / Py ${pyIds.size} | 缺 ${missing.length} | 多 ${extra.length}`,
);
if (missing.length) console.log("    缺:", missing.slice(0, 10));
if (extra.length) console.log("    多:", extra.slice(0, 10));

// name 对比（id 相同时）
const pyById = new Map(expected.map((e) => [e.id, e]));
const nameDiff = rows.filter((r) => {
  const e = pyById.get(r.id);
  return e && e.name !== r.name;
});
console.log(`  name 不一致: ${nameDiff.length}`);
for (const r of nameDiff.slice(0, 5)) {
  console.log(`    ${r.id}: TS="${r.name}" Py="${pyById.get(r.id)!.name}"`);
}

// PAS 文本可精确比对（Python 侧 description == vector_text）
const pasPy = new Map(expected.filter((e) => e.type === "pas_relation").map((e) => [e.id, e.description ?? ""]));
for (const r of rows.filter((r) => r.type === "pas_relation")) {
  const py = pasPy.get(r.id);
  if (py === undefined) continue;
  console.log(`  PAS ${r.id}: ${py === r.text ? "文本一致 ✓" : `文本不一致 ✗\n    TS: ${r.text}\n    Py: ${py}`}`);
}
