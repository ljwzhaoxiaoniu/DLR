## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.9167 | 0.9167 | 0.75 | 0.197 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 83 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/emailservice + node_selector_mismatch | app/emailservice + node_selector_mismatch |
| 84 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/paymentservice + node_selector_mismatch | app/paymentservice + node_selector_mismatch |
| 85 | 1 | 1 | 1 | 0.666667 | 0.666667 | 0 | 0.142857 | 15 | 0 | 0 | app/recommendationservice + node_selector_mismatch | app/recommendationservice + node_selector_mismatch |
| 86 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/redis-cart + node_selector_mismatch | app/redis-cart + node_selector_mismatch |
