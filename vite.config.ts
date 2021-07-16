import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImport from 'vite-plugin-babel-import';
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    reactRefresh(),
    vitePluginImport([
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style(name) {
          return `antd-mobile/lib/${name}/style/index.css`;
        },
        ignoreStyles: null,
      },
    ]),
    copy({
      targets: [{ src: './data/', dest: './dist' }],
      hook: 'writeBundle',
    }),
  ],
});
