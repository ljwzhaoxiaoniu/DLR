# 评测明细 · boutique/startup — cloudopsbench

> 本家族已跑 **1/62** 题：JRA ✅0 ❌1 ｜ 证据链全闭 1 ｜ 生成 2026-10-11T13:49:40.827Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 0 | 0 | 1 | 1 | 1 | 0.3 | 11 | 0 | 0 | 1011_2147_inorder4 | 未命中 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `incorrect_image_reference` ｜ 标签 `app/adservice` + `image_registry_dns_failure`（✗ 与标签不符）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11
- **摘要**：In namespace boutique only adservice is degraded: pod adservice-7b5ff9bbd7-r2s5r is 0/1 in Status ErrImagePull/ImagePullBackOff with events 'Failed to pull image "ghost-registry.example.net/google-samples/microservices-demo/adservice:v0.10.3" ... dial tcp: lookup ghost-registry.example.net on 127.0.0.53:53: no such host' and ContainersReady=False, so the container never starts. GetAppYAML(adservice) shows the pod template image was pointed at a non-existent registry host ghost-registry.example.net, while all other 10 boutique Deployments run 1/1 AVAILABLE pulling from us-central1-docker.pkg.de

