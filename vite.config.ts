import { resolve } from 'path';

import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import { defineConfig, type PluginOption } from 'vite';
import checker from 'vite-plugin-checker';

export default defineConfig({
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    checker({
      enableBuild: false,
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint .',
      },
    }),
    handlebarsPlugin() as unknown as PluginOption,
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        signUp: resolve(__dirname, 'sign-up.html'),
        main: resolve(__dirname, 'main.html'),
        editProfile: resolve(__dirname, 'edit-profile.html'),
        notFound: resolve(__dirname, '404.html'),
        serverError: resolve(__dirname, '500.html'),
      },
    },
  },
});
