function reverse(str) {
  var newStr = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newStr += str.charAt(i);
  }
  console.log(newStr);
}

reverse("hello");
