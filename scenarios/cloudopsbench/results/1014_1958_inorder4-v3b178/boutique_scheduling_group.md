## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2312 | 22.0 | 0.0064 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 116 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/paymentservice + pod_anti_affinity_conflict | app/paymentservice + pod_anti_affinity_conflict |
| 117 | 1 | 1 | 1 | 1 | 1 | 1 | 0.222222 | 19 | 0 | 0 | app/productcatalogservice + pod_anti_affinity_conflict | app/productcatalogservice + pod_anti_affinity_conflict |
| 118 | 1 | 1 | 1 | 1 | 1 | 1 | 0.102564 | 40 | 0.025641 | 0 | app/redis-cart + pod_anti_affinity_conflict | app/redis-cart + pod_anti_affinity_conflict |
| 119 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/shippingservice + pod_anti_affinity_conflict | app/shippingservice + pod_anti_affinity_conflict |
