## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

`TEXT` 的「固定最大大小」為 2¹⁶-1 個字符。`VARCHAR` 有「可變的最大大小」 M，M 最高可達 2¹⁶-1。因此，TEXT 不予指定長度，雖指定長度不會報錯，但是長度的指定沒有作用，當資料輸入超過指定長度時仍可以被輸入。而 `VARCHAR` 須在括號裡設定長度（可有默認值）。
另外， 在 TEXT 的 column 上不能設置 index（fulltext index 除外）。因此，如果要在 column 上建立 index，則須使用 VARCHAR。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是屬於一種小型的文字檔案，透過加密的方式儲存在用戶端上的資料，常見做法像是應用在購物車、會員登入、瀏覽紀錄、停留時間等，讓 Web service 可以透過辨別用戶身分來取得相關的資訊。

Server 在收到 HTTP 請求時，可以傳送一個 Set-Cookie 的 response header，當瀏覽器接收到 Cookie 後，會將其中的 key/value 保存到某路徑內的文本文件之中，讓使用者下次於造訪同一網站時能自動把對應的 cookie 放在 header 內，隨著 request 傳給同個 server。
![](https://i.imgur.com/re1OAcB.png)

Cookie 屬性除了 name 和 value 外，還有其他屬性可控制 cookie 的保存期限、作用網域及安全性：

- expires: 表示 Cookie 的保存期限，在默認的情況下為暫時性的 cookie，關閉瀏覽器就會消失
- path: 指定與 cookie 關連的網頁，默認情形為和當前網頁同一目錄的網頁中有效。
- domain: 設定 cookie 有效的網域名稱，可以和 path 一同設定，讓相同/類似的 domain 可以享有同樣的 cookie
- secure: 算是 cookie 的安全值，默認的情況 cookie 的傳輸上是不安全的，若設置為安全可讓 cookie 只在安全的 http 上進行傳輸

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

設定資料庫的我能看到使用者的密碼（感覺如果是身分證，信用卡等資料會有個資外洩疑慮），如果資料庫的帳號密碼洩漏了或是被駭，那資料庫中所有關於 user 的資料（尤其密碼）都會曝光。
