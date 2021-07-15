import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import vitePluginImport from 'vite-plugin-babel-import';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
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
  ],
});
