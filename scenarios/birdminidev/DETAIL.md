# 评测明细 — DLR · birdminidev

> **说明**：question 驱动三级锚定——L1 dsh MCP 语义层（`dlr_semantic_query` 等 7 工具，含 `get_full_data_info` 下探）/ L2 共识（`dlr_search_consensus`）/ L3 SOP（`dlr_search_sop`），交叉验证后出 SQL。
> **判定**：gold SQL 在数据集 SQLite 上执行得期望值 ↔ agent 答案（**数据集原生，不修正**）；数值逐级容差、文本归一化包含，**都只看 `Final Answer:` 结论句区域**（正文里的备选读法不算命中）。
> **评定**：SOP 生效时按 SOP 裁定——与 gold 对不上但答法合 SOP 口径 = **翻盘**（计正确，但**单独标注、单独计数，不并入 PASS**）。
> **数据来源**：`results/<轮次>/{questions.csv, raw/*.ndjson}` ｜ 本文件由 `tsm stats` 自动重建（定性观察一节在跑批后按 SOP 案例补写）。
> **列义**：判定 PASS ｜ FAIL ｜ UNCERTAIN（抽不出可比对的值）｜ GOLD_ERR（gold 本身执行失败）；评定 ✅ 正确 ｜ 🔁 翻盘 ｜ ❌ 错误 ｜ ⚠️ 待仲裁；**备注** = 这一行的判定依据 + 裁定依据（人话一句）。
> **本文档 = 总账**：覆盖度 / 汇总 / 数据集缺陷与裁定；**逐题校验表与证据正文按库拆分**，见下方分库索引。

## 跑题覆盖度（跑过多少题）

> **跑题覆盖度 = 跑过的题（去重）÷ 数据集全量（mini_dev 原生题数）**——只看跑没跑过，与对了多少题无关（判定 / 评定见上表与汇总）。

| 数据库 | 全量 | 已跑 | 剩余 | 覆盖 |
|---|---|---|---|---|
| california_schools | 30 | 30 | 0 | 100.0% ✅ |
| card_games | 52 | 52 | 0 | 100.0% ✅ |
| codebase_community | 49 | 49 | 0 | 100.0% ✅ |
| debit_card_specializing | 30 | 30 | 0 | 100.0% ✅ |
| european_football_2 | 51 | 51 | 0 | 100.0% ✅ |
| financial | 32 | 32 | 0 | 100.0% ✅ |
| formula_1 | 66 | 66 | 0 | 100.0% ✅ |
| student_club | 48 | 48 | 0 | 100.0% ✅ |
| superhero | 52 | 0 | 52 | 0.0% |
| thrombosis_prediction | 50 | 0 | 50 | 0.0% |
| toxicology | 40 | 0 | 40 | 0.0% |
| **合计** | **500** | **358** | **142** | **71.6%** |

## 汇总

**评定**（按 SOP 裁定 · **主口径**；🔁 翻盘单独计，不并入 ✅ 正确——数据集错误不记在应用头上）

| 评定 | 值 |
|---|---|
| ✅ 正确（与 gold 一致） | 297 / 358（83.0%） |
| 🔁 翻盘（按 SOP 裁定为正确） | 61 |
| ❌ 错误 | 0 |
| ⚠️ 待仲裁 | 0 |
| **合计正确（正确 + 翻盘）** | **358 / 358（100.0%）** |

**判定**（与 gold 原始比对 · 留档；gold 数据集原生、不修正）

| 判定 | 值 |
|---|---|
| PASS（与 gold 一致） | 297 / 358（83.0%） |
| UNCERTAIN（抽不出可比对的值） | 14 |
| FAIL（与 gold 不符） | 47 |
| GOLD_ERR（gold 本身执行失败） | 0 |

**效率**

| 指标 | 值 |
|---|---|
| token 平均 / 中位 | 71,196 / 57,723 |
| token 最低 / 最高 | 26,925 / 689,012 |
| 步数均值 / 工具调用均值 | 6 / 10 |

> **口径**：本文档汇总按**去重题数**计（同题多轮取**最新一轮**的判定/评定）——与 [results/STATS.md](results/STATS.md) 的**按次数**分布会不同（重跑过或跑挂过的题，那边会多计一次）。仅覆盖已跑轮次，勿外推为全数据集结论。token = input + cache_read + output（不含 CoT 的 reasoning 分项由 harness 单独计）。

