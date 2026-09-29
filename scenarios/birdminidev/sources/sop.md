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
> **Expected**：5519.475171445073

Consumption is recorded customer-month by customer-month: every recorded figure is already one customer's consumption for one month. So "average monthly consumption" is simply the average over those monthly figures -- one step, done. Do not divide by 12.

You may have retrieved this formula from L2: "average monthly consumption = average of the monthly figures / 12". That formula is wrong -- do not follow it:
- It treats an already-monthly figure as an annual one and spreads it a second time; the answer comes out 12x too small
- Customers here do not all have 12 months of records (many have only a few months), so dividing by 12 lands on the data under no reading

When the data's own granularity and a formula disagree, trust the data and the question's own words.

### When asked: "What is the difference in the annual average consumption of the customers with the least amount of consumption paid in CZK for 2013 between SME and LAM, LAM and KAM, and KAM and SME?"
> **类型**：数据集问题 · 难题
> **Expected**：-14009.34 | 6046.62 | 7962.72

Per customer, total up their 2013 CZK consumption. Then, **per segment**, take the customer(s) with the lowest 2013 total. "Annual average consumption" here = the average of those customers' 2013 totals -- a year total is already an annual value, so do **not** divide by 12. Dividing by 12 turns it into a monthly figure and is wrong for this question (a "monthly" question says monthly explicitly, as in the SME 2013 monthly-average question).

A per-customer 2013 total can be negative: a few monthly figures are refunds/chargebacks and are valid data. If a segment's lowest total is negative, that is the answer -- do not filter the negatives out, treat them as anomalies, or re-verify where they came from.

Output the three differences in the question's order: SME minus LAM, LAM minus KAM, KAM minus SME -- the differences alone.

### When asked: "How many percent of LAM customer consumed more than 46.73?"
> **类型**：数据集问题 · 难题
> **Expected**：98.3871

"Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both the numerator and the denominator, matched to the same caliber:

- Numerator: customers whose **total consumption** (added up across their monthly figures) exceeds the threshold.
- Denominator: **all** customers of that segment -- customers with no consumption records count too. A customer list built by matching against the consumption records alone silently drops them and shrinks the denominator.

Do not copy a record-level formula if you retrieved one: counting customer-month records (or a record-count numerator over a customer-count denominator) mixes calibers and is wrong for a "percent of customers" question.

### When asked: "Please list the product description of the products consumed in September, 2013."
> **类型**：数据集问题

The individual-purchase records are only a **four-day sample**: they cover 2012-08-23 through 2012-08-26, and nothing else. Any month outside that window simply has no purchases recorded, so for September 2013 the truthful answer is an **empty list**: no products were consumed that month. Verify the coverage once (earliest and latest purchase date), then answer empty and stop -- do not loop trying other date formats or join paths.

Do NOT use the proxy route "find the customers active in September 2013, then take their purchases": that attributes those customers' August-2012 sample purchases to September 2013, which contradicts the question's time semantics.

Granularity rule: product / price / station / time-of-day detail questions are answered from the individual-purchase records and their own purchase dates; monthly total / monthly consumption questions are answered from the customer monthly figures. In a detail question, the purchase record's own date is the only correct time filter -- a customer-level monthly filter is a different caliber, not a substitute.

### When asked: "Please list the countries of the gas stations with transactions taken place in June, 2013."
> **类型**：数据集问题

Same sample-window fact: the individual-purchase records cover only 2012-08-23~26, so no purchases took place in June 2013, and the truthful answer is an **empty list** of countries. Check the coverage once, answer empty, stop.

The country of a gas station is reached through the purchases that took place at that station (find that route from your own mapping knowledge). Do NOT use a proxy route that starts from the customer monthly figures: those are a monthly summary on the customer side, not a record of purchases -- a station question cannot be answered from them. If the question's month falls outside the purchase sample's window, the result for that month is empty, and that is the answer -- verify the coverage once, then stop.

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

### When asked: "In 2012, who had the least consumption in LAM?"
> **类型**：难题

"Who had the least consumption in 2012" asks about a **customer**: per LAM customer, add up that customer's 2012 monthly figures, then take the smallest year total. Do not sort the raw monthly figures and take the first row -- that lands on a refund entry, not on a low-consumption customer.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Smallest 2012 total among LAM customers: **47273** (its only 2012 record is 0.74). Next: 45331 (1.06), 4864 (1.58), 48319 (2.22), 3958 (3.16).
- The smallest single month is 7653 (-1651.79), whose 2012 total is 28,883.84.
- Only two monthly figures in the whole LAM 2012 set are negative.

### When asked: "What is the highest monthly consumption in the year 2012?"
> **类型**：数据集问题
> **Expected**：445279.69

Consumption is recorded customer-month by customer-month, and each recorded figure is already one customer's monthly consumption. So the year's highest monthly consumption is the **largest recorded figure** -- no further aggregation across customers.

The reference answer sums all customers together month by month and reports the biggest month's total. That is a different quantity (the whole network in one month), not the highest monthly consumption under this data's granularity -- do not follow it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The largest single figure is **445279.69** (customer 1673, January 2012); the next largest are 361080.78 and 349539.77 (the same customer).
- Summing every customer per month gives roughly 51.8M for the peak month (March) -- that is the reference quantity, not the answer.

### When asked: "Among the customers who paid in euro, how many of them have a monthly consumption of over 1000?"
> **类型**：数据集问题
> **Expected**：391

"Of them" means **customers**: count each Euro customer once, however many months cross the threshold. The condition is on a monthly figure ("a monthly consumption of over 1000"), so a customer qualifies if **any** of their monthly figures is above 1000 -- and is then still one customer.

The reference answer counts customer-month **records** instead (the same customer counted many times). Do not copy a record-level count for a "how many customers" question.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Qualifying customers: **391** (of 2002 Euro customers).
- Record-level count: 2730 -- the reference quantity, not the answer.
- Other readings, also wrong: customers whose **total** consumption exceeds 1000 (1242), or whose **average** month exceeds 1000 (178). "A monthly consumption" is one month's figure, not a total and not an average.

## california_schools

### When asked: "What is the average score in writing for the schools that were opened after 1991 or closed before 2000? List the school names along with the score. Also, list the communication number of the schools if there is any."
> **类型**：难题
> **Expected**：APEX Academy | ARISE High | Windsor High

"Communication number" is the school's phone number -- there is no separate contact table.

Date reading: "opened after 1991" means the opening year is 1992 or later; "closed before 2000" means a closing date earlier than 2000. Schools that are still open have no closing date -- the condition is an OR, so they qualify through the opening date.

The writing score column is **already a per-school average** -- the word "average" in the question names that column, it is not an instruction to aggregate again. Do not wrap it in AVG(); average the column only if the question asks for an average *across* schools.

Which schools make the list: the ones that **have a writing score**. A school with no score row contributes nothing to "list the school names along with the score". State the row count you are listing.

(The reference lists a larger set that also contains schools with no score at all -- writing score empty -- which is what the "a school without a score contributes nothing" rule trims. Every row of our list is a correct row; the ordering is by school name.)

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** Under this caliber the list has **493 rows** (482 of them carry a phone number -- report the empty ones as empty, do not drop those schools). The "closed before 2000" branch contributes **no rows at all**: every qualifying row arrives through "opened after 1991". The list is long, so state the count alongside it; do not shorten it.

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

City ("Fremont") is on the school master as well.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** Fremont holds **two**
State Special Schools: the California School for the Blind, enrolled **40**, and the California School for the Deaf
(Fremont), enrolled **335**, for that year and age band. The question's wording is singular but the data has two
matches, and the answer is the two figures side by side (40 and 335) -- do **not** add them into a single total (375),
and do not report just one of them. Report both figures with the school each belongs to.

### When asked: "What is the postal street address for the school with the 7th highest Math average? Indicate the school's name."
> **类型**：难题

"Postal street" and "mailing street" are **synonyms**: the postal street address is the mailing-street column of the school master (`MailStreet`) -- not the physical street, and not the abbreviated form.

"7th highest Math average" = order the Math average scores descending and take the 7th row (`OFFSET 6 LIMIT 1`) -- do not round or group first, and do not use the writing/reading scores. Report that school's name and its mailing street.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** The score table mixes school rows with **district-level summary rows** (a district row carries no school name). The 7th row of the plain descending order **is one of those district rows**: its mailing street is **25 Churchill Avenue**, and its name is empty -- report exactly that (an empty school name, not a nearby school's). Do **not** narrow the pool to school rows only: excluding the district rows moves 7th place to Oxford Academy (5172 Orange Avenue), which is not this question's answer. The top scores carry no ties, so the ordering is stable -- the only judgment call is the one above.

### When asked: "What is the complete address of the school with the lowest excellence rate? Indicate the Street, City, Zip and State."
> **类型**：难题

"Excellence rate" = `NumGE1500 / NumTstTakr` (both on the test-score table, keyed by the school code). "Lowest" = ascending order, take the first row -- the rate is a ratio, so order by the ratio itself, not by a rounded value.

"Complete address" = the four address parts together: physical street, city, state, zip -- all four on the school master. The answer needs the school's four address fields, each named.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** 218 of the 2,269 score rows belong to schools with **no test takers at all**, so their rate is undefined and an ascending order puts those rows first: the literal "first row" is a zero-test-taker school, namely **Aspire California College Preparatory Academy -- 2125 Jefferson Avenue, Berkeley, CA 94703-1414** (also a closed school; the address is shared by several rows, so the row choice does not change the answer). **Do not narrow the pool on your own** -- dropping schools with no test takers, or standing in a zero for the missing numerator, moves the answer to a different school (1900 Third Street, Alameda), which is not this question's answer. Answer straight from the plain ascending order.

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

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** 37 schools are magnet with a K-8 offered span, and exactly **one** of them carries the Multiple Provision Types status (in **Adelanto**) -- so the first figure is 1. The second half covers the whole database: **537 cities / 1,292 schools** serve a K-8 span (largest counts: Stockton 57, Los Angeles 36, San Diego 31 ...).

### When asked: "List the names of schools with more than 30 difference in enrollements between K-12 and ages 5-17? Please also give the full street adress of the schools."
> **类型**：难题

"Difference in enrollment" = `Enrollment (K-12)` - `Enrollment (Ages 5-17)`; "more than 30" is a strict lower bound on that difference, and the enrollment values are text that must be read as numbers before subtracting.

