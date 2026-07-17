import { useEffect, useRef } from 'react'
import { BootMeters } from './BootMeters'
import type { BootMeters as MetersState } from './useBootSequence'

type BootLine = { status: 'OK' | 'WAIT'; msg: string; delay: number }

const LINE_STATUS_CLASS: Record<BootLine['status'], string> = {
  OK: 'boot__line--ok',
  WAIT: 'boot__line--wait',
}

type BootDetailsProps = {
  details: boolean
  bootLines: BootLine[]
  visibleCount: number
  scrollThumb: number
  meters: MetersState
}

export function BootDetails({
  details,
  bootLines,
  visibleCount,
  scrollThumb,
  meters,
}: BootDetailsProps) {
  const logRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = logRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [visibleCount, details])

  return (
    <div className="boot__details" hidden={!details}>
      <div className="boot__log-shell">
        <ul className="boot__log" ref={logRef} aria-live="polite">
          {bootLines.slice(0, visibleCount).map((line) => (
            <li
              key={`${line.status}-${line.msg}`}
              className={`boot__line ${LINE_STATUS_CLASS[line.status]}`}
            >
              <span className="boot__status">[ {line.status.padEnd(4, ' ')} ]</span>
              <span className="boot__msg">{line.msg}</span>
            </li>
          ))}
        </ul>
        <div className="boot__scroller" aria-hidden="true">
          <div className="boot__scroller-track">
            <div
              className="boot__scroller-thumb"
              style={{ transform: `translateY(${scrollThumb}%)` }}
            />
          </div>
        </div>
      </div>

      <BootMeters meters={meters} />
    </div>
  )
}
