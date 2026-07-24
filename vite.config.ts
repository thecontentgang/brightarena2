import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    ViteImageOptimizer({
      webp: { quality: 80 },
      avif: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      png: { quality: 80 },
    }),
    compression(),
  ],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('react-router') || id.includes('react-dom') || id.includes('react-helmet-async')) {
            return 'vendor-react';
          }
          if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
            return 'vendor-motion';
          }
          if (id.includes('ogl') || id.includes('jimp')) {
            return 'vendor-three';
          }
        }
      }
    }
  }
})
