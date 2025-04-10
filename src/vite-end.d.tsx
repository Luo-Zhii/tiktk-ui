/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_MONGO_BE_URL: string;
    // Thêm các biến env khác nếu có
    // readonly VITE_API_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  