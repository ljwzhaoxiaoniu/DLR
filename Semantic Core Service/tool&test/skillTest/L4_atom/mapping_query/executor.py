#!/usr/bin/env python3
"""
L4-2: 物理映射查询执行器
根据实体ID查询物理映射信息
"""
from typing import Dict, Any, List
import os


def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    执行物理映射查询

    Args:
        params: 输入参数
            - entity_ids: 实体ID列表（必填）
            - semantic_service_url: 语义元数据平台服务地址

    Returns:
        执行结果
            - success: 查询是否成功
            - mappings: 物理映射列表
            - formatted_result: 格式化的最终结果
    """
    try:
        entity_ids = params.get("entity_ids", [])
        if not entity_ids:
            return {
                "success": False,
                "mappings": [],
                "formatted_result": "错误：缺少必填参数 entity_ids"
            }

        semantic_service_url = params.get(
            "semantic_service_url",
            os.getenv("SEMANTIC_SERVICE_URL", "http://localhost:28765")
        )

        # 查询每个实体的映射
        all_mappings = []
        for entity_id in entity_ids:
            mapping = get_entity_mapping(entity_id, semantic_service_url)
            if mapping and mapping.get("success"):
                # 规范化映射数据
                normalized = normalize_mapping(mapping, entity_id)
                all_mappings.append(normalized)

        # 格式化结果
        formatted_result = format_mapping_result(all_mappings)

        return {
            "success": len(all_mappings) > 0,
            "mappings": all_mappings,
            "formatted_result": formatted_result
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "mappings": [],
            "formatted_result": f"映射查询失败: {str(e)}"
        }


def get_entity_mapping(entity_id: str, service_url: str) -> Dict[str, Any]:
    """获取单个实体的映射信息"""
    try:
        import requests

        api_url = f"{service_url.rstrip('/')}/api/v1/mapping"
        response = requests.get(
            api_url,
            params={"entity_id": entity_id},
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"获取实体 {entity_id} 映射失败: {e}")
        return None


def normalize_mapping(mapping: Dict[str, Any], entity_id: str) -> Dict[str, Any]:
    """规范化映射数据格式"""
    # 提取数据库名（从 entity_id 或 physical_table）
    database = ""
    if "." in entity_id:
        database = entity_id.split(".")[0]

    physical_table = mapping.get("physical_table", "")
    # 总是去掉表名的 schema 前缀（如 PMS.xxx → xxx）
    if "." in physical_table:
        if not database:
            database = physical_table.split(".", 1)[0]
        physical_table = physical_table.split(".", 1)[1]

    # 处理属性映射
    attributes = mapping.get("attributes", {})
    normalized_attrs = {}

    for semantic_name, attr_info in attributes.items():
        if isinstance(attr_info, dict):
            physical_col = attr_info.get("physical_column", "")
            # 去掉 schema 前缀
            if "." in physical_col:
                physical_col = physical_col.split(".")[-1]

            normalized_attrs[semantic_name] = {
                "physical_column": physical_col,
                "data_type": attr_info.get("data_type", "string")
            }

    return {
        "entity_id": entity_id,
        "database": database,
        "physical_table": physical_table,
        "attributes": normalized_attrs
    }


def format_mapping_result(mappings: List[Dict]) -> str:
    """格式化映射结果"""
    if not mappings:
        return "未查询到任何物理映射信息"

    lines = []
    for m in mappings:
        lines.append(f"实体: {m.get('entity_id')}")
        lines.append(f"  数据库: {m.get('database')}")
        lines.append(f"  物理表: {m.get('physical_table')}")
        attrs = m.get('attributes', {})
        if attrs:
            lines.append(f"  字段数: {len(attrs)}")
        lines.append("")

    return "\n".join(lines).strip()


# 命令行测试入口
if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 2:
        print("用法: python executor.py \"实体ID1,实体ID2\" [服务地址]")
        print("示例: python executor.py \"PMS.变压器\"")
        sys.exit(1)

    entity_ids_str = sys.argv[1]
    entity_ids = [e.strip() for e in entity_ids_str.split(",")]
    service_url = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:28765"

    print(f"执行物理映射查询...")
    print(f"实体: {entity_ids}")
    print(f"服务: {service_url}")
    print()

    result = execute({
        "entity_ids": entity_ids,
        "semantic_service_url": service_url
    })

    print("\n" + "="*80)
    print(json.dumps(result, ensure_ascii=False, indent=2))
