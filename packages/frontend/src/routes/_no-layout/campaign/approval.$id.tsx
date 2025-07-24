import { createFileRoute } from '@tanstack/react-router'
import { CampaignApproval } from '@/features/campaign-approval'
import { mobius } from '@/integrations/hono-graphql'

export const Route = createFileRoute('/_no-layout/campaign/approval/$id')({
  loader: async ({ params: { id } }) => {
    if (isNaN(+id)) throw Error("NOT A NUMBER");
    const response = await mobius.query({
      campaign: {
        where: { campaignNFTId: id as `${number}` },
        select: {
          // @ts-expect-error
          brand: { metadata: true },
          brandWalletAddress: true,
          creatorPools: {
            select: {
              items: {
                creator: { metadata: true, creatorWalletAddress: true },
              },
            },
          },
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
