## hw1：好多星星

這題在解題上沒有什麼問題。最大的問題應該是如何把程式碼改成 Lidemy OJ 要的 input output 形式並在上面拿到 Accepted。看老師在影片上的操作，把自己的原程式碼修改了幾次後終於成功拿到 AC，但還是沒有很習慣使用 Lidemy OJ。

## hw2：水仙花數

水仙花數是個人在上週進度中覺得最不好想到的一題，這次作業當複習有順利完成，覺得滿開心。那時的卡點就是不知如何取到位數和數字。多虧了這題，現在對取數字有比較信手拈來。

## hw3：判斷質數

解題時邏輯出了差錯，一開始自己把 return true 放在 if else 裡，所以印出了不合預期的結果。後來跟著程式碼再順一次邏輯後就發現應該是要 for 迴圈全部跑完檢查完都不符合後再 return true，而不是檢查完一個數字後沒有 return false 就 return true。

```
function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

```

## hw4：判斷迴文

這題也是寫完跑過幾個結果都正確，但送到 Lidemy OJ 上被拒絕了 xd。最後發現是 function solve(lines) 裡的 console.log(true) 和 console.log(false) 那邊寫錯了 :) 正確的應該是下面那樣。雖然找到 bug 很讚但有時候真的對自己的 bug 感到頗無奈:)

```
function solve(lines) {
  let str = lines[0];
  if (str === reverse(str)) {
    console.log('True');
  } else {
    console.log('False');
  }
}
```

## hw5：聯誼順序比大小

這題在根據題目設定跑邏輯的過程滿有趣的，也在解題爬資料的過程中認識了 BigInt()。不過在完成作業前有陷入自己某個奇怪的思考迴圈，卡一段時間後找朋友順下邏輯終於海闊天空。
