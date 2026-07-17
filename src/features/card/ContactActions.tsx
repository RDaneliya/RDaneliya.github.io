import { useLocale } from '../../i18n/LocaleProvider'
import type { ContactChannel, ContactId } from '../../data/profile'

type ContactActionsProps = {
  contacts: ContactChannel[]
  revealed: ContactId[]
  onReveal: (id: ContactId) => void
}

export function ContactActions({ contacts, revealed, onReveal }: ContactActionsProps) {
  const { t } = useLocale()

  const revealedChannels = revealed
    .map((id) => contacts.find((c) => c.id === id))
    .filter((c): c is ContactChannel => Boolean(c))

  return (
    <div className="pocket__contact card-load__item card-load__item--4">
      <nav className="pocket__ctas" aria-label={t.contactNav}>
        {contacts.map((contact) => (
          <button
            key={contact.id}
            type="button"
            className={`pocket__cta${revealed.includes(contact.id) ? ' pocket__cta--revealed' : ''}`}
            onClick={() => onReveal(contact.id)}
            aria-expanded={revealed.includes(contact.id)}
            aria-controls="pocket-revealed-links"
          >
            {t[contact.labelKey]}
          </button>
        ))}
      </nav>
      {revealedChannels.length > 0 && (
        <ul
          id="pocket-revealed-links"
          className="pocket__revealed"
          aria-label={t.revealedLinks}
        >
          {revealedChannels.map((contact) => (
            <li key={contact.id} className="pocket__revealed-item">
              <span className="pocket__revealed-label">{t[contact.labelKey]}</span>
              <a
                className="pocket__revealed-link"
                href={contact.href}
                target={contact.id === 'email' ? undefined : '_blank'}
                rel={contact.id === 'email' ? undefined : 'noreferrer'}
              >
                {contact.display}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
