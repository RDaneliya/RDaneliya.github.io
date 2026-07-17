import { describe, expect, it } from 'vitest'
import { formatMessage } from './formatMessage'

describe('formatMessage', () => {
  it('replaces named placeholders', () => {
    expect(formatMessage('SCORE {score}', { score: 12 })).toBe('SCORE 12')
    expect(formatMessage('Battery {percent}%', { percent: 80 })).toBe('Battery 80%')
  })

  it('leaves unknown placeholders intact', () => {
    expect(formatMessage('Hi {name}', {})).toBe('Hi {name}')
  })
})
