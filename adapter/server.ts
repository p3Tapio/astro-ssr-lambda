import { App } from "astro/app";
import { type SSRManifest } from "astro";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";


function toRequest(event: APIGatewayProxyEventV2): Request {
  const url = `https://${event.requestContext.domainName}${event.rawPath}${event.rawQueryString ? "?" + event.rawQueryString : ""}`;
  const headers: Record<string, string> = {};

  for (const [key, value] of Object.entries(event.headers)) {
    if (value !== undefined) {
      headers[key] = value;
    }
  }

  return new Request(url, {
    method: event.requestContext.http.method,
    headers: new Headers(headers),
    body: event.body,
  });
}

async function toResponse(
  response: Response,
): Promise<APIGatewayProxyResultV2> {
  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    body: await response.text(),
    isBase64Encoded: false,
  };
}

export function createExports(manifest: SSRManifest) {
  const app = new App(manifest);

  const handler = async (
    event: APIGatewayProxyEventV2,
  ): Promise<APIGatewayProxyResultV2> => {
    const request = toRequest(event);
    const response = await app.render(request);
    return toResponse(response);
  };

  return { handler };
}
