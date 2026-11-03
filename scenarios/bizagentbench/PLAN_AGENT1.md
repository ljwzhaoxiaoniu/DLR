# PLAN · Agent Operating Layer A/B（2026-11-03 12:05）

> 目的：验证 `AGENTS.md` 运行态设定（L3 判序 + 执行纪律）对**所有未 strict 题**的影响。
> 定位：这是**探索可复现最佳实践**的手段（best-practice store/freeze + AGENTS + L3 + 跑法），**不做严格消融、不对齐论文**；A/B 结果只用于选型，不承担因果归因。
> 口径：每题 1 轮、3 并发；与各题历史 best 对照；有效/无效如实记录；不推送。

## 固定条件

| 项 | 值 |
|---|---|
| store | `TSM Core Service/.store/lance/bizagentbench-v20` |
| freeze | `8992a5aa`（`eval/freeze.v20.json`） |
| bridge | 28799（`start_bridge.sh`，v20） |
| agent layer | `scenarios/bizagentbench/AGENTS.md`（git blob `d3b217dc…`；含角色/判序/三层消歧/纪律） |
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

## 第 1 批结果（2026-11-03，017 / 018 / 019）

| 题 | 历史 best | a1 | checks | strict |
|---|---|---|---|---|
| 017 | 31/32（v11） | 29/32 | 90.6% | ❌→❌ 回归 −2 |
| 018 | 29/30（v14） | 30/30 | 100% | ❌→✅ 翻盘 |
| 019 | 34/35（v14） | 28/35 | 80.0% | ❌→❌ 回归 −6 |

## 行为偏转诊断（失败题）

- **017（算错，不是流程错）**：L3 未命中——题面被用户模拟器改写（“Hello. I need help…”），节标题是原题（“Please handle…”），`match=similar`；而 SOP 索引当时用「标题+正文」编码，长节被正文稀释：正确节在 50 节里排第 41、score 0.567（低于 0.7 阈值），top-2 里根本没有它。Agent 只能从 L1/L2 自解，把 Alder 的 accepted return 20,000 当成“净份额”反推 gross 25,000，于是 reverse 20,000（应为 16,000 = 48,000 − 32,000）且 refund 20,000（应为 15,000 = 20,000 − 已 SETTLED 5,000）。v11 同一题算对。
- **019（被 exact L3 带偏，过度字面）**：a1 的 L3 **exact 命中**（v14 因 straight/curly apostrophe 差异只拿到 similar）。SOP 4 说“用 authority 列出的 source names”，a1 照字面用 `{"EXPORT": 2}`，被 `SOURCE_ACCEPTANCE_OR_VERSION_UNAVAILABLE` 拒绝；它连续重复同一形式、转去怀疑“窗口未开”，最后 ESCALATED。v14 在 similar 路径上做了一次形式实验，改用 record id `{"D34-CERT-EXPORT": 2}` 即成功，随后两条 authority 全部重绑完成。
- **018**：无偏转；30/30，历史 P 类 `shared.unapproved_execution_attempt` 转干净，符合 AGENTS 执行纪律方向。

## 联合修复（2026-11-03）

1. `TSM Core Service/src/build/buildSop.ts`：SOP 向量改为**只用标题**（正文只进 `text` 展示）。实测 017 正确节从 rank 41 / 0.567 变为 rank 1 / 0.969。
2. `TSM Core Service/src/queries/searchSop.ts`：`norm()` 归一弯/直撇号与引号，修 019 v14 那类 exact 漏配。
3. `scenarios/bizagentbench/sources/sop.md`：
   - §017 类第 5 条补“buyer 总额 = accepted return，先扣已 settled/submitted，不得按佣金率反推 gross”；
   - §019 类第 4 条补“`versions` 用 reliance 的 **record id** 作键（`D34-CERT-EXPORT`），短名 `EXPORT` 会被 `SOURCE_ACCEPTANCE_OR_VERSION_UNAVAILABLE` 拒；重绑被拒先试键形，再怀疑窗口”。
4. `scenarios/bizagentbench/AGENTS.md`：保持高位（L1 及以上），只补 TSM 用法——① Role 增加“先检索三层、再走业务工具，不得用记忆/通用计划/别题套路替代 TSM 返回”；② similar 候选若复述本题请求 → 作为 playbook hypothesis（可用、须核数），不再一律丢弃。题级算术与键形陷阱全部留在 L3（sop.md），不进 AGENTS。

**待办**：以 v20 为底 copy → `bizagentbench-v21`，`tsm build sop --store …-v21`，出 `freeze.v21.json`，复跑 017/019 对表。

## v21 复跑（2026-11-03 12:38–13:50，a2）

store v21（687/187/50 · bge-base-en 768 维 · SOP 标题编码）· freeze `73e7889c`（`eval/freeze.v21.json`）· bridge 28799。

| 题 | a2 | 历史 best | 结论 |
|---|---|---|---|
| 017 | **32/32 ✅** | 31/32 | strict 翻盘 |
| 019 | 34/35 | 34/35 | 回到 best（a1 28/35）；仅 P `link.quote_version_refresh` |
| 025 | 28/29 | 28/29 | 持平；仅 `billing.minimum_total_cost` |
| 026 | **31/31 ✅** | 30/31 | strict 翻盘 |
| 027 | 31/34 | 27/34 | +4；`capture.FIRST`、payroll N1/L2 |
| 021 | 29/30 | 26/30 | +3；仅 `capture.FIRST` |
| 011 | 36/42 | 33/42 | +3；joint capital/fee、participant A/B、merchant G1 |
| 013 | 41/47 | 41/47 | 持平；retained indemnity EW/PW、recoveries A-D |
| 015 | **42/42 ✅** | 41/42 | strict 翻盘 |
| 010 | 37/39 | 35/39 | +2；仅 P joint floors/reserve |
| 014 | 37/41 | 38/41 | −1（单轮方差）；joint capital/company capital、invoice due、cheque stop |

**13:50 停止**：007（手动补位）被杀、008/009（队列启动后）被杀，均未 evaluate，不计入结果。018 在 v20 已 strict，本轮未复跑。

小结：11 题完成 · strict 3/11（017/026/015，均翻盘）· 持平 3（019/025/013）· 提升 4（027/021/011/010）· 回退 1（014，单轮）。
