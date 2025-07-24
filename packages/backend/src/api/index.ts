import { Hono } from "hono";
import { homeController } from "./domains/home/home.controller";
import { registerController } from "./domains/register/register.controller";
import { campaignController } from "./domains/campaign/campaign.controller";
import { cors } from 'hono/cors';
import { db } from "ponder:api";
import schema from "ponder:schema";
import { graphql } from "ponder"; 

interface Bindings {
  PINATA_JWT: string;
  GATEWAY_URL: string;
}

export const config = {
  runtime: "edge",
};

const hql = graphql({ db, schema });

const app = new Hono<{ Bindings: Bindings }>()
  .use(cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  }))
  .use("/graphql", hql)
  .basePath("/api")
  .route("/home", homeController)
  .route("/register", registerController)
  .route("/campaign", campaignController);

export default app;
