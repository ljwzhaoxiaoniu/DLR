# Cloud-OpsBench 评测 · 1021_0401

- runs: 4 个（1021_0359_boutique-scheduling-156 1021_0359_trainticket-runtime-66 1021_0400_boutique-codedefect-67 1021_0400_trainticket-runtime-67 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.0 | 0.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 156 | 1 | 0 | 0 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/shippingservice + node_selector_mismatch | app/shippingservice + taint_toleration_mismatch |
## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.9 | 0.8 | 0.5 | 0.4293 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 66 | 1 | 1 | 1 | 1 | 1 | 1 | 0.421053 | 20 | 0 | 0 | app/ts-order-other-service + mysql_invalid_port | app/ts-order-other-service + mysql_invalid_port |
| 67 | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4375 | 17 | 0 | 0 | app/ts-order-service + mysql_invalid_port | app/ts-order-service + mysql_invalid_port |
## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2727 | 12.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 67 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/productcatalogservice + code_busy_loop | app/productcatalogservice + code_busy_loop |
