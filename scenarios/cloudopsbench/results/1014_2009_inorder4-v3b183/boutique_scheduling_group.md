## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2135 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 136 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
| 137 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
| 138 | 1 | 1 | 1 | 1 | 1 | 1 | 0.181818 | 23 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
| 139 | 1 | 1 | 1 | 1 | 1 | 1 | 0.190476 | 22 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
