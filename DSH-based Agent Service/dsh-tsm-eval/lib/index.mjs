// dsh-tsm-eval programmatic API.
// Real module (not a stub): the package keeps main/exports pointing here per repo
// convention (commit 5a18275 lesson). A future dsh bundle surface (web overlay /
// slash command) can build on these exports without a repackaging round.
export { main, parseArgv, UsageError, USAGE, VERSION } from "./cli.mjs";
