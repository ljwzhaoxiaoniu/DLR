# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1640_superhero_b10` ｜ 题数 5 ｜ 生成 2026-09-29T08:41:20.535Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **284,113**（input 45,343 + cache_read 227,328 + output 11,442） ｜ cache_read 占 **80%**
- token 单题均值 **56,823**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 819 | FAIL | ❌ 错误 | ## 结论 **superhero 库**（`D:\Code_Proj\DLR Proj\MINIDEV_sqlite\dev_databases\superh | -122 | raw/0929_1640_819_dlr.ndjson |