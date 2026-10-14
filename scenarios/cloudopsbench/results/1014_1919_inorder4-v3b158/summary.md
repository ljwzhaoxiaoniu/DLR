# Cloud-OpsBench 评测 · 1014_1920

- runs: 4 个（1014_1919_boutique-admission-45 1014_1919_boutique-scheduling-24 1014_1919_boutique-scheduling-72 1014_1920_boutique-scheduling-38 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3889 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.388889 | 19 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2811 | 15.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/redis-cart + cpu_capacity_mismatch | app/redis-cart + cpu_capacity_mismatch |
| 38 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/frontend + memory_capacity_mismatch | app/frontend + memory_capacity_mismatch |
| 72 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/adservice + node_affinity_mismatch | app/adservice + node_affinity_mismatch |
