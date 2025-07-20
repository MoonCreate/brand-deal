import { createFileRoute } from '@tanstack/react-router'
import { CampaignApproval } from '@/features/campaign-approval'
import { mobius } from '@/integrations/hono-graphql'

export const Route = createFileRoute('/_no-layout/campaign/approval/$id')({
  // @ts-expect-error ytta
  loader: async ({ params: { id } }) => {
    const response = await mobius.query({
      campaign: {
        where: { campaignNFTId: id },
        // @ts-expect-error annnnnkkkk
        select: {
          // @ts-expect-error
          brand: { metadata: true },
          brandWalletAddress: true,
          creatorPools: { select: { items: { creator: { metadata: true } } } },
          metadata: true,
          campaignNFTId: true,
          creatorWalletAddress: true,
        },
      },
    })

    return response?.campaign
  },
  component: CampaignApproval,
})
