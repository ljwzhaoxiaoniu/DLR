# 评测明细 · boutique/admission — cloudopsbench

> 本家族已跑 **58/58** 题：JRA ✅58 ❌0 ｜ 证据链全闭 58 ｜ token 中位 143,499 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 143,499 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 130,402 | 0 | 0 | 1020_2320_tsm-v1-b35 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 17 | 131,175 | 0 | 0 | 1021_0121_tsm-v1-b68 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5385 | 14 | 151,648 | 0 | 0 | 1021_0219_tsm-v1-b97 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5333 | 16 | 175,841 | 0 | 0 | 1021_0308_tsm-v1-b122 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 137,125 | 0 | 0 | 1021_0341_tsm-v1-b138 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.6 | 16 | 150,573 | 0 | 0 | 1021_0343_tsm-v1-b139 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 129,932 | 0 | 0 | 1021_0347_tsm-v1-b141 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 133,224 | 0 | 0 | 1021_0349_tsm-v1-b142 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5385 | 14 | 139,403 | 0 | 0 | 1020_2006_tsm-v1-b5 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 126,752 | 0 | 0 | 1020_2011_tsm-v1-b8 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 140,252 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 147,076 | 0 | 0 | 1020_2022_tsm-v1-b14 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 130,012 | 0 | 0 | 1020_2241_tsm-v1-b17 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 109,573 | 0 | 0 | 1020_2247_tsm-v1-b20 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 125,175 | 0 | 0 | 1020_2256_tsm-v1-b23 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 152,301 | 0 | 0 | 1020_2302_tsm-v1-b26 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 128,353 | 0 | 0 | 1020_2309_tsm-v1-b29 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4545 | 12 | 110,409 | 0 | 0 | 1020_2315_tsm-v1-b32 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 153,328 | 0 | 0 | 1020_2327_tsm-v1-b38 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 131,672 | 0 | 0 | 1020_2333_tsm-v1-b41 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 146,692 | 0 | 0 | 1020_2338_tsm-v1-b44 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 156,352 | 0 | 0 | 1020_2345_tsm-v1-b47 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 132,171 | 0 | 0 | 1020_2350_tsm-v1-b50 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 132,461 | 0 | 0 | 1020_2357_tsm-v1-b53 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 158,728 | 0 | 0 | 1021_0054_tsm-v1-b56 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 164,867 | 0 | 0 | 1021_0101_tsm-v1-b59 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 153,772 | 0 | 0 | 1021_0107_tsm-v1-b62 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 150,068 | 0 | 0 | 1021_0115_tsm-v1-b65 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 133,267 | 0 | 0 | 1021_0127_tsm-v1-b71 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 152,873 | 0 | 0 | 1021_0134_tsm-v1-b74 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 133,183 | 0 | 0 | 1021_0138_tsm-v1-b76 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 127,704 | 0 | 0 | 1021_0144_tsm-v1-b79 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 152,657 | 0 | 0 | 1021_0150_tsm-v1-b82 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 108,173 | 0 | 0 | 1021_0156_tsm-v1-b85 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 130,211 | 0 | 0 | 1021_0200_tsm-v1-b87 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 343,369 | 0 | 0 | 1021_0205_tsm-v1-b90 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 106,407 | 0 | 0 | 1021_0209_tsm-v1-b92 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 184,079 | 0 | 0 | 1021_0215_tsm-v1-b95 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 15 | 152,902 | 0 | 0 | 1021_0225_tsm-v1-b100 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 107,624 | 0 | 0 | 1021_0229_tsm-v1-b102 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 165,210 | 0 | 0 | 1021_0236_tsm-v1-b105 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 110,497 | 0 | 0 | 1021_0239_tsm-v1-b107 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 130,639 | 0 | 0 | 1021_0246_tsm-v1-b110 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 132,733 | 0 | 0 | 1021_0250_tsm-v1-b112 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 111,673 | 0 | 0 | 1021_0253_tsm-v1-b114 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 153,441 | 0 | 0 | 1021_0257_tsm-v1-b116 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 154,460 | 0 | 0 | 1021_0301_tsm-v1-b118 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.24 | 26 | 158,531 | 0 | 0 | 1021_0304_tsm-v1-b120 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 148,220 | 0 | 0 | 1021_0313_tsm-v1-b124 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4615 | 14 | 154,360 | 0 | 0 | 1021_0316_tsm-v1-b126 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 129,490 | 0 | 0 | 1021_0321_tsm-v1-b128 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 163,735 | 0 | 0 | 1021_0322_tsm-v1-b129 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 131,299 | 0 | 0 | 1021_0326_tsm-v1-b131 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 207,593 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 186,735 | 0 | 0 | 1021_0333_tsm-v1-b134 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 249,045 | 0 | 1 | 1021_0335_tsm-v1-b135 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 207,567 | 0 | 0 | 1021_0339_tsm-v1-b137 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `missing_service_account` ｜ 标签 `app/adservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 143,499
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-admission-1](../results/1021_0900_tsm-v1-fix/raw/1020_2040_boutique-admission-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (126/969): 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.76.205:9555: connect: connection refused'. GetResources(services, adservice) shows the adservice Service exists (ClusterIP 10.68.76.205, 9555/TCP) so this is not DNS; GetResources(endpoints, adservice) returns ENDPOINTS <none>. The pods listing has no pod for app=adservice while all 10 other services are 1/1 Running; deployment adservice is 0/1 with UP-TO-DATE 0 and AVAILABLE 0, meaning pods were never created (not scheduling/startup). Namespace events bind the mechanism verbatim: 'Warning Faile

### case-2

- **结论**：`app/cartservice` + `missing_service_account` ｜ 标签 `app/cartservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 130,402
- **raw 日志**：[results/1020_2320_tsm-v1-b35/raw/1020_2320_boutique-admission-2](../results/1020_2320_tsm-v1-b35/raw/1020_2320_boutique-admission-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: frontend GetErrorLogs shows 163/913 errors of pattern 'could not retrieve cart: rpc error: code = Unavailable ... transport: Error while dialing: dial tcp 10.68.11.33:7070: connect: connection refused' (plus add-to-cart and checkout cart failure), i.e. only cart-dependent paths fail -> partial unreachability. Object layer: pods listing in namespace boutique contains NO cartservice pod while all 10 peer services are 1/1 Running with 0 restarts; deployments shows 'cartservice 0/1, UP-TO-DATE 0, AVAILABLE 0' and 'No matching pods found for selector app=cartservice' -> pods were ne

### case-3

- **结论**：`app/checkoutservice` + `missing_service_account` ｜ 标签 `app/checkoutservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 17 · tokens 131,175
- **raw 日志**：[results/1021_0121_tsm-v1-b68/raw/1021_0121_boutique-admission-3](../results/1021_0121_tsm-v1-b68/raw/1021_0121_boutique-admission-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error log: 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.11.40:5050: connect: connection refused' (11 hits). checkoutservice Service is ClusterIP 10.68.11.40 5050/TCP (address matches) but endpoints are '<none>' and CheckServiceConnectivity(checkoutservice:5050) returns Connection Failed. Pods listing shows all 10 other workloads 1/1 Running with RESTARTS 0, yet no pod exists for app=checkoutservice; deployment checkoutservice is 0/1 with UP-TO-DATE 0 and AVAILABLE 0, so no pod was ever created. Namespace event names the mechanism verbatim: 'Warning F

### case-4

- **结论**：`app/currencyservice` + `missing_service_account` ｜ 标签 `app/currencyservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5385 · steps 14 · tokens 151,648
- **raw 日志**：[results/1021_0219_tsm-v1-b97/raw/1021_0220_boutique-admission-4](../results/1021_0219_tsm-v1-b97/raw/1021_0220_boutique-admission-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log shows 202/218 errors as 'could not retrieve currencies: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.161.153:7000: connect: connection refused', plus 11 'failed to convert shipping cost to currency' failures on /cart/checkout; 10.68.161.153:7000 is currencyservice's own Service ClusterIP and declared port 7000/TCP. currencyservice workload state is empty: GetResources(pods, label_selector=app=currencyservice) returns no matching pods, deployment currencyservice is 0/1 with UP-TO-DATE 0 and AVAILABLE 0, and endpoints cu

### case-5

- **结论**：`app/emailservice` + `missing_service_account` ｜ 标签 `app/emailservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5333 · steps 16 · tokens 175,841
- **raw 日志**：[results/1021_0308_tsm-v1-b122/raw/1021_0309_boutique-admission-5](../results/1021_0308_tsm-v1-b122/raw/1021_0309_boutique-admission-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory in boutique lists 10 pods but no emailservice pod despite the emailservice Service existing (ClusterIP 10.68.1.25, port 5000 -> targetPort 8080). Signal side: checkoutservice error logs show 10/34 errors, all 'failed to send order confirmation ... transport: Error while dialing: dial tcp 10.68.1.25:5000: connect: connection refused'; an active TCP probe of emailservice:5000 returns 'Connection Failed'. Workload state: deployment emailservice is 0/1 READY, UP-TO-DATE 0, AVAILABLE 0, and GetResources(pods, label_selector=app=emailservice) returns 'No matching pods found'; endpoint

### case-6

- **结论**：`app/frontend` + `missing_service_account` ｜ 标签 `app/frontend` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 137,125
- **raw 日志**：[results/1021_0341_tsm-v1-b138/raw/1021_0342_boutique-admission-6](../results/1021_0341_tsm-v1-b138/raw/1021_0342_boutique-admission-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend has no logs at all and GetResources(pods) shows 10 pods all 1/1 Running with 0 restarts but NO frontend pod. GetResources(deployments) shows frontend 0/1 (0 updated, 0 available) while every other deployment is 1/1; DescribeResource(deployment/frontend) reports ReplicaFailure True reason FailedCreate and NewReplicaSet frontend-fbbd6d5f5 (0/1 replicas created). Namespace events give the mechanism verbatim: Warning FailedCreate replicaset/frontend-fbbd6d5f5 - "Error creating: pods \"frontend-fbbd6d5f5-\" is forbidden: error looking up service account boutique/frontend-missi

### case-7

- **结论**：`app/paymentservice` + `missing_service_account` ｜ 标签 `app/paymentservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.6 · steps 16 · tokens 150,573
- **raw 日志**：[results/1021_0343_tsm-v1-b139/raw/1021_0344_boutique-admission-7](../results/1021_0343_tsm-v1-b139/raw/1021_0344_boutique-admission-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log: 'failed to charge card: rpc error: code = Unavailable desc = transport: Error while dialing: dial tcp 10.68.31.183:50051: connect: connection refused' - that IP:port is Service paymentservice's own ClusterIP/50 051 (read from the Service object). Service paymentservice ENDPOINTS = <none>; pods with label app=paymentservice: 'No matching pods found'; deployment paymentservice is READY 0/1, UP-TO-DATE 0, with condition ReplicaFailure=True Reason=FailedCreate and NewReplicaSet paymentservice-f8f957d54 (0/1 replicas created). Namespace event: Warning FailedCreate replicaset/pay

### case-8

- **结论**：`app/productcatalogservice` + `missing_service_account` ｜ 标签 `app/productcatalogservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 129,932
- **raw 日志**：[results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-admission-8](../results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-admission-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (91+46 hits) show 'rpc error: code = Unavailable ... dial tcp 10.68.103.92:3550: connect: connection refused'; 10.68.103.92 is the productcatalogservice ClusterIP with Service-declared port 3550, CheckServiceConnectivity(productcatalogservice:3550) = Connection Failed, and endpoints/productcatalogservice = <none>. Pod listing: all 10 other services are 1/1 Running with 0 restarts, but productcatalogservice has NO pod instance; deployments app=productcatalogservice shows READY 0/1, UP-TO-DATE 0, AVAILABLE 0. The namespace event surface carries the mechanism verbatim: 'Warnin

### case-9

- **结论**：`app/recommendationservice` + `missing_service_account` ｜ 标签 `app/recommendationservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 133,224
- **raw 日志**：[results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-admission-9](../results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-admission-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend (entry service) error logs show 118/130 errors of 'rpc error: code = Unavailable ... dial tcp 10.68.170.142:8080: connect: connection refused' with message 'failed to get product recommendations'. Workload scan: pods listing has 10 pods all 1/1 Running with RESTARTS 0, but recommendationservice has NO pod at all; GetResources(pods, label_selector=app=recommendationservice) returns 'No matching pods found'; deployments show 'recommendationservice 0/1, UP-TO-DATE 0, AVAILABLE 0'; services show ClusterIP 10.68.170.142 port 8080/TCP (exactly the dial target); endpoints show '

### case-10

- **结论**：`app/redis-cart` + `missing_service_account` ｜ 标签 `app/redis-cart` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5385 · steps 14 · tokens 139,403
- **raw 日志**：[results/1020_2006_tsm-v1-b5/raw/1020_2006_boutique-admission-10](../results/1020_2006_tsm-v1-b5/raw/1020_2006_boutique-admission-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (84/402, 20.9%) show cart path failures: 'could not retrieve cart ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379'. Pods inventory shows all 10 other boutique pods 1/1 Running while redis-cart has NO pod at all (GetResources pods app=redis-cart -> 'No matching pods found'); deployment redis-cart is 0/1 with UP-TO-DATE 0. The Service object redis-cart exists (10.68.210.215, 6379/TCP) but its endpoints are '<none>', so the addressing layer is intact and the backend was never created. Namespace events give the mechanis

### case-11

- **结论**：`app/shippingservice` + `missing_service_account` ｜ 标签 `app/shippingservice` + `missing_service_account`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 126,752
- **raw 日志**：[results/1020_2011_tsm-v1-b8/raw/1020_2011_boutique-admission-11](../results/1020_2011_tsm-v1-b8/raw/1020_2011_boutique-admission-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows 10/11 services running healthy (1/1, RESTARTS=0) with shippingservice entirely absent; deployments listing shows shippingservice 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE (no pod ever created). Complaint side (frontend error logs, 52+9 errors) fails on 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.246.211:50051: connect: connection refused'; 10.68.246.211:50051 is exactly shippingservice's ClusterIP and spec-declared Service port (services listing), so addressing is correct and the refusal is due to no endpoints. GetResources(pods, label_select

### case-12

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 140,252
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2041_boutique-admission-12](../results/1021_0900_tsm-v1-fix/raw/1020_2041_boutique-admission-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs: 126/128 errors are 'failed to get ads: rpc error: code = Unavailable desc = transport: Error while dialing: dial tcp 10.68.139.87:9555: connect: connection refused'. Pods listing (boutique) shows no adservice pod at all while the other 10 services are 1/1 Running with 0 restarts; deployments shows 'adservice 0/1 0 0' (UP-TO-DATE=0, so no ReplicaSet pod was ever created). Service adservice is present with ClusterIP 10.68.139.87 and 9555/TCP exactly matching the dialed address, but endpoints/adservice = <none>, and CheckServiceConnectivity(adservice,9555) = Connection Failed

### case-13

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 147,076
- **raw 日志**：[results/1020_2022_tsm-v1-b14/raw/1020_2022_boutique-admission-13](../results/1020_2022_tsm-v1-b14/raw/1020_2022_boutique-admission-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (152x 'could not retrieve cart' + 23x 'failed to add to cart' + 10x checkout) show 'dial tcp 10.68.54.225:7070: connect: connection refused', which is exactly the cartservice ClusterIP:port read from the Service spec; CheckServiceConnectivity(cartservice,7070) = Connection Failed; endpoints/cartservice = <none>; pods -l app=cartservice returns no pods; deployments shows cartservice 0/1 (UP-TO-DATE 0, AVAILABLE 0) while all other 10 services are 1/1 Running with 0 restarts and no alerts. Namespace events repeatedly show 'Warning FailedCreate replicaset/cartservice-8cbf5b9d4:

### case-14

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 130,012
- **raw 日志**：[results/1020_2241_tsm-v1-b17/raw/1020_2241_boutique-admission-14](../results/1020_2241_tsm-v1-b17/raw/1020_2241_boutique-admission-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logged 17x 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.168.63:5050: connect: connection refused' on POST /cart/checkout (5050 = checkoutservice). Anchored reads: GetResources(pods, label_selector=app=checkoutservice) -> 'No matching pods found' while all other 10 boutique services are Running; deployments(app=checkoutservice) -> READY 0/1, UP-TO-DATE 0, AVAILABLE 0; endpoints/checkoutservice -> '<none>'; CheckServiceConnectivity(checkoutservice, port 5050 as declared by the Service) -> 'Connection Failed'; services/checkoutservice exist

### case-15

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 109,573
- **raw 日志**：[results/1020_2247_tsm-v1-b20/raw/1020_2247_boutique-admission-15](../results/1020_2247_tsm-v1-b20/raw/1020_2247_boutique-admission-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.22.190:7000: connect: connection refused' (191 of 207 errors) plus checkout failures 'failed to convert shipping cost to currency', naming currencyservice as the victim. currencyservice Service exists (ClusterIP 10.68.22.190, port 7000/TCP) but its endpoints are '<none>' and no pod with label app=currencyservice exists; the Deployment reads 0/2 ready, 0 up-to-date. Namespace events bind the mechanism to replicaset/currencyservice-8587d7cfd7: 'Warning FailedCreate ... Error creating: pods "

### case-16

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 125,175
- **raw 日志**：[results/1020_2256_tsm-v1-b23/raw/1020_2256_boutique-admission-16](../results/1020_2256_tsm-v1-b23/raw/1020_2256_boutique-admission-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' in namespace boutique. Pods listing: 10 pods all 1/1 Running with 0 RESTARTS; emailservice has NO pod at all (the only outlier). Signal side of the victim read first: GetResources(endpoints, name=emailservice) => 'ENDPOINTS: <none>', while the Service object exists and is intact (ClusterIP 10.68.216.116, PORT 5000/TCP, SELECTOR app=emailservice), so the unreachability is an unbound-endpoint problem, not DNS/addressing. Workload state: GetResources(pods, label_selector=app=emailservice) => 'No matching pods found'; deployments listing shows 'emailservice

### case-17

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 152,301
- **raw 日志**：[results/1020_2302_tsm-v1-b26/raw/1020_2302_boutique-admission-17](../results/1020_2302_tsm-v1-b26/raw/1020_2302_boutique-admission-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-point outage: Service frontend and frontend-external both show ENDPOINTS = <none> while all ten downstream boutique services have ready endpoints (currencyservice 172.20.2.78:7000, adservice 172.20.2.77:9555, ...), matching 'Partial Service Unreachability'. No frontend pod exists at all (GetResources pods label_selector=app=frontend returned 'No matching pods found'), and the deployments listing shows the only outlier row: frontend 0/1 with 0 UP-TO-DATE and 0 AVAILABLE versus 1/1 1 1 for every peer. Namespace events name the mechanism: repeated 'Warning FailedCreate replicaset/frontend-6

### case-18

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 128,353
- **raw 日志**：[results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-admission-18](../results/1020_2309_tsm-v1-b29/raw/1020_2309_boutique-admission-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show checkout failing with 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.128.36:50051: connect: connection refused', where 10.68.128.36 is the paymentservice ClusterIP on its declared port 50051. Pod listing has 10 pods all 1/1 Running with 0 restarts but NO paymentservice pod at all (GetResources(pods, label_selector=app=paymentservice) -> No matching pods found); deployments listing shows paymentservice 0/1 with 0 up-to-date and 0 available while all peers are 1/1. endpoints/paymentservice is <none>, confirming it as the victim of the failing ca

### case-19

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4545 · steps 12 · tokens 110,409
- **raw 日志**：[results/1020_2315_tsm-v1-b32/raw/1020_2315_boutique-admission-19](../results/1020_2315_tsm-v1-b32/raw/1020_2315_boutique-admission-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: frontend reports 178/873 errors (20.4%) all dialing 10.68.239.222:3550 -> 'connect: connection refused'; port 3550 is productcatalogservice's declared Service/gRPC port, and endpoints/productcatalogservice is <none>. The pods inventory lists all 10 boutique services running EXCEPT productcatalogservice; deployment productcatalogservice shows 0/1 READY, 0 UP-TO-DATE, 0 AVAILABLE. Mechanism bound by repeated events: 'Warning FailedCreate replicaset/productcatalogservice-d78f7f8f7 Error creating: pods productcatalogservice-d78f7f8f7-zdrm2 is forbidden: exceeded quota: cpu-quot

### case-20

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 153,328
- **raw 日志**：[results/1020_2327_tsm-v1-b38/raw/1020_2327_boutique-admission-20](../results/1020_2327_tsm-v1-b38/raw/1020_2327_boutique-admission-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Exact L3 match; followed complaint-side-first order. frontend error logs: 100/485 errors (20.6%), dominant pattern 'could not retrieve cart ... RedisConnectionException: UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379'; cartservice error logs 294/792 (37.1%) with the same 'UnableToConnect on redis-cart:6379' (port 6379 read from the Service spec, not guessed). Workload pruned to app=redis-cart: no pods found at all, while the namespace lists the other 10 boutique services Running/1-1; deployments listing shows 'redis-cart 0/1 0 0' (UP-TO-DATE 0 => no pod ever created); S

### case-21

- **结论**：`namespace/boutique` + `namespace_cpu_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_cpu_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 131,672
- **raw 日志**：[results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-admission-21](../results/1020_2333_tsm-v1-b41/raw/1020_2333_boutique-admission-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) error log: 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.237.216:50051: connect: connection refused' (57x on /cart, 12x on /cart/checkout via checkoutservice). services/shippingservice exists with CLUSTER-IP 10.68.237.216 and 50051/TCP (the exact dialed address, matching port 50051 -> targetPort 50051 -> containerPort 50051), but endpoints/shippingservice = <none>. No pod matches app=shippingservice, and deployments/shippingservice shows READY 0/1, UP-TO-DATE 0, AVAILABLE 0 — the pod was never created, while all other 10 boutique pods a

### case-22

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 146,692
- **raw 日志**：[results/1020_2338_tsm-v1-b44/raw/1020_2338_boutique-admission-22](../results/1020_2338_tsm-v1-b44/raw/1020_2338_boutique-admission-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pod listing shows 10 of 11 services running but adservice has NO pod at all; its Service object exists and is healthy (ClusterIP 10.68.248.19, port 9555, selector app=adservice) yet endpoints/adservice is '<none>'. Upstream caller frontend error logs (105/107 errors) show 'failed to get ads: rpc error: code = Unavailable desc = connection error: ... dial tcp 10.68.248.19:9555: connect: connection refused'. Workload surface: deployment adservice READY 0/1, UP-TO-DATE 0, AVAILABLE 0 — failure is at admission/creation, not scheduling/image/probe. Namespace events record repeated Warning 

### case-23

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 156,352
- **raw 日志**：[results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-admission-23](../results/1020_2345_tsm-v1-b47/raw/1020_2345_boutique-admission-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 错误日志主模式（163/198）：'could not retrieve cart: rpc error: code = Unavailable ... dial tcp 10.68.118.132:7070: connect: connection refused'，投诉点名 cartservice。对象层：全 namespace 仅 cartservice 离群，deployments 显示 cartservice 0/1 UP-TO-DATE 0 AVAILABLE 0，且无任何 app=cartservice 的 pod（对等 10 个服务均 1/1 Running）；GetResources(endpoints, name=cartservice) 返回 ENDPOINTS <none>，CheckServiceConnectivity(cartservice:7070) = Connection Failed（Service 对象存在，故非 DNS 失败）。机制事件逐字绑定对象：Warning FailedCreate replicaset/cartservice-9b469fbc4 "Error creating: pods ... is forbidden: exceeded quota: boutique-quota, requested: re

### case-24

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 132,171
- **raw 日志**：[results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-admission-24](../results/1020_2350_tsm-v1-b50/raw/1020_2351_boutique-admission-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间 10 个服务 pod 均 Running/Ready，唯独 checkoutservice 无任何 pod；Deployment checkoutservice 为 0/1 (UP-TO-DATE 0, AVAILABLE 0)，条件 ReplicaFailure=True FailedCreate，NewReplicaSet checkoutservice-6bcfb6486c 0/1 replicas created；endpoints/checkoutservice 为 <none>，CheckServiceConnectivity(checkoutservice, 5050) 返回 Connection Failed，调用方 frontend 错误日志 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.232.185:5050: connect: connection refused'（10.68.232.185 即 Service 自身声明的 ClusterIP，端口 5050 为其声明端口）。namespace 事件面逐字给出机制：Warning FailedCreate replicaset/checkoutservice-6bcf

### case-25

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 132,461
- **raw 日志**：[results/1020_2357_tsm-v1-b53/raw/1020_2357_boutique-admission-25](../results/1020_2357_tsm-v1-b53/raw/1020_2357_boutique-admission-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (193/961, 20.1%) shows 183x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.182.150:7000: connect: connection refused' — 10.68.182.150:7000 is currencyservice's own Service ClusterIP/port. Pod inventory shows all 10 other boutique services Running 1/1 but NO currencyservice pod at all; deployment app=currencyservice is 0/1 READY / 0 AVAILABLE / 1 unavailable, pods app=currencyservice returns no matching pods, Service currencyservice exists (ClusterIP 10.68.182.150, 7000/TCP, selector app=currencyservice matches the template label) but endpoin

### case-26

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 158,728
- **raw 日志**：[results/1021_0054_tsm-v1-b56/raw/1021_0054_boutique-admission-26](../results/1021_0054_tsm-v1-b56/raw/1021_0054_boutique-admission-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中 emailservice 无任何 Pod 实例，但其 Deployment 存在且 AVAILABLE 0/1、UP-TO-DATE 0；Service 存在（ClusterIP 10.68.161.240，端口 5000/TCP，与失败调用地址一致）但 Endpoints 为 <none>。受害侧信号来自调用方 checkoutservice：GetErrorLogs 显示 12/40 错误，均为 'failed to send order confirmation ... rpc error: code = Unavailable ... dial tcp 10.68.161.240:5000: connect: connection refused'。命名空间 events 面给出机制事件：'Warning FailedCreate replicaset/emailservice-6d4d7cd4dc Error creating: pods emailservice-6d4d7cd4dc-* is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=500Mi, used: requests.memory=3000Mi, limited: request

### case-27

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 164,867
- **raw 日志**：[results/1021_0101_tsm-v1-b59/raw/1021_0101_boutique-admission-27](../results/1021_0101_tsm-v1-b59/raw/1021_0101_boutique-admission-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique 的 ResourceQuota memory-request-quota 已接近打满：used requests.memory=3000Mi vs hard=3Gi(3072Mi)，仅余 72Mi。frontend Deployment 期望 1 副本但 updated/available 均为 0，说明 Pod 从未创建成功；namespace events 反复记录 'Warning FailedCreate replicaset/frontend-78fdd6f7d6 Error creating: pods "frontend-78fdd6f7d6-..." is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=300Mi, used: requests.memory=3000Mi, limited: requests.memory=3Gi'。Deployment 详情 Conditions 为 ReplicaFailure True / FailedCreate，NewReplicaSet frontend-78fdd6f7d6 (0/1 replicas created)；frontend pod 模板声明 requests.me

### case-28

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 153,772
- **raw 日志**：[results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-admission-28](../results/1021_0107_tsm-v1-b62/raw/1021_0107_boutique-admission-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log: 12x 'failed to complete the order ... failed to charge card ... dial tcp 10.68.64.227:50051: connect: connection refused' — 10.68.64.227:50051 is exactly paymentservice's declared ClusterIP:port. Pods listing shows all other services 1/1 Running but no paymentservice pod at all; GetResources(pods, label_selector=app=paymentservice) returns no match; deployment paymentservice is 0/1 with UP-TO-DATE 0 and AVAILABLE 0; endpoints/paymentservice is <none>. Namespace events repeat: Warning FailedCreate replicaset/paymentservice-9f5d9db95 'Error creating: pods ... is forbidden: ex

### case-29

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 150,068
- **raw 日志**：[results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-admission-29](../results/1021_0115_tsm-v1-b65/raw/1021_0115_boutique-admission-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice has zero pods: GetResources(pods, boutique) shows all 10 other services Running 1/1 with 0 RESTARTS but no productcatalogservice pod; deployments listing shows productcatalogservice 0/1 with UP-TO-DATE 0, i.e. pods were never created. Entry caller frontend error logs (181 errors, top pattern 99x) show 'could not retrieve products: rpc error: code = Unavailable desc = ... dial tcp 10.68.163.223:3550: connect: connection refused', and endpoints/productcatalogservice is '<none>'. Events bind the mechanism verbatim to replicaset/productcatalogservice-5f876f76c9: 'Warning Fail

### case-30

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 133,267
- **raw 日志**：[results/1021_0127_tsm-v1-b71/raw/1021_0127_boutique-admission-30](../results/1021_0127_tsm-v1-b71/raw/1021_0127_boutique-admission-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 错误日志（103 次）报 failed to get product recommendations: rpc error code=Unavailable, dial tcp 10.68.104.223:8080 connect: connection refused，10.68.104.223 即 recommendationservice 的 ClusterIP（Service spec port 8080）。工作负载侧 recommendationservice Deployment 为 READY 0/1、UP-TO-DATE 0，GetResources(pods, app=recommendationservice) 无匹配 pod（全 namespace 唯一缺席者），endpoints recommendationservice 为 <none>，故调用方被拒。namespace events 给出机制：Warning FailedCreate replicaset/recommendationservice-5d769775f7 - Error creating: pods is forbidden: exceeded quota: memory-request-quota, requested: requests.memory=1Gi, us

### case-31

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 152,873
- **raw 日志**：[results/1021_0134_tsm-v1-b74/raw/1021_0134_boutique-admission-31](../results/1021_0134_tsm-v1-b74/raw/1021_0134_boutique-admission-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (87/408, 21.3%) show cart-path failures only: 'Can't access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6379' for /product/*, /cart, /cart/checkout. Pod inventory and GetResources(pods, label_selector=app=redis-cart) return no redis-cart pod at all, while all other 10 services are 1/1 Running with 0 restarts. Deployment listing shows redis-cart 0/1, UP-TO-DATE 0 (desired 1) => pods never created. Namespace events give the mechanism verbatim: 'Warning FailedCreate replicaset/redis-cart-5858bb886 Error creating: pods "redis-cart-5858bb886-xxx" is 

### case-32

- **结论**：`namespace/boutique` + `namespace_memory_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_memory_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 133,183
- **raw 日志**：[results/1021_0138_tsm-v1-b76/raw/1021_0139_boutique-admission-32](../results/1021_0138_tsm-v1-b76/raw/1021_0139_boutique-admission-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (entry caller): 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.123.226:50051: connect: connection refused' (52x, /cart) and 'failed to complete the order: ... shipping quote failure' (11x, /cart/checkout). Service shippingservice exists (ClusterIP 10.68.123.226, declared port 50051/TCP, selector app=shippingservice matches template) but endpoints = <none>. Pods inventory: all 10 other services 1/1 Running with 0 restarts, while GetResources(pods, label_selector=app=shippingservice) returns no matching pods; deployment shippingservice is 0/1 R

### case-33

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 127,704
- **raw 日志**：[results/1021_0144_tsm-v1-b79/raw/1021_0145_boutique-admission-33](../results/1021_0144_tsm-v1-b79/raw/1021_0145_boutique-admission-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom: partial service unreachability. Complaint side (frontend error logs, 115/117 errors in one pattern): 'failed to get ads: rpc error: code = Unavailable desc = transport: Error while dialing: dial tcp 10.68.203.112:9555: connect: connection refused'. The pods inventory shows all 10 boutique pods 1/1 Running with 0 restarts, but no adservice pod exists at all; the adservice Service exists with the declared port 9555/TCP matching the caller's dial, yet endpoints are '<none>' and a direct connectivity probe to adservice:9555 returns 'Connection Failed'. Deployment adservice is 0/1 (0 updat

### case-34

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 152,657
- **raw 日志**：[results/1021_0150_tsm-v1-b82/raw/1021_0150_boutique-admission-34](../results/1021_0150_tsm-v1-b82/raw/1021_0150_boutique-admission-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs show 160+ failures 'could not retrieve cart: rpc error: code = Unavailable ... dial tcp 10.68.65.162:7070: connect: connection refused', plus add-to-cart and checkout cart failures - only cart traffic breaks, hence partial unreachability. Reachability: Service cartservice exists with ClusterIP 10.68.65.162 port 7070/targetPort 7070 (exactly the dialed target, so selector and port mapping are correct) but endpoints/cartservice is '<none>'. Owner chain: no pods match app=cartservice; deployment/cartservice is 0/1 with UP-TO-DATE 0 and AVAILABLE 0 while all other

### case-35

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 108,173
- **raw 日志**：[results/1021_0156_tsm-v1-b85/raw/1021_0156_boutique-admission-35](../results/1021_0156_tsm-v1-b85/raw/1021_0156_boutique-admission-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory: all 10 boutique pods Running 1/1 with 0 restarts, but checkoutservice has no pod. Complaint side (frontend entry caller, GetErrorLogs): 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.173.107:5050: connect: connection refused' on POST /cart/checkout; 5050 is the port checkoutservice's own Service spec declares and 10.68.173.107 is its ClusterIP. Object layer (anchored app=checkoutservice): deployment checkoutservice 0/1 (0 up-to-date, 0 available); GetResources(pods, label_selector=app=checkoutservice) returns no matching pods; endpoints/checkoutservi

### case-36

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 130,211
- **raw 日志**：[results/1021_0200_tsm-v1-b87/raw/1021_0201_boutique-admission-36](../results/1021_0200_tsm-v1-b87/raw/1021_0201_boutique-admission-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs: 190/200 errors are 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.179.223:7000: connect: connection refused' (plus 5 checkout errors on the same edge). Service currencyservice (ClusterIP 10.68.179.223, port 7000) exists and declares port 7000, matching the probe, but its endpoints are '<none>'. Pods listing shows all 10 other boutique services Running while currencyservice has no pod at all (GetResources pods label_selector=app=currencyservice -> No matching pods found); deployments shows currencyservice 0/1, UP-TO-DATE 0, AVAILABLE 0. Nam

### case-37

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 343,369
- **raw 日志**：[results/1021_0205_tsm-v1-b90/raw/1021_0205_boutique-admission-37](../results/1021_0205_tsm-v1-b90/raw/1021_0205_boutique-admission-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace events show repeated 'Warning FailedCreate replicaset/emailservice-c86b9b8f6 - Error creating: pods "emailservice-c86b9b8f6-*" is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pods=10, limited: pods=10'. ResourceQuota 'pod-count-quota' in boutique reads 'pods: 10/10' (used == hard), and emailservice Deployment wants replicas: 3 while deployments listing shows 'emailservice 0/3 0 0' with zero pods present. Consequently endpoints 'emailservice' = '<none>' (Service object itself is correct: ClusterIP 10.68.177.85, port 5000 -> targetPort 8080, selector app=emailse

### case-38

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 106,407
- **raw 日志**：[results/1021_0209_tsm-v1-b92/raw/1021_0210_boutique-admission-38](../results/1021_0209_tsm-v1-b92/raw/1021_0210_boutique-admission-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend has zero pods: pods listing shows 10 Running pods with no frontend row, and deployments show frontend 0/1 (UP-TO-DATE 0, AVAILABLE 0) while all other 10 workloads are 1/1; GetResources(endpoints, name=frontend) returns ENDPOINTS <none>, matching the 'partial unreachability' symptom since frontend is the user entry point. Namespace events bind the mechanism verbatim: 'Warning FailedCreate replicaset/frontend-657dd795f Error creating: pods "frontend-657dd795f-b7v7n" is forbidden: exceeded quota: pod-count-quota, requested: pods=1, used: pods=10, limited: pods=10' (repeated

### case-39

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 184,079
- **raw 日志**：[results/1021_0215_tsm-v1-b95/raw/1021_0215_boutique-admission-39](../results/1021_0215_tsm-v1-b95/raw/1021_0215_boutique-admission-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (15x, path /cart/checkout): 'failed to charge card ... rpc error: code = Unavailable ... dial tcp 10.68.72.148:50051: connect: connection refused'; dependency graph shows the failing edge frontend -> checkoutservice -> paymentservice, and L1 confirms paymentservice is the 50051 gRPC callee. pods listing has all 10 other pods 1/1 Running with 0 restarts, but GetResources(pods, label_selector=app=paymentservice) returns 'No matching pods found'; endpoints/paymentservice = '<none>' while services/paymentservice exists with ClusterIP 10.68.72.148, port 50051 -> targetPort 50051,

### case-40

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 15 · tokens 152,902
- **raw 日志**：[results/1021_0225_tsm-v1-b100/raw/1021_0225_boutique-admission-40](../results/1021_0225_tsm-v1-b100/raw/1021_0225_boutique-admission-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing showed every service at 1/1 Running except productcatalogservice, which had no pod at all. Complaint side: frontend error log 188/921 errors, dominant pattern 'could not retrieve product: rpc error: code = Unavailable ... dial tcp 10.68.143.225:3550: connect: connection refused' (97x + 49x). The productcatalogservice Service object exists with declared 3550/TCP, ruling out a missing Service / DNS class. Workload pruned by app=productcatalogservice: 'No matching pods found'; deployment 0/1 UP-TO-DATE, 0 AVAILABLE with conditions Available=False MinimumReplicasUnavailable a

### case-41

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 107,624
- **raw 日志**：[results/1021_0229_tsm-v1-b102/raw/1021_0230_boutique-admission-41](../results/1021_0229_tsm-v1-b102/raw/1021_0230_boutique-admission-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) error logs: 131/149 errors are "failed to get product recommendations" with rpc error code = Unavailable, transport: "Error while dialing: dial tcp 10.68.188.125:8080: connect: connection refused". Pod inventory: all 10 pods are 1/1 Running with 0 RESTARTS, but recommendationservice has NO pod; deployments listing shows recommendationservice 0/1 UP-TO-DATE 0 AVAILABLE 0. Victim reachability: endpoints for recommendationservice = <none> and CheckServiceConnectivity(recommendationservice:8080) returned Connection Failed, while the Service selector (app=recommendationservi

### case-42

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 165,210
- **raw 日志**：[results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-admission-42](../results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-admission-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend GetErrorLogs (99 errors, 66 same pattern): 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage. StackExchange.Redis.RedisConnectionException ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379'. Service redis-cart declares 6379/TCP (ClusterIP 10.68.212.74) but its endpoints are '<none>'; deployment redis-cart is 0/1 with UP-TO-DATE 0 and GetResources(pods, label_selector=app=redis-cart) returns 'No matching pods found' (pod never created). Namespace events bind the mechanism to the objec

### case-43

- **结论**：`namespace/boutique` + `namespace_pod_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_pod_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 110,497
- **raw 日志**：[results/1021_0239_tsm-v1-b107/raw/1021_0240_boutique-admission-43](../results/1021_0239_tsm-v1-b107/raw/1021_0240_boutique-admission-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error log: 'failed to get shipping quote: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.141.164:50051: connect: connection refused' (50 hits) naming shippingservice on the port its Service declares (50051). Service shippingservice exists with ClusterIP 10.68.141.164 and correct selector app=shippingservice / port 50051->targetPort 50051, but its endpoints are '<none>'. Deployment shippingservice shows READY 0/1, UP-TO-DATE 0, AVAILABLE 0 and GetResources(pods, label_selector=app=shippingservice) returns no matching

### case-44

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 130,639
- **raw 日志**：[results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-admission-44](../results/1021_0246_tsm-v1-b110/raw/1021_0246_boutique-admission-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact ('Partial Service Unreachability.'). Signal side first: frontend GetErrorLogs shows 114/116 errors identical to 'failed to get ads: rpc error: code = Unavailable desc = connection error: dial tcp: lookup adservice on 169.254.20.10:53: no such host'. Caller-visible reachability surface is the breakpoint: GetResources(services, name=adservice) -> 'Error from server (NotFound): services "adservice" not found' and endpoints adservice likewise NotFound; CheckServiceConnectivity(adservice, 9555) -> Connection Failed. The workload itself is healthy, ruling out scheduling/startup/probe faults

### case-45

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 132,733
- **raw 日志**：[results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-admission-45](../results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-admission-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (205 errors) are dominated by 164x 'could not retrieve cart: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp: lookup cartservice on 169.254.20.10:53: no such host', plus 31x on POST /cart and 7x on POST /cart/checkout - only cart-dependent paths fail (partial unreachability). The cartservice pod is healthy (cartservice-79b49f5555-278xc 1/1 Running, RESTARTS 0), but the reachability face shows the Service object itself was never created: 'Error from server (NotFound): services "cartservice" not found' and 'endpoints "cartservic

### case-46

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 111,673
- **raw 日志**：[results/1021_0253_tsm-v1-b114/raw/1021_0254_boutique-admission-46](../results/1021_0253_tsm-v1-b114/raw/1021_0254_boutique-admission-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact 'Partial Service Unreachability.' -> signal first: frontend GetErrorLogs shows 7/10 errors 'failed to complete the order: rpc error: code = Unavailable ... transport: Error while dialing: dial tcp: lookup checkoutservice on 169.254.20.10:53: no such host' on /cart/checkout. Workload pruned: pods listing shows checkoutservice-8445f8b6cb-k8lss 1/1 Running with 0 restarts and no probe/scheduling anomaly, so the fault is not scheduling/startup/probe. Missing-reference branch: GetResources(services, name=checkoutservice) -> 'Error from server (NotFound): services "checkoutservice" not foun

### case-47

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 153,441
- **raw 日志**：[results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-admission-47](../results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-admission-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend error log (196/983 errors, 182 identical) shows 'dial tcp: lookup currencyservice on 169.254.20.10:53: no such host', plus checkoutservice currency-conversion failures on the same lookup. All 11 pods are 1/1 Running with RESTARTS 0, including currencyservice-75686c9564-rdv5p on worker-02, so restart/scheduling/image/probe classes are excluded. Victim-side endpoint probe: 'services "currencyservice" not found' and 'endpoints "currencyservice" not found' - the Service object was never created. The boutique services listing contains 11 Services and currencyservice is the onl

### case-48

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 154,460
- **raw 日志**：[results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-admission-48](../results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-admission-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique service-count-quota shows services 11/11 (used == hard), i.e. the ServiceCount quota is exhausted. Exactly 11 Service objects exist and 'emailservice' is the only absent one: DescribeResource(service, emailservice) returns Error from server (NotFound): services "emailservice" not found, so the 12th Service creation was denied by the quota and never landed. The victim's own workload is healthy (pod emailservice-c86b9b8f6-xs874 1/1 Running, RESTARTS 0) and its shipped manifest does declare a Service (port 5000 -> targetPort 8080), and checkoutservice carries EMAIL_SERVICE_ADDR

### case-49

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.24 · steps 26 · tokens 158,531
- **raw 日志**：[results/1021_0304_tsm-v1-b120/raw/1021_0305_boutique-admission-49](../results/1021_0304_tsm-v1-b120/raw/1021_0305_boutique-admission-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 1/1 Running with 0 restarts, and connectivity probes to 10 Services (adservice:9555, cartservice:7070, checkoutservice:5050, currencyservice:7000, emailservice:5000, paymentservice:50051, productcatalogservice:3550, recommendationservice:8080, redis-cart:6379, shippingservice:50051) all returned 'Connection Succeeded', while frontend failed ('Connection failed'). The services listing holds only 10 Services and 'GetResources(services, name=frontend)' returns Error from server (NotFound): services "frontend" not found; endpoints frontend is likewise NotFound. ResourceQuo

### case-50

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 148,220
- **raw 日志**：[results/1021_0313_tsm-v1-b124/raw/1021_0314_boutique-admission-50](../results/1021_0313_tsm-v1-b124/raw/1021_0314_boutique-admission-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP 'Service Availability Disruption.' matched exactly. Workload layer healthy: pods listing shows all 11 boutique pods 1/1 Running with RESTARTS=0 (paymentservice-78c5996648-x9hjd 1/1 Running 0 on worker-02), and GetAlerts reports no metric anomalies. Signal side (frontend GetErrorLogs, 13/15 errors) shows checkout failing with: 'failed to charge card: could not charge the card: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing: dial tcp: lookup paymentservice on 169.254.20.10:53: no such host"' on POST /cart/checkout. Object-layer closure: GetRe

### case-51

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4615 · steps 14 · tokens 154,360
- **raw 日志**：[results/1021_0316_tsm-v1-b126/raw/1021_0316_boutique-admission-51](../results/1021_0316_tsm-v1-b126/raw/1021_0316_boutique-admission-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs: 193/915 errors (21.1%), 111x + 47x 'could not retrieve product(s): rpc error: code = Unavailable ... dial tcp: lookup productcatalogservice on 169.254.20.10:53: no such host' and 33x 'DNS resolution failed for productcatalogservice:3550: C-ares status is not ARES_SUCCESS qtype=A name=productcatalogservice ... Domain name not found'. Pod inventory shows all 11 pods 1/1 Running, RESTARTS 0, incl. productcatalogservice-ddb46fc86-qh6pr on worker-02 -> workload healthy, failure is name resolution/reachability only. GetResources(services, name=productcatalogservic

### case-52

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 129,490
- **raw 日志**：[results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-admission-52](../results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-admission-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 122/139 errors: 'rpc error: code = Unavailable ... dial tcp: lookup recommendationservice on 169.254.20.10:53: no such host' on /cart ('failed to get product recommendations'), while all 11 boutique pods are Running 1/1 with RESTARTS 0, so no restart/probe/scheduling mechanism. Anchored on recommendationservice: GetResources(services, name=recommendationservice) returns 'Error from server (NotFound): services "recommendationservice" not found' and endpoints likewise NotFound; the services listing contains only 11 Services (adservice, cartservice, checkoutservice, curre

### case-53

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 163,735
- **raw 日志**：[results/1021_0322_tsm-v1-b129/raw/1021_0323_boutique-admission-53](../results/1021_0322_tsm-v1-b129/raw/1021_0323_boutique-admission-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 pods in boutique are 1/1 Running with 0 RESTARTS and no metric alerts, yet frontend (entry caller) logs 94/441 errors (21.3%): 'could not retrieve cart: rpc error: code = FailedPrecondition ... Can't access cart storage. StackExchange.Redis.RedisConnectionException ... UnableToConnect on redis-cart:6379/Interactive ... state: Connecting'; cartservice repeats the same 276 error lines from RedisCartStore.GetCartAsync (RedisCartStore.cs:line 90), locating the break on the cartservice -> redis-cart:6379 edge. The breakpoint is that the Service object itself is absent: 'Error from server (No

### case-54

- **结论**：`namespace/boutique` + `namespace_service_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_service_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 131,299
- **raw 日志**：[results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-admission-54](../results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-admission-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (68/84 errors) show the dominant failure 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp: lookup shippingservice on 169.254.20.10:53: no such host', also surfacing via checkoutservice as 'shipping quote failure'. All boutique pods are healthy (shippingservice-7ff54bf6b6-hbbzk 1/1 Running, RESTARTS 0), so the fault is not at workload level. The services listing contains 11 Services and NO shippingservice Service object; GetResources(endpoints, name=shippingservice) returns 'endpoints "shippingservice" not found', and CheckServiceConnectivity(shippin

### case-55

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 207,593
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0714_boutique-admission-55](../results/1021_0900_tsm-v1-fix/raw/1021_0714_boutique-admission-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: pods listing shows a single outlier, redis-cart-5858bb886-w6b9q, STATUS Pending 0/1 with Node: <none>; all other boutique pods are Running 1/1 and GetAlerts reports no metric anomalies. Complaint side: cartservice GetErrorLogs has 342/920 error lines, all 'StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379 ... command=HMGET, timeout: 5000'; the redis-cart Service object exists with declared port 6379/TCP and a live TCP probe on that declared port failed from worker-01, worker-02 and worker-03, so the break is at the workload, not the Service address.

### case-56

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 186,735
- **raw 日志**：[results/1021_0333_tsm-v1-b134/raw/1021_0333_boutique-admission-56](../results/1021_0333_tsm-v1-b134/raw/1021_0333_boutique-admission-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows 10/11 pods Running with one outlier: redis-cart-5858bb886-mtcdp is 0/1 Pending with NODE <none>. Its pod detail carries the mechanism event verbatim: Warning FailedScheduling '0/4 nodes are available: persistentvolumeclaim "redis-cart-pvc" not found' with PodScheduled False, and volume redis-data -> claimName redis-cart-pvc. Nodes are not the cause: worker-01/02/03 are all Ready (master is SchedulingDisabled only by master role) and the predicate is a volume predicate, not CPU/memory/taint. PV redis-cart-pv exists as 2Gi RWO Retain AVAILABLE (unbound), but Descri

### case-57

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 249,045
- **raw 日志**：[results/1021_0335_tsm-v1-b135/raw/1021_0336_boutique-admission-57](../results/1021_0335_tsm-v1-b135/raw/1021_0336_boutique-admission-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry signal: GetErrorLogs(frontend) shows 115/506 errors, dominated by 71x 'could not retrieve cart' + 15x 'failed to add to cart' + 11x checkout failures, all citing cartservice -> serverEndpoint: redis-cart:6379 'It was not possible to connect to the redis server(s). ConnectTimeout'. Single pod outlier: redis-cart-5858bb886-dvpvz 0/1 Pending (107s). Pod sheet: Node: <none>, PodScheduled False, volume redis-data -> ClaimName redis-cart-pvc, event 'Warning FailedScheduling 0/4 nodes are available: persistentvolumeclaim "redis-cart-pvc" not found.'. The claim object genuinely does not exist: G

### case-58

- **结论**：`namespace/boutique` + `namespace_storage_quota_exceeded` ｜ 标签 `namespace/boutique` + `namespace_storage_quota_exceeded`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 207,567
- **raw 日志**：[results/1021_0339_tsm-v1-b137/raw/1021_0339_boutique-admission-58](../results/1021_0339_tsm-v1-b137/raw/1021_0339_boutique-admission-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中唯一离群对象为 redis-cart-5858bb886-pzpdk（0/1 Pending，其余 pod 均 1/1 Running）。症状侧日志先立症状：frontend 报 "could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage."（58 次）及 /cart/checkout 下单失败；其直接上游 cartservice 报 "StackExchange.Redis.RedisConnectionException: It was not possible to connect to the redis server(s). ConnectTimeout"，serverEndpoint: redis-cart:6379，并有 "UnableToConnect on redis-cart:6379/Interactive"。对象层 pod 详情：Node: <none>、PodScheduled False，事件为 "Warning FailedScheduling ... 0/4 nodes are available: persistentvolumeclaim \"redis-cart-pvc\" not found"

