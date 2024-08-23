/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
