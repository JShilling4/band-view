import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/vitest-setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html"],
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({ autoImportComponentCase: "pascal" }),
    Components({ dts: true }),
  ],
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".json", ".ts", ".vue"],
  },
  server: {
    port: 3000,
  },
});
