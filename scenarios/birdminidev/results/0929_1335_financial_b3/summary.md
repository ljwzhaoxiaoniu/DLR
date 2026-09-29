# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1335_financial_b3` ｜ 题数 5 ｜ 生成 2026-09-29T05:39:33.552Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **10** ｜ 工具调用均值 **18** ｜ 工具错误均值 **0**
- token 合计 **867,857**（input 65,483 + cache_read 730,496 + output 71,878） ｜ cache_read 占 **84%**
- token 单题均值 **173,571**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| financial | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 118 | FAIL | ❌ 错误 | ## 结论过程 **三级锚定** | 层 | 工具 | 命中 | 采纳 | |---|---|---|---| | L1 数据源级 | `dlr_semanti | 46.885245901639344 | raw/0929_1335_118_dlr.ndjson |
| 128 | UNCERTAIN | ⚠️ 待仲裁 | 三级锚定完成，落库 `financial`（L2 共识 qid 1：female = `client.gender='F'`；account holder =  | Hl.m. Praha | 324 | Karvina | 88 | raw/0929_1337_128_dlr.ndjson |