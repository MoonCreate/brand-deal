import { useQuery } from '@tanstack/react-query'
import type { Campaign, GraphqlResponse } from '@/types'
import { graphql, useMobiusQuery } from '@/integrations/hono-graphql'

export function useGetCampaigns() {
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const result: GraphqlResponse<{
        campaigns: { items: Campaign }
      }> = await graphql(`
        query MyQuery {
          campaigns {
            items {
              stakedAmount
              brandWalletAddress
              creatorWalletAddress
              deadline
              metadataURI
              metadata
              submitMetadataURI
              status
              blockNumber
              blockTimestamp
              transactionHash
            }
          }
        }
      `)
      return result
    },
  })
}

export function useGetBrandByAddress(address: `0x${string}`) {
  const { data } = useMobiusQuery({
    brand: {
      where: { brandWalletAddress: address },
      select: { metadata: true, blockNumber: true, blockTimestamp: true },
    },
  })
}