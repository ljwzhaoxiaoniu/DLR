# Cloud-OpsBench 评测 · 1014_1933

- runs: 4 个（1014_1931_boutique-admission-51 1014_1931_boutique-scheduling-30 1014_1932_boutique-scheduling-44 1014_1932_boutique-scheduling-78 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.3125 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 51 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.3125 | 17 | 0 | 0 | app/productcatalogservice + service_dns_resolution_failure | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3026 | 14.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 30 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/emailservice + cpu_capacity_mismatch | app/emailservice + cpu_capacity_mismatch |
| 44 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/cartservice + memory_capacity_mismatch | app/cartservice + memory_capacity_mismatch |
| 78 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/redis-cart + node_affinity_mismatch | app/redis-cart + node_affinity_mismatch |
