## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.75 | 0.75 | 0.0 | 0.3333 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 55 | 0 | 0 | 0 | 0.75 | 0.75 | 0 | 0.333333 | 19 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | namespace/boutique + namespace_storage_quota_exceeded |
