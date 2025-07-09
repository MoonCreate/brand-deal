import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { registerBrandDto } from "./dtos/registerBrand.dto";
import { registerCreatorDto } from "./dtos/registerCreator.dto";
import PinataClient from '@pinata/sdk';
import 'dotenv/config';

const pinata = new PinataClient({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_API_KEY,
});

const registerController = new Hono()
  .get("/", (c) => c.json("Hello World"))
  .get("/validate", )
  .post("/brand", zValidator("json", registerBrandDto), async (c) => {
    try {
      const jsonData = c.req.valid('json');

      console.log('Received JSON for upload:', jsonData);

      const result = await pinata.pinJSONToIPFS(jsonData, {
        pinataMetadata: jsonData,
      });

      console.log('Pinata upload successful:', result);

      return c.json({
        message: 'JSON uploaded to Pinata successfully!',
        IpfsHash: result.IpfsHash,
        PinSize: result.PinSize,
        Timestamp: result.Timestamp,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      }, 200);

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

      const result = await pinata.pinJSONToIPFS(jsonData, {
        pinataMetadata: jsonData,
      });

      console.log('Pinata upload successful:', result);

      return c.json({
        message: 'JSON uploaded to Pinata successfully!',
        IpfsHash: result.IpfsHash,
        PinSize: result.PinSize,
        Timestamp: result.Timestamp,
        gatewayUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      }, 200);

    } catch (error: any) {
      console.error('Error uploading JSON to Pinata:', error);
      return c.json({
        message: 'Failed to upload JSON to Pinata.',
        error: error.message || 'Unknown error',
      }, 500);
    }
  })

export { registerController };