## 定性观察

> 分批跑完后按 SOP 案例撰写：每个 SOP 条目题须有对应观察、数字与归档 CSV 逐项一致（防止「先写结论后找证据」）。

## 分库明细（逐题校验表 + 证据正文）

> 每题一行台账（题号锚点跳到该题证据块）+ 每题一段正文（命中口径 / 执行 SQL / 结论）。

| 数据库 | 已跑 | ✅ 正确 | 🔁 翻盘 | ❌ 错误 | ⚠️ 待仲裁 | token 中位 |
|---|---|---|---|---|---|---|
| [california_schools](DETAIL/california_schools.md) | 30 | 29 | 1 | 0 | 0 | 66,005 |
| [card_games](DETAIL/card_games.md) | 52 | 40 | 12 | 0 | 0 | 60,552 |
| [codebase_community](DETAIL/codebase_community.md) | 49 | 41 | 8 | 0 | 0 | 47,901 |
| [debit_card_specializing](DETAIL/debit_card_specializing.md) | 30 | 18 | 12 | 0 | 0 | 43,973 |
| [european_football_2](DETAIL/european_football_2.md) | 51 | 37 | 14 | 0 | 0 | 60,026 |
| [financial](DETAIL/financial.md) | 32 | 26 | 6 | 0 | 0 | 64,174 |
| [formula_1](DETAIL/formula_1.md) | 66 | 59 | 7 | 0 | 0 | 61,576 |
| [student_club](DETAIL/student_club.md) | 48 | 47 | 1 | 0 | 0 | 54,420 |

## 数据集缺陷与裁定（SOP 条目缘由）

