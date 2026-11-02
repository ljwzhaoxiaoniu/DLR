# BizAgentBench · L3 SOP (Operations Desk + Payment Expansion)

> Each section is a **problem-class playbook**, not a case answer key. The section title is the customer
> opening that triggers the class (used for retrieval); the body is the method that applies to any request
> with the same features. No instance amounts, record IDs or fixed sequences.
> These sections are authored in this repository and are NOT dataset content.

## operations_desk

### When asked: "I need to pay a supplier in euros and another in pounds. Our earlier tax payments also haven't been matched to the right periods. Can you help sort these out? I don't want to pay the tax twice."

> **Type**: problem class
> **Class**: foreign-currency delivery + unmatched tax transfer repair + fee funding
> **Source**: DESK-fx / DESK-tax / DESK-collateral / DESK-protocol
> **Note**: L3 addition authored in this repository; not dataset content

This class covers any request that combines foreign-currency supplier delivery from a constrained wallet with
repairing tax payments that were already sent, including funding a bank record correction.

1. Establish the object set from the request: delivery obligations (amount, currency, due minute, per-payment
   delivery fee), wallets (per-currency balances and pledged reserves), conversion routes (source/target,
   ordered segments, fee, minimum, lifetime, settlement delay, review status), tax transfers and periods,
   certificates, reserve drawing options, and the scheduled events (cutoffs, document availability, route
   revisions).
2. Build the funding plan: total outflow per currency is principal plus the per-payment delivery fee — one fee
   per payment, so splitting a delivery multiplies the fee. After all payments the wallet must still meet the
   customer's retained-balance floors, so size each conversion from the post-payment floors, not from the raw
   shortfall. Route fees are a separate budget from delivery fees.
3. Execute conversions correctly: a quote does not reserve funds; execute only a quote whose bound route
   version is current and unexpired; the target amount is spendable only after the settlement event. Recompute
   each leg with its own rounding rule when comparing quotes.
4. Fund the correction: a fee wallet that starts empty must be funded before the fee is charged. Compare every
   drawing option on two axes — the net amount delivered to the fee wallet and the minute that net is actually
   creditable — against the fee deadline; release conditions are evaluated at booking on actual records. The
   facility fee (debit minus net) is the reserve's own cost and is separate from a customer cap on the
   correction, which limits money leaving the fee wallet.
5. Repair the tax record: distinguish a bank reference/period amendment (windowed, per transfer) from an
   authority allocation (evidence-based, replaces the prior posting). Use a current certificate version; a
   superseded version is rejected. An amendment acknowledgement starts a whole-principal posting that blocks
   another allocation until it completes, and a later allocation replaces that posting with the certificate
   split.
6. Respect the clock: the earliest filing cutoff is the binding deadline; at the same minute, postings are
   applied before the cutoff check. A shortfall records OVERDUE and debits the late fee. Close the case only
   after the latest cutoff and after verifying the final period statuses.

### When asked: "Several storefronts still can't receive payments. I also want to retire our old operating account, but some subscriptions need to keep running. Can you help with both?"

> **Type**: problem class
> **Class**: multi-site collection rollout + account exit with retained services
> **Source**: DESK-rails / DESK-exit / DESK-collateral / DESK-protocol
> **Note**: L3 addition authored in this repository; not dataset content

This class covers any request that combines enabling a set of collection sites with retiring an operating
account while some services must keep running.

1. Establish the object set: sites (market, category, actual entity, sender rail, readiness deadline, test and
   validation delays), product profiles (supported markets, entity regions, categories, rails, new-account
   eligibility, issuance fee and billing account), accounts, bindings, desk services, bills, expected returns,
   reserve facilities and scheduled events.
2. Roll out each site: determine the site's full attribute set, then select a product profile that matches all
   of it and supports new accounts. A valid-looking account that fails any attribute is operationally wrong;
   do not substitute customer labels.
3. Fund the rollout: opening an account consumes the published issuance fee from its billing account and one
   issuance credit; a rejected opening charges nothing and closing does not restore either. When several
   facility drawings can fund the fees, compare their total fees and credit timing and choose a feasible
   combination with the lowest total fee, keeping the total within the customer cap.
4. Validate each site: open the account, bind it, let platform validation record its result, then run the
   separate test settlement. Only a live, attribute-compatible binding with a successful test before that
   site's readiness minute counts; an accepted binding is not a successful test, and a later test does not
   establish earlier readiness.
5. Exit the old account: terminate the service that should end, migrate the retained subscriptions' future
   bills to their keep accounts, pay every accepted bill on the account captured when it was accepted, and
   route an expected return to its recorded account. The old account must reach zero before it can be closed,
   and only the customer-authorized source accounts may be swept; pledged reserve cash cannot be swept.
6. Fund the retained accounts before their bills debit: a migrated future bill debits its new account, and a
   bill accepted on an unfunded account FAILS at its debit minute with no retry in the cycle. Check the
   scheduled bill events and make sure each retained account can cover its upcoming bills in time.
7. Respect the exit semantics: termination and billing migration affect future bills only; an accepted bill
   stays on its captured account; any unresolved scheduled bill event fails the exit.
8. Close only when every site is collecting and every accepted bill is settled; a partial outcome is not the
   agreed terminal state.

### When asked: "Our September receipts still don't line up with the outstanding amounts on our report. Our company account application also hasn't been sorted out, and we need to use it soon. Can you help with both?"

> **Type**: problem class
> **Class**: receivables reconciliation + evidence-based onboarding review
> **Source**: DESK-reconciliation / DESK-onboarding / DESK-commercial-evidence / DESK-collateral / DESK-protocol
> **Note**: L3 addition authored in this repository; not dataset content

This class covers any request that combines reconciling received remittances against open invoices with
completing a company account application that requires ownership analysis and evidence.

1. Establish the object set: the receivable portfolio, its trade invoices, remittances and advice
   revisions, the allocation map; the onboarding application, applicant entity, company profiles and
   ownership edges, evidence bundles and submissions; the fee accounts, reserve facilities and scheduled
   events.
2. Reconcile each remittance: gross equals net cash plus the external fee, and a merchant-borne fee is an
   expense, not unpaid principal. Obtain the dispatched advice after its trace delay, read the READY
   revision, and apply its express designations; an omitted invoice has no fixed clause, not an automatic
   zero. Build one allocation map per remittance that stays within gross, uses only eligible invoices and
   matches the advice. Across remittances, the allocated totals must equal each invoice.
3. Resolve ownership: sum the products of ownership fractions along every path from each natural person to
   the applicant. Required persons are those at or above the application threshold plus every listed direct
   controller. Evidence must show the applicant's current registry and each required person's current
   identity, with claims matching the current profile versions.
4. Assemble and submit: bundle only approved submissions whose claims are valid at review; assembling is not
   submitting. Before submitting, check every scheduled profile/registry revision that will occur before the
   review completes: evidence must match the version current at review, not only at submission. Each actual
   submission charges the review fee from the billing account, and a replacement submission restarts the
   review delay, which can push the review past its due minute.
5. Fund the review: the fee account must be funded before submission. Bank deadlines (review due, filing
   cutoffs) are bank facts, not customer preferences — never ask the customer to confirm or waive them.
   A drawing is one-shot and all drawings share the same reserve, so before booking any drawing, surface the
   deadline-versus-fee choice and obtain the customer's decision, including explicit approval of a
   fee-bearing route; booking the slow option first can make the on-time option impossible. The review budget
   counts the review fee plus drawing fees, and a documented choice raises the cap only when the customer
   approves that exact fee-bearing route. Submit with enough lead time for the review to complete by its due
   minute.
6. Respect scheduled changes: a published registry/profile revision changes only the named profile and
   version; a replacement submission does not silently inherit earlier evidence. Close the portfolio only
   after the allocation map is consistent, and record the case only after the application is approved and
   the portfolio is closed.

### When asked: "Some money in our account isn't available, and payroll and other bills are coming due. I also submitted a batch of supplier payments earlier, but I can't tell which went through. Could you check and get the outstanding payments handled?"

> **Type**: problem class
> **Class**: restricted-fund release + batch payment reconciliation
> **Source**: DESK-restrictions / DESK-batches / DESK-commercial-evidence / DESK-collateral / DESK-protocol
> **Note**: L3 addition authored in this repository; not dataset content

This class covers any request that combines releasing restricted or assigned funds for due purpose
payments with determining which earlier batch submissions actually paid.

1. Establish the object set: restricted lots, fund restrictions, receivable rights, purpose instructions,
   batch items, submission attempts, bank receipts, accounts, scheduled events and supporting documents.
2. Determine availability per lot: a lot is unavailable while any active restriction or unreleased
   receivable right covers it; do not net the headline restriction amounts. Map each purpose instruction
   to its source lots and check that each lot permits the instruction purpose.
3. Release only what is needed: apply approved evidence for the specific restriction or right and only its
   named lots; other restrictions remain independent. Respect a release precondition that the named
   instruction must already have received a minimum in actual settled payments, and treat a partial release
   as partial rather than full availability.
4. Pay the instructions: use explicit positive allocations per lot, within the remaining balance and before
   the due minute. The bank does not validate the separate commercial proceeds assignment, so check that
   the payment actually serves the instructed purpose.
5. Reconcile the batch: keep items distinct from attempts. Trace pending attempts after their trace delay;
   only a settled bank receipt is authoritative, while a pending acknowledgement proves neither success
   nor failure. Verify the current bank reference and recipient version, and respect submission-key
   semantics so a retry does not create a duplicate payment.
6. Fund any shortfall: when the account cannot cover the due batch payments, use the available facility, but
   inspect pending terms assessments first. A pending assessment can change the net amount at its event, and
   a prepared request binds the observed terms version; when the difference matters for a remaining payment,
   wait for the assessment before booking.
7. Close only when every purpose instruction is paid, every batch item is settled or properly void, and no
   attempt remains pending without a terminal receipt.

### When asked: "Our group companies have supplier bills coming due. We also have a purchase where some goods never arrived and the money hasn't been sorted out. Can you help handle both?"

> **Type**: problem class
> **Class**: group treasury payments under institutional mandates + card dispute loss recovery
> **Source**: DESK-treasury / DESK-disputes / DESK-commercial-evidence / DESK-collateral / DESK-protocol
> **Note**: L3 addition authored in this repository; not dataset content

This class covers any request that combines paying group-company supplier obligations under institutional
treasury authority with recovering the uncompensated loss on a purchase where goods did not arrive.

1. Establish the object set: treasury obligations, treasury mandates with their versions and scheduled
   revisions/effectiveness events, paying accounts, the card loss case, loss components, compensation
   entries, the dispute, supporting evidence and scheduled events.
2. Reconcile authority: for each obligation, take the mandate version effective at the payment minute
   (applying revision and effectiveness events up to that minute). The paying account entity, the
   obligation commercial debtor and the mandate payer must be the same; the executor, beneficiary and
   purpose must be allowed; the minute must fall inside the validity interval; and the payment must capture
   the current effective version. Capacity counts actual payments under that version in its active interval.
