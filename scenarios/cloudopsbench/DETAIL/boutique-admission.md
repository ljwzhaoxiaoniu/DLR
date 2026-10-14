# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **25/58** 题：JRA ✅25 ❌0 ｜ 证据链全闭 23 ｜ token 中位 86,160 ｜ 生成 2026-10-14T05:24:30.653Z
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
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6154 | 14 | 88,263 | 0 | 0 | 1014_1234_inorder4-v3b121 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5385 | 14 | 85,409 | 0 | 0 | 1014_1236_inorder4-v3b122 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5625 | 17 | 107,090 | 0 | 0 | 1014_1239_inorder4-v3b123 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4615 | 14 | 85,055 | 0 | 0 | 1014_1241_inorder4-v3b124 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3846 | 14 | 87,418 | 0 | 0 | 1014_1245_inorder4-v3b125 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4375 | 17 | 106,336 | 0 | 0 | 1014_1247_inorder4-v3b126 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.3846 | 14 | 83,704 | 0 | 0 | 1014_1250_inorder4-v3b127 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.5 | 15 | 105,270 | 0 | 0 | 1014_1252_inorder4-v3b128 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 0.75 | 0 | 0 | 0.25 | 13 | 86,991 | 0 | 0 | 1014_1255_inorder4-v3b129 | 结果对·链未闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4615 | 14 | 85,383 | 0 | 0 | 1014_1257_inorder4-v3b130 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5455 | 12 | 70,481 | 0 | 0 | 1014_1300_inorder4-v3b131 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 85,684 | 0 | 0 | 1014_1302_inorder4-v3b132 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4615 | 14 | 69,814 | 0 | 0 | 1014_1305_inorder4-v3b133 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 86,160 | 0 | 0 | 1014_1308_inorder4-v3b134 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4 | 16 | 89,651 | 0 | 0 | 1014_1312_inorder4-v3b135 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3571 | 15 | 92,339 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.3529 | 18 | 110,270 | 0 | 0 | 1014_1318_inorder4-v3b137 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.5 | 13 | 94,597 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |

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

### case-8

