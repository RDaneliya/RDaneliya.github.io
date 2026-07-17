import { describe, expect, it } from 'vitest'
import {
  hitsSelf,
  isOpposite,
  isOutOfBounds,
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
})
