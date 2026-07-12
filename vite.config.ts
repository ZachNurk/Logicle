import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Preserve function/class names through minification — GeneratePuzzle.ts
  // logs rule.name for debugging, which the default minifier mangles.
  esbuild: {
    keepNames: true,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
})
