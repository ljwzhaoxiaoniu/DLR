# Cloud-OpsBench 评测 · 1021_0519

- runs: 4 个（1021_0517_boutique-scheduling-94 1021_0517_boutique-scheduling-95 1021_0518_boutique-scheduling-96 1021_0518_boutique-scheduling-97 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2413 | 13.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 94 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/redis-cart + node_selector_mismatch | app/redis-cart + node_selector_mismatch |
| 95 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/shippingservice + node_selector_mismatch | app/shippingservice + node_selector_mismatch |
| 96 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/cartservice + node_selector_mismatch | app/cartservice + node_selector_mismatch |
| 97 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/checkoutservice + node_selector_mismatch | app/checkoutservice + node_selector_mismatch |
