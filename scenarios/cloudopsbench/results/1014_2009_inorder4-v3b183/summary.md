# Cloud-OpsBench 评测 · 1014_2011

- runs: 4 个（1014_2009_boutique-scheduling-136 1014_2009_boutique-scheduling-137 1014_2010_boutique-scheduling-138 1014_2010_boutique-scheduling-139 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2135 | 20.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 136 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_storage_class_mismatch | app/redis-cart + pvc_storage_class_mismatch |
| 137 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
| 138 | 1 | 1 | 1 | 1 | 1 | 1 | 0.181818 | 23 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
| 139 | 1 | 1 | 1 | 1 | 1 | 1 | 0.190476 | 22 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
