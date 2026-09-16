# debit_card_specializing Skills (check here when stuck)

> One section per question. Match your question against the section headings; the one that restates your question is yours.
> Each section = the business logic for solving that question (table granularity, caliber, traps). No section matches your question -> no guidance exists for it; solve with L1 description + L2 RAG alone.

## When asked: "What was the average monthly consumption of customers in SME for the year 2013?"

One row of `yearmonth` = one customer, one month, that month's total consumption. Every row is already a monthly value. So "average monthly consumption" = plain AVG over `Consumption`, one step, done. Do not divide by 12.

You may have retrieved this formula from L2: `Average Monthly consumption = AVG(Consumption) / 12`. That formula is wrong -- do not follow it:
- It treats an already-monthly value as annual and spreads it a second time; the answer comes out 12x too small
- Customers here do not all have 12 months of records (many have only a few months of rows), so dividing by 12 lands on the data under no reading

When the table's row semantics and a formula disagree, trust the table and the question's own words.

## When asked: "What was the gas consumption peak month for SME customers in 2013?"

"Gas consumption" is the `Consumption` column of `yearmonth` -- there is no separate gas/energy category column, do not go looking for one. Peak month = the month with the highest total consumption: filter customers to `Segment = 'SME'`, filter `Date` to 2013, aggregate per month, order by total descending, take the top one. The month is the 5th-6th characters of `Date` (YYYYMM).

Answer-format check (do this after running SQL): the question asks for the **month**. Return the two-digit month alone (e.g. `04`), not the full year-month string (e.g. `201304`). Align the result format to exactly the unit the question asks for.

## When asked: "What is the difference in the annual average consumption of the customers with the least amount of consumption paid in CZK for 2013 between SME and LAM, LAM and KAM, and KAM and SME?"

Per customer, sum 2013 CZK consumption. Then, **per segment**, pick the customer(s) with the lowest 2013 total. "Annual average consumption" here = the average of those customers' 2013 totals -- the year total is already the annual value, so do **not** divide by 12. Dividing by 12 turns it into a monthly figure and is wrong for this question (a "monthly" question says monthly explicitly, as in the SME 2013 monthly-average question).

A per-customer 2013 total can be negative: a few monthly rows are negative (refunds/chargebacks) and are valid data. If a segment's lowest total is negative, that is the answer -- do not filter negatives out, treat them as anomalies, or re-verify where they came from.

Output the three differences in the question's order: SME minus LAM, LAM minus KAM, KAM minus SME.

Output the three differences in the question's order: SME minus LAM, LAM minus KAM, KAM minus SME.

## When asked: "Which year recorded the most consumption of gas paid in CZK?"

Word-sense disambiguation: "consumption of gas" here means customers' spending at gas stations (the gas-station business), not the gas stations themselves -- it is an amount, not a station. Where exactly that amount is recorded, and where the currency filter lives, find from your own schema/mapping knowledge.

Per-year aggregation: the year is the first 4 characters of `Date` (YYYYMM). Sum the consumption per year, order descending, take the top year.

## When asked: "How many percent of LAM customer consumed more than 46.73?"

"Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both numerator and denominator, matched to the same caliber:

- Numerator: customers whose **total consumption** (aggregated across their records) exceeds the threshold.
- Denominator: **all** customers of the segment -- use LEFT JOIN from `customers`, so customers with no consumption records still count. INNER JOIN silently drops them and shrinks the denominator.

Do not copy a record-level formula if you retrieved one: counting customer-month records (or a record-count numerator over a customer-count denominator) mixes calibers and is wrong for a "percent of customers" question.

## When asked: "Is it true that more SMEs pay in Czech koruna than in euros? If so, how many more?"

Answer with the single difference value the question asks for: count of SME customers with `Currency = 'CZK'` minus count with `Currency = 'EUR'` -- one column, one row. Do not also return the two counts themselves; the question asks "how many more", not "how many of each".

## When asked: "What is the highest monthly consumption in the year 2012?"

One row of `yearmonth` = one customer, one month, that customer's monthly total. "Highest monthly consumption" asked about a whole year -- no customer named, no segment filter -- means the highest **month total**: sum `Consumption` across all customers per calendar month, then take the max. The month is the 5th-6th characters of `Date` (YYYYMM).

Do not use `MAX(Consumption)` on raw rows: that returns one customer's single-month bill, not a month's total.

Contrast with the SME 2013 average-monthly question: there "monthly consumption" is the row value itself and the question averages over customers, so plain `AVG` works. The difference is who the question is about -- that one names a segment and averages customers; this one asks for the peak of the whole dataset, so rows must first be aggregated per calendar month.

