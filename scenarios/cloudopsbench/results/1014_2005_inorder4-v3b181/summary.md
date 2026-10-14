# Cloud-OpsBench 评测 · 1014_2007

- runs: 4 个（1014_2005_boutique-scheduling-128 1014_2005_boutique-scheduling-129 1014_2006_boutique-scheduling-130 1014_2006_boutique-scheduling-131 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3583 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 128 | 1 | 1 | 1 | 1 | 1 | 1 | 0.388889 | 19 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 129 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 130 | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 0 | 0 | app/redis-cart + pvc_access_mode_mismatch | app/redis-cart + pvc_access_mode_mismatch |
| 131 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | app/redis-cart + pvc_selector_mismatch | app/redis-cart + pvc_selector_mismatch |
