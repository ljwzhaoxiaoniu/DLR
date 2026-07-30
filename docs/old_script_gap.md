## 最终 gap: 83 个文件（v2 token 无匹配 run）

> 标准：遍历全部 outputs 的 agent_stats，v2 token 值找不到任何匹配 run
> 前次批量 parse_agent_stats 已补全所有 post-7/20 run

| 题号 | 数据集 | ER | DLR | RDF |
|------|--------|-----|------|-----|
| q12 | california | ⚠️ | ⚠️ | ⚠️ |
| q846 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q847 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q850 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q854 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q1029 | football | ⚠️ | ⚠️ | ⚠️ |
| q1030 | football | ⚠️ | ⚠️ | ⚠️ |
| q1031 | football | ⚠️ | ⚠️ | ⚠️ |
| q1032 | football | ⚠️ | ⚠️ | ⚠️ |
| q1312 | student_club | ⚠️ | ⚠️ | ⚠️ |
| q1317 | student_club | ⚠️ | ⚠️ | ⚠️ |
| q1340 | student_club | ⚠️ | ⚠️ | ⚠️ |
| q1471 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1472 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1473 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1476 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1479 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1480 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1500 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1501 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1507 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1525 | debit_card | ⚠️ | ⚠️ | ⚠️ |

- 部分题有 post-7/20 run 但 token 不一致 — 可能 v2 是老 validated CSV 值
- 全部重跑即解决
