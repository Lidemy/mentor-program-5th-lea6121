## 前四週心得與解題心得

#### [Lidemy HTTP Challenge](https://lidemy-http-challenge.herokuapp.com/start) 小記：

1. 第零關和第一關，跟著說明走，拿到 [API 文件 v1](https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a)
2. 第二關，在網址後面加上 `&id=`，自己從 54 開始試。
3. 第三關，用 post [新稱書籍 url](https://lidemy-http-challenge.herokuapp.com/api/books)，依照 API 文件放入對應的參數 name 和 ISBN。成功後收到回傳結果 `{"message":"新增成功","id":"1989"}`，把獲得的 id 用`&id=`加到網址後面。
4. 第四關，按照文件寫的查詢書籍方式拿到 [搜尋結果](https://lidemy-http-challenge.herokuapp.com/api/books?q=%E4%B8%96%E7%95%8C)。找到村上春樹的書籍後把 id 放到 `&id=`並加入網址後方。
5. 第五關，用 delete [刪除書籍 url ](https://lidemy-http-challenge.herokuapp.com/api/books/23)，成功後回傳的結果`{"message":"\n咦...是刪掉了沒錯，但總覺得哪裡怪怪的，算了，先這樣吧！下一關的 token 為 {CHICKENCUTLET}\n"}`
6. 第六關，拿到新的 [API 文件 v2](https://gist.github.com/aszx87410/1e5e5105c1c35197f55c485a88b0328a)。
   首先先把帳密 `admin:admin123` 拿去做 base64 編碼，接著按照文件說明放入 header

```
{
  url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/me',
  headers: {
    'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='
	}
}
```

成功會獲得 `{"username":"admin","email":"lib@lidemy.com"}`，再把 email 用 `&email=` 加到網址後面。

7. 第七關，用 delete 刪除書籍，得到 `{"message":"\n希望下一次進這本書的時候不會再被偷走了。下一關的 token 為 {HsifnAerok}\n"}`

8. 第八關，先用 get 找出有「我」字的書名，找到符合題目條件的書籍後，用 patch 更改書籍的 ISBN。

```
{
	url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/72)',
	headers: {
    'Authorization': 'Basic YWRtaW46YWRtaW4xMjM='
  },
	form: {
		ISBN: '9981835423'
	}
}
```

成功後會獲得 `{"message":"\n希望之後他們能引進語音輸入系統，我就只要講講話就好。下一關的 token 為 {NeuN}\n"}`。

9. 第九關，需要獲取系統資訊，但另有兩個條件。第一個是 `帶上一個 X-Library-Number 的 header，我們圖書館的編號是 20` 這部分沒什麼問題。第二個是 `伺服器會用 user agent 檢查是否是從 IE6 送出的 Request，不是的話會擋掉` 。關於這項條件，一開始有認真想說要不要下載 IE6 瀏覽器 :)。後來找資料才發現原來可以在 header 加入 `User-Agent` 來假裝自己是 IE6！

```
{
	url: 'https://lidemy-http-challenge.herokuapp.com/api/v2/books/72)',
	headers: {
		'Authorization': 'Basic YWRtaW46YWRtaW4xMjM=',
		'X-Library-Number': '20',
		'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)'
  },
	form: {
		ISBN: '9981835423'
	}
}
```

獲得結果：`{"message":"success","version":"1A4938Jl7","owner":"lib","createdAt":"121290329301"}`後，把 version 內容用 `&version=` 加到網址後面。

10. 第十關是猜數字！把 `&num=` 放到網址後面開始猜數字，答對後就破關了 🙃

遊戲一關關地破下來，真的有把第四週內容再次複習過的感覺，還學到一種 HTTP 的驗證方式和瀏覽器可以被偽造等新知識，深深感嘆程式碼真的是太強大了！另外在 {5566NO1} 發現 token 原來有隱含的彩蛋後，解主要任務之餘也在推敲各個 token 的含意是什麼 🤣 可以深刻感受到老師在遊戲編排上的用心。

#### 前四週心得

Lidemy 開學四週走來，無論在學習內容或自我心態上，感想還滿多的（雖然在學習系統上的心得長得很簡短 xd)。系統上心得偏少的主因是還不習慣在多人走過路過的平台陳述相對私人的想法，這裡雖然也開放 🥲 但平常應該比較沒人會路過(?

剛學 JavaScript 時，有陣子幾乎處於空白的狀態。所謂的空白，是指在遇到問題時，思路要怎麼跑、邏輯怎麼建構、問題如何拆解，或問題可以怎麼拆解都是沒有概念的。連找人求救都難以敘述問題，因為連「問問題」本身都是一個大哉問。好不容易問出問題後，可能對方這時問說「那你怎麼想的？」，然後，就沒有然後了。沒有答案是因為連產生基本的想法都毫無頭緒，像不懂文法琢磨了老半天句子仍說不出口。偶爾回顧之前的程式碼還是不禁納悶，應該是另個我把這個我打昏後寫的，或失去意識時小精靈的創作吧，總之完全不像是自己寫的東西。

計畫開始後，上 JS 的課有任督二脈被打通的感覺，也學到很多新知識，過往四散的拼圖漸漸有了宏觀的畫面。但除了具體知識外，不具體的技能也是收穫良多的部分。像老師在解題目時，會帶大家從分析題目、拆解題目開始，還有提醒大家 debug 時需要抱持的心態，當不確定邏輯對不對或看到報錯時，把 console.log 加爆，或用 debugger 等。透過前述這些寫程式的過程，自己漸漸理解了所謂寫程式的循序漸進是什麼模樣。

因此在計畫的第二週，發現自己和先前相較起來，比較有拆解問題和產生初步邏輯的 sense 了。

另外，心態調整上也有改善不少，可以說是滿多的，無論是老師建立 mindset 的文章，或是隨意聊的內容都超級有幫助。Lidemy 開課前的三月是接觸程式的第一個月，學習之餘，那時最常盤據在腦海的思緒反而不是程式碼該怎麼寫，而是陷入無窮迴圈的「是不是不適合學程式阿 QwQ！」。除此之外，當時每日需完成的作業，加上有程式經驗的同學們宛如開氮氣般的神速進度（已經看不到他們的車尾燈）。生心理受到壓力和情緒的摧殘下，寫程式的 HP 消耗得越來越快，但回血的速度卻是越來越慢 🥲。

現這四個星期以來，有比較能掌握自己學習的節奏，以及和忽高忽低的心理狀態共處，而老師說的選擇性逃避也是很好的學程式哲學 🙃 簡而言之，學到的知識太多了就不一一贅述，老師提到的很多概念都令人大開眼界，不知道在課程中「原來如此！」了幾回。特別提及程式思維建立和心態調整，主要是該部分對我而言，是自己學程式之路要處理的重大課題，也是仍須努力的地方。但至少目前看到問題少了點發呆，看到報錯少了點發癡，陷入困境時（無論是學習或心理的卡關）減少落入情緒大爆炸現場的機率。
