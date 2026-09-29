# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2123_qids_672_683` ｜ 题数 2 ｜ 生成 2026-09-29T03:07:39.846Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **200,316**（input 35,384 + cache_read 161,664 + output 3,268） ｜ cache_read 占 **81%**
- token 单题均值 **100,158**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 0 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 672 | FAIL | 🔁 翻盘 | ## 结论 **14 个用户。** ### 三级锚定过程 | 级别 | 工具 | 命中 | |------|------|------| | L3 业务逻辑级  | 19 | raw/0926_2123_672_dlr.ndjson |
| 683 | FAIL | 🔁 翻盘 | **答案：51.1662%** **口径（L3 SOP 命中）**：`codebase_community` 节中有一节完整复述本题 —— "In 2011"  | 7.24159250999183 | raw/0926_2123_683_dlr.ndjson |