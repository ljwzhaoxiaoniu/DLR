"""Add rdfs:label + rdfs:comment to R2RML TTL predicateObjectMap entries."""
import re, os

ALL_DB = {

'thrombosis_prediction': {
    'Patient': {
        'ID': ('患者ID', '患者的唯一标识符'),
        'Diagnosis': ('诊断结果', '疾病诊断结果，如 SLE=系统性红斑狼疮、MCTD=混合性结缔组织病'),
    },
    'Laboratory': {
        'ID': ('患者ID', '患者唯一标识，关联 Patient 表'),
        'Date': ('检查日期', '实验室检查的日期'),
        'refers_to_Patient': ('所属患者', 'FK：Laboratory.ID → Patient.ID'),
    },
},

'student_club': {
    'event': {
        'event_id': ('活动ID', '校园活动唯一标识符'),
        'event_name': ('活动名称', '校园活动名称'),
        'type': ('活动类型', '活动类型，如 Meeting=会议、fundraiser=筹款'),
        'refers_to_budget': ('关联预算', 'FK：event.event_id → budget.link_to_event'),
    },
    'attendance': {
        'link_to_event': ('关联活动ID', '参加的活动ID，关联 event 表'),
        'link_to_member': ('关联成员ID', '参加的成员ID，关联 member 表'),
        'refers_to_event': ('所属活动', 'FK：attendance.link_to_event → event.event_id'),
        'refers_to_member': ('参与成员', 'FK：attendance.link_to_member → member.member_id'),
    },
    'member': {
        'member_id': ('成员ID', '社团成员唯一标识符'),
        'first_name': ('名', '成员的名字/名'),
        'last_name': ('姓', '成员的姓氏'),
        'link_to_major': ('专业ID', '成员所属专业ID，关联 major 表'),
        't_shirt_size': ('T恤尺码', '成员的T恤尺码'),
        'refer_to_major': ('所属专业', 'FK：member.link_to_major → major.major_id'),
    },
    'major': {
        'major_id': ('专业ID', '专业唯一标识符'),
        'major_name': ('专业名称', '专业的名称'),
    },
},

'european_football_2': {
    'Team': {
        'team_api_id': ('球队API ID', '球队唯一标识符（API来源）'),
        'team_long_name': ('球队全名', '球队完整名称'),
    },
    'Team_Attributes': {
        'team_api_id': ('球队API ID', '关联 Team 表的球队ID'),
        'buildUpPlaySpeed': ('组织进攻速度', '球队组织进攻的速度评分'),
        'refers_to_team': ('所属球队', 'FK：Team_Attributes.team_api_id → Team.team_api_id'),
    },
    'Match': {
        'home_team_goal': ('主队进球', '主队的进球数量'),
        'away_team_goal': ('客队进球', '客队的进球数量'),
        'season': ('赛季', '比赛所属赛季，格式如 2015/2016'),
        'league_id': ('联赛ID', '所属联赛ID，关联 League 表'),
        'home_team_api_id': ('主队API ID', '主队ID，关联 Team 表'),
        'away_team_api_id': ('客队API ID', '客队ID，关联 Team 表'),
        'refers_to_league': ('所属联赛', 'FK：Match.league_id → League.id'),
        'refers_to_home_team': ('主队', 'FK：Match.home_team_api_id → Team.team_api_id'),
        'refers_to_away_team': ('客队', 'FK：Match.away_team_api_id → Team.team_api_id'),
    },
    'League': {
        'id': ('联赛ID', '联赛唯一标识符'),
        'name': ('联赛名称', '联赛名称'),
    },
},

'formula_1': {
    'drivers': {
        'driverId': ('车手ID', 'F1车手唯一标识符'),
        'driverRef': ('车手引用名', '车手的英文引用名称'),
        'surname': ('姓氏', '车手的姓氏'),
    },
    'races': {
        'raceId': ('比赛ID', 'F1比赛唯一标识符'),
        'year': ('年份', '比赛举办年份'),
        'name': ('比赛名称', '大奖赛名称（如 Monaco Grand Prix）'),
        'circuitId': ('赛道ID', '比赛赛道ID，关联 circuits 表'),
        'refers_to_circuit': ('举办赛道', 'FK：races.circuitId → circuits.circuitId'),
    },
    'qualifying': {
        'raceId': ('比赛ID', '所属比赛ID'),
        'driverId': ('车手ID', '参加排位赛的车手ID'),
        'q1': ('Q1成绩', '排位赛Q1阶段成绩（毫秒）'),
        'q2': ('Q2成绩', '排位赛Q2阶段成绩（毫秒），NULL=未进Q2'),
        'refers_to_race': ('所属比赛', 'FK：qualifying.raceId → races.raceId'),
        'refers_to_driver': ('参赛车手', 'FK：qualifying.driverId → drivers.driverId'),
    },
    'constructor_results': {
        'raceId': ('比赛ID', '比赛ID'),
        'constructorId': ('车队ID', 'F1车队唯一标识符'),
        'points': ('积分', '车队在该场比赛中获得的积分'),
        'refers_to_race': ('所属比赛', 'FK：constructor_results.raceId → races.raceId'),
        'refers_to_constructor': ('对应车队', 'FK：constructor_results.constructorId → constructors.constructorId'),
    },
    'constructors': {
        'constructorId': ('车队ID', 'F1车队唯一标识符'),
        'name': ('车队名称', '车队完整名称'),
        'nationality': ('国籍', '车队所属国家/地区'),
    },
    'circuits': {
        'circuitId': ('赛道ID', 'F1赛道唯一标识符'),
    },
},

'superhero': {
    'superhero': {
        'id': ('英雄ID', '超级英雄唯一标识符'),
        'superhero_name': ('英雄名称', '超级英雄的名称'),
    },
    'superpower': {
        'id': ('能力ID', '超能力唯一标识符'),
        'power_name': ('能力名称', '超能力的名称'),
    },
    'hero_power': {
        'hero_id': ('英雄ID', '拥有该能力的英雄ID'),
        'power_id': ('能力ID', '该英雄拥有的超能力ID'),
        'refers_to_superhero': ('所属英雄', 'FK：hero_power.hero_id → superhero.id'),
        'refers_to_superpower': ('对应能力', 'FK：hero_power.power_id → superpower.id'),
    },
},

'codebase_community': {
    'users': {
        'Id': ('用户ID', 'Stack Overflow 用户唯一标识符'),
        'DisplayName': ('显示名称', '用户显示名称'),
        'Reputation': ('声望值', '用户声望值'),
        'CreationDate': ('注册日期', '用户注册日期'),
    },
    'posts': {
        'Id': ('帖子ID', '帖子唯一标识符'),
        'PostTypeId': ('帖子类型ID', '1=问题、2=回答'),
        'OwnerUserId': ('作者ID', '帖子作者的用户ID'),
        'Score': ('得分', '帖子得分（赞-踩）'),
        'ViewCount': ('查看次数', '帖子查看次数'),
        'refers_to_owner': ('作者', 'FK：posts.OwnerUserId → users.Id'),
    },
},

'card_games': {
    'cards': {
        'id': ('卡牌ID', '卡牌唯一标识符'),
        'name': ('卡牌名称', '卡牌名称'),
        'uuid': ('UUID', '卡牌全局唯一标识符'),
        'borderColor': ('边框颜色', '卡牌边框颜色，borderless=无边框'),
        'cardKingdomFoilId': ('CK闪卡ID', 'CardKingdom 平台的闪卡ID，NULL=无闪卡版本'),
        'cardKingdomId': ('CK普通卡ID', 'CardKingdom 平台的普通卡ID，NULL=无该平台版本'),
        'setCode': ('系列代码', '卡牌所属系列的代码'),
        'rarity': ('稀有度', '卡牌稀有度'),
        'artist': ('画师', '卡牌插画画师名称'),
    },
    'sets': {
        'code': ('系列代码', '系列代码'),
        'name': ('系列名称', '卡牌系列名称'),
        'refers_to_set': ('所属系列', 'FK：cards.setCode → sets.code'),
    },
},

'debit_card_specializing': {
    'customers': {
        'CustomerID': ('客户ID', '客户唯一标识符'),
        'Segment': ('客户分类', '客户市场细分（SME/LAM/KAM等）'),
        'Currency': ('币种', '客户使用的货币（CZK/EUR）'),
    },
    'transactions_1k': {
        'CustomerID': ('客户ID', '交易所属客户ID，关联 customers 表'),
        'Date': ('交易日期', '交易日期，格式 YYYY-MM-DD'),
        'Time': ('交易时间', '交易时间，格式 HH:MM:SS'),
        'Amount': ('交易金额', '交易金额'),
        'Price': ('单价', '产品单价'),
        'ProductID': ('产品ID', '关联 products 表'),
        'GasStationID': ('加油站ID', '关联 gasstations 表'),
        'refers_to_customer': ('所属客户', 'FK：transactions_1k.CustomerID → customers.CustomerID'),
        'refers_to_gasstation': ('所属加油站', 'FK：transactions_1k.GasStationID → gasstations.GasStationID'),
        'refers_to_product': ('购买产品', 'FK：transactions_1k.ProductID → products.ProductID'),
    },
    'gasstations': {
        'GasStationID': ('加油站ID', '加油站唯一标识符'),
        'Country': ('国家', '加油站所在国家代码（CZE=捷克）'),
        'ChainID': ('连锁品牌ID', '加油站连锁品牌ID'),
    },
    'yearmonth': {
        'CustomerID': ('客户ID', '客户ID，关联 customers 表'),
        'Date': ('月份', '年月，格式 YYYYMM（如 201301）'),
        'Consumption': ('消费量', '该客户当月的总消费量（升）'),
        'refers_to_customer': ('所属客户', 'FK：yearmonth.CustomerID → customers.CustomerID'),
    },
    'products': {
        'ProductID': ('产品ID', '产品唯一标识符'),
        'Description': ('产品描述', '产品名称/描述'),
    },
},

}


