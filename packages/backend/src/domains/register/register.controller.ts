import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { registerBrandDto } from "./dtos/registerBrand.dto";
import { registerCreatorDto } from "./dtos/registerCreator.dto";
import { PinataSDK } from "pinata";
import 'dotenv/config';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud",
});

const registerController = new Hono()
  .get("/", (c) => c.json("Hello World"))
  .get("/validate", )
  .post("/brand", zValidator("json", registerBrandDto), async (c) => {
    try {
      const jsonData = c.req.valid('json');

      console.log('Received JSON for upload:', jsonData);

      const upload = await pinata.upload.public.json(jsonData);

      console.log('Pinata upload successful:', upload.cid);

      return c.json(upload, 200);

    } catch (error: any) {
      console.error('Error uploading JSON to Pinata:', error);
      return c.json({
        message: 'Failed to upload JSON to Pinata.',
        error: error.message || 'Unknown error',
      }, 500);
    }
  })
  .post("/creator", zValidator("json", registerCreatorDto), async (c) => {
    try {
      const jsonData = c.req.valid('json');

      console.log('Received JSON for upload:', jsonData);

      const upload = await pinata.upload.public.json(jsonData);

      console.log('Pinata upload successful:', upload.cid);

      return c.json(upload, 200);

    } catch (error: any) {
      console.error('Error uploading JSON to Pinata:', error);
      return c.json({
        message: 'Failed to upload JSON to Pinata.',
        error: error.message || 'Unknown error',
      }, 500);
    }
  })

export { registerController };
