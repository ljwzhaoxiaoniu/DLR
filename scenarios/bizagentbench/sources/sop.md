# BizAgentBench · L3 SOP (Operations Desk)

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

## psp

(The PSP namespace is not modeled yet; it will be added in a later pass.)
