/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ERROR_WEBHOOK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
