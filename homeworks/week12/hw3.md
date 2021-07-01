## 請簡單解釋什麼是 Single Page Application

![](https://i.imgur.com/iHJEkG6.png)
SPA 是能讓使用者在單一頁面進行所有功能的操作、瀏覽，但毋需換頁，透過 JS 動態更換網頁上的內容，來達到使用者不需要換頁就可以瀏覽整個網站的網站架構。以上週的留言板為例，留言板即是相對於 SPA 的 Multi Page Application（MPA），一個功能或一個動作對應一個頁面。例如當點擊新增留言按鈕時，瀏覽器會先跳轉到 handle_add_comment.php 後再回到 index.php。此時的 index.php 是瀏覽器收到 server 回傳的 HTML 檔重新 render 後的畫面，而新留言也才因此出現在頁面上。
相較而言，SPA 不需使用者每完成一個動作就更新一次網頁，只需要在第一次打開網頁時傳送 HTML、CSS 或 Javascript，其餘資料利用 Ajax 來請求 XML 或 JSON 格式資料。網頁基本上不需跳轉就可以達到基本的建立、讀取、修改、刪除資料(（CRUD）功能，任何變更內容可以即時呈現而不需重新載入畫面，能有效提高使用者體驗，像 facebook 或 Gmail 都是典型的 SPA 網站。

## SPA 的優缺點為何

SPA 讓使用者不用每送出新的 request 就需等待 server 返回一個新的 HTML 檔並重新 render，優點有：

- 所有資源不需要重新載入，每次只需傳輸更新部分畫面的資料，所占資源較少，減少 server 的負擔。
- 較好的使用者體驗

但反觀也會有以下的缺點：

- 因所有資料都放在同個頁面，且 index.html 頁面中大多數資料係透過 JavaScript 動態產生，因此需克服 SEO（搜尋引擎最佳化）的問題。
- 所有資料都是放在同一頁面裡，沒有改變 URL，因此須由前端管理 URL 的狀態。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

之前由 PHP 直接輸出內容的留言板是由 server 直接回傳整份 HTML，收到 response 的網頁就是完整的一份網頁，為 server side render。如果打開 devTool 查看 index 檔案會是一份具有完整內容的檔案。
而對照前端用 Ajax 串接 API 的寫法，這時候後端只負責提供輸出資料的 API，只需專注於開出 API 來提供資料，由前端透過 Ajax 去和 server 取得資料。因此網頁內容是在 client side 動態產生，開啟 devTool 查看 index 檔幾乎不會有太多內容，因為資料幾乎是動態新增上去的。
