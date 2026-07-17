import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../../i18n/LocaleProvider'

export type MeterId = 'kernel' | 'display' | 'link'

export type BootMeters = Record<MeterId, number>

const METER_TARGETS: Record<MeterId, number> = {
  kernel: 0.42,
  display: 0.68,
  link: 1,
}

export type BootSequence = {
  visibleCount: number
  progress: number
  meters: BootMeters
  ready: boolean
  details: boolean
  setDetails: (value: boolean) => void
  finish: () => void
  currentMsg: string
  scrollThumb: number
  bootLines: { status: 'OK' | 'WAIT'; msg: string; delay: number }[]
}

export function useBootSequence(active: boolean, onComplete: () => void): BootSequence {
  const { t } = useLocale()
  const bootLines = t.bootLines
  const [visibleCount, setVisibleCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [meters, setMeters] = useState<BootMeters>({ kernel: 0, display: 0, link: 0 })
  const [ready, setReady] = useState(false)
  const [details, setDetails] = useState(false)
  const completed = useRef(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const finish = () => {
    if (completed.current) return
    completed.current = true
    onCompleteRef.current()
  }

  useEffect(() => {
    if (!active) return

    const timers: number[] = []
    const total = bootLines.length

    bootLines.forEach((line, index) => {
      timers.push(
        window.setTimeout(() => {
          const step = (index + 1) / total
          setVisibleCount(index + 1)
          setProgress(step * 100)
          setMeters({
            kernel: Math.min(100, (step / METER_TARGETS.kernel) * 100),
            display: Math.min(100, (step / METER_TARGETS.display) * 100),
            link: Math.min(100, (step / METER_TARGETS.link) * 100),
          })
        }, line.delay),
      )
    })

    timers.push(window.setTimeout(() => setDetails(true), 900))

    const lastDelay = bootLines[bootLines.length - 1]?.delay ?? 0
    timers.push(window.setTimeout(() => setReady(true), lastDelay + 450))
    timers.push(
      window.setTimeout(() => {
        if (completed.current) return
        completed.current = true
        onCompleteRef.current()
      }, lastDelay + 2000),
    )

    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [active, bootLines])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDetails(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const currentMsg =
    visibleCount === 0
      ? t.bootProcessing
      : ready
        ? t.bootReady
        : bootLines[Math.max(0, visibleCount - 1)]?.msg ?? t.bootProcessing

  const scrollThumb =
    bootLines.length <= 1 ? 0 : ((visibleCount - 1) / (bootLines.length - 1)) * 72

  return {
    visibleCount,
    progress,
    meters,
    ready,
    details,
    setDetails,
    finish,
    currentMsg,
    scrollThumb,
    bootLines,
  }
}
