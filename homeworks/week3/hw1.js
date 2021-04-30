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
  printStars(n)
}

function printStars(n) {
  let result = ''
  for (let i = 1; i <= n; i++) {
    result += '*'
    console.log(result)
  }
}

rl.on('close', () => {
  solve(lines)
})