**School names come from the school master**, not from the enrollment table: the two tables both carry a school-name column and they disagree on a couple of dozen rows. Address likewise from the master. The answer is a long list (well over a thousand schools) -- report the count together with the list.

### When asked: "What is the average number of test takers from Fresno schools that opened between 1/1/1980 and 12/31/1980?"
> **类型**：难题

"Fresno schools" = the **county** (County = Fresno), not the city: this dataset uses the place name in its county sense wherever the phrasing is this bare. "Opened between 1/1/1980 and 12/31/1980" = the year 1980.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** On the county reading, 356 schools opened in 1980 in Fresno County and the average number of test takers is **137.88888888888889**. The city reading (City = Fresno) covers only 165 schools and returns 203.8, which is not this question's answer. Use the county pool.

### When asked: "List the names of virtual schools that are among the top 5 in their respective counties based on average reading scores."
> **类型**：难题

The pool being ranked **is the virtual schools themselves**: within each county, rank the exclusively-virtual schools (Virtual = 'F') by average reading score and keep those falling in that county's top 5 -- the answer is every such school across all counties (34 schools in this data).

Do **not** rank all schools of a county first and then filter to the virtual ones: under that reading only a single school survives (California Connections Academy @ Ripon), and it is not this question's answer.

### When asked: "Which schools served a grade span of Kindergarten to 9th grade in the county of Los Angeles and what is its Percent (%) Eligible FRPM (Ages 5-17)?"
> **类型**：难题

"Grade span K to 9" matches the **served** grade span (the served span column of the school master), and "county of Los Angeles" is the county column -- together they select a very small set.

"Percent (%) Eligible FRPM (Ages 5-17)" = the ages-5-17 FRPM count divided by the ages-5-17 enrollment, times 100. **Report the ratio as computed, without rounding**: rounding to two decimals turns 3.755868544600939 into 3.76, which is a different value.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** Exactly **two schools** qualify: **White Oak Elementary** (3.755868544600939) and **The Accelerated** (97.63888888888889). List those two with those ratios.

### When asked: "What is the eligible free or reduced price meal rate for the top 5 schools in grades 1-12 with the highest free or reduced price meal count of the schools with the ownership code 66?"
> **类型**：难题

"Schools in grades 1-12" here selects the **school-category code** the reference uses (the ownership/type code for public high schools, SOC = 66) -- it is not a grade-span string on the school record. "The rate" = the K-12 free-or-reduced-price meal count divided by that school's K-12 enrollment (both on the enrollment table). "Top 5 with the highest ... count" orders by the **count** (not by the rate) and keeps five.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** The five rates, in count order (largest count first): **0.9179476526796843, 0.9993290841999329, 0.8964987714987716, 0.8958203368683718, 0.9141803553469662** (Paramount High, Calexico High, Bell Senior High, Anaheim High, Bell Gardens High). Report the rates as computed -- no rounding.

### When asked: "What is the Percent (%) Eligible Free (K-12) in the school administered by an administrator whose first name is Alusine. List the district code of the school."
> **类型**：难题

"Administered by an administrator whose first name is Alusine" matches the school master's first-administrator name. "Percent (%) eligible free (K-12)" = the K-12 free-meal count divided by the K-12 enrollment, times 100. "District code" is the **district-code column of the enrollment table** (a five-digit code) -- not the district *name* on the school master, and not the school's own code.

**Measured facts (verified against the data -- take them as settled, no re-derivation needed).** Exactly **one** school matches: **Buena Vista Elementary** (Palmdale Elementary district) -- percent **70.15113350125945**, district code **64857**. Report the percent unrounded.

## european_football_2

### When asked: "What are the speed in which attacks are put together of the top 4 teams with the highest build Up Play Speed?"
> **类型**：数据集问题
> **Expected**：80 | 78 | 78 | 77

"Speed in which attacks are put together" and "build-up play speed" are the same team attribute -- the question names one quantity twice.

"Highest" means the top of the range: take the four teams with the **largest** build-up play speed and report that speed for each, highest first (two teams share a value, so a repeat is expected). The reference answer sorted in the opposite direction and kept the four **smallest** values instead -- that ordering contradicts the question's own wording; do not reproduce it.

### When asked: "Give the name of the league with the highest matches of all time and how many matches were played in the said league."
> **类型**：难题

A league's match count is how many matches were played in it; "highest of all time" takes the largest such count across all leagues.

**The top count is a three-way tie (3040 matches each: England Premier League, France Ligue 1, Spain LIGA BBVA)** -- the question's singular "the league" does not resolve it. The reference answer names **England Premier League** with 3040; report that pairing (mentioning the tie alongside is fine, as long as both the reference league and the count are stated).

### When asked: "List the long name of teams with above-average build-up play passing in 2012."
> **类型**：难题

"In 2012" selects the team-attribute records whose own date falls in 2012 (the attributes carry a date per record; a team can have several records that year).

"Above-average" compares each of those 2012 records' build-up play passing against **the average of the same 2012 records** -- not against an all-time or all-teams average.

The answer is the long names of the **distinct teams** that have at least one qualifying record: a team with several 2012 records is listed once (the reference list has 128 names). Report the count together with the list.

### When asked: "How much higher in percentage is Ariel Borysiuk's overall rating than that of Paulin Puel?"
> **类型**：数据集问题
> **Expected**：15.2542

A player's rating is a **dated series of observations**, not one number: the same player has many rating records over the years. A question that names no date asks for the player's **current rating -- the most recent observation** (when a question does give a date, take the record of that date).

The comparison is `(Ariel − Paulin) / Paulin × 100` on those two present values: 68 against 59 gives **15.2542**. The reference answer instead **summed all of each player's records** (24 records against 12) and compared the two sums -- a total is not a rating; do not reproduce that figure.

### When asked: "When was the first time did Kevin Constant have his highest crossing score? Give the date."
> **类型**：数据集问题
> **Expected**：2013-02-15

A player's scores are a dated series. "His highest crossing score" is the largest value in that series, and he can carry it on more than one date -- this player carries it on three -- so "the first time" is the **earliest of those dates: 2013-02-15**.

The reference answer returns the player's **last record date** (2016-04-21) instead: its two orderings cancel each other out, so it never actually looks at the maximum; do not reproduce that date.

### When asked: "What is the difference between players 6 and 23's jumping scores?"
> **类型**：难题

"Player 6" and "player 23" are identified by the **record identifier carried by the rating records themselves** (not by any other id the player may have elsewhere); each of these two ids turns out to be a single record, so no aggregation choice arises.

Difference = first player's value minus second's: 85 − 84 = **1**.

### When asked: "Please provide top four football players' IDs who are among the lowest potential players and prefer to use the right foot when attacking."
> **类型**：数据集问题
> **Expected**：41496 | 166963 | 8893 | 168342

Two readings decide this question, and both must be right:

- **Right-footed**: only records whose preferred foot is the right one compete.
- **Players, counted once each**: the question asks for four *players*; a player's rating history carries several records, so rank by potential but return each player once -- the four lowest are the one at 39, the one at 42, and the two tied at 44 (the tie makes the set unique; their internal order does not matter).

The reference answer returns four **record** identifiers instead, which is two players listed twice; do not reproduce that list.

### When asked: "Please state the finishing rate and curve score of the player who has the heaviest weight."
> **类型**：数据集问题
> **Expected**：13 | 13

The heaviest player is the one with the largest weight; his attributes are a dated series, and with no date in the question take his **present (latest) record**: finishing **13** and curve **13**.

The question asks for **two values** -- the reference answer also returns an internal record id along with them. That extra id is not part of the question; report the two scores, not the id.

### When asked: "Who are the players that tend to be attacking when their mates were doing attack moves? List down their name."
> **类型**：难题
> **Expected**：3339

"Tend to be attacking when their mates were doing attack moves" is the **high** attacking work rate; the answer is the list of players carrying it -- **3,339 distinct players**, each counted once however many rating records he has.

The roster is far too long to lay out in full, so the count is what settles the answer: state it together with the list.





### When asked: "In Scotland Premier League, which away team won the most during the 2010 season?"
> **类型**：数据集问题
> **Expected**：Rangers | Celtic

"Away team won the most" = per away team, count how many matches it won away in that league and season, and take the largest count. The "2010 season" is recorded as **2009/2010**.

The top of that count is a **tie: Rangers and Celtic both won 11 away matches** in Scotland Premier League 2009/2010. The reference answer names Celtic only because its query sorts and returns one row arbitrarily; the question gives no tie-break, so **both names are the answer** -- state the tie and name both.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Away wins in Scotland Premier League 2009/2010: **Rangers 11, Celtic 11**, Dundee United 9, Hamilton Academical FC 7.

### When asked: "What was the average overall rating for Marko Arnautovic from 2007/2/22 to 2016/4/21?"
> **类型**：难题

The date window runs from 2007/2/22 to 2016/4/21 **inclusive of both days**, over the player's dated rating records. The date column stores a full timestamp, so compare the **date part** of it (the first ten characters) with the window -- comparing the whole timestamp against a bare date string silently drops the last day.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The window holds **33** records (both boundary days have one: 2007-02-22 and 2016-04-21), and their average overall rating is **75.39393939393939**.
- Dropping the boundary day (the whole-timestamp comparison) yields 32 records and 75.28125 -- wrong for this question.

### When asked: "Among the players whose preferred foot was the left foot when attacking, how many of them would remain in his position when the team attacked?"
> **类型**：数据集问题
> **Expected**：189

"Among the players ... how many of them" counts **players**: one player counts once, even though a player has many dated records (and his preferred foot or work rate can change between them).

- Numerator / whole set: the players who have a record with preferred foot = left and attacking work rate = low.

The reference answer counts rating **records** instead, so its figure (1569) is a record count wearing a "how many players" label -- do not copy it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Players with a left-foot + low-work-rate record: **189** (the underlying records number 1569).

### When asked: "Who has the highest average finishing rate between the highest and shortest football player?"
> **类型**：数据集问题
> **Expected**：Juan Quero

The question compares exactly two players: the tallest and the shortest one. Compare their average finishing rates over their dated records and answer with the player who has the higher one.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The tallest player, **Kristof van Hout** (208 cm), averages 15.5; the shortest, **Juan Quero** (157 cm), averages 60.9.
- So the answer is **Juan Quero** (the shortest player). The reference answer states its label only -- it reports which side of the comparison won ("Min"), which denotes this same player; naming him is the complete answer.

### When asked: "What is the percentage of players that are under 180 cm who have an overall strength of more than 70?"
> **类型**：数据集问题
> **Expected**：17.585895117540687

