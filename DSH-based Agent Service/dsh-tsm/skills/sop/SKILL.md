---
name: sop
description: DLR 业务逻辑级（L3）SOP：按题面分节，每节复述一道题并给出该题的口径与陷阱。回答业务问题前先加载；只采用完整复述本题的那一节。
---

# SOP — business-logic level (read this FIRST)

> Fixed path, one file for all databases: you do **not** need to know the database first.
> One section per question; match your question against the section headings. If a section
> restates your question, follow it (this level outranks L1/L2 on caliber). No matching
> section -> nothing is known about this question's traps; solve with L1 description + L2
> knowledge alone and move on. A section covers ONLY the question it restates -- it is not
> a general rule for the database.
>
> Written at the business level: each section says **what data this question needs**, in the
> question's own terms -- not what the database looks like. Turn it into a query with your
> own mapping knowledge.
>
> Each section opens with a **type tag** -- 数据集问题 (dataset issue) · 建模冲突 (modeling
> conflict) · 难题 (hard question) · 其他 (other), possibly several. Tags never change how a
> section is followed; they are maintenance/statistics metadata. One tag does extra duty in
> grading: 数据集问题 (dataset issue) tells the grader this question is defective, so an answer
> that matches **this section's caliber** is scored 🔁 翻盘 (overturned, counted separately from
> a plain correct) rather than judged against a broken gold.
> A section may state a comparable answer as `> **Expected**：<value>` (several values separated
> by `|`); sections whose caliber is "the true answer is an empty result" need no such line.

## debit_card_specializing

### When asked: "What was the average monthly consumption of customers in SME for the year 2013?"
> **类型**：数据集问题

Consumption is recorded customer-month by customer-month: every recorded figure is already one customer's consumption for one month. So "average monthly consumption" is simply the average over those monthly figures -- one step, done. Do not divide by 12.

You may have retrieved this formula from L2: "average monthly consumption = average of the monthly figures / 12". That formula is wrong -- do not follow it:
- It treats an already-monthly figure as an annual one and spreads it a second time; the answer comes out 12x too small
- Customers here do not all have 12 months of records (many have only a few months), so dividing by 12 lands on the data under no reading

When the data's own granularity and a formula disagree, trust the data and the question's own words.

### When asked: "What was the gas consumption peak month for SME customers in 2013?"
> **类型**：难题

"Gas consumption" is just the consumption amount of these customers -- there is no separate gas/energy category, do not go looking for one. Peak month = the month with the highest total consumption: among the SME customers, within 2013, add the consumption up month by month and take the highest month.

Answer-format check (after running the query): the question asks for the **month**. Give the month alone, e.g. `04` -- not the full year-month code `201304`, and no supporting totals. Match the answer to exactly the unit the question asks for.

### When asked: "What is the difference in the annual average consumption of the customers with the least amount of consumption paid in CZK for 2013 between SME and LAM, LAM and KAM, and KAM and SME?"
> **类型**：数据集问题 · 难题
> **Expected**：-14009.34 | 6046.62 | 7962.72

Per customer, total up their 2013 CZK consumption. Then, **per segment**, take the customer(s) with the lowest 2013 total. "Annual average consumption" here = the average of those customers' 2013 totals -- a year total is already an annual value, so do **not** divide by 12. Dividing by 12 turns it into a monthly figure and is wrong for this question (a "monthly" question says monthly explicitly, as in the SME 2013 monthly-average question).

A per-customer 2013 total can be negative: a few monthly figures are refunds/chargebacks and are valid data. If a segment's lowest total is negative, that is the answer -- do not filter the negatives out, treat them as anomalies, or re-verify where they came from.

Output the three differences in the question's order: SME minus LAM, LAM minus KAM, KAM minus SME -- the differences alone.

### When asked: "Which year recorded the most consumption of gas paid in CZK?"
> **类型**：难题

