#!/usr/bin/env python3
"""
get_shortest_path 技能执行器
查询两个实体之间的最短路径
"""
from typing import Dict, Any
import requests
import os


def execute(params: Dict[str, Any]) -> Dict[str, Any]:
    """
    执行技能：查询两个实体之间的最短路径

    Args:
        params: 参数字典，包含：
            - from_entity_id: 起始实体ID（必填）
            - to_entity_id: 目标实体ID（必填）
            - semantic_service_url: 语义服务URL（可选）

    Returns:
        包含路径信息的结果字典
    """
    try:
        from_entity_id = params.get("from_entity_id", "")
        to_entity_id = params.get("to_entity_id", "")

        if not from_entity_id or not to_entity_id:
            return {
                "success": False,
                "message": "from_entity_id 和 to_entity_id 参数不能为空",
                "formatted_result": "错误：请提供有效的起始实体ID和目标实体ID"
            }

        # 获取语义服务 URL（优先从参数获取，其次从环境变量获取，最后默认值）
        semantic_service_url = params.get(
            "semantic_service_url",
            os.getenv("SEMANTIC_SERVICE_URL", "http://localhost:28765")
        )

        # 调用 REST API
        result = call_shortest_path_api(from_entity_id, to_entity_id, semantic_service_url)

        if not result or (isinstance(result, dict) and result.get("success") is False):
            message = result.get("message", "查询失败") if isinstance(result, dict) else "查询失败"
            return {
                "success": False,
                "message": message,
                "formatted_result": f"查询失败：{message}"
            }

        # 格式化结果
        formatted_result = format_shortest_path_result(result, from_entity_id, to_entity_id)

        # 提取 entity_id 链路
        entity_id_chain = extract_entity_id_chain(result)

        # 提取物理链路
        physical_chain = extract_physical_chain(result)

        # 上层只需要看 formatted_result 和关键链路信息
        return {
            "success": True,
            "entity_id_chain": entity_id_chain,  # 给程序用的实体链路
            "physical_chain": physical_chain,    # 给程序用的物理链路
            "formatted_result": formatted_result  # 给人/LLM 看的自然语言结果
        }

    except Exception as e:
        import traceback
        traceback.print_exc()
        return {
            "success": False,
            "message": f"执行失败: {str(e)}",
            "formatted_result": f"错误：{str(e)}"
        }


def call_shortest_path_api(from_entity_id: str, to_entity_id: str, service_url: str) -> Dict[str, Any]:
    """调用查询最短路径的 REST API"""
    try:
        url = f"{service_url.rstrip('/')}/api/v1/entities/shortest-path"
        response = requests.get(
            url,
            params={
                "from_entity_id": from_entity_id,
                "to_entity_id": to_entity_id
            },
            timeout=10,
            headers={"Content-Type": "application/json"}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"[WARN] 最短路径 API 调用失败: {e}")
        return {"success": False, "message": f"请求语义服务失败: {str(e)}"}


def extract_entity_id_chain(data: Dict[str, Any]) -> list:
    """提取 entity_id 链路"""
    nodes = data.get("nodes", [])
    full_path = data.get("full_path", [])

    # 方式1: 从 nodes 中提取
    if nodes:
        chain = []
        for node in nodes:
            if isinstance(node, dict):
                entity_id = node.get("entity_id")
                if entity_id:
                    chain.append(entity_id)
        if chain:
            return chain

    # 方式2: 从 full_path 中提取
    if full_path:
        chain = []
        for item in full_path:
            if isinstance(item, dict) and "entity_id" in item:
                entity_id = item.get("entity_id")
                if entity_id:
                    chain.append(entity_id)
        if chain:
            return chain

    return []


def extract_physical_chain(data: Dict[str, Any]) -> list:
    """
    提取物理链路：db.table.column - db.table.column

    Returns:
        [
            "BIZ.业扩报装申请单.申请单号 - BIZ.业扩业务明细.申请单号",
            "PMS.变压器档案.台区ID - BIZ.业扩报装申请单.台区ID",
            ...
        ]
    """
    relations = data.get("relations", [])
    physical_chain = []

    for rel in relations:
        if isinstance(rel, dict):
            physical_rel = rel.get("physical_relation")
            if physical_rel and isinstance(physical_rel, dict):
                from_table = physical_rel.get("from_table", "")
                from_column = physical_rel.get("from_column", "")
                to_table = physical_rel.get("to_table", "")
                to_column = physical_rel.get("to_column", "")

                if from_table and from_column and to_table and to_column:
                    physical_link = f"{from_table}.{from_column} - {to_table}.{to_column}"
                    physical_chain.append(physical_link)

    return physical_chain


def format_shortest_path_result(data: Dict[str, Any], from_entity_id: str, to_entity_id: str) -> str:
    """格式化最短路径结果"""
    path_length = data.get("path_length", 0)
    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    full_path = data.get("full_path", [])
    entity_id_chain = extract_entity_id_chain(data)
    physical_chain = extract_physical_chain(data)

    formatted_lines = []

    # 优先展示 entity_id 链路
    if entity_id_chain:
        formatted_lines.append("【Entity ID 链路】：" + " → ".join(entity_id_chain))

    # 展示物理链路
    if physical_chain:
        formatted_lines.append("【物理链路】：")
        for link in physical_chain:
            formatted_lines.append(f"  {link}")

    # 方式1: 使用 full_path（如果有）
    if full_path:
        path_parts = []
        for item in full_path:
            if isinstance(item, dict):
                if "entity_id" in item:
                    # 节点
                    name = item.get("name", item.get("entity_id", ""))
                    path_parts.append(f"【{name}】")
                elif "relation" in item:
                    # 关系
                    rel = item.get("relation", "")
                    path_parts.append(f"→ {rel} →")
        if path_parts:
            formatted_lines.append("语义路径：" + " ".join(path_parts))
    # 方式2: 使用 nodes + edges
    elif nodes:
        path_parts = []
        for idx, node in enumerate(nodes):
            if isinstance(node, dict):
                name = node.get("name", node.get("entity_id", ""))
            else:
                name = str(node)
            path_parts.append(f"【{name}】")

            if idx < len(edges):
                edge = edges[idx]
                if isinstance(edge, dict):
                    rel = edge.get("relation", edge.get("type", "→"))
                else:
                    rel = str(edge)
                path_parts.append(f"→ {rel} →")

        if path_parts:
            formatted_lines.append("语义路径：" + " ".join(path_parts))

    if path_length > 0:
        formatted_lines.append(f"路径长度：{path_length} 跳")

    if not formatted_lines:
        return f"未找到从 {from_entity_id} 到 {to_entity_id} 的路径"

    return "\n".join(formatted_lines)


# 命令行测试入口
if __name__ == "__main__":
    import sys
    import json

    if len(sys.argv) < 3:
        print("用法: python executor.py \"起始实体ID\" \"目标实体ID\"")
        print("示例: python executor.py \"MDAS.台区档案\" \"MDAS.用户档案\"")
        sys.exit(1)

    from_entity_id = sys.argv[1]
    to_entity_id = sys.argv[2]
    print(f"查询实体最短路径...")
    print(f"起始实体: {from_entity_id}")
    print(f"目标实体: {to_entity_id}")
    print()

    result = execute({
        "from_entity_id": from_entity_id,
        "to_entity_id": to_entity_id
    })

    print("\n" + "="*80)
    print(json.dumps(result, ensure_ascii=False, indent=2))
