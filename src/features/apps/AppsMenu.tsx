import { useEffect, useState } from 'react'
import { useLocale } from '../../i18n/LocaleProvider'
import { DeviceStatus } from '../device'
import { AppIcon } from './AppIcon'
import {
  APP_CATALOG,
  isLaunchableAppId,
  type LaunchableAppId,
} from './registry'
import './apps.css'

type AppsMenuProps = {
  onLaunch: (id: LaunchableAppId) => void
}

export function AppsMenu({ onLaunch }: AppsMenuProps) {
  const { t } = useLocale()
  const [statusFlash, setStatusFlash] = useState<string | null>(null)

  useEffect(() => {
    if (!statusFlash) return
    const id = window.setTimeout(() => setStatusFlash(null), 1800)
    return () => window.clearTimeout(id)
  }, [statusFlash])

  return (
    <div className="apps">
      <header className="apps__header">
        <div className="apps__identity">
          <h1 className="apps__title">{t.appsTitle}</h1>
        </div>
        <DeviceStatus statusText={statusFlash ?? undefined} />
      </header>
      <div className="apps__grid">
        {APP_CATALOG.map((app) => {
          const { Icon } = app
          return (
            <AppIcon
              key={app.id}
              label={t[app.labelKey]}
              disabled={!app.available}
              onClick={() => {
                if (isLaunchableAppId(app.id)) {
                  onLaunch(app.id)
                  return
                }
                setStatusFlash(t.appOffline)
              }}
            >
              <Icon />
            </AppIcon>
          )
        })}
      </div>
    </div>
  )
}
