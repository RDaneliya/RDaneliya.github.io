import { useCallback, useState } from 'react'
import type { LaunchableAppId } from '../features/apps'

/** Device shell screens: boot sequence, apps hub, or a launched app. */
export type AppPhase = 'boot' | 'apps' | LaunchableAppId

export function useAppPhase() {
  const [phase, setPhase] = useState<AppPhase>('boot')
  const [bootActive, setBootActive] = useState(false)

  const handleOpening = useCallback(() => setBootActive(true), [])
  /** Product default: land on the dossier after boot. */
  const completeBoot = useCallback(() => setPhase('card'), [])
  const goHome = useCallback(() => setPhase('apps'), [])
  const openApp = useCallback((id: LaunchableAppId) => setPhase(id), [])

  return {
    phase,
    bootActive,
    handleOpening,
    completeBoot,
    goHome,
    openApp,
  }
}
