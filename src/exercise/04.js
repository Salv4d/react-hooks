// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

function Board({selectSquare, currentSquares}) {
  React.useEffect(() => {
    localStorage.setItem('squares', JSON.stringify(currentSquares))
  }, [currentSquares])

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {currentSquares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [currentSquares, setCurrentSquares] = React.useState(
    () => JSON.parse(localStorage.getItem('squares')) ?? Array(9).fill(null),
  )
  const [history, setHistory] = React.useState(
    () => JSON.parse(localStorage.getItem('history')) ?? [Array(9).fill(null)],
  )

  React.useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history))
  }, [history])

  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function restart() {
    setCurrentSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
    localStorage.setItem('history', JSON.stringify([Array(9).fill(null)]))
  }

  function selectSquare(square) {
    if (winner || currentSquares[square]) return
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setCurrentSquares(squaresCopy)

    setHistory([...history, squaresCopy])
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          history={history}
          currentSquares={currentSquares}
          selectSquare={selectSquare}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol className="history">
          {history.map((squares, i) => (
            <button
              key={`move_${i}`}
              onClick={() => setCurrentSquares(squares)}
            >{`Move ${i}`}</button>
          ))}
        </ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
