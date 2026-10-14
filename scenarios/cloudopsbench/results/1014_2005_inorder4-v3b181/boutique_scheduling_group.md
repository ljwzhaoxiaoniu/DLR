## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3583 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 128 | 1 | 1 | 1 | 1 | 1 | 1 | 0.388889 | 19 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 129 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 130 | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 131 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
