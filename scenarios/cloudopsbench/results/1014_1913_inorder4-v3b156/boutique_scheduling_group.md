## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2408 | 19.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/productcatalogservice + cpu_capacity_mismatch | app/productcatalogservice + cpu_capacity_mismatch |
| 36 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 70 | 1 | 1 | 1 | 1 | 1 | 1 | 0.148148 | 28 | 0 | 0 | app/redis-cart + node_affinity_mismatch | app/redis-cart + node_affinity_mismatch |
