## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2811 | 15.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/redis-cart + cpu_capacity_mismatch | app/redis-cart + cpu_capacity_mismatch |
| 38 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/frontend + memory_capacity_mismatch | app/frontend + memory_capacity_mismatch |
| 72 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/adservice + node_affinity_mismatch | app/adservice + node_affinity_mismatch |
