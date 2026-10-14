# Cloud-OpsBench 评测 · 1014_1924

- runs: 4 个（1014_1922_boutique-admission-47 1014_1922_boutique-scheduling-26 1014_1923_boutique-scheduling-40 1014_1923_boutique-scheduling-74 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.3158 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 47 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.315789 | 20 | 0 | 0 | app/currencyservice + service_dns_resolution_failure | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3178 | 14.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/adservice + cpu_capacity_mismatch | app/adservice + cpu_capacity_mismatch |
| 40 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/productcatalogservice + memory_capacity_mismatch | app/productcatalogservice + memory_capacity_mismatch |
| 74 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/currencyservice + node_affinity_mismatch | app/currencyservice + node_affinity_mismatch |
