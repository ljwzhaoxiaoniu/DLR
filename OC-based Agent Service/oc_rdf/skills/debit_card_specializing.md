# debit_card_specializing Skills (check here when stuck)

> One section per question. Match your question against the section headings; the one that restates your question is yours.
> Each section = the business logic for solving that question (table granularity, caliber, traps). No section matches your question -> no guidance exists for it; solve with Ch1 description + Ch2 RAG alone.

## When asked: "What was the average monthly consumption of customers in SME for the year 2013?"

One row of `yearmonth` = one customer, one month, that month's total consumption. Every row is already a monthly value. So "average monthly consumption" = plain AVG over `Consumption`, one step, done. Do not divide by 12.

You may have retrieved this formula from Ch2: `Average Monthly consumption = AVG(Consumption) / 12`. That formula is wrong -- do not follow it:
- It treats an already-monthly value as annual and spreads it a second time; the answer comes out 12x too small
- Customers here do not all have 12 months of records (many have only a few months of rows), so dividing by 12 lands on the data under no reading

When the table's row semantics and a formula disagree, trust the table and the question's own words.
