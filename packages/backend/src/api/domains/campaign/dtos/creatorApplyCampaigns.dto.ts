import z from 'zod';

export const creatorApplyCampaign = z.object({
  campaignInstanceId: z.string(),
  creatorWalletAddress: z.string()
})