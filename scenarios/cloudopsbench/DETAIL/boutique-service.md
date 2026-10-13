# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **54/54** 题：JRA ✅54 ❌0 ｜ 证据链全闭 52 ｜ token 中位 109,173 ｜ 生成 2026-10-13T18:58:20.406Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 115,616 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1333 | 46 | 292,901 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 110,899 | 0 | 0 | 1013_1248_inorder4-v3b13 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2069 | 30 | 262,983 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.24 | 26 | 213,813 | 0 | 0 | 1013_1819_inorder4-v3b28 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909 | 67 | 1,437,291 | 0.0152 | 0 | 1013_2025_chainpivot-verify1 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 21 | 127,254 | 0 | 0 | 1013_1955_inorder4-v3b34 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 119,079 | 0 | 0 | 1013_2040_chainpivot-verify2 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 121,078 | 0 | 0 | 1013_2320_inorder4-v3b64 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 85,111 | 0 | 0 | 1013_2325_inorder4-v3b65 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 125,052 | 0 | 0 | 1013_2331_inorder4-v3b66 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 144,327 | 0 | 0 | 1013_2337_inorder4-v3b67 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 114,606 | 0 | 0 | 1014_0009_inorder4-v3b69 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 103,073 | 0 | 0 | 1014_0012_inorder4-v3b70 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 121,725 | 0 | 0 | 1014_0016_inorder4-v3b71 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 110,467 | 0 | 0 | 1014_0021_inorder4-v3b72 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 102,361 | 0 | 0 | 1014_0029_inorder4-v3b73 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 105,670 | 0 | 0 | 1014_0035_inorder4-v3b74 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 109,654 | 0 | 0 | 1014_0041_inorder4-v3b75 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 0 | 0.2941 | 18 | 89,491 | 0 | 0 | 1014_0046_inorder4-v3b76 | 结果对·链未闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 124,626 | 0.05 | 0 | 1014_0048_inorder4-v3b77 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 85,579 | 0 | 0 | 1014_0051_inorder4-v3b78 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 90,974 | 0 | 0 | 1014_0054_inorder4-v3b79 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.2857 | 15 | 70,079 | 0 | 0 | 1014_0104_inorder4-v3b80 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 127,926 | 0 | 0 | 1014_0108_inorder4-v3b81 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 107,554 | 0 | 0 | 1014_0118_inorder4-v3b82 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 112,403 | 0 | 0 | 1014_0122_inorder4-v3b83 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.3571 | 15 | 87,125 | 0 | 0 | 1014_0124_inorder4-v3b84 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 115,553 | 0 | 0 | 1014_0130_inorder4-v3b85 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 109,173 | 0 | 0 | 1014_0141_inorder4-v3b86 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 104,550 | 0 | 0 | 1014_0147_inorder4-v3b87 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 0.75 | 1 | 0.4286 | 15 | 81,623 | 0 | 0 | 1014_0149_inorder4-v3b88 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 83,325 | 0 | 0 | 1014_0151_inorder4-v3b89 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 121,932 | 0 | 0 | 1014_0153_inorder4-v3b90 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 103,344 | 0 | 0 | 1014_0155_inorder4-v3b91 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 83,798 | 0 | 0 | 1014_0158_inorder4-v3b92 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 87,695 | 0 | 0 | 1014_0200_inorder4-v3b93 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 93,510 | 0 | 0 | 1014_0202_inorder4-v3b94 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 83,453 | 0 | 0 | 1014_0205_inorder4-v3b95 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3913 | 24 | 138,541 | 0 | 0 | 1014_0207_inorder4-v3b96 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5385 | 14 | 83,220 | 0 | 0 | 1014_0209_inorder4-v3b97 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 109,858 | 0 | 0 | 1014_0211_inorder4-v3b98 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 89,954 | 0 | 0 | 1014_0214_inorder4-v3b99 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 103,178 | 0 | 0 | 1014_0216_inorder4-v3b100 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 0 | 0.3125 | 17 | 101,090 | 0 | 0 | 1014_0218_inorder4-v3b101 | 结果对·链未闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 159,813 | 0 | 0 | 1014_0221_inorder4-v3b102 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 68,003 | 0 | 0 | 1014_0223_inorder4-v3b103 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 116,477 | 0 | 0 | 1014_0225_inorder4-v3b104 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5385 | 14 | 84,498 | 0 | 0 | 1014_0228_inorder4-v3b105 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 106,025 | 0 | 0 | 1014_0229_inorder4-v3b106 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3478 | 24 | 163,375 | 0 | 0 | 1014_0232_inorder4-v3b107 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 105,728 | 0 | 0 | 1014_0234_inorder4-v3b108 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 110,601 | 0 | 0 | 1014_0236_inorder4-v3b109 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 93,636 | 0 | 0 | 1014_0238_inorder4-v3b110 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 115,616
- **raw 日志**：[results/1012_1447_inorder4-v3b2/raw/1012_1448_boutique-service-1](../results/1012_1447_inorder4-v3b2/raw/1012_1448_boutique-service-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts (no scheduling/startup/probe break), and all Services including redis-cart (10.68.39.143:6379) pass the live TCP connectivity check ('Connection Succeeded'), so the target service and its endpoint binding are healthy. The break is on cartservice's addressing surface: GetAppYAML(cartservice) shows env REDIS_ADDR = "redis-cart-invalid:6379" while the real Service is redis-cart:6379. cartservice logs loop on 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart-invalid:6379 ... clientName: cartservice-...' from cartstore/

### case-2

- **结论**：`app/checkoutservice` + `service_env_var_address_mismatch` ｜ 标签 `app/checkoutservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1333 · steps 46 · tokens 292,901
- **raw 日志**：[results/1013_1122_inorder4-v3b9/raw/1013_1122_boutique-service-2](../results/1013_1122_inorder4-v3b9/raw/1013_1122_boutique-service-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is confined to the checkout path: frontend (the only caller with errors) logged 82 failures on POST /cart/checkout — 'rpc error: code = Unavailable ... dial tcp: lookup checkoutservice on 169.254.20.10:53: no such host' (11.5% error ratio, HTTP 500), while browsing/catalog paths stayed healthy. The object layer is entirely clean (11/11 pods 1/1 Running, 0 restarts; 11/11 Deployments AVAILABLE; namespace events empty; all 4 nodes Ready, no pressure/taint; no alerts), and the checkoutservice Service itself binds correctly (selector app=checkoutservice, port 5050->5050, End

### case-3

- **结论**：`app/frontend` + `service_env_var_address_mismatch` ｜ 标签 `app/frontend` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 110,899
- **raw 日志**：[results/1013_1248_inorder4-v3b13/raw/1013_1248_boutique-service-3](../results/1013_1248_inorder4-v3b13/raw/1013_1248_boutique-service-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend caller logs show 168/670 (25%) errors, all the same: 'rpc error: code = Unavailable ... dial tcp: lookup productcatalogservices on 169.254.20.10:53: no such host' on GET / and GET /product/<id> (HTTP 500), i.e. partial unreachability confined to product-catalog-dependent routes. Object layer is clean: all 11 boutique pods are 1/1 Running with 0 RESTARTS, no Pending/FailedCreate/image-pull/probe events, and namespace events show no Warning lines, ruling out scheduling/admission/startup faults. The called side is healthy: Service productcatalogservice exists (10.68.93.223:3550, selector

### case-4

- **结论**：`app/recommendationservice` + `service_env_var_address_mismatch` ｜ 标签 `app/recommendationservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2069 · steps 30 · tokens 262,983
- **raw 日志**：[results/1013_1520_inorder4-v3b17/raw/1013_1520_boutique-service-4](../results/1013_1520_inorder4-v3b17/raw/1013_1520_boutique-service-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' in ns boutique. Object layer is fully healthy: 11/11 pods 1/1 Running with RESTARTS=0, all deployments 1/1 AVAILABLE, no namespace Warning events, every Service has populated Endpoints, and CheckServiceConnectivity(productcatalogservice:3550) returned open/Connection Succeeded - so scheduling, startup, probes, Service selector and port mapping are all correct. Caller-side logs localize the break to the address layer: frontend logged 54x 'failed to get product recommendations' carrying recommendationservice's internal error, and recommendationservice log

### case-5

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.24 · steps 26 · tokens 213,813
- **raw 日志**：[results/1013_1819_inorder4-v3b28/raw/1013_1819_boutique-service-5](../results/1013_1819_inorder4-v3b28/raw/1013_1819_boutique-service-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer clean (all 11 boutique pods 1/1 Running, 0 restarts; GetAlerts: no anomalies), so the break is in the address layer. Caller logs localize it: frontend error ratio 25.07% and cartservice error ratio 36.98% (3 patterns x 71 hits) all read 'UnableToConnect on redis-cart:6380' with serverEndpoint: redis-cart:6380, clientName: cartservice-8445cf8447-xtncn, producing HTTP 500 on /cart and /product/*. Connectivity probe to redis-cart:6379 succeeds while 6380 is not exposed: the redis-cart Service declares port/targetPort 6379 and its container listens on 6379. Config confirmation: cartse

### case-6

- **结论**：`app/checkoutservice` + `service_env_var_address_mismatch` ｜ 标签 `app/checkoutservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0909 · steps 67 · tokens 1,437,291
- **raw 日志**：[results/1013_2025_chainpivot-verify1/raw/1013_2025_boutique-service-6](../results/1013_2025_chainpivot-verify1/raw/1013_2025_boutique-service-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is fully healthy in namespace boutique: all 11 pods Running 1/1 with RESTARTS=0, all deployments AVAILABLE 1/1 with a single ReplicaSet each (no rollout), all Services have ready endpoints, no Warning events, no resource quotas, all 4 nodes Ready, worker kube-proxy active, and no metric alerts — so scheduling/startup/admission/probe/quota/storage mechanisms are excluded and the break sits on the address layer. Audit of the address table (every service-address env var vs. the declared port of the referenced Service) found exactly one mis-wired entry, live in both the running pod en

### case-7

- **结论**：`app/frontend` + `service_env_var_address_mismatch` ｜ 标签 `app/frontend` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 21 · tokens 127,254
- **raw 日志**：[results/1013_1955_inorder4-v3b34/raw/1013_1956_boutique-service-7](../results/1013_1955_inorder4-v3b34/raw/1013_1956_boutique-service-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All object-layer surfaces are healthy (11/11 pods Running 1/1 with RESTARTS 0, all Deployments 1/1 AVAILABLE, nodes Ready/uncordoned, no alerts), yet frontend returns HTTP 500 on every request. Caller-side logs carry 125 hits of 'could not retrieve currencies: ... dial tcp 10.68.199.102:7001: connect: connection refused' (currencyservice ClusterIP). The currencyservice Service and listener declare port 7000 (endpoints 172.20.1.164:7000, targetPort 7000); an active TCP probe to currencyservice:7000 succeeds while currencyservice:7001 fails. GetAppYAML(frontend) shows the wrong address CURRENCY_

### case-8

- **结论**：`app/recommendationservice` + `service_env_var_address_mismatch` ｜ 标签 `app/recommendationservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 119,079
- **raw 日志**：[results/1013_2040_chainpivot-verify2/raw/1013_2040_boutique-service-8](../results/1013_2040_chainpivot-verify2/raw/1013_2040_boutique-service-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, all Services have correct selectors and bound endpoints (productcatalogservice -> 172.20.1.197:3550), and no Warning events exist in the namespace, excluding scheduling/startup/probe/endpoint faults. Caller-side logs (frontend, 148/730 errors) show 'failed to get product recommendations' with gRPC StatusCode.UNAVAILABLE: 'failed to connect to all addresses; last error: ipv4:10.68.14.88:3551: Connection refused'; 10.68.14.88 is the productcatalogservice ClusterIP on port 3551, which nothing listens on. The culprit's own log closes the mechan

### case-9

- **结论**：`app/adservice` + `service_port_mapping_mismatch` ｜ 标签 `app/adservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 121,078
- **raw 日志**：[results/1013_2320_inorder4-v3b64/raw/1013_2320_boutique-service-9](../results/1013_2320_inorder4-v3b64/raw/1013_2320_boutique-service-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, so the break is not workload-side. The calling frontend logs 118x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.211.128:9555: connect: connection refused' (adservice ClusterIP reached but refused), and CheckServiceConnectivity(adservice, 9555) returns 'Connection Failed' whereas productcatalogservice (10.68.57.51:3550) returns 'open / Connection Succeeded'. The adservice pod sheet shows the container listening on 9555 (Port 9555/TCP, env PORT=9555, grpc readiness/liveness on 9555) with Ready: True and it

### case-10

- **结论**：`app/checkoutservice` + `service_port_mapping_mismatch` ｜ 标签 `app/checkoutservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 85,111
- **raw 日志**：[results/1013_2325_inorder4-v3b65/raw/1013_2325_boutique-service-10](../results/1013_2325_inorder4-v3b65/raw/1013_2325_boutique-service-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no Warning events, so scheduling/startup/probe/image mechanisms are excluded. The complaint is caller-side: frontend error logs (174/702) show 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.125.216:5050: connect: connection refused' on /cart/checkout, i.e. checkoutservice's ClusterIP is reachable but nothing listens on the port traffic is forwarded to. The endpoints listing confirms the outlier: checkoutservice endpoints are 172.20.1.199:5051 while the Service declares port 5050, and every other service's

### case-11

- **结论**：`app/currencyservice` + `service_port_mapping_mismatch` ｜ 标签 `app/currencyservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 125,052
- **raw 日志**：[results/1013_2331_inorder4-v3b66/raw/1013_2333_boutique-service-11](../results/1013_2331_inorder4-v3b66/raw/1013_2333_boutique-service-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain: all 11 boutique pods are 1/1 Running with 0 restarts, so the workload/scheduling surface is healthy; the break is at the address layer. The currencyservice Service (ClusterIP 10.68.7.23) declares port 7000 but targetPort 7001, and its endpoint resolves to 172.20.3.3:7001 (DescribeResource(service currencyservice): 'Port: grpc 7000/TCP, TargetPort: 7001/TCP, Endpoints: 172.20.3.3:7001'), while the pod template and runtime both use 7000 (containerPort 7000, env PORT=7000, grpc probes on 7000; pod log: 'CurrencyService gRPC server started on port 7000'). CheckServiceConnectivi

### case-12

- **结论**：`app/paymentservice` + `service_port_mapping_mismatch` ｜ 标签 `app/paymentservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 144,327
- **raw 日志**：[results/1013_2337_inorder4-v3b67/raw/1013_2337_boutique-service-12](../results/1013_2337_inorder4-v3b67/raw/1013_2337_boutique-service-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts, all deployments 1/1 AVAILABLE, all Services have populated endpoints, and no metric alerts fire - the workload, node and selector layers are clean, which rules out restart/scheduling/admission/selector faults. The caller-side trail localizes the break: frontend error logs carry 94 occurrences of 'failed to complete the order ... failed to charge card ... dial tcp 10.68.67.201:50051: connect: connection refused' and the recent frontend log tail is exclusively this error (08:10:33-08:10:35). GetServiceDependencies shows paymentservice is call

### case-13

- **结论**：`app/productcatalogservice` + `service_port_mapping_mismatch` ｜ 标签 `app/productcatalogservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 114,606
- **raw 日志**：[results/1014_0009_inorder4-v3b69/raw/1014_0009_boutique-service-13](../results/1014_0009_inorder4-v3b69/raw/1014_0009_boutique-service-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts (workload layer clean), so the break is in the address layer. Endpoints are bound for every Service (no selector mismatch), but productcatalogservice is the outlier: its Service declares 'port: 3550' while its endpoint resolves to 172.20.1.16:8081. Active probe CheckServiceConnectivity(productcatalogservice:3550) returns 'Connection Failed' (control: emailservice:5000 'open/Connection Succeeded'). Caller-side evidence: frontend error logs (180/724 = 24.86%) repeat 'could not retrieve products/product: rpc error: code = Unavaila

### case-14

- **结论**：`app/redis-cart` + `service_port_mapping_mismatch` ｜ 标签 `app/redis-cart` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 103,073
- **raw 日志**：[results/1014_0012_inorder4-v3b70/raw/1014_0012_boutique-service-14](../results/1014_0012_inorder4-v3b70/raw/1014_0012_boutique-service-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts; the workload layer reads clean. Endpoint/service comparison exposes the outlier: Service redis-cart declares port 6379 but its endpoint resolves to 172.20.3.68:6380 (upstream standard is 6379->6379). Active probe: redis-cart:6379 -> Connection Failed (6380 also failed), while frontend:80, emailservice:5000, cartservice:7070, productcatalogservice:3550 and checkoutservice:5050 all succeeded. Caller-side logs on cartservice (the sole upstream of redis) show 264/712 errors: 'Can't access cart storage ... RedisConnectionException:

### case-15

- **结论**：`app/adservice` + `service_port_mapping_mismatch` ｜ 标签 `app/adservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 121,725
- **raw 日志**：[results/1014_0016_inorder4-v3b71/raw/1014_0016_boutique-service-15](../results/1014_0016_inorder4-v3b71/raw/1014_0016_boutique-service-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods Running 1/1 with 0 restarts, all deployments 1/1 AVAILABLE, all 4 nodes Ready with no pressure — workload and node layers are clean. The endpoints surface is the first mismatch: 'adservice <none>' is the ONLY Service in namespace boutique without backing addresses, while its pod adservice-567f888bb-5jjhb is Running 1/1 with label app=adservice. DescribeResource(service/adservice) shows Selector app=adservice matches the pod (so not a selector fault) but TargetPort: grpc-api/TCP with Endpoints rendered as the bare address 172.20.1.70 with no port. GetAppYAML(adservice) confirms the mec

### case-16

- **结论**：`app/cartservice` + `service_port_mapping_mismatch` ｜ 标签 `app/cartservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 110,467
- **raw 日志**：[results/1014_0021_inorder4-v3b72/raw/1014_0021_boutique-service-16](../results/1014_0021_inorder4-v3b72/raw/1014_0021_boutique-service-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side (frontend) error logs show 183 occurrences of 'dial tcp 10.68.175.237:7070: connect: connection refused' — 10.68.175.237 is the cartservice ClusterIP; live probe CheckServiceConnectivity(cartservice,7070) = Connection Failed. Object layer is clean: cartservice pod is 1/1 Running, Ready=True, RESTARTS=0, logging 'Now listening on: http://[::]:7070', and its label app=cartservice matches the Service selector app=cartservice. The break is the endpoint binding: the endpoints listing shows 'cartservice <none>' (the only service with no endpoints) while all 11 other services have IP:port

### case-17

- **结论**：`app/checkoutservice` + `service_port_mapping_mismatch` ｜ 标签 `app/checkoutservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 102,361
- **raw 日志**：[results/1014_0029_inorder4-v3b73/raw/1014_0029_boutique-service-17](../results/1014_0029_inorder4-v3b73/raw/1014_0029_boutique-service-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, so the workload/scheduling/startup layers are clean; the break is at the addressing layer. Endpoints listing shows only checkoutservice with '<none>' (no backends). The victim's own signal closes it: CheckServiceConnectivity on its declared port 5050 returns 'Connection Failed', and the outermost caller frontend logs 174 identical errors 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.228.153:5050: connect: connection refused' (10.68.228.153 = checkoutservice ClusterIP). GetAppYAML(checkoutservi

### case-18

- **结论**：`app/currencyservice` + `service_port_mapping_mismatch` ｜ 标签 `app/currencyservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 105,670
- **raw 日志**：[results/1014_0035_inorder4-v3b74/raw/1014_0035_boutique-service-18](../results/1014_0035_inorder4-v3b74/raw/1014_0035_boutique-service-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer was clean (all 11 pods 1/1 Running with 0 restarts, all deployments AVAILABLE, zero warnings in namespace events, no metric alerts), so the break sits at the reachability/address layer. The frontend (entrypoint) error log carries the dominant trail: 130 occurrences (19.3%) of 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.167.71:7000: connect: connection refused', i.e. the currencyservice ClusterIP and its declared port. Active probe CheckServiceConnectivity(currencyservice, 7000) returned 'Connection Failed', while productcatalogservice:3550 retu

### case-19

- **结论**：`app/paymentservice` + `service_port_mapping_mismatch` ｜ 标签 `app/paymentservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 109,654
- **raw 日志**：[results/1014_0041_inorder4-v3b75/raw/1014_0041_boutique-service-19](../results/1014_0041_inorder4-v3b75/raw/1014_0041_boutique-service-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, all deployments AVAILABLE, zero alerts, and the namespace event surface is empty, so no scheduling/startup/probe/OOM fault exists. The outlier is at the Service/endpoints layer: the endpoints listing shows 'paymentservice <none>' while every other Service is backed, even though pod paymentservice-64d89c6576-ndg24 (172.20.1.122, Ready True, Restart Count 0) matches the selector app=paymentservice. CheckServiceConnectivity(paymentservice, 50051 — the port declared by its own Service spec) returns 'Connection Failed', while the negative contro

### case-20

- **结论**：`app/productcatalogservice` + `service_port_mapping_mismatch` ｜ 标签 `app/productcatalogservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 0 · EE 0.2941 · steps 18 · tokens 89,491
- **raw 日志**：[results/1014_0046_inorder4-v3b76/raw/1014_0046_boutique-service-20](../results/1014_0046_inorder4-v3b76/raw/1014_0046_boutique-service-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts, all deployments AVAILABLE 1/1, and no alerts, so the object layer is clean. The caller-side trail (frontend, entry service) carries 178/710 errors (25.07%) all reading 'could not retrieve products: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.117.230:3550: connect: connection refused' — 10.68.117.230 is productcatalogservice's ClusterIP and 3550 its own declared Service port. The victim's endpoint binding is empty: productcatalogservice ENDPOINTS <none>, and an active probe on product

### case-21

- **结论**：`app/recommendationservice` + `service_port_mapping_mismatch` ｜ 标签 `app/recommendationservice` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 124,626
- **raw 日志**：[results/1014_0048_inorder4-v3b77/raw/1014_0048_boutique-service-21](../results/1014_0048_inorder4-v3b77/raw/1014_0048_boutique-service-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and the event surface is empty, excluding scheduling/startup/admission/probe faults. The endpoints listing isolates the break: recommendationservice shows '<none>' while all other services show addr:port. DescribeResource(service/recommendationservice) shows 'Port: grpc 8080/TCP, TargetPort: grpc-client/TCP, Endpoints: 172.20.3.194' - the address is present but no port can be published, while GetAppYAML(recommendationservice) shows the container port is named 'grpc-server', so the Service's named targetPort 'grpc-client' matches no port in t

### case-22

- **结论**：`app/redis-cart` + `service_port_mapping_mismatch` ｜ 标签 `app/redis-cart` + `service_port_mapping_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 85,579
- **raw 日志**：[results/1014_0051_inorder4-v3b78/raw/1014_0051_boutique-service-22](../results/1014_0051_inorder4-v3b78/raw/1014_0051_boutique-service-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique pods are 1/1 Running with 0 restarts and all deployments 1/1 AVAILABLE, and no metric alerts fired, so the break is not on the workload liveness/startup surface. The endpoints listing is the outlier: redis-cart is the only Service with '<none>' endpoints although its Pod (172.20.1.153, app=redis-cart) is Running and its Service selector app=redis-cart matches the Pod labels. Caller-side evidence closes the symptom: cartservice logs 249/672 errors with 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379', i.e. correc

### case-23

- **结论**：`app/adservice` + `service_protocol_mismatch` ｜ 标签 `app/adservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 90,974
- **raw 日志**：[results/1014_0054_inorder4-v3b79/raw/1014_0054_boutique-service-23](../results/1014_0054_inorder4-v3b79/raw/1014_0054_boutique-service-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side names the victim: frontend caller logs show 87x 'failed to get ads: rpc error ... dial tcp 10.68.25.111:9555: connect: connection refused' (10.68.25.111 = adservice ClusterIP). Live probe confirms a current break: CheckServiceConnectivity(adservice,9555)=Connection Failed while control probe productcatalogservice:3550=open/Connection Succeeded. The workload layer is fully healthy: pod adservice-84dbdf99d-r4rdr 1/1 Running with 0 RESTARTS, endpoints bound at 172.20.3.220:9555, deployment 1/1 available, and adservice logs 'Ad Service started, listening on 9555' (gRPC/TCP server). Th

### case-24

- **结论**：`app/cartservice` + `service_protocol_mismatch` ｜ 标签 `app/cartservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.2857 · steps 15 · tokens 70,079
- **raw 日志**：[results/1014_0104_inorder4-v3b80/raw/1014_0104_boutique-service-24](../results/1014_0104_inorder4-v3b80/raw/1014_0104_boutique-service-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain walked symptom-side first. (1) Inventory: all 11 boutique pods are 1/1 Running with 0 RESTARTS and endpoints are fully populated (cartservice -> 172.20.1.192:7070), so no workload/scheduling/probe/readiness break exists. (2) The Services listing names the outlier: cartservice ClusterIP 10.68.48.119 exposes '7070/UDP'. (3) Victim's own signal: CheckServiceConnectivity(cartservice, 7070) = 'Connection Failed' while the control probe CheckServiceConnectivity(productcatalogservice, 3550) = 'Connection Succeeded', matching the 'Partial' wording. (4) Caller-side logs: frontend has

### case-25

- **结论**：`app/checkoutservice` + `service_protocol_mismatch` ｜ 标签 `app/checkoutservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 127,926
- **raw 日志**：[results/1014_0108_inorder4-v3b81/raw/1014_0108_boutique-service-25](../results/1014_0108_inorder4-v3b81/raw/1014_0108_boutique-service-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 日志 176/702 (25.1%) 全部为同一错误：POST /cart/checkout -> rpc Unavailable 'dial tcp 10.68.191.124:5050: connect: connection refused'（10.68.191.124 即 checkoutservice 的 ClusterIP）。对象层无离群：11 个 Pod 全部 1/1 Running、RESTARTS=0，deployments 全部 AVAILABLE 1/1，无告警、无 namespace 事件，说明故障不在调度/启动/探针/资源层。GetServiceDependencies(frontend) 证实 frontend->checkoutservice 为合法调用边（非错路由）；endpoints/checkoutservice=172.20.1.199:5050 存在（selector 匹配、Pod Ready），但 CheckServiceConnectivity(checkoutservice:5050) 返回 Connection Failed。断点在 Service 寻址层：services 清单中 checkoutservice 是唯一协议异常项 '5050/UDP'（其余服务均 /TCP），DescribeResource 确认 

### case-26

- **结论**：`app/currencyservice` + `service_protocol_mismatch` ｜ 标签 `app/currencyservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 107,554
- **raw 日志**：[results/1014_0118_inorder4-v3b82/raw/1014_0118_boutique-service-26](../results/1014_0118_inorder4-v3b82/raw/1014_0118_boutique-service-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 RESTARTS and no alerts, and currencyservice's endpoints are correctly populated (172.20.3.3:7000), so the break is not in scheduling/startup/selector binding. The frontend (the caller of currencyservice per GetServiceDependencies) logs 134 recurring errors (19.3% of its log lines): 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.90.185:7000: connect: connection refused' with HTTP 500 responses, and CheckServiceConnectivity(currencyservice:7000) returns Connection Failed while productcatalogservice:3550 is open. The cl

### case-27

- **结论**：`app/paymentservice` + `service_protocol_mismatch` ｜ 标签 `app/paymentservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 112,403
- **raw 日志**：[results/1014_0122_inorder4-v3b83/raw/1014_0122_boutique-service-27](../results/1014_0122_inorder4-v3b83/raw/1014_0122_boutique-service-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, so the workload/scheduling/startup layers are clean. The Services+Endpoints listing exposes exactly one outlier: paymentservice's Service declares PORT 50051/UDP while every other Service is /TCP, and its Endpoints (172.20.3.28:50051) bind normally — so the selector and port mapping are fine and the break is the declared protocol. Connectivity probe on the Service-declared port fails (paymentservice:50051 -> Connection Failed) while a control probe succeeds (cartservice:7070 -> open/Connection Succeeded). GetAppYAML(paymentser

### case-28

- **结论**：`app/productcatalogservice` + `service_protocol_mismatch` ｜ 标签 `app/productcatalogservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.3571 · steps 15 · tokens 87,125
- **raw 日志**：[results/1014_0124_inorder4-v3b84/raw/1014_0124_boutique-service-28](../results/1014_0124_inorder4-v3b84/raw/1014_0124_boutique-service-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, all deployments 1/1 AVAILABLE, no alerts and no namespace Warning events, excluding scheduling/startup/admission/probe/resource causes. The break is at the addressing layer: DescribeResource(service/productcatalogservice) shows 'Port: grpc 3550/UDP, TargetPort: 3550/UDP', while GetAppYAML(productcatalogservice) shows the container listening on TCP 3550 (containerPort 3550, PORT=3550, grpc readiness/liveness probes on 3550). CheckServiceConnectivity(productcatalogservice, 3550) returns 'Connection Failed', and frontend caller logs carry 169 

### case-29

- **结论**：`app/recommendationservice` + `service_protocol_mismatch` ｜ 标签 `app/recommendationservice` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 115,553
- **raw 日志**：[results/1014_0130_inorder4-v3b85/raw/1014_0130_boutique-service-29](../results/1014_0130_inorder4-v3b85/raw/1014_0130_boutique-service-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and the namespace event surface is empty, ruling out scheduling/startup/probe/OOM stories. The break is at the address layer: of 12 Services, only recommendationservice declares 'protocol: UDP' on port 8080, while GetAppYAML(recommendationservice) shows a TCP gRPC server (containerPort 8080, grpc probes on 8080) with targetPort 8080. A live TCP probe to recommendationservice:8080 returned 'Connection Failed' while control probes (emailservice:5000, productcatalogservice:3550) succeeded; frontend caller logs carry the ongoing pattern 'dial tc

### case-30

- **结论**：`app/redis-cart` + `service_protocol_mismatch` ｜ 标签 `app/redis-cart` + `service_protocol_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 109,173
- **raw 日志**：[results/1014_0141_inorder4-v3b86/raw/1014_0141_boutique-service-30](../results/1014_0141_inorder4-v3b86/raw/1014_0141_boutique-service-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 pods in namespace boutique are 1/1 Running with 0 restarts, all 11 Deployments 1/1 AVAILABLE, all 11 Endpoints bound, no alerts and no Warning events -> the object layer is clean, so the break is in the reachability/address layer. Active TCP probes on each Service's own declared port succeeded for 10 services and failed only for redis-cart:6379 (Connection Failed). DescribeResource(service/redis-cart) shows 'Port: tcp-redis 6379/UDP' and 'TargetPort: 6379/UDP', while GetAppYAML(redis-cart) shows the container port 6379 with passing tcpSocket readiness/liveness probes (pod ready, 0 resta

### case-31

- **结论**：`app/adservice` + `service_selector_mismatch` ｜ 标签 `app/adservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 104,550
- **raw 日志**：[results/1014_0147_inorder4-v3b87/raw/1014_0147_boutique-service-31](../results/1014_0147_inorder4-v3b87/raw/1014_0147_boutique-service-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and all deployments 1/1 AVAILABLE, so no workload-layer fault exists. The endpoints listing is the sole outlier: every Service has a bound endpoint except adservice, which shows '<none>' while its pod adservice-84dbdf99d-k9xjg is Running/Ready on worker-01 with label app=adservice. Caller-side frontend logs show 94x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.152.172:9555: connect: connection refused' - the ClusterIP resolves fine and is refused at TCP level, i.e. a VIP with no backend, not a DNS problem (the co-occu

### case-32

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.75 · ECR 1 · EE 0.4286 · steps 15 · tokens 81,623
- **raw 日志**：[results/1014_0149_inorder4-v3b88/raw/1014_0149_boutique-service-32](../results/1014_0149_inorder4-v3b88/raw/1014_0149_boutique-service-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 pods in namespace boutique are 1/1 Running with RESTARTS=0 and GetAlerts() reports no metric anomalies, so the object/telemetry layer is clean and the break is at the reachability/addressing layer. The Services listing exposes the single outlier: cartservice is the only Service whose selector is 'app=cart_service' (underscore) while every other Service selector matches its pods; correspondingly the Endpoints listing shows 'cartservice <none>' — the only Service with an empty endpoint set. Pruned by anchor, the cartservice pod carries label 'app=cartservice,pod-template-hash=685745b96c',

### case-33

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 83,325
- **raw 日志**：[results/1014_0151_inorder4-v3b89/raw/1014_0151_boutique-service-33](../results/1014_0151_inorder4-v3b89/raw/1014_0151_boutique-service-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts and no active alerts, but endpoints listing shows checkoutservice = <none> while every other service resolves. TCP probe to checkoutservice:5050 returns 'Connection Failed', and frontend error logs carry 177 occurrences (24.8%) of 'rpc error: code = Unavailable ... dial tcp 10.68.144.4:5050: connect: connection refused' on POST /cart/checkout, i.e. the checkoutservice ClusterIP. The root cause is a Service selector mismatch: the Service spec declares selector 'app: checkout_service' (underscore) while the Deployment/pod labels are 'app: chec

### case-34

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 121,932
- **raw 日志**：[results/1014_0153_inorder4-v3b90/raw/1014_0153_boutique-service-34](../results/1014_0153_inorder4-v3b90/raw/1014_0153_boutique-service-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts and no metric alerts, so the object layer is clean; the break is on the address/reachability layer. The endpoints listing shows only 'currencyservice <none>' while its pod currencyservice-75686c9564-vmnfs is 1/1 Running (a Ready pod with zero endpoints = Service not selecting it). DescribeResource(service/currencyservice) shows 'Selector: app=currencyservice-v1', whereas the pod carries 'app=currencyservice'; GetAppYAML(currencyservice) confirms the divergence in the raw manifest (Deployment template label app=currencyservice vs Service spec

### case-35

- **结论**：`app/frontend` + `service_selector_mismatch` ｜ 标签 `app/frontend` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 103,344
- **raw 日志**：[results/1014_0155_inorder4-v3b91/raw/1014_0156_boutique-service-35](../results/1014_0155_inorder4-v3b91/raw/1014_0156_boutique-service-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and all 11 Deployments are 1/1 AVAILABLE, so no workload/restart/probe/admission fault exists. The break surfaces at the Service endpoint binding: the 'frontend' ClusterIP Service has ENDPOINTS '<none>' while its sibling 'frontend-external' resolves to 172.20.1.125:8080 for the same pod. DescribeResource(service/frontend) shows 'Selector: app=front_end' (underscore), whereas the pod label and the Deployment selector/template are 'app=frontend'; GetAppYAML(frontend) confirms the mismatch verbatim inside the same manifest (Deployment selector 

### case-36

- **结论**：`app/productcatalogservice` + `service_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 83,798
- **raw 日志**：[results/1014_0158_inorder4-v3b92/raw/1014_0158_boutique-service-36](../results/1014_0158_inorder4-v3b92/raw/1014_0158_boutique-service-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, so no workload-plane fault. The break is at the Service/Endpoints layer: GetResources(endpoints,ns=boutique) shows productcatalogservice = <none>, the only Service with no bound endpoints. DescribeResource(service/productcatalogservice) shows Selector: app=productcatalog_service, while the pod and Deployment template labels are app=productcatalogservice (no underscore) - the selector never matches its own pods, so no endpoints are created. Caller side confirms: frontend error logs report 92+80 occurrences of 'could not retrieve products/pro

### case-37

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 87,695
- **raw 日志**：[results/1014_0200_inorder4-v3b93/raw/1014_0200_boutique-service-37](../results/1014_0200_inorder4-v3b93/raw/1014_0200_boutique-service-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Workload layer is clean: all 11 boutique pods are 1/1 Running with 0 restarts and all deployments 1/1 AVAILABLE, and no metric alerts fire. The single outlier is at the addressing layer: the redis-cart Service shows ENDPOINTS '<none>' while every other service has a backend IP. DescribeResource(service redis-cart) shows 'Selector: app=redis_cart' (underscore) and empty Endpoints, whereas the redis-cart pod carries label 'app=redis-cart' (hyphen, confirmed via pods --show-labels) and GetAppYAML(redis-cart) shows the Deployment pod template labeled 'app: redis-cart' while the Service spec.select

### case-38

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 93,510
- **raw 日志**：[results/1014_0202_inorder4-v3b94/raw/1014_0202_boutique-service-38](../results/1014_0202_inorder4-v3b94/raw/1014_0202_boutique-service-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, so no workload-side fault exists. The symptom-side caller log (frontend) is dominated by 124x 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.12.251:50051: connect: connection refused', and 10.68.12.251:50051 is exactly the shippingservice ClusterIP/port. The endpoints listing shows 'shippingservice  <none>' while every other Service maps to a pod IP, and an active probe CheckServiceConnectivity(shippingservice, 50051) returns Connection Failed. DescribeResource(service shippingservice) shows Selector: app=sh

### case-39

- **结论**：`app/adservice` + `service_selector_mismatch` ｜ 标签 `app/adservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 83,453
- **raw 日志**：[results/1014_0205_inorder4-v3b95/raw/1014_0205_boutique-service-39](../results/1014_0205_inorder4-v3b95/raw/1014_0205_boutique-service-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice Service is the single outlier: its endpoints are <none> while all 11 other Services in boutique are bound to pod IPs. The Service selector is 'application=adservice' whereas the adservice pod and its Deployment template carry label 'app=adservice' (verified: pod adservice-84dbdf99d-zlgfk LABELS app=adservice; GetAppYAML adservice shows Service spec.selector 'application: adservice' vs template labels 'app: adservice'). No Endpoints controller can therefore select the pod, so connection to the ClusterIP on the port the Service declares fails: CheckServiceConnectivity(adservice:9555) =

### case-40

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3913 · steps 24 · tokens 138,541
- **raw 日志**：[results/1014_0207_inorder4-v3b96/raw/1014_0207_boutique-service-40](../results/1014_0207_inorder4-v3b96/raw/1014_0207_boutique-service-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side: frontend (the outermost caller of cartservice) error logs carry 172 occurrences of 'dial tcp 10.68.16.141:7070: connect: connection refused' (cartservice ClusterIP + declared port) with http.resp.status 500; CheckServiceConnectivity(cartservice,7070) returned 'Connection Failed'. Address layer: GetResources(endpoints) shows 'cartservice <none>' — the only Service with no backends — while its pod cartservice-685745b96c-v2rp4 is 1/1 Running, Ready:True, Restart Count:0. Config confirmation: DescribeResource(service/cartservice) shows 'Selector: application=cartservice', GetResource

### case-41

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5385 · steps 14 · tokens 83,220
- **raw 日志**：[results/1014_0209_inorder4-v3b97/raw/1014_0209_boutique-service-41](../results/1014_0209_inorder4-v3b97/raw/1014_0209_boutique-service-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts and no alerts, so the workload layer is clean; the break is in the address layer. The endpoints listing shows the outlier: 'checkoutservice  <none>' while every other Service binds correctly. DescribeResource(service checkoutservice) shows Selector: application=checkoutservice, but the pod's labels are app=checkoutservice (Deployment pod template label app: checkoutservice, per GetAppYAML). The selector key 'application' matches no pod label, so no endpoints are programmed and the ClusterIP 10.68.145.159:5050 has no backend. Caller-side conf

### case-42

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 109,858
- **raw 日志**：[results/1014_0211_inorder4-v3b98/raw/1014_0211_boutique-service-42](../results/1014_0211_inorder4-v3b98/raw/1014_0211_boutique-service-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, excluding workload/scheduling/probe faults; the break is at the addressing layer. The currencyservice Service is the only outlier: its spec.selector is 'application: currencyservice' while every other Service uses 'app=<name>' and the currencyservice pod actually carries labels 'app=currencyservice,pod-template-hash=75686c9564' (no 'application' key). Its Endpoints listing is '<none>' (all other 11 endpoints bind correctly), active TCP probe to its own declared port 7000 fails ('Connection Failed'), and frontend caller logs sh

### case-43

- **结论**：`app/paymentservice` + `service_selector_mismatch` ｜ 标签 `app/paymentservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 89,954
- **raw 日志**：[results/1014_0214_inorder4-v3b99/raw/1014_0214_boutique-service-43](../results/1014_0214_inorder4-v3b99/raw/1014_0214_boutique-service-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend caller error logs (99x) show 'failed to charge card ... dial tcp 10.68.245.30:50051: connect: connection refused' on /cart/checkout. Object layer: all 11 boutique pods are 1/1 Running with 0 RESTARTS, but the Service surface is the outlier - 'endpoints' listing shows paymentservice = <none> while every other Service has a bound endpoint; live probe CheckServiceConnectivity(paymentservice, 50051) = Connection Failed, whereas shippingservice:50051 and checkoutservice:5050 are open. Mechanism: DescribeResource(service paymentservice) reads 'Selector: application=paymentservice', while th

### case-44

- **结论**：`app/productcatalogservice` + `service_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 103,178
- **raw 日志**：[results/1014_0216_inorder4-v3b100/raw/1014_0216_boutique-service-44](../results/1014_0216_inorder4-v3b100/raw/1014_0216_boutique-service-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs repeatedly show 'could not retrieve products/product: rpc error: code = Unavailable ... dial tcp 10.68.202.177:3550: connect: connection refused' (10.68.202.177 = productcatalogservice ClusterIP, port 3550 as declared by its Service). All 11 boutique pods are 1/1 Running with 0 restarts, but the endpoints listing shows 'productcatalogservice   <none>' while every other Service has endpoints, and an active probe on port 3550 returns 'Connection Failed'. DescribeResource(service/productcatalogservice) reads 'Labels: app=productcatalogservice' but 'Selector: application=produc

### case-45

- **结论**：`app/recommendationservice` + `service_selector_mismatch` ｜ 标签 `app/recommendationservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 0 · EE 0.3125 · steps 17 · tokens 101,090
- **raw 日志**：[results/1014_0218_inorder4-v3b101/raw/1014_0218_boutique-service-45](../results/1014_0218_inorder4-v3b101/raw/1014_0218_boutique-service-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods in boutique are 1/1 Running with 0 restarts and no alerts fire, so the break is not scheduling/startup/OOM. The endpoints listing isolates the single outlier: 'recommendationservice <none>' while every other Service has a populated endpoint, although its pod recommendationservice-7df9c5b676-bj6q9 is Running 1/1 Ready on worker-01. Victim-side confirmation: CheckServiceConnectivity(recommendationservice, 8080) returns 'Connection Failed', and the caller-side frontend error log shows 'rpc error: code = Unavailable desc = ... dial tcp 10.68.64.86:8080: connect: connection refused' (10.68

### case-46

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 159,813
- **raw 日志**：[results/1014_0221_inorder4-v3b102/raw/1014_0221_boutique-service-46](../results/1014_0221_inorder4-v3b102/raw/1014_0221_boutique-service-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts (no workload-side outlier), but the Endpoints surface shows a single outlier: redis-cart has NO endpoints (Endpoints object Subsets empty) while its pod redis-cart-68db7b6f97-qmsxn runs 1/1 on 172.20.1.45. Cause is a selector-key mismatch: Service redis-cart spec.selector is 'application: redis-cart', but the pod/deployment template labels are 'app: redis-cart', so no pod is ever selected and the ClusterIP has no backends (baseline check: productcatalogservice's Service correctly uses selector 'app=productcatalogservice'). Caller-side eviden

### case-47

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 68,003
- **raw 日志**：[results/1014_0223_inorder4-v3b103/raw/1014_0223_boutique-service-47](../results/1014_0223_inorder4-v3b103/raw/1014_0223_boutique-service-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, yet connectivity to shippingservice:50051 fails (CheckServiceConnectivity -> Connection Failed). DescribeResource(service/shippingservice) shows 'Selector: application=shippingservice' with empty 'Endpoints:', while its pods (e.g. shippingservice-7cbfcb6d68-47wzk) are labeled 'app=shippingservice' and the Deployment's own selector is 'app=shippingservice'. The Service selector key 'application' matches no pod label, so the endpoint set is empty; GetAppYAML(shippingservice) confirms the same mismatch in the Service manifest (sp

### case-48

- **结论**：`app/cartservice` + `service_selector_mismatch` ｜ 标签 `app/cartservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 116,477
- **raw 日志**：[results/1014_0225_inorder4-v3b104/raw/1014_0225_boutique-service-48](../results/1014_0225_inorder4-v3b104/raw/1014_0225_boutique-service-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, so the workload layer is clean; the break is at the address layer. The cartservice Service is the only outlier: its selector is 'app=cartservice,env=production' while its ENDPOINTS read '<none>' (every other Service has backends, e.g. productcatalogservice 172.20.1.83:3550). The cartservice pod listing shows only label 'app=cartservice,pod-template-hash=79b49f5555', and the cartservice manifest confirms the pod template labels only 'app: cartservice' — the extra 'env=production' selector term matches no backend, so the Service

### case-49

- **结论**：`app/checkoutservice` + `service_selector_mismatch` ｜ 标签 `app/checkoutservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5385 · steps 14 · tokens 84,498
- **raw 日志**：[results/1014_0228_inorder4-v3b105/raw/1014_0228_boutique-service-49](../results/1014_0228_inorder4-v3b105/raw/1014_0228_boutique-service-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts (workload layer clean, no Pending/CrashLoop/image/probe outlier). The endpoints listing shows exactly one outlier: 'checkoutservice  <none>' — no backend subsets, confirmed by DescribeResource(endpoints/checkoutservice) with an empty Subsets field. CheckServiceConnectivity(checkoutservice, 5050) returns 'Connection Failed', and the caller-side logs (GetErrorLogs frontend) show 164 identical errors: 'rpc error: code = Unavailable ... dial tcp 10.68.36.46:5050: connect: connection refused' on POST /cart/checkout — the DNS name resolved to the 

### case-50

- **结论**：`app/currencyservice` + `service_selector_mismatch` ｜ 标签 `app/currencyservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 106,025
- **raw 日志**：[results/1014_0229_inorder4-v3b106/raw/1014_0230_boutique-service-50](../results/1014_0229_inorder4-v3b106/raw/1014_0230_boutique-service-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entrypoint caller) error logs carry the dominant failure pattern (133/178 errors, 18.7%): 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.78.209:7000: connect: connection refused' — 10.68.78.209 is the currencyservice ClusterIP on its declared gRPC port 7000. The endpoints listing shows currencyservice is the ONLY Service in the namespace with '<none>' endpoints while all 10 others are bound; CheckServiceConnectivity(currencyservice:7000) returned 'Connection Failed'. GetAppYAML(currencyservice) exposes the mechanism: the Service selector requires '{a

### case-51

- **结论**：`app/paymentservice` + `service_selector_mismatch` ｜ 标签 `app/paymentservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3478 · steps 24 · tokens 163,375
- **raw 日志**：[results/1014_0232_inorder4-v3b107/raw/1014_0232_boutique-service-51](../results/1014_0232_inorder4-v3b107/raw/1014_0232_boutique-service-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend /cart/checkout returns 500 with 'failed to charge card ... dial tcp 10.68.148.209:50051: connect: connection refused' (99 hits, dominant in the live log tail), and 10.68.148.209:50051 is the paymentservice ClusterIP. kubectl get endpoints shows paymentservice as '<none>' while every other Service in boutique has a bound pod IP; CheckServiceConnectivity(paymentservice:50051) = Connection Failed while shippingservice/checkoutservice/adservice/currencyservice probes all succeed (hence 'partial'). The workload itself is healthy: paymentservice Deployment 1/1 AVAILABLE, pod 1/1 Running wit

### case-52

- **结论**：`app/recommendationservice` + `service_selector_mismatch` ｜ 标签 `app/recommendationservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 105,728
- **raw 日志**：[results/1014_0234_inorder4-v3b108/raw/1014_0234_boutique-service-52](../results/1014_0234_inorder4-v3b108/raw/1014_0234_boutique-service-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 1/1 with 0 restarts (no workload/scheduling/probe fault), but the endpoints listing shows recommendationservice with '<none>' endpoints. DescribeResource(service, recommendationservice) shows Selector 'app=recommendationservice,env=production' with empty Endpoints, while its pod recommendationservice-7df9c5b676-ctwzd carries only labels 'app=recommendationservice,pod-template-hash=7df9c5b676' and GetAppYAML confirms the Deployment pod template labels only 'app: recommendationservice' - the extra 'env=production' selector key matches no pod, so no EndpointSlice 

### case-53

- **结论**：`app/redis-cart` + `service_selector_mismatch` ｜ 标签 `app/redis-cart` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 110,601
- **raw 日志**：[results/1014_0236_inorder4-v3b109/raw/1014_0236_boutique-service-53](../results/1014_0236_inorder4-v3b109/raw/1014_0236_boutique-service-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods read Running/1-1 Ready with 0 restarts and no alerts, so scheduling/startup/probe/OOM mechanisms are excluded; the break is in the address/endpoints layer. Caller-side logs lead: frontend errors (149/594, 25.1%) top pattern 'could not retrieve cart / failed to add to cart ... Can't access cart storage ... UnableToConnect on redis-cart:6379', and cartservice errors (237/640, 37.0%) top pattern 'UnableToConnect on redis-cart:6379/Interactive, state: Connecting, last-heartbeat: never'. Probed on the victim's own declared port, CheckServiceConnectivity(redis-cart, 6379) = Conn

### case-54

- **结论**：`app/shippingservice` + `service_selector_mismatch` ｜ 标签 `app/shippingservice` + `service_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 93,636
- **raw 日志**：[results/1014_0238_inorder4-v3b110/raw/1014_0238_boutique-service-54](../results/1014_0238_inorder4-v3b110/raw/1014_0238_boutique-service-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' localized to shippingservice: frontend error logs' dominant pattern (129x) is 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.64.58:50051: connect: connection refused', where 10.68.64.58 is shippingservice's ClusterIP. All 11 pods are 1/1 Running with 0 restarts (no workload break), but the endpoints listing shows 'shippingservice  <none>' while every other service has endpoints, and DescribeResource(service shippingservice) reports 'Selector: app=shippingservice,env=production' with empty Endpoints. GetAppYAML(shippingse

