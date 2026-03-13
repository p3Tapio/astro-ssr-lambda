import { defineConfig, passthroughImageService } from "astro/config";
import lambdaAdapter from "./adapter";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: lambdaAdapter(),
  integrations: [react()],
  prefetch: false,
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
              return "assets/router.[hash].js";
            }
            if (chunkInfo.facadeModuleId?.includes("components")) {
              return "assets/components.[hash].js"
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
