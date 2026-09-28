# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2115_qids_639_640` ｜ 题数 2 ｜ 生成 2026-09-28T13:51:03.380Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **213,222**（input 32,478 + cache_read 176,512 + output 4,232） ｜ cache_read 占 **83%**
- token 单题均值 **106,611**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 0 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 639 | FAIL | 🔁 翻盘 | ## 结论 **基于 Community 发布的帖子，使用 R 语言的帖子占比为 0%。** ### 三级锚定过程 | 级 | 来源 | 关键信息 | |--- | 0.19569471624266144 | raw/0926_2115_639_dlr.ndjson |
| 640 | FAIL | 🔁 翻盘 | ## 结论 **问题**：计算 Mornington 发布帖子的浏览量 与 Amos 发布帖子的浏览量 之差。 **三级锚定** - **L3（SOP，题级最权 | -1491 | raw/0926_2115_640_dlr.ndjson |