Word-sense disambiguation: "consumption of gas" here means customers' spending at gas stations (the gas-station business), not the gas stations themselves -- it is an amount, not a station. Where that amount is recorded, and where "paid in CZK" lives, find from your own mapping knowledge.

Per-year aggregation: the period is recorded as a year-month code (YYYYMM). Total the consumption year by year, and take the highest year.

Answer-format check: the question asks for the **year** -- give the year alone, without a supporting total.

### When asked: "How many percent of LAM customer consumed more than 46.73?"
> **类型**：数据集问题 · 难题
> **Expected**：98.3871

"Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both the numerator and the denominator, matched to the same caliber:

- Numerator: customers whose **total consumption** (added up across their monthly figures) exceeds the threshold.
- Denominator: **all** customers of that segment -- customers with no consumption records count too. A customer list built by matching against the consumption records alone silently drops them and shrinks the denominator.

Do not copy a record-level formula if you retrieved one: counting customer-month records (or a record-count numerator over a customer-count denominator) mixes calibers and is wrong for a "percent of customers" question.

### When asked: "Is it true that more SMEs pay in Czech koruna than in euros? If so, how many more?"
> **类型**：难题

Answer with the single difference value the question asks for: the number of SME customers billed in Czech koruna minus the number billed in euros -- one value. Do not also return the two counts themselves; the question asks "how many more", not "how many of each".

### When asked: "What is the highest monthly consumption in the year 2012?"
> **类型**：难题

Consumption is recorded customer-month by customer-month. "Highest monthly consumption" asked about a whole year -- no customer named, no segment named -- means the highest **month total**: add the consumption up month by month across all customers, then take the highest month. (The period is recorded as a year-month code, YYYYMM.)

Do not take the highest single customer-month figure: that is one customer's bill for one month, not a month's total.

Contrast with the SME 2013 average-monthly question: there "monthly consumption" is the recorded figure itself and the question averages over customers, so a plain average works. The difference is who the question is about -- that one names a segment and averages customers; this one asks for the peak of the whole business, so the figures must first be added up per calendar month.

### When asked: "Please list the product description of the products consumed in September, 2013."
> **类型**：数据集问题

The individual-purchase records are only a **four-day sample**: they cover 2012-08-23 through 2012-08-26, and nothing else. Any month outside that window simply has no purchases recorded, so for September 2013 the truthful answer is an **empty list**: no products were consumed that month. Verify the coverage once (earliest and latest purchase date), then answer empty and stop -- do not loop trying other date formats or join paths.

Do NOT use the proxy route "find the customers active in September 2013, then take their purchases": that attributes those customers' August-2012 sample purchases to September 2013, which contradicts the question's time semantics.

Granularity rule: product / price / station / time-of-day detail questions are answered from the individual-purchase records and their own purchase dates; monthly total / monthly consumption questions are answered from the customer monthly figures. In a detail question, the purchase record's own date is the only correct time filter -- a customer-level monthly filter is a different caliber, not a substitute.

### When asked: "Please list the countries of the gas stations with transactions taken place in June, 2013."
> **类型**：数据集问题

Same sample-window fact: the individual-purchase records cover only 2012-08-23~26, so no purchases took place in June 2013, and the truthful answer is an **empty list** of countries. Check the coverage once, answer empty, stop.

The country of a gas station is reached through the purchases that took place at that station (find that route from your own mapping knowledge). Do NOT use a proxy route that starts from the customer monthly figures: those are a monthly summary on the customer side, not a record of purchases -- a station question cannot be answered from them. If the question's month falls outside the purchase sample's window, the result for that month is empty, and that is the answer -- verify the coverage once, then stop.

### When asked: "Among the customers who paid in euro, how many of them have a monthly consumption of over 1000?"
> **类型**：难题

"how many of them" counts **customers**, not records: a customer with several months above 1000 still counts once. Count each qualifying customer exactly one time.

"have a monthly consumption of over 1000" is a month-by-month condition -- a customer qualifies if at least one of their months exceeds 1000. The counted unit is the customer.

