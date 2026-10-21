# Cloud-OpsBench 评测 · 1021_0415

- runs: 4 个（1021_0413_boutique-codedefect-75 1021_0413_boutique-scheduling-164 1021_0414_boutique-scheduling-17 1021_0414_trainticket-runtime-75 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1667 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 75 | 1 | 1 | 1 | 1 | 1 | 1 | 0.166667 | 19 | 0 | 0 | app/productcatalogservice + code_excessive_file_reads | app/productcatalogservice + code_excessive_file_reads |
## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3083 | 14.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 17 | 1 | 1 | 1 | 1 | 1 | 1 | 0.416667 | 13 | 0 | 0 | app/cartservice + cpu_capacity_mismatch | app/cartservice + cpu_capacity_mismatch |
| 164 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/redis-cart + taint_toleration_mismatch | app/redis-cart + taint_toleration_mismatch |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.8 | 0.4 | 0.0 | 0.4 | 21.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 75 | 1 | 1 | 1 | 0.8 | 0.4 | 0 | 0.4 | 21 | 0 | 0 | app/ts-train-service + mysql_invalid_port | app/ts-train-service + mysql_invalid_port |
