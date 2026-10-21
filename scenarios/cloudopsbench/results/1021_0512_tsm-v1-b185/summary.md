# Cloud-OpsBench 评测 · 1021_0513

- runs: 4 个（1021_0512_boutique-scheduling-83 1021_0512_boutique-scheduling-84 1021_0512_boutique-scheduling-85 1021_0513_boutique-scheduling-86 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.9167 | 0.9167 | 0.75 | 0.197 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 83 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/emailservice + node_selector_mismatch | app/emailservice + node_selector_mismatch |
| 84 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/paymentservice + node_selector_mismatch | app/paymentservice + node_selector_mismatch |
| 85 | 1 | 1 | 1 | 0.666667 | 0.666667 | 0 | 0.142857 | 15 | 0 | 0 | app/recommendationservice + node_selector_mismatch | app/recommendationservice + node_selector_mismatch |
| 86 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/redis-cart + node_selector_mismatch | app/redis-cart + node_selector_mismatch |
