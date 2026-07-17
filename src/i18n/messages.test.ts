import { describe, expect, it } from 'vitest'
import { messages } from './messages'
import type { Messages } from './types'

const requiredKeys: (keyof Messages)[] = [
  'bootTitle',
  'bootSubtitle',
  'bootProcessing',
  'bootReady',
  'bootSkip',
  'bootEscHint',
  'bootMeterKernel',
  'bootMeterDisplay',
  'bootMeterLink',
  'bootLines',
  'role',
  'homeLocation',
  'tagline',
  'subject',
  'email',
  'github',
  'linkedin',
  'contactNav',
  'statusOnline',
  'statusActive',
  'locating',
  'locationFallback',
  'locationScan',
  'locationIdle',
  'language',
  'batteryCharging',
  'batteryLevel',
  'revealedLinks',
  'systemFault',
  'systemFaultReload',
  'appsTitle',
  'appMessage',
  'appSnake',
  'appTetris',
  'appOffline',
  'appsMenu',
  'snakeScore',
  'snakeGameOver',
  'snakeRestart',
  'snakeHint',
]

describe('i18n messages', () => {
  it.each(['en', 'ru'] as const)('%s has all required keys', (locale) => {
    const pack = messages[locale]
    for (const key of requiredKeys) {
      expect(pack[key], `${locale}.${key}`).toBeDefined()
    }
  })

  it('en and ru boot lines share the same length and delays', () => {
    expect(messages.en.bootLines).toHaveLength(messages.ru.bootLines.length)
    messages.en.bootLines.forEach((line, index) => {
      expect(messages.ru.bootLines[index]?.delay).toBe(line.delay)
      expect(messages.ru.bootLines[index]?.status).toBe(line.status)
    })
  })
})
