/**
 * execute_sql 对齐自测：跑固定 SQL，与 Python 真值（tmp_scripts/py_execute_sql.json）比 JSON
 * 跑法: npx tsx src/spike/execute_sql_check.ts
 */
import * as fs from "node:fs";
import { executeSql } from "../queries/executeSql.js";

const ROOT = "D:/Code_Proj/DLR Proj";
const DB = `${ROOT}/MINIDEV_sqlite/dev_databases/debit_card_specializing/debit_card_specializing.sqlite`;
const SQL = `SELECT CAST(SUM(CASE WHEN Currency='EUR' THEN 1 ELSE 0 END) AS REAL) / SUM(CASE WHEN Currency='CZK' THEN 1 ELSE 0 END) AS ratio FROM customers`;

const ts = executeSql(SQL, DB);
const pyPath = `${ROOT}/tmp_scripts/py_execute_sql.json`;
const py = fs.existsSync(pyPath) ? JSON.parse(fs.readFileSync(pyPath, "utf8")) : null;

console.log("TS:", JSON.stringify(ts));
if (py) {
  console.log("Py:", JSON.stringify(py));
  console.log(JSON.stringify(ts) === JSON.stringify(py) ? "✅ execute_sql 完全一致" : "⚠️ 有差异");
}

// 负面用例：SELECT * 不带 LIMIT 必须被拒（与 Python 同口径）
const bad = executeSql("SELECT * FROM customers", DB);
console.log("SELECT * 无 LIMIT →", JSON.stringify(bad));
