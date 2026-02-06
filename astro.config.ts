import { defineConfig, passthroughImageService } from "astro/config";
import astroAws from "@astro-aws/adapter";

export default defineConfig({
  output: "server",
  prefetch: false,
  adapter: astroAws({
    mode: "ssr",
  }),
  image: {
    service: passthroughImageService(),
  },
  build: {
    assets: "assets",
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name.includes("ClientRouter")) {
              return "assets/router.[hash].js"; // TODO toimiiko? 
            }
            return "assets/[name].[hash].js";
          },
          manualChunks: (id) => {
            if (id.includes(".css") || id.includes(".scss")) {
              return "styles";
            }
          },
        },
      },
    },
  },
});
