# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **26/62** 题：JRA ✅26 ❌0 ｜ 证据链全闭 26 ｜ token 中位 83,339 ｜ 生成 2026-10-13T18:58:20.406Z
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

