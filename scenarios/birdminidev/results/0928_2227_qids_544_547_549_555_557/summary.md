# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_2227_qids_544_547_549_555_557` ｜ 题数 5 ｜ 生成 2026-09-29T03:10:25.547Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **7** ｜ 工具错误均值 **0**
- token 合计 **238,548**（input 42,756 + cache_read 187,008 + output 8,784） ｜ cache_read 占 **78%**
- token 单题均值 **47,710**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 557 | FAIL | 🔁 翻盘 | ## 分析过程 **三级锚定结果：** | 级别 | 工具 | 结果 | |------|------|------| | L1 数据源级 | `dlr_sem | 0.16899404073645824 | raw/0928_2227_557_dlr.ndjson |