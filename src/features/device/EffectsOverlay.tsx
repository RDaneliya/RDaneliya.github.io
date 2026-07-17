import './effects.css'

export function EffectsOverlay() {
  return (
    <div className="effects" aria-hidden="true">
      <div className="effects__dots" />
      <div className="effects__scanlines" />
      <div className="effects__glare" />
      <div className="effects__vignette" />
      <div className="effects__flicker" />
    </div>
  )
}
