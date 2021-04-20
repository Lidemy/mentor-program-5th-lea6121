function capitalize(str) {
  //   console.log(str);
  //   console.log(str.slice(1));
  //   console.log(str.charAt(0));
  if (str.charCodeAt(0) > 96 && str.charCodeAt(0) < 123) {
    var firstLetter = str.charAt(0);
    // console.log(firstLetter);
    var changeLetter = firstLetter.toUpperCase();
    // console.log(changeLetter + str.slice(1));
    return changeLetter + str.slice(1);
  } else {
    // console.log(str);
    return str;
  }
}

console.log(capitalize("hello"));
