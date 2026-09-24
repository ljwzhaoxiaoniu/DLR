//#region node 半
/**
 * TSM 状态徽标插件的 **node 半（空壳）**。
 *
 * 本插件只贡献浏览器端呈现（`exports["./client"]`）：一个显示 TSM 语义后端
 * （Neo4j + MCP server）健康状况的浮层小卡。数据由 TSM Core Service 自带的
 * `/status` 路由提供（同机、浏览器直取），所以 node 半不需要做任何事——
 * 与自带包 `dsh-client-ui-brand-official` 的 node 半同款（空 apply = 给
 * Loader 一个宿主行）。
 */
/** Host plugin body — 本包只贡献浏览器呈现。 */
function apply() {}
//#endregion
export { apply };
