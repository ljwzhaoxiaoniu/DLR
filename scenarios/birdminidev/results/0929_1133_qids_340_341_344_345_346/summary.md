# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1133_qids_340_341_344_345_346` ｜ 题数 5 ｜ 生成 2026-09-29T04:25:25.580Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **417,274**（input 64,294 + cache_read 326,912 + output 26,068） ｜ cache_read 占 **78%**
- token 单题均值 **83,455**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 340 | FAIL | ❌ 错误 | ## 分析过程 **L2 领域共识（权威口径，qid 22, namespace=card_games，score 0.88）**： > "Incredibly | 4 | 5 | 6 | 9 | raw/0929_1133_340_dlr.ndjson |
| 341 | FAIL | 🔁 翻盘 | ## 结论 **52 张**（52 个不同牌名的无边框（borderless）印刷，来自 72 个印刷版本）。 **口径链（三级锚定）** - **L3（题级仲 | 23004 | 25350 | 25355 | 25357 | raw/0929_1133_341_dlr.ndjson |