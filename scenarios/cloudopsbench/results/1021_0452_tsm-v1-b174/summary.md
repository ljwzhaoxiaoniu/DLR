# Cloud-OpsBench 评测 · 1021_0454

- runs: 4 个（1021_0452_boutique-scheduling-43 1021_0452_boutique-scheduling-44 1021_0453_boutique-scheduling-45 1021_0453_boutique-scheduling-46 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2676 | 16.25 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/shippingservice + memory_capacity_mismatch | app/shippingservice + memory_capacity_mismatch |
| 44 | 1 | 1 | 1 | 1 | 1 | 1 | 0.210526 | 20 | 0 | 0 | app/cartservice + memory_capacity_mismatch | app/cartservice + memory_capacity_mismatch |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/checkoutservice + memory_capacity_mismatch | app/checkoutservice + memory_capacity_mismatch |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/emailservice + memory_capacity_mismatch | app/emailservice + memory_capacity_mismatch |
