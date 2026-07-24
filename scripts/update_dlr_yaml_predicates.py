"""Add column-level descriptions to DLR YAML attributes (same predicates as RDF)."""
import yaml
import os
from collections import defaultdict

# Same column semantics as RDF update — keyed by physical_column_id
# Format: db.table.column -> description_string
COLUMN_DESCRIPTIONS = {

# ======= toxicology =======
'toxicology.atom.atom_id': ('原子ID', '原子的唯一标识符'),
'toxicology.atom.molecule_id': ('所属分子ID', '该原子所属分子的唯一标识，关联 molecule 表'),
'toxicology.atom.element': ('元素符号', '化学元素符号，如 o=氧、c=碳、h=氢、n=氮'),
'toxicology.bond.bond_id': ('化学键ID', '化学键的唯一标识符'),
'toxicology.bond.molecule_id': ('所属分子ID', '该化学键所属分子的唯一标识，关联 molecule 表'),
'toxicology.bond.bond_type': ('键类型', '化学键类型：- 单键、= 双键、# 三键'),
'toxicology.molecule.molecule_id': ('分子ID', '分子的唯一标识符'),
'toxicology.molecule.label': ('致癌性标签', '该分子是否具有致癌性'),
'toxicology.connected.atom_id': ('原子1 ID', '连接中第一个原子的ID'),
'toxicology.connected.atom_id2': ('原子2 ID', '连接中第二个原子的ID'),
'toxicology.connected.bond_id': ('化学键ID', '该连接对应的化学键ID'),

# ======= thrombosis_prediction =======
'thrombosis_prediction.Patient.ID': ('患者ID', '患者的唯一标识符'),
'thrombosis_prediction.Patient.Diagnosis': ('诊断结果', '疾病诊断结果，如 SLE=系统性红斑狼疮、MCTD=混合性结缔组织病'),
'thrombosis_prediction.Laboratory.ID': ('患者ID', '患者唯一标识，关联 Patient 表'),
'thrombosis_prediction.Laboratory.Date': ('检查日期', '实验室检查的日期'),

# ======= student_club =======
'student_club.event.event_id': ('活动ID', '校园活动唯一标识符'),
'student_club.event.event_name': ('活动名称', '校园活动名称'),
'student_club.event.type': ('活动类型', '活动类型，如 Meeting=会议、fundraiser=筹款'),
'student_club.attendance.link_to_event': ('关联活动ID', '参加的活动ID，关联 event 表'),
'student_club.attendance.link_to_member': ('关联成员ID', '参加的成员ID，关联 member 表'),
'student_club.member.member_id': ('成员ID', '社团成员唯一标识符'),
'student_club.member.first_name': ('名', '成员的名字'),
'student_club.member.last_name': ('姓', '成员的姓氏'),
'student_club.member.link_to_major': ('专业ID', '成员所属专业ID，关联 major 表'),
'student_club.member.t_shirt_size': ('T恤尺码', '成员的T恤尺码'),
'student_club.major.major_id': ('专业ID', '专业唯一标识符'),
'student_club.major.major_name': ('专业名称', '专业的名称'),

# ======= european_football_2 =======
'european_football_2.Team.team_api_id': ('球队API ID', '球队唯一标识符'),
'european_football_2.Team.team_long_name': ('球队全名', '球队完整名称'),
'european_football_2.Team_Attributes.team_api_id': ('球队API ID', '关联 Team 表的球队ID'),
'european_football_2.Team_Attributes.buildUpPlaySpeed': ('组织进攻速度', '球队组织进攻的速度评分'),
'european_football_2.Match.home_team_goal': ('主队进球', '主队的进球数量'),
'european_football_2.Match.away_team_goal': ('客队进球', '客队的进球数量'),
'european_football_2.Match.season': ('赛季', '比赛所属赛季，格式如 2015/2016'),
'european_football_2.Match.league_id': ('联赛ID', '所属联赛ID，关联 League 表'),
'european_football_2.Match.home_team_api_id': ('主队API ID', '主队ID，关联 Team 表'),
'european_football_2.Match.away_team_api_id': ('客队API ID', '客队ID，关联 Team 表'),
'european_football_2.League.id': ('联赛ID', '联赛唯一标识符'),
'european_football_2.League.name': ('联赛名称', '联赛名称'),

# ======= formula_1 =======
'formula_1.drivers.driverId': ('车手ID', 'F1车手唯一标识符'),
'formula_1.drivers.driverRef': ('车手引用名', '车手英文引用名'),
'formula_1.drivers.surname': ('姓氏', '车手的姓氏'),
'formula_1.races.raceId': ('比赛ID', 'F1比赛唯一标识符'),
'formula_1.races.year': ('年份', '比赛举办年份'),
'formula_1.races.name': ('比赛名称', '大奖赛名称'),
'formula_1.races.circuitId': ('赛道ID', '比赛赛道ID，关联 circuits 表'),
'formula_1.qualifying.raceId': ('比赛ID', '所属比赛ID'),
'formula_1.qualifying.driverId': ('车手ID', '参加排位赛的车手ID'),
'formula_1.qualifying.q1': ('Q1成绩', '排位赛Q1阶段成绩（毫秒）'),
'formula_1.qualifying.q2': ('Q2成绩', '排位赛Q2阶段成绩（毫秒），NULL=未进Q2'),
'formula_1.constructor_results.raceId': ('比赛ID', '比赛ID'),
'formula_1.constructor_results.constructorId': ('车队ID', 'F1车队唯一标识符'),
'formula_1.constructor_results.points': ('积分', '车队在该场比赛中获得的积分'),
'formula_1.constructors.constructorId': ('车队ID', 'F1车队唯一标识符'),
'formula_1.constructors.name': ('车队名称', '车队完整名称'),
'formula_1.constructors.nationality': ('国籍', '车队所属国家/地区'),
'formula_1.circuits.circuitId': ('赛道ID', 'F1赛道唯一标识符'),

# ======= superhero =======
'superhero.superhero.id': ('英雄ID', '超级英雄唯一标识符'),
'superhero.superhero.superhero_name': ('英雄名称', '超级英雄的名称'),
'superhero.superpower.id': ('能力ID', '超能力唯一标识符'),
'superhero.superpower.power_name': ('能力名称', '超能力的名称'),
'superhero.hero_power.hero_id': ('英雄ID', '拥有该能力的英雄ID'),
'superhero.hero_power.power_id': ('能力ID', '该英雄拥有的超能力ID'),

# ======= codebase_community =======
'codebase_community.users.Id': ('用户ID', 'Stack Overflow 用户唯一标识符'),
'codebase_community.users.DisplayName': ('显示名称', '用户显示名称'),
'codebase_community.users.Reputation': ('声望值', '用户声望值'),
'codebase_community.users.CreationDate': ('注册日期', '用户注册日期'),
'codebase_community.posts.Id': ('帖子ID', '帖子唯一标识符'),
'codebase_community.posts.PostTypeId': ('帖子类型ID', '1=问题、2=回答'),
'codebase_community.posts.OwnerUserId': ('作者ID', '帖子作者的用户ID'),
'codebase_community.posts.Score': ('得分', '帖子得分（赞-踩）'),
'codebase_community.posts.ViewCount': ('查看次数', '帖子查看次数'),

# ======= card_games =======
'card_games.cards.id': ('卡牌ID', '卡牌唯一标识符'),
'card_games.cards.name': ('卡牌名称', '卡牌名称'),
'card_games.cards.uuid': ('UUID', '卡牌全局唯一标识符'),
'card_games.cards.borderColor': ('边框颜色', '卡牌边框颜色，borderless=无边框'),
'card_games.cards.cardKingdomFoilId': ('CK闪卡ID', 'CardKingdom 平台闪卡ID，NULL=无闪卡版本'),
'card_games.cards.cardKingdomId': ('CK普通卡ID', 'CardKingdom 平台普通卡ID，NULL=无该平台版本'),
'card_games.cards.setCode': ('系列代码', '卡牌所属系列的代码'),
'card_games.cards.rarity': ('稀有度', '卡牌稀有度'),
'card_games.cards.artist': ('画师', '卡牌插画画师名称'),
'card_games.sets.code': ('系列代码', '系列代码'),
'card_games.sets.name': ('系列名称', '卡牌系列名称'),

# ======= debit_card_specializing =======
'debit_card_specializing.customers.CustomerID': ('客户ID', '客户唯一标识符'),
'debit_card_specializing.customers.Segment': ('客户分类', '客户市场细分，SME=中小企业/LAM=本地客户/KAM=大客户'),
'debit_card_specializing.customers.Currency': ('币种', '客户使用的货币，CZK=捷克克朗/EUR=欧元'),
'debit_card_specializing.transactions_1k.CustomerID': ('客户ID', '交易所属客户ID，关联 customers 表'),
'debit_card_specializing.transactions_1k.Date': ('交易日期', '交易日期，格式 YYYY-MM-DD'),
'debit_card_specializing.transactions_1k.Time': ('交易时间', '交易时间，格式 HH:MM:SS'),
'debit_card_specializing.transactions_1k.Amount': ('交易金额', '交易金额'),
'debit_card_specializing.transactions_1k.Price': ('单价', '产品单价'),
'debit_card_specializing.transactions_1k.ProductID': ('产品ID', '关联 products 表的产品ID'),
'debit_card_specializing.transactions_1k.GasStationID': ('加油站ID', '关联 gasstations 表的加油站ID'),
'debit_card_specializing.gasstations.GasStationID': ('加油站ID', '加油站唯一标识符'),
'debit_card_specializing.gasstations.Country': ('国家', '加油站所在国家代码，CZE=捷克'),
'debit_card_specializing.gasstations.ChainID': ('连锁品牌ID', '加油站连锁品牌ID'),
'debit_card_specializing.yearmonth.CustomerID': ('客户ID', '客户ID，关联 customers 表'),
'debit_card_specializing.yearmonth.Date': ('月份', '年月，格式 YYYYMM，如 201301 表示2013年1月'),
'debit_card_specializing.yearmonth.Consumption': ('消费量', '该客户当月总消费量（升）'),
'debit_card_specializing.products.ProductID': ('产品ID', '产品唯一标识符'),
'debit_card_specializing.products.Description': ('产品描述', '产品名称/描述'),
}


