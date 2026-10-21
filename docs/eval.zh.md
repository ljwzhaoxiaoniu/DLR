# 评测：内容与能力分离

> 操作篇。2.0 评测 = **内容（考卷跟场景）+ 能力（考试系统跟 dsh）**。
> 英文版：[eval.md](eval.md)

## 一、一句话

**考卷跟场景走，考试系统跟 dsh 走。**

| | 跟着谁 | 形态 | 性质 |
|---|---|---|---|
| **考卷 A：自建题库** | **场景** | `scenarios/<名>/eval/questions.jsonl` | **内容资产**：一场景一份，随场景包 git 化 ｜ ✅ `birdminidev`：500 题（生成器 `eval/build.mjs`：**答案键取 L3 节口径 74 处、其余取 gold 426 处**） |
| **考卷 B：外部基准适配** | **场景** | `scenarios/<名>/eval/`（适配器：`convert` / `run_eval` / `grade` / `stats`） | **内容资产**：考卷本体是上游基准的 754 例，场景包只放适配层 ｜ ✅ `cloudopsbench`：**覆盖 754/754 · JRA 753/754（99.87%）**；判分 = 上游 scorer（CA/FA/JRA + MC/EOC/ECR/EE） |
| **考试系统**（跑题 + 采分 + 出报告） | **dsh** | ✅ 独立包 `dsh-tsm-eval`（0.1：CLI `run / score / report / all / doctor / parity`；bundle 面 —— web 浮层、`/eval` —— 计划 0.2） | **宿主能力**：一套通吃多场景，**独立可分** |

## 二、为什么这样切

评测的对象本质上是「**宿主组合 × 场景内容**」的联合体——所以考试系统天然属于宿主侧；而且原料现成：

- **`dsh --json` 事件流**（跑题即得：逐步状态、工具调用、final）；
- **会话日志**（`.dsh-home/sessions/**.jsonl.zstd`）——完整取证：工具轨迹、消息全文、`turn/end`。

比 1.5 那套"适配器 + 四阶段"的口径干净得多。三个附加收益：

1. **多场景**：一套系统 × N 份考卷（场景平级设计本来就是为这个）；两个已落地场景各占一种内容形态——bird 自建题库、COB 外部基准适配；
2. **过程可评**：1.5 只能判最终答案；dsh 原生能看**调用链与证据链**（与 Cloud-OpsBench 的 ECR"证据链闭合"同向，见 [roadmap.zh.md](roadmap.zh.md) §五）；
3. **企业演示**：改一条 L3 口径 → 跑同一份考卷 → 行为变化**可复现**——语义资产的 CI。

**代价（诚实说）**：绑 dsh（alpha 会漂）；只在有 dsh 的地方能评——产品线本就是 dsh，成立。

## 三、考卷格式（约定）

`scenarios/<名>/eval/questions.jsonl`，一行一题：

```json
{"question": "...", "expected": "0.0657", "source": "L3 sop#EUR-ratio"}
```

- `expected`：精确值优先（可程序判定）；需要宽容时给判定说明；
- `source`：口径来自哪（L1 描述 / L2 kid / L3 节）——判错时能**归因到层**。

> 以上是**自建题库**的格式（bird）。COB 不写 `questions.jsonl`：它的「考卷」是上游 754 例，`eval/` 只放转换 / 判分适配器（见 §五）。

## 四、报告（约定）

- **结果**：正确率（分场景 × 分 profile）；
- **过程**：步数、token、工具调用序列、是否闭合证据链；
- 输出同时落 `--json` 事件流与会话日志路径，**可回放取证**。

## 五、跑批与判定（当前实操）

> 迁移期正在用的批跑链路：场景包内容驱动的**题级验证**——验的是 **L3**（L1/L2 是既定输入，跑的差异只应来自 L3）。正式考试系统见 §七第 2 条（并见本节注）。**本节是批跑/判分纪律的唯一之家**——其他文档只引一行、指回本节。

**跑批**（`DSH-based Agent Service/scripts/run_batch.sh`）：

```bash
bash "DSH-based Agent Service/scripts/run_batch.sh" --qids 685,687,694 --jobs 4
#   产物 → scenarios/<场景>/results/<stamp>_qids_.../（raw/ 逐题 ndjson）
cd "TSM Core Service" && node bin/tsm.mjs grade --run "<上一步目录>"   # → questions.csv + summary.md
```

（场景包装在仓库外时，跑批产物落 `TSM_OUT_DIR`——默认用户数据目录——**永不写进场景包**。）

