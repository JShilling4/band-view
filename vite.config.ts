import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import { configDefaults } from "vitest/config";

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
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [...configDefaults.exclude],
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({ autoImportComponentCase: "pascal" }),
    Components({
      extensions: ["vue"],
      dirs: ["src/core/components", "src/modules/**/components"],
      dts: "src/components.d.ts",
    }),
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
  css: {
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ["vue-draggable-plus"],
  },
  server: {
    port: 3000,
  },
});
