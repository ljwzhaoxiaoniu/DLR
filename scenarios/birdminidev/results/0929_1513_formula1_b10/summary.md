# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1513_formula1_b10` ｜ 题数 5 ｜ 生成 2026-09-29T07:15:55.130Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 3 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **483,535**（input 56,363 + cache_read 387,584 + output 39,588） ｜ cache_read 占 **80%**
- token 单题均值 **96,707**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 959 | FAIL | ❌ 错误 | ## 结论 **2009 年冠军**：Jenson Button（driverId 18）——在 2009 年最后一站（Abu Dhabi，raceId 17） | 18 | 42 | 11 | 17 | raw/0929_1513_959_dlr.ndjson |
| 962 | FAIL | ❌ 错误 | 三级锚定已完成（本题无 L3 节；L2 命中 formula_1 共识；L1 锚定 drivers/results/lapTimes/races）。 **口径（ | 64.88474742520843 | raw/0929_1514_962_dlr.ndjson |
| 963 | FAIL | ❌ 错误 | ## 分析过程 **三级锚定结果** - **L3（`dlr_search_sop`）**：`match=none` — 本题无 L3 节，按 L1+L2 自解 | 23295 | raw/0929_1515_963_dlr.ndjson |