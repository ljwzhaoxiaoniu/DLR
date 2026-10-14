# Cloud-OpsBench 评测 · 1014_0916

- runs: 4 个（1014_0906_boutique-codedefect-59 1014_0906_boutique-codedefect-71 1014_0908_boutique-performance-18 1014_0908_boutique-performance-24 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2063 | 20.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 59 | 1 | 1 | 1 | 1 | 1 | 1 | 0.222222 | 19 | 0 | 0 | app/frontend + code_wrong_return | app/frontend + code_wrong_return |
| 71 | 1 | 1 | 1 | 1 | 1 | 1 | 0.190476 | 22 | 0 | 0 | app/productcatalogservice + code_missing_parameter | app/productcatalogservice + code_missing_parameter |
## boutique/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1734 | 24.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 18 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/paymentservice + pod_network_delay | app/paymentservice + pod_network_delay |
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.0967742 | 32 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
