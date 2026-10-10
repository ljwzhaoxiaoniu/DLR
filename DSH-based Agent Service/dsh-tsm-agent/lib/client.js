// TSM 状态浮层（shell.overlay 座位）——显示**多实例**语义后端（每场景一个实例、一个端口）。
// 手写 bundle：与自带客户端插件同格式（window.__ModuleLoader__.load + factory(require)）。
window.__ModuleLoader__.load({
  id: "dsh-tsm-agent",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });

    const React = require("react");

    /** 数据源：TSM Core Service 各实例的 /status（同机 HTTP；该路由带 CORS 头）。
     *  每轮**并发探全部候选**——每个活着的前端渲染一块（各带自己的「图谱 ↗」入口）；
     *  场景 → 实例 → 端口的对应由启动器决定（birdminidev :28795 / cloudopsbench :28796）。 */
    const STATUS_CANDIDATES = [
      "http://127.0.0.1:28795/status",
      "http://127.0.0.1:28796/status",
    ];
    /** 轮询间隔（毫秒）。 */
    const REFRESH_MS = 10000;

    const COLORS = { ok: "#3fb950", bad: "#f85149", unknown: "#8b949e" };

    /** 并发轮询所有候选端点；返回 [{url, ok, data}]（失败的 data 为 null）。 */
    function useStatuses() {
      const [states, setStates] = React.useState([]);
      React.useEffect(() => {
        let alive = true;
        const tick = async () => {
          const results = await Promise.all(
            STATUS_CANDIDATES.map(async (url) => {
              try {
                const res = await fetch(url, { cache: "no-store" });
                return { url, ok: true, data: await res.json() };
              } catch {
                return { url, ok: false, data: null };
              }
            }),
          );
          if (alive) setStates(results);
        };
        tick();
        const timer = setInterval(tick, REFRESH_MS);
        return () => {
          alive = false;
          clearInterval(timer);
        };
      }, []);
      return states;
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

    const portOf = (url) => {
      try {
        return new URL(url).port;
      } catch {
        return "";
      }
    };

    /** 单个后端的卡片块：场景 / 图灯 + MCP 端口 / 资产行 / 向量行 / 图谱入口。 */
    function backendBlock(s, first) {
      const data = s.data || {};
      const neo = data.neo4j || null;
      const graph = data.graph || null; // 图后端双轨：memory（默认，进程内）/ neo4j（保留接口）
      const lance = data.lance || null;
      const counts = (graph && graph.nodes) || (neo && neo.nodes) || {};
      const rels = (graph && graph.rels) || (neo && neo.rels) || {};
      const vectors = (lance && lance.tables) || {};
      const port = portOf(s.url);
      const scenario = (data.scenario && data.scenario.name) || "-";
      const graphLabel = graph && graph.backend === "memory" ? "内存图" : "Neo4j";
      const graphOk = graph ? graph.ok : neo && neo.ok;
      const browserUrl = (neo && neo.browser_url) || "http://localhost:7474";
      const vizUrl =
        (data.service_info && data.service_info.viz_url) || "http://127.0.0.1:" + port + "/viz/dlr";

      // 资产行：只显示 LE / PE / PAS（PA 是列级明细，不上浮层——用户定：统计它干嘛）
      const assetLine = [
        ["LE", counts.LogicalEntity],
        ["PE", counts.PhysicalEntity],
        ["PAS", rels.PAS_RELATED_TO],
      ]
        .filter((p) => p[1] !== undefined)
        .map((p) => p[0] + " " + p[1])
        .join("  ");
      const vecLine = Object.keys(vectors)
        .map((name) => name + " " + vectors[name])
        .join("  ");

      const children = [
        React.createElement(
          "div",
          {
            key: "head",
            style: { display: "flex", justifyContent: "space-between", marginBottom: 2, opacity: 0.9 },
          },
          React.createElement("span", null, "场景 " + scenario),
          React.createElement(
            "span",
            null,
            dot(COLORS.ok),
            "MCP :" + port,
          ),
        ),
        row(
          "assets",
          [
            dot(graphOk ? COLORS.ok : COLORS.bad),
            React.createElement("span", { key: "graph", style: { marginRight: 14 } }, graphLabel),
            React.createElement("span", { key: "counts", style: { opacity: 0.85 } }, assetLine),
          ],
        ),
      ];
      if (vecLine) children.push(row("vectors", React.createElement("span", { style: { opacity: 0.85 } }, vecLine)));
      children.push(
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
      return React.createElement(
        "div",
        {
          key: s.url,
          style: first
            ? undefined
            : { borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 6, paddingTop: 6 },
        },
        children,
      );
    }

    /** 徽标本体：全部活着的前端各渲染一块（一场景一实例一端口，各带图谱入口）。 */
    function TsmStatusPill() {
      const statuses = useStatuses();
      const up = statuses.filter((s) => s.ok);
      const title =
        up.length > 0
          ? "TSM 语义后端" + (up.length > 1 ? "（" + up.length + " 实例）" : "")
          : "TSM 语义后端（不可达）";

      const children = [
        React.createElement(
          "div",
          { key: "title", style: { marginBottom: 4, opacity: 0.85 } },
          title,
        ),
      ];
      if (up.length === 0) {
        children.push(
          React.createElement(
            "div",
            { key: "err" },
            dot(COLORS.bad),
            React.createElement("span", null, STATUS_CANDIDATES.map(portOf).join(" / ")),
          ),
        );
      } else {
        up.forEach((s, i) => children.push(backendBlock(s, i === 0)));
      }

      return React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            right: 16,
            bottom: 16,
            zIndex: 10,
            pointerEvents: "auto",
            minWidth: 236,
            padding: "10px 12px",
            borderRadius: 10,
            font: "12px/1.7 ui-monospace, SFMono-Regular, Consolas, monospace",
            color: "#e6e6e6",
            background: "rgba(22,24,28,0.92)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.38)",
          },
        },
        children,
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
