# Cloud-OpsBench 评测 · 1021_0910

- runs: 64 个（1020_2040_boutique-admission-1 1020_2040_boutique-performance-10 1020_2040_boutique-performance-11 1020_2041_boutique-admission-12 1020_2049_trainticket-service-11 1020_2049_trainticket-service-13 1020_2050_trainticket-service-12 1020_2059_boutique-codedefect-1 1020_2059_boutique-startup-1 1021_0012_trainticket-runtime-25 1021_0013_trainticket-service-16 1021_0014_trainticket-performance-25 1021_0015_boutique-infrastructure-25 1021_0017_boutique-infrastructure-14 1021_0019_boutique-codedefect-2 1021_0026_boutique-performance-25 1021_0029_boutique-codedefect-16 1021_0030_boutique-performance-24 1021_0031_boutique-service-2 1021_0033_boutique-scheduling-112 1021_0034_boutique-codedefect-25 1021_0035_boutique-codedefect-18 1021_0705_boutique-scheduling-162 1021_0705_trainticket-performance-26 1021_0706_trainticket-runtime-33 1021_0707_trainticket-runtime-29 1021_0707_trainticket-runtime-34 1021_0708_boutique-performance-29 1021_0708_trainticket-runtime-36 1021_0709_boutique-scheduling-12 1021_0709_trainticket-runtime-37 1021_0712_boutique-codedefect-47 1021_0713_boutique-startup-49 1021_0714_boutique-admission-55 1021_0715_boutique-scheduling-152 1021_0843_boutique-scheduling-156 1021_0843_trainticket-runtime-49 1021_0844_boutique-scheduling-157 1021_0844_trainticket-runtime-51 1021_0845_boutique-codedefect-70 1021_0845_trainticket-runtime-52 1021_0845_trainticket-runtime-53 1021_0846_boutique-codedefect-71 1021_0846_trainticket-runtime-54 1021_0847_trainticket-runtime-55 1021_0848_trainticket-runtime-58 1021_0849_trainticket-runtime-62 1021_0850_trainticket-runtime-64 1021_0851_trainticket-runtime-38 1021_0851_trainticket-runtime-65 1021_0852_trainticket-runtime-39 1021_0852_trainticket-runtime-67 1021_0853_trainticket-runtime-40 1021_0853_trainticket-runtime-41 1021_0853_trainticket-runtime-72 1021_0853_trainticket-runtime-75 1021_0854_trainticket-runtime-42 1021_0854_trainticket-runtime-76 1021_0855_trainticket-runtime-43 1021_0855_trainticket-runtime-77 1021_0856_trainticket-runtime-45 1021_0856_trainticket-runtime-78 1021_0857_trainticket-runtime-46 1021_0857_trainticket-runtime-47 ）
- model: dsh-tsm · checkout: /d/Code_Proj/Cloud-OpsBench（快照 ea05daf）
- 指标：CA/FA/JRA=结果对上错；MC/EOC/ECR/EE=流程分（证据链）；steps/RAR/inv=过程统计

## boutique/admission

- cases: run=3 / selected=3 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.4373 | 16.3333 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 0 | 0 | app/adservice + missing_service_account | app/adservice + missing_service_account |
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 0 | 0 | namespace/boutique + namespace_cpu_quota_exceeded | namespace/boutique + namespace_cpu_quota_exceeded |
| 55 | 1 | 1 | 1 | 1 | 1 | 1 | 0.411765 | 18 | 0 | 0 | namespace/boutique + namespace_storage_quota_exceeded | namespace/boutique + namespace_storage_quota_exceeded |
## boutique/performance

- cases: run=5 / selected=5 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2367 | 14.4 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 10 | 1 | 1 | 1 | 1 | 1 | 1 | 0.166667 | 13 | 0 | 0 | app/redis-cart + pod_cpu_overload | app/redis-cart + pod_cpu_overload |
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 0 | 0 | app/shippingservice + pod_cpu_overload | app/shippingservice + pod_cpu_overload |
| 24 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.266667 | 16 | 0 | 0 | node/worker-02 + node_network_delay | node/worker-02 + node_network_delay |
| 29 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/worker-02 + node_network_packet_loss | node/worker-02 + node_network_packet_loss |
## trainticket/service

