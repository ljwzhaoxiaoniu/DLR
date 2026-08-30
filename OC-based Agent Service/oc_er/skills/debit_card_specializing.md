# debit_card_specializing Skills (check here when stuck)

> One section per question. Match your question against the section headings; the one that restates your question is yours.
> Each section = the business logic for solving that question (table granularity, caliber, traps). No section matches your question -> no guidance exists for it; solve with Ch1 description + Ch2 RAG alone.

## When asked: "What was the average monthly consumption of customers in SME for the year 2013?"

One row of `yearmonth` = one customer, one month, that month's total consumption. Every row is already a monthly value. So "average monthly consumption" = plain AVG over `Consumption`, one step, done. Do not divide by 12.

You may have retrieved this formula from Ch2: `Average Monthly consumption = AVG(Consumption) / 12`. That formula is wrong -- do not follow it:
- It treats an already-monthly value as annual and spreads it a second time; the answer comes out 12x too small
- Customers here do not all have 12 months of records (many have only a few months of rows), so dividing by 12 lands on the data under no reading

When the table's row semantics and a formula disagree, trust the table and the question's own words.

## When asked: "What was the gas consumption peak month for SME customers in 2013?"

"Gas consumption" is the `Consumption` column of `yearmonth` -- there is no separate gas/energy category column, do not go looking for one. Peak month = the month with the highest total consumption: filter customers to `Segment = 'SME'`, filter `Date` to 2013, aggregate per month, order by total descending, take the top one. The month is the 5th-6th characters of `Date` (YYYYMM).

Answer-format check (do this after running SQL): the question asks for the **month**. Return the two-digit month alone (e.g. `04`), not the full year-month string (e.g. `201304`). Align the result format to exactly the unit the question asks for.

## When asked: "What is the difference in the annual average consumption of the customers with the least amount of consumption paid in CZK for 2013 between SME and LAM, LAM and KAM, and KAM and SME?"

Per customer, sum 2013 CZK consumption. Then, **per segment**, pick the customer(s) with the lowest 2013 total. "Annual average consumption" here = the average of those customers' 2013 totals -- the year total is already the annual value, so do **not** divide by 12. Dividing by 12 turns it into a monthly figure and is wrong for this question (a "monthly" question says monthly explicitly, as in the SME 2013 monthly-average question).

Output the three differences in the question's order: SME minus LAM, LAM minus KAM, KAM minus SME.

## When asked: "Which year recorded the most consumption of gas paid in CZK?"

Word-sense disambiguation: "gas" here does not mean the GasStation entity / `gasstations` table itself. "Consumption of gas" = the spending recorded in the `Consumption` column of `yearmonth` (gas-station business spending). Anchor on `yearmonth`, not on `gasstations`.

"paid in CZK" is a currency filter that lives on the `customers` table (`Currency` column) -- join `customers` and filter `Currency = 'CZK'`.

Per-year aggregation: the year is the first 4 characters of `Date` (YYYYMM). Sum `Consumption` per year, order descending, take the top year.

## When asked: "How many percent of LAM customer consumed more than 46.73?"

"Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both numerator and denominator, matched to the same caliber:

- Numerator: customers whose **total consumption** (aggregated across their records) exceeds the threshold.
- Denominator: **all** customers of the segment -- use LEFT JOIN from `customers`, so customers with no consumption records still count. INNER JOIN silently drops them and shrinks the denominator.

Do not copy a record-level formula if you retrieved one: counting customer-month records (or a record-count numerator over a customer-count denominator) mixes calibers and is wrong for a "percent of customers" question.

## When asked: "Is it true that more SMEs pay in Czech koruna than in euros? If so, how many more?"

Answer with the single difference value the question asks for: count of SME customers with `Currency = 'CZK'` minus count with `Currency = 'EUR'` -- one column, one row. Do not also return the two counts themselves; the question asks "how many more", not "how many of each".
