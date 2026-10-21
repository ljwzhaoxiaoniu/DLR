# Cloud-OpsBench 评测 · 1021_0448

- runs: 4 个（1021_0447_boutique-scheduling-37 1021_0447_trainticket-runtime-95 1021_0448_boutique-codedefect-96 1021_0448_trainticket-runtime-96 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2857 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 37 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/currencyservice + memory_capacity_mismatch | app/currencyservice + memory_capacity_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6667 | 1.0 | 0.2614 | 12.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 95 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.25 | 13 | 0 | 0 | app/ts-travel-service + service_sidecar_port_conflict | app/ts-travel-service + service_sidecar_port_conflict |
| 96 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.272727 | 12 | 0 | 0 | app/ts-user-service + service_sidecar_port_conflict | app/ts-user-service + service_sidecar_port_conflict |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2 | 16.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 96 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/shippingservice + code_excessive_file_writes | app/shippingservice + code_excessive_file_writes |
