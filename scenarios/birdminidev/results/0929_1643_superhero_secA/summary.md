# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1643_superhero_secA` ｜ 题数 5 ｜ 生成 2026-09-29T08:44:41.353Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 1 ｜ UNCERTAIN 1 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 1 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 1**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **5** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **296,181**（input 34,296 + cache_read 240,512 + output 21,373） ｜ cache_read 占 **81%**
- token 单题均值 **59,236**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| superhero | 3 | 1 | 1 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 726 | UNCERTAIN | ⚠️ 待仲裁 | ## 结论 按 L3 题级口径（`dlr_search_sop` 命中节，标题逐字复述本题）执行：**Marvel Comics 全部英雄按记录身高从高到低排名 | Surtur | 30480 | 1 | Ymir | raw/0929_1643_726_dlr.ndjson |
| 772 | FAIL | 🔁 翻盘 | 三级交叉验证完全一致（L1 实体路指向 `superhero` 库；L2 共识说明三色经 colour id 查字典、性别/出版商同理；L3 命中的节逐字复述本 | 14 | 6 | 1 | 9 | raw/0929_1644_772_dlr.ndjson |