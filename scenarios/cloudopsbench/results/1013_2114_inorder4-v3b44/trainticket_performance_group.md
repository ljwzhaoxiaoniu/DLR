## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 1.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.1379 | 30.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 26 | 0 | 1 | 0 | 0.5 | 0.5 | 0 | 0.137931 | 30 | 0 | 0 | app/ts-basic-service + pod_network_delay | app/ts-preserve-service + pod_network_delay |
