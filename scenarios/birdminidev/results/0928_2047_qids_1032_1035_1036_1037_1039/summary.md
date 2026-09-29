# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2047_qids_1032_1035_1036_1037_1039` ｜ 题数 5 ｜ 生成 2026-09-29T03:08:34.215Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **444,247**（input 50,583 + cache_read 367,229 + output 26,435） ｜ cache_read 占 **83%**
- token 单题均值 **88,849**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1037 | FAIL | 🔁 翻盘 | ## 结论 **在 1987–1992 年间出生的球员中，惯用左脚（preferred foot = left）的球员占比为 28.87%。** ## 推理链路 | 24.56690504416995 | raw/0928_2048_1037_dlr.ndjson |