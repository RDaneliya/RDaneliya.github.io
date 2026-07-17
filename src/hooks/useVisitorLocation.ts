import { useCallback, useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLocale } from '../i18n/LocaleProvider'
import type { Locale } from '../i18n/types'
import { formatCoords } from '../lib/formatCoords'

const CACHE_KEY = 'ps-geo'
const GEO_TIMEOUT_MS = 10_000
const NOMINATIM_TIMEOUT_MS = 5_000

export type LocationStatus = 'idle' | 'locating' | 'ready' | 'fallback'

type CachedGeo = {
  coords: string
  lat: number
  lon: number
  places: Partial<Record<Locale, string>>
}

type VisitorLocation = {
  coords: string
  location: string
  status: LocationStatus
  requestLocation: () => void
}

type NominatimResponse = {
  address?: {
    city?: string
    town?: string
    village?: string
    municipality?: string
    country?: string
  }
}

function readCache(): CachedGeo | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedGeo
    if (
      typeof parsed.coords === 'string' &&
      typeof parsed.lat === 'number' &&
      typeof parsed.lon === 'number' &&
      parsed.places &&
      typeof parsed.places === 'object'
    ) {
      return parsed
    }
  } catch {
    /* ignore */
  }
  return null
}

function writeCache(value: CachedGeo) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation unavailable'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: GEO_TIMEOUT_MS,
      maximumAge: 60_000,
    })
  })
}

async function reverseGeocode(
  lat: number,
  lon: number,
  locale: Locale,
  signal?: AbortSignal,
): Promise<string | null> {
  const url = new URL('https://nominatim.openstreetmap.org/reverse')
  url.searchParams.set('lat', String(lat))
  url.searchParams.set('lon', String(lon))
  url.searchParams.set('format', 'json')

  const response = await fetch(url.toString(), {
    signal,
    headers: {
      Accept: 'application/json',
      'Accept-Language': locale === 'ru' ? 'ru' : 'en',
    },
  })
  if (!response.ok) return null

  const data = (await response.json()) as NominatimResponse
  const address = data.address
  if (!address) return null

  const city =
    address.city ?? address.town ?? address.village ?? address.municipality ?? null
  const country = address.country ?? null
  if (city && country) return `${city}, ${country}`
  if (country) return country
  if (city) return city
  return null
}

function fetchWithTimeout(
  lat: number,
  lon: number,
  locale: Locale,
): Promise<string | null> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), NOMINATIM_TIMEOUT_MS)
  return reverseGeocode(lat, lon, locale, controller.signal).finally(() => {
    window.clearTimeout(timer)
  })
}

function anyPlace(places: Partial<Record<Locale, string>>): string | null {
  return places.en ?? places.ru ?? Object.values(places).find(Boolean) ?? null
}

export function useVisitorLocation(): VisitorLocation {
  const { locale, t } = useLocale()
  const [enabled, setEnabled] = useState(() => readCache() !== null)
  const [state, setState] = useState<Omit<VisitorLocation, 'requestLocation'>>(() => {
    const cached = readCache()
    const place = cached?.places[locale] ?? (cached ? anyPlace(cached.places) : null)
    if (cached && place) {
      return { coords: cached.coords, location: place, status: 'ready' }
    }
    return {
      coords: profile.homeCoords,
      location: t.locationIdle,
      status: 'idle',
    }
  })

  const requestLocation = useCallback(() => {
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setState({
        coords: profile.homeCoords,
        location: t.locationIdle,
        status: 'idle',
      })
      return
    }

    let cancelled = false
    const cached = readCache()

    if (cached?.places[locale]) {
      setState({
        coords: cached.coords,
        location: cached.places[locale]!,
        status: 'ready',
      })
      return
    }

    if (cached) {
      const fallbackPlace = anyPlace(cached.places)
      setState({
        coords: cached.coords,
        location: fallbackPlace ?? t.locating,
        status: fallbackPlace ? 'ready' : 'locating',
      })

      ;(async () => {
        try {
          const place = await fetchWithTimeout(cached.lat, cached.lon, locale)
          if (cancelled) return

          if (!place) {
            if (!fallbackPlace) {
              setState({
                coords: profile.homeCoords,
                location: t.locationFallback,
                status: 'fallback',
              })
            }
            return
          }

          const next: CachedGeo = {
            ...cached,
            places: { ...cached.places, [locale]: place },
          }
          writeCache(next)
          setState({ coords: cached.coords, location: place, status: 'ready' })
        } catch {
          if (!cancelled && !fallbackPlace) {
            setState({
              coords: profile.homeCoords,
              location: t.locationFallback,
              status: 'fallback',
            })
          }
        }
      })()

      return () => {
        cancelled = true
      }
    }

    setState({ coords: '…', location: t.locating, status: 'locating' })

    ;(async () => {
      try {
        const position = await getCurrentPosition()
        const { latitude, longitude } = position.coords
        const coords = formatCoords(latitude, longitude)
        const place = await fetchWithTimeout(latitude, longitude, locale)

        if (cancelled) return

        if (!place) {
          setState({
            coords: profile.homeCoords,
            location: t.locationFallback,
            status: 'fallback',
          })
          return
        }

        writeCache({
          coords,
          lat: latitude,
          lon: longitude,
          places: { [locale]: place },
        })
        setState({ coords, location: place, status: 'ready' })
      } catch {
        if (!cancelled) {
          setState({
            coords: profile.homeCoords,
            location: t.locationFallback,
            status: 'fallback',
          })
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [enabled, locale, t.locating, t.locationFallback, t.locationIdle])

  return { ...state, requestLocation }
}
