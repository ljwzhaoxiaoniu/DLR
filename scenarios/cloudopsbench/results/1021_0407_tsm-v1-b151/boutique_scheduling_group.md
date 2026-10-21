## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 160 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
| 161 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/frontend + taint_toleration_mismatch | app/frontend + taint_toleration_mismatch |
