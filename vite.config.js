import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// OLD Vite Config
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  base: '/Tarot-Reading.github.io/', // must match your repo name exactly
  plugins: [react()],
})