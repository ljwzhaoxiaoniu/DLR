# Cloud-OpsBench 评测 · 1020_2009

- runs: 4 个（1020_2008_boutique-infrastructure-10 1020_2008_boutique-performance-10 1020_2008_trainticket-service-10 1020_2009_trainticket-startup-10 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/infrastructure

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3333 | 16.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | node/worker-02 + containerd_unavailable | node/worker-02 + containerd_unavailable |
## boutique/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.125 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.125 | 17 | 0 | 0 | node/worker-01 + node_network_delay | app/redis-cart + pod_cpu_overload |
## trainticket/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3 | 21.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
## trainticket/startup

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3125 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-order-other-service + missing_secret_binding | app/ts-order-other-service + missing_secret_binding |
