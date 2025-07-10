import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createCampaign } from "./dtos/createCampaign.dto";
import { creatorApplyCampaign } from "./dtos/creatorApplyCampaigns.dto";
import { PinataSDK } from "pinata";
import { creatorPool } from "ponder:schema";
import { db } from "ponder:api";
import 'dotenv/config';

const pinata = new PinataSDK({
  pinataGatewayKey: process.env.PINATA_API_KEY,
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const campaignController = new Hono()
  .get("/", (c) => c.json("Hello World"))
  .post("/create", zValidator("json", createCampaign), async (c) => {
    try {
      const jsonData = c.req.valid('json');
      const metadata = {
        name: jsonData.campaignName,
        description: jsonData.description,
        image: jsonData.image,
        attributes: [
          {
            "trait_type": "Brand Name",
            "value": jsonData.brandName
          },
          {
            "trait_type": "Staked Budget (WEI)",
            "value": jsonData.valueStaked,
            "display_type": "number"
          },
          {
            "trait_type": "Prefered Location",
            "value": jsonData.preferedLocation,
          },
        ]
      }

      console.log('Received JSON for upload:', metadata);

      const upload = await pinata.upload.public.json(metadata).name(`${jsonData.campaignName}-${jsonData.brandName}.json`);

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
  .post("/creator-apply", zValidator("json", creatorApplyCampaign), async (c) => {
    const row = await db.execute("")
  })

export { campaignController };
