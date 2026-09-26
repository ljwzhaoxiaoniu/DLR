# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0926_2148_qids_705_707_710_716` ｜ 题数 4 ｜ 生成 2026-09-26T13:52:00.292Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **377,227**（input 80,042 + cache_read 290,048 + output 7,137） ｜ cache_read 占 **77%**
- token 单题均值 **94,307**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| codebase_community | 3 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 710 | FAIL | ❌ 错误 | ## 结论 **三级锚定过程：** | 级别 | 工具 | 命中结果 | |---|---|---| | L3 业务逻辑级 | `skill(sop)` | 无 | 2888 | raw/0926_2148_710_dlr.ndjson |