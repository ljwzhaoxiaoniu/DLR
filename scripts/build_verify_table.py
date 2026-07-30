"""Build per-question verification table: strict/judge/result/token per paradigm."""
import csv, os, re, io
from collections import defaultdict

BASE = "D:/Code_Proj/DLR Proj/validated_results/round_1"
MD_PATH = "D:/Code_Proj/DLR Proj/docs/results.md"
OUT_PATH = "D:/Code_Proj/DLR Proj/docs/_verify_table.md"


def parse_csv_robust(path):
    """Parse CSV handling multi-line judge_reason fields."""
    content = None
    for enc in ["utf-8-sig", "gbk", "latin-1"]:
        try:
            with open(path, encoding=enc) as f:
                content = f.read()
            break
        except (UnicodeDecodeError, KeyError):
            continue

    if not content:
        return []

    # Merge continuation lines (multi-line judge_reason)
    lines = content.split('\n')
    # First line is always the header
    merged = [lines[0]] if lines else []
    for line in lines[1:]:
        is_new_row = bool(re.match(r'^("?er"?|"?dlr"?|"?rdf"?|\d+),', line))
        if is_new_row:
            merged.append(line)
        else:
            # Continuation of previous row's multi-line field
            if merged:
                merged[-1] += ' ' + line

    if not merged:
        return []

    header = merged[0]
    is_new_format = 'paradigm' in header and 'q_id' in header

    results = []
    for line in merged[1:]:
        if not line.strip():
            continue

        # Use csv reader for proper quoted field handling
        try:
            row = list(csv.reader(io.StringIO(line)))
        except:
            continue
        if not row:
            continue
        parts = row[0]

        if is_new_format:
            # paradigm,q_id,db_id,strict_match,judge_verdict,judge_reason,verdict,...,total_tokens
            if len(parts) < 7:
                continue
            paradigm = parts[0].strip().lower()
            qid = parts[1].strip()
            strict = parts[3].strip()
            judge = parts[4].strip()
            verdict = parts[6].strip()
            token = parts[13].strip() if len(parts) > 13 else ''
        else:
            # question_id,paradigm,steps,tokens_total,...,strict_match,judge_verdict,judge_reason,verdict
            if len(parts) < 15:
                continue
            paradigm = parts[1].strip().lower()
            qid = parts[0].strip()
            strict = parts[11].strip()
            judge = parts[12].strip()
            verdict = parts[14].strip()
            token = parts[3].strip()

        if paradigm not in ['er', 'dlr', 'rdf'] or not qid.isdigit():
            continue

        results.append({
            'qid': int(qid),
            'paradigm': paradigm,
            'strict': strict,
            'judge': judge,
            'verdict': verdict,
            'token': int(token) if token.isdigit() else 0,
        })

    return results


# 1. Read all CSVs
csv_data = {}
for pair_dir in os.listdir(BASE):
    if not re.match(r"^\d+-\d+$", pair_dir):
        continue
    csv_path = os.path.join(BASE, pair_dir, "agent_stats.csv")
    if not os.path.exists(csv_path):
        continue
    rows = parse_csv_robust(csv_path)
    for r in rows:
        csv_data.setdefault(r['qid'], {})[r['paradigm']] = {
            "strict": r["strict"],
            "judge": r["judge"],
            "result": r["verdict"],
            "token": r["token"],
            "db": r.get("db", ""),
        }

# 2. Parse results.md for verdicts + tokens
md_rows = {}
with open(MD_PATH, encoding="utf-8") as f:
    md = f.read()

