# Cloud-OpsBench 评测 · 1014_2009

- runs: 4 个（1014_2007_boutique-scheduling-132 1014_2007_boutique-scheduling-133 1014_2008_boutique-scheduling-134 1014_2008_boutique-scheduling-135 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3131 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 132 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 22 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
| 133 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
| 134 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
| 135 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
