import { useLocale } from '../../../i18n/LocaleProvider'
import { formatMessage } from '../../../lib/formatMessage'

type BatteryIconProps = {
  level: number
  charging: boolean
  supported: boolean
}

export function BatteryIcon({ level, charging, supported }: BatteryIconProps) {
  const { t } = useLocale()
  const fillWidth = Math.max(1.5, 12 * (supported ? level : 1))
  const percent = Math.round((supported ? level : 1) * 100)
  const low = supported && level <= 0.2 && !charging
  const levelLabel = formatMessage(t.batteryLevel, {
    percent: supported ? percent : '—',
  })
  const title = supported && charging ? `${t.batteryCharging} · ${levelLabel}` : levelLabel

  return (
    <svg
      className={`device-status__icon device-status__battery${low ? ' device-status__battery--low' : ''}${charging ? ' device-status__battery--charging' : ''}`}
      width="22"
      height="12"
      viewBox="0 0 22 12"
      fill="none"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <rect x="0.5" y="0.5" width="18" height="11" rx="1.5" stroke="currentColor" />
      <rect x="2.5" y="2.5" width={fillWidth} height="7" fill="currentColor" opacity={low ? 0.95 : 0.85} />
      <rect x="19" y="3.5" width="2.5" height="5" rx="0.5" fill="currentColor" opacity="0.7" />
      {charging && (
        <path
          d="M10.2 2.2 L8.4 6.2 H10.6 L9.4 9.8 L13.2 5 H10.8 Z"
          fill="var(--bg-deep)"
          stroke="currentColor"
          strokeWidth="0.4"
        />
      )}
    </svg>
  )
}
