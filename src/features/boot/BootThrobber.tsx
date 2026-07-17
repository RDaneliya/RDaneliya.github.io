const THROBBER_DOTS = 8

export function BootThrobber() {
  return (
    <div className="boot__throbber" aria-hidden="true">
      {Array.from({ length: THROBBER_DOTS }, (_, i) => (
        <span
          key={i}
          className="boot__throbber-dot"
          style={{
            ['--i' as string]: i,
            ['--n' as string]: THROBBER_DOTS,
          }}
        />
      ))}
    </div>
  )
}
