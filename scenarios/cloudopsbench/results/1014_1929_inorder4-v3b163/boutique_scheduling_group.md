## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3148 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 29 | 1 | 1 | 1 | 1 | 1 | 1 | 0.277778 | 19 | 0 | 0 | app/currencyservice + cpu_capacity_mismatch | app/currencyservice + cpu_capacity_mismatch |
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/shippingservice + memory_capacity_mismatch | app/shippingservice + memory_capacity_mismatch |
| 77 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/productcatalogservice + node_affinity_mismatch | app/productcatalogservice + node_affinity_mismatch |
