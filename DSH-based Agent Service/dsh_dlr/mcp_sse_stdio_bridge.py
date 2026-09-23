"""stdio MCP 前端 → 转发到共享的 DLR SSE 服务（协议翻译桥）。

为什么需要它：
  1. dsh 的 MCP 客户端只支持 stdio / streamable-http，不支持 SSE —— 而语义服务
     目前只挂 /mcp/sse（`Semantic Core Service/main.py`）。
  2. 若让 dsh 直接以 stdio 拉起 mcp_server.py，每个会话都会再开一个 Kuzu 库
     （进程独占锁，见 `db/graph_db.py`）→ 并发必然撞锁。

本桥不加载任何模型 / 向量库 / 图库，只做协议转发：真正的服务（Kuzu + FAISS）
仍由 `main.py serve` 单进程持有，与 opencode 基线打的是同一个服务、同一份存储。

由 dsh 按 stdio 拉起（见 dsh.patch.yml 的 mcp-semantic-core 行），也可以手动自测：
    python -u mcp_sse_stdio_bridge.py
上游地址可用环境变量 DLR_MCP_UPSTREAM 覆盖（默认 http://localhost:28775/mcp/sse）。
"""
import os

from fastmcp.server import create_proxy

UPSTREAM = os.environ.get("DLR_MCP_UPSTREAM", "http://localhost:28775/mcp/sse")

proxy = create_proxy(UPSTREAM, name="semantic-core")

if __name__ == "__main__":
    # show_banner=False：banner 走 rich Console 有污染 stdout（stdio 协议流）的风险。
    # 其余日志走 stderr，无碍。
    proxy.run(transport="stdio", show_banner=False)
