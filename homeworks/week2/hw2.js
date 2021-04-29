function capitalize(str) {
  if (str.charCodeAt(0) > 96 && str.charCodeAt(0) < 123) {
    var firstLetter = str.charAt(0);
    var changeLetter = firstLetter.toUpperCase();
    return changeLetter + str.slice(1);
  } else {
    return str;
  }
}

console.log(capitalize("hello"));
