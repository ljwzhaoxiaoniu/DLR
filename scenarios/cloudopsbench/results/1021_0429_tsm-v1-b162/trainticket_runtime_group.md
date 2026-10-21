## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.8333 | 1.0 | 0.2487 | 15.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 84 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.230769 | 14 | 0 | 0 | app/ts-gateway-service + service_sidecar_port_conflict | app/ts-gateway-service + service_sidecar_port_conflict |
| 85 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/ts-inside-payment-service + service_sidecar_port_conflict | app/ts-inside-payment-service + service_sidecar_port_conflict |
