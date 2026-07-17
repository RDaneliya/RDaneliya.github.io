import { useLocale } from '../../i18n/LocaleProvider'
import type { BootMeters, MeterId } from './useBootSequence'

type BootMetersProps = {
  meters: BootMeters
}

export function BootMeters({ meters }: BootMetersProps) {
  const { t } = useLocale()

  const rows: [MeterId, string][] = [
    ['kernel', t.bootMeterKernel],
    ['display', t.bootMeterDisplay],
    ['link', t.bootMeterLink],
  ]

  return (
    <div className="boot__meters">
      {rows.map(([id, label]) => (
        <div key={id} className="boot__meter">
          <div className="boot__meter-head">
            <span>{label}</span>
            <span>{Math.round(meters[id])}%</span>
          </div>
          <div
            className="boot__slider"
            role="progressbar"
            aria-valuenow={meters[id]}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="boot__slider-fill" style={{ width: `${meters[id]}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
