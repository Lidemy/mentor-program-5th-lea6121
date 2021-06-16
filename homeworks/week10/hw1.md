## 六到十週心得與解題心得

六到八週是滿開心的三週 ٩(ˊᗜˋ )و。切版雖然常切到起肖，但也多虧 CSS 偶爾出人意料地活蹦亂跳（跑版 :)) 寫的過程中查找各種解決方式，從做中學學到了不少。也有發現切版的速度慢慢在進步中，之前可能 web + RWD 版切兩天還會看到大跑版（不曉得 width 不能寫死外，box model 的概念也還很零零落落於是切版切到淒淒慘慘戚戚），但現在可能半天之內就能完成（當然也需要視版的難度而定 owo~）。感到現在自己有比過去的自己多邁進一步就會覺得滿開心 ヽ༼ಢ_ಢ༽ﾉ
另外新學到怎麼用 DOM 動態的把 class 加上或移除，也有比較熟悉 appendChild, removeChild 的用法，把 e.preventDefault() 應用在表單驗證上，和淋漓盡致地在 todo list 上使用 e.target.classList.contains() 和 e.target.parentNode.remove() 等。新知識應用成功有種「真的有把新知識學起來」的感覺。串 API 也是有趣的一環，雖然看 API 文件還是很有障礙，不過搞懂後串一串看資料 render 成功真的成就感滿滿。這階段跟 JavaScript 變得更熟了點，地圖某些區塊的迷霧有因為探索和解任務散去了一些，雖然還有大片的區域待開展，不過我想就是繼續秉持著且戰且走、兵來將擋水來土掩的信念走下去吧。
第九週是進入後端新世界的一週，老實說還滿不習慣的，建 table 還行不過 PHP 跟 HTML 寫一起真的常仰天吶喊「哪尼～～～好亂 RRRR」，是個仍在努力適應和熟悉的領域。痛苦時就會用會感到痛苦是因為在成長來安慰自己 🥲，希望在未來的未來回顧這週，想法能變成其實就一塊小蛋糕啦來看待 (´▽`)ﾉ

第十週挑戰有複習 + 統整了前幾週所學（落落長的解題紀錄留在下方），也大大地領會到 devTool 裡的各種秘密 :) 玩遊戲時還不時讚嘆寫出遊戲真的好厲害啊呀希望自己未來也有能力寫出自己的小遊戲 www 回首六到十週，除了後端是個新挑戰外，疫情關係長時間不能外出，只能窩在家中學習也是個巨大的衝擊。習慣工作學習在特定的空間完成，在家裡自由度太高注意力容易分散外也比較難進入忘我的狀態，還各種拖延症爆發和會莫名陷入自我懷疑的小圈圈 :)) 希望幾週下來能慢慢地找到平衡點 🥲

##### [綜合能力測驗解題紀錄](http://mentor-program.co/huli/game/index.php)

1. 打開 devTool 查看程式碼，在網址輸入 http://mentor-program.co/huli/game/index.php?mode=start
2. 看到提示 1，接著輸入 http://mentor-program.co/huli/game/index.php?mode=start&norestriction=false
3. 看到提示 2，把 hidden 和 input 都 display: block，按下按鈕後，會顯示「少了些什麼 ⋯⋯」。
4. 查看 JavaScript 程式碼，到 console 輸入 `myMissingNumberToSetToMakeTheRequest = 1` 再按下按鈕。這時候 console 會出現 {hint: "54ceb91256e8190e474aa752a6e0650a2df5ba37", error: "數字錯誤"}
5. 直接把那串 hint 丟到 google owo~發現代表 56。於是在 console 輸入 myMissingNumberToSetToMakeTheRequest = 56 再按下按鈕，
   就會得到 {s: "恭喜破關！flag: m3nT0rPr0GRAm666", error: false} 。破關～

##### [r3:0 異世界網站挑戰](https://r30challenge.herokuapp.com/lv0.php)

0. [Lv0](https://r30challenge.herokuapp.com/lv0.php)
   _獲得提示方式：?hint=help，例如：https://r30challenge.herokuapp.com/lv1.php?hint=help）_

1. [Lv1](https://r30challenge.herokuapp.com/lv1.php?token=r30:start)

透過 [進位轉換的計算機](http://www.kwuntung.net/hkunit/base/base.php) 轉換。
100101001001100001110 從二進位轉成十八進位結果為：`bad18`
&rarr; `token=bad18`

2. [Lv2](https://r30challenge.herokuapp.com/lv2.php?token=bad18)

依「(井中的水面一片黑黝，跟瀏覽器一樣）」和「前往 lv3: 請找出藏在畫面裡面的怪物並用 token 傳給女神」兩段，打開了 devTool owo 找到 HTML 裡的 {divsurprise}
&rarr;`token=divsurprise`

3. [Lv3](https://r30challenge.herokuapp.com/lv3.php?token=divsurprise)

再度打開 devTool，找到 HTML 裡的 {commentfaker}
&rarr;`token=commentfaker`

4. [Lv4](https://r30challenge.herokuapp.com/lv4.php?token=commentfaker)

直接選取頁面上的 {tRaNspar3nT} 複製後貼到網址，發現網址出現的是 csspersona!。
覺得不大可能是肉眼可見的 tRaNspar3nT，肯定有詐 www，於是用 csspersona! 送出
&rarr; `token=csspersona!`

5. [Lv5](https://r30challenge.herokuapp.com/lv5.php?token=csspersona!)

送出去後，看到 gameover 的訊息驚呆，但仔細瞧瞧，發現 url 已經不是當初的 url 了，變成 https://r30challenge.herokuapp.com/lv6.php?token=fail
於是用原本 url 重送接著火速按下 esc。Gotcha! 抓到 {windowhack}
&rarr; `token=windowhack`

6. [Lv6](https://r30challenge.herokuapp.com/lv6.php?token=windowhack)

到 console 輸入 window，找到 window 下的 \_\_IamToken: "emojicute"
&rarr;`token=emojicute`

7. [Lv7](https://r30challenge.herokuapp.com/lv7.php?token=emojicute)

根據「找到包包深處的餅乾」，在 response headers 的 Set_Cookie: TokenIsMe=%7Bcookieyumyum%7D 找到 token。
不過 token 並非 `%7Bcookieyumyum%7D` owo，後來透過 [HTML URL Encoding Reference](https://www.w3schools.com/tags/ref_urlencode.ASP)，發現 `%7B` 和 `%7D` 是 {}。
因此 `token=cookieyumyum`

8. [Lv8](https://r30challenge.herokuapp.com/lv8.php?token=cookieyumyum)

在 Response headers 找到 {headshot}
&rarr; `token=headshot`

9. [Lv9](https://r30challenge.herokuapp.com/lv9.php?token=headshot)

看到一串 PHP 程式碼隱身其中，翻成白話文應為：
當 strlen($token) !== 8 會 return，表示八個字。另外查詢 ord，是將字串符轉換為 ASCII 碼的函式。

```
第二個字 * 第一個字除以 1 的餘數要等於 0
第四個字 * 第三個字除以 3 餘數等於 0
第六個字 * 第五個字除以 5 餘數等於 0
第八個字 * 第七個字除以 7 餘數等於 0
```

查[ASCII 表](http://kevin.hwai.edu.tw/~kevin/material/JAVA/Sample2016/ASCII.htm)，選一種符合條件的 aaccnnpp
&rarr; `token=aaccnnpp`

10. [Lv10](https://r30challenge.herokuapp.com/lv10.php?token=aaccnnpp)

打開 devTool 看到報錯是跨域問題，用 node.js 發送 request 到 `https://glacial-everglades-11859.herokuapp.com/api.php`看看

```
const request = require('request')

request(
    'https://glacial-everglades-11859.herokuapp.com/api.php',
    function (error, response, body){
        console.log(body)
    }
)
```

得到 `{"token":["sosdan"]}`

11. [Lv11](https://r30challenge.herokuapp.com/lv11.php?token=sosdan)

在八卦版打開 devTool 找了很久，最後在 js 那看到 id=888888 相關的程式碼。
試著用 postman 發到 http://r30challenge.herokuapp.com/news_api.php?id=888888。
得到結果：`能看到這則留言的你，想必就是天選之人吧！ {fakeituntilyoumakeit} 拯救這個世界吧！`
&rarr; `token=fakeituntilyoumakeit`

12. [Lv12](https://r30challenge.herokuapp.com/lv12.php?token=fakeituntilyoumakeit)

在 response headers Set-Cookie 找到 `token=do_you_really_know_how_to_set_cookie?; Comment=real_token_is:{you_are_cookie_master}`

&rarr; `token=you_are_cookie_master`

13. [Lv13](https://r30challenge.herokuapp.com/lv13.php?token=you_are_cookie_master)

到 Lv14 的通道看起來是反應時間越長越接近答案，猜了幾個數字不過還沒猜到 ٩(ˊᗜˋ )و 先記錄到這 www
