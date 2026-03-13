import { createServer } from "http";
import { join } from "path";
import { readFile } from "fs/promises";
import { handler } from "./dist/server/entry.mjs";

const server = createServer(async (req, res) => {
  const url = req.url.split("?")[0];

  if (url.startsWith("/assets/")) {
    const filePath = join(process.cwd(), "dist/client", url);
    const content = await readFile(filePath);
    if (url.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    }

    return res.end(content);
  }

  const event = {
    requestContext: {
      domainName: "localhost",
      http: { method: req.method },
    },
    rawPath: url,
    rawQueryString: req.url.split("?")[1] || "",
    headers: req.headers,
    body: null,
  };

  const result = await handler(event);
  res.statusCode = result.statusCode;
  Object.entries(result.headers || {}).forEach(([k, v]) => res.setHeader(k, v));
  res.end(result.body);
});

server.listen(4321, () => console.log("http://localhost:4321"));
