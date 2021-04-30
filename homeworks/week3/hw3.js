const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(input) {
  const n = Number(input[0])
  for (let i = 1; i <= n; i++) {
    const num = Number(input[i])
    if (isPrime(num)) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

function isPrime(n) {
  if (n === 1) return false
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

rl.on('close', () => {
  solve(lines)
})
