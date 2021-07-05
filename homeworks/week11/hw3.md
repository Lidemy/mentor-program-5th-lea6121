## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

雜湊和加密，雖然有讓密碼乍看下像亂碼的相同目的，但兩者的差異在於加密是可逆的，雜湊不可逆。若將明文密碼比喻為妝前素顏，加密就是妝後，卸妝後的臉仍會是原本的臉，如同加密可以透過解密得到原文，然雜湊無法逆向解出原始的輸入，可略解讀為整形。

雜湊的特性有：

1. 輸出的長度不受原文長度影響。意即無論原文的內容長或短，經過雜湊演算法運算完的輸出都會是固定長度。
2. 不同的內容作為相同雜湊演算法的輸入，得到相同輸出的機率極低。當兩個不同密碼對應到同一個 hash 為雜湊碰撞 (Hash Collision) ，因此有可透過額外儲存的 rainbow table 來找尋原始輸入的資安攻擊手法。

密碼經過雜湊後再儲存到資料庫裡，除了尊重使用者外（一般情況下應只有使用者知道自己的密碼），亦能避免資料庫外洩讓他人輕易取得使用者的明文密碼。

## `include`、`require`、`include_once`、`require_once` 的差別

require() 通常用來匯入靜態的內容，include() 通常適合用來匯入動態的程式碼。兩者差異為：

- `include`：引入文件時如碰到錯誤會給提示，繼續運行後續的程式碼。
- `require`：引入文件時如碰到錯誤會給提示，停止運行後續的程式碼。

而 `require_once` 和 `include_once` 和 `include`, `require` 的差異為引入檔案前，會先檢查檔案是否已在其他地方被引入過，若有就不會再重複引入。

## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL Injection：透過修改 SQL 語句進而達到存取資料庫資料的功能。
以填帳號密碼的欄位為例，下方程式碼係根據使用者的輸入去撈資料。

正確輸入：
帳號 test，密碼 1111

```
SELECT * FROM users WHERE user='test' AND password ='1111';
```

但如果碰到不正當的使用者輸入時，例如：

帳號 'or 1=1 --；密碼（不輸入）

```
SELECT * FROM `users` WHERE user='' or 1=1 --' AND password ='';
```

拼接後由於 user 的條件增加了 `or 1=1`，而 password 部分被註解掉，駭客可在無需密碼情況下也能登入帳號。

解決方法之一為運用 Prepare Statement：

```php
$sql = SELECT * FROM `users` WHERE `users`(id, username) VALUES(?, ?);

$stmt = $conn->prepare($sql);

// bind_param()，有幾個參數就帶幾個字元（字元為資料型態），例如 string 為 s，int 為 i
$stmt->bind_param('is', $id, $username);

$stmt->execute();

$result = $stmt->getResult();

if ($result->num_rows > 0) {
  //取得資料
  $row = $result->fetch_assoc();
}

```

## 請說明 XSS 的攻擊原理以及防範方法

XSS (Cross Site Scripting) 是攻擊者在網頁插入惡意的 script 程式碼（可以是 JS、CSS 或其他程式碼）。當使用者瀏覽頁面時，嵌入網頁中的 script 程式碼會被執行，進而達到攻擊使用者的目的。例如讀取使用者瀏覽器中的 cookie，session，tokens 或其他敏感資訊。

XSS 分成反射型 XSS，儲存型 XSS，DOM XSS。

- 反射型 XSS：通常係透過 URL 傳遞參數的功進行。攻擊者建構出特殊(包含惡意程式碼)的 URL。當使用者點擊開啟含有惡意程式碼的 URL 時，網站 server 將惡意程式碼從 URL 取出並回傳給瀏覽器。
  使用者瀏覽器接收到 response 後，混在其中的惡意程式碼也會被執行。
  惡意程式碼竊取使用者資料後，會將資料送到攻擊者的網站，甚至可冒充使用者行為，令目標網站執行攻擊者指定的（例如轉帳）操作等。

