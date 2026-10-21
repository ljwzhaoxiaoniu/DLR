# Cloud-OpsBench 评测 · 1021_0427

- runs: 4 个（1021_0425_boutique-codedefect-82 1021_0425_boutique-scheduling-23 1021_0426_boutique-scheduling-24 1021_0426_trainticket-runtime-82 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2727 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 82 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/productcatalogservice + code_excessive_file_writes | app/productcatalogservice + code_excessive_file_writes |
## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3077 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 23 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/recommendationservice + cpu_capacity_mismatch | app/recommendationservice + cpu_capacity_mismatch |
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/redis-cart + cpu_capacity_mismatch | app/redis-cart + cpu_capacity_mismatch |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6667 | 1.0 | 0.2727 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 82 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.272727 | 12 | 0 | 0 | app/ts-contacts-service + service_sidecar_port_conflict | app/ts-contacts-service + service_sidecar_port_conflict |
