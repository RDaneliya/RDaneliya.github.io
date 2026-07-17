import { useState } from 'react'
import { contacts, type ContactId } from '../../data/profile'
import { useBattery } from '../../hooks/useBattery'
import { useVisitorLocation } from '../../hooks/useVisitorLocation'
import { revealContact } from '../../lib/revealContact'
import { CardBody } from './CardBody'
import { CardFooter } from './CardFooter'
import { CardHeader } from './CardHeader'
import './card.css'

export function BusinessCard() {
  const { coords, location, status, requestLocation } = useVisitorLocation()
  const battery = useBattery()
  const [revealed, setRevealed] = useState<ContactId[]>([])

  const reveal = (id: ContactId) => {
    setRevealed((current) => revealContact(current, id))
  }

  return (
    <div className="card-load">
      <CardHeader battery={battery} />
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
