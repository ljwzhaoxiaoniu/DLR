# 评测明细 · boutique/service — cloudopsbench

> 本家族已跑 **1/54** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ token 中位 115,616 ｜ 生成 2026-10-13T02:41:58.028Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 115,616 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `service_env_var_address_mismatch` ｜ 标签 `app/cartservice` + `service_env_var_address_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 115,616
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts (no scheduling/startup/probe break), and all Services including redis-cart (10.68.39.143:6379) pass the live TCP connectivity check ('Connection Succeeded'), so the target service and its endpoint binding are healthy. The break is on cartservice's addressing surface: GetAppYAML(cartservice) shows env REDIS_ADDR = "redis-cart-invalid:6379" while the real Service is redis-cart:6379. cartservice logs loop on 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart-invalid:6379 ... clientName: cartservice-...' from cartstore/

