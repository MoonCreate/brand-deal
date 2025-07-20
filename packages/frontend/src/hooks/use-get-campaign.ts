import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'
import { mobius } from '@/integrations/hono-graphql'

export function useGetCampaigns(props: { creator?: Address; brand?: Address }) {
  return useQuery({
    queryKey: ['campaigns', props],
    queryFn: async () => {
      const result = await mobius.query({
        // @ts-expect-error anjjjjjj
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

      if (props.brand && result) {
        result.campaigns.items = result.campaigns.items.filter(
          (item) => item.brandWalletAddress === props.brand,
        )
      }

      if (props.creator && result) {
        result.campaigns.items = result.campaigns.items.filter((item) =>
          item.creatorPools.items.some(
            (pool) => pool.creatorWalletAddress === props.creator,
          ),
        )
      }

      return result
    },
  })
}
