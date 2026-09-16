## 评测进度 — 语义+RAG+SOP 三通道模式（v4 基线）

> **说明**: v4 = 三通道模式（见 3-channel-design.md）：Agent 不拿 evidence，纯 question 驱动三通道并行锚定——Ch1 语义（MCP 语义层，数据集原生配置）、Ch2 RAG（`search_evidence` 检索）、Ch3 SOP（前置读 `skills/{db}.md`），交叉验证后 mapping -> SQL。
> **数据来源**: `validated_results/v4_final/{pair}/agent_stats.csv`（per-pair，如 `1471-1472/`）
> **配置文件**: `config.json` → `eval.output_dir: "Evaluation/outputs2"`, `eval.round: "v4_final"`
> **文档同步**: `post_process.py` 每次归档自动重建本文件明细表与汇总数字（进度表手动维护）

### 本轮配置口径

| 项 | v4 口径 |
|---|---|
| Ch1 列级描述 | 数据集 `*.csv` 原文全量（09-10 重写） |
| top_k | 三范式统一 **10** |
| DLR schema | `PE.attributes:[{column,biz_name,description,public?}]`（09-12 统一） |
| DLR 属性 data_type / 列 id | 792/792 非空 / 去引号（与 ER 同构） |
| RDF 属性索引 name | **rdfs:label**（与 ER 逐字同名） |
| RDF 关系 | `rr:joinCondition` 口径 **101** 条（与 ER 同格式） |

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 2 | 28 | 6.7% |

> **总结**：共测试 2 题 × 3 范式 = **6 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 2/2 (100.0%) | **2/2 (100.0%)** | 2/2 (100.0%) |
| strict PASS | 2/2 (100.0%) | 1/2 (50.0%) | 1/2 (50.0%) |
| 平均 token | 82,603 (+38.3% vs DLR) | **59,730** | 57,164 (-4.3% vs DLR) |

> **口径**：仅覆盖已归档批次，勿外推为全数据集结论。

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 共通 | ER-备注 | DLR-备注 | RDF-备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|--------|--------|--------|
| debit_card_specializing | q1471 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | **54,735** | 58,776 | 55,200 |  |  |  |  |
| debit_card_specializing | q1472 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 110,471 | 60,684 | **59,127** |  |  |  |  |
> **Token = input_tokens + output_tokens**
> **备注分栏**: 共通 = 题目/evidence/Ch3 问题（跨范式共同根源）；ER/DLR/RDF-备注 = 该范式本题的异常、错误及后果（空 = 无异常无特异观察）
> **数据来源**: `validated_results/v4_final/{pair}/agent_stats.csv`（per-pair，如 `1471-1472/`）

---

## 三通道合理性论证——SOP 条目案例

> 本节在分批跑完后撰写：按 [[archive-discipline]]，案例只在结果确认后写，且每个 SOP 条目题必须有对应观察、数字与归档 CSV 逐项一致。
