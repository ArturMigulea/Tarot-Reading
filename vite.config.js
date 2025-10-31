import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// OLD Vite Config
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Or other framework plugin

export default defineConfig({
  base: '/Tarot-Reading/', // Replace with your actual repository name
  plugins: [react()], // Or other framework plugins
});