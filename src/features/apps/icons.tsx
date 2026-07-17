type IconProps = {
  className?: string
}

export function MessageAppIcon({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="26" height="20" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 3 L14 12 L26 3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function SnakeAppIcon({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" fill="currentColor" opacity="0.35" />
      <rect x="9" y="2" width="5" height="5" fill="currentColor" opacity="0.35" />
      <rect x="16" y="2" width="5" height="5" fill="currentColor" opacity="0.35" />
      <rect x="23" y="2" width="3" height="5" fill="currentColor" opacity="0.2" />
      <rect x="2" y="9" width="5" height="5" fill="currentColor" opacity="0.35" />
      <rect x="9" y="9" width="5" height="5" fill="currentColor" />
      <rect x="16" y="9" width="5" height="5" fill="currentColor" />
      <rect x="16" y="16" width="5" height="5" fill="currentColor" />
      <rect x="16" y="23" width="5" height="3" fill="currentColor" />
      <rect x="9" y="16" width="5" height="5" fill="currentColor" opacity="0.7" />
      <circle cx="11.5" cy="11.5" r="1.2" fill="var(--bg-deep)" />
    </svg>
  )
}

export function TetrisAppIcon({ className }: IconProps) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" fill="currentColor" />
      <rect x="11" y="4" width="6" height="6" fill="currentColor" opacity="0.85" />
      <rect x="18" y="4" width="6" height="6" fill="currentColor" />
      <rect x="11" y="11" width="6" height="6" fill="currentColor" opacity="0.7" />
      <rect x="4" y="18" width="6" height="6" fill="currentColor" opacity="0.55" />
      <rect x="11" y="18" width="6" height="6" fill="currentColor" opacity="0.55" />
      <rect x="18" y="18" width="6" height="6" fill="currentColor" opacity="0.4" />
    </svg>
  )
}
