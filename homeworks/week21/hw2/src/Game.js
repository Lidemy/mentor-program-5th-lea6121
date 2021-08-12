import './App.css'
import { React, useState } from 'react'
import { calculateWinner } from './index'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Board() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)))
  const [whiteIsNext, setWhiteIsNext] = useState(true)
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  const handleClick = (y, x) => {
    const newBoard = JSON.parse(JSON.stringify(board))
    const positionX = x
    const positionY = y

    if (
      calculateWinner(
        position.y,
        position.x,
        newBoard,
        newBoard[position.y][position.x]
      ) ||
      newBoard[y][x] !== null // 如果該位置已有子就不能再下
    ) {
      return
    }

    newBoard[y][x] = whiteIsNext ? '⚫' : '⚪'
    setPosition({
      x: positionX,
      y: positionY
    })
    setBoard(newBoard)
    setWhiteIsNext(!whiteIsNext)
  }

  function renderSquare(j, i) {
    return <Square value={board[j][i]} onClick={() => handleClick(j, i)} />
  }

  const winner = calculateWinner(
    position.y,
    position.x,
    board,
    board[position.y][position.x]
  )

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = 'Next player: ' + (whiteIsNext ? '⚫' : '⚪')
  }

  return (
    <div>
      {board.map((y, columnIndex) => {
        return (
          <div className="board-row" key={columnIndex}>
            {board.map((x, rowIndex) => renderSquare(columnIndex, rowIndex))}
          </div>
        )
      })}
      <div className="status">
        <div>{status}</div>
        <button
          type="button"
          class="btn btn-dark"
          value="reload"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
    </div>
  )
}

function Game() {
  return (
    <div className="gameBoard">
      <h1>Gomoku</h1>
      <Board />
    </div>
  )
}

export default Game
