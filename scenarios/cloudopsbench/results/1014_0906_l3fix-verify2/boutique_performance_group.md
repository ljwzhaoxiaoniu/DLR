## boutique/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1734 | 24.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 18 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/paymentservice + pod_network_delay | app/paymentservice + pod_network_delay |
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.0967742 | 32 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
