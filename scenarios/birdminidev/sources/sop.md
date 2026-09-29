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

City ("Fremont") is on the school master as well; the answer is one count.

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
