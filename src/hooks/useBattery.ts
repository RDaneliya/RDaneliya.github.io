import { useEffect, useState } from 'react'

export type BatteryState = {
  supported: boolean
  level: number
  charging: boolean
}

type BatteryManager = EventTarget & {
  charging: boolean
  level: number
  addEventListener(
    type: 'chargingchange' | 'levelchange',
    listener: () => void,
  ): void
  removeEventListener(
    type: 'chargingchange' | 'levelchange',
    listener: () => void,
  ): void
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManager>
}

const FALLBACK: BatteryState = {
  supported: false,
  level: 1,
  charging: false,
}

export function useBattery(): BatteryState {
  const [state, setState] = useState<BatteryState>(FALLBACK)

  useEffect(() => {
    const nav = navigator as NavigatorWithBattery
    if (!nav.getBattery) return

    let cancelled = false
    let battery: BatteryManager | null = null

    const sync = () => {
      if (cancelled || !battery) return
      setState({
        supported: true,
        level: Math.min(1, Math.max(0, battery.level)),
        charging: battery.charging,
      })
    }

    nav
      .getBattery()
      .then((mgr) => {
        if (cancelled) return
        battery = mgr
        sync()
        mgr.addEventListener('levelchange', sync)
        mgr.addEventListener('chargingchange', sync)
      })
      .catch(() => {
        /* unsupported / denied */
      })

    return () => {
      cancelled = true
      if (!battery) return
      battery.removeEventListener('levelchange', sync)
      battery.removeEventListener('chargingchange', sync)
    }
  }, [])

  return state
}
