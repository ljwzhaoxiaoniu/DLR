# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2243_toxicology_b2` ｜ 题数 5 ｜ 生成 2026-09-29T14:45:26.206Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **258,306**（input 50,052 + cache_read 196,864 + output 11,390） ｜ cache_read 占 **76%**
- token 单题均值 **51,661**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 207 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **问题**："What elements are in a double type bond?"（双键中的元素有哪些？） **三级锚定**： -  | c | o | cl | h | raw/0929_2243_207_dlr.ndjson |