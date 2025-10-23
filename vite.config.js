import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import pkg from './package.json' assert { type: 'json' }
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  // Set base path for GitHub Pages (username.github.io/<repo>)
  // Change to '/' if using custom domain or root hosting
  base: '/Air-notes/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
