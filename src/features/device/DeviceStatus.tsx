import type { ReactNode } from 'react'
import { profile } from '../../data/profile'
import { useBattery } from '../../hooks/useBattery'
import { useLocale } from '../../i18n/LocaleProvider'
import { BatteryIcon } from './icons/BatteryIcon'
import { SignalIcon } from './icons/SignalIcon'
import { LanguageToggle } from './LanguageToggle'
import './status.css'

type DeviceStatusProps = {
  /** Overrides the default ONLINE label (e.g. temporary OFFLINE flash). */
  statusText?: string
  /** Extra control under the status stack (e.g. Menu). */
  trailing?: ReactNode
}

/** Shared HUD: signal, battery, locale, device id, link status. */
export function DeviceStatus({ statusText, trailing }: DeviceStatusProps) {
  const { t } = useLocale()
  const battery = useBattery()

  return (
    <div className="device-status">
      <div className="device-status__icons">
        <SignalIcon />
        <BatteryIcon
          level={battery.level}
          charging={battery.charging}
          supported={battery.supported}
        />
        <span className="device-status__led" title={t.statusActive} />
        <LanguageToggle />
      </div>
      <span className="device-status__id">DE: {profile.idCode}</span>
      <span className="device-status__online" aria-live="polite">
        {statusText ?? t.statusOnline}
      </span>
      {trailing}
    </div>
  )
}
