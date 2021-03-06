## 請解釋後端與前端的差異。

前端的範疇，簡單來說就是使用者可以直接看到，並且進行互動的介面，像我們打開瀏覽器可以看到的任何網頁就屬前端，主要運用 **HTML, CSS, JavaScript** 這三種工具來建立網頁。
後端就是當使用者在前台送出 request 後，接收要求並提供相對應的資料，再回傳 response 給前端。如果用餐廳來比喻前端和後端，前端就是餐廳外場，外場負責提供客戶用餐體驗，像是提供顧客菜單、幫顧客點餐，把廚房（後端）準備好的餐點交到顧客手上。
而後端就是廚房，在收到顧客的菜單（請求）後，會著手處理顧客的訂單。例如，有位顧客說：「我要一個珍珠鮮奶茶無糖去冰」，外場將需求送給內場後，內場便會開始準備餐點。準備好後前端會接收到後端，也就是廚房提供的餐點，最後再由前端交到顧客（使用者）手上。

## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

- 按下 enter 後，我的瀏覽器 Chrome 先去問 Domain Name System (DNS) google.com 的 IP 位址。
- DNS 會把域名轉換成 IP 位址，像 GPS 把地址轉換成經緯度之類的。接著 DNS 會把取得的 google.com 的 IP 位址告訴瀏覽器，也就是 Chrome
- Chrome 收到 IP 位址後，依照 IP 位址發送請求(request)到伺服器端(server)，情節如下：

```md
客戶端：Hey yo! Server 你在嗎？
伺服器端：在阿，蝦米歹誌？沒事別來找～
客戶端：耶～我來把使用者的 request 傳給你!
```

###### 假設 server 找不到請求資源的情況，就會顯示 404 status code。Status code 是伺服器端回應(HTTP Response)的狀態，有很多不同的狀態碼。

- 伺服器端收到請求後，~~請資料庫去找 Javascript 的相關資料~~ 會到資料庫去找 Javascript 的相關資料
- ~~資料庫取得 JavaScript 的相關資料結果後，把資料回傳給伺服器端~~ 找到 JavaScript 的相關資料結果後，伺服器端會回傳 response 給客戶端，我們的瀏覽器會接收到 response
- 瀏覽器收到 response 後，會解析 response 的結果。接著將結果渲染到網頁上，於是我們就看到搜尋結果了

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1. code 檔案名稱：會創一個檔案，並用預設的程式碼編輯器打開。例如 `code index.html` 會直接在資料夾位置創一個 index.html 的檔案。自己是預設 VSCode 作為程式編輯器，因此， VSCode 會自動打開檔案，檔案開啟後就可以開始 coding ～
2. file 檔案名稱：顯示該文件類型
3. history: 列出最近在終端機上執行過的指令
