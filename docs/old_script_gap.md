## 老脚本 run 覆盖的 77 个文件（token 偏低，仅 input+output）

> 7/20 前的 run 无 agent_stats.csv，token 只计了 input+output，缺 cache_read+reasoning
> 今晚重跑: 195/197/198/200/344/345/533/537/719/723 + 1152/1153/1322/1323后处理
> 77 → 剩余约40个⚠️

| 题号 | 数据集 | ER | DLR | RDF |
|------|--------|-----|------|-----|
| q846 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q847 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q850 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q854 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q1029 | football | ⚠️ | ⚠️ | ⚠️ |
| q1030 | football | ⚠️ | ⚠️ | ⚠️ |
| q1471 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1472 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1473 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1476 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1479 | debit_card | ⚠️ | ✅ | ⚠️ |
| q1480 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1525 | debit_card | ✅ | ⚠️ | ⚠️ |

- ⚠️ = 老脚本 run，token 偏低
- ✅ = 新脚本 run，token 完整
