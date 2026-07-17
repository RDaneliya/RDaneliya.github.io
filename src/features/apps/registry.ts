import type { ComponentType } from 'react'
import type { Messages } from '../../i18n/types'
import { MessageAppIcon, SnakeAppIcon, TetrisAppIcon } from './icons'

/** Screens that can be opened from the apps menu. */
export type LaunchableAppId = 'card' | 'snake'

/** Catalog entries, including stubs that are not launchable yet. */
export type CatalogAppId = LaunchableAppId | 'tetris'

export type AppDefinition = {
  id: CatalogAppId
  labelKey: keyof Pick<Messages, 'appMessage' | 'appSnake' | 'appTetris'>
  Icon: ComponentType<{ className?: string }>
  available: boolean
}

export const APP_CATALOG: readonly AppDefinition[] = [
  {
    id: 'card',
    labelKey: 'appMessage',
    Icon: MessageAppIcon,
    available: true,
  },
  {
    id: 'snake',
    labelKey: 'appSnake',
    Icon: SnakeAppIcon,
    available: true,
  },
  {
    id: 'tetris',
    labelKey: 'appTetris',
    Icon: TetrisAppIcon,
    available: false,
  },
] as const

export function isLaunchableAppId(id: CatalogAppId): id is LaunchableAppId {
  return APP_CATALOG.some((app) => app.id === id && app.available)
}
