## 請列出 React 內建的所有 hook，並大概講解功能是什麼

- useState
  用來設定 component 的 state，當 state 值改變，就會觸發 re-render

  `變數型態 [state 變數名稱, setState 函式名稱] = useState(state 變數初始值) `

  ```js
  const [todos, setTodos] = useState({})
  ```

- useEffect
  告訴 React component 在 render 後要做的事情。

  `useEffect(didUpdate, deps)`

  有兩個參數，第一個參數是 Effect function，第二個則是 depandancy array。 根據不同 depandancy 決定何時要執行 Effect function。useEffect 內的 function 會在 component render 完後被呼叫

- useContext
  可以讓 component 共享資料，不用一層一層傳 props

- useReducer
  useState 的替代方案，當 state 邏輯較為複雜或 state 間有相依關係時，用 useReducer 會比 useState 更適合

  ```js
  const [count, dispatch] = useReducer(reducer, initialState, initialAction)
  ```

  - reducer: 列出有哪些動作指令，根據不同的動作回傳操作過後的 state
  - initialState: 定義初始值
  - initialAction: 為 useReducer 初次執行的 action

- useMemo
  當 component 的結構變得複雜時，頻繁的 re-render 會導致效能上的問題。useMemo 可以減少重複的複雜計算。當 deps 改變時才把某個運算的值保存下來。
  會在 render 期間執行，若要處理 side effect 就需使用 useEffect 而非使用 useMemo

- useCallback
  當 deps 改變時把某個 function 保存下來。和 useMemo 類似，`useCallback(fn, deps)` 相等於 `useMemo(() => fn, deps)`。
  如果沒有提供 array 則每次 render 時都會計算新的值。

- useRef
  可讓我們取到指定的 DOM
- useImperativeHandle
  可讓你自定義回傳的 value，可以在父層調用子層的 ref。
  useImperativeHandle 應與 forwardRef 一同使用。

- useLayoutEffect
  使用方式與 useEffect 雷同，差別在觸發的時間點是在所有 DOM 改變之後才會同步調用
- useDebugValue
  可以在 React DevTools 上顯示自訂的 hook 標籤

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

每一個 component 有一系列的 Lifecycle Methods (生命週期方法)，讓開發者可以在不同的元件事件 (也就是所謂的元件生命週期) 發生時，在對的時間做對的事。class component 自配備生命週期，而 functional component 需要透過 react hook 擁有生命週期。

Lifecycle 可分為三大週期：

- Mounting 創建

- Updating 更新

- Unmounting 銷毀

Mounting 階段
當一個 component 的 instance 被建立且加入 DOM 中時，其生命週期將會依照下列的順序呼叫這些方法

1. `constructor()`：用來初始化 state 的地方，將初始值指定給 this.state。Class component 的 constructor 會在 component 還沒被加入 DOM 前先被執行初始化。
2. `static getDerivedStateFromProps()`：是個 static method，會在每一次跑 render() 前被呼叫。執行時會傳入當前的 props 和 state，執行後需要返回一個物件 (object) 來表示欲更新的 state，不更新則返回 null
3. `componentWillMount()` ：會在 mounting 發生前被呼叫。由於其在 render() 前被呼叫，因此在這個方法內同步呼叫 setState() 並不會觸發額外的 render，但已不被官方推薦使用
4. `render()`：是 React Class Component 唯一一定要實作的方法，會根據當前 this.props 及 this.state 的資料狀態，來決定該元件當前的 UI 結構和顯示內容。在每次 props 或是 state 被改變時，都會被執行一次。
5. `componentDidMount()`：component 被加入 DOM tree （元件已經實際存在在畫面中）

Updating 階段
當 prop 或 state 有變化時，就會產生更新。當一個 component 被重新 render 時，其生命週期將會依照下列的順序呼叫這些方法

