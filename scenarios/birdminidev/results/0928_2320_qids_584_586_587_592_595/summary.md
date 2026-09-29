# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2320_qids_584_586_587_592_595` ｜ 题数 5 ｜ 生成 2026-09-29T00:34:22.700Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **264,797**（input 44,820 + cache_read 204,160 + output 15,817） ｜ cache_read 占 **77%**
- token 单题均值 **52,959**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 584 | FAIL | 🔁 翻盘 | ## 结论 **L3 命中（exact）**：`dlr_search_sop` 返回标题逐字复述本题的节 —— `codebase_community#Writ |  |  |  | edited title | raw/0928_2320_584_dlr.ndjson |