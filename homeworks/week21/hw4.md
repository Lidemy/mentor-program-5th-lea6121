## 為什麼我們需要 React？可以不用嗎？

過去在開發上，通常是直接使用瀏覽器提供的 DOM API 操作 DOM，無論是原生的 JavaScript，用程式碼像 `document.querySelector('.el')` 來抓取元素，或在 jQuery 問世後可改由較輕鬆的方式如 `$('el')` 抓取，皆是根據定義各個事件來操作和改變網頁中不同的區塊及元素。
隨著當代網際網路的普及和進步，網頁的功能、架構、規模持續擴充，前端和過去相較之＝下需處理更大量的資料、更複雜的事件管理及畫面渲染等工作，變得更難以掌握衍伸出的狀態變化，除了開發難度增加外，後續維護和 debug 也會變得更為困難，以往將資料和畫面兩者分開，再透過使用者操作事件將兩者連結的方式已不敷需求。
因此 React，由 facebook 開發的一個 JS 函式庫解決了許多這方面的問題，簡述幾個特色如下：

- JSX 語法： 是 JS / ECMAScript 對 XML 的擴充語法，有助於精簡程式碼，格式和 JS 相較下也較為直觀，易於閱讀。

- 自定義 Component：可將頁面重複性高或相似的 Element 透過 JSX 語法將這些 Element 建立成 Component，而透過組裝一個個小的 Component 可以進階打造出較大的元件，最終成為一個完整專案。每個 Component 可重複利用和進行擴充，假設開發者想要使用其他的功能，可以載入不同的模組或函式庫來客製化自己的專案，方便開發。

- 使用 Virtual DOM：以往用原生 JS 在前端即時改變 UI 需重繪整個畫面，n 個元件需要重繪 n 次整個畫面，在大量操作元件的情形下會有效能不好的問題。React 做了一個 Virtual DOM，當重繪時會先在 Virtual DOM 中重繪，再用 diff 演算法比對它跟實際 DOM 之間的差別，並只針對差異之處來對實體的 DOM 進行更新。

可以不用 React 嗎？
開發上不一定要用 React，如果專案規模較小、沒有涉及太多模組化、資料狀態的變動、或是太多互動性與即時性上的需求，使用 HTML、CSS、JavaScript + jQuery 進行開發會更為簡便，也能減少開發上的複雜度和縮短產品開發的時間，React 只是為 Web 開發提供另一種可能。

## React 的思考模式跟以前的思考模式有什麼不一樣？

以往的思考模式是直接操縱 DOM 來取資料或進行互動，畫面的更新是透過事件的監聽加函式的相互配合來進行，雖然滿直觀，但資料量較大時，狀態就會變得不易於追蹤和掌控。而 React 和該方式的不同之處在於，React 的核心是 Component 和 state 的概念，在於透過資料的狀態改變 UI，只要資料的狀態改變，畫面就跟著改變。以元件 Component 為單位，各個小的 Component 集合可以組合成一個大的 Component，而各個大的 Component 最後集合成一個完整的 App，像組樂高一樣。而 state 則是每個 Component 的狀態，可以將資料儲存在 state 裡面，當資料更新，state 更新，React 會僅針對差異之處進行重繪。

## state 跟 props 的差別在哪裡？

Component 是透過資料狀態，來決定是否更新 UI 畫面，而 Component 中有兩種資料來源 —— state 和 props，當 React 偵測到 props 或 state 有改變時，就會自動重新渲染。

- props
  props 是外部傳入的資料，是父元件與子元件間溝通的橋樑。相較於 state 是自己內部的狀態，props 可以當作是外部傳進來的狀態，不可改變，子元件需透過外部傳入新的 props 來重新渲染。

- state
  state 是元件的內部狀態，和 props 不同，state 可透過 this.setState() 來改變 state。當 state 變動時畫面會重新渲染。沒有 state 的元件稱為無狀態元件(stateless component)，設定 state 的元件稱為有狀態元件(stateful component)
