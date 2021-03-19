import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Square from './Square'

afterEach(cleanup)

it('should call the onClick function when clicked', () => {
  // Arrange
  const x = jest.fn()
  const { getByTestId } = render(<Square onClick={x} index="0" />)
  const tile = getByTestId('game-square-0')

  // Act
  tile.click()

  // Assert
  expect(x).toHaveBeenCalledTimes(1)
})

it('should display what the value prop is', () => {
  // Arrange
  const value = "X"
  const { getByTestId } = render(<Square value={value} index="0" />)
  const tile = getByTestId('game-square-0')

  // Act (no action needed)

  // Assert
  expect(tile.textContent).toEqual(value)
})