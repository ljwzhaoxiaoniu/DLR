# 评测明细 · boutique/runtime — cloudopsbench

> 本家族已跑 **1/45** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T08:35:35.493Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 9 | 0 | 0 | 1010_1618_boutique-runtime-1-v2m | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/adservice` + `liveness_probe_incorrect_protocol` ｜ 标签 `app/adservice` + `liveness_probe_incorrect_protocol`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 9
- **摘要**：Only adservice showed restart outlier: pod adservice-d6c9fcc6b-d4nlb on worker-02 had RESTARTS 2 (30s ago) while all other 10 boutique services had 0. Pod detail: Last State Terminated, Reason Error, Exit Code 143 (kubelet SIGTERM, not OOM 137), with events 'Liveness probe failed: Get "http://172.20.2.163:9555/": net/http: HTTP/1.x transport connection broken: malformed HTTP status code "\x00\x00\x00\x04\b..."' (x9) and 'Killing: Container server failed liveness probe, will be restarted' (x3). GetAppYAML(adservice) shows the mismatch: readinessProbe correctly uses grpc port 9555, but livenessP

