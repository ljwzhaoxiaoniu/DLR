# Cloud-OpsBench 评测 · 1021_0431

- runs: 4 个（1021_0429_boutique-scheduling-26 1021_0429_trainticket-runtime-84 1021_0430_boutique-codedefect-85 1021_0430_trainticket-runtime-85 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3846 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/adservice + cpu_capacity_mismatch | app/adservice + cpu_capacity_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.8333 | 1.0 | 0.2487 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 84 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.230769 | 14 | 0 | 0 | app/ts-gateway-service + service_sidecar_port_conflict | app/ts-gateway-service + service_sidecar_port_conflict |
| 85 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/ts-inside-payment-service + service_sidecar_port_conflict | app/ts-inside-payment-service + service_sidecar_port_conflict |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.25 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 85 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/shippingservice + code_busy_loop | app/shippingservice + code_busy_loop |
