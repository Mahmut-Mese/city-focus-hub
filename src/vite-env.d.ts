/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL?: string;
  readonly VITE_API_URL?: string;
  readonly PUBLIC_CMS_SNAPSHOT_BASE?: string;
  readonly VITE_CMS_SNAPSHOT_BASE?: string;
  // Vite built-ins
  readonly PROD: boolean;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly BASE_URL: string;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
