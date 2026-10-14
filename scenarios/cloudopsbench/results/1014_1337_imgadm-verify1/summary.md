# Cloud-OpsBench 评测 · 1014_1340

- runs: 5 个（1014_1337_boutique-startup-43 1014_1337_boutique-startup-45 1014_1338_boutique-admission-16 1014_1338_boutique-startup-46 1014_1339_boutique-admission-21 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/startup

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2742 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/checkoutservice + missing_image_pull_secret | app/checkoutservice + missing_image_pull_secret |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/emailservice + missing_image_pull_secret | app/emailservice + missing_image_pull_secret |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 0 | 0 | app/frontend + missing_image_pull_secret | app/frontend + missing_image_pull_secret |
## boutique/admission

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.875 | 0.125 | 0.5 | 0.3854 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4375 | 17 | 0 | 0 | namespace/boutique + namespace_cpu_quota_exceeded | namespace/boutique + namespace_cpu_quota_exceeded |
| 21 | 1 | 1 | 1 | 0.75 | 0 | 0 | 0.333333 | 13 | 0 | 0 | namespace/boutique + namespace_cpu_quota_exceeded | namespace/boutique + namespace_cpu_quota_exceeded |
