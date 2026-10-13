# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **4/54** 题：JRA ✅4 ❌0 ｜ 证据链全闭 4 ｜ token 中位 262,983 ｜ 生成 2026-10-13T09:27:44.512Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 115,616 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1333 | 46 | 292,901 | 0 | 0 | 1013_1122_inorder4-v3b9 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 110,899 | 0 | 0 | 1013_1248_inorder4-v3b13 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2069 | 30 | 262,983 | 0 | 0 | 1013_1520_inorder4-v3b17 | 全对·链闭 |

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