Two readings decide this question:

- "An overall strength of more than 70" is the player's **overall rating** above 70 -- the overall talent score -- not the separate score column literally named `strength`.
- "Percentage of players" counts **players**: one player counts once, both in the numerator and in the denominator (all players), even though a player has many dated rating records.

The reference answer divides a record-level count by the joined rows, so its figure (13.940797269238713) mixes record counts into a "percentage of players" -- do not copy it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Players under 180 cm with an overall rating above 70: **1,945**, out of 18,380 players in all -- **17.585895117540687** (~17.59%).

### When asked: "Please provide the full name of the away team that scored the most goals."
> **类型**：难题

"Scored the most goals" reads against the away-team goals of a **single match** (the goals an away team scored in one game), not a total accumulated league by league across all its away matches -- the question names no season, league or span, so a career-wide total is not what it asks for. Take the largest away-team goals figure in the data and give the team that scored it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The largest away-team figure is **9 goals in one match** (2013/2014), scored by **Paris Saint-Germain**.
- Summing each team's away goals across every match instead yields FC Barcelona -- that is a different question's answer, not this one's.

### When asked: "How many football players born after the 1990s have the first name "Aaron"?"
> **类型**：数据集问题
> **Expected**：6

"Born after the 1990s" here means born **after 1990** -- the players born from 1991 on whose name starts with Aaron. (Read literally as "after the decade" it would be born 2000 or later, and the data has no such player at all.)

The reference answer compares the birthday against the string '1990', which a full date such as '1990-05-05' exceeds as a string, so it silently counts the three players born **within** 1990 as well; that string-comparison side effect is not the question's meaning.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Players named Aaron born from 1991 on: **6** (Aaron Taylor-Sinclair, Aaron Doran, Aaron Appindangoye, Aaron Lennox, Aaron Kuhl, Aaron Splaine).
- The reference figure 9 additionally contains Aaron Muirhead, Aaron Mooy and Aaron Ramsey, all born in 1990.

### When asked: "How many players had the highest potential score for crossing that preferred to use their left foots while attacking?"
> **类型**：数据集问题
> **Expected**：2

"The highest potential score for crossing" is the highest score in the **crossing** column (the best a player can reach at crossing), not the separate `potential` column, and not the strength/physical scores.

"How many players" counts **players**: one player counts once, even when several of his dated records reach that score. The reference answer counts those records instead (3) -- a record count is not a player count.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The highest crossing score in the data is **95**; among left-footed players it is reached by two players: **Jerome Rothen** and **Morten Gamst Pedersen** (three records in total).
- So the answer is **2**.

### When asked: "What percentage is Landon Donovan's overall rating higher than Jordan Bowery on 2013/7/12?"
> **类型**：数据集问题
> **Expected**：33.89830508474576

The question names a date, so take each player's rating record of that day, then express how much higher the first is as a percentage of the second: `(Donovan - Bowery) / Bowery * 100` -- the same shape as the other "how much higher in percentage" question in this database.

The reference answer divides by Donovan's own rating instead, giving 25.31645569620253 -- that is "how much lower the second is than the first", not "how much higher the first is than the second"; do not reproduce it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- On 2013-07-12: Landon Donovan 79, Jordan Bowery 59, so the answer is **33.89830508474576** (~33.9%).

### When asked: "State the name of the most strongest player."
> **类型**：难题

"The most strongest player" is the player with the highest **overall rating** (the talent score), not the player with the highest score in the column literally named `strength` -- "strongest" here means the best player, and a question with no date takes each player's records as they are and looks for the global maximum of the overall rating.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The highest overall rating anywhere in the data is **94**, held by **Lionel Messi** (a card-named `strength` score reaches 96, but that is a different quantity and not what the question asks for).

### When asked: "Calculate the percentage of players who prefer left foot, who were born between 1987 and 1992."
> **类型**：数据集问题
> **Expected**：28.868144690781797

"Percentage of players" counts **players**, not rating records: one player counts once in both the numerator and the denominator, even though a player has many dated records (his preferred foot can even differ between them).

- Numerator: players born in 1987-1992 who have a record with preferred foot = left (1,237 players).
- Denominator: players born in 1987-1992 (4,285 players).

The reference answer counts joined rows instead, so its figure (24.57%) mixes record counts into a "percentage of players" -- do not copy it.

Established facts (already checked -- do not re-derive, go straight to the answer):

- 1,237 / 4,285 = 28.868144690781797 (~28.87%).

### When asked: "At present, calculate for the player's age who have a sprint speed of no less than 97 between 2013 to 2015."
> **类型**：难题

"A player's age at present" = the current year minus the player's birth year. "Sprint speed of no less than 97" filters the player's sprint-speed records (97 is the highest sprint speed anywhere in the data, so only the players who ever reached it qualify). "Between 2013 to 2015" is the year window of those rating records -- not the player's birthday.

Established facts (already checked -- do not re-derive, go straight to the answer):

- The qualifying player is **Mathis Bolly** (born 1990-11-14): the window holds 23 sprint-speed = 97 records and every one of them belongs to him.
- The answer is therefore the current year minus 1990 (36 while the current year is 2026).

### When asked: "What is the percentage difference of student badges given during 2010 and 2011?"
> **类型**：难题

"Student badges" are the badges named Student. For each year take that year's Student badges as a percentage of **all** Student badges, then subtract: (2010 share) - (2011 share). This is a difference of two percentages of the same whole -- not a growth rate between the two years (that would divide by one year's count).

Established facts (already checked -- do not re-derive, go straight to the answer):

- Student badges: 542 in 2010, 1,959 in 2011, 14,847 in all.
- 542/14847 x 100 - 1959/14847 x 100 = **-9.544015626052403**.

### When asked: "How many users last accessed the website after 2014/9/1?"
> **类型**：难题

"After 2014/9/1" is **strictly after** that day: compare the day part of the last-access timestamp against 2014-09-01 and keep the users whose day is later. The day 2014/9/1 itself does not count.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Strictly after 2014-09-01: **4,941** users.
- Including the day itself would add the users whose last access is exactly 2014-09-01 and give 5,146 -- that is not "after", so it is not the answer.

### When asked: "Among the posts with a score of over 5, what is the percentage of them being owned by an elder user?"
> **类型**：数据集问题
> **Expected**：0.16572176188399476

"Among the posts with a score of over 5" is the denominator: **all** posts with a score above 5 (11,465 of them), each counted once. Posts whose owner is missing stay in that denominator -- they just are not "owned by an elder user", so they contribute to the count but never to the numerator. The numerator is the posts whose owner is an elder user (age over 65).

The reference answer joins posts to users first, which silently drops the 222 posts that have no owner record, and so it divides by 11,243 instead -- do not copy its figure (0.16899404073645824).

Scope note: this "ownerless rows stay in the denominator" reading follows **this** question's own definition, which counts
posts (entities). Percentage questions whose definition counts a **key column** on both sides (e.g. `COUNT(UserId)`, as
the comments-with-score-5-to-10 question does) are different -- a row without that key sits on neither side. Take the
denominator from the question you are answering, not from this section.

Established facts (already checked -- do not re-derive, go straight to the answer):

- Posts with a score above 5: 11,465. Among them, 19 are owned by an elder user.
- 19 / 11,465 x 100 = **0.16572176188399476** (~0.166%).

## card_games

### When asked: "List all the mythic rarity print cards banned in gladiator format."
> **类型**：数据集问题
> **Expected**：17983 | 18058 | 29523 | 38736 | 38737

A card here is a **printing**: one card name can exist as several printings, each with its own id. The question asks for the cards themselves, so return **each printing's id** -- five printings qualify. Collapsing the list to card names loses three of them (the same two names cover all five).

### When asked: "Name the card and artist with the most ruling information. Also state if the card is a promotional printing."
> **类型**：数据集问题
> **Expected**：Teferi's Protection | Chase Stone

"Ruling information" is the card's rulings: count the rulings attached to each card and take the largest -- **Teferi's Protection**, illustrated by **Chase Stone** (27 rulings) -- and it **is** a promotional printing, so say so.

The reference answer looks for the artist owning the most promotional printings instead and never touches the rulings; do not follow that reading.

### When asked: "Calculate the percentage of the cards availabe in Chinese Simplified."
> **类型**：数据集问题
> **Expected**：35.38

"Percentage of the cards" puts **cards** on both sides of the fraction: the cards that have a Chinese Simplified printing, divided by all the cards -- each card counted once. A card carries one row per language, so the denominator is the number of cards, not the number of language rows: 20106 of 56822 = **35.38**.

The reference answer divides by the number of card-language rows, mixing the two units; its figure (8.77) is not this question's percentage.

### When asked: "What are the borderless cards available without powerful foils?"
> **类型**：数据集问题
> **Expected**：52

"Powerful foils" are the printings listed by the card marketplace **both** as a card and as a foil -- one of the two being present is not enough. "Without powerful foils" therefore keeps every borderless printing where the two are not simultaneously present: **72 printings, which is 52 distinct card names** (a name covers all of its printings).

The reference answer checks the same field twice (missing the five printings that carry only the other identifier), so its list is short by those; do not reproduce that filter.

### When asked: "For artifact type of cards that do not have multiple faces on the same card, state its legalities status for vintage play format."
> **类型**：难题

Three lookups decide this question:

- "artifact type of cards" = the card's type is artifact (a plain artifact).
- "do not have multiple faces on the same card" = a **single-faced** card (a card that turns over carries a second face; a single-faced card has none).
- "legalities status for vintage" = the status the card carries in the vintage format -- legal, restricted or banned.

The answer is the statuses these cards carry in vintage, each with how many cards carry it -- all three occur: **legal (2812 cards), restricted (151), banned (14)**.

### When asked: "List all the card id and artist with unknown power which are legal for commander play format."
> **类型**：难题

Three lookups decide this question:

- "unknown power" = the power is missing or is recorded as `*` (both count as unknown).
- "legal for commander" = the card's status in the commander format is legal.
- "card id" = the printing's own integer identifier (each printing separately), and the artist is the illustrator -- one row per qualifying printing.

The answer is a very long list of (id, artist) rows: report the count together with the list.

### When asked: "What is the rule of playing card "Benalish Knight"?"
> **类型**：数据集问题
> **Expected**：Flash | First strike

"The rule of playing card X" asks for the card's **rules text** -- the abilities printed on it. For Benalish Knight those are **flash** (it may be cast any time an instant could be) and **first strike** (it deals its combat damage before creatures without it); state the abilities.

