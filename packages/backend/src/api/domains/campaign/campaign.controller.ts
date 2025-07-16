import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createCampaign } from "./dtos/createCampaign.dto";
import { PinataSDK } from "pinata";
import { creatorPool } from "ponder:schema";
// import { db } from "ponder:api";
import 'dotenv/config';

const pinata = new PinataSDK({
  pinataGatewayKey: process.env.PINATA_API_KEY,
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const campaignController = new Hono()
  .post("/create", zValidator("form", createCampaign), async (c) => {
    try {
      const body = c.req.valid('form');

      const uploadImg = await pinata.upload.public.file(body.image);
      const imgUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadImg.cid}`;
      const metadata = {
        name: body.name,
        description: body.description,
        image: imgUrl,
        attributes: [
          {
            "trait_type": "Brand Name",
            "value": body.brandName
          },
          {
            "trait_type": "Staked Budget (USDC)",
            "value": body.valueStaked,
            "display_type": "number"
          },
        ]
      }

      console.log('Received JSON for upload:', metadata);

      const upload = await pinata.upload.public.json(metadata).name(`${body.name}-${body.brandName}.json`);

      console.log('Pinata upload successful:', upload.cid);

      return c.json(upload, 200);

    } catch (error: any) {
      console.error('Error uploading JSON to Pinata:', error);
      return c.json({
        message: 'Failed to upload JSON to Pinata.',
        error: error.message || 'Unknown error',
      }, 500);
    }
  });

export { campaignController };