# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **96/96** 题：JRA ✅96 ❌0 ｜ 证据链全闭 96 ｜ token 中位 340,906 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 243,676 | 0 | 0 | 1020_1959_tsm-v1-b1 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 268,059 | 0 | 0 | 1020_2319_tsm-v1-b34 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 411,744 | 0 | 0 | 1021_0119_tsm-v1-b67 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 279,235 | 0 | 0 | 1021_0219_tsm-v1-b97 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 260,531 | 0 | 0 | 1021_0308_tsm-v1-b122 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4091 | 23 | 375,382 | 0 | 0 | 1021_0343_tsm-v1-b139 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 29 | 447,032 | 0 | 0 | 1021_0405_tsm-v1-b150 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 26 | 468,337 | 0 | 0 | 1021_0421_tsm-v1-b158 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.36 | 26 | 642,248 | 0 | 0 | 1021_0437_tsm-v1-b166 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3214 | 29 | 585,070 | 0 | 0 | 1020_2004_tsm-v1-b4 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 345,923 | 0 | 0 | 1020_2010_tsm-v1-b7 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2917 | 25 | 521,213 | 0 | 0 | 1020_2015_tsm-v1-b10 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3793 | 30 | 666,016 | 0 | 0 | 1020_2020_tsm-v1-b13 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 20 | 472,869 | 0 | 0 | 1020_2239_tsm-v1-b16 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4074 | 28 | 794,921 | 0 | 0 | 1020_2245_tsm-v1-b19 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 15 | 540,335 | 0 | 0 | 1020_2251_tsm-v1-b22 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 762,451 | 0 | 0 | 1020_2300_tsm-v1-b25 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 249,551 | 0 | 0 | 1020_2306_tsm-v1-b28 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 411,478 | 0 | 0 | 1020_2313_tsm-v1-b31 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1739 | 24 | 435,020 | 0 | 0 | 1020_2325_tsm-v1-b37 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 345,539 | 0 | 0 | 1020_2331_tsm-v1-b40 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 288,446 | 0 | 0 | 1020_2336_tsm-v1-b43 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 344,703 | 0 | 0 | 1020_2343_tsm-v1-b46 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 579,106 | 0 | 0 | 1020_2349_tsm-v1-b49 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1071 | 29 | 593,621 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 28 | 476,233 | 0 | 0 | 1021_0051_tsm-v1-b55 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 547,864 | 0 | 0 | 1021_0058_tsm-v1-b58 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.1111 | 19 | 258,522 | 0 | 0 | 1021_0105_tsm-v1-b61 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 491,392 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 28 | 469,258 | 0.037 | 0 | 1021_0125_tsm-v1-b70 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 647,729 | 0 | 0 | 1021_0131_tsm-v1-b73 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 359,747 | 0 | 0 | 1021_0138_tsm-v1-b76 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 363,050 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 338,601 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 343,208 | 0 | 0 | 1021_0154_tsm-v1-b84 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 338,869 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 484,707 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 461,052 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 263,179 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 298,882 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 244,726 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 258,659 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 271,735 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 231,323 | 0 | 0 | 1021_0243_tsm-v1-b109 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 279,073 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 246,233 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 298,784 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 220,685 | 0 | 0 | 1021_0301_tsm-v1-b118 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 257,417 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 394,632 | 0 | 0 | 1021_0313_tsm-v1-b124 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 269,044 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 339,663 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 480,915 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 380,764 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 244,788 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 350,620 | 0 | 0 | 1021_0331_tsm-v1-b133 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 21 | 409,710 | 0 | 0 | 1021_0335_tsm-v1-b135 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 300,023 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 23 | 325,960 | 0 | 0 | 1021_0341_tsm-v1-b138 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 300,192 | 0 | 0 | 1021_0345_tsm-v1-b140 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 17 | 493,261 | 0 | 0 | 1021_0347_tsm-v1-b141 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 445,350 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [63](#case-63) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 273,596 | 0 | 0 | 1021_0353_tsm-v1-b144 | 全对·链闭 |
| [64](#case-64) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 340,906 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [65](#case-65) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 299,406 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [66](#case-66) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 325,324 | 0 | 0 | 1021_0359_tsm-v1-b147 | 全对·链闭 |
| [67](#case-67) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 17 | 240,402 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [68](#case-68) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 347,060 | 0 | 0 | 1021_0401_tsm-v1-b148 | 全对·链闭 |
| [69](#case-69) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4667 | 16 | 242,664 | 0 | 0 | 1021_0403_tsm-v1-b149 | 全对·链闭 |
| [70](#case-70) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 272,520 | 0 | 0 | 1021_0405_tsm-v1-b150 | 全对·链闭 |
| [71](#case-71) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 251,175 | 0 | 0 | 1021_0407_tsm-v1-b151 | 全对·链闭 |
| [72](#case-72) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3158 | 20 | 375,208 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [73](#case-73) | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 303,892 | 0 | 0 | 1021_0411_tsm-v1-b153 | 全对·链闭 |
| [74](#case-74) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 244,965 | 0 | 0 | 1021_0411_tsm-v1-b153 | 全对·链闭 |
| [75](#case-75) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 273,765 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [76](#case-76) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 285,176 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [77](#case-77) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 248,224 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [78](#case-78) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 304,579 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [79](#case-79) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2727 | 12 | 297,428 | 0 | 0 | 1021_0419_tsm-v1-b157 | 全对·链闭 |
| [80](#case-80) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 396,616 | 0 | 0 | 1021_0424_tsm-v1-b159 | 全对·链闭 |
| [81](#case-81) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2308 | 14 | 323,424 | 0 | 0 | 1021_0424_tsm-v1-b159 | 全对·链闭 |
| [82](#case-82) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2727 | 12 | 298,760 | 0 | 0 | 1021_0425_tsm-v1-b160 | 全对·链闭 |
| [83](#case-83) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.25 | 13 | 323,374 | 0 | 0 | 1021_0427_tsm-v1-b161 | 全对·链闭 |
| [84](#case-84) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2308 | 14 | 481,495 | 0 | 0 | 1021_0429_tsm-v1-b162 | 全对·链闭 |
| [85](#case-85) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 389,276 | 0 | 0 | 1021_0429_tsm-v1-b162 | 全对·链闭 |
| [86](#case-86) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 388,045 | 0 | 0 | 1021_0431_tsm-v1-b163 | 全对·链闭 |
| [87](#case-87) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 347,779 | 0 | 0 | 1021_0433_tsm-v1-b164 | 全对·链闭 |
| [88](#case-88) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.25 | 13 | 310,373 | 0 | 0 | 1021_0435_tsm-v1-b165 | 全对·链闭 |
| [89](#case-89) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 357,159 | 0 | 0 | 1021_0435_tsm-v1-b165 | 全对·链闭 |
| [90](#case-90) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 536,449 | 0 | 0 | 1021_0439_tsm-v1-b167 | 全对·链闭 |
| [91](#case-91) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2727 | 12 | 300,874 | 0 | 0 | 1021_0441_tsm-v1-b168 | 全对·链闭 |
| [92](#case-92) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 383,872 | 0 | 0 | 1021_0441_tsm-v1-b168 | 全对·链闭 |
| [93](#case-93) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2 | 16 | 532,177 | 0 | 0 | 1021_0443_tsm-v1-b169 | 全对·链闭 |
| [94](#case-94) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 298,631 | 0 | 0 | 1021_0445_tsm-v1-b170 | 全对·链闭 |
| [95](#case-95) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.25 | 13 | 311,801 | 0 | 0 | 1021_0447_tsm-v1-b171 | 全对·链闭 |
| [96](#case-96) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2727 | 12 | 215,380 | 0 | 0 | 1021_0447_tsm-v1-b171 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 243,676
- **raw 日志**：[results/1020_1959_tsm-v1-b1/raw/1020_2000_trainticket-runtime-1](../results/1020_1959_tsm-v1-b1/raw/1020_2000_trainticket-runtime-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：14 services in namespace train-ticket are in CrashLoopBackOff (RESTARTS 10) across worker-01/02/03, so this is not a node-scope fault. Their error logs all show the identical startup failure: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' during 'HikariPool-1 - Exception during pool initialization', leading to 'Unable to build Hibernate SessionFactory' and 'Application run failed'. The database side confirms the mechanism: tsdb-mysql error logs contain 1506 occurrences of '[Warning] Too many connections' (error ratio 0.57) while its mys

### case-2

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 268,059
- **raw 日志**：[results/1020_2319_tsm-v1-b34/raw/1020_2319_trainticket-runtime-2](../results/1020_2319_tsm-v1-b34/raw/1020_2319_trainticket-runtime-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: 13 pods in train-ticket show 0/1 CrashLoopBackOff (RESTARTS 5) while the rest are 1/1 Running. Their GetErrorLogs are identical and DB-related: 'HikariPool-1 - Exception during pool initialization' caused by 'java.sql.SQLNonTransientConnectionException: Too many connections' (SQL Error: 1040, SQLState: 08004), then 'Failed to initialize JPA EntityManagerFactory' -> 'Application run failed', i.e. the business services die at DB connection-pool init, not from their own logic. Anchoring the shared downstream tsdb-mysql: GetErrorLogs(tsdb-mysql) reports 484 errors of a single pattern 

### case-3

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 411,744
- **raw 日志**：[results/1021_0119_tsm-v1-b67/raw/1021_0120_trainticket-runtime-3](../results/1021_0119_tsm-v1-b67/raw/1021_0120_trainticket-runtime-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Shared DB tsdb-mysql exhausted its connection capacity: GetErrorLogs(tsdb-mysql) shows 325 error lines, all '227 [Warning] Too many connections' (ratio 0.2228); GetRecentLogs(tsdb-mysql) keeps emitting '[Warning] Too many connections'. Namespace events bind the mechanism verbatim to the object: 'Warning Unhealthy pod/tsdb-mysql-0 Readiness probe failed: ERROR 1040 (HY000): Too many connections' and the same on pod/tsdb-mysql-2 (probe runs 'mysql -uroot -e SELECT 1'). Every data-backed service fails startup identically - ts-price-service and ts-order-other-service error logs show 'HikariPool-1 

### case-4

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 279,235
- **raw 日志**：[results/1021_0219_tsm-v1-b97/raw/1021_0219_trainticket-runtime-4](../results/1021_0219_tsm-v1-b97/raw/1021_0219_trainticket-runtime-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：11 train-ticket data services (ts-price, ts-route, ts-security, ts-station, ts-station-food, ts-train, ts-train-food, ts-travel, ts-travel2, ts-user, ts-wait-order) are 0/1 CrashLoopBackOff (5 restarts, Exit Code 1) spread across worker-01/02/03, so the fault is not node-scoped; the gateway itself logs no errors. First divergent surface is the shared database admission layer: tsdb-mysql error logs contain 349 x '[Warning] Too many connections' (ratio 0.233) and namespace events bind it to instances verbatim: 'Warning Unhealthy pod/tsdb-mysql-0|1|2 Readiness probe failed: ERROR 1040 (HY000): To

### case-5

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 260,531
- **raw 日志**：[results/1021_0308_tsm-v1-b122/raw/1021_0308_trainticket-runtime-5](../results/1021_0308_tsm-v1-b122/raw/1021_0308_trainticket-runtime-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' shows 10 Train-Ticket workloads in 0/1 Error/CrashLoopBackOff (ts-train-service, ts-travel-service, ts-travel2-service, ts-route-service, ts-station-service, ts-station-food-service, ts-train-food-service, ts-security-service, ts-user-service, ts-wait-order-service), while nacos/rabbitmq and the other services stay healthy. GetErrorLogs on the crashing services returns the same mechanism: 'HikariPool-1 - Exception during pool initialization', 'java.sql.SQLNonTransientConnectionException: Too many connections', 'SQL Error: 1040, SQLState: 08004', follo

### case-6

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4091 · steps 23 · tokens 375,382
- **raw 日志**：[results/1021_0343_tsm-v1-b139/raw/1021_0343_trainticket-runtime-6](../results/1021_0343_tsm-v1-b139/raw/1021_0343_trainticket-runtime-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 44 pods in train-ticket are Running and 1/1 Ready (no Pending/CrashLoop/image-pull/mount failures), and namespace events are all Normal with every tsdb-mysql PVC ProvisioningSucceeded, so the workload layer is healthy. The complaint side fails functionally: alerts report HTTP 500 on ts-inside-payment-service Process payment (52x) and ts-preserve-service Create ticket order (9x). Error logs of the two write-path services name the same mechanism verbatim: ts-payment-service and ts-order-service both emit 'SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only

### case-7

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 29 · tokens 447,032
- **raw 日志**：[results/1021_0405_tsm-v1-b150/raw/1021_0405_trainticket-runtime-7](../results/1021_0405_tsm-v1-b150/raw/1021_0405_trainticket-runtime-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with 0 restarts, so scheduling/probe/image/restart classes are excluded. Alerts point at ts-inside-payment-service (Process payment, 54x HTTP 500) and ts-preserve-service (Create ticket order, 11x HTTP 500); their error logs trace 500s to POST /api/v1/paymentservice/payment (68x) and /api/v1/orderservice/order plus 'getTickets failed'. The deepest first-level evidence is on ts-payment-service and ts-order-service: 'SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only option so it cannot execute this statement', wrapped in

### case-8

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 26 · tokens 468,337
- **raw 日志**：[results/1021_0421_tsm-v1-b158/raw/1021_0421_trainticket-runtime-8](../results/1021_0421_tsm-v1-b158/raw/1021_0421_trainticket-runtime-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with 0 restarts (no workload outlier) and endpoints/service bindings are correct, so the break is in the data layer. Alerts point to ts-inside-payment-service (54x 500 on /api/v1/inside_pay_service/inside_payment) and ts-preserve-service (10x 500, 'getTickets failed'). Their downstreams ts-payment-service (68x) and ts-order-service (52x) both log 'SQL Error: 1290, SQLState: HY000 - The MySQL server is running with the --read-only option so it cannot execute this statement' followed by JpaSystemException: could not execute statement -> HTTP 500. ts-payment-

### case-9

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.36 · steps 26 · tokens 642,248
- **raw 日志**：[results/1021_0437_tsm-v1-b166/raw/1021_0438_trainticket-runtime-9](../results/1021_0437_tsm-v1-b166/raw/1021_0438_trainticket-runtime-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial Service Unreachability traced to the shared Train-Ticket database. Complaint side: alerts on ts-inside-payment-service (POST /api/v1/inside_pay_service/inside_payment, 500) and ts-preserve-service (POST /api/v1/preserveservice/preserve, 500); ts-gateway-service has no error logs. All ts-* pods are 1/1 Running with no restart outliers, and resourcequotas in train-ticket returns 'No resources found', so the quota branch is excluded (a missing Service is never a DNS failure, and absent Services ts-food-delivery-service / ts-wait-order-service are background). Mechanism: two independent se

### case-10

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3214 · steps 29 · tokens 585,070
- **raw 日志**：[results/1020_2004_tsm-v1-b4/raw/1020_2005_trainticket-runtime-10](../results/1020_2004_tsm-v1-b4/raw/1020_2005_trainticket-runtime-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 app workloads are Running/Ready with 0 restarts and the namespace events surface shows no FailedScheduling/FailedCreate/FailedMount warning, so scheduling, image, probe and replica faults are excluded. Complaint side: alerts report HTTP 500 on 'Process payment' (ts-inside-payment-service, 53x) and 'Create ticket order' (ts-preserve-service, 11x). Error logs localize it downstream: ts-inside-payment-service fails calling /api/v1/paymentservice/payment; ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only option so it cannot exec

### case-11

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 345,923
- **raw 日志**：[results/1020_2010_tsm-v1-b7/raw/1020_2010_trainticket-runtime-11](../results/1020_2010_tsm-v1-b7/raw/1020_2010_trainticket-runtime-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 51 pods in train-ticket are Running 1/1 with no restart outliers, so this is not a scheduling/startup/probe fault. Alerts and entry-caller error logs both point downstream: ts-inside-payment-service logs '500 ... path:/api/v1/paymentservice/payment' (62x) and ts-preserve-service logs 'getTickets failed' (90x) plus '500 ... path:/api/v1/orderservice/order' (7x). Following the dependency edges to the callees, the first observation != expectation is at the shared database: ts-payment-service and ts-order-service both emit 'SQL Error: 1290, SQLState: HY000' / 'The MySQL server is running with 

### case-12

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2917 · steps 25 · tokens 521,213
- **raw 日志**：[results/1020_2015_tsm-v1-b10/raw/1020_2016_trainticket-runtime-12](../results/1020_2015_tsm-v1-b10/raw/1020_2016_trainticket-runtime-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry callers ts-inside-payment-service and ts-preserve-service only show propagated downstream 500s (/api/v1/paymentservice/payment, /api/v1/orderservice/order, '[preserve][Step 3]... getTickets failed'). All business pods are 1/1 Running with 0 restarts, and pods/events show no scheduling, pull, probe or quota mechanism, so the break is not on the workload/address layer: writers' env (ORDER_MYSQL_HOST/PAYMENT_MYSQL_HOST = tsdb-mysql-leader:3306) matches the Service whose role=leader endpoint resolves to tsdb-mysql-0 (172.20.2.101:3306), and CheckServiceConnectivity to tsdb-mysql-leader:3306 

### case-13

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3793 · steps 30 · tokens 666,016
- **raw 日志**：[results/1020_2020_tsm-v1-b13/raw/1020_2021_trainticket-runtime-13](../results/1020_2020_tsm-v1-b13/raw/1020_2021_trainticket-runtime-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 47 pods in train-ticket are 1/1 Running with 0 restarts (no Pending/CrashLoop/image-pull outlier), and alerts point to HTTP 500 on entry services ts-inside-payment-service (54x) and ts-preserve-service (12x). Their error logs name downstream 500s on /api/v1/paymentservice/payment and /api/v1/orderservice/order. Reading those downstream services gives the first broken surface: ts-payment-service and ts-order-service both log 'SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only option so it cannot execute this statement' (68x and 56x) followed by JpaSystem

### case-14

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 20 · tokens 472,869
- **raw 日志**：[results/1020_2239_tsm-v1-b16/raw/1020_2240_trainticket-runtime-14](../results/1020_2239_tsm-v1-b16/raw/1020_2240_trainticket-runtime-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 46 workloads are 1/1 Running with no RESTARTS outlier and all Service objects for payment/order/basic exist, so scheduling/startup/probe/pull/quota branches are excluded. Alerts point to 500s at ts-inside-payment-service (54, POST /api/v1/inside_pay_service/inside_payment) and ts-preserve-service (9, POST /api/v1/preserveservice/preserve). Caller logs show HttpServerErrorException 500 on path /api/v1/paymentservice/payment (69x) and /api/v1/orderservice/order (10x) plus 'getTickets failed' (110x). The breakpoint is on the callee side: ts-payment-service (208 errors) and ts-order-service (1

### case-15

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4074 · steps 28 · tokens 794,921
- **raw 日志**：[results/1020_2245_tsm-v1-b19/raw/1020_2246_trainticket-runtime-15](../results/1020_2245_tsm-v1-b19/raw/1020_2246_trainticket-runtime-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Write-path failures converge on shared DB tsdb-mysql. ts-order-service (162 errors) and ts-payment-service (202 errors) both log 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (54 and 67 occurrences), surfacing as JpaSystemException/GenericJDBCException and 500s returned to ts-preserve-service (/api/v1/orderservice/order) and ts-inside-payment-service (/api/v1/paymentservice/payment). Both services resolve their DB via Secrets ORDER_MYSQL_HOST / PAYMENT_MYSQL_HOST = tsdb-mysql-leader, whose selector app=tsdb-my

### case-16

- **结论**：`app/ts-assurance-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-assurance-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 15 · tokens 540,335
- **raw 日志**：[results/1020_2251_tsm-v1-b22/raw/1020_2252_trainticket-runtime-16](../results/1020_2251_tsm-v1-b22/raw/1020_2252_trainticket-runtime-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory in train-ticket shows exactly one business workload missing: ts-assurance-service (all other services 2/2 Running). Complaint side confirms: alert on entry service ts-assurance-service GET /api/v1/assuranceservice/assurances/types returns HTTPError('503 Server Error: Service Unavailable') x11, and CheckServiceConnectivity to ts-assurance-service:18888 (the port its own Service declares) fails on worker-01/02/03. The Service object exists (ClusterIP 10.68.251.254:18888) but has no endpoints; its error log is empty because no pod exists. Workload layer: Deployment ts-assurance-ser

### case-17

- **结论**：`app/ts-basic-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-basic-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 762,451
- **raw 日志**：[results/1020_2300_tsm-v1-b25/raw/1020_2301_trainticket-runtime-17](../results/1020_2300_tsm-v1-b25/raw/1020_2301_trainticket-runtime-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: alerts + error logs show 500s at ts-preserve-service calling /api/v1/travelservice/trip_detail, and ts-travel-service throws "java.lang.IllegalArgumentException: Service Instance cannot be null", i.e. it cannot resolve any instance for its downstream ts-basic-service. Inventory: no ts-basic-service pod exists in the train-ticket namespace while its Service object (10.68.93.110:15680) does; all other 44 workloads are 2/2 Running. Anchored reads on ts-basic-service: endpoints object shows ENDPOINTS <none>; TCP probe on the Service's own declared port 15680 fails from worker-01, work

### case-18

- **结论**：`app/ts-contacts-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-contacts-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 249,551
- **raw 日志**：[results/1020_2306_tsm-v1-b28/raw/1020_2307_trainticket-runtime-18](../results/1020_2306_tsm-v1-b28/raw/1020_2307_trainticket-runtime-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-contacts-service has NO pod in the pods inventory while all other 40 workloads are 2/2 Running with no recent restarts. Its Deployment reads 'Replicas: 0 desired | 0 updated | 0 total | 0 available | 0 unavailable' (outlier row 'ts-contacts-service 0/0 0 0'), and the deployment's own events state verbatim 'Scaled down replica set ts-contacts-service-7fc68f4bbc to 0 from 1' (namespace events: 'Scaled down replica set ts-contacts-service-7fc68f4bbc to 0 from 1', 'Deleted pod: ts-contacts-service-7fc68f4bbc-bwjc4'). The Service object exists correctly (ClusterIP 10.68.213.228, port 12347/TCP, 

### case-19

- **结论**：`app/ts-food-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-food-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 411,478
- **raw 日志**：[results/1020_2313_tsm-v1-b31/raw/1020_2314_trainticket-runtime-19](../results/1020_2313_tsm-v1-b31/raw/1020_2314_trainticket-runtime-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service Deployment was scaled to zero: DescribeResource(deployment/ts-food-service) shows 'Replicas: 0 desired | 0 updated | 0 total | 0 available' with event 'Scaled down replica set ts-food-service-59c58c74cc to 0 from 1' and pod ...-b29pn SuccessfulDelete; the deployments listing shows 'ts-food-service 0/0 0 0' while all other 40 workloads are 1/1 Running with 0 restarts. Consequently no ts-food-service pod exists and the endpoints listing shows 'ts-food-service <none>' although the Service object is present (ClusterIP 10.68.49.13, port 18856) and its selector app=ts-food-service ma

### case-20

- **结论**：`app/ts-gateway-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-gateway-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1739 · steps 24 · tokens 435,020
- **raw 日志**：[results/1020_2325_tsm-v1-b37/raw/1020_2326_trainticket-runtime-20](../results/1020_2325_tsm-v1-b37/raw/1020_2326_trainticket-runtime-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：All ts-* pods read 2/2 Running and the auth path is healthy (ts-auth-service:12340 and ts-verification-code-service:15678 TCP open from worker-01/02/03), but the endpoints listing shows the single outlier 'ts-gateway-service <none>' and the deployments listing shows 'ts-gateway-service 0/0 0 0' while every other deployment is 1/1 1 1. No ts-gateway-service pod exists in the pods listing. Deployment ts-gateway-service live spec carries 'spec.replicas: 0' (last-applied-configuration still says replicas 1, generation 2) and DescribeResource reports 'Replicas: 0 desired | 0 updated | 0 total | 0 a

### case-21

- **结论**：`app/ts-inside-payment-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-inside-payment-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 345,539
- **raw 日志**：[results/1020_2331_tsm-v1-b40/raw/1020_2332_trainticket-runtime-21](../results/1020_2331_tsm-v1-b40/raw/1020_2332_trainticket-runtime-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom entered from the only anomaly pointer: alert on entry service ts-inside-payment-service, business action 'Process payment', POST /api/v1/inside_pay_service/inside_payment, 20 occurrences of HTTPError('503 Server Error: Service Unavailable'); front-door ts-ui-dashboard and ts-gateway-service had no error logs. Object layer is the sole outlier: deployments listing shows ts-inside-payment-service READY 0/0, UP-TO-DATE 0, AVAILABLE 0 while all 41 peer services are 1/1, and no pod with app=ts-inside-payment-service exists in the pods listing (all peers 2/2 Running, RESTARTS 0). Reachability

### case-22

- **结论**：`app/ts-order-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-order-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 288,446
- **raw 日志**：[results/1020_2336_tsm-v1-b43/raw/1020_2337_trainticket-runtime-22](../results/1020_2336_tsm-v1-b43/raw/1020_2337_trainticket-runtime-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory in train-ticket shows every workload 2/2 Running with no restarts, but ts-order-service has no pod at all. Complaint side: Service ts-order-service exists with port 12031 / targetPort 12031 and selector app=ts-order-service, yet CheckServiceConnectivity on the Service-declared port 12031 failed from worker-01, worker-02 and worker-03 (Connection Failed) and its Endpoints object is '<none>'. Alerts name the same service: HTTPError('503 Server Error: Service Unavailable') on /api/v1/orderservice/order/refresh (20-21 occurrences). Workload breakpoint: deployments listing shows the o

### case-23

- **结论**：`app/ts-payment-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-payment-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 344,703
- **raw 日志**：[results/1020_2343_tsm-v1-b46/raw/1020_2344_trainticket-runtime-23](../results/1020_2343_tsm-v1-b46/raw/1020_2344_trainticket-runtime-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 46 pods in train-ticket are Running/2-2 READY with 0 RESTARTS and there is no ts-payment-service pod at all; Services listing shows ts-payment-service exists (ClusterIP 10.68.124.66:19001) but endpoints for ts-payment-service are '<none>' - the only Service with emptied endpoints; TCP probe on the Service's declared port 19001 failed from worker-01/02/03. No ResourceQuota object exists in the namespace, so the quota branch is excluded; the gateway manifest (ts-gateway-service) has no static route table (Nacos discovery) and its Service targetPort/containerPort match at 18888, so no address

### case-24

- **结论**：`app/ts-preserve-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-preserve-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 579,106
- **raw 日志**：[results/1020_2349_tsm-v1-b49/raw/1020_2349_trainticket-runtime-24](../results/1020_2349_tsm-v1-b49/raw/1020_2349_trainticket-runtime-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side first: ts-gateway-service logs repeatedly show 'RoundRobinLoadBalancer : No servers available for service: ts-preserve-service' (20:56:07-20:57:23), and alerts record 20x HTTPError('503 Server Error: Service Unavailable') on POST /api/v1/preserveservice/preserve. Object layer: the pods listing shows every other train-ticket pod Running 2/2 with 0 restarts, but NO ts-preserve-service pod exists at all; endpoints/ts-preserve-service is '<none>'; an active TCP probe on the port its own Service declares (14568) fails from worker-01, worker-02 and worker-03. Workload state: the deplo

### case-25

- **结论**：`app/ts-price-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-price-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1071 · steps 29 · tokens 593,621
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0012_trainticket-runtime-25](../results/1021_0900_tsm-v1-fix/raw/1021_0012_trainticket-runtime-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Chain read signal-first: alerts point at ts-preserve-service (500 on /api/v1/preserveservice/preserve) and ts-inside-payment-service. ts-preserve-service error log: HttpServerErrorException 500 with path /api/v1/travelservice/trip_detail; ts-travel-service log: 500 on /api/v1/basicservice/basic/travel; ts-basic-service log: java.lang.IllegalArgumentException: 'Service Instance cannot be null' (discovery returned no instance). Inventory: all pods 2/2 Running, but no ts-price-service pod exists while Service ts-price-service (10.68.216.246:16579) is present. Deployments: 'ts-price-service 0/0 0 

### case-26

- **结论**：`app/ts-route-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-route-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 28 · tokens 476,233
- **raw 日志**：[results/1021_0051_tsm-v1-b55/raw/1021_0053_trainticket-runtime-26](../results/1021_0051_tsm-v1-b55/raw/1021_0053_trainticket-runtime-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods healthy (2/2 Running, 0 restarts) yet partial unreachability. Complaint side: ts-preserve-service and ts-inside-payment-service return 500; error logs propagate /api/v1/travelservice/trip_detail -> /api/v1/basicservice/basic/travel -> ts-basic-service throwing 'java.lang.IllegalArgumentException: Service Instance cannot be null'. Probing basic-service's four downstreams on their Service-declared ports: ts-station-service:12345, ts-train-service:14567, ts-price-service:16579 all open, but ts-route-service:11178 Connection Failed from worker-01/02/03. Object layer: deployment/ts-route-s

### case-27

- **结论**：`app/ts-seat-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-seat-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.12 · steps 26 · tokens 547,864
- **raw 日志**：[results/1021_0058_tsm-v1-b58/raw/1021_0059_trainticket-runtime-27](../results/1021_0058_tsm-v1-b58/raw/1021_0059_trainticket-runtime-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 46 other pods are 2/2 Running with 0 restarts, but no pod with app=ts-seat-service exists at all; Service ts-seat-service has ENDPOINTS <none> although its selector (app=ts-seat-service) and port/targetPort 18898 are correct. Connectivity probe on the port the Service itself declares (18898) fails from worker-01/02/03, while sibling downstreams ts-basic-service:15680, ts-route-service:11178, ts-train-service:14567 all report open/Succeeded from all three nodes. Deployment ts-seat-service has spec.replicas: 0 (generation 2) while its last-applied config declared replicas:1, and the event su

### case-28

- **结论**：`app/ts-security-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-security-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.1111 · steps 19 · tokens 258,522
- **raw 日志**：[results/1021_0105_tsm-v1-b61/raw/1021_0105_trainticket-runtime-28](../results/1021_0105_tsm-v1-b61/raw/1021_0105_trainticket-runtime-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace event surface shows the mechanism verbatim: 'ScalingReplicaSet deployment/ts-security-service Scaled down replica set ts-security-service-5fb7f7fbff to 0 from 1' plus 'SuccessfulDelete replicaset/ts-security-service-5fb7f7fbff Deleted pod: ts-security-service-5fb7f7fbff-6dztl' and 'Killing pod/...-6dztl Stopping container ts-security-service' at 4m50s ago. The deployments listing confirms the victim is drained: ts-security-service READY 0/0, UP-TO-DATE 0, AVAILABLE 0 while every peer deployment is 1/1; no ts-security-service pod appears in the pods listing at all. Complaint side: ale

### case-29

- **结论**：`app/ts-station-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-station-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 491,392
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0707_trainticket-runtime-29](../results/1021_0900_tsm-v1-fix/raw/1021_0707_trainticket-runtime-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Deployment ts-station-service reports READY 0/0, UP-TO-DATE 0, AVAILABLE 0 (desired replicas = 0) and its Service ts-station-service (port 12345, selector app=ts-station-service) has Endpoints: <none>; namespace events pin the mechanism verbatim: 'ScalingReplicaSet deployment/ts-station-service Scaled down replica set ts-station-service-7cbf6b96c9 to 0 from 1' followed by 'SuccessfulDelete replicaset/ts-station-service-7cbf6b96c9 Deleted pod: ts-station-service-7cbf6b96c9-wcw4w', with no subsequent pod creation. No ts-station-service pod exists in the pods listing while every other Train-Ticke

### case-30

- **结论**：`app/ts-train-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-train-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 28 · tokens 469,258
- **raw 日志**：[results/1021_0125_tsm-v1-b70/raw/1021_0126_trainticket-runtime-30](../results/1021_0125_tsm-v1-b70/raw/1021_0126_trainticket-runtime-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Chain from complaint side: alerts + GetErrorLogs show ts-preserve-service returning 500 on /api/v1/travelservice/trip_detail, which comes from ts-travel-service 500 on /api/v1/basicservice/basic/travel, whose own log is 'java.lang.IllegalArgumentException: Service Instance cannot be null' (load balancer has no backend instance). Connectivity probes on each downstream Service's own declared port show ts-route-service:11178, ts-station-service:12345 and ts-price-service:16579 all open, while ts-train-service:14567 fails from worker-01/02/03. GetResources(endpoints, ts-train-service) returns ENDP

### case-31

- **结论**：`app/ts-travel-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-travel-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 647,729
- **raw 日志**：[results/1021_0131_tsm-v1-b73/raw/1021_0132_trainticket-runtime-31](../results/1021_0131_tsm-v1-b73/raw/1021_0132_trainticket-runtime-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetAlerts shows ts-travel-service business call /api/v1/travelservice/trips/left failing with HTTPError('503 Server Error: Service Unavailable') x11, while ts-travel-service and ts-gateway-service own error logs are empty. Object layer: the pods listing contains NO pod for ts-travel-service (all other ~40 business pods are 2/2 Running), and the deployments listing shows the outlier row 'ts-travel-service 0/0 0 0'. Live Deployment YAML confirms spec.replicas: 0 (kubectl.kubernetes.io/last-applied-configuration still says replicas: 1, generation: 2), i.e. the desired replica count 

### case-32

- **结论**：`app/ts-user-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-user-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 359,747
- **raw 日志**：[results/1021_0138_tsm-v1-b76/raw/1021_0138_trainticket-runtime-32](../results/1021_0138_tsm-v1-b76/raw/1021_0138_trainticket-runtime-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alerts report 500s on entry actions (ts-preserve-service POST /api/v1/preserveservice/preserve x10, ts-inside-payment-service POST /api/v1/inside_pay_service/inside_payment x5) and GetErrorLogs(ts-preserve-service) repeats 'java.lang.IllegalArgumentException: Service Instance cannot be null', i.e. the caller cannot obtain any instance of its downstream ts-user-service. Endpoints surface: ts-user-service endpoints are '<none>' while all other services have addresses; pods listing shows all pods Running/2/2 with RESTARTS 0 and no ts-user-service pod exists at all. Owner chain: depl

### case-33

- **结论**：`app/ts-assurance-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-assurance-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 363,050
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0706_trainticket-runtime-33](../results/1021_0900_tsm-v1-fix/raw/1021_0706_trainticket-runtime-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier among 47 pods: ts-assurance-service-85577d9b4d-wbm7b 0/1 CrashLoopBackOff (4 restarts). Connectivity probe on the Service's own declared port 18888 failed from worker-01/02/03 -> no ready endpoints. Container dies at startup: 'java.sql.SQLException: Access denied for user ts@172.20.2.87 (using password: YES)' with 'SQL Error: 1045, SQLState: 28000', then HikariPool-1 Exception during pool initialization -> Unable to open JDBC Connection for DDL execution -> Application run failed. Pod IP 172.20.2.87 equals its own IP, so the DB was reachable and rejected authentication (using pass

### case-34

- **结论**：`app/ts-auth-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-auth-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 338,601
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0707_trainticket-runtime-34](../results/1021_0900_tsm-v1-fix/raw/1021_0707_trainticket-runtime-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert names entry_service ts-auth-service with POST /api/v1/users/login returning HTTPError('503 Server Error') x370; gateway and ui-dashboard have no error logs. Object layer: only outlier in the pods listing is ts-auth-service-7689b8d556-hdx9x 0/1 CrashLoopBackOff, RESTARTS 4 (all other 40+ services 1/1 Running). Pod detail: Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 143 SIGTERM); readiness tcp-socket :12340. Error logs: 'java.sql.SQLException: Access denied for user ts@172.20.2.227 (using password: YES)' and 'SQL Error: 1045, SQLState: 28000' -> '

### case-35

- **结论**：`app/ts-config-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-config-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 343,208
- **raw 日志**：[results/1021_0154_tsm-v1-b84/raw/1021_0155_trainticket-runtime-35](../results/1021_0154_tsm-v1-b84/raw/1021_0155_trainticket-runtime-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: ts-config-service-778646698d-x8zd7 0/1 CrashLoopBackOff, 4 restarts, while all other 45+ train-ticket pods are 1/1 Running (and were freshly created ~5m ago and started fine). Complaint side: alert on POST /api/v1/preserveservice/preserve (ts-preserve-service) returning 500; ts-preserve-service error logs show '[preserve][Step 3][Check tickets num][Search For Trip Detail Information error][TripId: G1237, message: getTickets failed]' with 500 from /api/v1/travelservice/trip_detail, and ts-travel-service logs show 500 from /api/v1/seatservice/seats/left_ticke

### case-36

- **结论**：`app/ts-contacts-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-contacts-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 338,869
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0708_trainticket-runtime-36](../results/1021_0900_tsm-v1-fix/raw/1021_0708_trainticket-runtime-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-contacts-service-878884888-g7blb is 0/1 CrashLoopBackOff (4 restarts); pod detail shows Last State Terminated Reason=Error Exit Code=1 (not OOMKilled 137), and the only sustained namespace Warning is 'Back-off restarting failed container ts-contacts-service'. Error logs give the mechanism: 'java.sql.SQLException: Access denied for user 'ts'@'172.20.2.147' (using password: YES)' with 'SQL Error: 1045, SQLState: 28000', HikariPool-1 pool initialization failure, 'Unable to open JDBC Connection for DDL execution' and 'Application run failed'. MySQL is reachable (fetch of tsdb-mysql-leader:3306 

### case-37

- **结论**：`app/ts-delivery-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-delivery-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 484,707
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0709_trainticket-runtime-37](../results/1021_0900_tsm-v1-fix/raw/1021_0709_trainticket-runtime-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-delivery-service is the only outlier: pod ts-delivery-service-787cbf858d-lt9ss is 0/1 CrashLoopBackOff (RESTARTS 4), deployment ts-delivery-service AVAILABLE 0/1, and namespace events repeatedly show "Warning BackOff ... Back-off restarting failed container ts-delivery-service". Pod detail shows Last State: Terminated, Reason: Error, Exit Code: 1 (not 137/143, so not OOM or kubelet kill). GetErrorLogs(ts-delivery-service) shows "java.sql.SQLException: Access denied for user 'ts'@'172.20.3.207' (using password: YES)", "SQL Error: 1045, SQLState: 28000" and "Failed to initialize JPA EntityMan

### case-38

- **结论**：`app/ts-food-delivery-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-food-delivery-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 461,052
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0851_trainticket-runtime-38](../results/1021_0900_tsm-v1-fix/raw/1021_0851_trainticket-runtime-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket pod inventory is ts-food-delivery-service-d7f948cf4-q5jjp: READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4, NODE worker-01, while all other 46 pods are 1/1 Running. Pod sheet shows Last State Terminated reason Error exit code 1, Ready False, readiness tcpSocket :18957 never passing; events show 'Successfully assigned ... to worker-01', 'Container image already present on machine' (so no scheduling/affinity/taint or image-pull cause) and 'Warning BackOff Back-off restarting failed container ts-food-delivery-service'. GetErrorLogs gives the breakpoint: 'HikariPool

### case-39

- **结论**：`app/ts-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 263,179
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0852_trainticket-runtime-39](../results/1021_0900_tsm-v1-fix/raw/1021_0852_trainticket-runtime-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：Single outlier in pod listing: ts-food-service-6bdb8b7ddb-dm8sx 0/1 CrashLoopBackOff with 4 restarts while all other workloads are 1/1 Running. Complaint side first: upstream caller ts-preserve-service error log shows 'Service Instance cannot be null'; connectivity probe on the Service-declared port 18856 fails from worker-01/02/03; namespace events carry 'Warning BackOff pod/ts-food-service-6bdb8b7ddb-dm8sx Back-off restarting failed container ts-food-service'. Pod sheet shows Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled / 143 SIGTERM), image already present, so probe/i

### case-40

- **结论**：`app/ts-inside-payment-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-inside-payment-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 298,882
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-40](../results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing shows the single outlier ts-inside-payment-service-5d5bd5c84d-cp9g6 as 0/1 CrashLoopBackOff with 4 restarts while all peer services are 1/1 Running. Its Service exists (port 18673 -> targetPort 18673, selector app=ts-inside-payment-service) but Endpoints is empty, and the upstream caller ts-cancel-service logs 'Service Instance cannot be null' (null-instance symptom of the downstream callee). Pod detail: State Waiting (CrashLoopBackOff), Last State Terminated Reason Error Exit Code 1, image already present (no image-pull fault), Node worker-03. First-level error logs: 'java.sql.SQ

### case-41

- **结论**：`app/ts-notification-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-notification-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 244,726
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-41](../results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side: only outlier in pods listing is ts-notification-service-675d7d65b4-lgcfw 0/1 CrashLoopBackOff with 4 restarts; TCP connectivity probe to the service's own declared port 17853 failed from worker-01/02/03 (no ready endpoints). Workload/mechanism: pod Last State Terminated Reason=Error ExitCode=1, and the namespace event surface carries 'Warning BackOff pod/ts-notification-service-675d7d65b4-lgcfw - Back-off restarting failed container ts-notification-service'. Breakpoint on the config/log face: GetErrorLogs shows 'HikariPool-1 - Exception during pool initialization' caused by 'java

### case-42

- **结论**：`app/ts-order-other-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-order-other-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 258,659
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0854_trainticket-runtime-42](../results/1021_0900_tsm-v1-fix/raw/1021_0854_trainticket-runtime-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: alert shows entry ts-preserve-service POST /api/v1/preserveservice/preserve returning 500; its error logs (99x) show 500 propagated from ts-security-service path /api/v1/securityservice/securityConfigs/..., and ts-security-service logs (99x) show 'java.lang.IllegalArgumentException: Service Instance cannot be null' - a null-instance symptom of its downstream callee ts-order-other-service (L1 relation ts-security-service -> ts-order-other-service). Connectivity probe on ts-order-other-service declared port 12032 (spec.ports[0].port=12032) failed from worker-01/worker-02/work

### case-43

- **结论**：`app/ts-order-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-order-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 271,735
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0855_trainticket-runtime-43](../results/1021_0900_tsm-v1-fix/raw/1021_0855_trainticket-runtime-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-order-service 是唯一离群对象（pod ts-order-service-57d9f6ffbd-2p24f 0/1 CrashLoopBackOff, Restart Count 4, Last State Terminated Reason Error Exit Code 1）。信号侧 GetErrorLogs 原文: 'java.sql.SQLException: Access denied for user ts@172.20.2.81 (using password: YES)', 'SQL Error: 1045, SQLState: 28000' -> 'HikariPool-1 - Exception during pool initialization' -> 'Failed to initialize JPA EntityManagerFactory' -> 'Application run failed'。配置面 GetAppYAML 显示容器通过 envFrom secretRef ts-order-mysql 获取 DB 凭据；Secret 值证据 ORDER_MYSQL_HOST=tsdb-mysql-leader, PORT=3306, DATABASE=ts, USER=ts, PASSWORD=Piodvgxpp077，而同指向 t

### case-44

- **结论**：`app/ts-payment-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-payment-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 231,323
- **raw 日志**：[results/1021_0243_tsm-v1-b109/raw/1021_0244_trainticket-runtime-44](../results/1021_0243_tsm-v1-b109/raw/1021_0244_trainticket-runtime-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket shows one outlier pod: ts-payment-service-76d7d44b5b-xjcsw 0/1 CrashLoopBackOff with 4 restarts (Last State Terminated, Reason Error, Exit Code 1); kubelet event: Warning BackOff 'Back-off restarting failed container ts-payment-service'. Its error log gives the mechanism verbatim: 'java.sql.SQLException: Access denied for user 'ts'@'172.20.1.60' (using password: YES)' and 'SQL Error: 1045, SQLState: 28000', followed by 'Failed to initialize JPA EntityManagerFactory: ... Unable to open JDBC Connection' and 'Application run failed' -> exit code 1. Config face confirms the 

### case-45

- **结论**：`app/ts-price-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-price-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 279,073
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0856_trainticket-runtime-45](../results/1021_0900_tsm-v1-fix/raw/1021_0856_trainticket-runtime-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-price-service-69f84bfbc4-lhrjp is the only outlier: 0/1 CrashLoopBackOff (4 restarts); Last State Terminated, Reason Error, Exit Code 1 after ~28s (not OOMKilled 137, not SIGTERM 143), so this is a startup crash, not a probe kill or memory limit. Its endpoints are empty (GetResources endpoints ts-price-service -> ENDPOINTS blank), and the caller ts-basic-service logs 'java.lang.IllegalArgumentException: Service Instance cannot be null', i.e. the downstream callee is unreachable. The container's own error log gives the mechanism verbatim: 'HikariPool-1 - Exception during pool initialization'

### case-46

- **结论**：`app/ts-route-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-route-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 246,233
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0857_trainticket-runtime-46](../results/1021_0900_tsm-v1-fix/raw/1021_0857_trainticket-runtime-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan of train-ticket pods found exactly one outlier: ts-route-service-84fdb67598-lctt7, READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4. Entry caller ts-gateway-service had no error logs, but ts-route-service's own error log shows: "java.sql.SQLException: Access denied for user 'ts'@'172.20.2.66' (using password: YES)" and "SQL Error: 1045, SQLState: 28000", followed by "HikariPool-1 - Exception during pool initialization", "Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connection for DDL execution" and "Application run failed". Pod detail: Last State Terminate

### case-47

- **结论**：`app/ts-security-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-security-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 298,784
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0857_trainticket-runtime-47](../results/1021_0900_tsm-v1-fix/raw/1021_0857_trainticket-runtime-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory outlier: pod ts-security-service-64cb5fb74d-w7425 is 0/1 CrashLoopBackOff with 4 restarts while all ~50 peer pods are 1/1 Running. Signal side: connectivity probe to ts-security-service on its own Service-declared port 11188 failed from worker-01/02/03, and endpoints for ts-security-service are '<none>' (no ready address); the front-door ts-gateway-service has no error logs. Pod sheet: Last State Terminated, Reason Error, Exit Code 1 (not 137 OOMKilled, not 143 kubelet SIGTERM), so memory limit and probe-kill classes are excluded; readinessProbe is tcp-socket:11188 delay=60s while th

### case-48

- **结论**：`app/ts-station-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-station-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 220,685
- **raw 日志**：[results/1021_0301_tsm-v1-b118/raw/1021_0301_trainticket-runtime-48](../results/1021_0301_tsm-v1-b118/raw/1021_0301_trainticket-runtime-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in namespace train-ticket pods listing: ts-station-food-service-68497bf65b-pdhfm 0/1 CrashLoopBackOff (RESTARTS 4) while all 44 peer pods are 1/1 Running. Caller side: ts-gateway-service has no error logs, but upstream ts-food-service logs 'java.lang.IllegalArgumentException: Service Instance cannot be null', and connectivity probe to the Service's own declared port 18855 fails from worker-01/02/03. Pod detail: State Waiting/CrashLoopBackOff, Last State Terminated Reason=Error ExitCode=1 (not 137 OOM, not 143 SIGTERM); events show Scheduled/Pulled/Created/Started then 'Warning Bac

### case-49

- **结论**：`app/ts-station-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-station-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 257,417
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0843_trainticket-runtime-49](../results/1021_0900_tsm-v1-fix/raw/1021_0843_trainticket-runtime-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' had no named service, so the inventory scan was the legal entry: the only outlier is pod ts-station-service-fd984464d-g552p (READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4-5, exit code 1), and Deployment ts-station-service is 0/1 AVAILABLE while all other 44 business pods are 1/1 Running. Complaint side: TCP connectivity to ts-station-service:12345 (the port its own Service declares) fails from worker-01, worker-02 and worker-03; upstream caller ts-basic-service GetErrorLogs shows 73x 'java.lang.IllegalArgumentException: Service Instance cannot be null

### case-50

- **结论**：`app/ts-ticket-office-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-ticket-office-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 394,632
- **raw 日志**：[results/1021_0313_tsm-v1-b124/raw/1021_0313_trainticket-runtime-50](../results/1021_0313_tsm-v1-b124/raw/1021_0313_trainticket-runtime-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：Isolated single-service outage: pods listing shows ts-ticket-office-service-588b66bc4b-ztkhq 0/1 CrashLoopBackOff with 5 restarts while all other train-ticket services are 1/1 Running. Endpoints of ts-ticket-office-service are empty (no Ready backend) and an active TCP probe on the Service's own declared port 16108 fails from worker-01, worker-02 and worker-03 - matching the reported partial service unreachability. Pod detail: Last State Terminated Reason=Error Exit Code=1, started 13:08:40 and finished 13:08:41 (~1s), Warning BackOff 'Back-off restarting failed container ts-ticket-office-serv

### case-51

- **结论**：`app/ts-train-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-train-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 269,044
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0844_trainticket-runtime-51](../results/1021_0900_tsm-v1-fix/raw/1021_0844_trainticket-runtime-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-train-food-service-54754ff6f6-t6sj2 is the only outlier (0/1, CrashLoopBackOff, 4 restarts) while all peers are 1/1 Running; it was scheduled fine (Scheduled to worker-03, image 'already present', Created/Started normal) and last termination is Reason=Error ExitCode=1 (not 137/OOMKilled) -> application-level startup crash, not scheduling/image-pull/memory/probe. Upstream caller ts-food-service error logs show 83x 'java.lang.IllegalArgumentException: Service Instance cannot be null' and a connectivity probe on the Service's own declared port 19999 returns Connection Failed on worker-01/0

### case-52

- **结论**：`app/ts-train-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-train-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 339,663
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0845_trainticket-runtime-52](../results/1021_0900_tsm-v1-fix/raw/1021_0845_trainticket-runtime-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket pod sheet: ts-train-service-79b45885dd-smhv9 is 0/1 CrashLoopBackOff (4 restarts) on worker-03; pod detail shows Last State Terminated, Reason Error, Exit Code 1, readiness probe tcp-socket :14567 never passing, and pod events containing only 'BackOff' with Scheduled/Pulled/Created/Started all Normal (rules out scheduling, image pull, volume, ServiceAccount). Error logs give the first breakpoint: 'java.sql.SQLException: Access denied for user ts@172.20.3.174 (using password: YES)', 'SQL Error: 1045, SQLState: 28000', then 'Failed to initialize JPA EntityManager

### case-53

- **结论**：`app/ts-travel2-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-travel2-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 480,915
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0845_trainticket-runtime-53](../results/1021_0900_tsm-v1-fix/raw/1021_0845_trainticket-runtime-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-travel2-service 是 train-ticket 中唯一离群工作负载：pod ts-travel2-service-c56664fd-x6mc6 为 0/1 CrashLoopBackOff，Restart Count 4，Last State Terminated/Reason Error/Exit Code 1，Readiness false。其错误日志显示 'HikariPool-1 - Exception during pool initialization' 与 'java.sql.SQLException: Access denied for user ts@172.20.3.40 (using password: YES)'，SQL Error: 1045, SQLState: 28000，进而 'Failed to initialize JPA EntityManagerFactory' 与 'Application run failed'。pod 事件与 namespace 事件均以 'Warning BackOff ... Back-off restarting failed container ts-travel2-service in pod ts-travel2-service-c56664fd-x6mc6' 将该机制逐字绑到该实例。配置

### case-54

- **结论**：`app/ts-travel-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-travel-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 380,764
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0846_trainticket-runtime-54](../results/1021_0900_tsm-v1-fix/raw/1021_0846_trainticket-runtime-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: gateway has no errors; alerts show ts-preserve-service POST /api/v1/preserveservice/preserve returning HTTPError('500 Server Error') x90, and ts-preserve-service error logs (97/12084) carry only 'java.lang.IllegalArgumentException: Service Instance cannot be null', which per the L3 cross-service rule is a symptom of its downstream callee. Pruned workload listing has exactly one outlier row: ts-travel-service-55fd6fc94d-sfbc6 0/1 CrashLoopBackOff 4 (51s ago) on worker-01, and ts-travel-service is a direct callee of ts-preserve-service. Pod sheet: Last State Terminated, Reason Er

### case-55

- **结论**：`app/ts-user-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-user-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 244,788
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0847_trainticket-runtime-55](../results/1021_0900_tsm-v1-fix/raw/1021_0847_trainticket-runtime-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory entry (symptom named no service) showed exactly one outlier: pod ts-user-service-b795844f6-4dczn on worker-03 is 0/1 READY, CrashLoopBackOff, 4 restarts. Complaint side first: callers ts-cancel-service and ts-preserve-service log 'Service Instance cannot be null' (alert: POST /api/v1/preserveservice/preserve -> HTTPError('500 Server Error')), i.e. a null-instance symptom of their downstream callee ts-user-service. Callee workload sheet: PodScheduled True, image Pulled, container Created+Started all Normal (no FailedScheduling / image-pull / probe error); Last State Terminated, Reason

### case-56

- **结论**：`app/ts-voucher-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-voucher-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 350,620
- **raw 日志**：[results/1021_0331_tsm-v1-b133/raw/1021_0332_trainticket-runtime-56](../results/1021_0331_tsm-v1-b133/raw/1021_0332_trainticket-runtime-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: ts-voucher-service Service endpoints are empty (ENDPOINTS blank) and a probe on the Service's own declared port 16101 failed from worker-01/02/03; the only outlier in the pods listing is ts-voucher-service-5b8bd94c88-g25t5 (0/1 CrashLoopBackOff, RESTARTS 5) while all other workloads are 1/1 Running; ts-gateway-service has no error logs. Object side: pod detail shows Last State Terminated / Reason Error / Exit Code 1 after ~1s run (not 137 OOMKilled, not 143 probe SIGTERM; no Unhealthy/FailedMount/FailedCreate/FailedScheduling events - only BackOff restarting failed container). Er

### case-57

- **结论**：`app/ts-assurance-service` + `mysql_invalid_port` ｜ 标签 `app/ts-assurance-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 21 · tokens 409,710
- **raw 日志**：[results/1021_0335_tsm-v1-b135/raw/1021_0335_trainticket-runtime-57](../results/1021_0335_tsm-v1-b135/raw/1021_0335_trainticket-runtime-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-assurance-service pod ts-assurance-service-85577d9b4d-gnn7w is 0/1 CrashLoopBackOff with Restart Count 4 and Last State Terminated / Reason Error / Exit Code 1 (not 137 OOMKilled, not 143 SIGTERM-by-kubelet). Its error log shows HikariPool-1 pool initialization failing with 'Communications link failure' caused by 'java.net.ConnectException: Connection refused', ending in 'Application run failed' - a startup-time DB reachability failure, not a DNS failure (host tsdb-mysql-leader resolves; no UnknownHostException). Config closure: GetAppYAML(ts-assurance-service) injects the DB address via en

### case-58

- **结论**：`app/ts-auth-service` + `mysql_invalid_port` ｜ 标签 `app/ts-auth-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 300,023
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0848_trainticket-runtime-58](../results/1021_0900_tsm-v1-fix/raw/1021_0848_trainticket-runtime-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: POST /api/v1/users/login on ts-auth-service returns 503 (370x). Pod ts-auth-service-7689b8d556-gmft2 is 0/1 CrashLoopBackOff with Last State Terminated Reason=Error Exit Code=1 (not 137/143, so no OOM and no probe kill), and Events show 'Back-off restarting failed container ts-auth-service'. GetErrorLogs(ts-auth-service): 'HikariPool-1 - Exception during pool initialization', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure', 'Caused by: java.net.ConnectException: Connection refused', ending in 'Unable to build Hibernate SessionFactory' and 'Application

### case-59

- **结论**：`app/ts-config-service` + `mysql_invalid_port` ｜ 标签 `app/ts-config-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 23 · tokens 325,960
- **raw 日志**：[results/1021_0341_tsm-v1-b138/raw/1021_0341_trainticket-runtime-59](../results/1021_0341_tsm-v1-b138/raw/1021_0341_trainticket-runtime-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：Chain from complaint side: alert POST /api/v1/preserveservice/preserve returns 500 at entry service ts-preserve-service; its error log shows [preserve][Step 3][Check tickets num] getTickets failed calling ts-travel-service /api/v1/travelservice/trip_detail (500). ts-travel-service error logs show 500 on ts-seat-service /api/v1/seatservice/seats/left_tickets; ts-seat-service throws java.lang.IllegalArgumentException: Service Instance cannot be null (empty instance list). Pod inventory has exactly one outlier: ts-config-service-778646698d-qmbf9 0/1 CrashLoopBackOff RESTARTS 4, Last State Termina

### case-60

- **结论**：`app/ts-contacts-service` + `mysql_invalid_port` ｜ 标签 `app/ts-contacts-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 300,192
- **raw 日志**：[results/1021_0345_tsm-v1-b140/raw/1021_0346_trainticket-runtime-60](../results/1021_0345_tsm-v1-b140/raw/1021_0346_trainticket-runtime-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-contacts-service-878884888-q6btj is 0/1 CrashLoopBackOff (Restart Count: 4, Last State Terminated Reason=Error Exit Code=1, Ready False); events show 'Warning BackOff Back-off restarting failed container ts-contacts-service'. Connectivity probe on the Service's own declared port (ts-contacts-service:12347) fails from worker-01/02/03, matching alert entry_service ts-contacts-service HTTPError('503 Server Error'). Error logs give the mechanism: 'HikariPool-1 - Exception during pool initialization' -> 'CommunicationsException: Communications link failure' -> 'java.net.ConnectException: Con

### case-61

- **结论**：`app/ts-delivery-service` + `mysql_invalid_port` ｜ 标签 `app/ts-delivery-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 17 · tokens 493,261
- **raw 日志**：[results/1021_0347_tsm-v1-b141/raw/1021_0347_trainticket-runtime-61](../results/1021_0347_tsm-v1-b141/raw/1021_0347_trainticket-runtime-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-delivery-service pod ts-delivery-service-787cbf858d-2hs67 is 0/1 CrashLoopBackOff with 4 restarts. Pod sheet shows Last State Terminated / Reason: Error / Exit Code: 1 (not OOMKilled 137), image Pulled (already present), PodScheduled True, so it is a pure application-startup failure. GetErrorLogs shows 'HikariPool-1 - Exception during pool initialization', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure' caused by 'java.net.ConnectException: Connection refused (Connection refused)' and finally 'Application run failed'. The container takes MySQL settings fr

### case-62

- **结论**：`app/ts-food-delivery-service` + `mysql_invalid_port` ｜ 标签 `app/ts-food-delivery-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 445,350
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0849_trainticket-runtime-62](../results/1021_0900_tsm-v1-fix/raw/1021_0849_trainticket-runtime-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-delivery-service pods show the only outlier in the namespace: ts-food-delivery-service-d7f948cf4-kzzn8 READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4, Last State Terminated Reason Error ExitCode 1, events 'Warning BackOff Back-off restarting failed container' (no FailedScheduling/FailedCreate/FailedMount/image-pull). GetErrorLogs shows 'HikariPool-1 - Exception during pool initialization', 'CommunicationsException: Communications link failure', 'Caused by: java.net.ConnectException: Connection refused' and 'Unable to open JDBC Connection for DDL execution' — host resolved, nothing list

### case-63

- **结论**：`app/ts-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 273,596
- **raw 日志**：[results/1021_0353_tsm-v1-b144/raw/1021_0353_trainticket-runtime-63](../results/1021_0353_tsm-v1-b144/raw/1021_0353_trainticket-runtime-63/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service pod ts-food-service-6bdb8b7ddb-m7p6z is 0/1 CrashLoopBackOff (4 restarts) while all other train-ticket services are 1/1 Running; connectivity probe on the Service-declared port 18856 fails from worker-01/02/03. Pod last state is Terminated with Reason Error and Exit Code 1 (not 137/OOM), and events show 'Warning BackOff: Back-off restarting failed container ts-food-service'. Error logs show Hikari pool init failure: 'Caused by: java.net.ConnectException: Connection refused (Connection refused)' then 'Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connecti

### case-64

- **结论**：`app/ts-inside-payment-service` + `mysql_invalid_port` ｜ 标签 `app/ts-inside-payment-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 340,906
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0850_trainticket-runtime-64](../results/1021_0900_tsm-v1-fix/raw/1021_0850_trainticket-runtime-64/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory outlier: ts-inside-payment-service-5d5bd5c84d-5hfgx is 0/1 CrashLoopBackOff with 4 restarts (all other 40+ service pods are 1/1 Running); alert entry_service is ts-inside-payment-service with HTTPError 503. Error logs show startup DB failure: 'HikariPool-1 - Exception during pool initialization' -> 'CommunicationsException: Communications link failure' -> 'Caused by: java.net.ConnectException: Connection refused (Connection refused)' -> 'Failed to initialize JPA EntityManagerFactory' -> 'Application run failed'. Pod detail: Last State Terminated Reason Error Exit Code 1, Waiting 

### case-65

- **结论**：`app/ts-notification-service` + `mysql_invalid_port` ｜ 标签 `app/ts-notification-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 299,406
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0851_trainticket-runtime-65](../results/1021_0900_tsm-v1-fix/raw/1021_0851_trainticket-runtime-65/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in namespace train-ticket pods listing: ts-notification-service-675d7d65b4-bdt28 is 0/1 CrashLoopBackOff with 4 restarts (all other workloads 1/1 Running). Signal side: probing its own Service-declared port 17853 from worker-01/02/03 returns 'Connection Failed'. Pod sheet: Last State Terminated, Reason Error, Exit Code 1 (not OOMKilled 137 / not SIGTERM 143), events show 'BackOff - Back-off restarting failed container'. Error logs show the causal chain: 'HikariPool-1 - Exception during pool initialization' -> 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications li

### case-66

- **结论**：`app/ts-order-other-service` + `mysql_invalid_port` ｜ 标签 `app/ts-order-other-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 325,324
- **raw 日志**：[results/1021_0359_tsm-v1-b147/raw/1021_0359_trainticket-runtime-66](../results/1021_0359_tsm-v1-b147/raw/1021_0359_trainticket-runtime-66/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-order-other-service pod ts-order-other-service-77f574b58b-gqrnq is 0/1 CrashLoopBackOff with 4 restarts; DescribeResource shows Last State Terminated, Reason Error, Exit Code 1 (not OOMKilled 137 nor SIGTERM 143, probes and scheduling normal), and events show 'Warning BackOff ... Back-off restarting failed container ts-order-other-service'. Its logs show startup abort: HikariPool-1 Exception during pool initialization -> com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure -> Caused by: java.net.ConnectException: Connection refused, then 'Unable to open JDBC Con

### case-67

- **结论**：`app/ts-order-service` + `mysql_invalid_port` ｜ 标签 `app/ts-order-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 17 · tokens 240,402
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0852_trainticket-runtime-67](../results/1021_0900_tsm-v1-fix/raw/1021_0852_trainticket-runtime-67/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts point at the order chain: ts-order-service /order/refresh returns 503 (x54) and ts-preserve-service /preserve returns 500 (x91). Pod inventory has exactly one outlier: ts-order-service-57d9f6ffbd-ptbwc 0/1 CrashLoopBackOff (RESTARTS 4), Last State Terminated Reason=Error Exit Code=1; its only Events line is 'BackOff restarting failed container' (no FailedScheduling/FailedMount/image-pull), so the crash is in-process at DB-connect time. ts-order-service error logs: 'HikariPool-1 - Exception during pool initialization', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications

### case-68

- **结论**：`app/ts-payment-service` + `mysql_invalid_port` ｜ 标签 `app/ts-payment-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 347,060
- **raw 日志**：[results/1021_0401_tsm-v1-b148/raw/1021_0402_trainticket-runtime-68](../results/1021_0401_tsm-v1-b148/raw/1021_0402_trainticket-runtime-68/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-payment-service pod ts-payment-service-76d7d44b5b-2bvw2 is 0/1 CrashLoopBackOff (RESTARTS 4) while every peer pod on worker-03 is 1/1 Running; pod detail shows Last State Terminated, Reason Error, Exit Code 1 (not OOMKilled 137, not SIGTERM 143) with readiness a tcpSocket on 19001. Its error log shows HikariPool-1 pool initialization failing: CommunicationsException ... Caused by: java.net.ConnectException: Connection refused, then Failed to initialize JPA EntityManagerFactory and 'Application run failed', so the container exits 1 on every start and kubelet reports 'Warning BackOff Back-off

### case-69

- **结论**：`app/ts-price-service` + `mysql_invalid_port` ｜ 标签 `app/ts-price-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4667 · steps 16 · tokens 242,664
- **raw 日志**：[results/1021_0403_tsm-v1-b149/raw/1021_0403_trainticket-runtime-69](../results/1021_0403_tsm-v1-b149/raw/1021_0403_trainticket-runtime-69/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: alert on POST /api/v1/preserveservice/preserve (entry ts-preserve-service) with HTTPError('500 Server Error'), and ts-preserve-service error logs show '[preserve][Step 3][Check tickets num][Search For Trip Detail Information error][TripId: G1235, message: getTickets failed]' plus HttpServerErrorException 500 on /api/v1/travelservice/trip_detail. Pods listing has exactly one outlier: ts-price-service-69f84bfbc4-qcf2l READY 0/1 STATUS CrashLoopBackOff RESTARTS 4. Pod detail shows Last State Terminated Reason Error Exit Code 1, no OOMKilled(137), no probe Unhealthy, Scheduling/Pul

### case-70

- **结论**：`app/ts-route-service` + `mysql_invalid_port` ｜ 标签 `app/ts-route-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 272,520
- **raw 日志**：[results/1021_0405_tsm-v1-b150/raw/1021_0406_trainticket-runtime-70](../results/1021_0405_tsm-v1-b150/raw/1021_0406_trainticket-runtime-70/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-route-service pod 84fdb67598-pvp7g is 0/1 CrashLoopBackOff (4 restarts, Last State Terminated/Reason Error/Exit Code 1); events show Normal Scheduled/Pulled/Created plus Warning BackOff, ruling out scheduling/image/mount. Its logs show HikariPool-1 pool initialization failed with com.mysql.cj.jdbc.exceptions.CommunicationsException / Caused by: java.net.ConnectException: Connection refused, then Failed to initialize JPA EntityManagerFactory and Application run failed. DB coordinates come from envFrom secret ts-route-mysql, whose ROUTE_MYSQL_HOST=tsdb-mysql-leader but ROUTE_MYSQL_PORT=34015,

### case-71

- **结论**：`app/ts-security-service` + `mysql_invalid_port` ｜ 标签 `app/ts-security-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 251,175
- **raw 日志**：[results/1021_0407_tsm-v1-b151/raw/1021_0408_trainticket-runtime-71](../results/1021_0407_tsm-v1-b151/raw/1021_0408_trainticket-runtime-71/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert on POST /api/v1/preserveservice/preserve (94x HTTP 500) from entry service ts-preserve-service, whose error log repeats 'java.lang.IllegalArgumentException: Service Instance cannot be null' (109x); TCP probe of ts-security-service on its declared Service port 11188 fails from worker-01/02/03. Workload: pod ts-security-service-64cb5fb74d-sjbz4 is 0/1 CrashLoopBackOff with Restart Count 4 and Last State Terminated Reason=Error ExitCode=1; events show 'Warning BackOff Back-off restarting failed container ts-security-service' while Pulled/Created/Started are Normal (rules out i

### case-72

- **结论**：`app/ts-station-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-station-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3158 · steps 20 · tokens 375,208
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-72](../results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-72/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 SOP matched exactly (symptom-side first). Entry services ts-gateway-service and ts-ui-dashboard had no error logs; sole alert was a generic 500 pointer. Pods inventory had exactly one outlier: ts-station-food-service-68497bf65b-d5ptz 0/1 CrashLoopBackOff, RESTARTS 4. Pod detail: Last State Terminated Reason=Error Exit Code=1, State Waiting CrashLoopBackOff, Ready=False, Restart Count=4; image already present and container Created/Started were Normal, so scheduling/image-pull/SA/mount classes are excluded. Pod Events carry the mechanism verbatim: 'Warning BackOff - Back-off restarting failed

### case-73

- **结论**：`app/ts-station-service` + `mysql_invalid_port` ｜ 标签 `app/ts-station-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.45 · steps 21 · tokens 303,892
- **raw 日志**：[results/1021_0411_tsm-v1-b153/raw/1021_0411_trainticket-runtime-73](../results/1021_0411_tsm-v1-b153/raw/1021_0411_trainticket-runtime-73/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller ts-basic-service error log (65x): "nested exception is java.lang.IllegalArgumentException: Service Instance cannot be null"; connectivity probe to ts-station-service:12345 failed from worker-01/02/03. Pod listing outlier: ts-station-service-fd984464d-lbpfp 0/1 CrashLoopBackOff RESTARTS 4; pod detail Node worker-02, image Pulled, Last State Terminated Reason Error Exit Code 1 (not a scheduling/probe/image-pull fault). ts-station-service GetErrorLogs: 'HikariPool-1 - Exception during pool initialization' -> 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure

### case-74

- **结论**：`app/ts-train-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-train-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 244,965
- **raw 日志**：[results/1021_0411_tsm-v1-b153/raw/1021_0412_trainticket-runtime-74](../results/1021_0411_tsm-v1-b153/raw/1021_0412_trainticket-runtime-74/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact 命中 'Partial Service Unreachability.'。症状侧: 上游调用方 ts-food-service 84 条错误全部为 java.lang.IllegalArgumentException: Service Instance cannot be null (下游实例不可用)。对象层 pods 清单唯一离群行 ts-train-food-service-54754ff6f6-phsqh READY 0/1 STATUS CrashLoopBackOff RESTARTS 4, 其余 48 个 pod 均 1/1 Running。Pod 详情 Last State: Terminated, Reason: Error, Exit Code: 1, PodScheduled True, 镜像 already present -> 排除调度/镜像/配额/PVC 分支。机制面受害服务自身错误日志: 'HikariPool-1 - Exception during pool initialization', 'Caused by: java.net.ConnectException: Connection refused (Connection refused)', 'Unable to build Hibernate SessionFactory

### case-75

- **结论**：`app/ts-train-service` + `mysql_invalid_port` ｜ 标签 `app/ts-train-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 273,765
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-75](../results/1021_0900_tsm-v1-fix/raw/1021_0853_trainticket-runtime-75/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-train-service pod 79b45885dd-xd4wx is 0/1 CrashLoopBackOff with 4 restarts (Last State: Terminated, Reason: Error, Exit Code: 1), event surface shows 'Warning BackOff ... pod/ts-train-service-79b45885dd-xd4wx'. Its error log shows HikariPool init failure: 'Communications link failure' caused by 'java.net.ConnectException: Connection refused', then 'Unable to build Hibernate SessionFactory ... JDBCConnectionException', 'Application run failed' - a TCP-layer refusal, not UnknownHost (rules out DNS) and not Access denied (rules out credentials). Config closure: deployment envFrom secretRef ts-

### case-76

- **结论**：`app/ts-travel2-service` + `mysql_invalid_port` ｜ 标签 `app/ts-travel2-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 285,176
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0854_trainticket-runtime-76](../results/1021_0900_tsm-v1-fix/raw/1021_0854_trainticket-runtime-76/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in train-ticket pod sheet: ts-travel2-service-c56664fd-f7ddw 0/1 CrashLoopBackOff (Restart Count 4, Last State Terminated Reason=Error Exit Code=1). Its first-level error log shows 'HikariPool-1 - Exception during pool initialization', 'CommunicationsException: Communications link failure', 'Caused by: java.net.ConnectException: Connection refused', and 'Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connection for DDL execution' - i.e. the app cannot open a JDBC connection to MySQL at startup. The deployment injects DB address via envFrom secretRef ts-trave

### case-77

- **结论**：`app/ts-travel-service` + `mysql_invalid_port` ｜ 标签 `app/ts-travel-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 248,224
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0855_trainticket-runtime-77](../results/1021_0900_tsm-v1-fix/raw/1021_0855_trainticket-runtime-77/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: ts-preserve-service error log shows 'java.lang.IllegalArgumentException: Service Instance cannot be null' (106x) and alert POST /api/v1/preserveservice/preserve -> 500; pod inventory shows the single outlier ts-travel-service-55fd6fc94d-dlhf4 0/1 CrashLoopBackOff with 4 restarts (Last State Terminated, Reason Error, Exit Code 1). Container logs: 'HikariPool-1 - Exception during pool initialization', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure', 'Caused by: java.net.ConnectException: Connection refused (Connection refused)', then 'Failed to i

### case-78

- **结论**：`app/ts-user-service` + `mysql_invalid_port` ｜ 标签 `app/ts-user-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 304,579
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0856_trainticket-runtime-78](../results/1021_0900_tsm-v1-fix/raw/1021_0856_trainticket-runtime-78/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: ts-preserve-service returns HTTP 500 on POST /api/v1/preserveservice/preserve with 'IllegalArgumentException: Service Instance cannot be null' plus 'getTickets failed', i.e. a missing downstream instance. Pod inventory shows a single outlier: ts-user-service-b795844f6-v5kft is 0/1 CrashLoopBackOff with RESTARTS 4 on worker-01 (all other 45 workloads 1/1 Running). Pod detail: Last State Terminated Reason Error Exit Code 1; Events show 'Back-off restarting failed container ts-user-service'; image pull and scheduling are Normal, so no image/scheduling class. Error logs: 'HikariPoo

### case-79

- **结论**：`app/ts-assurance-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-assurance-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2727 · steps 12 · tokens 297,428
- **raw 日志**：[results/1021_0419_tsm-v1-b157/raw/1021_0420_trainticket-runtime-79](../results/1021_0419_tsm-v1-b157/raw/1021_0420_trainticket-runtime-79/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-assurance-service-5df4cbbdc-5wkbb is outlier in the pods listing (1/2 Running, 4 restarts, Ready False) while all other pods are 2/2; alerts show 15x 503 on /api/v1/assuranceservice/assurances/types. Its error log states: "Failed to start bean 'webServerStartStop'; nested exception is org.springframework.boot.web.server.PortInUseException: Port 18888 is already in use" and "Web server failed to start. Port 18888 was already in use." Pod describe shows container ts-assurance-service has Port 18888/TCP with Last State Terminated Reason Error Exit Code 1 Restart Count 4, while istio-proxy

### case-80

- **结论**：`app/ts-basic-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-basic-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 396,616
- **raw 日志**：[results/1021_0424_tsm-v1-b159/raw/1021_0424_trainticket-runtime-80](../results/1021_0424_tsm-v1-b159/raw/1021_0424_trainticket-runtime-80/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom entered from the complaint side: ts-preserve-service error log shows 500 on /api/v1/travelservice/trip_detail, and ts-travel-service logs 'java.lang.IllegalArgumentException: Service Instance cannot be null' repeatedly, i.e. no available downstream instance. Dependency chain ts-travel-service -> ts-basic-service; active TCP probe on the port the Service declares (15680) failed from worker-01/02/03. Object layer: pod ts-basic-service-664d46695c-v75jc is 1/2 READY, CrashLoopBackOff, 4 restarts; endpoints/ts-basic-service is EMPTY. Mechanism: pod detail shows Last State Terminated, Reason

### case-81

- **结论**：`app/ts-cancel-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-cancel-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2308 · steps 14 · tokens 323,424
- **raw 日志**：[results/1021_0424_tsm-v1-b159/raw/1021_0424_trainticket-runtime-81](../results/1021_0424_tsm-v1-b159/raw/1021_0424_trainticket-runtime-81/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-cancel-service pod ts-cancel-service-7f57f4856f-thzp5 is 1/2 READY with 3 restarts; app container last state Terminated (Reason: Error, Exit Code: 1) while istio-proxy sidecar is Running and Ready. GetErrorLogs shows 'org.springframework.boot.web.server.PortInUseException: Port 18885 is already in use' and 'APPLICATION FAILED TO START / Web server failed to start. Port 18885 was already in use.'. GetAppYAML(ts-cancel-service) shows the app container declares containerPort 18885 (readinessProbe tcpSocket 18885) while the pod template annotation proxy.istio.io/config sets the sidecar statusPo

### case-82

- **结论**：`app/ts-contacts-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-contacts-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2727 · steps 12 · tokens 298,760
- **raw 日志**：[results/1021_0425_tsm-v1-b160/raw/1021_0426_trainticket-runtime-82](../results/1021_0425_tsm-v1-b160/raw/1021_0426_trainticket-runtime-82/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert entry service ts-contacts-service returned HTTPError('503 Server Error: Service Unavailable') 20x on GET /api/v1/contactservice/contacts/account/{userId} and POST /api/v1/contactservice/contacts. Pods listing shows the single outlier ts-contacts-service-7946b749bf-m8ps8 1/2 CrashLoopBackOff with Last State Terminated Reason=Error Exit Code=1. GetErrorLogs(ts-contacts-service) gives the mechanism verbatim: 'org.springframework.boot.web.server.PortInUseException: Port 12347 is already in use' and 'Web server failed to start. Port 12347 was already in use. APPLICATION FAILED TO START'. The 

### case-83

- **结论**：`app/ts-food-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-food-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.25 · steps 13 · tokens 323,374
- **raw 日志**：[results/1021_0427_tsm-v1-b161/raw/1021_0427_trainticket-runtime-83](../results/1021_0427_tsm-v1-b161/raw/1021_0427_trainticket-runtime-83/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service is the only outlier in the pods listing: ts-food-service-5744cc6666-5gs7t is 1/2 Running with RESTARTS 4 (78s ago) while all other 45 app pods are 2/2 Running with 0 restarts. Its pod detail shows the app container Last State 'Terminated, Reason: Error, Exit Code: 1, Restart Count: 4, Ready: False', and the sidecar istio-proxy carries PROXY_CONFIG '{statusPort:18856}' plus ISTIO_KUBE_APP_PROBERS tcpSocket port 18856. First-level error log of the service: 'Failed to start bean webServerStartStop; nested exception is org.springframework.boot.web.server.PortInUseException: Port 18

### case-84

- **结论**：`app/ts-gateway-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-gateway-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2308 · steps 14 · tokens 481,495
- **raw 日志**：[results/1021_0429_tsm-v1-b162/raw/1021_0429_trainticket-runtime-84](../results/1021_0429_tsm-v1-b162/raw/1021_0429_trainticket-runtime-84/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetErrorLogs(ts-gateway-service) shows PortInUseException: "Port 18888 is already in use" and "APPLICATION FAILED TO START / Web server failed to start"; the only inventory outlier is pod ts-gateway-service-7d97d56b56-6wwkf 1/2 CrashLoopBackOff (4 restarts) while every other train-ticket service is 2/2 Running, i.e. partial unreachability. Pod sheet: app container ts-gateway-service declares Port 18888/TCP, Last State Terminated Reason=Error ExitCode=1, RestartCount=4; the co-located istio-proxy sidecar started earlier (02:03:25) and is Running, with PROXY_CONFIG {"statusPort":18

### case-85

- **结论**：`app/ts-inside-payment-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-inside-payment-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 389,276
- **raw 日志**：[results/1021_0429_tsm-v1-b162/raw/1021_0430_trainticket-runtime-85](../results/1021_0429_tsm-v1-b162/raw/1021_0430_trainticket-runtime-85/)（ndjson / mcp.jsonl / meta）
- **摘要**：Outlier row in the pods listing: ts-inside-payment-service-6db9d96587-s6459 is 1/2 Running with 4 restarts (84s ago) while all peer business pods are 2/2 Running. Complaint side first: the Service declares port 18673 -> targetPort 18673, its Endpoints object is empty (no serving address), an active TCP probe of ts-inside-payment-service:18673 from worker-01/worker-02/worker-03 all returns Connection Failed, and the upstream caller ts-cancel-service logs 33 errors of pattern 'Service Instance cannot be null' (discovery resolves no instance); ts-gateway-service has no error logs. The pod sheet s

### case-86

- **结论**：`app/ts-order-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-order-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 388,045
- **raw 日志**：[results/1021_0431_tsm-v1-b163/raw/1021_0432_trainticket-runtime-86](../results/1021_0431_tsm-v1-b163/raw/1021_0432_trainticket-runtime-86/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-order-service-64776c8b87-5qf8p is an outlier (READY 1/2, RESTARTS 4); CheckServiceConnectivity(ts-order-service:12031) fails from worker-01/02/03. Pod sheet: container ts-order-service Ready=False, Restart Count 4, Last State Terminated Reason=Error Exit Code=1 (not 137/OOM). Previous-container log: 'APPLICATION FAILED TO START / Web server failed to start. Port 12031 was already in use.' + 'PortInUseException: Port 12031 is already in use', while the same pod's istio-proxy log says 'Apply proxy config from annotation { "statusPort": 12031 }' and 'Opening status port 12031'. GetAppYAML

### case-87

- **结论**：`app/ts-payment-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-payment-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 347,779
- **raw 日志**：[results/1021_0433_tsm-v1-b164/raw/1021_0433_trainticket-runtime-87](../results/1021_0433_tsm-v1-b164/raw/1021_0433_trainticket-runtime-87/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert on business action 'Process payment' via ts-inside-payment-service returns HTTPError('500 Server Error'); its error log shows java.lang.IllegalArgumentException: Service Instance cannot be null (load balancer has no available instance for the downstream payment call); TCP probe to ts-payment-service:19001 (the port its Service declares) failed from worker-01/02/03. Object layer: only outlier pod is ts-payment-service-6cbd66f447-ks5sb, 1/2 Running, RESTARTS 4, Ready False; its app container terminated with Reason: Error, Exit Code: 1 (not 137/OOM), restart count 4, and pod e

### case-88

- **结论**：`app/ts-preserve-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-preserve-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.25 · steps 13 · tokens 310,373
- **raw 日志**：[results/1021_0435_tsm-v1-b165/raw/1021_0435_trainticket-runtime-88](../results/1021_0435_tsm-v1-b165/raw/1021_0435_trainticket-runtime-88/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-side alert names ts-preserve-service: POST /api/v1/preserveservice/preserve returns HTTP 503 (20 occurrences); ts-gateway-service has no error logs. GetErrorLogs(ts-preserve-service) shows the mechanism verbatim: 'PortInUseException: Port 14568 is already in use' and 'Web server failed to start. Port 14568 was already in use.' followed by APPLICATION FAILED TO START. The pods listing has exactly one outlier: ts-preserve-service-d9d44bb7c-vctxl 1/2 CrashLoopBackOff 4 restarts while all other pods are 2/2 Running. DescribeResource(pod) shows the app container 'Last State: Terminated, Reaso

### case-89

- **结论**：`app/ts-price-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-price-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 357,159
- **raw 日志**：[results/1021_0435_tsm-v1-b165/raw/1021_0436_trainticket-runtime-89](../results/1021_0435_tsm-v1-b165/raw/1021_0436_trainticket-runtime-89/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-price-service is the only outlier in the pod inventory: 1/2 READY, 4 restarts, Ready=False while all peers are 2/2 with 0 restarts. Its Service has EMPTY endpoints and a TCP probe on the Service's own declared port 16579 fails from worker-01/02/03, so callers get 500s (ts-preserve-service -> /api/v1/travelservice/trip_detail, ts-inside-payment-service -> /api/v1/paymentservice/payment). Pod detail shows app container Last State Terminated reason Error exit code 1 (not 137/143) with event 'Warning BackOff: Back-off restarting failed container ts-price-service'. The app log states 'APPLICATIO

### case-90

- **结论**：`app/ts-route-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-route-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 536,449
- **raw 日志**：[results/1021_0439_tsm-v1-b167/raw/1021_0439_trainticket-runtime-90](../results/1021_0439_tsm-v1-b167/raw/1021_0439_trainticket-runtime-90/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: ts-route-service-66696fb9bd-8fg55 is 1/2 Running with 4 restarts (82s ago) while all other pods are 2/2. Endpoints for Service ts-route-service are empty and active TCP probes to its own declared port 11178 fail from worker-01, worker-02 and worker-03. Pod sheet: app container Last State Terminated, Reason Error, Exit Code 1, Ready False, containerPort 11178, readiness served via http-get http://:15020/app-health/ts-route-service/readyz. First-level error log: ApplicationContextException - Failed to start bean webServerStartStop; nested PortInUseException: 

### case-91

- **结论**：`app/ts-seat-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-seat-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2727 · steps 12 · tokens 300,874
- **raw 日志**：[results/1021_0441_tsm-v1-b168/raw/1021_0441_trainticket-runtime-91](../results/1021_0441_tsm-v1-b168/raw/1021_0441_trainticket-runtime-91/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows a single outlier: ts-seat-service-74c885bd58-48kmm READY 1/2, STATUS CrashLoopBackOff, RESTARTS 4. Its app container Last State is Terminated with Reason Error and Exit Code 1, and GetErrorLogs(ts-seat-service) records 'org.springframework.boot.web.server.PortInUseException: Port 18898 is already in use' / 'APPLICATION FAILED TO START'. The pod spec annotation proxy.istio.io/config is '{ "statusPort": 18898 }' and istio-proxy started first (00:50:29) binding that status port, while the app container declares containerPort 18898 (readinessProbe tcpSocket 18898, Service port

### case-92

- **结论**：`app/ts-security-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-security-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 383,872
- **raw 日志**：[results/1021_0441_tsm-v1-b168/raw/1021_0442_trainticket-runtime-92](../results/1021_0441_tsm-v1-b168/raw/1021_0442_trainticket-runtime-92/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the pods listing is ts-security-service-6b55fdd59-99nzl: 1/2 Running, RESTARTS 4 (72s ago), Ready=False; the other 46 workloads are 2/2 Running with 0 restarts. Complaint side read first: GetErrorLogs(ts-preserve-service) repeats 'java.lang.IllegalArgumentException: Service Instance cannot be null' (caller finds no service instance, matching the L1 edge ts-preserve-service -> ts-security-service). Reachability confirms: CheckServiceConnectivity(ts-security-service:11188) = Connection Failed from worker-01/02/03 and endpoints/ts-security-service has an empty ENDPOINTS column. Po

### case-93

- **结论**：`app/ts-station-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-station-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2 · steps 16 · tokens 532,177
- **raw 日志**：[results/1021_0443_tsm-v1-b169/raw/1021_0444_trainticket-runtime-93](../results/1021_0443_tsm-v1-b169/raw/1021_0444_trainticket-runtime-93/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-station-service pod ts-station-service-5ffd899745-qgmd6 is the only outlier (READY 1/2, RESTARTS 4) while all other 47 pods are 2/2 Running. Complaint side: active TCP probe to Service ts-station-service on its own declared port 12345 fails from worker-01/02/03 (Connection Failed), and upstream caller ts-basic-service logs IllegalArgumentException: Service Instance cannot be null. Container-level breakpoint: business container ts-station-service has Restart Count 4, Last State Terminated Reason=Error Exit Code=1 (not 137/OOMKilled), Ready=False, while sidecar istio-proxy is Running/Ready wi

### case-94

- **结论**：`app/ts-train-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-train-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 298,631
- **raw 日志**：[results/1021_0445_tsm-v1-b170/raw/1021_0445_trainticket-runtime-94](../results/1021_0445_tsm-v1-b170/raw/1021_0445_trainticket-runtime-94/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: ts-train-service-54dc44c8b9-wsb6b is 1/2 READY with 4 restarts while all other 46 pods are 2/2 Running with 0 restarts. DescribeResource(pod) reports the app container Terminated with Reason: Error, Exit Code: 1 (not 137 OOMKilled, not 143 SIGTERM) - a self-initiated exit. GetErrorLogs(ts-train-service) gives the causal line: 'org.springframework.boot.web.server.PortInUseException: Port 14567 is already in use' during 'Failed to start bean webServerStartStop'. GetAppYAML(ts-train-service) closes the conflict byte-for-byte: the pod annotation proxy.istio.io/

### case-95

- **结论**：`app/ts-travel-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-travel-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.25 · steps 13 · tokens 311,801
- **raw 日志**：[results/1021_0447_tsm-v1-b171/raw/1021_0447_trainticket-runtime-95](../results/1021_0447_tsm-v1-b171/raw/1021_0447_trainticket-runtime-95/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact-symptom chain: complaint side first. GetAlerts top alert = ts-travel-service 503 Service Unavailable x18 (POST /api/v1/travelservice/trips/left). GetErrorLogs(ts-travel-service) previous container: 'Failed to start bean webServerStartStop; nested exception is PortInUseException: Port 12346 is already in use'. Pods scan shows exactly one outlier: ts-travel-service-795b58f7cd-rknnk 1/2 Running, RESTARTS 4, Ready False, Last State Terminated Reason Error ExitCode 1. Pod detail: istio-proxy started 02:19:35 and is Ready, its PROXY_CONFIG carries statusPort 12346, while the app container d

### case-96

- **结论**：`app/ts-user-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-user-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2727 · steps 12 · tokens 215,380
- **raw 日志**：[results/1021_0447_tsm-v1-b171/raw/1021_0448_trainticket-runtime-96](../results/1021_0447_tsm-v1-b171/raw/1021_0448_trainticket-runtime-96/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing outlier: ts-user-service-57d8854584-gnftk 1/2 Ready, RESTARTS 4 (83s ago) while all other 45 pods are 2/2 Running with 0 restarts. Complaint-side error log of ts-user-service: 'org.springframework.context.ApplicationContextException: Failed to start bean webServerStartStop; nested exception is org.springframework.boot.web.server.PortInUseException: Port 12342 is already in use'. Pod detail: container ts-user-service Port 12342/TCP, Last State Terminated Reason=Error Exit Code=1 (not OOMKilled/137), Restart Count 4, Ready False; sidecar istio-proxy annotation proxy.istio.io/config 

