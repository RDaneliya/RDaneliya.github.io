import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base works for GitHub Pages project sites (/personal-page/)
  // and for root deploys (Cloudflare Pages, custom domain).
  base: './',
  plugins: [react()],
})