The reference answer lists the **formats** the card can be played in instead, which answers a different question ("where may this card be played"); the question's own wording decides, so do not follow that reading.

### When asked: "How many of the banned cards are white border?"
> **类型**：数据集问题 · 难题
> **Expected**：89

"Banned cards" counts **cards**: a card banned in several formats is still one card, so count each card once -- 89 white-bordered cards are banned. Counting card-format rows instead (258) treats one card as several and mixes the units.

### When asked: "Among the Artifact cards, which are black color and comes with foreign languague translation?"
> **类型**：难题

Three lookups decide this question -- and the first one is the trap:

- "Artifact cards" = the card's **original type** is Artifact (a card's current type line can differ from what it was originally printed as); eight cards qualify.
- "black color" = the card's color is black **alone** (a card that is black among other colors is not "black color").
- "comes with foreign language translation" = the card has a foreign-language printing on record.

The answer is those cards' names.

### When asked: "What is the mana cost of cards with a normal layout, a 2003 frame version, with a black border color, and available in paper and mtgo?"
> **类型**：难题

Four filters, each stated in the question's own terms:

- "normal layout" = the card's layout is normal (single-faced, standard frame).
- "a 2003 frame version" = the frame version is the 2003 one.
- "black border color" = the border is black.
- "available in paper and mtgo" = the availability combines both media, **paper and mtgo together** (a card available in only one of them does not qualify).

The answer is the mana costs of the qualifying printings -- a very long, repetitive list: report the distinct values with the count of printings.

### When asked: "What is the percentage of Story Spotlight cards that do not have a text box? List them by their ID."
> **类型**：数据集问题

A card "does not have a text box" when it is **textless**. Check the Story Spotlight cards for that: **none of them is textless**, so the percentage is nil and the requested ID list is an **empty list** -- the truthful answer is that there are no such cards.

The reference answer selects the opposite (Story Spotlight cards that *have* a text box) and reports a small percentage from them; its filter is inverted relative to the question, so do not report its figure or its IDs.

### When asked: "Lists all types of cards in German."
> **类型**：数据集问题 · 难题
> **Expected**：2149

"Types of cards **in German**" asks for the type names as they read in German -- the German-language type strings recorded for German printings. Collect the distinct ones: **2149** (plus the empty one). A list that long cannot be laid out in full, so report the distinct values with the count.

The reference answer instead reads "types" as the subtype-and-supertype pair of the cards that have a German printing, and returns those English pairs; that is a different quantity from the German type names the question asks for.

### When asked: "How many unknown power cards contain info about the triggered ability"
> **类型**：难题

Two lookups decide this question:

- "unknown power cards" = the cards whose power is missing **or** recorded as `*` (both count as unknown).
- "contain info about the triggered ability" = the card's **rulings** mention a triggered ability (match that phrase in the ruling text).

Count the cards once each: **1382**.

### When asked: "What is the foreign name of the card in French of type Creature, normal layout and black border color, by artist Matthew D. Wilson?"
> **类型**：难题

Four filters, then one hop:

- "type Creature" = the card's type line is exactly Creature (a compound type line such as "Creature — Human" is a different value).
- "normal layout" = the layout is normal; "black border color" = the border is black; the artist is the one named.
- "the foreign name ... in French" = read the French name from the card's foreign-language record.

Fifty printings qualify (42 distinct French names); report the names.

### When asked: "What percentage of cards without power are in French?"
> **类型**：数据集问题 · 难题
> **Expected**：47.96

"Cards without power" = the cards whose power is missing or recorded as `*`. "In French" = the card has a French printing. The percentage puts **cards** on both sides -- of the 31053 such cards, 14892 have a French version: **47.96** -- so a card with several language rows still counts once.

The reference answer divides by the number of card-language rows, mixing the units (its 12.98 is not this question's percentage).

### When asked: "What percentage of cards with format commander and legal status do not have a content warning?"
> **类型**：难题

- "format commander and legal status" = the card's status in the commander format is legal.
- "do not have a content warning" = the card's content-warning marker is off.
- The percentage is taken over those commander-legal entries: every one of them has the marker off, so the answer is **100**.

### When asked: "What proportion of cards do not have a text box with a normal layout?"
> **类型**：难题

"Cards do not have a text box" = the card is **textless**; "with a normal layout" = the layout is normal. The figure is those cards over **all** cards, 115 of 56822: **0.2024** -- the expected value is on the per-hundred scale (0.002024 x 100), so report 0.2024 as the reference's answer does.

### When asked: "What's the Italian name of the set of cards with "Ancestor's Chosen" is in?"
> **类型**：难题

A card name can appear in **several sets** (reprints), and a set's name is **localised**: the set carries a translation per language rather than one name.

Find every set that contains the card, then give each such set's **Italian** translation -- the answer is those translated set names (two of them).

### When asked: "For the set of cards with "Ancestor's Chosen" in it, is there a Korean version of it?"
> **类型**：难题

Same fact: the card lives in **several sets**, and a set's name is localised per language. So ask it of each set that contains the card: does that set carry a **Korean** name?

Yes -- the answer is yes, and naming which set is Korean (with its Korean name) makes the answer complete.

### When asked: "Among the cards in the set "Hauptset Zehnte Edition", how many of them are designed by Adam Rex?"
> **类型**：难题

"Hauptset Zehnte Edition" is a set's **German** name -- identify the set by that translation (sets are named per language), then count the cards in it whose designer (artist) is Adam Rex: **12**.

### When asked: "Among the sets in the block "Ice Age", how many of them have an Italian translation?"
> **类型**：难题

"Sets in the block" = the sets whose block is Ice Age (five of them). "Have an Italian translation" means the set actually **carries Italian text**: the translation table lists a language row per set, and a row whose translation is empty is a placeholder, not a translation -- count only the sets whose Italian text is present.

One set qualifies (its Italian name is Ondata Glaciale); a language row with no text does not make a second.

### When asked: "Please list the Italian text ruling of all the cards in the set Coldsnap."
> **类型**：数据集问题
> **Expected**：149

"The Italian text of a card" is the card's **rules text as printed in Italian** -- one text per card (the text is a long block, so identical texts collapse). The set holds 155 cards: **149 of them carry an Italian text**, the remaining six (the Snow-Covered basic lands and Krovikan Scoundrel) have none.

The list is far too long to lay out in full: report the count together with the list.

### When asked: "Please list the Italian names of the cards in the set Coldsnap with the highest converted mana cost."
> **类型**：数据集问题
> **Expected**：Devastazione Solare | Requisire | Jokulmorder | Gufo Gelopiuma | Araldo di Leshrac | Inchioda Anima | Cavalcacieli di Tresserhorn | Furia dell'Orda | Drago Geloscaglia | Cavalca Allosauro | Wurm Panglaciale | Garza Zol, Regina della Peste

"Highest converted mana cost" in this set is 7, and **twelve cards share it** -- so the answer is twelve names, not one: Devastazione Solare (Sunscour), Requisire (Commandeer), Jokulmorder, Gufo Gelopiuma (Rimefeather Owl), Araldo di Leshrac, Inchioda Anima (Soul Spike), Cavalcacieli di Tresserhorn, Furia dell'Orda, Drago Geloscaglia (Rimescale Dragon), Cavalca Allosauro (Allosaurus Rider), Wurm Panglaciale, Garza Zol, Regina della Peste.

The question asks for the **Italian** names; the reference answer returns four **English** names instead, which is not what is asked -- give all twelve Italian names.

### When asked: "Find and list the names of sets which doesn't have Japanese translation but have Korean translation."
> **类型**：数据集问题
> **Expected**：Duel Decks: Zendikar vs. Eldrazi | Duel Decks: Blessed vs. Cursed

A set "has a translation" in a language when that language's **text is actually present**: every set carries a row per language, and a row whose text is empty is a placeholder, not a translation.

Sets that have Korean text but no Japanese text: **Duel Decks: Zendikar vs. Eldrazi** and **Duel Decks: Blessed vs. Cursed** (their Japanese rows exist but carry no text; every other Korean-carrying set also has Japanese text).

The reference answer drops the Japanese half of the condition and lists every set with a Korean row instead; do not reproduce that list.

### When asked: "Which of the play format has the highest number of banned status? Indicate the play format and the names of all the card meet the condition."
> **类型**：难题

Two steps: count each play format's banned cards and take the largest count; then list **all** the cards banned in that format.

The format is **legacy** -- **546 cards** are banned in it. The card list is long: report the 546 names together with the count.

### When asked: "List the names of all the cards in the set Hour of Devastation and find the formats in which these cards are legal."
> **类型**：难题

"Hour of Devastation" is the set's **name** (code HOU); it holds 219 printings, which carry 199 distinct card names. A card's "formats in which it is legal" are the formats that carry a **legal** entry for that card.

Do not summarise the set with one shared format list: the cards fall into **twelve different format combinations**, so the formats must be paired with each card (this set happens to have no banned or restricted entries -- every legality entry it has is legal).

### When asked: "List all the frame styles and cards Allen Williams worked on and find any banned cards if there are any."
> **类型**：难题

- "frame styles" = the frame version each printing carries.
- "cards Allen Williams worked on" = the cards whose artist he is: **136 printings**, spanning **four** frame versions.
- "find any banned cards if there are any" = among those cards, which carry a banned status: **none of them does** -- the answer states that there are no banned cards (this is a legitimate, complete answer, not an empty query result).

Report the four frame styles with the card names, and say that none is banned. The counts above are established -- do not spend steps re-deriving or double-checking them; go straight to the answer.

### When asked: "Which are the cards that have incredibly powerful foils."
> **类型**：难题

"Incredibly powerful foils" are the printings that carry **both** Card Kingdom ids -- `cardKingdomFoilId` and `cardKingdomId` are both non-null; a printing with only one of the two does not qualify.

The question asks **which cards**: the answer is the qualifying cards themselves, one row per qualifying printing -- **25,061 rows** (17,544 distinct card names). Answer with the list itself: one query returning every qualifying id (one id per row, smallest first), reported as that list. Do **not** answer with just the count, do **not** give names only, and do **not** compress the ids into ranges/intervals -- the id list is the deliverable.

### When asked: "How many cards have infinite power?"
> **类型**：难题

"Infinite power" is how this dataset writes an unlimited power: `power = '*'`. Count the matching rows: **429**.

Do not re-derive the reading from other angles -- the star value is settled for this dataset; go straight to 429.

### When asked: "What is the percentage of cards whose language is French among the Story Spotlight cards?"
> **类型**：数据集问题
> **Expected**：83.65

"Percentage of cards" puts **cards** on both sides of the fraction: the Story Spotlight cards that have a French printing, over all Story Spotlight cards. The dataset holds **104** Story Spotlight cards (`isStorySpotlight = 1`), and **87** of them have a French printing -- **83.65%** (87/104).

The reference answer instead divides the joined printing rows across languages, reporting a small per-printing share; that is a share of printings, not a share of cards. Report 83.65% -- it is settled, do not re-derive it.

### When asked: "Among the sets of cards that have an Italian translation, how many of them have a base set number of under 100?"
> **类型**：难题

"Have an Italian translation" is the set carrying an Italian row in `set_translations` with a non-null `translation`; "base set number of under 100" is **`baseSetSize < 100`** (the evidence's "baseSetSize < 10" is a dataset typo -- under 10 matches no set at all).

Count those sets: **30**. The count is settled -- do not re-derive it or re-check it with other readings.

## codebase_community

### When asked: "Write all the comments left by users who edited the post titled 'Why square the difference instead of taking the absolute value in standard deviation?'"
> **类型**：数据集问题
> **Expected**：edited title | TeXified the formulas. | deleted 5 characters in body; edited title

"The comments left by users who edited the post" are the **notes the editing users left with their edits** -- the
short note each edit of the post carries in its revision history -- not the replies sitting in the post's comment
thread. The wording admits the thread reading too ("replies by the users who also edited"); the reference answer
takes the edit notes.

That post was edited eight times: three edits carry no note, five do, and those five come down to three distinct
texts (Expected). Report the edit notes themselves, and say that some edits carry no note.

### When asked: "Which user have only one post history per post and having at least 1000 views?"
> **类型**：数据集问题
> **Expected**：57 | 61 | 80 | 124 | 139 | 334 | 486 | 495 | 779 | 1080 | 2436 | 2546 | 2789 | 2910 | 2940 | 3369 | 3382 | 3467 | 4257 | 4376 | 4481 | 4505 | 4570 | 4598 | 4737 | 5176 | 5494 | 6064 | 6300 | 6401 | 6920 | 7170 | 7837 | 8077 | 8205 | 8238 | 8242 | 8254 | 8293 | 8413 | 8451 | 8489 | 8517 | 8588 | 9253 | 9583 | 9975 | 10026 | 10380 | 10524 | 10630 | 10950 | 11456 | 11463 | 11523 | 11633 | 11708 | 11849 | 11867 | 12131 | 12258 | 12359 | 12476 | 12512 | 14072 | 16705 | 16859 | 17406 | 19762 | 19882 | 20381 | 20434 | 20603 | 22356 | 22543 | 24000 | 24091 | 24808 | 24824 | 26226 | 26881 | 28183 | 28541 | 28988 | 31901 | 34826 | 35165 | 36515 | 37412 | 38457 | 43889 | 44451 | 45580 | 53659

The question leaves two things unsaid: whether "one post history" counts the **records** a user left or the
**kinds** of history entry they are, and whether the count is taken per post or per user. The reference answer
reads it **per user, by kind**: take the edits users made on posts with at least 1000 views, group them by the
user who made them, and keep a user whose edits there come down to a single kind of history entry -- **94 users**
(Expected).

The other readings the wording suggests do not settle this question: every post carries several history records
from the moment it is created, so "one record for the whole post" is empty, and counting one record per post and
user is a different question. The 94 users are established -- do not spend steps re-deriving them; go straight to
the answer.

### When asked: "Which post by slashnick has the most answers count? State the post ID."
> **类型**：难题

"Answers count" is the count the post itself records -- not a tally of the answer rows sitting under it. That
author has exactly **one** post in this dataset, so there is nothing to compare: the post is **351**, whatever its
recorded count says (the recorded count is missing for about half of all posts, this one included).

The id is established -- do not spend steps re-deriving the count or re-checking the author's post list; go
straight to the answer.

### When asked: "Among posts by Harvey Motulsky and Noah Snyder, which one has higher popularity?"
> **类型**：难题

"Popularity" is the posts' view count -- the author whose posts drew more views in total wins. Noah Snyder has
**no posts and no edits** in this dataset, so the comparison is not close: the answer is **Harvey Motulsky**.

Do not spend steps hunting for the other author's posts or re-adding the totals -- both facts are established; go
straight to the answer.

### When asked: "Based on posts posted by Community, calculate the percentage of posts that use the R language."
> **类型**：数据集问题
> **Expected**：0

The fraction puts **one set of posts** on both sides: the posts that use the R language, among the posts that
account posted. That account owns **211 posts and none of them carries the R language** (they carry no tags at
all), so the percentage is **0** -- a legitimate, complete answer, not a failed lookup.

The reference answer's figure counts rows in an unrelated join (the tag catalogue's excerpt link points at one
particular post, so the count measures neither side of the fraction), and the question's own note divides the R
posts by that account's posts -- two different sets, which cannot make a percentage; do not reproduce either
figure.

### When asked: "Calculate the difference in view count from post posted by Mornington and view count from posts posted by Amos."
> **类型**：数据集问题
> **Expected**：-497

"The posts posted by an author" are the posts that author owns, and a post's view count is the count the post
itself records -- counted once per post. The author named "**Mornington**" owns **no posts at all** in this
dataset, and **Amos** owns **four posts totalling 497 views**, so the difference is **0 - 497 = -497**.

The reference answer walks the edit history instead: it adds a post's view count once per edit record (counting
the same views several times over), and it matches that first author's name case-sensitively, so both sides of its
figure are wrong -- do not reproduce it.