- 儲存型 XSS：
  惡意程式碼儲存在目標網站的資料庫中。因此當瀏覽器發送 request 時，惡意程式碼會從 server 回傳並執行。因此方式為攻擊者將惡意程式碼提交到目標網站的 database ，當使用者開啟該網站時，網站 server 將惡意程式碼從資料庫中取出並回傳給瀏覽器。使用者瀏覽器接收 response 執行，隱藏其中的惡意程式碼也會被執行。此時，惡意程式碼便從可從中盜取使用者資料，將資料發送到攻擊者的網站，或是冒充使用者的行為，像是利用目標網站的介面執行指定操作等。

- DOM-XSS：
  DOM-XSS 跟前兩者最大的不同在於 DOM-Based 的攻擊防護須在 client 端進行，而前兩者主要是在 server 端做防護與驗證。

  容易遭受到 DOM 攻擊的有：

  - document.url
  - document.cookie
  - window.location.search
  - history.replaceState

XSS 雖可從輸入和輸出兩腫層面來防範，但主要且根本的防護之道還是在輸出做 Encoding，例如像 PHP 內建函式的 `htmlentities()` 或 `htmlspecialchars()` 能把內容轉譯成純文字，將輸出進行轉譯後再顯示，是有效防範 XSS 的方法。

## 請說明 CSRF 的攻擊原理以及防範方法

CSRF 跨站請求偽造，全名為 Cross Site Request Forgery。由於現在網站大多使用 cookie 或 session 的方式來進行登入驗證，當 user 成功登入後，server 會在 response header 中夾帶 session id 並把它設置在瀏覽器的 cookie 中，使用者可不用反覆登入來維持登入狀態，只要 server 認得該 session id 就能夠維持登入狀態。
這時候，如果駭客能夠拿到存在瀏覽器的 session id ，就能在 header 中放入偷來的 cookie，從惡意網站發送 request 到目標網站，藉此偽造成是使用者本人發送的 request。簡單來說，CSRF 是以偽造成 user 的方式來達到攻擊的目的。雖然 CSRF 攻擊可能常搭配 XSS 來進行，但並一定要有 XSS 才能進行 CSRF 攻擊。

防範 CSRF 的方式：

- 使用 CSRF Token：
  CSRF token 是由 server 產生並儲存在 session 中，使用者登入成功後在 session 設定一組隨機產生的 token 並把這個 token 回傳給前端。當前端每次送 request 都需要帶上 token，由 server 來比對是否跟儲存在 session 中的 token 相同。
  但假設駭客知道網站把 token 藏在哪，透過 js 還是可以把 token 送到他的 server，因此如果網站有 XSS 風險，這個方法仍會失效。
- Double Submit Cookie：
  由 server 產生 CSRF token，但不儲存在 session 而儲存在 cookie，每次 request 都由後端比對 cookie 中儲存的 CSRF token 是否相同。此方式為利用駭客無法取得跨域 cookies 的特點來防範。
- 限制瀏覽器 cookie 跨域傳送：
  CSRF 攻擊係基於瀏覽器跨域傳送 cookie 的特性來達到攻擊的目的，因此此方法是讓瀏覽器不進行跨域傳送 cookie。在設置 Cookie 加上：
  `Set-Cookie: session_id=value; SameSite=Lax`

  Chrome 80 之後的 Cookie SameSite 屬性設定有三種(預設為 Lax)：

  1. Strict 最嚴格，只有 domain 完全一樣才能發送。假設使用者在 example.com 看到一條 FB 貼文連結（假設為 fb.com），就算使用者曾登入過 fb.com 並取得了 Cookie，然在 example.com 點擊連結後，因為兩個網站為 Cross-site 而不會帶上 Cookie。Strict 常見用在付款頁面操作等。
  2. Lax 較寬鬆，在後述的情況下，即使是 Cross-site 依然會送出 Cookie，例如在網址列輸入網址，點擊連結 <a>, 背景轉譯 <link rel="prerender">，送出表單 <form method="GET">（限於 get request）等都可以跨域帶上 cookie。
  3. None，需加上 Secure 屬性的設定：`SameSite=None; Secure`才能允許跨網域發送，且需要 HTTPS。
