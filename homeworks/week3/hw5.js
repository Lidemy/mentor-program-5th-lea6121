const readline = require('readline')

const lines = []
const rl = readline.createInterface({
  input: process.stdin
})

rl.on('line', (line) => {
  lines.push(line)
})

function solve(input) {
  const temp = Number(input[0])
  for (let i = 1; i <= temp; i++) {
    const [a, b, k] = input[i].split(' ')
    if (Number(k) === 1) {
      if (BigInt(a) > BigInt(b)) {
        console.log('A')
      } else if (BigInt(a) === BigInt(b)) {
        console.log('DRAW')
      } else {
        console.log('B')
      }
    } else {
      if (BigInt(a) > BigInt(b)) {
        console.log('B')
      } else if (BigInt(a) === BigInt(b)) {
        console.log('DRAW')
      } else {
        console.log('A')
      }
    }
  }
}

rl.on('close', () => {
  solve(lines)
})
