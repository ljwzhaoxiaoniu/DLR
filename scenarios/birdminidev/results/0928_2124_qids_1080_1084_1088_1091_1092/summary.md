# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2124_qids_1080_1084_1088_1091_1092` ｜ 题数 5 ｜ 生成 2026-09-29T03:08:42.125Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **373,668**（input 73,314 + cache_read 281,600 + output 18,754） ｜ cache_read 占 **75%**
- token 单题均值 **74,734**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1080 | FAIL | 🔁 翻盘 | ## 分析过程 **三级锚定结果** - **L3（SOP）**：`match=none`（无逐字复述本题的节）；近邻候选是关于"right foot + lo | 1569 | raw/0928_2124_1080_dlr.ndjson |