import { useLocale } from '../../i18n/LocaleProvider'
import type { ContactChannel, ContactId } from '../../data/profile'
import { EnvelopeIcon } from './icons/EnvelopeIcon'
import { ContactActions } from './ContactActions'

type CardBodyProps = {
  contacts: ContactChannel[]
  revealed: ContactId[]
  onReveal: (id: ContactId) => void
}

export function CardBody({ contacts, revealed, onReveal }: CardBodyProps) {
  const { t } = useLocale()

  return (
    <main className="pocket__body">
      <p className="pocket__subject card-load__item card-load__item--2">
        <EnvelopeIcon />
        <span>{t.subject}</span>
      </p>
      <p className="pocket__tagline card-load__item card-load__item--3">{t.tagline}</p>
      <ContactActions
        contacts={contacts}
        revealed={revealed}
        onReveal={onReveal}
      />
    </main>
  )
}
