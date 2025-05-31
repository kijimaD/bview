import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/bview/" : "/",
  plugins: [react()],
  server: {
    port: 8008,
  },
}));
