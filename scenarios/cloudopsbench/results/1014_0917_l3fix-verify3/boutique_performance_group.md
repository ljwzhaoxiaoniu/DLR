## boutique/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1166 | 27.5 | 0.0135 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.108108 | 38 | 0.027027 | 0 | app/productcatalogservice + pod_network_delay | node/worker-02 + node_network_delay |
| 28 | 0 | 0 | 0 | 0.5 | 0.5 | 0 | 0.125 | 17 | 0 | 0 | node/worker-01 + node_network_delay | node/worker-02 + node_network_packet_loss |
