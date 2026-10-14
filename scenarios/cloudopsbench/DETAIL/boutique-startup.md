# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **46/62** 题：JRA ✅44 ❌2 ｜ 证据链全闭 46 ｜ token 中位 85,131 ｜ 生成 2026-10-14T05:24:30.653Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 58,131 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 186,507 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 83,339 | 0 | 0 | 1013_1245_imagecls-verify1 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 66,407 | 0 | 0 | 1013_1503_inorder4-v3b16 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 65,786 | 0 | 0 | 1013_1842_inorder4-v3b32 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 162,636 | 0 | 0 | 1014_0211_inorder4-v3b98 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 86,360 | 0 | 0 | 1014_0214_inorder4-v3b99 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.1304 | 24 | 126,739 | 0 | 0 | 1014_0216_inorder4-v3b100 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 70,064 | 0 | 0 | 1014_0218_inorder4-v3b101 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 87,576 | 0 | 0 | 1014_0221_inorder4-v3b102 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 8 | 66,622 | 0 | 0 | 1014_0223_inorder4-v3b103 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 95,296 | 0 | 0 | 1014_0225_inorder4-v3b104 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 88,390 | 0 | 0 | 1014_0228_inorder4-v3b105 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 193,250 | 0 | 0 | 1014_0229_inorder4-v3b106 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 85,443 | 0 | 0 | 1014_0232_inorder4-v3b107 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 66,033 | 0 | 0 | 1014_0234_inorder4-v3b108 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 83,026 | 0 | 0 | 1014_0236_inorder4-v3b109 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 67,313 | 0 | 0 | 1014_0238_inorder4-v3b110 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 87,061 | 0 | 0 | 1014_0241_inorder4-v3b111 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 68,387 | 0 | 0 | 1014_0243_inorder4-v3b112 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 68,089 | 0 | 0 | 1014_0245_inorder4-v3b113 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 66,102 | 0 | 0 | 1014_0248_inorder4-v3b114 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 67,810 | 0 | 0 | 1014_0250_inorder4-v3b115 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 69,169 | 0 | 0 | 1014_0252_inorder4-v3b116 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 84,589 | 0 | 0 | 1014_0254_inorder4-v3b117 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 85,497 | 0 | 0 | 1014_0256_inorder4-v3b118 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 85,131 | 0 | 0 | 1014_1226_inorder4-v3b119 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 146,428 | 0 | 0 | 1014_1230_inorder4-v3b120 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 66,917 | 0 | 0 | 1014_1234_inorder4-v3b121 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 106,699 | 0 | 0 | 1014_1236_inorder4-v3b122 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 67,954 | 0 | 0 | 1014_1239_inorder4-v3b123 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 100,087 | 0 | 0 | 1014_1241_inorder4-v3b124 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 72,116 | 0 | 0 | 1014_1245_inorder4-v3b125 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 88,927 | 0 | 0 | 1014_1247_inorder4-v3b126 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 364,202 | 0 | 0 | 1014_1250_inorder4-v3b127 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 92,222 | 0 | 0 | 1014_1252_inorder4-v3b128 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 72,365 | 0 | 0 | 1014_1255_inorder4-v3b129 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 123,783 | 0 | 0 | 1014_1257_inorder4-v3b130 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 84,149 | 0 | 0 | 1014_1300_inorder4-v3b131 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 85,204 | 0 | 0 | 1014_1302_inorder4-v3b132 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 66,551 | 0 | 0 | 1014_1305_inorder4-v3b133 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 195,861 | 0 | 0 | 1014_1308_inorder4-v3b134 | 全对·链闭 |
| [43](#case-43) | 1 | 0 | 0 | 1 | 1 | 1 | 0.2308 | 14 | 71,400 | 0 | 0 | 1014_1312_inorder4-v3b135 | 未命中 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 28 | 160,246 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [45](#case-45) | 1 | 0 | 0 | 1 | 1 | 1 | 0.2143 | 15 | 88,419 | 0 | 0 | 1014_1318_inorder4-v3b137 | 未命中 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 69,579 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `image_registry_dns_failure` ｜ 标签 `app/adservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 58,131
- **raw 日志**：[results/1012_1447_inorder4-v3b2/raw/1012_1449_boutique-startup-1](../results/1012_1447_inorder4-v3b2/raw/1012_1449_boutique-startup-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique 首轮 pods 扫描中唯一离群对象为 adservice-7b5ff9bbd7-r2s5r：READY 0/1、STATUS ErrImagePull，其余 10 个 pod 均 1/1 Running；Deployment adservice 为 0/1 AVAILABLE 且 Endpoints(adservice) 为空。DescribeResource(pod) events 原文显示容器从未启动，断点在镜像获取环节而非调度：Pulling image "ghost-registry.example.net/google-samples/microservices-demo/adservice:v0.10.3" 后 Failed，failed to resolve reference ... dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host，随后 BackOff -> ImagePullBackOff。GetAppYAML(adservice) 确认 Pod 模板 image 即为该主机名（并非 tag/仓库路径错误，也无 manifest unknown），ServiceAccount adservice 已存在、探针 grpc:955

### case-2

- **结论**：`app/cartservice` + `image_registry_dns_failure` ｜ 标签 `app/cartservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 186,507
- **raw 日志**：[results/1012_2040_inorder4-v3b8/raw/1012_2158_boutique-startup-2](../results/1012_2040_inorder4-v3b8/raw/1012_2158_boutique-startup-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only cartservice is broken: pods listing shows 'cartservice-59798f66d6-87776 0/1 ImagePullBackOff' (all other 10 boutique pods 1/1 Running); deployments show cartservice 0/1 AVAILABLE; endpoints/cartservice is empty and CheckServiceConnectivity(cartservice:7070) = Connection Failed, which is the reported availability disruption. The mechanism event is verbatim: 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/cartservice:v0.10.3": failed to resolve reference ...: dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host' -> ErrImagePull -> Im

### case-3

- **结论**：`app/checkoutservice` + `image_registry_dns_failure` ｜ 标签 `app/checkoutservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 83,339
- **raw 日志**：[results/1013_1245_imagecls-verify1/raw/1013_1246_boutique-startup-3](../results/1013_1245_imagecls-verify1/raw/1013_1246_boutique-startup-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice is the only one of the 12 boutique services with an empty Endpoints list (GetResources endpoints) and an active TCP probe to checkoutservice:5050 returned 'Connection Failed', matching the partial-unreachability symptom; the pod listing shows the single outlier checkoutservice-7bbc84d447-gfr6r as 0/1 ErrImagePull on worker-03 while all other pods are 1/1 Running. The pod's Warning events and its deployment 0/1 AVAILABLE state show the container never started: kubelet 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/checkoutservice:v0.10.3" ...

### case-4

- **结论**：`app/frontend` + `image_registry_dns_failure` ｜ 标签 `app/frontend` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 66,407
- **raw 日志**：[results/1013_1503_inorder4-v3b16/raw/1013_1504_boutique-startup-4](../results/1013_1503_inorder4-v3b16/raw/1013_1504_boutique-startup-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: CheckServiceConnectivity(frontend:80) returned 'Connection Failed' while all 11 other boutique services remained healthy, and the deployments listing showed only 'frontend 0/1 AVAILABLE'. Object layer: pod frontend-7968b59db9-zs7zp was the unique outlier (0/1 ErrImagePull, then ImagePullBackOff) on worker-03, with PodScheduled=True so no scheduling/capacity cause. Mechanism event (kubelet on worker-03): 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/frontend:v0.10.3": ... dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such ho

### case-5

- **结论**：`app/productcatalogservice` + `image_registry_dns_failure` ｜ 标签 `app/productcatalogservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 65,786
- **raw 日志**：[results/1013_1842_inorder4-v3b32/raw/1013_1843_boutique-startup-5](../results/1013_1842_inorder4-v3b32/raw/1013_1843_boutique-startup-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one workload is out: pods listing shows productcatalogservice-67655fb89c-jmg58 at 0/1 with STATUS ErrImagePull/ImagePullBackOff, and its owner deployment app=productcatalogservice reports 0/1 READY, 0 AVAILABLE; all other 10 boutique services are 1/1 Running. This matches the 'partial' nature of the symptom: productcatalogservice's Service has NO endpoints bound (GetResources endpoints → empty ENDPOINTS) and an active probe on its declared port 3550 fails (CheckServiceConnectivity productcatalogservice:3550 → Connection Failed), so no container ever became Ready. The kubelet mechanism eve

### case-6

- **结论**：`app/redis-cart` + `image_registry_dns_failure` ｜ 标签 `app/redis-cart` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 162,636
- **raw 日志**：[results/1014_0211_inorder4-v3b98/raw/1014_0212_boutique-startup-6](../results/1014_0211_inorder4-v3b98/raw/1014_0212_boutique-startup-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间 11 个实例中唯一离群行为 redis-cart-7cfcd8578b-pbb9c：0/1 ErrImagePull（ImagePullBackOff），其余服务均 1/1 Running。Pod 已成功调度（PodScheduled True）、PVC redis-cart-pvc Bound、探针/端口配置正常，断点在容器启动的镜像拉取环节。DescribeResource(pod) 的 kubelet 事件逐字给出机制：Failed to pull image "ghost-registry.example.net/redis:alpine": failed to resolve reference ... Head "https://ghost-registry.example.net/v2/redis/manifests/alpine": dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host —— 即该服务镜像引用的 registry 主机名无法解析。容器从未启动（GetRecentLogs: container "redis" ... is waiting to start: image can't be pulled），Service redis

### case-7

- **结论**：`app/checkoutservice` + `image_registry_dns_failure` ｜ 标签 `app/checkoutservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 86,360
- **raw 日志**：[results/1014_0214_inorder4-v3b99/raw/1014_0215_boutique-startup-7](../results/1014_0214_inorder4-v3b99/raw/1014_0215_boutique-startup-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: checkoutservice-69985d5ddf-sfx79 is 0/1 ErrImagePull on worker-01 (all 10 sibling services 1/1 Running), and the deployment reports 0/1 AVAILABLE with desired replicas=1 (not zero-replica). Symptom side confirms loss of availability: CheckServiceConnectivity(checkoutservice:5050) returns 'Connection Failed' and the endpoints listing shows checkoutservice with EMPTY ENDPOINTS while every other service has a bound address. The pod's own event surface carries the mechanism verbatim: "Failed to pull image \"internal-registry.corp.local/google-samples/microservi

### case-8

- **结论**：`app/currencyservice` + `image_registry_dns_failure` ｜ 标签 `app/currencyservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1304 · steps 24 · tokens 126,739
- **raw 日志**：[results/1014_0216_inorder4-v3b100/raw/1014_0217_boutique-startup-8](../results/1014_0216_inorder4-v3b100/raw/1014_0217_boutique-startup-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice pod 'currencyservice-749887fc48-j2mpn' is the only outlier in the namespace listing (0/1 ErrImagePull on worker-01, Restart Count 0, PodScheduled=True); every other pod, including 6 on the same node, is 1/1 Running. Its pod events name the mechanism verbatim: 'Failed to pull image "corp-registry.internal/google-samples/microservices-demo/currencyservice:v0.10.3": ... dial tcp: lookup corp-registry.internal on 127.0.0.53:53: no such host' followed by ErrImagePull -> BackOff -> ImagePullBackOff. The victim's own signal confirms unavailability: endpoints for currencyservice are em

### case-9

- **结论**：`app/emailservice` + `image_registry_dns_failure` ｜ 标签 `app/emailservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 70,064
- **raw 日志**：[results/1014_0218_inorder4-v3b101/raw/1014_0220_boutique-startup-9](../results/1014_0218_inorder4-v3b101/raw/1014_0220_boutique-startup-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only emailservice is affected: pods listing shows the sole outlier emailservice-7f65596fc8-dvm5r 0/1 ErrImagePull (rest 1/1 Running), and deployments show emailservice 0/1 available. Victim signal confirms unreachability: endpoints listing for emailservice is empty, TCP probe to its declared port 5000 returns Connection Failed, and its pod's error log reads 'container "server" ... is waiting to start: image can't be pulled'. The pod sheet carries the deciding mechanism: kubelet events 'Failed to pull image "corp-registry.internal/microservices-demo/emailservice:v0.10.3": ... failed to resolve 

### case-10

- **结论**：`app/frontend` + `image_registry_dns_failure` ｜ 标签 `app/frontend` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 87,576
- **raw 日志**：[results/1014_0221_inorder4-v3b102/raw/1014_0222_boutique-startup-10](../results/1014_0221_inorder4-v3b102/raw/1014_0222_boutique-startup-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' enters via the workload inventory: pod frontend-6b6f5c6d86-82br7 is 0/1 ErrImagePull while all other boutique pods are 1/1 Running. The victim's own signal confirms the availability impact: the frontend and frontend-external Services are the only ones with an empty ENDPOINTS column, the connectivity probe to frontend:80 returns 'Connection Failed', and the caller-side log reports 'container "server" in pod "frontend-6b6f5c6d86-82br7" is waiting to start: trying and failing to pull image'. The mechanism event on the pod sheet reads: 'Failed to pull ima

### case-11

- **结论**：`app/paymentservice` + `image_registry_dns_failure` ｜ 标签 `app/paymentservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 8 · tokens 66,622
- **raw 日志**：[results/1014_0223_inorder4-v3b103/raw/1014_0224_boutique-startup-11](../results/1014_0223_inorder4-v3b103/raw/1014_0224_boutique-startup-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-scoped inventory (GetResources pods, boutique) shows exactly one outlier: paymentservice-77758b64c-57ph2 is 0/1 ImagePullBackOff while all other 10 boutique services are 1/1 Running — the 'partial' in the unreachability. Its own event segment names the mechanism verbatim: 'Failed to pull image internal-registry.corp.local/google-samples/microservices-demo/paymentservice:v0.10.3 ... failed to resolve reference ... dial tcp: lookup internal-registry.corp.local: Temporary failure in name resolution', followed by ErrImagePull and ImagePullBackOff; container state is Waiting/ErrImagePull 

### case-12

- **结论**：`app/productcatalogservice` + `image_registry_dns_failure` ｜ 标签 `app/productcatalogservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 95,296
- **raw 日志**：[results/1014_0225_inorder4-v3b104/raw/1014_0226_boutique-startup-12](../results/1014_0225_inorder4-v3b104/raw/1014_0226_boutique-startup-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (ns boutique, wide) shows a single outlier: productcatalogservice-54fc885f7f-49hkh 0/1 ErrImagePull on worker-01, while the other 10 pods are 1/1 Running on the same/other workers. Pod events read verbatim: 'Failed to pull image "corp-registry.internal/productcatalogservice:v0.10.3": ... dial tcp: lookup corp-registry.internal on 127.0.0.53:53: no such host' -> ErrImagePull / ImagePullBackOff; Container ID empty, State Waiting, so the container never started. Config face (GetAppYAML) confirms image corp-registry.internal/productcatalogservice:v0.10.3, while the deployments listing

### case-13

- **结论**：`app/shippingservice` + `image_registry_dns_failure` ｜ 标签 `app/shippingservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 88,390
- **raw 日志**：[results/1014_0228_inorder4-v3b105/raw/1014_0229_boutique-startup-13](../results/1014_0228_inorder4-v3b105/raw/1014_0229_boutique-startup-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pod listing (wide) shows a single outlier: shippingservice-7465494576-gzcwz 0/1 ErrImagePull on worker-03 (all 10 other pods 1/1 Running). Victim-side signal confirms the outage: CheckServiceConnectivity(shippingservice:50051) returned 'Connection Failed' and its error log reads 'container "server" in pod "shippingservice-7465494576-gzcwz" is waiting to start: image can't be pulled'. Deployment shippingservice reads READY 0/1, AVAILABLE 0, IMAGES = corp-registry.internal/google-samples/microservices-demo/shippingservice:v0.10.3. Pod events give the mechanism verbatim: Failed

### case-14

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 193,250
- **raw 日志**：[results/1014_0229_inorder4-v3b106/raw/1014_0231_boutique-startup-14](../results/1014_0229_inorder4-v3b106/raw/1014_0231_boutique-startup-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing in boutique shows a single outlier: adservice-84b8c87d54-fhrvj 0/1 ErrImagePull on worker-03 (all other 10 boutique services 1/1 Running), and deployments show adservice 0/1 AVAILABLE (1 up-to-date, 0 available). The victim's own signal: connectivity probe to adservice:9555 fails (Connection Failed) while its Service object is intact (selector app=adservice, port 9555->9555 matching the pod label), so the break is the pod never becoming Ready. The pod's mechanism event gives the pull message verbatim: Image us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.

### case-15

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 85,443
- **raw 日志**：[results/1014_0232_inorder4-v3b107/raw/1014_0233_boutique-startup-15](../results/1014_0232_inorder4-v3b107/raw/1014_0233_boutique-startup-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice endpoints list is EMPTY and CheckServiceConnectivity(currencyservice:7000) returns 'Connection Failed' (symptom side). Workload scan shows exactly one outlier among 12 pods: currencyservice-f9bc5fbdc-5bwxg = 0/1 ImagePullBackOff on worker-03; owner chain currencyservice 0/1 UP-TO-DATE 1 AVAILABLE 0. Pod sheet carries the mechanism: kubelet 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.33": rpc error: code = NotFound desc = ... failed to resolve reference ... not found' plus 'Error: ErrImagePull' and 'Back-off pulling i

### case-16

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 66,033
- **raw 日志**：[results/1014_0234_inorder4-v3b108/raw/1014_0235_boutique-startup-16](../results/1014_0234_inorder4-v3b108/raw/1014_0235_boutique-startup-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pods scan shows a single outlier: emailservice-85cf669ff7-r9vtk is 0/1 ErrImagePull on worker-03 (all other 10 pods 1/1 Running, RESTARTS=0; no metric alerts). The pod's state is Waiting/Reason=ErrImagePull with empty Container ID (container never started), and its events read: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10.33": rpc error: code = NotFound ... not found', followed by ErrImagePull and ImagePullBackOff. The NotFound (not a DNS 'no such host' and not a 401 authorization) error proves the registry was reached an

### case-17

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 83,026
- **raw 日志**：[results/1014_0236_inorder4-v3b109/raw/1014_0238_boutique-startup-17](../results/1014_0236_inorder4-v3b109/raw/1014_0238_boutique-startup-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in namespace boutique shows a single outlier: frontend-f86d57544-9gsst is 0/1 with STATUS=ImagePullBackOff (all other 10 services are 1/1 Running). The pod's own kubelet events read: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.3x": rpc error: code = NotFound desc = ... failed to resolve reference ...: not found' followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff' — the registry hostname resolved and was reached, so the failure is NOT DNS (no 'no such host'), it is a non-existent image reference/tag. The container i

### case-18

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 67,313
- **raw 日志**：[results/1014_0238_inorder4-v3b110/raw/1014_0241_boutique-startup-18](../results/1014_0238_inorder4-v3b110/raw/1014_0241_boutique-startup-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: productcatalogservice-77b9f6655f-g54pr is 0/1 ImagePullBackOff on worker-03 (all other 10 services 1/1 Running, 0 restarts). The victim's own signal confirms unreachability: endpoints/productcatalogservice has an empty ENDPOINTS column and CheckServiceConnectivity(productcatalogservice:3550) returns 'Connection Failed'. Pod describe shows State Waiting/ImagePullBackOff, Restart Count 0, with the event: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/productcatalogservice:v0.10.33": rpc error: code = NotFound d

### case-19

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 87,061
- **raw 日志**：[results/1014_0241_inorder4-v3b111/raw/1014_0243_boutique-startup-19](../results/1014_0241_inorder4-v3b111/raw/1014_0243_boutique-startup-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability localized to recommendationservice: its pod recommendationservice-6f4d5b7797-27652 is the only outlier in the boutique namespace (0/1, STATUS ErrImagePull, RESTARTS 0), all other 10 workloads are 1/1 Running; its deployment shows 0/1 AVAILABLE (1 desired, 0 ready) and CheckServiceConnectivity(recommendationservice, 8080) returns 'Connection Failed', confirming the service has no ready endpoint while its caller frontend carries RECOMMENDATION_SERVICE_ADDR=recommendationservice:8080. Pod sheet shows container never created (Container ID empty, State Waiting/ErrImagePull) a

### case-20

- **结论**：`app/redis-cart` + `incorrect_image_reference` ｜ 标签 `app/redis-cart` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 68,387
- **raw 日志**：[results/1014_0243_inorder4-v3b112/raw/1014_0244_boutique-startup-20](../results/1014_0243_inorder4-v3b112/raw/1014_0244_boutique-startup-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique namespace pods listing shows a single outlier: redis-cart-5449b7fcb4-zs6j6 is 0/1 ImagePullBackOff while all other 10 services are 1/1 Running. DescribeResource on that pod shows PodScheduled=True (scheduling fine) but container State=Waiting/ImagePullBackOff with kubelet events 'Back-off pulling image "redis:alpinee"' and 'Failed to pull image "redis:alpinee": failed to resolve reference "docker.io/library/redis:alpinee": unexpected status from HEAD request to https://docker.nju.edu.cn/library/redis/manifests/alpinee?ns=docker.io: 403 Forbidden'. GetAppYAML(redis-cart) confirms the w

### case-21

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 68,089
- **raw 日志**：[results/1014_0245_inorder4-v3b113/raw/1014_0247_boutique-startup-21](../results/1014_0245_inorder4-v3b113/raw/1014_0247_boutique-startup-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing shows a single outlier: currencyservice-7c7bd666d4-5jzs6 with 0/1 Ready and STATUS ErrImagePull (all other 10 boutique pods are 1/1 Running), matching the 'partial' unreachability symptom. A connectivity probe on the port its Service declares (CheckServiceConnectivity currencyservice:7000) returns 'Connection Failed'. The pod's own sheet shows PodScheduled=True on worker-03 (so no scheduling fault) and the mechanism event verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservice:v0.10.999": rpc error: code = No

### case-22

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 66,102
- **raw 日志**：[results/1014_0248_inorder4-v3b114/raw/1014_0249_boutique-startup-22](../results/1014_0248_inorder4-v3b114/raw/1014_0249_boutique-startup-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing (wide) shows a single outlier: emailservice-845967bc5c-tkgs9 0/1 ErrImagePull on worker-03, while the other 10 boutique services are 1/1 Running with 0 restarts. The pod's own event段 carries the mechanism: 'Failed to pull image us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.99.9: failed to resolve reference ...: not found' -> ErrImagePull -> ImagePullBackOff; PodScheduled=True and Initialized=True, so scheduling/admission passed and the break is at image reference resolution. Config face confirms the reference: GetAppYAML(emailservice) declares image t

### case-23

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 67,810
- **raw 日志**：[results/1014_0250_inorder4-v3b115/raw/1014_0251_boutique-startup-23](../results/1014_0250_inorder4-v3b115/raw/1014_0251_boutique-startup-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: all pods 1/1 Running except frontend-5f87c65786-gpl9k = 0/1 ErrImagePull (0 restarts). DescribeResource(frontend pod) shows the mechanism verbatim: 'Failed to pull image us-central1-docker.pkg.dev/google-samples/microservices-demo/frontend:v0.10.999: failed to resolve reference ... :v0.10.999: not found' -> ErrImagePull -> ImagePullBackOff. This is a reference rejection, not a resolution failure: no 'lookup ... no such host', the registry host resolved and every peer pod pulled successfully from the same registry (cartservice uses .../microservices-demo/cartservice:v0.10.3)

### case-24

- **结论**：`app/paymentservice` + `incorrect_image_reference` ｜ 标签 `app/paymentservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 69,169
- **raw 日志**：[results/1014_0252_inorder4-v3b116/raw/1014_0253_boutique-startup-24](../results/1014_0252_inorder4-v3b116/raw/1014_0253_boutique-startup-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain closed on paymentservice: its Service endpoints list is empty (all 10 peer services have bound endpoints) = the reported partial unreachability. Object layer shows a single outlier: pod paymentservice-fd7bf684d-9zf2b is 0/1 ImagePullBackOff while the other 10 pods are 1/1 Running. Owner chain confirms: deployment paymentservice 0/1 UP-TO-DATE, 0 AVAILABLE (peers 1/1), so the workload is drained and the Service has no ready backend. Mechanism event on the pod sheet names the object and instance verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microse

### case-25

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 84,589
- **raw 日志**：[results/1014_0254_inorder4-v3b117/raw/1014_0255_boutique-startup-25](../results/1014_0254_inorder4-v3b117/raw/1014_0255_boutique-startup-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Workload scan in boutique shows a single outlier: productcatalogservice-6bcf695fc8-jksfd is 0/1 in ImagePullBackOff while all other 10 services are 1/1 Running with 0 restarts; no metric alerts. The pod's own events read 'Successfully assigned ... to worker-03' (scheduling fine, PodScheduled=True) followed by 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/productcatalogservice:v0.10.999": rpc error: code = NotFound ... failed to resolve reference ... not found' and 'Error: ErrImagePull / ImagePullBackOff' — a manifest-not-found, not a DNS ('no such host') o

### case-26

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 85,497
- **raw 日志**：[results/1014_0256_inorder4-v3b118/raw/1014_0257_boutique-startup-26](../results/1014_0256_inorder4-v3b118/raw/1014_0257_boutique-startup-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Single outlier in the boutique pods inventory: recommendationservice-575dc57964-m94kz is 0/1 ErrImagePull (all other 10 pods 1/1 Running); the recommendationservice Service has an empty endpoints list while every other Service has bound endpoints, matching the 'partial unreachability' symptom. The pod sheet shows Status Pending, container State Waiting/Reason ErrImagePull, empty Container ID, and only Normal Scheduled (so scheduling and pod creation succeeded). The kubelet pull message is the decisive discriminator: 'Failed to pull image .../recommendationservice:v0.10.999: rpc error: code = N

### case-27

- **结论**：`app/shippingservice` + `incorrect_image_reference` ｜ 标签 `app/shippingservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 85,131
- **raw 日志**：[results/1014_1226_inorder4-v3b119/raw/1014_1229_boutique-startup-27](../results/1014_1226_inorder4-v3b119/raw/1014_1229_boutique-startup-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows exactly one outlier pod: shippingservice-7bd784d444-fz7w4 = 0/1 ErrImagePull on worker-03, while all 10 sibling pods are 1/1 Running. The shippingservice Service has EMPTY endpoints (all other services have backing IPs) and the connectivity probe on its declared port 50051 returns 'Connection Failed' — matching 'Partial Service Unreachability' (shippingservice is a leaf called only by frontend and checkoutservice). The deployment shows shippingservice 0/1 available, and pod events carry the mechanism verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-sa

### case-28

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 146,428
- **raw 日志**：[results/1014_1230_inorder4-v3b120/raw/1014_1232_boutique-startup-28](../results/1014_1230_inorder4-v3b120/raw/1014_1232_boutique-startup-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only outlier in the pod inventory is adservice-d8d4f4857-4jdhp (0/1, ErrImagePull, Pending) while all 10 other pods are 1/1 Running; the adservice Service has an EMPTY endpoints list (every other Service has backends) and CheckServiceConnectivity(adservice:9555) = Connection Failed -> the 'partial unreachability' victim is adservice. Deployment adservice shows 0/1 AVAILABLE with image us-central1-docker.pkg.dev/google-samples/microservices-demo/adservic:v0.10.3, and the pod event reads: Failed to pull image '.../adservic:v0.10.3': rpc error: code = NotFound ... not found ->

### case-29

- **结论**：`app/cartservice` + `incorrect_image_reference` ｜ 标签 `app/cartservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 66,917
- **raw 日志**：[results/1014_1234_inorder4-v3b121/raw/1014_1235_boutique-startup-29](../results/1014_1234_inorder4-v3b121/raw/1014_1235_boutique-startup-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing: only outlier is cartservice-6674f577f-l6z26 (0/1, ImagePullBackOff, worker-03); all other 10 pods 1/1 Running. Connectivity probe to cartservice's own declared port 7070 (ClusterIP service, selector app=cartservice) returned 'Connection Failed', and caller-side error logs (frontend/checkoutservice) are clean, localizing the break to the victim's own startup stage. Pod describe events show the mechanism verbatim: kubelet 'Failed to pull image us-central1-docker.pkg.dev/google-samples/microservices-demo/cartservcie:v0.10.3: rpc error: code = NotFound ... : not found' with State Wai

### case-30

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 106,699
- **raw 日志**：[results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-startup-30](../results/1014_1236_inorder4-v3b122/raw/1014_1237_boutique-startup-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 全量 pod 扫描中唯一离群行：checkoutservice-5cf79c94b8-fbcmx 0/1 ErrImagePull（其余 10 个服务 1/1 Running）。victim 自身信号面闭环：endpoints/checkoutservice 的 ENDPOINTS 为空，CheckServiceConnectivity(checkoutservice:5050) 返回 Connection Failed，deployments 显示 checkoutservice 0/1 AVAILABLE 0。pod detail 逐字给出机制事件：Image 'us-central1-docker.pkg.dev/google-samples/microservices-demo/checkoutservcie:v0.10.3'，State Waiting Reason ErrImagePull，Warning Failed 'failed to resolve reference ... not found'、'Error: ImagePullBackOff'——错误码为 NotFound（manifest 不存在），非 DNS 解析失败或认证失败。配置确认面 GetAppYAML(checkoutservice) 与 pod 一致，镜像名将 'check

### case-31

- **结论**：`app/currencyservice` + `incorrect_image_reference` ｜ 标签 `app/currencyservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 67,954
- **raw 日志**：[results/1014_1239_inorder4-v3b123/raw/1014_1240_boutique-startup-31](../results/1014_1239_inorder4-v3b123/raw/1014_1240_boutique-startup-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan showed one outlier: currencyservice-b68d5576c-gbl9k 0/1 ErrImagePull on worker-03, all other 10 boutique pods Running 1/1. Connectivity probe to the service's declared port currencyservice:7000 returned 'Connection Failed'. Pod describe carries the mechanism verbatim: kubelet 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/currencyservce:v0.10.3": rpc error: code = NotFound desc = failed to resolve reference ...: not found', followed by 'Error: ErrImagePull' and 'Error: ImagePullBackOff' (State: Waiting/ErrImagePull, Ready: False), while 'Norm

### case-32

- **结论**：`app/frontend` + `incorrect_image_reference` ｜ 标签 `app/frontend` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 100,087
- **raw 日志**：[results/1014_1241_inorder4-v3b124/raw/1014_1242_boutique-startup-32](../results/1014_1241_inorder4-v3b124/raw/1014_1242_boutique-startup-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing showed a single outlier: frontend-57b59b9fcb-2xxwt 0/1 ErrImagePull (all other 10 pods 1/1 Running, no node-side clustering; alerts empty). CheckServiceConnectivity(frontend:80) returned Connection Failed, matching the 'Service Availability Disruption' symptom. DescribeResource on that pod showed the mechanism verbatim: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/frnotend:v0.10.3": rpc error: code = NotFound ... failed to resolve reference ...: not found', with the sequence Pulling -> Failed(ErrImagePull) -> BackOff -> Ima

### case-33

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 72,116
- **raw 日志**：[results/1014_1245_inorder4-v3b125/raw/1014_1246_boutique-startup-33](../results/1014_1245_inorder4-v3b125/raw/1014_1246_boutique-startup-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pods listing in boutique shows exactly one READY/status outlier: recommendationservice-85f884c789-bdwls 0/1 ErrImagePull on worker-01 (all other 10 pods 1/1 Running). Its Service endpoints listing for recommendationservice is empty (ClusterIP 10.68.213.235, 8080/TCP, selector app=recommendationservice), which is the reachability break. DescribeResource on the pod shows State Waiting/Reason ErrImagePull with 'PodScheduled True' (already scheduled successfully to worker-01), ruling out node-side/scheduling causes, and the kubelet event reads: failed to pull image 'us-central1-dock

### case-34

- **结论**：`app/redis-cart` + `incorrect_image_reference` ｜ 标签 `app/redis-cart` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 88,927
- **raw 日志**：[results/1014_1247_inorder4-v3b126/raw/1014_1248_boutique-startup-34](../results/1014_1247_inorder4-v3b126/raw/1014_1248_boutique-startup-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only one workload is unhealthy - pod redis-cart-7966c4885c-ckxnh is 0/1 ImagePullBackOff on worker-01, while all other 10 services are 1/1 Running. The victim's own signal confirms unreachability: GetResources(endpoints, name=redis-cart) shows an EMPTY ENDPOINTS list and CheckServiceConnectivity(redis-cart, 6379) on its Service-declared port returns 'Connection Failed'; GetServiceDependencies shows redis-cart is the leaf store called only by cartservice, so this single failure explains the 'partial' unreachability. The mechanism event on the pod is kubelet: 'Failed to pull 

### case-35

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 364,202
- **raw 日志**：[results/1014_1250_inorder4-v3b127/raw/1014_1251_boutique-startup-35](../results/1014_1250_inorder4-v3b127/raw/1014_1251_boutique-startup-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain: inventory scan isolated exactly one outlier — pod adservice-6c84558cdf-82zhm 0/1 ImagePullBackOff on worker-03 (all other 10 boutique services 1/1 Running; deployment adservice 0/1 AVAILABLE). Victim-side signal: CheckServiceConnectivity(adservice,9555) = Connection Failed on the port the adservice Service itself declares (9555, selector app=adservice matches pod labels), consistent with zero Ready endpoints. Mechanism event: kubelet 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/adservice:v0.10_3": rpc error: code = NotFound ... : not f

### case-36

- **结论**：`app/cartservice` + `incorrect_image_reference` ｜ 标签 `app/cartservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 92,222
- **raw 日志**：[results/1014_1252_inorder4-v3b128/raw/1014_1253_boutique-startup-36](../results/1014_1252_inorder4-v3b128/raw/1014_1253_boutique-startup-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique namespace pods listing shows exactly one outlier: cartservice-667794f8fd-xt7sw 0/1 ErrImagePull (all other 10 services 1/1 Running). Its owner deployment cartservice reports 0/1 AVAILABLE (UP-TO-DATE 1); the Service 'cartservice' endpoints listing is EMPTY and CheckServiceConnectivity(cartservice:7070, boutique) returns 'Connection Failed', while caller frontend carries CART_SERVICE_ADDR=cartservice:7070 — this is the partial unreachability. Pod sheet: PodScheduled=True, container State Waiting/Reason ErrImagePull, RestartCount 0 (container never started). Mechanism event on the pod: 

### case-37

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 72,365
- **raw 日志**：[results/1014_1255_inorder4-v3b129/raw/1014_1256_boutique-startup-37](../results/1014_1255_inorder4-v3b129/raw/1014_1256_boutique-startup-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: single outlier checkoutservice-5b5b445b57-zq9zm is 0/1 ErrImagePull while all 10 other pods are 1/1 Running (RESTARTS 0). Pod sheet: State Waiting/ErrImagePull, PodScheduled=True on worker-03 (so no scheduling/capacity/quota fault), events verbatim: Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/checkoutservice:v0.1O.3": rpc error: code = NotFound ... failed to resolve reference ...: not found -> ErrImagePull -> ImagePullBackOff. The registry host resolves and answers NotFound (not 'no such host', not 'unauthorized'), so the class is a re

### case-38

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 123,783
- **raw 日志**：[results/1014_1257_inorder4-v3b130/raw/1014_1258_boutique-startup-38](../results/1014_1257_inorder4-v3b130/raw/1014_1258_boutique-startup-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique the pods inventory shows a single outlier row: emailservice-74fd46b589-7w9d9 is 0/1 with STATUS ImagePullBackOff while all other 10 pods are 1/1 Running. DescribeResource on that pod yields the mechanism event verbatim: kubelet 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/emailservice:v0.10_3": rpc error: code = NotFound desc = failed to resolve reference ... not found' -> State Waiting / Reason ImagePullBackOff. The error is a registry-side manifest-not-found (remote answered), not a DNS resolution failure (no 'no such host'/dial er

### case-39

- **结论**：`app/productcatalogservice` + `incorrect_image_reference` ｜ 标签 `app/productcatalogservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 84,149
- **raw 日志**：[results/1014_1300_inorder4-v3b131/raw/1014_1301_boutique-startup-39](../results/1014_1300_inorder4-v3b131/raw/1014_1301_boutique-startup-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows exactly one outlier: pod productcatalogservice-56d788b4bc-xslrd is 0/1 ErrImagePull on worker-03 (all other 10 services 1/1 Running, no alerts). Reachability probe to productcatalogservice:3550 (the port its Service declares) fails, and the deployment reads READY 0/1, AVAILABLE 0 — so its Service has no ready endpoints while its upstream callers are frontend, checkoutservice and recommendationservice, matching 'Partial Service Unreachability'. The pod sheet carries the mechanism verbatim: 'Failed to pull image ... productcatalogservice:v0.1O.3: failed to resolve refere

### case-40

- **结论**：`app/recommendationservice` + `incorrect_image_reference` ｜ 标签 `app/recommendationservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 85,204
- **raw 日志**：[results/1014_1302_inorder4-v3b132/raw/1014_1303_boutique-startup-40](../results/1014_1302_inorder4-v3b132/raw/1014_1303_boutique-startup-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique only recommendationservice is broken: pod recommendationservice-685d5cfc97-6br5n is 0/1 ErrImagePull and its deployment shows AVAILABLE 0/1, while the other 10 deployments are 1/1 Running. Pod is PodScheduled=True (not a scheduling fault); its events read: 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/recommendationservice:v0.10_3": rpc error: code = NotFound ... failed to resolve reference ...: not found' then 'Error: ErrImagePull' and 'Error: ImagePullBackOff'. GetAppYAML(recommendationservice) shows the Deployment template image ta

### case-41

- **结论**：`app/shippingservice` + `incorrect_image_reference` ｜ 标签 `app/shippingservice` + `incorrect_image_reference`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 66,551
- **raw 日志**：[results/1014_1305_inorder4-v3b133/raw/1014_1306_boutique-startup-41](../results/1014_1305_inorder4-v3b133/raw/1014_1306_boutique-startup-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (wide) in namespace boutique showed exactly one outlier: shippingservice-8f77849b9-d7h52, 0/1 ErrImagePull on worker-03, while all other 10 workloads were 1/1 Running with 0 restarts; GetAlerts() showed no metric anomalies, so no other object-layer fault. The pod's own events name the mechanism: kubelet 'Failed to pull image "us-central1-docker.pkg.dev/google-samples/microservices-demo/shippingservice:v0.10_3": rpc error: code = NotFound ... failed to resolve reference ... not found', escalating ErrImagePull -> ImagePullBackOff. NotFound (not 'no such host', not 'unauthorized') pr

### case-42

- **结论**：`app/adservice` + `missing_image_pull_secret` ｜ 标签 `app/adservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 195,861
- **raw 日志**：[results/1014_1308_inorder4-v3b134/raw/1014_1309_boutique-startup-42](../results/1014_1308_inorder4-v3b134/raw/1014_1309_boutique-startup-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only adservice is unavailable: pods listing shows adservice-57758fbfbc-pc7rt 0/1 ImagePullBackOff (all 10 other boutique services 1/1 Running), and CheckServiceConnectivity(adservice:9555) returns Connection Failed while frontend declares AD_SERVICE_ADDR=adservice:9555. The live mechanism event (12s old) reads: Failed to pull image "ghcr.io/testuser177/adservice:v0.10.3": failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?scope=repository%3Atestuser177%2Fadservice%3Apull&service=ghcr.io: 403 Forbidden — the registry/token endpoint 

### case-43

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `missing_image_pull_secret`（✗ 与标签不符）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 71,400
- **raw 日志**：[results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-startup-43](../results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-startup-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one workload is off in the boutique namespace: pod checkoutservice-5bb6f6875-txw5q is 0/1 ImagePullBackOff (deployment checkoutservice 0/1 READY, AVAILABLE 0; its Service lists NO endpoints while all other 10 services have endpoints and are 1/1 Running; GetAlerts() shows no metric anomaly). kubelet events: 'Failed to pull image "ghcr.io/google-samples/microservices-demo/checkoutservice:v0.10.3": failed to resolve reference ...: failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token?...: 403 Forbidden' (ErrImagePull -> ImagePullBac

### case-44

- **结论**：`app/currencyservice` + `missing_image_pull_secret` ｜ 标签 `app/currencyservice` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 28 · tokens 160,246
- **raw 日志**：[results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-startup-44](../results/1014_1314_inorder4-v3b136/raw/1014_1315_boutique-startup-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom chain: currencyservice unreachable - CheckServiceConnectivity(currencyservice:7000) = Connection Failed and its Endpoints listing is empty, while the deployments listing shows currencyservice 0/1 AVAILABLE (the only outlier; all other 10 services 1/1). The pod surface shows currencyservice-58fc98f787-56n7k 0/1 ImagePullBackOff, and its own sheet shows State: Waiting / Reason: ImagePullBackOff with an empty Container ID (container never started -> never Ready -> no endpoint -> callers such as frontend with CURRENCY_SERVICE_ADDR=currencyservice:7000 fail). The mechanism event is the kube

### case-45

- **结论**：`app/emailservice` + `incorrect_image_reference` ｜ 标签 `app/emailservice` + `missing_image_pull_secret`（✗ 与标签不符）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 88,419
- **raw 日志**：[results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-startup-45](../results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-startup-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace boutique, exactly one workload deviates from the all-healthy baseline: pod emailservice-6b89575c-jttr4 is 0/1 ErrImagePull (all other 10 pods 1/1 Running). DescribeResource shows PodScheduled=True and a Normal 'Scheduled' event (not a scheduling fault), Restart Count 0, container State Waiting/Reason ErrImagePull. The mechanism event reads verbatim: Failed to pull image "ghcr.io/google-samples/microservices-demo/emailservice:v0.10.3": failed to resolve reference ... failed to authorize: failed to fetch anonymous token: unexpected status from GET request to https://ghcr.io/token...

### case-46

- **结论**：`app/frontend` + `missing_image_pull_secret` ｜ 标签 `app/frontend` + `missing_image_pull_secret`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 69,579
- **raw 日志**：[results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-startup-46](../results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-startup-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom entry: with no service named by the wording, the boutique pods listing was the legitimate entry and showed a single outlier: frontend-5cb85b46cc-5fxvx = 0/1 Ready, STATUS ErrImagePull, while all other 10 boutique workloads were 1/1 Running with 0 restarts (hence 'Partial'). The pod's own sheet shows PodScheduled=True (Successfully assigned to worker-03), so scheduling is not the break; the container is Waiting with Reason ErrImagePull, Restart Count 0, and the kubelet event reads: 'Failed to pull image "ghcr.io/google-samples/microservices-demo/frontend:v0.10.3": failed to resolve refe

