# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2035_thrombosis_secB` ｜ 题数 5 ｜ 生成 2026-09-29T12:39:23.367Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **391,662**（input 45,754 + cache_read 321,536 + output 24,372） ｜ cache_read 占 **82%**
- token 单题均值 **78,332**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1205 | FAIL | ❌ 错误 | ## 三级锚定结果 **L3（题级口径，`dlr_search_sop` match=exact，标题逐字复述本题）——最权威** > Patient 5726 | 0 | 0 | 0 | 0 | raw/0929_2035_1205_dlr.ndjson |