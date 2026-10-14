# Cloud-OpsBench 评测 · 1014_1922

- runs: 4 个（1014_1920_boutique-admission-46 1014_1920_boutique-scheduling-25 1014_1921_boutique-scheduling-39 1014_1921_boutique-scheduling-73 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.6667 | 0.6667 | 0.0 | 0.3 | 21.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 46 | 0 | 0 | 0 | 0.666667 | 0.666667 | 0 | 0.3 | 21 | 0 | 0 | app/checkoutservice + service_dns_resolution_failure | namespace/boutique + namespace_service_quota_exceeded |
## boutique/scheduling

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3213 | 15.6667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/shippingservice + cpu_capacity_mismatch | app/shippingservice + cpu_capacity_mismatch |
| 39 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/paymentservice + memory_capacity_mismatch | app/paymentservice + memory_capacity_mismatch |
| 73 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/cartservice + node_affinity_mismatch | app/cartservice + node_affinity_mismatch |
