import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import vue from "@vitejs/plugin-vue";
import path from "path";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      crypto: "rollup-plugin-node-polyfills/polyfills/crypto",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  plugins: [vue(), eslintPlugin()],
});
