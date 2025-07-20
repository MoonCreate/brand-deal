import z from 'zod';

export const createCampaign = z.object({
  name: z.string(),
  image: z.instanceof(File),
  description: z.string(),
  brandName: z.string(),
  deadline: z.date(),
  valueStaked: z.string(),
});