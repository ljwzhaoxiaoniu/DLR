## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3102 | 14.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/productcatalogservice + node_cordon_mismatch | app/productcatalogservice + node_cordon_mismatch |
| 58 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/currencyservice + node_affinity_mismatch | app/currencyservice + node_affinity_mismatch |
| 59 | 1 | 1 | 1 | 1 | 1 | 1 | 0.210526 | 20 | 0 | 0 | app/emailservice + node_affinity_mismatch | app/emailservice + node_affinity_mismatch |
| 60 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/frontend + node_affinity_mismatch | app/frontend + node_affinity_mismatch |
