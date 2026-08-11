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
| debit_card_specializing | 30 | 18 | 12 | 46.7% |

> **总结**：共测试 18 题 × 3 范式 = **54 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 17/18 (94.4%) | **18/18 (100.0%)** | 16/18 (88.9%) |
| strict PASS | 12/18 (66.7%) | 12/18 (66.7%) | 10/18 (55.6%) |
| 平均 token | 86,582 | **58,501** (-32.4% vs ER) | 61,648 (-28.8% vs ER) |

---

## 逐题校验表

### debit_card_specializing

| 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| q1471 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 56,949 | **30,396** | 31,649 | |
| q1472 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | **53,090** | 62,565 | 80,595 | |
| q1473 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 49,286 | **41,587** | 44,011 | |
| q1476 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 53,378 | 44,913 | **44,605** | |
| q1479 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | **51,582** | 80,154 | 75,005 | |
| q1480 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 59,182 | **47,359** | 62,058 | |
| q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 82,750 | **64,348** | 105,866 | |
| q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,609 | **35,038** | 64,035 | |
| q1483 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,965 | 41,343 | **32,567** | |
| q1484 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 58,242 | 40,115 | **39,749** | |
| q1486 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 42,200 | 32,610 | **31,974** | |
| q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 88,421 | **36,676** | 74,813 | |
| q1493 | FAIL | INCORRECT | PASS |  | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 84,348 | **43,912** | 54,980 | |
| q1498 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 40,575 | **33,011** | 41,165 | |
| q1500 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 296,925 | **91,009** | 137,947 | |
| q1501 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 284,472 | 240,304 | **101,920** | |
| q1505 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 52,222 | **33,583** | 54,202 | |
| q1506 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 65,276 | 54,094 | **32,518** | |
> **Token = input_tokens + output_tokens**
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
