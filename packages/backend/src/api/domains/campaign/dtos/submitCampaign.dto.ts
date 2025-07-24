import z from 'zod';

export const submitCampaign = z.object({
  image: z.instanceof(File),
  description: z.string(),
});