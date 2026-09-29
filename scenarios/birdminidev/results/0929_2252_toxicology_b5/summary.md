# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_2252_toxicology_b5` ｜ 题数 5 ｜ 生成 2026-09-29T14:55:35.817Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **15** ｜ 工具错误均值 **0**
- token 合计 **543,037**（input 44,638 + cache_read 468,352 + output 30,047） ｜ cache_read 占 **86%**
- token 单题均值 **108,607**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| toxicology | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 234 | FAIL | ❌ 错误 | ## 结论 本题三级锚定结果： | 层级 | 工具 | 结果 | |------|------|------| | L3 业务逻辑级 | `dlr_search | 1041 | raw/0929_2252_234_dlr.ndjson |
| 239 | FAIL | ❌ 错误 | ## 结论 **Atom 19 有 1 个连接（1 条化学键）。** ## 推理过程 **三级锚定** | 级 | 工具调用 | 结果 | |---|---|- | 377 | raw/0929_2252_239_dlr.ndjson |