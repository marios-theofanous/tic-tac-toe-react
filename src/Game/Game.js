import React, { useState } from 'react'
import Square from '../Square'

function Game() {

    const initialSquares = () => {
        return Array(9).fill(null)
    }

    const X = "X"
    const O = "O"
    const [squares, setSquares] = useState(initialSquares())
    const [currentPlayer, setCurrentPlayer] = useState(X)

    function handleClick(index) {
        if (squares[index] || gameOver()) {
            return // Could show an error here for the user to know it's an invalid move
        }
        const newSquares = squares.slice()
        newSquares[index] = currentPlayer
        setSquares(newSquares)

        nextPlayer()
    }

    const gameOver = () => {
        return !!(isDraw() || getVictor())
    }

    const headerText = () => {
        const victor = getVictor()

        if (victor) {
            return `Victory for ${victor}`
        } else if (isDraw()) {
            return "It's a draw!"
        } else {
            return `${currentPlayer}'s turn`
        }
    }

    const isDraw = () => {
        for (const square of squares) {
            if (!square) {
                return false
            }
        }

        return true
    }

    const nextPlayer = () => {
        if (currentPlayer === X) {
            setCurrentPlayer(O)
        } else {
            setCurrentPlayer(X)
        }
    }

    const getVictor = () => {
        const victoryConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (const condition of victoryConditions) {
            const [x, y, z] = condition
            if (squares[x] === squares[y] && squares[y] === squares[z]) {
                return squares[x]
            }
        }

        return null
    }

    const resetGame = () => {
        setSquares(initialSquares)
        setCurrentPlayer(X)
    }

    return (
        <div className="container-grid">
            <header className="title" style={{ textAlign: "center" }}>
                <h1>{headerText()}</h1>
            </header>
            <main className="game-grid">
                {
                    squares.map((square, index) => {
                        return <Square key={index} index={index} value={square} onClick={() => handleClick(index)} />
                    })
                }
            </main>
            <footer>
                <button className="reset-button" onClick={() => resetGame()}>
                    Replay
            </button>
            </footer>
        </div>
    )
}


export default Game
