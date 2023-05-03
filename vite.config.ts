import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueTypeImports from "vite-plugin-vue-type-imports";
const env = loadEnv("mock", process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VueTypeImports()],
  server: {
    port: Number(env.VUE_PORT_CLIENT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  preview: {
    port: Number(env.VUE_PORT_CLIENT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
  },
});
