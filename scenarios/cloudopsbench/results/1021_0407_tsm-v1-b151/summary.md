# Cloud-OpsBench 评测 · 1021_0409

- runs: 4 个（1021_0407_boutique-codedefect-71 1021_0407_boutique-scheduling-160 1021_0408_boutique-scheduling-161 1021_0408_trainticket-runtime-71 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.0 | 0.0 | 1.0 | 1.0 | 1.0 | 0.2353 | 18.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 71 | 1 | 0 | 0 | 1 | 1 | 1 | 0.235294 | 18 | 0 | 0 | app/productcatalogservice + code_wrong_return | app/productcatalogservice + code_missing_parameter |
## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 160 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
| 161 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/frontend + taint_toleration_mismatch | app/frontend + taint_toleration_mismatch |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4444 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 71 | 1 | 1 | 1 | 1 | 1 | 1 | 0.444444 | 19 | 0 | 0 | app/ts-security-service + mysql_invalid_port | app/ts-security-service + mysql_invalid_port |
