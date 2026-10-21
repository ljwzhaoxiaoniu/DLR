# 评测明细 · boutique/codedefect — cloudopsbench

> 本家族已跑 **98/98** 题：JRA ✅98 ❌0 ｜ 证据链全闭 94 ｜ token 中位 257,091 ｜ 生成 2026-10-21T01:11:28.996Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 201,994 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 226,713 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 291,553 | 0 | 0 | 1021_0119_tsm-v1-b67 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 0.25 | 1 | 0.2667 | 16 | 227,507 | 0 | 0 | 1021_0219_tsm-v1-b97 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 198,854 | 0 | 0 | 1021_0306_tsm-v1-b121 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 262,520 | 0 | 0 | 1021_0343_tsm-v1-b139 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 189,023 | 0 | 0 | 1021_0403_tsm-v1-b149 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 170,404 | 0 | 0 | 1021_0421_tsm-v1-b158 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 213,950 | 0 | 0 | 1021_0437_tsm-v1-b166 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 189,354 | 0 | 0 | 1020_2004_tsm-v1-b4 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 250,716 | 0 | 0 | 1020_2010_tsm-v1-b7 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 21 | 296,619 | 0 | 0 | 1020_2015_tsm-v1-b10 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 321,605 | 0 | 0 | 1020_2020_tsm-v1-b13 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 326,414 | 0 | 0 | 1020_2239_tsm-v1-b16 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1786 | 29 | 384,072 | 0 | 0 | 1020_2245_tsm-v1-b19 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2083 | 25 | 284,375 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2174 | 24 | 316,717 | 0 | 0 | 1020_2300_tsm-v1-b25 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 285,100 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 428,179 | 0 | 0 | 1020_2313_tsm-v1-b31 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 234,377 | 0 | 0 | 1020_2325_tsm-v1-b37 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 193,196 | 0 | 0 | 1020_2331_tsm-v1-b40 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 257,091 | 0 | 0 | 1020_2336_tsm-v1-b43 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 194,386 | 0 | 0 | 1020_2343_tsm-v1-b46 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 0.8 | 0.4 | 0 | 0.16 | 26 | 482,362 | 0 | 0 | 1020_2349_tsm-v1-b49 | 结果对·链未闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 281,021 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 0.2 | 1 | 0.2273 | 23 | 405,197 | 0 | 0 | 1021_0051_tsm-v1-b55 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 0.2 | 1 | 0.25 | 21 | 342,435 | 0 | 0 | 1021_0058_tsm-v1-b58 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 0.8 | 0.2 | 0 | 0.2 | 21 | 344,609 | 0 | 0 | 1021_0105_tsm-v1-b61 | 结果对·链未闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 183,946 | 0 | 0 | 1021_0111_tsm-v1-b64 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 31 | 465,428 | 0 | 0 | 1021_0125_tsm-v1-b70 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 0.8 | 0.4 | 0 | 0.1481 | 28 | 503,916 | 0 | 0 | 1021_0131_tsm-v1-b73 | 结果对·链未闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1786 | 29 | 519,886 | 0 | 0 | 1021_0138_tsm-v1-b76 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1786 | 29 | 444,927 | 0 | 0 | 1021_0142_tsm-v1-b78 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 155,377 | 0 | 0 | 1021_0148_tsm-v1-b81 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 196,586 | 0 | 0 | 1021_0154_tsm-v1-b84 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 286,563 | 0 | 0 | 1021_0200_tsm-v1-b87 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 201,285 | 0 | 0 | 1021_0203_tsm-v1-b89 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 375,436 | 0 | 0 | 1021_0209_tsm-v1-b92 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 468,922 | 0 | 0 | 1021_0213_tsm-v1-b94 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 316,164 | 0 | 0 | 1021_0223_tsm-v1-b99 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2174 | 24 | 422,866 | 0 | 0 | 1021_0229_tsm-v1-b102 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2174 | 24 | 317,428 | 0 | 0 | 1021_0233_tsm-v1-b104 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 0.6 | 1 | 0.1786 | 29 | 510,866 | 0 | 0 | 1021_0239_tsm-v1-b107 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 260,073 | 0 | 0 | 1021_0243_tsm-v1-b109 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 313,378 | 0 | 0 | 1021_0247_tsm-v1-b111 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 306,608 | 0 | 0 | 1021_0251_tsm-v1-b113 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 257,344 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2273 | 23 | 490,313 | 0 | 0 | 1021_0258_tsm-v1-b117 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1739 | 24 | 450,967 | 0 | 0 | 1021_0302_tsm-v1-b119 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 0.8 | 0.4 | 0 | 0.1379 | 30 | 1,066,380 | 0 | 0 | 1021_0310_tsm-v1-b123 | 结果对·链未闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 238,917 | 0 | 0 | 1021_0315_tsm-v1-b125 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 172,373 | 0 | 0 | 1021_0319_tsm-v1-b127 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 222,268 | 0 | 0 | 1021_0321_tsm-v1-b128 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 10 | 111,090 | 0 | 0 | 1021_0324_tsm-v1-b130 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 27 | 530,803 | 0 | 0 | 1021_0326_tsm-v1-b131 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 222,765 | 0 | 0 | 1021_0331_tsm-v1-b133 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 288,113 | 0 | 0 | 1021_0333_tsm-v1-b134 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 242,184 | 0 | 0 | 1021_0337_tsm-v1-b136 | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 290,215 | 0 | 0 | 1021_0339_tsm-v1-b137 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 174,235 | 0 | 0 | 1021_0345_tsm-v1-b140 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 215,441 | 0 | 0 | 1021_0347_tsm-v1-b141 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 286,340 | 0 | 0 | 1021_0349_tsm-v1-b142 | 全对·链闭 |
| [63](#case-63) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 219,673 | 0 | 0 | 1021_0351_tsm-v1-b143 | 全对·链闭 |
| [64](#case-64) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 190,156 | 0 | 0 | 1021_0353_tsm-v1-b144 | 全对·链闭 |
| [65](#case-65) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 209,982 | 0 | 0 | 1021_0355_tsm-v1-b145 | 全对·链闭 |
| [66](#case-66) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 307,450 | 0 | 0 | 1021_0357_tsm-v1-b146 | 全对·链闭 |
| [67](#case-67) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 186,281 | 0 | 0 | 1021_0359_tsm-v1-b147 | 全对·链闭 |
| [68](#case-68) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 227,328 | 0 | 0 | 1021_0401_tsm-v1-b148 | 全对·链闭 |
| [69](#case-69) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 200,215 | 0 | 0 | 1021_0403_tsm-v1-b149 | 全对·链闭 |
| [70](#case-70) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 266,177 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [71](#case-71) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 243,554 | 0 | 0 | 1021_0900_tsm-v1-fix | 全对·链闭 |
| [72](#case-72) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 349,424 | 0 | 0 | 1021_0409_tsm-v1-b152 | 全对·链闭 |
| [73](#case-73) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 178,802 | 0 | 0 | 1021_0409_tsm-v1-b152 | 全对·链闭 |
| [74](#case-74) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 384,388 | 0 | 0 | 1021_0411_tsm-v1-b153 | 全对·链闭 |
| [75](#case-75) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 438,823 | 0 | 0 | 1021_0413_tsm-v1-b154 | 全对·链闭 |
| [76](#case-76) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 303,895 | 0 | 0 | 1021_0416_tsm-v1-b155 | 全对·链闭 |
| [77](#case-77) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 226,363 | 0 | 0 | 1021_0416_tsm-v1-b155 | 全对·链闭 |
| [78](#case-78) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 242,748 | 0 | 0 | 1021_0417_tsm-v1-b156 | 全对·链闭 |
| [79](#case-79) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 228,206 | 0 | 0 | 1021_0419_tsm-v1-b157 | 全对·链闭 |
| [80](#case-80) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 228,787 | 0 | 0 | 1021_0421_tsm-v1-b158 | 全对·链闭 |
| [81](#case-81) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 261,879 | 0 | 0 | 1021_0424_tsm-v1-b159 | 全对·链闭 |
| [82](#case-82) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 165,741 | 0 | 0 | 1021_0425_tsm-v1-b160 | 全对·链闭 |
| [83](#case-83) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 235,857 | 0 | 0 | 1021_0427_tsm-v1-b161 | 全对·链闭 |
| [84](#case-84) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 210,649 | 0 | 0 | 1021_0427_tsm-v1-b161 | 全对·链闭 |
| [85](#case-85) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 275,004 | 0 | 0 | 1021_0429_tsm-v1-b162 | 全对·链闭 |
| [86](#case-86) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 255,580 | 0 | 0 | 1021_0431_tsm-v1-b163 | 全对·链闭 |
| [87](#case-87) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 168,677 | 0 | 0 | 1021_0433_tsm-v1-b164 | 全对·链闭 |
| [88](#case-88) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 191,770 | 0 | 0 | 1021_0433_tsm-v1-b164 | 全对·链闭 |
| [89](#case-89) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 190,737 | 0 | 0 | 1021_0435_tsm-v1-b165 | 全对·链闭 |
| [90](#case-90) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 488,625 | 0 | 0 | 1021_0439_tsm-v1-b167 | 全对·链闭 |
| [91](#case-91) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 246,655 | 0 | 0 | 1021_0439_tsm-v1-b167 | 全对·链闭 |
| [92](#case-92) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 244,523 | 0 | 0 | 1021_0441_tsm-v1-b168 | 全对·链闭 |
| [93](#case-93) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 287,689 | 0 | 0 | 1021_0443_tsm-v1-b169 | 全对·链闭 |
| [94](#case-94) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 225,853 | 0 | 0 | 1021_0445_tsm-v1-b170 | 全对·链闭 |
| [95](#case-95) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 285,521 | 0 | 0 | 1021_0445_tsm-v1-b170 | 全对·链闭 |
| [96](#case-96) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 216,591 | 0 | 0 | 1021_0447_tsm-v1-b171 | 全对·链闭 |
| [97](#case-97) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 166,050 | 0 | 0 | 1021_0449_tsm-v1-b172 | 全对·链闭 |
| [98](#case-98) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 186,138 | 0 | 0 | 1021_0449_tsm-v1-b172 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 201,994
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1020_2059_boutique-codedefect-1](../results/1021_0900_tsm-v1-fix/raw/1020_2059_boutique-codedefect-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Rank1: checkoutservice pods listing is the only outlier (checkoutservice-7c8866657f-db778 2/2 Running RESTARTS 4 (61s ago); all 10 peer pods RESTARTS 0). Signal side first: frontend GetErrorLogs shows 161x {"error":"failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream","http.req.path":"/cart/checkout"} and GetAlerts shows POST /cart/checkout HTTPError('500 Server Error') x162, while paymentservice/emailservice only show AVAILABILITY_MISSING (success_rate vanished) because checkoutservice never reaches them. Mechanism event: pod detail Last State Terminated Rea

### case-2

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 226,713
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0019_boutique-codedefect-2](../results/1021_0900_tsm-v1-fix/raw/1021_0019_boutique-codedefect-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error log reports 178x "failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream" on POST /cart/checkout. Inventory outlier: pod checkoutservice-7c8866657f-927cq READY 1/2, RESTARTS 4 (50s ago), AGE 2m31s (all peers 2/2, 0 restarts). Pod detail: container 'server' Last State Terminated Reason Error Exit Code 2, Ready False, Restart Count 4 (exit 2 = process self-exit, not 137 OOMKilled nor 143 SIGTERM). Pod event: Warning BackOff "Back-off restarting failed container server in pod checkoutservice-7c8866657f-927cq_boutique". Callee log: "pani

### case-3

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 291,553
- **raw 日志**：[results/1021_0119_tsm-v1-b67/raw/1021_0119_boutique-codedefect-3](../results/1021_0119_tsm-v1-b67/raw/1021_0119_boutique-codedefect-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) logs 167x 'failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream' on POST /cart/checkout, localizing the fault to checkoutservice. Pod listing shows the sole outlier checkoutservice-7c8866657f-hpwj6 with READY 1/2, RESTARTS 4 (50s ago); its pod sheet shows container server Last State Terminated Reason Error Exit Code 2 (a Go panic, not 137 OOMKilled nor 143 probe-kill), Ready False, and kubelet event 'Warning BackOff Back-off restarting failed container server in pod checkoutservice-7c8866657f-hpwj6'. checkoutservice logs carry 'panic: m

### case-4

- **结论**：`app/checkoutservice` + `code_wrong_argument_order` ｜ 标签 `app/checkoutservice` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.25 · ECR 1 · EE 0.2667 · steps 16 · tokens 227,507
- **raw 日志**：[results/1021_0219_tsm-v1-b97/raw/1021_0219_boutique-codedefect-4](../results/1021_0219_tsm-v1-b97/raw/1021_0219_boutique-codedefect-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log: 185x 'failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream' on POST /cart/checkout, failing edge frontend->checkoutservice. checkoutservice error log: 'panic: mismatching currency codes'. Only outlier pod row: checkoutservice-7c8866657f-68dwf 1/2 Error RESTARTS 4; container server State Terminated Reason Error Exit Code 2, Restart Count 4; pod event 'Warning BackOff Back-off restarting failed container server'. Endpoints of Service checkoutservice are empty (no ready address) explaining 'no healthy upstream'. Defect line in checkoutservice 

### case-5

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 198,854
- **raw 日志**：[results/1021_0306_tsm-v1-b121/raw/1021_0306_boutique-codedefect-5](../results/1021_0306_tsm-v1-b121/raw/1021_0306_boutique-codedefect-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface flagged only checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.396s throttled, RESOURCE_SATURATION [cpu] 0.00 -> 0.07 cores (+4631%), LATENCY_DEGRADATION p50 18.62ms -> 750.00ms (+3928.6%). Following the L3 exact walk (code surface first, since this wording can hide a code defect under a resource-shaped alert): GetSourceCode(checkoutservice, main.go) shows a pure spin loop at the top of PlaceOrder -- start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } } -- a CPU-intensive busy wait with no sleep, IO or use of any return value, executed on every ord

### case-6

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 262,520
- **raw 日志**：[results/1021_0343_tsm-v1-b139/raw/1021_0343_boutique-codedefect-6](../results/1021_0343_tsm-v1-b139/raw/1021_0343_boutique-codedefect-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.332s throttled; [cpu] 0.00 -> 0.06 cores (+5117.2%); LATENCY_DEGRADATION p50 18.75ms -> 752.94ms (+3915.3%), peak 757.76ms. Code surface (checkoutservice main.go, PlaceOrder handler) contains a defect line - a non-blocking busy-wait spin loop: 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } }' executed before any downstream call, so every PlaceOrder request burns CPU for a fixed 500ms without yielding (matching the ~734ms p50 delta and the CPU burn + CFS throttling). Object layer rules out the resou

### case-7

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 189,023
- **raw 日志**：[results/1021_0403_tsm-v1-b149/raw/1021_0404_boutique-codedefect-7](../results/1021_0403_tsm-v1-b149/raw/1021_0404_boutique-codedefect-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert named checkoutservice: cpu_cfs throttled 0.408s, cpu 0.00->0.07 cores (+5260.9%), p50 latency 24.08ms->752.02ms (+3023.1%), while GetErrorLogs(checkoutservice) returned no error logs (slow+hot, not failing). Code surface (ListCodeFiles->GetSourceCode main.go) shows an injected busy-wait in PlaceOrder: 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } }' - a no-sleep spin loop that burns CPU for 500ms on every PlaceOrder, matching the ~500ms latency step and the CFS throttling against limits.cpu=200m. Object layer rules out resource/scheduling/probe fau

### case-8

- **结论**：`app/checkoutservice` + `code_busy_loop` ｜ 标签 `app/checkoutservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 170,404
- **raw 日志**：[results/1021_0421_tsm-v1-b158/raw/1021_0421_boutique-codedefect-8](../results/1021_0421_tsm-v1-b158/raw/1021_0421_boutique-codedefect-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts() flagged only checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.380s throttled, cpu Normal=0.00 -> Current=0.07 cores (+4730.0%), LATENCY_DEGRADATION p50 19.50ms -> 750.00ms. Per the L3 'Service Performance Degradation.' section (exact match), the code surface was cleared first: ListCodeFiles(checkoutservice) -> main.go, whose PlaceOrder handler contains an unbounded CPU busy-wait spin loop ('start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } }') executed before any real order work — a hot loop doing work the request does not need, burning a full cor

### case-9

- **结论**：`app/checkoutservice` + `code_artificial_delay` ｜ 标签 `app/checkoutservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 213,950
- **raw 日志**：[results/1021_0437_tsm-v1-b166/raw/1021_0437_boutique-codedefect-9](../results/1021_0437_tsm-v1-b166/raw/1021_0437_boutique-codedefect-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface names the symptom, not the mechanism: GetAlerts returns Service/checkoutservice LATENCY_DEGRADATION [Slow Response], p50 19.07ms -> 3750.00ms (+19564.4%), p90 48.57ms -> 4750.00ms. Following the code-first L3 discipline for this wording, the code surface of the flagged service holds the breakpoint: checkoutservice/main.go getUserCart() calls cartservice GetCart successfully and then unconditionally executes 'time.Sleep(time.Millisecond * time.Duration(3000))' before returning the already-fetched items. This function sits on the critical path of every order: PlaceOrder -> prepareO

### case-10

- **结论**：`app/checkoutservice` + `code_artificial_delay` ｜ 标签 `app/checkoutservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 189,354
- **raw 日志**：[results/1020_2004_tsm-v1-b4/raw/1020_2004_boutique-codedefect-10](../results/1020_2004_tsm-v1-b4/raw/1020_2004_boutique-codedefect-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts flags only checkoutservice with LATENCY_DEGRADATION (p50 18.66ms -> 3750.00ms, +19995.4%; p90 64.03ms -> 4750.00ms). Per the exact-match L3 walkthrough for 'Service Performance Degradation.' the code surface was cleared first: checkoutservice main.go contains a hardcoded blocking statement 'time.Sleep(time.Millisecond * time.Duration(3000))' at the very start of the PlaceOrder handler, i.e. every order request is delayed ~3s before any downstream call, matching the observed ~3.7s p50 shift. All other surfaces read normal: pods app=checkoutservice is 2/2 Running with RESTARTS 0 (and a

### case-11

- **结论**：`app/checkoutservice` + `code_memory_leak` ｜ 标签 `app/checkoutservice` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 250,716
- **raw 日志**：[results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-codedefect-11](../results/1020_2010_tsm-v1-b7/raw/1020_2010_boutique-codedefect-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows the single outlier checkoutservice-548bb9d487-pqdm2 at 1/2 Ready, STATUS CrashLoopBackOff, RESTARTS 3, while all 10 peer pods are 2/2 Running with 0 restarts. Complaint side (frontend error logs, 165 occurrences of POST /cart/checkout) reports 'failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream'. Pod detail records container 'server' Last State: Terminated, Reason: OOMKilled, Exit Code: 137, restart count 3, with limits cpu 200m / memory 128Mi; the container started at 16:15:55, logged 'starting to listen on tcp: [::]:5050', proce

### case-12

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 21 · tokens 296,619
- **raw 日志**：[results/1020_2015_tsm-v1-b10/raw/1020_2015_boutique-codedefect-12](../results/1020_2015_tsm-v1-b10/raw/1020_2015_boutique-codedefect-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, so the fault is not workload-level. Frontend error log (199/6079) shows POST /cart/checkout returning 500 with 'failed to charge card: could not charge the card: rpc error: code = Unknown desc = Cannot read properties of null (reading credit_card_number)'; paymentservice logs the identical TypeError 199 times (ratio 8.92%) while checkoutservice error logs are clean (malformed-request trail sits in the callee). Defect line found in checkoutservice main.go chargeCard(): 'paymentInfo = nil' is executed before building pb.ChargeRequest{CreditCa

### case-13

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 321,605
- **raw 日志**：[results/1020_2020_tsm-v1-b13/raw/1020_2020_boutique-codedefect-13](../results/1020_2020_tsm-v1-b13/raw/1020_2020_boutique-codedefect-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods Running with 0 restarts (no scheduling/restart/image path fault). Alert shows success_rate vanished for paymentservice and emailservice, which sit downstream of the checkout flow. frontend entry log carries 171x 'failed to prepare order: failed to convert price of "1YMWWN1N4O" to CAD' on POST /cart/checkout (HTTP 500). The downstream callee currencyservice logs 171x 'conversion request failed: TypeError: Cannot read properties of null (reading units)', proving the Convert request arrived with its From field empty (its server.js convert() dereferences request.from). The defect line is 

### case-14

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 326,414
- **raw 日志**：[results/1020_2239_tsm-v1-b16/raw/1020_2239_boutique-codedefect-14](../results/1020_2239_tsm-v1-b16/raw/1020_2239_boutique-codedefect-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log: 177x "failed to complete the order: rpc error: code = Unavailable desc = no healthy upstream" on POST /cart/checkout; alert entry_service=frontend business_action='Checkout order'. Endpoints: 'checkoutservice <none>' (no ready address). Outlier pod checkoutservice-7558b7bbfc-pqrck is 1/2 CrashLoopBackOff, RESTARTS 2, server container Last State Terminated reason=Error exit code=2 (not 137/OOMKilled); event 'Warning BackOff Back-off restarting failed container server'. Error log: 'panic: mismatching currency codes' with stack money.Must /src/money/money.go:85 -> main.(*check

### case-15

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1786 · steps 29 · tokens 384,072
- **raw 日志**：[results/1020_2245_tsm-v1-b19/raw/1020_2245_boutique-codedefect-15](../results/1020_2245_tsm-v1-b19/raw/1020_2245_boutique-codedefect-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names frontend POST /cart/checkout -> HTTPError('500 Server Error: Internal Server Error'). All 11 boutique pods Running 2/2 with RESTARTS 0, every Service has bound endpoints and CheckServiceConnectivity to cartservice:7070 returns 'Connection Succeeded', so scheduling/image/probe/addressing faults are excluded. Frontend and checkoutservice error logs are clean; the one outlier signal is cartservice: total_errors 185 / 1856 (ratio 0.0997) with the single pattern 'GetCartAsync called with userId=' — the userId arrived empty. The mechanism is bound to a line in checkoutservice/main.go get

### case-16

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2083 · steps 25 · tokens 284,375
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0029_boutique-codedefect-16](../results/1021_0900_tsm-v1-fix/raw/1021_0029_boutique-codedefect-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal side: GetAlerts reports POST /cart/checkout 500 (entry_service=frontend, action='Checkout order'); frontend error log shows 'failed to complete the order: rpc error: code = Unavailable desc = upstream connect error ... Connection refused' - a transport echo. All boutique pods are 2/2 Running with RESTARTS 0; GetResources(services, checkoutservice) declares port 5050 and CheckServiceConnectivity(checkoutservice:5050) returns 'Connection Succeeded'; checkoutservice Deployment has replicas 1, matching gRPC probes on 5050 and correct CART_SERVICE_ADDR=cartservice:7070, so config/addressing/

### case-17

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2174 · steps 24 · tokens 316,717
- **raw 日志**：[results/1020_2300_tsm-v1-b25/raw/1020_2300_boutique-codedefect-17](../results/1020_2300_tsm-v1-b25/raw/1020_2300_boutique-codedefect-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique pods were 2/2 Running with 0 restarts and RESTARTS/READY had no outlier, so scheduling/startup/probe/image branches were excluded and the 'Pod up, service misbehaves' branch applied. GetAlerts pointed at checkoutservice (TRAFFIC_ANOMALY Network Surge, inbound 11.94pps -> 40.72pps, +240.9%) plus frontend POST /cart/checkout returning 500. frontend's error log was clean, and GetErrorLogs on checkoutservice/payment/shipping/currency/productcatalog/email was clean; CheckServiceConnectivity(checkoutservice:5050) returned 'Connection Succeeded' and the Service maps port 5050 -> targetPo

### case-18

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 285,100
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0035_boutique-codedefect-18](../results/1021_0900_tsm-v1-fix/raw/1021_0035_boutique-codedefect-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend/GetErrorLogs clean and all 11 boutique pods 2/2 Running with 0 RESTARTS, so no scheduling/startup/probe outlier. GetAlerts flags Service checkoutservice TRAFFIC_ANOMALY Network Surge (Inbound 11.60pps -> 39.92pps, +244%) at 16:58:09~17:00:44. checkoutservice pod 7fc85cc97b-jtnv8 is Running/Ready, Restart Count 0, all-Normal events, image wangyl2128/checkoutservice-v2:latest. Its own error log is clean; one hop down, cartservice GetErrorLogs reports 178 errors with the single pattern "GetCartAsync called with userId=" (empty id echoed), while GetRecentLogs shows other callers passing v

### case-19

- **结论**：`app/checkoutservice` + `code_missing_parameter` ｜ 标签 `app/checkoutservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 428,179
- **raw 日志**：[results/1020_2313_tsm-v1-b31/raw/1020_2313_boutique-codedefect-19](../results/1020_2313_tsm-v1-b31/raw/1020_2313_boutique-codedefect-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs show 'failed to get shipping quote: rpc error: code = Unavailable desc = no healthy upstream' (351x) and checkout failures via the same edge. Pod listing has one outlier: shippingservice-799cbfbc76-bl72b 1/2 Error 4 restarts; pod detail shows container 'server' Waiting: CrashLoopBackOff with Last State Terminated reason=Error exit code=2 (not 137/143, so not OOM nor SIGTERM), and events include 'Warning BackOff Back-off restarting failed container server in pod shippingservice-799cbfbc76-bl72b'. Logs: '[GetQuote] completed request' then '[ShipOrder] received r

### case-20

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 234,377
- **raw 日志**：[results/1020_2325_tsm-v1-b37/raw/1020_2325_boutique-codedefect-20](../results/1020_2325_tsm-v1-b37/raw/1020_2325_boutique-codedefect-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name checkoutservice only: 'RESOURCE_SATURATION [cpu_cfs] | Val=1.027s throttled', 'cpu Normal=0.00 cores -> Current=0.12 cores (+7265.9%)', 'LATENCY_DEGRADATION p50 18.39ms -> 4478.97ms (+24254.2%) / p90 29.98ms -> 9224.49ms'. Code surface of checkoutservice (main.go, PlaceOrder handler) contains an unneeded run-away loop executed on every order: 'for i := 0; i < 10; i++ { f, _ := os.Open("/src/log.csv"); r := csv.NewReader(f); r.ReadAll(); f.Close() }' — ten full re-reads of a log CSV per request with the open error ignored, burning CPU inside the handler and throttling the pod under 

### case-21

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 193,196
- **raw 日志**：[results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-codedefect-21](../results/1020_2331_tsm-v1-b40/raw/1020_2331_boutique-codedefect-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' entered from telemetry: GetAlerts flagged only checkoutservice with cpu_cfs throttling 1.076s, cpu 0.00 -> 0.12 cores (+8864.8%) and p90 latency 104.61ms -> 9062.53ms (peak 22090.91ms); no errors anywhere (GetErrorLogs(checkoutservice) = 'No error logs found'), so the fault renders as pure slowness + CPU burn. Following the L3 section (code surface first), the code surface closed it: checkoutservice main.go PlaceOrder() contains an injected loop 'for i := 0; i < 10; i++ { f, _ := os.Open("/src/log.csv"); r := csv.NewReader(f); r.ReadAll(); f.Close() }

### case-22

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 257,091
- **raw 日志**：[results/1020_2336_tsm-v1-b43/raw/1020_2336_boutique-codedefect-22](../results/1020_2336_tsm-v1-b43/raw/1020_2336_boutique-codedefect-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name checkoutservice: RESOURCE_SATURATION [cpu_cfs] 0.987s throttled, cpu 0.00 -> 0.11 cores (+6759.7%), LATENCY_DEGRADATION p50 19.05ms -> 4364.85ms, p90 45.06ms -> 9024.84ms; node worker-01 CPU only 4.50% -> 6.77% so the node face is clean. L3 section for this exact symptom orders the code surface first, and it is not clean: checkoutservice main.go PlaceOrder contains an injected loop 'for i := 0; i < 10; i++ { f, _ := os.Open("/src/log.csv"); r := csv.NewReader(f); r.ReadAll(); f.Close() }' that re-opens and fully re-parses a CSV file 10 times on every order request, i.e. work the re

### case-23

- **结论**：`app/checkoutservice` + `code_excessive_file_reads` ｜ 标签 `app/checkoutservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 194,386
- **raw 日志**：[results/1020_2343_tsm-v1-b46/raw/1020_2343_boutique-codedefect-23](../results/1020_2343_tsm-v1-b46/raw/1020_2343_boutique-codedefect-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' (boutique). GetAlerts: checkoutservice ABNORMAL with RESOURCE_SATURATION [cpu_cfs] Val=1.094s throttled and RESOURCE_SATURATION [cpu] Normal=0.00 -> Current=0.12 cores, plus LATENCY_DEGRADATION p50latency 18.67ms -> 4334.76ms (+23114.0%) Peak=7149.12ms, p90latency 47.33ms -> 9127.39ms; frontend (its caller) degraded p90latency 49.32ms -> 1268.67ms (+2472.2%). Following the L3 order (code surface first) ListCodeFiles(checkoutservice) -> GetSourceCode(main.go) exposes the defect line inside PlaceOrder: a block 'for i := 0; i < 10; i++ { f, _ := os.Open(

### case-24

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.4 · ECR 0 · EE 0.16 · steps 26 · tokens 482,362
- **raw 日志**：[results/1020_2349_tsm-v1-b49/raw/1020_2349_boutique-codedefect-24](../results/1020_2349_tsm-v1-b49/raw/1020_2349_boutique-codedefect-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS=0 and no scheduling/probe/mount Warning events, so availability is not broken by crash or placement. The complaint side shows frontend returning 500 on /cart/checkout (197 errors, single pattern): 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: connect error.'. The apparent connectivity failure is contradicted by the target: paymentservice Service declares port 50051 -> targetPort 50051 with selector app=paymentservice, endpoints bound at 172.20.2.62:50051, CheckServiceConnectivity on 50051 reports open/

### case-25

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 281,021
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0034_boutique-codedefect-25](../results/1021_0900_tsm-v1-fix/raw/1021_0034_boutique-codedefect-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts and every Service object exists (emailservice 10.68.206.22:5000 present), so scheduling/image/probe/quota branches are excluded. Frontend error logs (complaint side) show 176 hits of POST /cart/checkout -> 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error.'; checkoutservice and paymentservice error logs are empty, and paymentservice recent logs show the charges actually succeeding ('PaymentService#Charge invoked' followed by 'Transaction processed: visa ending 4700 Amount: CAD114.279628

### case-26

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.2 · ECR 1 · EE 0.2273 · steps 23 · tokens 405,197
- **raw 日志**：[results/1021_0051_tsm-v1-b55/raw/1021_0051_boutique-codedefect-26](../results/1021_0051_tsm-v1-b55/raw/1021_0051_boutique-codedefect-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend shows 193x HTTP 500 on POST /cart/checkout with 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error.' All 11 boutique pods are 2/2 Running with 0 restarts (no pending/image-pull/probe/capacity mechanism). Callee logs: checkoutservice, paymentservice and emailservice all report no error logs; paymentservice recent logs show every 'PaymentService#Charge invoked with request' followed by 'Transaction processed: visa ending ... Amount: ...', i.e. the charge actually succeeds with a complete payload. The defect is in checko

### case-27

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.2 · ECR 1 · EE 0.25 · steps 21 · tokens 342,435
- **raw 日志**：[results/1021_0058_tsm-v1-b58/raw/1021_0058_boutique-codedefect-27](../results/1021_0058_tsm-v1-b58/raw/1021_0058_boutique-codedefect-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, so this is not a scheduling/startup/probe fault. The entry caller frontend logs 164 errors of one pattern: 'failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error.' on POST /cart/checkout (alert: 165 occurrences of 500). checkoutservice and paymentservice both return empty GetErrorLogs, and paymentservice's recent logs show every charge in the incident window actually succeeding ('Transaction processed: visa ending 1982 Amount: CAD1169.77923042'), so the callee fulfilled its contract. The br

### case-28

- **结论**：`app/checkoutservice` + `code_wrong_return` ｜ 标签 `app/checkoutservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.2 · ECR 0 · EE 0.2 · steps 21 · tokens 344,609
- **raw 日志**：[results/1021_0105_tsm-v1-b61/raw/1021_0105_boutique-codedefect-28](../results/1021_0105_tsm-v1-b61/raw/1021_0105_boutique-codedefect-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 restarts, so no scheduling/startup/probe/image breakpoint. The complaint side (frontend error logs) shows 182 of 185 errors are one identical pattern on POST /cart/checkout: "failed to complete the order: rpc error: code = Internal desc = failed to charge card: charge card error." (plus an alert of 184 x HTTP 500 on the same URL). Following the failing edge to the callee: checkoutservice AND paymentservice have zero error logs, and paymentservice recent logs show every "PaymentService#Charge invoked" immediately followed by "Transaction processed: vi

### case-29

- **结论**：`app/checkoutservice` + `code_excessive_file_writes` ｜ 标签 `app/checkoutservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 183,946
- **raw 日志**：[results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-codedefect-29](../results/1021_0111_tsm-v1-b64/raw/1021_0111_boutique-codedefect-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on checkoutservice: RESOURCE_SATURATION [cpu] Normal=0.00 -> Current=0.01 cores (+720.3%) plus FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=13305.23B/s (New Spike), Peak=55334.06B/s. The code surface (L1 checkoutservice.code, ListCodeFiles -> main.go) contains the defect line inside the PlaceOrder handler: os.Create("/tmp/tmp.csv") followed by a `for i := 0; i < 60000; i++ { w.Write([]string{"Timestamp,Node,Pod,Container,Log"}) }` loop, w.Flush(), f.Close(), os.Remove() — 60,000 CSV rows written synchronously on every checkout request before any real order work. This

### case-30

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 31 · tokens 465,428
- **raw 日志**：[results/1021_0125_tsm-v1-b70/raw/1021_0125_boutique-codedefect-30](../results/1021_0125_tsm-v1-b70/raw/1021_0125_boutique-codedefect-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend alerts 20x '503 Server Error: Service Unavailable' on /product/{id}, 7x /cart, 2x POST /cart; frontend error log shows 'could not retrieve product: rpc error: code = Canceled desc = context canceled' answered with http.resp.status=500. All 11 boutique pods are 2/2 Running with RESTARTS 0, and every Service answers an active probe on the port its own spec declares (adservice 9555, productcatalogservice 3550, cartservice 7070, currencyservice 7000, recommendationservice 8080, frontend 80, redis-cart 6379), excluding restart/pending/selector/port/DNS/zero-replica classes; f

### case-31

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.4 · ECR 0 · EE 0.1481 · steps 28 · tokens 503,916
- **raw 日志**：[results/1021_0131_tsm-v1-b73/raw/1021_0131_boutique-codedefect-31](../results/1021_0131_tsm-v1-b73/raw/1021_0131_boutique-codedefect-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-service alerts show frontend returning 503 on GET /product/{id} (23), GET /cart (10) and POST /cart (3), window starting 10:31:27. All 11 boutique pods are 2/2 Running with RESTARTS 0; the only outlier row is the freshly replaced frontend-697587b5d-c29mc (2m26s), created by a rollout at ~10:31:31, i.e. exactly at the alert window start (events: 'Scaled up replica set frontend-697587b5d to 1' plus 'Readiness probe failed: HTTP probe failed with statuscode: 503' on the drained old pod). Addressing is exonerated: every Service declares the port the frontend env points at (cartservice 7070, 

### case-32

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1786 · steps 29 · tokens 519,886
- **raw 日志**：[results/1021_0138_tsm-v1-b76/raw/1021_0138_boutique-codedefect-32](../results/1021_0138_tsm-v1-b76/raw/1021_0138_boutique-codedefect-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 2/2 Running with RESTARTS=0 and every Service existed, with TCP probes on the declared ports (productcatalogservice:3550, currencyservice:7000, cartservice:7070, adservice:9555, recommendationservice:8080) returning 'Connection Succeeded', so scheduling, quota, image and transport causes are excluded. Alerts were all reported at the entry service frontend (GET /product/{id} 19x, GET /cart 9x, POST /cart 2x, raw_error HTTPError('503 Server Error: Service Unavailable')). frontend's own error log was empty, while cartservice error logs showed 713 errors (ratio 0.2683) wi

### case-33

- **结论**：`app/frontend` + `code_wrong_argument_order` ｜ 标签 `app/frontend` + `code_wrong_argument_order`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1786 · steps 29 · tokens 444,927
- **raw 日志**：[results/1021_0142_tsm-v1-b78/raw/1021_0143_boutique-codedefect-33](../results/1021_0142_tsm-v1-b78/raw/1021_0143_boutique-codedefect-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend-level availability disruption: alerts report GET /product/{id} (16x) and GET /cart (10x) returning 'HTTPError("503 Server Error: Service Unavailable")'. No infrastructure break: all 11 boutique pods are 2/2 Running with RESTARTS=0, every Service selector matches its pod labels and declares the port used by frontend env addresses, and live TCP probes to productcatalogservice:3550, currencyservice:7000, recommendationservice:8080 and cartservice:7070 all returned 'Connection Succeeded'. frontend, productcatalogservice, currencyservice and redis-cart error logs are empty; cartservice car

### case-34

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 155,377
- **raw 日志**：[results/1021_0148_tsm-v1-b81/raw/1021_0149_boutique-codedefect-34](../results/1021_0148_tsm-v1-b81/raw/1021_0149_boutique-codedefect-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface names frontend: RESOURCE_SATURATION [cpu] 0.01->0.13 cores (+1323.1%), RESOURCE_SATURATION [cpu_cfs] 1.170s throttled, LATENCY_DEGRADATION p50 20.39ms->2172.22ms (+10552.3%) with peak 2658.90ms, plus 503s only on GET / (Browse home page) and GET /product/{id} (View product detail). Code surface (L3 first stop) holds the defect: frontend handlers.go chooseAd() runs a pure busy-wait 'start := time.Now(); for { if time.Now().Sub(start) > 800*time.Millisecond { break } }' with no sleep, burning CPU for 800ms per call; chooseAd is invoked only by homeHandler and productHandler, exactl

### case-35

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 196,586
- **raw 日志**：[results/1021_0154_tsm-v1-b84/raw/1021_0154_boutique-codedefect-35](../results/1021_0154_tsm-v1-b84/raw/1021_0154_boutique-codedefect-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 告警为资源型外表：RESOURCE_SATURATION [cpu] Normal=0.01 cores -> Current=0.13 cores (+1506.3%)、[cpu_cfs] Val=1.204s throttled、LATENCY_DEGRADATION p50 24.73ms -> 2235.31ms (+8939.2%)，业务错误集中在 GET / 与 GET /product/{id} 的 503。但对象层 pods 全部 2/2 Running、RESTARTS=0，无 Pending/CrashLoop/ImagePull 离群行；events 中 frontend 仅 Normal 的 Pulled/Created/Started/Scaled 事件，无 FailedScheduling、无 OOMKilled、无 143 Killing。按 L3 exact 口径先清代码面，在 handlers.go 的 chooseAd 命中缺陷行：start := time.Now(); for { if time.Now().Sub(start) > 800*time.Millisecond { break } } —— 循环体内无任何工作，纯忙等空转 800ms；chooseAd 恰被 homeHandler(路由 /) 与 product

### case-36

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 286,563
- **raw 日志**：[results/1021_0200_tsm-v1-b87/raw/1021_0200_boutique-codedefect-36](../results/1021_0200_tsm-v1-b87/raw/1021_0200_boutique-codedefect-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flag only frontend: RESOURCE_SATURATION [cpu] 0.01 -> 0.14 cores (+1461.5%), RESOURCE_SATURATION [cpu_cfs] Val=1.274s throttled, LATENCY_DEGRADATION p50 21.25ms -> 2175.53ms (+10137.8%), with failing business actions GET /product/{id} and GET / (HTTP 503). Code surface (L3 order, read first) shows the mechanism: handlers.go chooseAd() runs an unbounded busy-wait spin loop 'for { if time.Now().Sub(start) > 800*time.Millisecond { break } }' that burns CPU for 800ms per render and never yields; it is invoked by homeHandler ('/') and productHandler ('/product/{id}') - exactly the two failin

### case-37

- **结论**：`app/frontend` + `code_busy_loop` ｜ 标签 `app/frontend` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 201,285
- **raw 日志**：[results/1021_0203_tsm-v1-b89/raw/1021_0204_boutique-codedefect-37](../results/1021_0203_tsm-v1-b89/raw/1021_0204_boutique-codedefect-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface names frontend: RESOURCE_SATURATION [cpu_cfs] Val=1.254s throttled, cpu 0.01 -> 0.14 cores (+1576.1%), p50 latency 22.19ms -> 2351.29ms (+10497.1%), plus entry 503s on '/' (13x) and '/product/{id}' (17x). L3 exact section ordered code-surface-first; frontend/handlers.go chooseAd() contains a bare CPU-intensive spin wait with no sleep: 'start := time.Now(); for { if time.Now().Sub(start) > 800*time.Millisecond { break } }', executed on every home and product page render. GetErrorLogs(frontend) shows 224x 'failed to get ads: rpc error: code = DeadlineExceeded' on /product/{id} (cli

### case-38

- **结论**：`app/frontend` + `code_artificial_delay` ｜ 标签 `app/frontend` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 375,436
- **raw 日志**：[results/1021_0209_tsm-v1-b92/raw/1021_0209_boutique-codedefect-38](../results/1021_0209_tsm-v1-b92/raw/1021_0209_boutique-codedefect-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section for 'Service Performance Degradation.' dictates clearing the code surface first. Alert names frontend: p90 latency Normal=147.04ms -> Current=2555.00ms (+1637.6%), peak=2981.82ms. ListCodeFiles(frontend) + GetSourceCode(handlers.go) exposes a hardcoded blocking call in setCurrencyHandler: 'time.Sleep(time.Millisecond * time.Duration(3000))' placed after the cookie is set on the POST /setCurrency path; main.go and rpc.go read clean. frontend logs close the loop: three POST /setCurrency requests report 'http.resp.took_ms':3000 / 3001 / 3000 while every other route in the same wi

### case-39

- **结论**：`app/frontend` + `code_memory_leak` ｜ 标签 `app/frontend` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 468,922
- **raw 日志**：[results/1021_0213_tsm-v1-b94/raw/1021_0214_boutique-codedefect-39](../results/1021_0213_tsm-v1-b94/raw/1021_0214_boutique-codedefect-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 全站可用性中断源于入口 frontend。告警：frontend [Success Rate Drop] 95.2% -> 36.7% (-58.5%)，各 URL 大量 503 与 ConnectionRefusedError(111)；GetErrorLogs(frontend) 为空说明不是下游拒绝而是入口进程自身死亡。pods 清单唯一离群行 frontend-7b49cb6446-6lt6c 1/2 CrashLoopBackOff RESTARTS 4，其余 10 个服务均 2/2 Running 0。pod 详情：server 容器 Last State Terminated Reason OOMKilled Exit Code 137，Started 17:39:00 -> Finished 17:39:02，Events 含 Warning BackOff 'Back-off restarting failed container server'。GetAppYAML(frontend) 显示 limits memory 128Mi（上游默认值，未被调低）。代码面 handlers.go 的 setCurrencyHandler 中 'numbers := make([]int, 1, 1)' 后循环 'for i := 0; i < 1024*

### case-40

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 316,164
- **raw 日志**：[results/1021_0223_tsm-v1-b99/raw/1021_0224_boutique-codedefect-40](../results/1021_0223_tsm-v1-b99/raw/1021_0224_boutique-codedefect-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend alerted ERROR_SPIKE Success Rate 100.0% -> 71.7% and GetErrorLogs(frontend) shows one pattern (1105x): "could not retrieve product #: rpc error: code = NotFound desc = no product with ID " — the product id echoes empty. All boutique pods are 2/2 Running with RESTARTS 0; productcatalogservice error log is clean; the frontend pod sheet shows only Normal events (Scheduled/Pulled/Created/Started) and Ready=True, ruling out scheduling, image-pull, probe and quota mechanisms. GetErrorLogs(cartservice) shows 740x "AddItemAsync called with userId=..., productId=, quantity=2", so 

### case-41

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2174 · steps 24 · tokens 422,866
- **raw 日志**：[results/1021_0229_tsm-v1-b102/raw/1021_0229_boutique-codedefect-41](../results/1021_0229_tsm-v1-b102/raw/1021_0229_boutique-codedefect-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section 'Service Availability Disruption.' -> 'Pod up, service misbehaves' branch. Signal side: frontend error logs show 'could not retrieve cart: rpc error: code = Canceled desc = context canceled' and 'failed to get ads: ... DeadlineExceeded' (warning); alerts report 503 Service Unavailable on GET /product/{id} (20x) and GET /cart (8x) at entry service frontend. Workload scan: all 11 boutique pods 2/2 Running with 0 restarts, so no crash/scheduling/image class applies (a rollout is not the mechanism). Callee logs: adservice and currencyservice error logs are empty (clean); cartservi

### case-42

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2174 · steps 24 · tokens 317,428
- **raw 日志**：[results/1021_0233_tsm-v1-b104/raw/1021_0234_boutique-codedefect-42](../results/1021_0233_tsm-v1-b104/raw/1021_0234_boutique-codedefect-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS 0 and every Deployment is 1/1 AVAILABLE, so scheduling/image/probe/replica faults are excluded. Alerts point at entry service frontend returning 503 on /product/{id} (16) and /cart (14); frontend's own error log is nearly clean (2 context-canceled lines = transport echo) and productcatalogservice has no error logs. Services and endpoints are healthy and self-consistent (cartservice 7070 -> 172.20.1.136:7070, productcatalogservice 3550 -> 172.20.2.234:3550), excluding selector/port/protocol/DNS causes. The real trail sits one hop down: cartserv

### case-43

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6 · ECR 1 · EE 0.1786 · steps 29 · tokens 510,866
- **raw 日志**：[results/1021_0239_tsm-v1-b107/raw/1021_0239_boutique-codedefect-43](../results/1021_0239_tsm-v1-b107/raw/1021_0239_boutique-codedefect-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-service alerts name frontend returning 503 on /product/{id} and /cart. Workload layer is healthy: all 11 pods 2/2 Running with RESTARTS 0 (incl. frontend-645f576c45-ncn64 Running/Ready), all Service endpoints bound, and connectivity probes on the Services' own declared ports succeed (cartservice:7070, currencyservice:7000, productcatalogservice:3550), ruling out selector/port/protocol/addressing and scheduling causes. Frontend's only error is a transport echo (context canceled on the currency RPC); its callees log clean, but cartservice logs 723 errors out of 2673 lines (27.05%): AddItem

### case-44

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 260,073
- **raw 日志**：[results/1021_0243_tsm-v1-b109/raw/1021_0243_boutique-codedefect-44](../results/1021_0243_tsm-v1-b109/raw/1021_0243_boutique-codedefect-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts report 503s on /product/{id} (21) and /cart (8) with entry_service=frontend, yet GetErrorLogs(frontend) is empty and all 11 boutique pods are 2/2 Running with 0 restarts (no Pending/CrashLoop/image-pull/probe-break), so scheduling, image, quota and probe branches are excluded. Service specs declare cartservice:7070 and productcatalogservice:3550, matching frontend env CART_SERVICE_ADDR=cartservice:7070 and PRODUCT_CATALOG_SERVICE_ADDR=productcatalogservice:3550, so addressing/port mapping is correct. The error-log trail is on the callee: cartservice logs 743 errors / 26.9% of 2761 lines

### case-45

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 313,378
- **raw 日志**：[results/1021_0247_tsm-v1-b111/raw/1021_0248_boutique-codedefect-45](../results/1021_0247_tsm-v1-b111/raw/1021_0248_boutique-codedefect-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 2/2 Running with 0 restarts, so scheduling/startup/image/probe mechanisms are excluded (Pod up, service misbehaves branch). Alert on entry service frontend showed success rate 95.2% -> 56.4%. frontend error logs (1053 errors) show three clusters, all on the currency edge: 'failed to convert currency: rpc error: code = Unknown desc = ... Cannot read properties of null (reading ''units'')', 'failed to get shipping quote: failed to convert currency for shipping cost: ...', and 'failed to do currency conversion for product'. GetServiceDependencies(frontend) confirms the f

### case-46

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 306,608
- **raw 日志**：[results/1021_0251_tsm-v1-b113/raw/1021_0252_boutique-codedefect-46](../results/1021_0251_tsm-v1-b113/raw/1021_0252_boutique-codedefect-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with 0 RESTARTS, so scheduling/restart/image/probe classes are excluded. GetAlerts returns 7 rows all with entry_service=frontend and raw_error "HTTPError('503 Server Error: Service Unavailable')", dominated by /cart (234+172), /product/{id}, /setCurrency, /cart/checkout. GetErrorLogs(frontend): 1197 errors of 18635 lines (0.0642), 399x "http: panic serving 127.0.0.6:58117: mismatching currency codes" plus panic({0xcc40c0?, ...}) and runtime/panic.go:860. Frontend's callees were read next: GetErrorLogs(cartservice) and GetErrorLogs(currencyservice) both ret

### case-47

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 257,344
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0712_boutique-codedefect-47](../results/1021_0900_tsm-v1-fix/raw/1021_0712_boutique-codedefect-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory clean (all 11 boutique services 2/2 Running, RESTARTS=0) rules out scheduling/capacity/image/probe/quota classes. Alerts: frontend ERROR_SPIKE Success Rate Drop 90.5%->66.7% with 526 GET /product/{id} 500s. First-level log evidence (frontend GetErrorLogs, 526/4935 = 10.66%, single pattern): "could not retrieve product: rpc error: code = NotFound desc = no product with ID " while the requested path was the valid /product/OLJCESPC7Z -> the outbound call carried an EMPTY id. The failing edge's callee productcatalogservice is clean: no error logs, catalog parsed OK, gRPC server up on

### case-48

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2273 · steps 23 · tokens 490,313
- **raw 日志**：[results/1021_0258_tsm-v1-b117/raw/1021_0259_boutique-codedefect-48](../results/1021_0258_tsm-v1-b117/raw/1021_0259_boutique-codedefect-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal first: frontend GetErrorLogs = 558 errors dominated by 'failed to get shipping quote: rpc error: code = Unavailable desc = no healthy upstream' (353x GET /cart) and 'shipping quote failure: ... no healthy upstream' (203x POST /cart/checkout); GetAlerts shows Service frontend ABNORMAL 'ERROR_SPIKE [Success Rate Drop] Normal=100.0% -> Cur=75.4%'. Pruned by anchor app=shippingservice, the outlier pod row is 'shippingservice-799cbfbc76-v9pvz 1/2 Running 4 (53s ago)' and GetResources(endpoints, shippingservice) returns an EMPTY ENDPOINTS column, which is exactly the 'no healthy upstream' cal

### case-49

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1739 · steps 24 · tokens 450,967
- **raw 日志**：[results/1021_0302_tsm-v1-b119/raw/1021_0303_boutique-codedefect-49](../results/1021_0302_tsm-v1-b119/raw/1021_0303_boutique-codedefect-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were Running 2/2 with 0 restarts, so the walk took the 'pod up, service misbehaves' branch. GetAlerts showed emailservice AVAILABILITY_MISSING (success_rate vanished) plus 190 x HTTPError('500 Server Error') on POST /cart/checkout. GetErrorLogs(frontend) gave exactly 190 identical lines: 'failed to complete the order: ... failed to charge card: could not charge the card: rpc error: code = Unknown desc = Cannot read properties of null (reading credit_card_number)'. GetErrorLogs(paymentservice) showed the matching 190 x TypeError: Cannot read properties of null (reading cred

### case-50

- **结论**：`app/frontend` + `code_missing_parameter` ｜ 标签 `app/frontend` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.4 · ECR 0 · EE 0.1379 · steps 30 · tokens 1,066,380
- **raw 日志**：[results/1021_0310_tsm-v1-b123/raw/1021_0311_boutique-codedefect-50](../results/1021_0310_tsm-v1-b123/raw/1021_0311_boutique-codedefect-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS=0, all Services/Endpoints are bound (checkoutservice 172.20.2.74:5050, cartservice 172.20.1.229:7070 etc.), all 11 ServiceAccounts exist, deployments are 1/1 AVAILABLE and TCP probes on the Service-declared ports (productcatalogservice:3550, currencyservice:7000, cartservice:7070, adservice:9555) all returned Connection Succeeded, so scheduling/addressing/reachability layers are healthy and the FailedCreate 'serviceaccount not found' events are setup history. Alerts show 503 on every frontend route including /setCurrency (a handler that calls 

### case-51

- **结论**：`app/frontend` + `code_excessive_file_reads` ｜ 标签 `app/frontend` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 238,917
- **raw 日志**：[results/1021_0315_tsm-v1-b125/raw/1021_0315_boutique-codedefect-51](../results/1021_0315_tsm-v1-b125/raw/1021_0315_boutique-codedefect-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 match=exact for 'Service Performance Degradation.' dictates code surface first, and the code surface is not clean: frontend handlers.go setCurrencyHandler contains a 10-iteration loop that re-opens and fully ReadAll()s /src/log.csv on every POST /setCurrency (os.Open error also discarded) - work the request does not need. GetAlerts names frontend with RESOURCE_SATURATION cpu_cfs Val=0.985s throttled, cpu 0.01 -> 0.12 cores (+974.4%) and LATENCY_DEGRADATION p50 19.21ms -> 537.50ms, p90 59.15ms -> 4007.26ms, plus 503s on /setCurrency (4). GetRecentLogs(frontend) confirms every /setCurrency re

### case-52

- **结论**：`app/frontend` + `code_excessive_file_reads` ｜ 标签 `app/frontend` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 172,373
- **raw 日志**：[results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-codedefect-52](../results/1021_0319_tsm-v1-b127/raw/1021_0319_boutique-codedefect-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal: GetAlerts names frontend itself, not a downstream -- RESOURCE_SATURATION [cpu_cfs] Val=0.861s throttled, [cpu] Normal=0.01 -> 0.11 cores (+1022.4%), LATENCY_DEGRADATION p50 19.95ms -> 277.55ms and p90 50.00ms -> 3504.33ms. GetErrorLogs(frontend) shows 93x 'failed to get ads: rpc error code = DeadlineExceeded desc = context deadline exceeded' plus 'context canceled' on shipping/currency/recommendation calls -- i.e. the frontend request context expires first, so downstream is victimized by the caller, not the cause. GetResources(pods) shows all 11 pods 2/2 Running with RESTARTS 0 (no sch

### case-53

- **结论**：`app/frontend` + `code_excessive_file_reads` ｜ 标签 `app/frontend` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 222,268
- **raw 日志**：[results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-codedefect-53](../results/1021_0321_tsm-v1-b128/raw/1021_0321_boutique-codedefect-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' (L3 SOP match=exact: clear the code surface first). GetAlerts names frontend as the flagged service: 'RESOURCE_SATURATION [cpu_cfs] | Val=0.947s throttled', 'RESOURCE_SATURATION [cpu] | Normal=0.01 cores -> Current=0.12 cores (+997.2%)', 'LATENCY_DEGRADATION [Slow Response] | p50latency: Normal=20.08ms -> Current=495.69ms (+2369.1%) | p90latency: Normal=48.69ms -> Current=3832.98ms (+7772.4%)', with business errors concentrated on POST /setCurrency ('HTTPError(503 Server Error: Service Unavailable)', 6 occurrences). L1 re-anchor state_model_query(fron

### case-54

- **结论**：`app/frontend` + `code_excessive_file_reads` ｜ 标签 `app/frontend` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 10 · tokens 111,090
- **raw 日志**：[results/1021_0324_tsm-v1-b130/raw/1021_0324_boutique-codedefect-54](../results/1021_0324_tsm-v1-b130/raw/1021_0324_boutique-codedefect-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flag frontend: cpu 0.01 -> 0.11 cores (+1046.2%), cpu_cfs 0.862s throttled, p50 latency 23.61ms -> 382.35ms and p90 82.40ms -> 3987.90ms; entry-point errors include POST /setCurrency -> 503. Pod frontend-6794985cd9-6zwdx is 2/2 Running with RESTARTS 0 (fresh rollout, age 2m27s vs 5m38s peers), excluding restart/OOM/probe/scheduling classes. Code surface (L3: clear code surface first) shows the defect in frontend handlers.go setCurrencyHandler: a 10-iteration loop per request doing os.Open('/src/log.csv') + csv.NewReader(f).ReadAll() + f.Close() - the full CSV is opened, read and parsed 

### case-55

- **结论**：`app/frontend` + `code_wrong_return` ｜ 标签 `app/frontend` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 27 · tokens 530,803
- **raw 日志**：[results/1021_0326_tsm-v1-b131/raw/1021_0327_boutique-codedefect-55](../results/1021_0326_tsm-v1-b131/raw/1021_0327_boutique-codedefect-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods were 2/2 Running with 0 restarts, so no scheduling/creation/image/probe/quota mechanism applies. GetAlerts pointed at POST /cart/checkout: 196 x HTTP 500, and GetErrorLogs(frontend) showed a single pattern (195 of 5679 lines): 'failed to complete the order: Place order error.' on /cart/checkout. The failing edge's callee was clean: checkoutservice logs for the very same session 8639552a-5b92-4936-85b8-ccf7fb003cd5 show a fully successful flow ('[PlaceOrder] ... user_currency=TRY' at 09:19:09.221, 'payment went through (transaction_id: d70950b3-...)' at 09:19:09.229, 'order

### case-56

- **结论**：`app/frontend` + `code_wrong_return` ｜ 标签 `app/frontend` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 222,765
- **raw 日志**：[results/1021_0331_tsm-v1-b133/raw/1021_0331_boutique-codedefect-56](../results/1021_0331_tsm-v1-b133/raw/1021_0331_boutique-codedefect-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend entry handler is the breakpoint. GetAlerts shows 557x HTTP 400 on GET /product/{id} at entry_service=frontend; GetErrorLogs(frontend) returns 557 occurrences of pattern {"error":"product id not specified", "http.req.path":"/product/0PUK6V6EV0"} - the error claims the id was missing while the logged request path carried a valid id (0PUK6V6EV0), i.e. the request arrived complete. Following the failing edge, GetErrorLogs(productcatalogservice) and GetErrorLogs(recommendationservice) both returned 'No error logs found', so the malformed-request trail is at the entry handler, not a callee.

### case-57

- **结论**：`app/frontend` + `code_wrong_return` ｜ 标签 `app/frontend` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 288,113
- **raw 日志**：[results/1021_0333_tsm-v1-b134/raw/1021_0334_boutique-codedefect-57](../results/1021_0333_tsm-v1-b134/raw/1021_0334_boutique-codedefect-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique pods are 2/2 Running with 0 restarts, so the fault is not workload-level; alerts point at recommendationservice but the dominant signal is frontend: GetErrorLogs(frontend) returns 541 occurrences of '{"error":"product id not specified","http.req.method":"GET","http.req.path":"/product/6E92ZMYYFZ"}' i.e. HTTP 400 on a request whose path supplied a valid product id. Callees productcatalogservice and recommendationservice return no error logs, and productcatalogservice GetProduct only returns 'NotFound: no product with ID %s', so the message comes from frontend's own guard. Code surf

### case-58

- **结论**：`app/frontend` + `code_wrong_return` ｜ 标签 `app/frontend` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 242,184
- **raw 日志**：[results/1021_0337_tsm-v1-b136/raw/1021_0337_boutique-codedefect-58](../results/1021_0337_tsm-v1-b136/raw/1021_0337_boutique-codedefect-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS 0, so scheduling/startup/probe-restart chains are excluded. Alerts flag entry caller frontend on GET /product/{id} with 571 occurrences of HTTPError('400 Server Error: Bad Request'). GetErrorLogs(frontend) shows 571/4369 errors (13.07%) with a single pattern: {"error":"product id not specified","http.req.path":"/product/9SIQT8TOJO"} - the path supplied the id, yet the handler claims it is not specified. Both callees productcatalogservice and recommendationservice returned 'No error logs found', so the malformed trail terminates inside frontend

### case-59

- **结论**：`app/frontend` + `code_wrong_return` ｜ 标签 `app/frontend` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 290,215
- **raw 日志**：[results/1021_0339_tsm-v1-b137/raw/1021_0340_boutique-codedefect-59](../results/1021_0339_tsm-v1-b137/raw/1021_0340_boutique-codedefect-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are Running 2/2 with 0 restarts and the frontend pod (frontend-76cdc49cd7-jvjgw) is Ready with only Normal events, so the carrier/scheduling/image/probe faces are healthy. The entry caller frontend emits 550 errors out of 4326 log lines in a single pattern: {"error":"product id not specified","http.req.path":"/product/OLJCESPC7Z","message":"request error"} - the path carries the id yet the handler rejects it. The code surface shows the breakpoint in frontend handlers.go productHandler: after the first guard 'id := mux.Vars(r)["id"]' it executes 'id = ""' and then its own s

### case-60

- **结论**：`app/frontend` + `code_excessive_file_writes` ｜ 标签 `app/frontend` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 174,235
- **raw 日志**：[results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-codedefect-60](../results/1021_0345_tsm-v1-b140/raw/1021_0345_boutique-codedefect-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts on frontend only: RESOURCE_SATURATION [cpu] 0.01 -> 0.04 cores (+266.7%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> 171371.76B/s (peak 414371.37B/s, new spike), with user-facing HTTPError('503 Server Error: Service Unavailable') on '/' (12x) and '/product/{id}' (17x). The code surface of the flagged service closes it: frontend handlers.go chooseAd() does os.Create("/tmp/tmp.csv") then writes 30000 CSV rows in a loop, flushes and deletes the file on EVERY home/product page render, work the ad lookup does not need; chooseAd is invoked by homeHandler and productHandler, 

### case-61

- **结论**：`app/frontend` + `code_excessive_file_writes` ｜ 标签 `app/frontend` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 215,441
- **raw 日志**：[results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-codedefect-61](../results/1021_0347_tsm-v1-b141/raw/1021_0347_boutique-codedefect-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts all name frontend: RESOURCE_SATURATION [cpu] 0.01 -> 0.04 cores (+297.3%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=170065.94B/s (New Spike, Peak=395828.38B/s); business errors are 503 Service Unavailable on GET / (16x) and GET /product/{id} (10x). Following the L3 code-surface-first walk, frontend/handlers.go shows the defect line inside chooseAd(): after fetching ads it unconditionally does os.Create("/tmp/tmp.csv") and a for i := 0; i < 30000; i++ loop of csv.Writer.Write, then Flush/Close/Remove - a 30k-row file-write loop executed on every call. chooseAd

### case-62

- **结论**：`app/frontend` + `code_excessive_file_writes` ｜ 标签 `app/frontend` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 286,340
- **raw 日志**：[results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-codedefect-62](../results/1021_0349_tsm-v1-b142/raw/1021_0349_boutique-codedefect-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flag frontend (entry service, Go HTTP :8080) with RESOURCE_SATURATION [cpu] Normal=0.01 cores -> Current=0.03 cores (+324.5%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=162345.95B/s (New Spike) Peak=401646.51B/s, while user requests to "/" and "/product/{id}" fail with HTTPError('503 Server Error: Service Unavailable'). The code surface of the flagged service names the mechanism: frontend handlers.go chooseAd() runs os.Create("/tmp/tmp.csv"), then a for i:=0; i<30000; i++ loop writing CSV rows, Flush, Close and os.Remove on EVERY request (chooseAd is invoked f

### case-63

- **结论**：`app/frontend` + `code_excessive_file_writes` ｜ 标签 `app/frontend` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 219,673
- **raw 日志**：[results/1021_0351_tsm-v1-b143/raw/1021_0351_boutique-codedefect-63](../results/1021_0351_tsm-v1-b143/raw/1021_0351_boutique-codedefect-63/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend is the only entity with resource anomalies: FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=179104.60B/s (New Spike) Peak=311716.35B/s plus RESOURCE_SATURATION [cpu] Normal=0.01 cores -> Current=0.04 cores (+334.1%) in window 2026-05-19 15:49:19~15:51:54, with entry-path errors on exactly GET /product/{id} (20x) and GET / (10x) returning HTTPError('503 Server Error: Service Unavailable'). Code surface closed the mechanism: frontend handlers.go chooseAd() (called by both homeHandler and productHandler) does os.Create("/tmp/tmp.csv") then loops 30000 times writing a CS

### case-64

- **结论**：`app/productcatalogservice` + `code_busy_loop` ｜ 标签 `app/productcatalogservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 190,156
- **raw 日志**：[results/1021_0353_tsm-v1-b144/raw/1021_0353_boutique-codedefect-64](../results/1021_0353_tsm-v1-b144/raw/1021_0353_boutique-codedefect-64/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' — alerts name productcatalogservice with RESOURCE_SATURATION [cpu_cfs] Val=1.220s throttled, cpu 0.00 -> 0.14 cores (+5109.4%) and p50latency 0.31ms -> 243.37ms (+77407.0%); frontend (p50 23.32ms -> 926.10ms) and recommendationservice (p50 3.37ms -> 763.04ms) are downstream latency victims on the frontend->productcatalog and recommendation->productcatalog call edges. Following the L3 rule (clear the code surface first), product_catalog.go ListProducts contains a run-away spin loop: 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millis

### case-65

- **结论**：`app/productcatalogservice` + `code_busy_loop` ｜ 标签 `app/productcatalogservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 209,982
- **raw 日志**：[results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-codedefect-65](../results/1021_0355_tsm-v1-b145/raw/1021_0355_boutique-codedefect-65/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts 指向 productcatalogservice 同时出现 CPU 饱和与限流与延迟：'RESOURCE_SATURATION [cpu_cfs] | Val=1.214s throttled'、'RESOURCE_SATURATION [cpu] | Normal=0.00 cores -> Current=0.14 cores (+5150.0%)'、'LATENCY_DEGRADATION ... p50latency: Normal=0.32ms -> Current=306.70ms (+96956.3%)'；frontend(22.5ms->996ms) 与 recommendationservice(3.4ms->757ms) 为其调用下游的受害者。代码面(product_catalog.go) 断点明确：ListProducts 在 handler 内执行 for { if time.Now().Sub(start) > 500*time.Millisecond { break } } 的无阻塞自旋，每请求空转 500ms 满核烧 CPU，而 Deployment limits.cpu=200m 使其被 CFS 限流，放大为数百毫秒排队。配置确认面排除延迟注入分支：GetAppYAML(productcatalogservice) 的 env 仅

### case-66

- **结论**：`app/productcatalogservice` + `code_busy_loop` ｜ 标签 `app/productcatalogservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 307,450
- **raw 日志**：[results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-codedefect-66](../results/1021_0357_tsm-v1-b146/raw/1021_0357_boutique-codedefect-66/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' resolved on the code surface first (L3 exact section). Alerts name productcatalogservice as a resource-shaped anomaly: RESOURCE_SATURATION [cpu_cfs] Val=1.224s throttled, [cpu] Normal=0.00 cores -> Current=0.13 cores (+5834.2%), LATENCY_DEGRADATION p50 0.30ms -> 261.07ms (+87213.2%); downstream callers degraded too (frontend p50 21.80ms -> 994.14ms, recommendationservice 3.26ms -> 757.81ms). Source read: product_catalog.go ListProducts contains a hand-written busy-wait spin 'for { if time.Now().Sub(start) > 500*time.Millisecond { break } }' with no sl

### case-67

- **结论**：`app/productcatalogservice` + `code_busy_loop` ｜ 标签 `app/productcatalogservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 186,281
- **raw 日志**：[results/1021_0359_tsm-v1-b147/raw/1021_0400_boutique-codedefect-67](../results/1021_0359_tsm-v1-b147/raw/1021_0400_boutique-codedefect-67/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name productcatalogservice with resource-shaped symptoms: RESOURCE_SATURATION [cpu_cfs] Val=1.118s throttled, cpu Normal=0.00 -> Current=0.13 cores (+6055.0%), and LATENCY_DEGRADATION p50 0.30ms -> 235.43ms (+78375.3%); frontend (p50 20.23ms -> 992.31ms) and recommendationservice (p50 3.36ms -> 767.31ms) are downstream victims that call it. Following the L3 code-first order, GetSourceCode on productcatalogservice/file product_catalog.go shows the defect line inside the ListProducts handler: a request-time spin loop 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisec

### case-68

- **结论**：`app/productcatalogservice` + `code_artificial_delay` ｜ 标签 `app/productcatalogservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 227,328
- **raw 日志**：[results/1021_0401_tsm-v1-b148/raw/1021_0401_boutique-codedefect-68](../results/1021_0401_tsm-v1-b148/raw/1021_0401_boutique-codedefect-68/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show LATENCY_DEGRADATION on productcatalogservice (p50 0.31ms -> 3332.65ms, +1089001.8%; p90 2.96ms -> 4666.53ms) and cascading on frontend (p50 21.10ms -> 10169.49ms, frontend calls productcatalogservice). The code surface of the flagged service is not clean: product_catalog.go GetProduct handler contains an injected blocking line 'time.Sleep(time.Millisecond * time.Duration(3000))' executed on every GetProduct call, after the benign 'time.Sleep(extraLatency)'. GetAppYAML(productcatalogservice) sets no EXTRA_LATENCY env (env is only PORT=3550, DISABLE_PROFILER=1) and server.go defaults

### case-69

- **结论**：`app/productcatalogservice` + `code_artificial_delay` ｜ 标签 `app/productcatalogservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 200,215
- **raw 日志**：[results/1021_0403_tsm-v1-b149/raw/1021_0403_boutique-codedefect-69](../results/1021_0403_tsm-v1-b149/raw/1021_0403_boutique-codedefect-69/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (2026-05-18 15:26~15:28) show LATENCY_DEGRADATION on frontend (p50 20.45ms -> 3740.67ms), recommendationservice (p50 3.05ms -> 3730.77ms) and productcatalogservice (p90 2.13ms -> 4003.98ms). GetServiceDependencies proves productcatalogservice is the leaf (upstream: frontend, checkoutservice, recommendationservice; downstream: None), so caller latency propagates from it. Code surface: GetSourceCode(product_catalog.go) shows the ListProducts handler contains an injected blocking sleep 'time.Sleep(time.Millisecond * time.Duration(3000))' after 'time.Sleep(extraLatency)'. GetAppYAML confirm

### case-70

- **结论**：`app/productcatalogservice` + `code_memory_leak` ｜ 标签 `app/productcatalogservice` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 266,177
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0845_boutique-codedefect-70](../results/1021_0900_tsm-v1-fix/raw/1021_0845_boutique-codedefect-70/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend error log (1091/4772 errors) is entirely 'could not retrieve product(s): rpc error: code = Unavailable desc = no healthy upstream', i.e. the productcatalogservice edge; pod listing shows the single outlier productcatalogservice-8458b87d48-7r7l6 1/2 READY, CrashLoopBackOff, RESTARTS 4. DescribeResource on that pod: server container Last State Terminated Reason OOMKilled Exit Code 137, limits memory 128Mi, Ready False; it starts at 17:59:22 and dies at 17:59:23. Its own GetErrorLogs is clean and GetRecentLogs stops right after 'loading catalog from local products.json file...', so the c

### case-71

- **结论**：`app/productcatalogservice` + `code_missing_parameter` ｜ 标签 `app/productcatalogservice` + `code_missing_parameter`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 243,554
- **raw 日志**：[results/1021_0900_tsm-v1-fix/raw/1021_0846_boutique-codedefect-71](../results/1021_0900_tsm-v1-fix/raw/1021_0846_boutique-codedefect-71/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 11 boutique pods are 2/2 Running with RESTARTS=0 (no scheduling/startup/probe fault), so the L3 'Pod up, service misbehaves' branch applies. Alert: frontend ERROR_SPIKE success rate 90.5% -> 65.0% on GET /product/{id} (588 occurrences of HTTP 500), recommendationservice AVAILABILITY_MISSING. Entry caller error log (588/588 errors, single pattern): 'could not retrieve product: rpc error: code = NotFound desc = no product with ID ' on path /product/2ZYFJ3GM2N - the request path carried a full id, but the callee echoed an EMPTY id. Dependency graph confirms the failing edge frontend -> produc

### case-72

- **结论**：`app/productcatalogservice` + `code_excessive_file_reads` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 349,424
- **raw 日志**：[results/1021_0409_tsm-v1-b152/raw/1021_0409_boutique-codedefect-72](../results/1021_0409_tsm-v1-b152/raw/1021_0409_boutique-codedefect-72/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts (18:11:20~18:13:55) show latency collapse: productcatalogservice p90 3.05ms->2126.90ms (+69543%), recommendationservice p50 3.21ms->3191.72ms, frontend p90 46.06ms->2162.50ms with success rate 90.5%->38.4% and HTTPError 500 on / and /product/{id}. Topology frontend->recommendationservice->productcatalogservice plus frontend/checkoutservice->productcatalogservice makes the catalog the deepest common node. L3 order was code-surface-first: recommendationservice/recommendation_server.py reads clean (stock upstream); productcatalogservice product_catalog.go ListProducts contains an injected 

### case-73

- **结论**：`app/productcatalogservice` + `code_excessive_file_reads` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 178,802
- **raw 日志**：[results/1021_0409_tsm-v1-b152/raw/1021_0410_boutique-codedefect-73](../results/1021_0409_tsm-v1-b152/raw/1021_0410_boutique-codedefect-73/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert pointers: productcatalogservice p90 2.61ms->1458.43ms (+55735%), recommendationservice p50 3.33ms->3392.86ms, frontend p90 391.67ms->1750ms with success rate 100%->37.5% and HTTP 500s. Pod sheet has exactly one outlier: productcatalogservice-6df94d8f6b-vjgld 1/2 OOMKilled, 4 restarts, all other services 2/2 Running 0 restarts. Code surface (product_catalog.go, ListProducts) contains an injected loop: for i:=0;i<15;i++ { f,_ := os.Open("/src/log.csv"); r := csv.NewReader(f); r.ReadAll(); f.Close() } - the whole CSV is re-opened and fully parsed 15 times per request with no reuse. server.g

### case-74

- **结论**：`app/productcatalogservice` + `code_excessive_file_reads` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 384,388
- **raw 日志**：[results/1021_0411_tsm-v1-b153/raw/1021_0412_boutique-codedefect-74](../results/1021_0411_tsm-v1-b153/raw/1021_0412_boutique-codedefect-74/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice 的 ListProducts 处理器含离群缺陷行：每请求 for i:=0;i<15;i++ { os.Open("/src/log.csv"); csv.NewReader(f).ReadAll(); f.Close() }，把整个文件全量读入内存并重复 15 次（GetProduct/SearchProducts 无此循环）。GetAppYAML 确认未设置 EXTRA_LATENCY，故 extraLatency=0，观测到的 ~2s 延迟只能来自该读过循环。对象层唯一离群行：pod productcatalogservice-6df94d8f6b-nmz5q 1/2 OOMKilled，RESTARTS 4；DescribeResource 显示 container server Last State Terminated Reason OOMKilled Exit Code 137，Started 13:12:32 / Finished 13:12:39（约 7 秒），Limits memory 128Mi，State Waiting Reason CrashLoopBackOff；命名空间事件面 Warning BackOff (x3) 'Back-off restarting failed container server'

### case-75

- **结论**：`app/productcatalogservice` + `code_excessive_file_reads` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 438,823
- **raw 日志**：[results/1021_0413_tsm-v1-b154/raw/1021_0413_boutique-codedefect-75](../results/1021_0413_tsm-v1-b154/raw/1021_0413_boutique-codedefect-75/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Performance Degradation.' resolves on productcatalogservice. Alerts: productcatalogservice LATENCY_DEGRADATION p90 2.37ms -> 1944.01ms (+81856.6%), peak 4316.88ms; recommendationservice p50 3.39ms -> 2200.00ms; frontend Success Rate 100.0% -> 41.7% with 499x '/' and 402x '/product/{id}' returning HTTPError('500 Server Error'). Pod sheet: only productcatalogservice-6df94d8f6b-rgpsx is off (RESTARTS 4), all other pods RESTARTS 0; its pod detail shows Last State Terminated, Reason OOMKilled, Exit Code 137 with limits cpu 200m / memory 128Mi and event 'Warning BackOff Back-off res

### case-76

- **结论**：`app/productcatalogservice` + `code_wrong_return` ｜ 标签 `app/productcatalogservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 303,895
- **raw 日志**：[results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-codedefect-76](../results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-codedefect-76/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 match=exact. Signal side: GetAlerts shows Service/frontend ERROR_SPIKE [Success Rate Drop] Normal=90.5% -> Cur=66.6% and 553 occurrences of GET /product/{id} returning HTTPError('500 Server Error'); GetErrorLogs(frontend) has a single 553-count pattern: could not retrieve product: rpc error: code = Unknown desc = Query product error. -> failing edge frontend -> productcatalogservice. Callee side: GetErrorLogs(productcatalogservice) returned NO error logs and GetRecentLogs shows only 'starting grpc server at :3550' / 'successfully parsed product catalog json' / 'Readiness succeeded'; GetServ

### case-77

- **结论**：`app/productcatalogservice` + `code_wrong_return` ｜ 标签 `app/productcatalogservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 226,363
- **raw 日志**：[results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-codedefect-77](../results/1021_0416_tsm-v1-b155/raw/1021_0416_boutique-codedefect-77/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs: 560 of 561 errors are 'could not retrieve product: rpc error: code = NotFound desc = no product with ID OLJCESPC7Z' (alert: 561x HTTP 500 on /product/{id}, success rate 90.5% -> 66.3%); the single 'Connection refused' (18:45:52) is only a transport echo during pod replacement. All 11 boutique pods are 2/2 Running with 0 restarts (productcatalogservice pod is a Running+Ready replacement, so not deployment_zero_replicas); no OOMKill, no scheduling failure, no image-pull error. Callee productcatalogservice logs are clean (No error logs found) and it is a leaf i

### case-78

- **结论**：`app/productcatalogservice` + `code_wrong_return` ｜ 标签 `app/productcatalogservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 242,748
- **raw 日志**：[results/1021_0417_tsm-v1-b156/raw/1021_0418_boutique-codedefect-78](../results/1021_0417_tsm-v1-b156/raw/1021_0418_boutique-codedefect-78/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry caller frontend error log shows 550 occurrences of 'could not retrieve product: rpc error: code = NotFound desc = no product with ID 9SIQT8TOJO' on GET /product/{id} (success rate 100% -> 68.2%, 551 HTTP 500s); the alert names /product/{id} and View product detail. All pods are 2/2 Running with 0 restarts and productcatalogservice's own error log is clean, so the trail was followed down to the callee's handler. Source code product_catalog.go GetProduct returns status.Errorf(codes.NotFound, "no product with ID %s") inside the branch where productID == product.Id, i.e. the handler's own re

### case-79

- **结论**：`app/productcatalogservice` + `code_wrong_return` ｜ 标签 `app/productcatalogservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 228,206
- **raw 日志**：[results/1021_0419_tsm-v1-b157/raw/1021_0419_boutique-codedefect-79](../results/1021_0419_tsm-v1-b157/raw/1021_0419_boutique-codedefect-79/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing: all boutique services 2/2 Running with RESTARTS 0; only outlier is a Ready replacement pod productcatalogservice-68b9c7b49-tv8lh (age 2m26s), i.e. a rollout, not a replica/restart fault. Alert on the entry service: frontend '[Success Rate Drop] Normal=95.2% -> Cur=64.5% (-30.7%)' with business action 'View product detail' GET /product/{id}, 545 x HTTP 500. GetErrorLogs(frontend): 545 x 'could not retrieve product: rpc error: code = NotFound desc = no product with ID L9ECAV7KIM' on /product/L9ECAV7KIM (plus one rollout-window 'code = Unavailable ... Connection refused' on /). GetS

### case-80

- **结论**：`app/productcatalogservice` + `code_wrong_return` ｜ 标签 `app/productcatalogservice` + `code_wrong_return`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 228,787
- **raw 日志**：[results/1021_0421_tsm-v1-b158/raw/1021_0423_boutique-codedefect-80](../results/1021_0421_tsm-v1-b158/raw/1021_0423_boutique-codedefect-80/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal: frontend (entry caller) logs 567x of 'could not retrieve product: rpc error: code = NotFound desc = no product with ID 6E92ZMYYFZ' on GET /product/{id}, with alert 'frontend ERROR_SPIKE [Success Rate Drop] Normal=90.5% -> Cur=65.9%' and 'recommendationservice AVAILABILITY_MISSING success_rate vanished'. The failing edge is frontend -> productcatalogservice, and the reply is a gRPC NotFound from the callee (connectivity fine, so not DNS/endpoint/selector). Workload is healthy: pods listing shows productcatalogservice-68b9c7b49-zwvdk 2/2 Running 0 RESTARTS, all 11 services Running/Ready 

### case-81

- **结论**：`app/productcatalogservice` + `code_excessive_file_writes` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 261,879
- **raw 日志**：[results/1021_0424_tsm-v1-b159/raw/1021_0424_boutique-codedefect-81](../results/1021_0424_tsm-v1-b159/raw/1021_0424_boutique-codedefect-81/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on productcatalogservice: RESOURCE_SATURATION [cpu] 0.00 -> 0.02 cores (+811.7%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] 0.00B/s -> 83767.90B/s (Peak=213689.87B/s). Code surface (L3 'clear the code surface first') shows the defect line in product_catalog.go ListProducts: os.Create("/tmp/tmp.csv") followed by a 30000-iteration loop of w.Write("Timestamp,Node,Pod,Container,Log"), then Flush/Close/os.Remove - a per-request bulk file write the request does not need, matching the fs_write spike verbatim; CPU spike is its side effect. Ruled out: extraLatency=0 (no EXTRA_LATENCY env, time.S

### case-82

- **结论**：`app/productcatalogservice` + `code_excessive_file_writes` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 165,741
- **raw 日志**：[results/1021_0425_tsm-v1-b160/raw/1021_0425_boutique-codedefect-82](../results/1021_0425_tsm-v1-b160/raw/1021_0425_boutique-codedefect-82/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names productcatalogservice with RESOURCE_SATURATION [cpu] Normal=0.00 cores -> Current=0.02 cores (+833.9%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> Current=50200.70B/s (New Spike) | Peak=112064.67B/s. Code surface of the flagged service confirms the mechanism: product_catalog.go ListProducts handler does os.Create('/tmp/tmp.csv') and loops 30000 times writing CSV rows ('Timestamp,Node,Pod,Container,Log') via csv.Writer plus w.Flush() on every request, then removes the file - run-away work the request does not need. GetAppYAML shows env only PORT and DISABLE_PROFILE

### case-83

- **结论**：`app/productcatalogservice` + `code_excessive_file_writes` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 235,857
- **raw 日志**：[results/1021_0427_tsm-v1-b161/raw/1021_0427_boutique-codedefect-83](../results/1021_0427_tsm-v1-b161/raw/1021_0427_boutique-codedefect-83/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names Service/productcatalogservice (13:37:52-13:40:27): RESOURCE_SATURATION [cpu] Normal=0.00 -> 0.02 cores (+857.6%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> 130908.56B/s (New Spike), Peak=365007.86B/s. L3 exact section ordered code-surface-first because this wording hides a code defect under a resource-shaped alert. GetSourceCode(productcatalogservice/product_catalog.go) shows the defect line in ListProducts: os.Create("/tmp/tmp.csv") followed by a loop writing 30000 identical CSV rows, w.Flush(), f.Close(), os.Remove() on EVERY request - ~870KB of needless synchr

### case-84

- **结论**：`app/productcatalogservice` + `code_excessive_file_writes` ｜ 标签 `app/productcatalogservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 210,649
- **raw 日志**：[results/1021_0427_tsm-v1-b161/raw/1021_0428_boutique-codedefect-84](../results/1021_0427_tsm-v1-b161/raw/1021_0428_boutique-codedefect-84/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on productcatalogservice: RESOURCE_SATURATION [cpu] 0.00 -> 0.02 cores (+783.2%) plus FILESYSTEM_WRITE_SURGE [fs_write_bytes] 0.00B/s -> 144055.34B/s (peak 292748.64B/s). Code surface closes the mechanism: in product_catalog.go the ListProducts handler (hit on every frontend catalog request) does os.Create('/tmp/tmp.csv'), writes a 30000-iteration csv loop, then os.Remove - per request, unrelated to the response. That write loop is the sole source of the fs_write_bytes spike and its CPU cost saturates the pod against limits.cpu=200m (GetAppYAML), causing throttling and latency degradatio

### case-85

- **结论**：`app/shippingservice` + `code_busy_loop` ｜ 标签 `app/shippingservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 275,004
- **raw 日志**：[results/1021_0429_tsm-v1-b162/raw/1021_0430_boutique-codedefect-85](../results/1021_0429_tsm-v1-b162/raw/1021_0430_boutique-codedefect-85/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names shippingservice: RESOURCE_SATURATION cpu_cfs 'Val=1.218s throttled', cpu 'Normal=0.00 cores -> Current=0.14 cores (+14130.8%)', LATENCY_DEGRADATION p50latency 'Normal=0.42ms -> Current=798.72ms (+190070.2%)' p90 4.08ms -> 1580.22ms. L3 exact walk cleared the code surface first: quote.go CreateQuoteFromFloat contains an unbounded spin loop 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } }' executed on every GetQuote path (main.go GetQuote -> CreateQuoteFromCount -> CreateQuoteFromFloat), burning a full core for 500ms per request before doing the

### case-86

- **结论**：`app/shippingservice` + `code_busy_loop` ｜ 标签 `app/shippingservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 255,580
- **raw 日志**：[results/1021_0431_tsm-v1-b163/raw/1021_0431_boutique-codedefect-86](../results/1021_0431_tsm-v1-b163/raw/1021_0431_boutique-codedefect-86/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names shippingservice: cpu_cfs 1.167s throttled, cpu 0.00->0.13 cores (+12912.5%), p50 0.36ms->781.25ms / p90 3.79->1363.16ms. All pods 2/2 Running with RESTARTS=0 (shippingservice-85588b6c75-dwm2l), no OOMKilled, namespace events for shippingservice are all Normal (Pulled/Created/Started), error logs show no failure - requests are slow but succeed. Code surface of the flagged service shows the defect: quote.go::CreateQuoteFromFloat contains a busy-wait spin 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond { break } }' with no sleep, executed on every GetQuote 

### case-87

- **结论**：`app/shippingservice` + `code_busy_loop` ｜ 标签 `app/shippingservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 168,677
- **raw 日志**：[results/1021_0433_tsm-v1-b164/raw/1021_0433_boutique-codedefect-87](../results/1021_0433_tsm-v1-b164/raw/1021_0433_boutique-codedefect-87/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert on shippingservice: RESOURCE_SATURATION [cpu] Normal=0.00 cores -> Current=0.12 cores (+9995.8%), RESOURCE_SATURATION [cpu_cfs] Val=1.082s throttled, LATENCY_DEGRADATION p50latency 0.44ms -> 784.67ms (Peak 829.39ms), p90latency 4.08ms -> 1345.20ms - a CPU-burn plus throttling shape, not a failure shape. Object layer is otherwise clean: pod shippingservice-85588b6c75-llvpg is 2/2 Running with 0 RESTARTS and gRPC 50051 liveness/readiness passing; deployment sets limits cpu=200m, which is what the CFS throttling is measured against. Error log surface has no failure narrative (total_errors 2

### case-88

- **结论**：`app/shippingservice` + `code_busy_loop` ｜ 标签 `app/shippingservice` + `code_busy_loop`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 191,770
- **raw 日志**：[results/1021_0433_tsm-v1-b164/raw/1021_0434_boutique-codedefect-88](../results/1021_0433_tsm-v1-b164/raw/1021_0434_boutique-codedefect-88/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3 exact section 'Service Performance Degradation.' prescribes reading the code surface first. GetAlerts flagged Service/shippingservice ABNORMAL with 'RESOURCE_SATURATION [cpu_cfs] | Val=1.069s throttled', 'RESOURCE_SATURATION [cpu] | Normal=0.00 cores -> Current=0.12 cores (+11812.5%)' and 'LATENCY_DEGRADATION [Slow Response] | p50latency: Normal=0.39ms -> Current=775.59ms'. The code surface of the flagged service closes the mechanism: in code/shippingservice/quote.go, CreateQuoteFromFloat contains a busy-spin loop 'start := time.Now(); for { if time.Now().Sub(start) > 500*time.Millisecond {

### case-89

- **结论**：`app/shippingservice` + `code_artificial_delay` ｜ 标签 `app/shippingservice` + `code_artificial_delay`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 190,737
- **raw 日志**：[results/1021_0435_tsm-v1-b165/raw/1021_0435_boutique-codedefect-89](../results/1021_0435_tsm-v1-b165/raw/1021_0435_boutique-codedefect-89/)（ndjson / mcp.jsonl / meta）
- **摘要**：GetAlerts flags LATENCY_DEGRADATION on shippingservice (p50 0.44ms -> 3721.67ms, +847659.9%; p90 4.09ms -> 4744.33ms) and on its caller frontend (p90 36.88ms -> 4370.16ms). shippingservice is a leaf service (calls nothing), so the delay is intrinsic. Reading the code surface first per L3, GetSourceCode(shippingservice, main.go) shows an injected blocking sleep inside the GetQuote request handler: time.Sleep(time.Millisecond * time.Duration(3000)) placed after item counting and before CreateQuoteFromCount - a fixed 3s stall per request that matches the observed ~3.7s p50 / 4.7s p90 almost exact

### case-90

- **结论**：`app/shippingservice` + `code_memory_leak` ｜ 标签 `app/shippingservice` + `code_memory_leak`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 488,625
- **raw 日志**：[results/1021_0439_tsm-v1-b167/raw/1021_0439_boutique-codedefect-90](../results/1021_0439_tsm-v1-b167/raw/1021_0439_boutique-codedefect-90/)（ndjson / mcp.jsonl / meta）
- **摘要**：Complaint side first: frontend GetErrorLogs shows 332x 'failed to get shipping quote: rpc error: code = Unavailable desc = no healthy upstream' and 177x 'shipping quote failure: ... no healthy upstream'. Pod inventory outlier: shippingservice-db6465f5d-sk8rt 1/2 CrashLoopBackOff RESTARTS 3, all other pods 2/2 Running. Pod detail: server container Last State Terminated Reason OOMKilled ExitCode 137 (started 19:01:09, finished 19:01:24, ~15s), Ready False, limits memory=128Mi, requests 64Mi; istio-proxy sidecar Running/Ready. Events surface: 'Warning BackOff restarting failed container server in

### case-91

- **结论**：`app/shippingservice` + `code_excessive_file_reads` ｜ 标签 `app/shippingservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 246,655
- **raw 日志**：[results/1021_0439_tsm-v1-b167/raw/1021_0440_boutique-codedefect-91](../results/1021_0439_tsm-v1-b167/raw/1021_0440_boutique-codedefect-91/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names shippingservice as the degraded carrier: LATENCY_DEGRADATION p90latency 4.15ms -> 2777.17ms (+66819.9%), with frontend success rate 100% -> 73.8% and /cart 500s as downstream damage. Following the exact-match SOP for this wording (code surface first), GetSourceCode(shippingservice, quote.go) shows the defect line in CreateQuoteFromCount, which every GetQuote request executes: a 10-iteration loop that does os.Open("/src/log.csv") + csv.NewReader(f) + r.ReadAll() and closes, ignoring the error - ten full CSV reads per quote that the request does not need. Object layer confirms the me

### case-92

- **结论**：`app/shippingservice` + `code_excessive_file_reads` ｜ 标签 `app/shippingservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 244,523
- **raw 日志**：[results/1021_0441_tsm-v1-b168/raw/1021_0442_boutique-codedefect-92](../results/1021_0441_tsm-v1-b168/raw/1021_0442_boutique-codedefect-92/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert names shippingservice: LATENCY_DEGRADATION p90latency 4.01ms -> 2019.74ms (+50267.6%, peak 3129.71ms); frontend success rate 100% -> 71.8% with 500s only on /cart (a caller of GetQuote). Code surface (L3 exact, code face first): quote.go CreateQuoteFromCount, invoked on every GetQuote, runs 'for i := 0; i < 10; i++ { f, _ := os.Open(/src/log.csv); r := csv.NewReader(f); r.ReadAll(); f.Close() }' - 10 full CSV ReadAll passes per request, results discarded, open error swallowed. Pod sheet outlier is unique: shippingservice-7b5c459cdd-hlf6v 1/2 CrashLoopBackOff 3 restarts while all peers ar

### case-93

- **结论**：`app/shippingservice` + `code_excessive_file_reads` ｜ 标签 `app/shippingservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 287,689
- **raw 日志**：[results/1021_0443_tsm-v1-b169/raw/1021_0443_boutique-codedefect-93](../results/1021_0443_tsm-v1-b169/raw/1021_0443_boutique-codedefect-93/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flag shippingservice with LATENCY_DEGRADATION (p90 3.14ms -> 2087.50ms, +66380.9%, peak 3175ms) and frontend ERROR_SPIKE (success 95.2% -> 73.4%) on /cart. Following the exact-match SOP the code surface was read first: quote.go CreateQuoteFromCount runs a 10-iteration loop of os.Open("/src/log.csv") + csv.NewReader(f).ReadAll() + f.Close() inside the GetQuote request path, pulling the whole file into memory ten times per request and ignoring the open error. Object layer confirms: shippingservice-7b5c459cdd-dphmz is the only outlier pod (1/2 READY, CrashLoopBackOff, RESTARTS 3) while all

### case-94

- **结论**：`app/shippingservice` + `code_excessive_file_reads` ｜ 标签 `app/shippingservice` + `code_excessive_file_reads`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 225,853
- **raw 日志**：[results/1021_0445_tsm-v1-b170/raw/1021_0445_boutique-codedefect-94](../results/1021_0445_tsm-v1-b170/raw/1021_0445_boutique-codedefect-94/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the only outlier pod (shippingservice-7b5c459cdd-7fwff: 1/2 CrashLoopBackOff, RESTARTS 3) while every peer is 2/2 Running with 0 restarts; the alert names the symptom as latency (p90 3.92ms -> 2871.09ms, +73048.9%) with frontend success rate 95.2% -> 72.1%. Per the exact L3 section the code surface was cleared first: quote.go CreateQuoteFromCount(), on the GetQuote hot path, runs for i:=0;i<10;i++ { os.Open("/src/log.csv"); csv.NewReader(f).ReadAll(); f.Close() } - ten full-file CSV reads per request whose data is never used (the quote is hardcoded 8.99/0), i.e. run-away wor

### case-95

- **结论**：`app/shippingservice` + `code_excessive_file_writes` ｜ 标签 `app/shippingservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 285,521
- **raw 日志**：[results/1021_0445_tsm-v1-b170/raw/1021_0446_boutique-codedefect-95](../results/1021_0445_tsm-v1-b170/raw/1021_0446_boutique-codedefect-95/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts flagged shippingservice with RESOURCE_SATURATION [cpu] (0.00 -> 0.02 cores, +1871.7%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] (0.00B/s -> 131503.41B/s, peak 351574.14B/s). Clearing the code surface (per L3 for 'Service Performance Degradation.') found the defect in shippingservice quote.go -> CreateQuoteFromFloat: on every GetQuote the handler executes os.Create("/tmp/tmp.csv") then a 'for i := 0; i < 30000; i++' loop writing CSV rows, Flush/Close/Remove - 30,000 filesystem writes per request, completely useless for the quote value (which only uses math.Modf). GetQuote -> CreateQuot

### case-96

- **结论**：`app/shippingservice` + `code_excessive_file_writes` ｜ 标签 `app/shippingservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 216,591
- **raw 日志**：[results/1021_0447_tsm-v1-b171/raw/1021_0448_boutique-codedefect-96](../results/1021_0447_tsm-v1-b171/raw/1021_0448_boutique-codedefect-96/)（ndjson / mcp.jsonl / meta）
- **摘要**：Signal: GetAlerts() flags shippingservice ABNORMAL with 'RESOURCE_SATURATION [cpu] | Normal=0.00 cores -> Current=0.02 cores (+1800.1%)' and 'FILESYSTEM_WRITE_SURGE [fs_write_bytes] | Normal=0.00B/s -> Current=133560.76B/s (New Spike) | Peak=281034.62B/s'. Code surface (L3 'clear the code surface first'): quote.go CreateQuoteFromFloat() contains an injected defect - os.Create('/tmp/tmp.csv'), then a 'for i := 0; i < 30000; i++ { w.Write([]string{"Timestamp,Node,Pod,Container,Log"}) }' loop, then Remove - i.e. 30,000 CSV rows written to disk on every single shipping-quote calculation, which exa

### case-97

- **结论**：`app/shippingservice` + `code_excessive_file_writes` ｜ 标签 `app/shippingservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 166,050
- **raw 日志**：[results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-codedefect-97](../results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-codedefect-97/)（ndjson / mcp.jsonl / meta）
- **摘要**：L3(match=exact) instructed to clear the code surface first. GetAlerts() flags only shippingservice: RESOURCE_SATURATION [cpu] Normal=0.00 -> Current=0.02 cores (+1830%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> 119673.72B/s (peak 231802.87B/s). Code surface: main.go GetQuote handler is trivial (count items -> CreateQuoteFromCount -> response), but quote.go CreateQuoteFromFloat creates /tmp/tmp.csv and writes 30000 CSV rows with csv.Writer on EVERY quote calculation (including the count==0 branch), then flushes/closes/removes it - ~1.2MB of disk writes and 30k encodes per re

### case-98

- **结论**：`app/shippingservice` + `code_excessive_file_writes` ｜ 标签 `app/shippingservice` + `code_excessive_file_writes`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 186,138
- **raw 日志**：[results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-codedefect-98](../results/1021_0449_tsm-v1-b172/raw/1021_0449_boutique-codedefect-98/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert surface (GetAlerts) names exactly one abnormal Service: shippingservice, window 16:03:08~16:05:43, with RESOURCE_SATURATION [cpu] Normal=0.00 -> 0.02 cores (+1629%) and FILESYSTEM_WRITE_SURGE [fs_write_bytes] Normal=0.00B/s -> 156251.48B/s (New Spike) Peak=304828.34B/s. Following the code-surface-first walk, shippingservice/quote.go CreateQuoteFromFloat (reached by every GetQuote RPC via CreateQuoteFromCount) opens /tmp/tmp.csv and writes 30000 CSV rows per request (for i:=0;i<30000;i++ { w.Write(...) } then Flush/Close/Remove) - a runaway disk-write loop inside the request handler that 

