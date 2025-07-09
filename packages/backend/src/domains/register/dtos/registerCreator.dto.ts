import z from 'zod';

export const registerCreatorDto = z.object({
  publicName: z.string(),
  photoProfile: z.string(),
  description: z.string(),
  socialLink: z.array(z.object({ type: z.string(), link: z.string() })),
  locationAddress: z.string(),
})