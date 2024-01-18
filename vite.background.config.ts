import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { CRX_BACKGROUND_OUTDIR } from './global.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: CRX_BACKGROUND_OUTDIR,
    lib: {
        entry: [path.resolve(__dirname, 'src/background/index.tsx')],
        formats: ['es'],
        fileName: () => {
            return 'background.js'
        }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
