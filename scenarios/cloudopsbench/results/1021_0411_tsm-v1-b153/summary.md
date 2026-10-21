# Cloud-OpsBench 评测 · 1021_0413

- runs: 4 个（1021_0411_boutique-scheduling-163 1021_0411_trainticket-runtime-73 1021_0412_boutique-codedefect-74 1021_0412_trainticket-runtime-74 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.25 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 163 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/recommendationservice + taint_toleration_mismatch | app/recommendationservice + taint_toleration_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4437 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 73 | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 0 | 0 | app/ts-station-service + mysql_invalid_port | app/ts-station-service + mysql_invalid_port |
| 74 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 0 | 0 | app/ts-train-food-service + mysql_invalid_port | app/ts-train-food-service + mysql_invalid_port |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1579 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 74 | 1 | 1 | 1 | 1 | 1 | 1 | 0.157895 | 20 | 0 | 0 | app/productcatalogservice + code_excessive_file_reads | app/productcatalogservice + code_excessive_file_reads |
