# Cloud-OpsBench 评测 · 1021_0443

- runs: 4 个（1021_0441_boutique-scheduling-33 1021_0441_trainticket-runtime-91 1021_0442_boutique-codedefect-92 1021_0442_trainticket-runtime-92 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3125 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 33 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/recommendationservice + cpu_capacity_mismatch | app/recommendationservice + cpu_capacity_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.8333 | 1.0 | 0.2301 | 14.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 91 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.272727 | 12 | 0 | 0 | app/ts-seat-service + service_sidecar_port_conflict | app/ts-seat-service + service_sidecar_port_conflict |
| 92 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/ts-security-service + service_sidecar_port_conflict | app/ts-security-service + service_sidecar_port_conflict |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2143 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 92 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/shippingservice + code_excessive_file_reads | app/shippingservice + code_excessive_file_reads |
