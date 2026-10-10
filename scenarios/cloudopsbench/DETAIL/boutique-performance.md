# 评测明细 · boutique/performance — cloudopsbench

> 本家族已跑 **1/29** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T09:25:25.475Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 0 | 0 | 1010_1658_inorder5 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `pod_cpu_overload` ｜ 标签 `app/adservice` + `pod_cpu_overload`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15
- **摘要**：Alerts: Service/adservice RESOURCE_SATURATION cpu_cfs 0.824s (Throttled) + cpu core Normal=0.03 -> Current=0.16 cores (+375.0%) + LATENCY_DEGRADATION adservice-p95latency Normal=4.85ms -> Current=70.04ms (+1343.0%); Node/worker-02 cpu only 3.15%->4.91% (+55.9%). Object layer fully excluded: all pods 2/2 Running with RESTARTS 0 (adservice-d68dfc56-lbcrz Ready=True, Restart Count 0, events only Scheduled/Pulled/Created/Started, no probe/OOM events), all deployments 1/1 AVAILABLE, adservice connectivity 9555 open/Connection Succeeded, no error logs (only INFO 'received ad request'), source code i

