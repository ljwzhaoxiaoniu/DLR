# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **58/58** 题：JRA ✅51 ❌7 ｜ 证据链全闭 50 ｜ token 中位 91,331 ｜ 生成 2026-10-14T11:58:35.208Z
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
| [16](#case-16) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4375 | 17 | 94,841 | 0 | 0 | 1014_1337_imgadm-verify1 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4615 | 14 | 85,383 | 0 | 0 | 1014_1257_inorder4-v3b130 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5455 | 12 | 70,481 | 0 | 0 | 1014_1300_inorder4-v3b131 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 85,684 | 0 | 0 | 1014_1302_inorder4-v3b132 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4615 | 14 | 69,814 | 0 | 0 | 1014_1305_inorder4-v3b133 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 0.75 | 0 | 0 | 0.3333 | 13 | 86,428 | 0 | 0 | 1014_1337_imgadm-verify1 | 结果对·链未闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4 | 16 | 89,651 | 0 | 0 | 1014_1312_inorder4-v3b135 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3571 | 15 | 92,339 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.3529 | 18 | 110,270 | 0 | 0 | 1014_1318_inorder4-v3b137 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.5 | 13 | 94,597 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.5 | 11 | 67,561 | 0 | 0 | 1014_1841_inorder4-v3b139 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3636 | 12 | 87,806 | 0 | 0 | 1014_1843_inorder4-v3b140 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3125 | 17 | 109,430 | 0 | 0 | 1014_1844_inorder4-v3b141 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 89,613 | 0 | 0 | 1014_1846_inorder4-v3b142 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5 | 15 | 103,746 | 0 | 0 | 1014_1848_inorder4-v3b143 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 87,636 | 0 | 0 | 1014_1850_inorder4-v3b144 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 68,078 | 0 | 0 | 1014_1851_inorder4-v3b145 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3636 | 12 | 70,164 | 0 | 0 | 1014_1853_inorder4-v3b146 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5333 | 16 | 111,698 | 0 | 0 | 1014_1855_inorder4-v3b147 | 全对·链闭 |
| [35](#case-35) | 0 | 0 | 0 | 1 | 1 | 1 | 0.4667 | 15 | 90,630 | 0 | 0 | 1014_1858_inorder4-v3b148 | 错误: unparsed_final_answer |
| [36](#case-36) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3846 | 14 | 72,838 | 0 | 0 | 1014_1900_inorder4-v3b149 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.4286 | 15 | 89,960 | 0 | 0 | 1014_1902_inorder4-v3b150 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.5714 | 15 | 88,247 | 0 | 0 | 1014_1904_inorder4-v3b151 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 103,651 | 0 | 0 | 1014_1906_inorder4-v3b152 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 87,627 | 0 | 0 | 1014_1908_inorder4-v3b153 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.3846 | 14 | 88,036 | 0 | 0 | 1014_1910_inorder4-v3b154 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.4286 | 15 | 92,390 | 0 | 0 | 1014_1911_inorder4-v3b155 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 91,331 | 0 | 0 | 1014_1913_inorder4-v3b156 | 全对·链闭 |
| [44](#case-44) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.25 | 21 | 119,723 | 0 | 0 | 1014_1917_inorder4-v3b157 | 未命中 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 112,233 | 0 | 0 | 1014_1919_inorder4-v3b158 | 全对·链闭 |
| [46](#case-46) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.3 | 21 | 118,478 | 0 | 0 | 1014_1920_inorder4-v3b159 | 未命中 |
| [47](#case-47) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.3158 | 20 | 133,502 | 0 | 0 | 1014_1922_inorder4-v3b160 | 未命中 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.303 | 34 | 183,391 | 0 | 0 | 1014_1924_inorder4-v3b161 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1613 | 63 | 394,111 | 0 | 0 | 1014_1926_inorder4-v3b162 | 全对·链闭 |
| [50](#case-50) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.3125 | 17 | 90,428 | 0 | 0 | 1014_1929_inorder4-v3b163 | 未命中 |
| [51](#case-51) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.3125 | 17 | 95,203 | 0 | 0 | 1014_1931_inorder4-v3b164 | 未命中 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 23 | 158,133 | 0 | 0 | 1014_1933_inorder4-v3b165 | 全对·链闭 |
| [53](#case-53) | 0 | 0 | 0 | 0.6667 | 0.6667 | 0 | 0.2692 | 27 | 199,989 | 0 | 0 | 1014_1935_inorder4-v3b166 | 未命中 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 95,401 | 0 | 0 | 1014_1938_inorder4-v3b167 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4762 | 22 | 186,147 | 0 | 0 | 1014_1940_inorder4-v3b168 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 147,903 | 0 | 0 | 1014_1942_inorder4-v3b169 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 17 | 131,520 | 0 | 0 | 1014_1944_inorder4-v3b170 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3704 | 28 | 179,799 | 0 | 0 | 1014_1946_inorder4-v3b171 | 全对·链闭 |

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
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.4375 · steps 17 · tokens 94,841
- **raw 日志**：[results/1014_1337_imgadm-verify1/raw/1014_1338_boutique-admission-16](../results/1014_1337_imgadm-verify1/raw/1014_1338_boutique-admission-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice Deployment 0/1 AVAILABLE and 0 UP-TO-DATE with no pod object at all; its ReplicaSet emailservice-5dcd9bdff shows DESIRED 1 / CURRENT 0 / READY 0, i.e. the pod was never created. The namespace events surface names the mechanism verbatim on that object: 'Warning FailedCreate replicaset/emailservice-5dcd9bdff — Error creating: pods "emailservice-5dcd9bdff-w8k4f" is forbidden: exceeded quota: cpu-quota, requested: requests.cpu=1, used: requests.cpu=10, limited: requests.cpu=10' (repeated across many pod names). Closing config read: DescribeResource(resourcequota cpu-quota, boutique) s

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
- **流程**：MC 0.75 · EOC 0 · ECR 0 · EE 0.3333 · steps 13 · tokens 86,428
- **raw 日志**：[results/1014_1337_imgadm-verify1/raw/1014_1339_boutique-admission-21](../results/1014_1337_imgadm-verify1/raw/1014_1339_boutique-admission-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows shippingservice has no pod at all while all 10 other boutique pods are 1/1 Running with 0 restarts. The shippingservice Service exists (selector app=shippingservice, port grpc 50051/TCP) but its Endpoints is empty, so the Service has no backend. Deployment shippingservice reads READY 0/1, UP-TO-DATE 0, AVAILABLE 0 with desired replicas 1. The namespace events surface carries the mechanism verbatim, repeated per replica attempt: 'Warning FailedCreate replicaset/shippingservice-77f56d9479  Error creating: pods "shippingservice-77f56d9479-k5x62" is forbidden: exceeded quota: 

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

### case-26

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.5 · steps 11 · tokens 67,561
- **raw 日志**：[results/1014_1841_inorder4-v3b139/raw/1014_1841_boutique-admission-26](../results/1014_1841_inorder4-v3b139/raw/1014_1841_boutique-admission-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique inventory surfaced one outlier: deployment emailservice 0/1 (UPDATED 0, AVAILABLE 0) with no emailservice pod existing at all -> admission-stage branch. Victim-side signal: endpoints/emailservice = <none> and CheckServiceConnectivity(emailservice:5000) = Connection Failed. Live mechanism event: 'Warning FailedCreate replicaset/emailservice-6d4d7cd4dc: Error creating: pods "emailservice-6d4d7cd4dc-*" is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=500Mi, used: requests.memory=3000Mi, limited: requests.memory=3Gi' (repeated for every replica atte

### case-27

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3636 · steps 12 · tokens 87,806
- **raw 日志**：[results/1014_1843_inorder4-v3b140/raw/1014_1843_boutique-admission-27](../results/1014_1843_inorder4-v3b140/raw/1014_1843_boutique-admission-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory outlier: the 'frontend' Deployment shows 0/1 READY with UP-TO-DATE 0 (no pod ever created) while all other 10 boutique services run 1/1, and CheckServiceConnectivity(frontend:80) returns Connection Failed. The frontend Service selector (app=frontend) and port mapping (80->8080) are correct, excluding the addressing layer. The live mechanism event is explicit: 'Warning FailedCreate replicaset/frontend-78fdd6f7d6 Error creating: pods "frontend-78fdd6f7d6-..." is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=300Mi, used: requests.memory=3000Mi, limited: req

### case-28

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3125 · steps 17 · tokens 109,430
- **raw 日志**：[results/1014_1844_inorder4-v3b141/raw/1014_1844_boutique-admission-28](../results/1014_1844_inorder4-v3b141/raw/1014_1844_boutique-admission-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (wide) shows 10 healthy pods but NO paymentservice pod; deployments show paymentservice 0/1 with UP-TO-DATE 0 (pods never created -> admission stage, not scheduling/startup/probe). Caller side: frontend error log 'failed to complete the order: ... failed to charge card: rpc error ... dial tcp 10.68.64.227:50051: connect: connection refused' (12x) and CheckServiceConnectivity(paymentservice, 50051 declared in its own Service spec) = Connection Failed. Mechanism event, verbatim and repeated: 'Warning FailedCreate replicaset/paymentservice-9f5d9db95 Error creating: pods "paymentservi

### case-29

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 89,613
- **raw 日志**：[results/1014_1846_inorder4-v3b142/raw/1014_1846_boutique-admission-29](../results/1014_1846_inorder4-v3b142/raw/1014_1846_boutique-admission-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique has ResourceQuota 'memory-request-quota' with requests.memory limited to 3Gi and already 3000Mi (100%) consumed by the other 10 boutique workloads at 300Mi each. productcatalogservice has desired 1 replica but 0 pods: ReplicaSet productcatalogservice-5f876f76c9 shows Replicas 0 current/1 desired, Pods Status 0 Running/0 Waiting, and ReplicaFailure=True/FailedCreate, with repeated Warning FailedCreate events reading verbatim 'Error creating: pods "productcatalogservice-5f876f76c9-..." is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=300Mi, used: 

### case-30

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.5 · steps 15 · tokens 103,746
- **raw 日志**：[results/1014_1848_inorder4-v3b143/raw/1014_1848_boutique-admission-30](../results/1014_1848_inorder4-v3b143/raw/1014_1848_boutique-admission-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods except recommendationservice are 1/1 Running; recommendationservice has NO pod at all (deployment 0/1 READY, 0 up-to-date, 0 available, condition ReplicaFailure=True/FailedCreate), its Endpoints are <none>, and a TCP probe on its declared Service port 8080 returns 'Connection Failed'. The frontend caller log carries the unreachability complaint verbatim: 'failed to get product recommendations ... rpc error: code = Unavailable ... dial tcp 10.68.104.223:8080: connect: connection refused' (103/127 errors). The live mechanism event names the break: 'Warning FailedCreate replicaset/recomm

### case-31

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 87,636
- **raw 日志**：[results/1014_1850_inorder4-v3b144/raw/1014_1850_boutique-admission-31](../results/1014_1850_inorder4-v3b144/raw/1014_1850_boutique-admission-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' entered via the no-service-named inventory path: all boutique pods are 1/1 Running except redis-cart, which has NO pod object at all. Its own signal confirms the break: TCP connectivity to redis-cart:6379 failed, while redis-cart Service (10.68.205.158, selector app=redis-cart, 6379->6379) exists but has no backing endpoint. Workload state: deployment/redis-cart shows 'Replicas: 1 desired | 0 updated | 0 total | 0 available' with Conditions ReplicaFailure=True/Reason=FailedCreate and 'NewReplicaSet: redis-cart-5858bb886 (0/1 replicas created)' - i.e. th

### case-32

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 68,078
- **raw 日志**：[results/1014_1851_inorder4-v3b145/raw/1014_1851_boutique-admission-32](../results/1014_1851_inorder4-v3b145/raw/1014_1851_boutique-admission-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 10 other boutique pods are Running/Ready with 0 restarts, but shippingservice has no pod: its Deployment reads 0/1, its Endpoints are <none>, while its Service object exists and is well-formed (ClusterIP 10.68.123.226, 50051/TCP) — so the pod was never created (admission stage). The namespace events surface carries the verbatim mechanism, repeated on replicaset/shippingservice-696cc9d869: 'Error creating: pods "shippingservice-696cc9d869-..." is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=300Mi, used: requests.memory=3000Mi, limited: requests.memory=3Gi'. Th

### case-33

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3636 · steps 12 · tokens 70,164
- **raw 日志**：[results/1014_1853_inorder4-v3b146/raw/1014_1853_boutique-admission-33](../results/1014_1853_inorder4-v3b146/raw/1014_1853_boutique-admission-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: the boutique pod inventory shows 10 pods running but adservice has no pod object at all (only outlier among 11 services). The caller frontend logs 115x 'failed to get ads: ... dial tcp 10.68.203.112:9555: connect: connection refused' against adservice's own declared ClusterIP:port (Service adservice ClusterIP 10.68.203.112 9555/TCP, selector app=adservice matches), so adservice's Service has no endpoints. Workload state: deployment adservice is 0/1 available and UP-TO-DATE 0 (creation-stage failure). Mechanism event (namespace events, Warning, still live at 36s): 'FailedCre

### case-34

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.5333 · steps 16 · tokens 111,698
- **raw 日志**：[results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-admission-34](../results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-admission-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the unreachable victim: frontend logs show 'dial tcp 10.68.65.162:7070: connect: connection refused' (cartservice ClusterIP/declared port) for GET /, POST /cart and checkout, and CheckServiceConnectivity(cartservice, 7070) returns Connection Failed, while all other services work. Object layer: no cartservice pod exists at all; deployment/cartservice is 0/1 READY, UP-TO-DATE 0 with condition ReplicaFailure=True/FailedCreate, and replicaset/cartservice-79b49f5555 is DESIRED 1 / CURRENT 0 / READY 0 (pod creation fails, not scheduling or startup). Mechanism event verbatim: 'Warning 

### case-35

- **结论**：`` + `` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 15 · tokens 90,630
- **raw 日志**：[results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-admission-35](../results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-admission-35/)（ndjson / mcp.jsonl / meta）
- **错误**：unparsed_final_answer

### case-36

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3846 · steps 14 · tokens 72,838
- **raw 日志**：[results/1014_1900_inorder4-v3b149/raw/1014_1900_boutique-admission-36](../results/1014_1900_inorder4-v3b149/raw/1014_1900_boutique-admission-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique reaches its Pod-count quota. Pods listing shows 10/11 services running and NO currencyservice pod; service/endpoints surfaces show currencyservice endpoints=<none> while its Service declares port 7000, and frontend caller logs show 'dial tcp 10.68.179.223:7000: connect: connection refused' (190/200 errors) plus checkout 'failed to convert shipping cost to currency' — a refused ClusterIP with zero endpoints. Owner chain confirms deployment/currencyservice is 0/1, UP-TO-DATE 0, AVAILABLE 0. The mechanism event closes it verbatim: 'Warning FailedCreate replicaset/currencyservic

### case-37

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.4286 · steps 15 · tokens 89,960
- **raw 日志**：[results/1014_1902_inorder4-v3b150/raw/1014_1902_boutique-admission-37](../results/1014_1902_inorder4-v3b150/raw/1014_1902_boutique-admission-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's ResourceQuota 'pod-count-quota' is saturated (Describe: pods Used 10 / Hard 10), so admission rejects every new Pod. The pods listing (wide) shows 10 Running pods belonging to the other services and NO emailservice pod; deployments listing shows emailservice 0/3 (replicas: 3 desired, 0 available) while all other services are 1/1. The mechanism event is verbatim on the namespace event surface: 'Warning FailedCreate replicaset/emailservice-c86b9b8f6 - Error creating: pods "emailservice-c86b9b8f6-..." is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pod

### case-38

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.5714 · steps 15 · tokens 88,247
- **raw 日志**：[results/1014_1904_inorder4-v3b151/raw/1014_1904_boutique-admission-38](../results/1014_1904_inorder4-v3b151/raw/1014_1904_boutique-admission-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's ResourceQuota 'pod-count-quota' is saturated: listing shows pods 10/10 (used=hard=10). The event surface carries the mechanism verbatim: Warning FailedCreate replicaset/frontend-657dd795f 'Error creating: pods "frontend-657dd795f-b7v7n" is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pods=10, limited: pods=10', repeated continuously and still live at 36s. Symptom side matches: deployments listing shows only frontend as the outlier at 0/1 READY with UP-TO-DATE 0 (no pod object was ever created), frontend and frontend-external endpoints are <none> (al

### case-39

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 103,651
- **raw 日志**：[results/1014_1906_inorder4-v3b152/raw/1014_1906_boutique-admission-39](../results/1014_1906_inorder4-v3b152/raw/1014_1906_boutique-admission-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's ResourceQuota 'pod-quota' (hard pods=10) is fully consumed: resourcequota shows 'pods 10/10'. The pods listing holds exactly 10 pods while paymentservice has no pod at all; deployments listing shows 'paymentservice 0/1 0 0' with condition 'ReplicaFailure True FailedCreate'. The namespace events surface carries the verbatim mechanism: Warning FailedCreate replicaset/paymentservice-78c5996648 'Error creating: pods "paymentservice-78c5996648-svw4h" is forbidden: exceeded quota: pod-quota, requested: pods=1, used: pods=10, limited: pods=10' (retried repeatedly). The victim's o

### case-40

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 87,627
- **raw 日志**：[results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-admission-40](../results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-admission-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's ResourceQuota 'pod-count-quota' is saturated at pods 10/10. The productcatalogservice ReplicaSet repeatedly fails admission: namespace events show 'Warning FailedCreate replicaset/productcatalogservice-ddb46fc86 Error creating: pods "productcatalogservice-ddb46fc86-72s99" is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pods=10, limited: pods=10', and the quota listing confirms 'pod-count-quota ... pods: 10/10'. Consequently the deployment reads 0/1 READY, UP-TO-DATE 0 with no pod present under label app=productcatalogservice, and the Service has no 

### case-41

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.3846 · steps 14 · tokens 88,036
- **raw 日志**：[results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-admission-41](../results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-admission-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' with no service named in the wording - the namespace inventory was the entry: all 10 running pods are 1/1 with 0 restarts, but recommendationservice has NO pod at all (11 apps defined, 10 pods). GetResources(deployments) shows 'recommendationservice 0/1 0 0' (desired 1, UP-TO-DATE 0 = pods never created). The entry caller's log carries the symptom verbatim: frontend emits 'rpc error: code = Unavailable ... dial tcp 10.68.188.125:8080: connect: connection refused' with message 'failed to get product recommendations' (131/941 lines, 13.9%), and CheckSer

### case-42

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.4286 · steps 15 · tokens 92,390
- **raw 日志**：[results/1014_1911_inorder4-v3b155/raw/1014_1911_boutique-admission-42](../results/1014_1911_inorder4-v3b155/raw/1014_1911_boutique-admission-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 10 boutique pods are 1/1 Running with 0 restarts, but redis-cart has no pod at all; its Deployment shows 0/1 updated, 0 available, ReplicaFailure=True/FailedCreate, and Service endpoints are '<none>'. The namespace event surface carries the mechanism verbatim: 'FailedCreate replicaset/redis-cart-6f966d9cc9: pods ... is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pods=10, limited: pods=10'. The closing config read confirms it is live: GetResources(resourcequota, boutique) shows 'pod-count-quota pods: 10/10'. Redis-cart's own App YAML (replicas 1, image redis:alpine,

### case-43

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 91,331
- **raw 日志**：[results/1014_1913_inorder4-v3b156/raw/1014_1913_boutique-admission-43](../results/1014_1913_inorder4-v3b156/raw/1014_1913_boutique-admission-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 10 existing boutique pods are 1/1 Running with 0 restarts, yet the shippingservice Service shows ENDPOINTS <none> and no shippingservice pod exists at all; frontend error logs (50x repeated pattern) show 'failed to get shipping quote ... dial tcp 10.68.141.164:50051: connect: connection refused' — the shippingservice ClusterIP, i.e. no endpoints to forward to. The owner chain shows deployments shippingservice 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE while every other deployment is 1/1. Namespace events name the mechanism verbatim: 'Warning FailedCreate replicaset/shippingservice-7ff54bf6b6 Err

### case-44

- **结论**：`app/adservice` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.25 · steps 21 · tokens 119,723
- **raw 日志**：[results/1014_1917_inorder4-v3b157/raw/1014_1917_boutique-admission-44](../results/1014_1917_inorder4-v3b157/raw/1014_1917_boutique-admission-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: all 11 pods are 1/1 Running with 0 restarts, all deployments (incl. adservice 1/1 AVAILABLE) report ready, the adservice pod logs 'Ad Service started, listening on 9555', its ServiceAccount exists, and the namespace event surface contains only Normal events (no Warning). The only break is on the reachability/addressing surface: the caller frontend's error logs are dominated by 'failed to get ads: rpc error: code = Unavailable ... dial tcp: lookup adservice on 169.254.20.10:53: no such host' (114/903 = 12.6%), i.e. a name-resolution failure (NXDOMAIN) rather than connection 

### case-45

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 112,233
- **raw 日志**：[results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-admission-45](../results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-admission-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, and cartservice's own pod log shows it healthy listening on :7070, ruling out scheduling/probe/image/OOM faults. The caller-side signal is selective: frontend error logs (205/943 errors) are dominated by 'lookup cartservice on 169.254.20.10:53: no such host', while every other backend resolves normally — partial, single-service unreachability. The pruning scan localizes the break to the address layer: the Services listing contains only 11 services with cartservice ABSENT (no endpoint either); GetResources(services, label_selector=app=cartse

### case-46

- **结论**：`app/checkoutservice` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.3 · steps 21 · tokens 118,478
- **raw 日志**：[results/1014_1920_inorder4-v3b159/raw/1014_1920_boutique-admission-46](../results/1014_1920_inorder4-v3b159/raw/1014_1920_boutique-admission-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain break localized at checkoutservice's service-discovery/DNS layer. (1) Symptom side (entry caller frontend error logs, 7x): 'rpc error: code = Unavailable ... dial tcp: lookup checkoutservice on 169.254.20.10:53: no such host' with HTTP 500 on /cart/checkout — the name never resolves, so the call fails before any TCP connect. (2) Workload layer pruned: all pods show 1/1 Running, RESTARTS 0; checkoutservice-8445f8b6cb-k8lss is Running with zero error logs and its namespace events surface contains only Normal events (Pulled/Created/Started) — no image-pull, mount, admission, pr

### case-47

- **结论**：`app/currencyservice` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.3158 · steps 20 · tokens 133,502
- **raw 日志**：[results/1014_1922_inorder4-v3b160/raw/1014_1922_boutique-admission-47](../results/1014_1922_inorder4-v3b160/raw/1014_1922_boutique-admission-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts (currencyservice pod Ready=True, Restart Count 0, grpc probes on 7000 passing) and no alerts, excluding workload/probe/scheduling causes; the namespace events surface contains only Normal events (Created/Started/SuccessfulCreate/ScalingReplicaSet), excluding FailedCreate/FailedScheduling/FailedMount. The break is at the service-addressing layer: the Services listing contains 11 services but NO currencyservice Service, DescribeResource(service, currencyservice) returns 'Error from server (NotFound): services "currencyservice" not found', GetR

### case-48

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.303 · steps 34 · tokens 183,391
- **raw 日志**：[results/1014_1924_inorder4-v3b161/raw/1014_1924_boutique-admission-48](../results/1014_1924_inorder4-v3b161/raw/1014_1924_boutique-admission-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial service unreachability localized to emailservice. Entry caller checkoutservice logs 28% errors: 'dial tcp: lookup emailservice on 169.254.20.10:53: no such host'; connectivity probe to emailservice fails while all other 10 boutique services (frontend:80, productcatalogservice:3550, currencyservice:7000, cartservice:7070, adservice:9555, recommendationservice:8080, checkoutservice:5050, shippingservice:50051, paymentservice:50051, redis-cart:6379) return 'open'. Workload layer is clean: 11/11 Deployments AVAILABLE (emailservice 1/1) and all 11 pods 1/1 Running with 0 restarts, so no pro

### case-49

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1613 · steps 63 · tokens 394,111
- **raw 日志**：[results/1014_1926_inorder4-v3b162/raw/1014_1926_boutique-admission-49](../results/1014_1926_inorder4-v3b162/raw/1014_1926_boutique-admission-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and all 11 deployments are 1/1 available; all nodes Ready with kubelet/kube-proxy/containerd active; no Warning events and no error logs. TCP probes on each Service's declared port succeed for the 10 backend services (adservice:9555, cartservice:7070, checkoutservice:5050, currencyservice:7000, emailservice:5000, paymentservice:50051, productcatalogservice:3550, recommendationservice:8080, shippingservice:50051, redis-cart:6379), but the entry service probe frontend:80 returns 'Connection Failed'. GetAppYAML(frontend) declares Services 'fron

### case-50

- **结论**：`app/paymentservice` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.3125 · steps 17 · tokens 90,428
- **raw 日志**：[results/1014_1929_inorder4-v3b163/raw/1014_1929_boutique-admission-50](../results/1014_1929_inorder4-v3b163/raw/1014_1929_boutique-admission-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods read 1/1 Running with RESTARTS=0, all deployments 1/1 AVAILABLE, no metric alerts, and the namespace events surface contains only Normal rows (no FailedCreate/FailedScheduling/FailedMount/image-pull/probe warnings) — so scheduling, admission, startup, probe and runtime layers are all clean. The break is at the address layer: GetResources(services) lists every boutique Service except paymentservice, and the explicit read returns 'Error from server (NotFound): services "paymentservice" not found' (the endpoints listing likewise has no paymentservice), so the name 'paymentser

### case-51

- **结论**：`app/productcatalogservice` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.3125 · steps 17 · tokens 95,203
- **raw 日志**：[results/1014_1931_inorder4-v3b164/raw/1014_1931_boutique-admission-51](../results/1014_1931_inorder4-v3b164/raw/1014_1931_boutique-admission-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts and no alerts, but productcatalogservice is missing from BOTH the services and endpoints listings while its pod (productcatalogservice-ddb46fc86-qh6pr, app=productcatalogservice) is Running/Ready and its own error logs are empty. Callers fail at name resolution with the canonical name echoed verbatim: frontend logs 'dial tcp: lookup productcatalogservice on 169.254.20.10:53: no such host' (111+47 occurrences) and recommendationservice logs 'DNS resolution failed for productcatalogservice:3550: C-ares status is not ARES_SUCCESS qtype=A name=p

### case-52

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 23 · tokens 158,133
- **raw 日志**：[results/1014_1933_inorder4-v3b165/raw/1014_1933_boutique-admission-52](../results/1014_1933_inorder4-v3b165/raw/1014_1933_boutique-admission-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 workload pods are 1/1 Running with 0 restarts and no Warning events, yet the frontend's own error logs (139/1003 errors; dominant pattern 122 hits, 12.16%) carry 'rpc error: code = Unavailable ... dial tcp: lookup recommendationservice on 169.254.20.10:53: no such host' for 'failed to get product recommendations'. The call-graph walk from the symptom side (frontend -> recommendationservice -> productcatalogservice) localizes the failure to the frontend->recommendationservice edge: CheckServiceConnectivity(recommendationservice:8080) = Connection Failed while productcatalogservice:3550 =

### case-53

- **结论**：`app/redis-cart` + `service_dns_resolution_failure` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✗ 与标签不符）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.2692 · steps 27 · tokens 199,989
- **raw 日志**：[results/1014_1935_inorder4-v3b166/raw/1014_1935_boutique-admission-53](../results/1014_1935_inorder4-v3b166/raw/1014_1935_boutique-admission-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Object layer is fully healthy: all 11 boutique pods are 1/1 Running with 0 restarts, all deployments 1/1 AVAILABLE, namespace events contain only Normal rows (no FailedScheduling/FailedCreate/FailedMount/image-pull/probe Warning), and no alerts fire. The break is isolated to the address layer of redis-cart: the Service object 'redis-cart' does not exist in the namespace (GetResources(services) lists only 10 business Services with no redis-cart row, and both GetResources(services, name=redis-cart) and DescribeResource(service, redis-cart) return 'Error from server (NotFound)'), and its endpoint

### case-54

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 95,401
- **raw 日志**：[results/1014_1938_inorder4-v3b167/raw/1014_1938_boutique-admission-54](../results/1014_1938_inorder4-v3b167/raw/1014_1938_boutique-admission-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique has a ResourceQuota 'service-quota' with services Used 11 / Hard 11 (saturated), and exactly 11 Service objects exist; the 12th Service for shippingservice is absent (GetResources(services, name=shippingservice) -> NotFound, endpoints NotFound, CheckServiceConnectivity(shippingservice:50051) -> Connection Failed), so the DNS name shippingservice has no record. The caller-side symptom is decisive: frontend error logs show 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp: lookup shippingservice on 169.254.20.10:53: no such host' (68x GET /cart) and 'fa

### case-55

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4762 · steps 22 · tokens 186,147
- **raw 日志**：[results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-admission-55](../results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-admission-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间内 redis-cart 唯一 Pod (redis-cart-5858bb886-w6b9q) 卡在 0/1 Pending、无节点；其事件逐字为 'FailedScheduling 0/4 nodes are available: persistentvolumeclaim "redis-cart-pvc" not found'。被引用对象清单核验：命名空间内不存在任何 PVC（persistentvolumeclaims 与 pvc 两种读法均 'No resources found'），而 PV redis-cart-pv (10Gi/RWO/Retain) 状态 Available、Claim 为空、无 storageClassName —— 供给空闲未被占用，故被引用对象仍缺失，属活跃机制而非建置历史。配置面 (GetAppYAML redis-cart) 显示 claimName、accessModes RWO、storageClassName '' 与 PV 完全匹配，唯一偏差是该 PVC 未生成；断点在命名空间准入/配额面：ResourceQuota storage-quota 的 requests.storage 硬上限为 1Gi（Used 0/1Gi），低于 PVC 请求的 10Gi，claim 被配额拒绝导致 PVC 从未创建。可达

### case-56

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 147,903
- **raw 日志**：[results/1014_1942_inorder4-v3b169/raw/1014_1942_boutique-admission-56](../results/1014_1942_inorder4-v3b169/raw/1014_1942_boutique-admission-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart pod is the sole outlier: Pending/unscheduled (0/1, Node <none>), with mechanism event 'FailedScheduling ... 0/4 nodes are available: persistentvolumeclaim "redis-cart-pvc" not found'. The claim object is genuinely absent (PVC listing empty; DescribeResource(pvc/redis-cart-pvc) -> Error from server (NotFound)), while PV redis-cart-pv exists and is Available (2Gi, RWO) and the redis-cart Deployment/mount references claimName redis-cart-pvc with /data. The namespace carries ResourceQuota 'storage-quota' hard-limiting requests.storage to 1Gi (Used 0/1Gi), so the 2Gi storage request decl

### case-57

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 17 · tokens 131,520
- **raw 日志**：[results/1014_1944_inorder4-v3b170/raw/1014_1944_boutique-admission-57](../results/1014_1944_inorder4-v3b170/raw/1014_1944_boutique-admission-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (wide) shows the single outlier redis-cart-5858bb886-dvpvz 0/1 Pending with no node assigned (all other 10 boutique pods 1/1 Running). DescribeResource(pod) gives the mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: persistentvolumeclaim "redis-cart-pvc" not found', i.e. the scheduling break is a missing volume claim, not a node-side capacity/taint issue (4 nodes schedulable). The referenced object is genuinely absent: GetResources(persistentvolumeclaims, boutique) = 'No resources found' and a by-name fetch returns NotFound, while PV redis-cart-pv is Avai

### case-58

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3704 · steps 28 · tokens 179,799
- **raw 日志**：[results/1014_1946_inorder4-v3b171/raw/1014_1946_boutique-admission-58](../results/1014_1946_inorder4-v3b171/raw/1014_1946_boutique-admission-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique holds a ResourceQuota 'storage-quota' with requests.storage hard=10Gi, used=9Gi (consumed by the pre-existing 10Gi claim pre-existing-pvc -> pre-existing-pv), leaving only 1Gi headroom. The redis-cart Deployment's volume redis-data references PVC 'redis-cart-pvc' requesting 2Gi, so 9Gi+2Gi > 10Gi and the claim is never admitted: the PVC listing shows only pre-existing-pvc and DescribeResource(pvc/redis-cart-pvc) returns NotFound (the matching PV redis-cart-pv, 2Gi RWO, is Available and unbound, so storageClass/accessMode/capacity/binding are all consistent - only the claim o