3. Lodge mandate evidence when a version is pending: reviewed signed evidence becomes effective after its
   delay, old versions stay historical, and a scheduled replacement invalidates only the replaced version.
   Authorization and the customer economic funding preference are separate checks; group balances are not
   pooled automatically.
4. Compute the loss per component from the warehouse receipts; register claims only for case components and
   never above the component cleared value, before the case filing deadline. Adjust the full unresolved
   claim map as actual compensation settles: only settled compensation discharges a loss, and a refund for
   another component does not offset this one.
5. Fund and file: the filing fee is charged when the dispute is filed, so fund the fee account first. A
   customer cap on dispute filing fees covers the filing fee itself, not a reserve facility fee used to fund
   the fee account — state the two separately and confirm that the filing fee is within the cap. File before
   the case filing deadline.
6. Finalize at the case review minute; finalization schedules payment after the settlement delay and cannot
   be changed afterwards. Watch for a published refund correction that can turn a settled receipt into a
   failed one, and leave no scheduled refund receipt unresolved.
7. Close when every obligation is paid under a valid effective mandate and every component loss is covered
   by settled compensation.

### When asked: "Can you release the securities we have promised to our counterparties and take care of the equipment bill? We also have a receivable arriving into custody. Also, my equipment order is shipping in two parts. One card payment is still pending, and I need to finish paying for the items that are actually shipping. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: security release + equipment bill + partial card shipment
> **Source**: DESK-protocol / DIVERSE-dated_collateral / PAYMENT-payment_split_capture / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a two-service spending plan: securities that already carry delivery instructions with a supplier bill and loan servicing, plus an order shipping in two parts, funded from one cash allocation agreement.