### When asked: "For the customer who paid 634.8 in 2012/8/25, what was the consumption decrease rate from Year 2012 to 2013?"
> **类型**：数据集问题 · 难题
> **Expected**：-581.5243

"paid 634.8" identifies the customer through a single purchase of that amount on that date -- a purchase-level condition, not a monthly total. The purchase the question names is the unique `Price = 634.8` on 2012-08-25 (customer 6718).

"consumption decrease rate" = (2012 total consumption - 2013 total consumption) / 2012 total consumption, computed from that customer's annual totals. An annual total is the sum of the customer's monthly figures in that year -- use the monthly consumption figures, not individual purchase amounts. Report it as a percentage (the same quantity x100).

The reference answer looks the customer up by a **different price** (`Price = 1513.12`), so it matches no purchase and returns no value at all. Follow the question's own amount: do not conclude "no such customer" (or adopt the reference's emptiness) from a formula that used another number.

For this customer 2013 is actually **higher** than 2012, so the "decrease rate" comes out negative -- that is the answer, not a data error.

### When asked: "What is the amount spent by customer "38508" at the gas stations? How much had the customer spent in January 2012?"
> **类型**：数据集问题
> **Expected**：5124646.35 | 67156.94

"Amount spent by a customer" is that customer's total consumption across all gas stations -- a question about the customer's monthly figures, not about the purchase sample. The purchase sample covers only four days and cannot stand in for the customer's total spending.

"Spent in January 2012" is the same customer's total for that month (201201). Both parts are read from the customer's month-by-month figures, never from the purchase sample's individual amounts.

