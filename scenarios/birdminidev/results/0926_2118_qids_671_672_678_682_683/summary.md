# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2118_qids_671_672_678_682_683` ｜ 题数 5 ｜ 生成 2026-09-29T03:07:37.070Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **613,625**（input 99,718 + cache_read 497,792 + output 16,115） ｜ cache_read 占 **81%**
- token 单题均值 **122,725**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 672 | FAIL | 🔁 翻盘 | ## 结论 **三级锚定过程：** | 层级 | 工具 | 结果 | |------|------|------| | L3 业务逻辑级 | `skill(na | 19 | raw/0926_2118_672_dlr.ndjson |
| 682 | FAIL | 🔁 翻盘 | ## 结论 **2010 年最有价值的帖子是 Id = 1595，其所有者的 DisplayName 为 Fabian Fagerholm。** ### 三级锚 | 890 | Fabian Fagerholm | raw/0926_2118_682_dlr.ndjson |
| 683 | FAIL | 🔁 翻盘 | ## 结论 **51.1662%**（约 51.17%） 即：2011 年创建的、且其 owner 声望超过 1000 的帖子，占 2011 年（有 owner | 7.24159250999183 | raw/0926_2118_683_dlr.ndjson |