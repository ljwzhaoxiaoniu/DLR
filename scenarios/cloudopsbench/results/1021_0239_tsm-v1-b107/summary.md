# Cloud-OpsBench 评测 · 1021_0241

- runs: 4 个（1021_0239_boutique-codedefect-43 1021_0239_trainticket-runtime-43 1021_0240_boutique-admission-43 1021_0241_boutique-startup-43 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6 | 1.0 | 0.1786 | 29.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 0.6 | 1 | 0.178571 | 29 | 0 | 0 | app/frontend + code_missing_parameter | app/frontend + code_missing_parameter |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.75 | 0.75 | 0.0 | 0.3636 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.363636 | 12 | 0 | 0 | app/ts-order-service + mysql_invalid_credentials | app/ts-order-service + mysql_invalid_credentials |
## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3846 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | namespace/boutique + namespace_pod_quota_exceeded | namespace/boutique + namespace_pod_quota_exceeded |
## boutique/startup

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/checkoutservice + missing_image_pull_secret | app/checkoutservice + missing_image_pull_secret |
