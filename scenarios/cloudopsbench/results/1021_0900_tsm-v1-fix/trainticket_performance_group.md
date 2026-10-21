## trainticket/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2604 | 16.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/ts-payment-service + pod_network_delay | app/ts-payment-service + pod_network_delay |
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/ts-preserve-service + pod_network_delay | app/ts-preserve-service + pod_network_delay |
