# Cloud-OpsBench 评测 · 1013_1842

- runs: 4 个（1013_1839_boutique-codedefect-13 1013_1839_boutique-infrastructure-12 1013_1840_trainticket-performance-14 1013_1840_trainticket-service-16 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2727 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 13 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 23 | 0 | 0 | app/checkoutservice + code_missing_parameter | app/checkoutservice + code_missing_parameter |
## boutique/infrastructure

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3333 | 25.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 25 | 0 | 0 | node/worker-02 + kube_proxy_unavailable | node/worker-02 + kube_proxy_unavailable |
## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1818 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 1 | 1 | 1 | 1 | 1 | 1 | 0.181818 | 23 | 0 | 0 | app/ts-train-service + pod_network_delay | app/ts-train-service + pod_network_delay |
## trainticket/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2273 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | 1 | 1 | 0.227273 | 23 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
