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

> **总结**：共测试 6 题 × 3 范式 = **18 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 6/6 (100.0%) | **6/6 (100.0%)** | 6/6 (100.0%) |
| strict PASS | 2/6 (33.3%) | 5/6 (83.3%) | 3/6 (50.0%) |
| 平均 token | 91,805 (+22.7% vs DLR) | **74,804** | 75,906 (+1.5% vs DLR) |

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
> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v3_final/{pair}/agent_stats.csv`（per-pair，如 `1473-1476/`）
