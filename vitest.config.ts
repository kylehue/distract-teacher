import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
   define: {
      "import.meta.env.VITE_API_URL": JSON.stringify("http://localhost:8000"),
      "import.meta.env.VITE_BASE_URL": JSON.stringify("/"),
   },
   test: {
      environment: "jsdom",
      globals: true,
      setupFiles: ["./tests/setup.ts"],
      include: ["tests/**/*.spec.ts"],
      coverage: {
         provider: "v8",
         reporter: ["text", "html"],
         include: ["src/**/*.{ts,vue}"],
         exclude: ["src/app/pages/**", "src/vite-env.d.ts"],
      },
   },
});
