## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6667 | 1.0 | 0.1304 | 24.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 144 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.130435 | 24 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
