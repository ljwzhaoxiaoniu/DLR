# 评测明细 — DLR · birdminidev

> **说明**：question 驱动三级锚定——L1 dsh MCP 语义层（`dlr_semantic_query` 等 7 工具，含 `get_full_data_info` 下探）/ L2 共识（`dlr_search_consensus`）/ L3 SOP（`dlr_search_sop`），交叉验证后出 SQL。
> **判定**：gold SQL 在数据集 SQLite 上执行得期望值 ↔ agent 答案（**数据集原生，不修正**）；数值逐级容差、文本归一化包含。
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
| financial | 32 | 0 | 32 | 0.0% |
| formula_1 | 66 | 0 | 66 | 0.0% |
| student_club | 48 | 0 | 48 | 0.0% |
| superhero | 52 | 0 | 52 | 0.0% |
| thrombosis_prediction | 50 | 0 | 50 | 0.0% |
| toxicology | 40 | 0 | 40 | 0.0% |
| **合计** | **500** | **212** | **288** | **42.4%** |

## 汇总

**评定**（按 SOP 裁定 · **主口径**；🔁 翻盘单独计，不并入 ✅ 正确——数据集错误不记在应用头上）

| 评定 | 值 |
|---|---|
| ✅ 正确（与 gold 一致） | 177 / 212（83.5%） |
| 🔁 翻盘（按 SOP 裁定为正确） | 35 |
| ❌ 错误 | 0 |
| ⚠️ 待仲裁 | 0 |
| **合计正确（正确 + 翻盘）** | **212 / 212（100.0%）** |

**判定**（与 gold 原始比对 · 留档；gold 数据集原生、不修正）

| 判定 | 值 |
|---|---|
| PASS（与 gold 一致） | 180 / 212（84.9%） |
| UNCERTAIN（抽不出可比对的值） | 10 |
| FAIL（与 gold 不符） | 22 |
| GOLD_ERR（gold 本身执行失败） | 0 |

**效率**

| 指标 | 值 |
|---|---|
| token 平均 / 中位 | 84,537 / 81,453 |
| token 最低 / 最高 | 33,353 / 204,836 |
| 步数均值 / 工具调用均值 | 5 / 9 |

> **口径**：本文档汇总按**去重题数**计（同题多轮取**最新一轮**的判定/评定）——与 [results/STATS.md](results/STATS.md) 的**按次数**分布会不同（重跑过或跑挂过的题，那边会多计一次）。仅覆盖已跑轮次，勿外推为全数据集结论。token = input + cache_read + output（不含 CoT 的 reasoning 分项由 harness 单独计）。

## 定性观察

> 分批跑完后按 SOP 案例撰写：每个 SOP 条目题须有对应观察、数字与归档 CSV 逐项一致（防止「先写结论后找证据」）。

## 分库明细（逐题校验表 + 证据正文）

> 每题一行台账（题号锚点跳到该题证据块）+ 每题一段正文（命中口径 / 执行 SQL / 结论）。

| 数据库 | 已跑 | ✅ 正确 | 🔁 翻盘 | ❌ 错误 | ⚠️ 待仲裁 | token 中位 |
|---|---|---|---|---|---|---|
| [california_schools](DETAIL/california_schools.md) | 30 | 29 | 1 | 0 | 0 | 66,005 |
| [card_games](DETAIL/card_games.md) | 52 | 40 | 12 | 0 | 0 | 93,661 |
| [codebase_community](DETAIL/codebase_community.md) | 49 | 42 | 7 | 0 | 0 | 84,921 |
| [debit_card_specializing](DETAIL/debit_card_specializing.md) | 30 | 21 | 9 | 0 | 0 | 47,948 |
| [european_football_2](DETAIL/european_football_2.md) | 51 | 45 | 6 | 0 | 0 | 79,889 |

## 数据集缺陷与裁定（SOP 条目缘由）

