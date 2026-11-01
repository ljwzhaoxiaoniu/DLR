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
const OPS_RESOURCES = [
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

/** Payment Expansion record collections (from PX-DATABASE). Only these names are accepted by
 *  search_records in the PSP portal. */
const PSP_RESOURCES = [
  "xp_a_agency_remittances", "xp_a_authority_instructions", "xp_a_authority_scopes", "xp_a_bank_receipts", "xp_a_bank_transactions", "xp_a_basket_adjustments",
  "xp_a_basket_orders", "xp_a_basket_quotes", "xp_a_batch_results", "xp_a_batch_schema_contracts", "xp_a_beneficiary_receivables", "xp_a_benefits",
  "xp_a_bindings", "xp_a_buyer_collection_bookings", "xp_a_buyer_collection_orders", "xp_a_buyer_collection_services", "xp_a_cash_agents", "xp_a_cash_authorities",
  "xp_a_cash_reservations", "xp_a_checkout_terms", "xp_a_collection_mandates", "xp_a_collection_plans", "xp_a_collection_services", "xp_a_collection_supplier_invoices",
  "xp_a_collection_supplier_payments", "xp_a_components", "xp_a_contracts", "xp_a_credit_value_batches", "xp_a_credit_value_services", "xp_a_custody_services",
  "xp_a_debit_attempts", "xp_a_debts", "xp_a_declarations", "xp_a_deliveries", "xp_a_entity_checks", "xp_a_equipment_offers",
  "xp_a_equipment_test_bookings", "xp_a_equipment_test_slots", "xp_a_execution_desks", "xp_a_execution_handovers", "xp_a_executor_allocations", "xp_a_exports",
  "xp_a_handover_payroll", "xp_a_handover_services", "xp_a_incoming", "xp_a_invoice_collection_services", "xp_a_invoices", "xp_a_market_accounts",
  "xp_a_market_deposits", "xp_a_market_orders", "xp_a_notice_registers", "xp_a_notices", "xp_a_payment_intents", "xp_a_payments",
  "xp_a_processing_bookings", "xp_a_processing_services", "xp_a_psp_net_batches", "xp_a_purpose_routes", "xp_a_quarantine_disputes", "xp_a_reasoning_carriers",
  "xp_a_reasoning_contracts", "xp_a_reasoning_dispatches", "xp_a_recall_sales", "xp_a_receivable_successions", "xp_a_recipients", "xp_a_replacement_offers",
  "xp_a_replacement_receipts", "xp_a_replacement_refunds", "xp_a_reservations", "xp_a_retained_receivables", "xp_a_route_capacities", "xp_a_sale_credit_notes",
  "xp_a_sales", "xp_a_settlement_cases", "xp_a_settlement_terms", "xp_a_shops", "xp_a_stock_packages", "xp_a_supplier_credit_notes",
  "xp_a_supplier_payables", "xp_a_trace_channels", "xp_a_traces", "xp_a_transport_routes", "xp_a_virtual_leases", "xp_a_virtual_receipts",
  "xp_a_wallets", "xp_accounts", "xp_b_access_profiles", "xp_b_allocations", "xp_b_billing", "xp_b_business_accounts",
  "xp_b_campaign_launches", "xp_b_credential_continuity", "xp_b_credentials", "xp_b_currency_windows", "xp_b_customs_entries", "xp_b_customs_liens",
  "xp_b_delegate_countersigns", "xp_b_delegate_grants", "xp_b_delivery_contracts", "xp_b_delivery_schedules", "xp_b_destinations", "xp_b_dispatch_bookings",
  "xp_b_dispatch_lines", "xp_b_dispatch_stock", "xp_b_evidence_requests", "xp_b_export_lots", "xp_b_export_reporting", "xp_b_fees",
  "xp_b_fx_orders", "xp_b_fx_requirements", "xp_b_gateway_payments", "xp_b_gateway_routes", "xp_b_importers", "xp_b_incident_replacements",
  "xp_b_incident_supplier_deliveries", "xp_b_invoice_identities", "xp_b_invoice_profiles", "xp_b_invoices", "xp_b_managed_businesses", "xp_b_merchants",
  "xp_b_next_tax", "xp_b_order_fulfillments", "xp_b_orders", "xp_b_original_transactions", "xp_b_payment_challenges", "xp_b_payout_rules",
  "xp_b_platform_payouts", "xp_b_platform_reconciliations", "xp_b_platform_transfers", "xp_b_pools", "xp_b_proof_access", "xp_b_reasoning_accepted_advances",
  "xp_b_reasoning_billing_review", "xp_b_reasoning_campaign_mix", "xp_b_reasoning_customs_disbursements", "xp_b_reasoning_customs_payouts", "xp_b_reasoning_export_capacity", "xp_b_reasoning_fx_installments",
  "xp_b_reasoning_incidents", "xp_b_reasoning_invoice_schedule", "xp_b_reasoning_mandates", "xp_b_reasoning_proof_seals", "xp_b_reasoning_proof_versions", "xp_b_reasoning_pvp_schedule",
  "xp_b_reasoning_recovery", "xp_b_reasoning_royalty_bookings", "xp_b_reasoning_royalty_channels", "xp_b_reasoning_royalty_delivery", "xp_b_reasoning_supplier_schedule", "xp_b_reasoning_tax_bookings",
  "xp_b_reasoning_tax_capacity", "xp_b_reasoning_tax_cycle", "xp_b_reasoning_tax_payments", "xp_b_rebate_reconciliations", "xp_b_receiving_accounts", "xp_b_recovery_handoffs",
  "xp_b_recovery_instructions", "xp_b_retiring_tax_instructions", "xp_b_royalty_tax", "xp_b_secure_obligations", "xp_b_security_transfers", "xp_b_settlement_pairs",
  "xp_b_store_orders", "xp_b_supplier_fx_credits", "xp_b_tax_agents", "xp_b_tax_appeals", "xp_b_tax_claims", "xp_b_tax_handovers",
  "xp_b_tax_obligations", "xp_b_tax_receipt_allocations", "xp_b_tax_settlement_receipts", "xp_c_advance_applications", "xp_c_automation_actions", "xp_c_bank_movements",
  "xp_c_beneficiary_delivery_terms", "xp_c_calloff_deliveries", "xp_c_card_authorizations", "xp_c_card_purchases", "xp_c_card_returns", "xp_c_cards",
  "xp_c_carrier_fee_claims", "xp_c_cash_bags", "xp_c_cash_collectors", "xp_c_cash_handovers", "xp_c_cash_transactions", "xp_c_channel_batches",
  "xp_c_channel_business_keys", "xp_c_channel_deliveries", "xp_c_channel_items", "xp_c_cod_batches", "xp_c_cod_buyer_refunds", "xp_c_cod_orders",
  "xp_c_cod_returns", "xp_c_contact_receipts", "xp_c_controllers", "xp_c_custody_bank_notices", "xp_c_customer_liabilities", "xp_c_dcc_transactions",
  "xp_c_debtor_tranches", "xp_c_deferred_currency_releases", "xp_c_delivery_acceptances", "xp_c_essential_captures", "xp_c_executions", "xp_c_exit_merchant_claims",
  "xp_c_exit_plans", "xp_c_exit_transfers", "xp_c_exit_wallets", "xp_c_factor_offers", "xp_c_fallback_capacity", "xp_c_freight_bookings",
  "xp_c_freight_contracts", "xp_c_freight_routes", "xp_c_hotel_deposits", "xp_c_institution_finance", "xp_c_interaccount_matches", "xp_c_merchant_refund_cases",
  "xp_c_negotiation_obligations", "xp_c_negotiation_plans", "xp_c_negotiations", "xp_c_network_cards", "xp_c_network_tokens", "xp_c_onward_booking_plans",
  "xp_c_outflow_tariffs", "xp_c_period_adjustments", "xp_c_periods", "xp_c_postings", "xp_c_prior_tax_refunds", "xp_c_receivable_disputes",
  "xp_c_recovery_orders", "xp_c_recovery_period_bindings", "xp_c_reservation_commitments", "xp_c_reservations", "xp_c_resource_payments", "xp_c_resource_queues",
  "xp_c_route_inquiries", "xp_c_route_offers", "xp_c_route_portfolios", "xp_c_safeguard_history", "xp_c_safeguard_pools", "xp_c_screening_hits",
  "xp_c_small_outflow_permissions", "xp_c_staff_float_receipts", "xp_c_statement_entries", "xp_c_statements", "xp_c_subscription_consents", "xp_c_supplier_advances",
  "xp_c_supplier_changes", "xp_c_supplier_credit_notes", "xp_c_supplier_due_items", "xp_c_supplier_installments", "xp_c_supplier_portfolios", "xp_c_tax_batches",
  "xp_c_tax_orders", "xp_c_tax_registrations", "xp_c_tax_remittances", "xp_c_treasury_disbursements", "xp_c_treasury_distributions", "xp_c_vault_allocations",
  "xp_c_wallet_payrolls", "xp_c_wallet_purchase_orders", "xp_cases", "xp_d_cash_barcodes", "xp_d_cash_networks", "xp_d_cash_orders",
  "xp_d_cash_tickets", "xp_d_serial_batches", "xp_d_serial_bindings", "xp_d_serial_contracts", "xp_d_serial_lots", "xp_d_serial_packages",
  "xp_d_serial_products", "xp_events", "xp_journal", "xp_v9_allocations", "xp_v9_cases", "xp_v9_controls",
  "xp_v9_obligations", "xp_v9_payments", "xp_v9_sources",
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
      return send(res, 200, { ok: true, scenario: SCENARIO, store: STORE_DIR, model: MODEL_DIR });
    }
    if (req.method !== "POST") return send(res, 404, { ok: false, error: "not found" });
    const payload = await body(req);
    const q = String(payload.question ?? "").trim();
    if (!q) return send(res, 400, { ok: false, error: "question required" });
    if (req.url === "/l1") {
      const system = String(payload.system ?? "operations_desk");
      const r = await stateModelQuery(store, q, {
        topK: Number(payload.top_k ?? 5),
        threshold: Number(payload.threshold ?? 0.5),
        system,
      });
      return send(res, 200, {
        ok: true,
        data: r,
        system,
        public_resources: system === "psp" ? PSP_RESOURCES : OPS_RESOURCES,
      });
    }
    if (req.url === "/l2") {
      const r = await searchConsensus(
        store,
        String(payload.namespace ?? "").trim(),
        q,
        Number(payload.top_k ?? 5),
        String(payload.system ?? "").trim() || undefined,
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
