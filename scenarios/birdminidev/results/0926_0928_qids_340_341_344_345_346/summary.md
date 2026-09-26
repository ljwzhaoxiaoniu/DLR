# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0928_qids_340_341_344_345_346` ｜ 题数 5 ｜ 生成 2026-09-26T01:29:52.244Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **698,627**（input 101,365 + cache_read 557,568 + output 39,694） ｜ cache_read 占 **80%**
- token 单题均值 **139,725**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 341 | FAIL | ❌ 错误 | ## 结论 **L2 领域共识**（`dlr_search_consensus`, namespace=card_games）给出了本题两个关键口径，已严格遵守 | 23004 | 25350 | 25355 | 25357 | raw/0926_0928_341_dlr.ndjson |