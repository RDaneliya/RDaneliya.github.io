import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createInitialSnake,
  enqueueDirection,
  randomEmptyCell,
  tickSnake,
  type Direction,
  type Point,
} from './snakeLogic'

const TICK_MS = 140

type GameState = {
  snake: Point[]
  food: Point
  score: number
  alive: boolean
}

function createInitialState(): GameState {
  const snake = createInitialSnake()
  return {
    snake,
    food: randomEmptyCell(snake),
    score: 0,
    alive: true,
  }
}

function keyToDirection(key: string): Direction | null {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return 'up'
    case 'ArrowDown':
    case 's':
    case 'S':
      return 'down'
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return 'left'
    case 'ArrowRight':
    case 'd':
    case 'D':
      return 'right'
    default:
      return null
  }
}

export function useSnakeGame() {
  const [state, setState] = useState<GameState>(createInitialState)
  const directionRef = useRef<Direction>('right')
  const queuedRef = useRef<Direction | null>(null)

  const reset = useCallback(() => {
    directionRef.current = 'right'
    queuedRef.current = null
    setState(createInitialState())
  }, [])

  const queueDirection = useCallback((next: Direction) => {
    queuedRef.current = enqueueDirection(
      directionRef.current,
      queuedRef.current,
      next,
    )
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const dir = keyToDirection(event.key)
      if (!dir) return
      event.preventDefault()
      queueDirection(dir)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [queueDirection])

  useEffect(() => {
    if (!state.alive) return

    const id = window.setInterval(() => {
      if (queuedRef.current) {
        directionRef.current = queuedRef.current
        queuedRef.current = null
      }
      const direction = directionRef.current

      setState((current) => {
        if (!current.alive) return current
        const next = tickSnake(current.snake, current.food, direction, current.score)
        return {
          snake: next.snake,
          food: next.food,
          score: next.score,
          alive: next.alive,
        }
      })
    }, TICK_MS)

    return () => window.clearInterval(id)
  }, [state.alive])

  return {
    snake: state.snake,
    food: state.food,
    score: state.score,
    alive: state.alive,
    reset,
    queueDirection,
  }
}
