# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2101_qids_598_604_629_633_634` ｜ 题数 5 ｜ 生成 2026-09-29T03:07:18.030Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 2 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **789,149**（input 98,349 + cache_read 669,312 + output 21,488） ｜ cache_read 占 **85%**
- token 单题均值 **157,830**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 598 | FAIL | ❌ 错误 | ## 结论 **学生徽章（Student badge）在 2010 与 2011 的百分比差为 -1.7746**（即 2011 的占比比 2010 高出约 1 | -9.544015626052403 | raw/0926_2101_598_dlr.ndjson |
| 604 | FAIL | ❌ 错误 | 三级锚定完成：L2 领域共识对本题（原题完全一致，qid 604，namespace `codebase_community`）给出了权威口径；L3 SOP 中 | 182.2832618025751 | 34.083333333333336 | raw/0926_2101_604_dlr.ndjson |