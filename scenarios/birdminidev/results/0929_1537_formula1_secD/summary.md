# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1537_formula1_secD` ｜ 题数 3 ｜ 生成 2026-09-29T07:41:24.168Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **165,304**（input 14,114 + cache_read 140,672 + output 10,518） ｜ cache_read 占 **85%**
- token 单题均值 **55,101**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 1 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1011 | UNCERTAIN | 🔁 翻盘 | L3 口径命中（`match=exact`），且结果与 L3 节给出的前八名逐字一致，验证通过。 ## 结论依据 **L3 口径（`dlr_search_sop | Nico | Hülkenberg | 807 | Daniel | raw/0929_1537_1011_dlr.ndjson |
| 963 | FAIL | 🔁 翻盘 | **结果** - **L3 口径（`dlr_search_sop`，match=exact）**：标题逐字复述本题，Expected=9；明确要求 **coun | 23295 | raw/0929_1537_963_dlr.ndjson |