1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate(nextProps, nextState)`：會在新的 prop 或 state 被接收之後並在該 component 被 render 之前被呼叫。當回傳 false 時，該元件就不會繼續更新
3. `render()`
4. `getSnapshotBeforeUpdate()`: component 更新前執行
5. `componentDidUpdate()`: component 更新完畢

Unmounting 階段
當一個 component 被從 DOM 中移除時，以下方法會被呼叫。
`componentWillUnmount()`：可以在 componentWillUnmount() 中做資源清理的動作，清除跟該 component 有關的任何遺留物。

例外處理 - Error Handling 方法

1. `static getDerivedStateFromError()`
2. `componentDidCatch()`

React lifecycle 架構參考圖：
![React component lifecycle](https://1.bp.blogspot.com/-eL2sbdeL9Qc/XdPR4RscrjI/AAAAAAAAVfc/zVXHv6vrPsswu5sZhGCYeOUAEZVGapSxgCLcBGAsYHQ/s1600/React-Components-Lifecycle.png)
(上圖有部分方法已將被不被官方建議使用)
![Component lifecycle](https://i1.wp.com/programmingwithmosh.com/wp-content/uploads/2018/10/Screen-Shot-2018-10-31-at-1.44.28-PM.png?ssl=1)

## 請問 class component 與 function component 的差別是什麼？

- 寫法、component 的 extend 及 `render()`

  functional component：寫法較接近原生 JavaScript。無需繼承，不需要寫 render()，編譯速度相較 class component 較快，編譯後的程式碼較少

  ```js
  import React from 'react'

  const FunctionalComponent = () => {
    return <h1>Hello World</h1>
  }
  ```

  Class component：需繼承 React.Component，需實作 render() 方法，編譯較慢，編譯後的程式碼較多

  ```js
  import React from 'react'

  class ClassComponent extends React.Component {
    render() {
      return <h1>Hello World</h1>
    }
  }
  ```

- Access state 的方式

  過去 React hooks 未出現時，僅有 class component 能設定 state，因此以往的 functional component 皆屬 stateless component，但在 hooks 的 useState 出現後，現在 functional component 也可以有 state。

  functional component：用 useState 來設定 state

  ```jsx
  import React, { useState } from 'react'

  ​function FunctionalComponent() {
    const [count, setCount] = useState(0);​
    return (<div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    )
  }
  ```

  Class component：使用 this.state 設定 state

  ```js
  class ClassComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0 }
    }​
    render() {
      return (<div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click me</button></div>)
    }
  }
  ```

- props 的傳遞、讀取方式，以及 this 的使用

  functional component：將 props 用 function 傳參數的方式傳入，因為 function 閉包的特性，props 的值會是固定的

  ```js
  function FunctionalComponent(props) {
    return <h1>Hello, {props.name}</h1>
  }
  ```

  Class component：有 this，props 的傳遞方式是透過 `this.props`。因為 this 的值會隨著函式呼叫的方式而不同，因此實作上常需搭配著 .bind() 來綁定 this 的值

  ```js
  class ClassComponent extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>
    }
  }
  ```

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中，表單元素的處理主要可以分為 uncontrolled 與 controlled component：

- Controlled component：由 React 管理 HTML form element 的 state，資料會受到 React 控制。範例：

```js
class ControlledForm extends Component {
  state = {
    username: ''
  }
  updateUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  handleSubmit = () => {}
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.username}
          onChange={this.updateUsername}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

- Uncontrolled component：由 HTML form element 自行管理 state，資料不會受 React 控制，範例：

```js
class UnControlledForm extends Component {
  handleSubmit = () => {
    console.log('Input Value: ', this.input.value)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref={(input) => (this.input = input)} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}
```

Uncontrolled component 的使用時機：

- 如果 form 不涉及 state 的存取或操作（如驗證）可考慮使用 uncontrolled component，可讓程式碼更簡潔
- 由於 uncontrolled component 是由 form element 進行管理，可以直接透過 DOM 來直接取得 form 的 value。因此，在整合 React 和非 React 的程式碼時，uncontrolled component 會更方便
- `<input type="file">` 的值只能由使用者而不能由程式碼來設定，因此 `<input type="file" />` 只能是 uncontrolled component

