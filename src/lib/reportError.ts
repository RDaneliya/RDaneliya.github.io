type ErrorPayload = {
  message: string
  stack?: string
  href: string
  ts: string
}

/** Log locally; optionally POST to VITE_ERROR_WEBHOOK when configured. */
export function reportError(error: unknown, info?: string): void {
  const message =
    error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error'
  const stack = error instanceof Error ? error.stack : undefined

  console.error('[pocket-secretary]', message, info ?? '', error)

  const webhook = import.meta.env.VITE_ERROR_WEBHOOK
  if (!webhook || typeof webhook !== 'string') return

  const payload: ErrorPayload = {
    message: info ? `${message} | ${info}` : message,
    stack,
    href: typeof window !== 'undefined' ? window.location.href : '',
    ts: new Date().toISOString(),
  }

  void fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* ignore webhook failures */
  })
}
