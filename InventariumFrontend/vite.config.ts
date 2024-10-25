import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

// Exporta la configuración de Vite
export default defineConfig({
  plugins: [
    react(),  
  ],
})
