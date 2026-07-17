import { useLocale } from '../../i18n/LocaleProvider'
import { BootThrobber } from './BootThrobber'

type BootSplashProps = {
  currentMsg: string
  progress: number
  ready: boolean
  details: boolean
}

export function BootSplash({ currentMsg, progress, ready, details }: BootSplashProps) {
  const { t } = useLocale()

  return (
    <div className="boot__splash">
      <div className="boot__brand" aria-hidden="true">
        <span className="boot__brand-ring" />
        <span className="boot__brand-core" />
      </div>
      <p className="boot__title">{t.bootTitle}</p>
      <p className="boot__subtitle">{t.bootSubtitle}</p>

      <BootThrobber />

      <p className="boot__status-line" aria-live="polite">
        {currentMsg}
        {!ready && <span className="boot__caret" />}
      </p>

      <div
        className="boot__progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="boot__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {!details && <p className="boot__hint">{t.bootEscHint}</p>}
    </div>
  )
}
