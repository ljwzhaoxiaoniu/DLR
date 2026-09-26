# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_0930_qids_341_345_346` ｜ 题数 3 ｜ 生成 2026-09-26T01:31:34.977Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **387,023**（input 49,788 + cache_read 324,480 + output 12,755） ｜ cache_read 占 **84%**
- token 单题均值 **129,008**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| card_games | 2 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 341 | FAIL | 🔁 翻盘 | ## 结论 **题目**：What are the borderless cards available without powerful foils? ### | 23004 | 25350 | 25355 | 25357 | raw/0926_0930_341_dlr.ndjson |