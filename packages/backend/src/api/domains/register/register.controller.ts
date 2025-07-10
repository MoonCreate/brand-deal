import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { registerBrandDto } from "./dtos/registerBrand.dto";
import { registerCreatorDto } from "./dtos/registerCreator.dto";
import { PinataSDK } from "pinata";
import 'dotenv/config';

const pinata = new PinataSDK({
  pinataGatewayKey: process.env.PINATA_API_KEY,
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

const registerController = new Hono()
  .get("/", (c) => c.json("Hello World"))
  .get("/validate", )
  .post("/brand", zValidator("json", registerBrandDto), async (c) => {
    try {
      const jsonData = c.req.valid('json');

      console.log('Received JSON for upload:', jsonData);

      const metadata = {
        "name": jsonData.instanceName,
        "description": jsonData.description,
        "image": jsonData.logoBrand,
        "attributes": [
          {
            "trait_type": "Role",
            "value": "Creator"
          },
          {
            "trait_type": "Email",
            "value": jsonData.email
          },
          {
            "trait_type": "Social Links",
            "value": jsonData.socialLink
          },
          {
            "trait_type": "Joined Platform",
            "value": new Date().getUTCMilliseconds()
          },
          {
            "trait_type": "Creator Address",
            "value": jsonData.walletAddress // Opsional, jika ingin alamat di metadata publik
          }
        ]
      }

      const upload = await pinata.upload.public.json(jsonData).name(`${jsonData.email}.json`);;

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

      const metadata = {
        "name": jsonData.publicName,
        "description": jsonData.description,
        "image": jsonData.photoProfile,
        "attributes": [
          {
            "trait_type": "Role",
            "value": "Creator"
          },
          {
            "trait_type": "Email",
            "value": jsonData.email
          },
          {
            "trait_type": "location Address",
            "value": jsonData.locationAddress
          },
          {
            "trait_type": "Social Links",
            "value": jsonData.socialLink
          },
          {
            "trait_type": "Joined Platform",
            "value": new Date().getUTCMilliseconds()
          },
          {
            "trait_type": "Creator Address",
            "value": jsonData.walletAddress // Opsional, jika ingin alamat di metadata publik
          }
        ]
      }

      const upload = await pinata.upload.public.json(metadata).name(`${jsonData.email}.json`);

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
  // .put("/creator/:creatorId", zValidator("json", registerCreatorDto), async (c) => {
  //   try {
  //     const cid = c.req.param('cid');

  //     if (!cid) {
  //       return c.json({
  //         message: 'CID is empty.',
  //         error: 'Error param'
  //       }, 400)
  //     }
  //     console.log(cid, typeof cid)
  //     const oldData = await pinata.gateways.public.get(cid);
      
  //     console.log(oldData)
  //     if (!oldData) {
  //       return c.json({
  //         message: "Data from CID not found.",
  //         error: 'Error not found requested data'
  //       }, 400)
  //     }

  //     const deletedFiles = await pinata.files.public.delete([
  //       "bafkreibgcrmlhmwpf67rgccg7mvbgark5ucurfcdse4emnf6a6aoj4425a"
  //     ])
  //     console.log("files deleted", deletedFiles)
  //     // return c.json(deletedFiles, 200)
  //     const jsonData = c.req.valid('json');

  //     console.log('Received JSON for upload:', jsonData);

  //     const upload = await pinata.upload.public.json(jsonData).name(`${jsonData.email}.json`);

  //     console.log('Pinata upload successful:', upload);

  //     return c.json(upload, 200);

  //   } catch (error: any) {
  //     console.error('Error uploading JSON to Pinata:', error);
  //     return c.json({
  //       message: 'Failed to upload JSON to Pinata.',
  //       error: error.message || 'Unknown error',
  //     }, 500);
  //   }
  // })

export { registerController };