1. Establish the object set: loans with their accepted collateral classes and issuer caps; all assets (pledged, free, retained, and delivery-order assets with their due minutes); custody records; the supplier bill; the card authorization, fulfillment lines and captures; the joint agreement, its sources, routes and fundings.
2. Fund each service wallet to its exact registered capital before the operational deadlines. The agreement's capital_by_case is the contractual total, and initial_operating_by_case is already in that service wallet: deliver the remaining registered capital exactly, not merely the amount the current payments need, from sources permitted for that service and through their release conditions, while respecting the delivery-fee ceiling and the minimum uncommitted cash. Re-read the agreement's current terms_version immediately before preparing each request: a pending assessment can change the executable version and assessed fees; after a terms change, prepare a fresh request instead of reusing a stale one.
3. Open the service-correspondence inquiry for the loan-servicing record early. A principal repayment may require a receipt that becomes READY after the record's delay; do not wait for a rejection to open the inquiry, and do not treat a rejection as final when a corrected request remains available.
4. Deliver the assets that already carry delivery instructions before other work. Their due minutes are early, every wait advances the clock, and a release after the due minute is late even when the coverage check passes. Keep retained collateral (the guarantee certificate and any asset the customer wishes to retain) pledged. If a release is rejected because the loan would fall short of required collateral, restore coverage with free **eligible** assets first — matching currency, accepted class, custody status and eligibility dates — then retry the release; do not pledge retained security, a currency/class mismatch, or a pending-custody asset. After each release, verify continuing haircut-adjusted coverage and per-issuer caps for the loan.
5. Repay the minimum principal necessary. Repay only when coverage cannot be restored with eligible free assets; then choose the smallest set of loans that restores coverage. The first repayment of each loan charges its servicing fee and later repayments of the same loan do not repeat it, so prefer fewer loans and respect the customer's fee ceiling. Pay the supplier bill in full by its recorded due minute, after the service wallet actually holds the required settled capital.
6. Complete the card order from actual goods: capture only confirmed dispatched lines, release the unused authorization before it expires, pay the courier bill by its recorded due minute (it can precede the captures, so read the bill's deadline and sequence it first), and keep the card wallet above its floor. A capture submitted in the same minute has not cleared; released or cleared amounts cannot be captured again.
7. Let scheduled debits post and keep every continuous cash floor intact after each booking. Do not close before a scheduled debit has posted and the floor still holds.
8. Reserve the final step for closure: after every delivery, payment and scheduled event is final, call record_case_outcome exactly once with the achieved terminal state. A case left open fails the terminal goal; do not escalate or close early while a corrected request remains available.

Instruction data: propose_dated_collateral repay {record_id, amount_minor}; pledge {record_id, loan_id}; release {record_id}; pay_bill {record_id, amount_minor}. propose_payment_split_capture capture {authorization_id, line_id, amount_minor}; release {authorization_id, amount_minor}; new_authorization {amount_minor}; cash_payment {line_id, amount_minor}; pay_bill {bill_id, amount_minor}.

### When asked: "Please finish paying for our equipment orders and get the goods to the agreed depots. Some of the documentary-credit paperwork is still being processed. Also, two overseas suppliers need cleared funds before their local deadlines. The cheaper route may arrive too late; can you work out how to pay both? These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: documentary import settlement + cross-calendar delivery
> **Source**: DESK-protocol / DIVERSE-documentary_imports / PAYMENT-payment_cross_calendar_delivery / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers finishing import payments and physical delivery while an accepted documentary drawing and a cross-calendar currency route interact with supplier deadlines.

1. Object set: import orders, drawings, original titles, delivery guarantees, guarantee collateral, registered depots and supplier beneficiaries; the cross-calendar routes, their booking cutoffs, settlement calendars and fees; service cases and cash.
2. Separate each import order. Signed commercial credits reduce only the matching order and invoice period; void and draft credits do not. A direct supplier payment is real money; an accepted drawing is outstanding until its confirmation event reports the actual honored amount, which may be partial.
3. Settle drawings correctly: at the confirmation event the accepted drawing debits its actual amount, posts one supplier receipt and becomes final; an unhonored remainder returns rather than remaining a future debit; a CONFIRMED_UNPAID amount is retried by settle_confirmed without a second receipt. A recall request does not stop an accepted drawing.
4. Deliver the goods: cargo moves only under a lodged original title or an active order-specific guarantee. Lodging the original set returns the guarantee collateral once; a guarantee fee is not refundable; partial deliveries are allowed but cargo movements cannot be recalled.
5. Choose the cross-calendar route against the actual deadline. Reserve route capacity before booking_through_minute, and count settlement business days strictly after the origin processing date excluding recipient weekends and holidays. The cheaper route may arrive after the supplier's local deadline; compare actual value dates, not headline speed.
6. Fund both suppliers from actual available cash and keep the service's cash floor; fees and guarantee collateral are separate from principal. Wait for scheduled events when a date depends on a bank event.
7. Close only after the actual supplier receipts and cargo deliveries are recorded and the deadlines are met.

### When asked: "Some of our supplier direct debits seem to have gone through twice. Please sort that out and finish moving the utility payments off our old mandate. Also, i returned part of a purchase that I am paying in installments. Some installments have already been paid. Please fix the remaining bills and refund whatever I have overpaid. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: direct-debit duplicates + mandate retirement + installment return
> **Source**: DESK-protocol / DIVERSE-reconciled_debits / PAYMENT-payment_installment_return / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers duplicated direct debits, retiring an old mandate, and correcting an installment purchase after a partial return.

1. Object set: physical bank debits, posted and pending credits, debit mandates, queued and accepted collections, return requests; the installment plan, its bills, collections, returns and earned-period fees; the joint agreement, its sources, routes and fundings.
2. Fund the joint plan before its scheduled events. The agreement's capital_by_case is the exact total registered for each service wallet and initial_operating_by_case is already in that wallet; deliver the remaining registered capital to every service, not merely the amount a current payment needs, from sources permitted for that service and through their release conditions. A source may stay restricted until a recorded prerequisite on the named service is met (for example an actual cash debit, or a settled installment); perform the prerequisite on the other service, then deliver. Route fees are charged once per service on the first delivery; keep the fee source above the uncommitted minimum and deliver before the funding deadline. A scheduled collection settles only when that wallet actually holds the cash at the event and a settled collection creates a new bank debit: fund ahead of the first scheduled event, because funding after an UNPAID collection does not cure it. Plan the funding order around the scheduled bank events.
3. Diagnose duplicate direct debits from the physical debit records, not from references that different debtors may reuse. A customer return is unconditional within that debit's still-returnable settled amount after posted credits and prior returns; the amount is irrevocable after acceptance and posts one minute later. A merchant credit is separate and may arrive while a return is pending.
4. Retire the old mandate: revocation stops new collections but an already accepted collection keeps its acceptance; a window event locks queued collections on mandates active at that event; recall an accepted collection before it settles if it should not. The replacement mandate does not absorb other invoices automatically.
5. Reconcile the installments: accepted returned-item principal reduces the financed principal dollar for dollar; historical installment payments and actual bank collections jointly discharge the obligation; a pending collection is not money until it settles. Cancel future installments only where the plan permits.
6. Refund only the actual overpayment. Net paid is actual debits and settled collections less actual returns; a new compensating payment does not erase an unnecessary return. When a duplicate debit is being returned, recompute that invoice's actual net from its own debits, posted credits and accepted returns before paying anything: comparing the gross invoice amount with the remaining bank debit and paying the difference is double-counting. The return, not a manual payment, is the correction; a second payment creates a new obligation rather than a correction.
7. Pay the remaining bills by executing an approved request, then verify the actual receipt. A proposal or an approval is not a payment; use the bill's own payment action and do not re-propose the same bill through several payment capabilities. A generic service payment does not settle an installment bill. Close only after all returns, collections and installment bills are actually settled and the receipts are recorded.
8. Check the scheduled events for the installment reconciliation deadline and finish the correction before it: the return, refund, new retained-bill payment and plan close must all be recorded before that event. A correction executed after the deadline is late; the independent reconstruction does not accept it, even if the records look complete afterwards.

### When asked: "Could you finish settling the equipment shipments in escrow? The inspection paperwork has changed, and some money was already released. Also, a customer returned part of a combined order after we paid the sellers. Please refund the returned items and finish the sellers’ remaining payouts. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: inspection escrow settlement + marketplace split refund
> **Source**: DESK-protocol / DIVERSE-inspection_escrow / PAYMENT-payment_marketplace_split_refund / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers final escrow settlement after changed inspection evidence and a marketplace refund allocated across sellers.

1. Object set: escrow lots, their deposits, units, acceptance reports, warranty retention and assignments; the marketplace order, its sellers and their allocations; prior distributions and returns.
2. Set the final accepted value per lot. The highest issued FINAL inspection revision supersedes earlier reports; zero rejects a unit; PROVISIONAL reports and DRAFT worksheets do not establish final settlement. Warranty retention is the lot's percentage of total final accepted prices rounded down once per lot.
3. Distribute the remainder in priority order. ELIGIBLE_GROSS_CAPPED receives the minimum of its cap, the final accepted prices of its eligible units and the remaining amount; REMAINDER_PERCENTAGE receives its percentage of the remainder, rounded down; the seller receives the residual. Returns count against the same lot and recipient.
4. Refund buyers from the correct lot: original funding less final accepted price, allocated across the original deposit remitters in proportion to posted deposits, rounding down and assigning remaining minor units in ascending refund_order. Escrow refunds cannot be recalled.
5. Handle the marketplace refund by seller allocation: a pending refund counts only when the bank reports SETTLED; if a seller credit is reversed, reallocate the refund without paying the buyer twice. Finish the sellers' remaining payouts only after the refund allocation is final. For each seller, remaining entitlement is the original seller allocation minus that seller's returned-item price; only the seller of a returned item bears the reversal, and the exact net amount must be paid by that seller's payout due minute.
6. Verify actual distributions and refunds and close when every lot and seller allocation is settled.

### When asked: "Please finish our supplier payments and sort out the currency deliveries already arranged for them. One of the euro deliveries is still being processed. Also, my equipment order is shipping in two parts. One card payment is still pending, and I need to finish paying for the items that are actually shipping. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: forward delivery + margin release + split capture
> **Source**: DESK-protocol / DIVERSE-contingent_forwards / PAYMENT-payment_split_capture / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers concluding forward currency deliveries and a partially shipped card order from the same spending plan.

1. Object set: forward contracts (flexible purchase and funded cross), their notional, lot size, cutoffs, margin and closure charges; spot quotes; supplier invoices; the card authorization, fulfillment lines and captures.
2. Run each forward through its cutoff: exercise or nominate in the recorded lot size, debit the source currency immediately, and release margin proportionally to original notional using cumulative releases. The unused remainder can be closed; closing it releases its margin and charges the recorded closeout fee. Already exercised or nominated currency cannot be closed or refunded.
3. A confirmed-but-unpaid delivery reports its actual foreign amount and can be retried by settle_confirmed; do not treat the confirmation as a new receipt. Pending receipt metadata does not promise full delivery.
4. Spot exchange: a BUY rounds the source debit upward, a SELL rounds the target credit downward; a positive available amount is exchangeable, but the bank does not decide whether the exchange meets the customer's plan. Keep any required free cash reserve.
5. Complete the card order from dispatched goods only; the original authorization remains capturable until expiry, new approvals are capped, and released or cleared amounts cannot be captured again.
6. Fund every supplier payment from actual available cash plus released margin; a treasury instruction that exhausts funds can block a later obligation even when it is bank-valid.
7. Verify actual receipts, FX credits and deadlines, and close after both business tracks are settled.

### When asked: "Our machinery is ready, but the two depots still cannot collect it. Please release every lot to the right depot before its pickup deadline and keep the total release charges as low as possible. Also, i am organizing two group orders. One person has pulled out and another payment still says pending. Please help the groups complete their purchases and return the money that should go back. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: title release to depots + group purchase completion
> **Source**: DESK-protocol / DIVERSE-document_title_allocation / PAYMENT-payment_group_purchase_commitment / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers releasing cargo lots to depots at the lowest total charge and completing two group purchases with a withdrawal and a pending payment.

1. Object set: title documents, covered cargo lots, pickup windows, destinations and storage tariffs; group purchases, their terms, contributions and merchant commitment.
2. Release every lot to the right depot before its pickup deadline at the lowest total release charge. An ACTIVE title must cover the exact lot and be endorsed to the actual destination; endorsing a joint title controls every covered lot by one destination and is irreversible; activating its split retires the joint title and activates the exact child titles, charging the split fee once and each endorsement fee once.
3. Choose windows and dispatch minutes against the storage formula: for dispatch minute m, d = max(0, m - free_through); the first positive interval costs handling_units × first_window_rate_minor and each further interval handling_units × later_window_rate_minor, plus the lot's window loading fees once. Dispatch consumes the lot's full handling units and cannot be repeated.
4. Group purchases: qualification is assessed when the merchant commitment is accepted; committing debits the deposit immediately and it counts toward the merchant price. A withdrawing participant gets its entire actual contribution back; a successful group pays the merchant, a failed one refunds participants.
5. Treat a pending participant payment as not received until the bank records it. Do not commit a group on an unconfirmed contribution.
6. Fund the charges and releases from actual cash and close after every lot is dispatched to its depot and every group is completed or refunded.

### When asked: "Please renew our port, customs and warehouse guarantees and pay the equipment supplier. We need those services to keep running. Also, the checkout asked me to verify a payment, then the shop changed the order total. I also have another purchase to finish before I leave. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: guarantee continuity + checkout authentication binding
> **Source**: DESK-protocol / DIVERSE-continuous_guarantees / PAYMENT-payment_authentication_binding / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers renewing continuing guarantees without a coverage gap and completing a checkout whose order total changed after verification.

1. Object set: continuing guarantees, their old_through minute, renewal offers, required margin, admission and activation timing, temporary-cover offers and bridge cover; the checkout verification, order and cumulative capture limit.
2. Keep the existing cover continuous: the old guarantee covers through its inclusive old_through minute. A renewal submission pays the offer fee immediately but is not cover; the replacement activates at the offer's activation minute only if the full required cash margin is already lodged. A missed activation is reconsidered later without backdating, so lodge margin before the activation minute.
3. A temporary-cover offer applies to its named guarantee, uses that guarantee's existing margin and runs through its stated inclusive coverage minute. A bridge purchase is a separate cost; compare the cost of each continuity option.
4. Pay the supplier bill from actual available cash; the dated insurance debit uses wallet cash at its scheduled processing.
5. Checkout: each verification binds a merchant, an order and a maximum cumulative captured amount. A changed order total needs a new verification; captures are accepted only against live verified matching records up to that maximum and the aggregate card limit.
6. Verify actual admission, activation and receipts, and close after the guarantees are continuous and every payment has actually settled.

### When asked: "Please finish the insurance recoveries for our damaged equipment and stock. We need the replacement payments made on time, and the suppliers may still send compensation. Also, i used my wallet and card together for two orders. One order was cancelled, and a top-up now looks wrong. Can you fix the balances and finish the order I am keeping? These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: insurance recovery + wallet stored-value restitution
> **Source**: DESK-protocol / DIVERSE-shared_indemnity / PAYMENT-payment_stored_value_restitution / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers insurance recoveries with possible later supplier compensation and a mixed wallet/card order correction.

1. Object set: insurance policies, insured losses, deductibles, layers, salvage and external recoveries; replacement invoices; the wallet lots, orders and top-ups.
2. Match coverage before paying: the insured legal entity and asset class must match, an OCCURRENCE policy covers incidents inside its policy period if notified by the report-through day, and a CLAIMS_MADE policy requires notification inside its period and by that day and an incident on or after the retroactive day.
3. Compute each loss: net loss = gross loss - deductible - realized salvage - actual supplier compensation, floored at zero. The primary layer pays at most the smaller of net loss and its per-loss limit; requests reserve the policy aggregate immediately. Only settled compensation discharges a loss, and future supplier compensation changes the remaining amount.
4. Pay the replacement invoices on time from actual cash; a claim or request is not a settlement.
5. Wallet and card: cash top-ups and promotional value are separate lots; an order can combine lots only within its recorded promotional allowance across all partial payments. Restoring tender returns value to its lot; a return of a top-up is a separate operation. Fix the wrong top-up without treating a cancelled order's value as spendable.
6. Verify actual insurance settlements, replacement receipts and wallet balances, and close after the retained order is settled and no claim remains unresolved.

### When asked: "Could you finish our intercompany settlement and the brokerage payment? There is a group clearing draft in the portal, and some staff approvals are already on it. Also, our contractor says one of our electronic cheques went to the wrong place. There is another cheque due soon as well. Please make sure the right people are paid without paying either bill twice. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: intercompany clearing + cheque stop and replacement
> **Source**: DESK-protocol / DIVERSE-revised_netting / PAYMENT-payment_cheque_stop_and_replacement / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers completing an intercompany clearing draft with existing staff approvals and resolving a misdirected electronic cheque plus a replacement.

1. Object set: the intercompany clearing cycle, captured invoice balances, registered staff signing services, company accounts; the electronic cheque, its holder, endorsement, stop request and replacement payment.
2. Prepare or refresh the clearing cycle from current signed balances; a prepared cycle retains its captured amounts until refresh. Collect signatures only from registered staff signing services; staff logins identify interfaces, not people. Execute the internal or external instruction once. Each company keeps its own account and cash; the case cash figure is not a spending pool.
3. A group clearing draft is not a payment: verify net positions, signatures and actual cash before executing.
4. Cheque: an endorsed cheque pays its current lawful holder, which may differ from the invoice seller. A stop request is not a successful stop; opening cheque holds are separate from free cash. A replacement payment is separate from the underlying bill payment.
5. Avoid paying either bill twice: identify the actual clearing/cheque outcome first, then pay only the remaining obligation to the correct holder.
6. Verify actual receipts and holder identities, and close after the clearing cycle and both cheques are resolved.

### When asked: "Several customers are still chasing refunds while the card disputes are going on. Please finish the refunds we owe and protect the parts of the sales we are entitled to keep. Also, a customer returned part of a combined order after we paid the sellers. Please refund the returned items and finish the sellers’ remaining payouts. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: merchant concessions + scheme remedies + marketplace refunds
> **Source**: DESK-protocol / DIVERSE-overlapping_remedies / PAYMENT-payment_marketplace_split_refund / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers customer refunds during card disputes where merchant concessions, scheme credits and marketplace seller allocations overlap.

1. Object set: purchases, the final merchant concession memo, settled scheme credits, posted merchant refunds, new refunds, dispute responses and their evidence; the marketplace order and seller allocations.
2. Set the recoverable amount per purchase from the final concession. Settled scheme credits, posted merchant refunds and new actual refunds all satisfy the same purchase concession; a submission, expected credit or pending refund does not. Distinct purchases stay distinct even when names or amounts match.
3. Protect the part the business may keep: the merchant may defend the original amount less the final concession, and an accepted defense with documents is not the same status as having received them; subsequent actual results change the remaining refund and defense amount.
4. Handle the marketplace refund by seller allocation: a pending refund counts only when the bank reports SETTLED; reversing a seller credit reallocates the refund without paying the buyer twice. Finish the sellers' remaining payouts only after the refund allocation is final.
5. Do not double count the same concession across a merchant refund, a scheme credit and a new refund.
6. Verify actual credits and refunds and close when every purchase's concession is satisfied exactly once.

### When asked: "Please sort out our payroll and the upcoming business bills using our deposits. I would like to keep as much of the deposit return as possible. Also, i returned part of a purchase that I am paying in installments. Some installments have already been paid. Please fix the remaining bills and refund whatever I have overpaid. These are part of the same business spending plan."

> **System**: operations_desk
> **Type**: problem class
> **Class**: term-deposit redemption + installment plan return
> **Source**: DESK-protocol / DIVERSE-tiered_deposit_calendar / PAYMENT-payment_installment_return / JOINT-CASH-delivery
> **Note**: L3 addition authored in this repository; not dataset content

This class covers funding payroll and business bills from term deposits while retaining as much deposit return as possible, and correcting an installment purchase after a partial return.

1. Object set: active term deposits, their principal, interest, maturity processing, break charge and tier tests; the operating obligations and their due minutes; the installment plan, its bills, collections, returns and earned-period fees.
2. Compare redemption paths: holding to maturity pays principal plus applicable interest; full early redemption pays principal minus the break charge immediately and forfeits all interest on that deposit. Partial redemption, reinstatement and borrowing are unavailable, and a deposit already paid at maturity cannot be redeemed again.
3. Apply the scheduled-processing order: at a minute the actual reimbursement decision runs first, then a due tier test, then deposits maturing at that minute, then the automatic debit. Preparation and approval neither hold a rate nor reserve funds, so size the plan from actual maturities and cash.
4. Fund payroll and bills from actual available cash after applying the chosen redemptions; do not count an unprocessed maturity or a pending automatic debit as available.
5. Installment plan: accepted returned-item principal reduces the financed principal dollar for dollar; historical payments and actual collections discharge the obligation; refund only actual overpayment and cancel future installments only where permitted.
6. Verify actual deposit payouts, invoice receipts and plan settlements, then close.

### When asked: "Please handle our two export collections, pay the assembly supplier and shipping agency, and send the buyers their documents. The collecting bank is still confirming what was accepted. I also need help with a related matter: a customer returned part of a combined order after we paid the sellers. Please refund the returned items and finish the sellers’ remaining payouts."

> **System**: operations_desk
> **Type**: problem class
> **Class**: export bill collection + receivable assignment + marketplace refund
> **Source**: DESK-protocol / DIVERSE-actual_collections / PAYMENT-payment_marketplace_split_refund / LINK-refund_recalculation_gate
> **Note**: L3 addition authored in this repository; not dataset content

This class covers two export collections whose acceptance is still being confirmed, paying the assembly supplier and shipping agency, and releasing documents to buyers, alongside a marketplace refund.

1. Object set: collection bills, their face, prior receipts, acceptance result and title; the acceptance event; payables to the assembly supplier and shipping agency; the marketplace order and seller allocations; the link contract and its milestone scope.
2. Do not treat a buyer acceptance notice or an earlier-period advice as current cash. At the acceptance event the bank records the buyer's actual total accepted amount, which includes historical receipts rather than adding another amount.
3. A bill may be discounted once after actual acceptance for its currently unpaid accepted rights; the discount fee applies once. Pay the registered payables from actual bank cash; any positive available amount is accepted, but the bank does not select the customer's financing optimum.
4. Move original documents correctly: deliver the indicated original documents to the buyer or return them to the exporter; the bank blocks duplicate physical document movements.
5. Marketplace refund: allocate the buyer refund by the recorded seller allocation; a pending refund counts only when the bank reports SETTLED, and reversing a seller credit reallocates it without paying twice. For each seller, remaining entitlement is the original seller allocation minus that seller's returned-item price; only the seller of a returned item bears the reversal, and the exact net amount must be paid by that seller's payout due minute.
6. Respect the link: the final downstream disposition waits for the upstream cash credit to post. Verify actual receipts and close.

### When asked: "Our accountant says the interest on our June statements still does not look right. Some of it was supposed to be refunded. Could you sort that out and pay their bill? I also need help with a related matter: our contractor says one of our electronic cheques went to the wrong place. There is another cheque due soon as well. Please make sure the right people are paid without paying either bill twice."

> **System**: operations_desk
> **Type**: problem class
> **Class**: dated interest correction + cheque stop + rolling obligation link
> **Source**: DESK-protocol / DIVERSE-dated_interest / PAYMENT-payment_cheque_stop_and_replacement / LINK-rolling_obligation_replan
> **Note**: L3 addition authored in this repository; not dataset content

This class covers correcting historical interest on signed statements, paying the accountant, and resolving a misdirected electronic cheque plus a replacement under a rolling obligation link.

1. Object set: posted bank items and their original value days, economic-date amendments, signed statements and periods, interest adjustments, the accountant obligation; the cheques and their holders; the link contract and milestone scope.
2. Reconstruct the interest basis from signed statements: the daily balance basis is ORIGINAL_VALUE_DATES; an economic-date amendment records a separate economic day without reposting principal, changing the signed daily balance or editing the interest entry. Debit interest is zero when the corrected balance is nonnegative.
3. Post a nonzero signed interest adjustment only where the statement and period support it; pay the accountant's bill to a verified external recipient from actual cash.
4. Cheque: an endorsed cheque pays its current lawful holder, which may differ from the invoice seller; a stop request is not a successful stop. A replacement is separate from the underlying bill.
5. Rolling obligation link: the first downstream instruction executes before the qualifying upstream event posts, and the final downstream instruction executes after that event; the condition covers the current episode only.
6. Verify actual postings, cheque outcomes and receipts, and close.

### When asked: "One bank letter has been withdrawn and there is a signing-key notice. Please keep our partner files usable and make sure our guarantee and collection access are still covered. I also need help with a related matter: a customer returned part of a combined order after we paid the sellers. Please refund the returned items and finish the sellers’ remaining payouts."

> **System**: operations_desk
> **Type**: problem class
> **Class**: certificate withdrawal + authority rebinding + marketplace refund
> **Source**: DESK-protocol / DIVERSE-temporal_certificates / PAYMENT-payment_marketplace_split_refund / LINK-quote_version_refresh
> **Note**: L3 addition authored in this repository; not dataset content

This class covers keeping partner files and continuing authorities usable after a bank-letter withdrawal and a signing-key notice, alongside a marketplace refund.

1. Object set: certificates and their issue days and covered intervals, partner files and their business periods, dependent authorities and their bound versions, issuer notices; the marketplace order and seller allocations; the link contract.
2. Match evidence correctly: a certificate covers a stated interval for the same legal entity, bank account and required attributes; its issue day is separate from that interval. An ISSUED certificate can be reused across compatible files, and a certificate issued today can cover historical facts only when its certified interval includes them.
3. Treat a prospective withdrawal as prospective: it prevents new acceptance on or after its effective day, but does not retroactively invalidate earlier acceptance. An annulment is different from a withdrawal.
4. Rebind each continuing authority to the listed current source versions with the required version map; a superseded source version does not satisfy the authority.
5. Marketplace refund: allocate by seller allocation, count a pending refund only when SETTLED, and avoid paying the buyer twice when reversing a seller credit.
6. Quote-version link: every downstream request actually executed must have been prepared after the first upstream execution; a changed quote needs a fresh request and approval.
7. Verify actual acceptance, rebinding and refunds, then close.

### When asked: "Several charges appeared on our corporate cards after declines, and the related refunds seem to be scattered between the cards. Please sort out any genuinely unauthorized charges and pay what the company actually owes. I also need help with a related matter: the checkout asked me to verify a payment, then the shop changed the order total. I also have another purchase to finish before I leave."

> **System**: operations_desk
> **Type**: problem class
> **Class**: late card presentments + cross-card refunds + authentication binding
> **Source**: DESK-protocol / DIVERSE-late_card_reconciliation / PAYMENT-payment_authentication_binding / LINK-currency_finality_gate
> **Note**: L3 addition authored in this repository; not dataset content

This class covers charges that appeared on corporate cards after declines, refunds scattered across cards, and a checkout whose total changed after verification.

1. Object set: card presentments and their card/entity/cardholder/merchant case/trace/amount/service day; posted merchant credits; disputes and their fixed fee; company cash and card accounts; the checkout verification, order and cumulative capture limit; the link contract.
2. Identify presentments by the physical posting, not by equal amounts or similar merchant names. A declined authorization does not prove a later presentment was unauthorized. For each merchant case, remaining unauthorized loss is total unsupported presentments less posted merchant credits, floored at zero.
3. File a dispute only on the physical presentment and for the unsupported amount; each filing charges one fixed fee. Pay the card from the selected company cash account only for what the company actually owes.
4. Allocate refunds to the leg they belong to: a POSTED merchant card credit changes the balance of the card on which it settled; a pending credit is not money.
5. Checkout: each verification binds merchant, order and maximum cumulative capture; a changed order total needs a new verification, and captures are accepted only against live verified matching records up to that maximum and the aggregate card limit.
6. Currency-finality link: the final downstream instruction executes after at least one qualifying upstream bank event has posted.
7. Verify actual postings, disputes and credits, then close.

### When asked: "Our team expenses were rejected as entertainment. Please review the travel claims and finish the staff reimbursements. I also need help with a related matter: my equipment order is shipping in two parts. One card payment is still pending, and I need to finish paying for the items that are actually shipping."

> **System**: operations_desk
> **Type**: problem class
> **Class**: travel expense qualification + split capture + shared capacity window
> **Source**: DESK-protocol / DIVERSE-reconciled_expenses / PAYMENT-payment_split_capture / LINK-shared_capacity_window
> **Note**: L3 addition authored in this repository; not dataset content

This class covers travel claims rejected as entertainment and a partially shipped card order that share a processing window.

1. Object set: travel receipts and their funding legs, employee natural-person records, travel context, caps and advances; the card authorization, fulfillment lines and captures; the link contract.
2. Qualify expenses from final receipts and the registered travel context: lodging, meals and taxis for registered business activity qualify, a meeting needs external attendees in its registered agenda, and private activity is excluded. A void receipt or an authorization without a settled debit is not a reimbursable expense, and a broad merchant category does not decide classification.
3. Compute net funding per receipt as settled legs less posted refunds. Aggregate qualifying meal funding per beneficiary, expense day and category, count at most the daily cap, allocate proportionally across net funding legs, round down and distribute remaining cents by fractional remainder then payment reference.
4. Staff settlement: add eligible personal-funded shares per employee, subtract the outstanding advance and completed historical reimbursement; a positive balance is reimbursed, a negative balance is an advance recovery. Do not offset between employees.
5. Card order: capture only confirmed dispatched lines; the original authorization remains capturable until expiry, new approvals are capped, and released or cleared amounts cannot be captured again.
6. Shared-capacity link: the first upstream instruction must execute before the first downstream instruction.
7. Verify actual reimbursements, recoveries and captures, then close.

### When asked: "Several staff logins show approvals for our supplier payments, but the payments still need finishing. Could you check them and get the suppliers paid? I also need help with a related matter: our contractor says one of our electronic cheques went to the wrong place. There is another cheque due soon as well. Please make sure the right people are paid without paying either bill twice."

> **System**: operations_desk
> **Type**: problem class
> **Class**: versioned corporate authority + cheque replacement + independent approval link
> **Source**: DESK-protocol / DIVERSE-versioned_authority / PAYMENT-payment_cheque_stop_and_replacement / LINK-independent_approval_binding
> **Note**: L3 addition authored in this repository; not dataset content

This class covers supplier payments whose staff approvals are recorded but incomplete, plus a misdirected electronic cheque and a replacement.

1. Object set: controlled invoices, their authority requirements, genuine signature instruments and bank versions; the cheque and its holder; the link contract.
2. Check each payment against its corporate mandate: a usable instrument must be a genuine available copy for that invoice and currency, match the payment's bank-detail version and cover the entire gross instruction amount including the instruction fee. The mandate needs the stated number of independent natural people and capacities; staff logins and role accounts identify interfaces, not independent people.
3. Replace or attach the correct evidence set before payment; a bank execution receipt certifies the actual debit and receiving details, not that the company mandate was satisfied. Pay each supplier once, from actual cash.
4. Cheque: an endorsed cheque pays its current lawful holder, which may differ from the invoice seller; a stop request is not a successful stop, and a replacement is separate from the underlying bill.
5. Independent-approval link: at least one upstream approval bound to an actually executed request must precede the first downstream execution.
6. Verify actual payments and holder receipts, then close.

### When asked: "Please make the three equipment payments using our company approvals. One supplier has sent updated banking details and the bank says two quotes are being revised. I also need help with a related matter: my equipment order is shipping in two parts. One card payment is still pending, and I need to finish paying for the items that are actually shipping."

> **System**: operations_desk
> **Type**: problem class
> **Class**: quote revisions + cumulative signing limits + split capture under capacity release
> **Source**: DESK-protocol / DIVERSE-revised_tolerances / PAYMENT-payment_split_capture / LINK-membership_capacity_release
> **Note**: L3 addition authored in this repository; not dataset content

This class covers three equipment payments under corporate approvals while supplier bank details and quotes are being revised, plus a partially shipped card order.

1. Object set: invoices and their current principal, fee, beneficiary version and quote version; scheduled revisions; corporate authorities and their invoice references, beneficiary versions, effective dates and fee ceilings; signing limits; the card authorization and fulfillment lines; the link contract.
2. Check the current quote: a revision replaces fee and beneficiary version and increments the quote version without creating a payment. A prepared request binds its quote version; if the quote changes before execution, prepare a fresh request and obtain its actual approval. A changed quote version alone does not invalidate an authority whose invoice references, beneficiary versions, dates and fee ceiling still hold.
3. Require two signed authorities from two distinct natural persons plus the owner's approval for each payment. The whole gross payment, principal plus actual fee, consumes each signer's cumulative gross limit immediately; another copy cannot restore used capacity.
4. Do not over-consume the signer capacity across the batch: plan the three payments together so every payment has two eligible signers and each signer stays within the cumulative limit.
5. Card order: capture only confirmed dispatched lines, release unused authorization, and do not capture released or cleared amounts twice.
6. Membership-capacity link: the first downstream instruction executes strictly between the first and last upstream instructions of the current episode.
7. Verify actual payments, quote versions and captures, then close.

### When asked: "Please finish paying our two suppliers the amounts they should actually receive. One earlier transfer is being traced, and the pump supplier has changed banks. I also need help with a related matter: i returned part of a purchase that I am paying in installments. Some installments have already been paid. Please fix the remaining bills and refund whatever I have overpaid."

> **System**: operations_desk
> **Type**: problem class
> **Class**: protected net delivery + installment return + rolling obligation link
> **Source**: DESK-protocol / DIVERSE-contingent_net / PAYMENT-payment_installment_return / LINK-rolling_obligation_replan
> **Note**: L3 addition authored in this repository; not dataset content

This class covers paying two suppliers their actual net amounts when one transfer is being traced and one supplier changed banks, and correcting an installment purchase after a partial return.

1. Object set: the protected/standard remittance routes, beneficiary details, certificates, invoices and their historical receipts; the installment plan and returns; the link contract.
2. Distinguish route semantics: on a protected route the stated amount is the desired beneficiary net; on a standard route it is the gross sent. The actual result reports the beneficiary credit and any partial return, where return = gross sent - actual credit - return charge; only the net return becomes new customer cash.
3. An earlier accepted transfer honors its bound bank details; a changed bank instruction needs a new request, not an edit of the accepted one. A trace request or expected return is not the actual return.
4. After a standard result is final, an exact-net top-up is available at the recorded fixed fee per instruction; use it only when the beneficiary's actual credit is short and the invoice remains open.
5. Installment plan: returned principal reduces financed principal dollar for dollar; actual payments and collections discharge it; refund only actual overpayment.
6. Rolling-obligation link: the first downstream instruction executes before the qualifying upstream event posts, and the final downstream instruction executes after it.
7. Verify actual credits, returns and plan settlement, then close.

### When asked: "Our payments are changing over the next couple of months. Could you put us on the cheapest suitable plan and finish closing the old partner account? I also need help with a related matter: we changed our subscription partway through the month, but the bill looks wrong. Please fix what we have paid and keep the service we still need running."

> **System**: operations_desk
> **Type**: problem class
> **Class**: prospective billing plan + subscription proration + posted settlement link
> **Source**: DESK-protocol / DIVERSE-prospective_billing / PAYMENT-payment_subscription_proration / LINK-posted_settlement_gate
> **Note**: L3 addition authored in this repository; not dataset content

This class covers choosing the cheapest suitable consolidated billing plan, closing an old partner account, and correcting a mid-period subscription change.

1. Object set: billing periods and their plan elections, the fixed group fee and variable plan rates, metered usage, campaign vouchers and partner tenure, operating accounts; the subscription invoice, old/new plans, usage units and renewal; the link contract.
2. Elect one plan per period: the fixed fee is charged once for the billing group, variable fees use that period's plan rates, and usage aggregates over the arrangement's operating accounts. Choose the cheapest plan suitable for the customer's forecast, not merely the lowest headline rate.
3. Check voucher eligibility: a campaign code reserves a credit for one open period and requires an active same-group account with the stated partner tenure at redemption. Closing an account updates unused offer eligibility.
4. Prorate the changed subscription: floor((old_monthly × old_days + new_monthly × (days - old_days)) / days) plus actual final usage_units × usage_unit_minor. Historical and actually settled pending collections both count as payment; a pending collection is not money.
5. Keep the service the customer still needs running; the next-period renewal is a separate obligation.
6. Posted-settlement link: the first downstream instruction is executed after at least one qualifying upstream bank event has posted.
7. Verify actual billing, payments and the retained service, then close.

### When asked: "The sales connection stopped halfway through again. Can you sort out our international store and help me withdraw the sales money and finish paying the packaging supplier? I also need help with a related matter: a customer returned part of a combined order after we paid the sellers. Please refund the returned items and finish the sellers’ remaining payouts."

> **System**: operations_desk
> **Type**: problem class
> **Class**: sales synchronization recovery + receivable finance + marketplace refund
> **Source**: DESK-protocol / DIVERSE-reconciled_sync / PAYMENT-payment_marketplace_split_refund / LINK-compensation_offset
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a sales connection that failed mid-window, withdrawing sales money, paying the packaging supplier, and a marketplace refund.

1. Object set: source stores, order and return streams with their permissions and cursors, sales events and their revisions, statement mirrors, receivables and offers; the marketplace order and seller allocations; the link contract.
2. Recover the import deterministically: select events strictly after after_cursor through through_cursor; event identity is store + stream + native event + revision. Canonical deduplication prevents double posting; a failed sync may leave committed postings and an older cursor, so advance the cursor only to what was actually committed.
3. Reconcile the receivable: its current face is the sum of committed source deltas; finance advances the stated percentage of the positive face, rounded down to a cent, and unwinding repays the advance and releases the assignment. Settlement must be supported by genuine current sales.
4. Withdraw USD to the verified CNY recipient and pay the packaging supplier from actual available cash; a CNY settlement is not USD cash.
5. Marketplace refund: allocate by seller allocation, count pending only when SETTLED, and avoid double payment on seller-credit reversal.
6. Compensation-offset link: the final downstream cash debit follows an upstream cash credit.
7. Verify actual sales posts, withdrawals and payments, then close.

### When asked: "My equipment order is shipping in two parts. One card payment is still pending, and I need to finish paying for the items that are actually shipping. I also need help with a related matter: please get this run and the next payroll paid, including the court deductions. There is a review of Nina's order and I am not sure whether it changes what we owe now."

> **System**: operations_desk
> **Type**: problem class
> **Class**: partial card capture + payroll attachments under deadline priority
> **Source**: DESK-protocol / PAYMENT-payment_split_capture / DIVERSE-dated_payroll / LINK-deadline_priority_slot
> **Note**: L3 addition authored in this repository; not dataset content

This class covers completing a partially shipped card order and paying this run plus the next payroll, including court deductions, under a deadline-priority link.

1. Object set: the card authorization, fulfillment lines, captures and release; payroll wage obligations, payroll tax, attachment orders and court notices, bank versions and protected disposable amounts; the link contract.
2. Card order: capture only confirmed dispatched lines; the original authorization remains capturable until expiry, new approvals are capped, and released or cleared amounts cannot be captured again. A capture submitted in the same minute has not cleared.
3. Payroll: disposable earnings = gross wages - payroll tax; total attachment cannot exceed disposable earnings minus the obligation's protected disposable amount. Support attachments have priority over ordinary judgments; remaining principal subtracts confirmed historical remittances and actual payments to that order. A pending court review has no suspensive effect unless the record says so.
4. Pay employee, tax and attachment components from the correct accounts and at the current bank version; keep business-expense repayments outside the attachment base.
5. Deadline-priority link: the first upstream cash debit has processing priority over the first downstream cash debit; sequence the runs so both deadlines are met.
6. Verify actual captures and payroll receipts, then close.

### When asked: "Our card sales do not add up to the deposits in the bank. Please close the two settlement periods and release the merchant payouts that are actually due. I also need help with a related matter: please get this run and the next payroll paid, including the court deductions. There is a review of Nina's order and I am not sure whether it changes what we owe now."

> **System**: operations_desk
> **Type**: problem class
> **Class**: acquirer batch close + payroll posted-credit reuse
> **Source**: DESK-protocol / PAYMENT-payment_acquirer_batch_close / DIVERSE-dated_payroll / LINK-posted_credit_reuse
> **Note**: L3 addition authored in this repository; not dataset content

This class covers closing two card-settlement periods, releasing merchant payouts that are due, and paying payroll with court deductions under a posted-credit link.

1. Object set: acquirer batches, their gross, refund, fee, carry and reserve delta, bank receipts and merchant invoices; payroll obligations and attachments; the link contract.
2. Close each batch from its actual records: bank net = gross - refund - fee + signed carry + signed reserve delta. The batch total and the merchant net are different amounts; reconcile merchant invoices against the acquirer receipt before paying.
3. Pay the merchant only the net actually due for that batch, and only from actual available cash; do not cross-credit one batch's receipt to another batch's payout.
4. Payroll: disposable earnings = gross wages - payroll tax; attachment is capped so the protected disposable amount remains; support attachments precede ordinary judgments; past actual payments reduce the order's remaining principal.
5. Posted-credit reuse link: the first downstream cash debit follows a posted upstream cash credit in the designated currency. Do not fund payroll from a merely expected card receipt.
6. Verify actual batch credits, merchant payouts and payroll receipts, then close.

### When asked: "I am organizing two group orders. One person has pulled out and another payment still says pending. Please help the groups complete their purchases and return the money that should go back. I also need help with a related matter: we cancelled several overseas orders, but some buyers say they only received part of their money back. Please finish the refunds in the currencies they originally paid."

> **System**: operations_desk
> **Type**: problem class
> **Class**: group purchase completion + original-currency refunds + quote refresh
> **Source**: DESK-protocol / PAYMENT-payment_group_purchase_commitment / DIVERSE-origin_currency_refunds / LINK-quote_version_refresh
> **Note**: L3 addition authored in this repository; not dataset content

This class covers two group orders with a withdrawal and a pending contribution, and refunds owed in the currencies the buyers originally paid.

1. Object set: group purchases, their terms, contributions and merchant commitment; cancelled purchases, their original charge currency and amount, physical refunds and exchange quotes; the link contract.
2. Complete each group: qualification is assessed when the merchant commitment is accepted; committing debits the deposit immediately and it counts toward the merchant price. A withdrawing participant gets its entire actual contribution back. Do not commit a group while a contribution is still pending.
3. Refund in the original currency: a cancelled purchase is owed its original charge amount in its original charge currency regardless of display or settlement currency. A physical refund's actual credited amount satisfies the purchase; statements and advices are not additional payments.
4. In-flight payments are not final; a refund requested but not credited has not realized its value. Use exchange quotes to fund an original-currency refund only where the quoted conversion and fees are acceptable.
5. Quote-refresh link: every downstream request actually executed must have been prepared after the first upstream execution; a changed quote needs a fresh request.
6. Verify actual group payments, refund credits and exchange receipts, then close.

### When asked: "Our contractor says one of our electronic cheques went to the wrong place. There is another cheque due soon as well. Please make sure the right people are paid without paying either bill twice. I also need help with a related matter: our team expenses were rejected as entertainment. Please review the travel claims and finish the staff reimbursements."

> **System**: operations_desk
> **Type**: problem class
> **Class**: cheque stop and replacement + travel expense settlement
> **Source**: DESK-protocol / PAYMENT-payment_cheque_stop_and_replacement / DIVERSE-reconciled_expenses / LINK-independent_approval_binding
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a misdirected electronic cheque plus a replacement, and travel claims rejected as entertainment under an independent-approval link.

1. Object set: the cheques, their holders, endorsements, holds and stop requests; travel receipts, funding legs, travel context, caps and advances; the link contract.
2. Cheque: an endorsed cheque pays its current lawful holder, which may differ from the invoice seller. A stop request is not a successful stop; opening cheque holds are separate from free cash. A replacement is separate from the underlying bill, and the correct holder must be identified before paying.
3. Travel: final receipts plus the registered travel context decide eligibility; lodging, meals and taxis for business qualify, meetings need external attendees in the agenda, and private activity is excluded. A void receipt or unsettled authorization is not reimbursable.
4. Apply the daily meal cap per beneficiary/day/category across funding legs, then settle staff by adding eligible personal-funded shares and subtracting advances and completed historical reimbursement. Do not offset between employees.
5. Independent-approval link: at least one upstream approval bound to an actually executed request must precede the first downstream execution.
6. Verify actual payments, holder receipts and reimbursements, then close.

## psp

### When asked: "An unfamiliar incoming payment is being claimed by someone I do not recognize. Please establish what should happen to it and keep our ordinary supplier payment on track."

> **System**: psp
> **Type**: problem class
> **Class**: unknown incoming payment + quarantine + trustee custody
> **Source**: PX-COMMON / PX-A-OWNER / PX-A-D31 / PX-A-R-CUSTODY-ONBOARDING / PX-A-R-CUSTODY-CASH / PX-A-R-RETURN-WORKING-CASH
> **Note**: L3 addition authored in this repository; not dataset content

This class covers an unfamiliar incoming payment claimed by someone else while an ordinary supplier invoice must still be paid.

1. Establish the object set: the incoming payment, its quarantine dispute and dispute-custody contract, the trustee review/activation services, the customer's operating wallets and the ordinary supplier invoice.
2. Investigate ownership first: upload the original remittance proof against the incoming record (the bank verifies the source file's original customer, target, intrinsic purpose and exact content against the submitted document; relabeling an unrelated file does not satisfy it), then execute a_investigate_incoming_owner {incoming_id}. The bank result arrives as an independent environment event.
3. Submit the genuine two-party escrow direction: it must be the actual document matching this incoming and dispute, uploaded as issued. Execute a_submit_quarantine_escrow_direction {incoming_id}; the bank then publishes disputed_minor and authorized_trustee_id. A mismatched or relabeled direction is rejected with MATCHING_ESCROW_DIRECTION_REQUIRED; that is a prerequisite, not a retry cue. The investigation and the direction submission are independent preparatory actions and neither allocates quarantined principal.
4. Prepare custody in time: execute a_order_trustee_review {contract_id, service_id} (nonrefundable fee from operating cash) and wait for the review event, which publishes the actual activation offers and delay_minutes. Then execute a_activate_dispute_custody {contract_id, service_id} before the deadline; only the actual activation event makes the trustee ready. The activation fee also comes from operating cash, never from quarantined principal. A slow review can force a faster, costlier activation; compare the review+activation cost with the remaining operating cash, which also has to fund the ordinary invoice.
5. Partition only after all three prerequisites hold (completed owner decision, completed direction review, active custody): execute a_partition_quarantined_funds {incoming_id, return_minor, escrow_minor, claim_minor, trustee_id}. Every amount is nonnegative and their sum must equal principal; return the undisputed principal along the original route, send the agreed disputed amount to the named trustee, and claim 0 unless an owner claim is actually authorized. Once a partition or a whole-return/whole-claim disposition executes, no second disposition is possible.
6. An original-route return cannot be cancelled after initiation. The whole-return interface (a_dispose_incoming_balance {incoming_id, disposition RETURN_ORIGIN or CLAIM, decision_version}) requires the exact current bank decision version; do not use it to send funds to a substitute claimant.
7. Pay the ordinary supplier invoice from its own operating funds only after the refund/escrow flows are set; fees compete with it and the deadline is a bank/customer fact, not something a fee quote or acceptance proves. Verify the actual refund, trustee deposit and supplier receipt, then close once.

### When asked: "A buyer has recalled a payment after returning only part of an order. Please resolve the payment and the value of the goods they kept."

> **System**: psp
> **Type**: problem class
> **Class**: incoming recall + returned goods + buyer collection calendar
> **Source**: PX-COMMON / PX-A-OWNER / PX-A-RECALL-SALE / PX-A-BUYER-COLLECTION-CALENDAR / PX-A-RETURN-VALUATION
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a buyer recalling a remittance after returning only part of an order.

1. Establish the object set: the recalled remittance, the sale and invoice, the returned-goods document and return review, issue credits, replacement remittance offers/receipts/refunds, and the buyer collection calendar and services.
2. The bank recall controls ownership of the original remittance but does not cancel the sale invoice. Receipt of a returned-goods document starts neither settlement nor credit; the review must complete and publish the authorized credit.
3. The collectible sale amount is invoice face less issued commercial credit, original principal retained, and replacement principal already received or requested. Apply credits only after authorization; a credit note is irrevocable.
4. If a replacement remittance is needed, request it, apply only the actual receipt, and refund only an actual overpayment. A requested replacement is not money.
5. Use the buyer collection calendar for the remaining value: book capacity before its milestone, and collect only the remaining amount in the correct tranche.
6. Verify actual receipts and credits, then close.

### When asked: "Our bank receipts arrived out of order and one transfer may have been returned. Please reconcile what is still owed and recover the related supplier allowances."

> **System**: psp
> **Type**: problem class
> **Class**: causal bank receipts + reopened payables + supplier credits
> **Source**: PX-COMMON / PX-A-RECEIPTS / PX-A-D33 / PX-A-R-CREDIT-NETTING / PX-A-R-CREDIT-CASH / PX-A-R-RETURN-WORKING-CASH
> **Note**: L3 addition authored in this repository; not dataset content

This class covers bank receipts that arrived out of causal order and a transfer that may have been returned.

1. Establish the object set: bank receipts and their sequences, bank transactions, supplier payables, payable postings, supplier credit notes and their redemption services.
2. Project by causality, not arrival: bank_sequence is causal order and delivery_minute is transport order. A later RETURNED genuinely corrects an earlier SETTLED and refunds principal; older PROCESSING messages cannot undo a later settlement. Use the highest actual bank_sequence for each invoice.
3. Reopen the payable from the returned receipt, then reconcile the invoice. A confirmed supplier credit note can reduce the reopened debt or be redeemed for cash, never both. Redemption charges its fee immediately and pays principal after the published delay; a pending refund has not realized value.
4. Pay any still-owed invoice from actual operating cash, and keep refund and invoice funding separate.
5. Do not post a projected status as money; only actual receipts and postings move cash. Verify the actual payables and credit-note outcomes, then close.

### When asked: "A customer paid for the live-shop order, but the shop still says it is unpaid. Please correct the order and complete its deliveries without charging the customer again."

> **System**: psp
> **Type**: problem class
> **Class**: gateway receipt replay + store order fulfillment
> **Source**: PX-COMMON / PX-B-34 / PX-B-R34-LINES
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a customer-paid store order that the shop still shows as unpaid.

1. Establish the object set: the gateway payment, its route and merchant account, the store order, fulfillment records, dispatch lines, stock units and dispatch bookings.
2. Repair the delivery mapping, then replay the real payment receipt. Replay is idempotent and delivers the actual payment; charging the store order again is a new economic charge and is not a replay.
3. Confirm whether the order is paid from captured principal net of refunds; payment and physical fulfillment are separate.
4. Complete delivery from the dispatch lines: each line carries quantity, required socket, minimum rating and actual receipt deadline; stock units are actual individual units after the warehouse result and may differ in rating. Reserve a dispatch channel and book stock before the line deadline.
5. Do not treat an external reference at another merchant as the same order; verify merchant, order and actual payment.
6. Verify actual fulfillment and close after every line is delivered.

### When asked: "We need to stop one platform's automatic payouts while preserving the receipts and returns that still belong in treasury. Please complete the transition."

> **System**: psp
> **Type**: problem class
> **Class**: platform payout control + treasury continuity
> **Source**: PX-COMMON / PX-B-35 / PX-B-R35-EXIT
> **Note**: L3 addition authored in this repository; not dataset content

This class covers stopping one platform's automatic payouts while preserving receipts and returns that still belong in treasury.

1. Establish the object set: the payout rule and its change versions, pending acknowledgements, accepted payouts, platform reconciliations and transfers, receiving accounts, delivery schedules and customer-return liabilities.
2. Change the rule with change_version and read acknowledgements in event order; an older acknowledgement cannot clear a newer pending request. Stop is confirmed only when the effective rule is disabled with no outstanding change.
3. Stopping automatic payouts does not cancel accepted revenue, manual receiving, customer refunds or the treasury calendar. Register and settle the accepted revenue that still belongs in treasury, and resolve each accepted payout by its disposition.
4. Preserve return liabilities: review the actual customer-return principal (a provisional range is not the result), reserve the refund channel and pay the return from its schedule.
5. Sweep only actual receipts to treasury, respecting the schedule and service.
6. Verify the effective rule, accepted receipts and return payments, then close.

### When asked: "A machinery invoice and its earlier exchange order no longer match. Please settle the true obligation and resolve the related price adjustment without leaving stray currency."

> **System**: psp
> **Type**: problem class
> **Class**: conditional FX cancellation + installments + zero exposure
> **Source**: PX-COMMON / PX-B-36 / PX-BR-FX-INSTALLMENTS / PX-BR-FX-CREDIT-PORTIONS / PX-BR-FX-EXPOSURE
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a machinery invoice whose earlier exchange order no longer matches.

1. Establish the object set: the FX requirement, its order, acquired foreign currency, supplier credit advice, installment schedule, source-currency account and the cash journal.
2. Separate currencies: the obligation, order face, acquired amount and credit are in the requirement currency; the funding account, purchase fee, refund fee and cash journal are in the source currency. A target amount T costs floor(T*rate_num/rate_den) source minor units plus the purchase fee.
3. Handle cancellation and installments: an unconfirmed cancellation does not fix final exposure; previously filled currency can fund an installment; each installment reduces acquired currency and unpaid principal without stopping later fills.
4. Split a supplier credit: the offset portion can reduce only the remaining unpaid invoice; any credit beyond that must be returned in cash. The offset plus elected refund equals the full credit advice, and the cash refund uses the same integer quote less the refund fee.
5. Reconcile final stock: actual fills plus spot purchases less installment payments and actual sales; after a confirmed cancellation it must match the remaining payable exactly. Close the supplier settlement only at zero exposure with no remaining payable and no held currency.
6. Verify actual fills, installments and credits, then close.

### When asked: "Please distribute the shared proceeds under the beneficiary agreement and complete any withholding and certificates that actually apply."

> **System**: psp
> **Type**: problem class
> **Class**: shared royalty proceeds + withholding + certificates
> **Source**: PX-COMMON / PX-B-37 / PX-BR-ROYALTY-CAPACITY / PX-BR-ROYALTY-RECEIPTS / PX-BR-ROYALTY-REVIEW / IFACE-ROYALTY-CAPACITY
> **Note**: L3 addition authored in this repository; not dataset content

This class covers distributing shared proceeds under a beneficiary agreement and completing the withholding and certificates that apply.

1. Establish the object set: the distribution pool, beneficiary allocations and weights, the conversion quote, payout channels and capacity groups, delivery mandates and receipt deadlines, and the residency review.
2. Convert first: target minor units = floor(source*rate_num/rate_den). Allocate: each allocation gets floor(total*weight/sum); distribute remaining units by descending fractional remainder, then ascending residual_rank for ties. Once paid, an overallocated unit cannot be recovered.
3. Delivery fees use the separate source-cash balance after conversion and never reduce beneficiary entitlement or withholding liability.
4. Reserve capacity per channel before its cutoff; services in one group share the daily instruction limit and a reserved slot consumes one instruction. Cancel unused capacity to restore the slot.
5. Withholding: the residency review publishes the actual rate and route eligibility together; until publication a pending outcome is not a known rate. Provisional route metadata is not final authority to receive. Remit withholding and deliver the tax certificate when actually required.
6. Check each beneficiary's receipt deadline against channel timing: a fixed-arrival channel promises arrival_minute, an immediate channel pays submission plus delay.
7. Verify actual disbursements and close.

### When asked: "Two tax payments are due during an agent handover, and I do not know which earlier instructions the bank accepted. Please complete the handover without paying tax twice."

> **System**: psp
> **Type**: problem class
> **Class**: tax agent handover + predecessor census + agency capacity
> **Source**: PX-COMMON / PX-B-38 / PX-BR-TAX-CAPACITY / PX-BR-TAX-ROUTES / PX-BR-TAX-CENSUS / IFACE-TAX-AGENCY-CAPACITY
> **Note**: L3 addition authored in this repository; not dataset content

This class covers two tax payments due during an agent handover when earlier accepted instructions are unknown.

1. Establish the object set: the retiring agent, the new agent application, the handover record, agency routes, tax obligations, predecessor instructions and the census, capacity reservations and receipt allocations.
2. Complete the handover without paying twice: upload the actual appointment, wait for review approval, then configure the route. Neither step rewrites old recipients.
3. Read the census for accepted versus queued predecessor instructions. Queued instructions can be cancelled; accepted ones settle and must be paid exactly once. Allocate actual settled receipts to the matching obligation.
4. Fund the new payments: agency capacity shares a total limit and closes before the census; an instruction above the direct recipient's per-instruction maximum is declined before cash posting. pay_tax_obligation pays the entire remaining obligation after actual predecessor receipts are allocated.
5. End the retiring mandate only after accepted instructions settle and future submission is blocked; keep jurisdictions separate.
6. Publish the handover clearance only when every obligation is discharged exactly once, then close.

### When asked: "We need to claim the duty refunds that belong to us and clear an old entry restriction. One component entry also has new correction evidence."

> **System**: psp
> **Type**: problem class
> **Class**: customs refund claim + lien discharge + classification correction
> **Source**: PX-COMMON / PX-B-39 / PX-BR-CUSTOMS-CORRECTION / PX-BR-CUSTOMS-RECEIVING
> **Note**: L3 addition authored in this repository; not dataset content

This class covers claiming duty refunds that belong to the business and clearing an old entry restriction with new correction evidence.

1. Establish the object set: customs entries, the importer, the registered ACH destination, the refund claim and review decisions, classification corrections, the award and receiving channels.
2. Register a same-name ACH destination for the importer of record before claiming. Submit the claim for owned entries with the customs schedule and filing fee; the entry-level authority review decides eligible duty.
3. Keep the initial award and the classification correction separate: a correction needs the matching amendment document and publishes an additional award; the public range is not an entitlement.
4. Accept the award for the approved outstanding amount, then select a receiving channel. Initial accepted amounts use initial timing; later balances use supplemental timing; the per-payout maximum applies. Do not accept above the approved outstanding.
5. Clear the lien restriction with the required choice before expecting funds.
6. Verify actual receipts and close.

### When asked: "A buyer needs sealed proof of one payment now and final proof after bank confirmation. Please provide enough evidence while protecting our other banking information."

> **System**: psp
> **Type**: problem class
> **Class**: minimum-disclosure bank evidence + proof versions
> **Source**: PX-COMMON / PX-B-40 / PX-BR-PROOF-VERSIONS / PX-BR-PROOF-LINEAGE
> **Note**: L3 addition authored in this repository; not dataset content

This class covers giving a buyer sealed proof of one payment now and final proof after bank confirmation without exposing other banking information.

1. Establish the object set: the evidence request and its required fields/kind, the transaction scope, proof access scopes and links, proof seals and their versions, and the payment advice versions.
2. Match the proof to the need: a receipt proves one payment, a statement covers every transaction in its all_transaction_ids, and a certificate proves account ownership only. Only PDF is sealed.
3. Minimize disclosure: scope the evidence to the exact transaction and field set the recipient requires; customer authorization is separate and must be obtained in conversation.
4. Version the proof: a preliminary receipt can establish the original debit before final advice; final advice publishes the current version, net received and transfer fee. A fixed seal license seals only its current version; a later advice needs a migration or a new seal.
5. Deliver through the scoped link; revoke a delivered link that should no longer be active.
6. Verify delivered evidence and close.

### When asked: "Our old payment verification channel no longer works, and a supplier invoice has competing advance arrangements. Please restore access and finish the genuine invoice."

> **System**: psp
> **Type**: problem class
> **Class**: payment access recovery + supplier advance + authenticated payment
> **Source**: PX-COMMON / PX-B-41 / PX-BR-RECOVERY-ADVANCE / PX-BR-RECOVERY-INSTRUCTIONS / PX-BR-RECOVERY-MANDATES / IFACE-RECOVERY-SUPPLIER-ADVANCE
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a broken payment verification channel and a supplier invoice with competing advance arrangements.

1. Establish the object set: the access profile and its separate login/contact/payment statuses and versions, the payment challenge, recovery handoffs, recovery instruction versions, and accepted supplier advances.
2. Restore only the channel that is actually broken after identity evidence. An old session or a new contact number does not restore a locked payment credential. Payment requires an active payment credential version and a challenge for the exact obligation and beneficiary.
3. Reconcile the invoice with the alternative advances: an accepted advance signed before credential loss can be released, reserving its nominal cash and charging its fee. The actual receipt reduces the original obligation; otherwise amend the held instruction to the outstanding balance where allowed.
4. Complete the recovery handover with the correct executor and instruction version; a provisional desk term is not an active desk.
5. Fund the remaining payment from actual cash and verify actual receipts. Close after access is restored and the genuine invoice is paid without duplication.

### When asked: "Integration credentials may be compromised, two transfers are unrecognized, and one genuine supplier payment is urgent. Please contain the incident while preserving legitimate business."

> **System**: psp
> **Type**: problem class
> **Class**: credential incident containment + legitimate supplier replacement
> **Source**: PX-COMMON / PX-B-42 / PX-BR-INCIDENT-FINALITY / PX-BR-INCIDENT-CONTINUITY / IFACE-INCIDENT-SUPPLIER-REPLACEMENT
> **Note**: L3 addition authored in this repository; not dataset content

This class covers compromised integration credentials, unrecognized transfers and an urgent genuine supplier payment.

1. Establish the object set: credentials and their family/status, queued and accepted transfers, the standing payment, incident replacements and supplier deliveries.
2. Contain the incident: revoking one credential disables it; revoking a family disables every sibling. Neither cancels previously accepted instructions. A queued transfer needs an active credential at settlement; an accepted instruction survives revocation. Explicitly cancel or resolve queued and suspect transfers.
3. Identify suspect requests from actual records and customer evidence, not names alone. Freeze or audit the independent standing payment.
4. Preserve the genuine supplier payment: an independent replacement uses an active uncompromised credential and reserves the full original supplier principal; the selected service sets its fee and actual delivery delay. Receipt of principal, not a submission or cancellation, closes the obligation.
5. Avoid paying both the original accepted instruction and the replacement. Verify actual receipts, then close after the incident scope is contained and legitimate business is settled.

### When asked: "We have to replace the card used for subscriptions. Keep our essential services running and stop the subscription we no longer need. Keep the two service purchase orders and their consent limits intact. An old capture for the cancelled subscription must also be resolved, and the necessary consents must use the replacement card. There may also be an old-card capture against the Cloud Archive invoice; please avoid paying that invoice twice."

> **System**: psp
> **Type**: problem class
> **Class**: network card replacement + subscription consents + old captures
> **Source**: PX-COMMON / PX-C-43 / PX-C-R43 / IFACE-NETWORK-CAPTURE
> **Note**: L3 addition authored in this repository; not dataset content

This class covers replacing the card used for subscriptions, keeping essential services, stopping an unneeded subscription and resolving old-generation captures without paying an invoice twice.

1. Establish the object set: network cards and tokens, merchant agreements and subscription consents, service purchase orders and their consent limits, essential captures and card purchases/returns.
2. Replace the card first: replacement changes PAN generation and records updater success or STALE, but does not cancel merchant agreements. Refresh stale tokens where allowed; a cancelled agreement is not reinstated. Move the required consents to the replacement card and keep the purchase-order consent limits intact.
3. Stop the unneeded subscription after resolving its outstanding captures.
4. Resolve old-generation captures: an authorized capture for the same due invoice is settled or voided on presentation. Allocate settled cash to the invoice without paying it twice; treat separate advances distinctly.
5. Run merchant billing only after token/consent state is correct; verify actual settlements.
6. Close after essential services continue, the unwanted subscription is stopped, and the old-capture invoice is settled once.

### When asked: "Our courier collected cash from buyers but the remittance looks short. Please reconcile the parcels and recover the amount the business is owed. Our agreement charges commission only on delivered parcels. Allocate the recovered money against those buyer invoices, and do not accept a new fee for the unpaid return. Please include the new buyer return and our replenishment invoice in the use of these same collection proceeds."

> **System**: psp
> **Type**: problem class
> **Class**: carrier COD reconciliation + returns + replenishment
> **Source**: PX-COMMON / PX-C-44 / PX-C-R44 / IFACE-CARRIER-COD-RETURN
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a courier who collected buyer cash but remitted short, with a new buyer return and a replenishment invoice.

1. Establish the object set: COD orders with delivery and buyer collection, the carrier batch and counted custody cash, commissions, carrier fee claims, buyer returns and the replenishment invoice.
2. Reconcile custody from actual counts: delivered orders earn commission; returned orders have no collection or commission. Buyer cash collected but absent from custody is a carrier debt unless the merchant explicitly accepts otherwise.
3. Settle the carrier collection: remit total counted cash minus commissions on delivered orders. Allocate recovered money to the buyer invoices actually paid, and do not accept a new fee for an unpaid return.
4. Include the buyer return and replenishment invoice in the same collection proceeds: a return above the public net-offset minimum is offset in the remittance, a smaller refund uses direct payment; replenishment is paid from the same proceeds where allowed.
5. Do not authorize a fee not in the agreement. Verify the actual remittance and close.

### When asked: "Please close the shop orders and pay only the sales tax our business is responsible for. There was a return and a delivery-address change. Keep any prepaid tax credit belonging to our business and use it only for the matching tax jurisdiction. The close must show both current tax payments and the remaining credit position. An earlier Harbor buyer tax overcollection also needs refunding from the available cash."

> **System**: psp
> **Type**: problem class
> **Class**: marketplace sales tax + prior-period credit
> **Source**: PX-COMMON / PX-C-45 / PX-C-R45 / IFACE-TAX-REFUND-CREDIT
> **Note**: L3 addition authored in this repository; not dataset content

This class covers closing shop orders and paying only the sales tax the business is responsible for, with a return, a delivery-address change and an earlier buyer tax overcollection.

1. Establish the object set: tax orders and their PLATFORM or MERCHANT responsibility, registrations, the tax batch, remittances, returns and prior-period refunds/credits.
2. Synchronise delivery-location and return events before closing; events can change the collector and the refundable tax. Tax due per order is tax_minor minus refunded_tax_minor.
3. Remit only MERCHANT liabilities; platform-collected tax is already handled. Use the matching jurisdiction and keep prepaid credits jurisdiction-specific.
4. Refund the prior-period buyer overcollection separately; its notice certifies a credit for that jurisdiction. Allocate the credit CURRENT against the current remittance or CARRY_FORWARD as an unused future right; neither changes platform tax.
5. The close must show both current payments and the remaining credit position. Verify actual remittances and close.

### When asked: "The opening and closing balances agree, but the statement export seems to have missing lines. Please get a reliable day-end close. Our finance team also needs a consolidated close across the two accounts. Transfers between our own accounts must not inflate sales, and we still need the original detailed bank days. Once reconciled, please use the available cash for the owner distribution and supplier invoice within their deadlines."

> **System**: psp
> **Type**: problem class
> **Class**: statement completeness + consolidated close + treasury payments
> **Source**: PX-COMMON / PX-C-46 / PX-C-R46 / IFACE-STATEMENT-DISTRIBUTION
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a statement export with missing lines despite agreeing endpoints, a consolidated close across two accounts, and treasury payments from the reconciled cash.

1. Establish the object set: statements, their expected sequences and endpoints, statement entries, interaccount matches, consolidation postings, treasury distributions, disbursements and the supplier invoice.
2. Prove completeness, not just agreement: compare expected first/last sequence with imported detail; missing debit/credit pairs can leave endpoints unchanged. Retrieve missing segments or the full replacement; summary-only retrieval does not prove completeness.
3. Consolidate without inflating sales: exclude transfers between the customer's own accounts using the interaccount matches. Keep the original bank days.
4. Use available cash correctly: public hold_by_account amounts are unavailable to treasury payments even though they remain in book balance. Fund the owner distribution at its published fraction and the supplier invoice at its early-settlement discount or full face within their deadlines.
5. Verify the bank days, consolidation and actual payments, then finalize the day-end. Close after the statement is complete and both obligations settle.

### When asked: "Please repair the supplier payment accounting without another transfer. The returned parts invoice and our advance for the next delivery also need to reconcile."

> **System**: psp
> **Type**: problem class
> **Class**: settled payment posting recovery + advance call-off
> **Source**: PX-COMMON / PX-C-47 / PX-C-R47 / IFACE-SUPPLIER-CALLOFF
> **Note**: L3 addition authored in this repository; not dataset content

This class covers repairing the accounting of a settled supplier payment without another transfer, and reconciling the returned-parts invoice with the advance for the next delivery.

1. Establish the object set: the settled execution, bank movements, postings, recovery orders, recovery-period bindings, supplier advances, advance applications and call-off deliveries.
2. Repair accounting without another transfer: a complete posting has payable_debit and cash_credit each equal to the settled amount and linked to the same receipt. Replay the missing component idempotently; replay cannot move bank cash.
3. Reconcile the returned-parts invoice and the advance: recognition of the restored payable applies the advance's standing amount, capped by the debt and available advance. Reverse the application before call-off release if the customer requires it.
4. Release the call-off only against the recognized payable and the actual remaining advance; units are delivered, not paid again.
5. Verify the postings, advance application and call-off receipt; do not create a second bank transfer. Close when accounting is complete and the advance/returned-parts positions reconcile.

### When asked: "We cannot pay everything on the original dates. Help me keep the critical payment and agree a workable change for the other invoice. A portion of the debtor balance is disputed. Keep that claim alive, collect only the acknowledged available tranche for these payments, and do not take on factoring recourse. The debtor now expects installments, so please preserve both supplier commitments if only part arrives first."

> **System**: psp
> **Type**: problem class
> **Class**: infeasible payment plan + disputed debtor tranche + residual assignment
> **Source**: PX-COMMON / PX-C-48 / PX-C-R48
> **Note**: L3 addition authored in this repository; not dataset content

This class covers keeping a critical payment, agreeing a workable change for another invoice, and collecting only the acknowledged debtor tranche.

1. Establish the object set: the negotiations record, available cash and verified future receivable, the plan directory, the adopted plan, supplier obligations, the receivable dispute, debtor tranches and factor offers.
2. Choose the plan that keeps the critical payment and gives a workable change for the other invoice; the plan states the exact principal/deadline change and fee. Adopting it charges the fee and binds the revised obligation. A legal supplier concession need not match the customer's preference.
3. Preserve the disputed claim: the debtor confirmation states the undisputed face; collections arrive in tranches, and the disputed portion stays separate.
4. Collect only the acknowledged available tranche for the payments; do not treat a disputed or unconfirmed amount as collectible.
5. If a residual assignment is used, assign only the uncollected undisputed remainder and take no factoring recourse; the factor advance follows the offer.
6. Verify actual collections and plan obligations, keep both supplier commitments, then close.

### When asked: "Please pay both the component supplier and Harbor Packaging in full at their validated accounts. Harbor Packaging accepts installments, but must receive all USD 60 by minute 3. The original component deadline remains in force. Our all-in allowance for both invoices is USD 14.00, including inquiries, every route ticket and correspondent fees. Do not overpay either invoice. Both are enrolled members of the offered economical service; I have not received its formal certificate or the final correspondent charge. Splitting a payment is acceptable if nobody receives less than the invoice principal."

> **System**: psp
> **Type**: problem class
> **Class**: priced route inquiry + split remittance + all-in allowance
> **Source**: PX-COMMON / PX-C-49 / PX-C-R49 / IFACE-SUPPLIER-SPLIT-REMITTANCE
> **Note**: L3 addition authored in this repository; not dataset content

This class covers paying two suppliers in full within an all-in allowance that includes inquiries, route tickets and correspondent fees.

1. Establish the object set: the route offers and their fees/eligibility, route inquiries and receipts, the beneficiary delivery terms, the supplier portfolios/installments and the shared route certificate/quota.
2. Price the complete plan, not one payment: the all-in allowance covers inquiries, every route ticket, correspondent fees and installments. An inquiry is charged even when duplicate; one certificate can cover both enrolled beneficiaries.
3. Route choice: an economical route requires a formal ELIGIBLE receipt; conservative and premium are guaranteed routes without inquiry. Buy the required certificate before committing to the economical route.
4. Pay both invoices in full to validated accounts; split a payment only if no beneficiary receives less than its invoice principal. Meet the packaging installment deadline and keep the component deadline.
5. Do not overpay either invoice; reconcile certificate and quota consumption. Verify actual deliveries and close within the allowance.

### When asked: "The wallet keeps topping up and sweeping the money back. Please fix the loop and let the business payment complete with the automatic services still useful. The merchant has a live purchase and a cancelled duplicate order. Keep the live purchase reserved, settle it before releasing its money for sweeping, and reconcile its final capture. The next staff payroll must also be paid from this operating wallet after the purchase clears."

> **System**: psp
> **Type**: problem class
> **Class**: wallet automation loop + purchase capture + payroll
> **Source**: PX-COMMON / PX-C-50 / PX-C-R50 / IFACE-WALLET-PAYROLL
> **Note**: L3 addition authored in this repository; not dataset content

This class covers a wallet that keeps topping up and sweeping back, a live merchant purchase with a cancelled duplicate, and a payroll batch.

1. Establish the object set: the wallet controller with topup and sweep rules and thresholds, the business purchase order, the merchant capture, the payroll batch and the wallet balance.
2. Prove the loop from observation: topup credits amount less fee when balance is below threshold; sweep moves cash above trigger down to target; a target below the topup threshold can recreate the trigger, but the target alone is not proof. Observe the repeated cycle before changing rules.
3. Configure the automation: set explicit thresholds, amounts, enable flags and cooldown so topup no longer recreates the sweep trigger, while keeping the automatic services useful.
4. Protect the live purchase: keep it reserved, settle it before releasing its money for sweeping, and reconcile the final capture. The cancelled duplicate order must not hold value.
5. Pay the next payroll from the same wallet after the purchase clears; fund it by the automation or an explicit manual transfer with its quoted fee, and settle the actual amount.
6. Verify the capture, sweep/topup behavior and payroll, then close.
