# Cloud-OpsBench 评测 · 1014_2001

- runs: 4 个（1014_1958_boutique-scheduling-116 1014_1958_boutique-scheduling-117 1014_1959_boutique-scheduling-118 1014_1959_boutique-scheduling-119 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2312 | 22.0 | 0.0064 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 116 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/paymentservice + pod_anti_affinity_conflict | app/paymentservice + pod_anti_affinity_conflict |
| 117 | 1 | 1 | 1 | 1 | 1 | 1 | 0.222222 | 19 | 0 | 0 | app/productcatalogservice + pod_anti_affinity_conflict | app/productcatalogservice + pod_anti_affinity_conflict |
| 118 | 1 | 1 | 1 | 1 | 1 | 1 | 0.102564 | 40 | 0.025641 | 0 | app/redis-cart + pod_anti_affinity_conflict | app/redis-cart + pod_anti_affinity_conflict |
| 119 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/shippingservice + pod_anti_affinity_conflict | app/shippingservice + pod_anti_affinity_conflict |
