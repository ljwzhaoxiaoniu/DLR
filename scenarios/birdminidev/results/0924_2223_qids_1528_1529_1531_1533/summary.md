# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_2223_qids_1528_1529_1531_1533` ｜ 题数 4 ｜ 生成 2026-09-28T13:44:11.642Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **239,011**（input 46,103 + cache_read 184,320 + output 8,588） ｜ cache_read 占 **77%**
- token 单题均值 **59,753**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 2 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1529 | FAIL | 🔁 翻盘 | Customer 38508 has 20 monthly records spanning 201201–201311. **Answer** - **Tot | 68740.2 | 3437.01 | raw/0924_2223_1529_dlr.ndjson |
| 1531 | FAIL | 🔁 翻盘 | ## 结论 **L3 命中**：`sop` 技能中存在完整复述本题的一节（"Who is the top spending customer and how m | 12459 | 203.8560787354258 | CZK | raw/0924_2223_1531_dlr.ndjson |