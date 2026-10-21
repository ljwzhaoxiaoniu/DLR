# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **164/164** 题：JRA ✅164 ❌0 ｜ 证据链全闭 161 ｜ token 中位 157,708 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 152,364 | 0 | 0 | 1020_1959_tsm-v1-b1 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 192,831 | 0 | 0 | 1021_0419_tsm-v1-b157 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 25 | 272,881 | 0 | 0 | 1021_0435_tsm-v1-b165 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 142,097 | 0 | 0 | 1021_0450_tsm-v1-b173 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 163,553 | 0 | 0 | 1021_0454_tsm-v1-b175 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 183,486 | 0 | 0 | 1021_0500_tsm-v1-b178 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 195,625 | 0 | 0 | 1021_0505_tsm-v1-b181 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 140,062 | 0 | 0 | 1021_0510_tsm-v1-b184 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 143,108 | 0 | 0 | 1021_0514_tsm-v1-b186 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 175,889 | 0 | 0 | 1020_2004_tsm-v1-b4 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 190,976 | 0 | 0 | 1020_2325_tsm-v1-b37 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 223,922 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 200,558 | 0 | 0 | 1021_0223_tsm-v1-b99 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 230,370 | 0 | 0 | 1021_0310_tsm-v1-b123 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 159,886 | 0 | 0 | 1021_0345_tsm-v1-b140 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 201,138 | 0 | 0 | 1021_0405_tsm-v1-b150 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 126,583 | 0 | 0 | 1021_0413_tsm-v1-b154 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 133,640 | 0 | 0 | 1021_0416_tsm-v1-b155 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 150,913 | 0 | 0 | 1021_0417_tsm-v1-b156 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 149,078 | 0 | 0 | 1021_0419_tsm-v1-b157 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 131,221 | 0 | 0 | 1021_0421_tsm-v1-b158 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 130,623 | 0 | 0 | 1021_0424_tsm-v1-b159 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 128,022 | 0 | 0 | 1021_0425_tsm-v1-b160 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 168,130 | 0 | 0 | 1021_0425_tsm-v1-b160 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 150,104 | 0 | 0 | 1021_0427_tsm-v1-b161 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 161,564 | 0 | 0 | 1021_0429_tsm-v1-b162 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 227,967 | 0 | 0 | 1021_0431_tsm-v1-b163 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 150,097 | 0 | 0 | 1021_0431_tsm-v1-b163 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 149,562 | 0 | 0 | 1021_0433_tsm-v1-b164 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 203,143 | 0 | 0 | 1021_0437_tsm-v1-b166 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 183,564 | 0 | 0 | 1021_0437_tsm-v1-b166 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 136,358 | 0 | 0 | 1021_0439_tsm-v1-b167 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 215,759 | 0 | 0 | 1021_0441_tsm-v1-b168 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 161,652 | 0 | 0 | 1021_0443_tsm-v1-b169 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 129,981 | 0 | 0 | 1021_0443_tsm-v1-b169 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 128,440 | 0 | 0 | 1021_0445_tsm-v1-b170 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 169,894 | 0 | 0 | 1021_0447_tsm-v1-b171 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 142,515 | 0 | 0 | 1021_0449_tsm-v1-b172 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 174,164 | 0 | 0 | 1021_0449_tsm-v1-b172 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 127,393 | 0 | 0 | 1021_0450_tsm-v1-b173 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 152,116 | 0 | 0 | 1021_0450_tsm-v1-b173 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 157,708 | 0 | 0 | 1021_0450_tsm-v1-b173 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 159,811 | 0 | 0 | 1021_0452_tsm-v1-b174 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 208,469 | 0 | 0 | 1021_0452_tsm-v1-b174 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 159,997 | 0 | 0 | 1021_0452_tsm-v1-b174 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 195,313 | 0 | 0 | 1021_0452_tsm-v1-b174 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 152,063 | 0 | 0 | 1021_0454_tsm-v1-b175 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 152,822 | 0 | 0 | 1021_0454_tsm-v1-b175 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 134,934 | 0 | 0 | 1021_0454_tsm-v1-b175 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 178,293 | 0 | 0 | 1021_0456_tsm-v1-b176 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 169,083 | 0 | 0 | 1021_0456_tsm-v1-b176 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 131,119 | 0 | 0 | 1021_0456_tsm-v1-b176 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 165,937 | 0 | 0 | 1021_0456_tsm-v1-b176 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 165,742 | 0 | 0 | 1021_0458_tsm-v1-b177 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 143,821 | 0 | 0 | 1021_0458_tsm-v1-b177 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 136,192 | 0 | 0 | 1021_0458_tsm-v1-b177 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 151,705 | 0 | 0 | 1021_0458_tsm-v1-b177 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 126,617 | 0 | 0 | 1021_0500_tsm-v1-b178 | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 225,352 | 0 | 0 | 1021_0500_tsm-v1-b178 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 131,852 | 0 | 0 | 1021_0500_tsm-v1-b178 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 129,036 | 0 | 0 | 1021_0501_tsm-v1-b179 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 139,970 | 0 | 0 | 1021_0501_tsm-v1-b179 | 全对·链闭 |
| [63](#case-63) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 149,543 | 0 | 0 | 1021_0501_tsm-v1-b179 | 全对·链闭 |
| [64](#case-64) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 152,439 | 0 | 0 | 1021_0501_tsm-v1-b179 | 全对·链闭 |
| [65](#case-65) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 131,843 | 0 | 0 | 1021_0503_tsm-v1-b180 | 全对·链闭 |
| [66](#case-66) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 170,902 | 0 | 0 | 1021_0503_tsm-v1-b180 | 全对·链闭 |
| [67](#case-67) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 130,193 | 0 | 0 | 1021_0503_tsm-v1-b180 | 全对·链闭 |
| [68](#case-68) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 154,326 | 0 | 0 | 1021_0503_tsm-v1-b180 | 全对·链闭 |
| [69](#case-69) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 151,965 | 0 | 0 | 1021_0505_tsm-v1-b181 | 全对·链闭 |
| [70](#case-70) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 166,390 | 0 | 0 | 1021_0505_tsm-v1-b181 | 全对·链闭 |
| [71](#case-71) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 165,284 | 0 | 0 | 1021_0505_tsm-v1-b181 | 全对·链闭 |
| [72](#case-72) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 154,639 | 0 | 0 | 1021_0507_tsm-v1-b182 | 全对·链闭 |
| [73](#case-73) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 150,344 | 0 | 0 | 1021_0507_tsm-v1-b182 | 全对·链闭 |
| [74](#case-74) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 126,344 | 0 | 0 | 1021_0507_tsm-v1-b182 | 全对·链闭 |
| [75](#case-75) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 153,856 | 0 | 0 | 1021_0507_tsm-v1-b182 | 全对·链闭 |
| [76](#case-76) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 126,980 | 0 | 0 | 1021_0508_tsm-v1-b183 | 全对·链闭 |
| [77](#case-77) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 172,509 | 0 | 0 | 1021_0508_tsm-v1-b183 | 全对·链闭 |
| [78](#case-78) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 140,042 | 0 | 0 | 1021_0508_tsm-v1-b183 | 全对·链闭 |
| [79](#case-79) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 119,488 | 0 | 0 | 1021_0508_tsm-v1-b183 | 全对·链闭 |
| [80](#case-80) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 151,664 | 0 | 0 | 1021_0510_tsm-v1-b184 | 全对·链闭 |
| [81](#case-81) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 129,475 | 0 | 0 | 1021_0510_tsm-v1-b184 | 全对·链闭 |
| [82](#case-82) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 126,778 | 0 | 0 | 1021_0510_tsm-v1-b184 | 全对·链闭 |
| [83](#case-83) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 154,843 | 0 | 0 | 1021_0512_tsm-v1-b185 | 全对·链闭 |
| [84](#case-84) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 152,665 | 0 | 0 | 1021_0512_tsm-v1-b185 | 全对·链闭 |
| [85](#case-85) | 1 | 1 | 1 | 0.6667 | 0.6667 | 0 | 0.1429 | 15 | 136,237 | 0 | 0 | 1021_0512_tsm-v1-b185 | 结果对·链未闭 |
| [86](#case-86) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 186,483 | 0 | 0 | 1021_0512_tsm-v1-b185 | 全对·链闭 |
| [87](#case-87) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 148,321 | 0 | 0 | 1021_0514_tsm-v1-b186 | 全对·链闭 |
| [88](#case-88) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 136,859 | 0 | 0 | 1021_0514_tsm-v1-b186 | 全对·链闭 |
| [89](#case-89) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 146,397 | 0 | 0 | 1021_0514_tsm-v1-b186 | 全对·链闭 |
| [90](#case-90) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 155,024 | 0 | 0 | 1021_0516_tsm-v1-b187 | 全对·链闭 |
| [91](#case-91) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 205,949 | 0 | 0 | 1021_0516_tsm-v1-b187 | 全对·链闭 |
| [92](#case-92) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 165,712 | 0 | 0 | 1021_0516_tsm-v1-b187 | 全对·链闭 |
| [93](#case-93) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 158,001 | 0 | 0 | 1021_0516_tsm-v1-b187 | 全对·链闭 |
| [94](#case-94) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 188,228 | 0 | 0 | 1021_0517_tsm-v1-b188 | 全对·链闭 |
| [95](#case-95) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 158,788 | 0 | 0 | 1021_0517_tsm-v1-b188 | 全对·链闭 |
| [96](#case-96) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 151,295 | 0 | 0 | 1021_0517_tsm-v1-b188 | 全对·链闭 |
| [97](#case-97) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 132,865 | 0 | 0 | 1021_0517_tsm-v1-b188 | 全对·链闭 |
| [98](#case-98) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 130,766 | 0 | 0 | 1021_0701_tsm-v1-last2 | 全对·链闭 |
| [99](#case-99) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 136,208 | 0 | 0 | 1021_0701_tsm-v1-last2 | 全对·链闭 |
| [100](#case-100) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 151,132 | 0 | 0 | 1020_2010_tsm-v1-b7 | 全对·链闭 |
| [101](#case-101) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 153,031 | 0 | 0 | 1020_2015_tsm-v1-b10 | 全对·链闭 |
| [102](#case-102) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 154,010 | 0 | 0 | 1020_2020_tsm-v1-b13 | 全对·链闭 |
| [103](#case-103) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 160,884 | 0 | 0 | 1020_2239_tsm-v1-b16 | 全对·链闭 |
| [104](#case-104) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 151,822 | 0 | 0 | 1020_2245_tsm-v1-b19 | 全对·链闭 |
| [105](#case-105) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 147,479 | 0 | 0 | 1020_2251_tsm-v1-b22 | 全对·链闭 |
| [106](#case-106) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 127,537 | 0 | 0 | 1020_2300_tsm-v1-b25 | 全对·链闭 |
| [107](#case-107) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 123,690 | 0 | 0 | 1020_2306_tsm-v1-b28 | 全对·链闭 |
| [108](#case-108) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 127,889 | 0 | 0 | 1020_2313_tsm-v1-b31 | 全对·链闭 |
| [109](#case-109) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 156,034 | 0 | 0 | 1020_2319_tsm-v1-b34 | 全对·链闭 |
| [110](#case-110) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 160,748 | 0 | 0 | 1020_2331_tsm-v1-b40 | 全对·链闭 |
| [111](#case-111) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 140,655 | 0 | 0 | 1020_2336_tsm-v1-b43 | 全对·链闭 |
| [112](#case-112) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 178,580 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [113](#case-113) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 175,103 | 0 | 0 | 1020_2349_tsm-v1-b49 | 全对·链闭 |
| [114](#case-114) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 156,699 | 0 | 0 | 1020_2355_tsm-v1-b52 | 全对·链闭 |
| [115](#case-115) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 179,258 | 0 | 0 | 1021_0051_tsm-v1-b55 | 全对·链闭 |
| [116](#case-116) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 183,295 | 0 | 0 | 1021_0058_tsm-v1-b58 | 全对·链闭 |
| [117](#case-117) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 145,109 | 0 | 0 | 1021_0105_tsm-v1-b61 | 全对·链闭 |
| [118](#case-118) | 1 | 1 | 1 | 1 | 1 | 1 | 0.16 | 26 | 362,103 | 0.04 | 0 | 1021_0111_tsm-v1-b64 | 全对·链闭 |
| [119](#case-119) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 210,538 | 0 | 0 | 1021_0119_tsm-v1-b67 | 全对·链闭 |
| [120](#case-120) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 180,812 | 0 | 0 | 1021_0131_tsm-v1-b73 | 全对·链闭 |
| [121](#case-121) | 1 | 1 | 1 | 0.6667 | 0 | 0 | 0.1667 | 13 | 154,657 | 0 | 0 | 1021_0136_tsm-v1-b75 | 结果对·链未闭 |
| [122](#case-122) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 132,140 | 0 | 0 | 1021_0142_tsm-v1-b78 | 全对·链闭 |
| [123](#case-123) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 155,659 | 0 | 0 | 1021_0148_tsm-v1-b81 | 全对·链闭 |
| [124](#case-124) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 154,404 | 0 | 0 | 1021_0154_tsm-v1-b84 | 全对·链闭 |
| [125](#case-125) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 157,812 | 0 | 0 | 1021_0158_tsm-v1-b86 | 全对·链闭 |
| [126](#case-126) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 194,058 | 0 | 0 | 1021_0203_tsm-v1-b89 | 全对·链闭 |
| [127](#case-127) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 192,842 | 0 | 0 | 1021_0207_tsm-v1-b91 | 全对·链闭 |
| [128](#case-128) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3889 | 19 | 233,109 | 0 | 0 | 1021_0213_tsm-v1-b94 | 结果对·链未闭 |
| [129](#case-129) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 184,459 | 0 | 0 | 1021_0218_tsm-v1-b96 | 全对·链闭 |
| [130](#case-130) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 22 | 178,259 | 0 | 0 | 1021_0227_tsm-v1-b101 | 全对·链闭 |
| [131](#case-131) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 174,616 | 0 | 0 | 1021_0233_tsm-v1-b104 | 全对·链闭 |
| [132](#case-132) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 248,698 | 0 | 0 | 1021_0237_tsm-v1-b106 | 全对·链闭 |
| [133](#case-133) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4211 | 20 | 221,439 | 0 | 0 | 1021_0243_tsm-v1-b109 | 全对·链闭 |
| [134](#case-134) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2632 | 20 | 219,055 | 0 | 0 | 1021_0247_tsm-v1-b111 | 全对·链闭 |
| [135](#case-135) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 177,735 | 0 | 0 | 1021_0251_tsm-v1-b113 | 全对·链闭 |
| [136](#case-136) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 165,542 | 0 | 0 | 1021_0255_tsm-v1-b115 | 全对·链闭 |
| [137](#case-137) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 214,105 | 0 | 0 | 1021_0258_tsm-v1-b117 | 全对·链闭 |
| [138](#case-138) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 166,160 | 0 | 0 | 1021_0302_tsm-v1-b119 | 全对·链闭 |
| [139](#case-139) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 173,812 | 0 | 0 | 1021_0306_tsm-v1-b121 | 全对·链闭 |
| [140](#case-140) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 202,299 | 0 | 0 | 1021_0315_tsm-v1-b125 | 全对·链闭 |
| [141](#case-141) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 237,057 | 0 | 0 | 1021_0319_tsm-v1-b127 | 全对·链闭 |
| [142](#case-142) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 189,765 | 0 | 0 | 1021_0321_tsm-v1-b128 | 全对·链闭 |
| [143](#case-143) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 206,253 | 0 | 0 | 1021_0324_tsm-v1-b130 | 全对·链闭 |
| [144](#case-144) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.1304 | 24 | 320,320 | 0 | 0 | 1021_0326_tsm-v1-b131 | 全对·链闭 |
| [145](#case-145) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 158,776 | 0 | 0 | 1021_0331_tsm-v1-b133 | 全对·链闭 |
| [146](#case-146) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 219,151 | 0 | 0 | 1021_0333_tsm-v1-b134 | 全对·链闭 |
| [147](#case-147) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 167,823 | 0 | 0 | 1021_0337_tsm-v1-b136 | 全对·链闭 |
| [148](#case-148) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 218,074 | 0 | 0 | 1021_0339_tsm-v1-b137 | 全对·链闭 |
| [149](#case-149) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 133,609 | 0 | 0 | 1021_0341_tsm-v1-b138 | 全对·链闭 |
| [150](#case-150) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 131,937 | 0 | 0 | 1021_0347_tsm-v1-b141 | 全对·链闭 |
| [151](#case-151) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 231,374 | 0 | 0 | 1021_0349_tsm-v1-b142 | 全对·链闭 |
| [152](#case-152) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 153,893 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [153](#case-153) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 137,273 | 0 | 0 | 1021_0353_tsm-v1-b144 | 全对·链闭 |
| [154](#case-154) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 140,970 | 0 | 0 | 1021_0355_tsm-v1-b145 | 全对·链闭 |
| [155](#case-155) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 208,030 | 0 | 0 | 1021_0357_tsm-v1-b146 | 全对·链闭 |
| [156](#case-156) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 180,132 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [157](#case-157) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 132,377 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [158](#case-158) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 240,223 | 0 | 0 | 1021_0401_tsm-v1-b148 | 全对·链闭 |
| [159](#case-159) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 137,689 | 0 | 0 | 1021_0403_tsm-v1-b149 | 全对·链闭 |
| [160](#case-160) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 263,760 | 0 | 0 | 1021_0407_tsm-v1-b151 | 全对·链闭 |
| [161](#case-161) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 205,068 | 0 | 0 | 1021_0407_tsm-v1-b151 | 全对·链闭 |
| [162](#case-162) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 132,439 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [163](#case-163) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 202,380 | 0 | 0 | 1021_0411_tsm-v1-b153 | 全对·链闭 |
| [164](#case-164) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 179,590 | 0 | 0 | 1021_0413_tsm-v1-b154 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 152,364
- **raw 日志**：[results/1020_1959_tsm-v1-b1/raw/1020_1959_boutique-scheduling-1](../results/1020_1959_tsm-v1-b1/raw/1020_1959_boutique-scheduling-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) logs 286 errors: 'could not retrieve cart' 153x and 'failed to add to cart' 97x, both 'dial tcp 10.68.221.180:7070: connect: connection refused' — the cartservice Service's own declared port (7070/TCP, ClusterIP 10.68.221.180), and endpoints for cartservice are '<none>'. Pod listing shows the single outlier cartservice-79b49f5555-rl2kp 0/1 Pending with NODE=<none>; its pod detail carries PodScheduled=False and the mechanism event 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available'. Node surface confirms 

### case-2

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 192,831
- **raw 日志**：[results/1021_0419_tsm-v1-b157/raw/1021_0419_boutique-scheduling-2](../results/1021_0419_tsm-v1-b157/raw/1021_0419_boutique-scheduling-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry service) error logs show partial checkout-path failure ('failed to complete the order', 39 errors on POST /cart/checkout). Pod inventory shows the single outlier: checkoutservice Deployment is READY 1/5 (UP-TO-DATE 5, AVAILABLE 1) with 4 pods Pending, READY 0/1; all other boutique services are 1/1 Running with 0 restarts. The pending pod sheet (checkoutservice-8445f8b6cb-9tn5x) reads 'Node: <none>', condition 'PodScheduled False' and event 'Warning FailedScheduling 0/4 nodes are available: 4 node(s) were unschedulable' — the scheduler cordon filter, not an untolerated-taint, an

### case-3

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 25 · tokens 272,881
- **raw 日志**：[results/1021_0435_tsm-v1-b165/raw/1021_0435_boutique-scheduling-3](../results/1021_0435_tsm-v1-b165/raw/1021_0435_boutique-scheduling-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend GetErrorLogs shows 44 'lookup shippingservice ... no such host' lines, but the shippingservice Service object exists (ClusterIP 10.68.214.159, declared port 50051/TCP), its endpoints are bound to 172.20.1.73:50051 and CheckServiceConnectivity on that declared port returns 'Connection Succeeded' -> that burst is creation-window history, not a DNS root cause; GetResources(resourcequotas) returns 'No resources found in boutique namespace' so the quota branch is excluded, and GetAlerts shows no active metric anomalies. The pods inventory outlier is emailservice: emailservice-

### case-4

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 142,097
- **raw 日志**：[results/1021_0450_tsm-v1-b173/raw/1021_0450_boutique-scheduling-4](../results/1021_0450_tsm-v1-b173/raw/1021_0450_boutique-scheduling-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows the only outlier as frontend: 4 of 5 replicas are 0/1 Pending with NODE=<none>, while all other 10 services are 1/1 Running. The pod sheet of frontend-6778bd7b8b-97ct2 carries the scheduling line: 'PodScheduled False' with 'Warning FailedScheduling (default-scheduler) 0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' Node side confirms the mechanism: all four nodes (master, worker-01, worker-02, worker-03) are 'Ready,SchedulingDisabled' and carry taint 'node.kubernetes.io/unsch

### case-5

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 163,553
- **raw 日志**：[results/1021_0454_tsm-v1-b175/raw/1021_0455_boutique-scheduling-5](../results/1021_0454_tsm-v1-b175/raw/1021_0455_boutique-scheduling-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section 'Partial Service Unreachability.' followed: frontend (entry caller) error logs clean (only GCE metadata noise, no downstream connection/DNS errors) -> pods first-round scan shows the sole outlier: 4 of 5 paymentservice pods Pending with Node: <none> while every other boutique service is 1/1 Running. Pod sheet: PodScheduled False with Warning FailedScheduling from default-scheduler "0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling." Node side (general before specific): all 4 nodes (master, wor

### case-6

- **结论**：`app/productcatalogservice` + `node_cordon_mismatch` ｜ 标签 `app/productcatalogservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 183,486
- **raw 日志**：[results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-6](../results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend (entry caller) GetErrorLogs shows 182/726 errors dominated by 'could not retrieve products/product: rpc error: code = Unavailable ... dial tcp 10.68.235.126:3550: connect: connection refused', and 10.68.235.126:3550 is exactly the port declared by the productcatalogservice Service spec, so the probe target is valid. Object layer: all 3 productcatalogservice pods (productcatalogservice-ddb46fc86-2fqgv/69krc/xm7ln) are 0/1 Pending with Node: <none> and empty IP, the only outlier rows in the namespace (all other 10 pods are 1/1 Running, RESTARTS 0). Pod sheets for two instan

### case-7

- **结论**：`app/redis-cart` + `node_cordon_mismatch` ｜ 标签 `app/redis-cart` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 195,625
- **raw 日志**：[results/1021_0505_tsm-v1-b181/raw/1021_0505_boutique-scheduling-7](../results/1021_0505_tsm-v1-b181/raw/1021_0505_boutique-scheduling-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' with no service named, so the pods inventory was the legal entry: redis-cart is the sole outlier (4/5 pods Pending, Node <none>, 0 restarts) while all other boutique pods are 1/1 Running. Complaint side read before workload state: redis-cart Service declares 6379/TCP with endpoints bound to 172.20.3.69:6379 (one surviving pod) and cartservice logs no error logs, so the dependency is degraded by lost replicas rather than missing/misrouted. Pending branch, pod sheet first, gives the mechanism verbatim: 'Warning FailedScheduling 73s default-scheduler 0/4

### case-8

- **结论**：`app/shippingservice` + `node_cordon_mismatch` ｜ 标签 `app/shippingservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 140,062
- **raw 日志**：[results/1021_0510_tsm-v1-b184/raw/1021_0510_boutique-scheduling-8](../results/1021_0510_tsm-v1-b184/raw/1021_0510_boutique-scheduling-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice runs 5 pod instances with 3 stuck in Pending and Node: <none> (hrqkb, qbhxq, sgmdm), while every other boutique service is 1/1 Running. The pending pod's own Events section carries the mechanism verbatim: 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.', with PodScheduled False and Node-Selectors <none>. The general node surface confirms all four nodes (master, worker-01, worker-02, worker-03) are 'Ready,SchedulingDisabled' and each carries the

### case-9

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 143,108
- **raw 日志**：[results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-9](../results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice pod cartservice-5955678f49-ct98j is Pending 0/1 with Node: <none> and PodScheduled=False; its Events carry the mechanism verbatim: 'Warning FailedScheduling 71s default-scheduler 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable.' GetAppYAML(cartservice) shows the template pins scheduling with 'nodeSelector: hardware-type: gpu'. GetClusterConfiguration/DescribeResource show worker-03 is the ONLY node carrying label hardware-type=gpu, but it is cordoned: 'Unschedulable: true', Taints 'node.kubernetes.io/unschedulable:NoSchedul

### case-10

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 175,889
- **raw 日志**：[results/1020_2004_tsm-v1-b4/raw/1020_2004_boutique-scheduling-10](../results/1020_2004_tsm-v1-b4/raw/1020_2004_boutique-scheduling-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice is down: its only pod checkoutservice-6b448f7956-xbc46 is Pending with no node assigned. Frontend (entry caller) logs 184 errors 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.228.249:5050: connect: connection refused' on POST /cart/checkout, and the checkoutservice Service (ClusterIP 10.68.228.249, port 5050/TCP) has ENDPOINTS <none>, so callers refuse-connect. Pod events give the mechanism: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable.' The pod template declare

### case-11

- **结论**：`app/currencyservice` + `node_cordon_mismatch` ｜ 标签 `app/currencyservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 190,976
- **raw 日志**：[results/1020_2325_tsm-v1-b37/raw/1020_2325_boutique-scheduling-11](../results/1020_2325_tsm-v1-b37/raw/1020_2325_boutique-scheduling-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (153/165 errors): 'could not retrieve currencies: rpc error ... dial tcp 10.68.108.3:7000: connect: connection refused' names currencyservice:7000 as the unreachable target. Anchored check app=currencyservice: pod currencyservice-6f654d5956-ff8rt is 0/1 Pending with PodScheduled=False, and Service currencyservice has ENDPOINTS '<none>' (Service spec port 7000 -> targetPort 7000, selector app=currencyservice matches pod label, so addressing/port/DNS are intact). Pod scheduling line: 'Warning FailedScheduling 0/4 nodes are available: 2 node(s) did not match Pod node affinity/s

### case-12

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 223,922
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0709_boutique-scheduling-12](../results/1021_0900_tsm-v1-fix/raw/1021_0709_boutique-scheduling-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side (frontend error log, 46x) showed 'lookup productcatalogservice on 169.254.20.10:53: no such host', but object-layer checks cleared that path: the productcatalogservice Service exists (ClusterIP 10.68.206.131, 3550/TCP), its endpoints are bound to 172.20.1.144:3550, and the connectivity probe returned 'productcatalogservice (172.20.1.144:3550) open / Connection Succeeded' - that line is startup-window noise, not the mechanism. The real reachability break is emailservice: the endpoints listing shows 'emailservice <none>' (no serving backend, so checkoutservice cannot reach the ord

### case-13

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 200,558
- **raw 日志**：[results/1021_0223_tsm-v1-b99/raw/1021_0223_boutique-scheduling-13](../results/1021_0223_tsm-v1-b99/raw/1021_0223_boutique-scheduling-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-6d8845c9d6-9l86h is Pending with 'Node: <none>' and PodScheduled False; its only Warning event is 'FailedScheduling: 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable. preemption: 4 Preemption is not helpful for scheduling.' The pod sheet and GetAppYAML(frontend) both show 'Node-Selectors: hardware-type: gpu'. GetClusterConfiguration shows all 4 nodes Ready with 8 CPU / ~15Gi allocatable (no capacity pressure), and only worker-02 carries the label hardware-type: gpu - the pod's sole legal placement - but worker-02 i

### case-14

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 230,370
- **raw 日志**：[results/1021_0310_tsm-v1-b123/raw/1021_0311_boutique-scheduling-14](../results/1021_0310_tsm-v1-b123/raw/1021_0311_boutique-scheduling-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error log shows the dominant pattern (132 hits) 'failed to complete the order: ... failed to charge card: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.185.152:50051: connect: connection refused'; 10.68.185.152:50051 is paymentservice's declared Service ClusterIP/port, and 'endpoints paymentservice' is '<none>' (no serving pod). Workload: paymentservice-649775dc6-r5gvj is Pending with 'Node: <none>', condition PodScheduled False, event 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 2 node(s

### case-15

- **结论**：`app/productcatalogservice` + `node_cordon_mismatch` ｜ 标签 `app/productcatalogservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 159,886
- **raw 日志**：[results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-scheduling-15](../results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-scheduling-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice-cd5dd69d6-66hjl is Pending with Node: <none> while all other boutique pods are 1/1 Running; its Service endpoints are <none>, so frontend/checkoutservice/recommendationservice have no reachable backend. Pod sheet shows Node-Selectors: hardware-type=gpu and event 'Warning FailedScheduling default-scheduler: 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. Only worker-01 carries the label hardware-type=gpu, and only master and worker-01 carry taint node.kubernetes.io/unschedulable:NoSchedule; DescribeResource(node 

### case-16

- **结论**：`app/redis-cart` + `node_cordon_mismatch` ｜ 标签 `app/redis-cart` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 201,138
- **raw 日志**：[results/1021_0405_tsm-v1-b150/raw/1021_0405_boutique-scheduling-16](../results/1021_0405_tsm-v1-b150/raw/1021_0405_boutique-scheduling-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: redis-cart-59f87cbf9-9d5p4 is 0/1 Pending with Node <none> (all other 10 pods 1/1 Running). Complaint side: Service redis-cart declares 6379/TCP but its endpoints are <none>, and cartservice GetErrorLogs shows 291/784 errors (37.1%) 'UnableToConnect on redis-cart:6379 ... no connection became available (5000ms)'. The pod's own sheet carries the scheduling line: 'Warning FailedScheduling 73s default-scheduler 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Pree

### case-17

- **结论**：`app/cartservice` + `cpu_capacity_mismatch` ｜ 标签 `app/cartservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 126,583
- **raw 日志**：[results/1021_0413_tsm-v1-b154/raw/1021_0414_boutique-scheduling-17](../results/1021_0413_tsm-v1-b154/raw/1021_0414_boutique-scheduling-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows the single outlier cartservice-6b9c55fd97-hxwnf 0/1 Pending with Node: <none>, all peer services 1/1 Running. Its pod sheet carries the scheduling line: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod' and the container requests 'cpu: 16' (limits cpu: 16). GetClusterConfiguration shows all four nodes Ready with allocatable cpu: 8 each (worker-01/02/03 untainted, master tainted node.kubern

### case-18

- **结论**：`app/checkoutservice` + `cpu_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 133,640
- **raw 日志**：[results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-scheduling-18](../results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-scheduling-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs contain only GCE metadata noise (no downstream call errors) and CheckServiceConnectivity(checkoutservice, 5050) returns 'Connection Failed'. Pod inventory shows the single outlier row checkoutservice-78dd6d5b78-csrlh 0/1 Pending, Node: <none>; its pod sheet shows PodScheduled False with mechanism event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'. Blocking surface: the container requests cpu: "12" (limits cpu: "12") while every node reports allocatable cpu: 8 (GetClusterConfiguration), and worker-01 d

### case-19

- **结论**：`app/emailservice` + `cpu_capacity_mismatch` ｜ 标签 `app/emailservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 150,913
- **raw 日志**：[results/1021_0417_tsm-v1-b156/raw/1021_0417_boutique-scheduling-19](../results/1021_0417_tsm-v1-b156/raw/1021_0417_boutique-scheduling-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Outlier in pods listing: emailservice-bb4fd5fd6-fq5hz 0/1 Pending with Node: <none> while all 10 peer services are 1/1 Running. Pod sheet shows PodScheduled=False and the mechanism event 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' The container requests cpu: 12 (request and limit), while GetClusterConfiguration shows allocatable cpu = 8 on every one of master/worker-01/worker-02/worker-03, so no node in the cluster can ever satisfy the request even when empty. The single unschedulable node is master (Ready,SchedulingDisabled, taint node.kub

### case-20

- **结论**：`app/frontend` + `cpu_capacity_mismatch` ｜ 标签 `app/frontend` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 149,078
- **raw 日志**：[results/1021_0419_tsm-v1-b157/raw/1021_0420_boutique-scheduling-20](../results/1021_0419_tsm-v1-b157/raw/1021_0420_boutique-scheduling-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend is unavailable: GetResources(pods) shows the only outlier frontend-6ffb85fd4-fc6tb as '0/1 Pending' with 'Node: <none>', while all other 10 boutique pods are 1/1 Running. Complaint side closes the symptom: services/frontend declares 80/TCP, endpoints/frontend shows 'ENDPOINTS <none>', and CheckServiceConnectivity(frontend,80) returned 'Connection Failed'. The pod's own sheet carries the scheduling line: 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu', with PodScheduled=False and Requests cpu: 12, memo

### case-21

- **结论**：`app/paymentservice` + `cpu_capacity_mismatch` ｜ 标签 `app/paymentservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 131,221
- **raw 日志**：[results/1021_0421_tsm-v1-b158/raw/1021_0422_boutique-scheduling-21](../results/1021_0421_tsm-v1-b158/raw/1021_0422_boutique-scheduling-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 内唯一离群资源为 paymentservice-6cff9d48f4-mwggd：0/1 Pending，Node: <none>，PodScheduled False；pod 事件段原文 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'。节点侧 4 台 allocateble cpu 均为 8（master Ready,SchedulingDisabled；worker-01/02/03 Ready 无 taint），而 GetAppYAML(paymentservice) 的 Deployment 模板配置 requests cpu: "12" / limits cpu: "12"，即 Pod 的 CPU 请求超过任一节点可分配容量（12 > 8），即使 master 解除 cordon 仍无法容纳，故 cordon 非主因。结果 Pod 永久 Pending、无 Ready 端点，checkout 的支付调用无后端，表现为 'Service Availability Disruption.'。frontend 错误日志仅 GCE metadata 噪声（instance/attributes/cluster-

### case-22

- **结论**：`app/productcatalogservice` + `cpu_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 130,623
- **raw 日志**：[results/1021_0424_tsm-v1-b159/raw/1021_0424_boutique-scheduling-22](../results/1021_0424_tsm-v1-b159/raw/1021_0424_boutique-scheduling-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend (entry) reaches productcatalogservice, whose Service endpoint binding is empty (GetResources(endpoints) => 'productcatalogservice   <none>') and an active TCP probe on the Service-declared port 3550 returns 'Connection Failed' - partial unreachability of exactly this service while the other 10 pods are 1/1 Running. Workload outlier: pod productcatalogservice-5d475f9fb-7nrnf is 0/1 Pending with 'Node: <none>' and condition 'PodScheduled False'. Its own sheet carries the scheduling line: 'Warning  FailedScheduling  31s  default-scheduler  0/4 nodes are available: 1 node(s)

### case-23

- **结论**：`app/recommendationservice` + `cpu_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 128,022
- **raw 日志**：[results/1021_0425_tsm-v1-b160/raw/1021_0425_boutique-scheduling-23](../results/1021_0425_tsm-v1-b160/raw/1021_0425_boutique-scheduling-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice-94fcdb6bd-gshxk is the sole outlier: 0/1 Pending, Node: <none>, PodScheduled False, with scheduling row 'Warning FailedScheduling (default-scheduler): 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'. Its container requests cpu: "14", but GetClusterConfiguration shows every node allocatable cpu = 8 (worker-01/02/03 untainted, master carries node.kubernetes.io/unschedulable:NoSchedule => only the '1 unschedulable' node). A 14-CPU request can never fit an 8-CPU node, so the pod is permanently unschedulable and the Service has no serving pod: GetRes

### case-24

- **结论**：`app/redis-cart` + `cpu_capacity_mismatch` ｜ 标签 `app/redis-cart` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 168,130
- **raw 日志**：[results/1021_0425_tsm-v1-b160/raw/1021_0426_boutique-scheduling-24](../results/1021_0425_tsm-v1-b160/raw/1021_0426_boutique-scheduling-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing in boutique shows the only outlier row redis-cart-54754cc77c-qgnv6 as 0/1 Pending with Node: <none> while all 10 peers are 1/1 Running. Pod detail: PodScheduled False and Events 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' The container requests cpu: 12 (limits.cpu 12, memory 200Mi/256Mi). GetClusterConfiguration and nodes listing show all 4 nodes Ready with allocatable cpu '8' ea

### case-25

- **结论**：`app/shippingservice` + `cpu_capacity_mismatch` ｜ 标签 `app/shippingservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 150,104
- **raw 日志**：[results/1021_0427_tsm-v1-b161/raw/1021_0428_boutique-scheduling-25](../results/1021_0427_tsm-v1-b161/raw/1021_0428_boutique-scheduling-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique outlier: pod shippingservice-6bb75d8c98-zd62f is 0/1 Pending with Node: <none> while all 10 peer pods are 1/1 Running with 0 restarts. Signal side on the port the Service declares (shippingservice Service port 50051/TCP): CheckServiceConnectivity(shippingservice,50051) returned Connection Failed and GetResources(endpoints,name=shippingservice) shows ENDPOINTS <none>, so the Service has no ready address bound. Pod sheet carries the scheduling line: Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu; preemption: 3 No preemption victims fou

### case-26

- **结论**：`app/adservice` + `cpu_capacity_mismatch` ｜ 标签 `app/adservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 161,564
- **raw 日志**：[results/1021_0429_tsm-v1-b162/raw/1021_0429_boutique-scheduling-26](../results/1021_0429_tsm-v1-b162/raw/1021_0429_boutique-scheduling-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中唯一离群 pod 为 adservice-55f4bdbfc8-q5r4z（0/1 Pending, Node: <none>），其余 13 个 pod 均 1/1 Running。投诉侧先行确认可达性断点：Service adservice 自身声明端口 9555/TCP（ClusterIP 10.68.107.50），但 endpoints 为 "<none>"，无任何就绪后端；入口调用方 frontend 的 GetErrorLogs 仅 2 条 GCE metadata 噪声，无下游调用异常。pod 自身详情的调度行给出机制事件：Warning FailedScheduling（连续两个 ReplicaSet adservice-58dbccc5d-xktn6 与 adservice-55f4bdbfc8-q5r4z 同消息）"0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod."，条件 PodSchedu

### case-27

- **结论**：`app/cartservice` + `cpu_capacity_mismatch` ｜ 标签 `app/cartservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 227,967
- **raw 日志**：[results/1021_0431_tsm-v1-b163/raw/1021_0431_boutique-scheduling-27](../results/1021_0431_tsm-v1-b163/raw/1021_0431_boutique-scheduling-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 (exact) walk: frontend error logs carry only benign GCE-metadata noise, so the pods inventory was the entry; the single outlier row is 'cartservice-5cddc7cc77-cxhfn 0/1 Pending Node: <none>' while all other 10 boutique services are 1/1 Running. Pod detail: PodScheduled False with 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: ... 3 No preemption victims found', pod template Requests cpu: 5. GetClusterConfiguration: all 4 nodes Ready, allocatable cpu = 8 each, only master carries taint node.kubernetes.io/unschedulable:NoSchedu

### case-28

- **结论**：`app/checkoutservice` + `cpu_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 150,097
- **raw 日志**：[results/1021_0431_tsm-v1-b163/raw/1021_0432_boutique-scheduling-28](../results/1021_0431_tsm-v1-b163/raw/1021_0432_boutique-scheduling-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod checkoutservice-7587897bf4-m6x7w is stuck 0/1 Pending with Node: <none> while all 13 other boutique pods are Running 1/1; endpoints for checkoutservice are '<none>' (no ready address = the partial unreachability). Pod detail carries the mechanism: 'Warning FailedScheduling 30s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' Cluster config shows 4 Ready nodes with allocatable cpu=8 each; master carries 

### case-29

- **结论**：`app/currencyservice` + `cpu_capacity_mismatch` ｜ 标签 `app/currencyservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 149,562
- **raw 日志**：[results/1021_0433_tsm-v1-b164/raw/1021_0434_boutique-scheduling-29](../results/1021_0433_tsm-v1-b164/raw/1021_0434_boutique-scheduling-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial Service Unreachability traced to currencyservice. Complaint side: probe on the port the Service itself declares (currencyservice 7000/TCP) returned 'Connection Failed', and GetResources(endpoints, currencyservice) shows ENDPOINTS '<none>'. Workload listing shows the single outlier currencyservice-6669d77476-7l6wl 0/1 Pending (all other 11 services 1/1 Running). Pod sheet carries a real scheduling line with Node: <none>, PodScheduled False, and event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu' — so this is not missing_service_acco

### case-30

- **结论**：`app/emailservice` + `cpu_capacity_mismatch` ｜ 标签 `app/emailservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 203,143
- **raw 日志**：[results/1021_0437_tsm-v1-b166/raw/1021_0437_boutique-scheduling-30](../results/1021_0437_tsm-v1-b166/raw/1021_0437_boutique-scheduling-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing outlier: emailservice-6cc965cc46-x4xnv 0/1 Pending, Node: <none>. Complaint side: Service emailservice exists (ClusterIP 10.68.115.64, port 5000 -> targetPort 8080) but GetResources(endpoints, name=emailservice) returns ENDPOINTS <none>, and CheckServiceConnectivity(emailservice, 5000) = 'Connection Failed'; upstream caller checkoutservice error logs are clean (email confirmation is a side path). Pod sheet carries the scheduling line: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 1 Preempti

### case-31

- **结论**：`app/frontend` + `cpu_capacity_mismatch` ｜ 标签 `app/frontend` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 183,564
- **raw 日志**：[results/1021_0437_tsm-v1-b166/raw/1021_0438_boutique-scheduling-31](../results/1021_0437_tsm-v1-b166/raw/1021_0438_boutique-scheduling-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the boutique entry service; its Service object exists with port 80/TCP but GetResources(endpoints, frontend) returns <none> and CheckServiceConnectivity(frontend:80) returns Connection Failed, matching the reported availability disruption. Pods listing shows frontend-849b4c58f6-vnz5p as the only outlier: 0/1 Pending with Node: <none>, while all other services are 1/1 Running; deployments confirm frontend 0/1 AVAILABLE 0 alone. The pod detail carries PodScheduled False and the mechanism event Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insuffic

### case-32

- **结论**：`app/paymentservice` + `cpu_capacity_mismatch` ｜ 标签 `app/paymentservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 136,358
- **raw 日志**：[results/1021_0439_tsm-v1-b167/raw/1021_0440_boutique-scheduling-32](../results/1021_0439_tsm-v1-b167/raw/1021_0440_boutique-scheduling-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: all pods 1/1 Running except paymentservice-6d68bc998-996g5 which is Pending with READY 0/1 and Node: <none>. Service-side confirmation: endpoints object paymentservice shows ENDPOINTS <none> and CheckServiceConnectivity(paymentservice, 50051) (port read from the Service spec 50051/TCP -> targetPort 50051) returns 'Connection Failed', so the Service exists and its selector is fine - there is simply no schedulable serving pod. Pod detail carries the mechanism: PodScheduled False and 'Warning FailedScheduling 32s default-scheduler 0/4 nodes are available: 1 node(s) were unsche

### case-33

- **结论**：`app/recommendationservice` + `cpu_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 215,759
- **raw 日志**：[results/1021_0441_tsm-v1-b168/raw/1021_0441_boutique-scheduling-33](../results/1021_0441_tsm-v1-b168/raw/1021_0441_boutique-scheduling-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice-7d45bcf848-mzsmj is 0/1 Pending with Node: <none>, PodScheduled False; event reads 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'. Signal side confirms victim impact: CheckServiceConnectivity(recommendationservice,8080 -> Service-declared port) = Connection Failed and endpoints for recommendationservice = <none>, while all other boutique pods are 1/1 Running and frontend error logs show only benign GCE-metadata noise. Node side: 4 nodes each with allocatable cpu=8, all Ready, no pressure; only master is Ready,Schedulin

### case-34

- **结论**：`app/shippingservice` + `cpu_capacity_mismatch` ｜ 标签 `app/shippingservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 161,652
- **raw 日志**：[results/1021_0443_tsm-v1-b169/raw/1021_0443_boutique-scheduling-34](../results/1021_0443_tsm-v1-b169/raw/1021_0443_boutique-scheduling-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: shippingservice declared Service port 50051/TCP probe returns 'Connection Failed' and its Endpoints are '<none>'. Pod inventory outlier: shippingservice-5449885c98-jtww7 is 0/1 Pending with Node: <none>, Deployment shippingservice 0/1 AVAILABLE, while all 14 other pods are 1/1 Running. Pod sheet carries the scheduling line: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: 3 No preemption victims found'. Node side: 4 nodes each with 8 allocatable CPU; master carries taint node.kubernetes

### case-35

- **结论**：`app/cartservice` + `memory_capacity_mismatch` ｜ 标签 `app/cartservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 129,981
- **raw 日志**：[results/1021_0443_tsm-v1-b169/raw/1021_0444_boutique-scheduling-35](../results/1021_0443_tsm-v1-b169/raw/1021_0444_boutique-scheduling-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod cartservice-7f8574fc8d-gv26b is the sole outlier in the boutique pods listing (0/1 Pending, Node: <none>), while all other 10 pods are 1/1 Running. Signal side: Service cartservice (port 7070/TCP) has ENDPOINTS <none>, so callers lose the service; frontend error logs are clean apart from benign GCE-metadata warnings. Pod sheet gives the mechanism: Warning FailedScheduling from default-scheduler - '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found for incoming pod.' and PodScheduled=False. Node surface: all 3 workers 

### case-36

- **结论**：`app/checkoutservice` + `memory_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 128,440
- **raw 日志**：[results/1021_0445_tsm-v1-b170/raw/1021_0446_boutique-scheduling-36](../results/1021_0445_tsm-v1-b170/raw/1021_0446_boutique-scheduling-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间唯一离群对象为 checkoutservice-86b8558dc-wbpvr: 0/1 Pending, Node: <none>, 其余 pod 均 1/1 Running。上游 frontend 的 GetErrorLogs 无 checkout 调用错误(仅 GCE metadata 噪声), 排除代码/寻址层; L1 回查锚定 checkoutservice-deploy 载体。Pod 详情 Events 逐字给出机制: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' GetClusterConfiguration 显示 4 节点均 Ready、allocatable memory 均为 ~15Gi (15671348Ki), 唯一 unschedulable 节点是带 node.kubernetes.io/unschedulable:NoSchedule taint 的 master, worker-01/02/03 无 taint。GetAppYAML(checkoutservice) 证实容器 requests.memory=30Gi 且 limits.memory=30Gi (cpu 仅

### case-37

- **结论**：`app/currencyservice` + `memory_capacity_mismatch` ｜ 标签 `app/currencyservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 169,894
- **raw 日志**：[results/1021_0447_tsm-v1-b171/raw/1021_0447_boutique-scheduling-37](../results/1021_0447_tsm-v1-b171/raw/1021_0447_boutique-scheduling-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error log carries only benign GCE metadata noise (no downstream call failures); inventory listing shows the single outlier currencyservice-6dddb8ccb5-4hbm5 as 0/1 Pending with Node: <none>, all other 10 pods 1/1 Running (hence 'partial'). Service currencyservice exists on port 7000/TCP but ENDPOINTS is <none>, and an active TCP probe on the Service-declared port 7000 returns 'Connection Failed'. Pod sheet carries the scheduling row: Warning FailedScheduling - '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are availabl

### case-38

- **结论**：`app/frontend` + `memory_capacity_mismatch` ｜ 标签 `app/frontend` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 142,515
- **raw 日志**：[results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-scheduling-38](../results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-scheduling-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend is the only unreachable unit: GetResources(pods, boutique) shows a single outlier 'frontend-54565b4ccc-9hn89 0/1 Pending 0' while all other 10 boutique pods are 1/1 Running; endpoints for Service frontend are '<none>' (no ready address), matching 'Partial Service Unreachability'. DescribeResource(pod) carries the scheduling mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory' with Node: <none>, PodScheduled False. GetAppYAML(frontend) confirms the config the mechanism points at: container server d

### case-39

- **结论**：`app/paymentservice` + `memory_capacity_mismatch` ｜ 标签 `app/paymentservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 174,164
- **raw 日志**：[results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-scheduling-39](../results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-scheduling-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice Service declares port 50051/TCP but its endpoints object is '<none>', so checkoutservice cannot reach it (partial unreachability). The only outlier in the pods listing is paymentservice-9c44ddcbf-g9t92 with READY 0/1, STATUS Pending, RESTARTS 0 while all 10 peer pods are 1/1 Running. Its pod sheet carries the scheduling line: PodScheduled False, Node: <none>, 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' Node side: all 4 nodes Ready with no MemoryPressure, allocatable memory only 15671348Ki (~14.95 GiB) each, and master 

### case-40

- **结论**：`app/productcatalogservice` + `memory_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 127,393
- **raw 日志**：[results/1021_0450_tsm-v1-b173/raw/1021_0450_boutique-scheduling-40](../results/1021_0450_tsm-v1-b173/raw/1021_0450_boutique-scheduling-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod productcatalogservice-c589fc787-gf9w5 in ns boutique is 0/1 Pending with Node: <none> and PodScheduled=False; its Events carry 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' Endpoints of service productcatalogservice are '<none>', which is exactly the partial unreachability symptom (frontend/checkoutservice/recommendationservice call it on port 3550). GetClusterConfiguration shows all 4 nodes Ready with no MemoryPressure but only ~15Gi allocatable memory each (15671348Ki); GetAppYAML(productcatalogservice) shows th

### case-41

- **结论**：`app/recommendationservice` + `memory_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 152,116
- **raw 日志**：[results/1021_0450_tsm-v1-b173/raw/1021_0451_boutique-scheduling-41](../results/1021_0450_tsm-v1-b173/raw/1021_0451_boutique-scheduling-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod recommendationservice-7f9977467f-t66vg is 0/1 Pending with Node: <none> and PodScheduled: False; its event reads 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 ... 3 No preemption victims found'. The pod template (GetAppYAML recommendationservice) requests 'requests: {cpu: 100m, memory: 20Gi}' with limits memory 20Gi, while GetClusterConfiguration shows every Ready schedulable worker's allocatable memory is only ~15671352Ki (~14.95Gi) and the sole unschedulable node is master (taint node.kubernetes.io/unschedulable:NoSche

### case-42

- **结论**：`app/redis-cart` + `memory_capacity_mismatch` ｜ 标签 `app/redis-cart` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 157,708
- **raw 日志**：[results/1021_0450_tsm-v1-b173/raw/1021_0451_boutique-scheduling-42](../results/1021_0450_tsm-v1-b173/raw/1021_0451_boutique-scheduling-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod redis-cart-d9c95f94d-tshkh is Pending with Node: <none>, IP: <none> and PodScheduled=False; its Events carry 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' The redis-cart Deployment requests memory: 20Gi (equal to its limit) on a redis:alpine container, while every node allocatable memory is only about 15Gi (master 15671352Ki, worker-01 15671348Ki, worker-02 15671348Ki, worker-03 15671352Ki), so the 20Gi r

### case-43

- **结论**：`app/shippingservice` + `memory_capacity_mismatch` ｜ 标签 `app/shippingservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 159,811
- **raw 日志**：[results/1021_0452_tsm-v1-b174/raw/1021_0452_boutique-scheduling-43](../results/1021_0452_tsm-v1-b174/raw/1021_0452_boutique-scheduling-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first (wording named no service, so the inventory listing was the entry): pods -o wide in boutique showed the only outlier as shippingservice-c57f8c997-nmvm2 with 0/1 Pending and Node: <none>, while all 10 other pods were 1/1 Running with 0 restarts. Returning to the complaint side: frontend's error log held only benign GCE-metadata noise (instance/attributes/cluster-name, instance/zone not defined) with no shipping-call failure, but an active probe on the port the Service itself declares (shippingservice:50051/TCP) returned 'Connection Failed' and endpoints shippingservice = <non

### case-44

- **结论**：`app/cartservice` + `memory_capacity_mismatch` ｜ 标签 `app/cartservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 208,469
- **raw 日志**：[results/1021_0452_tsm-v1-b174/raw/1021_0452_boutique-scheduling-44](../results/1021_0452_tsm-v1-b174/raw/1021_0452_boutique-scheduling-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the sole unreachable service: endpoints/cartservice = <none> and CheckServiceConnectivity(cartservice:7070) = Connection Failed on the Service-declared port 7070. Its pod cartservice-985bc9ccd-nb525 is Pending 0/1 with Node: <none>, PodScheduled=False, and pod Events carry 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory; preemption: 3 No preemption victims found'. Capacity face: all 4 nodes Ready with MemoryPressure=False and Node-Selectors <none> (affinity/selector ruled out); the only unschedulable node is master (Ready,S

### case-45

- **结论**：`app/checkoutservice` + `memory_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 159,997
- **raw 日志**：[results/1021_0452_tsm-v1-b174/raw/1021_0453_boutique-scheduling-45](../results/1021_0452_tsm-v1-b174/raw/1021_0453_boutique-scheduling-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice-77499d48c9-5ggrs is Pending with Node: <none>, PodScheduled=False, while all other 11 boutique pods are 1/1 Running with 0 restarts; Endpoints for checkoutservice is <none> (no ready backend). Pod events: Warning FailedScheduling from default-scheduler: '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' Node side: worker-01/02/03 are Ready with ~15.6Gi allocatable memory each but all report Insufficient memory, and master 

### case-46

- **结论**：`app/emailservice` + `memory_capacity_mismatch` ｜ 标签 `app/emailservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 195,313
- **raw 日志**：[results/1021_0452_tsm-v1-b174/raw/1021_0453_boutique-scheduling-46](../results/1021_0452_tsm-v1-b174/raw/1021_0453_boutique-scheduling-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show only benign GCE metadata noise, so the pods inventory was the entry: emailservice-7b8b9859b5-8sw52 is the only outlier (0/1 Pending, all 14 others 1/1 Running). Complaint side confirms it: Service emailservice exists with selector app=emailservice and port 5000->targetPort 8080, but endpoints are '<none>' and CheckServiceConnectivity(emailservice, 5000) returns 'Connection Failed'. Pod detail: 'Node: <none>', PodScheduled False, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' Node side: only master carries 

### case-47

- **结论**：`app/frontend` + `memory_capacity_mismatch` ｜ 标签 `app/frontend` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 152,063
- **raw 日志**：[results/1021_0454_tsm-v1-b175/raw/1021_0454_boutique-scheduling-47](../results/1021_0454_tsm-v1-b175/raw/1021_0454_boutique-scheduling-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side entry: pods listing in boutique shows a single outlier frontend-9cf46975c-6lhkj 0/1 Pending Node:<none> while all 13 peer services are 1/1 Running with 0 restarts. Pod sheet scheduling line: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' Node side: master is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule, worker-01/02/03 each Ready with ~15671348Ki allocatable and 

### case-48

- **结论**：`app/paymentservice` + `memory_capacity_mismatch` ｜ 标签 `app/paymentservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 152,822
- **raw 日志**：[results/1021_0454_tsm-v1-b175/raw/1021_0454_boutique-scheduling-48](../results/1021_0454_tsm-v1-b175/raw/1021_0454_boutique-scheduling-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend entry-service error logs show no downstream connection errors (only GCE metadata noise), while the pods listing has exactly one outlier: paymentservice-6bb6859449-wfld5 0/1 Pending with Node: <none>. The pod sheet carries the mechanism verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' GetClusterConfiguration shows 4 Ready nodes with ~15Gi allocatable each, worker-01/02/03 schedulable but report

### case-49

- **结论**：`app/productcatalogservice` + `memory_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 134,934
- **raw 日志**：[results/1021_0454_tsm-v1-b175/raw/1021_0455_boutique-scheduling-49](../results/1021_0454_tsm-v1-b175/raw/1021_0455_boutique-scheduling-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows a single outlier: productcatalogservice-d84897895-bvcdj 0/1 Pending, Node <none> (all other 14 pods 1/1 Running, RESTARTS 0). Its pod sheet carries the scheduling line: 'Warning FailedScheduling 32s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' GetClusterConfiguration shows all 4 nodes Ready with MemoryPressure False and allocatable memory ~15671348Ki (about 14.95Gi); master carries node.k

### case-50

- **结论**：`app/recommendationservice` + `memory_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 178,293
- **raw 日志**：[results/1021_0456_tsm-v1-b176/raw/1021_0456_boutique-scheduling-50](../results/1021_0456_tsm-v1-b176/raw/1021_0456_boutique-scheduling-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows the only outlier: recommendationservice-79579f557f-vjbwq 0/1 Pending with Node: <none> (all other pods 1/1 Running). Its own pod sheet carries the scheduling line: 'Warning FailedScheduling 33s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.', with Conditions PodScheduled=False. The mechanism is bound to config: GetAppYAML(recommendationservice) declares resources.requests.memory: 8Gi (limits 8Gi, CPU 

### case-51

- **结论**：`app/redis-cart` + `memory_capacity_mismatch` ｜ 标签 `app/redis-cart` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 169,083
- **raw 日志**：[results/1021_0456_tsm-v1-b176/raw/1021_0456_boutique-scheduling-51](../results/1021_0456_tsm-v1-b176/raw/1021_0456_boutique-scheduling-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' named no service, so the inventory listing was the entry: the single outlier row is 'redis-cart-56496f856-rzsz7 0/1 Pending 0 30s <none> <none>' while all 14 other pods are 1/1 Running. Complaint side closed the loop: frontend error logs contain only benign GCE metadata messages, cartservice (the caller of redis-cart) has no error logs, an active TCP probe on the Service's own declared port 6379 returned 'Connection Failed', and endpoints/redis-cart is '<none>'. The Pending branch's pod sheet localizes the mechanism: Conditions PodScheduled False, Nod

### case-52

- **结论**：`app/shippingservice` + `memory_capacity_mismatch` ｜ 标签 `app/shippingservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 131,119
- **raw 日志**：[results/1021_0456_tsm-v1-b176/raw/1021_0457_boutique-scheduling-52](../results/1021_0456_tsm-v1-b176/raw/1021_0457_boutique-scheduling-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in boutique: pod shippingservice-5d5dbb88bf-vmczd is 0/1 Pending with Node: <none>; all 14 other pods are 1/1 Running, 0 restarts. Service shippingservice has ENDPOINTS <none>, so frontend/checkoutservice fail only on the shipping path (partial unreachability) while other services resolve. Pod detail shows PodScheduled=False and Events: 'Warning FailedScheduling 33s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incomin

### case-53

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 165,937
- **raw 日志**：[results/1021_0456_tsm-v1-b176/raw/1021_0457_boutique-scheduling-53](../results/1021_0456_tsm-v1-b176/raw/1021_0457_boutique-scheduling-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side (frontend error logs, 116/507 errors): all failures converge on cart storage - "Can't access cart storage. StackExchange.Redis.RedisConnectionException: ... UnableToConnect on redis-cart:6379" and "failed to complete the order: ... cart failure: failed to get user cart during checkout". Workload listing shows the only outlier: pod redis-cart-68db7b6f97-f2skx 0/1 Pending (all other 10 boutique pods 1/1 Running). Pod detail: Node <none>, PodScheduled False, event "Warning FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims". PVC redis-cart-pvc i

### case-54

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 165,742
- **raw 日志**：[results/1021_0458_tsm-v1-b177/raw/1021_0458_boutique-scheduling-54](../results/1021_0458_tsm-v1-b177/raw/1021_0458_boutique-scheduling-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability enters from frontend error logs: 119/534 requests fail with 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage. RedisConnectionException: It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379', while other paths (product/recommendation/currency) stay healthy. The only unhealthy object is redis-cart-68db7b6f97-krnq9 (0/1 Pending, Node: <none>). Its pod detail carries the scheduling line 'Warning FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeC

### case-55

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 143,821
- **raw 日志**：[results/1021_0458_tsm-v1-b177/raw/1021_0458_boutique-scheduling-55](../results/1021_0458_tsm-v1-b177/raw/1021_0458_boutique-scheduling-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is scoped to the cart path: frontend GetErrorLogs shows 81+12 errors 'could not retrieve cart / failed to complete the order' with 'Can't access cart storage. StackExchange.Redis.RedisConnectionException ... It was not possible to connect to the redis server(s). ConnectTimeout ... serverEndpoint: redis-cart:6379' on the cartservice->redis-cart edge. Pods listing has exactly one outlier: redis-cart-68db7b6f97-7vdqn 0/1 Pending (all 10 other pods 1/1 Running, 0 restarts). DescribeResource(pod) gives Node: <none>, PodScheduled False, with 'Warning FailedScheduling 0/4 nodes

### case-56

- **结论**：`app/adservice` + `node_affinity_mismatch` ｜ 标签 `app/adservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 136,192
- **raw 日志**：[results/1021_0458_tsm-v1-b177/raw/1021_0459_boutique-scheduling-56](../results/1021_0458_tsm-v1-b177/raw/1021_0459_boutique-scheduling-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows a single outlier: adservice-5db445fc48-txrtd is 0/1 Pending with NODE=<none>, while all other 10 boutique pods are 1/1 Running. Complaint side (L3 hard order) confirms the victim: GetResources(services, name=adservice) declares ClusterIP 10.68.65.128 port 9555/TCP, and frontend's GetErrorLogs shows 162/842 (19.2%) errors of 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.65.128:9555: connect: connection refused' - the exact Service IP and Service-declared port, i.e. the symptom enters at the frontend -> adservice edge. The pod's own sheet carries a rea

### case-57

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 151,705
- **raw 日志**：[results/1021_0458_tsm-v1-b177/raw/1021_0459_boutique-scheduling-57](../results/1021_0458_tsm-v1-b177/raw/1021_0459_boutique-scheduling-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability traced to cartservice. Signal side (frontend error logs, 302/1206 errors) shows only cart dial failures: 'could not retrieve cart / failed to add to cart: rpc error: code = Unavailable ... dial tcp 10.68.59.81:7070: connect: connection refused'. Workload listing shows the single outlier cartservice-6dc446b96c-bpxgc is 0/1 Pending with Node: <none>. Pod sheet mechanism event: 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' while Node-Selectors is <none>, so the constraint is nodeAffinit

### case-58

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 126,617
- **raw 日志**：[results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-58](../results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (174/176 errors): 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.245.251:7000: connect: connection refused' on the port the currencyservice Service declares (7000). Pod listing shows the sole outlier currencyservice-6999d4d666-c4bs8 is 0/1 Pending with Node: <none>, all other 11 boutique services 1/1 Running. Pod detail scheduling row: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' with Node-Selectors: <none> (so affinity, not selector). GetClusterConfig

### case-59

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 225,352
- **raw 日志**：[results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-59](../results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section walked: complaint side first - GetErrorLogs(frontend) showed 'lookup productcatalogservice on 169.254.20.10:53: no such host' but that victim proved healthy (Service 10.68.238.179:3550 exists, endpoints 172.20.2.150:3550 bound, CheckServiceConnectivity productcatalogservice:3550 'Connection Succeeded'), so it is startup-order noise. The workload scan left exactly one outlier: emailservice-df95f74cd-srzrm 0/1 Pending (all other 10 pods 1/1 Running, 0 restarts). Pod sheet: Node: <none>, PodScheduled False, Events show 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) 

### case-60

- **结论**：`app/frontend` + `node_affinity_mismatch` ｜ 标签 `app/frontend` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 131,852
- **raw 日志**：[results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-60](../results/1021_0500_tsm-v1-b178/raw/1021_0500_boutique-scheduling-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows the only outlier: frontend-6499cbd48d-5859c 0/1 Pending, Node <none> (all other 10 boutique pods 1/1 Running). DescribeResource(pod) gives PodScheduled False with event: Warning FailedScheduling - "0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling." Node-Selectors is <none>, so selector is not the blocker. GetAppYAML(frontend) shows a required nodeAffinity: nodeSelectorTerms matchExpressions key=env operator=In values=[prod, staging]. GetCl

### case-61

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 129,036
- **raw 日志**：[results/1021_0501_tsm-v1-b179/raw/1021_0501_boutique-scheduling-61](../results/1021_0501_tsm-v1-b179/raw/1021_0501_boutique-scheduling-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend logged 179/181 errors as 'could not retrieve product(s): rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.127.164:3550: connect: connection refused' (port 3550 = productcatalogservice Service port). Pod inventory: productcatalogservice-799cc5ccb4-fnxqw is the only outlier at 0/1 Pending; all other 10 pods 1/1 Running. Pod sheet: PodScheduled False, Node: <none>, Node-Selectors: <none>, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/select

### case-62

- **结论**：`app/recommendationservice` + `node_affinity_mismatch` ｜ 标签 `app/recommendationservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 139,970
- **raw 日志**：[results/1021_0501_tsm-v1-b179/raw/1021_0501_boutique-scheduling-62](../results/1021_0501_tsm-v1-b179/raw/1021_0501_boutique-scheduling-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 73x 'failed to get product recommendations' with "rpc error: code = Unavailable ... dial tcp 10.68.145.254:8080: connect: connection refused" (recommendationservice ClusterIP, Service port 8080). Pod listing has one outlier: recommendationservice-f498857d6-rv5bj 0/1 Pending (all other 10 pods 1/1 Running), and GetResources(endpoints, recommendationservice) = <none>, which explains the refused connections. Pod sheet: Node: <none>, Conditions PodScheduled False, Events: Warning FailedScheduling 'default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 n

### case-63

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 149,543
- **raw 日志**：[results/1021_0501_tsm-v1-b179/raw/1021_0502_boutique-scheduling-63](../results/1021_0501_tsm-v1-b179/raw/1021_0502_boutique-scheduling-63/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod redis-cart-6b998586b5-mwkcl is 0/1 Pending with Node: <none> and condition PodScheduled=False, while all other 10 boutique pods are 1/1 Running. Its own sheet carries the scheduling line: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' The pod shows Node-Selectors: <none>, so the mismatch comes from affinity: the redis-cart Deployment pod template requires nodeAffinity requiredDuringSchedulingIgnoredDuringExecution matchExpr

### case-64

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 152,439
- **raw 日志**：[results/1021_0501_tsm-v1-b179/raw/1021_0502_boutique-scheduling-64](../results/1021_0501_tsm-v1-b179/raw/1021_0502_boutique-scheduling-64/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log is the first-level signal: 181x 'could not retrieve cart' + 121x 'failed to add to cart' with 'rpc error: code = Unavailable ... dial tcp 10.68.122.249:7070: connect: connection refused' (cartservice's gRPC port 7070). Pods listing shows the single outlier cartservice-55b495c7ff-cwvgb 0/1 Pending while all other 10 pods are 1/1 Running. Its own sheet shows Node: <none>, PodScheduled False, and Warning FailedScheduling from default-scheduler: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' (preemption not helpful). 

### case-65

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 131,843
- **raw 日志**：[results/1021_0503_tsm-v1-b180/raw/1021_0503_boutique-scheduling-65](../results/1021_0503_tsm-v1-b180/raw/1021_0503_boutique-scheduling-65/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log shows the primary signal: 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.6.50:7000: connect: connection refused' (153/177 errors), i.e. the currencyservice ClusterIP:7000 that the Service spec itself declares is refused. Pod inventory has exactly one outlier: currencyservice-68dfd644cd-njq8p 0/1 Pending (all 10 other pods 1/1 Running). endpoints/currencyservice => <none> (selector app=currencyservice does match the pod label, so no endpoint binding exists because no pod is Ready). Pod sheet: Node: <none>, PodScheduled False, event 'Warning F

### case-66

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 170,902
- **raw 日志**：[results/1021_0503_tsm-v1-b180/raw/1021_0503_boutique-scheduling-66](../results/1021_0503_tsm-v1-b180/raw/1021_0503_boutique-scheduling-66/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial service unreachability localized to emailservice. Signal side: GetResources(services) shows emailservice ClusterIP port 5000/TCP; CheckServiceConnectivity(emailservice,5000,boutique) = 'Connection Failed' and GetResources(endpoints, emailservice) = ENDPOINTS <none>, so callers (checkoutservice) have no reachable target while frontend logs show only warnings such as 'failed to get ads: DeadlineExceeded' (16/1226 errors, 1.31%). Workload side: pods listing outlier 'emailservice-5b8845df78-rbs5x 0/1 Pending 0' vs all 10 peers 1/1 Running. Pod sheet: Node: <none>, PodScheduled False, Node-

### case-67

- **结论**：`app/frontend` + `node_affinity_mismatch` ｜ 标签 `app/frontend` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 130,193
- **raw 日志**：[results/1021_0503_tsm-v1-b180/raw/1021_0504_boutique-scheduling-67](../results/1021_0503_tsm-v1-b180/raw/1021_0504_boutique-scheduling-67/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod frontend-77cf88bb6d-swpvk is stuck Pending with Node: <none> and PodScheduled False, while all other 10 boutique services are 1/1 Running. Its pod sheet carries the mechanism line: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' GetClusterConfiguration shows the scheduling ground truth: worker-01/worker-02/worker-03 are all Ready, untainted and with ample capacity (8 CPU / ~15.6Gi allocatable) but every one of them carri

### case-68

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 154,326
- **raw 日志**：[results/1021_0503_tsm-v1-b180/raw/1021_0504_boutique-scheduling-68](../results/1021_0503_tsm-v1-b180/raw/1021_0504_boutique-scheduling-68/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice pod productcatalogservice-768c4964d8-2tvlg stuck 0/1 Pending with Node: <none>; its sheet carries 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Complaint side confirms impact: frontend error logs (164/654, 25%) show 'rpc error: code = Unavailable ... dial tcp 10.68.139.45:3550: connect: connection refused' against the Service's own declared port 3550, and endpoints/productcatalogservice is '<none>'. GetClusterConfiguration shows worker-01/02/03 Ready with ample allocatable cpu/memory

### case-69

- **结论**：`app/recommendationservice` + `node_affinity_mismatch` ｜ 标签 `app/recommendationservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 151,965
- **raw 日志**：[results/1021_0505_tsm-v1-b181/raw/1021_0505_boutique-scheduling-69](../results/1021_0505_tsm-v1-b181/raw/1021_0505_boutique-scheduling-69/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (entry caller) show 69x 'rpc error: code = Unavailable ... dial tcp 10.68.76.96:8080: connect: connection refused' on /product/* ('failed to get product recommendations'); 10.68.76.96:8080 is the recommendationservice ClusterIP:port. Pod listing shows the single outlier recommendationservice-797c4ccc78-mqh4f 0/1 Pending with Node: <none> (all other 10 pods 1/1 Running). Pod sheet carries the mechanism: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with Node-Selectors: <none> so the mism

### case-70

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 166,390
- **raw 日志**：[results/1021_0505_tsm-v1-b181/raw/1021_0506_boutique-scheduling-70](../results/1021_0505_tsm-v1-b181/raw/1021_0506_boutique-scheduling-70/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend error log (140/558 errors) shows the dominant pattern "could not retrieve cart: rpc error: code = FailedPrecondition ... StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379/Interactive", i.e. the cart storage edge is dead. The pods listing has exactly one outlier: redis-cart-5884778669-tr7fc 0/1 Pending with Node: <none>, while all other 10 boutique pods are 1/1 Running. The pod's own sheet carries the scheduling line: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/se

### case-71

- **结论**：`app/shippingservice` + `node_affinity_mismatch` ｜ 标签 `app/shippingservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 165,284
- **raw 日志**：[results/1021_0505_tsm-v1-b181/raw/1021_0506_boutique-scheduling-71](../results/1021_0505_tsm-v1-b181/raw/1021_0506_boutique-scheduling-71/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (152 lines, 11.19%) shows 'failed to get shipping quote: rpc error: code = Unavailable desc = ... dial tcp 10.68.190.4:50051: connect: connection refused'; 10.68.190.4:50051 is exactly the ClusterIP/port declared by the shippingservice Service spec. Pod scan shows the single outlier shippingservice-847dfd5ff4-wnwc9 0/1 Pending with Node: <none>, all other 10 pods 1/1 Running with 0 restarts; Deployment shippingservice is 0/1 AVAILABLE so the Service has no ready endpoints, which explains the caller-side connection refused. Pod detail carries the scheduling mechanism event: W

### case-72

- **结论**：`app/adservice` + `node_affinity_mismatch` ｜ 标签 `app/adservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 154,639
- **raw 日志**：[results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-72](../results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-72/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique: frontend's dominant error (138 hits) is 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.172.63:9555: connect: connection refused' on adservice's Service-declared port 9555; endpoints/adservice = <none> and CheckServiceConnectivity(adservice,9555) = Connection Failed. Pod inventory scanned: sole outlier adservice-7fcbc7446f-ndl8v is Pending with Node: <none>, READY 0/1; deployment app=adservice AVAILABLE 0. Mechanism event on the pod: Warning FailedScheduling from default-scheduler - '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Po

### case-73

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 150,344
- **raw 日志**：[results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-73](../results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-73/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) GetErrorLogs: 244/306 errors are 'could not retrieve cart'/'failed to add to cart' -> rpc error code=Unavailable, 'transport: Error while dialing: dial tcp 10.68.122.197:7070: connect: connection refused' (that IP is the cartservice ClusterIP). Pods -o wide shows a single outlier: cartservice-55cd596fdb-75wdb 0/1 Pending, Node: <none>, while all 10 other pods are 1/1 Running. DescribeResource(pod) records PodScheduled False and the mechanism event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affin

### case-74

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 126,344
- **raw 日志**：[results/1021_0507_tsm-v1-b182/raw/1021_0508_boutique-scheduling-74](../results/1021_0507_tsm-v1-b182/raw/1021_0508_boutique-scheduling-74/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability traced to currencyservice being unschedulable. Signal side: frontend error logs 173 errors (25%), 171x pattern 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.111.217:7000: connect: connection refused'. Workload: only outlier pod is currencyservice-75688b6455-clv5l 0/1 Pending (all other 10 services 1/1 Running). Pod sheet: Node: <none>, PodScheduled False, event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with Node-Selectors: <none>. Deployment te

### case-75

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 153,856
- **raw 日志**：[results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-75](../results/1021_0507_tsm-v1-b182/raw/1021_0507_boutique-scheduling-75/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing shows a single outlier: emailservice-79d96f6bc9-4gxqr is 0/1 Pending with Node: <none> (all other 10 boutique pods are 1/1 Running, RESTARTS 0), and its pod sheet carries PodScheduled False with event 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Node side: master is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule (the 1 unschedulable node); worker-01/02/03 are Ready, untainted, with ample allocatable CPU/memory (8C / ~15.6Gi, no pressure) so ca

### case-76

- **结论**：`app/paymentservice` + `node_affinity_mismatch` ｜ 标签 `app/paymentservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 126,980
- **raw 日志**：[results/1021_0508_tsm-v1-b183/raw/1021_0508_boutique-scheduling-76](../results/1021_0508_tsm-v1-b183/raw/1021_0508_boutique-scheduling-76/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side: frontend logs 160 errors on POST /cart/checkout - "failed to charge card ... rpc error: code = Unavailable ... dial tcp 10.68.226.91:50051: connect: connection refused". Workload scan: 10/11 pods Running; the only outlier is paymentservice-6bc9cd4c79-c9lmd 0/1 Pending, Node: <none>, PodScheduled=False, with mechanism event "Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector". Node side: master carries node.kubernetes.io/unschedulable:NoSchedule taint (the 1 unschedulable), and none of worker-01/02/

### case-77

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 172,509
- **raw 日志**：[results/1021_0508_tsm-v1-b183/raw/1021_0508_boutique-scheduling-77](../results/1021_0508_tsm-v1-b183/raw/1021_0508_boutique-scheduling-77/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (180/718, 25%) show 'rpc error: code = Unavailable ... dial tcp 10.68.195.174:3550: connect: connection refused', which matches productcatalogservice Service ClusterIP 10.68.195.174:3550 exactly; its Endpoints are '<none>' because the only pod productcatalogservice-656b5cf4cc-d5gvg is Pending with Node: <none>. Pod sheet carries 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Node surface: all 4 nodes Ready with no pressure and ample allocatable cpu/memory, worker-01/02/03 untainted with

### case-78

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 140,042
- **raw 日志**：[results/1021_0508_tsm-v1-b183/raw/1021_0509_boutique-scheduling-78](../results/1021_0508_tsm-v1-b183/raw/1021_0509_boutique-scheduling-78/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (108 errors) dominated by 79 cartservice failures: 'Can't access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6379/Interactive ... serverEndpoint: redis-cart:6379, clientName: cartservice-79b49f5555-ftbzn'. Pod listing outlier: redis-cart-695798d76d-2c7jc 0/1 Pending (all other 10 services 1/1 Running); GetResources(endpoints, name=redis-cart) returns ENDPOINTS: <none>, matching caller-side UnableToConnect. Pod detail shows Node: <none>, PodScheduled False, event 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 1 node(s) w

### case-79

- **结论**：`app/shippingservice` + `node_affinity_mismatch` ｜ 标签 `app/shippingservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 119,488
- **raw 日志**：[results/1021_0508_tsm-v1-b183/raw/1021_0509_boutique-scheduling-79](../results/1021_0508_tsm-v1-b183/raw/1021_0509_boutique-scheduling-79/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs are dominated by 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.246.42:50051: connect: connection refused' (147/213 errors). Pod inventory shows the single outlier shippingservice-5c476cd7dc-9wbbp as 0/1 Pending with Node: <none>, all other 10 services 1/1 Running. The pod sheet carries the scheduling line: 'Warning FailedScheduling 73s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.', with Node-Selectors: <none>. GetAppYAML(shippingservice) shows the pod template 

### case-80

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 151,664
- **raw 日志**：[results/1021_0510_tsm-v1-b184/raw/1021_0510_boutique-scheduling-80](../results/1021_0510_tsm-v1-b184/raw/1021_0510_boutique-scheduling-80/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend error log shows 139/174 errors as 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.135.94:9555: connect: connection refused' on adservice's own declared Service port 9555. Inventory scan shows the sole outlier pod adservice-74f5c86c49-2lhwq is 0/1 Pending while all other 10 pods are 1/1 Running with 0 restarts, and 'endpoints adservice' returns '<none>', explaining the caller-side connection refused. Pod sheet gives Node: <none>, PodScheduled False, Node-Selectors: environment=production, with Warning FailedScheduling: '0/4 nodes are available: 1 node(

### case-81

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 129,475
- **raw 日志**：[results/1021_0510_tsm-v1-b184/raw/1021_0511_boutique-scheduling-81](../results/1021_0510_tsm-v1-b184/raw/1021_0511_boutique-scheduling-81/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) logged 277/1106 errors (25% error ratio): 161x 'could not retrieve cart: ... dial tcp 10.68.12.41:7070: connect: connection refused' and 102x 'failed to add to cart: ... connection refused'. The pods listing shows the outlier cartservice-6d9fc79f96-4bhwx 0/1 Pending with Node: <none> while all other services are 1/1 Running. Its pod sheet shows PodScheduled False, Node-Selectors: env=prod, and Warning FailedScheduling from default-scheduler: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' Node inspection: mas

### case-82

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 126,778
- **raw 日志**：[results/1021_0510_tsm-v1-b184/raw/1021_0511_boutique-scheduling-82](../results/1021_0510_tsm-v1-b184/raw/1021_0511_boutique-scheduling-82/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (167/169 errors, 25% error ratio) show checkout failures: 'rpc error: code = Unavailable ... Error while dialing: dial tcp 10.68.84.231:5050: connect: connection refused' on POST /cart/checkout - port 5050 is the checkoutservice Service port, so the Service has no ready backend. Pods listing isolates exactly one outlier: checkoutservice-86c9b9f9d7-646lz 0/1 Pending, Node: <none>, PodScheduled=False; all other boutique services are 1/1 Running. Pod detail carries the mechanism event: Warning FailedScheduling - '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s)

### case-83

- **结论**：`app/emailservice` + `node_selector_mismatch` ｜ 标签 `app/emailservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 154,843
- **raw 日志**：[results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-83](../results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-83/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice is the only unreachable unit: pod emailservice-5798db5787-k7dqf is 0/1 Pending with Node: <none> while all 10 peer pods are 1/1 Running (0 restarts). Signal side: Service emailservice exists (ClusterIP 10.68.148.192, 5000/TCP) but GetResources(endpoints, name=emailservice) returns ENDPOINTS <none>, and CheckServiceConnectivity(emailservice, 5000) on the Service's own declared port returns 'Connection Failed'; GetErrorLogs(emailservice) has no errors, i.e. the container never started. Mechanism event on the pod sheet: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s)

### case-84

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 152,665
- **raw 日志**：[results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-84](../results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-84/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) GetErrorLogs: 131x 'failed to charge card: ... dial tcp 10.68.121.232:50051: connect: connection refused' - 10.68.121.232 is the ClusterIP of the paymentservice Service. Pods listing shows exactly one outlier: paymentservice-d556f5dc9-ht672 0/1 Pending, Node: <none>, all other 10 boutique pods 1/1 Running with 0 restarts. Pod sheet: 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', PodScheduled False, Node-Selectors: env=prod. GetResources(endpoints, paymentservice

### case-85

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.1429 · steps 15 · tokens 136,237
- **raw 日志**：[results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-85](../results/1021_0512_tsm-v1-b185/raw/1021_0512_boutique-scheduling-85/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log's dominant pattern (72x) is 'failed to get product recommendations' with 'dial tcp 10.68.102.255:8080: connect: connection refused'; the services listing shows recommendationservice ClusterIP 10.68.102.255 with spec port 8080, so the refused address is that Service on its own declared port. The pods inventory has exactly one outlier: recommendationservice-67bdbb7947-4t798 is 0/1 Pending with Node: <none> and PodScheduled False. Its pod sheet carries Node-Selectors: env=prod and the FailedScheduling event reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s)

### case-86

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 186,483
- **raw 日志**：[results/1021_0512_tsm-v1-b185/raw/1021_0513_boutique-scheduling-86](../results/1021_0512_tsm-v1-b185/raw/1021_0513_boutique-scheduling-86/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (129/514 errors) leads with 80 lines of 'Could not access cart storage ... UnableToConnect on redis-cart:6379' from cartservice, i.e. the cart storage backend is unreachable. Pods listing has a single outlier: redis-cart-644b57d75d-wqwbl 0/1 Pending (all other 10 pods 1/1 Running). Pod sheet: 'Node: <none>', 'PodScheduled False', 'Node-Selectors: env=prod', no Affinity section, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. GetClusterConfiguration: worker-01/02/03 all labeled env=st

### case-87

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 148,321
- **raw 日志**：[results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-87](../results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-87/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side (frontend error log, 163x/11.9%): 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.244.153:50051: connect: connection refused' — that IP:port is exactly shippingservice's own Service ClusterIP and declared port. Pod inventory outlier: shippingservice-5b9b6c5499-brpw5 0/1 Pending, no IP, Node: <none>, RESTARTS=0, while all 10 other boutique pods are 1/1 Running. Pod sheet carries PodScheduled: False with Node-Selectors: env=prod and event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's n

### case-88

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 136,859
- **raw 日志**：[results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-88](../results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-88/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (signal side) show the dominant failure 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.171.201:9555: connect: connection refused' (129/174 errors), naming adservice at the port its Service declares (9555). The pods inventory has exactly one outlier matching it: adservice-6b5d9b4d-db6sr 0/1 Pending with Node <none>, while all other 10 pods are 1/1 Running with 0 restarts. Its own pod sheet carries the scheduling line: 'Node-Selectors: region=cn-north' and event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) di

### case-89

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 146,397
- **raw 日志**：[results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-89](../results/1021_0514_tsm-v1-b186/raw/1021_0514_boutique-scheduling-89/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show the cart path failing with 'rpc error: code = Unavailable ... dial tcp 10.68.162.3:7070: connect: connection refused' (151+98 errors), i.e. the cartservice Service ClusterIP/port with no serving backend. Pods listing has exactly one outlier: cartservice-7c8d449dcf-js2xd 0/1 Pending, Node: <none>, PodScheduled False, with nodeSelector 'region=cn-north'. Its pod events carry the mechanism: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetClusterConfiguration shows no node bears a 're

### case-90

- **结论**：`app/currencyservice` + `node_selector_mismatch` ｜ 标签 `app/currencyservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 155,024
- **raw 日志**：[results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-90](../results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-90/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (155/180) show 'could not retrieve currencies: ... dial tcp 10.68.187.178:7000: connect: connection refused'; port 7000 matches currencyservice Service spec (port 7000 -> targetPort 7000), so the fault is server-side. Pod inventory shows the single outlier currencyservice-57d67bb57d-75r4c 0/1 Pending with Node: <none>; its pod sheet carries 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' and 'Node-Selectors: region=cn-north'. Node listing shows master/worker-01/worker-02/worker-03 labels 

### case-91

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 205,949
- **raw 日志**：[results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-91](../results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-91/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs: 135/168 errors are checkout failures ending in 'dial tcp 10.68.180.200:50051: connect: connection refused', which is exactly the ClusterIP of services/paymentservice (ClusterIP 10.68.180.200, port 50051). Pod inventory shows the single outlier paymentservice-5fc94bc4cd-ww7gc: READY 0/1, STATUS Pending, Node <none>, while all other boutique pods are 1/1 Running. The pod sheet carries the mechanism: 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The config the mechanism 

### case-92

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 165,712
- **raw 日志**：[results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-92](../results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-92/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (167/169) show 'could not retrieve product(s): rpc error: code = Unavailable ... dial tcp 10.68.193.81:3550: connect: connection refused'; 10.68.193.81:3550 is exactly productcatalogservice's ClusterIP and the port its Service spec declares (3550 -> targetPort 3550). Endpoints for productcatalogservice are '<none>' (no serving backend). The only instance productcatalogservice-5ddd857cb-xr5m9 is 0/1 Pending with Node: <none> and PodScheduled False. Mechanism event on the pod: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't ma

### case-93

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 158,001
- **raw 日志**：[results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-93](../results/1021_0516_tsm-v1-b187/raw/1021_0516_boutique-scheduling-93/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs are dominated (80/108) by 'failed to get product recommendations' with 'dial tcp 10.68.77.135:8080: connect: connection refused' — 10.68.77.135:8080 is recommendationservice's own Service ClusterIP:port. Workload scan: recommendationservice-697dc746b-tjglc is the only outlier (0/1 Pending, Node: <none>), all other 10 pods are 1/1 Running, matching 'partial' unreachability. Pod describe carries the scheduling line: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' together with 

### case-94

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 188,228
- **raw 日志**：[results/1021_0517_tsm-v1-b188/raw/1021_0517_boutique-scheduling-94](../results/1021_0517_tsm-v1-b188/raw/1021_0517_boutique-scheduling-94/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry service) error logs: 148/590 errors, dominant family 'could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... StackExchange.Redis.RedisConnectionException: UnableToConnect on redis-cart:6379/Interactive' (59+20) from client cartservice-79b49f5555-sxj7x; pods listing outlier redis-cart-5cfb66988f-hmgdm is 0/1 Pending (all 10 other pods Running 1/1). Pod detail: Node: <none>, Node-Selectors: region=cn-north, PodScheduled False, event 'Warning FailedScheduling 73s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 

### case-95

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 158,788
- **raw 日志**：[results/1021_0517_tsm-v1-b188/raw/1021_0517_boutique-scheduling-95](../results/1021_0517_tsm-v1-b188/raw/1021_0517_boutique-scheduling-95/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (198/1303) dominated by 141x 'failed to get shipping quote: rpc error: code = Unavailable desc = connection error: dial tcp 10.68.151.79:50051: connect: connection refused' - 10.68.151.79 is exactly shippingservice's ClusterIP with Service port 50051. Workload scan: shippingservice-6d69747df4-sk9mj is the only outlier, 0/1 Pending with Node: <none>, PodScheduled False; all other 10 boutique pods are 1/1 Running. Pod detail Events: 'Warning FailedScheduling 73s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity

### case-96

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 151,295
- **raw 日志**：[results/1021_0517_tsm-v1-b188/raw/1021_0518_boutique-scheduling-96](../results/1021_0517_tsm-v1-b188/raw/1021_0518_boutique-scheduling-96/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice pod cartservice-57585bd6c8-rcxq7 is 0/1 Pending with Node: <none> and Conditions PodScheduled=False; its event reads 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. GetAppYAML(cartservice) shows the template hard-codes nodeSelector {env: prod, hardware: high-mem} (both required, AND semantics), but GetClusterConfiguration shows no node carries both labels: worker-01 has only env=prod, worker-02 has only hardware=high-mem, worker-03 has neither, master has neither and is tainted node.kubernetes.i

### case-97

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 132,865
- **raw 日志**：[results/1021_0517_tsm-v1-b188/raw/1021_0518_boutique-scheduling-97](../results/1021_0517_tsm-v1-b188/raw/1021_0518_boutique-scheduling-97/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs dominate with 181/183 errors: 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.124.133:5050: connect: connection refused' on /cart/checkout — checkoutservice ClusterIP:5050 has no serving endpoint. Pod inventory shows the only outlier: checkoutservice-65954496c7-gl7tx 0/1 Pending, Node <none> (all other 10 pods 1/1 Running). Pod sheet: PodScheduled False with event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Node labels show the required combination nev

### case-98

- **结论**：`app/currencyservice` + `node_selector_mismatch` ｜ 标签 `app/currencyservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 130,766
- **raw 日志**：[results/1021_0701_tsm-v1-last2/raw/1021_0702_boutique-scheduling-98](../results/1021_0701_tsm-v1-last2/raw/1021_0702_boutique-scheduling-98/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side (frontend error logs, 180/182 errors): "could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.227.6:7000: connect: connection refused". Pod listing outlier: currencyservice-5499d6c69c-b9x5n 0/1 Pending, Node: <none> (all other 10 services 1/1 Running). Pod sheet scheduling line: "Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector", with Node-Selectors: env=prod, hardware=high-mem. Node-side comparison: worker-01 has only env=prod, worker-02 has only hardware=high-mem, worker-0

### case-99

- **结论**：`app/emailservice` + `node_selector_mismatch` ｜ 标签 `app/emailservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 136,208
- **raw 日志**：[results/1021_0701_tsm-v1-last2/raw/1021_0702_boutique-scheduling-99](../results/1021_0701_tsm-v1-last2/raw/1021_0702_boutique-scheduling-99/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend error logs plus a pruned pods scan exposed a single outlier: emailservice-5968ff544f-nq5sc is Pending 0/1 (Node: <none>) while the other 10 boutique services are 1/1 Running with 0 restarts. The pod 's own sheet carries the scheduling row: 'Warning FailedScheduling - 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetAppYAML(emailservice) shows the pod template pins nodeSelector {env: prod, hardware: high-mem} (AND semantics), but GetClusterConfiguration shows no node satisfies both: master is tainted unschedula

### case-100

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 151,132
- **raw 日志**：[results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-scheduling-100](../results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-scheduling-100/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (158/630, 25.1%) show the dominant signature 'dial tcp 10.68.105.105:50051: connect: connection refused' - 10.68.105.105 is the ClusterIP of Service paymentservice on its declared port 50051. Object layer: paymentservice-76df88bfb9-9wlfv is the only outlier in the pods listing (0/1 Pending, Node <none>, IP <none>) while the other 10 boutique pods are 1/1 Running; endpoints/paymentservice = '<none>', which is why callers are refused. Pod detail carries the mechanism: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's

### case-101

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 153,031
- **raw 日志**：[results/1020_2015_tsm-v1-b10/raw/1020_2015_boutique-scheduling-101](../results/1020_2015_tsm-v1-b10/raw/1020_2015_boutique-scheduling-101/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (168/670 errors, two dominant patterns 85+81) show 'could not retrieve product(s): rpc error: code = Unavailable ... dial tcp 10.68.40.126:3550: connect: connection refused' against port 3550 that the productcatalogservice Service itself declares (ClusterIP 10.68.40.126, 3550/TCP -> targetPort 3550), and GetResources(endpoints, productcatalogservice) returns '<none>' - no ready backend. The pod sheet shows productcatalogservice-75c47675bc-b75ft Pending 0/1, Node <none>, PodScheduled False, with Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable,

### case-102

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 154,010
- **raw 日志**：[results/1020_2020_tsm-v1-b13/raw/1020_2020_boutique-scheduling-102](../results/1020_2020_tsm-v1-b13/raw/1020_2020_boutique-scheduling-102/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: redis-cart-7f99cf664-2pv92 0/1 Pending on <none>. Complaint side confirms the reachability break: cartservice error logs 336/904 (37.2%) with 'FailedPrecondition Can't access cart storage ... UnableToConnect on redis-cart:6379' (112x), the redis-cart Service declares 6379/TCP correctly but its endpoints are '<none>' and an active TCP probe on redis-cart:6379 returns 'Connection Failed'. The pod's own sheet carries the mechanism event: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod'

### case-103

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 160,884
- **raw 日志**：[results/1020_2239_tsm-v1-b16/raw/1020_2239_boutique-scheduling-103](../results/1020_2239_tsm-v1-b16/raw/1020_2239_boutique-scheduling-103/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (GetErrorLogs) top pattern 142x: 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.44.161:50051: connect: connection refused' - 10.68.44.161:50051 is exactly shippingservice's ClusterIP and its Service-declared port; endpoints for shippingservice are '<none>' (no ready backend). Pod inventory has a single outlier: shippingservice-655675bf97-nv6rv 0/1 Pending with no node, all 10 peer pods 1/1 Running 0 restarts. Pod detail carries the mechanism: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't

### case-104

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 151,822
- **raw 日志**：[results/1020_2245_tsm-v1-b19/raw/1020_2245_boutique-scheduling-104](../results/1020_2245_tsm-v1-b19/raw/1020_2245_boutique-scheduling-104/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log: 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.238.12:9555: connect: connection refused' (149/882 errors); adservice Service declares port 9555/TCP but its endpoints are '<none>'. Pods listing outlier: adservice-64c49bc688-bjcjw 0/1 Pending, NODE <none> (all other 10 services 1/1 Running). Pod detail: PodScheduled False, Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with Node-Selectors: disktype=ssd. Node side: master Ready,SchedulingDisabled (the 1 unschedulable);

### case-105

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 147,479
- **raw 日志**：[results/1020_2251_tsm-v1-b22/raw/1020_2251_boutique-scheduling-105](../results/1020_2251_tsm-v1-b22/raw/1020_2251_boutique-scheduling-105/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (299/1194 errors) show cart paths failing: 'could not retrieve cart: rpc error: code = Unavailable ... dial tcp 10.68.121.101:7070: connect: connection refused' (177x) and 'failed to add to cart' (120x). The cartservice Service declares ClusterIP 10.68.121.101, port 7070/TCP, selector app=cartservice; an active TCP probe on that declared port returned 'Connection Failed' and endpoints/cartservice showed '<none>'. The only cartservice pod cartservice-6dd77c7477-glvbg is 0/1 Pending with Node '<none>' and PodScheduled False; its own event is 'Warning FailedScheduling (default

### case-106

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 127,537
- **raw 日志**：[results/1020_2300_tsm-v1-b25/raw/1020_2300_boutique-scheduling-106](../results/1020_2300_tsm-v1-b25/raw/1020_2300_boutique-scheduling-106/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (187/754 lines, 25% error ratio): 'failed to complete the order: rpc error: code = Unavailable desc = transport: Error while dialing: dial tcp 10.68.25.140:5050: connect: connection refused' on /cart/checkout; 10.68.25.140:5050 is checkoutservice's own Service port. Pods listing: checkoutservice-7d6f67c45d-mclbm 0/1 Pending, Node <none>, all 10 other pods 1/1 Running; Deployment checkoutservice 0/1 AVAILABLE. Pod detail events: 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/sel

### case-107

- **结论**：`app/frontend` + `node_selector_mismatch` ｜ 标签 `app/frontend` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 123,690
- **raw 日志**：[results/1020_2306_tsm-v1-b28/raw/1020_2306_boutique-scheduling-107](../results/1020_2306_tsm-v1-b28/raw/1020_2306_boutique-scheduling-107/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-9797cdb96-njsgm is 0/1 Pending with PodScheduled=False while all other 10 boutique services are 1/1 Running (RESTARTS 0), so the break is at scheduling, not startup/probe/addressing. Its own sheet carries the scheduling line: 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' Pod declares Node-Selectors: disktype=ssd; GetAppYAML(frontend) confirms deployment template spec.template.spec.nodeSelector: disktype: ssd. GetClusterConfiguration shows workers worker-01/02/03 

### case-108

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 127,889
- **raw 日志**：[results/1020_2313_tsm-v1-b31/raw/1020_2313_boutique-scheduling-108](../results/1020_2313_tsm-v1-b31/raw/1020_2313_boutique-scheduling-108/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal first: frontend error logs (184/734 errors) show two dominant patterns 'could not retrieve products/product: rpc error: code = Unavailable ... dial tcp 10.68.248.225:3550: connect: connection refused' (94 + 88 hits) - productcatalogservice on its own declared Service port 3550. Workload scan shows the single outlier productcatalogservice-78dcf65f44-v85nt 0/1 Pending (all other 10 pods 1/1 Running). Pod sheet: PodScheduled False, Node <none>, Node-Selectors: disktype=ssd, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's n

### case-109

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 156,034
- **raw 日志**：[results/1020_2319_tsm-v1-b34/raw/1020_2319_boutique-scheduling-109](../results/1020_2319_tsm-v1-b34/raw/1020_2319_boutique-scheduling-109/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (83/87 errors) show 'failed to get product recommendations' with "rpc error: code = Unavailable ... dial tcp 10.68.199.56:8080: connect: connection refused"; endpoints for recommendationservice are '<none>' while its Service selector app=recommendationservice is correct and port 8080->8080 mapping is correct. Pods listing shows the only outlier: recommendationservice-54c95657c8-r4jxw 0/1 Pending (all other 10 pods 1/1 Running, 0 restarts). Pod details: PodScheduled False, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't

### case-110

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 160,748
- **raw 日志**：[results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-scheduling-110](../results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-scheduling-110/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (131/522) are dominated by 96 cart failures: 'could not retrieve cart / failed to add to cart: rpc error: FailedPrecondition desc = Can''t access cart storage ... RedisConnectionException: UnableToConnect on redis-cart:6379'. The pods listing has exactly one outlier: redis-cart-5d5fdb58ff-4xdq6 0/1 Pending (all other 10 pods 1/1 Running, 0 restarts). Pod detail shows Conditions PodScheduled=False, Node: <none>, Node-Selectors: disktype=ssd, and event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn''t match Pod''s node affinity

### case-111

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 140,655
- **raw 日志**：[results/1020_2336_tsm-v1-b43/raw/1020_2336_boutique-scheduling-111](../results/1020_2336_tsm-v1-b43/raw/1020_2336_boutique-scheduling-111/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice pod shippingservice-6c796c756b-895lq is Pending (0/1, Node=<none>, PodScheduled=False) while all other 10 boutique pods are 1/1 Running. frontend's error log shows the dominant pattern (151x): 'failed to get shipping quote: rpc error: code = Unavailable desc = connection error: desc = \"transport: Error while dialing: dial tcp 10.68.6.225:50051: connect: connection refused\"' — 10.68.6.225:50051 is exactly shippingservice's Service ClusterIP and declared port; CheckServiceConnectivity(shippingservice, 50051) returned Connection Failed and endpoints shippingservice = <none>, so 

### case-112

- **结论**：`app/adservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/adservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 178,580
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0033_boutique-scheduling-112](../results/1021_0900_tsm-v1-fix/raw/1021_0033_boutique-scheduling-112/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice Deployment has replicas=5 with a hard podAntiAffinity (requiredDuringSchedulingIgnoredDuringExecution, labelSelector app In [adservice], topologyKey kubernetes.io/hostname), but only 3 worker hostnames are schedulable: GetClusterConfiguration shows master tainted node.kubernetes.io/unschedulable:NoSchedule while worker-01/02/03 are Ready, untainted and have 8 CPU / ~15Gi allocatable. Pods -o wide shows the sole outlier row set: adservice-ffb868985-2qdss and -jp22l are 0/1 Pending with Node: <none>, while the other 3 adservice pods run 1/1 on worker-01/02/03; deployments listing shows

### case-113

- **结论**：`app/cartservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/cartservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 175,103
- **raw 日志**：[results/1020_2349_tsm-v1-b49/raw/1020_2349_boutique-scheduling-113](../results/1020_2349_tsm-v1-b49/raw/1020_2349_boutique-scheduling-113/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice Deployment declares replicas: 5 with requiredDuringSchedulingIgnoredDuringExecution podAntiAffinity on topologyKey kubernetes.io/hostname (labelSelector app=cartservice), i.e. at most one cartservice pod per node. GetClusterConfiguration shows only 3 schedulable nodes: worker-01/02/03 are Ready with no taints, while master carries the taint node.kubernetes.io/unschedulable:NoSchedule. Both Pending pods (cartservice-7dd764f9cc-dvz9s, cartservice-7dd764f9cc-rdjtn) show identical pod events: 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) di

### case-114

- **结论**：`app/checkoutservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/checkoutservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 156,699
- **raw 日志**：[results/1020_2355_tsm-v1-b52/raw/1020_2355_boutique-scheduling-114](../results/1020_2355_tsm-v1-b52/raw/1020_2355_boutique-scheduling-114/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique inventory: all services 1/1 Running except checkoutservice (5 pods, 2 Pending: -m2xx8, -mxfgs). Pod detail for checkoutservice-fd5c7b5c4-m2xx8 shows PodScheduled=False with Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' GetClusterConfiguration: 4 Ready nodes, no Memory/Disk/PID pressure, 8 CPU and ~15Gi allocatable each; worker-01/02/03 taint-free, only master carries node.kub

### case-115

- **结论**：`app/frontend` + `pod_anti_affinity_conflict` ｜ 标签 `app/frontend` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 179,258
- **raw 日志**：[results/1021_0051_tsm-v1-b55/raw/1021_0051_boutique-scheduling-115](../results/1021_0051_tsm-v1-b55/raw/1021_0051_boutique-scheduling-115/)（ndjson / mcp.jsonl / meta）
- **摘要**：Following L3 (exact match) signal-first: frontend (entry caller) error log shows only a transient startup 'lookup productcatalogservice on 169.254.20.10:53: no such host' which self-healed (later GET /product/... return http.resp.status 200); the service_endpoints surface is healthy - GetResources(services, name=productcatalogservice) shows ClusterIP 10.68.217.141 port 3550, endpoints bound to 172.20.1.219:3550, and CheckServiceConnectivity(productcatalogservice,3550) returns 'open / Connection Succeeded', so the missing-Service/quota/DNS branches are excluded. The pods listing outlier is fron

### case-116

- **结论**：`app/paymentservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/paymentservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 183,295
- **raw 日志**：[results/1021_0058_tsm-v1-b58/raw/1021_0058_boutique-scheduling-116](../results/1021_0058_tsm-v1-b58/raw/1021_0058_boutique-scheduling-116/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows paymentservice runs 5 replicas with 2 pods stuck at 0/1 Pending and Node: <none> (paymentservice-67987f6464-bzdlh, -fg2kz), while the other 3 are Running 1/1 on worker-01/02/03. The pending pod's own sheet carries the mechanism event verbatim: 'Warning FailedScheduling 72s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetAppYAML(paymentservice) confirms the cause: replicas: 5 plus podAntiAffinity requiredDuringSchedulingIgnoredDuringExecution with topologyKey kubernetes.io/hostname selecting app in [

### case-117

- **结论**：`app/productcatalogservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/productcatalogservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 145,109
- **raw 日志**：[results/1021_0105_tsm-v1-b61/raw/1021_0105_boutique-scheduling-117](../results/1021_0105_tsm-v1-b61/raw/1021_0105_boutique-scheduling-117/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend GetErrorLogs shows 'could not retrieve products: rpc error: code = Unavailable ... dial tcp: lookup productcatalogservice on 169.254.20.10:53: no such host' (22 errors / 3.25%), but reachability is intact - Service productcatalogservice exists (ClusterIP 10.68.249.140, 3550/TCP), endpoints bind 172.20.1.244:3550,172.20.2.120:3550,172.20.3.24:3550, and CheckServiceConnectivity(productcatalogservice, 3550) returned 'open / Connection Succeeded', so a DNS/Service/port fault is excluded. Inventory outlier: productcatalogservice-647dd4d4fd-kz9dz and -ndzwh are 0/1 Pending wit

### case-118

- **结论**：`app/redis-cart` + `pod_anti_affinity_conflict` ｜ 标签 `app/redis-cart` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.16 · steps 26 · tokens 362,103
- **raw 日志**：[results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-scheduling-118](../results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-scheduling-118/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint-side frontend errors ('lookup productcatalogservice on 169.254.20.10:53: no such host') were transient at 05:33:44-46 and had recovered: the productcatalogservice Service exists (ClusterIP 10.68.245.30, 3550/TCP), its endpoints are bound (172.20.1.22:3550), CheckServiceConnectivity(productcatalogservice:3550) returned open, and frontend log tail (05:34:10-12) shows only status:200 request complete. No ResourceQuota exists in boutique, so the quota branch is excluded. The standing anomaly is redis-cart: 2 of its 5 pods are Pending with Node: <none>, and both instances (-7tflq, -vgjfr)

### case-119

- **结论**：`app/shippingservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/shippingservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 210,538
- **raw 日志**：[results/1021_0119_tsm-v1-b67/raw/1021_0119_boutique-scheduling-119](../results/1021_0119_tsm-v1-b67/raw/1021_0119_boutique-scheduling-119/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice deployment declares replicas: 5 with requiredDuringSchedulingIgnoredDuringExecution podAntiAffinity on topologyKey kubernetes.io/hostname (one pod per node), but the cluster has only 3 schedulable nodes: GetClusterConfiguration shows 4 Ready nodes with master carrying the taint node.kubernetes.io/unschedulable:NoSchedule, and worker-01/02/03 each already host one shippingservice pod. Pods shippingservice-57cffd957b-nk5sm and -wrdd2 are 0/1 Pending with Node: <none> and PodScheduled=False; the pod sheet's event reads verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1

### case-120

- **结论**：`app/adservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/adservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 180,812
- **raw 日志**：[results/1021_0131_tsm-v1-b73/raw/1021_0131_boutique-scheduling-120](../results/1021_0131_tsm-v1-b73/raw/1021_0131_boutique-scheduling-120/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (136/170 errors, 16.4%) show 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.217.124:9555: connect: connection refused' - the adservice ClusterIP on the port its Service spec declares. Pods listing shows the only outlier: adservice-5fb4d887f7-whb5t 0/1 Pending, Node: <none>, while all other 13 boutique pods are 1/1 Running. The pod's own sheet carries the scheduling line: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules'. GetAppYAML(adservice) shows requiredDuringSchedulingIgnore

### case-121

- **结论**：`app/cartservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/cartservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 0.6667 · EOC 0 · ECR 0 · EE 0.1667 · steps 13 · tokens 154,657
- **raw 日志**：[results/1021_0136_tsm-v1-b75/raw/1021_0137_boutique-scheduling-121](../results/1021_0136_tsm-v1-b75/raw/1021_0137_boutique-scheduling-121/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs show 165x "could not retrieve cart" and 102x "failed to add to cart" with 'dial tcp 10.68.106.185:7070: connect: connection refused' (the port cartservice's own Service spec declares). Pods listing has exactly one outlier: cartservice-66bc57588b-tpnjj 0/1 Pending. DescribeResource on that pod gives Node: <none>, PodScheduled False, event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetClusterConfiguration shows master cordoned (node.kubernetes.io/unschedulable:NoSchedule) while worker-01/02

### case-122

- **结论**：`app/checkoutservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/checkoutservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 132,140
- **raw 日志**：[results/1021_0142_tsm-v1-b78/raw/1021_0143_boutique-scheduling-122](../results/1021_0142_tsm-v1-b78/raw/1021_0143_boutique-scheduling-122/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend reports 184 identical errors 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.191.242:5050: connect: connection refused' on POST /cart/checkout, i.e. the checkoutservice Service port (spec port 5050 -> targetPort 5050). The only outlier in the pods listing is checkoutservice-776b564747-8rxf9: READY 0/1, STATUS Pending, Node <none>; GetResources(endpoints, checkoutservice) returns '<none>' (no ready backend), which is what the caller-side connection refused reflects (not DNS, not port mapping). The pod sheet gives the scheduling line: Warning

### case-123

- **结论**：`app/currencyservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/currencyservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 155,659
- **raw 日志**：[results/1021_0148_tsm-v1-b81/raw/1021_0148_boutique-scheduling-123](../results/1021_0148_tsm-v1-b81/raw/1021_0148_boutique-scheduling-123/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs show 171x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.88.199:7000: connect: connection refused'; CheckServiceConnectivity(currencyservice,7000) = 'Connection Failed' and endpoints/currencyservice = '<none>'. Workload: only outlier in boutique pods is currencyservice-8c5948dc9-c2v8j 0/1 Pending, Node: <none>, PodScheduled=False; pod events say 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' Mechanism/config: GetAppYAML(currencyservice) templat

### case-124

- **结论**：`app/emailservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/emailservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 154,404
- **raw 日志**：[results/1021_0154_tsm-v1-b84/raw/1021_0154_boutique-scheduling-124](../results/1021_0154_tsm-v1-b84/raw/1021_0154_boutique-scheduling-124/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice-7cbb96f5c5-w6n56 is stuck 0/1 Pending with Node: <none> while all other boutique pods are 1/1 Running; the Service emailservice exists but has empty Endpoints, so checkoutservice gets nothing when calling emailservice (partial unreachability). Pod events: Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules. GetAppYAML(emailservice) shows a REQUIRED podAntiAffinity (requiredDuringSchedulingIgnoredDuringExecution) selecting {key: service, operator: In, values: [backend]} with topologyKey kubernetes.io/hostnam

### case-125

- **结论**：`app/frontend` + `pod_anti_affinity_conflict` ｜ 标签 `app/frontend` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 157,812
- **raw 日志**：[results/1021_0158_tsm-v1-b86/raw/1021_0159_boutique-scheduling-125](../results/1021_0158_tsm-v1-b86/raw/1021_0159_boutique-scheduling-125/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry service frontend is unavailable: endpoints of Service frontend are '<none>' and a TCP probe on its declared port 80 returns 'Connection Failed'. Pod listing has a single outlier: frontend-556c8b56f-n7fhk 0/1 Pending, Node: <none>. Its pod sheet records 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules'. All 4 nodes are Ready with 8 CPU allocatable and no pressure, so capacity is not the constraint; master is cordoned with taint node.kubernetes.io/unschedulable:NoSchedule. Frontend's Deployment declares required

### case-126

- **结论**：`app/paymentservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/paymentservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 194,058
- **raw 日志**：[results/1021_0203_tsm-v1-b89/raw/1021_0203_boutique-scheduling-126](../results/1021_0203_tsm-v1-b89/raw/1021_0203_boutique-scheduling-126/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: CheckServiceConnectivity(paymentservice, 50051 - the port its own Service spec declares) returned 'Connection Failed', and endpoints/paymentservice shows '<none>'; checkoutservice had no error logs. Object layer: the only outlier in the pods listing is 'paymentservice-594d87444c-pwk96 0/1 Pending' with Node '<none>'; its DescribeResource shows 'Conditions: PodScheduled False' and the mechanism event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' Config closure: GetAppYAML(paymentservice) declares a 

### case-127

- **结论**：`app/redis-cart` + `pod_anti_affinity_conflict` ｜ 标签 `app/redis-cart` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 192,842
- **raw 日志**：[results/1021_0207_tsm-v1-b91/raw/1021_0208_boutique-scheduling-127](../results/1021_0207_tsm-v1-b91/raw/1021_0208_boutique-scheduling-127/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (139/554, 25.1%) show cart storage unreachable: 'Can't access cart storage... RedisConnectionException ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379'. Pods listing has exactly one outlier: redis-cart-8454c66588-pf7bs 0/1 Pending, Node <none>; all other 14 pods are 1/1 Running. Its pod sheet carries the scheduling line: 'FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules' with PodScheduled False. Cluster configuration shows all 4 nodes Ready with o

### case-128

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3889 · steps 19 · tokens 233,109
- **raw 日志**：[results/1021_0213_tsm-v1-b94/raw/1021_0213_boutique-scheduling-128](../results/1021_0213_tsm-v1-b94/raw/1021_0213_boutique-scheduling-128/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend error logs (124 errors, ratio 0.2353) all show cart storage unreachable — "could not retrieve cart: rpc error: code = FailedPrecondition ... UnableToConnect on redis-cart:6379", raised by cartservice (RedisCartStore.GetCartAsync) => only the cart path fails (partial unreachability). Inventory outlier: redis-cart-68db7b6f97-qt7nr is 0/1 Pending (all other 10 pods 1/1 Running, 0 restarts). Pod sheet carries the scheduling line: 'Node: <none>', PodScheduled False, Warning FailedScheduling '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims.' PVC face: 

### case-129

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 184,459
- **raw 日志**：[results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-scheduling-129](../results/1021_0218_tsm-v1-b96/raw/1021_0218_boutique-scheduling-129/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart pod is 0/1 Pending with Node: <none>; pod events show 'Warning FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims.' and PodScheduled=False, with no Node-Selectors/affinity/SA issue (SA=default). The pod mounts PVC redis-cart-pvc, which is Pending with event 'FailedBinding - no persistent volumes available for this claim and no storage class is set'. PV redis-cart-pv exists and is Available (1Gi, RWO, storageClassName=""), so capacity (1Gi vs 1Gi) and storage class ("" vs "") match and the PVC has no selector; the sole mismatch is access mode: 

### case-130

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 22 · tokens 178,259
- **raw 日志**：[results/1021_0227_tsm-v1-b101/raw/1021_0228_boutique-scheduling-130](../results/1021_0227_tsm-v1-b101/raw/1021_0228_boutique-scheduling-130/)（ndjson / mcp.jsonl / meta）
- **摘要**：Outlier in the pod inventory: redis-cart-68db7b6f97-8w4pp is Pending with Node: <none> and PodScheduled False, while all other 10 boutique pods are 1/1 Running. Pod sheet carries the scheduling line: Warning FailedScheduling - '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' (so not node capacity/taint/affinity). The volume surface shows redis-cart-pvc Status Pending with Warning FailedBinding - 'no persistent volumes available for this claim and no storage class is set'. Config face (GetAppYAML redis-cart) shows the PVC requests accessModes [ReadWriteOnce, ReadOnlyM

### case-131

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 174,616
- **raw 日志**：[results/1021_0233_tsm-v1-b104/raw/1021_0233_boutique-scheduling-131](../results/1021_0233_tsm-v1-b104/raw/1021_0233_boutique-scheduling-131/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend (entry) error logs show 96+ cart-storage failures with 'UnableToConnect on redis-cart:6379' from cartservice; dependency graph is frontend -> cartservice -> redis-cart, so the break is at the redis-cart leaf database. Workload scan found the single outlier pod redis-cart-68db7b6f97-h6h7k 0/1 Pending with Node <none> (all other 10 pods 1/1 Running, 0 restarts). Pod sheet gives the mechanism: 'Warning FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' with ClaimName redis-cart-pvc. The PVC redis-cart-pvc is Pending with event 'no

### case-132

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 248,698
- **raw 日志**：[results/1021_0237_tsm-v1-b106/raw/1021_0238_boutique-scheduling-132](../results/1021_0237_tsm-v1-b106/raw/1021_0238_boutique-scheduling-132/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (117/511) fail only on cart paths: "could not retrieve cart ... RedisConnectionException: UnableToConnect on redis-cart:6379" (67x), checkout cart failure (18x), add-to-cart (12x). redis-cart Service declares 6379/TCP but endpoints redis-cart = <none>; pod redis-cart-68db7b6f97-4ql95 is 0/1 Pending with Node: <none>, PodScheduled False, event "FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims". PVC redis-cart-pvc is Pending with event "FailedBinding: no persistent volumes available for this claim and no storage class is set", whi

### case-133

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4211 · steps 20 · tokens 221,439
- **raw 日志**：[results/1021_0243_tsm-v1-b109/raw/1021_0243_boutique-scheduling-133](../results/1021_0243_tsm-v1-b109/raw/1021_0243_boutique-scheduling-133/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod redis-cart-68db7b6f97-gcxs9 is the only outlier: 0/1 Pending, Node <none>, while all other 10 boutique pods are 1/1 Running with RESTARTS 0. Its own sheet carries the scheduling line: 'Warning FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims. preemption: ... 4 Preemption is not helpful for scheduling.' The bound claim redis-cart-pvc is Pending with 'Normal FailedBinding no persistent volumes available for this claim and no storage class is set', yet a PV redis-cart-pv exists and is Available with no claimRef (1Gi, RWO, storageClassName "", hostPath

### case-134

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2632 · steps 20 · tokens 219,055
- **raw 日志**：[results/1021_0247_tsm-v1-b111/raw/1021_0247_boutique-scheduling-134](../results/1021_0247_tsm-v1-b111/raw/1021_0247_boutique-scheduling-134/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (72/122) show cartservice failing with RedisConnectionException 'UnableToConnect on redis-cart:6379' (5000ms, clientName cartservice-7c5f46fc47-xrbgq). Pod listing: cartservice pod is 1/1 Running on worker-02 (healthy reporter), while redis-cart-68db7b6f97-hfwt6 is 0/1 Pending with Node: <none>; Service redis-cart declares 6379/TCP and its Endpoints are <none>. Pod sheet: Warning FailedScheduling '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. Nodes are all Ready with no pressure/taints and ample CPU/memory, so not a capacity/affinity issue. PVC

### case-135

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 177,735
- **raw 日志**：[results/1021_0251_tsm-v1-b113/raw/1021_0252_boutique-scheduling-135](../results/1021_0251_tsm-v1-b113/raw/1021_0252_boutique-scheduling-135/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry symptom: frontend error logs (120/517) are dominated by cart-path failures - 'could not retrieve cart' / 'failed to add to cart' / 'failed to complete the order' with 'FailedPrecondition desc = Can't access cart storage. StackExchange.Redis.RedisConnectionException ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379' (RedisCartStore.cs:line 90/40), i.e. exclusive unreachability of redis-cart. Workload: pods -l app=redis-cart shows 'redis-cart-68db7b6f97-kksc7  0/1  Pending  0  107s  Node: <none>'; the Service 'redis-cart' exists with

### case-136

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 165,542
- **raw 日志**：[results/1021_0255_tsm-v1-b115/raw/1021_0256_boutique-scheduling-136](../results/1021_0255_tsm-v1-b115/raw/1021_0256_boutique-scheduling-136/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows a single outlier: redis-cart-68db7b6f97-2jwj6 is 0/1 Pending while all 10 peers are 1/1 Running. The redis-cart Service declares port 6379/TCP but its endpoints are <none>, so cartservice cannot reach it (partial service unreachability). Pod detail shows PodScheduled False, Node: <none>, with event "FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims". The PVC redis-cart-pvc is Pending with empty Volume and event "ProvisioningFailed ... storageclass.storage.k8s.io \"fast-ssd\" not found". Config confirms the PVC spec requests storag

### case-137

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 214,105
- **raw 日志**：[results/1021_0258_tsm-v1-b117/raw/1021_0300_boutique-scheduling-137](../results/1021_0258_tsm-v1-b117/raw/1021_0300_boutique-scheduling-137/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: frontend error logs (119/525) converge on one chain frontend -> cartservice -> redis-cart: 79x "could not retrieve cart: rpc error: code = FailedPrecondition desc = Can't access cart storage ... It was not possible to connect to the redis server(s). ConnectTimeout, serverEndpoint: redis-cart:6379", plus add-to-cart and checkout cart failures; other branches (catalog/recommendation/currency) stay healthy = partial unreachability. CheckServiceConnectivity(redis-cart, 6379) = "Connection failed" and endpoints/redis-cart = <none> (Service selector app=redis-cart and port 6379->6379 ar

### case-138

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 166,160
- **raw 日志**：[results/1021_0302_tsm-v1-b119/raw/1021_0303_boutique-scheduling-138](../results/1021_0302_tsm-v1-b119/raw/1021_0303_boutique-scheduling-138/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs converge on cartservice: 'It was not possible to connect to the redis server(s). ConnectTimeout ... serverEndpoint: redis-cart:6379'. Pod scan shows the sole outlier redis-cart-68db7b6f97-nwrk2 0/1 Pending with Node: <none>, all other 10 pods 1/1 Running (matching 'Partial'). Pod detail carries the mechanism: Warning FailedScheduling '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims.' The referenced claim redis-cart-pvc is Pending with storageClassName "" and event 'FailedBinding ... no persistent volumes available for this claim and no storage clas

### case-139

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 173,812
- **raw 日志**：[results/1021_0306_tsm-v1-b121/raw/1021_0307_boutique-scheduling-139](../results/1021_0306_tsm-v1-b121/raw/1021_0307_boutique-scheduling-139/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) 120 errors/22.6%: 'Can't access cart storage ... UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379', failing only cart/checkout paths = partial unreachability; GetServiceDependencies(frontend) confirms frontend -> cartservice -> redis-cart. GetResources(endpoints, redis-cart) returns '<none>'. Pod listing single outlier: redis-cart-68db7b6f97-v52rv 0/1 Pending with Node '<none>'; pod detail carries the scheduling line 'Warning FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. Node side excluded: GetClus

### case-140

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 202,299
- **raw 日志**：[results/1021_0315_tsm-v1-b125/raw/1021_0315_boutique-scheduling-140](../results/1021_0315_tsm-v1-b125/raw/1021_0315_boutique-scheduling-140/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs contain only benign GCE metadata noise ('GCE metadata "instance/attributes/cluster-name" not defined'), GetAlerts() shows no anomalies, but service endpoints 'redis-cart' = ENDPOINTS <none>, so the cartservice->redis-cart call edge is dead while all other services are healthy (partial unreachability). Pod inventory outlier: redis-cart-68db7b6f97-gr64j is 0/1 Pending with Node: <none> (all other 10 pods 1/1 Running). Pod detail: Conditions PodScheduled False; Events 'Warning FailedScheduling 32s default-scheduler: 0/4 nodes are available: pod has unbound immedi

### case-141

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 237,057
- **raw 日志**：[results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-scheduling-141](../results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-scheduling-141/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 错误日志主导模式（145 条）为 failed to get ads: rpc error code=Unavailable, dial tcp 10.68.204.227:9555 connect: connection refused（该 IP/端口为 adservice Service 自身声明的 ClusterIP:9555）。Pods 清单唯一离群行 adservice-84dbdf99d-rhfrm 0/1 Pending 且 Node=<none>，deployments 显示 adservice 0/1 AVAILABLE 0，endpoints/adservice 为 <none>，故调用方无可达后端。Pod 详情机制事件：Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}；PodScheduled False，Node-Selectors <none>，Tolerations 仅 not-ready/unreachable 默认项，排除 nodeSelector/affinity/容量不足。GetClusterConfiguration 显示

### case-142

- **结论**：`app/cartservice` + `taint_toleration_mismatch` ｜ 标签 `app/cartservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 189,765
- **raw 日志**：[results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-scheduling-142](../results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-scheduling-142/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (285/1138 errors) are dominated by cartservice unreachability: 156x "could not retrieve cart: rpc error: code = Unavailable ... dial tcp 10.68.180.199:7070: connect: connection refused" plus 94x the same failure on POST /cart. The pods listing shows exactly one outlier: cartservice-79b49f5555-pzjnb 0/1 Pending with Node <none>, while all other 10 service pods are 1/1 Running. The pod detail carries the scheduling line: PodScheduled False with event Warning FailedScheduling "0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: tru

### case-143

- **结论**：`app/currencyservice` + `taint_toleration_mismatch` ｜ 标签 `app/currencyservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 206,253
- **raw 日志**：[results/1021_0324_tsm-v1-b130/raw/1021_0324_boutique-scheduling-143](../results/1021_0324_tsm-v1-b130/raw/1021_0324_boutique-scheduling-143/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (158/172 errors) show 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.227.117:7000: connect: connection refused', which is currencyservice's ClusterIP:7000; its Service declares port 7000/TCP with selector app=currencyservice (a valid match), but GetResources(endpoints, currencyservice) returns ENDPOINTS '<none>'. The single pod currencyservice-75686c9564-x92gx is 0/1 Pending with Node: <none>, and its event reads 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}

### case-144

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1304 · steps 24 · tokens 320,320
- **raw 日志**：[results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-scheduling-144](../results/1021_0326_tsm-v1-b131/raw/1021_0326_boutique-scheduling-144/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice 是唯一离群工作负载: pod emailservice-b78fc569b-htzsw 为 0/1 Pending, Node: <none>, PodScheduled=False. Pod 详情 Events 逐字给出机制: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' 节点面 GetClusterConfiguration 显示 worker-01/02/03 均 Ready 且资源充裕(CPU 8, memory ~15.6Gi, 无 MemoryPressure/DiskPressure/PIDPressure), 但三台都带 taint 'critical=true:NoSchedule'; master 为 unschedulable:NoSchedule(已 cordon). 配置面 GetAppYAML(emailservice) 的 Deployment Pod 

### case-145

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 158,776
- **raw 日志**：[results/1021_0331_tsm-v1-b133/raw/1021_0331_boutique-scheduling-145](../results/1021_0331_tsm-v1-b133/raw/1021_0331_boutique-scheduling-145/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (171/690, 24.8%) repeatedly show 'failed to charge card: ... rpc error: code = Unavailable ... dial tcp 10.68.228.198:50051: connect: connection refused', pointing at paymentservice:50051. Pod listing shows the single outlier paymentservice-78c5996648-qdrgb as 0/1 Pending with Node: <none> while all 10 peers are 1/1 Running. Its pod detail carries the mechanism event: 'Warning FailedScheduling - default-scheduler: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}. preemption: 0/4 nodes are available: 4 Preemption is not 

### case-146

- **结论**：`app/productcatalogservice` + `taint_toleration_mismatch` ｜ 标签 `app/productcatalogservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 219,151
- **raw 日志**：[results/1021_0333_tsm-v1-b134/raw/1021_0334_boutique-scheduling-146](../results/1021_0333_tsm-v1-b134/raw/1021_0334_boutique-scheduling-146/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend's error log (184/734 errors) shows 'could not retrieve products: rpc error: code = Unavailable desc = connection error: transport: Error while dialing: dial tcp 10.68.24.13:3550: connect: connection refused', naming productcatalogservice (Service ClusterIP 10.68.24.13, declared port 3550/TCP; endpoints = <none>, i.e. no ready backend). Namespace-wide pod sweep (the only legitimate full scan) shows 10 services 1/1 Running on worker-01/02/03 while productcatalogservice-ddb46fc86-hw4ft is 0/1 Pending with Node: <none> — matching the partial-unreachability symptom. The pod's 

### case-147

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 167,823
- **raw 日志**：[results/1021_0337_tsm-v1-b136/raw/1021_0337_boutique-scheduling-147](../results/1021_0337_tsm-v1-b136/raw/1021_0337_boutique-scheduling-147/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing outlier: redis-cart-68db7b6f97-2s5j9 is 0/1 Pending with Node: <none>, while all 10 peer pods are 1/1 Running. Its scheduling line reads: Warning FailedScheduling (default-scheduler): '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}. preemption: 0/4 nodes are available'. GetClusterConfiguration confirms the cause: worker-01, worker-02 and worker-03 all carry taint 'critical=true:NoSchedule' and master is unschedulable, all nodes Ready with 8 CPU / ~15Gi allocatable and no Memory/Disk/PID pressure, so capacity is not the blocke

### case-148

- **结论**：`app/shippingservice` + `taint_toleration_mismatch` ｜ 标签 `app/shippingservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 218,074
- **raw 日志**：[results/1021_0339_tsm-v1-b137/raw/1021_0340_boutique-scheduling-148](../results/1021_0339_tsm-v1-b137/raw/1021_0340_boutique-scheduling-148/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend error logs (entry service) show the dominant failure (147/210): 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.253.87:50051: connect: connection refused'; 10.68.253.87:50051 is exactly the ClusterIP and declared port of the shippingservice Service, so the complaint names shippingservice. Pods listing: the only outlier is shippingservice-7cbfcb6d68-mzdls 0/1 Pending with Node: <none>, all other 10 pods 1/1 Running on worker-01/worker-02. Pod sheet mechanism event: 'Warning FailedScheduling 73s default-scheduler 0/4 nodes are available: 1 node(s) were un

### case-149

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 133,609
- **raw 日志**：[results/1021_0341_tsm-v1-b138/raw/1021_0342_boutique-scheduling-149](../results/1021_0341_tsm-v1-b138/raw/1021_0342_boutique-scheduling-149/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (157/159 errors, 20%): failed to get ads: rpc error: code = Unavailable desc = "transport: Error while dialing: dial tcp 10.68.87.140:9555: connect: connection refused" on the port the adservice Service itself declares (port 9555 -> targetPort 9555). Endpoints adservice = <none>. Pod inventory outlier: adservice-676bb5bd5c-gbh7w 0/1 Pending, Node: <none>, PodScheduled False, Node-Selectors: kubernetes.io/hostname=worker-01, Events: Warning FailedScheduling - "0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 nod

### case-150

- **结论**：`app/checkoutservice` + `taint_toleration_mismatch` ｜ 标签 `app/checkoutservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 131,937
- **raw 日志**：[results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-scheduling-150](../results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-scheduling-150/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice 唯一的 Pod checkoutservice-59664766bc-xvrbg 处于 Pending (0/1)，Node: <none>；pod sheet 的 Events 段给出机制事件 Warning FailedScheduling: "0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector." 节点面对应：worker-01 带 taint node-unhealthy=true:NoExecute，master 为 Ready,SchedulingDisabled (taint node.kubernetes.io/unschedulable:NoSchedule)，worker-02/03 无污点但无 hostname=worker-01 标签。GetAppYAML(checkoutservice) 显示 spec.template.spec.nodeSelector 把 Pod 钉在 kubernetes.io/hostname=worker-01，而 Pod 模板

### case-151

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 231,374
- **raw 日志**：[results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-scheduling-151](../results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-scheduling-151/)（ndjson / mcp.jsonl / meta）
- **摘要**：Victim app/emailservice is the only drained unit: pod emailservice-5dc98cf79d-sjbdt is 0/1 Pending with 'Node: <none>' and its endpoints object shows ENDPOINTS <none>, while all other 10 boutique pods are 1/1 Running. Pod sheet carries the mechanism event: 'Warning FailedScheduling 71s default-scheduler 0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector.' GetClusterConfiguration shows worker-01 is the ONLY node labeled app: target-node (the value the pod's 'Node-Selectors: app=target

### case-152

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 153,893
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0715_boutique-scheduling-152](../results/1021_0900_tsm-v1-fix/raw/1021_0715_boutique-scheduling-152/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice pod paymentservice-67f996f49d-hfg6c is Pending with Node: <none> (all 10 other boutique pods are 1/1 Running). Complaint side confirms outage: endpoints of Service paymentservice = <none> and CheckServiceConnectivity on its declared port 50051 returns Connection Failed. The pod's own Events carry the mechanism: FailedScheduling "0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector". Node mapping: worker-01 is the ONLY node labeled app=target-node (the Deployment's nodeSe

### case-153

- **结论**：`app/productcatalogservice` + `taint_toleration_mismatch` ｜ 标签 `app/productcatalogservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 137,273
- **raw 日志**：[results/1021_0353_tsm-v1-b144/raw/1021_0354_boutique-scheduling-153](../results/1021_0353_tsm-v1-b144/raw/1021_0354_boutique-scheduling-153/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (88x + 83x, ratio 0.25) show 'could not retrieve products/product: rpc error: code = Unavailable ... dial tcp 10.68.204.67:3550: connect: connection refused' - that IP/port is exactly productcatalogservice's Service ClusterIP and declared port 3550/TCP, and its endpoints are '<none>'. Pod productcatalogservice-dfd4c7b9b-5cmn8 is 0/1 Pending with Node: <none>, PodScheduled=False; its sheet carries 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/

### case-154

- **结论**：`app/recommendationservice` + `taint_toleration_mismatch` ｜ 标签 `app/recommendationservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 140,970
- **raw 日志**：[results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-scheduling-154](../results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-scheduling-154/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side (frontend error log): 90/113 errors are "failed to get product recommendations" with rpc code=Unavailable, dial tcp 10.68.162.21:8080: connect: connection refused, i.e. recommendationservice (gRPC 8080) is unreachable. Object layer: pods listing shows the only outlier recommendationservice-68858794d6-pd6vc 0/1 Pending (Node: <none>, PodScheduled False) while all 11 other boutique pods are 1/1 Running; endpoints/recommendationservice has ENDPOINTS <none>, so callers get connection refused. Mechanism event (FailedScheduling): "0/4 nodes are available: 1 node(s) had untolerated tai

### case-155

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 208,030
- **raw 日志**：[results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-scheduling-155](../results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-scheduling-155/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique: cartservice error logs (276/744 = 37.1%) show cart storage unavailable: "It was not possible to connect to the redis server(s). ConnectTimeout ... serverEndpoint: redis-cart:6379". Service redis-cart exists (ClusterIP 10.68.100.68, port 6379/TCP, selector app=redis-cart) but its endpoints are '<none>' - no serving pod. Pods listing outlier: redis-cart-6587955858-h82lp is 0/1 Pending, Node: <none>, while all other boutique pods are 1/1 Running. Pod detail: PodScheduled=False, Node-Selectors: kubernetes.io/hostname=worker-01, tolerations only the default not-ready/unreachable ones; sch

### case-156

- **结论**：`app/shippingservice` + `taint_toleration_mismatch` ｜ 标签 `app/shippingservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 180,132
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0843_boutique-scheduling-156](../results/1021_0900_tsm-v1-fix/raw/1021_0843_boutique-scheduling-156/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (complaint side) shows 163/165 errors as 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.226.143:50051: connect: connection refused'; the only outlier pod is shippingservice-6d544fbbbc-vskx4 (0/1 Pending, Node: <none>), endpoints of Service shippingservice are '<none>' and active TCP probe on the Service-declared port 50051 returned Connection Failed. Pod detail events: '0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector', with Node-

### case-157

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 132,377
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0844_boutique-scheduling-157](../results/1021_0900_tsm-v1-fix/raw/1021_0844_boutique-scheduling-157/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error log: 151/176 errors are 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.88.124:9555: connect: connection refused'. Pod inventory shows the single outlier adservice-6cbcf4f588-gdnlr 0/1 Pending while all 10 peer pods are 1/1 Running. The pod sheet gives Node: <none>, PodScheduled False, Node-Selectors: workload=gpu, and Events: Warning FailedScheduling '0/4 nodes are available: 1 node(s) had untolerated taint {workload: gpu}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. Cluster configuration: worker-01 is 

### case-158

- **结论**：`app/cartservice` + `taint_toleration_mismatch` ｜ 标签 `app/cartservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 240,223
- **raw 日志**：[results/1021_0401_tsm-v1-b148/raw/1021_0402_boutique-scheduling-158](../results/1021_0401_tsm-v1-b148/raw/1021_0402_boutique-scheduling-158/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (entry caller) show 231 failures 'rpc error: code = Unavailable ... dial tcp 10.68.97.38:7070: connect: connection refused' - 10.68.97.38:7070 is exactly cartservice's Service ClusterIP and declared port. Pod listing has a single outlier row: cartservice-8b95d4bb-r7jtd 0/1 Pending (all 10 peer pods Running 1/1). Its pod sheet: Node <none>, PodScheduled False, Node-Selectors workload=high-performance, and event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) didn't match Pod's node affinity/selector, 1 node(s) were unschedulable, 2 node(s) had untolerated taint

### case-159

- **结论**：`app/currencyservice` + `taint_toleration_mismatch` ｜ 标签 `app/currencyservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 137,689
- **raw 日志**：[results/1021_0403_tsm-v1-b149/raw/1021_0404_boutique-scheduling-159](../results/1021_0403_tsm-v1-b149/raw/1021_0404_boutique-scheduling-159/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the single outlier currencyservice-5d6cb67d5b-hc5jg 0/1 Pending with Node:<none> (deployment currencyservice 0/1 AVAILABLE); all other 10 pods 1/1 Running. Complaint side GetErrorLogs(frontend) shows 145 x 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.81.69:7000: connect: connection refused' (10.68.81.69:7000 = currencyservice ClusterIP and the port its own Service declares), because the backend never got scheduled and the Service has no ready endpoints. The Pending pod's own sheet carries the scheduling line: PodScheduled False and event '

### case-160

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 263,760
- **raw 日志**：[results/1021_0407_tsm-v1-b151/raw/1021_0407_boutique-scheduling-160](../results/1021_0407_tsm-v1-b151/raw/1021_0407_boutique-scheduling-160/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice is the victim: pod emailservice-5694b49ccc-xrtj7 is 0/1 Pending with Node: <none>, PodScheduled False, Node-Selectors: workload=compute-intensive, and its tolerations cover only not-ready/unreachable NoExecute 300s. Events record 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) had untolerated taint {compute: high-performance}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. GetClusterConfiguration shows worker-01 is the ONLY node labeled workload=compute-intensive and it carries taint compute=high-performance:NoSchedule; worker-02/

### case-161

- **结论**：`app/frontend` + `taint_toleration_mismatch` ｜ 标签 `app/frontend` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 205,068
- **raw 日志**：[results/1021_0407_tsm-v1-b151/raw/1021_0408_boutique-scheduling-161](../results/1021_0407_tsm-v1-b151/raw/1021_0408_boutique-scheduling-161/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the only unhealthy workload: pods listing shows 'frontend-8585db7589-dbt2h 0/1 Pending ... Node: <none>' while all 10 peer pods are 1/1 Running; its Service has no backing pod (GetResources(endpoints, frontend) => ENDPOINTS '<none>', CheckServiceConnectivity(frontend:80) => 'Connection Failed'), explaining partial service unreachability. Pod sheet FailedScheduling (default-scheduler): '0/4 nodes are available: 1 node(s) didn't match Pod's node affinity/selector, 1 node(s) were unschedulable, 2 node(s) had untolerated taint {workload: high-performance}. Preemption is not helpful for

### case-162

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 132,439
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0705_boutique-scheduling-162](../results/1021_0900_tsm-v1-fix/raw/1021_0705_boutique-scheduling-162/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (167/169 errors) shows checkout failing at the payment step: 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.108.102:50051: connect: connection refused'. Pods listing shows the single outlier paymentservice-84c59c8dff-rbvz9 0/1 Pending while all other boutique services are 1/1 Running. Its own sheet carries Node: <none>, PodScheduled False and Warning FailedScheduling: '0/4 nodes are available: 1 node(s) had untolerated taint {environment: production}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. Cluster config 

### case-163

- **结论**：`app/recommendationservice` + `taint_toleration_mismatch` ｜ 标签 `app/recommendationservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 202,380
- **raw 日志**：[results/1021_0411_tsm-v1-b153/raw/1021_0411_boutique-scheduling-163](../results/1021_0411_tsm-v1-b153/raw/1021_0411_boutique-scheduling-163/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (99 errors) is dominated by 83x 'failed to get product recommendations: rpc error: code = Unavailable ... dial tcp 10.68.109.192:8080: connect: connection refused', which is exactly the recommendationservice ClusterIP:8080. Pod listing shows the single outlier recommendationservice-698cd8974f-6m4k9 as 0/1 Pending with Node: <none> (all other 10 boutique pods are 1/1 Running), and endpoints for the recommendationservice Service are '<none>' - no serving pod bound, hence the refused dial. The pod sheet carries the scheduling line: Warning FailedScheduling '0/4 nodes are availa

### case-164

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 179,590
- **raw 日志**：[results/1021_0413_tsm-v1-b154/raw/1021_0413_boutique-scheduling-164](../results/1021_0413_tsm-v1-b154/raw/1021_0413_boutique-scheduling-164/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error logs (130/518) are dominated by the cart path: rpc FailedPrecondition 'Can't access cart storage ... UnableToConnect on redis-cart:6379' (55x) and 'failed to add to cart ... redis-cart:6379' (23x). The sole pod outlier is redis-cart-64ffd47f7f-h796g = 0/1 Pending with Node: <none>, and GetResources(endpoints, redis-cart) shows ENDPOINTS: <none>, so the Service has zero ready backends (Service itself exists with port/targetPort 6379 and selector app=redis-cart). The pod sheet carries Conditions: PodScheduled False and Warning FailedScheduling: '0/4 nodes are available: 1 node(s) 

