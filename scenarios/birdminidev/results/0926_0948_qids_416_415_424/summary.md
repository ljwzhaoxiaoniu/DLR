# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0948_qids_416_415_424` ｜ 题数 3 ｜ 生成 2026-09-28T13:45:42.069Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **252,539**（input 50,086 + cache_read 197,376 + output 5,077） ｜ cache_read 占 **78%**
- token 单题均值 **84,180**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 2 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 416 | FAIL | 🔁 翻盘 | **47.96%** Reasoning chain: - **L3 (sop, `card_games`)** — exact section match:  | 12.975290140452374 | raw/0926_0948_416_dlr.ndjson |