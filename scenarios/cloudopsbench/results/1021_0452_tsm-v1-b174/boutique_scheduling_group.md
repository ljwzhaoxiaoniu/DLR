## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2676 | 16.25 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/shippingservice + memory_capacity_mismatch | app/shippingservice + memory_capacity_mismatch |
| 44 | 1 | 1 | 1 | 1 | 1 | 1 | 0.210526 | 20 | 0 | 0 | app/cartservice + memory_capacity_mismatch | app/cartservice + memory_capacity_mismatch |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/emailservice + memory_capacity_mismatch | app/emailservice + memory_capacity_mismatch |
