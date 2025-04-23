import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias :{
      "@": path.resolve(__dirname, "./src"),
    }
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    watch: {
      usePolling: true
    },
    proxy: {
      "/api/v1" : {
        ws: true,
        secure: true,
        target: "http://127.0.0.1:8000/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, '')
      }
    },
  },
  build: {
    outDir: 'dist',
    target: "modules",
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
