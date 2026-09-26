# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2152_qids_685_710` ｜ 题数 2 ｜ 生成 2026-09-26T13:53:12.355Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **177,714**（input 33,855 + cache_read 140,416 + output 3,443） ｜ cache_read 占 **79%**
- token 单题均值 **88,857**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 710 | FAIL | 🔁 翻盘 | ## 结论 **10,997** 条评论的 score 为 0。 ### 三级锚定过程 | 级别 | 来源 | 关键结论 | |------|------|-- | 2888 | raw/0926_2152_710_dlr.ndjson |