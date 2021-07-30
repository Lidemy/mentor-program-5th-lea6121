```js
for (var i = 0; i < 5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

程式碼執行步驟：

1. stack 添加 `main()`
2. stack 添加 for 迴圈
3. i = 0，符合 i < 5 條件，console.log(i: 0)。
4. 在 console 出現 `i: 0`，`console.log(i: 0)` 從 stack 中抽離。
5. 程式碼執行到 `setTimeout(() => {console.log(i)}, i*1000)`
6. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 0 ms 後到期的定時器。
7. setTimeout 這個 function 執行結束，從堆疊中脫離。`0*1000` 毫秒後，這個 cb `() => {console.log(i)}` 會被放到 task queue（目前第一位）
8. 執行完第一個迴圈， i + 1，i = 1，符合 i < 5 條件，console.log(i: 1)。
9. 在 console 出現 `i: 1`，`console.log(i: 1)` 從 stack 中抽離。
10. 程式碼執行到 `setTimeout(() => {console.log(i)}, i*1000)`
11. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 1000 ms 後到期的定時器
12. setTimeout 這個 function 執行結束，從堆疊中脫離。`1*1000` 毫秒後，這個 cb `() => {console.log(i)}` 會被放到 task queue（目前第二位）
13. 執行完第二個迴圈，i+1，i = 2，符合 i < 5 條件，console.log(i: 2)。
14. 在 console 出現 `i: 2`，`console.log(i: 2)` 從 stack 中抽離。
15. 程式碼執行到 `setTimeout(() => {console.log(i)}, i*1000)`
16. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 2000 ms 後到期的定時器
17. setTimeout 這個 function 執行結束，從堆疊中脫離。`2*1000` 毫秒後，這個 cb `() => {console.log(i)}` 會被放到 task queue（目前第三位）
18. 執行完第三個迴圈，i+1，i = 3，符合 i < 5 條件，console.log(i: 3)。
19. 在 console 出現 `i: 3`，`console.log(i: 3)` 從 stack 中抽離。
20. 程式碼執行到 `setTimeout(() => {console.log(i)}, i*1000)`
21. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 3000 ms 後到期的定時器
22. setTimeout 這個 function 執行結束，從堆疊中脫離。`3*1000` 毫秒後，這個 cb `() => {console.log(i)}` 會被放到 task queue（目前第四位）
23. 執行完第四個迴圈，i+1，i = 4，符合 i < 5 條件，console.log(i: 4)。
24. 在 console 出現 `i: 4`，`console.log(i: 4)` 從 stack 中抽離。
25. 程式碼執行到 `setTimeout(() => {console.log(i)}, i*1000)`
26. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 4000 ms 後到期的定時器
27. setTimeout 這個 function 執行結束，從堆疊中脫離。`4*1000` 毫秒後，這個 cb `() => {console.log(i)}` 會被放到 task queue（目前第五位）
28. 執行完第五個迴圈，i+1，i = 5，不符合 i < 5 條件，for 迴圈從 call stack 抽離。
29. main() 從 stack 抽離
30. call stack 的內容清空後，排序在 task queue 的第一個項目會放到 call stack。此時 for 迴圈跑完，i 值會被記錄為 5。Stack 添加 `() => {console.log(i)}`，console 出現 5，接著從 stack 抽離。

關於 var 的 hoisting

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i*1000))
}

等同於

var i
for(i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i*1000))
}
跑完迴圈後 i 會被記錄為 5

```

30. call stack 清空後，排序在 task queue 的第一個項目會放到 call stack。for 迴圈跑完時 i 值為 5。Stack 添加 `() => {console.log(i)}`，console 出現 5，接著從 stack 抽離
31. call stack 清空後，排序在 task queue 的第一個項目會放到 call stack。for 迴圈跑完時 i 值為 5。Stack 添加 `() => {console.log(i)}`，console 出現 5，接著從 stack 抽離
32. call stack 清空後，排序在 task queue 的第一個項目會放到 call stack。for 迴圈跑完時 i 值為 5。Stack 添加 `() => {console.log(i)}`，console 出現 5，接著從 stack 抽離
33. call stack 清空後，排序在 task queue 的第一個項目會放到 call stack。for 迴圈時跑完 i 值為 5。Stack 添加 `() => {console.log(i)}`，console 出現 5，接著從 stack 抽離

輸出結果：

"i: 0"
"i: 1"
"i: 2"
"i: 3"
"i: 4"
5
5
5
5
5
