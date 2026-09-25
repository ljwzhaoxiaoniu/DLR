# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1432_qids_1107` ｜ 题数 1 ｜ 生成 2026-09-25T06:33:07.046Z

**判定（与 gold 比对）：PASS 0 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 0 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **70,320**（input 13,207 + cache_read 55,808 + output 1,305） ｜ cache_read 占 **79%**
- token 单题均值 **70,320**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 0 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1107 | UNCERTAIN | 🔁 翻盘 | Confirmed: Kevin Constant's max crossing score is 82, carried on three dates; th | 2016-04-21 00:00:00 | raw/0925_1432_1107_dlr.ndjson |