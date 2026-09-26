# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0954_qids_468_469_472_473_474` ｜ 题数 5 ｜ 生成 2026-09-26T01:56:48.482Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **786,948**（input 102,673 + cache_read 658,304 + output 25,971） ｜ cache_read 占 **84%**
- token 单题均值 **157,390**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 472 | FAIL | ❌ 错误 | ## 数据来源 - **MCP `dlr_search_consensus`（card_games, qid 38/39）**：`Block` → `sets. | 1 | raw/0926_0954_472_dlr.ndjson |