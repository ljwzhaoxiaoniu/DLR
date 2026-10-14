## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.25 | 15.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 32 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/paymentservice + cpu_capacity_mismatch | app/paymentservice + cpu_capacity_mismatch |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/emailservice + memory_capacity_mismatch | app/emailservice + memory_capacity_mismatch |
| 80 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/adservice + node_selector_mismatch | app/adservice + node_selector_mismatch |
