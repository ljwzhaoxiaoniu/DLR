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

> 已评测 4 题 × 3 范式 = **12 题次**

| 数据库 | 全量 | 已评 | 剩余 | 进度 |
|--------|------|------|------|------|
| debit_card_specializing | 30 | 4 | 26 | 13.3% |

> **总结**：共测试 4 题 × 3 范式 = **12 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 4/4 (100%) | **4/4 (100%)** | 4/4 (100%) |
| strict PASS | 2/4 (50.0%) | 2/4 (50.0%) | **4/4 (100.0%)** |
| 平均 token (input+output) | 7,354 | **4,582** (−37.7% vs ER) | 5,636 (−23.3% vs ER) |

---

## 逐题校验表

### debit_card_specializing

| 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| q1471 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 2,493 | **1,592** | 1,905 | DLR最低 |
| q1472 | FAIL | CORRECT | FAIL | CORRECT | PASS | | CORRECT | CORRECT | CORRECT | 10,180 | 10,578 | 10,190 | ER/DLR judge翻盘 |
| q1473 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 9,009 | **2,492** | 7,416 | DLR仅2.5K |
| q1476 | PASS | | PASS | | PASS | | CORRECT | CORRECT | CORRECT | 7,734 | 3,665 | **3,031** | RDF稍低 |

> **Token = input_tokens + output_tokens**（不含 cache_read/reasoning，与 v2 口径一致）
