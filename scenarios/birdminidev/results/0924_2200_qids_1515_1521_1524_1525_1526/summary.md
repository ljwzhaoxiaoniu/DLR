# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0924_2200_qids_1515_1521_1524_1525_1526` ｜ 题数 5 ｜ 生成 2026-09-24T16:07:01.571Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **461,256**（input 58,012 + cache_read 378,752 + output 24,492） ｜ cache_read 占 **82%**
- token 单题均值 **92,251**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| debit_card_specializing | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1525 | FAIL | 🔁 翻盘 | ## 结论 **2012/8/25 使用 EUR 的客户占比 = 2.7027%**（7 / 259） ### 三级锚定过程 | 级 | 工具 | 命中 | | | 1.6470588235294117 | raw/0924_2200_1525_dlr.ndjson |
| 1526 | UNCERTAIN | 🔁 翻盘 | ## 解答 **Step 1 — 定位客户（purchase-level 条件）** L2 共识（qid 18）明确："paid 634.8" 指单笔交易的价格 | null | raw/0924_2200_1526_dlr.ndjson |