## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1646 | 19.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 140 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/redis-cart + pv_binding_occupied | app/redis-cart + pv_binding_occupied |
| 141 | 1 | 1 | 1 | 1 | 1 | 1 | 0.157895 | 20 | 0 | 0 | app/adservice + taint_toleration_mismatch | app/adservice + taint_toleration_mismatch |
| 142 | 1 | 1 | 1 | 1 | 1 | 1 | 0.136364 | 23 | 0 | 0 | app/cartservice + taint_toleration_mismatch | app/cartservice + taint_toleration_mismatch |
| 143 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/currencyservice + taint_toleration_mismatch | app/currencyservice + taint_toleration_mismatch |
