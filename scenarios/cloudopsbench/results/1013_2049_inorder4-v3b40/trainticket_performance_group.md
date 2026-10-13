## trainticket/performance

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 0.0 | 1.0 | 0.0 | 0.5 | 0.5 | 0.0 | 0.0588 | 52.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 0 | 1 | 0 | 0.5 | 0.5 | 0 | 0.0588235 | 52 | 0 | 0 | app/ts-payment-service + pod_network_delay | app/ts-gateway-service + pod_network_delay |
