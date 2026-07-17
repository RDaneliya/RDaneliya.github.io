import { useEffect, useState, type ReactNode } from 'react'
import './device.css'

type PocketFrameProps = {
  children: ReactNode
  onOpening?: () => void
  onOpenComplete?: () => void
}

const OPEN_MS = 1250

export function PocketFrame({ children, onOpening, onOpenComplete }: PocketFrameProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setOpen(true)
      onOpening?.()
      onOpenComplete?.()
      return
    }

    const openId = window.setTimeout(() => {
      setOpen(true)
      onOpening?.()
    }, 80)
    const doneId = window.setTimeout(() => onOpenComplete?.(), 80 + OPEN_MS)

    return () => {
      window.clearTimeout(openId)
      window.clearTimeout(doneId)
    }
  }, [onOpening, onOpenComplete])

  return (
    <div className="pocket-stage">
      <div
        className={`pocket-device${open ? ' pocket-device--open' : ''}`}
        aria-expanded={open}
      >
        <aside className="pocket-device__rail pocket-device__rail--left" aria-hidden="true">
          <span className="pocket-device__grip" />
          <span className="pocket-device__mark" />
        </aside>

        <div className="pocket-device__screen">
          <div className="pocket__glass">
            <span className="pocket__corner pocket__corner--tl" />
            <span className="pocket__corner pocket__corner--tr" />
            <span className="pocket__corner pocket__corner--bl" />
            <span className="pocket__corner pocket__corner--br" />
            <div className="pocket__scroll" aria-hidden="true" />
            {children}
          </div>
        </div>

        <aside className="pocket-device__rail pocket-device__rail--right" aria-hidden="true">
          <span className="pocket-device__status-led" />
        </aside>
      </div>
    </div>
  )
}
