# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **1/58** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T06:50:17.188Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 0.75 | 1 | 0.6 | 16 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `missing_service_account` ｜ 标签 `app/adservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.75 · ECR 1 · EE 0.6 · steps 16
- **摘要**：adservice is the only unreachable service: its Service 10.68.76.205:9555 exists with correct selector app=adservice but has ENDPOINTS <none>, and the ReplicaSet adservice-6f86c56644 reports DESIRED 1 / CURRENT 0 with condition ReplicaFailure=True (FailedCreate). The blocking event is verbatim: 'Error creating: pods "adservice-6f86c56644-" is forbidden: error looking up service account boutique/services: serviceaccount "services" not found' (x15 over 101s). The Deployment pod template sets serviceAccountName: services, but the namespace's ServiceAccounts are adservice, cartservice, checkoutserv

