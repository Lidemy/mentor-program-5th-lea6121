## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

關於資料的原始型態和 object 型態的差異，因為在之前課程有出現過所以沒有太陌生，這節主要複習了原本的概念以及補強了某些隨著時間又混淆的地方。
進到 scope 一節，關於 var, let, const 之前常耳聞 var 坑比較多 xd 但詳細原因沒有特別探究，只知道 var 的 scope 是 function，let const 的 scope 是 block，但對背後還能延伸到什麼樣的問題很模糊，而 hoisting 也曾聽聞但沒有研究過規則和原理。經過老師 scope 和 hoisting 淺顯易懂的說明，以及帶大家以 ECMAScript 的規範去跑過程式碼的流程後，有更明白 var 和 let, const 的異同，以及 scope, hoisting 在 JavaScript 的運作方式和一些過去不曾發現的眉眉角角。
Event loop 是收穫很多的部分，解答了之前對 setTimeout 設定 0 秒卻根本沒立刻輸出結果的困惑，以及為何有時網頁在 call api 時有明顯 loading 的時間。加上寫作業時用文字順過流程，釐清了一些原本看完影片以為有懂但其實還似懂非懂的地方。作業二在寫 Event loop 和 var 的 hoisting 時，有出現過 call stack 清空時 setTimeout 的 cb 才從 queue 排入 call stack，那 console.log(i) 是怎麼取到 i = 5 的值的疑問，看到這篇[討論](https://github.com/Lidemy/mentor-program-3rd-ClayGao/pull/24) 覺得疑惑有被解答，雖然有些內容仍在咀嚼，但受益良多。

而 this, closure, 物件導向在跑完課程和閱讀了些參考資料後算是對他們有了最基本的認識，被稱作大魔王的 this 雖然還是滿抽象的，但用 .call() 的方式去找是個好用的方式。這週的課程有提升了對 JavaScript 底層運作方式的理解，對解題幫助很多，但對各個主題的了解都還只是冰山一角，還有很多更深層的內容需要探究，應用或實作上也是仍要思考和反覆練習的部分。
