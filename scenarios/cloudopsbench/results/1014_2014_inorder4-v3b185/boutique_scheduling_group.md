## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1933 | 19.75 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 144 | 1 | 1 | 1 | 1 | 1 | 1 | 0.125 | 25 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
| 145 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/paymentservice + taint_toleration_mismatch | app/paymentservice + taint_toleration_mismatch |
| 146 | 1 | 1 | 1 | 1 | 1 | 1 | 0.210526 | 20 | 0 | 0 | app/productcatalogservice + taint_toleration_mismatch | app/productcatalogservice + taint_toleration_mismatch |
| 147 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/redis-cart + taint_toleration_mismatch | app/redis-cart + taint_toleration_mismatch |
