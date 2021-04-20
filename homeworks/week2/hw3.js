function reverse(str) {
  var n = str.length;
  n = n - 1;
  var newStr = "";
  for (var i = n; i >= 0; i--) {
    // console.log(str.charAt(i));
    newStr += str.charAt(i);
  }
  console.log(newStr);
}

reverse("hello");
