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

## psp

(The PSP namespace is not modeled yet; it will be added in a later pass.)
