## 什麼是 Ajax？

AJAX 全名為 Asynchronous JavaScript and XML。

- Asynchronous：非同步，客戶端 (client) 送出 request 給伺服器端 (server) 後，可先去處理其他事情，待 Response 回傳後，再將結果進行後續處置（如把新內容加入當下頁面等），在等待 response 的期間不需等收到回應才能進行後續任務。
- JavaScript：使用的程式語言
- XML：Client 與 Server 交換資料用的資料與方法，現在已不限於 XML 格式，還有 JSON、純文字格式等

在 AJAX 技術問世前，客戶端每發出一次請求，都會接收到一個完整的 HTML 網頁，而伺服器回傳資料、到瀏覽器 render 網頁的過程中會產生一段空白期間，如果傳遞的資料量龐大，或使用者網路不穩定，空白期間就會更長，進而影響到使用者體驗。然而有些請求或回應不需重新載入一個全新的網頁，只需要更新局部內容，透過 AJAX 技術，client 可以向 server 發出非同步請求，只對部分內容的資料進行抽換且能即時將內容添加到原本的網頁，而無需重新渲染頁面，除了大幅降低每次請求與回應的資料量，也提升了瀏覽速度和使用者體驗。而伺服器的回應速度，在伺服器和瀏覽器需要交換的資料量減少下，能有顯著地提升，亦可減輕伺服器的負擔。

##### AJAX 運行流程：

網頁中的某事件被觸發 &rarr; 藉 JavaScript 創建一個 XMLHttpRequest 物件 &rarr; XMLHttpRequest 傳送請求給網站伺服器端 &rarr; 網站伺服器端接受到請求後即會開始處理請求 &rarr; 處理完成後，網站伺服器端會回傳資料給網頁端 &rarr; 回傳資料由 JavaScript 去讀取 &rarr; JavaScript 讀取資料後在瀏覽器進行適當的處理或動作

## 用 Ajax 與我們用表單送出資料的差別在哪？

送出表單時會向 server 發出請求，server 接收並處理傳來的表單後會回傳一個新的網頁，會重整頁面。

AJAX 僅會要求部分資料，在收到回傳資料後不會重新刷新頁面，而是局部替換原先網頁中的內容。

## JSONP 是什麼？

瀏覽器身為使用者代理人的角色立訂的「同源政策」，讓 AJAX 在面對跨網域的情形下無計可施，這時，JSONP 這個為跨網域要求和回傳資料而存在的技術如騎士般閃亮登場。JSONP 主要是透過 JSONP 動態 (根據 XMLHttpRequest) 產生 JSON 資料，可用 `<script type="text/javascript">` 進行跨域請求而不受「同源策略」的規範。利用 DOM 中的 Script 元素載入 JavaScript，進而透過 Callback 回傳資料。但這個方式是使用 HTTP GET Method 獲取 JS，因此若是要傳送資料到 Server 只能透過 URL 進行封裝，

## 要如何存取跨網域的 API？

跨網域存取的方式有 Form Submit、JSONP、Cross-Origin Resource Sharing (CORS) 等。以 CORS (Cross-Origin Resource Sharing) 為例，它是針對不同源的請求而定的規範，透過 JavaScript 存取非同源資源時，server 必須明確告知瀏覽器允許何種請求，只有 server 允許的請求能夠被瀏覽器實際發送，否則會失敗。跨來源請求有分兩種：「簡單」的請求和非「簡單」的請求。

簡單請求必須符合下面兩個條件，不符合以上下任一條件的請求就是非簡單請求。：

1. 只能是 HTTP GET, POST or HEAD 方法
2. 自訂的 request header 只能是 `Accept`、`Accept-Language`、`Content-Language` 或 `Content-Type`（值只能是 application/x-www-form-urlencoded、multipart/form-data 或 text/plain）。

非「簡單」的跨來源請求，例如：HTTP PUT、DELETE 方法，或是 `Content-Type: application/json` 等，瀏覽器在發送請求之前會先發送一個 「preflight request（預檢請求）」，它的作用在於先問伺服器「是否允許這樣的請求？真的允許的話，我才會把請求完整地送過去」。
Server 在收到 preflight request 時，必須告訴瀏覽器自己允許的方法和 header 有哪些。因此 Server 的回應須帶有以下兩個 header:

1. `Access-Control-Allow-Methods`: 允許的 HTTP 方法。
2. `Access-Control-Allow-Headers`: 允許的非「簡單」header。

當瀏覽器看到跨來源請求的方法和 header 都有被列在允許的方法和 header 中，就表示可以實際發送請求。最後 server 回應 `Access-Control-Allow-Origin` header。檢查無誤後，跨來源請求才算正式成功，這時候我們才能在 JavaScript 中讀取回應的內容。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週時我們並非透過瀏覽器來發送 request 或接收 response，而是使用本地端的 node.js 來進行。但本週我們係透過瀏覽器來運行。瀏覽器協助我們與 web server 進行溝通，包括渲染 UI、設定 Cookie、執行 TCP 三次握手、通訊加密等，在操作過程中，瀏覽器有義務保護使用者的資料，因此，同源政策（Same Origin Policy）即是瀏覽器作為使用者代理人為「安全性考量」所設定的規範。

同源政策舉例如下：

以下二者同源：
https://store.mysite.com/index
https://store.mysite.com/cart

以下二者不同源，因為通訊協定不同（HTTPS 與 HTTP）：
https://store.mysite.com
http://store.mysite.com

以下二者不同源，因為網域不同：
https://store.mysite.com
https://blog.mysite.com

以下二者不同源，因為埠號不同（80 與 8080）：
https://store.mysite.com:80
https://store.mysite.com:8080

簡單來說，相同網域就是同源，協定不同、埠號不同、主機不同就是非同源。在同源政策的規定下，瀏覽器的使用者會受到此規範的保護和約束，因此會碰到跨網域的問題。
