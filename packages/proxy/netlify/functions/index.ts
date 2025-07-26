import type { Context } from "@netlify/functions";

const endpoint = "http://139.180.147.183:42069";

const unbodyMethods = ["GET", "HEAD"];

const allowedOrigin = ["*"];

async function proxy(request: Request, context: Context) {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin.join(", "),
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }


  const body = unbodyMethods.includes(request.method)
    ? undefined
    : request.body;

  const response = await fetch(endpoint + url.pathname, {
    method: request.method,
    headers: request.headers,
    body: body,
    duplex: "half",
  });

  const responseBody = await response.text();

  return new Response(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") ?? "text/plain",
      "Access-Control-Allow-Origin": allowedOrigin.join(", "),
    },
  });
}

export default proxy;
