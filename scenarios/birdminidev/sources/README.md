# sources/ —— 三层的来源、组织规则与落点对账

> 本目录是场景的知识源：`configs/`（L1 dlr 建模）、`consensus/`（L2 领域共识）、`sop.md`（L3 题级）。
> 本文说明**它们的语义从哪来、怎么组织、怎么核对没丢**。规则口径（2026-09-29 项目主定盘）：

**LE = PE 的有效聚合 ｜ PE = 物理表的视图投影 ｜ 所有描述都来自数据集描述 + evidence 的吸收**

## 一、语义来源（数据集侧，三处）

| 来源 | 内容 | 去处 |
|---|---|---|
| SQLite schema（= table.json：表/列清单） | 表、列、类型 | PE 视图列清单（**全列投影，不按频次裁剪**） |
| `database_description/<Table>.csv` | `column_description` / `data_format` / `value_description` | L1 列描述（**原文**；public 列可用同源文本做业务化措辞） |
| `mini_dev_sqlite.json` 的 `evidence`（逐题） | 题面词 → 数据语义的映射、值域、格式、算式、题级口径 | 逐条分流：数据源级事实 → **L1**；非数据源级的领域口径 → **L2**；题级口径/陷阱 → **L3**；零信息重复（如实体名 ↔ 同名列）→ 不入层（登记为"零信息"） |

## 二、组织规则（不增语义，只换组织方式）

1. **PE 视图 = 该物理表的列投影**（骨架完整；`get_pe_mapping` 按此返回）。裁剪只发生在"确定不建模的列"（无描述、无题目使用、纯生成噪声）——作此判断须留依据。
2. **public 是组织位，不是内容**：只升**核心度量 / 高频过滤（WHERE·GROUP BY·JOIN）/ 关系键**（桥梁键必须在可见面，否则 PAS/JOIN 断头）。
   其余列保持 private：仍在视图内可下钻，只是不进 LE 公开面。**不按使用频次机械裁剪视图**。
3. **LE = PE 的有效聚合**：LE 描述写业务语义（关键字段名 + 业务含义），聚合其下 PE 的 public 面；LE 不做 PE 之外的语义发明。
4. **描述纪律**：L1 描述一律取自 CSV 原文或 evidence 原文；
   - 不写"我理解后的单位/范围/解释"（例：CSV 只写 "the player's weight"，就不写 "in pounds (117-243)"）；
   - 需要消歧的最小时措辞（如同名异义列）除外，且必须可由数据/数据集文本直接支撑。
5. **L2 = evidence 的残差**：只留"非数据源级"的领域口径（跨表换算、编码约定、值域在业务上的读法）；条目文本同样取自 evidence/CSV 原文，不新造。
6. **L3 = 题级口径**，按三档准入（①数据集错误 ②无节跑不对 ③无节 >15W）写节；检索交付。

## 三、落点对账（football pilot，51 条 evidence → 7 条 L2）

| evidence 语义 | 落点 |
|---|---|
| 评分列语义 + 逐日期记录粒度 | L1 各评分列描述（0-100 by FIFA）+ L2#1 |
| 战术评分 + Class 词表与区间 | L1 各列描述（CSV value_description 原文）+ L2#2 |
| 惯用脚 right/left | L1 `preferred_foot` 描述（CSV 原文）+ L2#3 |
| work rate 三档语义（FIFA 评语） | L1 两列描述（CSV value_description 原文）+ L2#4 |
| birthday 读法 / age at present | L1 `birthday` 描述（CSV 原文）+ L2#5 |
| 比分/胜负/平局 | L1 两个 goal 列描述（CSV 原文）+ L2#6 |
| 赛季标签 / 日期格式 | L1 `season`/`date` 描述（CSV + evidence）+ L2#7 |
| 联赛/球队命名 | L1 `LeagueName`/`team_long_name`/`team_short_name` 描述（CSV 原文） |
| 题级口径（阈值、并列、特指实体…） | L3 节（命中三档的题）；其余为题面本身，不入层 |
| 零信息重复（`X 指 player_name = 'X'` 这类） | 不入层（登记） |

**不变量**：上表逐条覆盖 51 条 evidence 的语义；任何一条要么在 L1、要么在 L2、要么在 L3、要么被登记为"零信息"。新增/修改三层后按此表复核。

## 四、核对方法（可复跑）

```bash
cd "TSM Core Service"
node bin/tsm.mjs coverage      # 覆盖度对账：缺 L1 列 / 描述不一致 / FK 未表达 / evidence↔L2
npx tsx src/verify/parity_dlr.ts <库名>   # 与历史 Python 线的向量清单对照（历史闸门，模型演进后按设计允许差异）
```

> 脚本：`tmp_scripts/audit_le_pe.mjs`（结构清单）、`tmp_scripts/audit_col_roles.mjs`（列角色：JOIN/过滤/分组/度量）、`tmp_scripts/dump_le.mjs`（LE 视角展开）、`tmp_scripts/set_public.mjs`（按列升 public，幂等）。

## 五、各库 L1/L2 状态（2026-09-29，全部完成）

**通则**：视图 = 表列投影（全列，仅"登记/派生/重复/数据集标注无用"列不入，且逐列留因）；描述 = CSV（column_description+value_description）或 evidence 原文；public = 核心度量 / 高频过滤 / 关系键；L2 = evidence 的吸收（领域级），题级口径归 L3。

| 库 | L1（视图 / 描述 / 关系） | L2 |
|---|---|---|
| european_football_2 | 199 列全投影 ✓ ｜ 描述 ✓（6 处为 CSV 自身编码坏字）｜ 关系：22 个首发槽位列为多槽位列，未以 PAS 表达（**待定**） | 7 条（51→7） |
| codebase_community | ✓（补 6 条 FK 为可见连接键） | 7 条（49→7） |
| card_games | ✓ | 21 条（原有聚合式） |
| debit_card_specializing | ✓ | 13 条 |
| california_schools | 视图 76/89（13 列登记/派生/重复不入，逐列留因：NCES 号、缩写、三个派生 Percent、CALPADS 状态、IRC(标 Not useful)、County/School Code 等）✓ ｜ 关系 ✓ | 22 条（30→6） |
| financial | ✓（另修正 loan.status 的 A/B/C/D 语义为 CSV 原文、补 frequency 编码） | 6 条（32→5） |
| formula_1 | ✓（补 4 条 FK） | 26 条（66→6） |
| student_club | ✓（补 2 条 FK；9 处 CSV 空白列的中文描述改为英文短描述） | 25 条（48→6） |
| superhero | ✓（补 9 条 FK；LE 描述改英文） | 25 条（52→4） |
| thrombosis_prediction | ✓ | 5 条（50→5） |
| toxicology | ✓ | 28 条（40→5） |

> 全局：consensus 向量 **458 → 91 行**；L1 向量 entities 938；Neo4j LE 49 / PE 73 / PA 781 / LA 273。
> 另有全局清理：所有库的中文描述 → 数据集原文或英文短描述（47 处 + 10 处）。
