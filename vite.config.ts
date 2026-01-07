import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default ({ mode }: any) => {
   const env = loadEnv(mode, process.cwd(), "VITE_");
   
   return defineConfig({
      plugins: [vue(), tailwindcss()],
      resolve: {
         alias: {
            "@": path.resolve(__dirname, "./src"),
         },
      },
      server: {
         port: 5173,
         proxy: {
            "/api": {
               target: env.VITE_API_URL,
               changeOrigin: true,
            },
         },
      },
   });
};
