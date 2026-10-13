# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **22/54** 题：JRA ✅22 ❌0 ｜ 证据链全闭 21 ｜ token 中位 119,079 ｜ 生成 2026-10-13T16:54:13.295Z
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

