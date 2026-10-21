# Cloud-OpsBench 评测 · 1021_0458

- runs: 4 个（1021_0456_boutique-scheduling-50 1021_0456_boutique-scheduling-51 1021_0457_boutique-scheduling-52 1021_0457_boutique-scheduling-53 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3128 | 14.75 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 50 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/recommendationservice + memory_capacity_mismatch | app/recommendationservice + memory_capacity_mismatch |
| 51 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/redis-cart + memory_capacity_mismatch | app/redis-cart + memory_capacity_mismatch |
| 52 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 13 | 0 | 0 | app/shippingservice + memory_capacity_mismatch | app/shippingservice + memory_capacity_mismatch |
| 53 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/redis-cart + pvc_capacity_mismatch | app/redis-cart + pvc_capacity_mismatch |
