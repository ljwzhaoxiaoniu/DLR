# 跑批结果（tsm grade）

目录：`D:\Code_Proj\DLR Proj\scenarios\birdminidev\results\0929_1528_formula1_secA` ｜ 题数 5 ｜ 生成 2026-09-29T07:30:31.562Z

**判定（与 gold 比对）：PASS 3 ｜ FAIL 2 ｜ UNCERTAIN 0 ｜ GOLD_ERR 0**

**评定（按 SOP 裁定）：✅ 正确 3 ｜ 🔁 翻盘 2 ｜ ❌ 错误 0 ｜ ⚠️ 待仲裁 0**（翻盘单独计，不并入正确）

## 过程指标（均值 / 合计）

- 步数均值 **7** ｜ 工具调用均值 **9** ｜ 工具错误均值 **0**
- token 合计 **411,890**（input 31,469 + cache_read 348,672 + output 31,749） ｜ cache_read 占 **85%**
- token 单题均值 **82,378**

| 库 | PASS | FAIL | UNCERTAIN | GOLD_ERR |
|---|---|---|---|---|
| formula_1 | 3 | 2 | 0 | 0 |

## 非 PASS 明细（前 40）

| qid | 判定 | 评定 | 答案（截） | 期望（截） | 日志 |
|---|---|---|---|---|---|
| 847 | FAIL | 🔁 翻盘 | **结论**：Race 19（2008 巴林大奖赛）第二节排位赛（Q2）最快圈速的车手是 **Kimi Räikkönen**，圈速 `1:34.188`，姓氏 | Fisichella | raw/0929_1528_847_dlr.ndjson |
| 879 | FAIL | 🔁 翻盘 | **结论**：最快圈速（fastest lap speed）的保持者是 Rubens Barrichello，其国籍为 **Brazilian（巴西）**。 * | Italian | raw/0929_1528_879_dlr.ndjson |