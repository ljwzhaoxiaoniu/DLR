## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3111 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 23 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/recommendationservice + cpu_capacity_mismatch | app/recommendationservice + cpu_capacity_mismatch |
| 37 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/currencyservice + memory_capacity_mismatch | app/currencyservice + memory_capacity_mismatch |
| 71 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/shippingservice + node_affinity_mismatch | app/shippingservice + node_affinity_mismatch |
