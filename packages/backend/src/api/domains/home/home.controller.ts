import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { greetHomeDto } from "./dtos/greet-home.dto";
import { creatorProfileDto } from "./dtos/test.dto";

const homeController = new Hono()
  .get("/", async (c) => {
    const res = await fetch('https://white-lazy-marten-351.mypinata.cloud/ipfs/bafkreidp3gwhtywblxtgiwmsot32cgxhs3joqz6ojyayzua2as5ammx6fa')
    const data = await res.json();

    const validatedData = creatorProfileDto.parse(data);
    return c.json(validatedData)
  })
  .post("/", zValidator("json", greetHomeDto), (c) => {
    const dto = c.req.valid("json");
    return c.json(dto.title);
  });

export { homeController };
