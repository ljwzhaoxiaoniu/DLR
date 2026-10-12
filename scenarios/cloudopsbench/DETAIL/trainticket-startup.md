# 评测明细 · train-ticket/startup — cloudopsbench

> 本家族已跑 **1/24** 题：JRA ✅1 ❌0 ｜ 证据链全闭 0 ｜ 生成 2026-10-12T06:50:17.188Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.375 | 9 | 0 | 0 | 1012_1447_inorder4-v3b2 | 结果对·链未闭 |

## 证据正文

### case-1

- **结论**：`app/ts-assurance-service` + `missing_secret_binding` ｜ 标签 `app/ts-assurance-service` + `missing_secret_binding`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.375 · steps 9
- **摘要**：Pod ts-assurance-service-f84b798d-h2tkp is the sole outlier in the namespace: READY 0/1, STATUS CreateContainerConfigError, Restart Count 0 (container never started), on worker-01. Its kubelet event (x12) reads: Warning Failed 'Error: secret "ts-assurance-mysql" not found', and the pod spec declares 'Environment Variables from: ts-assurance-mysql Secret Optional: false' — a required Secret reference. The namespace secret listing contains every sibling binding (ts-auth-mysql, ts-config-mysql, ts-consign-mysql, ..., ts-wait-order-mysql) but NOT ts-assurance-mysql, confirming the referenced objec

