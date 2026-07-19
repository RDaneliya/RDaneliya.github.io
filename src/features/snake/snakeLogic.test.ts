import { describe, expect, it } from 'vitest'
import {
  enqueueDirection,
  hitsSelf,
  isOpposite,
  isOutOfBounds,
  randomEmptyCell,
  stepPoint,
  tickSnake,
} from './snakeLogic'

describe('snakeLogic', () => {
  it('steps in each direction', () => {
    const p = { x: 5, y: 5 }
    expect(stepPoint(p, 'up')).toEqual({ x: 5, y: 4 })
    expect(stepPoint(p, 'down')).toEqual({ x: 5, y: 6 })
    expect(stepPoint(p, 'left')).toEqual({ x: 4, y: 5 })
    expect(stepPoint(p, 'right')).toEqual({ x: 6, y: 5 })
  })

  it('detects opposite directions', () => {
    expect(isOpposite('up', 'down')).toBe(true)
    expect(isOpposite('left', 'right')).toBe(true)
    expect(isOpposite('up', 'left')).toBe(false)
  })

  it('buffers one turn and rejects reverse-of-committed even via perpendicular spam', () => {
    expect(enqueueDirection('right', null, 'up')).toBe('up')
    expect(enqueueDirection('right', 'up', 'left')).toBe('up')
    expect(enqueueDirection('up', 'right', 'down')).toBe('right')
    expect(enqueueDirection('right', null, 'left')).toBe(null)
  })

  it('detects walls and self', () => {
    expect(isOutOfBounds({ x: -1, y: 0 })).toBe(true)
    expect(isOutOfBounds({ x: 0, y: 0 })).toBe(false)
    expect(hitsSelf({ x: 1, y: 1 }, [{ x: 1, y: 1 }, { x: 2, y: 1 }])).toBe(true)
  })

  it('grows when eating food', () => {
    const snake = [
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ]
    const food = { x: 4, y: 3 }
    const result = tickSnake(snake, food, 'right', 0)
    expect(result.alive).toBe(true)
    expect(result.score).toBe(1)
    expect(result.snake).toHaveLength(4)
    expect(result.snake[0]).toEqual({ x: 4, y: 3 })
  })

  it('dies on wall collision', () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]
    const result = tickSnake(snake, { x: 5, y: 5 }, 'left', 2)
    expect(result.alive).toBe(false)
    expect(result.score).toBe(2)
  })

  it('dies when moving into mid-body (real self-collision)', () => {
    const snake = [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ]
    // Moving left would hit mid-body at (1,2), not the vacating tip.
    const result = tickSnake(snake, { x: 10, y: 10 }, 'left', 0)
    expect(result.alive).toBe(false)
  })

  it('allows chasing the vacating tip without dying', () => {
    const snake = [
      { x: 2, y: 2 }, // head
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }, // tip — vacated on this non-grow move
    ]
    const result = tickSnake(snake, { x: 10, y: 10 }, 'left', 3)
    expect(result.alive).toBe(true)
    expect(result.snake).toHaveLength(4)
    expect(result.snake[0]).toEqual({ x: 1, y: 2 })
    expect(result.score).toBe(3)
  })

  it('never returns an occupied cell when the board is full', () => {
    const cols = 2
    const rows = 2
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ]
    const cell = randomEmptyCell(snake, cols, rows, () => 0)
    expect(cell).toBeNull()
  })
})