- **结论**：`app/productcatalogservice` + `missing_service_account` ｜ 标签 `app/productcatalogservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6154 · steps 14 · tokens 88,263
- **raw 日志**：[results/1014_1234_inorder4-v3b121/raw/1014_1234_boutique-admission-8](../results/1014_1234_inorder4-v3b121/raw/1014_1234_boutique-admission-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory (the legitimate entry, since the wording names no service) shows productcatalogservice entirely absent while all 10 other pods are 1/1 Running; GetResources(endpoints) shows 'productcatalogservice <none>' (zero endpoints) while every other service has bound endpoints; frontend caller logs carry 137 errors of 'connection refused' dialing 10.68.103.92:3550 (productcatalogservice's ClusterIP:port), i.e. the Service has no ready backend. Deployment reads 0/1 with UP-TO-DATE 0 and ReplicaSet productcatalogservice-758d969786 reads 'Replicas: 0 current / 1 desired', 'Pods Status: 0 Runn

### case-9

- **结论**：`app/recommendationservice` + `missing_service_account` ｜ 标签 `app/recommendationservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.5385 · steps 14 · tokens 85,409
- **raw 日志**：[results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-admission-9](../results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-admission-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Wording named no service, so the inventory listing was the entry: every boutique pod is 1/1 Running with 0 restarts, but the deployments listing shows recommendationservice 0/1 (0 up-to-date, 0 available) and its Service endpoints are '<none>'. Caller-side frontend logs carry the unreachability symptom verbatim: 'failed to get product recommendations' with 'dial tcp 10.68.170.142:8080: connect: connection refused' (recommendationservice ClusterIP, 118 hits). No pod object exists for app=recommendationservice. The namespace events surface names the mechanism: Warning FailedCreate replicaset/rec

### case-10

- **结论**：`app/redis-cart` + `missing_service_account` ｜ 标签 `app/redis-cart` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5625 · steps 17 · tokens 107,090
- **raw 日志**：[results/1014_1239_inorder4-v3b123/raw/1014_1239_boutique-admission-10](../results/1014_1239_inorder4-v3b123/raw/1014_1239_boutique-admission-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only unreachable unit: it has no pod at all (pods listing shows 10/11 services Running with 0 restarts; label_selector app=redis-cart returns no pods), its Service endpoints are '<none>' and a TCP probe to redis-cart:6379 fails ('Connection Failed'), while caller cartservice logs show 246/664 errors 'UnableToConnect on redis-cart:6379'. The owner chain shows Deployment redis-cart at 1 desired / 0 updated / 0 total / 0 available with condition ReplicaFailure=True FailedCreate, and ReplicaSet redis-cart-7f446868dc at 0/1 with 'Pods Status: 0 Running / 0 Waiting' — i.e. the pod 

### case-11

- **结论**：`app/shippingservice` + `missing_service_account` ｜ 标签 `app/shippingservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.4615 · steps 14 · tokens 85,055
- **raw 日志**：[results/1014_1241_inorder4-v3b124/raw/1014_1241_boutique-admission-11](../results/1014_1241_inorder4-v3b124/raw/1014_1241_boutique-admission-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the only outlier: no Pod object at all, Deployment reports 0/1 ready with 0 up-to-date, and its Service endpoints are '<none>' while the connectivity probe to its declared port 50051 returns 'Connection Failed' (all other 10 boutique services are 1/1 Running, 0 restarts, so the failure is partial). Because desired replicas = 1 but 0 pods were ever created, the chain breaks at admission, not scheduling/runtime. The namespace events surface names the culprit object verbatim: 'Warning FailedCreate replicaset/shippingservice-6b8786b6db - Error creating: pods "shippingservice-6b8

### case-12

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3846 · steps 14 · tokens 87,418
- **raw 日志**：[results/1014_1245_inorder4-v3b125/raw/1014_1245_boutique-admission-12](../results/1014_1245_inorder4-v3b125/raw/1014_1245_boutique-admission-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' resolves on the reachability chain to adservice: the pods inventory shows every other boutique service Running while adservice has no Pod object at all, and the endpoints listing confirms 'adservice <none>' (no ready backends) while all 11 sibling endpoints are populated. Its Deployment reads 0/1 AVAILABLE and 0 UP-TO-DATE, so no Pod was ever created by ReplicaSet adservice-b7d6498c7 -> admission, not scheduling/probe/image. The namespace event surface names the mechanism verbatim on that ReplicaSet: 'Warning FailedCreate ... Error creating: pods "adse

### case-13

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.4375 · steps 17 · tokens 106,336
- **raw 日志**：[results/1014_1247_inorder4-v3b126/raw/1014_1247_boutique-admission-13](../results/1014_1247_inorder4-v3b126/raw/1014_1247_boutique-admission-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: all 10 boutique pods are 1/1 Running but cartservice has no pod object at all; its Endpoints are '<none>' and CheckServiceConnectivity(cartservice, 7070) returns 'Connection Failed' (partial unreachability). Workload pruned by anchor: deployment cartservice is 0/1 with UP-TO-DATE 0 and ReplicaFailure=True/FailedCreate, NewReplicaSet cartservice-8cbf5b9d4 (0/1 replicas created). The namespace events surface binds the live mechanism to that ReplicaSet verbatim and repeatedly: 'Error creating: pods "cartservice-8cbf5b9d4-bx7l2" is forbidden: exceeded quota: cpu-request-quota, 

### case-14

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.3846 · steps 14 · tokens 83,704
- **raw 日志**：[results/1014_1250_inorder4-v3b127/raw/1014_1250_boutique-admission-14](../results/1014_1250_inorder4-v3b127/raw/1014_1250_boutique-admission-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice has no running pod while all other 10 boutique pods are 1/1 Running; its Endpoints bind to <none> and a TCP probe on its own declared port 5050 returns 'Connection Failed'. The deployment shows 0/1 available (desired 1, so replicas are not zero), and the namespace event surface carries the mechanism verbatim: 'Warning FailedCreate replicaset/checkoutservice-7545f6f597 Error creating: pods ... is forbidden: exceeded quota: cpu-request-quota, requested: requests.cpu=2, used: requests.cpu=10, limited: requests.cpu=10'. The config face confirms it: ResourceQuota cpu-request-quota s

### case-15

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.5 · steps 15 · tokens 105,270
- **raw 日志**：[results/1014_1252_inorder4-v3b128/raw/1014_1252_boutique-admission-15](../results/1014_1252_inorder4-v3b128/raw/1014_1252_boutique-admission-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-scoped CPU request quota exhaustion blocks currencyservice pod creation. Pod inventory shows all boutique apps Running except currencyservice, which has zero pods; Deployment currencyservice is 0/2 ready, 0 UP-TO-DATE, 0 AVAILABLE. Namespace events carry repeated Warning FailedCreate on replicaset/currencyservice-8587d7cfd7: 'pods ... is forbidden: exceeded quota: cpu-request-quota, requested: requests.cpu=1, used: requests.cpu=10, limited: requests.cpu=10' (still active 38s before collection). ResourceQuota DescribeResource confirms cpu-request-quota in namespace boutique at request

### case-16

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0 · ECR 0 · EE 0.25 · steps 13 · tokens 86,991
- **raw 日志**：[results/1014_1255_inorder4-v3b129/raw/1014_1255_boutique-admission-16](../results/1014_1255_inorder4-v3b129/raw/1014_1255_boutique-admission-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' traced along the reachability chain: pods listing shows all 10 running pods healthy but emailservice has NO pod at all; deployment emailservice is 0/1 READY with 0 UP-TO-DATE (no pod ever created -> admission). Caller-side signal: checkoutservice error logs show 12x 'failed to send order confirmation ... rpc error: code = Unavailable ... dial tcp 10.68.216.116:5000: connect: connection refused' (emailservice ClusterIP, no endpoints). Namespace events name the mechanism literally: 'Warning FailedCreate replicaset/emailservice-5dcd9bdff Error creating: po

### case-17

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.4615 · steps 14 · tokens 85,383
- **raw 日志**：[results/1014_1257_inorder4-v3b130/raw/1014_1257_boutique-admission-17](../results/1014_1257_inorder4-v3b130/raw/1014_1257_boutique-admission-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend Service endpoints are '<none>' and CheckServiceConnectivity(frontend, 80) returns 'Connection Failed' while all other boutique services are up (partial unreachability). Deployment frontend shows 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE; ReplicaSet frontend-64bcd9854d is DESIRED 1 / CURRENT 0 and no frontend pod object exists. The ReplicaSet's repeated, still-current FailedCreate event reads verbatim: 'pods "frontend-64bcd9854d-fzvkf" is forbidden: exceeded quota: cpu-quota, requested: requests.cpu=1, used: requests.cpu=10, limited: requests.cpu=10'; the closure object confirms ResourceQuo

### case-18

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.5455 · steps 12 · tokens 70,481
- **raw 日志**：[results/1014_1300_inorder4-v3b131/raw/1014_1300_boutique-admission-18](../results/1014_1300_inorder4-v3b131/raw/1014_1300_boutique-admission-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry via inventory: paymentservice is the only outlier (deployment READY 0/1, UP-TO-DATE 0, AVAILABLE 0) and has NO pod object at all, while frontend caller logs show 14 checkout failures 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.128.36:50051: connect: connection refused' - a Service with no backends. The mechanism event is explicit and live: namespace boutique events show repeated Warning FailedCreate on replicaset/paymentservice-5797775987: 'pods paymentservice-5797775987-ftbfz is forbidden: exceeded quota: cpu-request-quota, requested: requests.cpu=1, used: r

### case-19

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 85,684
- **raw 日志**：[results/1014_1302_inorder4-v3b132/raw/1014_1302_boutique-admission-19](../results/1014_1302_inorder4-v3b132/raw/1014_1302_boutique-admission-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side: pods inventory shows 10/11 services Running with 0 restarts, but productcatalogservice has NO pod; its endpoints listing reads '<none>' while all other services' endpoints are bound, so the break is on the endpoints/admission side, not scheduling, probes or addressing (its Service declares port 3550 with selector app=productcatalogservice matching the Deployment template). Workload pruned by anchor: GetResources(deployments, label_selector=app=productcatalogservice) = 'READY 0/1, UP-TO-DATE 0, AVAILABLE 0'. Live mechanism event on the namespace events surface: 'Warning FailedCrea

### case-20

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.4615 · steps 14 · tokens 69,814
- **raw 日志**：[results/1014_1305_inorder4-v3b133/raw/1014_1305_boutique-admission-20](../results/1014_1305_inorder4-v3b133/raw/1014_1305_boutique-admission-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' — listing entry: deployment redis-cart shows 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE with no redis-cart pod in the pods listing, while all 10 other boutique pods are 1/1 Running. Namespace events bind the mechanism: Warning FailedCreate replicaset/redis-cart-869b6f5f6d 'Error creating: pods ... is forbidden: exceeded quota: cpu-quota, requested: requests.cpu=1, used: requests.cpu=10, limited: requests.cpu=1' (api-worker-86b754b694 shows the same CPU-quota rejection). Config face confirms the quota object: ResourceQuota 'cpu-quota' in boutique — requests.c

### case-21

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 86,160
- **raw 日志**：[results/1014_1308_inorder4-v3b134/raw/1014_1308_boutique-admission-21](../results/1014_1308_inorder4-v3b134/raw/1014_1308_boutique-admission-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows the shippingservice workload never admitted: deployment shippingservice reads 0/1 (UP-TO-DATE 0, AVAILABLE 0), replicaset shippingservice-77f56d9479 reads DESIRED 1/CURRENT 0, Service endpoints are '<none>' and CheckServiceConnectivity(shippingservice:50051) returns 'Connection Failed', while all other 10 boutique pods are 1/1 Running with 0 restarts and no metric alerts. The events surface carries the live mechanism verbatim and repeatedly: 'Warning FailedCreate replicaset/shippingservice-77f56d9479 Error creating: pods ... is forbidden: exceeded quota: cpu-quota, req

### case-22

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.4 · steps 16 · tokens 89,651
- **raw 日志**：[results/1014_1312_inorder4-v3b135/raw/1014_1312_boutique-admission-22](../results/1014_1312_inorder4-v3b135/raw/1014_1312_boutique-admission-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the victim: the pods inventory shows 10/11 services Running while NO adservice pod exists at all (deployment/adservice = 0/1 AVAILABLE), and its endpoints listing reads 'adservice <none>' while every other service has bound Pod IPs. The caller-side signal (frontend error logs, 105/107 errors) is identical: 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.248.19:9555: connect: connection refused' — that IP:port is adservice's own declared Service ClusterIP:9555. The namespace event surface binds the mechanism to the instance verbatim: 'Warning FailedCreate repli

### case-23

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3571 · steps 15 · tokens 92,339
- **raw 日志**：[results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-admission-23](../results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-admission-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows 10 of 11 boutique services Running 1/1, with cartservice having no pod at all; its Deployment reads 0/1 READY with UP-TO-DATE=0 (pod never created). Frontend caller logs (198 errors, 21.7%) show 'could not retrieve cart: ... dial tcp 10.68.118.132:7070: connect: connection refused' - 10.68.118.132:7070 being cartservice's own ClusterIP and declared Service port, i.e. empty endpoints. The namespace events surface binds the mechanism verbatim to replicaset/cartservice-9b469fbc4: 'Warning FailedCreate ... is forbidden: exceeded quota: boutique-quota, requested: requests.memor

### case-24

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.3529 · steps 18 · tokens 110,270
- **raw 日志**：[results/1014_1318_inorder4-v3b137/raw/1014_1318_boutique-admission-24](../results/1014_1318_inorder4-v3b137/raw/1014_1318_boutique-admission-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Wording names no service, so the inventory listing was the entry: only 10 pods exist for 11 boutique services, and checkoutservice has no pod at all (label_selector app=checkoutservice returns nothing; Deployment checkoutservice 0/1, RS checkoutservice-6bcfb6486c DESIRED 1 / CURRENT 0 / READY 0). The victim's own signal leads: its caller frontend logs 'failed to complete the order: rpc error: code = Unavailable desc = transport: Error while dialing: dial tcp 10.68.232.185:5050: connect: connection refused' - checkoutservice's own ClusterIP and declared port. The namespace event surface carries

### case-25

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.5 · steps 13 · tokens 94,597
- **raw 日志**：[results/1014_1321_inorder4-v3b138/raw/1014_1321_boutique-admission-25](../results/1014_1321_inorder4-v3b138/raw/1014_1321_boutique-admission-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice has no Pod object at all while every other boutique service is 1/1 Running; its deployment reads 0/1 UP-TO-DATE, 0 AVAILABLE. Frontend caller logs show 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.182.150:7000: connect: connection refused', endpoints listing shows 'currencyservice <none>', and CheckServiceConnectivity(currencyservice:7000) returns Connection Failed, so the service is genuinely unreachable with no backing endpoint. The namespace event surface names the mechanism verbatim and repeatedly: 'Warning FailedCreate replicaset/currenc

