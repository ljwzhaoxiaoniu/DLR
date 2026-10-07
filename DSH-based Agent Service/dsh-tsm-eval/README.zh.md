# dsh-tsm-eval —— TSM/DLR 考试系统

> English: [README.md](README.md)

**考卷跟场景 · 考试系统跟 dsh。**

`dsh-tsm-eval` 把一套场景的考卷（`scenarios/<名>/eval/questions.jsonl`）跑过 **dsh headless**，用 **`tsm grade`**（唯一判据）逐题判定，产出**可回放报告**：结果 + 过程 + 会话日志取证。一套系统通吃所有场景。

这是 2.0 评测流水线的宿主侧（`docs/eval.md` §8 路线 2 的落地，工作名沿用）。它把手工链（`run_batch.sh` → `tsm grade` → 人看 CSV）合并成一条命令，补上旧链从未采集的过程指标与取证，并且**默认不往官方台账写任何东西**。

## 流水线

```
考卷（eval/questions.jsonl）
   │  run     —— 每题一个 dsh headless 进程（--json），产物落
   │            raw/<stamp>_<qid>_dlr.ndjson（`tsm grade` 原样可读的布局）
   │  score   —— `tsm grade --run <目录>` → questions.csv + summary.md（唯一判据）
   ▼  report  —— report.json + report.md：结果（按评定/库/口径来源）、
                过程（步数、token、工具序列、证据链使用）、取证（会话日志路径+解码事实）、
                无效轮分离、baseline_key（路线 3 轮间 diff 的锚）
```

原料全部取自 dsh 原生面：`--json` 事件流 + `$DSH_HOME/sessions/` 下的多帧 zstd 会话日志。`--json` 流对字符串截 8 KiB（`final` 除外），会话日志不截——报告两者都记，并对截断轮次打标。

## 快速上手

前置即 2.0 的常规环境：

1. 后端在跑：`bash "DSH-based Agent Service/scripts/start_backend.sh"`（MCP 在 `:28795`；`TSM_MCP_URL` 可覆盖）；
2. headless profile 挂好 agent bundle（link 安装即可）：`dsh plugin --profile headless add "<abs>/DSH-based Agent Service/dsh-tsm-agent"`；
3. 凭据：`DSH-based Agent Service/dsh_dlr/.env` 里有 `DEEPSEEK_API_KEY`。

```bash
# 0. 全量自检（11 项：路径、考卷绑定、profile bundle、后端、MCP 工具面）
node "DSH-based Agent Service/dsh-tsm-eval/bin/dsh-eval.mjs" doctor

# 1. 先看不动手
dsh-eval run --qids 1471 --dry-run

# 2. 跑 + 判 + 报一条龙
dsh-eval all --qids 1471,27,726,186,234 --out tmp_scripts/smoke5
```

（在仓库根执行；装包后 `dsh-eval` = bin 命令）

## 命令面

| 命令 | 作用 |
|---|---|
| `doctor` | 前置自检；任何失败项即非零退出 |
| `run (--qids a,b \| --db <名> \| --all) [--limit N]` | 逐题派发 dsh headless，写产物 + `run.json` |
| `score --run <目录>` | 对该目录跑 `tsm grade`（`--no-cache` 重算 gold） |
| `report --run <目录>` | 生成 `report.json` + `report.md`（`--no-session` 跳过会话解码；`--strict-csv` 对 CSV 列漂移直接失败） |
| `all <run 参数>` | `run` → `score` → `report` |
| `parity [--run <目录> \| --all-results]` | 本地 ndjson 读取器对账 grade 的 `questions.csv`（13 字段逐值） |

run 参数：`--jobs 4` · `--timeout 600`（单题秒数）· `--min-free-mb 700`（派发前内存闸）· `--out <目录>`（run 目录）· `--ledger`（落 `results/` 官方台账）· `--patch <yml>`（可重复；默认 `dsh_dlr/dsh.patch.yml`）· `--profile headless` · `--skip-precheck` · `--dry-run` · `--yes` · `--force`（覆盖已存在 run 目录）· `--run-id <id>`。

全局：`--scenario <路径\|包名>`（默认 `$TSM_SCENARIO` 或仓库默认场景）· `--tsm <目录\|bin/tsm.mjs>` · `--dsh-bin <lib/bin.js>` · `--dsh-home <路径>`。

## run 目录与产物

```
<run 目录>/                    默认 <场景>/eval/runs/<时间戳>_<scope>/
│                              （安装态：$TSM_OUT_DIR/eval/runs/...）
├─ run.json        参数、环境指纹、考卷 sha1、逐题 {qid,file,rc,sha1,...}
├─ questions.tsv   qid / db / 题面（派发清单）
├─ raw/            <MMDD_HHMMSS>_<qid>_dlr.ndjson + .err（grade 兼容命名）
├─ questions.csv   tsm grade 产出（22 列——唯一判据）
├─ summary.md      tsm grade 产出
└─ report.json / report.md
```

