```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

**_前情提要：_**

- JavaScript 是單線程（single threaded runtime）的程式語言，所有的程式碼片段都會在堆疊中（stack）被執行，而且一次只會執行一個程式碼片段（one thing at a time）
- Call Stack：JavaScript 中的執行堆疊（call stack）會記錄目前執行到程式的哪個部分。開始執行程式時會從全域的主程式 `main()` 開始，接著逐一把各個函式推進執行堆疊的最上方，並由最上層（也就是最後進入的）開始執行（後進先出）。當該函式結束後，會將此函式抽離堆疊（pop off）。
- 當 WebAPIs 的條件被滿足時，會將等待執行任務推進至工作佇列（task queue 或是 callback queue）等候執行。setTimeout 即是一個瀏覽器提供的 API（非 JavaScript 本身的功能）。當計時器的時間到時，會把要執行的 cb 放到 task queue。
- Task Queue：接收由 WebAPIs 傳來等候被執行的任務，以先進先出（FIFO）的方式，透過 Event Loop 事件循環機制，當執行堆疊（call stack）裡清空時，才傳入佇列（queue）內容的第一個項目放進 call stack。簡單而言，Event Loop 的角色是分配執行堆疊與工作佇列的任務，當執行堆疊是空的，就將工作佇列內等待執行的任務依序推進去。
- 綜上，setTimeout 這個 timer 只能保證程式碼幾秒後即將會執行，但並非保證會被即刻執行。setTimeout(cb, 0) 是表示「等到」所有堆疊的任務都被清空後再立即執行，並非 0 秒後這個 cb 會立即被執行。

程式碼執行步驟：

1. stack 添加 main()
2. 程式碼執行到 console.log(1)
3. stack 添加 console.log(1)。在 console 出現 1，console.log(1) 從 stack 中抽離
4. 程式碼執行到 `setTimeout(() => {console.log(2)}, 0)`
5. stack 添加 setTimeout function，setTimeout 會呼叫瀏覽器，設定一個 0 ms 後到期的定時器。接著，setTimeout 這個 function 執行結束，並從堆疊中脫離。0 秒後，這個 cb `() => {console.log(2)}` 會被放到 task queue（目前第一位）
6. 程式碼執行到 console.log(3)
7. stack 添加 console.log(3)，在 console 出現 3，console.log(3) 從 stack 中抽離
8. 執行到 `setTimeout(() => {console.log(4)}, 0)`
9. stack 添加 setTimeout function，setTimeout 呼叫瀏覽器設定一個 0 ms 後到期的定時器。接著，setTimeout 這個 function 執行結束，並從堆疊中脫離。0 秒後，這個 cb `() => {console.log(4)}` 會被放到 task queue（目前排第二位）
10. 程式碼執行到 console.log(5)
11. stack 添加 console.log(5)，在 console 出現 5，console.log(5) 從 stack 中抽離。
12. main() 從 stack 抽離
13. call stack 的內容清空後，task queue 的第一個項目會放到 call stack。Stack 添加 `() => {console.log(2)}`，console 出現 2，接著從 stack 抽離
14. call stack 清空後，task queue 的項目會放到 call stack。Stack 添加 `() => {console.log(4)}`，console 出現 4，接著從 stack 抽離。

輸出結果：
1
3
5
2
4
