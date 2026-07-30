## 老脚本 run 覆盖的 77 个文件（token 偏低，仅 input+output）

> 7/20 前的 run 无 agent_stats.csv，token 只计了 input+output，缺 cache_read+reasoning
> 后续重跑后替换

| 题号 | 数据集 | ER | DLR | RDF |
|------|--------|-----|------|-----|
| q195 | toxicology | ⚠️ | ⚠️ | ⚠️ |
| q197 | toxicology | ⚠️ | ✅ | ⚠️ |
| q198 | toxicology | ⚠️ | ⚠️ | ⚠️ |
| q200 | toxicology | ⚠️ | ⚠️ | ⚠️ |
| q344 | card_games | ⚠️ | ⚠️ | ⚠️ |
| q345 | card_games | ⚠️ | ⚠️ | ⚠️ |
| q533 | codebase | ⚠️ | ⚠️ | ⚠️ |
| q537 | codebase | ⚠️ | ⚠️ | ⚠️ |
| q719 | superhero | ⚠️ | ⚠️ | ⚠️ |
| q723 | superhero | ⚠️ | ⚠️ | ⚠️ |
| q846 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q847 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q850 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q854 | formula_1 | ⚠️ | ⚠️ | ⚠️ |
| q1029 | football | ⚠️ | ⚠️ | ⚠️ |
| q1030 | football | ⚠️ | ⚠️ | ⚠️ |
| q1152 | thrombosis | ⚠️ | ⚠️ | ⚠️ |
| q1153 | thrombosis | ⚠️ | ⚠️ | ⚠️ |
| q1322 | student_club | ⚠️ | ⚠️ | ⚠️ |
| q1323 | student_club | ⚠️ | ⚠️ | ⚠️ |
| q1471 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1472 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1473 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1476 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1479 | debit_card | ⚠️ | ✅ | ⚠️ |
| q1480 | debit_card | ⚠️ | ⚠️ | ⚠️ |
| q1525 | debit_card | ✅ | ⚠️ | ⚠️ |

- ⚠️ = 老脚本 run，token 偏低
- ✅ = 新脚本 run，token 完整
