import { Hono } from "hono";
import { homeController } from "./domains/home/home.controller";
import { registerController } from "./domains/register/register.controller";
import { cors } from 'hono/cors';
import { PinataSDK } from 'pinata'

interface Bindings {
  PINATA_JWT: string;
  GATEWAY_URL: string;
}

export const config = {
  runtime: "edge",
};

const app = new Hono<{ Bindings: Bindings }>()
  .use(cors())
  .basePath("/api")
  .route("/home", homeController)
  .route('/register', registerController);

export default app;
