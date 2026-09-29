# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0944_qids_407_408_412` ｜ 题数 3 ｜ 生成 2026-09-29T01:15:04.329Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **321,266**（input 45,784 + cache_read 266,624 + output 8,858） ｜ cache_read 占 **83%**
- token 单题均值 **107,089**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 2 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 407 | UNCERTAIN | 🔁 翻盘 | Verification complete. Here is the result. ## 回答 **问题**：Lists all types of cards | Human,Rebel | Legendary | Angel | Legendary | raw/0926_0944_407_dlr.ndjson |