import { LocaleProvider } from '../i18n/LocaleProvider'
import { BootScreen } from '../features/boot'
import { BusinessCard } from '../features/card'
import { EffectsOverlay, PocketFrame } from '../features/device'
import { useAppPhase } from './useAppPhase'

export default function App() {
  const { phase, bootActive, handleOpening, completeBoot } = useAppPhase()

  return (
    <LocaleProvider>
      <div className="app">
        <EffectsOverlay />
        <PocketFrame onOpening={handleOpening}>
          {phase === 'boot' ? (
            <BootScreen active={bootActive} onComplete={completeBoot} />
          ) : (
            <BusinessCard />
          )}
        </PocketFrame>
      </div>
    </LocaleProvider>
  )
}
