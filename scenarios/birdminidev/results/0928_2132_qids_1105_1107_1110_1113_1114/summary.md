# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2132_qids_1105_1107_1110_1113_1114` ｜ 题数 5 ｜ 生成 2026-09-28T13:53:04.635Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **9** ｜ 工具错误均值 **3**
- token 合计 **382,991**（input 54,346 + cache_read 318,080 + output 10,565） ｜ cache_read 占 **83%**
- token 单题均值 **76,598**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 2 | 1 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1107 | UNCERTAIN | 🔁 翻盘 | ## 结论 **Kevin Constant 最高 crossing 分数的首次日期为 2013-02-15。** ### 三级锚定过程 | 级别 | 工具 | | 2016-04-21 00:00:00 | raw/0928_2132_1107_dlr.ndjson |
| 1113 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论：本题无法作答 —— 本会话的工具面缺失 ### 我实际做了什么 按三级并行锚定流程，我第一步就发出三路调用： | 级 | 工具 | 实际返回 | | | Press | raw/0928_2133_1113_dlr.ndjson |
| 1114 | FAIL | ❌ 错误 | 我按 DLR 三级判序流程启动本题：L1 实体路（`dlr_semantic_query`）、L2 领域共识路（`dlr_search_consensus`）、 | 75.39393939393939 | raw/0928_2133_1114_dlr.ndjson |