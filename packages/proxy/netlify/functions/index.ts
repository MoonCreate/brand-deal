import type { Context } from "@netlify/functions";

const endpoint = "http://139.180.147.183:42069";

async function proxy(request: Request, context: Context) {
  const url = new URL(request.url);
  const response = await fetch(endpoint + url.pathname);
  return response;
}

export default proxy;