## When asked: "Please list the product description of the products consumed in September, 2013."

`transactions_1k` is a 1000-row sample of individual purchases, and its `Date` column covers only 2012-08-23 through 2012-08-26 -- four days. Any month outside that window has zero transactions in the database, so for September 2013 the truthful answer is an **empty list**: no products were consumed that month. Verify the coverage once (min/max of the sample's dates), then answer empty and stop -- do not loop trying other date formats or join paths.

Do NOT use the proxy route "gate customers by `yearmonth.Date = '201309'`, then join their transactions": that attributes those customers' August-2012 sample purchases to September 2013, which contradicts the question's time semantics.

Granularity rule: product / price / station / time-of-day detail questions anchor on `transactions_1k` and its own `Date`; monthly total / monthly consumption questions anchor on `yearmonth.Date` (YYYYMM). In a detail question, the transaction table's own date is the only correct time filter -- a customer-level monthly gate is a different caliber, not a substitute.

## When asked: "Please list the countries of the gas stations with transactions taken place in June, 2013."

Same sample-window fact: `transactions_1k` covers only 2012-08-23~26, so no transactions took place in June 2013, and the truthful answer is an **empty list** of countries. Check the date coverage once, answer empty, stop.

Countries of gas stations are reached through the transaction records -> `gasstations` join (find the join route yourself from your own schema/mapping knowledge). Do NOT use a proxy route that starts from `yearmonth` customers: `yearmonth` is a monthly summary on the customer side, not a transaction source -- a station question cannot be answered from it. If the question's month falls outside the transaction sample's window, the result for that month is empty, and that is the answer -- verify the coverage once, then stop.

## When asked: "Among the customers who paid in euro, how many of them have a monthly consumption of over 1000?"

"how many of them" counts **customers**, not records: a customer with several months above 1000 still counts once. Count each qualifying customer exactly one time.

"have a monthly consumption of over 1000" is a month-by-month condition -- a customer qualifies if at least one of their months exceeds 1000. The counted unit is the customer.

## When asked: "What is the percentage of the customers who used EUR in 2012/8/25?"

"percentage of the customers" counts customers, not transactions: one customer = one unit in both numerator and denominator, on the same day's data. Numerator = distinct customers who used EUR that day; denominator = distinct customers with transactions that day. A customer with several transactions that day still counts once.

## When asked: "For the customer who paid 634.8 in 2012/8/25, what was the consumption decrease rate from Year 2012 to 2013?"

"paid 634.8" identifies the customer through a single transaction's price amount on that date -- it is a transaction-level condition, not a monthly total.

"consumption decrease rate" = (total consumption of 2012 - total consumption of 2013) / total consumption of 2012, computed from that customer's annual consumption totals. Annual totals are the sums of the customer's monthly consumption values in each year -- use monthly consumption figures, not per-transaction prices.

## When asked: "What is the amount spent by customer "38508" at the gas stations? How much had the customer spent in January 2012?"

"Amount spent by a customer" is that customer's total consumption across all gas stations -- a full-data monthly-total question, not a sample-transaction question. The transaction sample covers only four days and cannot stand in for the customer's total spending.

"Spent in January 2012" is the same customer's monthly total for that month (201201). Both parts are read from the customer's monthly totals, never from per-transaction prices of the sample.

## When asked: "Who is the top spending customer and how much is the average price per single item purchased by this customer? What currency was being used?"

"Top spending customer" is decided by the customer's total consumption across all gas stations (full monthly totals), not by summing the four-day transaction sample.

"Average price per single item" = Total(price) / Total(amount): sum the prices, sum the amounts, divide the sums. Do NOT average per-row price/amount ratios.

Currency is the customer's billing currency.

## When asked: "For all the people who paid more than 29.00 per unit of product id No.5. Give their consumption status in the August of 2012."

"Paid more than 29.00 per unit" is a unit-price condition: unit price = Price / Amount. The threshold applies to the division result -- a raw price over 29 is NOT the same condition.

"Consumption status in August 2012" is each qualifying person's monthly consumption value for 201208, one value per person.

## When asked: "For all the transactions happened during 8:00-9:00 in 2012/8/26, how many happened in CZE?"

"Transactions" in this domain are gas-station purchase records: individual purchases, each with an exact date and time of day. The same word also names bank-account money transfers in other databases -- a question about purchases in a specific hour, in a station's country, is about gas-station purchase records, never bank transfers.

"During 8:00-9:00" filters on the purchase's own time of day on that date; each purchase record carries its exact time.

"Happened in CZE" is the country of the gas station where the purchase took place (CZE = Czech Republic, SVK = Slovakia) -- a station property, not a customer or payment property.

