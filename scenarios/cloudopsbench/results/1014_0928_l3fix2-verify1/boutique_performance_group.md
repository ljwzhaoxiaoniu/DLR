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