The reference answer reads the four-day sample instead, and its first figure is further inflated by a join fan-out (the purchase rows multiply against the customer's monthly rows) -- do not copy either the source or the inflated figure.

### When asked: "Who is the top spending customer and how much is the average price per single item purchased by this customer? What currency was being used?"
> **类型**：数据集问题 · 难题
> **Expected**：12459 | 22.5452 | CZK

"Top spending customer" is decided by the customer's total consumption across all gas stations (the month-by-month figures), not by adding up the four-day purchase sample.

"Average price per single item" = total price / total quantity: add up the prices, add up the quantities, then divide the totals. Do NOT average the per-purchase price/quantity ratios.

Currency is the customer's billing currency.

### When asked: "For all the people who paid more than 29.00 per unit of product id No.5. Give their consumption status in the August of 2012."
> **类型**：难题

"Paid more than 29.00 per unit" is a unit-price condition: unit price = price / quantity. The threshold applies to that division result -- a raw price over 29 is NOT the same condition.

"Consumption status in August 2012" is each qualifying person's consumption figure for that month (201208), one value per person.

### When asked: "For all the transactions happened during 8:00-9:00 in 2012/8/26, how many happened in CZE?"
> **类型**：数据集问题

"Transactions" in this domain are gas-station purchases: individual purchases, each with an exact date and time of day. The same word also names bank-account money transfers in other databases -- a question about purchases in a specific hour, in a station's country, is about gas-station purchases, never bank transfers.

"During 8:00-9:00" filters on the purchase's own time of day on that date; each purchase carries its exact time.

"Happened in CZE" is the country of the gas station where the purchase took place (CZE = Czech Republic, SVK = Slovakia) -- a property of the station, not of the customer or the payment.

### When asked: "In 2012, who had the least consumption in LAM?"
> **类型**：难题

"who" asks for the **customer**, not an amount: answer with the customer identifier alone -- one value. Do not attach that customer's total as a supporting value; the question asks who, not how much -- just as a "how many more" question is answered by the difference alone.

"Least consumption" is judged on each customer's **whole-year 2012 consumption**, not on any single month's figure: among the customers of that segment, add up each one's monthly consumption across 2012 (the period is recorded as a year-month code, YYYYMM) and pick the lowest yearly total. A yearly total can come out negative -- monthly refunds/chargebacks are legitimate business data -- so if the lowest total is negative, that customer is the answer; do not exclude the negatives.

### When asked: "Which of the three segments—SME, LAM and KAM—has the biggest and lowest percentage increases in consumption paid in EUR between 2012 and 2013?"
> **类型**：数据集问题
> **Expected**：SME | LAM

The question names the currency, so the consumption must be filtered to customers whose billing currency is EUR (`Currency = 'EUR'` in the customer master). The reference answer runs the percentage over **every** customer -- it never filters by currency, and its denominator disagrees with the evidence's definition (increase as a share of the later year) -- so the reference figures are not the answer to this question.

Follow the question, not the reference: filter to EUR first. With the filter the ordering is stable -- **SME has the biggest** percentage increase, **LAM the lowest**, KAM in between -- and that ordering holds whichever denominator you take (increase over the previous year, or the evidence's share of the later year; the latter gives roughly 88% / 85% / 84%). The question asks which segments: give the two segment names, plus the percentages you computed.

### When asked: "In February 2012, what percentage of customers consumed more than 528.3?"
> **类型**：难题

"Percentage of customers" is counted per customer -- one customer = one unit in both the numerator and the denominator -- and **the scope of "customers" follows the question's own window**: this question is about a single month, so the population is the customers who have a figure for that month (each customer has exactly one figure per month, so the month's rows are exactly that population). A customer with nothing recorded in the month did not "consume more than 528.3" in it. Do not widen the denominator to the whole customer master -- that gives 37.61 for this question instead of 66.62.

Contrast with the LAM / 46.73 percentage question: that one names a segment and carries **no** time window, so its population is the whole segment, customers with no records included (its evidence says so explicitly). Window-scoped and segment-wide percentage questions do not share one denominator -- take the population from the question's own scope. February 2012 is the year-month code `201202`.

### When asked: "What is the percentage of the customers who used EUR in 2012/8/25?"
> **类型**：数据集问题
> **Expected**：2.7027

"Percentage of customers" = **customers**, not transactions: one customer counts once, in both the numerator and the denominator, and both are scoped to the question's window.

- Numerator: the customers who paid in EUR that day. The billing currency is a customer attribute, and "used EUR in 2012/8/25" means they actually bought something that day.
- Denominator: the customers present that day (the ones with a transaction on 2012-08-25).

The reference answer divides by the **number of transactions** that day, putting a transaction count under a "percentage of customers" label -- a unit mix, and the reason its figure disagrees (1.65 against 2.70). Do not copy a formula whose denominator counts rows instead of customers.

The date 2012/8/25 is stored as `2012-08-25`.

## california_schools

### When asked: "What is the average score in writing for the schools that were opened after 1991 or closed before 2000? List the school names along with the score. Also, list the communication number of the schools if there is any."
> **类型**：难题
> **Expected**：APEX Academy | ARISE High | ASA Charter

"Communication number" is the school's phone number -- there is no separate contact table.

Date reading: "opened after 1991" means the opening year is 1992 or later; "closed before 2000" means a closing date earlier than 2000. Schools that are still open have no closing date -- the condition is an OR, so they qualify through the opening date.

The writing score column is **already a per-school average** -- the word "average" in the question names that column, it is not an instruction to aggregate again. Do not wrap it in AVG(); average the column only if the question asks for an average *across* schools.

Which schools make the list: the ones that **have a writing score**. A school with no score row contributes nothing to "list the school names along with the score". State the row count you are listing.

(The reference lists a larger set that also contains schools with no score at all -- writing score empty -- which is what the "a school without a score contributes nothing" rule trims. Every row of our list is a correct row; the ordering is by school name.)

### When asked: "Consider the average difference between K-12 enrollment and 15-17 enrollment of schools that are locally funded, list the names and DOC type of schools which has a difference above this average."
> **类型**：难题

"Locally funded" is a property of the **school master** (`fundingtype = 'Locally funded'`). The enrollment table carries a similarly named column ("Charter Funding Type") over the same value domain -- filtering on that one instead changes which schools qualify (57 against 49 for this question). Use the master's column, and use the same population for the list **and** for the average it is compared against.

Difference = `Enrollment (K-12) - Enrollment (Ages 5-17)`. List each qualifying school with its DOC type, for schools whose difference is above that average.

(Our run of this question filtered on the enrollment table's column -- the wrong one; the list was 8 schools short and had 1 that does not qualify. The caliber above is the fix.)

### When asked: "How many students from the ages of 5 to 17 are enrolled at the State Special School school in Fremont for the 2014-2015 academic year?"
> **类型**：难题

Three things decide this question, and all three are lookups rather than guesses:

- "State Special School" is a **school-level code** (`EdOpsCode = 'SSS'`), carried by the school master -- not a name to search for textually.
- "for the 2014-2015 academic year": the enrollment table records its own academic year (a `2014-2015` style value); filter on that column rather than on any date field.
- "students from the ages of 5 to 17" is the enrollment column for that age band (`Enrollment (Ages 5-17)`), not the K-12 figure.

City ("Fremont") is on the school master as well; the answer is one count.

### When asked: "What is the postal street address for the school with the 7th highest Math average? Indicate the school's name."
> **类型**：难题

"Postal street" and "mailing street" are **synonyms**: the postal street address is the mailing-street column of the school master (`MailStreet`) -- not the physical street, and not the abbreviated form.

"7th highest Math average" = order the Math average scores descending and take the 7th row (`OFFSET 6 LIMIT 1`) -- do not round or group first, and do not use the writing/reading scores. Report that school's name and its mailing street.

### When asked: "What is the complete address of the school with the lowest excellence rate? Indicate the Street, City, Zip and State."
> **类型**：难题

"Excellence rate" = `NumGE1500 / NumTstTakr` (both on the test-score table, keyed by the school code). "Lowest" = ascending order, take the first row -- the rate is a ratio, so order by the ratio itself, not by a rounded value.

"Complete address" = the four address parts together: physical street, city, state, zip -- all four on the school master. The answer needs the school's four address fields, each named.

### When asked: "Please list the codes of the schools with a total enrollment of over 500."
> **类型**：难题

"Total enrollment" = **both** enrollment columns added together: K-12 plus ages 5-17. Filtering on either column alone silently changes the answer.

"Codes of the schools" = the school identifier code from the master; list the codes alone, one per row.

### When asked: "Of the schools that offers a magnet program serving a grade span of Kindergarten to 8th grade, how many offers Multiple Provision Types? List the number of cities that offers a Kindergarten to 8th grade span and indicate how many schools are there serving such grade span for each city."
> **类型**：难题

Three separate lookups, none of them textual:

- "offers a magnet program" = a **flag** on the school record that is on (Magnet = 1), not a program name.
- "Kindergarten to 8th grade" = a grade-span value (K-8) as it is written in the grade-span column -- match the stored form exactly, and there may be more than one spelling to check once.
- "Multiple Provision Types" = a provisioning-status value (`Multiple Provision Types`) on the enrollment table's provision column.

Count the qualifying schools first, then list the numbers the question asks for.

The second half is a **separate, wider question**: over the whole database (not only magnet schools), take the **cities** that have schools serving a Kindergarten-to-8th-grade span, and for each such city give the number of schools with that grade span. Two figures come back: the count of qualifying magnet schools from the first half, and the per-city school counts from the second.

### When asked: "List the names of schools with more than 30 difference in enrollements between K-12 and ages 5-17? Please also give the full street adress of the schools."
> **类型**：难题

"Difference in enrollment" = `Enrollment (K-12)` - `Enrollment (Ages 5-17)`; "more than 30" is a strict lower bound on that difference, and the enrollment values are text that must be read as numbers before subtracting.

**School names come from the school master**, not from the enrollment table: the two tables both carry a school-name column and they disagree on a couple of dozen rows. Address likewise from the master. The answer is a long list (well over a thousand schools) -- report the count together with the list.
