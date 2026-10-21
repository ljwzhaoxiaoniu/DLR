## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 0.6667 | 1.0 | 0.2614 | 12.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 95 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.25 | 13 | 0 | 0 | app/ts-travel-service + service_sidecar_port_conflict | app/ts-travel-service + service_sidecar_port_conflict |
| 96 | 1 | 1 | 1 | 1 | 0.666667 | 1 | 0.272727 | 12 | 0 | 0 | app/ts-user-service + service_sidecar_port_conflict | app/ts-user-service + service_sidecar_port_conflict |
