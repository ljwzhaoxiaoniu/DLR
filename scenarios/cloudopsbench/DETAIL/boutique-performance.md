# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **1/29** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ token 中位 127,303 ｜ 生成 2026-10-12T07:54:17.572Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 127,303 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `pod_cpu_overload` ｜ 标签 `app/adservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 127,303
- **摘要**：All 11 boutique pods are Running 2/2 with 0 restarts and all deployments 1/1 AVAILABLE (no scheduling/crash/probe/image/SA/PVC breakpoint). Alert pointer: Service/adservice ABNORMAL - cpu_cfs throttled 0.824s, cpu core Normal=0.03 -> Current=0.16 cores (+375%), adservice p95 latency Normal=4.85ms -> Current=70.04ms (+1343%). Anchor-confirmed: adservice pod (worker-02) limits cpu=200m/requests 100m with idle leaf-service baseline ~0.03 cores, yet observed 0.16 cores causing CFS throttling and 13x latency increase. Code surface (AdService.java getAds/getRandomAds) contains no busy loop or artifi

