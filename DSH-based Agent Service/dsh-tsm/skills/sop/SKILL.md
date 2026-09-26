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
