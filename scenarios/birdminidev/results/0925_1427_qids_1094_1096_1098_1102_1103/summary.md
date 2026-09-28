# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0925_1427_qids_1094_1096_1098_1102_1103` ｜ 题数 5 ｜ 生成 2026-09-28T13:44:31.361Z

**判定（与 gold 比对）：PASS 4 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 4 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **12** ｜ 工具错误均值 **0**
- token 合计 **758,325**（input 94,295 + cache_read 622,592 + output 41,438） ｜ cache_read 占 **82%**
- token 单题均值 **151,665**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| european_football_2 | 4 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 1094 | FAIL | 🔁 翻盘 | ## 结论 **Ariel Borysiuk 的综合评分比 Paulin Puel 高约 15.25%。** ## 依据链 **L3（sop 技能）**：已加载 | 133.7260677466863 | raw/0925_1427_1094_dlr.ndjson |