# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2052_thrombosis_secE` ｜ 题数 5 ｜ 生成 2026-09-29T12:56:34.646Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **400,445**（input 49,784 + cache_read 333,184 + output 17,477） ｜ cache_read 占 **83%**
- token 单题均值 **80,089**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1265 | FAIL | 🔁 翻盘 | ## 结论 **35 名患者**。 ### 三级锚定过程 **L3（题级仲裁 — 命中 `exact`）**：`dlr_search_sop` 返回的节标题与本 | 47 | raw/0929_2052_1265_dlr.ndjson |