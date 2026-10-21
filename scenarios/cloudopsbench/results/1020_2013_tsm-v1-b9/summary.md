# Cloud-OpsBench 评测 · 1020_2015

- runs: 4 个（1020_2013_boutique-infrastructure-11 1020_2013_trainticket-service-11 1020_2014_boutique-performance-11 1020_2014_trainticket-startup-11 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/infrastructure

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3636 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 23 | 0 | 0 | node/worker-01 + kube_proxy_unavailable | node/worker-01 + kube_proxy_unavailable |
## trainticket/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.2105 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.210526 | 20 | 0 | 0 | app/ts-payment-service + code_missing_parameter | app/ts-gateway-service + gateway_misrouted |
## boutique/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1579 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.157895 | 20 | 0 | 0 | node/worker-02 + node_network_delay | app/shippingservice + pod_cpu_overload |
## trainticket/startup

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3571 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/ts-order-service + missing_secret_binding | app/ts-order-service + missing_secret_binding |
