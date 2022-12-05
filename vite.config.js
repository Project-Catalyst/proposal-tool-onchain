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
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
      crypto: "crypto-browserify",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
      plugins: [NodeGlobalsPolyfillPlugin({ buffer: true }), NodeModulesPolyfillPlugin()],
    },
  },
  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill({ crypto: true })],
    },
  },
  plugins: [vue(), eslintPlugin()],
});
