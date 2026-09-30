// TSM 状态浮层（shell.overlay 座位）——显示两个语义后端服务的健康状况。
// 手写 bundle：与自带客户端插件同格式（window.__ModuleLoader__.load + factory(require)）。
window.__ModuleLoader__.load({
  id: "dsh-tsm-agent",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    /** 数据源：TSM Core Service 的 /status（同机 HTTP；该路由带 CORS 头）。 */
    const STATUS_URL = "http://127.0.0.1:28795/status";
    /** 轮询间隔（毫秒）。 */
    const REFRESH_MS = 10000;

    const COLORS = { ok: "#3fb950", bad: "#f85149", unknown: "#8b949e" };

    /** 轮询 /status；失败时保留上次数据，只把服务灯变红。 */
    function useStatus() {
      const [state, setState] = React.useState({ reachable: false, data: null });
      React.useEffect(() => {
        let alive = true;
        const tick = async () => {
          try {
            const res = await fetch(STATUS_URL, { cache: "no-store" });
            const data = await res.json();
            if (alive) setState({ reachable: true, data });
          } catch {
            if (alive) setState((prev) => ({ reachable: false, data: prev.data }));
          }
        };
        tick();
        const timer = setInterval(tick, REFRESH_MS);
        return () => {
          alive = false;
          clearInterval(timer);
        };
      }, []);
      return state;
    }

    const dot = (color) =>
      React.createElement("span", {
        style: {
          display: "inline-block",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: color,
          marginRight: 6,
        },
      });

    const row = (key, children) =>
      React.createElement("div", { key, style: { display: "flex", alignItems: "center" } }, children);

    /** 徽标本体：服务灯 + 语义资产计数 + 场景名 + Neo4j Browser 链接。 */
    function TsmStatusPill() {
      const { reachable, data } = useStatus();
      const neo = data && data.neo4j ? data.neo4j : null;
      const graph = data && data.graph ? data.graph : null; // 图后端双轨：memory（内存图）/ neo4j
      const lance = data && data.lance ? data.lance : null;
      const counts = (graph && graph.nodes) || (neo && neo.nodes) || {};
      const rels = (graph && graph.rels) || (neo && neo.rels) || {};
      const vectors = (lance && lance.tables) || {};
      const browserUrl = (neo && neo.browser_url) || "http://localhost:7474";
      const vizUrl =
        (data && data.service_info && data.service_info.viz_url) || "http://127.0.0.1:28795/viz/dlr";
      const graphLabel = graph && graph.backend === "memory" ? "内存图" : "Neo4j";
      const graphOk = graph ? graph.ok : neo && neo.ok;
      const scenario = (data && data.scenario && data.scenario.name) || "-";

      const title = reachable && data && data.ok ? "TSM 语义后端" : "TSM 语义后端（不可达）";
      const assetLine = [
        ["LE", counts.LogicalEntity],
        ["PE", counts.PhysicalEntity],
        ["PA", counts.PhysicalAttribute],
        ["PAS", rels.PAS_RELATED_TO],
      ]
        .map((pair) => pair[0] + " " + (pair[1] === undefined ? "-" : pair[1]))
        .join("  ");
      const vecLine = Object.keys(vectors)
        .map((name) => name + " " + vectors[name])
        .join("  ");

      return React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 10,
            pointerEvents: "auto",
            minWidth: 232,
            padding: "10px 12px",
            borderRadius: 10,
            font: "12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace",
            color: "#e6e6e6",
            background: "rgba(22,24,28,0.92)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.38)",
          },
        },
        React.createElement(
          "div",
          { style: { display: "flex", justifyContent: "space-between", marginBottom: 4, opacity: 0.85 } },
          React.createElement("span", null, title),
          React.createElement("span", null, "场景 " + scenario),
        ),
        row(
          "services",
          [
            dot(!reachable ? COLORS.bad : graphOk ? COLORS.ok : COLORS.bad),
            React.createElement("span", { key: "graph", style: { marginRight: 14 } }, graphLabel),
            dot(reachable ? COLORS.ok : COLORS.bad),
            React.createElement("span", { key: "mcp" }, "MCP :28795"),
          ],
        ),
        row("assets", React.createElement("span", { style: { opacity: 0.85 } }, assetLine)),
        vecLine ? row("vectors", React.createElement("span", { style: { opacity: 0.85 } }, vecLine)) : null,
        row(
          "link",
          [
            React.createElement(
              "a",
              {
                key: "viz",
                href: vizUrl,
                target: "_blank",
                rel: "noreferrer",
                style: { color: "#58a6ff", textDecoration: "none" },
              },
              "图谱 ↗",
            ),
            // Neo4j 行只在后端确为 Neo4j 时出现（内存图模式隐藏）
            neo && neo.enabled !== false
              ? React.createElement(
                  "span",
                  { key: "sepwrap" },
                  React.createElement("span", { key: "sep", style: { opacity: 0.4, margin: "0 8px" } }, "·"),
                  React.createElement(
                    "a",
                    {
                      key: "neo",
                      href: browserUrl,
                      target: "_blank",
                      rel: "noreferrer",
                      style: { color: "#8b949e", textDecoration: "none" },
                    },
                    "Neo4j ↗",
                  ),
                )
              : null,
          ],
        ),
      );
    }

    /** Required service: the UI slot registry. */
    const inject = ["slots"];

    /**
     * 注册浮层条目：shell.overlay 是加法座位（list/root），
     * 新 id 与自带条目并排，不替换任何东西。
     */
    function apply(ctx) {
      ctx.slots.inject("shell.overlay", () =>
        ctx.slots.register(
          { name: "shell.overlay", id: "dlr-tsm-status", order: 100, label: "TSM status" },
          TsmStatusPill,
        ),
      );
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  },
});
