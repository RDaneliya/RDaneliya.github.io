import { useLocale } from '../../i18n/LocaleProvider'
import type { Locale } from '../../i18n/types'

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale()

  const select = (next: Locale) => {
    if (next !== locale) setLocale(next)
  }

  return (
    <div className="device-status__lang" role="group" aria-label={t.language}>
      <button
        type="button"
        className={`device-status__lang-btn${locale === 'en' ? ' device-status__lang-btn--active' : ''}`}
        onClick={() => select('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <span className="device-status__lang-sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`device-status__lang-btn${locale === 'ru' ? ' device-status__lang-btn--active' : ''}`}
        onClick={() => select('ru')}
        aria-pressed={locale === 'ru'}
      >
        RU
      </button>
    </div>
  )
}
