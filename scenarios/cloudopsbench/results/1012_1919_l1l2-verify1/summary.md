# Cloud-OpsBench 评测 · 1012_1921

- runs: 1 个（1012_1919_trainticket-runtime-3 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.6667 | 0.6667 | 0.0 | 0.1538 | 27.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 3 | 1 | 1 | 1 | 0.666667 | 0.666667 | 0 | 0.153846 | 27 | 0 | 0 | app/tsdb-mysql + db_connection_exhaustion | app/tsdb-mysql + db_connection_exhaustion |
