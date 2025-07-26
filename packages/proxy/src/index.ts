import proxy from "../netlify/functions";

// for dev use
Bun.serve({
  port: 3000,
  fetch: proxy.bind(null) as never,
});
