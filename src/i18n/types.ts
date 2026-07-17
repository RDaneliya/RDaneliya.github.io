export type Locale = 'en' | 'ru'

export type Messages = {
  bootTitle: string
  bootSubtitle: string
  bootProcessing: string
  bootReady: string
  bootSkip: string
  bootEscHint: string
  bootMeterKernel: string
  bootMeterDisplay: string
  bootMeterLink: string
  bootLines: { status: 'OK' | 'WAIT'; msg: string; delay: number }[]
  role: string
  homeLocation: string
  tagline: string
  subject: string
  email: string
  github: string
  linkedin: string
  contactNav: string
  statusOnline: string
  statusActive: string
  locating: string
  locationFallback: string
  locationScan: string
  locationIdle: string
  language: string
  batteryCharging: string
  batteryLevel: string
  revealedLinks: string
  systemFault: string
  systemFaultReload: string
  appsTitle: string
  appMessage: string
  appSnake: string
  appTetris: string
  appOffline: string
  appsMenu: string
  snakeScore: string
  snakeGameOver: string
  snakeRestart: string
  snakeHint: string
}
