# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0928_1132_qids_72_77_79_83_87` ｜ 题数 5 ｜ 生成 2026-09-29T03:07:55.453Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 0 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 0 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **566,368**（input 83,440 + cache_read 455,680 + output 27,248） ｜ cache_read 占 **80%**
- token 单题均值 **113,274**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| california_schools | 4 | 0 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 77 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 在 Los Angeles 县内、**served**（实际服务）的年级跨度恰为 **Kindergarten–9th grade（K-9）** 的 | White Oak Elementary | 3.755868544600939 | The Accelerated | | raw/0928_1132_77_dlr.ndjson |