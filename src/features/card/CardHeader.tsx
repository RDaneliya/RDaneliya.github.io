import { profile } from '../../data/profile'
import { useLocale } from '../../i18n/LocaleProvider'
import { DeviceChip, DeviceStatus } from '../device'

type CardHeaderProps = {
  onBack: () => void
}

export function CardHeader({ onBack }: CardHeaderProps) {
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
      <DeviceStatus
        trailing={
          <DeviceChip onClick={onBack}>{t.appsMenu}</DeviceChip>
        }
      />
    </header>
  )
}
