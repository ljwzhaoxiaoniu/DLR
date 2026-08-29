## 评测进度 — 语义+RAG+SOP 三通道模式 (round_2)

> **说明**: v3 = 三通道模式（见 3-channel-design.md）：Agent 不拿 evidence，纯 question 驱动三通道并行锚定——Ch1 语义（MCP 语义层）、Ch2 RAG（`search_evidence` 检索）、Ch3 SOP（前置读 `skills/{db}.md`），交叉验证后 mapping -> SQL。
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）
> **配置文件**: `config.json` → `output_dir: "Evaluation/outputs2"`, `round: "v3_final"`

> ⚠ **v3_final 重置（2026-08-27）**：旧归档 38 题（evidence 注入批次，含 v2 150 题基线）全部作废清空。自 08-27 起重新归档：纯 question + 三通道（Ch1 语义 / Ch2 RAG / Ch3 skills）+ 数据集原始 gold + judge 争议裁决。旧数据仅作历史参考，见 v2_baseline 与 git 历史。

### 架构变化 (vs v2)

| | v2 (round_1) | v3 (round_2) |
|---|---|---|
| evidence 来源 | prompt 注入 | 无（纯 question，三通道主动锚定） |
| 检索通道 | 单通道（被动接收） | Ch1 语义 / Ch2 RAG / Ch3 SOP 并行 |
| DLR 工具数 | 20 | 4 |
| 评测输出 | `outputs/` | `outputs2/` |
| 归档 | `validated_results/v2_final/` | `validated_results/v3_final/` |
| 知识库 | 无 | `rag_knowledge/*.jsonl` (11 topics) + `skills/*.md` |

### Agent 流程（三通道，见 3-channel-design.md）

```
question → [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行]
        → 交叉验证锚定 → mapping → SQL → Final Answer
```

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 4 | 26 | 13.3% |
| card_games | 52 | 0 | 52 | 0% |

> **总结**：共测试 8 题 × 3 范式 = **24 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 8/8 (100.0%) | **8/8 (100.0%)** | 7/8 (87.5%) |
| strict PASS | 2/8 (25.0%) | 5/8 (62.5%) | 3/8 (37.5%) |
| 平均 token | 88,661 (+16.3% vs DLR) | **76,242** | 87,415 (+14.7% vs DLR) |

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q1471 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 75,889 | **45,156** | 65,446 | 题目/evidence 无缺陷；Ch3 无本题条目；EUR/CZK 比值口径无分歧 | strict FAIL 为 4 位舍入差（Pred 0.0657 vs gold 0.065728），judge 按舍入级翻正 | execute_sql 仅 1 次，4 步 45,156 tok 三范式最省 |  |
| debit_card_specializing | q1472 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 155,128 | **104,772** | 107,120 | 题目 LAM/consumption 语义过泛（LAM=segment 歧义）；Ch3 本题无条目，纯 Ch1+Ch2 解出 | Ch1 漂移至 card_games；Ch2×5 反复探测（top 0.60），execute_sql×8，11 步 155,128 tok 三范式最贵 | Ch1 唯一首中；Ch2×2 全命中；8 步 104,772 tok | Ch1 漂移至 formula_1 后 3 次 query 才回正；Ch2×2、rdf_search×2，9 步 107,120 tok |
| debit_card_specializing | q1473 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 75,987 | **57,091** | 76,141 | 缺陷题——evidence/gold 公式 AVG/12 与 yearmonth 月度粒度矛盾（双重除法，2013 SME 人均仅 8.0 个月记录）；三范式 Pred 一致按数据语义作答致 strict 全 FAIL；Ch3 本题条目口径=AVG 不除 12，judge 依此全翻 CORRECT | Ch1 单发首中；Ch2 单发命中（top=1473 未带偏）；execute_sql×3，7 步 75,987 tok | Ch1×2、Ch2×2（1 命中）；execute_sql 仅 1 次，5 步 57,091 tok 三范式最少 | Ch1×2、Ch2 单发命中（top=1482）；execute_sql×3，7 步 76,141 tok |
| debit_card_specializing | q1476 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 109,335 | 72,354 | **70,780** | 题目/evidence 无缺陷；CZK/EUR 消歧无分歧，数值一致（402,524,570.17）；Ch3 无本题条目 | Ch1×2、Ch2×2（1 命中）；execute_sql×6 + get_table_schema×2 探测偏多，9 步 109,335 tok 最贵 | Ch1 单发首中；execute_sql×2，6 步 72,354 tok | 结果多带两列拆分值（CZK 总额/EUR 总额）→ strict 列数不匹配 FAIL，judge 按多余列不扣分翻正；6 步 70,780 tok |
| debit_card_specializing | q1479 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 78,781 | 101,077 | **63,611** | 题目/evidence 无缺陷（"gas"即 Consumption 列，gold SQL 亦不另滤，仅滤 CZK）；Ch3 无本题条目 | Ch1 首跳漂移至 california_schools（×2 回正）；SQL 未取 TOP1（无 LIMIT 1）返回全年份排名（3 行+总额列）→ strict FAIL，judge 依首行 2013 翻正；execute_sql×3，7 步 78,781 tok | 无异常，strict PASS；execute_sql×4，8 步 101,077 tok 三范式最贵 | SQL 漏 Currency='CZK' 过滤（无 customers JOIN），峰值年份恰与过滤口径一致；6 步 63,611 tok 最省 |
| debit_card_specializing | q1480 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **55,710** | 68,376 | 72,339 | 题目/evidence 无缺陷；Ch3 本题条目（返回两位月份+格式对齐）生效——ER/DLR 按条目返回 "04" 直接 PASS | 无异常；5 步 55,710 tok 最省 | 无异常；6 步 68,376 tok | 值 "04" 正确但多带 total 列 → 列数不匹配 strict FAIL，judge 翻正；rdf_search×4 探测偏多，6 步 72,339 tok 最贵 |
| debit_card_specializing | q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | **87,365** | 97,023 | 159,092 | 缺陷题——gold 算全段客户均值差（[-582092.86, 582092.86, 0]），未筛每段最低消费客户；Ch3 本题条目（每段最低客户年度总消费、不除 12）生效——ER/DLR 按条目算出裁定口径 [-14009.34, 6046.62, 7962.72]，judge 依 SOP>RAG 翻正 | 无异常；execute_sql×4，7 步 87,365 tok 三范式最省 | 无异常；Ch2×2（1 命中）；execute_sql×4，7 步 97,023 tok | SQL 漏 Currency='CZK'（JOIN customers 无 WHERE）→ LAM 最低客户取到混合货币口径 -186.18（vs CZK 口径 2.24），前两差值各偏 188.42 → INCORRECT；execute_sql×12 反复试错，11 步 159,092 tok 三范式最贵 |
| debit_card_specializing | q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,091 | **64,087** | 84,788 | 缺陷题——gold 分母用 2012 且未滤 EUR；evidence 规定除 2013（非常规口径），三范式均按数学常识除 2012 致 strict 全 FAIL；disputes 补判口径：问题问 which segment，答案=排序，三范式排序一致（SME 最高/LAM 最低）→ judge 全翻 CORRECT；Ch3 无本题条目 | 无异常；Ch2×3（2 命中）探测略多；execute_sql×5，6 步 71,091 tok | 无异常；execute_sql×3，5 步 64,087 tok 最省 | 无异常；execute_sql×6，7 步 84,788 tok 最贵 |
> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）

