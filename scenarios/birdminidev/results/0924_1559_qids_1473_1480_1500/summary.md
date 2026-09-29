# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_1559_qids_1473_1480_1500` ｜ 题数 3 ｜ 生成 2026-09-29T01:11:39.179Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **1**
- token 合计 **123,072**（input 21,620 + cache_read 96,512 + output 4,940） ｜ cache_read 占 **78%**
- token 单题均值 **41,024**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 1 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1473 | FAIL | 🔁 翻盘 | ## 分析过程 **L3 (sop) 命中**：`sop` 技能中有一节完整复述本题 —— *"What was the average monthly con | 459.9562642870894 | raw/0924_1559_1473_dlr.ndjson |
| 1500 | UNCERTAIN | 🔁 翻盘 | ## 结论 **September 2013 没有任何产品被消费——结果为空列表。** ### 依据 **L3（`sop` 技能，本题有精确命中节）** — 技 | Nafta | Nafta | Provoz.nápl. | Natural | raw/0924_1559_1500_dlr.ndjson |