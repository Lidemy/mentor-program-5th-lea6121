function printFactor(n) {
  for (let i = 0; i <= n; i++) {
    if (n === 0) {
      console.log("任何整數都是 0 的因數");
    } else if (n % i === 0) {
      console.log(i);
    }
  }
}

printFactor(10);
