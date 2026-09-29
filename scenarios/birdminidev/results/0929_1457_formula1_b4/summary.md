# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1457_formula1_b4` ｜ 题数 5 ｜ 生成 2026-09-29T06:59:02.991Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 1 ｜ UNCERTAIN 2 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 2**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **8** ｜ 工具调用均值 **13** ｜ 工具错误均值 **0**
- token 合计 **478,097**（input 52,747 + cache_read 399,104 + output 26,246） ｜ cache_read 占 **83%**
- token 单题均值 **95,619**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 2 | 1 | 2 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 879 | UNCERTAIN | ⚠️ 待仲裁 | **结论：Brazilian（巴西籍）** **推理路径** - L2 领域共识（formula_1，#2 条）："fastest lap speed" 取 * | Italian | raw/0929_1457_879_dlr.ndjson |
| 880 | FAIL | ❌ 错误 | **解析过程（三级锚定）** - **L1 实体路**（`dlr_semantic_query`）：命中 `LOGICAL.DriverRaceData`（PE | 32.50155167390781 | raw/0929_1457_880_dlr.ndjson |
| 892 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 **Lewis Hamilton，共 2382 分**（数据集内全部比赛成绩累加）。 ## 三级锚定过程 | 级别 | 工具 | 结果 | |--- | Sebastian | Vettel | 397 | raw/0929_1457_892_dlr.ndjson |