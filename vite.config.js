import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/tiktk-ui/home",
  optimizeDeps: {
    include: ["prop-types"],
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: ["luo.io.vn", "www.luo.io.vn"],
  },
});
