import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      'cytoscape/dist/cytoscape.umd.js': 'cytoscape/dist/cytoscape.esm.mjs',
      'cytoscape/dist/cytoscape.min.js': 'cytoscape/dist/cytoscape.esm.mjs',
    },
  },
  optimizeDeps: {
    include: ['reactflow'],
    exclude: ['cytoscape'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ['mermaid'],
        },
      },
    },
  },
})

