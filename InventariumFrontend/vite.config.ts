import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import eslintPlugin from 'vite-plugin-eslint'
// Exporta la configuración de Vite
import { ManifestOptions, VitePWA } from "vite-plugin-pwa"

const manifestForPlugIn = {
  registerType: 'prompt' as 'prompt',  // Asegura que es uno de los valores permitidos
  includeAssests:['favicon.png'],
  manifest:{
    name:"Inventarium System",
    short_name:"Sistema de inventario",
    description:"App de inventario mercaderia",
    icons:[{
      src: '/favicon.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/favicon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/favicon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/favicon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#171717',
  background_color:'#f0e7db',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  } as Partial<ManifestOptions>
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
})
