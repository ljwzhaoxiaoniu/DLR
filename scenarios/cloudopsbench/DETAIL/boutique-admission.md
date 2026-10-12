# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **2/58** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 104,662 ｜ 生成 2026-10-12T10:54:47.441Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6 | 16 | 81,626 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6 | 16 | 104,662 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `missing_service_account` ｜ 标签 `app/adservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6 · steps 16 · tokens 81,626
- **摘要**：Caller side: frontend logs show 126x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.76.205:9555: connect: connection refused'; live probe CheckServiceConnectivity(adservice,9555,boutique) = Connection Failed and endpoints adservice = <none>, while all other 11 services have backends (partial unreachability). Object layer: adservice is the only service with no pod, deployment adservice 0/1 with UP-TO-DATE 0 (no Pod object ever created => creation/admission stage, not scheduling). Mechanism event (owner chain): ReplicaSet adservice-6f86c56644 condition ReplicaFailure=True F

### case-2

- **结论**：`app/cartservice` + `missing_service_account` ｜ 标签 `app/cartservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6 · steps 16 · tokens 104,662
- **摘要**：cartservice is the only service in namespace boutique with no running pod: GetResources(pods, label_selector=app=cartservice) returns 'No matching pods found' and the deployment lists as 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE while 1 is desired. Its Deployment condition shows ReplicaFailure=True (FailedCreate) and the new ReplicaSet cartservice-d68b7d767 (0/1 replicas created) emits 'Error creating: pods "cartservice-d68b7d767-" is forbidden: error looking up service account boutique/cartservices: serviceaccount "cartservices" not found' (x15 over 101s). The configuration close confirms the mism

