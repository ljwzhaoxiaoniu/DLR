# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **62/62** 题：JRA ✅62 ❌0 ｜ 证据链全闭 62 ｜ token 中位 126,388 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 153,695 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 136,349 | 0 | 0 | 1020_2319_tsm-v1-b34 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 108,306 | 0 | 0 | 1021_0119_tsm-v1-b67 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 103,440 | 0 | 0 | 1021_0219_tsm-v1-b97 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 105,838 | 0 | 0 | 1021_0308_tsm-v1-b122 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 125,669 | 0 | 0 | 1021_0343_tsm-v1-b139 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 120,867 | 0 | 0 | 1021_0353_tsm-v1-b144 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 123,668 | 0 | 0 | 1021_0355_tsm-v1-b145 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 143,306 | 0 | 0 | 1021_0357_tsm-v1-b146 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 125,428 | 0 | 0 | 1020_2004_tsm-v1-b4 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 128,325 | 0 | 0 | 1020_2010_tsm-v1-b7 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 124,249 | 0 | 0 | 1020_2015_tsm-v1-b10 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 126,270 | 0 | 0 | 1020_2020_tsm-v1-b13 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 168,154 | 0 | 0 | 1020_2239_tsm-v1-b16 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 105,993 | 0 | 0 | 1020_2245_tsm-v1-b19 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 124,979 | 0 | 0 | 1020_2251_tsm-v1-b22 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 83,475 | 0 | 0 | 1020_2300_tsm-v1-b25 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 126,303 | 0 | 0 | 1020_2306_tsm-v1-b28 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 126,388 | 0 | 0 | 1020_2313_tsm-v1-b31 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 126,392 | 0 | 0 | 1020_2325_tsm-v1-b37 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 105,658 | 0 | 0 | 1020_2331_tsm-v1-b40 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 145,000 | 0 | 0 | 1020_2336_tsm-v1-b43 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 117,664 | 0 | 0 | 1020_2343_tsm-v1-b46 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 105,909 | 0 | 0 | 1020_2349_tsm-v1-b49 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 124,055 | 0 | 0 | 1020_2355_tsm-v1-b52 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 106,433 | 0 | 0 | 1021_0051_tsm-v1-b55 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 121,999 | 0 | 0 | 1021_0058_tsm-v1-b58 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 192,866 | 0 | 0 | 1021_0105_tsm-v1-b61 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 128,666 | 0 | 0 | 1021_0111_tsm-v1-b64 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 106,239 | 0 | 0 | 1021_0125_tsm-v1-b70 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 127,250 | 0 | 0 | 1021_0131_tsm-v1-b73 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 104,182 | 0 | 0 | 1021_0138_tsm-v1-b76 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 140,747 | 0 | 0 | 1021_0144_tsm-v1-b79 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 107,299 | 0 | 0 | 1021_0150_tsm-v1-b82 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 197,856 | 0 | 0 | 1021_0154_tsm-v1-b84 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 124,517 | 0 | 0 | 1021_0200_tsm-v1-b87 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 137,540 | 0 | 0 | 1021_0205_tsm-v1-b90 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 147,856 | 0 | 0 | 1021_0209_tsm-v1-b92 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 119,452 | 0 | 0 | 1021_0215_tsm-v1-b95 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 126,170 | 0 | 0 | 1021_0225_tsm-v1-b100 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 130,336 | 0 | 0 | 1021_0229_tsm-v1-b102 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 191,286 | 0 | 0 | 1021_0236_tsm-v1-b105 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 127,697 | 0 | 0 | 1021_0239_tsm-v1-b107 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 124,048 | 0 | 0 | 1021_0243_tsm-v1-b109 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 149,338 | 0 | 0 | 1021_0250_tsm-v1-b112 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 105,014 | 0 | 0 | 1021_0253_tsm-v1-b114 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 130,094 | 0 | 0 | 1021_0257_tsm-v1-b116 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 125,969 | 0 | 0 | 1021_0301_tsm-v1-b118 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 108,715 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 145,327 | 0 | 0 | 1021_0313_tsm-v1-b124 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 178,586 | 0 | 0 | 1021_0316_tsm-v1-b126 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 147,781 | 0 | 0 | 1021_0319_tsm-v1-b127 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 149,274 | 0 | 0 | 1021_0322_tsm-v1-b129 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 144,144 | 0 | 0 | 1021_0324_tsm-v1-b130 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 106,225 | 0 | 0 | 1021_0328_tsm-v1-b132 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 150,571 | 0 | 0 | 1021_0331_tsm-v1-b133 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 145,350 | 0 | 0 | 1021_0335_tsm-v1-b135 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 143,600 | 0 | 0 | 1021_0337_tsm-v1-b136 | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 126,501 | 0 | 0 | 1021_0341_tsm-v1-b138 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 161,571 | 0 | 0 | 1021_0345_tsm-v1-b140 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 119,400 | 0 | 0 | 1021_0349_tsm-v1-b142 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 151,529 | 0 | 0 | 1021_0351_tsm-v1-b143 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `image_registry_dns_failure` ｜ 标签 `app/adservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 153,695
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2059_boutique-startup-1](../results/1021_0900_tsm-v1-fix/raw/1020_2059_boutique-startup-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one workload is non-serving in namespace boutique: pod adservice-7b5ff9bbd7-r2s5r is 0/1 in ErrImagePull/ImagePullBackOff on worker-03; all ten other services are 1/1 Running with 0 restarts, and frontend's error log carries only GCE metadata noise (no request-failure trail). The pod sheet proves scheduling and sandbox creation succeeded (PodScheduled True, PodReadyToStartContainers True) and the failure is at the image-pull DNS lookup stage, verbatim: 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/adservice:v0.10.3": failed to do request: Head "https:

### case-2

- **结论**：`app/cartservice` + `image_registry_dns_failure` ｜ 标签 `app/cartservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 136,349
- **raw 日志**：[results/1020_2319_tsm-v1-b34/raw/1020_2319_boutique-startup-2](../results/1020_2319_tsm-v1-b34/raw/1020_2319_boutique-startup-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing shows the sole outlier cartservice-59798f66d6-87776 in 0/1 ImagePullBackOff on worker-02 while all other boutique pods are 1/1 Running; frontend error logs are clean (only GCE metadata noise) so the fault sits on the carrier; CheckServiceConnectivity(cartservice:7070, the Service's own declared port) returns Connection Failed. DescribeResource on the pod shows Status Pending, State Waiting Reason ImagePullBackOff, PodScheduled True, Restart Count 0 (not a scheduling/restart/OOM case). Pod and namespace events bind the mechanism verbatim: Failed to pull image 'ghost-registry.exampl

### case-3

- **结论**：`app/checkoutservice` + `image_registry_dns_failure` ｜ 标签 `app/checkoutservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 108,306
- **raw 日志**：[results/1021_0119_tsm-v1-b67/raw/1021_0120_boutique-startup-3](../results/1021_0119_tsm-v1-b67/raw/1021_0120_boutique-startup-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only checkoutservice is unreachable: pods listing shows the single outlier checkoutservice-7bbc84d447-gfr6r 0/1 STATUS=ErrImagePull (all other 10 boutique pods 1/1 Running), and GetResources(endpoints, checkoutservice) returns an empty ENDPOINTS list, so frontend's calls to checkoutservice:5050 fail while every other service is healthy ('partial'). checkoutservice error log: 'container "server" in pod "checkoutservice-7bbc84d447-gfr6r" is waiting to start: image can't be pulled'. Pod events pin the failing stage at registry lookup, not manifest or auth: 'Failed to pull image ghost-registry.exa

### case-4

- **结论**：`app/frontend` + `image_registry_dns_failure` ｜ 标签 `app/frontend` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 103,440
- **raw 日志**：[results/1021_0219_tsm-v1-b97/raw/1021_0220_boutique-startup-4](../results/1021_0219_tsm-v1-b97/raw/1021_0220_boutique-startup-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend entry-pod is the only outlier: pods listing shows frontend-7968b59db9-zs7zp 0/1 ErrImagePull on worker-03 while the other 10 boutique services are 1/1 Running. frontend error log: container "server" in pod "frontend-7968b59db9-zs7zp" is waiting to start: image can't be pulled. Pod events give the failing stage: Warning Failed - Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/frontend:v0.10.3": failed to resolve reference: failed to do request: Head "https://ghost-registry.example.net/v2/google-samples/microservices-demo/frontend/manifests/v0.10.3": d

### case-5

- **结论**：`app/productcatalogservice` + `image_registry_dns_failure` ｜ 标签 `app/productcatalogservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 105,838
- **raw 日志**：[results/1021_0308_tsm-v1-b122/raw/1021_0308_boutique-startup-5](../results/1021_0308_tsm-v1-b122/raw/1021_0308_boutique-startup-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows only one outlier: productcatalogservice-67655fb89c-jmg58 0/1 ErrImagePull (all other 10 pods 1/1 Running), which matches the 'partial' unreachability symptom. Reachability side: CheckServiceConnectivity(productcatalogservice, 3550 - the port the Service spec declares) returned 'Connection Failed', and endpoints/productcatalogservice shows an empty ENDPOINTS column, so callers (frontend / checkoutservice / recommendationservice) have no ready backend. Pod detail: Status Pending, container State Waiting Reason ErrImagePull, Container ID empty, with event: Warning F

### case-6

- **结论**：`app/redis-cart` + `image_registry_dns_failure` ｜ 标签 `app/redis-cart` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 125,669
- **raw 日志**：[results/1021_0343_tsm-v1-b139/raw/1021_0343_boutique-startup-6](../results/1021_0343_tsm-v1-b139/raw/1021_0343_boutique-startup-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Outlier in pods listing: redis-cart-7cfcd8578b-pbb9c 0/1 ErrImagePull (all other 10 boutique pods 1/1 Running, RESTARTS 0). Pod events: 'Failed to pull image "ghost-registry.example.net/redis:alpine": failed to resolve reference: Head "https://ghost-registry.example.net/v2/redis/manifests/alpine": dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host' followed by Error: ErrImagePull, Back-off pulling image, Error: ImagePullBackOff — the request never reaches the registry, so the failure stage is registry name resolution, not manifest rejection or token auth. Deployment red

### case-7

- **结论**：`app/checkoutservice` + `image_registry_dns_failure` ｜ 标签 `app/checkoutservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 120,867
- **raw 日志**：[results/1021_0353_tsm-v1-b144/raw/1021_0353_boutique-startup-7](../results/1021_0353_tsm-v1-b144/raw/1021_0353_boutique-startup-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: checkoutservice-69985d5ddf-sfx79 0/1 ErrImagePull (all other 10 pods 1/1 Running). Complaint side: frontend entry-caller error logs contain only benign GCE metadata noise ('GCE metadata instance/zone not defined'), while CheckServiceConnectivity(checkoutservice, 5050) on the port the Service spec declares (port 5050 -> targetPort 5050) returns 'Connection Failed', and endpoints/checkoutservice has an empty ENDPOINTS column (no ready backend). Pod detail: Status Pending, container 'server' State Waiting Reason ErrImagePull, Restart Count 0, image internal-re

### case-8

- **结论**：`app/currencyservice` + `image_registry_dns_failure` ｜ 标签 `app/currencyservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 123,668
- **raw 日志**：[results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-startup-8](../results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-startup-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows exactly one outlier: currencyservice-749887fc48-j2mpn 0/1 ErrImagePull (RESTARTS 0), all other 10 pods 1/1 Running. Complaint side: frontend GetErrorLogs contains only GCE metadata noise (instance/group/cluster-name and instance/zone not defined), no causal trail; GetResources(endpoints, currencyservice) returns an EMPTY endpoints set, so callers (frontend -> currencyservice, checkoutservice -> currencyservice) lose reachability. Pod sheet: State Waiting, Reason ErrImagePull; event 'Failed' verbatim: Failed to pull image \'corp-registry.internal/google-samples/mi

### case-9

- **结论**：`app/emailservice` + `image_registry_dns_failure` ｜ 标签 `app/emailservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 143,306
- **raw 日志**：[results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-startup-9](../results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-startup-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-side logs (frontend GetErrorLogs) show only GCE metadata noise; the caller of the suspect service (checkoutservice, 'No error logs found') reports nothing, so failure is on reachability, not app logic. Pod inventory scan yields exactly one outlier: emailservice-7f65596fc8-dvm5r 0/1 ErrImagePull (all other 10 pods 1/1 Running, RESTARTS 0). Pod events show the failing stage verbatim: 'Failed to pull image "corp-registry.internal/microservices-demo/emailservice:v0.10.3": ... failed to do request: Head "https://corp-registry.internal/v2/microservices-demo/emailservice/manifests/v0.10.3": dia

### case-10

- **结论**：`app/frontend` + `image_registry_dns_failure` ｜ 标签 `app/frontend` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 125,428
- **raw 日志**：[results/1020_2004_tsm-v1-b4/raw/1020_2005_boutique-startup-10](../results/1020_2004_tsm-v1-b4/raw/1020_2005_boutique-startup-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the single outlier frontend-6b6f5c6d86-82br7 (0/1, ErrImagePull) while all other boutique pods are 1/1 Running with 0 restarts; frontend's own error log reports 'container server ... is waiting to start: trying and failing to pull image', and GetResources(endpoints, frontend) returns an empty ENDPOINTS set, explaining the availability disruption. Pod detail shows the container never started (no Container ID, Restart Count 0) and the pod was scheduled fine (PodScheduled True, node worker-01), ruling out scheduling, probe, quota, SA and PVC classes. The mechanism event is verb

### case-11

- **结论**：`app/paymentservice` + `image_registry_dns_failure` ｜ 标签 `app/paymentservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 128,325
- **raw 日志**：[results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-startup-11](../results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-startup-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing shows a single outlier: paymentservice-77758b64c-57ph2 0/1 ImagePullBackOff (all other 10 boutique pods 1/1 Running, RESTARTS 0). Pod detail (State Waiting/ErrImagePull) Events give the mechanism verbatim: 'Failed to pull image "internal-registry.corp.local/google-samples/microservices-demo/paymentservice:v0.10.3": ... failed to do request: Head "https://internal-registry.corp.local/v2/.../manifests/v0.10.3": dial tcp: lookup internal-registry.corp.local: Temporary failure in name resolution', then ErrImagePull and ImagePullBackOff back-off. The failure stage is name resolution (r

### case-12

- **结论**：`app/productcatalogservice` + `image_registry_dns_failure` ｜ 标签 `app/productcatalogservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 124,249
- **raw 日志**：[results/1020_2015_tsm-v1-b10/raw/1020_2016_boutique-startup-12](../results/1020_2015_tsm-v1-b10/raw/1020_2016_boutique-startup-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 1/1 Running except productcatalogservice-54fc885f7f-49hkh, which sits 0/1 in ErrImagePull/ImagePullBackOff. The Service productcatalogservice declares port 3550/TCP but its endpoints are empty, so callers (frontend, checkoutservice, recommendationservice) have no serving address - the reported availability disruption. The pod sheet's mechanism event is verbatim: 'Failed to pull image "corp-registry.internal/productcatalogservice:v0.10.3": failed to resolve reference ... dial tcp: lookup corp-registry.internal on 127.0.0.53:53: no such host' - the failure is at the reg

### case-13

- **结论**：`app/shippingservice` + `image_registry_dns_failure` ｜ 标签 `app/shippingservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 126,270
- **raw 日志**：[results/1020_2020_tsm-v1-b13/raw/1020_2021_boutique-startup-13](../results/1020_2020_tsm-v1-b13/raw/1020_2021_boutique-startup-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: shippingservice-7465494576-gzcwz is 0/1 with STATUS ErrImagePull on worker-03, while all other boutique pods (including four co-located on worker-03) are 1/1 Running. The Service object shippingservice (ClusterIP 10.68.88.156, port 50051/TCP) has an EMPTY endpoints list, so callers have no ready backend - the availability disruption. The entry caller frontend's error log is clean (only benign GCE metadata 'instance/zone not defined' noise) and GetAlerts reports no metric anomalies, ruling out code, probe, CPU/memory and latency classes. The pod's mechanism 

### case-14

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 168,154
- **raw 日志**：[results/1020_2239_tsm-v1-b16/raw/1020_2240_boutique-startup-14](../results/1020_2239_tsm-v1-b16/raw/1020_2240_boutique-startup-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows 10/11 services 1/1 Running; the only outlier is adservice-84b8c87d54-fhrvj 0/1 ErrImagePull (RESTARTS 0). Pod detail/events: Warning Failed 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10.3x": failed to resolve reference ...: not found' followed by ErrImagePull and ImagePullBackOff. The failing stage is reference/manifest resolution (no 'lookup ... no such host' DNS stage, no 'failed to authorize'/401 token stage), i.e. the tag itself does not exist. Deployment config GetAppYAML(adservice) confirms pod template 

### case-15

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 105,993
- **raw 日志**：[results/1020_2245_tsm-v1-b19/raw/1020_2246_boutique-startup-15](../results/1020_2245_tsm-v1-b19/raw/1020_2246_boutique-startup-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory (only legitimate full scan) shows a single outlier: currencyservice-f9bc5fbdc-5bwxg 0/1 ImagePullBackOff on worker-03; all other 10 boutique pods are 1/1 Running with 0 restarts, matching 'partial' unreachability. Complaint side of the named service: GetErrorLogs(currencyservice) = 'container "server" in pod "currencyservice-f9bc5fbdc-5bwxg" is waiting to start: image can't be pulled', and GetResources(endpoints, currencyservice) returns an EMPTY endpoints list, so frontend/checkoutservice calls to currencyservice:7000 have no backing pod. Image-pull stage classification: pod eve

### case-16

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 124,979
- **raw 日志**：[results/1020_2251_tsm-v1-b22/raw/1020_2256_boutique-startup-16](../results/1020_2251_tsm-v1-b22/raw/1020_2256_boutique-startup-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique: only emailservice-85cf669ff7-r9vtk is 0/1 with STATUS ErrImagePull on worker-03, all other 10 services are 1/1 Running; frontend and checkoutservice error logs are clean (no call failures attributable to this), so the break is at the workload/image stage. DescribeResource(pod) shows State Waiting Reason ErrImagePull, empty Image ID, and the mechanism event verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10.33": rpc error: code = NotFound desc = failed to pull and unpack image ... failed to resolve reference

### case-17

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 83,475
- **raw 日志**：[results/1020_2300_tsm-v1-b25/raw/1020_2301_boutique-startup-17](../results/1020_2300_tsm-v1-b25/raw/1020_2301_boutique-startup-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: entry caller's error log reads 'Error from server (BadRequest): container "server" in pod "frontend-f86d57544-9gsst" is waiting to start: image can't be pulled'. Inventory scan: single outlier among all-healthy peers — frontend-f86d57544-9gsst 0/1 ImagePullBackOff RESTARTS 0 on worker-03, all other 10 services 1/1 Running. Pod events give the failing stage: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.3x": rpc error: code = NotFound desc = ... failed to resolve reference ...: v0.10.3x: not found' — the registry resolved the ho

### case-18

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 126,303
- **raw 日志**：[results/1020_2306_tsm-v1-b28/raw/1020_2308_boutique-startup-18](../results/1020_2306_tsm-v1-b28/raw/1020_2308_boutique-startup-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique pods listing is productcatalogservice-77b9f6655f-g54pr with 0/1 READY and STATUS ImagePullBackOff (RESTARTS 0, never started). Complaint side confirms reachability is broken: endpoints for productcatalogservice show an empty ENDPOINTS set, and an active TCP probe on the Service's own declared port 3550 returns Connection Failed, so frontend/checkoutservice/recommendationservice all lose the service. Pod detail shows container 'server' in State Waiting / Reason ImagePullBackOff with Restart Count 0 (not a crash loop, not OOMKilled). The mechanism event is verbatim: 

### case-19

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 126,388
- **raw 日志**：[results/1020_2313_tsm-v1-b31/raw/1020_2314_boutique-startup-19](../results/1020_2313_tsm-v1-b31/raw/1020_2314_boutique-startup-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace pod sheet is recommendationservice-6f4d5b7797-27652 (0/1, ErrImagePull, RESTARTS 0) while the other 10 pods are 1/1 Running. Reachability surfaces confirm it: Service recommendationservice declares 8080/TCP (ClusterIP 10.68.28.47) but its Endpoints object is empty, and CheckServiceConnectivity(recommendationservice:8080) returns 'Connection Failed'. Pod detail shows Status Pending, container State Waiting/Reason ErrImagePull, PodScheduled True, Image ID empty (container never started), with kubelet events: 'Failed to pull image "us-central1-docker.pkg.dev/google-s

### case-20

- **结论**：`app/redis-cart` + `incorrect_image_reference` ｜ 标签 `app/redis-cart` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 126,392
- **raw 日志**：[results/1020_2325_tsm-v1-b37/raw/1020_2326_boutique-startup-20](../results/1020_2325_tsm-v1-b37/raw/1020_2326_boutique-startup-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is confined to redis-cart. Pod redis-cart-5449b7fcb4-zs6j6 on worker-03 is 0/1 Pending with State Waiting / Reason ImagePullBackOff, while all 10 peer pods are 1/1 Running. Its Service exists with port 6379/TCP, but GetResources(endpoints) shows an EMPTY endpoints column and CheckServiceConnectivity(redis-cart:6379) returns 'Connection Failed' — cartservice's call edge to redis-cart has zero ready backends. Pod events give the mechanism verbatim: "Failed to pull image \"redis:alpinee\": failed to pull and unpack image \"docker.io/library/redis:alpinee\": failed to resolv

### case-21

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 105,658
- **raw 日志**：[results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-startup-21](../results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-startup-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows exactly one outlier among 11: currencyservice-7c7bd666d4-5jzs6 is 0/1 with STATUS ErrImagePull, RESTARTS 0, while all other 10 boutique pods are 1/1 Running - matching 'partial' unreachability. Pod describe gives the mechanism event verbatim: kubelet Warning Failed - 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.999": rpc error: code = NotFound desc = failed to resolve reference ...: not found', State Waiting Reason ErrImagePull, Back-off pulling image / ImagePullBackOff. The failing stage is the manifest/reference 

### case-22

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 145,000
- **raw 日志**：[results/1020_2336_tsm-v1-b43/raw/1020_2337_boutique-startup-22](../results/1020_2336_tsm-v1-b43/raw/1020_2337_boutique-startup-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing showed the only outlier row: emailservice-845967bc5c-tkgs9 0/1 ErrImagePull (all other 10 boutique services 1/1 Running). Complaint side confirmed impact: the emailservice Service (declares port 5000/TCP) has EMPTY endpoints, so callers such as checkoutservice cannot reach it; checkoutservice error logs are clean, ruling out caller-side address issues. Pod detail showed PodScheduled=True/ContainersReady=False with State Waiting, Reason ErrImagePull, and events: Normal Pulling image "us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.99.9" then Warning Fai

### case-23

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 117,664
- **raw 日志**：[results/1020_2343_tsm-v1-b46/raw/1020_2343_boutique-startup-23](../results/1020_2343_tsm-v1-b46/raw/1020_2343_boutique-startup-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the only outlier in the namespace pod sheet: pod frontend-5f87c65786-gpl9k is 0/1 ErrImagePull with 0 restarts while all other 10 boutique pods are 1/1 Running. Its events show the registry reached but rejecting the manifest: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.999": rpc error: code = NotFound ... failed to resolve reference ...: not found', followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff'. GetAppYAML(frontend) confirms the Deployment template itself pins the nonexistent tag image: .../frontend:v0.10.999 

### case-24

- **结论**：`app/paymentservice` + `incorrect_image_reference` ｜ 标签 `app/paymentservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 105,909
- **raw 日志**：[results/1020_2349_tsm-v1-b49/raw/1020_2350_boutique-startup-24](../results/1020_2349_tsm-v1-b49/raw/1020_2350_boutique-startup-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: paymentservice-fd7bf684d-9zf2b 0/1 ImagePullBackOff on worker-03, while all other 10 boutique pods are 1/1 Running with 0 restarts (partial, not total, unreachability). The Service paymentservice itself is correct (ClusterIP 10.68.100.95, port 50051 -> targetPort 50051, selector app=paymentservice matches), but its endpoints object has an empty ENDPOINTS column because the pod never becomes Ready. Pod detail shows State: Waiting, Reason: ErrImagePull, with the kubelet event: Warning Failed - Failed to pull image "us-central1-docker.pkg.dev/google-samples/mi

### case-25

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 124,055
- **raw 日志**：[results/1020_2355_tsm-v1-b52/raw/1020_2356_boutique-startup-25](../results/1020_2355_tsm-v1-b52/raw/1020_2356_boutique-startup-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：唯一离群对象 productcatalogservice-6bcf695fc8-jksfd 处于 0/1 ImagePullBackOff（其余 10 pod 均 1/1 Running，RESTARTS=0）；pod Events 原文为 'Failed to pull image ".../productcatalogservice:v0.10.999": rpc error: code = NotFound desc = ... failed to resolve reference "...:v0.10.999": ... not found'，随后 ErrImagePull -> BackOff -> ImagePullBackOff；该报错停在 reference/manifest 解析阶段，无 no such host / dial 类 DNS 文案，也无 failed to authorize / 401 token 文案，故判为 incorrect_image_reference；GetAppYAML 确认 Deployment 镜像 tag 为不存在的 v0.10.999，而同文件内 Service port/targetPort 3550、selector app=productcatalogservice、serviceAccountName、gRPC 探针

### case-26

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 106,433
- **raw 日志**：[results/1021_0051_tsm-v1-b55/raw/1021_0052_boutique-startup-26](../results/1021_0051_tsm-v1-b55/raw/1021_0052_boutique-startup-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend (entry caller) error logs show no downstream call failures, but the boutique pod inventory has exactly one outlier: recommendationservice-575dc57964-m94kz 0/1 ErrImagePull (all other 10 pods 1/1 Running). Reachability of the named service read from its own objects: Service recommendationservice declares 8080/TCP with selector app=recommendationservice, and endpoints/recommendationservice has EMPTY ENDPOINTS - no backend reachable. Mechanism event on the pod sheet: 'Pulling image "us-central1-docker.pkg.dev/google-samples/microservices-demo/recommendationservice:v0.10.999

### case-27

- **结论**：`app/shippingservice` + `incorrect_image_reference` ｜ 标签 `app/shippingservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 121,999
- **raw 日志**：[results/1021_0058_tsm-v1-b58/raw/1021_0059_boutique-startup-27](../results/1021_0058_tsm-v1-b58/raw/1021_0059_boutique-startup-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 的 error 日志仅有 GCE metadata 噪音，无下游调用失败；pods 首轮全量中唯一离群行为 shippingservice-7bd784d444-fz7w4 (0/1, ErrImagePull)，其余 10 个 pod 均 1/1 Running/RESTARTS 0，12 个 Service 全部存在（排除 quota/缺失 Service）。pod 详情 Events 原文：'Warning Failed ... Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/shippingservice:v0.10.999": rpc error: code = NotFound desc = failed to pull and unpack image "...:v0.10.999": failed to resolve reference "...:v0.10.999": not found'，随后 'Error: ErrImagePull' 与 'Error: ImagePullBackOff'；失败阶段在 manifest 解析被 registry 拒绝（not found），而非 lookup/no such host（DNS

### case-28

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 192,866
- **raw 日志**：[results/1021_0105_tsm-v1-b61/raw/1021_0106_boutique-startup-28](../results/1021_0105_tsm-v1-b61/raw/1021_0106_boutique-startup-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique, 10 of 11 deployments are 1/1 AVAILABLE; the single outlier is adservice (deployment 0/1, AVAILABLE 0) with pod adservice-d8d4f4857-4jdhp in 0/1 ErrImagePull. The victim's reachability surface confirms the outage: services/adservice declares 9555/TCP with selector app=adservice, but endpoints/adservice has an empty ENDPOINTS column, so callers (frontend -> adservice) get no serving backend. The mechanism is a bad image reference in the deployment template: GetAppYAML(adservice) shows image 'us-central1-docker.pkg.dev/google-samples/microservices-demo/adservic:v0.10.3' - t

### case-29

- **结论**：`app/cartservice` + `incorrect_image_reference` ｜ 标签 `app/cartservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 128,666
- **raw 日志**：[results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-startup-29](../results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-startup-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: cartservice-6674f577f-l6z26 0/1 ImagePullBackOff on worker-03 (all other 10 pods 1/1 Running); GetAlerts is clean and frontend GetErrorLogs shows only GCE-metadata noise, so the entry signal is not an application error. Complaint side on the Service's own declared port (Service spec port 7070/TCP): CheckServiceConnectivity(cartservice, 7070) returns 'Connection Failed' and GetResources(endpoints, name=cartservice) shows an EMPTY endpoint list, i.e. zero ready backends. Pod detail gives the mechanism: State Waiting Reason ImagePullBackOff with Failed to pull

### case-30

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 106,239
- **raw 日志**：[results/1021_0125_tsm-v1-b70/raw/1021_0126_boutique-startup-30](../results/1021_0125_tsm-v1-b70/raw/1021_0126_boutique-startup-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory shows a single outlier: checkoutservice-5cf79c94b8-fbcmx is 0/1 ErrImagePull on worker-01 while all other 10 boutique pods are 1/1 Running with 0 restarts. Entry caller frontend GetErrorLogs is clean (only GCE metadata noise: instance/zone and cluster-name not defined), so the break is not on the call edge. The pod Events record the mechanism verbatim: Warning Failed 'Failed to pull image ".../checkoutservcie:v0.10.3": rpc error: code = NotFound desc = failed to resolve reference "...": not found', followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff'. The failing stage

### case-31

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 127,250
- **raw 日志**：[results/1021_0131_tsm-v1-b73/raw/1021_0133_boutique-startup-31](../results/1021_0131_tsm-v1-b73/raw/1021_0133_boutique-startup-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod currencyservice-b68d5576c-gbl9k is the only outlier in boutique: READY 0/1, STATUS ErrImagePull, RESTARTS 0, scheduled on worker-03 (PodScheduled True), container state Waiting/Reason ErrImagePull. kubelet events: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservce:v0.10.3": rpc error: code = NotFound ... failed to resolve reference ...: not found' followed by 'Error: ErrImagePull' -> BackOff -> 'Warning Failed ... Error: ImagePullBackOff'. The failing stage is reference resolution at the registry (NotFound for the repository), not a DNS looku

### case-32

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 104,182
- **raw 日志**：[results/1021_0138_tsm-v1-b76/raw/1021_0139_boutique-startup-32](../results/1021_0138_tsm-v1-b76/raw/1021_0139_boutique-startup-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in namespace boutique shows a single outlier: frontend-57b59b9fcb-2xxwt 0/1 ErrImagePull on worker-01, while all other 10 boutique services are 1/1 Running; endpoints/frontend has an empty ENDPOINTS column (no serving pod). Pod detail: PodScheduled=True and Service Account 'frontend' present, so scheduling/admission are healthy; the mechanism sits in the image-pull stage. Pod events read verbatim: Warning Failed 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/frnotend:v0.10.3": rpc error: code = NotFound desc = failed to pull and unpack image ..

### case-33

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 140,747
- **raw 日志**：[results/1021_0144_tsm-v1-b79/raw/1021_0144_boutique-startup-33](../results/1021_0144_tsm-v1-b79/raw/1021_0144_boutique-startup-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend's error logs show only benign GCE-metadata noise, so the pods inventory was used as entry: 10 of 11 pods are Running 1/1; the sole outlier is recommendationservice-85f884c789-bdwls, 0/1 with status ErrImagePull (RESTARTS 0, so not a crash loop). Complaint-side check confirms the outage is caller-visible: Service recommendationservice declares PORT(S) 8080/TCP, its endpoints object is empty (no bound address), and CheckServiceConnectivity(recommendationservice, 8080) returns 'Connection Failed'. Pod sheet shows State Waiting/Reason ErrImagePull with PodScheduled True and a

### case-34

- **结论**：`app/redis-cart` + `incorrect_image_reference` ｜ 标签 `app/redis-cart` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 107,299
- **raw 日志**：[results/1021_0150_tsm-v1-b82/raw/1021_0150_boutique-startup-34](../results/1021_0150_tsm-v1-b82/raw/1021_0150_boutique-startup-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier while all peers are 1/1 Running: redis-cart-7966c4885c-ckxnh 0/1 ImagePullBackOff. Pod detail events give the mechanism verbatim: Warning Failed - Failed to pull image "redsi:alpine": failed to resolve reference "docker.io/library/redsi:alpine": unexpected status from HEAD request to https://docker.nju.edu.cn/library/redsi/manifests/alpine?ns=docker.io: 403 Forbidden, plus ErrImagePull and BackOff. The stage is the manifest HEAD request (registry host was reached and answered with a status), so the image reference itself is wrong: the deployment template in 

### case-35

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 197,856
- **raw 日志**：[results/1021_0154_tsm-v1-b84/raw/1021_0155_boutique-startup-35](../results/1021_0154_tsm-v1-b84/raw/1021_0155_boutique-startup-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier among healthy peers: adservice-6c84558cdf-82zhm 0/1 ImagePullBackOff on worker-03, while all other boutique pods are 1/1 Running with 0 restarts. Pod detail and namespace events give the mechanism verbatim: 'Failed to pull image us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10_3: rpc error: code = NotFound desc = failed to resolve reference ...adservice:v0.10_3: not found', followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff'. The failure stage is the manifest/reference step - no dial/lookup 'no such host' (so not a reg

### case-36

- **结论**：`app/cartservice` + `incorrect_image_reference` ｜ 标签 `app/cartservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 124,517
- **raw 日志**：[results/1021_0200_tsm-v1-b87/raw/1021_0201_boutique-startup-36](../results/1021_0200_tsm-v1-b87/raw/1021_0201_boutique-startup-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' localized to cartservice: pods listing shows the only outlier row 'cartservice-667794f8fd-xt7sw 0/1 ErrImagePull' while all other 10 boutique pods are 1/1 Running with 0 RESTARTS. Complaint side confirmed: Service cartservice declares port 7070 (spec.ports[0].port=7070, targetPort=7070) and CheckServiceConnectivity(cartservice,7070) returned 'Connection Failed', with 'endpoints/cartservice' showing an empty ENDPOINTS column (no ready addresses), consistent because its single pod is not Ready. Pod detail: State Waiting Reason ErrImagePull, PodScheduled=T

### case-37

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 137,540
- **raw 日志**：[results/1021_0205_tsm-v1-b90/raw/1021_0205_boutique-startup-37](../results/1021_0205_tsm-v1-b90/raw/1021_0205_boutique-startup-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' maps to checkoutservice alone: pods listing shows the only outlier checkoutservice-5b5b445b57-zq9zm 0/1 ErrImagePull (RESTARTS 0) while all other 10 boutique pods are 1/1 Running. Complaint side: Service/checkoutservice declares 5050/TCP; Endpoints/checkoutservice has an EMPTY endpoints list; active TCP probe to the declared port 5050 returned 'Connection Failed'. Pod sheet: Status Pending, container Waiting Reason ErrImagePull, PodScheduled=True, Initialized=True (scheduling, volumes, service account all fine) -> break is at image pull. Mechanism even

### case-38

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 147,856
- **raw 日志**：[results/1021_0209_tsm-v1-b92/raw/1021_0210_boutique-startup-38](../results/1021_0209_tsm-v1-b92/raw/1021_0210_boutique-startup-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows a single outlier: emailservice-74fd46b589-7w9d9 0/1 ImagePullBackOff, RESTARTS=0 on worker-01, while all 10 peer pods are 1/1 Running. Pod detail: State Waiting Reason ImagePullBackOff, PodScheduled=True, Initialized=True. Events carry the mechanism verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10_3": rpc error: code = NotFound desc = failed to resolve reference ...: not found' plus 'Error: ErrImagePull'. The failure stage is the manifest/reference resolution (NotFound) after the registry hostname resol

### case-39

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 119,452
- **raw 日志**：[results/1021_0215_tsm-v1-b95/raw/1021_0215_boutique-startup-39](../results/1021_0215_tsm-v1-b95/raw/1021_0215_boutique-startup-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Anchored on the single outlier in the pods listing: productcatalogservice-56d788b4bc-xslrd is 0/1 ErrImagePull while all other 10 boutique pods are 1/1 Running and GetAlerts() reports no metric anomalies (frontend error logs carry only benign GCE metadata noise, consistent with a partial, not global, outage). Pod sheet events: 'Failed to pull image "...productcatalogservice:v0.1O.3": rpc error: code = NotFound desc = failed to resolve reference "...:v0.1O.3": ...: not found', followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff'. The failure stage is the registry manifest resolution 

### case-40

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 126,170
- **raw 日志**：[results/1021_0225_tsm-v1-b100/raw/1021_0225_boutique-startup-40](../results/1021_0225_tsm-v1-b100/raw/1021_0225_boutique-startup-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pod inventory shows a single outlier: recommendationservice-685d5cfc97-6br5n 0/1 ErrImagePull (RESTARTS 0, NODE worker-01), all other services 1/1 Running; GetResources(endpoints, recommendationservice) returns an empty ENDPOINTS set, and frontend's GetErrorLogs contains only benign GCE metadata noise, so the availability break localizes to recommendationservice. DescribeResource(pod) shows State Waiting Reason ErrImagePull with PodScheduled=True and Initialized=True (not a scheduling/probe/restart fault) and the mechanism event verbatim: Failed to pull image us-central1-doc

### case-41

- **结论**：`app/shippingservice` + `incorrect_image_reference` ｜ 标签 `app/shippingservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 130,336
- **raw 日志**：[results/1021_0229_tsm-v1-b102/raw/1021_0231_boutique-startup-41](../results/1021_0229_tsm-v1-b102/raw/1021_0231_boutique-startup-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: frontend error log carries only GCE-metadata noise (no downstream-call error), while an active TCP probe to shippingservice on the port its Service declares (50051) returns Connection Failed and endpoints/shippingservice has an empty ENDPOINTS column. Workload scan (anchor app=shippingservice) shows the only outlier row: pod shippingservice-8f77849b9-d7h52 0/1 ErrImagePull (all other 10 services 1/1 Running, RESTARTS=0) and deployment shippingservice 0/1 AVAILABLE 0. Pod detail mechanism events: Warning Failed - Failed to pull image 'us-central1-docker.pkg.dev/google-sample

### case-42

- **结论**：`app/adservice` + `missing_image_pull_secret` ｜ 标签 `app/adservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 191,286
- **raw 日志**：[results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-startup-42](../results/1021_0236_tsm-v1-b105/raw/1021_0236_boutique-startup-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing: only outlier is adservice-57758fbfbc-pc7rt 0/1 ImagePullBackOff (all other 10 boutique services 1/1 Running). Complaint side: CheckServiceConnectivity(adservice, 9555 - the port the Service spec declares) returned 'Connection Failed' and endpoints for adservice are empty; frontend error logs contain only GCE metadata noise (no ad-call error). Pod detail: PodScheduled=True on worker-01, container State=Waiting Reason=ImagePullBackOff, Restart Count=0, so scheduling/node/probe classes are excluded. Pod + namespace events carry the mechanism verbatim: 'Failed to pull image "ghcr.io/

### case-43

- **结论**：`app/checkoutservice` + `missing_image_pull_secret` ｜ 标签 `app/checkoutservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 127,697
- **raw 日志**：[results/1021_0239_tsm-v1-b107/raw/1021_0241_boutique-startup-43](../results/1021_0239_tsm-v1-b107/raw/1021_0241_boutique-startup-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing for namespace boutique: 10 of 11 services are 1/1 Running with RESTARTS 0; the single outlier is checkoutservice-5bb6f6875-txw5q at 0/1 ImagePullBackOff on worker-03. Complaint side read first: GetResources(endpoints, checkoutservice) returns an EMPTY ENDPOINTS column (no serving pod), and CheckServiceConnectivity on checkoutservice:5050 -- the port the Service spec itself declares (Service shows 5050/TCP, selector app=checkoutservice, port 5050 -> targetPort 5050, so selector/port mapping are correct) -- returns 'Connection Failed'. Pod sheet Events bind the mechanism: 'Failed to

### case-44

- **结论**：`app/currencyservice` + `missing_image_pull_secret` ｜ 标签 `app/currencyservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 124,048
- **raw 日志**：[results/1021_0243_tsm-v1-b109/raw/1021_0245_boutique-startup-44](../results/1021_0243_tsm-v1-b109/raw/1021_0245_boutique-startup-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows a single outlier: currencyservice-58fc98f787-56n7k is 0/1 ImagePullBackOff on worker-03 while the other 10 boutique pods are 1/1 Running and all 12 Services exist (quota branch excluded). The pod sheet's Warning Failed event pins the failing stage to the registry token step: 'Failed to pull image ghcr.io/google-samples/microservices-demo/currencyservice:v0.10.3: failed to resolve reference ...: failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Agoogle-samples%2Fmicroservices-demo%2Fcurrencyservi

### case-45

- **结论**：`app/emailservice` + `missing_image_pull_secret` ｜ 标签 `app/emailservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 149,338
- **raw 日志**：[results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-startup-45](../results/1021_0250_tsm-v1-b112/raw/1021_0250_boutique-startup-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows a single outlier: emailservice-6b89575c-jttr4 is 0/1 ErrImagePull on worker-03 while all other pods are 1/1 Running. Service emailservice is ClusterIP 10.68.137.100 5000/TCP (targetPort 8080) but endpoints/emailservice is empty, so checkoutservice->emailservice has no reachable backend (frontend error logs show only GCE metadata noise, no downstream call errors). Pod detail Warning/Failed event reads: 'Failed to pull image "ghcr.io/google-samples/microservices-demo/emailservice:v0.10.3": failed to pull and unpack image: failed to resolve reference: failed to authori

### case-46

- **结论**：`app/frontend` + `missing_image_pull_secret` ｜ 标签 `app/frontend` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 105,014
- **raw 日志**：[results/1021_0253_tsm-v1-b114/raw/1021_0253_boutique-startup-46](../results/1021_0253_tsm-v1-b114/raw/1021_0253_boutique-startup-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-caller signal: frontend error log shows container 'server' in pod frontend-5cb85b46cc-5fxvx is waiting to start: image can't be pulled. Pruned pod scan: all 10 other pods are 1/1 Running with RESTARTS=0; the single outlier is frontend-5cb85b46cc-5fxvx 0/1 ErrImagePull. Pod events give the failing stage: 'Failed to pull image "ghcr.io/google-samples/microservices-demo/frontend:v0.10.3": failed to resolve reference ...: failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Agoogle-samples%2Fmicroservices-demo%2Ff

### case-47

- **结论**：`app/paymentservice` + `missing_image_pull_secret` ｜ 标签 `app/paymentservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 130,094
- **raw 日志**：[results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-startup-47](../results/1021_0257_tsm-v1-b116/raw/1021_0257_boutique-startup-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability localized to paymentservice: pods listing shows the only outlier row 'paymentservice-67b78cc4cf-25w4q 0/1 ImagePullBackOff' while all 10 other pods are 1/1 Running; its caller-side surfaces confirm the outage - GetResources(endpoints, paymentservice) returns an empty ENDPOINTS column and CheckServiceConnectivity(paymentservice, 50051) returns 'Connection Failed' on the port the Service itself declares. The pod sheet carries the mechanism event: container State Waiting/Reason ErrImagePull with 'Failed to pull image ghcr.io/testuser177/paymentservice:v0.10.3: ... failed to

### case-48

- **结论**：`app/recommendationservice` + `missing_image_pull_secret` ｜ 标签 `app/recommendationservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 125,969
- **raw 日志**：[results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-startup-48](../results/1021_0301_tsm-v1-b118/raw/1021_0301_boutique-startup-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs carry only GCE metadata noise ("instance/attributes/cluster-name not defined"), no downstream call errors. Pruned workload listing shows the single outlier recommendationservice-655b6d9489-r9w5h at 0/1 ImagePullBackOff while all other boutique pods are 1/1 Running; CheckServiceConnectivity(recommendationservice, 8080 — the port its Service spec declares) returns "Connection Failed", matching 'Partial Service Unreachability'. Pod sheet events show the failing stage: "Failed to pull image "ghcr.io/google-samples/microservices-demo/recommendationservice:v0.10.3":

### case-49

- **结论**：`app/redis-cart` + `missing_image_pull_secret` ｜ 标签 `app/redis-cart` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 108,715
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0713_boutique-startup-49](../results/1021_0900_tsm-v1-fix/raw/1021_0713_boutique-startup-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: redis-cart-5b65d684-cxkh8 0/1 ImagePullBackOff on worker-01, all other boutique pods 1/1 Running with 0 restarts. endpoints/redis-cart has an EMPTY ENDPOINTS column (Service selector app=redis-cart matches but no ready backing pod), so cartservice -> redis-cart (the only DB leaf in GetServiceDependencies(frontend)) is unreachable while a cartservice:7070 connectivity probe returns 'Connection Succeeded' - matching 'Partial Service Unreachability'. Pod detail: State Waiting/Reason ErrImagePull, Image ghcr.io/testuser177/redis-cart:latest, no Container ID; ku

### case-50

- **结论**：`app/shippingservice` + `missing_image_pull_secret` ｜ 标签 `app/shippingservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 145,327
- **raw 日志**：[results/1021_0313_tsm-v1-b124/raw/1021_0313_boutique-startup-50](../results/1021_0313_tsm-v1-b124/raw/1021_0313_boutique-startup-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in pods listing: shippingservice-75687d9d75-nksb9 is 0/1 ErrImagePull on worker-03 while all 10 other boutique pods are 1/1 Running. Signal side: shippingservice Service declares 50051/TCP (ClusterIP 10.68.73.8) but its Endpoints list is empty and CheckServiceConnectivity(shippingservice,50051,boutique) returns 'Connection Failed' - matching 'Partial Service Unreachability' for frontend/checkoutservice callers (frontend error log itself carries only benign GCE metadata noise). Pod sheet: State Waiting, Reason ErrImagePull, PodScheduled=True; event 'Failed to pull image ghcr.io/goo

### case-51

- **结论**：`app/adservice` + `missing_image_pull_secret` ｜ 标签 `app/adservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 178,586
- **raw 日志**：[results/1021_0316_tsm-v1-b126/raw/1021_0316_boutique-startup-51](../results/1021_0316_tsm-v1-b126/raw/1021_0316_boutique-startup-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the only outlier in boutique: its sole pod adservice-59c6997996-xvw2b is '0/1 ErrImagePull' (then ImagePullBackOff) on worker-01 while all 10 other workloads are 1/1 Running, so endpoints/adservice has empty ENDPOINTS and CheckServiceConnectivity(adservice, 9555) - the port the Service itself declares - returns 'Connection Failed'. Pod events carry the mechanism: 'FailedToRetrieveImagePullSecret ... Unable to retrieve some image pull secrets (non-existent-secret)' and 'Failed to pull image ghcr.io/testuser177/solar-system:latest ... failed to authorize: failed to fetch anonymous t

### case-52

- **结论**：`app/cartservice` + `missing_image_pull_secret` ｜ 标签 `app/cartservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 147,781
- **raw 日志**：[results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-startup-52](../results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-startup-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice 是唯一离群工作负载：Pod cartservice-6b49f777f6-t6sv4 为 0/1、Status Pending、容器 Waiting/Reason ErrImagePull（其余 10 个 Pod 均 1/1 Running）。投诉侧闭环：Service cartservice 声明端口 7070/TCP，其 ENDPOINTS 为空，CheckServiceConnectivity(cartservice,7070) 返回 Connection Failed。机制事件逐字为：Failed to pull image "ghcr.io/testuser177/solar-system:latest": ... failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Atestuser177%2Fsolar-system%3Apull&service=ghcr.io: 401 Unauthorized，并有 Warning FailedToRetrieveImagePullSecret: Unable to retrieve some im

### case-53

- **结论**：`app/checkoutservice` + `missing_image_pull_secret` ｜ 标签 `app/checkoutservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 149,274
- **raw 日志**：[results/1021_0322_tsm-v1-b129/raw/1021_0322_boutique-startup-53](../results/1021_0322_tsm-v1-b129/raw/1021_0322_boutique-startup-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice Service (declared port 5050/TCP) has an empty endpoints list while all other boutique pods are Running 1/1, localizing the availability disruption to app checkoutservice. Its pod checkoutservice-6c445d9cbc-27r9x is 0/1 in ErrImagePull/ImagePullBackOff with 0 restarts and PodScheduled=True, so scheduling/probe/SA are not the break. Pod events give the mechanism verbatim: 'Failed to pull image "ghcr.io/testuser177/solar-system:latest": failed to resolve reference "ghcr.io/testuser177/solar-system:latest": failed to authorize: failed to fetch anonymous token: unexpected status fro

### case-54

- **结论**：`app/currencyservice` + `missing_image_pull_secret` ｜ 标签 `app/currencyservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 144,144
- **raw 日志**：[results/1021_0324_tsm-v1-b130/raw/1021_0325_boutique-startup-54](../results/1021_0324_tsm-v1-b130/raw/1021_0325_boutique-startup-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: currencyservice-755b87b768-587jl 0/1 ImagePullBackOff on worker-01, all other services 1/1 Running with 0 restarts (rules out restart/OOM/scheduling branches). Complaint side: frontend error logs contain only benign metadata noise and GetAlerts shows no anomaly; the currencyservice Service declares port 7000/TCP but its endpoints list is empty and CheckServiceConnectivity on port 7000 returns Connection Failed. Pod events give the mechanism verbatim: 'FailedToRetrieveImagePullSecret ... Unable to retrieve some image pull secrets (ghcr-secret)' and 'Failed t

### case-55

- **结论**：`app/frontend` + `missing_image_pull_secret` ｜ 标签 `app/frontend` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 106,225
- **raw 日志**：[results/1021_0328_tsm-v1-b132/raw/1021_0328_boutique-startup-55](../results/1021_0328_tsm-v1-b132/raw/1021_0328_boutique-startup-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend is the only outlier pod: 'frontend-7869fc75b4-9499w 0/1 ErrImagePull 0 30s' on worker-03, while all 10 peer pods are 1/1 Running; GetAlerts() reported no metric anomalies. Complaint-side error log (GetErrorLogs frontend): 'container server in pod frontend-7869fc75b4-9499w is waiting to start: image can't be pulled'. Pod detail shows State Waiting/Reason ErrImagePull with Node already assigned (Scheduled to worker-03), so scheduling is not the mechanism. The failing stage in the kubelet message is the registry token step, not DNS or manifest: 'failed to authorize: failed 

### case-56

- **结论**：`app/paymentservice` + `missing_image_pull_secret` ｜ 标签 `app/paymentservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 150,571
- **raw 日志**：[results/1021_0331_tsm-v1-b133/raw/1021_0332_boutique-startup-56](../results/1021_0331_tsm-v1-b133/raw/1021_0332_boutique-startup-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side first: frontend (entry caller) error log shows only GCE metadata noise, no downstream call errors; the pod inventory then shows the single outlier row paymentservice-5b54b484cf-crf67 0/1 ErrImagePull (Deployment paymentservice AVAILABLE 0/1) while all other 10 boutique services are 1/1 Running. Pod describe pins the mechanism at the image-pull token stage: Warning Failed - failed to pull image 'ghcr.io/testuser177/solar-system:latest': failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Atestuser177%2Fs

### case-57

- **结论**：`app/productcatalogservice` + `missing_image_pull_secret` ｜ 标签 `app/productcatalogservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 145,350
- **raw 日志**：[results/1021_0335_tsm-v1-b135/raw/1021_0335_boutique-startup-57](../results/1021_0335_tsm-v1-b135/raw/1021_0335_boutique-startup-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only productcatalogservice is drained: pod productcatalogservice-7675b8db49-rjsvp is 0/1 ImagePullBackOff (deployment AVAILABLE 0/1) while the other 10 boutique pods are 1/1 Running. Pod events bind the mechanism verbatim: 'FailedToRetrieveImagePullSecret ... Unable to retrieve some image pull secrets (non-existent-registry-secret)' and 'Failed to pull image "ghcr.io/testuser177/solar-system:latest": ... failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?...: 401 Unauthorized' — the request reached the registry and was rejected at 

### case-58

- **结论**：`app/recommendationservice` + `missing_image_pull_secret` ｜ 标签 `app/recommendationservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 143,600
- **raw 日志**：[results/1021_0337_tsm-v1-b136/raw/1021_0338_boutique-startup-58](../results/1021_0337_tsm-v1-b136/raw/1021_0338_boutique-startup-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the sole outlier recommendationservice-78d74cd666-2qw2g at 0/1 ErrImagePull on worker-01 (all other 10 boutique pods 1/1 Running); the Service recommendationservice declares port 8080 and its endpoints object has NO ready addresses, so callers have no serving backend. Pod sheet: State Waiting/Reason ErrImagePull, Image ghcr.io/testuser177/solar-system:latest, PodScheduled True. Pull failure stage is the token step: 'failed to resolve reference ... failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?...: 401 Unauth

### case-59

- **结论**：`app/redis-cart` + `missing_image_pull_secret` ｜ 标签 `app/redis-cart` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 126,501
- **raw 日志**：[results/1021_0341_tsm-v1-b138/raw/1021_0341_boutique-startup-59](../results/1021_0341_tsm-v1-b138/raw/1021_0341_boutique-startup-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing in boutique shows a single outlier: redis-cart-69f96b5bd6-6t72v 0/1 ImagePullBackOff on worker-01, while all 10 other pods are 1/1 Running with 0 restarts. Complaint side: cartservice (the caller on edge cartservice -> redis-cart) has no error logs, and 'endpoints redis-cart' returns an EMPTY endpoints column, so cart calls have no backend. Pod detail carries the mechanism: container redis State Waiting/Reason ErrImagePull, events read 'Failed to pull image \"ghcr.io/testuser177/redis:alpine\": failed to authorize: failed to fetch anonymous token: unexpected status from GET request

### case-60

- **结论**：`app/redis-cart` + `volume_mount_permission_denied` ｜ 标签 `app/redis-cart` + `volume_mount_permission_denied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 161,571
- **raw 日志**：[results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-startup-60](../results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-startup-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal first from the entry caller: frontend error logs (118/530) all report cartservice -> redis-cart:6379 failures, e.g. 'Can't access cart storage. StackExchange.Redis.RedisConnectionException ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379'. The Service declares port 6379/TCP (not a guessed port) and its selector app=redis-cart matches the pod labels, but GetResources(endpoints, redis-cart) returned an EMPTY endpoints list, and CheckServiceConnectivity(redis-cart:6379) failed from worker-01/02/03 alike - a service-side outage, not 

### case-61

- **结论**：`app/redis-cart` + `volume_mount_permission_denied` ｜ 标签 `app/redis-cart` + `volume_mount_permission_denied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 119,400
- **raw 日志**：[results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-startup-61](../results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-startup-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs (118 errors) all report cart storage failure - 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage. StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379', with the client identified as cartservice-7c5f46fc47-546js; topology frontend -> cartservice -> redis-cart makes redis-cart the broken leaf. Pod sweep: only outlier row is redis-cart-79f6dc5894-rcnrc 0/1 CrashLoopBackOff RESTARTS 4, all other 10 pods 1/1 Running. Pod detail: State Waiting Reason CrashLoopBackOff, Last State Terminated Re

### case-62

- **结论**：`app/redis-cart` + `volume_mount_permission_denied` ｜ 标签 `app/redis-cart` + `volume_mount_permission_denied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 151,529
- **raw 日志**：[results/1021_0351_tsm-v1-b143/raw/1021_0351_boutique-startup-62](../results/1021_0351_tsm-v1-b143/raw/1021_0351_boutique-startup-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial outage on the cart path only: frontend error log (124/515, 24.1%) shows 76x 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379, clientName: cartservice-7c5f46fc47-tgjlz'. Pod listing outlier: redis-cart-79598c9984-cncj7 0/1 CrashLoopBackOff, RESTARTS 4; Deployment redis-cart READY 0/1 AVAILABLE 0; Service redis-cart ENDPOINTS empty -> no reachable backend. Pod detail: Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 14

