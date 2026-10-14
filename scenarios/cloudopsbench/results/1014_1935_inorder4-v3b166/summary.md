# Cloud-OpsBench 评测 · 1014_1937

- runs: 4 个（1014_1935_boutique-admission-53 1014_1935_boutique-scheduling-32 1014_1936_boutique-scheduling-80 1014_1937_boutique-scheduling-46 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.2692 | 27.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 53 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.269231 | 27 | 0 | 0 | app/redis-cart + service_dns_resolution_failure | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.25 | 15.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 32 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/paymentservice + cpu_capacity_mismatch | app/paymentservice + cpu_capacity_mismatch |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/emailservice + memory_capacity_mismatch | app/emailservice + memory_capacity_mismatch |
| 80 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/adservice + node_selector_mismatch | app/adservice + node_selector_mismatch |
