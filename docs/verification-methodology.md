# V2 逐题校验流程与方法论

> 本文档定义 `results_v2.md` 逐题校验的标准流程、数据源、判定规则、备注规范。
> 校验脚本: `scripts/build_verify_table.py` → 生成 `docs/_verify_table.md` → 人工核对 → 同步 `docs/results_v2.md`。

---

## 1. 数据源（每题 6 个）

| # | 数据源 | 位置 | 用途 |
|---|--------|------|------|
| 1 | **results.md 备注** | `docs/results.md` pair 表 + 定性观察节 | 预期 verdict / 已知修复 / 观察叙事 |
| 2 | **dataset.md 已知错误** | `docs/dataset.md` § Gold SQL 已知错误 | gold/evidence/question 缺陷 |
| 3 | **RAW JSON 日志** | `validated_results/round_1/{pair}/raw/{er\|dlr\|rdf}_{qid}.json` | 工具调用链 / SQL 输出 / 最终答案 |
| 4 | **CSV verdict** | `validated_results/round_1/{pair}/agent_stats.csv` | strict_match / judge_verdict / verdict / total_tokens |
| 5 | **token 值** | CSV total_tokens ↔ results.md token 表交叉核对 | 数值一致性 |
| 6 | **verdict 逻辑** | strict FAIL + judge CORRECT = 翻盘；全 INCORRECT = 真错 | 判定一致性 |
| 7 | **gold 正确性** | `Evaluation/outputs/00_golden_cache.json` + `MINIDEV_sqlite/mini_dev_sqlite.json` | 独立验证 gold 结果 |

---

## 2. 核对流程（每题）

### Step 1: 拉齐基础数据
```python
# gold result + question + evidence + SQL
gold_cache[qid] → rows / columns / ok
mini_dev[qid] → question / evidence / SQL / difficulty

# CSV verdict + token
agent_stats.csv → strict_match, judge_verdict, verdict, total_tokens

# Raw JSON → tool chain + execute_sql output + final answer
```

### Step 2: 一致性判定

| 检查项 | 一致标准 | 不一致标记 |
|--------|---------|-----------|
| CSV token ↔ results.md token 表 | 数值完全相等 | 🔴 token 错录 |
| CSV verdict ↔ results.md pair 表 | 100% = CORRECT, 50% = 1/2 | 🔴 归档错误 |
| strict + judge 逻辑 | FAIL+CORRECT=翻盘, FAIL+INCORRECT=真错 | ⚠️ judge 矛盾 |
| gold result 正确性 | 独立 SQLite 重放 = cache | 🟡 gold bug |
| evidence 引导 | Agent 按 evidence 执行 = 正确 | 🟡 evidence 误导 |

### Step 3: Raw 日志深读（仅限需要时）
- 工具调用链是否走 SOP（semantic_query → mapping → execute_sql）
- 召回是否跨库漂移（非目标库实体出现在 top-k）
- strict FAIL 根因（多余列 / 缺列 / 格式差异 / 值偏差）
- judge 翻盘理由是否成立

### Step 4: 与现有观察交叉
- 对照 `results.md` 定性观察节
- 发现矛盾 → 修正观察（如 "首个" 表述）
- 发现新观察 → 判断是否值得记录（见 §3）

---

## 3. 备注列规范

v2 表最后两列分工明确：

### 数据集备注（倒数第二列）
**只记 gold/evidence/question 本身的缺陷**，对应 `dataset.md` § Gold SQL 已知错误。

| 类型 | 示例 |
|------|------|
| gold bug | `gold bug(未过滤最低消费客户)` |
| gold 语义偏差 | `gold语义偏差(COUNT(*)非客户数)` |
| gold typo | `gold typo` |
| evidence 缺漏 | `evidence缺DATE()` |
| evidence 误导 | `evidence伪代码(SUBTRACT(DATETIME,birthday))` |
| question 修正 | `question修正(条件互斥)` |
| gold 方向反 | `gold ratio方向反(门诊/住院→住院/门诊)` |
| gold 过度要求 | `gold过度要求RANK()列` |

### 备注（最后一列）
**只记两类，其余不写：**

| 类型 | 标准 | 示例 |
|------|------|------|
| **测试观察** | 范式行为差异 / 效率对比 / strict-judge 模式 | `DLR教科书链路(3工具1次SQL)；RDF唯一strict PASS` |
| **建模发现** | 从测试中沉淀的建模规律 / 适用边界 | `简单题ER更高效(35K vs 72K vs 94K)` |
| **归档不一致** | CSV 与 results.md 矛盾 | `⚠️CSV=INCORRECT MD=100%` |

### 不写的内容
- ❌ 系统修复记录（如 "db-aware recall 已修复"）— 与测试/建模无关
- ❌ 泛泛的效率描述（如 "DLR token 最低"）— 已被汇总统计覆盖
- ❌ 重复的观察 — 已有的不重复记
- ❌ 不确定的推测 — 只写 raw 日志证实的事实

---

## 4. 核对判定决策树

```
开始核对 qid
  │
  ├─ dataset.md 有 gold/evidence/question 缺陷？
  │    └─ 是 → 数据集备注列填写（从 dataset.md 精确引用）
  │
  ├─ CSV verdict ≠ results.md pair 表？
  │    └─ 是 → 🔴 归档错误，记入"数据不一致报告"
  │
  ├─ CSV token ≠ results.md token 表？
  │    └─ 是 → 🔴 token 错录，修正 results.md
  │
  ├─ 有观察价值？（范式行为差异 / 建模规律 / 适用边界）
  │    ├─ 是 → 与 results.md 已有观察交叉
  │    │    ├─ 矛盾 → 修正 results.md 观察
  │    │    └─ 互补 → 新增备注
  │    └─ 否 → 不写
  │
  └─ 通过 → 继续下一题
```

---

## 5. 脚本维护

`scripts/build_verify_table.py` 中维护两个字典：

```python
# 数据集备注: gold/evidence/question 缺陷 (对应 dataset.md)
q_dataset_notes = {
    1481: "gold bug(未过滤最低消费客户)",
    ...
}

# 备注: 测试观察 + 建模发现 (不含系统修复)
q_obs_notes = {
    1471: "DLR教科书链路(3工具1次SQL)；RDF唯一strict PASS",
    ...
}
```

新增条目时同步更新本方法论文档的示例表。

---

## 6. 当前进度

| 范围 | 状态 |
|------|------|
| q1471-q1473 | ✅ 已核对 + 备注已填 |
| q1474-q1475 | ⬜ 未核对 |
| q1476 | ✅ 已核对（无需备注） |
| q1479 | ✅ 已核对（YAML 修复不记） |
| q1480 | ✅ 已核对（无需备注） |
| q1481-q1482 | ✅ 已核对（gold bug 已记） |
| q1483-q1533 | ⬜ 未核对 |

---

## 7. 每题核对产出

核对完一题后，产出以下判断之一：

| 产出 | 含义 |
|------|------|
| ✅ 通过 | 数据一致，无观察 |
| 📝 新增备注 | 发现测试观察或建模发现 |
| 🔴 修正 | 发现 results.md 内部矛盾或归档错误 |
| 🟡 数据集缺陷 | gold/evidence 问题（通常已记录） |

核对结果不单独落盘，直接在 v2 表 + results.md 中体现。
