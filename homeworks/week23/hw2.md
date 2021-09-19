## 為什麼我們需要 Redux？

隨著應用程式功能的擴充和複雜化，頁面在許多狀態共存的情形下加上每個 state 的頻繁變化，狀態變得不好預測也難以掌握，增加了開發上的難度外，也讓專案在除錯和維護上變得困難。
Redux 是個管理資料的容器，設計的本質是一個嚴格的單向資料流(strict unidirectional data flow)，改變當下 state 唯一的方式是觸發 action，接著透過 reducer 來更新資料的 state。雖然 state 更新方式被限縮，但只能透過單一窗口來改變 state 的規則，讓開發者在開發上可以更清楚狀態更新的過程。因此在狀態改變上有任何問題，都可以更容易找到問題所在。
另外，Redux 也可以協助管理需要被元件所共用的狀態。現在前端常會遇到資料散落在不同的頁面或是元件的情況，當多個頁面或是元件想共享同一份資料時（例如購物車），Redux 集中式管理資料的的運作模式，可以確保所有元件取得的狀態保有一致性。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

Redux 三大元件：

- action
  傳遞愈操作的 state 的資訊。action 是個單純的物件，type 對應發生事件的類型，payload 是事件發生夾帶的資訊，例如：

  ```js
  { type: ADD_TODO,
    payload: {
      text
    }
  }
  ```

  至於 Action Creator 是一種輔助方法，建立一個 action，指定一個 type（類型）和 dispatcher。但 Redux 中的 Action Creator 不需要加上發送（dispatch）的工作，例如：

  ```js
  function addTodo(text) {
    return {
      type: ADD_TODO,
      payload: {
        text
      }
    }
  }
  ```

  當需要 dispatch 時，透過 `store.dispatch(addTodo(text))` 來進行

- reducer
  Reducer 是一個 Pure Function，Action 不會直接修改 State，而是來傳達需要操作的 State 的資訊，根據這個資訊來進行相對應的操作就是 Reducer。在接收到 action 後會進到這裡，根據 action type 的判斷進行處理，回傳新的 state。
  `新狀態 = reducer(原狀態, action)`
- store
  存放所有狀態的倉庫，遵照 Single Source of Truth 的原則，由單一的 Object Tree 組成。透過 `store.getState()` 來取得狀態

綜上，Redux 的資料流可簡化為 View → Action → （middleware） → Reducer → Store → View

1. 由 View 層面去接收使用者互動行為
2. 事件觸發後，呼叫 `store.dispatch(addTodo(text))`，發佈 action（帶著原狀態和事件類型） 到 Reducer
3. Reducer 根據 action type 進行相對應的處理後，回傳新的 state
4. View 收到資料變動更新畫面

![Redux 資料流](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCI5YbygedYjwhwJnuJxSbp734jXqsSgKFQsudKemDq685HuZSjpbtCV-oUzFQ-uUQiHA&usqp=CAU)

## 該怎麼把 React 跟 Redux 串起來？

- 環境建置

  ```
  $ npx create-react-app my-app // 先建立一個 React 專案
  $ npm install react-redux // 再安裝 react-redux
  $ npm install redux // 需要 Redux 的 store，要再裝上 redux
  ```

- 環境建置完成後，來處理 Redux 的前置作業：

  - 建立 reducers 資料夾，reducers 資料夾會放置各種不同的 reducer，可在該資料夾下建立 index.js：

    ```js
    // 當專案較大時會將 reducer 分成多種，透過 combineReducer 可將多個 reducer 合體
    import { combineReducers } from 'redux'

    // 引入 reducers 資料夾下 todos 這個 reducer，多個 reducer 就分別引入
    import todos from './todos'

    // 透過 combineReducers 把多個不同類型的 reducers export 出去
    export default combineReducers({ todoState: todos })
    ```

  - 建立 store.js，在 store.js 裡引入 createStore 方法，使用 createStore 函式建立 store，產生 Store 時需要提供 Reducer，因此會將 Reducer 引入

    ```js
    import { createStore } from 'redux'
    import rootReducer from './reducers'

    export default createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    ```

    每個專案都應只有一個 store 存在，若是有許多不同類型的資料，則是以 Reducer 區分，最後將多個 Reducer 打包成一個再創建 store

- Redux 前置作業告一段落後，接著就是將 React Redux 進行串接（以 connect api 為例）
  React 需透過幾個步驟將 Redux 所保管的資料流向 component。首先需定義要從 store 中取得的資料，並將 component 與該資料做連結，再利用 Provider 將 store 根據需求將資料流進 component 中

  ```js
  /* 創建一個 mapStateToProps(state, ownProps) 函式，此函式允許我們將 store 中的資料作為 props 與 components 連結
  state: 參數 state，在連接時 Redux 會將 store 傳進這個位置
  ownProps: 自己的 props
   */
  const mapStateToProps = (store) => {
    return {
      todos: store.todoState.todos
    }
  }
  ```

  - 連結 component 與 mapStateToProps

  ```js
  // import connect api，利用 connect api 將 component 和 store 的資料串接
  import { connect } from 'react-redux'
  const ConnectedAddTodo = connect(mapStateToProps)(AddTodo)
  ```

  - 設置 Provider
    Provider 是 react-redux 中的組件，會接收上方在 Redux 中創建的 store，並根據和 component 綁在一起的需求單 mapStateToProps 上要求的資料從 store 中取出，再透過 props 流向 component

    import { Provider } from 'react-redux'，用 Provider 元件將整個結構包起來，並為 Provider 元件設定 store 的屬性。完成串接。

    ```js
    import { Provider } from 'react-redux'
    import store from './redux/store'

    const rootElement = document.getElementById('root')
    ReactDOM.render(
      <Provider store={store}>
        <TodoApp />
      </Provider>,
      rootElement
    )
    ```

**參考資料**
[React + Redux: Higher-order reducers with combineReducers()](https://medium.com/geekculture/react-redux-higher-order-reducers-with-combinereducers-3ffd151b1060)

[Redux](https://chentsulin.github.io/redux/docs/introduction/index.html)

[React-redux | 為了瞭解原理，那就來實作一個 React-redux 吧！](https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/developing-react-redux-from-zero-to-one-e27eddfbce39)

[最容易理解的 react-redux 入門實戰講解\_提莫隊長 - MdEditor](https://www.gushiciku.cn/pl/pENO/zh-tw)

[为何要使用 Redux](https://www.jianshu.com/p/d6614feef303)

[React 資料流管理架構之 Redux](https://www.itread01.com/content/1549976789.html)
