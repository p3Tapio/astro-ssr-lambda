// @ts-check

import node from "@astrojs/node";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes(".css") || id.includes(".scss")) {
              return "styles";
            }
          },
          assetFileNames: "_astro/[name].[hash][extname]",
        },
      },
    },
  },
});
