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
| debit_card_specializing | 30 | 30 | 0 | 100% |
| card_games | 52 | 8 | 44 | 15.4% |

> **总结**：共测试 38 题 × 3 范式 = **114 题次**。

| 指标 | ER | DLR | RDF |
|------|----|-----|-----|
| CORRECT | 36/38 (94.7%) | **38/38 (100.0%)** | 36/38 (94.7%) |
| strict PASS | 18/38 (47.4%) | 19/38 (50.0%) | 16/38 (42.1%) |
| 平均 token | 77,392 (+30.3% vs DLR) | **59,383** | 79,075 (+33.2% vs DLR) |

---

## 逐题校验表

### debit_card_specializing

| 数据库 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 备注 |
|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|------|
| card_games | q340 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 57,242 | **35,102** | 44,589 |  |
| card_games | q341 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,094 | 64,804 | **57,718** |  |
| card_games | q344 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 58,984 | 72,893 | **43,856** |  |
| card_games | q345 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 48,616 | 54,207 | **32,702** | its单数歧义诱导取众数：集合题面+枚举式status描述→Agent报"最频繁状态"；三范式status描述不一致是共因 |
| card_games | q346 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 127,138 | **79,939** | 105,758 | 3万行列明细题：判口径为明细✓/GROUP_CONCAT全值✓/仅COUNT✗ |
| card_games | q347 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 148,837 | **79,125** | 83,490 |  |
| card_games | q349 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 77,676 | 68,964 | **34,438** |  |
| card_games | q352 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 104,509 | **61,254** | 91,264 | 百分比题1:N分母陷阱：JOIN后行计数虚增分母，分母须取父表集合 |
| debit_card_specializing | q1471 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 56,949 | **30,396** | 31,649 |  |
| debit_card_specializing | q1472 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | **53,090** | 62,565 | 80,595 |  |
| debit_card_specializing | q1473 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 49,286 | **41,587** | 44,011 |  |
| debit_card_specializing | q1476 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 53,378 | 44,913 | **44,605** |  |
|  | q1479 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 51,582 | **49,183** | 75,005 |  |
|  | q1480 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 39,936 | **34,944** | 42,597 |  |
| debit_card_specializing | q1481 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 82,750 | **64,348** | 105,866 |  |
| debit_card_specializing | q1482 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 71,609 | **35,038** | 64,035 |  |
| debit_card_specializing | q1483 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 67,965 | 41,343 | **32,567** |  |
| debit_card_specializing | q1484 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 58,242 | 40,115 | **39,749** |  |
| debit_card_specializing | q1486 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 42,200 | 32,610 | **31,974** |  |
| debit_card_specializing | q1490 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 88,421 | **36,676** | 74,813 |  |
| debit_card_specializing | q1493 | FAIL | INCORRECT | PASS |  | FAIL | INCORRECT | INCORRECT | CORRECT | INCORRECT | 84,348 | **43,912** | 54,980 |  |
| debit_card_specializing | q1498 | PASS |  | PASS |  | FAIL | INCORRECT | CORRECT | CORRECT | INCORRECT | 40,575 | **33,011** | 41,165 |  |
|  | q1500 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 296,925 | **91,009** | 137,947 |  |
|  | q1501 | FAIL | INCORRECT | PASS |  | PASS |  | INCORRECT | CORRECT | CORRECT | **139,390** | 203,402 | 662,935 |  |
| debit_card_specializing | q1505 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 52,222 | **33,583** | 54,202 |  |
| debit_card_specializing | q1506 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 65,276 | 35,255 | **32,518** |  |
| debit_card_specializing | q1507 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 71,141 | **36,083** | 40,133 |  |
| debit_card_specializing | q1509 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 55,515 | **46,550** | 49,526 |  |
| debit_card_specializing | q1514 | PASS |  | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 53,602 | **45,882** | 52,963 |  |
| debit_card_specializing | q1515 | PASS |  | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 81,216 | 97,934 | **55,719** |  |
| debit_card_specializing | q1521 | PASS |  | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 42,742 | 58,250 | **32,219** |  |
| debit_card_specializing | q1524 | FAIL | CORRECT | PASS |  | PASS |  | CORRECT | CORRECT | CORRECT | 104,345 | **64,345** | 290,219 |  |
| debit_card_specializing | q1525 | FAIL | CORRECT | PASS |  | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 60,680 | 91,095 | **45,442** |  |
| debit_card_specializing | q1526 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 79,796 | 90,476 | **64,627** |  |
| debit_card_specializing | q1528 | FAIL | CORRECT | FAIL | CORRECT | PASS |  | CORRECT | CORRECT | CORRECT | 67,498 | 74,599 | **63,801** |  |
| debit_card_specializing | q1529 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 68,754 | 38,731 | **34,419** |  |
| debit_card_specializing | q1531 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 67,268 | **38,547** | 60,394 |  |
| debit_card_specializing | q1533 | FAIL | CORRECT | FAIL | CORRECT | FAIL | CORRECT | CORRECT | CORRECT | CORRECT | 100,080 | 103,879 | **70,366** |  |
> **Token = input_tokens + output_tokens**
> **数据来源**: `validated_results/v3_final/agent_stats.csv`
