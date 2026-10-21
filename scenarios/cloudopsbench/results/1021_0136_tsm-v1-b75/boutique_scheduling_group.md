## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.6667 | 0.0 | 0.0 | 0.1667 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 121 | 1 | 1 | 1 | 0.666667 | 0 | 0 | 0.166667 | 13 | 0 | 0 | app/cartservice + pod_anti_affinity_conflict | app/cartservice + pod_anti_affinity_conflict |
