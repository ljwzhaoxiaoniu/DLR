# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_1901_qids_1481` ｜ 题数 1 ｜ 生成 2026-09-29T01:11:45.930Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **52,221**（input 6,669 + cache_read 42,368 + output 3,184） ｜ cache_read 占 **81%**
- token 单题均值 **52,221**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1481 | FAIL | 🔁 翻盘 | ## 结论 **本题口径（L3 SOP 命中）**：本题在 `sop` 技能 `debit_card_specializing` 节中有完整 restate 的 | 0 | 582092.86 | -582092.86 | raw/0924_1901_1481_dlr.ndjson |