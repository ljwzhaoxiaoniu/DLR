## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3213 | 15.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/shippingservice + cpu_capacity_mismatch | app/shippingservice + cpu_capacity_mismatch |
| 39 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/paymentservice + memory_capacity_mismatch | app/paymentservice + memory_capacity_mismatch |
| 73 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/cartservice + node_affinity_mismatch | app/cartservice + node_affinity_mismatch |
