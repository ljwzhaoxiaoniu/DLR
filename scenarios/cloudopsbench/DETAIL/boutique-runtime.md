# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **1/45** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-12T07:23:09.373Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10
- **摘要**：Pod listing shows adservice-d6c9fcc6b-d4nlb as the only outlier with RESTARTS 2 (30s ago) while all other 10 boutique services are at 0 restarts; GetAlerts reports no metric anomalies, so the fault is object-layer. Its pod detail shows Last State Terminated with Reason Error and Exit Code 143 (SIGTERM by kubelet, not 137 OOMKilled) plus events 'Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04..."' (x9) and 'Killing: Container server failed liveness probe, will be restarted' (x3). Server-side log