for line in md.split("\n"):
    if not line.startswith("|"):
        continue
    parts = [p.strip() for p in line.split("|")]
    if len(parts) < 8:
        continue
    pair_str = parts[1]
    if not re.match(r"^\d+-\d+$", pair_str):
        continue
    db = parts[2]
    qids_str = parts[3]
    if not re.match(r"^q\d", qids_str):
        continue
    try:
        er_p = int(parts[4].replace("*", "").replace("%", ""))
        dlr_p = int(parts[5].replace("*", "").replace("%", ""))
        rdf_p = int(parts[6].replace("*", "").replace("%", ""))
    except ValueError:
        continue
    note = parts[7] if len(parts) > 7 else ""
    qids = [int(q.strip()[1:]) for q in qids_str.split(",")]
    for qid in qids:
        md_rows[qid] = {"er": er_p, "dlr": dlr_p, "rdf": rdf_p, "note": note, "db": db}

# Token sub-table from results.md
token_line = {}
for line in md.split("\n"):
    m = re.match(r"\|\s*q(\d+)\s*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|\s*([\d,]+)\s*\|", line)
    if m:
        qid = int(m.group(1))
        token_line[qid] = (m.group(2), m.group(3), m.group(4))

# 3. DB ordering + mapping
db_map = {
    "credit": "debit_card_specializing",
    "student": "student_club",
    "thrombosis": "thrombosis_prediction",
    "football": "european_football_2",
    "formula_1": "formula_1",
    "superhero": "superhero",
    "codebase": "codebase_community",
    "card_games": "card_games",
    "toxicology": "toxicology",
    "california": "california_schools",
    "financial": "financial",
    "formula_1+superhero": "formula_1",
    "superhero+formula_1": "superhero",
}
db_order = [
    "debit_card_specializing", "student_club", "thrombosis_prediction",
    "european_football_2", "formula_1", "superhero", "codebase_community",
    "card_games", "toxicology", "california_schools", "financial",
]
db_short = {
    "debit_card_specializing": "debit_card", "student_club": "student_club",
    "thrombosis_prediction": "thrombosis", "european_football_2": "football",
    "formula_1": "formula_1", "superhero": "superhero",
    "codebase_community": "codebase", "card_games": "card_games",
    "toxicology": "toxicology", "california_schools": "california",
    "financial": "financial",
}

all_qids = sorted(set(csv_data.keys()) | set(md_rows.keys()))
by_db = defaultdict(list)
for qid in all_qids:
    md_db = md_rows.get(qid, {}).get("db", "")
    canon = db_map.get(md_db, md_db)
    by_db[canon].append(qid)

