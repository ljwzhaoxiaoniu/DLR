## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3083 | 14.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 17 | 1 | 1 | 1 | 1 | 1 | 1 | 0.416667 | 13 | 0 | 0 | app/cartservice + cpu_capacity_mismatch | app/cartservice + cpu_capacity_mismatch |
| 164 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/redis-cart + taint_toleration_mismatch | app/redis-cart + taint_toleration_mismatch |
