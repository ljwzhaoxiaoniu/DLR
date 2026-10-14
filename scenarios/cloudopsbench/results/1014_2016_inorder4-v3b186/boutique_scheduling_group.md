## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1855 | 18.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 148 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/shippingservice + taint_toleration_mismatch | app/shippingservice + taint_toleration_mismatch |
| 149 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/adservice + taint_toleration_mismatch | app/adservice + taint_toleration_mismatch |
| 150 | 1 | 1 | 1 | 1 | 1 | 1 | 0.166667 | 19 | 0 | 0 | app/checkoutservice + taint_toleration_mismatch | app/checkoutservice + taint_toleration_mismatch |
| 151 | 1 | 1 | 1 | 1 | 1 | 1 | 0.222222 | 19 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
