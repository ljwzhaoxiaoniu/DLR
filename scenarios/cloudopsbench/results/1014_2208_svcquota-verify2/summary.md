# Cloud-OpsBench 评测 · 1014_2212

- runs: 9 个（1014_2208_boutique-admission-44 1014_2208_boutique-admission-46 1014_2209_boutique-admission-47 1014_2209_boutique-admission-50 1014_2210_boutique-admission-16 1014_2210_boutique-admission-35 1014_2210_boutique-admission-51 1014_2210_boutique-admission-53 1014_2211_boutique-admission-45 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=9 / selected=9 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6944 | 1.0 | 0.3864 | 15.1111 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.357143 | 15 | 0 | 0 | namespace/boutique + namespace_cpu_quota_exceeded | namespace/boutique + namespace_cpu_quota_exceeded |
| 35 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | namespace/boutique + namespace_pod_quota_exceeded | namespace/boutique + namespace_pod_quota_exceeded |
| 44 | 1 | 1 | 1 | 1 | 0.333333 | 1 | 0.363636 | 12 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 45 | 1 | 1 | 1 | 1 | 0.333333 | 1 | 0.428571 | 15 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 46 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.428571 | 15 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 47 | 1 | 1 | 1 | 1 | 1 | 1 | 0.352941 | 18 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 50 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.333333 | 16 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 51 | 1 | 1 | 1 | 1 | 1 | 1 | 0.428571 | 15 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
| 53 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | namespace/boutique + namespace_service_quota_exceeded | namespace/boutique + namespace_service_quota_exceeded |
