# Cloud-OpsBench 评测 · 1013_2152

- runs: 1 个（1013_2150_boutique-codedefect-24 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/codedefect

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 0.0 | 0.0 | 0.8 | 0.4 | 0.0 | 0.1538 | 27.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 24 | 0 | 0 | 0 | 0.8 | 0.4 | 0 | 0.153846 | 27 | 0 | 0 | node/worker-02 + node_network_delay | app/checkoutservice + code_wrong_return |
