# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1431_qids_1105_1107_1110_1113_1114` ｜ 题数 5 ｜ 生成 2026-09-25T06:32:24.477Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **399,021**（input 83,151 + cache_read 307,072 + output 8,798） ｜ cache_read 占 **77%**
- token 单题均值 **79,804**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1107 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 Kevin Constant 的最高 crossing 评分为 **82**（L2 领域共识：`highest crossing score` =  | 2016-04-21 00:00:00 | raw/0925_1431_1107_dlr.ndjson |