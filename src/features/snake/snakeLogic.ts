export type Point = { x: number; y: number }
export type Direction = 'up' | 'down' | 'left' | 'right'

export const SNAKE_COLS = 14
export const SNAKE_ROWS = 14

const opposite: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
}

export function stepPoint(point: Point, direction: Direction): Point {
  switch (direction) {
    case 'up':
      return { x: point.x, y: point.y - 1 }
    case 'down':
      return { x: point.x, y: point.y + 1 }
    case 'left':
      return { x: point.x - 1, y: point.y }
    case 'right':
      return { x: point.x + 1, y: point.y }
  }
}

export function isOpposite(a: Direction, b: Direction): boolean {
  return opposite[a] === b
}

/**
 * Buffer at most one turn until the next tick.
 * Always reject reverses relative to the committed (in-effect) direction so
 * rapid perpendicular presses cannot stack into a 180° turn in one tick.
 */
export function enqueueDirection(
  committed: Direction,
  queued: Direction | null,
  next: Direction,
): Direction | null {
  if (isOpposite(committed, next)) return queued
  if (queued !== null) return queued
  return next
}

export function isOutOfBounds(point: Point, cols = SNAKE_COLS, rows = SNAKE_ROWS): boolean {
  return point.x < 0 || point.y < 0 || point.x >= cols || point.y >= rows
}

export function hitsSelf(point: Point, snake: Point[]): boolean {
  return snake.some((segment) => segment.x === point.x && segment.y === point.y)
}

/** Body cells that remain occupied after this tick (excludes vacating tip when not growing). */
export function occupiedAfterMove(snake: Point[], willGrow: boolean): Point[] {
  return willGrow ? snake : snake.slice(0, -1)
}

export function randomEmptyCell(
  snake: Point[],
  cols = SNAKE_COLS,
  rows = SNAKE_ROWS,
  random = Math.random,
): Point | null {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`))
  const free: Point[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y })
    }
  }
  if (free.length === 0) return null
  return free[Math.floor(random() * free.length)]!
}

export function createInitialSnake(): Point[] {
  const midY = Math.floor(SNAKE_ROWS / 2)
  const midX = Math.floor(SNAKE_COLS / 2)
  return [
    { x: midX, y: midY },
    { x: midX - 1, y: midY },
    { x: midX - 2, y: midY },
  ]
}

export function tickSnake(
  snake: Point[],
  food: Point,
  direction: Direction,
  score: number,
): {
  snake: Point[]
  food: Point
  score: number
  alive: boolean
} {
  const head = snake[0]!
  const next = stepPoint(head, direction)
  const willGrow = next.x === food.x && next.y === food.y
  const body = occupiedAfterMove(snake, willGrow)

  if (isOutOfBounds(next) || hitsSelf(next, body)) {
    return { snake, food, score, alive: false }
  }

  const nextSnake = [next, ...body]
  const nextFood = willGrow ? (randomEmptyCell(nextSnake) ?? food) : food
  const nextScore = willGrow ? score + 1 : score

  return {
    snake: nextSnake,
    food: nextFood,
    score: nextScore,
    alive: true,
  }
}
