# Cloud-OpsBench 评测 · 1021_0517

- runs: 4 个（1021_0516_boutique-scheduling-90 1021_0516_boutique-scheduling-91 1021_0516_boutique-scheduling-92 1021_0516_boutique-scheduling-93 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2202 | 14.75 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 90 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/currencyservice + node_selector_mismatch | app/currencyservice + node_selector_mismatch |
| 91 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/paymentservice + node_selector_mismatch | app/paymentservice + node_selector_mismatch |
| 92 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/productcatalogservice + node_selector_mismatch | app/productcatalogservice + node_selector_mismatch |
| 93 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | app/recommendationservice + node_selector_mismatch | app/recommendationservice + node_selector_mismatch |
