# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **5/62** 题：JRA ✅5 ❌0 ｜ 证据链全闭 5 ｜ token 中位 66,407 ｜ 生成 2026-10-13T15:02:27.142Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 58,131 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 186,507 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 83,339 | 0 | 0 | 1013_1245_imagecls-verify1 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 66,407 | 0 | 0 | 1013_1503_inorder4-v3b16 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 65,786 | 0 | 0 | 1013_1842_inorder4-v3b32 | 全对·链闭 |

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

