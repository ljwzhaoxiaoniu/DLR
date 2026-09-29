# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1356_financial_secB` ｜ 题数 5 ｜ 生成 2026-09-29T05:59:31.629Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **265,627**（input 22,955 + cache_read 230,528 + output 12,144） ｜ cache_read 占 **87%**
- token 单题均值 **53,125**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 129 | UNCERTAIN | 🔁 翻盘 | 三级锚定全部命中，且结果与 L3 Expected 逐字一致。 **口径确认（L3，`dlr_search_sop` match=exact，标题逐字复述本题） | Benesov | Beroun | Blansko | Breclav | raw/0929_1356_129_dlr.ndjson |
| 152 | FAIL | 🔁 翻盘 | **结论**：1995 年犯罪数（`district.A15`）超过 4000、且该区至少有一个账户的开户日期在 1997 年及以后的区，共 **26 个**， | 29670.44951923077 | raw/0929_1356_152_dlr.ndjson |