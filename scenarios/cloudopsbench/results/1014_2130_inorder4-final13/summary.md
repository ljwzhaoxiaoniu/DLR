# Cloud-OpsBench 评测 · 1014_2149

- runs: 13 个（1014_2130_boutique-scheduling-152 1014_2130_boutique-scheduling-153 1014_2131_boutique-scheduling-154 1014_2131_boutique-scheduling-155 1014_2132_boutique-scheduling-156 1014_2139_boutique-scheduling-158 1014_2140_boutique-scheduling-157 1014_2143_boutique-scheduling-160 1014_2144_boutique-scheduling-159 1014_2145_boutique-scheduling-161 1014_2146_boutique-scheduling-162 1014_2147_boutique-scheduling-163 1014_2148_boutique-scheduling-164 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/scheduling

- cases: run=13 / selected=13 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1542 | 24.3846 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 152 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/paymentservice + taint_toleration_mismatch | app/paymentservice + taint_toleration_mismatch |
| 153 | 1 | 1 | 1 | 1 | 1 | 1 | 0.176471 | 18 | 0 | 0 | app/productcatalogservice + taint_toleration_mismatch | app/productcatalogservice + taint_toleration_mismatch |
| 154 | 1 | 1 | 1 | 1 | 1 | 1 | 0.285714 | 15 | 0 | 0 | app/recommendationservice + taint_toleration_mismatch | app/recommendationservice + taint_toleration_mismatch |
| 155 | 1 | 1 | 1 | 1 | 1 | 1 | 0.0857143 | 36 | 0 | 0 | app/redis-cart + taint_toleration_mismatch | app/redis-cart + taint_toleration_mismatch |
| 156 | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909091 | 34 | 0 | 0 | app/shippingservice + taint_toleration_mismatch | app/shippingservice + taint_toleration_mismatch |
| 157 | 1 | 1 | 1 | 1 | 1 | 1 | 0.15 | 21 | 0 | 0 | app/adservice + taint_toleration_mismatch | app/adservice + taint_toleration_mismatch |
| 158 | 1 | 1 | 1 | 1 | 1 | 1 | 0.115385 | 27 | 0 | 0 | app/cartservice + taint_toleration_mismatch | app/cartservice + taint_toleration_mismatch |
| 159 | 1 | 1 | 1 | 1 | 1 | 1 | 0.166667 | 19 | 0 | 0 | app/currencyservice + taint_toleration_mismatch | app/currencyservice + taint_toleration_mismatch |
| 160 | 1 | 1 | 1 | 1 | 1 | 1 | 0.111111 | 28 | 0 | 0 | app/emailservice + taint_toleration_mismatch | app/emailservice + taint_toleration_mismatch |
| 161 | 1 | 1 | 1 | 1 | 1 | 1 | 0.125 | 25 | 0 | 0 | app/frontend + taint_toleration_mismatch | app/frontend + taint_toleration_mismatch |
| 162 | 1 | 1 | 1 | 1 | 1 | 1 | 0.142857 | 29 | 0 | 0 | app/paymentservice + taint_toleration_mismatch | app/paymentservice + taint_toleration_mismatch |
| 163 | 1 | 1 | 1 | 1 | 1 | 1 | 0.115385 | 27 | 0 | 0 | app/recommendationservice + taint_toleration_mismatch | app/recommendationservice + taint_toleration_mismatch |
| 164 | 1 | 1 | 1 | 1 | 1 | 1 | 0.263158 | 20 | 0 | 0 | app/redis-cart + taint_toleration_mismatch | app/redis-cart + taint_toleration_mismatch |
