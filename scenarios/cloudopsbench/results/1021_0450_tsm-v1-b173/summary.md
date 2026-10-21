# Cloud-OpsBench 评测 · 1021_0452

- runs: 4 个（1021_0450_boutique-scheduling-4 1021_0450_boutique-scheduling-40 1021_0451_boutique-scheduling-41 1021_0451_boutique-scheduling-42 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2893 | 14.25 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 4 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/frontend + node_cordon_mismatch | app/frontend + node_cordon_mismatch |
| 40 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/productcatalogservice + memory_capacity_mismatch | app/productcatalogservice + memory_capacity_mismatch |
| 41 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/recommendationservice + memory_capacity_mismatch | app/recommendationservice + memory_capacity_mismatch |
| 42 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/redis-cart + memory_capacity_mismatch | app/redis-cart + memory_capacity_mismatch |
