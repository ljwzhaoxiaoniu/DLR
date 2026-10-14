## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3131 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 132 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 22 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
| 133 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
| 134 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
| 135 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
