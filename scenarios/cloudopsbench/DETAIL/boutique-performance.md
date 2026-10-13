# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **2/29** 题：JRA ✅2 ❌0 ｜ 证据链全闭 2 ｜ token 中位 289,569 ｜ 生成 2026-10-13T05:30:38.570Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 127,303 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1852 | 28 | 289,569 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `pod_cpu_overload` ｜ 标签 `app/adservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 127,303
- **摘要**：All 11 boutique pods are Running 2/2 with 0 restarts and all deployments 1/1 AVAILABLE (no scheduling/crash/probe/image/SA/PVC breakpoint). Alert pointer: Service/adservice ABNORMAL - cpu_cfs throttled 0.824s, cpu core Normal=0.03 -> Current=0.16 cores (+375%), adservice p95 latency Normal=4.85ms -> Current=70.04ms (+1343%). Anchor-confirmed: adservice pod (worker-02) limits cpu=200m/requests 100m with idle leaf-service baseline ~0.03 cores, yet observed 0.16 cores causing CFS throttling and 13x latency increase. Code surface (AdService.java getAds/getRandomAds) contains no busy loop or artifi

### case-2

- **结论**：`app/cartservice` + `pod_cpu_overload` ｜ 标签 `app/cartservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1852 · steps 28 · tokens 289,569
- **摘要**：Telemetry-chain closure (per L2 consensus for 'Service latency increased significantly'): object layer is entirely clean — all 11 boutique pods 2/2 Running with RESTARTS=0, all 26 namespace events Normal (no Warning), 4 nodes Ready with no pressure/taint, kubelet on worker-01 healthy, cartservice:7070 connectivity OK, selector/port match, pod has no config/probe/volume anomaly. The break is at the metric level on cartservice: GetAlerts shows cartservice RESOURCE_SATURATION cpu_cfs 0.811s (Throttled) and cpu core 0.02 -> 0.16 cores (+544.6%) against its 200m CPU limit (requests 100m, QoS Bursta

