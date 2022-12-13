import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import { defineConfig } from 'vite'
// @ts-ignore
import { dependencies } from './package.json';
import react from '@vitejs/plugin-react'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

function renderChunks(deps: Record<string, string>): Record<string, string> {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
      if (['react', 'react-dom'].includes(key)) return;
      if (key.startsWith('@types')) return;
      chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
},
optimizeDeps: {
    esbuildOptions: {
        define: {
            global: 'globalThis',
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
        plugins: [
            rollupNodePolyFill(),
        ],
        output: {
            manualChunks: {
                vendor: ['react', 'react-dom'],
                ...renderChunks(dependencies),
            },
        },
    },
},
})
