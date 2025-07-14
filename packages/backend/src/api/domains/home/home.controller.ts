import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { greetHomeDto } from "./dtos/greet-home.dto";

const homeController = new Hono()
  .get("/", (c) => c.json("Hello World"))
  .post("/", zValidator("json", greetHomeDto), (c) => {
    const dto = c.req.valid("json");
    return c.json(dto.title);
  });

export { homeController };
