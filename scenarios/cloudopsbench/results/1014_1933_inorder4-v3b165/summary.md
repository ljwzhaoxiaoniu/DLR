# Cloud-OpsBench 评测 · 1014_1935

- runs: 4 个（1014_1933_boutique-admission-52 1014_1933_boutique-scheduling-31 1014_1934_boutique-scheduling-45 1014_1934_boutique-scheduling-79 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3636 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 52 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 23 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3071 | 14.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 31 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/frontend + cpu_capacity_mismatch | app/frontend + cpu_capacity_mismatch |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 79 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/shippingservice + node_affinity_mismatch | app/shippingservice + node_affinity_mismatch |
