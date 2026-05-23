import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png:  { quality: 80 },
      jpg:  { quality: 82 },
      jpeg: { quality: 82 },
      webp: { lossless: false, quality: 82 },
    }),
  ],
});
