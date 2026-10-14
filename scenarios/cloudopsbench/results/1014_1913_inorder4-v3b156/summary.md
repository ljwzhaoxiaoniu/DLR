# Cloud-OpsBench 评测 · 1014_1917

- runs: 4 个（1014_1913_boutique-admission-43 1014_1913_boutique-scheduling-22 1014_1914_boutique-scheduling-36 1014_1914_boutique-scheduling-70 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4615 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.461538 | 14 | 0 | 0 | namespace/boutique + namespace_pod_quota_exceeded | namespace/boutique + namespace_pod_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2408 | 19.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/productcatalogservice + cpu_capacity_mismatch | app/productcatalogservice + cpu_capacity_mismatch |
| 36 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 70 | 1 | 1 | 1 | 1 | 1 | 1 | 0.148148 | 28 | 0 | 0 | app/redis-cart + node_affinity_mismatch | app/redis-cart + node_affinity_mismatch |
