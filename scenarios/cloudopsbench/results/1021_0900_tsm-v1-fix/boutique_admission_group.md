## boutique/admission

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4373 | 16.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 0 | 0 | app/adservice + missing_service_account | app/adservice + missing_service_account |
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | namespace/boutique + namespace_cpu_quota_exceeded | namespace/boutique + namespace_cpu_quota_exceeded |
| 55 | 1 | 1 | 1 | 1 | 1 | 1 | 0.411765 | 18 | 0 | 0 | namespace/boutique + namespace_storage_quota_exceeded | namespace/boutique + namespace_storage_quota_exceeded |
