import type { ReactNode } from 'react'

type AppIconProps = {
  label: string
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}

export function AppIcon({ label, disabled, onClick, children }: AppIconProps) {
  return (
    <button
      type="button"
      className={`apps__tile${disabled ? ' apps__tile--offline' : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-disabled={disabled || undefined}
    >
      <span className="apps__glyph">{children}</span>
      <span className="apps__label">{label}</span>
    </button>
  )
}
