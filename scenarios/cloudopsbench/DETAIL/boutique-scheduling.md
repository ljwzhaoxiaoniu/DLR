# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **1/164** 题：JRA ✅1 ❌0 ｜ 证据链全闭 1 ｜ 生成 2026-10-10T09:25:25.475Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 0 | 0 | 1010_1658_inorder5 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16
- **摘要**：唯一离群 pod 为 cartservice-79b49f5555-rl2kp（0/1 Pending，Node=<none>，PodScheduled=False），事件原文为 'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable'。节点面确认 master/worker-01/worker-02/worker-03 全部 'Ready,SchedulingDisabled'、Taints 均为 node.kubernetes.io/unschedulable:NoSchedule、Unschedulable: true，且节点事件显示近期 NodeNotSchedulable（85–96s 前，早于该 pod 的 70s 年龄）。cartservice 的 pod 模板无 nodeSelector/affinity，Tolerations 仅默认 not-ready/unreachable:NoExecute，无法容忍 unschedulable:NoSchedule 污点；节点资源充足（worker-01 仅 895m/8 CPU、1123Mi/15.6GB），namespace 无 ResourceQuota，故排除容量与配额因素。表现闭环：deployments 中 cart

