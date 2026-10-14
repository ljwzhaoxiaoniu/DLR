## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2857 | 16.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 28 | 1 | 1 | 1 | 1 | 1 | 1 | 0.238095 | 22 | 0 | 0 | app/checkoutservice + cpu_capacity_mismatch | app/checkoutservice + cpu_capacity_mismatch |
| 42 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/redis-cart + memory_capacity_mismatch | app/redis-cart + memory_capacity_mismatch |
| 76 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/paymentservice + node_affinity_mismatch | app/paymentservice + node_affinity_mismatch |
