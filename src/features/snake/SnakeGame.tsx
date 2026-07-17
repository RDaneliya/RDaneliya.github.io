import { useLocale } from '../../i18n/LocaleProvider'
import { formatMessage } from '../../lib/formatMessage'
import { DeviceChip } from '../device'
import { SNAKE_COLS, SNAKE_ROWS, type Direction } from './snakeLogic'
import { useSnakeGame } from './useSnakeGame'
import './snake.css'

type SnakeGameProps = {
  onBack: () => void
}

const PAD_GLYPH: Record<Direction, string> = {
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
}

export function SnakeGame({ onBack }: SnakeGameProps) {
  const { t } = useLocale()
  const { snake, food, score, alive, reset, queueDirection } = useSnakeGame()
  const scoreLabel = formatMessage(t.snakeScore, { score })

  const cellClass = (x: number, y: number) => {
    if (food.x === x && food.y === y) return 'snake__cell snake__cell--food'
    const index = snake.findIndex((s) => s.x === x && s.y === y)
    if (index === 0) return 'snake__cell snake__cell--head'
    if (index > 0) return 'snake__cell snake__cell--body'
    return 'snake__cell'
  }

  const padButton = (dir: Direction) => (
    <button
      type="button"
      className="snake__pad-btn"
      aria-label={dir}
      onClick={() => queueDirection(dir)}
    >
      {PAD_GLYPH[dir]}
    </button>
  )

  return (
    <div className="snake">
      <header className="snake__header">
        <div className="snake__header-left">
          <h1 className="snake__title">{t.appSnake}</h1>
          <span className="snake__score">{scoreLabel}</span>
        </div>
        <DeviceChip onClick={onBack}>{t.appsMenu}</DeviceChip>
      </header>

      <div className="snake__stage">
        <div
          className="snake__board"
          style={{
            gridTemplateColumns: `repeat(${SNAKE_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${SNAKE_ROWS}, 1fr)`,
          }}
          role="img"
          aria-label={t.appSnake}
        >
          {Array.from({ length: SNAKE_ROWS * SNAKE_COLS }, (_, i) => {
            const x = i % SNAKE_COLS
            const y = Math.floor(i / SNAKE_COLS)
            return <div key={`${x}-${y}`} className={cellClass(x, y)} />
          })}
        </div>

        {!alive ? (
          <div className="snake__overlay">
            <p className="snake__overlay-title">{t.snakeGameOver}</p>
            <div className="snake__overlay-actions">
              <button type="button" className="snake__action" onClick={reset}>
                {t.snakeRestart}
              </button>
              <button type="button" className="snake__action" onClick={onBack}>
                {t.appsMenu}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <p className="snake__hint">{t.snakeHint}</p>

      <div className="snake__pad">
        <span />
        {padButton('up')}
        <span />
        {padButton('left')}
        <span className="snake__pad-center" />
        {padButton('right')}
        <span />
        {padButton('down')}
        <span />
      </div>
    </div>
  )
}
