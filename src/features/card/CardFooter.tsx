import { useLocale } from '../../i18n/LocaleProvider'
import type { LocationStatus } from '../../hooks/useVisitorLocation'
import { DeviceChip } from '../device'

type CardFooterProps = {
  coords: string
  location: string
  status: LocationStatus
  onScan: () => void
}

export function CardFooter({ coords, location, status, onScan }: CardFooterProps) {
  const { t } = useLocale()
  const showScan = status === 'idle'

  return (
    <footer className="pocket__footer card-load__item card-load__item--5">
      <span>{coords}</span>
      <span className="pocket__footer-right">
        {showScan ? (
          <DeviceChip onClick={onScan}>{t.locationScan}</DeviceChip>
        ) : null}
        <span className={status === 'locating' ? 'pocket__location--locating' : undefined}>
          {showScan ? t.locationIdle : location}
        </span>
      </span>
    </footer>
  )
}
