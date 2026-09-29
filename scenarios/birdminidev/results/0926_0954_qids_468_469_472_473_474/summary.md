# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0954_qids_468_469_472_473_474` ｜ 题数 5 ｜ 生成 2026-09-29T01:15:38.916Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **786,948**（input 102,673 + cache_read 658,304 + output 25,971） ｜ cache_read 占 **84%**
- token 单题均值 **157,390**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 469 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论（证据驱动） **是的**——含有 "Angel of Mercy" 的牌张系列中，有 6 个系列出现在 Magic: The Gathering O | YES | YES | YES | YES | raw/0926_0954_469_dlr.ndjson |
| 472 | FAIL | ❌ 错误 | ## 数据来源 - **MCP `dlr_search_consensus`（card_games, qid 38/39）**：`Block` → `sets. | 1 | raw/0926_0954_472_dlr.ndjson |