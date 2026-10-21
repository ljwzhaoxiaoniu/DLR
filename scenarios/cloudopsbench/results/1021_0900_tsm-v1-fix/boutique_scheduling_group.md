## boutique/scheduling

- cases: run=6 / selected=6 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2282 | 15.1667 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/emailservice + node_cordon_mismatch | app/emailservice + node_cordon_mismatch |
| 112 | 1 | 1 | 1 | 1 | 1 | 1 | 0.222222 | 19 | 0 | 0 | app/adservice + pod_anti_affinity_conflict | app/adservice + pod_anti_affinity_conflict |
| 152 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/paymentservice + taint_toleration_mismatch | app/paymentservice + taint_toleration_mismatch |
| 156 | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 0 | 0 | app/shippingservice + taint_toleration_mismatch | app/shippingservice + taint_toleration_mismatch |
| 157 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/adservice + taint_toleration_mismatch | app/adservice + taint_toleration_mismatch |
| 162 | 1 | 1 | 1 | 1 | 1 | 1 | 0.272727 | 12 | 0 | 0 | app/paymentservice + taint_toleration_mismatch | app/paymentservice + taint_toleration_mismatch |
