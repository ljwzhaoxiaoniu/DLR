# Cloud-OpsBench 评测 · 1014_0934

- runs: 4 个（1014_0928_boutique-performance-28 1014_0928_trainticket-performance-22 1014_0929_boutique-performance-24 1014_0930_boutique-performance-25 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/performance

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.6667 | 0.6667 | 0.6667 | 0.8333 | 0.8333 | 0.6667 | 0.1411 | 28.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1 | 31 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
| 25 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.0731707 | 42 | 0 | 0 | app/productcatalogservice + pod_network_delay | node/worker-02 + node_network_delay |
| 28 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/worker-02 + node_network_packet_loss | node/worker-02 + node_network_packet_loss |
## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.125 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.125 | 17 | 0 | 0 | <<< Kind + Name from List B >>> + <<< Select from List A >>> | app/ts-gateway-service + pod_network_delay |
