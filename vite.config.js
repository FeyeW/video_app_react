import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    cors: true,

    proxy: {
      "/api": {
        target: "http://tools.cretinzp.com/jokes",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      }
    },
  }

})
