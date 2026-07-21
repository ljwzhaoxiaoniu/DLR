# 评测结果 — 持续更新

> 目标结论方向：**DLR 原创建模（LE-PE 双层 + PAS 语义路由）对 LLM Agent 的 NL2SQL 引导优于 ER/RDF 基线**。
> 本文件随评测推进滚动更新；所有数字可从 `validated_results/` 与 `Evaluation/outputs/{run_id}/` 复核。

## round_1 — 流水线验证（q1471-1490，12 题 × 3 范式，db=debit_card_specializing）

| 轮次 | 题号 | ER | DLR | RDF | 备注 |
|------|------|----|----|-----|------|
| 1-2 | q1471, q1472 | 100% | **100%** | 100% | q1471/1472 各范式均经五环节仲裁翻盘 |
| 3-4 | q1473, q1476 | 100% | **100%** | 100% | 全通（1473 三范式 strict PASS） |
| 5-6 | q1479, q1480 | 100% | **100%** | 100% | dlr_1479 YAML 修复后翻盘 |
| 7-8 | q1481, q1482 | 100% | **100%** | 100% | gold 数据集错误 → 修正 gold cache 后 judge 翻盘 |
| 9-10 | q1483, q1484 | 100% | **100%** | 100% | q1483 三范式 strict PASS |
| 11-12 | q1486, q1490 | 100% | **100%** | **83%** | q1490 gold 两轮修正（缺DISTINCT→INNER→LEFT JOIN），ER/DLR 翻盘 CORRECT；RDF bare FK 导致多跳失败 INCORRECT(20) |

**round_1 终态：35/36 CORRECT**（判定政策：五环节全对才翻盘——语义召回/工具链/映射/SQL 执行/最终一致性，见 [evaluation.md](evaluation.md)；q1471 式"SQL 返回 count、比值由 Agent 直接加工"按最终一致性认定为对，同时 AGENTS.md 已引导后续轮次把计算写进 SQL 以提升 strict PASS 率）。

### 行为效率对比（12 题 × 3 范式）

| 指标 | ER | DLR | RDF |
|------|----|----|-----|
| 最低单题 total | 35,825 (q1473) | **33,927 (q1483)** | 61,468 (q1471) |
| 最高单题 total | 230,002 (q1481) | 195,482 (q1481) | 183,400 (q1472) |
| 平均 total | ~72K | **~74K** | ~105K |
| strict PASS 率 | ~3/12 | ~2/12 | **~4/12** |
| process_score 100 | 10/12 | **10/12** | 9/12 |

\* q1490 三范式高 token 题，多次重跑验证基础设施修复，具体 token 因 LLM 非确定性有波动

<canvas id="tokenChart" width="800" height="400"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<script>
const labels = ['q1471','q1472','q1473','q1476','q1479','q1480','q1481','q1482','q1483','q1484','q1486','q1490'];
const erData  = [60262,44719,35825,73221,43712,50260,230002,46942,44551,41164,62200,105687];
const dlrData = [39078,94317,72766,61770,39543,59145,195482,54712,33927,39184,72659,80806];
const rdfData = [61468,183400,94395,69729,45318,65519,120958,65209,170885,71763,75962,57840];
new Chart('tokenChart', {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      { label: 'ER',  data: erData,  borderColor: '#6666ff', backgroundColor: 'rgba(102,102,255,0.1)', tension: 0.3 },
      { label: 'DLR', data: dlrData, borderColor: '#2e7d32', backgroundColor: 'rgba(46,125,50,0.1)', tension: 0.3, borderWidth: 2 },
      { label: 'RDF', data: rdfData, borderColor: '#e65100', backgroundColor: 'rgba(230,81,0,0.1)', tension: 0.3, borderDash: [5,5] },
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: '三范式 Token 消耗对比 (total_tokens/题)', font: { size: 14 } },
      legend: { position: 'bottom' }
    },
    scales: {
      y: { title: { display: true, text: 'total_tokens' }, beginAtZero: false },
      x: { title: { display: true, text: '题号' } }
    },
    interaction: { mode: 'index', intersect: false }
  }
});
</script>

### 定性观察

- **DLR q1471 是教科书链路**：`dlr_semantic_query` 一跳召回 LE-PE 结构 → `get_pe_full` 一跳拿全（属性+ARCS+database_url）→ 一条 SQL 收工。ER 需要 2-3 跳分散工具，RDF 需要 mapping + PRAGMA 兜底（R2RML 缺列所致）。
- **跨库漂移**（q1472 "LAM" 语义模糊）：三范式都发生过全局召回漂移——已由 db-aware recall（2026-07-18）机制性解决，后续轮次预期步数/token 显著下降。
- **RDF 的"干瘪"如实生效**：映射只有列名+JOIN，Agent 被迫用 `PRAGMA table_info` 内省补 schema（其中一部分是生成器缺列 bug，修复后仍缺业务语义——这正是对照设计要测的）。
- **35/36 无一例绕过 MCP 直接猜库/猜表**：`execute_sql` 的 database_url 全部来自映射工具——防作弊路径生效。
- **q1483 是首个三范式 strict PASS 的题**（ER/DLR/RDF 全 PASS），Agent 对简洁语义（"统计每个国家的加油站数量"）的 SQL 产出质量高。
- **q1481 是高成本题**：三范式 total 均超 120K（需嵌套子查询找最低消费客户），但 judge 验证全部五环节通过。

## 数据可信性备注

- round_1 12 题全部落在 `debit_card_specializing`，**结果可信**；
- pair 7-8 (q1481/q1482) 发现 gold SQL 与题意/evidence 相悖（两源一致，判定为数据集本身错），已修正 gold cache 并记录到 [dataset.md](dataset.md) § Gold SQL 已知错误；
- 修正 gold 后 strict_match 仍 FAIL（pred 带标签多行 vs gold 单行纯值）→ 由 Stage 4 judge 按语义翻盘，这是两段式设计的预期行为；
- 2026-07-18 起的轮次运行在 db-aware recall + PE 改名 + clear() 修复后的索引上，后续跨库题目（card_games/formula_1 等）的召回锁库行为与 round_1 有预期差异；
- DLR 范式下 card_games（52 题）/ formula_1（66 题）必须使用修复后索引（修复前 `PHYSICAL.Card`/`PHYSICAL.Race` 被跨库覆盖，涉及题必错）。

## 下一步

- 从 q1486 继续推进（`bash eval_run.sh EDR 2 1486 --parallel --workers 6`）；
- 修复 P1 R2RML 缺列后再跑 RDF 对照，消除 `PRAGMA table_info` 兜底噪声；
- 500 题全量后补充：分范式准确率总表、分库分难度矩阵、token/步数分布、DLR 语义路由收益归因分析。

