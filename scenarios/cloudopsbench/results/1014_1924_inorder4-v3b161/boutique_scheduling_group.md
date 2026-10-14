## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2845 | 16.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 27 | 1 | 1 | 1 | 1 | 1 | 1 | 0.238095 | 22 | 0 | 0 | app/cartservice + cpu_capacity_mismatch | app/cartservice + cpu_capacity_mismatch |
| 41 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/recommendationservice + memory_capacity_mismatch | app/recommendationservice + memory_capacity_mismatch |
| 75 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/emailservice + node_affinity_mismatch | app/emailservice + node_affinity_mismatch |
