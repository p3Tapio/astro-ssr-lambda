import { defineConfig, passthroughImageService } from "astro/config";
import astroAws from "@astro-aws/adapter";

export default defineConfig({
  output: "server",
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