def update_ttl(ttl_path, db_tables):
    with open(ttl_path, encoding='utf-8') as f:
        content = f.read()

    count = 0
    for table, cols in db_tables.items():
        for col, (label, comment) in cols.items():
            is_fk = col.startswith('refers_to')
            uri = f'http://example.org/{table}/{col}'
            escaped_uri = re.escape(uri)

            if is_fk:
                # FK: rr:predicate followed by rr:parentTriplesMap
                pattern = rf'(rr:predicate\s+<{escaped_uri}>\s*;\s*rr:objectMap\s*\[[^\]]*rr:parentTriplesMap[^\]]*\])'
            else:
                # Column: rr:predicate followed by rr:column
                pattern = rf'(rr:predicate\s+<{escaped_uri}>[^;]*;\s*rr:objectMap\s*\[[^\]]*\])'

            def make_replacer(lbl, cmt):
                def replacer(m):
                    block = m.group(0)
                    if 'rdfs:label' in block:
                        return block
                    new_block = block.rstrip().rstrip(';').rstrip()
                    new_block += f' ;\n        rdfs:label "{lbl}"@zh ;\n        rdfs:comment "{cmt}"@zh'
                    return new_block
                return replacer

            new_content = re.sub(pattern, make_replacer(label, comment), content, count=1)
            if new_content != content:
                count += 1
                content = new_content

    with open(ttl_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return count


if __name__ == '__main__':
    base = 'Semantic Core Service/configs/scenarios/RDF'
    total = 0
    for db, tables in ALL_DB.items():
        ttl_path = f'{base}/{db}.ttl'
        if not os.path.exists(ttl_path):
            print(f'SKIP {db}: TTL not found')
            continue
        n = update_ttl(ttl_path, tables)
        total += n
        print(f'{db}: +{n} predicates')
    print(f'\nTotal: {total} rdfs:label+comment added across all DBs')
