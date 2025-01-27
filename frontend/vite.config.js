import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.json', '**/*.PNG'], // Include both JSON and PNG files
  server: {
    proxy: {
      '/api': 'https://global-venture.onrender.com',
    },
  },
  plugins: [react()],
})
