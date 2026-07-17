import { Component, type ErrorInfo, type ReactNode } from 'react'
import { reportError } from '../lib/reportError'
import { messages } from '../i18n/messages'
import type { Locale } from '../i18n/types'

type Props = {
  children: ReactNode
  locale?: Locale
}

type State = {
  hasError: boolean
}

function resolveLocale(locale?: Locale): Locale {
  if (locale === 'en' || locale === 'ru') return locale
  try {
    const stored = localStorage.getItem('ps-locale')
    if (stored === 'en' || stored === 'ru') return stored
  } catch {
    /* ignore */
  }
  return navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    reportError(error, info.componentStack ?? undefined)
  }

  private reload = () => {
    window.location.reload()
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const t = messages[resolveLocale(this.props.locale)]

    return (
      <div className="app fault">
        <div className="fault__panel" role="alert">
          <p className="fault__title">{t.systemFault}</p>
          <button type="button" className="fault__reload" onClick={this.reload}>
            {t.systemFaultReload}
          </button>
        </div>
      </div>
    )
  }
}
