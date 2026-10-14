# 评测明细 · boutique/scheduling — cloudopsbench

> 本家族已跑 **164/164** 题：JRA ✅164 ❌0 ｜ 证据链全闭 163 ｜ token 中位 104,428 ｜ 生成 2026-10-14T14:12:10.577Z
> 总账（覆盖度 / 汇总 / 索引）见 [../DETAIL.md](../DETAIL.md)；口径与列义同总账。

## 逐题校验表

| 案例 | CA | FA | JRA | MC | EOC | ECR | EE | steps | tokens | RAR | inv | 轮次 | 备注 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| [1](#case-1) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 115,405 | 0 | 0 | 1012_1415_inorder4-v3 | 全对·链闭 |
| [2](#case-2) | 1 | 1 | 1 | 1 | 1 | 1 | 0.12 | 26 | 203,615 | 0 | 0 | 1012_1846_inorder4-v3b4 | 全对·链闭 |
| [3](#case-3) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 84,424 | 0 | 0 | 1012_1856_inorder4-v3b5 | 全对·链闭 |
| [4](#case-4) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 22 | 153,471 | 0 | 0 | 1012_1928_inorder4-v3b6 | 全对·链闭 |
| [5](#case-5) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 103,798 | 0 | 0 | 1013_1134_inorder4-v3b10 | 全对·链闭 |
| [6](#case-6) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 82,842 | 0 | 0 | 1013_1350_order-verify1 | 全对·链闭 |
| [7](#case-7) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 131,524 | 0 | 0 | 1013_1524_inorder4-v3b18 | 全对·链闭 |
| [8](#case-8) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 130,578 | 0 | 0 | 1013_1541_inorder4-v3b20 | 全对·链闭 |
| [9](#case-9) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 130,741 | 0 | 0 | 1013_1628_inorder4-v3b22 | 全对·链闭 |
| [10](#case-10) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 186,153 | 0 | 0 | 1013_1656_inorder4-v3b25 | 全对·链闭 |
| [11](#case-11) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 132,905 | 0 | 0 | 1013_1810_inorder4-v3b27 | 全对·链闭 |
| [12](#case-12) | 1 | 1 | 1 | 1 | 1 | 1 | 0.129 | 32 | 325,732 | 0 | 0 | 1013_1834_inorder4-v3b30 | 全对·链闭 |
| [13](#case-13) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 175,486 | 0 | 0 | 1014_1855_inorder4-v3b147 | 全对·链闭 |
| [14](#case-14) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 113,543 | 0 | 0 | 1014_1858_inorder4-v3b148 | 全对·链闭 |
| [15](#case-15) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 138,717 | 0 | 0 | 1014_1900_inorder4-v3b149 | 全对·链闭 |
| [16](#case-16) | 1 | 1 | 1 | 1 | 1 | 1 | 0.15 | 21 | 184,788 | 0 | 0 | 1014_1902_inorder4-v3b150 | 全对·链闭 |
| [17](#case-17) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 191,387 | 0 | 0 | 1014_1904_inorder4-v3b151 | 全对·链闭 |
| [18](#case-18) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 103,184 | 0 | 0 | 1014_1906_inorder4-v3b152 | 全对·链闭 |
| [19](#case-19) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 67,524 | 0 | 0 | 1014_1908_inorder4-v3b153 | 全对·链闭 |
| [20](#case-20) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 87,124 | 0 | 0 | 1014_1910_inorder4-v3b154 | 全对·链闭 |
| [21](#case-21) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 87,278 | 0 | 0 | 1014_1911_inorder4-v3b155 | 全对·链闭 |
| [22](#case-22) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 91,234 | 0 | 0 | 1014_1913_inorder4-v3b156 | 全对·链闭 |
| [23](#case-23) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 112,904 | 0 | 0 | 1014_1917_inorder4-v3b157 | 全对·链闭 |
| [24](#case-24) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 112,155 | 0 | 0 | 1014_1919_inorder4-v3b158 | 全对·链闭 |
| [25](#case-25) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 93,364 | 0 | 0 | 1014_1920_inorder4-v3b159 | 全对·链闭 |
| [26](#case-26) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 132,310 | 0 | 0 | 1014_1922_inorder4-v3b160 | 全对·链闭 |
| [27](#case-27) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 225,604 | 0 | 0 | 1014_1924_inorder4-v3b161 | 全对·链闭 |
| [28](#case-28) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2381 | 22 | 181,779 | 0 | 0 | 1014_1926_inorder4-v3b162 | 全对·链闭 |
| [29](#case-29) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 129,361 | 0 | 0 | 1014_1929_inorder4-v3b163 | 全对·链闭 |
| [30](#case-30) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 87,251 | 0 | 0 | 1014_1931_inorder4-v3b164 | 全对·链闭 |
| [31](#case-31) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 103,861 | 0 | 0 | 1014_1933_inorder4-v3b165 | 全对·链闭 |
| [32](#case-32) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 137,758 | 0 | 0 | 1014_1935_inorder4-v3b166 | 全对·链闭 |
| [33](#case-33) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 151,011 | 0 | 0 | 1014_1938_inorder4-v3b167 | 全对·链闭 |
| [34](#case-34) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 89,576 | 0 | 0 | 1014_1940_inorder4-v3b168 | 全对·链闭 |
| [35](#case-35) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 104,468 | 0 | 0 | 1014_1911_inorder4-v3b155 | 全对·链闭 |
| [36](#case-36) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 102,563 | 0 | 0 | 1014_1913_inorder4-v3b156 | 全对·链闭 |
| [37](#case-37) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 88,610 | 0 | 0 | 1014_1917_inorder4-v3b157 | 全对·链闭 |
| [38](#case-38) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 91,529 | 0 | 0 | 1014_1919_inorder4-v3b158 | 全对·链闭 |
| [39](#case-39) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3846 | 14 | 104,305 | 0 | 0 | 1014_1920_inorder4-v3b159 | 全对·链闭 |
| [40](#case-40) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 84,438 | 0 | 0 | 1014_1922_inorder4-v3b160 | 全对·链闭 |
| [41](#case-41) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 87,048 | 0 | 0 | 1014_1924_inorder4-v3b161 | 全对·链闭 |
| [42](#case-42) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 86,031 | 0 | 0 | 1014_1926_inorder4-v3b162 | 全对·链闭 |
| [43](#case-43) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 103,905 | 0 | 0 | 1014_1929_inorder4-v3b163 | 全对·链闭 |
| [44](#case-44) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 93,136 | 0 | 0 | 1014_1931_inorder4-v3b164 | 全对·链闭 |
| [45](#case-45) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 108,227 | 0 | 0 | 1014_1933_inorder4-v3b165 | 全对·链闭 |
| [46](#case-46) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 114,716 | 0 | 0 | 1014_1935_inorder4-v3b166 | 全对·链闭 |
| [47](#case-47) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 16 | 105,511 | 0 | 0 | 1014_1938_inorder4-v3b167 | 全对·链闭 |
| [48](#case-48) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2778 | 19 | 134,301 | 0 | 0 | 1014_1940_inorder4-v3b168 | 全对·链闭 |
| [49](#case-49) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 107,955 | 0 | 0 | 1014_1312_inorder4-v3b135 | 全对·链闭 |
| [50](#case-50) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 140,439 | 0 | 0 | 1014_1314_inorder4-v3b136 | 全对·链闭 |
| [51](#case-51) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 134,958 | 0 | 0 | 1014_1318_inorder4-v3b137 | 全对·链闭 |
| [52](#case-52) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 21 | 149,540 | 0 | 0 | 1014_1321_inorder4-v3b138 | 全对·链闭 |
| [53](#case-53) | 1 | 1 | 1 | 1 | 1 | 1 | 0.375 | 17 | 106,786 | 0 | 0 | 1014_1841_inorder4-v3b139 | 全对·链闭 |
| [54](#case-54) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3529 | 18 | 112,632 | 0 | 0 | 1014_1843_inorder4-v3b140 | 全对·链闭 |
| [55](#case-55) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 103,433 | 0 | 0 | 1014_1844_inorder4-v3b141 | 全对·链闭 |
| [56](#case-56) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 104,861 | 0 | 0 | 1014_1846_inorder4-v3b142 | 全对·链闭 |
| [57](#case-57) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 11 | 83,930 | 0 | 0 | 1014_1848_inorder4-v3b143 | 全对·链闭 |
| [58](#case-58) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 70,189 | 0 | 0 | 1014_1850_inorder4-v3b144 | 全对·链闭 |
| [59](#case-59) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 88,692 | 0 | 0 | 1014_1851_inorder4-v3b145 | 全对·链闭 |
| [60](#case-60) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 83,004 | 0 | 0 | 1014_1853_inorder4-v3b146 | 全对·链闭 |
| [61](#case-61) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 103,236 | 0 | 0 | 1014_1855_inorder4-v3b147 | 全对·链闭 |
| [62](#case-62) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 92,274 | 0 | 0 | 1014_1858_inorder4-v3b148 | 全对·链闭 |
| [63](#case-63) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 84,521 | 0 | 0 | 1014_1900_inorder4-v3b149 | 全对·链闭 |
| [64](#case-64) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 88,295 | 0 | 0 | 1014_1902_inorder4-v3b150 | 全对·链闭 |
| [65](#case-65) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 90,227 | 0 | 0 | 1014_1904_inorder4-v3b151 | 全对·链闭 |
| [66](#case-66) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 90,572 | 0 | 0 | 1014_1906_inorder4-v3b152 | 全对·链闭 |
| [67](#case-67) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 137,527 | 0 | 0 | 1014_1908_inorder4-v3b153 | 全对·链闭 |
| [68](#case-68) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 103,001 | 0 | 0 | 1014_1910_inorder4-v3b154 | 全对·链闭 |
| [69](#case-69) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 133,049 | 0 | 0 | 1014_1911_inorder4-v3b155 | 全对·链闭 |
| [70](#case-70) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1481 | 28 | 275,399 | 0 | 0 | 1014_1913_inorder4-v3b156 | 全对·链闭 |
| [71](#case-71) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 90,384 | 0 | 0 | 1014_1917_inorder4-v3b157 | 全对·链闭 |
| [72](#case-72) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 88,543 | 0 | 0 | 1014_1919_inorder4-v3b158 | 全对·链闭 |
| [73](#case-73) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 121,766 | 0 | 0 | 1014_1920_inorder4-v3b159 | 全对·链闭 |
| [74](#case-74) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 88,560 | 0 | 0 | 1014_1922_inorder4-v3b160 | 全对·链闭 |
| [75](#case-75) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 85,469 | 0 | 0 | 1014_1924_inorder4-v3b161 | 全对·链闭 |
| [76](#case-76) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 103,632 | 0 | 0 | 1014_1926_inorder4-v3b162 | 全对·链闭 |
| [77](#case-77) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 87,754 | 0 | 0 | 1014_1929_inorder4-v3b163 | 全对·链闭 |
| [78](#case-78) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 104,428 | 0 | 0 | 1014_1931_inorder4-v3b164 | 全对·链闭 |
| [79](#case-79) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 85,335 | 0 | 0 | 1014_1933_inorder4-v3b165 | 全对·链闭 |
| [80](#case-80) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 69,417 | 0 | 0 | 1014_1935_inorder4-v3b166 | 全对·链闭 |
| [81](#case-81) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 82,646 | 0 | 0 | 1014_1938_inorder4-v3b167 | 全对·链闭 |
| [82](#case-82) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 89,236 | 0 | 0 | 1014_1940_inorder4-v3b168 | 全对·链闭 |
| [83](#case-83) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 104,428 | 0 | 0 | 1014_1942_inorder4-v3b169 | 全对·链闭 |
| [84](#case-84) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 70,430 | 0 | 0 | 1014_1942_inorder4-v3b169 | 全对·链闭 |
| [85](#case-85) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 85,378 | 0 | 0 | 1014_1942_inorder4-v3b169 | 全对·链闭 |
| [86](#case-86) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 71,618 | 0 | 0 | 1014_1944_inorder4-v3b170 | 全对·链闭 |
| [87](#case-87) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 85,027 | 0 | 0 | 1014_1944_inorder4-v3b170 | 全对·链闭 |
| [88](#case-88) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2353 | 18 | 116,451 | 0 | 0 | 1014_1944_inorder4-v3b170 | 全对·链闭 |
| [89](#case-89) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 115,313 | 0 | 0 | 1014_1946_inorder4-v3b171 | 全对·链闭 |
| [90](#case-90) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 88,834 | 0 | 0 | 1014_1946_inorder4-v3b171 | 全对·链闭 |
| [91](#case-91) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 85,992 | 0 | 0 | 1014_1946_inorder4-v3b171 | 全对·链闭 |
| [92](#case-92) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 108,560 | 0 | 0 | 1014_1949_inorder4-v3b172 | 全对·链闭 |
| [93](#case-93) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 110,405 | 0 | 0 | 1014_1949_inorder4-v3b172 | 全对·链闭 |
| [94](#case-94) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 88,377 | 0 | 0 | 1014_1949_inorder4-v3b172 | 全对·链闭 |
| [95](#case-95) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 86,769 | 0 | 0 | 1014_1949_inorder4-v3b172 | 全对·链闭 |
| [96](#case-96) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 89,965 | 0 | 0 | 1014_1950_inorder4-v3b173 | 全对·链闭 |
| [97](#case-97) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 84,486 | 0 | 0 | 1014_1950_inorder4-v3b173 | 全对·链闭 |
| [98](#case-98) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 86,216 | 0 | 0 | 1014_1950_inorder4-v3b173 | 全对·链闭 |
| [99](#case-99) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 103,487 | 0 | 0 | 1014_1950_inorder4-v3b173 | 全对·链闭 |
| [100](#case-100) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 91,599 | 0 | 0 | 1014_1952_inorder4-v3b174 | 全对·链闭 |
| [101](#case-101) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3077 | 14 | 85,087 | 0 | 0 | 1014_1952_inorder4-v3b174 | 全对·链闭 |
| [102](#case-102) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 107,318 | 0 | 0 | 1014_1952_inorder4-v3b174 | 全对·链闭 |
| [103](#case-103) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 70,860 | 0 | 0 | 1014_1952_inorder4-v3b174 | 全对·链闭 |
| [104](#case-104) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 99,923 | 0 | 0 | 1014_1954_inorder4-v3b175 | 全对·链闭 |
| [105](#case-105) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 71,701 | 0 | 0 | 1014_1954_inorder4-v3b175 | 全对·链闭 |
| [106](#case-106) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 85,962 | 0 | 0 | 1014_1954_inorder4-v3b175 | 全对·链闭 |
| [107](#case-107) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2727 | 12 | 69,797 | 0 | 0 | 1014_1954_inorder4-v3b175 | 全对·链闭 |
| [108](#case-108) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 13 | 71,125 | 0 | 0 | 1014_1955_inorder4-v3b176 | 全对·链闭 |
| [109](#case-109) | 1 | 1 | 1 | 0.6667 | 0.6667 | 0 | 0.1667 | 13 | 72,707 | 0 | 0 | 1014_1955_inorder4-v3b176 | 结果对·链未闭 |
| [110](#case-110) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 100,156 | 0 | 0 | 1014_1955_inorder4-v3b176 | 全对·链闭 |
| [111](#case-111) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 71,339 | 0 | 0 | 1014_1955_inorder4-v3b176 | 全对·链闭 |
| [112](#case-112) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 70,620 | 0 | 0 | 1014_1956_inorder4-v3b177 | 全对·链闭 |
| [113](#case-113) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 73,426 | 0 | 0 | 1014_1956_inorder4-v3b177 | 全对·链闭 |
| [114](#case-114) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 141,975 | 0 | 0 | 1014_1956_inorder4-v3b177 | 全对·链闭 |
| [115](#case-115) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3636 | 12 | 88,550 | 0 | 0 | 1014_1956_inorder4-v3b177 | 全对·链闭 |
| [116](#case-116) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2667 | 16 | 111,079 | 0 | 0 | 1014_1958_inorder4-v3b178 | 全对·链闭 |
| [117](#case-117) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 118,105 | 0 | 0 | 1014_1958_inorder4-v3b178 | 全对·链闭 |
| [118](#case-118) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1026 | 40 | 287,952 | 0.0256 | 0 | 1014_1958_inorder4-v3b178 | 全对·链闭 |
| [119](#case-119) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 13 | 85,230 | 0 | 0 | 1014_1958_inorder4-v3b178 | 全对·链闭 |
| [120](#case-120) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 90,989 | 0 | 0 | 1014_2001_inorder4-v3b179 | 全对·链闭 |
| [121](#case-121) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 112,713 | 0 | 0 | 1014_2001_inorder4-v3b179 | 全对·链闭 |
| [122](#case-122) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 89,049 | 0 | 0 | 1014_2001_inorder4-v3b179 | 全对·链闭 |
| [123](#case-123) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 90,872 | 0 | 0 | 1014_2001_inorder4-v3b179 | 全对·链闭 |
| [124](#case-124) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2 | 16 | 126,795 | 0 | 0 | 1014_2003_inorder4-v3b180 | 全对·链闭 |
| [125](#case-125) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2143 | 15 | 121,317 | 0 | 0 | 1014_2003_inorder4-v3b180 | 全对·链闭 |
| [126](#case-126) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2308 | 14 | 104,300 | 0 | 0 | 1014_2003_inorder4-v3b180 | 全对·链闭 |
| [127](#case-127) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3 | 11 | 96,178 | 0 | 0 | 1014_2003_inorder4-v3b180 | 全对·链闭 |
| [128](#case-128) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3889 | 19 | 115,187 | 0 | 0 | 1014_2005_inorder4-v3b181 | 全对·链闭 |
| [129](#case-129) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 108,826 | 0 | 0 | 1014_2005_inorder4-v3b181 | 全对·链闭 |
| [130](#case-130) | 1 | 1 | 1 | 1 | 1 | 1 | 0.35 | 21 | 135,409 | 0 | 0 | 1014_2005_inorder4-v3b181 | 全对·链闭 |
| [131](#case-131) | 1 | 1 | 1 | 1 | 1 | 1 | 0.4 | 16 | 90,744 | 0 | 0 | 1014_2005_inorder4-v3b181 | 全对·链闭 |
| [132](#case-132) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3333 | 22 | 137,996 | 0 | 0 | 1014_2007_inorder4-v3b182 | 全对·链闭 |
| [133](#case-133) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 90,393 | 0 | 0 | 1014_2007_inorder4-v3b182 | 全对·链闭 |
| [134](#case-134) | 1 | 1 | 1 | 1 | 1 | 1 | 0.3125 | 17 | 110,548 | 0 | 0 | 1014_2007_inorder4-v3b182 | 全对·链闭 |
| [135](#case-135) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 91,987 | 0 | 0 | 1014_2007_inorder4-v3b182 | 全对·链闭 |
| [136](#case-136) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2941 | 18 | 104,067 | 0 | 0 | 1014_2009_inorder4-v3b183 | 全对·链闭 |
| [137](#case-137) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 110,742 | 0 | 0 | 1014_2009_inorder4-v3b183 | 全对·链闭 |
| [138](#case-138) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1818 | 23 | 159,450 | 0 | 0 | 1014_2009_inorder4-v3b183 | 全对·链闭 |
| [139](#case-139) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1905 | 22 | 148,721 | 0 | 0 | 1014_2009_inorder4-v3b183 | 全对·链闭 |
| [140](#case-140) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 88,932 | 0 | 0 | 1014_2011_inorder4-v3b184 | 全对·链闭 |
| [141](#case-141) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1579 | 20 | 141,337 | 0 | 0 | 1014_2011_inorder4-v3b184 | 全对·链闭 |
| [142](#case-142) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1364 | 23 | 211,708 | 0 | 0 | 1014_2011_inorder4-v3b184 | 全对·链闭 |
| [143](#case-143) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 152,436 | 0 | 0 | 1014_2011_inorder4-v3b184 | 全对·链闭 |
| [144](#case-144) | 1 | 1 | 1 | 1 | 1 | 1 | 0.125 | 25 | 188,739 | 0 | 0 | 1014_2014_inorder4-v3b185 | 全对·链闭 |
| [145](#case-145) | 1 | 1 | 1 | 1 | 1 | 1 | 0.25 | 17 | 128,951 | 0 | 0 | 1014_2014_inorder4-v3b185 | 全对·链闭 |
| [146](#case-146) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2105 | 20 | 137,921 | 0 | 0 | 1014_2014_inorder4-v3b185 | 全对·链闭 |
| [147](#case-147) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1875 | 17 | 129,066 | 0 | 0 | 1014_2014_inorder4-v3b185 | 全对·链闭 |
| [148](#case-148) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 119,141 | 0 | 0 | 1014_2016_inorder4-v3b186 | 全对·链闭 |
| [149](#case-149) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 118,445 | 0 | 0 | 1014_2016_inorder4-v3b186 | 全对·链闭 |
| [150](#case-150) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 145,313 | 0 | 0 | 1014_2016_inorder4-v3b186 | 全对·链闭 |
| [151](#case-151) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2222 | 19 | 119,860 | 0 | 0 | 1014_2016_inorder4-v3b186 | 全对·链闭 |
| [152](#case-152) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 130,889 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [153](#case-153) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1765 | 18 | 133,053 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [154](#case-154) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2857 | 15 | 91,303 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [155](#case-155) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0857 | 36 | 575,813 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [156](#case-156) | 1 | 1 | 1 | 1 | 1 | 1 | 0.0909 | 34 | 575,267 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [157](#case-157) | 1 | 1 | 1 | 1 | 1 | 1 | 0.15 | 21 | 174,191 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [158](#case-158) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1154 | 27 | 222,046 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [159](#case-159) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1667 | 19 | 172,745 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [160](#case-160) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1111 | 28 | 190,263 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [161](#case-161) | 1 | 1 | 1 | 1 | 1 | 1 | 0.125 | 25 | 187,222 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [162](#case-162) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1429 | 29 | 219,169 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [163](#case-163) | 1 | 1 | 1 | 1 | 1 | 1 | 0.1154 | 27 | 164,047 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |
| [164](#case-164) | 1 | 1 | 1 | 1 | 1 | 1 | 0.2632 | 20 | 143,676 | 0 | 0 | 1014_2130_inorder4-final13 | 全对·链闭 |

## 证据正文

### case-1

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 115,405
- **raw 日志**：[results/1012_1415_inorder4-v3/raw/1012_1416_boutique-scheduling-1](../results/1012_1415_inorder4-v3/raw/1012_1416_boutique-scheduling-1/)（ndjson / mcp.jsonl / meta）
- **摘要**：Anchor: cartservice-79b49f5555-rl2kp is the only outlier pod in boutique (0/1 Pending, NODE <none>); all other 10 services are 1/1 Running, and Deployment cartservice shows 0/1 AVAILABLE. Pod describe: PodScheduled=False with event 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable. preemption: ... not helpful', while the pod spec has Node-Selectors: <none> and no affinity - so the pod itself imposes no placement constraint. Node layer: all four nodes (master, worker-01, worker-02, worker-03) report Ready,SchedulingDisabled with Taints node.kubernetes.io/unschedul

### case-2

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.12 · steps 26 · tokens 203,615
- **raw 日志**：[results/1012_1846_inorder4-v3b4/raw/1012_1847_boutique-scheduling-2](../results/1012_1846_inorder4-v3b4/raw/1012_1847_boutique-scheduling-2/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller side (frontend logs) shows 'rpc error: code = Unavailable ... lookup checkoutservice ... no such host' failing checkout requests, and the checkoutservice Service has only 1 ready endpoint (172.20.2.81:5050) while its Deployment is 1/5 READY (UP-TO-DATE 5). Object layer: 4 checkoutservice pods are Pending (0/1) while all other 10 boutique services are 1/1 Running with 0 restarts. Mechanism event: pod checkoutservice-8445f8b6cb-9tn5x reports PodScheduled=False, Warning FailedScheduling '0/4 nodes are available: 4 node(s) were unschedulable'. Configuration close: GetResources(nodes)/GetClu

### case-3

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 84,424
- **raw 日志**：[results/1012_1856_inorder4-v3b5/raw/1012_1857_boutique-scheduling-3](../results/1012_1856_inorder4-v3b5/raw/1012_1857_boutique-scheduling-3/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间首轮 pods 扫描显示唯一离群对象 emailservice：3 副本中 2 个 Pending（0/1，无节点），Deployment 显示 1/3 READY、AVAILABLE 1，其余 10 个服务均 1/1 Running，即服务部分不可达（emailservice:5000 连通性实测仍 open，仅 1/3 后端可用）。describe 离群 Pod 得到机制事件：'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable'，Pod 无 nodeSelector/affinity。节点面收口：GetClusterConfiguration 与 DescribeResource node worker-01 显示 4/4 节点均 Taints: node.kubernetes.io/unschedulable:NoSchedule 且 Unschedulable: true，kubelet 事件 'NodeNotSchedulable (x9 over 11h)'，节点资源充裕（cpu 8、mem 15G、已分配约 12%），排除容量类原因。工作负载面收口：emailservice 模板无 nodeSelector/affinity，toleratio

### case-4

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 22 · tokens 153,471
- **raw 日志**：[results/1012_1928_inorder4-v3b6/raw/1012_1928_boutique-scheduling-4](../results/1012_1928_inorder4-v3b6/raw/1012_1928_boutique-scheduling-4/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend Deployment scaled 3->5 (ScalingReplicaSet events) with only 1/5 available; 4 frontend pods Pending with 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable'. All four nodes are Ready but cordoned (STATUS Ready,SchedulingDisabled; taints node.kubernetes.io/unschedulable:NoSchedule; node Unschedulable: true; node events NodeNotSchedulable), while nodes are Ready/healthy (KubeletReady, no Memory/Disk/PID pressure) with ample allocatable CPU (8) / memory (~15Gi) and only 12-14% requested - so not capacity. Pod template has Node-Selectors <none>, no affinity, toleratio

### case-5

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 103,798
- **raw 日志**：[results/1013_1134_inorder4-v3b10/raw/1013_1136_boutique-scheduling-5](../results/1013_1134_inorder4-v3b10/raw/1013_1136_boutique-scheduling-5/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice is the only outlier: Deployment 1/5 READY with 4 pods (paymentservice-78c5996648-lgxtf/rjkp5/t7ckh/t82nf) stuck 0/1 Pending, and endpoints/paymentservice exposes only one address (172.20.3.57:50051) -> partial service unreachability. Its Pending pods report the mechanism event 'FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable', which names cordon rather than capacity/affinity/taint: GetResources(nodes -o wide) shows all four nodes 'Ready,SchedulingDisabled', and DescribeResource(node/worker-01) shows 'Unschedulable: true' with taint node.kubernetes.io/unsc

### case-6

- **结论**：`app/productcatalogservice` + `node_cordon_mismatch` ｜ 标签 `app/productcatalogservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 82,842
- **raw 日志**：[results/1013_1350_order-verify1/raw/1013_1350_boutique-scheduling-6](../results/1013_1350_order-verify1/raw/1013_1350_boutique-scheduling-6/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side symptom enters from frontend: 180/182 error logs are 'could not retrieve products/product: rpc error code=Unavailable ... dial tcp 10.68.235.126:3550: connect: connection refused', and CheckServiceConnectivity(productcatalogservice:3550) returns Connection Failed. The only outlier in the workload scan is productcatalogservice: deployment 0/3 AVAILABLE, all three pods (ddb46fc86-2fqgv/69krc/xm7ln) 0/1 Pending with no node assigned, while all other 10 services are 1/1 Running. The pod's own reason is 'FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable' - the s

### case-7

- **结论**：`app/redis-cart` + `node_cordon_mismatch` ｜ 标签 `app/redis-cart` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 131,524
- **raw 日志**：[results/1013_1524_inorder4-v3b18/raw/1013_1526_boutique-scheduling-7](../results/1013_1524_inorder4-v3b18/raw/1013_1526_boutique-scheduling-7/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom names no service, so the inventory listing was the entry: every service is 1/1 Running except redis-cart (deployment 1/5, four pods Pending with no Node assigned). The affected pod's own reason is the mechanism event: DescribeResource(pod=redis-cart-68db7b6f97-5nwwk, and identically -hlbw9) shows Conditions PodScheduled=False with 'Warning FailedScheduling ... 0/4 nodes are available: 4 node(s) were unschedulable. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' The node surface confirms the blocker: GetResources(nodes) shows master, worker-01, worker-0

### case-8

- **结论**：`app/shippingservice` + `node_cordon_mismatch` ｜ 标签 `app/shippingservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 130,578
- **raw 日志**：[results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-scheduling-8](../results/1013_1541_inorder4-v3b20/raw/1013_1541_boutique-scheduling-8/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods(-o wide) 清单唯一离群行为 shippingservice：3 个副本 Pending/无节点（deployment 2/5 available），其余 10 个服务均 1/1 Running；Pending pod 的 DescribeResource 给出机制事件 'Warning FailedScheduling: 0/4 nodes are available: 4 node(s) were unschedulable'；节点侧 GetResources(nodes)=四个节点全部 Ready,SchedulingDisabled，GetClusterConfiguration 显示每个节点带 taint node.kubernetes.io/unschedulable:NoSchedule，worker-01 DescribeResource 确认 Unschedulable: true 且事件 NodeNotSchedulable 90s(x3 over 4m54s)（封禁晚于在跑 Pod 的调度时刻）；GetAppYAML(shippingservice) 显示 pod 模板无 nodeSelector/affinity，tolerations 仅默认 not-ready/unreachable，无法容忍 unschedulable 污点，排除亲和/

### case-9

- **结论**：`app/cartservice` + `node_cordon_mismatch` ｜ 标签 `app/cartservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 130,741
- **raw 日志**：[results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-scheduling-9](../results/1013_1628_inorder4-v3b22/raw/1013_1628_boutique-scheduling-9/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace inventory scan isolated a single outlier: cartservice-5955678f49-ct98j is Pending 0/1 with no node assigned, while all 10 other boutique pods are 1/1 Running; Deployment cartservice is 0/1 UP-TO-DATE 1 AVAILABLE 0. Victim-side signal: Service cartservice has NO endpoints, active probe of cartservice:7070 returned 'Connection Failed', and caller logs (frontend) show 170x 'could not retrieve cart' and 117x 'failed to add to cart' with 'dial tcp 10.68.243.208:7070: connect: connection refused' - a partial unreachability confined to cartservice. Mechanism event: Warning FailedScheduling 

### case-10

- **结论**：`app/checkoutservice` + `node_cordon_mismatch` ｜ 标签 `app/checkoutservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 186,153
- **raw 日志**：[results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-scheduling-10](../results/1013_1656_inorder4-v3b25/raw/1013_1656_boutique-scheduling-10/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (only legitimate full scan, wide form) shows a single outlier: checkoutservice-6b448f7956-xbc46 0/1 Pending with Node=<none>. DescribeResource(pod) gives the pod's own reason: Node-Selectors: hardware-type=gpu and 'Warning FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. Node side: GetClusterConfiguration / nodes listing show worker-01 is the ONLY node carrying label hardware-type=gpu, and it is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule (Unschedulable: true); mast

### case-11

- **结论**：`app/currencyservice` + `node_cordon_mismatch` ｜ 标签 `app/currencyservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 132,905
- **raw 日志**：[results/1013_1810_inorder4-v3b27/raw/1013_1811_boutique-scheduling-11](../results/1013_1810_inorder4-v3b27/raw/1013_1811_boutique-scheduling-11/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend caller errors 'could not retrieve currencies: rpc error ... dial tcp 10.68.108.3:7000: connect: connection refused' (153/165 errors) and CheckServiceConnectivity(currencyservice:7000) = Connection Failed; upstream env CURRENCY_SERVICE_ADDR=currencyservice:7000. Object layer: the only outlier pod is currencyservice-6f654d5956-ff8rt 0/1 Pending (all 10 other boutique pods 1/1 Running) and deployment currencyservice is 0/1 available. Mechanism event on the pod: Warning FailedScheduling '0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) 

### case-12

- **结论**：`app/emailservice` + `node_cordon_mismatch` ｜ 标签 `app/emailservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.129 · steps 32 · tokens 325,732
- **raw 日志**：[results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-scheduling-12](../results/1013_1834_inorder4-v3b30/raw/1013_1834_boutique-scheduling-12/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side first: connectivity probe to emailservice:5000 -> 'Connection Failed'. Object-layer outlier in boutique: pod emailservice-66975b79b8-8k46l is 0/1 Pending (Node: <none>, PodScheduled=False) while all other 10 services are 1/1 Running with 0 restarts; owner chain agrees (deployment emailservice 0/1 AVAILABLE, RS revision 1 with 1 Waiting pod). Mechanism event on the pod: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable.' The pod template requires nodeSelector hardware-type=gpu, and the ONLY node carrying

### case-13

- **结论**：`app/frontend` + `node_cordon_mismatch` ｜ 标签 `app/frontend` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 175,486
- **raw 日志**：[results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-scheduling-13](../results/1014_1855_inorder4-v3b147/raw/1014_1855_boutique-scheduling-13/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend Services (frontend, frontend-external) have <none> endpoints; only outlier in the pods inventory is frontend-6d8845c9d6-9l86h (0/1 Pending, NODE <none>), owner chain frontend Deployment 0/1 READY with a single ReplicaSet (creation succeeded, never scheduled). Pod sheet: Node-Selectors: hardware-type=gpu; condition PodScheduled=False; Event Warning FailedScheduling '0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. Node layer: only worker-02 carries label hardware-type=gpu (the sole node satisfying frontend's pin)

### case-14

- **结论**：`app/paymentservice` + `node_cordon_mismatch` ｜ 标签 `app/paymentservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 113,543
- **raw 日志**：[results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-scheduling-14](../results/1014_1858_inorder4-v3b148/raw/1014_1858_boutique-scheduling-14/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique's only unhealthy workload is paymentservice-649775dc6-r5gvj (0/1 Pending, no node, no IP); CheckServiceConnectivity(paymentservice:50051) returns Connection Failed. DescribeResource on the pod shows the mechanism verbatim: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable', with Node-Selectors: hardware-type=gpu. GetClusterConfiguration shows worker-01 is the ONLY node carrying hardware-type=gpu, and worker-01 is cordoned (Unschedulable: true, taint node.kubernetes.io/unschedulable:NoSchedule), as

### case-15

- **结论**：`app/productcatalogservice` + `node_cordon_mismatch` ｜ 标签 `app/productcatalogservice` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 138,717
- **raw 日志**：[results/1014_1900_inorder4-v3b149/raw/1014_1900_boutique-scheduling-15](../results/1014_1900_inorder4-v3b149/raw/1014_1900_boutique-scheduling-15/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only productcatalogservice is down (deployment 0/1 AVAILABLE, pod productcatalogservice-cd5dd69d6-66hjl Pending, READY 0/1) while all other 10 boutique pods are 1/1 Running. Pod events: 'FailedScheduling ... 0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable' with Node-Selectors: hardware-type=gpu; PodScheduled=False. Node surface: worker-01 is the ONLY node carrying label hardware-type=gpu, and it is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule (Unschedulable: true), while the schedu

### case-16

- **结论**：`app/redis-cart` + `node_cordon_mismatch` ｜ 标签 `app/redis-cart` + `node_cordon_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.15 · steps 21 · tokens 184,788
- **raw 日志**：[results/1014_1902_inorder4-v3b150/raw/1014_1902_boutique-scheduling-16](../results/1014_1902_inorder4-v3b150/raw/1014_1902_boutique-scheduling-16/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only drained workload in boutique: pod redis-cart-59f87cbf9-9d5p4 is 0/1 Pending (Node: <none>, PodScheduled False) while all 10 peer app pods are 1/1 Running; deployment redis-cart shows 0/1 AVAILABLE. The pod's own scheduling event reads '0/4 nodes are available: 2 node(s) didn't match Pod's node affinity/selector, 2 node(s) were unschedulable'. The pod detail carries Node-Selectors: hardware-type=gpu, and the nodes listing shows only worker-03 bears the hardware-type=gpu label — but worker-03 is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedul

### case-17

- **结论**：`app/cartservice` + `cpu_capacity_mismatch` ｜ 标签 `app/cartservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 191,387
- **raw 日志**：[results/1014_1904_inorder4-v3b151/raw/1014_1904_boutique-scheduling-17](../results/1014_1904_inorder4-v3b151/raw/1014_1904_boutique-scheduling-17/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing shows a single outlier: cartservice-6b9c55fd97-hxwnf is Pending 0/1 (all other 10 pods 1/1 Running). Its own sheet carries the blocker verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' GetAppYAML(cartservice) shows the container requesting cpu: "16" (requests and limits) while memory stays at the normal 64Mi/128Mi; GetClusterConfiguration / nodes -o wide show every node's allocatable CPU is only 8 cores (master cordoned with taint node.kubernetes.io/unschedulable, worker-01/02/03 Ready, untainted) so the 

### case-18

- **结论**：`app/checkoutservice` + `cpu_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 103,184
- **raw 日志**：[results/1014_1906_inorder4-v3b152/raw/1014_1906_boutique-scheduling-18](../results/1014_1906_inorder4-v3b152/raw/1014_1906_boutique-scheduling-18/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: checkoutservice is the only outlier (pod checkoutservice-78dd6d5b78-csrlh, 0/1 Pending) while all other 10 pods are 1/1 Running; probing the port its own Service declares (5050) gives 'Connection Failed' and its endpoints listing is '<none>', matching the reported partial unreachability. The pod's own sheet carries the mechanism: Node <none>, PodScheduled False, event 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'. The owner chain shows deployment checkoutservice READY 0/1, AVAILABLE 0. Node layer discriminates: all 4 nodes 

### case-19

- **结论**：`app/emailservice` + `cpu_capacity_mismatch` ｜ 标签 `app/emailservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 67,524
- **raw 日志**：[results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-scheduling-19](../results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-scheduling-19/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice is the only outlier in the boutique namespace: pod emailservice-bb4fd5fd6-fq5hz is 0/1 Pending with no node assigned, and Deployment emailservice reads 0/1 AVAILABLE (all other 10 services are 1/1). DescribeResource on the pod gives the mechanism verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: ... 3 No preemption victims found for incoming pod.' GetAppYAML(emailservice) confirms the mechanism's source: the container requests cpu: "12" (limit cpu: "12"), while GetClusterConfiguration shows every node allocates o

### case-20

- **结论**：`app/frontend` + `cpu_capacity_mismatch` ｜ 标签 `app/frontend` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 87,124
- **raw 日志**：[results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-scheduling-20](../results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-scheduling-20/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend was the only drained workload: pods listing (-o wide) showed frontend-6ffb85fd4-fc6tb 0/1 Pending with no node assigned while all other 10 boutique services ran 1/1. The pod's own scheduler event read verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' GetClusterConfiguration showed every node Ready with allocatable cpu=8 and no pressure conditions; only 'master' is cordoned (Ready,SchedulingDisabled, also 8 CPU), so the binding constraint is the 3 schedulable workers being CPU-insufficient. GetAppYAML(frontend) confirmed the fro

### case-21

- **结论**：`app/paymentservice` + `cpu_capacity_mismatch` ｜ 标签 `app/paymentservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 87,278
- **raw 日志**：[results/1014_1911_inorder4-v3b155/raw/1014_1911_boutique-scheduling-21](../results/1014_1911_inorder4-v3b155/raw/1014_1911_boutique-scheduling-21/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice pod paymentservice-6cff9d48f4-mwggd is stuck 0/1 Pending with no node assigned (all other boutique services Running). Its own scheduler reason reads verbatim 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' Node side: master is Ready,SchedulingDisabled (taint node.kubernetes.io/unschedulable:NoSchedule) while worker-01/02/03 are Ready, untainted and each expose allocatable cpu: 8. GetAppYAML(paymentservice) confirms the pod template requests cpu: "12" (and limits cpu: "12"), i.e. more than any single node's entire allocatable CPU,

### case-22

- **结论**：`app/productcatalogservice` + `cpu_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 91,234
- **raw 日志**：[results/1014_1913_inorder4-v3b156/raw/1014_1913_boutique-scheduling-22](../results/1014_1913_inorder4-v3b156/raw/1014_1913_boutique-scheduling-22/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: productcatalogservice endpoints are <none> and a TCP probe of its declared port 3550 returned 'Connection Failed', while all other 10 boutique services have bound endpoints (hence 'partial'). Object scan: the sole outlier pod productcatalogservice-5d475f9fb-7nrnf is 0/1 Pending with Node <none>; owner deployment productcatalogservice is 0/1 AVAILABLE. Pod sheet carries the mechanism event: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu' — so it IS a capacity/scheduling story. Node layer: master is Ready,SchedulingDisabled with the 

### case-23

- **结论**：`app/recommendationservice` + `cpu_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 112,904
- **raw 日志**：[results/1014_1917_inorder4-v3b157/raw/1014_1917_boutique-scheduling-23](../results/1014_1917_inorder4-v3b157/raw/1014_1917_boutique-scheduling-23/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one outlier in the boutique inventory: recommendationservice-94fcdb6bd-gshxk is 0/1 Pending with Node <none>, while all 11 sibling services are 1/1 Running. Victim signal leads: the recommendationservice endpoints listing shows <none> (all siblings bound) and a connectivity probe on its declared port 8080 returns 'Connection Failed'. The pod's own sheet carries the scheduling line: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' GetAppYAML(recommendationservice) shows the template requesting cpu: "14" (request and limit), whereas e

### case-24

- **结论**：`app/redis-cart` + `cpu_capacity_mismatch` ｜ 标签 `app/redis-cart` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 112,155
- **raw 日志**：[results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-scheduling-24](../results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-scheduling-24/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptoms entry via inventory listing: only redis-cart-54754cc77c-qgnv6 is an outlier (0/1 Pending, no NODE assigned), while all other 10 boutique pods are 1/1 Running and deployments show redis-cart 0/1 AVAILABLE; no metric alerts. The pod's own reason reads verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu' (FailedScheduling) — a scheduling-stage break. Node side: worker-01/02/03 are Ready, untainted (Taints: <none>, Unschedulable: false) with Allocatable cpu: 8 and only ~1125m (14%) CPU already requested, so capacity is free; the master is SchedulingDisabled

### case-25

- **结论**：`app/shippingservice` + `cpu_capacity_mismatch` ｜ 标签 `app/shippingservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 93,364
- **raw 日志**：[results/1014_1920_inorder4-v3b159/raw/1014_1920_boutique-scheduling-25](../results/1014_1920_inorder4-v3b159/raw/1014_1920_boutique-scheduling-25/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the unreachable unit: its Service 'shippingservice' lists ENDPOINTS <none> and a connectivity probe on its declared port 50051 returned 'Connection Failed', while all ten other boutique pods are 1/1 Running. Its pod shippingservice-6bb75d8c98-zd62f is 0/1 Pending with Node <none>, and the deployment reports 0/1 AVAILABLE (replica exists, so this is not admission). The pod's own sheet carries the live mechanism event: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 ... 3 No preemption victims found'. Node ca

### case-26

- **结论**：`app/adservice` + `cpu_capacity_mismatch` ｜ 标签 `app/adservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 132,310
- **raw 日志**：[results/1014_1922_inorder4-v3b160/raw/1014_1922_boutique-scheduling-26](../results/1014_1922_inorder4-v3b160/raw/1014_1922_boutique-scheduling-26/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice 的 Pod（adservice-55f4bdbfc8-q5r4z）是 boutique 中唯一离群实例：STATUS=Pending、0/1、PodScheduled=False，而其余 13 个 pod 全部 1/1 Running；其 Service 无后端（endpoints: adservice <none>，9555 连通性检查 Connection Failed）。Pod 自身理由与 namespace 事件面逐字给出机制：FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'（在 adservice-58dbccc5d 与 adservice-55f4bdbfc8 上反复出现）。配置面 GetAppYAML(adservice) 显示 requests.cpu=5000m（远超上游默认），节点面显示 3 个 worker allocatable cpu=8，但 DaemonSet cpu-consumer 每节点一个 pod 各 Requests cpu=5，使每个 worker 仅剩 ~3 CPU 空闲，无法容纳 5000m 的请求；master 另因 cordon 不可调度（Ready,SchedulingDisab

### case-27

- **结论**：`app/cartservice` + `cpu_capacity_mismatch` ｜ 标签 `app/cartservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 225,604
- **raw 日志**：[results/1014_1924_inorder4-v3b161/raw/1014_1924_boutique-scheduling-27](../results/1014_1924_inorder4-v3b161/raw/1014_1924_boutique-scheduling-27/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is confined to cartservice: the pods inventory shows the single outlier cartservice-5cddc7cc77-cxhfn 0/1 Pending with Node=<none> and PodScheduled=False, while all other boutique pods are 1/1 Running and the frontend entrypoint is reachable (10.68.69.105:80 open). The victim's own signals agree: endpoints for cartservice are <none> and a TCP probe on the Service's declared port 7070 returns Connection Failed. The mechanism event is verbatim: 'Warning FailedScheduling pod/cartservice-5cddc7cc77-cxhfn - 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient 

### case-28

- **结论**：`app/checkoutservice` + `cpu_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2381 · steps 22 · tokens 181,779
- **raw 日志**：[results/1014_1926_inorder4-v3b162/raw/1014_1926_boutique-scheduling-28](../results/1014_1926_inorder4-v3b162/raw/1014_1926_boutique-scheduling-28/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only outlier is checkoutservice-7587897bf4-m6x7w, 0/1 Pending with Node <none>. Its Service has no endpoints ('checkoutservice <none>') and a TCP probe on the declared port 5050 returns Connection Failed, while all 11 other services are reachable - the reported partial unreachability. Pod sheet: PodScheduled=False with event 'FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu; preemption: 3 No preemption victims found'. The unschedulable node is master (Ready,SchedulingDisabled by design, no nodeSelector on the pod), so the blocker i

### case-29

- **结论**：`app/currencyservice` + `cpu_capacity_mismatch` ｜ 标签 `app/currencyservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 129,361
- **raw 日志**：[results/1014_1929_inorder4-v3b163/raw/1014_1929_boutique-scheduling-29](../results/1014_1929_inorder4-v3b163/raw/1014_1929_boutique-scheduling-29/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one workload deviates in the namespace inventory: pod currencyservice-6669d77476-7l6wl is 0/1 Pending with Node <none> (all other services 1/1 Running) -> partial unreachability. Victim-side signal confirms it: CheckServiceConnectivity(currencyservice:7000) = Connection Failed and endpoints currencyservice = <none>, deployment currencyservice 0/1 AVAILABLE. The pod's own sheet carries the mechanism event verbatim: Warning FailedScheduling from default-scheduler '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: ... 3 No preemption victims found for inc

### case-30

- **结论**：`app/emailservice` + `cpu_capacity_mismatch` ｜ 标签 `app/emailservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 87,251
- **raw 日志**：[results/1014_1931_inorder4-v3b164/raw/1014_1931_boutique-scheduling-30](../results/1014_1931_inorder4-v3b164/raw/1014_1931_boutique-scheduling-30/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in boutique shows a single outlier: emailservice-6cc965cc46-x4xnv 0/1 Pending, no node assigned (all other 14 pods 1/1 Running, no restarts). Its own describe gives the mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: ... 3 No preemption victims found'. Node side: 4 Ready nodes with allocatable cpu=8, worker-01/02/03 untainted; the '1 unschedulable' node is master, which carries its baseline node.kubernetes.io/unschedulable:NoSchedule taint. Config face: emailservice Deployment requests cpu="5"

### case-31

- **结论**：`app/frontend` + `cpu_capacity_mismatch` ｜ 标签 `app/frontend` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 103,861
- **raw 日志**：[results/1014_1933_inorder4-v3b165/raw/1014_1933_boutique-scheduling-31](../results/1014_1933_inorder4-v3b165/raw/1014_1933_boutique-scheduling-31/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing (wide) shows the only outlier: frontend-849b4c58f6-vnz5p is 0/1 Pending with no node assigned, while all other 14 boutique pods are 1/1 Running; deployments listing confirms frontend is the only drained workload (0/1 AVAILABLE, others 1/1). The pod's own FailedScheduling event reads verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu.' Node side (GetClusterConfiguration): worker-01/02/03 are Ready, untainted, each with only cpu:8 allocatable; master is Ready but carries node.kubernetes.io/unschedulable:NoSchedule (the single 'unschedulable' node). 

### case-32

- **结论**：`app/paymentservice` + `cpu_capacity_mismatch` ｜ 标签 `app/paymentservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 137,758
- **raw 日志**：[results/1014_1935_inorder4-v3b166/raw/1014_1935_boutique-scheduling-32](../results/1014_1935_inorder4-v3b166/raw/1014_1935_boutique-scheduling-32/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间中 paymentservice-6d68bc998-996g5 停留在 Pending 0/1 且未绑定节点，是 pods 清单中唯一离群行（其余 14 个 pod 均 1/1 Running）。其 DescribeResource 机制事件原文为 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'。节点侧核对：worker-01/02/03 均 Ready、无 taint、Unschedulable: false、allocatable cpu=8，但 Allocated resources 已达 6095m(76%)/6125m(76%)/5925m(74%)（每节点含一个 mypod-* CPU Requests 5），剩余仅约 1.9-2.1 CPU，远小于该 Pod 的请求；master 为基线 SchedulingDisabled。配置确认：GetAppYAML(paymentservice) 声明 resources.requests.cpu="6" 与 limits.cpu="6"（同类服务仅 100m-200m），与节点可用 CPU 容量不匹配，导致 3 个 worker 全部报 Insuffic

### case-33

- **结论**：`app/recommendationservice` + `cpu_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 151,011
- **raw 日志**：[results/1014_1938_inorder4-v3b167/raw/1014_1938_boutique-scheduling-33](../results/1014_1938_inorder4-v3b167/raw/1014_1938_boutique-scheduling-33/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中唯一离群对象为 recommendationservice-7d45bcf848-mzsmj：0/1 Pending、Node <none>，deployment recommendationservice 0/1 AVAILABLE、endpoints 为 <none>、连通性探测 8080 失败（部分服务不可达来自此服务）。Pod 自身清单给出机制事件 'FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu'。节点侧：4 节点 allocatable cpu 均为 8；master 仅因设计中 cordon（unschedulable taint, 已用 5425m/67%）不是阻塞点，三台 worker 均 Ready 无 taint 但已被占用 worker-01 6095m(76%)、worker-02 6125m(76%)（其中 cpu-consumer DaemonSet 每节点请求 cpu:5），剩余约 1.9 核。配置面 GetAppYAML(recommendationservice) 显示容器 requests/limits cpu: 5000m，远超任何节点可用 CPU，故 Pod 无法调度。排除项：命名空间无

### case-34

- **结论**：`app/shippingservice` + `cpu_capacity_mismatch` ｜ 标签 `app/shippingservice` + `cpu_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 89,576
- **raw 日志**：[results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-scheduling-34](../results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-scheduling-34/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory outlier: shippingservice-5449885c98-jtww7 is 0/1 Pending with no node bound, while all other boutique workloads run 1/1. Its Service (port 50051/TCP per its own spec) fails connectivity, and deployment shippingservice reads 0/1 AVAILABLE. The pod's own FailedScheduling event states verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient cpu. preemption: 0/4 nodes are available: ... 3 No preemption victims found'. Node side: all 4 nodes Ready with allocatable cpu=8; master carries only the standard node.kubernetes.io/unschedulable taint (1 unschedulable = cont

### case-35

- **结论**：`app/cartservice` + `memory_capacity_mismatch` ｜ 标签 `app/cartservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 104,468
- **raw 日志**：[results/1014_1911_inorder4-v3b155/raw/1014_1912_boutique-scheduling-35](../results/1014_1911_inorder4-v3b155/raw/1014_1912_boutique-scheduling-35/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice-7f8574fc8d-gv26b is the only outlier in the pods listing: READY 0/1, STATUS Pending, NODE <none>. Its own record carries the mechanism event: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. The config face confirms the mismatch: GetAppYAML(cartservice) sets container resources requests/limits memory=20Gi, while GetClusterConfiguration shows every node's allocatable memory at only 1567134x Ki (~14.9GiB) — the 20Gi request exceeds any node's allocatable memory, so no worker can host the pod (the single 'unschedulable' node is the m

### case-36

- **结论**：`app/checkoutservice` + `memory_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 102,563
- **raw 日志**：[results/1014_1913_inorder4-v3b156/raw/1014_1914_boutique-scheduling-36](../results/1014_1913_inorder4-v3b156/raw/1014_1914_boutique-scheduling-36/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice pod checkoutservice-86b8558dc-wbpvr is stuck Pending (0/1, PodScheduled=False) while all other 10 boutique services are 1/1 Running. The pod's own reason line reads verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 ... No preemption victims found'. The config face confirms the mechanism: the Deployment requests memory: 30Gi (== its limit), while every node's allocatable memory is only ~15671348Ki (~14.9Gi) — so the request can never fit on any worker. Worker-01/02/03 are all Ready, untainted and free of

### case-37

- **结论**：`app/currencyservice` + `memory_capacity_mismatch` ｜ 标签 `app/currencyservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 88,610
- **raw 日志**：[results/1014_1917_inorder4-v3b157/raw/1014_1918_boutique-scheduling-37](../results/1014_1917_inorder4-v3b157/raw/1014_1918_boutique-scheduling-37/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique: currencyservice-6dddb8ccb5-4hbm5 is 0/1 Pending with Node:<none>, while all other 10 pods are 1/1 Running; endpoints/currencyservice shows ENDPOINTS <none> (no backend -> partial unreachability). The pod sheet carries the scheduling line verbatim: 'Warning FailedScheduling 30s default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found for incoming pod.' The deployment template (GetAppYAML currencyservice) requests/limits memory: 20Gi, whereas every schedulable worker's allocatable memory is o

### case-38

- **结论**：`app/frontend` + `memory_capacity_mismatch` ｜ 标签 `app/frontend` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 91,529
- **raw 日志**：[results/1014_1919_inorder4-v3b158/raw/1014_1920_boutique-scheduling-38](../results/1014_1919_inorder4-v3b158/raw/1014_1920_boutique-scheduling-38/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability localizes to the boutique entry service: the endpoints listing shows every Service bound except `frontend`/`frontend-external` (ENDPOINTS <none>), and an active TCP probe on frontend:80 (its declared port) returns Connection Failed. The object layer shows the lone outlier frontend-54565b4ccc-9hn89 as 0/1 Pending with Node <none>, owner Deployment frontend 0/1 READY (desired replicas=1, UP-TO-DATE 1, AVAILABLE 0); all other 10 pods are 1/1 Running. The pod's own sheet carries the mechanism: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3

### case-39

- **结论**：`app/paymentservice` + `memory_capacity_mismatch` ｜ 标签 `app/paymentservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3846 · steps 14 · tokens 104,305
- **raw 日志**：[results/1014_1920_inorder4-v3b159/raw/1014_1921_boutique-scheduling-39](../results/1014_1920_inorder4-v3b159/raw/1014_1921_boutique-scheduling-39/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing in namespace boutique shows a single outlier: paymentservice-9c44ddcbf-g9t92 is 0/1 Pending with Node:<none> while all other 10 boutique pods are 1/1 Running. The pod's own sheet carries the mechanism verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: 0/4 nodes are available: 1 Preemption is not helpful for scheduling, 3 No preemption victims found for incoming pod.' with PodScheduled=False. The config face the mechanism points at confirms the mismatch: GetAppYAML(paymentservice) declares resources.requests

### case-40

- **结论**：`app/productcatalogservice` + `memory_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 84,438
- **raw 日志**：[results/1014_1922_inorder4-v3b160/raw/1014_1923_boutique-scheduling-40](../results/1014_1922_inorder4-v3b160/raw/1014_1923_boutique-scheduling-40/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory listing showed the single outlier productcatalogservice-c589fc787-gf9w5 as 0/1 Pending while all other 10 boutique pods were 1/1 Running. Its own Pod sheet carries the mechanism: Node <none>, PodScheduled False, 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. Node surface confirms the blocker is capacity, not cordon/taint: all three workers are Ready, untainted, but allocatable memory is only 15671348Ki (~14.95Gi), while GetAppYAML(productcatalogservice) declares requests/limits memory = 22Gi in the pod template — 22Gi exceeds 

### case-41

- **结论**：`app/recommendationservice` + `memory_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 87,048
- **raw 日志**：[results/1014_1924_inorder4-v3b161/raw/1014_1925_boutique-scheduling-41](../results/1014_1924_inorder4-v3b161/raw/1014_1925_boutique-scheduling-41/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice-7f9977467f-t66vg is 0/1 Pending while all other 10 boutique pods are 1/1 Running. Its own FailedScheduling event reads verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory', i.e. the scheduler rejects it on node memory capacity. GetClusterConfiguration shows every node (master, worker-01/02/03) allocatable memory = 15671352Ki (~14.94 GiB), all Ready with MemoryPressure=False; GetAppYAML(recommendationservice) shows the pod template requests memory: 20Gi (requests and limits), which exceeds any single node's allocatable memory, so no node 

### case-42

- **结论**：`app/redis-cart` + `memory_capacity_mismatch` ｜ 标签 `app/redis-cart` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 86,031
- **raw 日志**：[results/1014_1926_inorder4-v3b162/raw/1014_1928_boutique-scheduling-42](../results/1014_1926_inorder4-v3b162/raw/1014_1928_boutique-scheduling-42/)（ndjson / mcp.jsonl / meta）
- **摘要**：唯一离群对象为 redis-cart-d9c95f94d-tshkh (0/1 Pending, Node:<none>), 其余 10 个服务均 1/1 Running/RESTARTS=0。victim 自身信号先行: CheckServiceConnectivity(redis-cart:6379) 返回 Connection Failed, endpoints 清单中 redis-cart 为 <none>。Pod 自身事件给出机制: 'FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory' (descheduler 阶段, PodScheduled False, 从未绑定)。配置确认面: GetAppYAML(redis-cart) 中容器 redis 的 requests/limits memory 均为 20Gi; 而 GetClusterConfiguration 显示全部节点 allocatable memory 仅约 15671348Ki(≈14.9GiB), 即 20Gi 请求超过任一节点可分配内存, 三个 worker 全报 Insufficient memory, preemption 亦无受害者可抢占。GetResourc

### case-43

- **结论**：`app/shippingservice` + `memory_capacity_mismatch` ｜ 标签 `app/shippingservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 103,905
- **raw 日志**：[results/1014_1929_inorder4-v3b163/raw/1014_1930_boutique-scheduling-43](../results/1014_1929_inorder4-v3b163/raw/1014_1930_boutique-scheduling-43/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing (wide) shows exactly one outlier: shippingservice-c57f8c997-nmvm2 Pending 0/1 on no node; its own events read 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. GetClusterConfiguration shows all 3 schedulable workers Ready, untainted, allocatable.memory=15671348Ki (~14.95Gi) while master carries node.kubernetes.io/unschedulable:NoSchedule. The pod template (DescribeResource pod + GetAppYAML shippingservice) requests memory: 20Gi (limits 20Gi), which exceeds every worker's allocatable memory, so the scheduler can never place it. Con

### case-44

- **结论**：`app/cartservice` + `memory_capacity_mismatch` ｜ 标签 `app/cartservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 93,136
- **raw 日志**：[results/1014_1931_inorder4-v3b164/raw/1014_1932_boutique-scheduling-44](../results/1014_1931_inorder4-v3b164/raw/1014_1932_boutique-scheduling-44/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中唯一离群对象为 cartservice-985bc9ccd-nb525：0/1 Pending、NODE <none>、PodScheduled False，其余 13 个 pod 全 1/1 Running 且 0 重启。受害对象自身信号先行：CheckServiceConnectivity(cartservice:7070，Service 声明端口) 返回 Connection Failed，Deployment cartservice 0/1 AVAILABLE（无 Ready 端点）。Pod 调度单逐字给出机制：Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'（preemption 亦无受害者）。节点侧：worker-01/02/03 全 Ready、无 taint、三种 Pressure 均 False，allocatable memory 约 15.67GiB；master 为 Ready,SchedulingDisabled（按角色设计，非阻塞点）。DaemonSet memory-consumer 每节点一个、Requests/Limits memory 10Gi、QoS Guarantee

### case-45

- **结论**：`app/checkoutservice` + `memory_capacity_mismatch` ｜ 标签 `app/checkoutservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 108,227
- **raw 日志**：[results/1014_1933_inorder4-v3b165/raw/1014_1934_boutique-scheduling-45](../results/1014_1933_inorder4-v3b165/raw/1014_1934_boutique-scheduling-45/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom entered from the unnamed-service inventory: checkoutservice-77499d48c9-5ggrs is the only outlier (0/1 Pending, no node assigned), its Deployment reads 0/1 AVAILABLE and endpoints/checkoutservice shows ENDPOINTS <none> (availability disruption). The pod's own reason reads verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found for incoming pod.' with PodScheduled=False. Node side: all 4 nodes Ready and untainted except master (Ready,SchedulingDisabled + node.kubernetes.io/unschedulable:NoSchedule = the 1 unsc

### case-46

- **结论**：`app/emailservice` + `memory_capacity_mismatch` ｜ 标签 `app/emailservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 114,716
- **raw 日志**：[results/1014_1935_inorder4-v3b166/raw/1014_1937_boutique-scheduling-46](../results/1014_1935_inorder4-v3b166/raw/1014_1937_boutique-scheduling-46/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only emailservice is unavailable while all other workloads are healthy ('partial'): pods listing shows emailservice-7b8b9859b5-8sw52 at 0/1 Pending with Node <none>, its endpoints are empty ('emailservice  <none>') and CheckServiceConnectivity on its declared port 5000 fails; deployment emailservice is 0/1 AVAILABLE. DescribeResource on the pending pod carries the scheduling line verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. Node side closes the arithmetic: GetClusterConfiguration shows worker-01/02/03 Ready, untainted, ~14.95Gi 

### case-47

- **结论**：`app/frontend` + `memory_capacity_mismatch` ｜ 标签 `app/frontend` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 16 · tokens 105,511
- **raw 日志**：[results/1014_1938_inorder4-v3b167/raw/1014_1939_boutique-scheduling-47](../results/1014_1938_inorder4-v3b167/raw/1014_1939_boutique-scheduling-47/)（ndjson / mcp.jsonl / meta）
- **摘要**：仅 frontend pod 离群：frontend-9cf46975c-6lhkj 0/1 Pending 且未绑定节点，其余 10 个业务 pod 均 Running。其自身事件给出机制原文 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'。GetAppYAML(frontend) 显示容器 requests/limits memory=8Gi（cpu 仅 100m/200m），而 GetClusterConfiguration 中 3 个 worker 的 allocatable memory 仅约 15.3Gi，且每个节点已被 memory-hog DaemonSet（每 pod 10Gi Guaranteed）占用，节点剩余可分配内存不足以容纳 8Gi 请求，故调度器判定 3 Insufficient memory；master 带 unschedulable taint 解释 '1 node(s) were unschedulable'。症状侧闭环：frontend deployment 0/1 AVAILABLE、Service endpoints 为 <none>，入口不可达；namespace 无 ResourceQ

### case-48

- **结论**：`app/paymentservice` + `memory_capacity_mismatch` ｜ 标签 `app/paymentservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2778 · steps 19 · tokens 134,301
- **raw 日志**：[results/1014_1940_inorder4-v3b168/raw/1014_1941_boutique-scheduling-48](../results/1014_1940_inorder4-v3b168/raw/1014_1941_boutique-scheduling-48/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice is the only service with no endpoints (endpoints list shows 'paymentservice <none>', all 11 siblings bound); its pod paymentservice-6bb6859449-wfld5 is 0/1 Pending with Node:<none> and Service has 0 endpoints, Deployment AVAILABLE 0/1, while every other pod is 1/1 Running. Pod sheet carries: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found'. Cluster config: worker-01/02/03 are Ready, untainted, allocatable memory ~15.67Gi each, and each hosts a memory-consumer DaemonSet pod reque

### case-49

- **结论**：`app/productcatalogservice` + `memory_capacity_mismatch` ｜ 标签 `app/productcatalogservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 107,955
- **raw 日志**：[results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-scheduling-49](../results/1014_1312_inorder4-v3b135/raw/1014_1313_boutique-scheduling-49/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain, uncontested: the target's own signal is unreachable — endpoints/productcatalogservice has ENDPOINTS <none> and a connectivity probe on its declared port 3550 returns 'Connection Failed'. Its workload is the sole outlier: pod productcatalogservice-d84897895-bvcdj is 0/1 Pending and deployment productcatalogservice is 0/1 AVAILABLE (all other pods 1/1 Running, 0 restarts). The pod's own sheet carries the mechanism line: 'Node: <none>', PodScheduled False, Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' The 1 unschedulab

### case-50

- **结论**：`app/recommendationservice` + `memory_capacity_mismatch` ｜ 标签 `app/recommendationservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 140,439
- **raw 日志**：[results/1014_1314_inorder4-v3b136/raw/1014_1316_boutique-scheduling-50](../results/1014_1314_inorder4-v3b136/raw/1014_1316_boutique-scheduling-50/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique has one scheduling outlier: recommendationservice-79579f557f-vjbwq is 0/1 Pending with PodScheduled=False and Node=<none>, while all other 14 pods are 1/1 Running. Its own FailedScheduling reason reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory'. Victim-side signal confirms the outage: GetResources(endpoints) shows 'recommendationservice <none>' (all other services bound) and CheckServiceConnectivity(recommendationservice:8080) returns Connection Failed. Node layer explains it: each node has allocatable memory ~15.3Gi, but a DaemonSet 'memory-consume

### case-51

- **结论**：`app/redis-cart` + `memory_capacity_mismatch` ｜ 标签 `app/redis-cart` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 134,958
- **raw 日志**：[results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-scheduling-51](../results/1014_1318_inorder4-v3b137/raw/1014_1319_boutique-scheduling-51/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod listing outlier: redis-cart-56496f856-rzsz7 is Pending (0/1) while every other boutique pod is Running; redis-cart Service endpoints = <none> and deployment redis-cart = 0/1 AVAILABLE, matching the Service Availability Disruption symptom. The Pending pod's own scheduling reason is decisive: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory. preemption: ... 3 No preemption victims found'. Node side: master is Ready,SchedulingDisabled (the 1 unschedulable node) while worker-01/02/03 are Ready, untainted, MemoryPressure=False with ~15.3Gi alloc

### case-52

- **结论**：`app/shippingservice` + `memory_capacity_mismatch` ｜ 标签 `app/shippingservice` + `memory_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 21 · tokens 149,540
- **raw 日志**：[results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-scheduling-52](../results/1014_1321_inorder4-v3b138/raw/1014_1322_boutique-scheduling-52/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only shippingservice is unreachable: GetResources(endpoints) shows 'shippingservice <none>' (all other 11 Services have endpoints) and CheckServiceConnectivity(shippingservice:50051) returned 'Connection Failed'. Source: pod shippingservice-5d5dbb88bf-vmczd is 0/1 Pending, and its own sheet carries the mechanism event verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 Insufficient memory.' Deployment listing shows shippingservice 0/1 available (the only non-ready workload), while the pod object already exists (so this is a scheduling break, not admissi

### case-53

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.375 · steps 17 · tokens 106,786
- **raw 日志**：[results/1014_1841_inorder4-v3b139/raw/1014_1842_boutique-scheduling-53](../results/1014_1841_inorder4-v3b139/raw/1014_1842_boutique-scheduling-53/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory scan isolated the single outlier pod redis-cart-68db7b6f97-f2skx (0/1 Pending, Node <none>) while all other boutique services ran 1/1. Its own record shows PodScheduled=False with event 'FailedScheduling: 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and the PVC event 'FailedBinding: no persistent volumes available for this claim and no storage class is set' names redis-cart-pvc exactly. Config cross-check shows the only mismatched dimension is capacity: PVC requests storage 3Gi while the sole candidate PV redis-cart-pv offers 1Gi (PV is Available/unclai

### case-54

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3529 · steps 18 · tokens 112,632
- **raw 日志**：[results/1014_1843_inorder4-v3b140/raw/1014_1844_boutique-scheduling-54](../results/1014_1843_inorder4-v3b140/raw/1014_1844_boutique-scheduling-54/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only unreachable service: its Service endpoint list is empty ('redis-cart <none>') and active connectivity probes to redis-cart:6379 fail from worker-01/02/03, while all 10 other boutique services are 1/1 Running with populated endpoints. Its pod redis-cart-68db7b6f97-krnq9 is stuck Pending with Node=<none> and PodScheduled=False; the scheduler event reads '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and the PVC event reads 'no persistent volumes available for this claim and no storage class is set'. All four nodes are Ready/untouched (no taint

### case-55

- **结论**：`app/redis-cart` + `pvc_capacity_mismatch` ｜ 标签 `app/redis-cart` + `pvc_capacity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 103,433
- **raw 日志**：[results/1014_1844_inorder4-v3b141/raw/1014_1845_boutique-scheduling-55](../results/1014_1844_inorder4-v3b141/raw/1014_1845_boutique-scheduling-55/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique inventory is redis-cart-68db7b6f97-7vdqn (0/1 Pending); connectivity probe to redis-cart:6379 failed from worker-01/02/03, matching the 'partial service unreachability' complaint (redis-cart backs cartservice). Pod sheet shows Node:<none>, PodScheduled=False with event 'FailedScheduling: 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. The PVC redis-cart-pvc is stuck Pending with 'FailedBinding: no persistent volumes available for this claim and no storage class is set', while the referenced PV redis-cart-pv exists and is Available (1Gi, 

### case-56

- **结论**：`app/adservice` + `node_affinity_mismatch` ｜ 标签 `app/adservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 104,861
- **raw 日志**：[results/1014_1846_inorder4-v3b142/raw/1014_1847_boutique-scheduling-56](../results/1014_1846_inorder4-v3b142/raw/1014_1847_boutique-scheduling-56/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice's only pod (adservice-5db445fc48-txrtd) is stuck Pending with PodScheduled=False; DescribeResource shows 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetAppYAML(adservice) shows a required nodeAffinity requiring label env In [prod, staging], but GetClusterConfiguration/nodes listing show all three workers carry env=dev and only master (no env label) is Ready,SchedulingDisabled, so no node can satisfy the constraint. Endpoints(adservice)=<none> and Deployment adservice 0/1 AVAILABLE, and frontend

### case-57

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 11 · tokens 83,930
- **raw 日志**：[results/1014_1848_inorder4-v3b143/raw/1014_1849_boutique-scheduling-57](../results/1014_1848_inorder4-v3b143/raw/1014_1849_boutique-scheduling-57/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial (single-service) unreachability localized to cartservice: pods listing shows the only outlier cartservice-6dc446b96c-bpxgc 0/1 Pending (all other 10 services 1/1 Running) and deployments shows cartservice 0/1 AVAILABLE; CheckServiceConnectivity on its declared port 7070 returns 'Connection Failed'. The pod's own sheet carries the mechanism verbatim: Status Pending, Node <none>, PodScheduled False, Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector; preemption: 4 Preemption is not helpful for scheduling'. 

### case-58

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 70,189
- **raw 日志**：[results/1014_1850_inorder4-v3b144/raw/1014_1851_boutique-scheduling-58](../results/1014_1850_inorder4-v3b144/raw/1014_1851_boutique-scheduling-58/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows a single outlier: currencyservice-6999d4d666-c4bs8 is 0/1 Pending with Node <none>, while all other 10 boutique pods are 1/1 Running. Its own sheet carries the mechanism verbatim: PodScheduled=False, event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; the pod's Node-Selectors are <none>, so the blocking predicate is affinity. GetClusterConfiguration shows all 4 nodes Ready and unpressured, with worker-01/02/03 carrying label env=dev (no taints) and only master cordoned (node.kubern

### case-59

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 88,692
- **raw 日志**：[results/1014_1851_inorder4-v3b145/raw/1014_1852_boutique-scheduling-59](../results/1014_1851_inorder4-v3b145/raw/1014_1852_boutique-scheduling-59/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.': the emailservice Service has no backends. Entry via inventory scan: only outlier is pod emailservice-df95f74cd-srzrm = 0/1 Pending, NODE <none>, and deployment emailservice = 0/1 AVAILABLE. Victim's own signal: GetResources(endpoints, emailservice) shows ENDPOINTS <none>, and CheckServiceConnectivity(emailservice:5000) = Connection Failed (declared Service port 5000 -> targetPort 8080). Pod sheet carries the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity

### case-60

- **结论**：`app/frontend` + `node_affinity_mismatch` ｜ 标签 `app/frontend` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 83,004
- **raw 日志**：[results/1014_1853_inorder4-v3b146/raw/1014_1854_boutique-scheduling-60](../results/1014_1853_inorder4-v3b146/raw/1014_1854_boutique-scheduling-60/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-6499cbd48d-5859c is Pending with FailedScheduling: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; all other 10 boutique services are 1/1 Running. Node labels: worker-01/02/03 carry env=dev (Ready, untainted) and master is unschedulable-tainted; no node carries env=prod or env=staging. GetAppYAML(frontend) declares a hard requiredDuringSchedulingIgnoredDuringExecution nodeAffinity requiring env In [prod, staging] with no nodeSelector, so no node can ever satisfy it. Victim-side signal confirms impact: endpoints

### case-61

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 103,236
- **raw 日志**：[results/1014_1855_inorder4-v3b147/raw/1014_1857_boutique-scheduling-61](../results/1014_1855_inorder4-v3b147/raw/1014_1857_boutique-scheduling-61/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Service Availability Disruption.' with no service named -> pods inventory (wide) surfaced the single outlier: productcatalogservice-799cc5ccb4-fnxqw 0/1 Pending with no node assigned, while the other 10 boutique services are 1/1 Running. The pod's own FailedScheduling reason reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'; Node-Selectors on the pod is <none>, so the constraint comes from the workload spec. GetAppYAML(productcatalogservice) shows a requiredDuringScheduling nodeAffinity requiring label env In [prod, stag

### case-62

- **结论**：`app/recommendationservice` + `node_affinity_mismatch` ｜ 标签 `app/recommendationservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 92,274
- **raw 日志**：[results/1014_1858_inorder4-v3b148/raw/1014_1859_boutique-scheduling-62](../results/1014_1858_inorder4-v3b148/raw/1014_1859_boutique-scheduling-62/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice is the only outlier: its pod (recommendationservice-f498857d6-rv5bj) is Pending with Node <none> and its Deployment is 0/1 AVAILABLE, while all 10 other boutique services are 1/1 Running. Victim signal precedes the workload/config reads: the recommendationservice endpoints listing shows '<none>' (all other services have endpoints) and the entry caller frontend logs 'failed to get product recommendations' with 'rpc error: code = Unavailable ... dial tcp 10.68.145.254:8080: connect: connection refused' (73 occurrences, 9.4% of errors) against the service's own declared Clus

### case-63

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 84,521
- **raw 日志**：[results/1014_1900_inorder4-v3b149/raw/1014_1901_boutique-scheduling-63](../results/1014_1900_inorder4-v3b149/raw/1014_1901_boutique-scheduling-63/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing: redis-cart-6b998586b5-mwkcl is the sole outlier (0/1 Pending, NODE=<none>) while all 10 other pods are 1/1 Running. Pod describe events: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', PodScheduled=False. GetAppYAML(redis-cart) shows the pod template's requiredDuringSchedulingIgnoredDuringExecution nodeAffinity requiring label env in (prod, staging), while cluster node labels carry env=dev on worker-01/02/03 (master has no env label and is Ready,SchedulingDisabled with the unsche

### case-64

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 88,295
- **raw 日志**：[results/1014_1902_inorder4-v3b150/raw/1014_1903_boutique-scheduling-64](../results/1014_1902_inorder4-v3b150/raw/1014_1903_boutique-scheduling-64/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice deployment carries a hard nodeAffinity requiring node label 'state' NotIn [maintenance], but all three schedulable workers (worker-01/02/03) are labeled state=maintenance and the only other node, master, is cordoned (Ready,SchedulingDisabled + unschedulable:NoSchedule taint). The lone outlier in the pod inventory is cartservice-55b495c7ff-cwvgb, 0/1 Pending with Node:<none>, whose event reads 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', exactly reproducing the affinity rule. Consequently cartservi

### case-65

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 90,227
- **raw 日志**：[results/1014_1904_inorder4-v3b151/raw/1014_1905_boutique-scheduling-65](../results/1014_1904_inorder4-v3b151/raw/1014_1905_boutique-scheduling-65/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 中 currencyservice 是唯一离群者：Pod currencyservice-68dfd644cd-njq8p 处于 Pending、Node=<none>、无 IP，deployment AVAILABLE 0/1，Endpoints 为 <none>，CheckServiceConnectivity(currencyservice:7000) 连接失败；入口 caller frontend 日志 177 处错误中 153 处为 'could not retrieve currencies: ... dial tcp 10.68.6.50:7000: connect: connection refused'，其余 10 个服务均 1/1 Running，构成"部分服务不可达"。Pod 自身事件逐字给出机制：'FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'。节点面显示 master 为 Ready,SchedulingDisabled（cordon，属设计常态），worker-01/02/03 均 Ready 且带标签 state=maintenance

### case-66

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 90,572
- **raw 日志**：[results/1014_1906_inorder4-v3b152/raw/1014_1907_boutique-scheduling-66](../results/1014_1906_inorder4-v3b152/raw/1014_1907_boutique-scheduling-66/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: emailservice Service endpoints list is '<none>' and TCP probe to its declared port 5000 returns 'Connection Failed', while all other 10 boutique services are 1/1 Running/Available — matching 'Partial' unreachability. Object layer: the only outlier pod is emailservice-5b8845df78-rbs5x, 0/1 Pending with Node <none>; Deployment emailservice shows 0/1 available. Mechanism event: Warning FailedScheduling 'default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.'. Node surface: master is Ready,SchedulingDisabled (cord

### case-67

- **结论**：`app/frontend` + `node_affinity_mismatch` ｜ 标签 `app/frontend` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 137,527
- **raw 日志**：[results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-scheduling-67](../results/1014_1908_inorder4-v3b153/raw/1014_1908_boutique-scheduling-67/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-77cf88bb6d-swpvk is stuck Pending (0/1, Node: <none>, PodScheduled False) while all other 10 boutique services are 1/1 Running. Its own signal leads: endpoints lists 'frontend <none>' and 'frontend-external <none>', and a TCP probe on the port declared by frontend's Service (80) returns Connection Failed; frontend has no container logs at all, so runtime/probe/code causes are excluded. The mechanism event on the pod reads 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Config confir

### case-68

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 103,001
- **raw 日志**：[results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-scheduling-68](../results/1014_1910_inorder4-v3b154/raw/1014_1910_boutique-scheduling-68/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing in namespace boutique shows the single outlier productcatalogservice-768c4964d8-2tvlg at 0/1 Pending with no node assigned, while all other 10 boutique services run 1/1. Its own reason: PodScheduled=False with Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. The victim's availability signal is consistent: endpoints productcatalogservice=<none>, active TCP probe on its declared Service port 3550 fails ('Connection Failed'), and the Deployment reads 0/1 AVAILABLE. GetClusterConfiguration shows work

### case-69

- **结论**：`app/recommendationservice` + `node_affinity_mismatch` ｜ 标签 `app/recommendationservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 133,049
- **raw 日志**：[results/1014_1911_inorder4-v3b155/raw/1014_1912_boutique-scheduling-69](../results/1014_1911_inorder4-v3b155/raw/1014_1912_boutique-scheduling-69/)（ndjson / mcp.jsonl / meta）
- **摘要**：The unreachability is isolated to recommendationservice: its Endpoints row is <none> and an active probe on its declared port 8080 (ClusterIP 10.68.76.96) returns Connection Failed, while the entry caller frontend logs 69x 'failed to get product recommendations' with 'dial tcp 10.68.76.96:8080: connect: connection refused'. All other 11 boutique pods are 1/1 Running and every other Service has endpoints (productcatalogservice:3550 probes open, so the transient 'lookup productcatalogservice ... no such host' log lines are not the fault). The single outlier is pod recommendationservice-797c4ccc7

### case-70

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1481 · steps 28 · tokens 275,399
- **raw 日志**：[results/1014_1913_inorder4-v3b156/raw/1014_1914_boutique-scheduling-70](../results/1014_1913_inorder4-v3b156/raw/1014_1914_boutique-scheduling-70/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间中仅 redis-cart 出现离群：redis-cart-5884778669-tr7fc 为 Pending(0/1, Node: <none>)，其 DescribeResource 事件逐字给出机制 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'。节点侧对照：worker-01/02/03 全部带标签 state=maintenance，而 redis-cart 的 Pod 模板带 nodeAffinity requiredDuringSchedulingIgnoredDuringExecution 'state NotIn [maintenance]'，因此三个 worker 全被排除；唯一不带 state 标签（NotIn 语义可匹配）的 master 处于 cordon（Ready,SchedulingDisabled，taint node.kubernetes.io/unschedulable:NoSchedule），构成 '1 node(s) were unschedulable'。逐个核对 GetAppYAML（fro

### case-71

- **结论**：`app/shippingservice` + `node_affinity_mismatch` ｜ 标签 `app/shippingservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 90,384
- **raw 日志**：[results/1014_1917_inorder4-v3b157/raw/1014_1918_boutique-scheduling-71](../results/1014_1917_inorder4-v3b157/raw/1014_1918_boutique-scheduling-71/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice pod shippingservice-847dfd5ff4-wnwc9 is stuck Pending with Node:<none> and PodScheduled=False; the scheduler event reads verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetAppYAML(shippingservice) shows a hard requiredDuringScheduling nodeAffinity requiring key 'state' NotIn ['maintenance'], while GetClusterConfiguration shows worker-01/worker-02/worker-03 all carry the label state=maintenance and the only remaining node (master) is marked unschedulable (node.kubernetes.io/unschedulable:NoSchedule) — so no n

### case-72

- **结论**：`app/adservice` + `node_affinity_mismatch` ｜ 标签 `app/adservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 88,543
- **raw 日志**：[results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-scheduling-72](../results/1014_1919_inorder4-v3b158/raw/1014_1919_boutique-scheduling-72/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 内唯一离群对象是 adservice pod（adservice-7fcbc7446f-ndl8v，0/1 Pending，NODE <none>），其余 10 个 pod 均 1/1 Running。实测可达性：CheckServiceConnectivity(adservice, 9555) = Connection Failed，endpoints 清单中 adservice 为 <none>（其余 11 个 Service 端点正常绑定）——符合『部分服务不可达』。pod 自身事件给出机制：Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector。节点侧：master 为 Ready,SchedulingDisabled（对应 '1 node unschedulable'），worker-01/02/03 全部 Ready、无 taint、CPU/内存可分配（各 8C/~15Gi）——排除容量与 cordon 作为 worker 被拒原因。配置面 GetAppYAML(adservice) 显示模板声明 nodeAffinity requiredDuri

### case-73

- **结论**：`app/cartservice` + `node_affinity_mismatch` ｜ 标签 `app/cartservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 121,766
- **raw 日志**：[results/1014_1920_inorder4-v3b159/raw/1014_1921_boutique-scheduling-73](../results/1014_1920_inorder4-v3b159/raw/1014_1921_boutique-scheduling-73/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the only unreachable boutique service. Its pod cartservice-55cd596fdb-75wdb is 0/1 Pending with Node <none>; its own sheet shows PodScheduled=False and the event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. The config face explains it: GetAppYAML(cartservice) requires nodeAffinity 'storage-vendor Exists' (requiredDuringSchedulingIgnoredDuringExecution), while GetClusterConfiguration shows no node carries the 'storage-vendor' label (worker-01/02/03 labels are only arch/os/hostname/role; 

### case-74

- **结论**：`app/currencyservice` + `node_affinity_mismatch` ｜ 标签 `app/currencyservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 88,560
- **raw 日志**：[results/1014_1922_inorder4-v3b160/raw/1014_1923_boutique-scheduling-74](../results/1014_1922_inorder4-v3b160/raw/1014_1923_boutique-scheduling-74/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods listing shows the sole outlier currencyservice-75688b6455-clv5l as 0/1 Pending (all other 10 services 1/1 Running) and deployments listing shows currencyservice 0/1 AVAILABLE. Its connectivity probe (CheckServiceConnectivity currencyservice:7000) returns Connection Failed, confirming the reachability complaint. DescribeResource on the pod shows 'Node: <none>' with PodScheduled=False and the mechanism event: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The config face (GetAppYAML cu

### case-75

- **结论**：`app/emailservice` + `node_affinity_mismatch` ｜ 标签 `app/emailservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 85,469
- **raw 日志**：[results/1014_1924_inorder4-v3b161/raw/1014_1925_boutique-scheduling-75](../results/1014_1924_inorder4-v3b161/raw/1014_1925_boutique-scheduling-75/)（ndjson / mcp.jsonl / meta）
- **摘要**：All boutique workloads are 1/1 Running except emailservice: pod emailservice-79d96f6bc9-4gxqr is 0/1 Pending with PodScheduled=False, and deployment emailservice shows 0/1 AVAILABLE. The pod's own FailedScheduling event reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' Node side: master is Ready,SchedulingDisabled (normal), worker-01/02/03 are all Ready/taint-free, and none of the four nodes carries the label 'storage-vendor'. The emailservice pod template (GetAppYAML) declares requiredDuringSchedulingIgnoredDuringExecution node

### case-76

- **结论**：`app/paymentservice` + `node_affinity_mismatch` ｜ 标签 `app/paymentservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 103,632
- **raw 日志**：[results/1014_1926_inorder4-v3b162/raw/1014_1928_boutique-scheduling-76](../results/1014_1926_inorder4-v3b162/raw/1014_1928_boutique-scheduling-76/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique pods listing names a single outlier: paymentservice-6bc9cd4c79-c9lmd is 0/1 Pending with no node assigned, while all other 10 services are 1/1 Running; deployments listing shows paymentservice as the only workload at 0 AVAILABLE and CheckServiceConnectivity(paymentservice:50051) returns Connection Failed, matching the reported availability disruption. The pod's own reason (DescribeResource) is 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', and the pod sheet shows Node-Selectors: <none>, point

### case-77

- **结论**：`app/productcatalogservice` + `node_affinity_mismatch` ｜ 标签 `app/productcatalogservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 87,754
- **raw 日志**：[results/1014_1929_inorder4-v3b163/raw/1014_1930_boutique-scheduling-77](../results/1014_1929_inorder4-v3b163/raw/1014_1930_boutique-scheduling-77/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only productcatalogservice is unreachable: its Service endpoints list is `<none>` (all 10 peer Services have bound endpoints) and the connectivity probe on its declared port 3550 returns 'Connection Failed'. The workload is drained: deployment productcatalogservice 0/1 READY, 0 AVAILABLE; its pod productcatalogservice-656b5cf4cc-d5gvg is 0/1 Pending with Node=<none>. The pod's own sheet carries the mechanism event: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The config the mechanism points at confirms it: th

### case-78

- **结论**：`app/redis-cart` + `node_affinity_mismatch` ｜ 标签 `app/redis-cart` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 104,428
- **raw 日志**：[results/1014_1931_inorder4-v3b164/raw/1014_1932_boutique-scheduling-78](../results/1014_1931_inorder4-v3b164/raw/1014_1932_boutique-scheduling-78/)（ndjson / mcp.jsonl / meta）
- **摘要**：Reachability chain resolves to redis-cart. Caller-side: frontend error logs show 79/108 errors of the family 'could not retrieve cart / failed to add to cart: rpc error: code = FailedPrecondition desc = Can't access cart storage. RedisConnectionException: UnableToConnect on redis-cart:6379 ... clientName: cartservice-79b49f5555-ftbzn'. Victim signal: endpoints/redis-cart shows ENDPOINTS <none> and CheckServiceConnectivity(redis-cart,6379) returns 'Connection Failed'. Workload: deployments shows redis-cart 0/1 UP-TO-DATE, AVAILABLE 0 (all other 10 deployments 1/1), and pod redis-cart-695798d76d

### case-79

- **结论**：`app/shippingservice` + `node_affinity_mismatch` ｜ 标签 `app/shippingservice` + `node_affinity_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 85,335
- **raw 日志**：[results/1014_1933_inorder4-v3b165/raw/1014_1934_boutique-scheduling-79](../results/1014_1933_inorder4-v3b165/raw/1014_1934_boutique-scheduling-79/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the sole outlier in the boutique namespace: pod shippingservice-5c476cd7dc-9wbbp is Pending 0/1 with Node=<none> and PodScheduled=False, while all other 10 pods are 1/1 Running. Its FailedScheduling event states verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' — no capacity shortfall, a hard placement constraint. Node side: master is Ready,SchedulingDisabled (the 1 unschedulable node), worker-01/02/03 are Ready and untainted; 

### case-80

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 69,417
- **raw 日志**：[results/1014_1935_inorder4-v3b166/raw/1014_1936_boutique-scheduling-80](../results/1014_1935_inorder4-v3b166/raw/1014_1936_boutique-scheduling-80/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the only outlier: pod adservice-74f5c86c49-2lhwq is Pending with Node <none> and deployment adservice shows 0/1 AVAILABLE, while all other 10 boutique services are 1/1 Running (matching 'Partial' unreachability). Its own signal confirms the fault: CheckServiceConnectivity(adservice, 9555 - the port its Service declares) returns 'Connection Failed'. The mechanism event is read verbatim on the pod sheet: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The config face confirms the cause: GetAppYAML(ads

### case-81

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 82,646
- **raw 日志**：[results/1014_1938_inorder4-v3b167/raw/1014_1939_boutique-scheduling-81](../results/1014_1938_inorder4-v3b167/raw/1014_1939_boutique-scheduling-81/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing showed the lone outlier cartservice-6d9fc79f96-4bhwx in Pending 0/1 with Node:<none>, while all other 10 boutique services were 1/1 Running and GetAlerts() reported no metric anomalies. The pod's own FailedScheduling event reads '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', and its spec carries Node-Selectors: env=prod. GetClusterConfiguration confirms all four nodes are Ready with no pressure and workers untamed, but worker-01/02/03 are labeled env=staging and master has no env label plus the unschedulable taint. Get

### case-82

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 89,236
- **raw 日志**：[results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-scheduling-82](../results/1014_1940_inorder4-v3b168/raw/1014_1940_boutique-scheduling-82/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only checkoutservice is broken while the other 10 boutique services are healthy: its pod checkoutservice-86c9b9f9d7-646lz is 0/1 Pending with 'Node: <none>', its Deployment shows 0/1 available, its Service endpoints entry is '<none>' (all others have IP:port), and CheckServiceConnectivity(checkoutservice,5050) returns 'Connection Failed' with no container error logs (the failure precedes startup). The pod's own FailedScheduling event states verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The mechanism is pinned by config: 

### case-83

- **结论**：`app/emailservice` + `node_selector_mismatch` ｜ 标签 `app/emailservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 104,428
- **raw 日志**：[results/1014_1942_inorder4-v3b169/raw/1014_1942_boutique-scheduling-83](../results/1014_1942_inorder4-v3b169/raw/1014_1942_boutique-scheduling-83/)（ndjson / mcp.jsonl / meta）
- **摘要**：Unique outlier in boutique pods listing: emailservice-5798db5787-k7dqf is 0/1 Pending with Node:<none> while all other 10 services run 1/1. Its own sheet carries the scheduling line: 'FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with spec Node-Selectors: env=prod. Node surfaces confirm the mismatch: worker-01/02/03 are Ready, untainted, resource-rich but labeled env=staging (no node in the cluster carries env=prod), and master is Ready,SchedulingDisabled with taint node.kubernetes.io/unschedulable:NoSchedule. Conf

### case-84

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 70,430
- **raw 日志**：[results/1014_1942_inorder4-v3b169/raw/1014_1944_boutique-scheduling-84](../results/1014_1942_inorder4-v3b169/raw/1014_1944_boutique-scheduling-84/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing in boutique shows exactly one outlier: paymentservice-d556f5dc9-ht672 is 0/1 Pending with Node <none> while all other 10 pods are 1/1 Running. Its own sheet carries Node-Selectors: env=prod and the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' (no nodeAffinity stanza exists, so the selector is the discriminator). GetClusterConfiguration shows worker-01/02/03 Ready and untainted but labeled env=staging, master has no env label and is cordoned (node.kubernetes.io/unschedulab

### case-85

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 85,378
- **raw 日志**：[results/1014_1942_inorder4-v3b169/raw/1014_1943_boutique-scheduling-85](../results/1014_1942_inorder4-v3b169/raw/1014_1943_boutique-scheduling-85/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique namespace 中 11 个 pod 仅 recommendationservice-67bdbb7947-4t798 离群：STATUS=Pending, READY=0/1, Node=<none>, RESTARTS=0，其余全部 1/1 Running。该 pod 自身 FailedScheduling 事件逐字为『0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.』。其 pod sheet 显示 Node-Selectors: env=prod；而 GetAppYAML(recommendationservice) 确认 deployment pod 模板声明 nodeSelector: env=prod（硬性调度约束）。节点标签实测：worker-01/02/03 的 env 标签均为 env=staging，无任何节点带 env=prod，故 3 个 worker 全部不匹配选择器；master 处于 SchedulingDi

### case-86

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 71,618
- **raw 日志**：[results/1014_1944_inorder4-v3b170/raw/1014_1944_boutique-scheduling-86](../results/1014_1944_inorder4-v3b170/raw/1014_1944_boutique-scheduling-86/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart pod redis-cart-644b57d75d-wqwbl is the sole outlier on the pods surface (0/1 Pending, NODE=<none>) while all other 10 boutique services are 1/1 Running; the deployment redis-cart is 0/1 AVAILABLE and CheckServiceConnectivity(redis-cart:6379, boutique) returns 'Connection Failed'. The pod's own sheet carries the scheduling line: 'Node-Selectors: env=prod' plus 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' GetClusterConfiguration/nodes listing shows master 'Ready,SchedulingDisabled' with no env label 

### case-87

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 85,027
- **raw 日志**：[results/1014_1944_inorder4-v3b170/raw/1014_1945_boutique-scheduling-87](../results/1014_1944_inorder4-v3b170/raw/1014_1945_boutique-scheduling-87/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the sole outlier: its pod shippingservice-5b9b6c5499-brpw5 is 0/1 Pending with no node assigned, while all other boutique pods are 1/1 Running. The pod's own scheduling reason reads 'FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The Deployment config (GetAppYAML) sets spec.template.spec.nodeSelector: env=prod, but the node listings show every worker labelled env=staging (worker-01/02/03) and master carrying no env label at all (it is Ready,SchedulingDisabled with the unschedulable:NoSchedule tai

### case-88

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2353 · steps 18 · tokens 116,451
- **raw 日志**：[results/1014_1944_inorder4-v3b170/raw/1014_1945_boutique-scheduling-88](../results/1014_1944_inorder4-v3b170/raw/1014_1945_boutique-scheduling-88/)（ndjson / mcp.jsonl / meta）
- **摘要**：adservice is the namespace's only outlier: pod adservice-6b5d9b4d-db6sr is 0/1 Pending (all 10 other pods 1/1 Running), Node=<none>, PodScheduled=False, with Event 'FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Its own signal confirms the break: endpoints for the adservice Service are '<none>', CheckServiceConnectivity(adservice:9555) returns Connection Failed, and the caller frontend logs 129x 'failed to get ads: ... dial tcp 10.68.171.201:9555: connect: connection refused' (the partial unreachability). GetAppYAM

### case-89

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 115,313
- **raw 日志**：[results/1014_1946_inorder4-v3b171/raw/1014_1946_boutique-scheduling-89](../results/1014_1946_inorder4-v3b171/raw/1014_1946_boutique-scheduling-89/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend (entry caller) error logs show 249 failures all aimed at cart: 'could not retrieve cart'/'failed to add to cart ... dial tcp 10.68.162.3:7070: connect: connection refused'; cartservice Service endpoints are <none> (the only empty endpoints in boutique) and CheckServiceConnectivity(cartservice:7070) = Connection Failed, while all other services have healthy endpoints. Workload outlier: pod cartservice-7c8d449dcf-js2xd is 0/1 Pending with Node <none>, deployment cartservice 0/1 AVAILABLE, others all 1/1 Running. Mechanism event on the pod sheet: 'Warning FailedScheduling ... 0/4 nodes a

### case-90

- **结论**：`app/currencyservice` + `node_selector_mismatch` ｜ 标签 `app/currencyservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 88,834
- **raw 日志**：[results/1014_1946_inorder4-v3b171/raw/1014_1948_boutique-scheduling-90](../results/1014_1946_inorder4-v3b171/raw/1014_1948_boutique-scheduling-90/)（ndjson / mcp.jsonl / meta）
- **摘要**：pods listing shows the sole outlier currencyservice-57d67bb57d-75r4c as 0/1 Pending while all other 10 boutique services are 1/1 Running; its own sheet shows Node: <none>, PodScheduled False and Node-Selectors: region=cn-north, with the mechanism event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. Node layer (GetResources nodes --show-labels + GetClusterConfiguration) shows all four nodes (master, worker-01/02/03) carry only arch/os/hostname/role labels - no node has any 'region' key, so no node can satisf

### case-91

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 85,992
- **raw 日志**：[results/1014_1946_inorder4-v3b171/raw/1014_1947_boutique-scheduling-91](../results/1014_1946_inorder4-v3b171/raw/1014_1947_boutique-scheduling-91/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: connectivity probe to paymentservice:50051 fails and endpoints/paymentservice shows '<none>', while all other boutique pods are 1/1 Running (hence 'Partial' unreachability). Object layer: pod paymentservice-5fc94bc4cd-ww7gc is 0/1 Pending with Node <none>, PodScheduled=False, and a FailedScheduling event reading verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 0/4 nodes are available: 4 Preemption is not helpful for scheduling.' Config face: GetAppYAML(paymentservice) shows the pod template carries n

### case-92

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 108,560
- **raw 日志**：[results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-92](../results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-92/)（ndjson / mcp.jsonl / meta）
- **摘要**：Entry-caller evidence: frontend error logs show 25% error ratio with 'could not retrieve products/products: rpc error: code = Unavailable ... dial tcp 10.68.193.81:3550: connect: connection refused' (85+82 occurrences), i.e. productcatalogservice's declared ClusterIP:3550 is refused. The only outlier in the pods listing is productcatalogservice-5ddd857cb-xr5m9, 0/1 Pending (all other 10 pods 1/1 Running); deployment productcatalogservice is 0/1 AVAILABLE and its endpoints listing is '<none>'. The pod sheet carries the scheduling mechanism first-hand: 'Node: <none>', 'PodScheduled False', 'Node

### case-93

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 110,405
- **raw 日志**：[results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-93](../results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-93/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice is the only unreachable service: its endpoints listing is empty (<none>), an active TCP probe on its Service-declared port 8080 returns 'Connection Failed', and the frontend caller's dominant error (80/108 errors) is 'failed to get product recommendations ... dial tcp 10.68.77.135:8080: connect: connection refused', where 10.68.77.135 is exactly the recommendationservice ClusterIP. The workload layer shows the single outlier in the pods inventory: recommendationservice-697dc746b-tjglc is 0/1 Pending with Node <none>, and deployment recommendationservice is 0/1 AVAILABLE. 

### case-94

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 88,377
- **raw 日志**：[results/1014_1949_inorder4-v3b172/raw/1014_1950_boutique-scheduling-94](../results/1014_1949_inorder4-v3b172/raw/1014_1950_boutique-scheduling-94/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom-side evidence: cartservice (the caller of redis-cart) logs 294 errors (37.1% error ratio), verbatim 'UnableToConnect on redis-cart:6379 ... serverEndpoint: redis-cart:6379' / 'Can't access cart storage', and CheckServiceConnectivity(redis-cart, 6379, boutique) returned 'Connection Failed'. Object layer: pod redis-cart-5cfb66988f-hmgdm is the sole outlier (0/1 Pending, Node <none>, Deployment redis-cart 0/1 AVAILABLE) while all other 10 services are 1/1 Running. Its own sheet carries the mechanism event verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unsc

### case-95

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 86,769
- **raw 日志**：[results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-95](../results/1014_1949_inorder4-v3b172/raw/1014_1949_boutique-scheduling-95/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: the shippingservice Service has no backend at all — endpoints listing shows 'shippingservice <none>' while all other 10 services have endpoint IPs, and an active connectivity probe to its declared port 50051 returns 'Connection Failed' (matching 'Partial Service Unreachability'). Object layer: the pods inventory carries exactly one outlier row, 'shippingservice-6d69747df4-sk9mj 0/1 Pending 0 71s <none> <none>'; DescribeResource shows Status Pending, Node <none>, PodScheduled False, and Node-Selectors: region=cn-north. Mechanism: the pod's own event segment reads verbatim 'Warning

### case-96

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 89,965
- **raw 日志**：[results/1014_1950_inorder4-v3b173/raw/1014_1950_boutique-scheduling-96](../results/1014_1950_inorder4-v3b173/raw/1014_1950_boutique-scheduling-96/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the unreachable service: frontend logs (285 errors) show 'rpc error: code = Unavailable ... dial tcp 10.68.203.73:7070: connect: connection refused' (10.68.203.73 = cartservice ClusterIP), its endpoints listing is '<none>' and CheckServiceConnectivity(cartservice,7070) = Connection Failed. Owner chain: deployment cartservice 0/1 READY, 0 AVAILABLE, UP-TO-DATE 1 (replicas not zero). The single pod cartservice-57585bd6c8-rcxq7 is Pending with Node: <none>, PodScheduled False, and event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn

### case-97

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 84,486
- **raw 日志**：[results/1014_1950_inorder4-v3b173/raw/1014_1950_boutique-scheduling-97](../results/1014_1950_inorder4-v3b173/raw/1014_1950_boutique-scheduling-97/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pods inventory (the legitimate entry since the symptom names no service) shows a single outlier: checkoutservice-65954496c7-gl7tx is 0/1 Pending with no node assigned, while all other 10 boutique pods are 1/1 Running with 0 restarts. Victim-side signal confirms the disruption: CheckServiceConnectivity(checkoutservice:5050) = Connection Failed and the checkoutservice Deployment reads READY 0/1 / AVAILABLE 0 (service drained). The pod's own reason names the blocker verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's n

### case-98

- **结论**：`app/currencyservice` + `node_selector_mismatch` ｜ 标签 `app/currencyservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 86,216
- **raw 日志**：[results/1014_1950_inorder4-v3b173/raw/1014_1951_boutique-scheduling-98](../results/1014_1950_inorder4-v3b173/raw/1014_1951_boutique-scheduling-98/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: frontend error logs show 180/182 errors all of one pattern — 'could not retrieve currencies: rpc error: code = Unavailable ... dial tcp 10.68.227.6:7000: connect: connection refused'; the endpoints listing shows 'currencyservice <none>' (the only service in boutique with no endpoints); an active TCP probe on its declared port 7000 fails. Object layer (pruned by anchor app=currencyservice): pod currencyservice-5499d6c69c-b9x5n is 0/1 Pending with Node <none> and event 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's no

### case-99

- **结论**：`app/emailservice` + `node_selector_mismatch` ｜ 标签 `app/emailservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 103,487
- **raw 日志**：[results/1014_1950_inorder4-v3b173/raw/1014_1951_boutique-scheduling-99](../results/1014_1950_inorder4-v3b173/raw/1014_1951_boutique-scheduling-99/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice-5968ff544f-nq5sc is 0/1 Pending with NODE=<none> while all 10 other boutique pods are Running 1/1, explaining 'partial' unreachability. Its endpoints listing is empty (<none>) and CheckServiceConnectivity(emailservice:5000) returns 'Connection Failed'. The pod's own sheet carries the live mechanism event: Warning FailedScheduling - '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with condition PodScheduled=False. The workload template (GetAppYAML emailservice) declares nodeSelector {env: prod, hardware: high-mem}, but n

### case-100

- **结论**：`app/paymentservice` + `node_selector_mismatch` ｜ 标签 `app/paymentservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 91,599
- **raw 日志**：[results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-100](../results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-100/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend (entry caller) error logs carry 125/158 errors of 'failed to charge card: rpc error: code = Unavailable ... dial tcp 10.68.105.105:50051: connect: connection refused', localizing the complaint to paymentservice; a connectivity probe on the port its Service declares (50051) returns 'Connection Failed'. The pod inventory has exactly one outlier: paymentservice-76df88bfb9-9wlfv 0/1 Pending, Node <none>, with owner deployment paymentservice 0/1 READY / 0 AVAILABLE (drained, hence no ready endpoints). The pod's own sheet carries the mechanism event: 'Warning FailedScheduling 0/4 nodes are 

### case-101

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3077 · steps 14 · tokens 85,087
- **raw 日志**：[results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-101](../results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-101/)（ndjson / mcp.jsonl / meta）
- **摘要**：productcatalogservice deployment has nodeSelector requiring BOTH env=prod AND hardware=high-mem (AND semantics), but node labels are split: only worker-01 carries env=prod, only worker-02 carries hardware=high-mem, worker-03 carries neither, and master (cordoned, unschedulable:NoSchedule) carries neither. No node can satisfy the selector, so pod productcatalogservice-75c47675bc-b75ft stays Pending with PodScheduled=False and the scheduler event 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' All other 10 bou

### case-102

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 107,318
- **raw 日志**：[results/1014_1952_inorder4-v3b174/raw/1014_1953_boutique-scheduling-102](../results/1014_1952_inorder4-v3b174/raw/1014_1953_boutique-scheduling-102/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory in boutique shows a single outlier: redis-cart-7f99cf664-2pv92 is 0/1 Pending with no assigned node (all other 10 services are 1/1 Running); alerts are empty, so this is not the telemetry chain. The pod's own reason reads verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' The pod/deployment nodeSelector demands env=prod AND hardware=high-mem, but node labels are split: worker-01 carries only env=prod, worker-02 only hardware=high-mem, worker-03 neither, and master (Ready,SchedulingDisabled)

### case-103

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 70,860
- **raw 日志**：[results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-103](../results/1014_1952_inorder4-v3b174/raw/1014_1952_boutique-scheduling-103/)（ndjson / mcp.jsonl / meta）
- **摘要**：shippingservice is the only unreachable service: its pod shippingservice-655675bf97-nv6rv is the lone outlier (0/1 Pending, Node <none>, PodScheduled=False) while all other boutique pods are 1/1 Running; its Service endpoints list shows '<none>' and an active TCP probe on its declared port 50051 returns 'Connection Failed'. The pod's own event carries the mechanism: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', and its deployment shippingservice shows 0/1 AVAILABLE. The config face confirms the cause: spec.tem

### case-104

- **结论**：`app/adservice` + `node_selector_mismatch` ｜ 标签 `app/adservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 99,923
- **raw 日志**：[results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-104](../results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-104/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pod listing shows the only outlier: adservice-64c49bc688-bjcjw is 0/1 Pending with no node assigned (all other 10 pods are 1/1 Running). DescribeResource on that pod exposes Node-Selectors: disktype=ssd and the mechanism event verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector.' Node-side reads show worker-01/02/03 Ready and untainted but labeled 'disk-type=ssd' (hyphenated) — no node carries the key 'disktype', while master is Ready,SchedulingDisabled (cordoned). GetAppYAML(adservice

### case-105

- **结论**：`app/cartservice` + `node_selector_mismatch` ｜ 标签 `app/cartservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 71,701
- **raw 日志**：[results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-105](../results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-105/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend caller logs carry 297/1194 errors on the cart path: 'connection error: transport: Error while dialing: dial tcp 10.68.121.101:7070: connect: connection refused' (cartservice ClusterIP:7070). The pods inventory shows exactly one outlier: cartservice-6dd77c7477-glvbg 0/1 Pending, Node <none>, while all other 10 pods are 1/1 Running; deployment/cartservice is 0/1 AVAILABLE. The pod's own sheet carries the mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 4 Preemption is

### case-106

- **结论**：`app/checkoutservice` + `node_selector_mismatch` ｜ 标签 `app/checkoutservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 85,962
- **raw 日志**：[results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-106](../results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-106/)（ndjson / mcp.jsonl / meta）
- **摘要**：checkoutservice is the sole outlier in the boutique inventory: its pod checkoutservice-7d6f67c45d-mclbm is 0/1 Pending with Node <none> while all ten other services are 1/1 Running; its Deployment is 0/1 AVAILABLE 0 and a connectivity probe to checkoutservice:5050 returns 'Connection Failed', matching the partial-unreachability symptom. DescribeResource(pod) gives the mechanism verbatim: 'Node-Selectors: disktype=ssd' and 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector. preemption: 4 Preemption is not help

### case-107

- **结论**：`app/frontend` + `node_selector_mismatch` ｜ 标签 `app/frontend` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2727 · steps 12 · tokens 69,797
- **raw 日志**：[results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-107](../results/1014_1954_inorder4-v3b175/raw/1014_1954_boutique-scheduling-107/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend Service and frontend-external Service both have ENDPOINTS <none> while the other 10 services have healthy endpoints (partial unreachability). Pod listing outlier: frontend-9797cdb96-njsgm 0/1 Pending, all others 1/1 Running. DescribeResource on that pod shows Node: <none>, Node-Selectors: disktype=ssd and event 'Warning FailedScheduling: 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'. GetClusterConfiguration shows the three Ready, untainted workers are labeled 'disk-type: ssd' (hyphenated) while the pod template (GetAppYAML 

### case-108

- **结论**：`app/productcatalogservice` + `node_selector_mismatch` ｜ 标签 `app/productcatalogservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 13 · tokens 71,125
- **raw 日志**：[results/1014_1955_inorder4-v3b176/raw/1014_1955_boutique-scheduling-108](../results/1014_1955_inorder4-v3b176/raw/1014_1955_boutique-scheduling-108/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows exactly one unreachable service: CheckServiceConnectivity(productcatalogservice:3550) returns Connection Failed, and its pod productcatalogservice-78dcf65f44-v85nt is the only outlier (0/1 Pending, NODE <none>) while all other 10 pods are 1/1 Running. The pod's own sheet carries the mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector' with 'Node-Selectors: disktype=ssd'. The workload template (GetAppYAML productcatalogservice) declares spec.template.spec.nodeSelecto

### case-109

- **结论**：`app/recommendationservice` + `node_selector_mismatch` ｜ 标签 `app/recommendationservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 0.6667 · EOC 0.6667 · ECR 0 · EE 0.1667 · steps 13 · tokens 72,707
- **raw 日志**：[results/1014_1955_inorder4-v3b176/raw/1014_1955_boutique-scheduling-109](../results/1014_1955_inorder4-v3b176/raw/1014_1955_boutique-scheduling-109/)（ndjson / mcp.jsonl / meta）
- **摘要**：Partial unreachability is confined to recommendationservice. Symptom side: frontend error logs show 83 occurrences of "failed to get product recommendations" with "rpc error: code = Unavailable ... dial tcp 10.68.199.56:8080: connect: connection refused", and 10.68.199.56:8080 is exactly recommendationservice's declared ClusterIP/port (Service selector app=recommendationservice, port 8080->8080). Object layer shows the single outlier recommendationservice-54c95657c8-r4jxw as 0/1 Pending with Node <none>, and the owner deployment recommendationservice reports 0/1 AVAILABLE/READY. The pod's own 

### case-110

- **结论**：`app/redis-cart` + `node_selector_mismatch` ｜ 标签 `app/redis-cart` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 100,156
- **raw 日志**：[results/1014_1955_inorder4-v3b176/raw/1014_1956_boutique-scheduling-110](../results/1014_1955_inorder4-v3b176/raw/1014_1956_boutique-scheduling-110/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods inventory shows a single outlier: redis-cart-5d5fdb58ff-4xdq6 is 0/1 Pending with no node assigned (all other 10 boutique services are 1/1 Running, 0 restarts). Its own DescribeResource gives the reason verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector', with pod spec carrying 'Node-Selectors: disktype=ssd'. The node side shows all three workers Ready, untainted (master is the 1 unschedulable/cordoned node) and labeled 'disk-type=ssd' - a different label KEY than the pod's requested

### case-111

- **结论**：`app/shippingservice` + `node_selector_mismatch` ｜ 标签 `app/shippingservice` + `node_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 71,339
- **raw 日志**：[results/1014_1955_inorder4-v3b176/raw/1014_1956_boutique-scheduling-111](../results/1014_1955_inorder4-v3b176/raw/1014_1956_boutique-scheduling-111/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 命名空间中 shippingservice Pod（shippingservice-6c796c756b-895lq）卡在 Pending 且 Node=<none>，是 pods 清单中唯一离群行（其余 10 个服务均 1/1 Running）；deployment 显示 0/1 AVAILABLE。对该服务声明的端口 50051 做连通性实测返回 Connection Failed，造成 'Partial Service Unreachability'。Pod 自身说明记录机制事件：Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match Pod's node affinity/selector'。对照节点侧：worker-01/02/03 均 Ready、无 taint、CPU/内存充足，但其标签键为 'disk-type=ssd'（带连字符），而 GetAppYAML(shippingservice) 的 Pod 模板要求 'nodeSelector: disktype: ssd'（键名不同），故 3 个 worker 键名不匹配；第 4 个节点 master 为 Ready,SchedulingDisabl

### case-112

- **结论**：`app/adservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/adservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 70,620
- **raw 日志**：[results/1014_1956_inorder4-v3b177/raw/1014_1956_boutique-scheduling-112](../results/1014_1956_inorder4-v3b177/raw/1014_1956_boutique-scheduling-112/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique pods scan isolates adservice as the only outlier: adservice-ffb868985-2qdss and adservice-ffb868985-jp22l are 0/1 Pending with Node <none>, while the other 3 adservice replicas run on worker-01/02/03 and all 11 other services are 1/1 Running; deployments show 'adservice 3/5' READY/AVAILABLE (replicas desired 5). Connectivity probe to the declared port is still reachable (adservice 10.68.42.160:9555 open, Connection Succeeded), matching 'partial' unreachability and ruling out addressing/port faults. Both pending pods' own sheets carry the scheduling line: 'FailedScheduling ..

### case-113

- **结论**：`app/cartservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/cartservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 73,426
- **raw 日志**：[results/1014_1956_inorder4-v3b177/raw/1014_1956_boutique-scheduling-113](../results/1014_1956_inorder4-v3b177/raw/1014_1956_boutique-scheduling-113/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability.' in namespace boutique. Pod inventory outlier: cartservice Deployment 3/5 ready (spec.replicas=5, 5 up-to-date) with two pods cartservice-7dd764f9cc-dvz9s and cartservice-7dd764f9cc-rdjtn stuck Pending (0/1, Node: <none>, PodScheduled=False) while all other 10 services are 1/1 Running. Both Pending pods' own sheets carry the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules. preemption: 0/4 nodes are available: ... 3 No preemption victims found'. The conf

### case-114

- **结论**：`app/checkoutservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/checkoutservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 141,975
- **raw 日志**：[results/1014_1956_inorder4-v3b177/raw/1014_1957_boutique-scheduling-114](../results/1014_1956_inorder4-v3b177/raw/1014_1957_boutique-scheduling-114/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace-wide pods listing shows the only outlier workload is checkoutservice: pods checkoutservice-fd5c7b5c4-m2xx8 and -mxfgs are 0/1 Pending with NODE=<none> while the other 3 replicas run on worker-01/02/03; the deployments listing confirms checkoutservice 3/5 READY (AVAILABLE 3), all other services 1/1. The Pending pods' own reason (DescribeResource events) is verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetClusterConfiguration shows all 4 nodes Ready with master carrying taint node.kubernet

### case-115

- **结论**：`app/frontend` + `pod_anti_affinity_conflict` ｜ 标签 `app/frontend` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3636 · steps 12 · tokens 88,550
- **raw 日志**：[results/1014_1956_inorder4-v3b177/raw/1014_1957_boutique-scheduling-115](../results/1014_1956_inorder4-v3b177/raw/1014_1957_boutique-scheduling-115/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' localizes to frontend: pods listing shows only frontend as the outlier (2 of 5 replicas Pending with Node <none>), deployment frontend reports 3/5 READY (AVAILABLE 3), and endpoints/frontend carries only 3 backends (172.20.1.221, 172.20.2.97, 172.20.3.22 :8080) while frontend-external NodePort 30080 shares the same partial backend set — hence only partially reachable. Both Pending pods' events read verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetClusterConfigu

### case-116

- **结论**：`app/paymentservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/paymentservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2667 · steps 16 · tokens 111,079
- **raw 日志**：[results/1014_1958_inorder4-v3b178/raw/1014_1958_boutique-scheduling-116](../results/1014_1958_inorder4-v3b178/raw/1014_1958_boutique-scheduling-116/)（ndjson / mcp.jsonl / meta）
- **摘要**：Two paymentservice pods (paymentservice-67987f6464-bzdlh, -fg2kz) are stuck 0/1 Pending with NODE=<none>, while all other 13 pods are 1/1 Running. The pending pods' own FailedScheduling event states the blocker verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' The node side excludes capacity/cordon as the fault: master is the standard cordoned control-plane (Ready,SchedulingDisabled + node.kubernetes.io/unschedulable:NoSchedule taint), worker-01/02/03 are Ready, untainted, 8 CPU / ~15Gi each with no pressure. GetAppYAML(paymentse

### case-117

- **结论**：`app/productcatalogservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/productcatalogservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 118,105
- **raw 日志**：[results/1014_1958_inorder4-v3b178/raw/1014_1958_boutique-scheduling-117](../results/1014_1958_inorder4-v3b178/raw/1014_1958_boutique-scheduling-117/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique: only outlier is productcatalogservice, Deployment READY 3/5 (all other 10 deployments 1/1). Two pods (kz9dz, ndzwh) are Pending with PodScheduled=False; both carry the identical scheduler event: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetAppYAML(productcatalogservice) shows spec.replicas=5 combined with requiredDuringSchedulingIgnoredDuringExecution podAntiAffinity (topologyKey kubernetes.io/hostname), i.e. each replica must occupy a distinct node, while GetClusterConfiguration/GetResources(nodes) show only 3 

### case-118

- **结论**：`app/redis-cart` + `pod_anti_affinity_conflict` ｜ 标签 `app/redis-cart` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1026 · steps 40 · tokens 287,952
- **raw 日志**：[results/1014_1958_inorder4-v3b178/raw/1014_1959_boutique-scheduling-118](../results/1014_1958_inorder4-v3b178/raw/1014_1959_boutique-scheduling-118/)（ndjson / mcp.jsonl / meta）
- **摘要**：Inventory entry (symptom names no service): only redis-cart is the outlier — Deployment redis-cart 3/5 AVAILABLE with 2 pods permanently Pending (Node: <none>, PodScheduled False), all other boutique workloads 1/1. Victim's own signal: redis-cart Endpoints expose only 3 backends (172.20.1.24/172.20.2.133/172.20.3.26) and an active TCP probe on redis-cart:6379 (its Service-declared port) returns 'Connection failed' while frontend:80, cartservice:7070, productcatalogservice:3550, currencyservice:7000, adservice:9555 and checkoutservice:5050 all return open/Connection Succeeded. Mechanism event, 

### case-119

- **结论**：`app/shippingservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/shippingservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 13 · tokens 85,230
- **raw 日志**：[results/1014_1958_inorder4-v3b178/raw/1014_1959_boutique-scheduling-119](../results/1014_1958_inorder4-v3b178/raw/1014_1959_boutique-scheduling-119/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods listing showed shippingservice as the outlier with 5 pods (all other services 1) and 2 stuck 0/1 Pending. Both Pending pods (shippingservice-57cffd957b-nk5sm, -wrdd2) carry the same mechanism event: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.', with PodScheduled=False and no node selector. Nodes listing: master Ready,SchedulingDisabled (normal control-plane cordon, explains the 1 unschedulable) and only worker-01/02/03 Ready and schedulable, all three rejected by anti-affinity. GetAppYAML(shippingservice)

### case-120

- **结论**：`app/adservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/adservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 90,989
- **raw 日志**：[results/1014_2001_inorder4-v3b179/raw/1014_2001_boutique-scheduling-120](../results/1014_2001_inorder4-v3b179/raw/1014_2001_boutique-scheduling-120/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique namespace pods listing shows the single outlier adservice-5fb4d887f7-whb5t as 0/1 Pending with Node <none>, while all other services are 1/1 Running and deployments/adservice reports 0/1 AVAILABLE. DescribeResource on that pod yields the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetClusterConfiguration shows worker-01/02/03 all Ready with no taints and ample allocatable CPU/memory (only master carries the by-design unschedulable taint), excluding capacity/taint/selector causes

### case-121

- **结论**：`app/cartservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/cartservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 112,713
- **raw 日志**：[results/1014_2001_inorder4-v3b179/raw/1014_2001_boutique-scheduling-121](../results/1014_2001_inorder4-v3b179/raw/1014_2001_boutique-scheduling-121/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend 错误日志 267/280 条指向 cartservice ClusterIP: 'dial tcp 10.68.106.185:7070: connect: connection refused'（could not retrieve cart / failed to add to cart），连通性实测 CheckServiceConnectivity(cartservice,7070)=Connection Failed；cartservice Pod cartservice-66bc57588b-tpnjj 为 0/1 Pending 且 Node=<none>，Deployment cartservice 0/1 AVAILABLE（唯一不可用的 workload），Service selector app=cartservice 无可用后端导致 ClusterIP 拒绝连接；Pod 事件逐字为 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules'；配置确认面 GetAppYAML(cartservice) 模板含 requiredDuringScheduling

### case-122

- **结论**：`app/checkoutservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/checkoutservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 89,049
- **raw 日志**：[results/1014_2001_inorder4-v3b179/raw/1014_2002_boutique-scheduling-122](../results/1014_2001_inorder4-v3b179/raw/1014_2002_boutique-scheduling-122/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only one outlier in the namespace-wide pod inventory: checkoutservice-776b564747-8rxf9 is Pending (0/1), while all 14 other pods are 1/1 Running and the checkoutservice Deployment reports 0/1 AVAILABLE. Symptom side: frontend's error logs show 184/742 errors, all 'failed to complete the order: rpc error: code = Unavailable ... dial tcp 10.68.191.242:5050: connect: connection refused' on POST /cart/checkout, and CheckServiceConnectivity(checkoutservice:5050) returns 'Connection Failed'. Mechanism event on the pending pod: 'PodScheduled False' with 'FailedScheduling - 0/4 nodes are available: 1 

### case-123

- **结论**：`app/currencyservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/currencyservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 90,872
- **raw 日志**：[results/1014_2001_inorder4-v3b179/raw/1014_2002_boutique-scheduling-123](../results/1014_2001_inorder4-v3b179/raw/1014_2002_boutique-scheduling-123/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice is the only outlier: its pod currencyservice-8c5948dc9-c2v8j is 0/1 Pending with Node:<none> and deployment currencyservice shows 0/1 AVAILABLE, while all other boutique services are 1/1 Running. The pod sheet's mechanism event reads 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' The single unschedulable node is master (Ready,SchedulingDisabled, cordoned by design), while worker-01/02/03 are Ready, untainted and have 8 CPU / ~15.6Gi allocatable with no pressure, excluding node capacity/cordon as the 

### case-124

- **结论**：`app/emailservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/emailservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2 · steps 16 · tokens 126,795
- **raw 日志**：[results/1014_2003_inorder4-v3b180/raw/1014_2003_boutique-scheduling-124](../results/1014_2003_inorder4-v3b180/raw/1014_2003_boutique-scheduling-124/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pods inventory shows emailservice-7cbb96f5c5-w6n56 as the sole outlier: 0/1 Pending with Node <none> while all other 14 pods are 1/1 Running and no metric alerts fired. Its own sheet carries the mechanism event: Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules'. GetAppYAML(emailservice) shows a REQUIRED podAntiAffinity with labelSelector matchExpressions key=service In [backend] on topologyKey kubernetes.io/hostname, while GetResources(pods,label_selector=service=backend) returns the backend-daemonset pods occupying

### case-125

- **结论**：`app/frontend` + `pod_anti_affinity_conflict` ｜ 标签 `app/frontend` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2143 · steps 15 · tokens 121,317
- **raw 日志**：[results/1014_2003_inorder4-v3b180/raw/1014_2003_boutique-scheduling-125](../results/1014_2003_inorder4-v3b180/raw/1014_2003_boutique-scheduling-125/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend pod frontend-556c8b56f-n7fhk is the only outlier (READY 0/1, STATUS Pending, NODE <none>) while all other 14 pods run 1/1; frontend Service has zero endpoints (GetResources endpoints: 'frontend <none>') and CheckServiceConnectivity(frontend:80) returns 'Connection Failed'. Its own scheduling reason reads verbatim: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetAppYAML(frontend) shows a REQUIRED podAntiAffinity with labelSelector 'service In [backend]' at topologyKey kubernetes.io/hostname, and the label-

### case-126

- **结论**：`app/paymentservice` + `pod_anti_affinity_conflict` ｜ 标签 `app/paymentservice` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2308 · steps 14 · tokens 104,300
- **raw 日志**：[results/1014_2003_inorder4-v3b180/raw/1014_2004_boutique-scheduling-126](../results/1014_2003_inorder4-v3b180/raw/1014_2004_boutique-scheduling-126/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice pod (paymentservice-594d87444c-pwk96) is stuck Pending with PodScheduled=False; the pod's own FailedScheduling event reads verbatim '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' The pod template declares a REQUIRED podAntiAffinity with labelSelector 'service In [backend]' and topologyKey kubernetes.io/hostname, while the backend-daemonset runs 4/4 READY replicas labelled service=backend, one on every node (worker-01/worker-02/worker-03/master) — so no node can ever satisfy the rule and the pod is never bound. Victim-side

### case-127

- **结论**：`app/redis-cart` + `pod_anti_affinity_conflict` ｜ 标签 `app/redis-cart` + `pod_anti_affinity_conflict`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3 · steps 11 · tokens 96,178
- **raw 日志**：[results/1014_2003_inorder4-v3b180/raw/1014_2004_boutique-scheduling-127](../results/1014_2003_inorder4-v3b180/raw/1014_2004_boutique-scheduling-127/)（ndjson / mcp.jsonl / meta）
- **摘要**：Namespace boutique shows a single scheduling outlier: pod redis-cart-8454c66588-pf7bs is 0/1 Pending with Node:<none> and PodScheduled=False, while all 14 other pods are 1/1 Running (RESTARTS=0) and GetAlerts() reports no metric anomalies. The pod's own reason line is decisive: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) didn't match pod anti-affinity rules.' GetAppYAML(redis-cart) shows a hard requiredDuringSchedulingIgnoredDuringExecution podAntiAffinity matching label service in (backend) with topologyKey kubernetes.io/hostname, and GetResources(po

### case-128

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3889 · steps 19 · tokens 115,187
- **raw 日志**：[results/1014_2005_inorder4-v3b181/raw/1014_2005_boutique-scheduling-128](../results/1014_2005_inorder4-v3b181/raw/1014_2005_boutique-scheduling-128/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only unreachable service: its endpoints are '<none>' (all other 11 services have endpoints) and TCP connectivity to its declared port 6379 fails from all three workers. Its pod redis-cart-68db7b6f97-qt7nr is 0/1 Pending with Node '<none>' (deployment redis-cart 0/1 AVAILABLE). Pod event: FailedScheduling '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims.' The claim redis-cart-pvc is Pending with FailedBinding 'no persistent volumes available for this claim and no storage class is set'. Comparing the claim against the only candidate PV, redis-cart-pv (

### case-129

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 108,826
- **raw 日志**：[results/1014_2005_inorder4-v3b181/raw/1014_2005_boutique-scheduling-129](../results/1014_2005_inorder4-v3b181/raw/1014_2005_boutique-scheduling-129/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: connectivity probe to redis-cart:6379 (its Service's declared port) failed, and the endpoints listing shows redis-cart '<none>' while all 11 other boutique services have endpoints — matching 'Partial' unreachability. Anchored pod scan shows the single outlier redis-cart-68db7b6f97-fqzcz 0/1 Pending (Node: <none>), with the mechanism event verbatim: 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' — so the blocker is storage binding, not node capacity/taints (all 4 nodes Ready, workers untainted). The PVC's own event reads 'Fai

### case-130

- **结论**：`app/redis-cart` + `pvc_access_mode_mismatch` ｜ 标签 `app/redis-cart` + `pvc_access_mode_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.35 · steps 21 · tokens 135,409
- **raw 日志**：[results/1014_2005_inorder4-v3b181/raw/1014_2006_boutique-scheduling-130](../results/1014_2005_inorder4-v3b181/raw/1014_2006_boutique-scheduling-130/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods inventory shows a single outlier: redis-cart-68db7b6f97-8w4pp 0/1 Pending with Node <none> (all other 10 pods 1/1 Running; no alerts). Its own sheet carries the mechanism line: 'PodScheduled False' and 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. Node-side causes are excluded: GetClusterConfiguration shows worker-01/02/03 Ready, untainted, 8 CPU and ~15Gi allocatable each (master is SchedulingDisabled by control-plane design). The referenced object closes the mechanism: redis-cart-pvc Status Pending, StorageClass empty, Volume 

### case-131

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.4 · steps 16 · tokens 90,744
- **raw 日志**：[results/1014_2005_inorder4-v3b181/raw/1014_2006_boutique-scheduling-131](../results/1014_2005_inorder4-v3b181/raw/1014_2006_boutique-scheduling-131/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side first: cartservice logs show 342 errors (37% error ratio) 'UnableToConnect on redis-cart:6379 ... Can't access cart storage. RedisConnectionException', and CheckServiceConnectivity(redis-cart:6379) fails from worker-01/02/03. Pod inventory shows the single outlier redis-cart-68db7b6f97-h6h7k 0/1 Pending with Node <none>, while all other 10 boutique services run 1/1. The pod's own sheet carries the mechanism: 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and the PVC event reads 'no persistent volumes available for this claim and n

### case-132

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3333 · steps 22 · tokens 137,996
- **raw 日志**：[results/1014_2007_inorder4-v3b182/raw/1014_2007_boutique-scheduling-132](../results/1014_2007_inorder4-v3b182/raw/1014_2007_boutique-scheduling-132/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: cartservice (the only caller of redis-cart, itself called by frontend/checkoutservice) logs 345 errors (37.2%) reading 'UnableToConnect on redis-cart:6379 ... StackExchange.Redis.RedisConnectionException', and an active TCP probe to redis-cart:6379 fails from worker-01/02/03. Object layer: the only outlier row is pod redis-cart-68db7b6f97-4ql95 (0/1 Pending, Node <none>); owner chain shows deployment/redis-cart 0/1 AVAILABLE (1 up-to-date) while all other deployments and pods are 1/1 Running. Mechanism event on the pod: PodScheduled=False, Warning FailedScheduling '0/4 nodes are 

### case-133

- **结论**：`app/redis-cart` + `pvc_selector_mismatch` ｜ 标签 `app/redis-cart` + `pvc_selector_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 90,393
- **raw 日志**：[results/1014_2007_inorder4-v3b182/raw/1014_2007_boutique-scheduling-133](../results/1014_2007_inorder4-v3b182/raw/1014_2007_boutique-scheduling-133/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only outlier in the boutique pod inventory: redis-cart-68db7b6f97-gcxs9 is 0/1 Pending with Node <none>, while all other 10 pods are 1/1 Running. Its Service redis-cart has an EMPTY Endpoints list and an active TCP probe on its declared port 6379 returns 'Connection Failed' (the partial-unreachability symptom). The pod's own sheet carries the pending line 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', and its PVC redis-cart-pvc is Pending with event 'FailedBinding: no persistent volumes available for this claim and no storage

### case-134

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.3125 · steps 17 · tokens 110,548
- **raw 日志**：[results/1014_2007_inorder4-v3b182/raw/1014_2008_boutique-scheduling-134](../results/1014_2007_inorder4-v3b182/raw/1014_2008_boutique-scheduling-134/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique inventory: pod redis-cart-68db7b6f97-hfwt6 is 0/1 Pending with Node=<none>; deployment redis-cart is 0/1 AVAILABLE. Its own sheet names the mechanism verbatim: 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims.' The storage surface shows the break: PVC redis-cart-pvc is Pending with StorageClass 'fast-sdd' and Volume unbound, event 'ProvisioningFailed ... storageclass.storage.k8s.io "fast-sdd" not found'. Config confirmation: the PVC manifest declares storageClassName: "fast-sdd" while the storageclass listing contains 

### case-135

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 91,987
- **raw 日志**：[results/1014_2007_inorder4-v3b182/raw/1014_2008_boutique-scheduling-135](../results/1014_2007_inorder4-v3b182/raw/1014_2008_boutique-scheduling-135/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: cartservice (sole upstream of redis-cart) logged 354/952 errors (37.2%), all redis-cart:6379 connections failing ('Can't access cart storage', 'UnableToConnect on redis-cart:6379/Interactive'), i.e. only the cart path is unreachable. Outlier lock: pod redis-cart-68db7b6f97-kksc7 is 0/1 Pending with Node <none>, while all other 10 pods are 1/1 Running; endpoints/redis-cart is <none> and CheckServiceConnectivity(redis-cart:6379) fails from worker-01/02/03. The pod's own sheet carries the break: PodScheduled=False with Warning FailedScheduling '0/4 nodes are available: pod has unbou

### case-136

- **结论**：`app/redis-cart` + `pvc_storage_class_mismatch` ｜ 标签 `app/redis-cart` + `pvc_storage_class_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2941 · steps 18 · tokens 104,067
- **raw 日志**：[results/1014_2009_inorder4-v3b183/raw/1014_2009_boutique-scheduling-136](../results/1014_2009_inorder4-v3b183/raw/1014_2009_boutique-scheduling-136/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only redis-cart is affected: pod redis-cart-68db7b6f97-2jwj6 is 0/1 Pending with Node <none>, its Service endpoints are <none> (every other boutique service has a live endpoint), and a TCP probe on the Service's declared port 6379 fails (Connection Failed) - hence 'partial' unreachability. The pod's own sheet carries the pending line: 'FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' (all 4 nodes Ready/taint-free, so not node-side). The PVC face names the mechanism verbatim: redis-cart-pvc is Pending with 'ProvisioningFailed storageclass.storage.k8s.i

### case-137

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 110,742
- **raw 日志**：[results/1014_2009_inorder4-v3b183/raw/1014_2009_boutique-scheduling-137](../results/1014_2009_inorder4-v3b183/raw/1014_2009_boutique-scheduling-137/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only redis-cart is broken; all other 10 boutique services are 1/1 Running. endpoints/redis-cart shows ENDPOINTS <none> and deployments/redis-cart is 0/1 (0 AVAILABLE), matching the partial-unreachability symptom. The victim pod redis-cart-68db7b6f97-tl7f5 is 0/1 Pending with Node <none> and PodScheduled=False; its own event reads '0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims'. Its PVC redis-cart-pvc is Pending with repeated 'FailedBinding: no persistent volumes available for this claim and no storage class is set'. The referenced-object surface closes it: the only 

### case-138

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1818 · steps 23 · tokens 159,450
- **raw 日志**：[results/1014_2009_inorder4-v3b183/raw/1014_2010_boutique-scheduling-138](../results/1014_2009_inorder4-v3b183/raw/1014_2010_boutique-scheduling-138/)（ndjson / mcp.jsonl / meta）
- **摘要**：Chain (reachability): status-only the outlier is redis-cart (redis-cart-68db7b6f97-nwrk2 0/1 Pending, Node <none>) while all other 11 boutique services are 1/1 Running -> caller side: cartservice/frontend error logs show 'UnableToConnect on redis-cart:6379' / 'It was not possible to connect to the redis server(s). ConnectTimeout' -> victim's own signal: endpoints/redis-cart = <none> and CheckServiceConnectivity(redis-cart:6379) = Connection failed -> mechanism event: 'FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' -> storage surface: redis-cart-pvc 

### case-139

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1905 · steps 22 · tokens 148,721
- **raw 日志**：[results/1014_2009_inorder4-v3b183/raw/1014_2010_boutique-scheduling-139](../results/1014_2009_inorder4-v3b183/raw/1014_2010_boutique-scheduling-139/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart pod redis-cart-68db7b6f97-v52rv is the lone outlier in the boutique pods listing (0/1 Pending, Node=<none>); its own sheet shows 'FailedScheduling ... 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims', so the break is the volume-binding layer, not the nodes (all 4 nodes Ready, no taints on workers, no pressure). The claimed PVC redis-cart-pvc is Pending with event 'no persistent volumes available for this claim and no storage class is set' (StorageClass empty, requests 1Gi RWO, no selector, no dynamic provisioner: only StorageClass 'standard' is no-provision

### case-140

- **结论**：`app/redis-cart` + `pv_binding_occupied` ｜ 标签 `app/redis-cart` + `pv_binding_occupied`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 88,932
- **raw 日志**：[results/1014_2011_inorder4-v3b184/raw/1014_2011_boutique-scheduling-140](../results/1014_2011_inorder4-v3b184/raw/1014_2011_boutique-scheduling-140/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in boutique namespace: pod redis-cart-68db7b6f97-gr64j is 0/1 Pending with Node <none> (all 10 other pods are 1/1 Running); connectivity probe on the Service's declared port (redis-cart:6379) returns Connection Failed. DescribeResource(pod) shows PodScheduled=False and event 'FailedScheduling 0/4 nodes are available: pod has unbound immediate PersistentVolumeClaims' - a volume-binding block, not a node block. Volume surfaces: PVC redis-cart-pvc is Pending with event 'FailedBinding: no persistent volumes available for this claim and no storage class is set', while the only PV redis

### case-141

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1579 · steps 20 · tokens 141,337
- **raw 日志**：[results/1014_2011_inorder4-v3b184/raw/1014_2011_boutique-scheduling-141](../results/1014_2011_inorder4-v3b184/raw/1014_2011_boutique-scheduling-141/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend logs show 145x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.204.227:9555: connect: connection refused' while other downstreams answer normally; adservice endpoints listing = <none> and a probe on its declared port 9555 fails (Connection Failed), so only adservice is unreachable. Pods listing shows the single outlier adservice-84dbdf99d-rhfrm 0/1 Pending with Node <none>; its own sheet carries PodScheduled=False and Warning FailedScheduling '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}'. GetClusterConfig

### case-142

- **结论**：`app/cartservice` + `taint_toleration_mismatch` ｜ 标签 `app/cartservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1364 · steps 23 · tokens 211,708
- **raw 日志**：[results/1014_2011_inorder4-v3b184/raw/1014_2012_boutique-scheduling-142](../results/1014_2011_inorder4-v3b184/raw/1014_2012_boutique-scheduling-142/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice is the only unreachable service (partial): its pod cartservice-79b49f5555-pzjnb is 0/1 Pending with Node <none>, while all other 10 boutique services are 1/1 Running. Frontend caller errors are dominated by 'rpc error: code = Unavailable ... dial tcp 10.68.180.199:7070: connect: connection refused' (250/285 errors) and CheckServiceConnectivity(cartservice:7070) fails, proving the Service has zero ready endpoints. The pod's own sheet carries the mechanism: 'FailedScheduling 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}'. Node

### case-143

- **结论**：`app/currencyservice` + `taint_toleration_mismatch` ｜ 标签 `app/currencyservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 152,436
- **raw 日志**：[results/1014_2011_inorder4-v3b184/raw/1014_2012_boutique-scheduling-143](../results/1014_2011_inorder4-v3b184/raw/1014_2012_boutique-scheduling-143/)（ndjson / mcp.jsonl / meta）
- **摘要**：currencyservice is the only workload drained: its pod currencyservice-75686c9564-x92gx is 0/1 Pending with NODE=<none>, PodScheduled=False, carrying the verbatim event 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}'. All three workers are Ready with no pressure and ample allocatable CPU/memory (worker-01 at 12% cpu / 7% mem), but each is tainted critical=true:NoSchedule, while the currencyservice pod template declares only the default not-ready/unreachable tolerations and no nodeSelector/affinity (Node-Selectors: <n

### case-144

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.125 · steps 25 · tokens 188,739
- **raw 日志**：[results/1014_2014_inorder4-v3b185/raw/1014_2014_boutique-scheduling-144](../results/1014_2014_inorder4-v3b185/raw/1014_2014_boutique-scheduling-144/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in the boutique inventory: pod emailservice-b78fc569b-htzsw is 0/1 Pending with Node:<none>, its ReplicaSet emailservice-b78fc569b shows READY 0/1, and its Service endpoints are '<none>' with an active TCP probe on emailservice:5000 returning Connection Failed (partial unreachability of emailservice only; the other 10 boutique pods are 1/1 Running). Pod sheet: PodScheduled=False with mechanism event 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}'; Node-Selectors:<none> and Tolerations only the d

### case-145

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.25 · steps 17 · tokens 128,951
- **raw 日志**：[results/1014_2014_inorder4-v3b185/raw/1014_2014_boutique-scheduling-145](../results/1014_2014_inorder4-v3b185/raw/1014_2014_boutique-scheduling-145/)（ndjson / mcp.jsonl / meta）
- **摘要**：Pod paymentservice-78c5996648-qdrgb is the only outlier in the boutique namespace: READY 0/1, STATUS Pending, NODE <none> (all 10 other pods are 1/1 Running on worker-01/02). Its own sheet carries the mechanism: 'FailedScheduling ... 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}', while its Deployment shows 0/1 AVAILABLE with 1 up-to-date (pod exists, so this is not an admission/FailedCreate case). The node layer closes it: worker-01/02/03 are all Ready and unpressured but each carries taint critical=true:NoSchedule, while the single 'u

### case-146

- **结论**：`app/productcatalogservice` + `taint_toleration_mismatch` ｜ 标签 `app/productcatalogservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2105 · steps 20 · tokens 137,921
- **raw 日志**：[results/1014_2014_inorder4-v3b185/raw/1014_2015_boutique-scheduling-146](../results/1014_2014_inorder4-v3b185/raw/1014_2015_boutique-scheduling-146/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs (184/734, 25%) all fail dialing productcatalogservice ClusterIP 10.68.24.13:3550 with 'connect: connection refused', while frontend:80 itself is reachable -> only this one call path is broken ('partial'). Victim signal: CheckServiceConnectivity(productcatalogservice, 3550) = 'Connection Failed', yet its Service selector app=productcatalogservice and port 3550->targetPort 3550 match the container port, excluding addressing/port faults. Workload/owner chain: pods listing shows the single outlier productcatalogservice-ddb46fc86-hw4ft 0/1 Pending with Node <none>;

### case-147

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1875 · steps 17 · tokens 129,066
- **raw 日志**：[results/1014_2014_inorder4-v3b185/raw/1014_2015_boutique-scheduling-147](../results/1014_2014_inorder4-v3b185/raw/1014_2015_boutique-scheduling-147/)（ndjson / mcp.jsonl / meta）
- **摘要**：redis-cart is the only unavailable service (Deployment 0/1; pod redis-cart-68db7b6f97-2s5j9 Pending with no node, scheduler event verbatim: '0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had untolerated taint {critical: true}'). GetClusterConfiguration shows worker-01/02/03 Ready but tainted 'critical=true:NoSchedule' (master's SchedulingDisabled is the baseline cordon), while GetAppYAML(redis-cart) declares no tolerations (and no nodeSelector/affinity) — so no schedulable node accepts the pod. Capacity, storage and image faces are clean: 8 CPU / ~15Gi allocatable vs 70m CPU

### case-148

- **结论**：`app/shippingservice` + `taint_toleration_mismatch` ｜ 标签 `app/shippingservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 119,141
- **raw 日志**：[results/1014_2016_inorder4-v3b186/raw/1014_2016_boutique-scheduling-148](../results/1014_2016_inorder4-v3b186/raw/1014_2016_boutique-scheduling-148/)（ndjson / mcp.jsonl / meta）
- **摘要**：Frontend caller error logs (147 hits, 11.2%) show 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.253.87:50051: connect: connection refused'. Inventory scan shows the single outlier: shippingservice-7cbfcb6d68-mzdls 0/1 Pending with Node <none>, while all 10 sibling pods are 1/1 Running; shippingservice Service has NO endpoints (<none>) and CheckServiceConnectivity(shippingservice:50051) fails. The pod's own sheet carries the mechanism event verbatim: 'Warning FailedScheduling default-scheduler 0/4 nodes are available: 1 node(s) were unschedulable, 3 node(s) had

### case-149

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 118,445
- **raw 日志**：[results/1014_2016_inorder4-v3b186/raw/1014_2016_boutique-scheduling-149](../results/1014_2016_inorder4-v3b186/raw/1014_2016_boutique-scheduling-149/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom chain (reachability): frontend caller error logs show 157/784 errors, all 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.87.140:9555: connect: connection refused' (adservice ClusterIP:9555); endpoints listing shows 'adservice <none>' while all other 10 boutique services are bound; active connectivity probe to adservice:9555 (its Service-declared port) returns 'Connection Failed'. Workload layer: only adservice is the outlier - pod adservice-676bb5bd5c-gbh7w is 0/1 Pending with Node <none> / PodScheduled False, deployment adservice 0/1 AVAILABLE, all other pods 1/1

### case-150

- **结论**：`app/checkoutservice` + `taint_toleration_mismatch` ｜ 标签 `app/checkoutservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 145,313
- **raw 日志**：[results/1014_2016_inorder4-v3b186/raw/1014_2017_boutique-scheduling-150](../results/1014_2016_inorder4-v3b186/raw/1014_2017_boutique-scheduling-150/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique pods listing shows a single outlier: checkoutservice-59664766bc-xvrbg is 0/1 Pending with no node, while all 10 other pods are 1/1 Running. The victim's own surface confirms the outage: CheckServiceConnectivity(checkoutservice, 5050) = Connection Failed and its endpoints listing = <none> (upstream caller = frontend, so its front door is broken). DescribeResource(pod) carries the blocker: FailedScheduling '0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector', with Node-Selecto

### case-151

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2222 · steps 19 · tokens 119,860
- **raw 日志**：[results/1014_2016_inorder4-v3b186/raw/1014_2017_boutique-scheduling-151](../results/1014_2016_inorder4-v3b186/raw/1014_2017_boutique-scheduling-151/)（ndjson / mcp.jsonl / meta）
- **摘要**：emailservice is the only outlier: pod emailservice-5dc98cf79d-sjbdt is 0/1 Pending (Node: <none>, PodScheduled False) and deployment emailservice is 0/1 AVAILABLE, so its Service has empty Endpoints and a TCP probe to its declared port 5000 returns 'Connection Failed' -> partial service unreachability (checkoutservice's EMAIL_SERVICE_ADDR=emailservice:5000). The pod's own sheet carries the mechanism event: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/select

### case-152

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 130,889
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2130_boutique-scheduling-152](../results/1014_2130_inorder4-final13/raw/1014_2130_boutique-scheduling-152/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice is the only outlier: its pod paymentservice-67f996f49d-hfg6c is Pending with Node:<none> while all 10 peer pods are 1/1 Running, and the deployment reads 0/1 AVAILABLE (desired 1). Its Service has no bound endpoint (GetResources(endpoints, name=paymentservice) -> <none>), so payment charging is unreachable to checkoutservice. The pod's own mechanism event reads verbatim: 'Warning FailedScheduling 0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector.' The deployment's pod

### case-153

- **结论**：`app/productcatalogservice` + `taint_toleration_mismatch` ｜ 标签 `app/productcatalogservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1765 · steps 18 · tokens 133,053
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2130_boutique-scheduling-153](../results/1014_2130_inorder4-final13/raw/1014_2130_boutique-scheduling-153/)（ndjson / mcp.jsonl / meta）
- **摘要**：frontend logs (173/690 errors) show 'rpc error: code = Unavailable ... dial tcp 10.68.204.67:3550: connect: connection refused' toward productcatalogservice, and CheckServiceConnectivity(productcatalogservice:3550) returns Connection Failed while endpoints/productcatalogservice has empty Subsets. Pod listing's only outlier is productcatalogservice-dfd4c7b9b-5cmn8 (0/1 Pending, no node) and deployment productcatalogservice reads 0/1 AVAILABLE. The pod's own reason: '0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't ma

### case-154

- **结论**：`app/recommendationservice` + `taint_toleration_mismatch` ｜ 标签 `app/recommendationservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2857 · steps 15 · tokens 91,303
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2131_boutique-scheduling-154](../results/1014_2130_inorder4-final13/raw/1014_2131_boutique-scheduling-154/)（ndjson / mcp.jsonl / meta）
- **摘要**：recommendationservice is the only unreachable workload: its Service has no endpoints ('recommendationservice <none>') and its Deployment shows 0/1 AVAILABLE, caused by pod recommendationservice-68858794d6-pd6vc being stuck 0/1 Pending with Node: <none>. The scheduler's pending line on the pod sheet reads '0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'. The pod template (GetAppYAML) pins it with nodeSelector app=target-node, and only node worker-01 carries label app=target-node; 

### case-155

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0857 · steps 36 · tokens 575,813
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2131_boutique-scheduling-155](../results/1014_2130_inorder4-final13/raw/1014_2131_boutique-scheduling-155/)（ndjson / mcp.jsonl / meta）
- **摘要**：boutique 唯一离群对象为 redis-cart pod（redis-cart-6587955858-h82lp，0/1 Pending，Node=<none>，其余 10 个服务 1/1 Running）。其 FailedScheduling 事件逐字给出阻塞原因：'0/4 nodes are available: 1 node(s) had untolerated taint {node-unhealthy: true}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'；该 pod 的 Node-Selectors 为 kubernetes.io/hostname=worker-01、Tolerations: <none>。节点面确认 worker-01 携带人工 taint node-unhealthy=true:NoExecute，但节点 Ready、无 Memory/Disk/PID 压力，kubelet/containerd/kube-proxy 均 active (running) —— taint 是纯配置态，非节点真病；worker-01 的 labels 另缺 kubernetes.io/hostname（旁证）。影响面闭环：redis-c

### case-156

- **结论**：`app/shippingservice` + `taint_toleration_mismatch` ｜ 标签 `app/shippingservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.0909 · steps 34 · tokens 575,267
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2132_boutique-scheduling-156](../results/1014_2130_inorder4-final13/raw/1014_2132_boutique-scheduling-156/)（ndjson / mcp.jsonl / meta）
- **摘要**：Caller-side: frontend error logs (163x) 'failed to get shipping quote: rpc error: code = Unavailable ... dial tcp 10.68.226.143:50051: connect: connection refused'; active probe CheckServiceConnectivity(shippingservice,50051) = 'Connection Failed'; endpoints for shippingservice = <none>. Object layer: pods listing outlier shippingservice-6d544fbbbc-vskx4 is 0/1 Pending with NODE <none> (all 10 peer pods 1/1 Running). Pod sheet carries the mechanism: PodScheduled False, Node-Selectors kubernetes.io/hostname=worker-01, event 'FailedScheduling 0/4 nodes are available: 1 node(s) had untolerated ta

### case-157

- **结论**：`app/adservice` + `taint_toleration_mismatch` ｜ 标签 `app/adservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.15 · steps 21 · tokens 174,191
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2140_boutique-scheduling-157](../results/1014_2130_inorder4-final13/raw/1014_2140_boutique-scheduling-157/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom side: frontend error logs dominated by 151x 'failed to get ads: rpc error: code = Unavailable ... dial tcp 10.68.88.124:9555: connect: connection refused' (20.2% overall error ratio), adservice Endpoints = <none>, and CheckServiceConnectivity(adservice:9555) = Connection Failed, while the Service port mapping (9555 -> targetPort 9555) is correct. Object layer: the only outlier is pod adservice-6cbcf4f588-gdnlr, STATUS Pending, READY 0/1, NODE <none>, PodScheduled=False (deployment adservice 0/1 available; all other 10 boutique services Running 1/1). Mechanism event (verbatim): Warning 

### case-158

- **结论**：`app/cartservice` + `taint_toleration_mismatch` ｜ 标签 `app/cartservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1154 · steps 27 · tokens 222,046
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2139_boutique-scheduling-158](../results/1014_2130_inorder4-final13/raw/1014_2139_boutique-scheduling-158/)（ndjson / mcp.jsonl / meta）
- **摘要**：cartservice's only pod cartservice-8b95d4bb-r7jtd is stuck Pending with PodScheduled=False, so the cartservice Service has zero endpoints (GetResources endpoints -> ENDPOINTS <none>) and the entry caller frontend logs 145x/86x 'cart: rpc error: code = Unavailable ... dial tcp 10.68.97.38:7070: connect: connection refused'; a direct connectivity probe to cartservice:7070 fails. The pod's own FailedScheduling event reads: '0/4 nodes are available: 1 node(s) didn't match Pod's node affinity/selector, 1 node(s) were unschedulable, 2 node(s) had untolerated taint {compute: intensive}'. The two node

### case-159

- **结论**：`app/currencyservice` + `taint_toleration_mismatch` ｜ 标签 `app/currencyservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1667 · steps 19 · tokens 172,745
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2144_boutique-scheduling-159](../results/1014_2130_inorder4-final13/raw/1014_2144_boutique-scheduling-159/)（ndjson / mcp.jsonl / meta）
- **摘要**：namespace boutique 中仅 currencyservice-5d6cb67d5b-hc5jg 离群：0/1 Pending，Node:<none>，其事件为 Warning FailedScheduling '0/4 nodes are available: 1 node(s) had untolerated taint {workload: specialized-processing}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector'。节点侧：worker-01 Ready(Unschedulable:false) 带 label workload-type=specialized 与 taint workload=specialized-processing:NoSchedule；worker-02/03 无该 label；master 为控制面 SchedulingDisabled（基线）。Pod 的 nodeSelector=workload-type=specialized 在 worker-01 上匹配成功，但 Pod 无 `workload=specialized-processing` 容忍（GetAppYAML(currencys

### case-160

- **结论**：`app/emailservice` + `taint_toleration_mismatch` ｜ 标签 `app/emailservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1111 · steps 28 · tokens 190,263
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2143_boutique-scheduling-160](../results/1014_2130_inorder4-final13/raw/1014_2143_boutique-scheduling-160/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only outlier in boutique: pod emailservice-5694b49ccc-xrtj7 is 0/1 Pending with Node <none>; Service emailservice has ENDPOINTS <none> and TCP probe to its declared port 5000 fails, while all 10 sibling boutique pods are 1/1 Running (deployment emailservice 0/1 AVAILABLE 0) and no alerts/metric anomaly exist. Pod's own sheet carries the mechanism verbatim: 'FailedScheduling 0/4 nodes are available: 1 node(s) had untolerated taint {compute: high-performance}, 1 node(s) were unschedulable, 2 node(s) didn't match Pod's node affinity/selector.' Node inventory: worker-01 is Ready/Unschedulable=fals

### case-161

- **结论**：`app/frontend` + `taint_toleration_mismatch` ｜ 标签 `app/frontend` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.125 · steps 25 · tokens 187,222
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2145_boutique-scheduling-161](../results/1014_2130_inorder4-final13/raw/1014_2145_boutique-scheduling-161/)（ndjson / mcp.jsonl / meta）
- **摘要**：Wording named no service, so the inventory listing was the entry: pods surface shows a single outlier 'frontend-8585db7589-dbt2h 0/1 Pending' with NODE <none> (all 10 peers 1/1 Running), deployments shows 'frontend 0/1 AVAILABLE', endpoints shows 'frontend <none>' / 'frontend-external <none>' and CheckServiceConnectivity(frontend:80) = Connection Failed -> victim is the frontend business unit. The pod's own sheet carries the mechanism verbatim: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) didn't match Pod's node affinity/selector, 1 node(s) were unschedulable, 2 node(s) had

### case-162

- **结论**：`app/paymentservice` + `taint_toleration_mismatch` ｜ 标签 `app/paymentservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1429 · steps 29 · tokens 219,169
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2146_boutique-scheduling-162](../results/1014_2130_inorder4-final13/raw/1014_2146_boutique-scheduling-162/)（ndjson / mcp.jsonl / meta）
- **摘要**：paymentservice is the only unreachable unit: its Service endpoints list is '<none>' while all 10 sibling Services have endpoints, and a TCP probe to its Service-declared port (paymentservice:50051) returns 'Connection Failed'. Its single pod paymentservice-84c59c8dff-rbvz9 is stuck Pending 0/1 with Node '<none>' (Deployment paymentservice 0/1 AVAILABLE) - the only outlier in the namespace. The pod's own sheet carries the mechanism event: 'Warning FailedScheduling ... 0/4 nodes are available: 1 node(s) had untolerated taint {environment: production}, 1 node(s) were unschedulable, 2 node(s) didn

### case-163

- **结论**：`app/recommendationservice` + `taint_toleration_mismatch` ｜ 标签 `app/recommendationservice` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.1154 · steps 27 · tokens 164,047
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2147_boutique-scheduling-163](../results/1014_2130_inorder4-final13/raw/1014_2147_boutique-scheduling-163/)（ndjson / mcp.jsonl / meta）
- **摘要**：Only recommendationservice is broken: its pod recommendationservice-698cd8974f-6m4k9 is 0/1 Pending with Node <none>, its Service endpoints are <none>, a TCP probe to recommendationservice:8080 fails, and the frontend caller log shows 83x 'dial tcp 10.68.109.192:8080: connect: connection refused' / 'failed to get product recommendations' (port 8080 is the port recommendationservice's Service declares), while all other 10 boutique pods are 1/1 Running. The pod's own sheet shows Node-Selectors: workload=compute-intensive, no compute tolerations, and the scheduler event 'FailedScheduling ... 0/4 

### case-164

- **结论**：`app/redis-cart` + `taint_toleration_mismatch` ｜ 标签 `app/redis-cart` + `taint_toleration_mismatch`（✓ 逐字命中）
- **流程**：MC 1 · EOC 1 · ECR 1 · EE 0.2632 · steps 20 · tokens 143,676
- **raw 日志**：[results/1014_2130_inorder4-final13/raw/1014_2148_boutique-scheduling-164](../results/1014_2130_inorder4-final13/raw/1014_2148_boutique-scheduling-164/)（ndjson / mcp.jsonl / meta）
- **摘要**：Symptom 'Partial Service Unreachability' is bound to the cart path: CheckServiceConnectivity(redis-cart:6379) returned 'Connection Failed' and the entry caller cartservice logged 288/776 errors (37%) with 'UnableToConnect on redis-cart:6379 ... RedisConnectionException / Can't access cart storage', while all other services stay 1/1 Running. The pruned workload scan shows the single outlier: pod redis-cart-64ffd47f7f-h796g is Pending 0/1 with Node <none> (never bound), and deployment redis-cart is 0/1 UP-TO-DATE with AVAILABLE=0. The mechanism event is carried by the pod's own sheet: 'FailedSch

