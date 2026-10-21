## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3128 | 14.75 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 50 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/recommendationservice + memory_capacity_mismatch | app/recommendationservice + memory_capacity_mismatch |
| 51 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/redis-cart + memory_capacity_mismatch | app/redis-cart + memory_capacity_mismatch |
| 52 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/shippingservice + memory_capacity_mismatch | app/shippingservice + memory_capacity_mismatch |
| 53 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/redis-cart + pvc_capacity_mismatch | app/redis-cart + pvc_capacity_mismatch |
