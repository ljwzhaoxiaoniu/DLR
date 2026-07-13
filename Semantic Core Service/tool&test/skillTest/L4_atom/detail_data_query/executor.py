#!/usr/bin/env python3
"""
detail_data_query: 端到端数据查询
自动完成：语义解析→获取映射→生成SQL→查询数据→返回结果
"""
from typing import Dict, Any, List
import os
import sys
import importlib.util
from pathlib import Path
import re
import sqlite3
import json

# LLM 客户端
try:
    from llm_client import simple_chat
    LLM_AVAILABLE = True
except ImportError:
    LLM_AVAILABLE = False


def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    执行端到端数据查询

    Args:
        params: 输入参数
            - question: 用户的原始自然语言问题（必填，或提供 entity_ids）
            - entity_ids: 直接指定实体ID列表（可选，如果提供则跳过语义解析）
            - semantic_service_url: 语义元数据平台服务地址

    Returns:
        执行结果
    """
    try:
        question = params.get("question", "")
        entity_ids = params.get("entity_ids", [])
        entity_names = []

        # 兼容其他参数格式
        if not entity_ids and "entity_id" in params:
            entity_ids = [params.get("entity_id")]

        if not question and "query_content" in params:
            question = params.get("query_content", "")

        semantic_service_url = params.get(
            "semantic_service_url",
            os.getenv("SEMANTIC_SERVICE_URL", "http://localhost:28765")
        )

        # ========== 步骤1: 如果没有提供 entity_ids，才调用 semantic_parse 识别实体 ==========
        if not entity_ids:
            if not question:
                return {
                    "success": False,
                    "formatted_result": "错误：缺少必填参数 question 或 entity_ids"
                }

            console_log(f"[1/5] 语义解析中...")
            parse_result = call_semantic_parse(question)

            if not parse_result or not parse_result.get("success"):
                return {
                    "success": False,
                    "formatted_result": parse_result.get("formatted_result", "语义解析失败")
                }

            # 【关键】适配 semantic_parse 的新返回结构，从 entities_data 读取
            entities_data = parse_result.get("entities_data", [])
            entity_ids = [e.get("entity_id") for e in entities_data if e.get("entity_id")]
            entity_names = [e.get("entity_name", "") for e in entities_data if e.get("entity_id")]

            if not entity_ids:
                return {
                    "success": False,
                    "formatted_result": "未识别到相关业务实体"
                }

            console_log(f"[1/5] 识别到实体: {', '.join(entity_names)} ({', '.join(entity_ids)})")
        else:
            # 已经有 entity_ids 了，直接使用
            console_log(f"[1/5] 使用传入的实体ID: {', '.join(entity_ids)}")

        # ========== 步骤2: 调用 mapping_query 获取物理映射 ==========
        console_log(f"[2/5] 查询物理映射...")
        mapping_result = call_mapping_query(entity_ids, semantic_service_url)

        if not mapping_result or not mapping_result.get("success"):
            return {
                "success": False,
                "data": {"parse_result": parse_result, "mapping_result": mapping_result},
                "formatted_result": "未获取到实体物理映射信息"
            }

        mappings = mapping_result.get("mappings", [])
        if not mappings:
            return {
                "success": False,
                "data": {"parse_result": parse_result, "mapping_result": mapping_result},
                "formatted_result": "映射结果为空"
            }

        mapping_info = []
        for m in mappings:
            mapping_info.append(f"{m.get('entity_id')} → {m.get('database')}.{m.get('physical_table')}")
        console_log(f"[2/5] 获取到物理映射: {'; '.join(mapping_info)}")

        # ========== 步骤3: 生成 SQL 并查询 ==========
        console_log(f"[3/5] 生成 SQL 并查询...")
        all_query_results = []
        for mapping in mappings:
            sql = generate_sql_with_llm(question, mapping)
            if not sql:
                continue

            data = execute_sql(mapping, sql)
            if data is not None:
                all_query_results.append({
                    "entity_id": mapping.get("entity_id"),
                    "mapping": mapping,
                    "sql": sql,
                    "data": data
                })

        query_summary = []
        for r in all_query_results:
            query_summary.append(f"{r.get('entity_id')}: {len(r.get('data', []))} 条数据")
        if query_summary:
            console_log(f"[3/5] 查询完成: {'; '.join(query_summary)}")
        else:
            console_log(f"[3/5] 查询完成: 未查询到匹配数据")

        # ========== 步骤4: 格式化结果 ==========
        console_log(f"[4/5] 格式化结果...")
        formatted_result = format_final_result(question, all_query_results)

        console_log(f"[5/5] 完成！")

        # 返回格式化结果 + 结构化的物理数据
        # 提取结构化数据（最多 10 条）
        structured_data = []
        for r in all_query_results:
            entity_data = {
                "entity_id": r.get("entity_id"),
                "physical_table": r.get("mapping", {}).get("physical_table"),
                "database": r.get("mapping", {}).get("database"),
                "rows": r.get("data", [])[:10]  # 最多返回 10 条
            }
            structured_data.append(entity_data)

        return {
            "success": True,
            "structured_data": structured_data,  # 给程序用的结构化物理数据
            "formatted_result": formatted_result    # 给人/LLM 看的自然语言结果
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "data": {},
            "formatted_result": f"查询失败: {str(e)}"
        }


def console_log(message: str):
    """输出控制台日志"""
    print(f"[detail_data_query] {message}")


def call_semantic_parse(question: str) -> Dict[str, Any]:
    """调用 semantic_parse 技能"""
    try:
        skill_dir = Path(__file__).parent.parent / "semantic_parse"
        executor_path = skill_dir / "executor.py"

        if not executor_path.exists():
            return {"success": False, "formatted_result": "semantic_parse 技能不存在"}

        spec = importlib.util.spec_from_file_location("semantic_parse_executor", str(executor_path))
        executor_module = importlib.util.module_from_spec(spec)
        sys.modules["semantic_parse_executor"] = executor_module
        spec.loader.exec_module(executor_module)

        if hasattr(executor_module, "execute"):
            return executor_module.execute({"question": question})

        return {"success": False, "formatted_result": "semantic_parse 缺少 execute 函数"}

    except Exception as e:
        console_log(f"调用 semantic_parse 失败: {e}")
        return {"success": False, "formatted_result": f"调用 semantic_parse 失败: {str(e)}"}


def call_mapping_query(entity_ids: List[str], service_url: str) -> Dict[str, Any]:
    """调用 mapping_query 技能"""
    try:
        skill_dir = Path(__file__).parent.parent / "mapping_query"
        executor_path = skill_dir / "executor.py"

        if not executor_path.exists():
            return {"success": False, "formatted_result": "mapping_query 技能不存在"}

        spec = importlib.util.spec_from_file_location("mapping_query_executor", str(executor_path))
        executor_module = importlib.util.module_from_spec(spec)
        sys.modules["mapping_query_executor"] = executor_module
        spec.loader.exec_module(executor_module)

        if hasattr(executor_module, "execute"):
            return executor_module.execute({
                "entity_ids": entity_ids,
                "semantic_service_url": service_url
            })

        return {"success": False, "formatted_result": "mapping_query 缺少 execute 函数"}

    except Exception as e:
        console_log(f"调用 mapping_query 失败: {e}")
        return {"success": False, "formatted_result": f"调用 mapping_query 失败: {str(e)}"}


def generate_sql_with_llm(question: str, mapping: Dict[str, Any]) -> str:
    """让大模型根据问题和映射信息生成 SQL"""
    if not LLM_AVAILABLE:
        physical_table = mapping.get("physical_table")
        if physical_table:
            return f"SELECT * FROM `{physical_table}` LIMIT 20"
        return None

    try:
        physical_table = mapping.get("physical_table", "")
        attributes = mapping.get("attributes", {})

        attrs_desc = []
        for semantic_name, attr_info in attributes.items():
            if isinstance(attr_info, dict):
                physical_col = attr_info.get("physical_column", "未知")
                data_type = attr_info.get("data_type", "未知")
                attrs_desc.append(
                    f"- 语义属性: {semantic_name} -> 物理字段: {physical_col} (类型: {data_type})"
                )

        system_prompt = f"""你是一个 SQLite 查询专家。根据用户问题和实体映射信息，生成合适的 SQL 查询语句。

