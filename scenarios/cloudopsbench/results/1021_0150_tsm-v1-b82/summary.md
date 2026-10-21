# Cloud-OpsBench 评测 · 1021_0152

- runs: 4 个（1021_0150_boutique-admission-34 1021_0150_boutique-startup-34 1021_0150_trainticket-performance-34 1021_0151_boutique-service-34 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4375 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 0 | 0 | namespace/boutique + namespace_pod_quota_exceeded | namespace/boutique + namespace_pod_quota_exceeded |
## boutique/startup

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/redis-cart + incorrect_image_reference | app/redis-cart + incorrect_image_reference |
## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 1.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.2381 | 22.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 0 | 1 | 0 | 0.5 | 0.5 | 0 | 0.238095 | 22 | 0 | 0 | app/ts-ui-dashboard + pod_network_delay | app/ts-user-service + pod_network_delay |
## boutique/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.375 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 0 | 0 | app/currencyservice + service_selector_mismatch | app/currencyservice + service_selector_mismatch |
