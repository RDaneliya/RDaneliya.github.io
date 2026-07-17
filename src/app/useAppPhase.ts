import { useCallback, useState } from 'react'

export type AppPhase = 'boot' | 'card'

export function useAppPhase() {
  const [phase, setPhase] = useState<AppPhase>('boot')
  const [bootActive, setBootActive] = useState(false)

  const handleOpening = useCallback(() => setBootActive(true), [])
  const completeBoot = useCallback(() => setPhase('card'), [])

  return {
    phase,
    bootActive,
    handleOpening,
    completeBoot,
  }
}
