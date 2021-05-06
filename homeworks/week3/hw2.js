const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function digitsCount(n) {
  let count = 0
  if (n === 0) {
    return 1
  }
  while (n !== 0) {
    n = Math.floor(n / 10)
    count++
  }
  return count
}

function isNarcissistic(n) {
  let m = n
  const digits = digitsCount(n)
  let sum = 0
  while (m !== 0) {
    const num = m % 10
    sum += num ** digits
    m = Math.floor(m / 10)
  }

  if (sum === n) {
    return true
  } else {
    return false
  }
}

function solve(input) {
  const temp = input[0].split(' ')
  const firstNum = Number(temp[0])
  const lastNum = Number(temp[1])
  for (let i = firstNum; i <= lastNum; i++) {
    if (isNarcissistic(i)) {
      console.log(i)
    }
  }
}

rl.on('close', () => {
  solve(lines)
})
