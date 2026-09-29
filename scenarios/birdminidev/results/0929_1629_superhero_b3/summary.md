# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1629_superhero_b3` ｜ 题数 5 ｜ 生成 2026-09-29T08:33:02.732Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **10** ｜ 工具错误均值 **0**
- token 合计 **279,054**（input 51,092 + cache_read 216,576 + output 11,386） ｜ cache_read 占 **78%**
- token 单题均值 **55,811**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 743 | FAIL | ❌ 错误 | ## 结论 **问题拆解**（两个子问题）： 1. 以自身利益行事 / 按自己道德准则做决定的超级英雄占比 2. 这些英雄中有多少由 Marvel Comics | 28.266666666666666 | 118 | raw/0929_1630_743_dlr.ndjson |