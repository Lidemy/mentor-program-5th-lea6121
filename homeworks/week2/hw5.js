function join(arr, concatStr) {
  let str = arr.toString();
  // console.log(str);
  let newStr = str.replace(/,/g, concatStr);
  // console.log(newStr);
  return newStr;
}

function repeat(str, times) {
  let repeatStr = "";
  for (let i = 1; i <= times; i++) {
    // console.log(str);
    repeatStr += str;
  }
  // console.log(repeatStr);
  return repeatStr;
}

console.log(join(["a"], "!"));
console.log(repeat("a", 5));
