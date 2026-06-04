import { defineConfig } from 'vite';

export default defineConfig({
  base: '/next-app/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@matrix': '/matrix/src',
    },
  },
});
