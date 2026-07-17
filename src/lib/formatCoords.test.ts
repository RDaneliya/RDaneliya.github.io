import { describe, expect, it } from 'vitest'
import { formatCoords } from './formatCoords'

describe('formatCoords', () => {
  it('formats northern / eastern hemisphere as DMS', () => {
    expect(formatCoords(47.3667, 8.55)).toBe("47°22'N 8°33'E")
  })

  it('formats southern / western hemisphere', () => {
    expect(formatCoords(-33.8688, -151.2093)).toBe("33°52'S 151°12'W")
  })

  it('pads minutes to two digits', () => {
    expect(formatCoords(10.0167, 20.0167)).toBe("10°01'N 20°01'E")
  })
})
