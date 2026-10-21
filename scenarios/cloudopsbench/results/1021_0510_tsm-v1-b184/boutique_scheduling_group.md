## boutique/scheduling

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2544 | 13.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/shippingservice + node_cordon_mismatch | app/shippingservice + node_cordon_mismatch |
| 80 | 1 | 1 | 1 | 1 | 1 | 1 | 0.230769 | 14 | 0 | 0 | app/adservice + node_selector_mismatch | app/adservice + node_selector_mismatch |
| 81 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/cartservice + node_selector_mismatch | app/cartservice + node_selector_mismatch |
| 82 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 0 | 0 | app/checkoutservice + node_selector_mismatch | app/checkoutservice + node_selector_mismatch |
