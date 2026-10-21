# Cloud-OpsBench 评测 · 1021_0419

- runs: 4 个（1021_0417_boutique-scheduling-19 1021_0417_trainticket-runtime-77 1021_0418_boutique-codedefect-78 1021_0418_trainticket-runtime-78 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3077 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 19 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/emailservice + cpu_capacity_mismatch | app/emailservice + cpu_capacity_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.8 | 0.6 | 0.0 | 0.3952 | 17.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 77 | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4375 | 17 | 0 | 0 | app/ts-travel-service + mysql_invalid_port | app/ts-travel-service + mysql_invalid_port |
| 78 | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.352941 | 18 | 0 | 0 | app/ts-user-service + mysql_invalid_port | app/ts-user-service + mysql_invalid_port |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.25 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 78 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/productcatalogservice + code_wrong_return | app/productcatalogservice + code_wrong_return |
