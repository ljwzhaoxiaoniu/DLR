## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.8333 | 1.0 | 0.25 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 88 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.25 | 13 | 0 | 0 | app/ts-preserve-service + service_sidecar_port_conflict | app/ts-preserve-service + service_sidecar_port_conflict |
| 89 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/ts-price-service + service_sidecar_port_conflict | app/ts-price-service + service_sidecar_port_conflict |