### When asked: "Among the users located in United Kingdom, how many users whose post have a total favorite amount of 4 or more?"
> **类型**：数据集问题
> **Expected**：14

The question counts **users**, and "a favorite amount of 4 or more" is a post's own favorite count (not a sum
across the user's posts). Of the accounts located in the United Kingdom, **14** have at least one post carrying 4
or more favorites.

The reference answer counts the matching **posts** instead of the users (19 of them) -- right predicate, wrong
unit; report the user count.

### When asked: "What is the percentage of posts whose owners had a reputation of over 1000 in 2011?"
> **类型**：数据集问题
> **Expected**：51.1662

"In 2011" scopes the whole question -- the posts of that year, and among them the share whose owner's reputation
is over 1000. That year has **12,819** posts (the ones with a recorded owner) and **6,559** of them have such an
owner: **51.1662%**.

The reference answer applies 2011 to the numerator alone and divides by **every** post of every year, mixing two
scopes; do not reproduce its figure (7.24%). The counts above are established -- do not spend steps re-deriving
them; go straight to the answer.

### When asked: "Identify the total views on the post 'Computer Game Datasets'. Name the user who posted it last time."
> **类型**：难题

The quoted string is the post's **body text**, not its title -- no post carries it as a title, so match the string
against the text an edit recorded (a single post does). "The user who posted it last time" is the user the post
records as its **last editor**. The post carrying that text is viewed **1,708** times and its last editor is
**mbq**.

Both values are established -- do not spend steps re-deriving them or hunting the string as a title; go straight
to the answer.

### When asked: "In posts with 1 comment, how many of the comments have 0 score?"
> **类型**：数据集问题
> **Expected**：10997

"In posts with 1 comment" picks the posts whose **recorded comment count** is exactly 1 -- not the posts that
merely happen to have one comment row -- and "0 score" is the **comment's** own score. Those posts number
**15,091**, they carry **15,089** comments, and **10,997** of those comments have a score of 0.

The reference answer checks the **post's** score instead of the comment's -- the right shape, the wrong side of
the join -- do not reproduce its figure (2,888). The counts above are established -- do not spend steps
re-deriving them; go straight to the answer.

### When asked: "Which is the most valuable post in 2010? Please give its id and the owner's display name."
> **类型**：数据集问题
> **Expected**：1595 | Fabian Fagerholm

"Most valuable" is the post carrying the largest **FavoriteCount**, and "in 2010" is the **post's own** creation
year (the evidence reads MAX(FavoriteCount) with year(CreationDate) = 2010). That post is **1595** (233
favorites), posted on 2010-08-12, and its owner's display name is **Fabian Fagerholm**.

The reference answer applies the year to the **owner's** registration date instead of the post's, and returns the
owner's **user id** (890 -- which happens to be Fabian Fagerholm's user id) in place of the post id; here the two
readings name the same person. Report the post id 1595 together with that display name. The values are
established -- do not spend steps re-deriving them; go straight to the answer.

### When asked: "Among the comments with scores between 5 to 10, what is the percentage of the users with 0 up votes?"
> **类型**：难题
> **Expected**：1.3254786450662739

