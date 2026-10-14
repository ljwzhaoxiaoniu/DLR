# Cloud-OpsBench 评测 · 1014_2003

- runs: 4 个（1014_2001_boutique-scheduling-120 1014_2001_boutique-scheduling-121 1014_2002_boutique-scheduling-122 1014_2002_boutique-scheduling-123 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2081 | 15.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 120 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/adservice + pod_anti_affinity_conflict | app/adservice + pod_anti_affinity_conflict |
| 121 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/cartservice + pod_anti_affinity_conflict | app/cartservice + pod_anti_affinity_conflict |
| 122 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/checkoutservice + pod_anti_affinity_conflict | app/checkoutservice + pod_anti_affinity_conflict |
| 123 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/currencyservice + pod_anti_affinity_conflict | app/currencyservice + pod_anti_affinity_conflict |
