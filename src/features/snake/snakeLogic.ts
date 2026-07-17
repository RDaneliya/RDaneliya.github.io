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

export function isOutOfBounds(point: Point, cols = SNAKE_COLS, rows = SNAKE_ROWS): boolean {
  return point.x < 0 || point.y < 0 || point.x >= cols || point.y >= rows
}

export function hitsSelf(point: Point, snake: Point[]): boolean {
  return snake.some((segment) => segment.x === point.x && segment.y === point.y)
}

export function randomEmptyCell(
  snake: Point[],
  cols = SNAKE_COLS,
  rows = SNAKE_ROWS,
  random = Math.random,
): Point {
  const occupied = new Set(snake.map((p) => `${p.x},${p.y}`))
  const free: Point[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!occupied.has(`${x},${y}`)) free.push({ x, y })
    }
  }
  if (free.length === 0) return { x: 0, y: 0 }
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

  if (isOutOfBounds(next) || hitsSelf(next, snake)) {
    return { snake, food, score, alive: false }
  }

  const grew = next.x === food.x && next.y === food.y
  const body = grew ? snake : snake.slice(0, -1)
  const nextSnake = [next, ...body]
  const nextFood = grew ? randomEmptyCell(nextSnake) : food
  const nextScore = grew ? score + 1 : score

  return {
    snake: nextSnake,
    food: nextFood,
    score: nextScore,
    alive: true,
  }
}
