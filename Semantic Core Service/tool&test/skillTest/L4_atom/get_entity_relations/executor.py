#!/usr/bin/env python3
"""
get_entity_relations 技能执行器
根据实体ID获取该实体的所有关联关系
"""
from typing import Dict, Any
import requests
import os


def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    执行技能：根据实体ID获取该实体的所有关联关系

    Args:
        params: 参数字典，包含：
            - entity_id: 实体ID（必填）
            - semantic_service_url: 语义服务URL（可选）

    Returns:
        包含实体关联关系的结果字典
    """
    try:
        entity_id = params.get("entity_id", "")
        if not entity_id:
            return {
                "success": False,
                "message": "entity_id 参数不能为空",
                "formatted_result": "错误：请提供有效的实体ID"
            }

        # 获取语义服务 URL（优先从参数获取，其次从环境变量获取，最后默认值）
        semantic_service_url = params.get(
            "semantic_service_url",
            os.getenv("SEMANTIC_SERVICE_URL", "http://localhost:28765")
        )

        # 调用 REST API
        result = call_entity_relations_api(entity_id, semantic_service_url)

        if not result or (isinstance(result, dict) and result.get("success") is False):
            message = result.get("message", "查询失败") if isinstance(result, dict) else "查询失败"
            return {
                "success": False,
                "message": message,
                "formatted_result": f"查询失败：{message}"
            }

        # 格式化结果
        formatted_result = format_entity_relations_result(result)

        return {
            "success": True,
            "entity_id": result.get("entity_id", entity_id),
            "name": result.get("name", ""),
            "relations": result.get("relations", []),
            "formatted_result": formatted_result,
            "data": result
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "message": f"执行失败: {str(e)}",
            "formatted_result": f"错误：{str(e)}"
        }


def call_entity_relations_api(entity_id: str, service_url: str) -> Dict[str, Any]:
    """调用获取实体关联关系的 REST API"""
    try:
        url = f"{service_url.rstrip('/')}/api/v1/entities/relations"
        response = requests.get(
            url,
            params={"entity_id": entity_id},
            timeout=10,
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[WARN] 实体关系 API 调用失败: {e}")
        return {"success": False, "message": f"请求语义服务失败: {str(e)}"}


def format_entity_relations_result(data: Dict[str, Any]) -> str:
    """格式化实体关联关系结果"""
    name = data.get("name", "")
    relations = data.get("relations", [])

    formatted_lines = []

    if name:
        formatted_lines.append(f"【{name}】的关联关系：")
    else:
        formatted_lines.append("实体的关联关系：")

    if relations:
        for rel in relations:
            if isinstance(rel, dict):
                rel_name = rel.get("relation_name", rel.get("name", ""))
                target_name = rel.get("target_entity_name", rel.get("target_name", ""))
                target_id = rel.get("target_entity_id", rel.get("target_id", ""))

                line = f"  - {rel_name}"
                if target_name:
                    line += f" → {target_name}"
                    if target_id:
                        line += f" ({target_id})"
                formatted_lines.append(line)
            elif isinstance(rel, str):
                formatted_lines.append(f"  - {rel}")
    else:
        formatted_lines.append("  暂无关联关系")

    return "\n".join(formatted_lines)


# 命令行测试入口
if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 2:
        print("用法: python executor.py \"实体ID\"")
        print("示例: python executor.py \"MDAS.台区线损明细\"")
        sys.exit(1)

    entity_id = sys.argv[1]
    print(f"获取实体关联关系...")
    print(f"实体ID: {entity_id}")
    print()

    result = execute({"entity_id": entity_id})

    print("\n" + "="*80)
    print(json.dumps(result, ensure_ascii=False, indent=2))
