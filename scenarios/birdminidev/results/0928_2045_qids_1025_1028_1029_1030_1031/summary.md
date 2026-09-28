# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2045_qids_1025_1028_1029_1030_1031` ｜ 题数 5 ｜ 生成 2026-09-28T12:47:41.343Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **575,827**（input 60,902 + cache_read 494,968 + output 19,957） ｜ cache_read 占 **86%**
- token 单题均值 **115,165**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1028 | FAIL | 🔁 翻盘 | ## 结论 **苏格兰超级联赛（Scotland Premier League）2009/2010 赛季客场胜场最多的球队是并列第一：Rangers 与 Cel | Celtic | raw/0928_2045_1028_dlr.ndjson |
| 1029 | FAIL | 🔁 翻盘 | ## 结论 题目里 "build-up play speed" 与 "speed in which attacks are put together" 是同一个 | 20 | 20 | 20 | 23 | raw/0928_2045_1029_dlr.ndjson |