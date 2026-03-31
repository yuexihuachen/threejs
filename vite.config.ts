import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    //  dynamicImportVars({
    //   // options
    // })
  ],
})