# 4. Per-quid notes — split into 数据集问题 vs 范式行为/归档观察
q_dataset_notes = {
    1481: "gold bug(未过滤最低消费客户)",
    1482: "gold bug(分母应为2013)",
    1490: "gold bug(两轮修正)",
    1529: "gold笛卡尔积bug(已修正cache)",
    1531: "数据集无矛盾(evidence/gold SQL/gold cache均为SUM(Price)/SUM(Amount)=22.55)",
    1505: "gold语义偏差(COUNT(*)非客户数)",
    1525: "gold同1505缺陷",
    1526: "gold返回NULL(子查询无匹配)",
    94: "question修正(条件互斥)",
    95: "gold bug(只实现最年轻丢掉最高薪资)",
    1031: "evidence伪代码(SUBTRACT(DATETIME,birthday))",
    1029: "gold ASC/DESC颠倒",
    1152: "gold ratio方向反(门诊/住院→住院/门诊)",
    198: "evidence笛卡尔积(去笛卡尔积修正)",
    207: "gold SQL bug(分子级关联vs原子级)",
    341: "gold typo",
    344: "evidence缺印刷版本约束",
    349: "gold bug(答非所问)",
    352: "gold bug(分母错)",
    533: "evidence缺DATE()",
    26: "gold bug(Free Meal→FRPM Count)待修正",
    27: "average歧义(列名+question双触发AVG)",
    17: "gold过度要求RANK()列",
    726: "gold过度要求RANK()列",
    23: "evidence公式触发ABS()→自然语言修正",
    847: "gold NULL排序bug(Fisichella应为Räikkönen)",
}
q_obs_notes = {
    1471: "DLR教科书链路(3工具1次SQL)；RDF唯一strict PASS",
    1473: "三范式strict PASS；简单题ER更高效(35K vs 72K vs 94K)",
    1481: "高成本题(三范式total均超120K)；gold bug修正后judge翻盘",
    1483: "三范式strict PASS；Agent对简洁语义SQL产出质量高",
    1493: "三范式strict PASS(DLR/RDF全PASS，ER翻盘)",
    1498: "LLM聚合语义盲区:DLR三次MAX(Consumption)→445K而非SUM→GROUP BY→MAX→51.8M；YAML修复后翻盘；ER首次即正确",
    1500: "原创范式工具'教材'角色:ARCS是DLR独创概念，get_pe_full docstring补A_anchor.key=JOIN键后首次正确写出三表JOIN",
    1505: "gold语义偏差:COUNT(*)非客户数；三范式COUNT(DISTINCT CustomerID)更忠实；ER judge超时手动翻盘",
    1514: "结构化查询:DLR judge翻盘；说明预测正确仅格式偏差",
    1515: "结构化查询:三范式strict PASS",
    1524: "ER YAML缺FK relations→Agent走错路；补3条relation+rebuild后翻盘；全互联≠好引导",
    1525: "gold同q1505缺陷:COUNT(CustomerID)计交易次非客户数",
    1526: "gold返回NULL(子查询无匹配)；DLR/RDF绕过缺陷正确给出-5.8152",
    1529: "gold笛卡尔积bug:transactions_1k×yearmonth ON CustomerID致SUM(Price)膨胀20倍；LLM复合问题理解缺陷(两句自然语言合并)",
    1531: "旧跑次三范式全CORRECT(ER 53K/DLR 53K/RDF 47K)",
    1312: "student_club开局；ER/RDF judge翻盘，DLR strict PASS",
    1317: "student_club开局全通",
    1322: "三范式judge翻盘",
    1323: "三范式strict PASS + judge翻盘",
    1331: "DLR strict FAIL→judge翻盘",
    1338: "三范式judge翻盘",
    1339: "DLR建模修复:语义路由错库→Expense独立LE+PAS；389K/25步→34K/4步strict PASS",
    1340: "AGENTS.md引导生效:DLR 72K→34K(-53%)反超",
    1344: "三范式strict PASS",
    1149: "thrombosis开局全通；DLR judge超时手动翻盘",
    1152: "gold ratio方向反:门诊/住院→住院/门诊；DLR/RDF正确算出0.76；修正后DLR strict PASS",
    1153: "三范式judge翻盘",
    1155: "三范式strict PASS",
    1156: "三范式strict PASS",
    1157: "三范式strict PASS",
    1162: "三范式strict PASS",
    1164: "三范式strict PASS",
    1166: "CSV=ER INCORRECT+RDF INCORRECT, pair表已修正为50%",
    1025: "football开局全通",
    1028: "ER tie(Celtic/Rangers各11胜)手动翻盘",
    1029: "gold ASC/DESC颠倒→修正后三范式全对",
    1030: "三范式judge翻盘",
    1031: "evidence伪代码(SUBTRACT(DATETIME,birthday))→LLM无法执行；改自然语言后翻盘；三范式全INCORRECT",
    1032: "重跑judge翻盘全CORRECT",
    1035: "三范式strict PASS",
    1036: "RDF缺DISTINCT→INCORRECT",
    1037: "ER/RDF JOIN键错(player_fifa_api_id→应为player_api_id)；DLR子查询去重正确",
    1039: "三范式strict PASS",
    846: "formula_1开局全通",
    847: "gold NULL排序bug:Fisichella(q2=NULL)排第一；DLR/RDF返回Räikkönen(judge翻盘)，ER strict PASS返回Fisichella",
    850: "formula_1第二对全通",
    854: "三范式judge翻盘",
    857: "三范式judge全翻",
    859: "三范式strict PASS",
    861: "evidence未区分两个同名number列；补description后全通",
    862: "三范式strict PASS",
    865: "三范式judge全翻",
    719: "三范式strict PASS；Agent对简洁schema(hero/power)SQL产出质量高",
    723: "三范式strict PASS",
    724: "三范式strict PASS",
    726: "gold过度要求RANK()列(题目只写Rank)；三范式ORDER BY正确缺Rank列号；手动翻盘",
    728: "三范式judge翻盘",
    730: "DLR建模修复后108K→47K(-57%)，judge翻盘",
    732: "三范式strict PASS",
    733: "三范式strict PASS；DLR建模修复(1→9 public)后-49% token",
    736: "三范式judge全翻(最低Intelligence)",
    531: "codebase开局全通；DLR/RDF各1 extract失败但judge翻盘",
    532: "三范式全CORRECT",
    533: "🔴evidence错误:LastAccessDate>'2014-09-01'未用DATE()；三范式照做得5146 vs gold 4941",
    537: "三范式strict PASS",
    539: "三范式strict PASS",
    544: "三范式strict PASS",
    547: "三范式strict PASS",
    549: "ER表名格式错自行修正→judge翻盘；DLR strict PASS，RDF judge翻盘",
    555: "三范式strict PASS",
    557: "三范式strict PASS",
    340: "问题改How many后三范式strict PASS(DLR 33K/ER 51K/RDF 28K)",
    341: "ER大宽表陷阱:cards表78列全暴露→SQL逻辑错误；DLR private_attributes隐藏非核心列避噪",
    344: "🔴语义建模盲区——领域知识:同名卡多印刷版本，gold用id三范式选name；evidence补充后修复",
    345: "三范式judge翻盘",
    346: "三范式strict PASS",
    347: "RDF扁平漏JOIN:看到cards.text就满足，漏掉rulings表；ER/DLR通过mapping/get_pe_full看到rulings FK",
    349: "🔴gold bug答非所问:Max(count(rulings.uuid))找裁决最多promo卡 vs gold算画师promo卡数；DLR judge翻盘",
    352: "🔴gold bug分母错:cards LEFT JOIN foreign_data行数(251939)非卡牌数(56822)；DLR strict PASS",
    356: "三范式strict PASS；DLR 4步/33K最低",
    358: "三范式judge全翻(缺DISTINCT)",
    366: "DLR建模修复后110K→36K strict PASS",
    368: "三范式strict PASS",
    195: "三范式judge翻盘",
    197: "ER JOIN膨胀:molecule→bond致氧计数被bond条数放大(2.16→69.28)；DLR PAS桥独立计算DISTINCT molecule_id避开fan-out",
    198: "evidence笛卡尔积(去笛卡尔积修正)+gold cache修正；三范式judge翻盘",
    200: "三范式judge翻盘",
    201: "三范式strict PASS",
    206: "RDF探索≠答案:找到connected表但最终SQL弃之不用；attribute和relation同为predicate视觉权重相等",
    207: "🔴gold SQL bug:atom JOIN bond ON molecule_id(分子级)→三范式用bond→connected→atom(原子级)精确定位；DLR建模修复110K→43K",
    208: "RDF语义理解错:molecule.label误解为bond.bond_type",
    212: "三范式judge全翻(tied minimum)",
    213: "RDF手动翻盘",
    5: "california开局；ER/DLR strict PASS",
    11: "🔴RDF列歧义:frpm有CDSCode(全码)和School Code(短码)，RDF选错列；ER/DLR选了正确列",
    12: "三范式strict PASS",
    17: "🔴gold过度要求RANK()列(题目只写Rank schools)；DLR judge翻盘；judge不一致非范式问题",
    23: "🔴evidence公式触发ABS():Difference=Enrollment(K-12)-Enrollment(Ages 5-17)→改自然语言后三范式一次全对",
    24: "DLR建模教训:public属性双刃剑(升public后两个School都可见→选错列)；跨库向量漂移(free meal被thrombosis/hero抢走)",
    25: "DLR PE属性归属消解列名歧义:District Name是FRPM的public属性→直接命中frpm；ER/RDF选错satscores.dname",
    26: "🔴gold bug:Free Meal→FRPM Count(题目说free or reduced)；DLR+RDF judge翻盘",
    27: "🔴average歧义:列名AvgScrWrite+question'average'双触发AVG()→三范式全INCORRECT；LLM语义联想非形式符号",
    28: "三范式judge翻盘全CORRECT",
    89: "financial开局全通",
    92: "三范式全CORRECT",
    93: "三范式strict PASS",
    94: "🔴AND歧义:最老且最低薪资条件互斥；question明确执行顺序后DLR strict PASS",
    95: "重跑后DLR CORRECT",
    98: "三范式strict PASS",
    99: "三范式judge全翻",
    100: "DLR建模修复后148K→89K strict PASS(-40%)",
    112: "三范式strict PASS",
    115: "ER手动翻盘(结果40%=gold)",
    1037: "ER/RDF JOIN键错；DLR子查询去重正确",
}

