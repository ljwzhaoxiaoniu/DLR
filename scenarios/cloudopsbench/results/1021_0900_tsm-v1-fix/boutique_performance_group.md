## boutique/performance

- cases: run=5 / selected=5 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2367 | 14.4 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 0.166667 | 13 | 0 | 0 | app/redis-cart + pod_cpu_overload | app/redis-cart + pod_cpu_overload |
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/shippingservice + pod_cpu_overload | app/shippingservice + pod_cpu_overload |
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
| 29 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/worker-02 + node_network_packet_loss | node/worker-02 + node_network_packet_loss |
