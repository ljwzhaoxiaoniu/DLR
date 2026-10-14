# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **7/58** 题：JRA ✅7 ❌0 ｜ 证据链全闭 6 ｜ token 中位 82,218 ｜ 生成 2026-10-14T01:41:18.020Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6 | 16 | 81,626 | 0 | 0 | 1012_1458_l3-verify3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6 | 16 | 104,662 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5294 | 18 | 102,119 | 0 | 0 | 1012_1907_l3-tweak2 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5833 | 13 | 68,497 | 0 | 0 | 1012_1935_tidy-verify1 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 82,218 | 0 | 0 | 1013_1458_chainhead-verify2c | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 0.75 | 0 | 0 | 0.4545 | 12 | 67,891 | 0 | 0 | 1013_1515_workload-verify2 | 结果对·链未闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.5 | 13 | 85,806 | 0 | 0 | 1013_1845_triple-verify1 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `missing_service_account` ｜ 标签 `app/adservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6 · steps 16 · tokens 81,626
- **raw 日志**：[results/1012_1458_l3-verify3/raw/1012_1458_boutique-admission-1](../results/1012_1458_l3-verify3/raw/1012_1458_boutique-admission-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller side: frontend logs show 126x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.76.205:9555: connect: connection refused'; live probe CheckServiceConnectivity(adservice,9555,boutique) = Connection Failed and endpoints adservice = <none>, while all other 11 services have backends (partial unreachability). Object layer: adservice is the only service with no pod, deployment adservice 0/1 with UP-TO-DATE 0 (no Pod object ever created => creation/admission stage, not scheduling). Mechanism event (owner chain): ReplicaSet adservice-6f86c56644 condition ReplicaFailure=True F

### case-2

- **结论**：`app/cartservice` + `missing_service_account` ｜ 标签 `app/cartservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6 · steps 16 · tokens 104,662
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1846_boutique-admission-2](../results/1012_1846_inorder4-v3b4/raw/1012_1846_boutique-admission-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the only service in namespace boutique with no running pod: GetResources(pods, label_selector=app=cartservice) returns 'No matching pods found' and the deployment lists as 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE while 1 is desired. Its Deployment condition shows ReplicaFailure=True (FailedCreate) and the new ReplicaSet cartservice-d68b7d767 (0/1 replicas created) emits 'Error creating: pods "cartservice-d68b7d767-" is forbidden: error looking up service account boutique/cartservices: serviceaccount "cartservices" not found' (x15 over 101s). The configuration close confirms the mism

### case-3

- **结论**：`app/checkoutservice` + `missing_service_account` ｜ 标签 `app/checkoutservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5294 · steps 18 · tokens 102,119
- **raw 日志**：[results/1012_1907_l3-tweak2/raw/1012_1907_boutique-admission-3](../results/1012_1907_l3-tweak2/raw/1012_1907_boutique-admission-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice has no pod instance while all other 10 boutique services are 1/1 Running with 0 restarts. GetResources(deployments) shows checkoutservice 0/1 (UP-TO-DATE 0, AVAILABLE 0) and its ReplicaSet checkoutservice-d4d5bb7d8 CURRENT=0, i.e. the pod was never created. Deployment/RS events give the mechanism: 'FailedCreate ... pods "checkoutservice-d4d5bb7d8-" is forbidden: error looking up service account boutique/checkoutservices: serviceaccount "checkoutservices" not found' (x15 over 101s), with condition ReplicaFailure=True/FailedCreate. The configuration closure confirms the mismatch:

### case-4

- **结论**：`app/currencyservice` + `missing_service_account` ｜ 标签 `app/currencyservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5833 · steps 13 · tokens 68,497
- **raw 日志**：[results/1012_1935_tidy-verify1/raw/1012_1935_boutique-admission-4](../results/1012_1935_tidy-verify1/raw/1012_1935_boutique-admission-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (202x) show 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.161.153:7000: connect: connection refused' (currencyservice ClusterIP:7000), and CheckServiceConnectivity(currencyservice:7000) returned Connection Failed. The pods listing (-o wide) contains only 10 of 11 boutique services: no currencyservice pod exists at all, and GetResources(pods,label_selector=app=currencyservice) is empty. Deployment currencyservice shows READY 0/1 and UP-TO-DATE 0 (no pod ever created, so not a start/probe/image issue). Namespace events carry the mechanism ve

### case-5

- **结论**：`app/emailservice` + `missing_service_account` ｜ 标签 `app/emailservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 82,218
- **raw 日志**：[results/1013_1458_chainhead-verify2c/raw/1013_1458_boutique-admission-5](../results/1013_1458_chainhead-verify2c/raw/1013_1458_boutique-admission-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice is the only drained workload: deployment 0/1 (UP-TO-DATE 0, AVAILABLE 0), no pods match app=emailservice, Endpoints '<none>' for Service emailservice (ClusterIP 10.68.1.25, port 5000->8080), and CheckServiceConnectivity(emailservice,5000) returned 'Connection Failed'. All other boutique services are 1/1 Running with 0 restarts. The mechanism event names the cause verbatim: 'Warning FailedCreate replicaset/emailservice-69777f4f8b: Error creating: pods "emailservice-69777f4f8b-" is forbidden: error looking up service account boutique/emailservices: serviceaccount "emailservices" not

### case-6

- **结论**：`app/frontend` + `missing_service_account` ｜ 标签 `app/frontend` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0 · ECR 0 · EE 0.4545 · steps 12 · tokens 67,891
- **raw 日志**：[results/1013_1515_workload-verify2/raw/1013_1515_boutique-admission-6](../results/1013_1515_workload-verify2/raw/1013_1515_boutique-admission-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory entry: frontend is the only workload with no pod at all — GetResources(pods) lists 10 boutique services Running 1/1 but zero frontend-* pods. Workload state confirms it is drained (deployment frontend 0/1 READY, UP-TO-DATE 0, AVAILABLE 0) with Conditions ReplicaFailure=True / reason FailedCreate and NewReplicaSet frontend-fbbd6d5f5 (0/1 replicas created). The mechanism event names the object verbatim: 'Warning FailedCreate replicaset/frontend-fbbd6d5f5 — Error creating: pods "frontend-fbbd6d5f5-" is forbidden: error looking up service account boutique/frontend-missing: serviceaccount

### case-7

- **结论**：`app/paymentservice` + `missing_service_account` ｜ 标签 `app/paymentservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.5 · steps 13 · tokens 85,806
- **raw 日志**：[results/1013_1845_triple-verify1/raw/1013_1845_boutique-admission-7](../results/1013_1845_triple-verify1/raw/1013_1845_boutique-admission-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain walked from the inventory entry (no service named in the symptom): all 10 running pods were 1/1 Running with 0 restarts, but the deployments listing showed the single outlier 'paymentservice 0/1 0 0' — no Pod ever created — and its Service was the only one with empty endpoints ('paymentservice <none>'), while its selector (app=paymentservice) and port (50051) were correct. The namespace events surface handed over the mechanism literally: 'Warning FailedCreate replicaset/paymentservice-f8f957d54 Error creating: pods "paymentservice-f8f957d54-" is forbidden: error looking up s

