# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **54/54** 题：JRA ✅54 ❌0 ｜ 证据链全闭 50 ｜ token 中位 151,060 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 117,099 | 0 | 0 | 1020_2001_tsm-v1-b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 278,264 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 138,063 | 0 | 0 | 1021_0121_tsm-v1-b68 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 167,327 | 0 | 0 | 1021_0221_tsm-v1-b98 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2273 | 23 | 245,518 | 0 | 0 | 1021_0308_tsm-v1-b122 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 0.75 | 0.25 | 0 | 0.2174 | 24 | 321,600 | 0 | 0 | 1021_0328_tsm-v1-b132 | 结果对·链未闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 145,611 | 0 | 0 | 1021_0333_tsm-v1-b134 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 179,293 | 0 | 0 | 1021_0335_tsm-v1-b135 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 125,568 | 0 | 0 | 1021_0339_tsm-v1-b137 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 123,097 | 0 | 0 | 1020_2006_tsm-v1-b5 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 126,559 | 0 | 0 | 1020_2011_tsm-v1-b8 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 192,363 | 0 | 0 | 1020_2017_tsm-v1-b11 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 145,913 | 0 | 0 | 1020_2022_tsm-v1-b14 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 164,193 | 0 | 0 | 1020_2241_tsm-v1-b17 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 166,959 | 0 | 0 | 1020_2247_tsm-v1-b20 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 201,925 | 0 | 0 | 1020_2256_tsm-v1-b23 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 162,000 | 0 | 0 | 1020_2302_tsm-v1-b26 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 151,060 | 0 | 0 | 1020_2309_tsm-v1-b29 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 221,228 | 0 | 0 | 1020_2315_tsm-v1-b32 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 150,404 | 0 | 0 | 1020_2327_tsm-v1-b38 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 164,585 | 0 | 0 | 1020_2333_tsm-v1-b41 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 202,564 | 0 | 0 | 1020_2338_tsm-v1-b44 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 143,139 | 0 | 0 | 1020_2345_tsm-v1-b47 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 144,470 | 0 | 0 | 1020_2350_tsm-v1-b50 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 132,239 | 0 | 0 | 1020_2357_tsm-v1-b53 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 117,881 | 0 | 0 | 1021_0054_tsm-v1-b56 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 167,400 | 0 | 0 | 1021_0101_tsm-v1-b59 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 144,322 | 0 | 0 | 1021_0107_tsm-v1-b62 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 198,866 | 0 | 0 | 1021_0115_tsm-v1-b65 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.2941 | 18 | 151,386 | 0 | 0 | 1021_0127_tsm-v1-b71 | 结果对·链未闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 143,535 | 0 | 0 | 1021_0134_tsm-v1-b74 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 0 | 0.3125 | 17 | 123,103 | 0 | 0 | 1021_0140_tsm-v1-b77 | 结果对·链未闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 112,078 | 0 | 0 | 1021_0144_tsm-v1-b79 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 130,897 | 0 | 0 | 1021_0150_tsm-v1-b82 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 144,675 | 0 | 0 | 1021_0156_tsm-v1-b85 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 131,332 | 0 | 0 | 1021_0201_tsm-v1-b88 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 213,551 | 0 | 0 | 1021_0205_tsm-v1-b90 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 157,418 | 0 | 1 | 1021_0211_tsm-v1-b93 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5385 | 14 | 122,917 | 0 | 0 | 1021_0215_tsm-v1-b95 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 167,037 | 0 | 0 | 1021_0225_tsm-v1-b100 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 149,538 | 0 | 0 | 1021_0231_tsm-v1-b103 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 147,596 | 0 | 0 | 1021_0236_tsm-v1-b105 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 123,035 | 0 | 0 | 1021_0242_tsm-v1-b108 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 127,605 | 0 | 0 | 1021_0246_tsm-v1-b110 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 227,138 | 0 | 0 | 1021_0250_tsm-v1-b112 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 121,153 | 0 | 0 | 1021_0253_tsm-v1-b114 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 175,862 | 0 | 0 | 1021_0257_tsm-v1-b116 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 165,041 | 0 | 0 | 1021_0301_tsm-v1-b118 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 126,587 | 0 | 0 | 1021_0304_tsm-v1-b120 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 23 | 185,860 | 0 | 3 | 1021_0313_tsm-v1-b124 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 164,071 | 0 | 0 | 1021_0316_tsm-v1-b126 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 0 | 0.3333 | 16 | 166,199 | 0 | 0 | 1021_0321_tsm-v1-b128 | 结果对·链未闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 150,573 | 0 | 0 | 1021_0322_tsm-v1-b129 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 172,575 | 0 | 0 | 1021_0326_tsm-v1-b131 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 117,099
- **raw 日志**：[results/1020_2001_tsm-v1-b2/raw/1020_2001_boutique-service-1](../results/1020_2001_tsm-v1-b2/raw/1020_2001_boutique-service-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 RESTARTS and no resourcequota/events exist, so the fault is in the address layer. cartservice error logs repeat 'UnableToConnect on redis-cart-invalid:6379' (183 errors, serverEndpoint and Last Connection Exception both literally redis-cart-invalid:6379), surfacing to frontend as 'could not retrieve cart / failed to add to cart: Can't access cart storage'. GetAppYAML(cartservice) shows env REDIS_ADDR="redis-cart-invalid:6379", while the real Service redis-cart exists at 10.68.39.143:6379 and a TCP probe on its declared port returns 'open / Connection

### case-2

- **结论**：`app/checkoutservice` + `service_env_var_address_mismatch` ｜ 标签 `app/checkoutservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 278,264
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0031_boutique-service-2](../results/1021_0900_tsm-v1-fix/raw/1021_0031_boutique-service-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (11.6% of logs, 82/710) all on POST /cart/checkout: rpc error code = Unavailable, transport: Error while dialing, lookup checkoutservice on 169.254.20.10:53: no such host, while browse paths (productcatalog/currency/cart/ad/recommendation) stay clean and successful checkouts still return 200 in 10-12ms -> only the order path is broken (Partial). Object layer: all 11 pods 1/1 Running, RESTARTS 0; service checkoutservice exists (ClusterIP 10.68.113.121, 5050/TCP) with endpoints 172.20.3.231:5050 bound, and an active TCP probe to 10.68.113.121:5050 succeeded, so the missing-Se

### case-3

- **结论**：`app/frontend` + `service_env_var_address_mismatch` ｜ 标签 `app/frontend` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 138,063
- **raw 日志**：[results/1021_0121_tsm-v1-b68/raw/1021_0121_boutique-service-3](../results/1021_0121_tsm-v1-b68/raw/1021_0121_boutique-service-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend emits 166/168 errors as 'could not retrieve products/product: rpc error: code = Unavailable ... transport: Error while dialing: dial tcp: lookup productcatalogservices on 169.254.20.10:53: no such host' — the resolved hostname is misspelled with a trailing 's'. All 11 boutique pods are 1/1 Running with RESTARTS=0, and the Service object that really exists is productcatalogservice (ClusterIP 10.68.93.223, port 3550). Address layer verified healthy on the correct name: CheckServiceConnectivity(productcatalogservice:3550) => 'Connection Succeeded', endpoints productcatalogse

### case-4

- **结论**：`app/recommendationservice` + `service_env_var_address_mismatch` ｜ 标签 `app/recommendationservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 167,327
- **raw 日志**：[results/1021_0221_tsm-v1-b98/raw/1021_0221_boutique-service-4](../results/1021_0221_tsm-v1-b98/raw/1021_0221_boutique-service-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Ongoing symptom is on the entry caller frontend: 54x 'failed to get product recommendations' carrying the verbatim gRPC detail 'DNS resolution failed for productcatalogservic:3550: C-ares status is not ARES_SUCCESS qtype=AAAA name=productcatalogservic is_balancer=0: Domain name not found'; recommendationservice's own error logs repeat the same 54x signature. The named target is healthy: services listing shows productcatalogservice ClusterIP 10.68.118.24 3550/TCP exists, endpoints=172.20.3.36:3550, CheckServiceConnectivity(productcatalogservice,3550) -> 'Connection Succeeded', GetErrorLogs(prod

### case-5

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2273 · steps 23 · tokens 245,518
- **raw 日志**：[results/1021_0308_tsm-v1-b122/raw/1021_0309_boutique-service-5](../results/1021_0308_tsm-v1-b122/raw/1021_0309_boutique-service-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend returns 500 on /cart and /product/* (179/714 errors, 25%) with 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6380 ... clientName: cartservice-8445cf8447-xtncn'. cartservice's own error log is 213/576 errors (37%), all three patterns being 'UnableToConnect on redis-cart:6380'. The downstream is healthy on the declared port: redis-cart Service exposes 6379/TCP and CheckServiceConnectivity(redis-cart,6379) is open; productcatalogservice has no error logs, endpoints 1

### case-6

- **结论**：`app/checkoutservice` + `service_env_var_address_mismatch` ｜ 标签 `app/checkoutservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.25 · ECR 0 · EE 0.2174 · steps 24 · tokens 321,600
- **raw 日志**：[results/1021_0328_tsm-v1-b132/raw/1021_0329_boutique-service-6](../results/1021_0328_tsm-v1-b132/raw/1021_0329_boutique-service-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logs 98x POST /cart/checkout failures: 'failed to complete the order: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing: dial tcp: lookup checkoutservice on 169.254.20.10:53: no such host"'. Object layer is otherwise clean: all 11 boutique pods 1/1 Running with RESTARTS 0, no metric alerts, no ResourceQuota object (quota branch excluded), and GetResources(events, namespace=boutique) returns no rows. The named downstream is healthy and therefore not the mechanism: Service checkoutservice exists (10.68.197.55, 5050/TCP) with endpo

### case-7

- **结论**：`app/frontend` + `service_env_var_address_mismatch` ｜ 标签 `app/frontend` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 145,611
- **raw 日志**：[results/1021_0333_tsm-v1-b134/raw/1021_0333_boutique-service-7](../results/1021_0333_tsm-v1-b134/raw/1021_0333_boutique-service-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with RESTARTS 0 and the namespace events surface is empty ('No resources found in boutique namespace'), so no scheduling/quota/image/mount/probe mechanism is involved. The entry caller frontend's error log carries 125 occurrences of 'could not retrieve currencies: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.199.102:7001: connect: connection refused' (10.68.199.102 = currencyservice ClusterIP). The callee side is healthy and serves only port 7000: GetAppYAML(currencyservice) shows containerPort 7000, 

### case-8

- **结论**：`app/recommendationservice` + `service_env_var_address_mismatch` ｜ 标签 `app/recommendationservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 179,293
- **raw 日志**：[results/1021_0335_tsm-v1-b135/raw/1021_0335_boutique-service-8](../results/1021_0335_tsm-v1-b135/raw/1021_0335_boutique-service-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend's error logs show the only live failure in the latest window (15:41:52-55Z) is "failed to get product recommendations" caused by "failed to connect to all addresses; last error: UNKNOWN: ipv4:10.68.14.88:3551: Failed to connect to remote host: Connection refused", while the same window's GET / and GET /product/<id> requests all return http.resp.status 200 ("serving product page"), i.e. only the recommendation path is broken. All 11 pods are 1/1 Running with RESTARTS 0 (no workload outlier). Services listing shows productcatalogservice ClusterIP 10.68.14.88 with PORT 3550/

### case-9

- **结论**：`app/adservice` + `service_port_mapping_mismatch` ｜ 标签 `app/adservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 125,568
- **raw 日志**：[results/1021_0339_tsm-v1-b137/raw/1021_0339_boutique-service-9](../results/1021_0339_tsm-v1-b137/raw/1021_0339_boutique-service-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs (entry service, complaint side) show the dominant failure 118x: "failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.211.128:9555: connect: connection refused". All 11 boutique pods are 1/1 Running with RESTARTS=0, so no scheduling/startup/probe/resource fault exists (first observation != expectation lands on the address layer). GetAppYAML(adservice) shows the Service declares "port: 9555, targetPort: 8080" while the Deployment container only listens on containerPort 9555 (env PORT="9555", grpc readiness/liveness probes on port 9555). Endpoints object for ad

### case-10

- **结论**：`app/checkoutservice` + `service_port_mapping_mismatch` ｜ 标签 `app/checkoutservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 123,097
- **raw 日志**：[results/1020_2006_tsm-v1-b5/raw/1020_2006_boutique-service-10](../results/1020_2006_tsm-v1-b5/raw/1020_2006_boutique-service-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error log (174/702 lines, 24.8%) shows checkout failures: 'rpc error: code = Unavailable ... dial tcp 10.68.125.216:5050: connect: connection refused' (checkoutservice ClusterIP). Pod checkoutservice-8445f8b6cb-pvh7z is 1/1 Running with 0 restarts, so scheduling/startup/probe surfaces are healthy; Service 'checkoutservice' lists port 5050/TCP with ClusterIP 10.68.125.216, but its Endpoints object binds 172.20.1.199:5051. GetAppYAML(checkoutservice) confirms the Service spec has port 5050 -> targetPort 5051 while the container declares containerPort 5050, env PORT=5050 and grpc probes 

### case-11

- **结论**：`app/currencyservice` + `service_port_mapping_mismatch` ｜ 标签 `app/currencyservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 126,559
- **raw 日志**：[results/1020_2011_tsm-v1-b8/raw/1020_2011_boutique-service-11](../results/1020_2011_tsm-v1-b8/raw/1020_2011_boutique-service-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs: 138/698 (19.8%) 'could not retrieve currencies: ... dial tcp 10.68.7.23:7000: connect: connection refused' — 10.68.7.23 is currencyservice's ClusterIP and 7000 its declared Service port. All 11 pods are 1/1 Running with 0 restarts, so scheduling/startup/probe branches are excluded; the events surface is empty (all Normal). Break is on the Service->Endpoint binding: GetResources(endpoints) shows currencyservice bound to 172.20.3.3:7001, and GetAppYAML(currencyservice) reads verbatim 'port: 7000 / targetPort: 7001' while the container actually listens on 7000 

### case-12

- **结论**：`app/paymentservice` + `service_port_mapping_mismatch` ｜ 标签 `app/paymentservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 192,363
- **raw 日志**：[results/1020_2017_tsm-v1-b11/raw/1020_2017_boutique-service-12](../results/1020_2017_tsm-v1-b11/raw/1020_2017_boutique-service-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (174/694, 25%) show checkout failing with 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.67.201:50051: connect: connection refused' — a dial to paymentservice's resolved ClusterIP, so the TCP handshake itself was rejected. All pods are Running 1/1 with 0 restarts; paymentservice pod is Ready with passing grpc :50051 liveness/readiness probes and zero application errors, proving the app serves on 50051. The defect is the Service-to-endpoint binding: the paymentservice Service spec declares 'port: 50051' but 'targetPort: 80', so the endpoints object 

### case-13

- **结论**：`app/productcatalogservice` + `service_port_mapping_mismatch` ｜ 标签 `app/productcatalogservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 145,913
- **raw 日志**：[results/1020_2022_tsm-v1-b14/raw/1020_2022_boutique-service-13](../results/1020_2022_tsm-v1-b14/raw/1020_2022_boutique-service-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 pods are 1/1 Running with 0 restarts and all 11 deployments 1/1 AVAILABLE, so the workload carrier is healthy. The entry caller frontend logs 180 errors (24.9%), dominated by 176 lines of 'could not retrieve products: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.1.75:3550: connect: connection refused' - 10.68.1.75:3550 is productcatalogservice's ClusterIP and its Service-declared port. The endpoints/Service surfaces localize the break: selector app=productcatalogservice DOES match and an endpoint is bound (172.20.1.16), but the Se

### case-14

- **结论**：`app/redis-cart` + `service_port_mapping_mismatch` ｜ 标签 `app/redis-cart` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 164,193
- **raw 日志**：[results/1020_2241_tsm-v1-b17/raw/1020_2241_boutique-service-14](../results/1020_2241_tsm-v1-b17/raw/1020_2241_boutique-service-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom: cart operations unavailable - frontend errors 178/710 ('could not retrieve cart', 'failed to add to cart') and cartservice errors 264/712: 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379'. Object layer is healthy: pod redis-cart-68db7b6f97-szfvx is 1/1 Running, Ready True, Restart Count 0, only Normal events (Scheduled/Pulled/Created/Started), liveness and readiness tcpSocket :6379 both passing; containerPort is 6379. The breakpoint is caller-side reachability via the Service: the redis-cart Service spec declares port 6379 with targetPort 6380, and th

### case-15

- **结论**：`app/adservice` + `service_port_mapping_mismatch` ｜ 标签 `app/adservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 166,959
- **raw 日志**：[results/1020_2247_tsm-v1-b20/raw/1020_2247_boutique-service-15](../results/1020_2247_tsm-v1-b20/raw/1020_2247_boutique-service-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) logs 115 errors: 'failed to get ads: rpc error: code = Unavailable desc = ... dial tcp 10.68.44.192:9555: connect: connection refused' - the adservice ClusterIP:port. Active probe CheckServiceConnectivity(adservice, 9555) = Connection Failed, while productcatalogservice:3550 = open (its 'no such host' DNS lines are startup noise). Object layer is healthy: pod adservice-567f888bb-5jjhb is 1/1 Running, Ready=True, RESTARTS 0, gRPC liveness/readiness on 9555 passing, pod events all Normal, namespace events empty - so not crash/probe/scheduling/code. Break is the endpoint b

### case-16

- **结论**：`app/cartservice` + `service_port_mapping_mismatch` ｜ 标签 `app/cartservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 201,925
- **raw 日志**：[results/1020_2256_tsm-v1-b23/raw/1020_2256_boutique-service-16](../results/1020_2256_tsm-v1-b23/raw/1020_2256_boutique-service-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing: all 11 boutique pods 1/1 Running with 0 RESTARTS (no workload outlier). Entry caller frontend error logs: 126x 'could not retrieve cart: ... dial tcp 10.68.175.237:7070: connect: connection refused' and 57x 'failed to add to cart: ... connection refused' — that IP:port is the cartservice ClusterIP:7070. Object layer confirms: GetResources(endpoints, cartservice) = '<none>' and CheckServiceConnectivity(cartservice, 7070, boutique) = 'Connection Failed', while the same probes on productcatalogservice (3550, port declared by its Service) returned 'open / Connection Succeeded' with e

### case-17

- **结论**：`app/checkoutservice` + `service_port_mapping_mismatch` ｜ 标签 `app/checkoutservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 162,000
- **raw 日志**：[results/1020_2302_tsm-v1-b26/raw/1020_2302_boutique-service-17](../results/1020_2302_tsm-v1-b26/raw/1020_2302_boutique-service-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend entry log: 174/176 errors are POST /cart/checkout -> rpc error: code = Unavailable, dial tcp 10.68.228.153:5050: connect: connection refused. That IP/port is exactly checkoutservice's own Service ClusterIP 10.68.228.153 and declared port grpc 5050/TCP. All 11 pods are Running 1/1 with RESTARTS 0 and no metric alerts, so the workload is healthy (Pod up, service misbehaves branch): pod checkoutservice-6bb45764-p4ldt is Ready=True, Restart Count 0, container Port 5050/TCP, grpc liveness/readiness passing, with only Normal events (Scheduled/Pulled/Created/Started) and no Warning events in

### case-18

- **结论**：`app/currencyservice` + `service_port_mapping_mismatch` ｜ 标签 `app/currencyservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 151,060
- **raw 日志**：[results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-service-18](../results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-service-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and Normal-only events, and no ResourceQuota exists, so restart/probe/scheduling/quota faults are excluded. The frontend entry-caller error log shows 130 failures: 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.167.71:7000: connect: connection refused' - that IP/port is the currencyservice ClusterIP and declared Service port. The endpoints listing shows currencyservice = <none> while every other Service is populated, and an active TCP probe to currencyservice:7000 returns 'Connection Failed' (productcatalogs

### case-19

- **结论**：`app/paymentservice` + `service_port_mapping_mismatch` ｜ 标签 `app/paymentservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 221,228
- **raw 日志**：[results/1020_2315_tsm-v1-b32/raw/1020_2315_boutique-service-19](../results/1020_2315_tsm-v1-b32/raw/1020_2315_boutique-service-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 1/1 Running with 0 restarts (no scheduling/startup branch) and GetAlerts returned no metric anomalies, so the case fell into the 'Pod up, service misbehaves' branch. The entry caller frontend's error log (182/726) showed the dominant signature 'failed to charge card: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing: dial tcp 10.68.90.194:50051: connect: connection refused"' (93 occurrences) toward paymentservice. Endpoint/connectivity comparison on each Service's own declared port 50051 diverged sharply: paymentservice ENDP

### case-20

- **结论**：`app/productcatalogservice` + `service_port_mapping_mismatch` ｜ 标签 `app/productcatalogservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 150,404
- **raw 日志**：[results/1020_2327_tsm-v1-b38/raw/1020_2327_boutique-service-20](../results/1020_2327_tsm-v1-b38/raw/1020_2327_boutique-service-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) error logs: 176/178 errors are 'rpc error: code = Unavailable ... dial tcp 10.68.117.230:3550: connect: connection refused' for both /product/<id> and / listing paths, i.e. the ClusterIP was resolved (DNS fine) but TCP was refused on the Service's own declared port 3550. All 11 pods are 1/1 Running with RESTARTS 0; pod productcatalogservice-555ffc4c98-2hxqs reports Ready: True, Restart Count: 0, Port: 3550/TCP, grpc liveness/readiness probes passing. GetResources(endpoints, productcatalogservice) returns '<none>' and CheckServiceConnectivity(productcatalogservice, 3550)

### case-21

- **结论**：`app/recommendationservice` + `service_port_mapping_mismatch` ｜ 标签 `app/recommendationservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 164,585
- **raw 日志**：[results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-service-21](../results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-service-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 125/733 errors; 29x "rpc error: code = Unavailable ... dial tcp 10.68.170.105:8080: connect: connection refused" on the recommendationservice ClusterIP (message: failed to get product recommendations). All 11 boutique pods are 1/1 Running with 0 restarts, so the workload is healthy and the fault is in the address/reachability layer. GetResources(endpoints) shows every Service bound to a ready pod IP except "recommendationservice <none>", although the pod label app=recommendationservice matches the Service selector app=recommendationservice. CheckServiceConnectivity(rec

### case-22

- **结论**：`app/redis-cart` + `service_port_mapping_mismatch` ｜ 标签 `app/redis-cart` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 202,564
- **raw 日志**：[results/1020_2338_tsm-v1-b44/raw/1020_2338_boutique-service-22](../results/1020_2338_tsm-v1-b44/raw/1020_2338_boutique-service-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logs (173/690 errors) report cart storage failures from cartservice: 'FailedPrecondition ... Can't access cart storage. StackExchange.Redis.RedisConnectionException: ... UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379'. Object layer: pod redis-cart-7959f69b78-nbm49 is 1/1 Running, RESTARTS 0, labels app=redis-cart (readiness/liveness tcpSocket 6379 pass, so the container serves on 6379). Reachability surface is the breakpoint: endpoints/redis-cart = '<none>' (Service age 66s, endpoints never bound) and active probe to redis-cart:6379 = 'Connection F

### case-23

- **结论**：`app/adservice` + `service_protocol_mismatch` ｜ 标签 `app/adservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 143,139
- **raw 日志**：[results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-service-23](../results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-service-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs show 87x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.25.111:9555: connect: connection refused' against the adservice ClusterIP, while the whole workload layer is healthy (all 11 pods 1/1 Running, RESTARTS 0, no namespace events). The adservice Service DOES have a bound endpoint (172.20.3.220:9555), so it is not a selector mismatch or a missing Service; the outlier is the protocol column: 'adservice ClusterIP 10.68.25.111 9555/UDP' whereas every other boutique Service is TCP. GetAppYAML(adservice) confirms the defect: the Service port named 'grpc' ma

### case-24

- **结论**：`app/cartservice` + `service_protocol_mismatch` ｜ 标签 `app/cartservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 144,470
- **raw 日志**：[results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-service-24](../results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-service-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, so no scheduling/startup/probe outlier. Complaint side: frontend GetErrorLogs shows 288/290 errors as "could not retrieve cart: rpc error: code = Unavailable ... dial tcp 10.68.48.119:7070: connect: connection refused" (177 retrieve + 111 add-to-cart), i.e. only the cart path fails -> 'Partial'. The IP in the message is the cartservice ClusterIP, so DNS resolved fine (rules out DNS causes) and 'connection refused' means no usable transport rule on that port. Object layer is healthy: pod cartservice-79b49f5555-frq4g 1/1 Running 0 restarts, l

### case-25

- **结论**：`app/checkoutservice` + `service_protocol_mismatch` ｜ 标签 `app/checkoutservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 132,239
- **raw 日志**：[results/1020_2357_tsm-v1-b53/raw/1020_2357_boutique-service-25](../results/1020_2357_tsm-v1-b53/raw/1020_2357_boutique-service-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, so the workload is healthy. The complaint side is frontend: 174 identical errors 'failed to complete the order: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing: dial tcp 10.68.191.124:5050: connect: connection refused"' pointing at checkoutservice. GetServiceDependencies(frontend) confirms frontend -> checkoutservice as the failing edge. The services listing shows checkoutservice ClusterIP 10.68.191.124 with PORT(S) '5050/UDP' -- the only non-TCP Service in the namespace. Endpoints for checkouts

### case-26

- **结论**：`app/currencyservice` + `service_protocol_mismatch` ｜ 标签 `app/currencyservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 117,881
- **raw 日志**：[results/1021_0054_tsm-v1-b56/raw/1021_0054_boutique-service-26](../results/1021_0054_tsm-v1-b56/raw/1021_0054_boutique-service-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logs 174 errors/694 (25.07%), dominated by 134x 'could not retrieve currencies: rpc error: code = Unavailable desc = connection error: desc = transport: Error while dialing: dial tcp 10.68.90.185:7000: connect: connection refused'. All 11 pods are 1/1 Running with 0 restarts (no crash/pending/OOM). Every Service exists; productcatalogservice:3550 probes open, so the 38x 'lookup productcatalogservice ... no such host' rows are startup-transient, not the mechanism. The broken slot is the Service spec of currencyservice: GetResources(services) shows the only UDP entry 'curre

### case-27

- **结论**：`app/paymentservice` + `service_protocol_mismatch` ｜ 标签 `app/paymentservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 167,400
- **raw 日志**：[results/1021_0101_tsm-v1-b59/raw/1021_0101_boutique-service-27](../results/1021_0101_tsm-v1-b59/raw/1021_0101_boutique-service-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend entry-caller error logs: 119/670 lines (17.8%, dominant pattern) fail on POST /cart/checkout with 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.101.94:50051: connect: connection refused' - 10.68.101.94 is exactly the ClusterIP of paymentservice. All 11 pods are 1/1 Running with RESTARTS 0 (no restart/probe/scheduling outlier), and GetResources(events, boutique) returns 'No resources found', so the break is below the workload layer. Object layer (anchor app=paymentservice): endpoints ARE bound to 172.20.3.28:50051 (selector OK, rules out service_selector_mism

### case-28

- **结论**：`app/productcatalogservice` + `service_protocol_mismatch` ｜ 标签 `app/productcatalogservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 144,322
- **raw 日志**：[results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-service-28](../results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-service-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 169/171 errors as "dial tcp 10.68.224.219:3550: connect: connection refused" reaching productcatalogservice ClusterIP; TCP connectivity probe to productcatalogservice:3550 returns Connection Failed. All 11 boutique pods are 1/1 Running with RESTARTS 0, and productcatalogservice endpoints are correctly bound to 172.20.3.33:3550 with a clean callee log, so pod, selector and port mapping are all healthy. The break is the Service port protocol: GetAppYAML shows the Service declares ports[0] {name: grpc, port: 3550, targetPort: 3550, protocol: UDP} while the Deployment runs

### case-29

- **结论**：`app/recommendationservice` + `service_protocol_mismatch` ｜ 标签 `app/recommendationservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 198,866
- **raw 日志**：[results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-service-29](../results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-service-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-side signal (frontend error logs, 47x): "failed to get product recommendations" - rpc error: code = Unavailable, dial tcp 10.68.113.123:8080: connect: connection refused; 10.68.113.123 is exactly the ClusterIP of recommendationservice. Workload is fully healthy (all 11 pods 1/1 Running, RESTARTS 0, no Pending/probe failures), and the Service endpoints are properly bound (Endpoints: 172.20.3.38:8080, selector app=recommendationservice matches). Connectivity probes split the case: CheckServiceConnectivity(recommendationservice,8080) = Connection Failed while CheckServiceConnectivity(produc

### case-30

- **结论**：`app/redis-cart` + `service_protocol_mismatch` ｜ 标签 `app/redis-cart` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.2941 · steps 18 · tokens 151,386
- **raw 日志**：[results/1021_0127_tsm-v1-b71/raw/1021_0127_boutique-service-30](../results/1021_0127_tsm-v1-b71/raw/1021_0127_boutique-service-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no metric alerts, so this is not a restart/scheduling/image/probe fault. The complaint side is frontend with 154/614 errors: 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... UnableToConnect on redis-cart:6379/Interactive'. cartservice's own error log carries the same 76x 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379'. The break is the Service port/protocol mapping: DescribeResource(service, redis-cart) shows 'Port: tcp-redis 6379/UDP' and 'TargetPort: 

### case-31

- **结论**：`app/adservice` + `service_selector_mismatch` ｜ 标签 `app/adservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 143,535
- **raw 日志**：[results/1021_0134_tsm-v1-b74/raw/1021_0134_boutique-service-31](../results/1021_0134_tsm-v1-b74/raw/1021_0134_boutique-service-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs dominated by 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.152.172:9555: connect: connection refused' (94 hits). Full endpoints listing shows only adservice = <none> while all 11 other Services are bound (e.g. productcatalogservice 172.20.1.89:3550), matching the 'partial' wording. All 11 pods are 1/1 Running with 0 RESTARTS, so scheduling/startup/probe/image branches are excluded. DescribeResource(service/adservice) returns 'Selector: app=ad_service' with an empty Endpoints field, while the pods carry label 'app=adservice' (GetResources pods label_se

### case-32

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 0 · EE 0.3125 · steps 17 · tokens 123,103
- **raw 日志**：[results/1021_0140_tsm-v1-b77/raw/1021_0140_boutique-service-32](../results/1021_0140_tsm-v1-b77/raw/1021_0140_boutique-service-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry service) error log: 186/272 errors are `could not retrieve cart` / `failed to add to cart`: `rpc error: code = Unavailable ... dial tcp 10.68.202.188:7070: connect: connection refused` — 10.68.202.188:7070 is cartservice's own ClusterIP and declared Service port, so the Service VIP rejects with no backend. Object layer: cartservice pod cartservice-685745b96c-l457t is 1/1 Running with 0 restarts and grpc probes on 7070 succeeding, while GetResources(endpoints) shows `cartservice <none>` (all other services populated) and CheckServiceConnectivity(cartservice, 7070) = Connection F

### case-33

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 112,078
- **raw 日志**：[results/1021_0144_tsm-v1-b79/raw/1021_0145_boutique-service-33](../results/1021_0144_tsm-v1-b79/raw/1021_0145_boutique-service-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log shows 177/714 (25.07%) 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.144.4:5050: connect: connection refused' on POST /cart/checkout; dependency graph confirms the failing edge frontend -> checkoutservice and 10.68.144.4 is checkoutservice's ClusterIP (service checkoutservice 10.68.144.4 5050/TCP). The workload is healthy: pod checkoutservice-8445f8b6cb-vjvxf is 1/1 Running, Ready=True, Restart Count 0, container port 5050/TCP with passing grpc liveness/readiness probes, and events are all Normal with no Warning in the namespace. The break i

### case-34

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 130,897
- **raw 日志**：[results/1021_0150_tsm-v1-b82/raw/1021_0151_boutique-service-34](../results/1021_0150_tsm-v1-b82/raw/1021_0151_boutique-service-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 1/1 Running with 0 restarts, so pods are not the fault carrier; GetAlerts showed no metric anomaly. The entry caller frontend's error log was dominated by 133 x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.74.174:7000: connect: connection refused' - the currencyservice ClusterIP on the port its Service declares (7000). Anchoring on currencyservice via L1 (service_endpoints / pods / deployment / logs surfaces): currencyservice's own error log was completely clean (the request never reaches the container - a transport break, not a cod

### case-35

- **结论**：`app/frontend` + `service_selector_mismatch` ｜ 标签 `app/frontend` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 144,675
- **raw 日志**：[results/1021_0156_tsm-v1-b85/raw/1021_0156_boutique-service-35](../results/1021_0156_tsm-v1-b85/raw/1021_0156_boutique-service-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and namespace events are empty ('No resources found in boutique namespace'), so the workload/startup chain is healthy. The break is at the address layer of the frontend service unit: DescribeResource(service, frontend) shows 'Selector: app=front_end' while the serving pod frontend-657dd795f-6r4kt carries LABELS 'app=frontend'; consequently 'GetResources(endpoints)' reports 'frontend <none>' whereas every other service has a bound endpoint (e.g. adservice 172.20.1.119:9555), and CheckServiceConnectivity(frontend, 80) returns 'Connection Faile

### case-36

- **结论**：`app/productcatalogservice` + `service_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 131,332
- **raw 日志**：[results/1021_0201_tsm-v1-b88/raw/1021_0201_boutique-service-36](../results/1021_0201_tsm-v1-b88/raw/1021_0201_boutique-service-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (174/694, 25.07%) show 172 lines of 'could not retrieve products: rpc error: code = Unavailable ... dial tcp 10.68.72.207:3550: connect: connection refused'; that IP is exactly productcatalogservice's ClusterIP and 3550 its declared Service port, and productcatalogservice's own error log is clean. All 11 pods are 1/1 Running with 0 restarts (no scheduling/image/probe restart). The breakpoint is the service_endpoints surface: 'GetResources(endpoints, productcatalogservice)' returns ENDPOINTS <none>, while the pod productcatalogservice-ddb46fc86-85m7h carries label app=produc

### case-37

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 213,551
- **raw 日志**：[results/1021_0205_tsm-v1-b90/raw/1021_0206_boutique-service-37](../results/1021_0205_tsm-v1-b90/raw/1021_0206_boutique-service-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend's error log shows two failure classes: 'lookup productcatalogservice on 169.254.20.10:53: no such host' (66x) and, dominantly for the cart path, 'Can't access cart storage' with StackExchange.Redis RedisConnectionException 'It was not possible to connect to the redis server(s). ConnectTimeout' against serverEndpoint redis-cart:6379 (49+23x, error ratio 25.08%). All 11 pods are 1/1 Running with RESTARTS 0 (no workload outlier) and all 12 Services exist, so the missing-Service/quota branch is excluded. Connectivity probes on the Services' own declared ports: productcatalogs

### case-38

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 157,418
- **raw 日志**：[results/1021_0211_tsm-v1-b93/raw/1021_0211_boutique-service-38](../results/1021_0211_tsm-v1-b93/raw/1021_0211_boutique-service-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 124x 'failed to get shipping quote: rpc error: code = Unavailable desc = connection error: ... dial tcp 10.68.12.251:50051: connect: connection refused' hitting shippingservice's ClusterIP on its declared port 50051. All 11 boutique pods are 1/1 Running with RESTARTS 0, so the workload itself is healthy and the chain lands on the address layer. GetResources(endpoints, shippingservice) returns ENDPOINTS <none> while pod shippingservice-7cbfcb6d68-vxqqs runs 1/1, and DescribeResource(service, shippingservice) shows 'Selector: app=shipping_service' with an empty Endpoints

### case-39

- **结论**：`app/adservice` + `service_selector_mismatch` ｜ 标签 `app/adservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5385 · steps 14 · tokens 122,917
- **raw 日志**：[results/1021_0215_tsm-v1-b95/raw/1021_0216_boutique-service-39](../results/1021_0215_tsm-v1-b95/raw/1021_0216_boutique-service-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (complaint side, 164/166 errors) shows 'failed to get ads: rpc error: code = Unavailable desc = connection error: ... dial tcp 10.68.139.254:9555: connect: connection refused' - only the ads path fails (Partial). The adservice pod is healthy: 'adservice-84dbdf99d-zlgfk 1/1 Running 0 restarts' on worker-03, so it is not a scheduling/startup/probe/image failure. The Service object declares ClusterIP 10.68.139.254 with port 9555/TCP -> targetPort 9555 (mapping is correct, matching the port the caller dialed), yet 'GetResources(endpoints, name=adservice)' returns 'ENDPOINTS: <no

### case-40

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 167,037
- **raw 日志**：[results/1021_0225_tsm-v1-b100/raw/1021_0226_boutique-service-40](../results/1021_0225_tsm-v1-b100/raw/1021_0226_boutique-service-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logged 280 errors (25% ratio), dominated by 'could not retrieve cart / failed to add to cart: rpc error: code = Unavailable ... dial tcp 10.68.16.141:7070: connect: connection refused' (172 occurrences) pointing at the cartservice ClusterIP. Workload layer is healthy: pod cartservice-685745b96c-v2rp4 is 1/1 Running with 0 RESTARTS, and grpc readiness/liveness probes on port 7070 pass. The breakpoint is the reachability surface: 'endpoints/cartservice' has ENDPOINTS <none> although Service cartservice exists at 10.68.16.141 with grpc 7070/TCP and TargetPort 7070/TCP. Mecha

### case-41

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 149,538
- **raw 日志**：[results/1021_0231_tsm-v1-b103/raw/1021_0231_boutique-service-41](../results/1021_0231_tsm-v1-b103/raw/1021_0231_boutique-service-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (172x) show POST /cart/checkout failing with "rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.145.159:5050: connect: connection refused"; 10.68.145.159 is checkoutservice's ClusterIP (Service 'checkoutservice', port grpc 5050/TCP, targetPort 5050). GetResources(endpoints, checkoutservice) returns ENDPOINTS <none> while pod checkoutservice-8445f8b6cb-5lcvt is 1/1 Running with label app=checkoutservice; DescribeResource(service) shows 'Selector: application=checkoutservice' while GetAppYAML shows the deployment pod templat

### case-42

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 147,596
- **raw 日志**：[results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-service-42](../results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-service-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with RESTARTS=0, so no restart/crash mechanism; GetAlerts reports no metric anomaly. The entry caller frontend error logs (185 errors) are dominated by 141 hits of "could not retrieve currencies: rpc error: code = Unavailable desc = connection error: desc = \"transport: Error while dialing: dial tcp 10.68.243.223:7000: connect: connection refused\"" - 10.68.243.223 is exactly the currencyservice ClusterIP, and connection refused with no endpoints is kube-proxy REJECT. Object layer confirms the breakpoint: GetResources(endpoints) shows 'currencyservice  <non

### case-43

- **结论**：`app/paymentservice` + `service_selector_mismatch` ｜ 标签 `app/paymentservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 123,035
- **raw 日志**：[results/1021_0242_tsm-v1-b108/raw/1021_0242_boutique-service-43](../results/1021_0242_tsm-v1-b108/raw/1021_0242_boutique-service-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-caller frontend error logs (99/175 errors) show 'failed to charge card ... dial tcp 10.68.245.30:50051: connect: connection refused'; 10.68.245.30 is the ClusterIP of Service paymentservice. All 11 pods are 1/1 Running with 0 RESTARTS, and the paymentservice pod carries label app=paymentservice, so the workload layer is healthy. The breakpoint is the address layer: the services listing shows paymentservice's SELECTOR column is 'application=paymentservice' while every other Service uses app=<svc>, and GetResources(endpoints, paymentservice) returns ENDPOINTS '<none>' (shippingservice endp

### case-44

- **结论**：`app/productcatalogservice` + `service_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 127,605
- **raw 日志**：[results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-service-44](../results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-service-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs: 25% error ratio with dominant pattern 'could not retrieve products: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.202.177:3550: connect: connection refused' (93+88 occurrences) - the ClusterIP resolved fine, so DNS is healthy and the break is TCP-level (refused, not timeout). All 11 boutique pods are 1/1 Running with RESTARTS 0, excluding pending/image-pull/probe/zero-replica/code branches; the outlier is reachability, not workload health. Service productcatalogservice declares ClusterIP 10.68.202.177 a

### case-45

- **结论**：`app/recommendationservice` + `service_selector_mismatch` ｜ 标签 `app/recommendationservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 227,138
- **raw 日志**：[results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-service-45](../results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-service-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with RESTARTS 0, so this is not a scheduling/startup/probe fault; the Pod-up/service-misbehaves branch was taken. GetAlerts() returned no metric anomalies. frontend (entry caller) GetErrorLogs shows 36 errors: 'rpc error: code = Unavailable desc = connection error: desc = transport: Error while dialing: dial tcp 10.68.64.86:8080: connect: connection refused' - 10.68.64.86:8080 is exactly the ClusterIP and declared Service port of recommendationservice. Endpoints listing shows recommendationservice ENDPOINTS '<none>' while all other 11 services have bound ad

### case-46

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 121,153
- **raw 日志**：[results/1021_0253_tsm-v1-b114/raw/1021_0254_boutique-service-46](../results/1021_0253_tsm-v1-b114/raw/1021_0254_boutique-service-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: frontend error logs (174/694 errors) show cart path failures - 'could not retrieve cart: FailedPrecondition ... StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379/Interactive, state: Connecting' (46x) and 'failed to add to cart' (13x), clientName cartservice-79b49f5555-7xxzl. Workload scan: all 11 pods 1/1 Running with RESTARTS 0, so scheduling/startup/probe/resource branches are excluded. Address layer: GetResources(endpoints) shows redis-cart = '<none>' while every other service is bound; CheckServiceConnectivity(redis-cart,6379) = 'Connectio

### case-47

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 175,862
- **raw 日志**：[results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-service-47](../results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-service-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (218 errors) are dominated by 133x 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.91.181:50051: connect: connection refused' (the shippingservice ClusterIP). All 11 boutique pods are 1/1 Running with RESTARTS 0 (no scheduling/startup/probe fault). GetResources(endpoints, shippingservice) returns '<none>', and DescribeResource(service, shippingservice) shows 'Selector: application=shippingservice' while the Deployment pod template label and all other Services in the namespace use 'app=<name>' (template.labels: app: shippingservice). Port mapp

### case-48

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 165,041
- **raw 日志**：[results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-service-48](../results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-service-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) logged 191 errors of 'could not retrieve cart / failed to add to cart: transport: Error while dialing: dial tcp 10.68.73.90:7070: connect: connection refused'. cartservice Service declares port 7070 and selector 'app=cartservice,env=production', but 'kubectl get endpoints cartservice' returns '<none>' and CheckServiceConnectivity(cartservice,7070) = Connection Failed, while the cartservice pod itself is 1/1 Running with RESTARTS=0 and only carries label 'app=cartservice,pod-template-hash=79b49f5555'. GetAppYAML(cartservice) confirms the Deployment pod template labels ar

### case-49

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 126,587
- **raw 日志**：[results/1021_0304_tsm-v1-b120/raw/1021_0305_boutique-service-49](../results/1021_0304_tsm-v1-b120/raw/1021_0305_boutique-service-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (164/166 errors) show 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.36.46:5050: connect: connection refused', i.e. checkoutservice's ClusterIP:5050 refusing connections. All 11 pods in boutique are 1/1 Running with 0 restarts; checkoutservice-8445f8b6cb-d82vd is Ready=True, container running (containerd://d332e32c), listening on 5050, pod events all Normal (Scheduled/Pulled/Created/Started) - so scheduling, startup, probe, image and memory causes are excluded. The breakpoint is the service_endpoints surface: 'GetResources(services, name=che

### case-50

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 23 · tokens 185,860
- **raw 日志**：[results/1021_0313_tsm-v1-b124/raw/1021_0313_boutique-service-50](../results/1021_0313_tsm-v1-b124/raw/1021_0313_boutique-service-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend entry-point error logs (178/710 errors) show 133x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.78.209:7000: connect: connection refused', i.e. the ClusterIP of Service currencyservice on its declared port 7000. All pods are 1/1 Running with 0 restarts and all deployments AVAILABLE 1 (currencyservice-75686c9564-7b8tg 1/1 Running), so no scheduling/startup/probe/restart fault. GetResources(endpoints, currencyservice) returns ENDPOINTS '<none>' and CheckServiceConnectivity(currencyservice:7000) = 'Connection Failed', while productcatalogservice endpoin

### case-51

- **结论**：`app/paymentservice` + `service_selector_mismatch` ｜ 标签 `app/paymentservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 164,071
- **raw 日志**：[results/1021_0316_tsm-v1-b126/raw/1021_0317_boutique-service-51](../results/1021_0316_tsm-v1-b126/raw/1021_0317_boutique-service-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (signal side) show 99x 'failed to charge card ... transport: Error while dialing: dial tcp 10.68.148.209:50051: connect: connection refused' (10.68.148.209 = paymentservice ClusterIP, 50051 = port declared by its Service spec). All 11 pods are 1/1 Running with 0 RESTARTS, including paymentservice-78c5996648-x65dg, so this is an addressing-layer fault, not startup/probe/scheduling. GetResources(endpoints, paymentservice) returns ENDPOINTS <none> while shippingservice has 172.20.3.150:50051. DescribeResource(service, paymentservice) shows Selector: app=paymentservice,env=prod

### case-52

- **结论**：`app/recommendationservice` + `service_selector_mismatch` ｜ 标签 `app/recommendationservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 0 · EE 0.3333 · steps 16 · tokens 166,199
- **raw 日志**：[results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-service-52](../results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-service-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (complaint side) show 64x 'dial tcp 10.68.74.184:8080: connect: connection refused' for 'failed to get product recommendations' — 10.68.74.184:8080 is exactly Service recommendationservice's ClusterIP:port. All 11 pods are Running 1/1 with 0 RESTARTS, including recommendationservice-7df9c5b676-ctwzd, so the workload is healthy. GetResources(endpoints, recommendationservice) returns ENDPOINTS '<none>' while the pod is Ready 1/1 -> a ready pod is not bound to its Service. GetAppYAML(recommendationservice) shows Service.spec.selector = 'app: recommendationservice' PLUS 'env: p

### case-53

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 150,573
- **raw 日志**：[results/1021_0322_tsm-v1-b129/raw/1021_0323_boutique-service-53](../results/1021_0322_tsm-v1-b129/raw/1021_0323_boutique-service-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 RESTARTS and no alerts, but the redis-cart Service has no endpoints ('redis-cart <none>'). Complaint side confirms the failing edge: cartservice error logs show 'Can't access cart storage. StackExchange.Redis.RedisConnectionException: ... UnableToConnect on redis-cart:6379 ... state: Connecting' and CheckServiceConnectivity(redis-cart, 6379) returns 'Connection Failed'. The redis-cart pod is healthy and Ready with labels 'app=redis-cart,pod-template-hash=68db7b6f97', yet the Service selector is 'app=redis-cart,version=v1' as seen in both DescribeReso

### case-54

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 172,575
- **raw 日志**：[results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-service-54](../results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-service-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend logs show 129 errors 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.64.58:50051: connect: connection refused' on the ClusterIP:port that shippingservice's own Service declares. All 11 pods are 1/1 Running with 0 RESTARTS, including shippingservice-7cbfcb6d68-wgqkx, so the workload is healthy. The break is the address layer: endpoints/shippingservice returns '<none>' while DescribeResource(service, shippingservice) shows Selector 'app=shippingservice,env=production', yet the pod labels are only 'app=shippingservice,pod-template-hash=7cbfcb6d68' and the 

