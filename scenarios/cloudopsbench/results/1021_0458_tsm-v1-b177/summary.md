# Cloud-OpsBench 评测 · 1021_0459

- runs: 4 个（1021_0458_boutique-scheduling-54 1021_0458_boutique-scheduling-55 1021_0459_boutique-scheduling-56 1021_0459_boutique-scheduling-57 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3544 | 13.75 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 54 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/redis-cart + pvc_capacity_mismatch | app/redis-cart + pvc_capacity_mismatch |
| 55 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/redis-cart + pvc_capacity_mismatch | app/redis-cart + pvc_capacity_mismatch |
| 56 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/adservice + node_affinity_mismatch | app/adservice + node_affinity_mismatch |
| 57 | 1 | 1 | 1 | 1 | 1 | 1 | 0.363636 | 12 | 0 | 0 | app/cartservice + node_affinity_mismatch | app/cartservice + node_affinity_mismatch |
