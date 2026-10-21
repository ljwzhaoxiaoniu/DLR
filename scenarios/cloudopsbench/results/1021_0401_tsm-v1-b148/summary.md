# Cloud-OpsBench 评测 · 1021_0403

- runs: 4 个（1021_0401_boutique-codedefect-68 1021_0401_boutique-scheduling-157 1021_0402_boutique-scheduling-158 1021_0402_trainticket-runtime-68 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2143 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 68 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/productcatalogservice + code_artificial_delay | app/productcatalogservice + code_artificial_delay |
## boutique/scheduling

- cases: run=2 / selected=2 · invalid_actions=0 · errors={'unparsed_final_answer': 1}

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.5 | 0.5 | 0.5 | 1.0 | 1.0 | 1.0 | 0.2321 | 15.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 157 | 0 | 0 | 0 | 1 | 1 | 1 | 0.214286 | 14 | 0 | 0 |  +  | app/adservice + taint_toleration_mismatch |
| 158 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/cartservice + taint_toleration_mismatch | app/cartservice + taint_toleration_mismatch |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4375 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 68 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 0 | 0 | app/ts-payment-service + mysql_invalid_port | app/ts-payment-service + mysql_invalid_port |
