import { describe, expect, it } from 'vitest'
import { revealContact } from './revealContact'

describe('revealContact', () => {
  it('appends a new id', () => {
    expect(revealContact(['email'], 'github')).toEqual(['email', 'github'])
  })

  it('does not duplicate an existing id', () => {
    expect(revealContact(['email', 'github'], 'email')).toEqual(['email', 'github'])
  })

  it('works from an empty list', () => {
    expect(revealContact([], 'linkedin')).toEqual(['linkedin'])
  })
})
