# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **12/54** 题：JRA ✅12 ❌0 ｜ 证据链全闭 12 ｜ token 中位 127,254 ｜ 生成 2026-10-13T15:40:50.356Z
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