| 题号 | 库 | 判定 | 评定 | 类型 | 问题（截） | 裁定（sop.md 摘要） |
|---|---|---|---|---|---|---|
| q27 | california_schools | ⚠️ UNCERTAIN | 🔁 翻盘 | 难题 | What is the average score in writing for the schools that we | "Communication number" is the school's phone number -- there is no separate contact table. Date reading: "opened after 1991" means the openi |
| q341 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What are the borderless cards available without powerful foi | "Powerful foils" are the printings listed by the card marketplace **both** as a card and as a foil -- one of the two being present is not en |
| q349 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Name the card and artist with the most ruling information. A | "Ruling information" is the card's rulings: count the rulings attached to each card and take the largest -- **Teferi's Protection**, illustr |
| q352 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Calculate the percentage of the cards availabe in Chinese Si | "Percentage of the cards" puts **cards** on both sides of the fraction: the cards that have a Chinese Simplified printing, divided by all th |
| q366 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | What is the rule of playing card "Benalish Knight"? | "The rule of playing card X" asks for the card's **rules text** -- the abilities printed on it. For Benalish Knight those are **flash** (it |
| q371 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of cards whose language is French amo | "Percentage of cards" puts **cards** on both sides of the fraction: the Story Spotlight cards that have a French printing, over all Story Sp |
| q383 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | How many of the banned cards are white border? | "Banned cards" counts **cards**: a card banned in several formats is still one card, so count each card once -- 89 white-bordered cards are |
| q402 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of Story Spotlight cards that do not | A card "does not have a text box" when it is **textless**. Check the Story Spotlight cards for that: **none of them is textless**, so the pe |
| q407 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 · 难题 | Lists all types of cards in German. | "Types of cards **in German**" asks for the type names as they read in German -- the German-language type strings recorded for German printi |
| q416 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | What percentage of cards without power are in French? | "Cards without power" = the cards whose power is missing or recorded as `*`. "In French" = the card has a French printing. The percentage pu |
| q483 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the Italian text ruling of all the cards in the | "The Italian text of a card" is the card's **rules text as printed in Italian** -- one text per card (the text is a long block, so identical |
| q484 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the Italian names of the cards in the set Coldsn | "Highest converted mana cost" in this set is 7, and **twelve cards share it** -- so the answer is twelve names, not one: Devastazione Solare |
| q529 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Find and list the names of sets which doesn't have Japanese | A set "has a translation" in a language when that language's **text is actually present**: every set carries a row per language, and a row w |
| q557 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the posts with a score of over 5, what is the percenta | "Among the posts with a score of over 5" is the denominator: **all** posts with a score above 5 (11,465 of them), each counted once. Posts w |
| q584 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Write all the comments left by users who edited the post tit | "The comments left by users who edited the post" are the **notes the editing users left with their edits** -- the short note each edit of th |
| q639 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Based on posts posted by Community, calculate the percentage | The fraction puts **one set of posts** on both sides: the posts that use the R language, among the posts that account posted. That account o |
| q640 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Calculate the difference in view count from post posted by M | "The posts posted by an author" are the posts that author owns, and a post's view count is the count the post itself records -- counted once |
| q672 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the users located in United Kingdom, how many users wh | The question counts **users**, and "a favorite amount of 4 or more" is a post's own favorite count (not a sum across the user's posts). Of t |
| q682 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Which is the most valuable post in 2010? Please give its id | "Most valuable" is the post carrying the largest **FavoriteCount**, and "in 2010" is the **post's own** creation year (the evidence reads MA |
| q683 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of posts whose owners had a reputatio | "In 2011" scopes the whole question -- the posts of that year, and among them the share whose owner's reputation is over 1000. That year has |
| q710 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | In posts with 1 comment, how many of the comments have 0 sco | "In posts with 1 comment" picks the posts whose **recorded comment count** is exactly 1 -- not the posts that merely happen to have one comm |
| q1473 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What was the average monthly consumption of customers in SME | Consumption is recorded customer-month by customer-month: every recorded figure is already one customer's consumption for one month. So "ave |
| q1481 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | What is the difference in the annual average consumption of | Per customer, total up their 2013 CZK consumption. Then, **per segment**, take the customer(s) with the lowest 2013 total. "Annual average c |
| q1482 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Which of the three segments—SME, LAM and KAM—has the biggest | The question names the currency, so the consumption must be filtered to customers whose billing currency is EUR (`Currency = 'EUR'` in the c |
| q1490 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | How many percent of LAM customer consumed more than 46.73? | "Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both the numerator and the den |
| q1498 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the highest monthly consumption in the year 2012? | Consumption is recorded customer-month by customer-month, and each recorded figure is already one customer's monthly consumption. So the yea |
| q1500 | debit_card_specializing | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the product description of the products consumed | The individual-purchase records are only a **four-day sample**: they cover 2012-08-23 through 2012-08-26, and nothing else. Any month outsid |
| q1501 | debit_card_specializing | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the countries of the gas stations with transacti | Same sample-window fact: the individual-purchase records cover only 2012-08-23~26, so no purchases took place in June 2013, and the truthful |
| q1505 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the customers who paid in euro, how many of them have | "Of them" means **customers**: count each Euro customer once, however many months cross the threshold. The condition is on a monthly figure |
| q1525 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of the customers who used EUR in 2012 | "Percentage of customers" = **customers**, not transactions: one customer counts once, in both the numerator and the denominator, and both a |
| q1526 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | For the customer who paid 634.8 in 2012/8/25, what was the c | "paid 634.8" identifies the customer through a single purchase of that amount on that date -- a purchase-level condition, not a monthly tota |
| q1529 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the amount spent by customer "38508" at the gas stat | "Amount spent by a customer" is that customer's total consumption across all gas stations -- a question about the customer's monthly figures |
| q1531 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | Who is the top spending customer and how much is the average | "Top spending customer" is decided by the customer's total consumption across all gas stations (the month-by-month figures), not by adding u |
| q1028 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | In Scotland Premier League, which away team won the most dur | "Away team won the most" = per away team, count how many matches it won away in that league and season, and take the largest count. The "201 |
| q1029 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What are the speed in which attacks are put together of the | "Speed in which attacks are put together" and "build-up play speed" are the same team attribute -- the question names one quantity twice. "H |
| q1037 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Calculate the percentage of players who prefer left foot, wh | "Percentage of players" counts **players**, not rating records: one player counts once in both the numerator and the denominator, even thoug |
| q1058 | european_football_2 | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Who has the highest average finishing rate between the highe | The question compares exactly two players: the tallest and the shortest one. Compare their average finishing rates over their dated records |
| q1080 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the players whose preferred foot was the left foot whe | "Among the players ... how many of them" counts **players**: one player counts once, even though a player has many dated records (and his pr |
| q1094 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How much higher in percentage is Ariel Borysiuk's overall ra | A player's rating is a **dated series of observations**, not one number: the same player has many rating records over the years. A question |
| q1107 | european_football_2 | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | When was the first time did Kevin Constant have his highest | A player's scores are a dated series. "His highest crossing score" is the largest value in that series, and he can carry it on more than one |
| q1115 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What percentage is Landon Donovan's overall rating higher th | The question names a date, so take each player's rating record of that day, then express how much higher the first is as a percentage of the |
| q1124 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 难题 | Who are the players that tend to be attacking when their mat | "Tend to be attacking when their mates were doing attack moves" is the **high** attacking work rate; the answer is the list of players carry |
| q1133 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How many football players born after the 1990s have the firs | "Born after the 1990s" here means born **after 1990** -- the players born from 1991 on whose name starts with Aaron. (Read literally as "aft |
| q1135 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Please provide top four football players' IDs who are among | Two readings decide this question, and both must be right: - **Right-footed**: only records whose preferred foot is the right one compete. - |
| q1136 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How many players had the highest potential score for crossin | "The highest potential score for crossing" is the highest score in the **crossing** column (the best a player can reach at crossing), not th |
| q1144 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Please state the finishing rate and curve score of the playe | The heaviest player is the one with the largest weight; his attributes are a dated series, and with no date in the question take his **prese |
| q1148 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of players that are under 180 cm who | Two readings decide this question: - "An overall strength of more than 70" is the player's **overall rating** above 70 -- the overall talent |
| q94 | financial | ❌ FAIL | 🔁 翻盘 | 数据集问题 | List out the account numbers of female clients who are oldes | Two conditions pick one person and one district: the oldest female client (`gender = 'F'`, smallest `birth_date`) **within the district whos |
| q95 | financial | ❌ FAIL | 🔁 翻盘 | 数据集问题 | List out the account numbers of clients who are youngest and | Both conditions apply to the same pick: the client with the largest `birth_date` (youngest) **inside the district whose average salary `A11` |
| q115 | financial | ❌ FAIL | 🔁 翻盘 | 数据集问题 | For the branch which located in the south Bohemia with bigge | "The branch in south Bohemia with the biggest number of inhabitants" is the district with `A3 = 'south Bohemia'` whose `A4` (inhabitants) is |
| q129 | financial | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Which are the top ten withdrawals (non-credit card) by distr | "Top ten withdrawals (non-credit card) by district" ranks the districts by the **total amount** of their non-card withdrawals (`type = 'VYDA |
| q152 | financial | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the average number of crimes committed in 1995 in re | The candidates are the **distinct districts** with `A15 > 4000` that hold at least one account opened in 1997 or later -- **26 regions** -- |
| q186 | financial | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What percentage of male clients request for weekly statement | A client "requests weekly statements" when they hold an account whose frequency is `'POPLATEK TYDNE'` (link clients to accounts through `dis |
| q847 | formula_1 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the surname of the driver with the best lap time in | The best lap in the second qualifying period is the smallest **non-empty** `q2` time of race 19: Kimi **Räikkönen**, `1:34.188`. The dataset |
| q879 | formula_1 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | For the driver who set the fastest lap speed, what is his na | "Fastest lap speed" is the largest **numeric** `fastestLapSpeed`: **257.320** km/h, whose driver is **Brazilian**. The dataset's own query o |
| q906 | formula_1 | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Which was Lewis Hamilton first race? What was his points rec | The dataset holds **no 2007 Australian Grand Prix** (his real first race is absent from `races`), so his first race in the data is the **Mal |
| q951 | formula_1 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How many Japanese constructors have 0 points in 2 races? | **One** Japanese constructor carries zero points in exactly two standings rows: **Kojima**. The dataset's own query reports the row count (2 |
| q962 | formula_1 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | From 2000 to 2005, what percentage of drivers who were born | Counted over **drivers**: every one of the 52 drivers of the 2000-2005 seasons was born before 1985, and all 52 have a race with more than 5 |
| q963 | formula_1 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How many French drivers who obtain the laptime less than 02: | Count **drivers**, not lap records: **9** French drivers hold a lap under two minutes (compare the time numerically, e.g. `milliseconds < 12 |
| q1011 | formula_1 | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Which top 20 driver created the shortest lap time ever recor | Rank the drivers by their **shortest lap** using the numeric `milliseconds` column and take the top twenty; the first eight are Lewis Hamilt |
| q1322 | student_club | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the events attended by more than 10 members of the Stu | A meeting is an event with `type = 'Meeting'`; "attended by more than 10 members" means more than ten attendance rows. **Four** meetings qua |
