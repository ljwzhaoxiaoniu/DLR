# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1635_superhero_b6` ｜ 题数 5 ｜ 生成 2026-09-29T08:36:54.140Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **6** ｜ 工具调用均值 **11** ｜ 工具错误均值 **0**
- token 合计 **327,125**（input 51,637 + cache_read 255,872 + output 19,616） ｜ cache_read 占 **78%**
- token 单题均值 **65,425**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 772 | FAIL | ❌ 错误 | The query returned 5 female Dark Horse Comics heroes. The L2 consensus (`namespa | 14 | 6 | 1 | 9 | raw/0929_1635_772_dlr.ndjson |