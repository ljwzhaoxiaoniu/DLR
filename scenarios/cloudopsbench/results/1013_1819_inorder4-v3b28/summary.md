# Cloud-OpsBench 评测 · 1013_1824

- runs: 4 个（1013_1819_boutique-runtime-6 1013_1819_boutique-service-5 1013_1820_trainticket-performance-12 1013_1821_trainticket-service-14 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3333 | 10.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 10 | 0 | 0 | app/productcatalogservice + liveness_probe_incorrect_protocol | app/productcatalogservice + liveness_probe_incorrect_protocol |
## boutique/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.24 | 26.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 5 | 1 | 1 | 1 | 1 | 1 | 1 | 0.24 | 26 | 0 | 0 | app/cartservice + service_env_var_address_mismatch | app/cartservice + service_env_var_address_mismatch |
## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1429 | 22.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.142857 | 22 | 0 | 0 | app/ts-order-service + pod_cpu_overload | app/ts-security-service + pod_network_delay |
## trainticket/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.1111 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.111111 | 19 | 0 | 0 | app/ts-payment-service + code_missing_parameter | app/ts-gateway-service + gateway_misrouted |
