## trainticket/runtime

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.9 | 0.8 | 0.5 | 0.4293 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 66 | 1 | 1 | 1 | 1 | 1 | 1 | 0.421053 | 20 | 0 | 0 | app/ts-order-other-service + mysql_invalid_port | app/ts-order-other-service + mysql_invalid_port |
| 67 | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4375 | 17 | 0 | 0 | app/ts-order-service + mysql_invalid_port | app/ts-order-service + mysql_invalid_port |
