# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2344_qids_598_604_629_633_634` ｜ 题数 5 ｜ 生成 2026-09-29T03:10:33.690Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **283,825**（input 42,843 + cache_read 228,352 + output 12,630） ｜ cache_read 占 **80%**
- token 单题均值 **56,765**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 598 | FAIL | ❌ 错误 | **结论（三级锚定 → SQL 闭环）** - **L1 实体路**（`dlr_semantic_query`）：命中 `LOGICAL.Badge` @ `c | -9.544015626052403 | raw/0928_2344_598_dlr.ndjson |