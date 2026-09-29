# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_1005_qids_529_530` ｜ 题数 2 ｜ 生成 2026-09-29T01:16:21.267Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 0 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **280,529**（input 44,416 + cache_read 229,504 + output 6,609） ｜ cache_read 占 **82%**
- token 单题均值 **140,265**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 0 | 0 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 529 | UNCERTAIN | 🔁 翻盘 | ## 结论 **有韩文翻译但没有日文翻译的系列（set）共 2 个：** | 系列代码 | 系列名称（sets.name） | 韩文译名 | |---|---| | Tenth Edition | Fourth Edition | Fifth Dawn | Fifth Edition | raw/0926_1005_529_dlr.ndjson |
| 530 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **数据源**：`card_games` 库（L1 召回 `LOGICAL.Card` / `LOGICAL.CardExtension`，PE 映 | 1997 | Blinking Spirit | NO | 1997 | raw/0926_1005_530_dlr.ndjson |