def update_dlr_yaml(yaml_path, db_prefix):
    """Add descriptions to attributes in a DLR YAML file."""
    with open(yaml_path, encoding='utf-8') as f:
        content = f.read()
        data = yaml.safe_load(content)

    modified = 0
    for le in data.get('logical_entities', []):
        # Public attributes
        for attr in le.get('public_attributes', []):
            attr_id = attr.get('attr_id', '')
            # Map from logical attr to physical column through C
            for pe in le.get('physical_entities', []):
                if attr_id in pe.get('C', {}):
                    physical_col = pe['C'][attr_id]
                    key = physical_col  # e.g., toxicology.atom.atom_id
                    if key in COLUMN_DESCRIPTIONS:
                        label, comment = COLUMN_DESCRIPTIONS[key]
                        if attr.get('description', '') == '':
                            attr['description'] = f'{label}: {comment}'
                            modified += 1
                    break

        # Private attributes in physical entities
        for pe in le.get('physical_entities', []):
            for attr in pe.get('private_attributes', []):
                key = attr.get('physical_column_id', '')
                if key in COLUMN_DESCRIPTIONS:
                    label, comment = COLUMN_DESCRIPTIONS[key]
                    if attr.get('description', '') == '':
                        attr['description'] = f'{label}: {comment}'
                        modified += 1

    if modified > 0:
        # Write back preserving format as much as possible
        # Use yaml.dump with flow style for compactness
        with open(yaml_path, 'w', encoding='utf-8') as f:
            yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)
        return modified

    return 0


if __name__ == '__main__':
    base = 'Semantic Core Service/configs/scenarios/DLR'
    total = 0

    # Map YAML filenames to DB prefix
    db_map = {
        'toxicology.yaml': 'toxicology',
        'thrombosis_prediction.yaml': 'thrombosis_prediction',
        'student_club.yaml': 'student_club',
        'european_football_2.yaml': 'european_football_2',
        'formula_1.yaml': 'formula_1',
        'superhero.yaml': 'superhero',
        'codebase_community.yaml': 'codebase_community',
        'card_games.yaml': 'card_games',
        'debit_card_specializing.yaml': 'debit_card_specializing',
    }

    for filename, db_prefix in db_map.items():
        yaml_path = os.path.join(base, filename)
        if not os.path.exists(yaml_path):
            print(f'SKIP {filename}: not found')
            continue
        n = update_dlr_yaml(yaml_path, db_prefix)
        total += n
        print(f'{filename}: +{n} descriptions')

    print(f'\nTotal: {total} column descriptions added across all DLR YAMLs')
