# Cloud-OpsBench 评测 · 1021_0150

- runs: 4 个（1021_0148_boutique-performance-7 1021_0148_boutique-scheduling-123 1021_0149_boutique-codedefect-34 1021_0149_trainticket-runtime-34 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4 | 16.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | app/paymentservice + pod_cpu_overload | app/paymentservice + pod_cpu_overload |
## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 123 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/currencyservice + pod_anti_affinity_conflict | app/currencyservice + pod_anti_affinity_conflict |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3 | 11.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 0 | 0 | app/frontend + code_busy_loop | app/frontend + code_busy_loop |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.75 | 0.75 | 0.0 | 0.3333 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.333333 | 13 | 0 | 0 | app/ts-auth-service + mysql_invalid_credentials | app/ts-auth-service + mysql_invalid_credentials |
