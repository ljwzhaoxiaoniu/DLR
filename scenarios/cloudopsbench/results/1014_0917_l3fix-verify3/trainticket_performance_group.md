## trainticket/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 0.5 | 0.5 | 1.0 | 1.0 | 1.0 | 0.211 | 26.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | 1 | 0 | 0 | 1 | 1 | 1 | 0.285714 | 29 | 0 | 0 | app/ts-gateway-service + service_dns_resolution_failure | app/ts-gateway-service + pod_network_delay |
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.136364 | 23 | 0 | 0 | app/ts-preserve-service + pod_network_delay | app/ts-preserve-service + pod_network_delay |
