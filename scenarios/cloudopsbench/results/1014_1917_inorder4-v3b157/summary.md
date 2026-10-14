# Cloud-OpsBench 评测 · 1014_1918

- runs: 4 个（1014_1917_boutique-admission-44 1014_1917_boutique-scheduling-23 1014_1918_boutique-scheduling-37 1014_1918_boutique-scheduling-71 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.25 | 21.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 44 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.25 | 21 | 0 | 0 | app/adservice + service_dns_resolution_failure | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3111 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 23 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/recommendationservice + cpu_capacity_mismatch | app/recommendationservice + cpu_capacity_mismatch |
| 37 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/currencyservice + memory_capacity_mismatch | app/currencyservice + memory_capacity_mismatch |
| 71 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/shippingservice + node_affinity_mismatch | app/shippingservice + node_affinity_mismatch |
