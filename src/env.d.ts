/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ID: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_SUPABASE_PASSWORD: string;
  readonly VITE_SUPABASE_URL_API: string;
  readonly VITE_SUPABASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