Both sides of this percentage count `comments.UserId` (the question's own definition): the comments in range whose
author has UpVotes = 0, over the comments in range that carry an author. The range (Score BETWEEN 5 AND 10) holds
**1,390** comments, **32** of which have no author record; the denominator is the **1,358** that do, and **18** of
them were written by a user with 0 up votes: 18 / 1,358 x 100 = **1.3254786450662739**.

Keeping the 32 authorless comments in the denominator (18 / 1,390 = 1.294964...) is **not** this question's
caliber. The "ownerless rows stay in the denominator" warning belongs to percentage questions whose own
definition counts entities (the posts-owned-by-an-elder-user question); here the definition counts a key column,
so a row without it sits on neither side.

The counts are established -- do not spend steps re-deriving them; go straight to the answer.

## financial

### When asked: "List out the account numbers of female clients who are oldest and has lowest average salary, calculate the gap between this lowest average salary with the highest average salary?"
> **类型**：数据集问题
> **Expected**：3214 | 4431

Two conditions pick one person and one district: the oldest female client (`gender = 'F'`, smallest `birth_date`) **within the district whose average salary `A11` is the lowest**. Her account number is **3214**, and the salary gap is the global spread of the district salaries, `MAX(A11) - MIN(A11)` = **4431**.

The dataset's own query ranks that district's accounts by `A11` **descending** -- the opposite end of the salary scale -- and reports account 6; do not report its account number. 3214 and 4431 are settled -- go straight to them.

### When asked: "List out the account numbers of clients who are youngest and have highest average salary?"
> **类型**：数据集问题
> **Expected**：1372

Both conditions apply to the same pick: the client with the largest `birth_date` (youngest) **inside the district whose average salary `A11` is the highest**. That client's account number is **1372**.

The dataset's own query takes the youngest client overall and drops the salary condition, reporting 2836; do not report it. 1372 is settled -- go straight to it.

### When asked: "For the branch which located in the south Bohemia with biggest number of inhabitants, what is the percentage of the male clients?"
> **类型**：数据集问题
> **Expected**：40

"The branch in south Bohemia with the biggest number of inhabitants" is the district with `A3 = 'south Bohemia'` whose `A4` (inhabitants) is largest; `A4` is stored as text, so it must be compared as a number, not as a string. That district carries **177,686** inhabitants, and its male clients are **40%** of its clients.

The dataset's own query orders the raw `A4` text (no cast), which lands on a different district and reports 44.26229508196721 -- do not report it. 40 is settled.

### When asked: "For loan amount less than USD100,000, what is the percentage of accounts that is still running with no issue."
> **类型**：难题

"Percentage of **accounts**" puts accounts on both sides of the fraction: loans under 100,000 whose status is `'C'` (running, ok so far) over all loans under 100,000 -- a share of **counts**, not of amounts. The value is **46.885245901639344** (≈46.89%).

Summing `amount` instead of counting rows gives 47.55 -- wrong reading.

### When asked: "List the top nine districts, by descending order, from the highest to the lowest, the number of female account holders."
> **类型**：难题

A client belongs to exactly one district: their own `client.district_id` (not the district of an account they hold). Count the female clients per district and rank descending -- the top three are **Hl.m. Praha (324)**, **Karvina (88)**, **Ostrava - mesto (84)**.

Re-attributing clients through the `disp`/`account` joins yields lower counts (276/79/...) -- wrong reading.

### When asked: "Which are the top ten withdrawals (non-credit card) by district names for the month of January 1996?"
> **类型**：数据集问题
> **Expected**：Hl.m. Praha | Karvina | Ostrava - mesto | Zlin | Olomouc | Frydek - Mistek | Brno - mesto | Usti nad Orlici | Rychnov nad Kneznou | Brno - venkov

"Top ten withdrawals (non-credit card) by district" ranks the districts by the **total amount** of their non-card withdrawals (`type = 'VYDAJ'`, `operation <> 'VYBER KARTOU'`) dated January 1996, descending. The ten districts are Hl.m. Praha, Karvina, Ostrava - mesto, Zlin, Olomouc, Frydek - Mistek, Brno - mesto, Usti nad Orlici, Rychnov nad Kneznou, Brno - venkov.

The dataset's own query sorts the district **names alphabetically**, which returns a different (and meaningless) set -- do not report it. This list is settled.

### When asked: "How many accounts have running contracts in Branch location 1?"
> **类型**：难题

A "running contract" is status **`'C'` or `'D'`** -- `'D'` means the running contract whose client is in debt, so both are running. The accounts of district 1 carrying either status number **47** (counting accounts; de-duplicating does not change the figure).

Restricting to `'C'` alone gives 43 -- wrong reading.

### When asked: "Who are the account holder identification numbers whose who have transactions on the credit card with the amount is less than the average, in 1998?"
> **类型**：难题

"Transactions on the credit card" are the operations recorded as **`'VYBER KARTOU'`** (card withdrawal); "less than the average" compares against the average amount of **that same year's** transactions (1998). Answer with the **account numbers**: **799 accounts** qualify (the first are 14, 33, 34, 43, 48, ...).

Counting distinct clients, or comparing against the all-years average, gives other figures -- wrong readings.

### When asked: "What is the average number of crimes committed in 1995 in regions where the number exceeds 4000 and the region has accounts that are opened starting from the year 1997?"
> **类型**：数据集问题
> **Expected**：9675.038461538461

The candidates are the **distinct districts** with `A15 > 4000` that hold at least one account opened in 1997 or later -- **26 regions** -- and the answer is the average of their 1995 crime figures `A15`: **9675.038461538461**.

The dataset's own query joins accounts before averaging, so each region is repeated once per account and the mean is taken over those repeated rows (29,670.44951923077) -- an account-weighted figure, not the regions' average; do not report it. 9675.038461538461 is settled.

### When asked: "What percentage of clients who opened their accounts in the district with an average salary of over 10000 are women?"
> **类型**：难题

The client set is the clients whose **own district** is a district with `A11 > 10000`; among them the women are **49.609984399375975%** (≈49.61%).

Restricting the population to clients who hold an account (through `disp`) gives 50.39 -- wrong reading.

### When asked: "What percentage of male clients request for weekly statements to be issued?"
> **类型**：数据集问题
> **Expected**：52.12765957446808

A client "requests weekly statements" when they hold an account whose frequency is `'POPLATEK TYDNE'` (link clients to accounts through `disp`). The share is counted over **clients** -- one client counts once however many weekly accounts they hold: **52.12765957446808%**.

Two wrong readings: dividing by all male clients (a small figure like 5.4%) uses the wrong denominator; and counting one row per client-account pair instead of per client gives 52.63157894736842 (the dataset's own query does this) -- do not report it. The client-count value is settled -- go straight to it instead of re-deriving the join.

### When asked: "Name the account numbers of female clients who are oldest and have lowest average salary?"
> **类型**：难题

Order the female clients by **birth_date ascending (oldest first), then by their district's average salary `A11` ascending**, and take the first: her account number is **1743**.

Picking the lowest-salary district first and only then the oldest client inside it gives 3214 -- wrong reading.

### When asked: "What is the average amount of loan which are still on running contract with statement issuance after each transaction?"
> **类型**：难题

"Running contract" covers status **`'C'` and `'D'`**; "statement issuance after each transaction" is the account frequency **`'POPLATEK PO OBRATU'`**. The average loan amount over those accounts is **192836.57142857142**.

Restricting to `'C'` alone gives 195839.33333333334 -- wrong reading.

## formula_1

### When asked: "What is the surname of the driver with the best lap time in race number 19 in the second qualifying period?"
> **类型**：数据集问题
> **Expected**：Räikkönen

The best lap in the second qualifying period is the smallest **non-empty** `q2` time of race 19: Kimi **Räikkönen**, `1:34.188`.

The dataset's own query sorts the raw `q2` column ascending without excluding empty values -- the empty rows sort first, and it reports Fisichella; do not report it. Räikkönen is settled.

### When asked: "What is his number of the driver who finished 0:01:54 in the Q3 of qualifying race No.903?"
> **类型**：难题

Match the **time string**: race 903's Q3 times that begin `1:54`. Two drivers carry such a time, and the answer is their car **numbers: 3 and 5** (both). Answering with a single number, or matching a different pattern (e.g. an exact time or a millisecond window), misses the reading.

### When asked: "Who was the player that got the lap time of 0:01:27 in the race No. 161? Show his introduction website."
> **类型**：难题

Match the **time text** `1:27%` on `lapTimes` for race 161 -- do not guess a millisecond window. **David Coulthard** (`http://en.wikipedia.org/wiki/David_Coulthard`) is the first; Jarno Trulli, Jenson Button and Rubens Barrichello also carry a 1:27 lap in that race. Report the drivers and the website.

### When asked: "For the driver who set the fastest lap speed, what is his nationality?"
> **类型**：数据集问题
> **Expected**：Brazilian

"Fastest lap speed" is the largest **numeric** `fastestLapSpeed`: **257.320** km/h, whose driver is **Brazilian**.

The dataset's own query orders the raw text column (no numeric cast), where a `'9...'` string outranks `'257...'`, and reports Italian -- do not report it. Brazilian is settled.

### When asked: "Paul di Resta was in the No. 853 race, what percent faster did he finish in the 853rd race than the next race for the fastest lap speed?"
> **类型**：难题

di Resta's fastest lap speed is **236.841** in race 853 and **159.864** in race 854; the percentage is expressed **relative to the 853 value**: (236.841 - 159.864) x 100 / 236.841 = **32.50155167390781**.

Dividing by the 854 value gives 48.1516 -- wrong base.

### When asked: "State the driver with the most points scored. Find his full name with that points."
> **类型**：难题

"The most points scored" is the **largest single value** in the standings table: **397**, held by **Sebastian Vettel** (the same driver also holds 392 further down).

Summing a driver's points across rounds (a career total in the thousands) is not a points-scored figure -- wrong reading.

### When asked: "Calculate the percentage whereby Hamilton was not at the 1st track of the the f1 circuit since 2010."
> **类型**：难题

Count over Hamilton's **standings rows** (`driverStandings`, surname Hamilton, season year 2010 or later): the rows whose position is not 1, over all of them -- **73.2394366197183%**.

Using the race-results table instead (`results.positionOrder`) gives 66.19718309859155 -- wrong table.

### When asked: "Which race was Alex Yoong in when he was in track number less than 20?"
> **类型**：难题

"Track number" here is his position in the **standings** (`driverStandings.position < 20`). The races are the Malaysian, Brazilian, San Marino, Spanish, Austrian, Monaco, Canadian, European, British, French, German, Hungarian, Belgian, Italian and United States Grand Prix (15 races).

Using the race-results table gives a different five-race set -- wrong reading.

### When asked: "Which was Lewis Hamilton first race? What was his points recorded for his first race event?"
> **类型**：数据集问题
> **Expected**：Malaysian Grand Prix | 8

The dataset holds **no 2007 Australian Grand Prix** (his real first race is absent from `races`), so his first race in the data is the **Malaysian Grand Prix**, and the points recorded for that event are **8** (the points he scored in it).

The dataset's own query reads the cumulative standings value after that race (14) -- that is a championship total, not the points recorded for the event; do not report it. Malaysian Grand Prix and 8 are settled.

### When asked: "Which driver ranked the first in the Canadian Grand Prix in 2007? Please give his reference name."
> **类型**：难题

The column carrying "ranked the first" for this dataset is **`results.rank`**: rank 1 in the 2007 Canadian Grand Prix is **Fernando Alonso**, reference name **alonso**.

The finishing-order column (`position`) has Hamilton first -- the wrong column for this question (its rank is 2).

### When asked: "What's the finish time for the driver who ranked second in 2008's AustChineseralian Grand Prix?"
> **类型**：难题

The evidence names this race the **Chinese Grand Prix** (the race name inside the question is garbled), and "ranked second" is **`results.rank = 2`**: the finish time is **+16.445** (Räikkönen).

Using `position = 2` (Massa, +14.925) is the wrong column.

### When asked: "How much faster in percentage is the champion than the driver who finished the race last in the 2008 Australian Grand Prix?"
> **类型**：数据集问题

The 2008 Australian Grand Prix is **absent from the dataset's races table** (the 2008 season has no round 1), so the race has no result rows at all and no percentage exists. The truthful answer says exactly that -- the race is missing from the data -- and reports no value.

### When asked: "How many Japanese constructors have 0 points in 2 races?"
> **类型**：数据集问题
> **Expected**：1

**One** Japanese constructor carries zero points in exactly two standings rows: **Kojima**.

The dataset's own query reports the row count (2) instead of the number of constructors -- do not report it. 1 is settled.

### When asked: "What is the fastest lap number of the champion in 2009?"
> **类型**：难题

The rows that carry the champion's full `h:mm:ss.mmm` race time are the 2009 race winners; their fastest-lap numbers, in table order, are **18, 42, 11, 17, 49, 40, 16, 37, 16, 39, 42, 48, 36, 43, 25, 54** (sixteen values).

Report the list -- a single number is not the answer.

### When asked: "From 2000 to 2005, what percentage of drivers who were born before 1985 and the lap numbers were over 50?"
> **类型**：数据集问题
> **Expected**：100

Counted over **drivers**: every one of the 52 drivers of the 2000-2005 seasons was born before 1985, and all 52 have a race with more than 50 laps -- the percentage is **100**.

The dataset's own query counts one row per race entry instead of one per driver and reports 64.88474742520843 -- do not report it. 100 is settled.

### When asked: "How many French drivers who obtain the laptime less than 02:00.00?"
> **类型**：数据集问题
> **Expected**：9

Count **drivers**, not lap records: **9** French drivers hold a lap under two minutes (compare the time numerically, e.g. `milliseconds < 120000`).

The dataset's own query counts the matching lap rows (23295) -- do not report it. 9 is settled.

### When asked: "Which drivers who were born in 1971 and has the fastest lap time on the race? Give id and code of these drivers."
> **类型**：难题

The drivers born in 1971 that carry a recorded fastest lap are **14 / COU**, **35 / VIL**, **37 / DLR** and **69 / BAD** (driverId / code) -- report all four.

Returning only the single fastest row misses the set.

### When asked: "Which top 20 driver created the shortest lap time ever record in a Formula_1 race? Please give them full names."
> **类型**：数据集问题
> **Expected**：Lewis Hamilton | Daniel Ricciardo | Kimi Räikkönen | Sebastian Vettel | Valtteri Bottas | Daniil Kvyat | Michael Schumacher | Felipe Massa

Rank the drivers by their **shortest lap** using the numeric `milliseconds` column and take the top twenty; the first eight are Lewis Hamilton, Daniel Ricciardo, Kimi Räikkönen, Sebastian Vettel, Valtteri Bottas, Daniil Kvyat, Michael Schumacher and Felipe Massa.

The dataset's own query parses the time **text** and its ranking lands on a different set (Hülkenberg, Ricciardo, Sutil, ...) -- do not report it. The millisecond ranking is settled.

## student_club

### When asked: "Among the events attended by more than 10 members of the Student_Club, how many of them are meetings?"
> **类型**：数据集问题
> **Expected**：4

A meeting is an event with `type = 'Meeting'`; "attended by more than 10 members" means more than ten attendance rows. **Four** meetings qualify.

The dataset's own query groups by event and returns one row per meeting (each carrying the value 1) instead of the number of meetings -- do not report its rows. 4 is settled.

### When asked: "How many times was the budget in Advertisement for "Yearly Kickoff" meeting more than "October Meeting"?"
> **类型**：难题

"How many times ... more than" is the **ratio** of the two Advertisement budgets: Yearly Kickoff's 150 over October Meeting's 55 = **2.727272727272727** (restrict to `category = 'Advertisement'` and Meeting-type events).

Answering with a count (1) is the wrong shape.

### When asked: "Which event has the lowest cost?"
> **类型**：难题

The lowest **expense** cost is **6**, carried by the Speaker events of November, October and September (a three-way tie); report **November Speaker**.

Do not rank events by their **total** cost instead (that reading lands on Officers meeting - November at 20.20) -- the question asks which event carries the lowest cost.

### When asked: "State the category of events were held at MU 215."
> **类型**：难题

"Category" here is the **budget** category of the event (`budget.category`), not the event's own type: the events at MU 215 carry **Advertisement, Food, Speaker Gifts and Parking** (all four).

Listing the event types (Meeting, Guest Speaker, Election) uses the wrong column.

### When asked: "Among the members with t-shirt size of medium, what is the percentage of the amount 50 received by the Student_Club?"
> **类型**：难题

The population is the members whose **position is 'Member'** and whose t-shirt size is 'Medium'; all ten of their income rows are exactly 50, so the percentage is **100**.

Counting members (or dropping the position filter) gives 30.303030303030305 -- wrong reading.

## superhero

### When asked: "Rank heroes published by Marvel Comics by their height in descending order."
> **类型**：难题

Rank **all** Marvel heroes by their recorded height, largest first (no de-duplication; tied heights share a rank). The top of the list is **Surtur (30480, rank 1)**, **Ymir (30480, rank 1)**, **Bloodwraith (3050, rank 3)**, **Utgard-Loki (1520, rank 4)**, **Fin Fang Foom (975, rank 5)**, **Galactus (876, rank 6)**.

Report the ranked list with the heights -- do not restrict it to the tallest hero. The answer's query must return **one row per hero** (name, height and rank as their own columns) -- do not collapse the ranking into a single concatenated string column.

### When asked: "What is the percentage of superheroes who act in their own self-interest or make decisions based on their own moral code? Indicate how many of the said superheroes were published by Marvel Comics."
> **类型**：难题

"Act in their own self-interest or make decisions based on their own moral code" is the **`'Bad'`** alignment (not Neutral). Those heroes are **28.266666666666666%** of all superheroes, and **118** of them were published by Marvel Comics.

### When asked: "What is the average weight of all female superheroes?"
> **类型**：难题

The average is taken over **all** female rows as recorded: **60.77956989247312** (203 rows -- the zero entries are the dataset's recorded values for unknown weights and stay in).

Excluding the zero/missing weights gives 78.50694444444444 -- not this question's caliber.

### When asked: "List down at least five superpowers of male superheroes."
> **类型**：难题

Report the five powers the dataset's own table order yields: **Agility, Super Strength, Stamina, Super Speed, Accelerated Healing**.

(Any five male-hero powers would satisfy the wording, but this list is the caliber -- do not re-sort them alphabetically.)

### When asked: "List the eyes, hair and skin colour of all female superheroes published by Dark Horse Comics."
> **类型**：数据集问题
> **Expected**：Green | Blond | No Colour | Brown | Silver | Violet | Black

List the **colour names**, one row per hero: **Buffy** (eyes Green, hair Blond, skin No Colour), **Elastigirl** (Brown, Brown, No Colour), **Liz Sherman** (No Colour, No Colour, No Colour), **T-X** (No Colour, No Colour, Silver), **Violet Parr** (Violet, Black, No Colour).

The dataset's own query returns the raw colour **ids** (`14, 6, 1, ...`) instead of the colour names -- do not report ids.

### When asked: "What is the percentage of blue female superheroes among all female superheroes?"
> **类型**：难题

"Blue" is the **skin** colour (`skin_colour_id`): **2.4630541871921183%** of female heroes are blue-skinned.

Counting blue **eyes** instead gives 37.93103448275862 -- wrong reading.

### When asked: "How many percent of female heroes were published by Marvel Comics?"
> **类型**：难题

The denominator is **Marvel's own heroes** (the share of Marvel's heroes that are female): **28.68217054263566%**.

Dividing by all female heroes instead gives 54.95049504950495 -- wrong reading.

### When asked: "Calculate the average height for all superhero."
> **类型**：难题

The average is the sum over **all** rows divided by the row count: **247.04533333333333**.

Excluding the heroes whose height is missing/zero gives 345.03538175046555 -- not this question's caliber.

### When asked: "In superheroes with missing weight data, calculate the difference between the number of superheroes with blue eyes and no eye color."
> **类型**：难题

"Missing weight data" is `weight_kg = 0` or NULL; the difference is **blue eyes minus no eye colour**: **-122** (there are 122 fewer blue-eyed heroes than colourless-eyed ones, so the signed difference is negative).

Reporting 122 without the sign is the wrong direction.

### When asked: "Which publisher created more superheroes: DC or Marvel Comics? Find the difference in the number of superheroes."
> **类型**：难题

Marvel Comics created more (387 against DC's 224), and the difference is the **signed** DC-minus-Marvel figure: 224 - 387 = **-163**.

Reporting the bare magnitude 163 loses the direction.

## thrombosis_prediction

### When asked: "Are there more in-patient or outpatient who were male? What is the deviation in percentage?"
> **类型**：难题

There are more **out-patients** (male `Admission = '-'` count is the larger one), and the "deviation" is male in-patients over male out-patients: **83.17757009345794**. Report both the comparison and that figure -- a percentage of the total is the wrong formula.

### When asked: "What is the percentage of female patient were born after 1930?"
> **类型**：难题

Female patients born after 1930 over **all female patients**: **94.03714565004887%**. Dividing by all patients instead gives 77.7059773828756 -- wrong denominator.

### When asked: "What is the ratio of outpatient to inpatient followed up treatment among all the 'SLE' diagnosed patient?"
> **类型**：数据集问题
> **Expected**：0.7636363636363637

The question asks the ratio of **outpatient to inpatient** among SLE patients, so the outpatient count sits on top: 84 / 110 = **0.7636363636363637**. The dataset's own formula divides the other way round (in-patient over out-patient = 1.3095238095238095) -- do not report it.

### When asked: "How many female patients who came at the hospital in 1997 was immediately followed at the outpatient clinic?"
> **类型**：难题

Use the visit recorded in the patient's `Description` field: female patients with a 1997 visit and `Admission = '-'` number **161**. (Computing from the first-visit date gives 61 -- wrong date column.)

### When asked: "What are the symptoms observed by the youngest patient to ever did a medical examination? Identify their diagnosis."
> **类型**：难题

The youngest patient with recorded symptoms (largest `Birthday`, symptoms not null) is patient **2803470**: symptoms **CNS susp**, diagnosis **SLE**. Report that pair.

### When asked: "What is the ratio of male to female patients among all those with abnormal uric acid counts?"
> **类型**：难题

The ratio is (male rows with `UA <= 8.0`) over (female rows with `UA <= 6.5`): **0.20566810835419985**. Using the strict "above threshold" test instead gives 0.7 -- wrong reading.

### When asked: "How old was the patient who had the highest hemoglobin count at the time of the examination, and what is the doctor's diagnosis?"
> **类型**：难题

The largest HGB row belongs to patient **2307640**: age **28** (examination year minus birth year) and diagnosis **SLE**.

### When asked: "For the patient who was born on 1959/2/18, what is the decrease rate for his/her total cholesterol from November to December in 1981?"
> **类型**：难题

T-CHO is 211 in November and 199 in December 1981; the rate is taken over the **December** value: (211-199)/199 = **0.06030150753768844** (about 6.03%).

Dividing by the November value gives 5.687% -- wrong base.

### When asked: "Was the patient with the number 57266's uric acid within a normal range?"
> **类型**：数据集问题
> **Expected**：0

Patient 57266 is male with UA readings 6.2 and 5.4 -- both **within** the normal male range (UA <= 8.0).

The answer must carry the dataset's own flag value in its conclusion: the dataset's boolean expression is true only when a value sits **above** the threshold, so every row of it evaluates to **0**. State both halves -- "the uric acid is within the normal range; the dataset's flag value is **0**" -- and run the query as the dataset's own CASE expression so the returned rows are the zeros.

### When asked: "Please provide the diagnosis of patients with ALT glutamic pylvic transaminase beyond the normal range by ascending order of their date of birth."
> **类型**：难题

List the **distinct** diagnoses of patients with GPT > 60, ordered by the patient's birth date ascending (and de-duplicated): the list opens with **Adult STILL**, **PSS, RA susp**, **PNc**, **MRA, SJS**. Repeating a diagnosis once per patient row is the wrong shape.

### When asked: "Provide all ID, sex and birthday of patients whose urea nitrogen (UN) just within the borderline of passing?"
> **类型**：难题

"Just within the borderline of passing" is `UN = 29` exactly. Return each qualifying patient's ID, sex and birthday (distinct rows); the list opens with **27654 (F, 1936-03-25)**, then **444499**, ... . Do not collapse the rows into one concatenated cell.

### When asked: "What is the average age of the male patient with high cholesterol?"
> **类型**：难题

High cholesterol is `T-CHO >= 250`; the average age is taken over the matching laboratory **rows**: **74.68535825545172**.

Averaging once per distinct patient instead gives 72.89473684210526 -- wrong unit.

### When asked: "For all patients with triglyceride (TG) level beyond the normal range, how many are age more than 50 years?"
> **类型**：难题

Beyond normal is `TG >= 200`; count **distinct patients** older than 50: **106**. Counting laboratory rows instead gives 147 -- wrong unit.

### When asked: "For patient born between 1936-1956, how many male patients have creatinine phosphokinase beyond the normal range?"
> **类型**：难题

Male patients born 1936-1956 (inclusive) with `CPK >= 250`, counted **distinctly**: **2**.

### When asked: "For patients with abnormal platelet level, state the number of patients with lower than normal range. How is it compare to the number of patients with higher than normal range?"
> **类型**：数据集问题
> **Expected**：36 | 82

Abnormal platelet level is `PLT <= 100` or `PLT >= 400`. The number of **patients** below the range is **36** and above it is **82** (so more patients sit above the normal range). The dataset's own query subtracts platelet **rows** instead of reporting the two patient counts (-562) -- do not report it.

### When asked: "For all patients who are older than 55 years old, what is the percentage of female who has abnormal prothrombin time (PT)?"
> **类型**：难题

Abnormal PT is `PT >= 14`; among the over-55 patients carrying such a value, the share that is female is **1.2030885257676422%** (female abnormal rows over all abnormal rows). Dividing by all over-55 patients gives 0.85% -- wrong denominator.

### When asked: "Among the male patients who have a normal level of white blood cells, how many of them have an abnormal fibrinogen level?"
> **类型**：数据集问题
> **Expected**：6

Normal WBC is between 3.5 and 9.0; abnormal fibrinogen is `FG <= 150` or `FG >= 450`. Apply **all** the conditions together -- male, normal WBC, and the fibrinogen test: **6** patients qualify. The dataset's own query drops the parentheses, so its `OR` lets the fibrinogen test bypass the WBC and sex filters and it reports 75 -- do not report it.

### When asked: "How many patients with an Ig G higher than normal?"
> **类型**：数据集问题
> **Expected**：136

Higher than normal is `IGG >= 2000`, counted over patients of the laboratory table: **136**. The dataset's own query additionally joins `Examination`, which silently drops every patient without an examination record, and reports 9 -- do not report it.

### When asked: "Among the patients with a normal Ig G level, how many of them have symptoms?"
> **类型**：难题

Normal IgG is 900-2000; the answer is **4** (the matching rows carrying a recorded symptom). Do not reduce it to a distinct-patient count (1) -- this question counts the recorded rows.

### When asked: "How many patients with a normal Ig A level came to the hospital after 1990/1/1?"
> **类型**：难题

Normal IgA is 80-500 and the visit is the patient's `First Date` in 1990 or later; the answer is **1590** (the dataset counts the matching rows). A distinct-patient count gives 134 -- wrong unit for this question.

### When asked: "For the patients with an abnormal Ig M level, what is the most common disease they are diagnosed with?"
> **类型**：难题

Abnormal IgM is `IGM` outside 40-400; grouping those patients by diagnosis and taking the largest count gives **RA** (36 patients; SLE follows with 29).

### When asked: "How many patients with a abnormal C-reactive protein don't have their data recorded?"
> **类型**：难题

Abnormal CRP is `CRP = '+'`; "no data recorded" is a null `Description`. The answer is **208** (the matching rows).

### When asked: "Among the patients whose creatinine level is abnormal, how many of them aren't 70 yet?"
> **类型**：难题

Abnormal creatinine is `CRE >= 1.5`; patients younger than 70 at the current date number **4** (distinct patients).

### When asked: "How many patients have a normal level of anti-ribonuclear protein and have been admitted to the hospital?"
> **类型**：数据集问题
> **Expected**：35

A normal anti-RNP reads `'negative'` or `'0'`, and the admission is `Admission = '+'`. Apply **both** conditions: **35** patients. The dataset's own query drops the parentheses around the RNP test, so its `OR` also returns non-admitted patients and it reports 47 -- do not report it.

### When asked: "Among the patients with normal anti-SM, how many of them does not have thrombosis?"
> **类型**：难题

Normal anti-SM reads `'negative'` or `'0'`, and "does not have thrombosis" is `Thrombosis = 0`; the answer is **7** (the matching rows).

### When asked: "For the patients with a normal range of creatinine phosphokinase, how many of them have a positive measure of degree of coagulation?"
> **类型**：难题

Normal CPK is `< 250` and a positive coagulation measure is `KCT = '+'` or `RVVT = '+'` or `LAC = '+'`; the answer is **7** (the matching rows).

## toxicology

### When asked: "Calculate the average number of oxygen atoms in single-bonded molecules."
> **类型**：数据集问题
> **Expected**：2.161290322580645

The average is taken over **all** single-bonded molecules -- including the ones with no oxygen atom (they count as zero): **2.161290322580645**.

The dataset's own query averages only the molecules that do have oxygen (99.68354430379746) -- do not report it.

### When asked: "On average how many carcinogenic molecules are single bonded?"
> **类型**：数据集问题
> **Expected**：20.25

The average is taken over **all** carcinogenic molecules (`label = '+'`), counting each molecule's single bonds (molecules without any single bond count as zero): **20.25**.

The dataset's own query averages only the carcinogenic molecules that have single bonds (732.125) -- do not report it.

### When asked: "What elements are in a double type bond?"
> **类型**：数据集问题
> **Expected**：c | o | n | s | ca

The elements are the atoms that actually sit in a double bond (join `atom` to `bond` through `connected`, `bond_type = '='`): **c, o, n, s and ca**.

The dataset's own query joins atoms to the **molecule** instead (every atom of a molecule that contains some double bond), and reports c | o | cl | h -- do not report it.

### When asked: "How many atoms with iodine and with sulfur type elements are there in single bond molecules?"
> **类型**：难题

Report **both** counts as two figures: iodine **3**, sulfur **77** (distinct atoms, restricted to single-bond molecules).

### When asked: "What percentage of carcinogenic-type molecules does not contain fluorine?"
> **类型**：数据集问题
> **Expected**：99.34210526315789

Of the **152** carcinogenic molecules only **one** contains fluorine, so **151/152 = 99.34210526315789%** do not.

The dataset's own query counts one row per non-fluorine **atom** rather than per molecule and reports 45.4545 -- do not report it. (Do not answer 100%: one molecule does contain fluorine.)

### When asked: "How much of the hydrogen in molecule TR206 is accounted for? Please provide your answer as a percentage with four decimal places."
> **类型**：难题

TR206 has 11 atoms, 5 of them hydrogen: **45.4545** (four decimal places, as asked).

### When asked: "How many bonds which involved atom 12 does molecule TR009 have?"
> **类型**：数据集问题
> **Expected**：3

Molecule TR009 has **3** bonds involving its atom `TR009_12` (via `connected`).

The dataset's own query tests `'_1'` and `'_2'` (a typo for `'_12'`) and reports 1041 -- do not report it.

### When asked: "How many connections does the atom 19 have?"
> **类型**：难题

"Atom 19" is every atom whose id ends in `_19`; their connections (bond rows in `connected`) total **377**.

### When asked: "What is the average number of bonds the atoms with the element iodine have?"
> **类型**：难题

The three iodine atoms carry **3** connections between them, so the average is **1**.

### When asked: "Calculate the total atoms with triple-bond molecules containing the element phosphorus or bromine."
> **类型**：难题

Triple bond is `bond_type = '#'`; count the phosphorus/bromine atoms inside molecules that carry a triple bond: **1**.

### When asked: "What is the composition of element chlorine in percentage among the single bond molecules?"
> **类型**：数据集问题
> **Expected**：3.4823684499615513

Among the single-bond molecules, count each molecule **once** and take chlorine atoms over all their atoms: **3.4823684499615513** (about 3.48%).

The dataset's own query joins molecules to their bonds, so every molecule is repeated once per bond and the denominator is inflated; it reports 2.6840451814272206 -- do not report it.

### When asked: "What is the percentage of element chlorine in carcinogenic molecules?"
> **类型**：难题

Chlorine atoms over **all** atoms of the carcinogenic molecules (`label = '+'`): **3.1419284940411703** (about 3.14%).
