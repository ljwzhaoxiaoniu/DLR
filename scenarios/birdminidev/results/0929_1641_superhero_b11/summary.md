# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1641_superhero_b11` ｜ 题数 2 ｜ 生成 2026-09-29T08:41:46.872Z

**判定（与 gold 比对）：PASS 1 ｜ FAIL 1 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 1 ｜ 🔁 翻盘 0 ｜ ❌ 错误 1 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **8** ｜ 工具错误均值 **0**
- token 合计 **80,705**（input 17,942 + cache_read 60,672 + output 2,091） ｜ cache_read 占 **75%**
- token 单题均值 **40,353**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 1 | 1 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 829 | FAIL | ❌ 错误 | **结论**：Marvel Comics 创造的超级英雄更多。 - 三级锚定：L3 `dlr_search_sop` 返回 `match=none`（本题无题级 | -163 | raw/0929_1641_829_dlr.ndjson |