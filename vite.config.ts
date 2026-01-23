import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vscode from '@tomjs/vite-plugin-vscode'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), vscode({ extension: { minify: false } })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
