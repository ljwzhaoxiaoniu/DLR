# Cloud-OpsBench 评测 · 1010_1635

- runs: 2 个（1010_1630_boutique-runtime-1 1010_1634_boutique-runtime-1 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/runtime

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.375 | 9.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 9 | 0 | 0 | app/adservice + liveness_probe_incorrect_protocol | app/adservice + liveness_probe_incorrect_protocol |
