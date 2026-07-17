import { LocaleProvider } from '../i18n/LocaleProvider'
import { AppsMenu, type LaunchableAppId } from '../features/apps'
import { BootScreen } from '../features/boot'
import { BusinessCard } from '../features/card'
import { EffectsOverlay, PocketFrame } from '../features/device'
import { SnakeGame } from '../features/snake'
import { useAppPhase, type AppPhase } from './useAppPhase'

type PhaseActions = {
  bootActive: boolean
  completeBoot: () => void
  goHome: () => void
  openApp: (id: LaunchableAppId) => void
}

function renderPhase(phase: AppPhase, actions: PhaseActions) {
  switch (phase) {
    case 'boot':
      return <BootScreen active={actions.bootActive} onComplete={actions.completeBoot} />
    case 'apps':
      return <AppsMenu onLaunch={actions.openApp} />
    case 'card':
      return <BusinessCard onBack={actions.goHome} />
    case 'snake':
      return <SnakeGame onBack={actions.goHome} />
  }
}

export default function App() {
  const { phase, bootActive, handleOpening, completeBoot, goHome, openApp } = useAppPhase()

  return (
    <LocaleProvider>
      <div className="app">
        <EffectsOverlay />
        <PocketFrame onOpening={handleOpening}>
          {renderPhase(phase, { bootActive, completeBoot, goHome, openApp })}
        </PocketFrame>
      </div>
    </LocaleProvider>
  )
}
