## 评测进度 — RAG 模式 (round_2)

> **说明**: v3 = RAG 模式，Agent 不直接拿 evidence，通过 `search_evidence` 主动检索。
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
> **配置文件**: `config.json` → `output_dir: "Evaluation/outputs2"`, `round: "round_2"`

> ⚠️ **v3_final 重置（2026-08-27）**：旧归档 38 题（evidence 注入批次，含 v2 150 题基线）全部作废清空。自 08-27 起重新归档：纯 question + 三通道（Ch1 语义 / Ch2 RAG / Ch3 skills）+ 数据集原始 gold + judge 争议裁决。旧数据仅作历史参考，见 v2_baseline 与 git 历史。

### 架构变化 (vs v2)

| | v2 (round_1) | v3 (round_2) |
|---|---|---|
| evidence 来源 | prompt 注入 | RAG 检索 |
| DLR 工具数 | 20 | 4 |
| 评测输出 | `outputs/` | `outputs2/` |
| 归档 | `validated_results/round_1/` | `validated_results/round_2/` |
| 知识库 | 无 | `rag_knowledge/*.jsonl` (11 topics) |

### Agent 流程（三通道，见 3-channel-design.md）

```
question → [Ch1 semantic_query + Ch2 search_evidence + Ch3 skills/{db}.md 并行]
        → 交叉验证锚定 → mapping → SQL → Final Answer
```

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 2 | 28 | 6.7% |
| card_games | 52 | 0 | 52 | 0% |

> **总结**：共测试 2 题 × 3 范式 = **6 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 2/2 (100.0%) | **2/2 (100.0%)** | 2/2 (100.0%) |
| strict PASS | 1/2 (50.0%) | 1/2 (50.0%) | 2/2 (100.0%) |
| 平均 token | 156,648 (+142.5% vs DLR) | **64,592** | 76,575 (+18.6% vs DLR) |

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| debit_card_specializing | q1471 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 57,119 | 60,313 | **54,621** |  |
| debit_card_specializing | q1472 | PASS |  | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 256,178 | **68,871** | 98,529 |  |
> **Token = input_tokens + output_tokens**
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
