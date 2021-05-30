## 什麼是 DOM？

DOM 全名為 Document Object Model 文件物件模型，它讓 HTML 文件能以樹狀的解構來表示（如下圖），讓程式能存取、改變文件架構、風格、內容，藉由節點的綁定來進行特定事件。
![DOM tree](https://ithelp.ithome.com.tw/upload/images/20171214/20065504rULoAa69HV.png)
JavaScript 係透過 DOM 提供的 API 來對 HTML 做存取與操作，常見的取得節點方試如下：

1. `getElementsByTagName` 針對給定的 tag 名稱，回傳符合條件的 NodeList 物件
2. `getElementsByClassName` 針對給定的 class 名稱，回傳符合條件的 NodeList 物件
3. `getElementById` 針對給定的 id 名稱，找到 DOM 中 id 為 'xxx' 的元素
4. `querySelector` 針對給定的 Selector，回傳第一個符合條件的 NodeList
5. `querySeletorAll` 針對給定的 Selector，回傳所有符合條件的 NodeList

透過上述方式取得結點後，就能透過操作不同的方法（例如：.addEventListener, .textContent）來改變文件內容，或是觸發特定事件等。
不過雖然常看到以 JavaScript 來存取 DOM，但 DOM 本身並非 JavaScript 語言的一部分，且 DOM 實際上也可由其他語言進行存取。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

DOM 中的事件有傳播 (event flow) 的概念，事件傳遞機制總共分為三大階段：

- 捕獲階段 (Capture Phase)
- 目標階段 (Target Phase)
- 冒泡階段 (Bubbling Phase)

當 DOM 事件發生時，事件會依照樹狀圖的結構，先由外到內 (capturing phase）開始往下尋找目標 (target)，找到後，再由內到外 (bubbling phase) 的順序來傳播。

```html
<html>
  <head>
    <title>Example</title>
  </head>
  <body>
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  </body>
</html>
```

以 `.addEventListener` 為例：

```js
const element = document.getElementByTagName('li')[0]
element.addEventListener('click', (e) => {}, false)
```

- 第一個參數 event：監聽事件的類型，如：`click`, `submit`, `keypress` 等
- 第二個參數 function：當指定事件觸發執行函式
- 第三個參數 useCapture：用來指定事件處理函數要在 Capturing 階段或 Bubbling 階段被執行，false (預設值) 表示 Bubbling，true 表示 Capturing

因此當點擊`<li>`元素時， click 事件觸發的順序如下：

- Capturing 捕捉階段：document -> <html> -> <body> -> <div> -> <ul> -> <li>
- Bubbling 冒泡階段：<li> -> <ul> -> <div> -> <body> -> <html> -> document

## 什麼是 event delegation，為什麼我們需要它？

假設有數個 DOM element 都有相同的 event handler，那與其在每個元素一一加上 event handler，不如利用 bubbling 的特性，統一在他們的 ancestor 進行 event handler 處理，就是所謂的 event delegation 。

以一個 list 為例，在點擊個別項目時，想要顯示個別項目所代表的資料：

```html
<ul id="list">
  <li data-num="1"><em>1</em></li>
  <li data-num="2"><em>2</em></li>
  <li data-num="3"><em>3</em></li>
  <li data-num="4"><em>4</em></li>
</ul>
```

這時候，我們的確可為每個 li 加上點擊事件，但當 li 數量很多時（例如 100 筆）就會加到哭哭饅頭。因此，可轉而利用事件冒泡的概念，透過 event delegation 的方式，將 EventListener 直接綁定在上層的 ul，而在點擊 li 時，li 會向上冒泡傳遞到上層的 ul 來觸發 click 事件。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.stopPropagation()：阻止事件繼續冒泡。
event.preventDefault()：停止事件的默認動作。

```html
<div id="test">
  <a href="https://www.google.com/" id="btn">button</a>
</div>
```

- e.preventDefault：使用 preventDefault 時，`<a>`連結的默認動作被阻止，但`<div>`的 alert 仍會顯示。

```js
const element1 = document.getElementById('btn')
const element2 = document.getElementById('test')

element1.addEventListener('click', function (event) {
  event.preventDefault()
})
element2.addEventListener('click', function () {
  alert('parent click event fired!')
})
```

- e.stopPropagation：使用 stopPropagation 時，會觸發`<a>`連結的處理程序，但由於冒泡事件被阻止，因此`<div>`的 alert 不會跳出。

```js
const element1 = document.getElementById('btn')
const element2 = document.getElementById('test')

element1.addEventListener('click', function (event) {
  event.stopPropagation()
})
element2.addEventListener('click', function () {
  alert('parent click event fired!')
})
```
