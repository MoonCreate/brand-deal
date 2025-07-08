import { Hono } from "hono";
import { homeController } from "./domains/home/home.controller";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api").route("/home", homeController);

export default app;
