import path from 'path';
import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/LFullScreen.vue'),
      name: 'VueLeafletFullScreen',
      fileName: (format) => `vue-leaflet-fullscreen.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "leaflet/dist/leaflet-src.esm", "leaflet"],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          leaflet: "L",
          vue: "vue",
        },
        inlineDynamicImports: true
      }
    },
  },
  plugins: [vue()],
});
