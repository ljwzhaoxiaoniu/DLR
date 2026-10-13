# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **3/62** 题：JRA ✅2 ❌1 ｜ 证据链全闭 3 ｜ token 中位 88,144 ｜ 生成 2026-10-13T04:39:04.795Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 58,131 | 0 | 0 | 1012_1447_inorder4-v3b2 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 186,507 | 0 | 0 | 1012_2040_inorder4-v3b8 | 全对·链闭 |
| [3](#case-3) | 1 | 0 | 0 | 1 | 1 | 1 | 0.2 | 16 | 88,144 | 0 | 0 | 1013_1235_inorder4-v3b12 | 未命中 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `image_registry_dns_failure` ｜ 标签 `app/adservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 58,131
- **摘要**：namespace boutique 首轮 pods 扫描中唯一离群对象为 adservice-7b5ff9bbd7-r2s5r：READY 0/1、STATUS ErrImagePull，其余 10 个 pod 均 1/1 Running；Deployment adservice 为 0/1 AVAILABLE 且 Endpoints(adservice) 为空。DescribeResource(pod) events 原文显示容器从未启动，断点在镜像获取环节而非调度：Pulling image "ghost-registry.example.net/google-samples/microservices-demo/adservice:v0.10.3" 后 Failed，failed to resolve reference ... dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host，随后 BackOff -> ImagePullBackOff。GetAppYAML(adservice) 确认 Pod 模板 image 即为该主机名（并非 tag/仓库路径错误，也无 manifest unknown），ServiceAccount adservice 已存在、探针 grpc:955

### case-2

- **结论**：`app/cartservice` + `image_registry_dns_failure` ｜ 标签 `app/cartservice` + `image_registry_dns_failure`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 186,507
- **摘要**：Only cartservice is broken: pods listing shows 'cartservice-59798f66d6-87776 0/1 ImagePullBackOff' (all other 10 boutique pods 1/1 Running); deployments show cartservice 0/1 AVAILABLE; endpoints/cartservice is empty and CheckServiceConnectivity(cartservice:7070) = Connection Failed, which is the reported availability disruption. The mechanism event is verbatim: 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/cartservice:v0.10.3": failed to resolve reference ...: dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host' -> ErrImagePull -> Im

### case-3

- **结论**：`app/checkoutservice` + `incorrect_image_reference` ｜ 标签 `app/checkoutservice` + `image_registry_dns_failure`（✗ 与标签不符）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 88,144
- **摘要**：Partial unreachability isolates to one service: CheckServiceConnectivity(frontend:80) succeeded while checkoutservice:5050 failed, and no metric alerts fired. Pruned object layer shows the single outlier: pod checkoutservice-7bbc84d447-gfr6r is 0/1 ErrImagePull on worker-03 (deployment checkoutservice 0/1 AVAILABLE) while all other 10 boutique services are 1/1 Running. Mechanism event (kubelet, verbatim): 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/checkoutservice:v0.10.3": failed to resolve reference ...: dial tcp: lookup ghost-registry.example.net on 1

