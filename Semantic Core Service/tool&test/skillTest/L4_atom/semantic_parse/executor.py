#!/usr/bin/env python3
"""
L4-1: 语义解析执行器
从用户问题中识别实体、属性和关系
"""
from typing import Dict, Any, List
import os


def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    执行语义解析

    Args:
        params: 输入参数
            - question: 用户的原始自然语言问题（必填）
            - top_k: 返回的实体数量，默认 1（可选）

    Returns:
        执行结果
            - success: 解析是否成功
            - entities: 识别到的实体列表（top_k 个，原始格式）
            - entities_data: 纯实体数据列表（给 main.py 程序内部用）
            - entities_json: 带说明的实体 JSON（给 LLM 用）
            - formatted_result: 格式化的最终结果
    """
    try:
        question = params.get("question", "")
        top_k = params.get("top_k", 1)

        if not question:
            return {
                "success": False,
                "entities": [],
                "entities_data": [],
                "entities_json": "",
                "formatted_result": "错误：缺少必填参数 question"
            }

        # 调用语义服务
        semantic_service_url = os.getenv("SEMANTIC_SERVICE_URL", "http://localhost:28765")
        result = call_semantic_service(question, semantic_service_url)

        if not result or not result.get("success"):
            return {
                "success": False,
                "entities": [],
                "entities_data": [],
                "entities_json": "",
                "formatted_result": result.get("message", "语义解析失败")
            }

        # 提取 data 字段
        data = result.get("data", result)

        # 获取实体列表，按相关性排序（如果有置信度按置信度排序）
        entities = data.get("entities", [])

        # 按置信度排序（如果有）
        if entities:
            entities.sort(
                key=lambda x: float(x.get("confidence", 0.0)),
                reverse=True
            )

        # 取 top_k 个实体
        top_entities = entities[:top_k] if entities else []

        # 构建纯实体数据（给 main.py 程序内部用）
        entities_data = build_entities_data(top_entities)

        # 构建带说明的实体 JSON（给 LLM 用）
        entities_json = build_entities_json_for_llm(top_entities)

        # 格式化结果
        formatted_result = format_parse_result(top_entities)

        # 只返回关键数据，不返回完整原始 entities
        # 只返回关键数据，不返回完整原始 entities
        return {
            "success": True,
            "entities_data": entities_data,
            "entities_json": entities_json,
            "formatted_result": formatted_result
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "entities": [],
            "entities_data": [],
            "entities_json": "",
            "formatted_result": f"语义解析失败: {str(e)}"
        }


def call_semantic_service(question: str, service_url: str) -> Dict[str, Any]:
    """调用语义查询服务"""
    try:
        import requests

        api_url = f"{service_url.rstrip('/')}/api/v1/query"
        payload = {"question": question}

        response = requests.post(
            api_url,
            json=payload,
            timeout=30,
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"语义服务调用失败: {e}")
        return {"success": False, "message": str(e)}


def build_entities_data(entities: List[Dict]) -> List[Dict]:
    """
    构建纯实体数据（给 main.py 程序内部用）

    Args:
        entities: 实体列表

    Returns:
        纯实体数据列表
    """
    if not entities:
        return []

    # 构建简化的实体列表
    result = []
    for ent in entities:
        entity_data = {
            "entity_id": ent.get("entity_id", ent.get("id", "")),
            "entity_name": ent.get("name", ent.get("entity_name", "")),
            "description": ent.get("description", ""),
            "source_table": ent.get("source_table", ""),
            "attributes": ent.get("attributes", []),
            "related_entity_ids": []
        }

        # 提取关联实体 ID
        relations = ent.get("relations", [])
        for rel in relations:
            target_id = rel.get("target_id", rel.get("target_entity_id", ""))
            if target_id:
                entity_data["related_entity_ids"].append(target_id)

        result.append(entity_data)

    return result


def build_entities_json_for_llm(entities: List[Dict]) -> str:
    """
    构建带说明的实体 JSON（给 LLM 看）

    Args:
        entities: 实体列表

    Returns:
        带说明的 JSON 字符串
    """
    if not entities:
        return ""

    import json

    # 先构建纯实体数据
    entities_data = build_entities_data(entities)

    # 包装带说明的 JSON
    result = {
        "_description": "以下是从用户问题中召回的业务实体（按相关性排序）",
        "_usage": "请基于这些实体的 entity_id 去查询业务数据，理解用户问题",
        "_fields_explanation": {
            "entity_id": "业务实体的唯一标识符，用于查询数据",
            "entity_name": "实体名称",
            "description": "实体描述",
            "source_table": "来源表名",
            "attributes": "该实体的属性列表",
            "related_entity_ids": "关联的其他实体 ID 列表"
        },
        "entities": entities_data
    }

    return json.dumps(result, ensure_ascii=False, indent=2)


def format_parse_result(entities: List[Dict]) -> str:
    """格式化解析结果"""
    if not entities:
        return "未识别到明确的语义元素"

    lines = []
    lines.append(f"识别到的实体（Top {len(entities)}）：")

    for idx, ent in enumerate(entities, 1):
        ent_name = ent.get('name', ent.get('entity_name', '未知'))
        ent_id = ent.get('entity_id', ent.get('id', '未知ID'))
        conf = ent.get('confidence', 'N/A')
        lines.append(f"  {idx}. {ent_name} ({ent_id}) - 置信度: {conf}")

    return "\n".join(lines)


# 命令行测试入口
if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 2:
        print("用法: python executor.py \"查询问题\" [top_k]")
        print("示例: python executor.py \"查下BYQ_0004变压器的情况\" 1")
        sys.exit(1)

    question = sys.argv[1]
    top_k = int(sys.argv[2]) if len(sys.argv) > 2 else 1

    print(f"执行语义解析...")
    print(f"问题: {question}")
    print(f"Top K: {top_k}")
    print()

    result = execute({"question": question, "top_k": top_k})

    print("\n" + "="*80)
    print(json.dumps(result, ensure_ascii=False, indent=2))
