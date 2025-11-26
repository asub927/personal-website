import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/pages': path.resolve(__dirname, './src/pages'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    // Enable minification with terser for better compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'], // Remove specific console methods
        passes: 2, // Run compression multiple times for better results
      },
      mangle: {
        safari10: true, // Fix Safari 10+ issues
      },
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting
        manualChunks: (id) => {
          // Split node_modules into vendor chunks
          if (id.includes('node_modules')) {
            // React core libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // React Router
            if (id.includes('react-router')) {
              return 'router-vendor'
            }
            // Form handling
            if (id.includes('react-hook-form')) {
              return 'forms-vendor'
            }
            // Other vendor libraries
            return 'vendor'
          }
          // Split pages into separate chunks (already handled by lazy loading)
          if (id.includes('/src/pages/')) {
            const pageName = id.split('/src/pages/')[1].split('.')[0].toLowerCase()
            return `page-${pageName}`
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name || ''
          if (/\.(png|jpe?g|svg|gif|webp|avif)$/i.test(info)) {
            return 'assets/images/[name]-[hash][extname]'
          }
          if (/\.css$/i.test(info)) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Disable source maps for smaller bundle size
    sourcemap: false,
    // Target modern browsers for smaller output
    target: 'esnext',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    // Report compressed size
    reportCompressedSize: true,
  },
  // Optimize dependencies during dev
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-hook-form'],
  },
})
