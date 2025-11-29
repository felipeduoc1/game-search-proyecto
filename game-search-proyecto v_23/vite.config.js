/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// Definir __dirname para entornos ESM (necesario en Vite moderno)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Configuración del servidor de desarrollo y compilación para Vite + React
export default defineConfig({
  plugins: [react()],

  // IMPORTANTE: base './' permite que la app funcione en cualquier subcarpeta o localmente
  // Esto hace que el index.html busque "./assets/script.js" en vez de "/assets/script.js"
  base: './',

  // Define explícitamente la raíz del proyecto para asegurar que index.html sea el punto de entrada
  root: resolve(__dirname),

  server: {
    port: 5173,
    open: true, // Abre el navegador automáticamente al iniciar
    fs: {
      // CORRECCIÓN DEL ERROR 403:
      // Permitimos que Vite sirva archivos desde la raíz y carpetas específicas
      allow: [
        // Permitir la raíz del proyecto (donde está index.html y package.json)
        resolve(__dirname),
        // Permitir carpetas específicas
        resolve(__dirname, 'src'),
        resolve(__dirname, 'public'),
        // Permitir acceso a la carpeta BACKEND si es necesario para assets compartidos
        resolve(__dirname, 'BACKEND')
      ]
    },
    proxy: {
      // Configuración del Proxy para redirigir peticiones al API Gateway
      // Todas las peticiones que empiecen con /api se van al puerto 8888 automáticamente
      '/api': {
        target: 'http://localhost:8888', // Tu API Gateway local
        changeOrigin: true,
        secure: false,
      },
      // Si usas endpoints de autenticación directos
      '/auth': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false,
      }
    }
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@backend': resolve(__dirname, 'BACKEND')
    }
  },

  build: {
    outDir: resolve(__dirname, 'dist'), // Carpeta de salida para producción
    emptyOutDir: true, // Limpia la carpeta dist antes de construir
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})