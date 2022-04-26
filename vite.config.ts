import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import polyfillNode from 'rollup-plugin-polyfill-node'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    polyfillNode()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
})
