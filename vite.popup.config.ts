import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { CRX_OUTDIR } from './global.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: CRX_OUTDIR
  }
})
