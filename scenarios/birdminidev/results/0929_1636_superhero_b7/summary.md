# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1636_superhero_b7` ｜ 题数 5 ｜ 生成 2026-09-29T08:37:55.597Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **262,473**（input 44,974 + cache_read 206,336 + output 11,163） ｜ cache_read 占 **79%**
- token 单题均值 **52,495**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 775 | FAIL | ❌ 错误 | ## 三级锚定结果 | 级 | 命中 | 用途 | |---|---|---| | L3 SOP | `match=none` | 本题无题级口径节 → 按 L | 2.4630541871921183 | raw/0929_1636_775_dlr.ndjson |