Uncontrolled component 的使用方式：
Uncontrolled Components 的方式是選到該 `<input />` 元素後，再將值從該 DOM 元素取出。 React 中想要選取到某一元素可以使用 useRef 這個 React Hooks。範例：

```js
import React, { useRef } from 'react'

export default function App() {
  const inputRef = useRef(null)
  const handleSubmitButton = () => {
    alert(inputRef.current.value)
  }
  return (
    <div className="App">
      <input type="text" ref={inputRef} />
      <input type="submit" value="submit" onClick={handleSubmitButton} />
    </div>
  )
}
```

useRef 內可以放進一個預設值（initialValue），會回傳一個物件，這邊將回傳物件取名為 inputRef
想藉由 useRef 來選取到某一元素的話，在該 HTML 元素上使用 ref 屬性，把 useRef 回傳的物件放進，例如 `ref={inputRef}`
`inputRef.current` 可取得剛剛透過 ref 指稱的元素，`inputRef.current.value` 可取得該欄位的值。若想要定義預設值，可以在 `<input>` 欄位中使用 defaultValue

**_參考資料_**

- Hooks Api
  [Hooks API 參考 - React](https://zh-hant.reactjs.org/docs/hooks-reference.html)

  [【React.js 入門 - 13】 useState - 在 function component 用 state - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10220063)

  [[Day 17 - 即時天氣] 頁面載入時就去請求資料 - useEffect 的基本使用 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10224270)

  [Introduction to React Hooks](https://chathuranga94.medium.com/introduction-to-react-hooks-4694fe2d0fc0)

  [[Day 23] React hook(下)-useMemo&useRef - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10242590)

  [認識 React Hooks 之三 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10253073)

  [When to use useImperativeHandle, useLayoutEffect, and useDebugValue](https://stackoverflow.com/questions/57005663/when-to-use-useimperativehandle-uselayouteffect-and-usedebugvalue)

- Lifecycle
  [React.Component](https://zh-hant.reactjs.org/docs/react-component.html)

  [State 和生命週期](https://zh-hant.reactjs.org/docs/state-and-lifecycle.html)

  [React.Component - React](https://zh-hant.reactjs.org/docs/react-component.html#componentwillunmount)

  [React 元件生命週期 Component Lifecycle - React 教學 Tutorial](https://www.fooish.com/reactjs/component-lifecycle.html)

- class component vs. functional component

  [Understanding Functional Components vs. Class Components in React](https://www.twilio.com/blog/react-choose-functional-components)

  [【前端新手日記】React.js 學習筆記 - Function Component & Class Component @ 文科少女寫程式 :: 痞客邦 ::](https://pinkymini.pixnet.net/blog/post/41503396-%E3%80%90%E7%AB%AF%E6%96%B0%E6%89%8B%E6%97%A5%E8%A8%98%E3%80%91react.js%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98---function-compone)

  [React Class-based vs Functional Component 從特性淺談兩種寫法之異同](https://linyencheng.github.io/2020/02/02/react-component-class-based-vs-functional/)

  [【Day 8】Class component && Functional component - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10214751)

  [[Day 07] Functional Component v.s Class Component - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10234746)

- Uncontrolled and controlled components
  [Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

  [Uncontrolled Components](https://reactjs.org/docs/uncontrolled-components.html)

  [React Hook Form Handling Basics: Uncontrolled and Controlled Components](https://able.bio/drenther/react-hook-form-handling-basics-uncontrolled-and-controlled-components--78e30mz)

  [6.Controlled Component 与 Uncontrolled Component 之间的区别是什么？](https://www.jianshu.com/p/ee91107861f2)

  [Uncontrolled Component - React](https://zh-hant.reactjs.org/docs/uncontrolled-components.html)
