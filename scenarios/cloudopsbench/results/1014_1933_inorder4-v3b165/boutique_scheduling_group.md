## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3071 | 14.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 31 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/frontend + cpu_capacity_mismatch | app/frontend + cpu_capacity_mismatch |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 79 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/shippingservice + node_affinity_mismatch | app/shippingservice + node_affinity_mismatch |
