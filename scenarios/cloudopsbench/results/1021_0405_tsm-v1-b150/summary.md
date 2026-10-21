# Cloud-OpsBench 评测 · 1021_0407

- runs: 4 个（1021_0405_boutique-scheduling-16 1021_0405_trainticket-runtime-7 1021_0406_boutique-codedefect-70 1021_0406_trainticket-runtime-70 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2667 | 16.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/redis-cart + node_cordon_mismatch | app/redis-cart + node_cordon_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3534 | 24.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 29 | 0 | 0 | app/tsdb-mysql + db_readonly_mode | app/tsdb-mysql + db_readonly_mode |
| 70 | 1 | 1 | 1 | 1 | 1 | 1 | 0.421053 | 20 | 0 | 0 | app/ts-route-service + mysql_invalid_port | app/ts-route-service + mysql_invalid_port |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1538 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 70 | 1 | 0 | 0 | 0.5 | 0.5 | 0 | 0.153846 | 14 | 0 | 0 | app/productcatalogservice + container_memory_limit_too_low | app/productcatalogservice + code_memory_leak |
