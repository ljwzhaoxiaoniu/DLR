# 评测明细 · train-ticket/runtime — cloudopsbench

> 本家族已跑 **96/96** 题：JRA ✅96 ❌0 ｜ 证据链全闭 74 ｜ token 中位 382,918 ｜ 生成 2026-10-14T11:00:09.483Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 265,656 | 0 | 0 | 1012_1512_inorder4-v3b3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1944 | 37 | 554,007 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 535,723 | 0 | 0 | 1012_1923_l1l2-verify2 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 517,218 | 0 | 0 | 1012_1935_tidy-verify1 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.1429 | 36 | 800,099 | 0 | 0 | 1012_2000_case-verify1 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3182 | 23 | 477,041 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.381 | 22 | 521,337 | 0 | 0 | 1013_1235_inorder4-v3b12 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 37 | 631,353 | 0 | 0 | 1013_1343_inorder4-v3b14 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4074 | 28 | 644,230 | 0 | 0 | 1013_1503_inorder4-v3b16 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3913 | 24 | 409,060 | 0.0435 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 23 | 347,660 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 22 | 554,907 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2759 | 30 | 476,723 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3684 | 39 | 875,225 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2692 | 27 | 490,757 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1538 | 14 | 260,976 | 0 | 1 | 1013_1845_triple-verify1 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.125 | 25 | 613,053 | 0 | 0 | 1013_2235_inorder4-v3b54 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 193,963 | 0 | 0 | 1013_2240_inorder4-v3b55 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1071 | 29 | 389,833 | 0 | 0 | 1013_2245_inorder4-v3b56 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 519,918 | 0 | 0 | 1013_2249_inorder4-v3b57 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.3636 | 12 | 255,702 | 0 | 0 | 1013_2253_inorder4-v3b58 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 409,364 | 0 | 0 | 1013_2258_inorder4-v3b59 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 205,969 | 0 | 0 | 1013_2303_inorder4-v3b60 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 362,268 | 0.0526 | 0 | 1013_2308_inorder4-v3b61 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.1111 | 19 | 320,076 | 0 | 0 | 1013_2311_inorder4-v3b62 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 26 | 531,205 | 0 | 0 | 1013_2315_inorder4-v3b63 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 507,364 | 0 | 0 | 1013_2320_inorder4-v3b64 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 537,254 | 0 | 0 | 1013_2325_inorder4-v3b65 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.125 | 33 | 1,450,360 | 0 | 0 | 1013_2331_inorder4-v3b66 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.125 | 25 | 740,589 | 0 | 0 | 1013_2337_inorder4-v3b67 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 0.5 | 1 | 0.2308 | 14 | 442,451 | 0 | 0 | 1014_0009_inorder4-v3b69 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 603,093 | 0 | 0 | 1014_0012_inorder4-v3b70 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 435,734 | 0 | 0 | 1014_0016_inorder4-v3b71 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 0.75 | 0.25 | 0 | 0.2857 | 15 | 432,222 | 0 | 0 | 1014_0021_inorder4-v3b72 | 结果对·链未闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3571 | 15 | 413,155 | 0 | 0 | 1014_0029_inorder4-v3b73 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 443,882 | 0 | 0 | 1014_0035_inorder4-v3b74 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3077 | 14 | 300,556 | 0 | 0 | 1014_0041_inorder4-v3b75 | 结果对·链未闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 338,478 | 0 | 0 | 1014_0046_inorder4-v3b76 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.25 | 17 | 425,727 | 0 | 0 | 1014_0048_inorder4-v3b77 | 结果对·链未闭 |
| [40](#case-40) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3333 | 13 | 293,034 | 0 | 0 | 1014_0051_inorder4-v3b78 | 结果对·链未闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 25 | 730,032 | 0.0417 | 0 | 1014_0054_inorder4-v3b79 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 746,246 | 0.05 | 0 | 1014_0104_inorder4-v3b80 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.2353 | 18 | 217,757 | 0 | 0 | 1014_0108_inorder4-v3b81 | 结果对·链未闭 |
| [44](#case-44) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.25 | 13 | 310,952 | 0 | 0 | 1014_0118_inorder4-v3b82 | 结果对·链未闭 |
| [45](#case-45) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.2 | 26 | 336,856 | 0 | 0 | 1014_0122_inorder4-v3b83 | 结果对·链未闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 318,741 | 0 | 0 | 1014_0124_inorder4-v3b84 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 19 | 429,506 | 0 | 0 | 1014_0130_inorder4-v3b85 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4286 | 15 | 220,649 | 0 | 0 | 1014_0141_inorder4-v3b86 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 440,500 | 0 | 0 | 1014_0147_inorder4-v3b87 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.1667 | 25 | 416,857 | 0 | 0 | 1014_0149_inorder4-v3b88 | 结果对·链未闭 |
| [51](#case-51) | 1 | 1 | 1 | 0.75 | 0.5 | 0 | 0.2222 | 19 | 343,167 | 0 | 0 | 1014_0151_inorder4-v3b89 | 结果对·链未闭 |
| [52](#case-52) | 1 | 1 | 1 | 0.5 | 0.25 | 0 | 0.2 | 16 | 311,634 | 0 | 0 | 1014_0153_inorder4-v3b90 | 结果对·链未闭 |
| [53](#case-53) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3333 | 16 | 498,040 | 0 | 0 | 1014_0155_inorder4-v3b91 | 结果对·链未闭 |
| [54](#case-54) | 1 | 1 | 1 | 0.75 | 0.75 | 0 | 0.3077 | 14 | 292,074 | 0 | 0 | 1014_0158_inorder4-v3b92 | 结果对·链未闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2273 | 23 | 388,114 | 0 | 0 | 1014_0200_inorder4-v3b93 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4167 | 13 | 180,103 | 0 | 0 | 1014_0202_inorder4-v3b94 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4615 | 14 | 203,898 | 0 | 0 | 1014_0205_inorder4-v3b95 | 结果对·链未闭 |
| [58](#case-58) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4706 | 18 | 243,635 | 0 | 0 | 1014_0207_inorder4-v3b96 | 结果对·链未闭 |
| [59](#case-59) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4545 | 23 | 489,686 | 0 | 0 | 1014_0209_inorder4-v3b97 | 结果对·链未闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5882 | 18 | 260,302 | 0 | 0 | 1014_0211_inorder4-v3b98 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4118 | 18 | 365,900 | 0 | 0 | 1014_0214_inorder4-v3b99 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.5 | 21 | 335,320 | 0 | 0 | 1014_0216_inorder4-v3b100 | 结果对·链未闭 |
| [63](#case-63) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5 | 19 | 335,407 | 0 | 0 | 1014_0218_inorder4-v3b101 | 全对·链闭 |
| [64](#case-64) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 398,880 | 0 | 0 | 1014_0221_inorder4-v3b102 | 全对·链闭 |
| [65](#case-65) | 1 | 1 | 1 | 1 | 1 | 1 | 0.225 | 41 | 1,058,031 | 0.05 | 0 | 1014_0223_inorder4-v3b103 | 全对·链闭 |
| [66](#case-66) | 1 | 1 | 1 | 1 | 1 | 1 | 0.5263 | 20 | 261,416 | 0 | 0 | 1014_0225_inorder4-v3b104 | 全对·链闭 |
| [67](#case-67) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4706 | 18 | 243,427 | 0 | 0 | 1014_0228_inorder4-v3b105 | 全对·链闭 |
| [68](#case-68) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4091 | 23 | 418,009 | 0 | 0 | 1014_0229_inorder4-v3b106 | 全对·链闭 |
| [69](#case-69) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4444 | 19 | 273,524 | 0 | 0 | 1014_0232_inorder4-v3b107 | 全对·链闭 |
| [70](#case-70) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 213,009 | 0 | 0 | 1014_0234_inorder4-v3b108 | 全对·链闭 |
| [71](#case-71) | 1 | 1 | 1 | 1 | 1 | 1 | 0.45 | 21 | 474,511 | 0 | 0 | 1014_0236_inorder4-v3b109 | 全对·链闭 |
| [72](#case-72) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4375 | 17 | 523,662 | 0 | 0 | 1014_0238_inorder4-v3b110 | 全对·链闭 |
| [73](#case-73) | 1 | 1 | 1 | 0.8 | 0.2 | 0 | 0.4 | 16 | 187,973 | 0 | 0 | 1014_0241_inorder4-v3b111 | 结果对·链未闭 |
| [74](#case-74) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.3333 | 28 | 664,467 | 0.0741 | 0 | 1014_0243_inorder4-v3b112 | 结果对·链未闭 |
| [75](#case-75) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4211 | 20 | 270,780 | 0 | 0 | 1014_0245_inorder4-v3b113 | 结果对·链未闭 |
| [76](#case-76) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.5294 | 18 | 247,085 | 0 | 0 | 1014_0248_inorder4-v3b114 | 结果对·链未闭 |
| [77](#case-77) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4 | 16 | 216,900 | 0 | 0 | 1014_0250_inorder4-v3b115 | 结果对·链未闭 |
| [78](#case-78) | 1 | 1 | 1 | 0.8 | 0.6 | 0 | 0.4211 | 20 | 300,183 | 0 | 0 | 1014_0252_inorder4-v3b116 | 结果对·链未闭 |
| [79](#case-79) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 633,424 | 0.0526 | 0 | 1014_0254_inorder4-v3b117 | 全对·链闭 |
| [80](#case-80) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 271,594 | 0 | 0 | 1014_0256_inorder4-v3b118 | 全对·链闭 |
| [81](#case-81) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 283,198 | 0 | 0 | 1014_1226_inorder4-v3b119 | 全对·链闭 |
| [82](#case-82) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 275,600 | 0 | 0 | 1014_1230_inorder4-v3b120 | 全对·链闭 |
| [83](#case-83) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2667 | 16 | 490,099 | 0 | 0 | 1014_1234_inorder4-v3b121 | 全对·链闭 |
| [84](#case-84) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.2727 | 12 | 263,384 | 0 | 0 | 1014_1236_inorder4-v3b122 | 全对·链闭 |
| [85](#case-85) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.3333 | 13 | 273,331 | 0 | 0 | 1014_1239_inorder4-v3b123 | 全对·链闭 |
| [86](#case-86) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.3077 | 14 | 267,107 | 0 | 0 | 1014_1241_inorder4-v3b124 | 全对·链闭 |
| [87](#case-87) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 271,088 | 0 | 0 | 1014_1245_inorder4-v3b125 | 全对·链闭 |
| [88](#case-88) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.3077 | 14 | 382,918 | 0 | 0 | 1014_1247_inorder4-v3b126 | 全对·链闭 |
| [89](#case-89) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 513,025 | 0 | 0 | 1014_1250_inorder4-v3b127 | 全对·链闭 |
| [90](#case-90) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 309,910 | 0 | 0 | 1014_1252_inorder4-v3b128 | 全对·链闭 |
| [91](#case-91) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 278,540 | 0 | 0 | 1014_1255_inorder4-v3b129 | 全对·链闭 |
| [92](#case-92) | 1 | 1 | 1 | 1 | 0.6667 | 1 | 0.25 | 13 | 276,594 | 0 | 0 | 1014_1257_inorder4-v3b130 | 全对·链闭 |
| [93](#case-93) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 280,031 | 0 | 0 | 1014_1300_inorder4-v3b131 | 全对·链闭 |
| [94](#case-94) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 276,404 | 0 | 0 | 1014_1302_inorder4-v3b132 | 全对·链闭 |
| [95](#case-95) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 482,636 | 0 | 0 | 1014_1305_inorder4-v3b133 | 全对·链闭 |
| [96](#case-96) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 275,261 | 0 | 0 | 1014_1308_inorder4-v3b134 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 265,656
- **raw 日志**：[results/1012_1512_inorder4-v3b3/raw/1012_1514_trainticket-runtime-1](../results/1012_1512_inorder4-v3b3/raw/1012_1514_trainticket-runtime-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Widespread availability disruption: 14 train-ticket services (ts-notification/order-other/payment/price/route/security/station/station-food/train/train-food/travel/travel2/user/wait-order-service) are 0/1 READY in CrashLoopBackOff (RESTARTS 10) spread evenly across worker-01/02/03, with no scheduling events (PodScheduled True, no FailedScheduling/FailedCreate). Pod logs close the mechanism at the shared downstream: 'java.sql.SQLNonTransientConnectionException: Too many connections' / 'SQL Error: 1040, SQLState: 08004' when building the Hibernate SessionFactory ('Unable to open JDBC Connection 

### case-2

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1944 · steps 37 · tokens 554,007
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1850_trainticket-runtime-2](../results/1012_1846_inorder4-v3b4/raw/1012_1850_trainticket-runtime-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：13/40 train-ticket Deployments show 0/1 AVAILABLE and their pods are CrashLoopBackOff (RESTARTS=5, exit code 1) spread across worker-01/02/03; CheckServiceConnectivity to ts-user-service:12342 and ts-price-service:16579 fails from all three nodes ('Connection Failed'). Client container logs show 'HikariPool-1 - Exception during pool initialization ... java.sql.SQLNonTransientConnectionException: Too many connections' (SQL Error: 1040, SQLState: 08004) -> 'Unable to open JDBC Connection for DDL execution' -> 'Application run failed'. Server-side closure: tsdb-mysql error log contains 484 occurr

### case-3

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 535,723
- **raw 日志**：[results/1012_1923_l1l2-verify2/raw/1012_1923_trainticket-runtime-3](../results/1012_1923_l1l2-verify2/raw/1012_1923_trainticket-runtime-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: 13 DB-dependent services (ts-order-other, ts-payment, ts-price, ts-route, ts-security, ts-station-food, ts-train, ts-travel, ts-travel2, ts-user, ts-wait-order CrashLoopBackOff; ts-station-service and ts-train-food-service 0/1 Running with 4 restarts) across worker-01/02/03 all fail identically at JPA/Hibernate pool init: 'java.sql.SQLNonTransientConnectionException: Too many connections', 'SQL Error: 1040, SQLState: 08004'. Namespace events bind the mechanism to the DB: 'pod/tsdb-mysql-0 Readiness probe failed: ERROR 1040 (HY000): Too many connections' and the same for

### case-4

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 517,218
- **raw 日志**：[results/1012_1935_tidy-verify1/raw/1012_1937_trainticket-runtime-4](../results/1012_1935_tidy-verify1/raw/1012_1937_trainticket-runtime-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket shows a cluster-wide reachability break, not a node/app-local one: 13 business pods (ts-price, ts-route, ts-security, ts-station, ts-station-food, ts-train, ts-train-food, ts-travel, ts-travel2, ts-user, ts-wait-order, ts-order-other, ts-payment) are in CrashLoopBackOff spread across worker-01/02/03, with no FailedScheduling/FailedCreate/FailedMount/image-pull events. Caller-side logs (ts-price-service, ts-user-service) show HikariPool-1 pool initialization failing with java.sql.SQLNonTransientConnectionException 'Too many connections' (SQL Error 1040, SQLState 08004), w

### case-5

- **结论**：`app/tsdb-mysql` + `db_connection_exhaustion` ｜ 标签 `app/tsdb-mysql` + `db_connection_exhaustion`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.1429 · steps 36 · tokens 800,099
- **raw 日志**：[results/1012_2000_case-verify1/raw/1012_2004_trainticket-runtime-5](../results/1012_2000_case-verify1/raw/1012_2004_trainticket-runtime-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：Shared DB tsdb-mysql is up and TCP-reachable (tsdb-mysql-leader endpoint 172.20.3.55:3306 on leader pod tsdb-mysql-2; connectivity test from all three nodes: 'open / Connection Succeeded'), but it refuses new sessions: its own log is 337/1470 lines (23%) of '[Warning] Too many connections' and its readiness probe fails with 'ERROR 1040 (HY000): Too many connections'. Consequently 10 deployments (ts-route/ts-security/ts-station/ts-station-food/ts-train/ts-train-food/ts-travel/ts-travel2/ts-user/ts-wait-order-service) are 0/1 AVAILABLE with pods Error/CrashLoopBackOff (3 restarts, BackOff events

### case-6

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3182 · steps 23 · tokens 477,041
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1137_trainticket-runtime-6](../results/1013_1134_inorder4-v3b10/raw/1013_1137_trainticket-runtime-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: alerts show 52x 500 on POST /api/v1/inside_pay_service/inside_payment (ts-inside-payment-service) and 9x 500 on POST /api/v1/preserveservice/preserve (ts-preserve-service). Caller logs trace the failures one hop down: ts-inside-payment-service -> 'HttpServerErrorException: 500 ... path:/api/v1/paymentservice/payment' (65x) and ts-preserve-service -> '500 ... path:/api/v1/orderservice/order' (9x). The downstream writer services themselves carry the decisive mechanism: ts-payment-service and ts-order-service both log 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server 

### case-7

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.381 · steps 22 · tokens 521,337
- **raw 日志**：[results/1013_1235_inorder4-v3b12/raw/1013_1237_trainticket-runtime-7](../results/1013_1235_inorder4-v3b12/raw/1013_1237_trainticket-runtime-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with zero restarts, so the break is not probe/scheduling/startup. Caller-side logs pin the mechanism: ts-payment-service and ts-order-service both emit 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (68 and 54 occurrences), then throw JpaSystemException 'could not execute statement' and return HTTP 500. These 500s propagate upward exactly along the reported alerts: ts-inside-payment-service -> /api/v1/paymentservice/payment (54x 'Process payment' 500) and ts-preserve-servic

### case-8

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 37 · tokens 631,353
- **raw 日志**：[results/1013_1343_inorder4-v3b14/raw/1013_1344_trainticket-runtime-8](../results/1013_1343_inorder4-v3b14/raw/1013_1344_trainticket-runtime-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alerts point to ts-inside-payment-service ('Process payment') and ts-preserve-service ('Create ticket order') returning HTTPError 500; their caller logs show downstream 500s from /api/v1/paymentservice/payment (ts-payment-service) and /api/v1/orderservice/order (ts-order-service) plus 'getTickets failed'. Object layer is clean: all 51 pods 1/1 Running, no Pending/CrashLoop/ImagePull/Mount anomalies, and no FailedCreate/FailedScheduling/FailedMount events in the namespace. The break is at the statement level: ts-payment-service (68x) and ts-order-service (52x) both log 'SQL Error:

### case-9

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4074 · steps 28 · tokens 644,230
- **raw 日志**：[results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-runtime-9](../results/1013_1503_inorder4-v3b16/raw/1013_1505_trainticket-runtime-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 51 pods are Running/Ready with no Pending/FailedCreate/FailedMount/image-pull outlier, excluding scheduling, admission, image and probe faults; the break is in the data layer. Alerts show HTTP 500 on POST /api/v1/inside_pay_service/inside_payment (ts-inside-payment-service, 53x) and /api/v1/preserveservice/preserve (ts-preserve-service, 14x). Caller logs show downstream 500s: ts-inside-payment-service -> /api/v1/paymentservice/payment 500, ts-preserve-service -> /api/v1/orderservice/order 500. The named downstream services' own logs carry the mechanism verbatim: ts-payment-service (66x) an

### case-10

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3913 · steps 24 · tokens 409,060
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1525_trainticket-runtime-10](../results/1013_1524_inorder4-v3b18/raw/1013_1525_trainticket-runtime-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are 1/1 Running with 0 restarts (no scheduling/startup/probe breakpoint). Alerts point to 500s on ts-inside-payment-service (/api/v1/paymentservice/payment) and ts-preserve-service (/api/v1/orderservice/order). Downstream logs name the mechanism verbatim: ts-payment-service and ts-order-service both log 'o.h.engine.jdbc.spi.SqlExceptionHelper: SQL Error: 1290, SQLState: HY000' and 'The MySQL server is running with the --read-only option so it cannot execute this statement', then 'JpaSystemException: could not execute statement' -> HTTP 500. The write path is pinned by con

### case-11

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 23 · tokens 347,660
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-runtime-11](../results/1013_1541_inorder4-v3b20/raw/1013_1543_trainticket-runtime-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：All pods are 1/1 Running with no Pending/crash/probe outliers, ruling out scheduling/startup/probe breaks. The reachability chain breaks on the DB write path: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (62x, then JpaSystemException 'could not execute statement'), and ts-order-service logs the identical read-only rejection (44x) — two independent writers, each with its own Secret both pointing at tsdb-mysql-leader:3306, are rejected by the same server, so the break is not service-loca

### case-12

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 22 · tokens 554,907
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1630_trainticket-runtime-12](../results/1013_1628_inorder4-v3b22/raw/1013_1630_trainticket-runtime-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show HTTP 500 on 'Process payment' (ts-inside-payment-service) and 'Create ticket order' (ts-preserve-service). Caller logs pin the downstream targets: ts-preserve-service -> ts-order-service /api/v1/orderservice/order 500, ts-inside-payment-service -> ts-payment-service /api/v1/paymentservice/payment 500. Those target pods are 1/1 Running, 0 restarts, probes passing, but their own error logs show 'SQL Error: 1290, SQLState: HY000' / 'The MySQL server is running with the --read-only option so it cannot execute this statement' (52x and 67x) followed by JpaSystemException could not execut

### case-13

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2759 · steps 30 · tokens 476,723
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1657_trainticket-runtime-13](../results/1013_1656_inorder4-v3b25/raw/1013_1657_trainticket-runtime-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are Running/Ready with 0 restarts (no scheduling/startup/probe break), and TCP connectivity to tsdb-mysql-leader:3306 succeeds from every worker. The break is at the persistence layer: two independent services report SQL Error 1290 / SQLState HY000 'The MySQL server is running with the --read-only option so it cannot execute this statement' (ts-payment-service 68x, ts-order-service 56x), surfacing as JpaSystemException/GenericJDBCException -> HTTP 500 cascading to ts-inside-payment-service (54x 'Process payment') and ts-preserve-service (12x 'Create ticket order'). Servic

### case-14

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3684 · steps 39 · tokens 875,225
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1815_trainticket-runtime-14](../results/1013_1810_inorder4-v3b27/raw/1013_1815_trainticket-runtime-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 43 deployments are 1/1 AVAILABLE, all pods Running/Ready with bound Service endpoints, and all 4 nodes Ready with no cordon/taints; namespace events show no FailedScheduling/FailedCreate/FailedMount/image-pull/probe warnings, ruling out scheduling, admission, image, probe and addressing faults. The break is at the database write path: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (69x) leading to JpaSystemException -> HTTP 500, and ts-order-service logs the identical 1290/--read-onl

### case-15

- **结论**：`app/tsdb-mysql` + `db_readonly_mode` ｜ 标签 `app/tsdb-mysql` + `db_readonly_mode`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2692 · steps 27 · tokens 490,757
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1836_trainticket-runtime-15](../results/1013_1834_inorder4-v3b30/raw/1013_1836_trainticket-runtime-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：All train-ticket pods are Running and 1/1 ready (no restarts, no Pending/FailedScheduling/FailedCreate/FailedMount/image-pull events), and tsdb-mysql-leader:3306 is TCP-open from worker-01/02/03, so the break is not scheduling, networking, DNS, Service-selector or port mapping. The alerts (Process payment / Create ticket order, 500) are only pointers; the caller-side logs descend one leaf: ts-payment-service logs 'SQL Error: 1290, SQLState: HY000' + 'The MySQL server is running with the --read-only option so it cannot execute this statement' (67x) and ts-order-service logs the identical 1290/r

### case-16

- **结论**：`app/ts-assurance-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-assurance-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1538 · steps 14 · tokens 260,976
- **raw 日志**：[results/1013_1845_triple-verify1/raw/1013_1846_trainticket-runtime-16](../results/1013_1845_triple-verify1/raw/1013_1846_trainticket-runtime-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: GET /api/v1/assuranceservice/assurances/types -> 'HTTPError(503 Server Error: Service Unavailable)' on entry service ts-assurance-service. Inventory: no ts-assurance-service pod exists while every other train-ticket workload is 2/2 Running with 0 restarts. Victim signal: endpoints/ts-assurance-service = <none>, and caller-side ts-gateway-service logs repeat 'No servers available for service: ts-assurance-service'. Workload break: Deployment ts-assurance-service spec.replicas=0 (generation 2) although its stored last-applied config and GetAppYAML specify replicas=1. Mechanism event: 'Sca

### case-17

- **结论**：`app/ts-basic-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-basic-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.125 · steps 25 · tokens 613,053
- **raw 日志**：[results/1013_2235_inorder4-v3b54/raw/1013_2237_trainticket-runtime-17](../results/1013_2235_inorder4-v3b54/raw/1013_2237_trainticket-runtime-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side trail: ts-preserve-service logs 500 from '/api/v1/travelservice/trip_detail' (alert 'Create ticket order'), and ts-travel-service itself throws 'java.lang.IllegalArgumentException: Service Instance cannot be null' with '[query][Travel Query Fail][Something null]' - a discovery lookup returning no instance. Object layer: ts-basic-service (a direct callee of ts-travel-service) has NO pod in the train-ticket pods listing, and its Deployment reads 0/0; live Deployment YAML shows spec.replicas: 0 with last-applied-configuration replicas:1. Mechanism event verbatim: 'ScalingReplicaSet de

### case-18

- **结论**：`app/ts-contacts-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-contacts-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 193,963
- **raw 日志**：[results/1013_2240_inorder4-v3b55/raw/1013_2243_trainticket-runtime-18](../results/1013_2240_inorder4-v3b55/raw/1013_2243_trainticket-runtime-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom pointer: alerts on ts-contacts-service report HTTP 503 Service Unavailable (20x each on GET /api/v1/contactservice/contacts/account/{userId} and POST /api/v1/contactservice/contacts), and an active TCP probe against the Service-declared port 12347 fails from worker-01/02/03 ('Connection Failed'). The victim's own signal shows the break: 'ts-contacts-service ENDPOINTS <none>', and the pod inventory contains no ts-contacts-service pod although all other 41 business pods are 2/2 Running. The owner chain isolates the single outlier: deployment ts-contacts-service is 0/0 (0 up-to-date, 0 av

### case-19

- **结论**：`app/ts-food-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-food-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1071 · steps 29 · tokens 389,833
- **raw 日志**：[results/1013_2245_inorder4-v3b56/raw/1013_2246_trainticket-runtime-19](../results/1013_2245_inorder4-v3b56/raw/1013_2246_trainticket-runtime-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: ts-preserve-service logs 'java.lang.IllegalArgumentException: Service Instance cannot be null' (a downstream call resolving to no instance), with alerts on /preserveservice/preserve (10x 500). The namespace pod inventory has no outlier except the complete absence of any ts-food-service pod while all other ts-* workloads run 2/2. Probing every downstream of ts-preserve-service on the port its Service declares: all 9 others (ts-basic 15680, ts-security 11188, ts-contacts 12347, ts-user 12342, ts-travel 12346, ts-seat 18898, ts-assurance 18888, ts-consign 16111, ts-order 12031

### case-20

- **结论**：`app/ts-gateway-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-gateway-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 519,918
- **raw 日志**：[results/1013_2249_inorder4-v3b57/raw/1013_2250_trainticket-runtime-20](../results/1013_2249_inorder4-v3b57/raw/1013_2250_trainticket-runtime-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: ts-ui-dashboard caller logs repeat 'POST /api/v1/users/login HTTP/1.1" 503' (alert: 30x HTTPError 503 Service Unavailable on /api/v1/users/login), while connectivity probes show ts-auth-service:12340 open from worker-01/02/03 but ts-gateway-service:18888 Connection Failed from all three nodes. Object-layer scan shows the single outlier: deployment ts-gateway-service is 0/0 (UP-TO-DATE 0, AVAILABLE 0) while all other 43 workloads are 1/1, and endpoints list shows 'ts-gateway-service <none>' whereas every other service has bound endpoint IPs. Mechanism event (named on the obj

### case-21

- **结论**：`app/ts-inside-payment-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-inside-payment-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.3636 · steps 12 · tokens 255,702
- **raw 日志**：[results/1013_2253_inorder4-v3b58/raw/1013_2255_trainticket-runtime-21](../results/1013_2253_inorder4-v3b58/raw/1013_2255_trainticket-runtime-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：All 41 other train-ticket workloads run 2/2 Running with 0 restarts, while ts-inside-payment-service has NO pod in the inventory. Its owner chain is the break: the live Deployment reports 'Replicas: 0 desired | 0 updated | 0 total | 0 available' and the deployments listing shows 'ts-inside-payment-service 0/0 0 0' (GetAppYAML template still declares replicas: 1, so the replica count was actually set to 0). Controller events confirm the mechanism verbatim: 'ScalingReplicaSet ... Scaled down replica set ts-inside-payment-service-5b98976c87 to 0 from 1' plus 'Deleted pod: ts-inside-payment-servic

### case-22

- **结论**：`app/ts-order-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-order-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 409,364
- **raw 日志**：[results/1013_2258_inorder4-v3b59/raw/1013_2301_trainticket-runtime-22](../results/1013_2258_inorder4-v3b59/raw/1013_2301_trainticket-runtime-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' on namespace train-ticket localizes to ts-order-service. Alerts report 503 Service Unavailable on ts-order-service endpoints (Refresh order list / Refresh orders for cancel, 20 occurrences each) and 500 from upstream ts-preserve-service. The namespace-wide pod inventory (the legitimate full scan) shows every other workload Running 2/2 with 0 restarts, while ts-order-service has NO pod at all (GetResources pods → NotFound) and no logs. Reachability is broken exactly on its own declared port: CheckServiceConnectivity ts-order-service:12031 fails from wo

### case-23

- **结论**：`app/ts-payment-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-payment-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 205,969
- **raw 日志**：[results/1013_2303_inorder4-v3b60/raw/1013_2305_trainticket-runtime-23](../results/1013_2303_inorder4-v3b60/raw/1013_2305_trainticket-runtime-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain closed on ts-payment-service. (1) Symptom side: no pod exists for ts-payment-service in the pods inventory while every other pod is Running 2/2, and CheckServiceConnectivity on its Service-declared port 19001 fails from all three workers (worker-01/02/03: Connection Failed). (2) Endpoints listing: 'ts-payment-service   <none>'. (3) Owner chain break: live Deployment 'ts-payment-service' reads READY 0/0, UP-TO-DATE 0, AVAILABLE 0, and its live spec.replicas is 0 (generation 2) whereas kubectl.kubernetes.io/last-applied-configuration still declares replicas: 1. (4) Mechanism e

### case-24

- **结论**：`app/ts-preserve-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-preserve-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 362,268
- **raw 日志**：[results/1013_2308_inorder4-v3b61/raw/1013_2309_trainticket-runtime-24](../results/1013_2308_inorder4-v3b61/raw/1013_2309_trainticket-runtime-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetAlerts shows 20x 'HTTPError 503 Server Error: Service Unavailable' on POST /api/v1/preserveservice/preserve with entry service ts-preserve-service. Object layer: pods listing shows all 45 train-ticket workloads Running 2/2 with 0 restarts and NO ts-preserve-service pod at all (only ts-preserve-other-service exists). Endpoints listing shows ts-preserve-service ENDPOINTS=<none> while all 44 other services have endpoints; TCP connectivity probe on its own declared port 14568 fails from worker-01/02/03 ('Connection Failed'). Its Service object is correctly configured (selector app

### case-25

- **结论**：`app/ts-price-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-price-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.1111 · steps 19 · tokens 320,076
- **raw 日志**：[results/1013_2311_inorder4-v3b62/raw/1013_2313_trainticket-runtime-25](../results/1013_2311_inorder4-v3b62/raw/1013_2313_trainticket-runtime-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: ts-preserve-service 'Create ticket order' and ts-inside-payment-service return HTTP 500. Walking the 500 trail outward from the complaint: ts-preserve-service errors on /api/v1/travelservice/trip_detail -> ts-travel-service errors on /api/v1/basicservice/basic/travel -> ts-basic-service throws java.lang.IllegalArgumentException: 'Service Instance cannot be null' (its service-discovery lookup for a downstream callee returned no instance). Object layer: ts-price-service, one of ts-basic-service's four callees (ts-route-service, ts-station-service, ts-train-service, ts-price-service), is t

### case-26

- **结论**：`app/ts-route-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-route-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 26 · tokens 531,205
- **raw 日志**：[results/1013_2315_inorder4-v3b63/raw/1013_2318_trainticket-runtime-26](../results/1013_2315_inorder4-v3b63/raw/1013_2318_trainticket-runtime-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom chain walks the reachability path: alert ts-preserve-service POST /api/v1/preserveservice/preserve 500 -> its log shows 500 from ts-travel-service /api/v1/travelservice/trip_detail -> ts-travel-service log shows 500 from ts-basic-service /api/v1/basicservice/basic/travel -> ts-basic-service log shows 'java.lang.IllegalArgumentException: Service Instance cannot be null', i.e. its Nacos lookup for a downstream instance returns null. Object layer localizes it: in the namespace endpoints listing, ts-route-service is the ONLY one of 47 services with ENDPOINTS <none>, and no pod with label a

### case-27

- **结论**：`app/ts-seat-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-seat-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 507,364
- **raw 日志**：[results/1013_2320_inorder4-v3b64/raw/1013_2323_trainticket-runtime-27](../results/1013_2320_inorder4-v3b64/raw/1013_2323_trainticket-runtime-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry by inventory (symptom named no service): ts-seat-service is the sole outlier - it has a Service object (10.68.172.20:18898) but NO pod at all. Its own signal: connectivity probe to ts-seat-service:18898 fails from worker-01/02/03 ('Connection Failed'). Owner chain: deployment ts-seat-service shows READY 0/0, UP-TO-DATE 0, AVAILABLE 0 (all other workloads 1/1), and GetResources(pods,name=ts-seat-service)=NotFound (not Pending/FailedScheduling). Configuration face: deployment spec.replicas=0 (generation 2, while last-applied-configuration had replicas 1). Mechanism event binds it verbatim:

### case-28

- **结论**：`app/ts-security-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-security-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 537,254
- **raw 日志**：[results/1013_2325_inorder4-v3b65/raw/1013_2328_trainticket-runtime-28](../results/1013_2325_inorder4-v3b65/raw/1013_2328_trainticket-runtime-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: ts-preserve-service's own caller-side error logs carry 'java.lang.IllegalArgumentException: Service Instance cannot be null' (no service instance found in discovery), matching alert 'POST /api/v1/preserveservice/preserve -> 500'. Workload inventory (pods wide): all 44 pods are Running 2/2 with 0 restarts; the ONLY business service with no pod at all is ts-security-service. Deployments listing: ts-security-service reads '0/0  0  0' (every other app 1/1). Endpoints listing: ts-security-service = <none>. Connectivity probe on ts-security-service's own declared port 11188 fails

### case-29

- **结论**：`app/ts-station-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-station-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.125 · steps 33 · tokens 1,450,360
- **raw 日志**：[results/1013_2331_inorder4-v3b66/raw/1013_2334_trainticket-runtime-29](../results/1013_2331_inorder4-v3b66/raw/1013_2334_trainticket-runtime-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom wording named no service, so the object-layer inventory was the valid entry: the pods listing contains NO ts-station-service pod at all, and the deployments listing shows the sole outlier 'ts-station-service 0/0 0 0' while all other 41 workloads read 1/1 AVAILABLE. Mechanism closed on the deployment surface: DescribeResource(deployment/ts-station-service) = 'Replicas: 0 desired | 0 updated | 0 total | 0 available', with event 'Scaled down replica set ts-station-service-7cbf6b96c9 to 0 from 1', while its own manifest (GetAppYAML) still declares 'replicas: 1' - a live-vs-declared drift =

### case-30

- **结论**：`app/ts-train-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-train-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.125 · steps 25 · tokens 740,589
- **raw 日志**：[results/1013_2337_inorder4-v3b67/raw/1013_2338_trainticket-runtime-30](../results/1013_2337_inorder4-v3b67/raw/1013_2338_trainticket-runtime-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom names no service, so the pods inventory (wide) was the entry: every ts-* workload is 2/2 Running except that NO ts-train-service pod exists at all, and the deployments listing shows ts-train-service as the only outlier at '0/0 0 0' while all peers are '1/1 1 1'. DescribeResource(deployment/ts-train-service) confirms the live spec: 'Replicas: 0 desired | 0 updated | 0 total | 0 available | 0 unavailable', NewReplicaSet ts-train-service-c4fb58df9 '(0/0 replicas created)', with events 'Scaled up ... to 1' at 6m10s then 'Scaled down replica set ts-train-service-c4fb58df9 to 0 from 1' at 3m

### case-31

- **结论**：`app/ts-travel-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-travel-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.5 · ECR 1 · EE 0.2308 · steps 14 · tokens 442,451
- **raw 日志**：[results/1014_0009_inorder4-v3b69/raw/1014_0010_trainticket-runtime-31](../results/1014_0009_inorder4-v3b69/raw/1014_0010_trainticket-runtime-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts name ts-travel-service: POST /api/v1/travelservice/trips/left -> 503 Service Unavailable (11x). Pods listing has NO ts-travel-service pod while all other 41 train-ticket workloads are 2/2 Running with 0 restarts; deployments listing shows ts-travel-service 0/0 (desired replicas = 0) vs 1/1 for every other deployment. Namespace events carry the mechanism verbatim on the named object: '4m59s Normal ScalingReplicaSet deployment/ts-travel-service Scaled down replica set ts-travel-service-5b9b99c879 to 0 from 1' + 'SuccessfulDelete ... Deleted pod: ts-travel-service-5b9b99c879-fqqh9', with n

### case-32

- **结论**：`app/ts-user-service` + `deployment_zero_replicas` ｜ 标签 `app/ts-user-service` + `deployment_zero_replicas`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 603,093
- **raw 日志**：[results/1014_0012_inorder4-v3b70/raw/1014_0012_trainticket-runtime-32](../results/1014_0012_inorder4-v3b70/raw/1014_0012_trainticket-runtime-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert on ts-preserve-service /api/v1/preserveservice/preserve (500, 10x) and caller log 'java.lang.IllegalArgumentException: Service Instance cannot be null'; ts-preserve-service's dependency list includes ts-user-service. Namespace-wide pod scan: every other service is 2/2 Running, but no ts-user-service pod exists at all. Address layer: Endpoints for ts-user-service = <none>, and active TCP probes to ts-user-service:12342 fail from worker-01, worker-02 and worker-03. Workload state: deployment ts-user-service reports READY 0/0, UP-TO-DATE 0, AVAILABLE 0. Event surface: '4m58s N

### case-33

- **结论**：`app/ts-assurance-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-assurance-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 435,734
- **raw 日志**：[results/1014_0016_inorder4-v3b71/raw/1014_0017_trainticket-runtime-33](../results/1014_0016_inorder4-v3b71/raw/1014_0017_trainticket-runtime-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory shows exactly one outlier in train-ticket: ts-assurance-service-85577d9b4d-wbm7b is 0/1 CrashLoopBackOff with 4 restarts, and the alert names the same service (503 on /api/v1/assuranceservice/assurances/types, 70 occurrences). Its container logs show HikariPool-1 pool initialization failure: 'SQL Error: 1045, SQLState: 28000', 'Access denied for user ts@172.20.2.87 (using password: YES)', captured by Hibernate as 'Unable to open JDBC Connection for DDL execution', ending in 'Application run failed'; the pod sheet confirms state Waiting/CrashLoopBackOff with Last State Terminated Reas

### case-34

- **结论**：`app/ts-auth-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-auth-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.25 · ECR 0 · EE 0.2857 · steps 15 · tokens 432,222
- **raw 日志**：[results/1014_0021_inorder4-v3b72/raw/1014_0022_trainticket-runtime-34](../results/1014_0021_inorder4-v3b72/raw/1014_0022_trainticket-runtime-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Sole outlier in the train-ticket namespace is pod ts-auth-service-7689b8d556-hdx9x (0/1 CrashLoopBackOff, 4 restarts), matching the only alert (entry_service=ts-auth-service, POST /api/v1/users/login, 370x HTTPError 503). Its own log stream gives the mechanism verbatim: 'Caused by: java.sql.SQLException: Access denied for user ts@172.20.2.227 (using password: YES)' after 'Unable to open JDBC Connection for DDL execution' / 'Unable to build Hibernate SessionFactory', and the container terminates with Exit Code 1 (Warning BackOff). Connectivity to tsdb-mysql-leader:3306 succeeds from all three w

### case-35

- **结论**：`app/ts-config-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-config-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3571 · steps 15 · tokens 413,155
- **raw 日志**：[results/1014_0029_inorder4-v3b73/raw/1014_0030_trainticket-runtime-35](../results/1014_0029_inorder4-v3b73/raw/1014_0030_trainticket-runtime-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-config-service is abnormal in namespace train-ticket: pod ts-config-service-778646698d-x8zd7 is 0/1 CrashLoopBackOff with 4 restarts (Last State: Terminated, Reason: Error, Exit Code: 1) while all other 47 pods are 1/1 Running. Its pod events show a clean Scheduled -> Pulled -> Created -> Started sequence followed by 'Back-off restarting failed container', i.e. the app itself exits, not a scheduling/pull/mount/probe failure. Container logs (current + previous) show the mechanism verbatim: 'java.sql.SQLException: Access denied for user ts@172.20.1.76 (using password: YES)', 'HikariPool-

### case-36

- **结论**：`app/ts-contacts-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-contacts-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 443,882
- **raw 日志**：[results/1014_0035_inorder4-v3b74/raw/1014_0036_trainticket-runtime-36](../results/1014_0035_inorder4-v3b74/raw/1014_0036_trainticket-runtime-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing shows the sole outlier: ts-contacts-service-878884888-g7blb 0/1 CrashLoopBackOff (4 restarts) while all other 47 workloads are 1/1 Running; GetAlerts names ts-contacts-service as entry_service with GET /api/v1/contactservice/contacts/account/{userId} -> HTTPError('503 Server Error') (91x) plus cascaded 500 from ts-preserve-service. Pod record: Last State Terminated/Error exit code 1, Ready False; events carry 'Warning BackOff ... failed container ts-contacts-service'. Error logs: 'SQL Error: 1045, SQLState: 28000' / "java.sql.SQLException: Access denied for user 'ts'@'172.20.2.147

### case-37

- **结论**：`app/ts-delivery-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-delivery-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3077 · steps 14 · tokens 300,556
- **raw 日志**：[results/1014_0041_inorder4-v3b75/raw/1014_0042_trainticket-runtime-37](../results/1014_0041_inorder4-v3b75/raw/1014_0042_trainticket-runtime-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-delivery-service-787cbf858d-lt9ss is the only outlier (0/1, CrashLoopBackOff, 4 restarts, Last State Terminated Reason=Error ExitCode=1, node worker-03); its own logs carry the mechanism: 'Access denied for user ts@172.20.3.207 (using password: YES)' / 'SQL Error: 1045, SQLState: 28000' -> HikariPool-1 Exception during pool initialization -> Failed to initialize JPA EntityManagerFactory -> 'Application run failed'. Its Service ts-delivery-service declares port 18808/targetPort 18808 with selector app=ts-delivery-service (addressing intact), and the pod has no FailedCreate/FailedMount/im

### case-38

- **结论**：`app/ts-food-delivery-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-food-delivery-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 338,478
- **raw 日志**：[results/1014_0046_inorder4-v3b76/raw/1014_0046_trainticket-runtime-38](../results/1014_0046_inorder4-v3b76/raw/1014_0046_trainticket-runtime-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace-wide pod inventory is ts-food-delivery-service-d7f948cf4-q5jjp (0/1 READY, CrashLoopBackOff, 4 restarts, node worker-01). Its pod sheet shows Last State Terminated/Reason Error/Exit Code 1 (not OOMKilled 137), image already present, no FailedScheduling/FailedMount/probe events -> startup-phase failure. Container logs show HikariPool-1 pool initialization failing with java.sql.SQLException: Access denied for user 'ts'@'172.20.1.16' (using password: YES), SQL Error 1045 / SQLState 28000, which cascades to 'Failed to initialize JPA EntityManagerFactory' and 'Applicat

### case-39

- **结论**：`app/ts-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.25 · steps 17 · tokens 425,727
- **raw 日志**：[results/1014_0048_inorder4-v3b77/raw/1014_0050_trainticket-runtime-39](../results/1014_0048_inorder4-v3b77/raw/1014_0050_trainticket-runtime-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service-6bdb8b7ddb-dm8sx is the only outlier in the train-ticket pods listing (READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4) and its Service endpoints list is empty. DescribeResource(pod) shows Last State Terminated/Reason Error/Exit Code 1 with event 'Back-off restarting failed container ts-food-service', and GetErrorLogs shows the startup crash cause verbatim: 'HikariPool-1 - Exception during pool initialization', 'java.sql.SQLException: Access denied for user ts@172.20.2.124 (using password: YES)', 'SQL Error: 1045, SQLState: 28000', 'Failed to initialize JPA EntityManagerFactory:

### case-40

- **结论**：`app/ts-inside-payment-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-inside-payment-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3333 · steps 13 · tokens 293,034
- **raw 日志**：[results/1014_0051_inorder4-v3b78/raw/1014_0052_trainticket-runtime-40](../results/1014_0051_inorder4-v3b78/raw/1014_0052_trainticket-runtime-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: exactly one workload is unhealthy — pod ts-inside-payment-service-5d5bd5c84d-cp9g6 is 0/1 CrashLoopBackOff with 4 restarts, Last State Terminated/Error/exit 1 (not OOMKilled), and the active Warning row in the namespace events is 'BackOff restarting failed container ts-inside-payment-service'. The alert points at the same service (POST /api/v1/inside_pay_service/inside_payment -> HTTPError 503). Its logs show the break at the credential stage, not the transport stage: 'HikariPool-1 - Exception during pool initialization' / 'java.sql.SQLException: Access denied for user 

### case-41

- **结论**：`app/ts-notification-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-notification-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 25 · tokens 730,032
- **raw 日志**：[results/1014_0054_inorder4-v3b79/raw/1014_0055_trainticket-runtime-41](../results/1014_0054_inorder4-v3b79/raw/1014_0055_trainticket-runtime-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace train-ticket the pods inventory shows exactly one outlier: pod ts-notification-service-675d7d65b4-lgcfw is 0/1 CrashLoopBackOff with 4 restarts (all other 44 ts-* workloads are 1/1 Running). Its own signal leads: container logs show 'java.sql.SQLException: Access denied for user ts@172.20.1.137 (using password: YES)', 'SQL Error: 1045, SQLState: 28000', HikariPool-1 pool initialization failure and 'Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connection for DDL execution', i.e. MySQL rejects the supplied credential at startup, Spring aborts ('Application r

### case-42

- **结论**：`app/ts-order-other-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-order-other-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 746,246
- **raw 日志**：[results/1014_0104_inorder4-v3b80/raw/1014_0105_trainticket-runtime-42](../results/1014_0104_inorder4-v3b80/raw/1014_0105_trainticket-runtime-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan of train-ticket showed exactly one outlier: pod ts-order-other-service-77f574b58b-sxg86 0/1 CrashLoopBackOff (4 restarts), mirrored at workload level by deployment ts-order-other-service 0/1 AVAILABLE while all other deployments are 1/1. Its own logs/sheet give the mechanism: java.sql.SQLException: Access denied for user 'ts'@'172.20.2.194' (using password: YES), SQL Error 1045 / SQLState 28000, HikariPool-1 pool init failure, JPA EntityManagerFactory init failure, container Terminated with Exit Code 1 and repeated BackOff restarts -> the service never becomes Ready, so its Serv

### case-43

- **结论**：`app/ts-order-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-order-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.2353 · steps 18 · tokens 217,757
- **raw 日志**：[results/1014_0108_inorder4-v3b81/raw/1014_0109_trainticket-runtime-43](../results/1014_0108_inorder4-v3b81/raw/1014_0109_trainticket-runtime-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-order-service is down: pod ts-order-service-57d9f6ffbd-2p24f is 0/1 CrashLoopBackOff with 4 restarts, Last State Terminated/Error/Exit Code 1, readiness tcp-socket :12031 never passing, and event 'Warning BackOff Back-off restarting failed container ts-order-service'. Its container logs show the mechanism verbatim: 'HikariPool-1 - Exception during pool initialization', 'java.sql.SQLException: Access denied for user 'ts'@'172.20.2.81' (using password: YES)' (SQL Error 1045 / SQLState 28000, i.e. credentials rejected, not a network or pool-exhaustion error), then 'Failed to initialize JP

### case-44

- **结论**：`app/ts-payment-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-payment-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.25 · steps 13 · tokens 310,952
- **raw 日志**：[results/1014_0118_inorder4-v3b82/raw/1014_0118_trainticket-runtime-44](../results/1014_0118_inorder4-v3b82/raw/1014_0118_trainticket-runtime-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert: 'Process payment' POST /api/v1/inside_pay_service/inside_payment via ts-inside-payment-service returns 500 (13x). Caller log (ts-inside-payment-service) repeats java.lang.IllegalArgumentException: Service Instance cannot be null, i.e. its downstream callee is unavailable; GetServiceDependencies(ts-inside-payment-service) confirms the callee is ts-payment-service. Pods listing (train-ticket, wide) shows a single outlier among 46 pods: ts-payment-service-76d7d44b5b-xjcsw 0/1 CrashLoopBackOff, 4 restarts; endpoints/ts-payment-service is EMPTY (no ready address). Namespace events: 'Warning 

### case-45

- **结论**：`app/ts-price-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-price-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.2 · steps 26 · tokens 336,856
- **raw 日志**：[results/1014_0122_inorder4-v3b83/raw/1014_0122_trainticket-runtime-45](../results/1014_0122_inorder4-v3b83/raw/1014_0122_trainticket-runtime-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket pod inventory: ts-price-service-69f84bfbc4-lhrjp 0/1 CrashLoopBackOff (Exit Code 1, Ready False, Warning BackOff from kubelet). Its own signal confirms real unavailability: endpoints/ts-price-service has an empty ENDPOINTS column and the TCP probe on its own declared port 16579 (taken from its Service spec) fails from worker-01/02/03. Mechanism is verbatim in its logs: 'java.sql.SQLException: Access denied for user ts@172.20.2.93 (using password: YES)', SQL Error 1045 / SQLState 28000 during HikariPool initialization, killing the Spring context ('Application ru

### case-46

- **结论**：`app/ts-route-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-route-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 318,741
- **raw 日志**：[results/1014_0124_inorder4-v3b84/raw/1014_0125_trainticket-runtime-46](../results/1014_0124_inorder4-v3b84/raw/1014_0125_trainticket-runtime-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: only ts-route-service-84fdb67598-lctt7 is anomalous (0/1 CrashLoopBackOff, 4 restarts; all other ~50 pods 1/1 Running incl. tsdb-mysql). Pod detail: Last State Terminated, Reason Error, Exit Code 1, BackOff events (kubelet) latest 86s ago. Its container logs repeat 'java.sql.SQLException: Access denied for user 'ts'@'172.20.2.66' (using password: YES)' / 'SQL Error: 1045, SQLState: 28000' / 'Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connection for DDL execution' / 'Application run failed' => startup fails on MySQL authentication, readiness pr

### case-47

- **结论**：`app/ts-security-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-security-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 19 · tokens 429,506
- **raw 日志**：[results/1014_0130_inorder4-v3b85/raw/1014_0131_trainticket-runtime-47](../results/1014_0130_inorder4-v3b85/raw/1014_0131_trainticket-runtime-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert pointer: ts-preserve-service POST /api/v1/preserveservice/preserve returns 500 (94 occurrences). Topology walk from the symptom side shows ts-preserve-service calls ts-security-service. Inventory outlier: ts-security-service-64cb5fb74d-w7425 is 0/1 CrashLoopBackOff with 4 restarts, Last State Terminated Reason=Error Exit Code=1; the sibling replica gbgb8 shows the same BackOff. Container logs name the mechanism verbatim: 'java.sql.SQLException: Access denied for user 'ts'@'172.20.1.36' (using password: YES)', 'SQL Error: 1045, SQLState: 28000', 'HikariPool-1 - Exception during pool initi

### case-48

- **结论**：`app/ts-station-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-station-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4286 · steps 15 · tokens 220,649
- **raw 日志**：[results/1014_0141_inorder4-v3b86/raw/1014_0142_trainticket-runtime-48](../results/1014_0141_inorder4-v3b86/raw/1014_0142_trainticket-runtime-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket: ts-station-food-service is the sole workload outlier — pod ts-station-food-service-68497bf65b-pdhfm on worker-02 shows 0/1 READY, CrashLoopBackOff, Restart Count 4, last termination Exit Code 1, and its Service ts-station-food-service has an EMPTY endpoints list, with TCP 18855 connectivity failing from worker-01/02/03 (partial unreachability of that service). Owner chain (Deployment/ReplicaSet 68497bf65b) is healthy and scheduling/image/mount are normal (events: Scheduled/Pulled/Created/Started then Warning BackOff). Container logs give the mechanism verbatim: 'java.sq

### case-49

- **结论**：`app/ts-station-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-station-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 440,500
- **raw 日志**：[results/1014_0147_inorder4-v3b87/raw/1014_0148_trainticket-runtime-49](../results/1014_0147_inorder4-v3b87/raw/1014_0148_trainticket-runtime-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory outlier: pod ts-station-service-fd984464d-g552p is 0/1 CrashLoopBackOff (Restart Count 5, Last State Terminated Reason=Error Exit Code=1; kubelet event 'Warning BackOff Back-off restarting failed container ts-station-service'). Container logs show the mechanism: 'java.sql.SQLException: Access denied for user 'ts'@'172.20.1.198' (using password: YES)' during 'HikariPool-1 - Exception during pool initialization', leading to 'Unable to create requested service [org.hibernate.engine.jdbc.env.spi.JdbcEnvironment]' and 'Application run failed' - the app exits 1 at startup, so the container

### case-50

- **结论**：`app/ts-ticket-office-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-ticket-office-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.1667 · steps 25 · tokens 416,857
- **raw 日志**：[results/1014_0149_inorder4-v3b88/raw/1014_0150_trainticket-runtime-50](../results/1014_0149_inorder4-v3b88/raw/1014_0150_trainticket-runtime-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory shows a single outlier: ts-ticket-office-service-588b66bc4b-ztkhq 0/1 CrashLoopBackOff with 5 restarts (all other 44 ts-* workloads 1/1 Running). A TCP probe on the port its Service declares (ts-ticket-office-service:16108) failed from worker-01/02/03. Its container logs show the Node app starting, connecting, then throwing 'Error: Cannot enqueue Query after fatal error.' (PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR) at /app/bin/db.js:24 right after the INSERT INTO office during MySQL handshake, exiting with code 1. Namespace/pod events bind the mechanism to that exact pod: 'BackOff - Bac

### case-51

- **结论**：`app/ts-train-food-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-train-food-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.5 · ECR 0 · EE 0.2222 · steps 19 · tokens 343,167
- **raw 日志**：[results/1014_0151_inorder4-v3b89/raw/1014_0152_trainticket-runtime-51](../results/1014_0151_inorder4-v3b89/raw/1014_0152_trainticket-runtime-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-train-food-service is the only workload in train-ticket without available replicas: pod ts-train-food-service-54754ff6f6-t6sj2 is 0/1 CrashLoopBackOff with 4 restarts, Last State Terminated Reason=Error Exit Code=1 (no OOM/137, no probe or scheduling/mount/image event). Its container log ends in javax.persistence.PersistenceException -> org.hibernate.exception.GenericJDBCException: Unable to open JDBC Connection for DDL execution -> java.sql.SQLException: Access denied for user 'ts'@'172.20.3.85' (using password: YES), and tsdb-mysql's own error log echoes 'Access denied for user ts'. TCP r

### case-52

- **结论**：`app/ts-train-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-train-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.5 · EOC 0.25 · ECR 0 · EE 0.2 · steps 16 · tokens 311,634
- **raw 日志**：[results/1014_0153_inorder4-v3b90/raw/1014_0154_trainticket-runtime-52](../results/1014_0153_inorder4-v3b90/raw/1014_0154_trainticket-runtime-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace inventory is ts-train-service-79b45885dd-smhv9 (0/1 CrashLoopBackOff, 4 restarts). Its container log ends in 'Caused by: java.sql.SQLException: Access denied for user ts@172.20.3.174 (using password: YES)' during Hibernate SessionFactory build ('Unable to open JDBC Connection for DDL execution'), pod Last State Terminated/Error exit code 1, and namespace events show 'Back-off restarting failed container ts-train-service' x13 - so the container never starts and its service instance is never registered. The caller chain confirms the same victim: ts-basic-service log

### case-53

- **结论**：`app/ts-travel2-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-travel2-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3333 · steps 16 · tokens 498,040
- **raw 日志**：[results/1014_0155_inorder4-v3b91/raw/1014_0156_trainticket-runtime-53](../results/1014_0155_inorder4-v3b91/raw/1014_0156_trainticket-runtime-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pod scan showed a single outlier: ts-travel2-service-c56664fd-x6mc6 (0/1 CrashLoopBackOff, 4 restarts, exit code 1, BackOff x10) while all other 40+ pods were 1/1 Running and all workers Ready. Its own logs/DescribeResource show the container starts then dies during Spring/Hibernate bootstrap: 'java.sql.SQLException: Access denied for user 'ts'@'172.20.3.40' (using password: YES)', 'SQL Error: 1045, SQLState: 28000', 'Unable to open JDBC Connection for DDL execution', HikariPool-1 pool initialization exception -> Application run failed -> exit 1 -> readiness probe on :16346 neve

### case-54

- **结论**：`app/ts-travel-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-travel-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 0.75 · EOC 0.75 · ECR 0 · EE 0.3077 · steps 14 · tokens 292,074
- **raw 日志**：[results/1014_0158_inorder4-v3b92/raw/1014_0158_trainticket-runtime-54](../results/1014_0158_inorder4-v3b92/raw/1014_0158_trainticket-runtime-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-travel-service-55fd6fc94d-sfbc6 on worker-01 shows READY 0/1, STATUS CrashLoopBackOff, RESTARTS 4, last termination 'Error' Exit Code 1; its own logs carry 'java.sql.SQLException: Access denied for user 'ts'@'172.20.1.165' (using password: YES)', 'SQL Error: 1045, SQLState: 28000', HikariPool-1 pool initialization failure and 'Application run failed' — a credential-level failure with TCP/port already reached. GetAppYAML(ts-travel-service) shows envFrom secretRef ts-travel-mysql (present in the namespace with 5 keys) carrying TRAVEL_MYSQL_HOST=tsdb-mysql-leader, PORT 3306, USER ts, PASSWORD 

### case-55

- **结论**：`app/ts-user-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-user-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2273 · steps 23 · tokens 388,114
- **raw 日志**：[results/1014_0200_inorder4-v3b93/raw/1014_0201_trainticket-runtime-55](../results/1014_0200_inorder4-v3b93/raw/1014_0201_trainticket-runtime-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-user-service is the only offline workload in train-ticket: pod ts-user-service-b795844f6-4dczn is 0/1 CrashLoopBackOff (4 restarts), Last State Terminated/Error exit code 1, and its Service has an empty ENDPOINTS list with TCP 12342 failing from worker-01/02/03. Container logs show java.sql.SQLException 'Access denied for user 'ts'@'172.20.3.35' (using password: YES)' / SQL Error 1045 SQLState 28000 -> 'Unable to open JDBC Connection for DDL execution' -> 'Unable to build Hibernate SessionFactory' -> 'Application run failed', so the process aborts before it can listen. The Deployment source

### case-56

- **结论**：`app/ts-voucher-service` + `mysql_invalid_credentials` ｜ 标签 `app/ts-voucher-service` + `mysql_invalid_credentials`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4167 · steps 13 · tokens 180,103
- **raw 日志**：[results/1014_0202_inorder4-v3b94/raw/1014_0203_trainticket-runtime-56](../results/1014_0202_inorder4-v3b94/raw/1014_0203_trainticket-runtime-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket namespace pod listing is ts-voucher-service-5b8bd94c88-g25t5 (0/1, CrashLoopBackOff, 5 restarts, worker-03); all other 47 pods are 1/1 Running. Its pod sheet shows Last State Terminated with Reason Error / Exit Code 1, container created and started 5x (image already present, no FailedCreate/FailedMount/probe/image-pull event) — so scheduling, admission, mount and image paths are all clean. Its own error log reads verbatim: pymysql.err.OperationalError: (1045, "Access denied for user 'ts'@'172.20.3.10' (using password: YES)"), and the DB server side independentl

### case-57

- **结论**：`app/ts-assurance-service` + `mysql_invalid_port` ｜ 标签 `app/ts-assurance-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4615 · steps 14 · tokens 203,898
- **raw 日志**：[results/1014_0205_inorder4-v3b95/raw/1014_0206_trainticket-runtime-57](../results/1014_0205_inorder4-v3b95/raw/1014_0206_trainticket-runtime-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-assurance-service pod (ts-assurance-service-85577d9b4d-gnn7w) is 0/1 CrashLoopBackOff with 4 restarts, exit code 1 (non-OOM, non-probe); kubelet events show 'Back-off restarting failed container'. Its error logs show HikariPool-1 pool initialization failure: 'CommunicationsException: Communications link failure' caused by 'java.net.ConnectException: Connection refused' against MySQL, killing startup ('Failed to initialize JPA EntityManagerFactory'), matching the 503 (83x) reported on /api/v1/assuranceservice/assurances/types. The config surface is the break: secret ts-assurance-mysql sets A

### case-58

- **结论**：`app/ts-auth-service` + `mysql_invalid_port` ｜ 标签 `app/ts-auth-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4706 · steps 18 · tokens 243,635
- **raw 日志**：[results/1014_0207_inorder4-v3b96/raw/1014_0208_trainticket-runtime-58](../results/1014_0207_inorder4-v3b96/raw/1014_0208_trainticket-runtime-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-auth-service is the only outlier in the namespace: pod ts-auth-service-7689b8d556-gmft2 is 0/1 CrashLoopBackOff (4 restarts, Last State Terminated/Error, exit 1), and the ts-gateway-service alert shows 503 on POST /api/v1/users/login with entry_service ts-auth-service. Its container logs are a startup DB failure: 'HikariPool-1 - Exception during pool initialization' -> 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure' -> 'Caused by: java.net.ConnectException: Connection refused (Connection refused)' -> 'Application run failed'. The address comes from envFro

### case-59

- **结论**：`app/ts-config-service` + `mysql_invalid_port` ｜ 标签 `app/ts-config-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4545 · steps 23 · tokens 489,686
- **raw 日志**：[results/1014_0209_inorder4-v3b97/raw/1014_0210_trainticket-runtime-59](../results/1014_0209_inorder4-v3b97/raw/1014_0210_trainticket-runtime-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert named ts-preserve-service 500s on POST /api/v1/preserveservice/preserve. Inventory scan showed exactly one outlier: pod ts-config-service-778646698d-qmbf9 = 0/1 CrashLoopBackOff (4 restarts, Exit Code 1); its Service endpoints list is EMPTY, so callers cannot reach it. Container logs: com.mysql.cj.jdbc.exceptions.CommunicationsException 'Communications link failure' caused by java.net.ConnectException 'Connection refused (Connection refused)', failing 'Unable to open JDBC Connection for DDL execution'. Config face: GetAppYAML(ts-config-service) secret ts-config-mysql has CONFIG_MYSQL_HOS

### case-60

- **结论**：`app/ts-contacts-service` + `mysql_invalid_port` ｜ 标签 `app/ts-contacts-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5882 · steps 18 · tokens 260,302
- **raw 日志**：[results/1014_0211_inorder4-v3b98/raw/1014_0212_trainticket-runtime-60](../results/1014_0211_inorder4-v3b98/raw/1014_0212_trainticket-runtime-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: alert shows 503 on ts-contacts-service 'Get contacts' API. Object layer: only outlier in train-ticket pods is ts-contacts-service-878884888-q6btj (0/1 CrashLoopBackOff, 4 restarts, BackOff event), and its Service endpoints list is EMPTY, so callers get 503. Pod logs: 'HikariPool-1 - Exception during pool initialization' / 'Communications link failure' / 'Caused by: java.net.ConnectException: Connection refused', SQLState 08S01 - a rejected TCP connect, not credentials (no Access denied) and not DNS (no Unknown host). config: the pod takes its DB address from Secret ts-contacts-my

### case-61

- **结论**：`app/ts-delivery-service` + `mysql_invalid_port` ｜ 标签 `app/ts-delivery-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4118 · steps 18 · tokens 365,900
- **raw 日志**：[results/1014_0214_inorder4-v3b99/raw/1014_0215_trainticket-runtime-61](../results/1014_0214_inorder4-v3b99/raw/1014_0215_trainticket-runtime-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod ts-delivery-service-787cbf858d-2hs67 (ns train-ticket, node worker-01) is the only non-Running pod in the namespace: 0/1 CrashLoopBackOff, 4 restarts, last termination exit code 1. Its logs show startup DB failure: 'Caused by: java.net.ConnectException: Connection refused' -> 'CJCommunicationsException: Communications link failure' -> 'Failed to initialize JPA EntityManagerFactory ... Unable to open JDBC Connection' -> 'Application run failed'. The referenced Secret ts-delivery-mysql sets DELIVERY_MYSQL_HOST=tsdb-mysql-leader with DELIVERY_MYSQL_PORT=34006, but the live Service tsdb-mysql-

### case-62

- **结论**：`app/ts-food-delivery-service` + `mysql_invalid_port` ｜ 标签 `app/ts-food-delivery-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.5 · steps 21 · tokens 335,320
- **raw 日志**：[results/1014_0216_inorder4-v3b100/raw/1014_0217_trainticket-runtime-62](../results/1014_0216_inorder4-v3b100/raw/1014_0217_trainticket-runtime-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket namespace inventory: pod ts-food-delivery-service-d7f948cf4-kzzn8 is 0/1 CrashLoopBackOff (4 restarts, last state Terminated exit code 1), while all other 50 pods are 1/1 Running. Its logs show com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure / Caused by java.net.ConnectException: Connection refused, followed by 'Unable to open JDBC Connection for DDL execution' and 'Application run failed'. The service's datasource Secret ts-food-delivery-mysql sets FOOD_DELIVERY_MYSQL_PORT='34007', but the referenced Service tsdb-mysql-leader 

### case-63

- **结论**：`app/ts-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5 · steps 19 · tokens 335,407
- **raw 日志**：[results/1014_0218_inorder4-v3b101/raw/1014_0219_trainticket-runtime-63](../results/1014_0218_inorder4-v3b101/raw/1014_0219_trainticket-runtime-63/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service is the sole outlier in the namespace: Deployment 0/1 AVAILABLE, pod ts-food-service-6bdb8b7ddb-m7p6z 0/1 CrashLoopBackOff with 4 restarts, Last State Terminated/Reason Error/Exit Code 1, and its Service 'ts-food-service' has an EMPTY Endpoints list (10.68.139.200:18856 resolves but has no ready backend) - matching 'Partial Service Unreachability'. Scheduling/image pull are healthy (PodScheduled True, image 'already present'), so the break is at container startup: logs show 'CommunicationsException: Communications link failure' from HikariCP checkFailFast during Spring JPA Entit

### case-64

- **结论**：`app/ts-inside-payment-service` + `mysql_invalid_port` ｜ 标签 `app/ts-inside-payment-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 398,880
- **raw 日志**：[results/1014_0221_inorder4-v3b102/raw/1014_0222_trainticket-runtime-64](../results/1014_0221_inorder4-v3b102/raw/1014_0222_trainticket-runtime-64/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' shows as 503 from POST /api/v1/inside_pay_service/inside_payment against ts-inside-payment-service. Cluster-wide pod scan shows exactly one outlier: ts-inside-payment-service-5d5bd5c84d-5hfgx 0/1 CrashLoopBackOff (Restart Count 4, Last State Terminated Reason Error Exit Code 1, Ready False; Warning BackOff 'Back-off restarting failed container'). Its container log is decisive: 'HikariPool-1 - Exception during pool initialization' -> 'Caused by: java.net.ConnectException: Connection refused (Connection refused)' -> 'Unable to open JDBC Connection for D

### case-65

- **结论**：`app/ts-notification-service` + `mysql_invalid_port` ｜ 标签 `app/ts-notification-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.225 · steps 41 · tokens 1,058,031
- **raw 日志**：[results/1014_0223_inorder4-v3b103/raw/1014_0224_trainticket-runtime-65](../results/1014_0223_inorder4-v3b103/raw/1014_0224_trainticket-runtime-65/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pod scan (the only legitimate full listing) shows a single outlier: ts-notification-service-675d7d65b4-bdt28 is 0/1 CrashLoopBackOff with 4 restarts (last state Terminated/Error/Exit Code 1), all other 44 pods 1/1 Running. Its own container log carries the failing call: 'Caused by: java.net.ConnectException: Connection refused' inside com.mysql.cj.jdbc.CommunicationsException -> 'Unable to open JDBC Connection for DDL execution' -> 'Application run failed'; the pod sheet and namespace events bind it literarily ('Back-off restarting failed container ts-notification-service in pod

### case-66

- **结论**：`app/ts-order-other-service` + `mysql_invalid_port` ｜ 标签 `app/ts-order-other-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.5263 · steps 20 · tokens 261,416
- **raw 日志**：[results/1014_0225_inorder4-v3b104/raw/1014_0226_trainticket-runtime-66](../results/1014_0225_inorder4-v3b104/raw/1014_0226_trainticket-runtime-66/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom entry: alert on POST /api/v1/preserveservice/preserve via entry_service ts-preserve-service returning HTTP 500 (partial unreachability). Pod inventory outlier (only non-Ready row): ts-order-other-service-77f574b58b-gqrnq 0/1 CrashLoopBackOff, 4 restarts, Last State Terminated Reason=Error ExitCode=1. Its own logs read verbatim: 'Caused by: java.net.ConnectException: Connection refused (Connection refused)', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure', 'HikariPool-1 - Exception during pool initialization', 'Failed to initialize JPA EntityManagerFa

### case-67

- **结论**：`app/ts-order-service` + `mysql_invalid_port` ｜ 标签 `app/ts-order-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4706 · steps 18 · tokens 243,427
- **raw 日志**：[results/1014_0228_inorder4-v3b105/raw/1014_0228_trainticket-runtime-67](../results/1014_0228_inorder4-v3b105/raw/1014_0228_trainticket-runtime-67/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod inventory shows a single outlier: ts-order-service-57d9f6ffbd-ptbwc is 0/1 CrashLoopBackOff (4 restarts). Its logs/error patterns show startup failure: HikariPool pool initialization exception -> com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure -> Caused by java.net.ConnectException: Connection refused, then 'Failed to initialize JPA EntityManagerFactory ... Application run failed', pod state Terminated Reason=Error Exit Code=1. The address face explains it: ts-order-service takes its DB address from Secret ts-order-mysql, which sets ORDER_MYSQL_HOST=tsdb-m

### case-68

- **结论**：`app/ts-payment-service` + `mysql_invalid_port` ｜ 标签 `app/ts-payment-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4091 · steps 23 · tokens 418,009
- **raw 日志**：[results/1014_0229_inorder4-v3b106/raw/1014_0230_trainticket-runtime-68](../results/1014_0229_inorder4-v3b106/raw/1014_0230_trainticket-runtime-68/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only ts-payment-service is not ready in train-ticket: pod ts-payment-service-76d7d44b5b-2bvw2 is 0/1 CrashLoopBackOff (4 restarts on worker-03), Last State Terminated Reason=Error Exit Code 1, with event 'BackOff restarting failed container ts-payment-service'. Its logs show HikariPool-1 pool initialization failure -> com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure -> Caused by: java.net.ConnectException: Connection refused, then 'Failed to initialize JPA EntityManagerFactory' and 'Application run failed'. The DB address comes from envFrom secret ts-payment-my

### case-69

- **结论**：`app/ts-price-service` + `mysql_invalid_port` ｜ 标签 `app/ts-price-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4444 · steps 19 · tokens 273,524
- **raw 日志**：[results/1014_0232_inorder4-v3b107/raw/1014_0233_trainticket-runtime-69](../results/1014_0232_inorder4-v3b107/raw/1014_0233_trainticket-runtime-69/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom: POST /api/v1/preserveservice/preserve returns HTTP 500 (entry_service ts-preserve-service). Pod inventory shows exactly one outlier: ts-price-service-69f84bfbc4-qcf2l 0/1 CrashLoopBackOff (4 restarts, exit code 1); event surface binds it: 'Warning BackOff Back-off restarting failed container ts-price-service in pod ts-price-service-69f84bfbc4-qcf2l'. Its logs: 'HikariPool-1 - Exception during pool initialization' -> 'Communications link failure' -> 'Caused by: java.net.ConnectException: Connection refused (Connection refused)' -> 'Failed to initialize JPA EntityManagerFactory / Applic

### case-70

- **结论**：`app/ts-route-service` + `mysql_invalid_port` ｜ 标签 `app/ts-route-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 213,009
- **raw 日志**：[results/1014_0234_inorder4-v3b108/raw/1014_0235_trainticket-runtime-70](../results/1014_0234_inorder4-v3b108/raw/1014_0235_trainticket-runtime-70/)（ndjson / mcp.jsonl / meta）
- **摘要**：In namespace train-ticket only one pod is an outlier: ts-route-service-84fdb67598-pvp7g shows 0/1 CrashLoopBackOff (Restart Count 4, Last State Terminated Reason Error Exit Code 1), while all other 43 pods are 1/1 Running. The pod was successfully scheduled to worker-02 and the image was already present, so this is not scheduling/pull/admission. Its container log shows the actual break: 'HikariPool-1 - Exception during pool initialization', 'com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure', 'Caused by: java.net.ConnectException: Connection refused (Connection 

### case-71

- **结论**：`app/ts-security-service` + `mysql_invalid_port` ｜ 标签 `app/ts-security-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.45 · steps 21 · tokens 474,511
- **raw 日志**：[results/1014_0236_inorder4-v3b109/raw/1014_0237_trainticket-runtime-71](../results/1014_0236_inorder4-v3b109/raw/1014_0237_trainticket-runtime-71/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' traced to a single outlier in the train-ticket pods inventory: ts-security-service-64cb5fb74d-sjbz4 0/1 CrashLoopBackOff (4 restarts), while all other pods are 1/1 Running. Caller side: alert on ts-preserve-service POST /api/v1/preserveservice/preserve (94x HTTP 500) and its error log 'java.lang.IllegalArgumentException: Service Instance cannot be null' (downstream ts-security-service has no ready instance). Pod sheet: Exit Code 1, Reason Error, Warning BackOff 'Back-off restarting failed container ts-security-service'; scheduling/pull/mount all Normal

### case-72

- **结论**：`app/ts-station-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-station-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4375 · steps 17 · tokens 523,662
- **raw 日志**：[results/1014_0238_inorder4-v3b110/raw/1014_0239_trainticket-runtime-72](../results/1014_0238_inorder4-v3b110/raw/1014_0239_trainticket-runtime-72/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace train-ticket 中唯一离群 Pod 为 ts-station-food-service-68497bf65b-d5ptz（0/1, CrashLoopBackOff, RESTARTS 4）；其 pod 详情 Last State=Terminated Reason=Error Exit Code=1，事件仅有 kubelet 'Back-off restarting failed container'（调度/镜像/挂载均 Normal，排除调度与启动前置类故障）。容器日志显示 Spring/Hibernate 启动期 HikariPool.checkFailFast 建连失败：'Communications link failure' -> 'java.net.ConnectException: Connection refused'，即 TCP 层无监听。该服务 env 由 Secret ts-station-food-mysql 注入，其中 STATION_FOOD_MYSQL_HOST=tsdb-mysql-leader 正确，但 STATION_FOOD_MYSQL_PORT='34017' 异常；连通性实测 tsdb-mysql-leader:34017 = Connection failed，而 tsdb-mysql-leader:330

### case-73

- **结论**：`app/ts-station-service` + `mysql_invalid_port` ｜ 标签 `app/ts-station-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.2 · ECR 0 · EE 0.4 · steps 16 · tokens 187,973
- **raw 日志**：[results/1014_0241_inorder4-v3b111/raw/1014_0242_trainticket-runtime-73](../results/1014_0241_inorder4-v3b111/raw/1014_0242_trainticket-runtime-73/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket pods listing shows a single outlier: ts-station-service-fd984464d-lbpfp 0/1 CrashLoopBackOff (4 restarts) on worker-02, while all other 44 workloads are 1/1 Running; the alert pointer (ts-preserve-service -> HTTP 500 on order creation) and the station dependency agree. Pod sheet: Last State Terminated, Reason Error, Exit Code 1 (not OOMKilled/137), PodScheduled True, deployment ts-station-service Available=False (MinimumReplicasUnavailable), so this is an application startup failure, not scheduling/quota/entrypoint. Container logs (current and previous) show Spring/Hiber

### case-74

- **结论**：`app/ts-train-food-service` + `mysql_invalid_port` ｜ 标签 `app/ts-train-food-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.3333 · steps 28 · tokens 664,467
- **raw 日志**：[results/1014_0243_inorder4-v3b112/raw/1014_0244_trainticket-runtime-74](../results/1014_0243_inorder4-v3b112/raw/1014_0244_trainticket-runtime-74/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket pod inventory: ts-train-food-service-54754ff6f6-phsqh is 0/1 CrashLoopBackOff (4 restarts, worker-03) while all other 43 pods are 1/1 Running; its Endpoints listing is empty (Service ts-train-food-service 10.68.218.177:19999 has no ready backend), which is the observed partial unreachability. Pod sheet: Last State Terminated, Exit Code 1; container logs show 'HikariPool-1 - Exception during pool initialization' -> 'CommunicationsException: Communications link failure' -> 'java.net.ConnectException: Connection refused (Connection refused)' -> 'Application run fa

### case-75

- **结论**：`app/ts-train-service` + `mysql_invalid_port` ｜ 标签 `app/ts-train-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4211 · steps 20 · tokens 270,780
- **raw 日志**：[results/1014_0245_inorder4-v3b113/raw/1014_0246_trainticket-runtime-75](../results/1014_0245_inorder4-v3b113/raw/1014_0246_trainticket-runtime-75/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side entry: alert on ts-preserve-service POST /api/v1/preserveservice/preserve returning 500 (63x), with caller logs showing 500 from /api/v1/travelservice/trip_detail and 'getTickets failed'. Inventory outlier: only pod ts-train-service-79b45885dd-xd4wx is 0/1 CrashLoopBackOff (4 restarts, exit code 1). Direct probe: ts-train-service:14567 refused from all three workers, while tsdb-mysql-leader:3306 is open/successful from all workers and tsdb-mysql pods are 3/3 Running (DB healthy). Container logs: HikariPool-1 pool init failure, com.mysql.cj.jdbc.exceptions.CommunicationsException, 

### case-76

- **结论**：`app/ts-travel2-service` + `mysql_invalid_port` ｜ 标签 `app/ts-travel2-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.5294 · steps 18 · tokens 247,085
- **raw 日志**：[results/1014_0248_inorder4-v3b114/raw/1014_0248_trainticket-runtime-76](../results/1014_0248_inorder4-v3b114/raw/1014_0248_trainticket-runtime-76/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace train-ticket pods listing shows exactly one outlier: ts-travel2-service-c56664fd-f7ddw 0/1 CrashLoopBackOff (4 restarts) on worker-03, while all other ~49 pods are 1/1 Running. Pod describe gives Last State Terminated/Error exit code 1 and event 'Warning BackOff - Back-off restarting failed container'; container logs show Spring Boot aborting at startup: 'HikariPool-1 - Exception during pool initialization' -> com.mysql.cj.jdbc.exceptions.CommunicationsException: Communications link failure -> Caused by: java.net.ConnectException: Connection refused (not 'Access denied'), then 'Faile

### case-77

- **结论**：`app/ts-travel-service` + `mysql_invalid_port` ｜ 标签 `app/ts-travel-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4 · steps 16 · tokens 216,900
- **raw 日志**：[results/1014_0250_inorder4-v3b115/raw/1014_0251_trainticket-runtime-77](../results/1014_0250_inorder4-v3b115/raw/1014_0251_trainticket-runtime-77/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-travel-service is the sole outlier pod (ts-travel-service-55fd6fc94d-dlhf4, 0/1, CrashLoopBackOff, 4 restarts) and its Service endpoints list is empty, matching the partial-unreachability symptom and the ts-preserve-service POST /preserveservice/preserve 500s. Its logs show HikariPool-1 pool initialization failure: com.mysql.cj.jdbc.exceptions.CommunicationsException -> Caused by: java.net.ConnectException: Connection refused, followed by 'Application run failed' (Failed to initialize JPA EntityManagerFactory), so the container exits and back-off loops (event: Warning BackOff pod/ts-travel-

### case-78

- **结论**：`app/ts-user-service` + `mysql_invalid_port` ｜ 标签 `app/ts-user-service` + `mysql_invalid_port`（✓ 逐字命中）
- **流程**：MC 0.8 · EOC 0.6 · ECR 0 · EE 0.4211 · steps 20 · tokens 300,183
- **raw 日志**：[results/1014_0252_inorder4-v3b116/raw/1014_0253_trainticket-runtime-78](../results/1014_0252_inorder4-v3b116/raw/1014_0253_trainticket-runtime-78/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain closed on ts-user-service. Pod list outlier: ts-user-service-b795844f6-v5kft 0/1 CrashLoopBackOff (4 restarts); DescribeResource shows Last State Terminated Reason=Error Exit Code=1, Readiness tcpSocket:12342 never satisfied, event 'BackOff restarting failed container ts-user-service', Deployment ts-user-service Available=False (MinimumReplicasUnavailable, unavailableReplicas:1), so its Service has no endpoints -> partial unreachability (caller ts-preserve-service returns HTTP 500 on /api/v1/preserveservice/preserve). Container logs pin the mechanism: 'HikariPool-1 - Excepti

### case-79

- **结论**：`app/ts-assurance-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-assurance-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 633,424
- **raw 日志**：[results/1014_0254_inorder4-v3b117/raw/1014_0255_trainticket-runtime-79](../results/1014_0254_inorder4-v3b117/raw/1014_0255_trainticket-runtime-79/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert + endpoints + connectivity all point at ts-assurance-service (503, empty ENDPOINTS, Connection Failed from all 3 workers). Pod ts-assurance-service-5df4cbbdc-5wkbb is 1/2 Ready with 4 restarts; the app container (containerPort 18888) exits with code 1 in a BackOff loop. Its logs read verbatim: 'APPLICATION FAILED TO START ... Web server failed to start. Port 18888 was already in use' (PortInUseException). The injected istio-proxy sidecar in the same pod already owns that port: annotation proxy.istio.io/config '{"statusPort": 18888}' and proxy log 'Apply proxy config from annotation { "st

### case-80

- **结论**：`app/ts-basic-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-basic-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 271,594
- **raw 日志**：[results/1014_0256_inorder4-v3b118/raw/1014_0257_trainticket-runtime-80](../results/1014_0256_inorder4-v3b118/raw/1014_0257_trainticket-runtime-80/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in train-ticket shows a single outlier: ts-basic-service-664d46695c-v75jc is 1/2 CrashLoopBackOff with 4 restarts on worker-01 (all other 48 pods Running/Ready). DescribeResource on that pod: app container State=Waiting/CrashLoopBackOff, Last State Terminated Reason=Error Exit Code=1, Ready=False, containerPort 15680/TCP, while the injected istio-proxy sidecar carries annotation proxy.istio.io/config { "statusPort": 15680 } and logs 'Opening status port 15680'. GetRecentLogs/GetErrorLogs of ts-basic-service give the mechanism verbatim: 'Tomcat initialized with port(s): 15680 (http

### case-81

- **结论**：`app/ts-cancel-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-cancel-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 283,198
- **raw 日志**：[results/1014_1226_inorder4-v3b119/raw/1014_1228_trainticket-runtime-81](../results/1014_1226_inorder4-v3b119/raw/1014_1228_trainticket-runtime-81/)（ndjson / mcp.jsonl / meta）
- **摘要**：ns=train-ticket 中唯一离群 workload 为 ts-cancel-service(1/2 Ready, RESTARTS 3)；其 Service endpoints 列为空，三节点连通性实测 18885 全部 Connection Failed，caller 侧 32 次 HTTPError 503 与之闭环。机制事件：容器 Last State=Terminated/Error/Exit Code 1，事件面 Readiness probe failed 与 Back-off restarting failed container ts-cancel-service；应用日志原文 'PortInUseException: Port 18885 is already in use' / 'Web server failed to start. Port 18885 was already in use.'。配置确认：该 Deployment pod template 注解 proxy.istio.io/config: '{ "statusPort": 18885 }' 与 containerPort 18885 相同，pod 内 PROXY_CONFIG={"statusPort":18885}，即 Istio sidecar 状态端口抢占应用端口；对照 ts

### case-82

- **结论**：`app/ts-contacts-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-contacts-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 275,600
- **raw 日志**：[results/1014_1230_inorder4-v3b120/raw/1014_1232_trainticket-runtime-82](../results/1014_1230_inorder4-v3b120/raw/1014_1232_trainticket-runtime-82/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-contacts-service-7946b749bf-m8ps8 is the only outlier in the namespace pods listing (READY 1/2, STATUS CrashLoopBackOff, RESTARTS 2); its app container last state is Terminated/Error with exit code 1 and its log reads verbatim 'Failed to start bean webServerStartStop ... PortInUseException: Port 12347 is already in use' / 'Web server failed to start. Port 12347 was already in use.', while the co-located istio-proxy sidecar log reads 'Apply proxy config from annotation { statusPort: 12347 }' and 'Opening status port 12347'. GetAppYAML confirms the defect as configuration: the pod template an

### case-83

- **结论**：`app/ts-food-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-food-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2667 · steps 16 · tokens 490,099
- **raw 日志**：[results/1014_1234_inorder4-v3b121/raw/1014_1235_trainticket-runtime-83](../results/1014_1234_inorder4-v3b121/raw/1014_1235_trainticket-runtime-83/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-food-service pod (ts-food-service-5744cc6666-5gs7t) is the only outlier in the namespace object listing: READY 1/2, 4 restarts in ~5m, Ready=False. Its container Last State is Terminated with Reason=Error, Exit Code=1 and events show 'Back-off restarting failed container'. Application logs state 'Tomcat initialized with port(s): 18856 (http)' followed by 'APPLICATION FAILED TO START ... Web server failed to start. Port 18856 was already in use.' The same pod's istio-proxy log shows the colliding binder: 'Apply proxy config from annotation { "statusPort": 18856 }' and 'Opening status port 18

### case-84

- **结论**：`app/ts-gateway-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-gateway-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.2727 · steps 12 · tokens 263,384
- **raw 日志**：[results/1014_1236_inorder4-v3b122/raw/1014_1238_trainticket-runtime-84](../results/1014_1236_inorder4-v3b122/raw/1014_1238_trainticket-runtime-84/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: GetAlerts shows POST /api/v1/users/login returning '503 Server Error: Service Unavailable' (30 occurrences); CheckServiceConnectivity ts-gateway-service:18888 fails on worker-01/02/03. Object layer: pods listing has exactly one outlier, ts-gateway-service-7d97d56b56-6wwkf 1/2 CrashLoopBackOff (4 restarts), and deployments shows ts-gateway-service 0/1 AVAILABLE. Pod sheet: app container ts-gateway-service Waiting/CrashLoopBackOff, Last State Terminated Reason Error Exit Code 1, Restart Count 4, Ready False, while the istio-proxy sidecar in the same pod is Running/Ready with PROXY_

### case-85

- **结论**：`app/ts-inside-payment-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-inside-payment-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.3333 · steps 13 · tokens 273,331
- **raw 日志**：[results/1014_1239_inorder4-v3b123/raw/1014_1240_trainticket-runtime-85](../results/1014_1239_inorder4-v3b123/raw/1014_1240_trainticket-runtime-85/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert points to ts-inside-payment-service's 'Process payment' returning 503. Pod listing shows the sole outlier: ts-inside-payment-service-6db9d96587-s6459 1/2 Running with 4 restarts on worker-01 (all other ts-* pods 2/2). Pod describe shows the business container Terminated Reason=Error ExitCode=1, RestartCount=4, Ready=False, with kubelet Warning BackOff. Previous-container error logs give the mechanism verbatim: 'PortInUseException: Port 18673 is already in use' / 'Web server failed to start. Port 18673 was already in use', while the istio-proxy sidecar logs 'Opening status port 18673'. Co

### case-86

- **结论**：`app/ts-order-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-order-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.3077 · steps 14 · tokens 267,107
- **raw 日志**：[results/1014_1241_inorder4-v3b124/raw/1014_1242_trainticket-runtime-86](../results/1014_1241_inorder4-v3b124/raw/1014_1242_trainticket-runtime-86/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alerts show 503 on ts-order-service order-refresh routes. Pod inventory has exactly one outlier: ts-order-service-64776c8b87-5qf8p is READY 1/2 with 4 restarts while all other train-ticket pods are 2/2. Its error log reads 'org.springframework.boot.web.server.PortInUseException: Port 12031 is already in use'; container ts-order-service last state is Terminated (Reason: Error, Exit Code 1, Ready False) while the istio-proxy sidecar in the same pod is Ready. The deployment template carries the injected annotation proxy.istio.io/config: '{ "statusPort": 12031 }', so the sidecar binds the same por

### case-87

- **结论**：`app/ts-payment-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-payment-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 271,088
- **raw 日志**：[results/1014_1245_inorder4-v3b125/raw/1014_1246_trainticket-runtime-87](../results/1014_1245_inorder4-v3b125/raw/1014_1246_trainticket-runtime-87/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the namespace-wide pods listing is ts-payment-service-6cbd66f447-ks5sb (1/2 READY, RESTARTS 4, BackOff events); its main container exits with Reason=Error ExitCode=1 and the previous log states 'org.springframework.boot.web.server.PortInUseException: Port 19001 is already in use'. The Deployment maps the app to containerPort 19001 while the same pod template carries the annotation proxy.istio.io/config: { "statusPort": 19001 }, and the injected istio-proxy sidecar (Running/Ready, PROXY_CONFIG statusPort=19001, ISTIO_META_POD_PORTS containerPort 19001) therefore occupies the ide

### case-88

- **结论**：`app/ts-preserve-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-preserve-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.3077 · steps 14 · tokens 382,918
- **raw 日志**：[results/1014_1247_inorder4-v3b126/raw/1014_1248_trainticket-runtime-88](../results/1014_1247_inorder4-v3b126/raw/1014_1248_trainticket-runtime-88/)（ndjson / mcp.jsonl / meta）
- **摘要**：Alert and symptom side: entry POST /api/v1/preserveservice/preserve to ts-preserve-service returns HTTP 503 Service Unavailable (20 occurrences), and an active TCP probe to ts-preserve-service:14568 fails from all three workers (worker-01/02/03 'Connection Failed'). Object layer: pods listing shows exactly one outlier, ts-preserve-service-d9d44bb7c-vctxl 1/2 CrashLoopBackOff with 4 restarts (Ready False, ContainersReady False), while all other train-ticket pods are 2/2 Running. Pod record: application container Last State Terminated, Reason Error, Exit Code 1. Application logs (current and pre

### case-89

- **结论**：`app/ts-price-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-price-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 513,025
- **raw 日志**：[results/1014_1250_inorder4-v3b127/raw/1014_1251_trainticket-runtime-89](../results/1014_1250_inorder4-v3b127/raw/1014_1251_trainticket-runtime-89/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side: only outlier in the train-ticket pod inventory is ts-price-service-58cd9cbd76-jft7k (1/2 READY, 4 restarts), and Service ts-price-service has EMPTY endpoints; alerts show its upstream callers ts-preserve-service (/preserve, 11x HTTP 500) and ts-inside-payment-service (/inside_payment, 5x HTTP 500). Workload/owner chain: deployment/ts-price-service is 0/1 AVAILABLE (1 up-to-date). Mechanism: the app container's Last State is Terminated/Error, Exit Code 1, logs read 'APPLICATION FAILED TO START ... Web server failed to start. Port 16579 was already in use.' (PortInUseException: Por

### case-90

- **结论**：`app/ts-route-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-route-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 309,910
- **raw 日志**：[results/1014_1252_inorder4-v3b128/raw/1014_1253_trainticket-runtime-90](../results/1014_1252_inorder4-v3b128/raw/1014_1253_trainticket-runtime-90/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket inventory is ts-route-service-66696fb9bd-8fg55 (READY 1/2, STATUS Running, RESTARTS 4 (82s ago)); all other workloads are 2/2 with 0 restarts. Its own signal: CheckServiceConnectivity(ts-route-service, port 11178 - the port its Service declares, 11178->targetPort 11178) fails on worker-01/02/03, and Deployment ts-route-service reports MinimumReplicasUnavailable / unavailableReplicas: 1. Pod describe shows the app container 'ts-route-service' Last State: Terminated, Reason: Error, Exit Code 1, Restart Count 4, Ready False, while the injected sidecar istio-proxy 

### case-91

- **结论**：`app/ts-seat-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-seat-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 278,540
- **raw 日志**：[results/1014_1255_inorder4-v3b129/raw/1014_1256_trainticket-runtime-91](../results/1014_1255_inorder4-v3b129/raw/1014_1256_trainticket-runtime-91/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing (train-ticket, -o wide) shows a single outlier: ts-seat-service-74c885bd58-48kmm 1/2 CrashLoopBackOff, 4 restarts, on worker-01 (all other 45 pods 2/2 Running). The app container log reads 'org.springframework.boot.web.server.PortInUseException: Port 18898 is already in use' -> 'APPLICATION FAILED TO START / Web server failed to start. Port 18898 was already in use.', and the pod description shows Last State Terminated Reason=Error Exit Code=1, Ready=False, with events 'Warning BackOff: Back-off restarting failed container ts-seat-service' and 'Unhealthy Readiness probe failed ...

### case-92

- **结论**：`app/ts-security-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-security-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 0.6667 · ECR 1 · EE 0.25 · steps 13 · tokens 276,594
- **raw 日志**：[results/1014_1257_inorder4-v3b130/raw/1014_1258_trainticket-runtime-92](../results/1014_1257_inorder4-v3b130/raw/1014_1258_trainticket-runtime-92/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier on the pods surface is ts-security-service-6b55fdd59-99nzl (READY 1/2, RESTARTS 4, Age 5m6s) while every other train-ticket workload is 2/2 with 0 restarts; its caller-side symptom is ts-preserve-service's logs (IllegalArgumentException: Service Instance cannot be null -> HTTP 500 on POST /api/v1/preserveservice/preserve, matching the active alert) and the failed call edge ts-preserve-service -> ts-security-service exists in the dependency graph. The victim's own container log is decisive: 'org.springframework.boot.web.server.PortInUseException: Port 11188 is already in use' durin

### case-93

- **结论**：`app/ts-station-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-station-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 280,031
- **raw 日志**：[results/1014_1300_inorder4-v3b131/raw/1014_1301_trainticket-runtime-93](../results/1014_1300_inorder4-v3b131/raw/1014_1301_trainticket-runtime-93/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory outlier: only ts-station-service-5ffd899745-qgmd6 is 1/2 Ready with 4 restarts (all other 49 pods 2/2). Pod sheet + events: business container Exit Code 1, Ready=False, 'Back-off restarting failed container ts-station-service'. Container log: 'APPLICATION FAILED TO START ... PortInUseException: Port 12345 is already in use / Web server failed to start. Port 12345 was already in use', while the istio-proxy sidecar logged 'Apply proxy config from annotation { statusPort: 12345 }' and 'Opening status port 12345' seconds before the app started. Config closure: the ts-station-service pod 

### case-94

- **结论**：`app/ts-train-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-train-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 276,404
- **raw 日志**：[results/1014_1302_inorder4-v3b132/raw/1014_1304_trainticket-runtime-94](../results/1014_1302_inorder4-v3b132/raw/1014_1304_trainticket-runtime-94/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (wide) shows a single outlier: ts-train-service-54dc44c8b9-wsb6b 1/2 Running with 4 restarts on worker-01, while every other pod is 2/2 with 0 restarts; its container is Terminated (Reason: Error, Exit Code: 1) with events 'Warning BackOff Back-off restarting failed container ts-train-service'. Logs give the break verbatim: 'Web server failed to start. Port 14567 was already in use.' / 'APPLICATION FAILED TO START'. The same pod's sidecar logs show 'Opening status port 14567' and 'Apply proxy config from annotation { "statusPort": 14567 }', and GetAppYAML(ts-train-service) confirm

### case-95

- **结论**：`app/ts-travel-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-travel-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 482,636
- **raw 日志**：[results/1014_1305_inorder4-v3b133/raw/1014_1307_trainticket-runtime-95](../results/1014_1305_inorder4-v3b133/raw/1014_1307_trainticket-runtime-95/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the train-ticket pod inventory: ts-travel-service-795b58f7cd-rknnk is 1/2 Running with 4 restarts (all 45 other pods are 2/2, 0 restarts, so no node-level fault). Pod detail shows the ts-travel-service container Last State Terminated Reason=Error Exit Code=1, Ready=False, with a kubelet 'BackOff restarting failed container ts-travel-service' event. Its logs give the mechanism verbatim: 'org.springframework.boot.web.server.PortInUseException: Port 12346 is already in use' / 'Web server failed to start. Port 12346 was already in use.' while the co-located istio-proxy logs 'Openin

### case-96

- **结论**：`app/ts-user-service` + `service_sidecar_port_conflict` ｜ 标签 `app/ts-user-service` + `service_sidecar_port_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 275,261
- **raw 日志**：[results/1014_1308_inorder4-v3b134/raw/1014_1309_trainticket-runtime-96](../results/1014_1308_inorder4-v3b134/raw/1014_1309_trainticket-runtime-96/)（ndjson / mcp.jsonl / meta）
- **摘要**：ts-user-service is the sole outlier in the pods listing (ts-user-service-57d8854584-gnftk, 1/2 READY, 4 restarts). Connectivity probes on its own declared Service port 12342 fail from worker-01/02/03. Its container exits with code 1 and logs 'APPLICATION FAILED TO START ... PortInUseException: Port 12342 is already in use', while the istio sidecar in the same pod logs 'Opening status port 12342'. The victim's own deployment manifest carries the collision: annotation proxy.istio.io/config '{ "statusPort": 12342 }' equals the app containerPort 12342 (and the Service/readiness-probe port 12342). 

