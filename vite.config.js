import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default (function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd(), "VITE_");
    return defineConfig({
        base: env.VITE_BASE_URL,
        plugins: [
            vue(),
            tailwindcss(),
            viteStaticCopy({
                targets: [
                    {
                        src: "dist/index.html",
                        dest: "",
                        rename: "404.html",
                    },
                ],
            }),
        ],
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
});
