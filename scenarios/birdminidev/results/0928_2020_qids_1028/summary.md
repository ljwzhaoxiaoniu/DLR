# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2020_qids_1028` ｜ 题数 1 ｜ 生成 2026-09-29T03:08:28.354Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **62,219**（input 6,435 + cache_read 53,373 + output 2,411） ｜ cache_read 占 **86%**
- token 单题均值 **62,219**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1028 | FAIL | 🔁 翻盘 | **结论：这是并列第一 —— Rangers 与 Celtic 各赢 11 场客场，两队都是答案。** **锚定过程** - **L3（题级口径，`match= | Celtic | raw/0928_2020_1028_dlr.ndjson |