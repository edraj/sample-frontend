import { svelte } from "@sveltejs/vite-plugin-svelte";
import routify from "@roxi/routify/vite-plugin";
import { defineConfig } from "vite";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";

import { flexMapsPlugin } from '@roxi/routify/plugins';

const production = process.env.NODE_ENV === "production";

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      "@": process.cwd() + "/src",
    },
  },

  plugins: [
    routify({
      ssr: { enable: !!production },
      plugins: [
        flexMapsPlugin({
          variationsMap: {
            default: ['en', 'ar,en', 'kd,en'],
            // widget: ['en', 'ar', 'kd']
          }
        })
      ],
      routesDir: {
        default: 'src/routes',
        // widget: 'src/widget',
      }
    }),
    svelte({
      compilerOptions: {
        dev: !production,
        hydratable: !!process.env.ROUTIFY_SSR_ENABLE,
      },
      extensions: [".md", ".svelte"],
      preprocess: [preprocess(), mdsvex({ extension: "md" })],
    }),
  ],

  server: { port: 1337 },
  ssr: {
    noExternal: ["@popperjs/core"],
  }
});
