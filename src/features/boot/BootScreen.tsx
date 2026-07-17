import { useLocale } from '../../i18n/LocaleProvider'
import { BootDetails } from './BootDetails'
import { BootSplash } from './BootSplash'
import { useBootSequence } from './useBootSequence'
import './boot.css'

type BootScreenProps = {
  active: boolean
  onComplete: () => void
}

export function BootScreen({ active, onComplete }: BootScreenProps) {
  const { t } = useLocale()
  const boot = useBootSequence(active, onComplete)

  return (
    <div className={`boot${boot.details ? ' boot--details' : ''}${boot.ready ? ' boot--ready' : ''}`}>
      <BootSplash
        currentMsg={boot.currentMsg}
        progress={boot.progress}
        ready={boot.ready}
        details={boot.details}
      />

      <BootDetails
        details={boot.details}
        bootLines={boot.bootLines}
        visibleCount={boot.visibleCount}
        scrollThumb={boot.scrollThumb}
        meters={boot.meters}
      />

      {boot.ready && <p className="boot__ready">{t.bootReady}</p>}

      <button type="button" className="boot__skip" onClick={boot.finish}>
        {t.bootSkip}
      </button>
    </div>
  )
}
