import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Game from './Game'

afterEach(cleanup)

// Game squares
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8

it('should add the player symbol on the board when clicking on an empty tile', () => {
  // Arrange
  const { getByTestId } = render(<Game />)
  const tile0 = getByTestId('game-square-0')

  // Act
  tile0.click()

  // Assert
  expect(tile0.textContent).toEqual("X")
})

it('should not let a player act on a non empty tile', () => {
  // Arrange
  const { getByTestId } = render(<Game />)
  const tile0 = getByTestId('game-square-0')

  // Act
  tile0.click()
  tile0.click() // Second click on the same tile

  // Assert
  expect(tile0.textContent).toEqual("X")
})

it("should show when it's time for X to play", () => {
  // Arrange
  const { getByText } = render(<Game />)

  // Act (no action needed, X goes first)

  // Assert
  expect(getByText(/'s turn/i).textContent).toEqual("X's turn")
})

it("should show when it's time for O to play", () => {
  // Arrange
  const { getByTestId, getByText } = render(<Game />)
  const tile0 = getByTestId('game-square-0')

  // Act
  tile0.click()

  // Assert
  expect(getByText(/'s turn/i).textContent).toEqual("O's turn")
})

it('should show when the game has been won', () => {
  // Arrange
  const { getByTestId, getByText } = render(<Game />)
  const tile0 = getByTestId('game-square-0')
  const tile1 = getByTestId('game-square-1')
  const tile2 = getByTestId('game-square-2')
  const tile3 = getByTestId('game-square-3')
  const tile4 = getByTestId('game-square-4')
  const tile5 = getByTestId('game-square-5')
  const tile6 = getByTestId('game-square-6')
  const tile7 = getByTestId('game-square-7')
  const tile8 = getByTestId('game-square-8')

  // Act (game where X wins)
  tile0.click()
  tile1.click()
  tile3.click()
  tile4.click()
  tile6.click()

  // Assert
  expect(getByText(/Victory/i).textContent).toEqual("Victory for X")
})

it('should show when the game has ended in a draw', () => {
  // Arrange
  const { getByTestId, getByText } = render(<Game />)
  const tile0 = getByTestId('game-square-0')
  const tile1 = getByTestId('game-square-1')
  const tile2 = getByTestId('game-square-2')
  const tile3 = getByTestId('game-square-3')
  const tile4 = getByTestId('game-square-4')
  const tile5 = getByTestId('game-square-5')
  const tile6 = getByTestId('game-square-6')
  const tile7 = getByTestId('game-square-7')
  const tile8 = getByTestId('game-square-8')

  // Act (game that ends in a draw)
  tile0.click()
  tile1.click()
  tile3.click()
  tile4.click()
  tile7.click()
  tile6.click()
  tile2.click()
  tile5.click()
  tile8.click()

  // Assert
  expect(getByText(/draw/i).textContent).toEqual("It's a draw!")
})

it('should reset the game when the replay button is clicked', () => {
  // Arrange
  const { getByTestId, getByText } = render(<Game />)
  const tile0 = getByTestId('game-square-0')

  // Act
  tile0.click()
  getByText(/Replay/).click()

  // Assert
  expect(tile0.textContent).toEqual("")
})
