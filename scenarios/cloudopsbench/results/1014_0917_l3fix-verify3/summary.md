# Cloud-OpsBench 评测 · 1014_0924

- runs: 4 个（1014_0917_boutique-performance-25 1014_0917_boutique-performance-28 1014_0919_trainticket-performance-22 1014_0919_trainticket-performance-26 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1166 | 27.5 | 0.0135 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.108108 | 38 | 0.027027 | 0 | app/productcatalogservice + pod_network_delay | node/worker-02 + node_network_delay |
| 28 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.125 | 17 | 0 | 0 | node/worker-01 + node_network_delay | node/worker-02 + node_network_packet_loss |
## trainticket/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.5 | 0.5 | 1.0 | 1.0 | 1.0 | 0.211 | 26.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 1 | 0 | 0 | 1 | 1 | 1 | 0.285714 | 29 | 0 | 0 | app/ts-gateway-service + service_dns_resolution_failure | app/ts-gateway-service + pod_network_delay |
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.136364 | 23 | 0 | 0 | app/ts-preserve-service + pod_network_delay | app/ts-preserve-service + pod_network_delay |
