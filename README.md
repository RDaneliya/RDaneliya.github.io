# Pocket Secretary

Sci-fi business card SPA (React + Vite) styled like a Deus Ex: Human Revolution pocket secretary.

## Scripts

```bash
npm install
npm run dev      # local development
npm test         # Vitest unit tests
npm run build    # production build → dist/
npm run preview  # preview dist locally
```

## Deploy (Cloudflare Pages)

1. Connect the Git repo in Cloudflare Pages.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Root deploy (no `base` path). Caching for hashed assets is set in `public/_headers`.

Optional custom domain can point at the Pages project.

## Geolocation

Visitor coordinates in the footer are **opt-in**. Click **Scan** to request browser geolocation and reverse-geocode via [Nominatim](https://nominatim.openstreetmap.org/) (OpenStreetMap). Results are cached in `sessionStorage` for the tab session. On deny or failure, the footer falls back to static home coords.

Respect Nominatim’s [usage policy](https://operations.osmfoundation.org/policies/nominatim/) if you deploy publicly; for heavy traffic, use a self-hosted or commercial geocoder.

## Error reporting

Set an optional webhook URL at build time:

```bash
VITE_ERROR_WEBHOOK=https://example.com/hooks/errors
```

Uncaught React errors are caught by `ErrorBoundary`, logged to the console, and POSTed to that URL when configured.

## Profile

Edit identity and contact links in [`src/data/profile.ts`](src/data/profile.ts). EN/RU copy lives in [`src/i18n/messages.ts`](src/i18n/messages.ts).
