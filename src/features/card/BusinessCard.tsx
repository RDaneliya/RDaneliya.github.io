import { useState } from 'react'
import { contacts, type ContactId } from '../../data/profile'
import { useVisitorLocation } from '../../hooks/useVisitorLocation'
import { revealContact } from '../../lib/revealContact'
import { CardBody } from './CardBody'
import { CardFooter } from './CardFooter'
import { CardHeader } from './CardHeader'
import './card.css'

type BusinessCardProps = {
  onBack: () => void
}

export function BusinessCard({ onBack }: BusinessCardProps) {
  const { coords, location, status, requestLocation } = useVisitorLocation()
  const [revealed, setRevealed] = useState<ContactId[]>([])

  const reveal = (id: ContactId) => {
    setRevealed((current) => revealContact(current, id))
  }

  return (
    <div className="card-load">
      <CardHeader onBack={onBack} />
      <CardBody contacts={contacts} revealed={revealed} onReveal={reveal} />
      <CardFooter
        coords={coords}
        location={location}
        status={status}
        onScan={requestLocation}
      />
    </div>
  )
}