| 题号 | 库 | 判定 | 评定 | 类型 | 问题（截） | 裁定（sop.md 摘要） |
|---|---|---|---|---|---|---|
| q27 | california_schools | ⚠️ UNCERTAIN | 🔁 翻盘 | 难题 | What is the average score in writing for the schools that we | "Communication number" is the school's phone number -- there is no separate contact table. Date reading: "opened after 1991" means the openi |
| q341 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What are the borderless cards available without powerful foi | "Powerful foils" are the printings listed by the card marketplace **both** as a card and as a foil -- one of the two being present is not en |
| q344 | card_games | ✅ PASS | 🔁 翻盘 | 数据集问题 | List all the mythic rarity print cards banned in gladiator f | A card here is a **printing**: one card name can exist as several printings, each with its own id. The question asks for the cards themselve |
| q349 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Name the card and artist with the most ruling information. A | "Ruling information" is the card's rulings: count the rulings attached to each card and take the largest -- **Teferi's Protection**, illustr |
| q352 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Calculate the percentage of the cards availabe in Chinese Si | "Percentage of the cards" puts **cards** on both sides of the fraction: the cards that have a Chinese Simplified printing, divided by all th |
| q366 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | What is the rule of playing card "Benalish Knight"? | "The rule of playing card X" asks for the card's **rules text** -- the abilities printed on it. For Benalish Knight those are **flash** (it |
| q383 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | How many of the banned cards are white border? | "Banned cards" counts **cards**: a card banned in several formats is still one card, so count each card once -- 89 white-bordered cards are |
| q402 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of Story Spotlight cards that do not | A card "does not have a text box" when it is **textless**. Check the Story Spotlight cards for that: **none of them is textless**, so the pe |
| q407 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 · 难题 | Lists all types of cards in German. | "Types of cards **in German**" asks for the type names as they read in German -- the German-language type strings recorded for German printi |
| q416 | card_games | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | What percentage of cards without power are in French? | "Cards without power" = the cards whose power is missing or recorded as `*`. "In French" = the card has a French printing. The percentage pu |
| q483 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the Italian text ruling of all the cards in the | "The Italian text of a card" is the card's **rules text as printed in Italian** -- one text per card (the text is a long block, so identical |
| q484 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the Italian names of the cards in the set Coldsn | "Highest converted mana cost" in this set is 7, and **twelve cards share it** -- so the answer is twelve names, not one: Devastazione Solare |
| q529 | card_games | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Find and list the names of sets which doesn't have Japanese | A set "has a translation" in a language when that language's **text is actually present**: every set carries a row per language, and a row w |
| q584 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Write all the comments left by users who edited the post tit | "The comments left by users who edited the post" are the **notes the editing users left with their edits** -- the short note each edit of th |
| q595 | codebase_community | ✅ PASS | 🔁 翻盘 | 数据集问题 | Which user have only one post history per post and having at | The question leaves two things unsaid: whether "one post history" counts the **records** a user left or the **kinds** of history entry they |
| q639 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Based on posts posted by Community, calculate the percentage | The fraction puts **one set of posts** on both sides: the posts that use the R language, among the posts that account posted. That account o |
| q640 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Calculate the difference in view count from post posted by M | "The posts posted by an author" are the posts that author owns, and a post's view count is the count the post itself records -- counted once |
| q672 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Among the users located in United Kingdom, how many users wh | The question counts **users**, and "a favorite amount of 4 or more" is a post's own favorite count (not a sum across the user's posts). Of t |
| q683 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of posts whose owners had a reputatio | "In 2011" scopes the whole question -- the posts of that year, and among them the share whose owner's reputation is over 1000. That year has |
| q710 | codebase_community | ❌ FAIL | 🔁 翻盘 | 数据集问题 | In posts with 1 comment, how many of the comments have 0 sco | "In posts with 1 comment" picks the posts whose **recorded comment count** is exactly 1 -- not the posts that merely happen to have one comm |
| q1481 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | What is the difference in the annual average consumption of | Per customer, total up their 2013 CZK consumption. Then, **per segment**, take the customer(s) with the lowest 2013 total. "Annual average c |
| q1482 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Which of the three segments—SME, LAM and KAM—has the biggest | The question names the currency, so the consumption must be filtered to customers whose billing currency is EUR (`Currency = 'EUR'` in the c |
| q1490 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | How many percent of LAM customer consumed more than 46.73? | "Percent of customers" is counted **per customer**, not per customer-month record. One customer = one unit in both the numerator and the den |
| q1500 | debit_card_specializing | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | Please list the product description of the products consumed | The individual-purchase records are only a **four-day sample**: they cover 2012-08-23 through 2012-08-26, and nothing else. Any month outsid |
| q1501 | debit_card_specializing | ✅ PASS | 🔁 翻盘 | 数据集问题 | Please list the countries of the gas stations with transacti | Same sample-window fact: the individual-purchase records cover only 2012-08-23~26, so no purchases took place in June 2013, and the truthful |
| q1525 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the percentage of the customers who used EUR in 2012 | "Percentage of customers" = **customers**, not transactions: one customer counts once, in both the numerator and the denominator, and both a |
| q1526 | debit_card_specializing | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 · 难题 | For the customer who paid 634.8 in 2012/8/25, what was the c | "paid 634.8" identifies the customer through a single purchase of that amount on that date -- a purchase-level condition, not a monthly tota |
| q1529 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What is the amount spent by customer "38508" at the gas stat | "Amount spent by a customer" is that customer's total consumption across all gas stations -- a question about the customer's monthly figures |
| q1531 | debit_card_specializing | ❌ FAIL | 🔁 翻盘 | 数据集问题 · 难题 | Who is the top spending customer and how much is the average | "Top spending customer" is decided by the customer's total consumption across all gas stations (the month-by-month figures), not by adding u |
| q1029 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | What are the speed in which attacks are put together of the | "Speed in which attacks are put together" and "build-up play speed" are the same team attribute -- the question names one quantity twice. "H |
| q1094 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | How much higher in percentage is Ariel Borysiuk's overall ra | A player's rating is a **dated series of observations**, not one number: the same player has many rating records over the years. A question |
| q1107 | european_football_2 | ⚠️ UNCERTAIN | 🔁 翻盘 | 数据集问题 | When was the first time did Kevin Constant have his highest | A player's scores are a dated series. "His highest crossing score" is the largest value in that series, and he can carry it on more than one |
| q1124 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 难题 | Who are the players that tend to be attacking when their mat | "Tend to be attacking when their mates were doing attack moves" is the **high** attacking work rate; the answer is the list of players carry |
| q1135 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Please provide top four football players' IDs who are among | Two readings decide this question, and both must be right: - **Right-footed**: only records whose preferred foot is the right one compete. - |
| q1144 | european_football_2 | ❌ FAIL | 🔁 翻盘 | 数据集问题 | Please state the finishing rate and curve score of the playe | The heaviest player is the one with the largest weight; his attributes are a dated series, and with no date in the question take his **prese |
