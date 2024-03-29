import { svelte } from "@sveltejs/vite-plugin-svelte";
import routify from "@roxi/routify/vite-plugin";
import { defineConfig } from "vite";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import pluginRewriteAll from 'vite-plugin-rewrite-all';

const production = process.env.NODE_ENV === "production";

export default defineConfig({
  clearScreen: false,
  resolve: {
    alias: {
      "@": process.cwd() + "/src",
    },
  },

  plugins: [
    pluginRewriteAll(),
    routify({
      ssr: { enable: !!production },
      routesDir: {
        default: 'src/routes',
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
