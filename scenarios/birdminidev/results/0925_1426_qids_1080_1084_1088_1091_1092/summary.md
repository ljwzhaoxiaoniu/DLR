# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1426_qids_1080_1084_1088_1091_1092` ｜ 题数 5 ｜ 生成 2026-09-28T13:44:28.493Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **434,320**（input 93,712 + cache_read 320,128 + output 20,480） ｜ cache_read 占 **74%**
- token 单题均值 **86,864**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1080 | FAIL | 🔁 翻盘 | ## 回答 **术语锚定（L2 领域共识，european_football_2，qid 1080）** - "preferred foot was the l | 1569 | raw/0925_1426_1080_dlr.ndjson |