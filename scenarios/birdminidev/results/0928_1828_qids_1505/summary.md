# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1828_qids_1505` ｜ 题数 1 ｜ 生成 2026-09-28T13:51:44.538Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **4** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **31,457**（input 3,228 + cache_read 26,496 + output 1,733） ｜ cache_read 占 **84%**
- token 单题均值 **31,457**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 0 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1505 | FAIL | 🔁 翻盘 | All four L3 "established facts" reproduce exactly, confirming the anchoring is c | 2730 | raw/0928_1829_1505_dlr.ndjson |