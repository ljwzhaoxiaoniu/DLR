# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1838_thrombosis_b1` ｜ 题数 5 ｜ 生成 2026-09-29T10:41:20.192Z

**判定（与 gold 比对）：PASS 2 ｜ FAIL 3 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 2 ｜ 🔁 翻盘 0 ｜ ❌ 错误 3 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **453,539**（input 61,216 + cache_read 360,576 + output 31,747） ｜ cache_read 占 **80%**
- token 单题均值 **90,708**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| thrombosis_prediction | 2 | 3 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1149 | FAIL | ❌ 错误 | ## 结论 **门诊（out-patient）的男性患者更多**，偏差约 **9.18%**。 ### 三级锚定过程 | 级 | 工具 | 结果 | |---| | 83.17757009345794 | raw/0929_1838_1149_dlr.ndjson |
| 1150 | FAIL | ❌ 错误 | ## 语义锚定过程 **L3 口径（`dlr_search_sop`）**：`match=none` — 本题无题级节，按 L1 + L2 自解。 **L1 实 | 94.03714565004887 | raw/0929_1838_1150_dlr.ndjson |
| 1152 | FAIL | ❌ 错误 | ## 推理过程 **三级锚定** - **L3（口径路）**：`dlr_search_sop` 返回 `match=none` → 本题无题级节，按 L1 +  | 1.3095238095238095 | raw/0929_1838_1152_dlr.ndjson |