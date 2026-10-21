## boutique/codedefect

- cases: run=8 / selected=8 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2577 | 18.25 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/checkoutservice + code_wrong_argument_order | app/checkoutservice + code_wrong_argument_order |
| 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/checkoutservice + code_wrong_argument_order | app/checkoutservice + code_wrong_argument_order |
| 16 | 1 | 1 | 1 | 1 | 1 | 1 | 0.208333 | 25 | 0 | 0 | app/checkoutservice + code_missing_parameter | app/checkoutservice + code_missing_parameter |
| 18 | 1 | 1 | 1 | 1 | 1 | 1 | 0.238095 | 22 | 0 | 0 | app/checkoutservice + code_missing_parameter | app/checkoutservice + code_missing_parameter |
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.294118 | 18 | 0 | 0 | app/checkoutservice + code_wrong_return | app/checkoutservice + code_wrong_return |
| 47 | 1 | 1 | 1 | 1 | 1 | 1 | 0.235294 | 18 | 0 | 0 | app/frontend + code_missing_parameter | app/frontend + code_missing_parameter |
| 70 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/productcatalogservice + code_memory_leak | app/productcatalogservice + code_memory_leak |
| 71 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | app/productcatalogservice + code_missing_parameter | app/productcatalogservice + code_missing_parameter |
