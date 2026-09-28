# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1419_qids_1486_1490_1493_1498_1500` ｜ 题数 5 ｜ 生成 2026-09-28T13:51:41.646Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 2 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 3 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **207,632**（input 34,343 + cache_read 164,992 + output 8,297） ｜ cache_read 占 **79%**
- token 单题均值 **41,526**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 2 | 2 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1490 | FAIL | 🔁 翻盘 | The L3 SOP trap was decisive: an INNER JOIN would have given 3599/3611 = 99.67%, | 98.5267932135058 | raw/0928_1419_1490_dlr.ndjson |
| 1498 | FAIL | 🔁 翻盘 | ## 回答 **问题**：What is the highest monthly consumption in the year 2012?（2012 年最高的 | 51787161.74 | raw/0928_1419_1498_dlr.ndjson |
| 1500 | UNCERTAIN | 🔁 翻盘 | The query returns **zero rows**, exactly as the L3 SOP predicted. ## 结论 **没有产品在  | Nafta | Nafta | Provoz.nápl. | Natural | raw/0928_1419_1500_dlr.ndjson |