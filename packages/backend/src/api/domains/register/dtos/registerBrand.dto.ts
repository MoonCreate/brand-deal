import z from 'zod';

export const registerBrandDto = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  email: z.string(),
  web: z.string(),
  socialLink: z.array(z.object({ type: z.string(), link: z.string() })),
  nib: z.string(),
  walletAddress: z.string(),
})