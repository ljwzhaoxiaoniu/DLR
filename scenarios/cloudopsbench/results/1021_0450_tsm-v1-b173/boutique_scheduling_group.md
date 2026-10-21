## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2893 | 14.25 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/frontend + node_cordon_mismatch | app/frontend + node_cordon_mismatch |
| 40 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/productcatalogservice + memory_capacity_mismatch | app/productcatalogservice + memory_capacity_mismatch |
| 41 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/recommendationservice + memory_capacity_mismatch | app/recommendationservice + memory_capacity_mismatch |
| 42 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/redis-cart + memory_capacity_mismatch | app/redis-cart + memory_capacity_mismatch |
