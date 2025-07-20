import { useQuery } from '@tanstack/react-query'
import { mobius } from '@/integrations/hono-graphql'

export function useGetCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const campaigns = await mobius.query({
        // @ts-expect-error
        campaigns: {
          select: {
            items: {
              metadata: true,
              brandWalletAddress: true,
              campaignNFTId: true,
              stakedAmount: true,
              status: true,
              brand: {
                metadata: true,
              },
              creatorPools: {
                select: {
                  items: {
                    creatorWalletAddress: true,
                    creator: { name: true, metadata: true },
                  },
                },
              },
            },
          },
        },
      })

      return campaigns
    },
  })
}