- cases: run=4 / selected=4 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3134 | 19.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 11 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
| 12 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
| 13 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 31 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
| 16 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/ts-gateway-service + gateway_misrouted | app/ts-gateway-service + gateway_misrouted |
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
## boutique/startup

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3155 | 14.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0.416667 | 13 | 0 | 0 | app/adservice + image_registry_dns_failure | app/adservice + image_registry_dns_failure |
| 49 | 1 | 1 | 1 | 1 | 1 | 1 | 0.214286 | 15 | 0 | 0 | app/redis-cart + missing_image_pull_secret | app/redis-cart + missing_image_pull_secret |
## trainticket/runtime

- cases: run=31 / selected=31 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.3549 | 17.5161 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.107143 | 29 | 0 | 0 | app/ts-price-service + deployment_zero_replicas | app/ts-price-service + deployment_zero_replicas |
| 29 | 1 | 1 | 1 | 1 | 1 | 1 | 0.142857 | 22 | 0 | 0 | app/ts-station-service + deployment_zero_replicas | app/ts-station-service + deployment_zero_replicas |
| 33 | 1 | 1 | 1 | 1 | 1 | 1 | 0.307692 | 14 | 0 | 0 | app/ts-assurance-service + mysql_invalid_credentials | app/ts-assurance-service + mysql_invalid_credentials |
| 34 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-auth-service + mysql_invalid_credentials | app/ts-auth-service + mysql_invalid_credentials |
| 36 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/ts-contacts-service + mysql_invalid_credentials | app/ts-contacts-service + mysql_invalid_credentials |
| 37 | 1 | 1 | 1 | 1 | 1 | 1 | 0.277778 | 19 | 0 | 0 | app/ts-delivery-service + mysql_invalid_credentials | app/ts-delivery-service + mysql_invalid_credentials |
| 38 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/ts-food-delivery-service + mysql_invalid_credentials | app/ts-food-delivery-service + mysql_invalid_credentials |
| 39 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/ts-food-service + mysql_invalid_credentials | app/ts-food-service + mysql_invalid_credentials |
| 40 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-inside-payment-service + mysql_invalid_credentials | app/ts-inside-payment-service + mysql_invalid_credentials |
| 41 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/ts-notification-service + mysql_invalid_credentials | app/ts-notification-service + mysql_invalid_credentials |
| 42 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/ts-order-other-service + mysql_invalid_credentials | app/ts-order-other-service + mysql_invalid_credentials |
| 43 | 1 | 1 | 1 | 1 | 1 | 1 | 0.277778 | 19 | 0 | 0 | app/ts-order-service + mysql_invalid_credentials | app/ts-order-service + mysql_invalid_credentials |
| 45 | 1 | 1 | 1 | 1 | 1 | 1 | 0.428571 | 15 | 0 | 0 | app/ts-price-service + mysql_invalid_credentials | app/ts-price-service + mysql_invalid_credentials |
| 46 | 1 | 1 | 1 | 1 | 1 | 1 | 0.416667 | 13 | 0 | 0 | app/ts-route-service + mysql_invalid_credentials | app/ts-route-service + mysql_invalid_credentials |
| 47 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-security-service + mysql_invalid_credentials | app/ts-security-service + mysql_invalid_credentials |
| 49 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-station-service + mysql_invalid_credentials | app/ts-station-service + mysql_invalid_credentials |
| 51 | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 0 | 0 | app/ts-train-food-service + mysql_invalid_credentials | app/ts-train-food-service + mysql_invalid_credentials |
| 52 | 1 | 1 | 1 | 1 | 1 | 1 | 0.384615 | 14 | 0 | 0 | app/ts-train-service + mysql_invalid_credentials | app/ts-train-service + mysql_invalid_credentials |
| 53 | 1 | 1 | 1 | 1 | 1 | 1 | 0.357143 | 15 | 0 | 0 | app/ts-travel2-service + mysql_invalid_credentials | app/ts-travel2-service + mysql_invalid_credentials |
| 54 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-travel-service + mysql_invalid_credentials | app/ts-travel-service + mysql_invalid_credentials |
| 55 | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | app/ts-user-service + mysql_invalid_credentials | app/ts-user-service + mysql_invalid_credentials |
| 58 | 1 | 1 | 1 | 1 | 1 | 1 | 0.470588 | 18 | 0 | 0 | app/ts-auth-service + mysql_invalid_port | app/ts-auth-service + mysql_invalid_port |
| 62 | 1 | 1 | 1 | 1 | 1 | 1 | 0.444444 | 19 | 0 | 0 | app/ts-food-delivery-service + mysql_invalid_port | app/ts-food-delivery-service + mysql_invalid_port |
| 64 | 1 | 1 | 1 | 1 | 1 | 1 | 0.421053 | 20 | 0 | 0 | app/ts-inside-payment-service + mysql_invalid_port | app/ts-inside-payment-service + mysql_invalid_port |
| 65 | 1 | 1 | 1 | 1 | 1 | 1 | 0.444444 | 19 | 0 | 0 | app/ts-notification-service + mysql_invalid_port | app/ts-notification-service + mysql_invalid_port |
| 67 | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 17 | 0 | 0 | app/ts-order-service + mysql_invalid_port | app/ts-order-service + mysql_invalid_port |
| 72 | 1 | 1 | 1 | 1 | 1 | 1 | 0.315789 | 20 | 0 | 0 | app/ts-station-food-service + mysql_invalid_port | app/ts-station-food-service + mysql_invalid_port |
| 75 | 1 | 1 | 1 | 1 | 1 | 1 | 0.388889 | 19 | 0 | 0 | app/ts-train-service + mysql_invalid_port | app/ts-train-service + mysql_invalid_port |
| 76 | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 0 | 0 | app/ts-travel2-service + mysql_invalid_port | app/ts-travel2-service + mysql_invalid_port |
| 77 | 1 | 1 | 1 | 1 | 1 | 1 | 0.421053 | 20 | 0 | 0 | app/ts-travel-service + mysql_invalid_port | app/ts-travel-service + mysql_invalid_port |
| 78 | 1 | 1 | 1 | 1 | 1 | 1 | 0.470588 | 18 | 0 | 0 | app/ts-user-service + mysql_invalid_port | app/ts-user-service + mysql_invalid_port |
## trainticket/performance

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.2604 | 16.5 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.333333 | 16 | 0 | 0 | app/ts-payment-service + pod_network_delay | app/ts-payment-service + pod_network_delay |
| 26 | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 0 | 0 | app/ts-preserve-service + pod_network_delay | app/ts-preserve-service + pod_network_delay |
## boutique/infrastructure

- cases: run=2 / selected=2 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.35 | 17.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 14 | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 0 | 0 | node/worker-02 + kube_proxy_unavailable | node/worker-02 + kube_proxy_unavailable |
| 25 | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 0 | 0 | node/master + kube_scheduler_unavailable | node/master + kube_scheduler_unavailable |
## boutique/service

- cases: run=1 / selected=1 · invalid_actions=0

| CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | invalid_actions |
|---|---|---|---|---|---|---|---|---|---|
| 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 1.0 | 0.1818 | 23.0 | 0.0 | 0.0 |

| case | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | pred#1 | gt |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 | 1 | 1 | 1 | 1 | 1 | 1 | 0.181818 | 23 | 0 | 0 | app/checkoutservice + service_env_var_address_mismatch | app/checkoutservice + service_env_var_address_mismatch |
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
