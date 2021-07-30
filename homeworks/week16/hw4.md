```js
const obj = {
  value: 1,
  hello: function () {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function () {
      console.log(this.value)
    }
  }
}

const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()
obj2.hello()
hello()
```

**_前情提要_**

- this 指的是在 function 執行時，這個 scope 的 owner
- this 與 function 在何處被宣告無關，而是取決於 function 被呼叫的方式 -> this 的值跟怎麼被呼叫有關
- 全域、非嚴格模式下，this 在 Node 為 global，瀏覽器為 window；全域、嚴格模式下，this 為 undefined
- this 在物件導向中，指到的對象就是那個 instance 本身
- 可利用 `.call()` 來找 this，規則是呼叫 function 前有什麼就把它放到 () 裡，() 第一個參數的內容就會是 this 的值。舉例來說，

```js
const obj = {
  a: 123,
  inner: {
    test: function () {
      console.log(this)
    }
  }
}
obj.test()
test()
```

`obj.test()` 可轉換為 obj.test.call(obj)，this 會是 obj

`test()` 可轉換為 test.call()，this 會是 undefined（嚴格模式下）

因此本題的
`obj.inner.hello()` 可轉換為 `obj.inner.hello.call(obj.inner)`。this 為 obj.inner，因此 this.value 為 2
`obj2.hello()` 可轉換為 `obj.inner.hello.call(obj,inner)`。this 為 obj.inner，因此 this.value 為 2
`hello` 可轉換為 `hello.call()`，所以這邊的 this 在嚴格模式下為 undefined

輸出結果：
2
2
undefined