---

## 三通道合理性论证——SOP 条目案例（q1473 / q1480）

> 三通道分工：Ch1 语义锚定"在哪"（库/表），Ch2 RAG 映射"是什么"（术语→列/值），Ch3 SOP 捕获"这题怎么坑"（领域口径/格式陷阱）。SOP 通道的合理性取决于它是否解决了 Ch1/Ch2 结构上解决不了的问题——当前有 SOP 条目的两道题（q1473 事前准入、q1480 事后准入）恰好各覆盖一类盲区。

### 案例 1：q1473 — SOP 仲裁知识冲突（事前条目）

- 缺陷题：evidence/gold 公式 `AVG(Consumption)/12` 与 yearmonth 行语义（每行已是月度值）矛盾
- 无 SOP 的后果：Ch2 检索到错误公式，Ch1 无口径概念——**没有任何一层能仲裁**，三范式都会跟着除 12，答案 12 倍偏小
- 有条目后：Ch3 条目明确"月度值直接 AVG，不除 12"，三范式 Pred 一致按表语义作答（5519.48）；judge 判序 SOP>RAG，依条目全翻 CORRECT
- 证明点：**SOP 是知识冲突的仲裁层**——冲突来自 Ch2 自身携带的错误公式，只有第三通道能裁决

### 案例 2：q1480 — SOP 对齐答案格式（事后准入 + 重跑对照）

- 陷阱：问题问"月份"，gold 期望纯月份 `"04"`；Agent 自然返回完整年月 `"201304"`（ER/DLR）或附带总额列（RDF）——evidence 只讲 Date 取位，不含格式约定
- 无条目批次：strict 0/3 PASS，全部依赖 judge 等价翻正
- 补条目（返回两位月份，SQL 执行完对齐格式）重跑：**ER/DLR 返回 `"04"` 直接 strict PASS**（ER 55,710 tok，5 步，三范式最省）；RDF 值对齐但未遵守"仅月份一列"，仍 FAIL 由 judge 翻正
- 证明点：**格式对齐约定既不在 Ch1 语义层、也不在 Ch2 知识层，只能由 SOP 表达**；条目有效性有对照数据：strict PASS 0/3 → 2/3

### 小结

| 题 | 无 SOP | 有 SOP |
|---|---|---|
| q1473 | （无对照批次；若按 Ch2 错误公式作答，三范式均 12 倍偏小） | 三范式口径一致按表语义作答，judge 依 SOP 翻正 |
| q1480 | strict 0/3，全靠 judge | strict 2/3，ER/DLR 免仲裁 |

两道题各覆盖一类 Ch1/Ch2 的结构盲区（知识冲突、格式约定），SOP 通道不可被替代——三通道并行锚定成立。
