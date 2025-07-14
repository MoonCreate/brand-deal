import z from 'zod';

export const createCampaign = z.object({
  campaignName: z.string(),
  image: z.string(),
  description: z.string(),
  brandName: z.string(),
  preferedLocation: z.string(),
  valueStaked: z.string(),
})