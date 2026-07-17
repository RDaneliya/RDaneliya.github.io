import { profile } from '../../data/profile'
import { useLocale } from '../../i18n/LocaleProvider'
import type { BatteryState } from '../../hooks/useBattery'
import { BatteryIcon } from './icons/BatteryIcon'
import { SignalIcon } from './icons/SignalIcon'
import { LanguageToggle } from './LanguageToggle'

type CardHeaderProps = {
  battery: BatteryState
}

export function CardHeader({ battery }: CardHeaderProps) {
  const { t } = useLocale()

  return (
    <header className="pocket__header card-load__item card-load__item--1">
      <div className="pocket__identity">
        <div className="pocket__avatar" aria-hidden="true">
          <span className="pocket__avatar-mark" />
        </div>
        <div className="pocket__name-block">
          <h1 className="pocket__name">{profile.name}</h1>
          <p className="pocket__role">{t.role}</p>
          <p className="pocket__home">{t.homeLocation}</p>
        </div>
      </div>
      <div className="pocket__status">
        <div className="pocket__status-icons">
          <SignalIcon />
          <BatteryIcon
            level={battery.level}
            charging={battery.charging}
            supported={battery.supported}
          />
          <span className="pocket__led" title={t.statusActive} />
          <LanguageToggle />
        </div>
        <span className="pocket__id-code">DE: {profile.idCode}</span>
        <span className="pocket__online">{t.statusOnline}</span>
      </div>
    </header>
  )
}
