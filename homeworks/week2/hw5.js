function join(arr, concatStr) {
  if (arr.length === 0) {
    return "";
  }

  let newStr = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    newStr += concatStr + arr[i];
  }
  return newStr;
}

function repeat(str, times) {
  let repeatStr = "";
  for (let i = 1; i <= times; i++) {
    repeatStr += str;
  }
  return repeatStr;
}

console.log(join(["a"], "!"));
console.log(repeat("a", 5));
