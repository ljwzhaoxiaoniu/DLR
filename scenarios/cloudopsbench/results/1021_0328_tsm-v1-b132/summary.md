# Cloud-OpsBench 评测 · 1021_0331

- runs: 4 个（1021_0328_boutique-startup-55 1021_0328_trainticket-runtime-55 1021_0329_boutique-admission-55 1021_0329_boutique-service-6 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/startup

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2727 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 55 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/frontend + missing_image_pull_secret | app/frontend + missing_image_pull_secret |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.75 | 0.75 | 0.0 | 0.3636 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 55 | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.363636 | 12 | 0 | 0 | app/ts-user-service + mysql_invalid_credentials | app/ts-user-service + mysql_invalid_credentials |
## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.75 | 0.75 | 0.0 | 0.3333 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 55 | 0 | 0 | 0 | 0.75 | 0.75 | 0 | 0.333333 | 19 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | namespace/boutique + namespace_storage_quota_exceeded |
## boutique/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.75 | 0.25 | 0.0 | 0.2174 | 24.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 1 | 1 | 1 | 0.75 | 0.25 | 0 | 0.217391 | 24 | 0 | 0 | app/checkoutservice + service_env_var_address_mismatch | app/checkoutservice + service_env_var_address_mismatch |
