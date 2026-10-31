// BizAgentBench · DLR retrieval bridge (HTTP JSON for the Python harness)
//   POST /l1 {question, system, top_k}   → stateModelQuery
//   POST /l2 {namespace, question, top_k} → searchConsensus
//   POST /l3 {question, top_k, system}   → searchSop
//
// Run (repo layout):  TSM_SCENARIO=<scenario> TSM_STORE_DIR=<store> TSM_MODEL_DIR=<model> \
//                     npx tsx scenarios/bizagentbench/eval/dlr_server.mjs
// Service resolution: TSM_SERVICE_DIR → ../../../TSM Core Service → node_modules/tsm-core-dlr
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.BIZ_DLR_PORT ?? 28797);

function resolveService() {
  const candidates = [
    process.env.TSM_SERVICE_DIR,
    path.resolve(HERE, "../../../TSM Core Service"),
    path.resolve(HERE, "../../../node_modules/tsm-core-dlr"),
    path.resolve(HERE, "../node_modules/tsm-core-dlr"),
  ].filter(Boolean);
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "src", "config.ts"))) return dir;
  }
  throw new Error("tsm-core-dlr service not found; set TSM_SERVICE_DIR to its directory");
}

const SERVICE = resolveService();
const load = (rel) => import(pathToFileURL(path.join(SERVICE, "src", rel)).href);
const { LanceStore } = await load("store/lance.ts");
const { stateModelQuery } = await load("queries/stateModelQuery.ts");
const { searchConsensus } = await load("queries/searchConsensus.ts");
const { searchSop } = await load("queries/searchSop.ts");
const { STORE_DIR, MODEL_DIR, SCENARIO } = await load("config.ts");

/** Public record collections of the Operations Desk portal (from DB-index). Only these names are
 *  accepted by search_records; the agent must not guess resource names. */
const PUBLIC_RESOURCES = [
  "bank_receipts", "billing_instances", "business_documents", "card_disputes", "card_loss_cases",
  "company_profiles", "compensation_entries", "currency_obligations", "desk_accounts", "desk_journal",
  "desk_payments", "desk_portfolios", "desk_services", "entities", "events", "evidence_bundles",
  "fund_restrictions", "fx_quotes", "fx_routes", "fx_trades", "invoice_allocations", "joint_agreements",
  "joint_fundings", "joint_routes", "joint_sources", "link_contracts", "loss_components",
  "message_amendments", "onboarding_applications", "operators", "ownership_edges", "payment_batch_items",
  "profiles", "purpose_instructions", "rail_bindings", "rail_profiles", "rail_sites", "receivable_rights",
  "remittance_advice", "remittances", "requests", "reserve_disbursements", "reserve_routes",
  "restricted_lots", "service_bookings", "service_cases", "service_records", "submission_attempts",
  "submissions", "tax_allocations", "tax_periods", "tax_transfers", "trade_invoices", "treasury_mandates",
  "treasury_obligations",
];

const store = await LanceStore.open(STORE_DIR, MODEL_DIR);
console.log(`[biz-dlr] scenario=${SCENARIO}`);
console.log(`[biz-dlr] store=${STORE_DIR} port=${PORT}`);

function body(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const send = (res, code, value) => {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(value));
};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      return send(res, 200, { ok: true, scenario: SCENARIO, store: STORE_DIR });
    }
    if (req.method !== "POST") return send(res, 404, { ok: false, error: "not found" });
    const payload = await body(req);
    const q = String(payload.question ?? "").trim();
    if (!q) return send(res, 400, { ok: false, error: "question required" });
    if (req.url === "/l1") {
      const r = await stateModelQuery(store, q, {
        topK: Number(payload.top_k ?? 5),
        threshold: Number(payload.threshold ?? 0.5),
        system: String(payload.system ?? "operations_desk"),
      });
      return send(res, 200, { ok: true, data: r, public_resources: PUBLIC_RESOURCES });
    }
    if (req.url === "/l2") {
      const r = await searchConsensus(
        store,
        String(payload.namespace ?? "").trim(),
        q,
        Number(payload.top_k ?? 5),
      );
      return send(res, 200, { ok: true, data: r });
    }
    if (req.url === "/l3") {
      const r = await searchSop(
        store,
        q,
        Number(payload.top_k ?? 2),
        Number(payload.threshold ?? 0.7),
        String(payload.system ?? "operations_desk"),
      );
      return send(res, 200, { ok: true, data: r });
    }
    return send(res, 404, { ok: false, error: "not found" });
  } catch (e) {
    return send(res, 500, { ok: false, error: String(e?.stack ?? e) });
  }
});

server.listen(PORT, "127.0.0.1", () => console.log(`[biz-dlr] listening on ${PORT}`));
