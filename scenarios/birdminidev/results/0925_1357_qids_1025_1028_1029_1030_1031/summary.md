# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1357_qids_1025_1028_1029_1030_1031` ｜ 题数 5 ｜ 生成 2026-09-25T06:21:36.934Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **442,706**（input 91,099 + cache_read 340,480 + output 11,127） ｜ cache_read 占 **77%**
- token 单题均值 **88,541**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1029 | FAIL | 🔁 翻盘 | ## 结论 **L3 SOP 命中**：`skill(name="sop")` → `european_football_2` 节中有一节完整复述本题（"Wha | 20 | 20 | 20 | 23 | raw/0925_1357_1029_dlr.ndjson |