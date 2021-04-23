```js
function isValid(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= 0) return "invalid";
  }
  for (var i = 2; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + arr[i - 2]) return "invalid";
  }
  return "valid";
}

isValid([3, 5, 8, 13, 22, 35]);
```

## 執行流程

1. isValid 函式被呼叫後，[3, 5, 8, 13, 22, 35] 陣列被傳進函式裡
2. 到函式裡第一行程式碼。執行第一個 for 迴圈，規則為：
   `變數 i 設定起始值為 0； 執行條件：i 小於陣列最大長度 (此陣列長度為 6)； 每執行完一次迴圈 i 就加 1`
3. 陣列進到 for 迴圈一，此時 i = 0。若 arr[0] 的值小於等於 0 就回傳 `invalid`。數字 3 沒有小於等於 0，不 return
4. 接著 i = 1 ，若 arr[1] 的值小於等於 0 就回傳 `invalid`。數字 5 沒有小於等於 0，不 return
5. 接著 i = 2，若 arr[2] 的值小於等於 0 就回傳 `invalid`。數字 8 未小於等於 0，不 return
6. i = 3 ，若 arr[3] 的值小於等於 0 就回傳 `invalid`。數字 13 未小於等於 0，不 return
7. i = 4，若 arr[4] 的值小於等於 0 就回傳 `invalid`。數字 22 未小於等於 0，不 return
8. i = 5，若 arr[5] 的值小於等於 0 就回傳 `invalid`。數字 35 未小於等於 0，不 return。for 迴圈一結束
9. 執行第二個 for 迴圈，規則為：
   `變數 i 設定起始值為 2； 執行條件：i 小於陣列最大長度 (此陣列長度為 6)； 每執行完一次迴圈 i 就加 1`
10. i = 2，如果 arr[2] 的值不等於 arr[1] + arr[0] 就回傳 `invalid`。 8 = 5 + 3 ，不 return
11. i = 3，如果 arr[3] 的值不等於 arr[2] + arr[1] 就回傳 `invalid`。 13 = 8 + 5 ，不 return
12. i = 4，如果 arr[4] 的值不等於 arr[3] + arr[2] 就回傳 `invalid`。22 不等於 13 + 8 ，符合 if 條件式，return "invalid"。函式結束
