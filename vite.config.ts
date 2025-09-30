import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  base: './',
  plugins: [
    react(),
    Pages({
      dirs: 'src/artifacts',
      extensions: ['tsx', 'jsx'],
    }),
    viteSingleFile(), // Add this plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // These options help with single file generation
    cssCodeSplit: false,
    assetsInlineLimit: 100000000, // Inline all assets
  },
});