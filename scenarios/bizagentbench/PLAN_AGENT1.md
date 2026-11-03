# PLAN · Agent Operating Layer A/B（2026-11-03 12:05）

> 目的：验证 `AGENTS.md` 运行态设定（L3 判序 + 执行纪律）对**所有未 strict 题**的影响。
> 口径：每题 1 轮、3 并发；与各题历史 best 对照；有效/无效如实记录；不推送。

## 固定条件

| 项 | 值 |
|---|---|
| store | `TSM Core Service/.store/lance/bizagentbench-v20` |
| freeze | `8992a5aa`（`eval/freeze.v20.json`） |
| bridge | 28799（`start_bridge.sh`，v20） |
| agent layer | `scenarios/bizagentbench/AGENTS.md`（git blob `a58762aa…`；含角色/判序/三层消歧/纪律） |
| 注入 | `export BIZ_AGENTS_MD="D:/Code_Proj/DLR Proj/scenarios/bizagentbench/AGENTS.md"` |
| 输出 | `results/dlr-full/case_XXX_a1` |
| 并发 | 3 题/批，`--workers 1`/题 |

## 复跑范围（当前无 strict 的 15 题）

017, 018, 019, 025, 026, 027, 021, 010, 011, 013, 014, 015, 007, 008, 009

> 001–006、012、016、020、022、023、024 已 strict，本轮不复跑。
> 028–030、032–050 尚未首跑，不属“复跑”，另行安排。
> 031 PSP strict 为非冻结预跑，待冻结态复核，不在本轮。

## 批次（先近 strict，再看长尾）

1. 017 / 018 / 019
2. 025 / 026 / 027
3. 021 / 010 / 011
4. 013 / 014 / 015
5. 007 / 008 / 009

## 判定

- 与各题历史 best 对照：strict 是否翻盘、checks、failed_by_category、得分率。
- 同题若变差 → 记回归；不混写；必要时回滚 AGENTS 层。
- 每批跑完报数；无 strict 的继续下一批；全程不推送。