> `dsh-tsm-eval`（`DSH-based Agent Service/dsh-tsm-eval/`）已把这条链收进一条命令——`dsh-eval all` 跑题、采分、出报告一条龙；**下述判据不变**（它子进程调用 `tsm grade`，并原样嵌入其行）。

**判定的三层**（`src/dev/judge.ts` · `src/dev/results.ts`）：

| 层 | 做什么 | 关键口径 |
|---|---|---|
| ① 与 gold 比对 | 期望值（gold SQL 在该库 SQLite 执行的结果，>2s 起走磁盘缓存）↔ agent 答案 | 数值逐级容差（1e-9…1e-3）；**数值与文本都只认 `Final Answer:` 结论句区域**——正文里"被否决的备选读法""参考值"不算命中（q716 族教训） |
| ② 结果集比对（**只救假阴性**） | gold 判非 PASS 时，拿 agent 候选 SQL 与 gold SQL 比行集（原样 / 去 LIMIT / 共同列投影） | 列表题的安全网；只认"生成逻辑"，不认"结论表述" |
| ③ SOP 裁定（评定） | 按 L3 节的 `Expected` / 数据集问题标签裁定 | 合节口径而 gold 不同 → 🔁 翻盘；节口径与 gold 同值命中 → ✅ 正确（**不记翻盘**）；两者都不合 → ❌ |

**COB 批跑（外部基准，不走 `tsm grade`）**：

```bash
bash "DSH-based Agent Service/dsh_cob/scripts/start_backend.sh"                   # 语义后端 :28796（幂等）
bash "DSH-based Agent Service/dsh_cob/run_one.sh" <system> <category> <case_id>   # 单例（如 boutique runtime 1）
bash scenarios/cloudopsbench/eval/grade.sh --runs-root scenarios/cloudopsbench/results --match "<glob>"
node scenarios/cloudopsbench/eval/stats.mjs
```

- 2 路 × 4 题/批（内存约束）；全量留档 **420 轮**；结果 **覆盖 754/754 · JRA 753/754（99.87%）**；流程分 MC 0.996 / EOC 0.980 / ECR 0.981。
- 判分口径 = **上游 scorer**（CA/FA/JRA + MC/EOC/ECR/EE），不是上面 `tsm grade` 的三层；`stats.mjs` 跨轮去重取最新。

**纪律**（迁移期）：

- 一批 **4 题**（2026-10-11 定，防爆内存），批间停下报数；**每题最多两遍**（第二遍用于补节后对表）。实操中 `run_batch.sh` 按 `--jobs` 并发派发（默认 4，带 700MB 空闲内存闸）；Cloud-OpsBench 马拉松为严格串行、一次一题。
- **节写完必须复跑该题**——节的生效时点若晚于跑批，旧档那一行可能靠假阳性撑着（q1136 节晚 11 分钟 / q1472 节晚 4.5 小时，重判后才暴露）。
- 改 `sources/sop.md` → `tsm build sop` 重建索引 → 复跑对表；**实验跑不进 `results/`**（台账取每题最新一轮）。
- 判据 / 口径变动后**全量重判**（逐目录 `tsm grade` 即可，gold 走缓存）：台账只能有一套尺子。

## 六、与换层制度的关系（探针）

考试系统的副产品 = **探针**：谁被反复引用、谁被反复纠正、哪些题反复失分——这些运行观测为**换层移民**生成候选（晋升 / 降级 / 补节），人只签字（[02-concept.zh.md](02-concept.zh.md) §二后附）。

## 七、路线

1. 场景包先落 `eval/questions.jsonl`（内容，随时可加）——✅ `birdminidev` 已落；✅ `cloudopsbench` 走**外部基准适配**（不是 questions.jsonl，见 §五）；
2. 考试系统做成 dsh bundle（`--json` + 会话日志 → 判定 → 报告）——✅ 已落地为独立包 `dsh-tsm-eval`（v0.1，CLI 编排器；`report.json` 带 `baseline_key` diff 锚）；bundle 面（web 浮层 / `/eval`）属 0.2；
3. 报告基线化：每轮语义资产变更跑同一份考卷，diff 行为。

## 相关

- 场景包与考卷目录：[04-application.zh.md](04-application.zh.md) §四
- 运行（跑题与会话日志）：[run.zh.md](run.zh.md)｜探针与换层制度：[02-concept.zh.md](02-concept.zh.md)
