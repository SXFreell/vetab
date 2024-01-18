import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_CONTENT_OUTDIR } from './global.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: CRX_CONTENT_OUTDIR,
    lib: {
        entry: [path.resolve(__dirname, 'src/content/index.tsx')],
        formats: ['es'],
        fileName: () => {
            return 'content.js'
        }
    },
    rollupOptions: {
        output: {
            assetFileNames: (assetInfo) => {
                return 'content.css'
            }
        }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': null
  }
})
