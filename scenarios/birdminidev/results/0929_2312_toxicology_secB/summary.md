# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2312_toxicology_secB` ｜ 题数 6 ｜ 生成 2026-09-29T15:16:37.953Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **308,393**（input 24,799 + cache_read 266,752 + output 16,842） ｜ cache_read 占 **86%**
- token 单题均值 **51,399**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 4 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 234 | FAIL | 🔁 翻盘 | ## 结论 **分子 TR009 中涉及 atom `TR009_12` 的键共有 3 个。** ### 三级锚定过程 | 级别 | 工具 | 命中结果 | | | 1041 | raw/0929_2312_234_dlr.ndjson |
| 263 | FAIL | 🔁 翻盘 | 三级锚定完成，L3 为 `exact` 命中（标题逐字复述本题），并已用 SQL 闭环验证。 ## 执行过程 **L3 口径（最权威，`dlr_search_s | 2.6840451814272206 | raw/0929_2312_263_dlr.ndjson |