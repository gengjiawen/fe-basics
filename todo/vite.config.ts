import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset URLs so the build works both standalone and when the
  // aggregated site mounts it under /todo/.
  base: './',
  plugins: [react()],
})
