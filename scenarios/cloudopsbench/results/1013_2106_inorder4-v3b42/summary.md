# Cloud-OpsBench 评测 · 1013_2109

- runs: 4 个（1013_2106_boutique-codedefect-20 1013_2106_boutique-infrastructure-19 1013_2107_trainticket-performance-24 1013_2108_trainticket-service-27 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2143 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 20 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/checkoutservice + code_excessive_file_reads | app/checkoutservice + code_excessive_file_reads |
## boutique/infrastructure

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.12 | 26.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 19 | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 0 | 0 | node/master + kube_scheduler_unavailable | node/master + kube_scheduler_unavailable |
## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1538 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.153846 | 14 | 0 | 0 | app/ts-order-service + pod_network_delay | app/ts-order-service + pod_network_delay |
## trainticket/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2857 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 27 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/ts-order-service + service_dns_resolution_failure | app/ts-order-service + service_dns_resolution_failure |