**官方台账是显式选项。** 默认落 `eval/runs/`（gitignored，`tsm stats` 永不会扫到）；只有 `--ledger` 才写 `results/`，且**超过 5 题必须 `--yes`**（一批 5 题纪律）。已存在的 run 目录拒绝复用，除非 `--force`。

## report.json（schema `dsh-tsm-eval/report@1`）

- `run` / `env` —— git 提交、dsh 版本、模型、补丁 sha1、场景、考卷 sha1、后端状态；
- `baseline_key` —— 环境指纹（git/dsh/模型/补丁/场景/考卷）的 sha1；两轮 key 相同 = 可比（路线 3 diff 的锚）；
- `counts` / `results` —— 评定与判定计数，**`accuracy_valid`**（剔无效轮）对 **`accuracy_raw`**；按库、按考卷口径来源（`gold` 对 `L3 sop#…`）；
- `invalid_rounds` —— 网络瞬断/超时/无 final 的作废轮，带分类（`transport` | `timeout` | `no_turn_end` | `no_final` | `dsh_error` | `empty_stream`）。它们在 `questions.csv` 里表现为 FAIL+0 token——不做分离就会被读成"能力回归"；
- `process` —— 均值、token 合计、证据链使用率（L3/L2/L1 检索、PE 视图、SQL 执行、`Final Answer:` 结论句标记）；
- `questions[]` —— 逐题：grade 行原样嵌入（`source: questions.csv`）、考卷期望/口径来源、完整工具序列、`ndjson_truncated` 标记、会话日志路径与解码事实（token、模型、工具调用）。

## 取证

每题会话日志按 session id 定位并记入报告：

```
$DSH_HOME/sessions/<cwd-slug>/<session-id>/session.v4.jsonl.zstd
```

它们是**多帧 zstd**（每次 append 一帧；普通 zstd 解码器只解第一帧——看着像"空会话"）。`dsh-eval` 自行逐帧解码并记录路径；`DSH-based Agent Service/scripts/decode_session_log.cjs` 是独立的快速摘要器。完整的工具参数（未截断的 SQL）只在这里。

## 纪律

- **一批 5 题**；超 5 需 `--yes`。TRANSPORT / 被杀轮 = 无效轮，重跑即可，不要当错误读；
- **判据 = `tsm grade`**，单一尺子。`report.json` 原样嵌入其行、从不复判；SOP 评定（✅ / 🔁 / ❌ / ⚠）与台账同口径；
- ndjson 在 grade 之后被改动会产生**陈旧 CSV**——`parity` 逐字段可查，report 会标 `csv_stale`；
- 实验轮永不进 `results/`（台账每题取最新一轮）。

## 与旧链的关系

`run_batch.sh` + `run_one.sh` 保留在树内（历史工作流）；`dsh-eval` 逐字段复刻其 dsh 调用契约（argv 顺序、cwd = `dsh_dlr/`、`DSH_HOME` / `DLR_SKILLS_DIR` / `dsh_dlr/.env`），但跨平台（不依赖 bash / GNU timeout）、认 TSM_SCENARIO/TSM_OUT_DIR，并补报告层。`dsh-eval parity --all-results` 可证读取器与台账 CSV 一致（933 行中 932 行逐值相同；唯一差异是已知陈旧 CSV 轮 `0929_1359_financial_secC` 的 q186）。

## 排障

| 症状 | 处置 |
|---|---|
| doctor 报 `profile-bundle` FAIL | `dsh plugin --profile headless add "<abs>/…/dsh-tsm-agent"`（裸 profile 会自动创建：dsh 能跑但**零工具**、白烧 token） |
| doctor 报 `backend` FAIL | `bash "DSH-based Agent Service/scripts/start_backend.sh"` |
| `mcp ... missing:` 工具缺失 | 后端对的是别的场景或 MCP 进程过期；重启后端 |
| `scenario MISMATCH` | 后端在服务另一套场景——用正确的 `TSM_SCENARIO` 重启 |
| `transport` 无效轮 | 上游网络瞬断；该轮作废，重跑（不要计入错误） |
| `tsm grade` 卡死 | 已知（重 gold / 结果集补救）。杀进程重跑即可——金缓存已落盘；`score --timeout` 可设上限 |
| 会话日志"是空的" | 多帧 zstd——用 `dsh-eval report`（逐帧解码）或 `scripts/decode_session_log.cjs` |
| `[run] WARN n questions … --yes` | 批量纪律：显式确认规模 |

## Roadmap

- **0.2**：dsh bundle 面（web 报告浮层 + `/eval` 斜杠命令）；`eval/build.mjs` 给考卷追加式补 `qid`；重试落 `failed/`；台账批量重判模式；
- **路线 3**：按 `baseline_key` 做轮间 diff（同卷、语义资产变更 → 行为差异）。

## 许可

MIT —— 见 [LICENSE](LICENSE)。
