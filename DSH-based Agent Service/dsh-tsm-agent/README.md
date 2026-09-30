---
description: "dsh bundle for TSM / DLR: MCP semantic gateway to tsm-core-dlr, the scenario-independent paradigm skill, the TSM status overlay, and the agent rules (AGENTS.md)."
kind: "package-bundle"
---

# dsh-tsm-agent

English | [中文](README.zh.md)

## Summary

`dsh-tsm-agent` wires a dsh profile to a running **TSM Core Service** (`tsm-core-dlr`) and adds the scenario-independent `paradigm` skill, a Web status overlay, and the agent rules (`AGENTS.md`). It contributes two top-level rows — `mcp-semantic-core` (MCP client for `http://127.0.0.1:28795/mcp`, streamable HTTP) and `dlr-status` (overlay) — and one agent preset, `preset-dlr` (persona, AGENTS.md instruction loader, skills, compaction). The semantic backend is the **separate package `tsm-core-dlr`** (declared as a dependency, so installing this bundle installs it too); the scenario content comes from a separate `tsm-scenario-*` package or a path. L3 SOP is delivered by index retrieval (`dlr_search_sop`), so no L3 skill ships with the package.

## Table of Contents

- [Use this package](#use-this-package)
- [Understand the implementation](#understand-the-implementation)
- [Model Experience](#model-experience)
- [Known Limitations and Deferred Work](#known-limitations-and-deferred-work)
- [Dev Note](#dev-note)

-----

<a id="use-this-package"></a>
## Use this package

Install once per profile. The recommended path is the Harness **Plugin Manager** (Settings → Plugins → install bundle) or the agent-side `plugin_manager` tool with `install_bundle` — both perform package installation **and** bundle selection. The CLI equivalent installs the package only; the bundle must then be selected (Plugin Manager toggle, or by listing it in the profile's `dsh.profile.bundles`):

```bash
dsh plugin --profile web add dsh-tsm-agent                              # from npm (pulls tsm-core-dlr with it)
dsh plugin --profile web add "<repo>/DSH-based Agent Service/dsh-tsm-agent"   # or from a local checkout
# then select/enable the bundle — installing alone does not select it
```

Start the semantic backend first — the MCP row refuses activation when it cannot connect:

```bash
bash "DSH-based Agent Service/scripts/start_backend.sh"    # Neo4j + TS MCP server (:28795)
bash "DSH-based Agent Service/dsh_dlr/run_web.sh"
```

The MCP endpoint defaults to `http://127.0.0.1:28795/mcp` and can be overridden with the `TSM_MCP_URL` environment variable. The MCP row is **top-level**, so it also serves headless runs (presets are not available under `--profile headless`); `preset-dlr` shapes the interactive sessions that select it.

Rows the bundle contributes:

| Row | Layer | Purpose |
|---|---|---|
| `mcp-semantic-core` | top-level | MCP client → `http://127.0.0.1:28795/mcp` (streamable HTTP), `toolCallTimeoutMs: 60000`, `failOnStartupError: true`, reconnect up to 3 attempts |
| `dlr-status` | top-level | Web overlay: backend health + semantic-asset counts (browser half: `lib/client.js`, reads the service's `/status`) |
| `preset-dlr` | agent preset | persona (semantic business assistant) · `AGENTS.md` instruction loader · filesystem skills · `skill` tool · compaction (group with `isolate`) |

The tool surface behind the gateway (7 tools): `dlr_semantic_query` · `dlr_search_consensus` · `dlr_search_sop` · `get_pe_mapping` · `get_le_attrs` · `get_full_data_info` · `execute_sql`.

<a id="understand-the-implementation"></a>
## Understand the implementation

- `cordis.patch.yml` — the two top-level rows above (MCP gateway + status overlay).
- `presets/dlr.patch.yml` — `preset-dlr`; the `isolate` realm on the compaction group is required by preset services ("Preset services require isolate realms").
- `skills/paradigm/SKILL.md` — paradigm cognition (TSM three levels; DLR structure: LE / PE / anchors and joins); scenario-independent, loaded on demand.
- `lib/index.js` — node half: exposes the packaged `skills/` directory as `DLR_SKILLS_DIR` at boot; `lib/client.js` — browser half for the overlay.
- Layering: bundle patch → profile `cordis.patch.yml` → `$DSH_HOME/cordis.patch.yml` → `--patch` (highest). Consumer-local policy — disabled plugins, model choice, default preset, directory-picker fixes — lives in `--patch` layers (`dsh_dlr/dsh.patch.yml`, `dsh_dlr/dsh-web.patch.yml`), not in this package.

<a id="model-experience"></a>
## Model Experience

Tools register as `mcp__semantic-core__<tool>`:

| Tool | Purpose |
|---|---|
| `dlr_semantic_query` | L1 recall: which business entities (LE) the question is about |
| `get_pe_mapping` / `get_le_attrs` | second hop: physical view columns, ARCS, `database_url` |
| `dlr_search_consensus` | L2 domain-consensus entries (terms → columns / values) |
| `dlr_search_sop` | L3: retrieval of the per-question clause, if one exists |
| `get_full_data_info` | drill-down to physical columns outside the modeled view |
| `execute_sql` | run read-only SQL against the dataset (subprocess, 20 s hard timeout) |

<a id="known-limitations-and-deferred-work"></a>
## Known Limitations and Deferred Work

- The bundle depends on `tsm-core-dlr` (installing it pulls the service package and its native dependencies, ~200 MB). The service still has to be **started** separately (`tsm serve --http 28795`, or `scripts/start_backend.sh` in a checkout) — bundle activation fails loudly (`failOnStartupError: true`) when the MCP endpoint is unreachable.
- dsh is alpha; this package is verified against `@deepseek-ai/dsh@0.2.0-rc.2` (profile composition, referenced plugin packages, the client-half contract and headless `--json` were all checked). The 500-question benchmark run predates that verification and was produced on `0.1.7-alpha.1` — **results were not re-run**. Re-check patch rows with `--dump-config` after any upgrade.
- The semantic backend is out of scope: without it, activation fails (`failOnStartupError: true`).
- Default model and API credentials are profile-level concerns (`dsh_dlr/` patches + `.env`), not part of the bundle.

<a id="dev-note"></a>
## Dev Note

Patch rows merge by `id`, and a `config` block replaces wholesale on override — restate any field you want to keep. Unmatched ids only warn, so verify edits with `dsh --profile web --dump-config`.

`preset-dlr` reads its skills directory from `DLR_SKILLS_DIR`, which this bundle's node half sets at boot (derived from the package location, never a machine-specific path); launchers may override it. Keep the `dlr-status` row enabled if you rely on `preset-dlr`'s skill loading, or set the variable yourself.

The repository carries the `dsh-plugin` GitHub topic for the DSH plugin directory (deepseek1024.com / 1024 Store); the directory picks the package up through its static validation (`dsh.bundle.patch` + committed patch files) and shows an install command once the package is published to npm — browse-only until then.
