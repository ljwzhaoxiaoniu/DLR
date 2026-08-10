## 评测进度 — RAG 模式 (round_2)

> **说明**: v3 = RAG 模式，Agent 不直接拿 evidence，通过 `search_evidence` 主动检索。
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
> **配置文件**: `config.json` → `output_dir: "Evaluation/outputs2"`, `round: "round_2"`

### 架构变化 (vs v2)

| | v2 (round_1) | v3 (round_2) |
|---|---|---|
| evidence 来源 | prompt 注入 | RAG 检索 |
| DLR 工具数 | 20 | 4 |
| 评测输出 | `outputs/` | `outputs2/` |
| 归档 | `validated_results/round_1/` | `validated_results/round_2/` |
| 知识库 | 无 | `rag_knowledge/*.jsonl` (11 topics) |

### Agent 流程

```
semantic → evidence ↔ mapping → SQL (ReAct 闭环)
```

---

## 评测进度

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 6 | 24 | 20.0% |

> **总结**：共测试 6 题 × 3 范式 = **18 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 6/6 (100%) | **6/6 (100%)** | 6/6 (100%) |
| strict PASS | 5/6 (83.3%) | 4/6 (66.7%) | 4/6 (66.7%) |
| 平均 token (input+output) | 5,710 | **4,486** (−21.4% vs ER) | 5,211 (−8.7% vs ER) |

---

## 逐题校验表

### debit_card_specializing

| 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| q1471 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 2,493 | **1,592** | 1,905 | |
| q1472 | FAIL | CORRECT | FAIL | CORRECT | PASS | | CORRECT | CORRECT | CORRECT | 10,180 | 10,578 | 10,190 | |
| q1473 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 9,009 | **2,492** | 7,416 | |
| q1476 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 7,734 | 3,665 | **3,031** | |
| q1479 | PASS | | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 2,524 | 4,604 | 5,211 | |
| q1480 | PASS | | PASS | | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **2,318** | 3,987 | 3,514 | ★kid16修复：添加"gas consumption"业务概念后 DLR从347K→4K |

> **Token = input_tokens + output_tokens**
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
