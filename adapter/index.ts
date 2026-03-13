import type { AstroIntegration } from "astro";
import { build } from "esbuild";

export default function lambdaAdapter(): AstroIntegration {
  return {
    name: "lambda-adapter",
    hooks: {
      "astro:config:done": ({ setAdapter }) => {
        setAdapter({
          name: "lambda-adapter",
          serverEntrypoint: new URL("./server.ts", import.meta.url).href,
          exports: ["handler"],
          supportedAstroFeatures: {
            serverOutput: "stable",
            hybridOutput: "stable",
            staticOutput: "unsupported",
            sharpImageService: "unsupported",
          },
        });
      },
      "astro:build:done": async ({ dir }) => {
        const serverEntry = new URL("../server/entry.mjs", dir).pathname;
        await build({
          entryPoints: [serverEntry],
          outfile: serverEntry,
          bundle: true,
          platform: "node",
          target: "esnext",
          format: "esm",
          allowOverwrite: true,
          banner: {
            js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
          },
        });
      },
    },
  };
}
