/**
 * execute_sql 的子进程执行器 —— 父进程按超时硬杀（见 executeSql.ts）
 * 协议: stdin JSON {dbUrl, sql} → stdout JSON {ok:true, columns, rows} | {ok:false, error}
 * 纯 .mjs（无 TS 依赖），父进程用 node 直接拉起。
 */
import { DatabaseSync } from "node:sqlite";

const MAX_ROWS = 200;

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let out;
try {
  const { dbUrl, sql } = JSON.parse(raw);
  const con = new DatabaseSync(dbUrl, { readOnly: true });
  try {
    const rows = con.prepare(sql).all();
    const columns = rows.length ? Object.keys(rows[0]) : [];
    // 只回传前 MAX_ROWS+1 行（父进程据此判定截断）——大结果集不整包过管道
    const values = rows.slice(0, MAX_ROWS + 1).map((r) => columns.map((c) => r[c]));
    out = { ok: true, columns, rows: values };
  } finally {
    con.close();
  }
} catch (e) {
  out = { ok: false, error: String(e?.message ?? e) };
}
process.stdout.write(JSON.stringify(out, (_k, v) => (typeof v === "bigint" ? Number(v) : v)));
