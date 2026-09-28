# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2205_qids_1141_1144_1145_1146_1147` ｜ 题数 5 ｜ 生成 2026-09-28T14:10:46.183Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **313,576**（input 67,561 + cache_read 236,032 + output 9,983） ｜ cache_read 占 **75%**
- token 单题均值 **62,715**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1144 | FAIL | 🔁 翻盘 | ## 执行链路 **L3（`dlr_search_sop`，match=exact）** — 题面逐字命中本题节，为最权威口径： - 最重球员 = 最大 `we | 98022 | 13 | 13 | raw/0928_2205_1144_dlr.ndjson |