## 实体信息
- 物理表名: {physical_table}
- 属性映射（重要：必须使用物理字段名！）:
{chr(10).join(attrs_desc)}

## 用户问题
{question}

## 任务
1. 分析用户问题中的查询条件
2. 根据语义属性找到对应的物理字段名
3. 生成 SQLite SELECT 语句，只能使用上面列出的物理字段名
4. 只返回 SQL，不要其他解释
5. 如果没有明确筛选条件，返回 LIMIT 20 的查询
6. 表名和字段名如果包含中文或特殊字符，用反引号 ` 包裹

## 输出格式
只输出 SQL 语句，例如:
SELECT * FROM `变压器档案` WHERE `变压器ID` = 'BYQ_0004'
"""

        response = simple_chat(question, system_prompt=system_prompt).strip()

        sql_match = re.search(r"```sql\s*(.*?)\s*```", response, re.DOTALL)
        if sql_match:
            sql = sql_match.group(1).strip()
        else:
            sql = response.strip()

        return sql

    except Exception as e:
        physical_table = mapping.get("physical_table")
        if physical_table:
            return f"SELECT * FROM `{physical_table}` LIMIT 20"
        return None


def execute_sql(mapping: Dict[str, Any], sql: str) -> List[Dict]:
    """执行 SQL 查询物理数据库"""
    try:
        base_dir = Path(__file__).parent.parent.parent.parent.parent.parent
        db_path = base_dir / "semantic_proj" / "semantic_meta_platform" / "storage" / "sqlite_dbs"

        entity_id = mapping.get("entity_id", "")
        db_file_path = None

        if "." in entity_id:
            db_prefix = entity_id.split(".")[0]
            db_file = f"{db_prefix}.db"
            db_file_path = db_path / db_file

        if not db_file_path or not db_file_path.exists():
            for db_file in ["PMS.db", "MDAS.db", "PWMK.db"]:
                test_path = db_path / db_file
                if test_path.exists():
                    db_file_path = test_path
                    break

        if not db_file_path or not db_file_path.exists():
            return None

        conn = sqlite3.connect(str(db_file_path))
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        cursor.execute(sql)
        rows = cursor.fetchall()

        results = []
        for row in rows:
            results.append(dict(row))

        conn.close()
        return results

    except Exception as e:
        return None


def format_final_result(question: str, query_results: List[Dict]) -> str:
    """格式化最终结果"""
    if not query_results:
        return "未查询到相关数据"

    if not LLM_AVAILABLE:
        output = [f"### 查询结果\n"]
        output.append(f"**问题**: {question}\n")

        for result in query_results:
            entity_id = result.get("entity_id")
            data = result.get("data", [])
            output.append(f"- {entity_id}: {len(data)} 条数据")

        return "\n".join(output)

    try:
        context = build_result_context(question, query_results)

        system_prompt = """你是一个数据分析师。根据用户问题和查询结果，用简洁自然的语言总结答案。

## 要求
1. 直接回答用户问题，不要说"查询结果如下"之类的开场白
2. 只呈现关键信息，不要展示 SQL 或技术细节
3. 如果有多条数据，总结重点或列出前几条
4. 语言简洁明了，用中文口语化表达

## 输出格式
直接输出自然语言答案，不要用 markdown 格式。
"""

        response = simple_chat(context, system_prompt=system_prompt).strip()
        return response

    except Exception as e:
        return f"查询成功，共 {len(query_results)} 个实体的数据"


def build_result_context(question: str, query_results: List[Dict]) -> str:
    """构建结果上下文"""
    lines = [f"用户问题: {question}\n"]

    for result in query_results:
        entity_id = result.get("entity_id", "未知")
        mapping = result.get("mapping", {})
        physical_table = mapping.get("physical_table", "未知")
        data = result.get("data", [])

        lines.append(f"实体: {entity_id}")
        lines.append(f"物理表: {physical_table}")
        lines.append(f"数据条数: {len(data)}")

        if data:
            lines.append("数据样例:")
            for idx, row in enumerate(data[:3], 1):
                row_str = []
                for key, value in row.items():
                    row_str.append(f"{key}={value}")
                lines.append(f"  {idx}. " + "; ".join(row_str))
            if len(data) > 3:
                lines.append(f"  ... 还有 {len(data) - 3} 条")
        lines.append("")

    return "\n".join(lines)


# 命令行测试入口
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("用法: python executor.py \"查询问题\" [服务地址]")
        print("示例: python executor.py \"查下BYQ_0004变压器的情况\"")
        sys.exit(1)

    question = sys.argv[1]
    service_url = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:28765"

    print(f"执行端到端数据查询...")
    print(f"问题: {question}")
    print(f"服务: {service_url}")
    print()

    result = execute({
        "question": question,
        "semantic_service_url": service_url
    })

    print("\n" + "="*80)
    print(json.dumps(result, ensure_ascii=False, indent=2))
