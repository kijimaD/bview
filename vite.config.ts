import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES ? "bview" : "./",
  plugins: [react()],
  server: {
    port: 8008,
  },
});
