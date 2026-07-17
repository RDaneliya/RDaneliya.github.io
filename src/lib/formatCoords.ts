/** Format decimal degrees as compact DMS, e.g. 47°22'N 8°33'E */
export function formatCoords(lat: number, lon: number): string {
  return `${toDms(lat, 'N', 'S')} ${toDms(lon, 'E', 'W')}`
}

function toDms(decimal: number, positiveHemisphere: string, negativeHemisphere: string): string {
  const hemisphere = decimal >= 0 ? positiveHemisphere : negativeHemisphere
  const absolute = Math.abs(decimal)
  const degrees = Math.floor(absolute)
  const minutesFloat = (absolute - degrees) * 60
  const minutes = Math.floor(minutesFloat)
  return `${degrees}°${String(minutes).padStart(2, '0')}'${hemisphere}`
}
