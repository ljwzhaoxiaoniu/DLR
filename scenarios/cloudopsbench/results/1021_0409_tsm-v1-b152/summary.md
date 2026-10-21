# Cloud-OpsBench 评测 · 1021_0411

- runs: 4 个（1021_0409_boutique-codedefect-72 1021_0409_trainticket-runtime-72 1021_0410_boutique-codedefect-73 1021_0410_boutique-scheduling-162 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1954 | 16.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 72 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/productcatalogservice + code_excessive_file_reads | app/productcatalogservice + code_excessive_file_reads |
| 73 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/productcatalogservice + code_excessive_file_reads | app/productcatalogservice + code_excessive_file_reads |
## trainticket/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.8 | 0.6 | 0.0 | 0.4444 | 19.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 72 | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.444444 | 19 | 0 | 0 | app/ts-station-food-service + mysql_invalid_port | app/ts-station-food-service + mysql_invalid_port |
## boutique/scheduling

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.0 | 0.0 | 1.0 | 1.0 | 1.0 | 0.2308 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 162 | 1 | 0 | 0 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/paymentservice + node_selector_mismatch | app/paymentservice + taint_toleration_mismatch |
