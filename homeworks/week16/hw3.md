```js
var a = 1
function fn() {
  console.log(a) // undefined，`var a` 會 hoisting（賦值不會）
  var a = 5
  console.log(a) // 5
  a++
  var a // a 已經被宣告過，這行不予理會（如果該 Execution Context 中已有相同的變數宣告，再次宣告變數不會改變其中的變數值；若沒有該變數，則會宣告並自動賦值 `undefined`)
  fn2()
  console.log(a) // 6
  function fn2() {
    console.log(a) // fn2 找無 a，往上層 fn 找，有找到，a = 6
    a = 20
    b = 100 // 發現沒有宣告過 b，幫你宣告為 global var 並賦值 100
  }
}
fn()
console.log(a) // 1
a = 10
console.log(a) // 10
console.log(b) // 100
```

```
3.
fn2EC
	AO: {
		a: 6 -> 20
    b: 100
  }

2.
fnEC
	AO: {
		a: undefined -> 5 -> 6,
		fn2: function
	}

1.
globalEC
  VO: {
    a: undefined -> 1 -> 10
    b: 100
    fn: function,
  }

```
