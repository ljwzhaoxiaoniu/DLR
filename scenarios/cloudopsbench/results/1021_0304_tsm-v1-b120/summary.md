# Cloud-OpsBench 评测 · 1021_0306

- runs: 4 个（1021_0304_boutique-startup-49 1021_0304_trainticket-runtime-49 1021_0305_boutique-admission-49 1021_0305_boutique-service-49 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/startup

- cases: run=1 / selected=1 · invalid_actions=0 · errors={'unparsed_final_answer': 1}

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 49 | 0 | 0 | 0 | 1 | 1 | 1 | 0.230769 | 13 | 0 | 0 |  +  | app/redis-cart + missing_image_pull_secret |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.75 | 0.75 | 0.0 | 0.3333 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 49 | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.333333 | 13 | 0 | 0 | app/ts-station-service + mysql_invalid_credentials | app/ts-station-service + mysql_invalid_credentials |
## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.24 | 26.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 49 | 1 | 1 | 1 | 1 | 1 | 1 | 0.24 | 26 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
## boutique/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4286 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 49 | 1 | 1 | 1 | 1 | 1 | 1 | 0.428571 | 15 | 0 | 0 | app/checkoutservice + service_selector_mismatch | app/checkoutservice + service_selector_mismatch |
