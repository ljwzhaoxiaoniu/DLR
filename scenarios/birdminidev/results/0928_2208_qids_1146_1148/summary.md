# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2208_qids_1146_1148` ｜ 题数 2 ｜ 生成 2026-09-29T03:10:14.760Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **257,488**（input 30,704 + cache_read 200,832 + output 25,952） ｜ cache_read 占 **78%**
- token 单题均值 **128,744**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1148 | FAIL | ❌ 错误 | **Final Answer: 32.06%** **How I got there (three‑level anchoring)** | 级 | 工具 |  | 13.940797269238713 | raw/0928_2208_1148_dlr.ndjson |