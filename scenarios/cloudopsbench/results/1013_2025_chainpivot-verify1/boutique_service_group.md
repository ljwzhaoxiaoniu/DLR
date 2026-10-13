## boutique/service

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 0.875 | 0.625 | 0.5 | 0.1422 | 49.5 | 0.0076 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909091 | 67 | 0.0151515 | 0 | app/checkoutservice + service_env_var_address_mismatch | app/checkoutservice + service_env_var_address_mismatch |
| 8 | 1 | 1 | 1 | 0.75 | 0.25 | 0 | 0.193548 | 32 | 0 | 0 | app/recommendationservice + service_env_var_address_mismatch | app/recommendationservice + service_env_var_address_mismatch |
