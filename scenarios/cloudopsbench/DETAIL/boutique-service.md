# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **1/54** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-11T13:49:40.827Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 0 | 0 | 1011_2147_inorder4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no metric alerts, so pod health/scheduling/probes are excluded; Services and Endpoints are correctly bound and CheckServiceConnectivity succeeds for cartservice:7070, redis-cart:6379 and productcatalogservice:3550. The reachability break is at cartservice's addressing surface: GetAppYAML(cartservice) shows env REDIS_ADDR="redis-cart-invalid:6379" while the real backend Service is redis-cart (10.68.39.143:6379). cartservice logs are 36.9% errors, all 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart-invalid:6379