# 5. Build table
out = []
out.append("## 逐题校验表 — strict / judge / result / token")
out.append("")
out.append("> **说明**: 每行一题，每范式 4 列（strict 初判 / judge 仲裁 / result 最终判定 / token 消耗）。")
out.append("> **数据来源**: `validated_results/round_1/*/agent_stats.csv` + `results.md` token 表。")
out.append("> **⚠️ 标记**: CSV 实际 verdict 与 results.md 不一致的题。")
out.append("")
out.append("| 专题 | 题号 | ER-strict | ER-judge | DLR-strict | DLR-judge | RDF-strict | RDF-judge | ER-result | DLR-result | RDF-result | ER-token | DLR-token | RDF-token | 数据集备注 | 备注 |")
out.append("|------|------|-----------|----------|------------|----------|------------|----------|-----------|------------|------------|----------|----------|----------|----------|------|")

for db in db_order:
    for qid in by_db.get(db, []):
        er = csv_data.get(qid, {}).get("er", {})
        dlr = csv_data.get(qid, {}).get("dlr", {})
        rdf = csv_data.get(qid, {}).get("rdf", {})
        md = md_rows.get(qid, {})

        er_s = er.get("strict", "—")
        er_j = er.get("judge", "—")
        er_r = er.get("result", "—")
        er_t = er.get("token", "")
        dlr_s = dlr.get("strict", "—")
        dlr_j = dlr.get("judge", "—")
        dlr_r = dlr.get("result", "—")
        dlr_t = dlr.get("token", "")
        rdf_s = rdf.get("strict", "—")
        rdf_j = rdf.get("judge", "—")
        rdf_r = rdf.get("result", "—")
        rdf_t = rdf.get("token", "")

        # Flag mismatches
        flags = []
        if er_r != "—" and md.get("er") == 100 and er_r != "CORRECT":
            flags.append("⚠️ER")
        if dlr_r != "—" and md.get("dlr") == 100 and dlr_r != "CORRECT":
            flags.append("⚠️DLR")
        if rdf_r != "—" and md.get("rdf") == 100 and rdf_r != "CORRECT":
            flags.append("⚠️RDF")

        ds_note = q_dataset_notes.get(qid, "")
        obs_note = " ".join(flags) if flags else q_obs_notes.get(qid, "")

        er_t_s = f"{er_t:,}" if er_t else "—"
        dlr_t_s = f"{dlr_t:,}" if dlr_t else "—"
        rdf_t_s = f"{rdf_t:,}" if rdf_t else "—"

        out.append(
            f"| {db_short.get(db, db)} | q{qid} | {er_s} | {er_j} "
            f"| {dlr_s} | {dlr_j} "
            f"| {rdf_s} | {rdf_j} "
            f"| {er_r} | {dlr_r} | {rdf_r} "
            f"| {er_t_s} | {dlr_t_s} | {rdf_t_s} | {ds_note} | {obs_note} |"
        )

with open(OUT_PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(out))

print(f"Written {len(out)} lines to {OUT_PATH}")
print(f"Databases: {[(db_short[d], len(by_db[d])) for d in db_order if by_db[d]]}")
