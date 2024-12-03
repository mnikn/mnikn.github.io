import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import markdown, { Mode } from 'vite-plugin-markdown'

export default defineConfig({
  plugins: [
    react(),
    markdown({
      mode: [Mode.HTML, Mode.TOC, Mode.MARKDOWN],
      markdownIt: {
        html: true,
        linkify: true,
        typographer: true,
      },
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
