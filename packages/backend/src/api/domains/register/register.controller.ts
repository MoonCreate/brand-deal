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
  .post("/brand", zValidator('form', registerBrandDto), async (c) => {
    try {
      const body = c.req.valid('form');

      const uploadImg = await pinata.upload.public.file(body.image);

      const imgUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadImg.cid}`;
      const metadata = {
        "name": body.name,
        "description": body.description,
        "image": imgUrl,
        "attributes": [
          {
            "trait_type": "Role",
            "value": "Creator"
          },
          {
            "trait_type": "Email",
            "value": body.email
          },
          {
            "trait_type": "Web",
            "value": body.web
          },
          {
            "trait_type": "NIB",
            "value": body.nib
          },
          {
            "trait_type": "Social Links",
            "value": body.socialLinks
          },
          {
            "trait_type": "Joined Platform",
            "value": Date.now()
          },
          {
            "trait_type": "Creator Address",
            "value": body.walletAddress // Opsional, jika ingin alamat di metadata publik
          }
        ]
      }

      const upload = await pinata.upload.public.json(metadata).name(`${body.email}.json`);

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
  .post("/creator", zValidator('form', registerCreatorDto), async (c) => {
    try {
      const body = c.req.valid('form');

      console.log('Received JSON for upload:', body);

      const uploadImg = await pinata.upload.public.file(body.image);

      const imgUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadImg.cid}`;

      const metadata = {
        "name": body.name,
        "description": body.description,
        "image": imgUrl,
        "attributes": [
          {
            "trait_type": "Role",
            "value": "Creator"
          },
          {
            "trait_type": "Email",
            "value": body.email
          },
          {
            "trait_type": "location Address",
            "value": body.locationAddress
          },
          {
            "trait_type": "Social Links",
            "value": body.socialLinks
          },
          {
            "trait_type": "Joined Platform",
            "value": Date.now()
          },
          {
            "trait_type": "Creator Address",
            "value": body.walletAddress // Opsional, jika ingin alamat di metadata publik
          }
        ]
      }

      const upload = await pinata.upload.public.json(metadata).name(`${body.email}.json`);

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
  //     const body = c.req.valid('json');

  //     console.log('Received JSON for upload:', body);

  //     const upload = await pinata.upload.public.json(body).name(`${body.email}.json`);

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