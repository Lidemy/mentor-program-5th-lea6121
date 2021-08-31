## Redux middleware 是什麼？

![](https://res.cloudinary.com/practicaldev/image/fetch/s--m5BdPzhS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://i.imgur.com/riadAin.gif)

如上圖所示，Redux Middleware 讓 action 被指派後進到 reducer 前先去進行額外處理，處理完後才傳進 reducer（例如 call API)。

以 Redux Thunk Middleware 為例，

Redux Thunk 原始碼：

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, extraArgument)
      }

      return next(action)
    }
}

const thunk = createThunkMiddleware()
thunk.withExtraArgument = createThunkMiddleware

export default thunk
```

簡短的幾行程式碼可判斷送進去的 action 是一個 plain JS object 還是 function，如果 action 不是一般的 object 而是 function 時，就會將 dispatch, getState, arguments 傳進執行，回傳得到一般的 object 再交給 reducer

因此，原先 action creator 只能回傳 plain object 的 action。有了 Thunk 這個 middleware 後，action creator 可以回傳一個 function，因此開發者可以撰寫一個回傳 function 的 action creator。

**_參考資料_**
[100 行秒懂 React、Redux、Middleware](https://medium.com/@shizukuichi/100-%E8%A1%8C%E7%A7%92%E6%87%82-react-redux-middleware-52ac75d169fe)
[【Day 27】Redux middleware - redux-thunk - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10223346)
[Day 28: Redux 篇: 使用 middleware(中介軟體)處理異步動作 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10187802)
[【Day.29】React 進階 - 以 Redux Thunk 處理非同步資料流 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10253094)
[[Day 20] 用 Redux Thunk 來處理非同步 action - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10240464)
[[Redux] Redux Thunk 小筆記](https://note.pcwu.net/2017/03/20/redux-thunk-intro/)
[Redux Middleware 大略架構](https://medium.com/@WendellLiu/redux-middleware%E5%A4%A7%E7%95%A5%E6%9E%B6%E6%A7%8B-ace7e646c929#.l7syseaiu)

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

![](https://itclub.com.au/uploads/SSR_vs_CSR.jpg)

- CSR (client-side Render)
  在瀏覽器進行 render，當 server 收到 request 時只會回傳有基本 tag 的 HTML 檔，HTML 透過 JS 才渲染成完整的頁面。簡單來說，server 傳來的資料只有 data 或是 template，不會是渲染完畢、有完整內容的頁面，而渲染頁面的工作是交由瀏覽器完成，因此瀏覽器的 loading 會較重。

- SSR (server-side rendering): 網頁內容是在 server 產生，瀏覽器接收到 server 的回傳的 response 時就是收到完整的、已渲染的網頁。當 client 端發出對某個頁面的 request 或是導到不同的 route 時，server 都會重新抓取對應的資料，重新建立、渲染完整的 HTML 後再回傳給 client，因此 server 的 loading 會較重。

為什麼我們需要 SSR？

瀏覽器在爬網頁的時候，爬蟲會將網頁的 HTML 內容爬過後產生內容，如果網頁是 CSR，HTML 檔案從 server 回傳時基本上只有骨架，需要在 browser 等到 JS 被解析且執行後才能看到實際頁面。相較之下，若是實作 SSR 的話，server 回傳給 browser 是一個有實質內容的頁面，當爬蟲爬到該頁面時，爬到的都是從 server 建立好並帶上資訊的完整 HTML，可以抓取到 index 頁面中的關鍵資料，因此在 SEO 方面，SSR 相較於 CSR 是比較有利的。

**_參考資料_**
[SSR vs CSR](https://dev.to/alain2020/ssr-vs-csr-2617)
[Client-side Render 和 SSR 的差別](https://noob.tw/client-server-side-render/)
[About the advantages and disadvantages of SSR (server rendering)](https://www.programmersought.com/article/57305210889/)
[CSR 與 SSR 概述比較](https://hackmd.io/@spyua/HJDJUaTSO)

## React 提供了哪些原生的方法讓你實作 SSR？

![簡易概念圖](https://miro.medium.com/max/836/1*XDttXDpMgTiu8k6xAMknlg.png)
React 提供了 `ReactDOMServer.renderToString()` 和 `ReactDOMServer.renderToStaticMarkup()`方法，可將 component(Virtual DOM) render 成 HTML 字串，因此 server 在回傳 HTML 給瀏覽器時，瀏覽器接收的 HTML 就會有實質的內容。另外，React 也有提供 `ReactDOMServer.hydrate()`，一般來說，component 多帶有和使用者互動的事件，像是 button 上帶有 onBlur, onClick, 或 onFocus 等，單純只有透過 `ReactDOMServer.renderToString()` 回傳的 HTML 會是靜態的內容，但 browser 透過 `ReactDOMServer.hydrate()` 後，這樣的 HTML 就會轉化為可互動的網頁。

**實作可參考文章**
[React SSR | 從零開始實作 SSR — 基礎篇](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/server-side-rendering-ssr-in-reactjs-part1-d2a11890abfc)
[React | 用實作了解 Server-Side Rendering 的運作原理](https://medium.com/starbugs/react-%E7%94%A8%E5%AF%A6%E4%BD%9C%E4%BA%86%E8%A7%A3-server-side-rendering-%E7%9A%84%E9%81%8B%E4%BD%9C%E5%8E%9F%E7%90%86-c6133d9fb30d)

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

- 工具
  為網站進行預渲染，可以將網站頁面渲染之後再回傳給 browser，瀏覽器收到的 HTML 會是預渲染完成的 HTML 檔，會帶有完整內容。適合較小型的專案。

  - [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)
  - [prerender.io](https://prerender.io/)
  - [Prerender Node](https://github.com/prerender/prerender-node)
  - [Rendertron](https://github.com/GoogleChrome/rendertron)

- 框架
  - [Next.js](https://nextjs.org/docs): React 提供的 SSR 框架
  - [Nuxt.js](https://nuxtjs.org/): Vue 提供的 SSR 框架
